package agent

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/url"
	"os/exec"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

type pingFunc func(context.Context, string) protocol.PingResult
type Prober struct {
	mu      sync.RWMutex
	report  protocol.ProbeReport
	windows map[string][]protocol.PingResult
	ping    pingFunc
}

func NewProber() *Prober {
	return &Prober{report: protocol.ProbeReport{Results: []protocol.PingResult{}}, windows: make(map[string][]protocol.PingResult), ping: runPing}
}

func (p *Prober) Snapshot() *protocol.ProbeReport {
	p.mu.RLock()
	defer p.mu.RUnlock()
	return &protocol.ProbeReport{Revision: p.report.Revision, Results: append([]protocol.PingResult{}, p.report.Results...)}
}

// Collection runs independently of resource reporting. Six short probes every
// ~30 seconds remain bounded even for a large fleet; jitter spreads requests.
func (p *Prober) Run(ctx context.Context, client *http.Client, hubURL, nodeID, token string) {
	var jitter [2]byte
	_, _ = rand.Read(jitter[:])
	if !waitProbe(ctx, time.Duration(jitter[0]%15)*time.Second) {
		return
	}
	for {
		started := time.Now()
		plan, err := fetchProbePlan(ctx, client, hubURL, nodeID, token)
		if err == nil {
			p.sample(ctx, plan)
		}
		interval := 30*time.Second + time.Duration(int(jitter[1])*7)*time.Millisecond
		if !waitProbe(ctx, interval-time.Since(started)) {
			return
		}
	}
}

func waitProbe(ctx context.Context, d time.Duration) bool {
	t := time.NewTimer(d)
	defer t.Stop()
	select {
	case <-ctx.Done():
		return false
	case <-t.C:
		return true
	}
}

func fetchProbePlan(ctx context.Context, client *http.Client, hubURL, nodeID, token string) (protocol.ProbePlan, error) {
	var plan protocol.ProbePlan
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, strings.TrimRight(hubURL, "/")+"/api/v1/probes?node_id="+url.QueryEscape(nodeID), nil)
	if err != nil {
		return plan, err
	}
	req.Header.Set("authorization", "Bearer "+token)
	res, err := client.Do(req)
	if err != nil {
		return plan, err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		return plan, errors.New("probe plan unavailable")
	}
	dec := json.NewDecoder(io.LimitReader(res.Body, 8192))
	dec.DisallowUnknownFields()
	if err = dec.Decode(&plan); err != nil {
		return plan, err
	}
	if err = dec.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		return plan, errors.New("invalid probe plan")
	}
	if plan.Revision == "" || len(plan.Revision) > 64 || len(plan.Targets) > 6 || plan.IntervalSeconds != 30 {
		return plan, errors.New("invalid probe plan")
	}
	seen := map[string]bool{}
	for _, t := range plan.Targets {
		if !protocol.KnownProbeID(t.ID) || seen[t.ID] || !protocol.PublicProbeAddress(t.Address) {
			return plan, errors.New("invalid probe target")
		}
		seen[t.ID] = true
	}
	return plan, nil
}

func (p *Prober) sample(ctx context.Context, plan protocol.ProbePlan) {
	p.mu.Lock()
	if p.report.Revision != plan.Revision {
		p.windows = make(map[string][]protocol.PingResult)
		p.report = protocol.ProbeReport{Revision: plan.Revision, Results: []protocol.PingResult{}}
	}
	p.mu.Unlock()
	results := make([]protocol.PingResult, len(plan.Targets))
	var wg sync.WaitGroup
	for i, t := range plan.Targets {
		wg.Add(1)
		go func(i int, target protocol.ProbeTarget) {
			defer wg.Done()
			probeCtx, cancel := context.WithTimeout(ctx, 7*time.Second)
			defer cancel()
			r := p.ping(probeCtx, target.Address)
			r.TargetID = target.ID
			r.CheckedAt = time.Now().Unix()
			results[i] = r
		}(i, t)
	}
	wg.Wait()
	if ctx.Err() != nil {
		return
	}
	p.mu.Lock()
	defer p.mu.Unlock()
	for i := range results {
		r := &results[i]
		var window []protocol.PingResult
		for _, old := range p.windows[r.TargetID] {
			if old.CheckedAt > r.CheckedAt-600 {
				window = append(window, old)
			}
		}
		if r.Sent > 0 {
			window = append(window, *r)
		}
		if len(window) > 20 {
			window = window[len(window)-20:]
		}
		p.windows[r.TargetID] = window
		for _, batch := range window {
			r.WindowSent += batch.Sent
			r.WindowReceived += batch.Received
		}
	}
	p.report = protocol.ProbeReport{Revision: plan.Revision, Results: results}
}

var pingPackets = regexp.MustCompile(`(?m)(\d+) packets transmitted,\s*(\d+) (?:packets )?received`)
var pingRTT = regexp.MustCompile(`(?:rtt|round-trip) min/avg/max/(?:mdev|stddev)\s*=\s*([0-9.]+)/([0-9.]+)/([0-9.]+)/[0-9.]+ ms`)

func parsePing(output string) protocol.PingResult {
	r := protocol.PingResult{Status: "unavailable"}
	m := pingPackets.FindStringSubmatch(output)
	if len(m) != 3 {
		return r
	}
	sent, _ := strconv.Atoi(m[1])
	received, _ := strconv.Atoi(m[2])
	if sent < 1 || sent > 3 || received < 0 || received > sent {
		return r
	}
	if received == 0 {
		r.Status = "timeout"
		r.Sent = sent
		return r
	}
	rtt := pingRTT.FindStringSubmatch(output)
	if len(rtt) != 4 {
		return r
	}
	values := [3]float64{}
	for i := range values {
		v, err := strconv.ParseFloat(rtt[i+1], 64)
		if err != nil || v < 0 || v > 7000 {
			return r
		}
		values[i] = v
	}
	if values[0] > values[1] || values[1] > values[2] {
		return r
	}
	r.Status = "ok"
	r.Sent = sent
	r.Received = received
	r.MinMS = values[0]
	r.AvgMS = values[1]
	r.MaxMS = values[2]
	return r
}

func runPing(ctx context.Context, address string) protocol.PingResult {
	if !protocol.PublicProbeAddress(address) {
		return protocol.PingResult{Status: "unavailable"}
	}
	// No shell, DNS lookup, arbitrary options, or packet payload supplied by users.
	cmd := exec.CommandContext(ctx, "ping", "-n", "-c", "3", "-i", "0.3", "-W", "2", "-w", "5", "-s", "16", "--", address)
	cmd.Env = []string{"LC_ALL=C", "PATH=/usr/sbin:/usr/bin:/sbin:/bin"}
	output, err := cmd.CombinedOutput()
	if ctx.Err() != nil || (err != nil && (cmd.ProcessState == nil || cmd.ProcessState.ExitCode() != 1)) {
		return protocol.PingResult{Status: "unavailable"}
	}
	return parsePing(string(output))
}
