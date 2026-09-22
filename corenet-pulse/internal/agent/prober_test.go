package agent

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

func TestPingParsingAndLossWindow(t *testing.T) {
	partial := "3 packets transmitted, 2 received, 33.3333% packet loss, time 603ms\nrtt min/avg/max/mdev = 62.500/64.200/65.900/1.700 ms\n"
	r := parsePing(partial)
	if r.Status != "ok" || r.Sent != 3 || r.Received != 2 || r.AvgMS != 64.2 {
		t.Fatalf("bad parsing: %+v", r)
	}
	if r := parsePing("3 packets transmitted, 0 received, 100% packet loss"); r.Status != "timeout" || r.Sent != 3 {
		t.Fatalf("bad timeout: %+v", r)
	}
	for _, out := range []string{"ping: permission denied", "3 packets transmitted, 2 received", "3 packets transmitted, 4 received", "999 packets transmitted, 0 received"} {
		if r := parsePing(out); r.Status != "unavailable" || r.Sent != 0 {
			t.Fatalf("invalid output counted as loss: %+v", r)
		}
	}
	p := NewProber()
	p.ping = func(context.Context, string) protocol.PingResult { return parsePing(partial) }
	plan := protocol.ProbePlan{Revision: "a", Targets: []protocol.ProbeTarget{{ID: "sh-ct", Address: "202.96.209.5"}}}
	for i := 0; i < 25; i++ {
		p.sample(context.Background(), plan)
	}
	snapshot := p.Snapshot()
	r = snapshot.Results[0]
	if r.WindowSent != 60 || r.WindowReceived != 40 {
		t.Fatalf("unbounded loss window: %+v", r)
	}
	snapshot.Results[0].Status = "mutated"
	if p.Snapshot().Results[0].Status != "ok" {
		t.Fatal("snapshot aliases worker data")
	}
	p.windows["sh-ct"] = []protocol.PingResult{{Sent: 3, Received: 0, CheckedAt: time.Now().Add(-11 * time.Minute).Unix()}}
	p.sample(context.Background(), plan)
	if p.Snapshot().Results[0].WindowSent != 3 {
		t.Fatal("expired samples retained")
	}
	plan.Revision = "b"
	p.sample(context.Background(), plan)
	if p.Snapshot().Results[0].WindowSent != 3 {
		t.Fatal("mixed samples from previous target revision")
	}
	p.ping = func(context.Context, string) protocol.PingResult { return protocol.PingResult{Status: "unavailable"} }
	p.sample(context.Background(), plan)
	if r := p.Snapshot().Results[0]; r.Status != "unavailable" || r.WindowSent != 3 || r.WindowReceived != 2 {
		t.Fatal("missing ping binary invented packet loss")
	}
	b, _ := json.Marshal(p.Snapshot())
	if strings.Contains(string(b), "202.96.209.5") || strings.Contains(string(b), "address") {
		t.Fatal("result contains a target address")
	}
}

func TestPlanAuthenticationAndTargetValidation(t *testing.T) {
	plan := protocol.ProbePlan{Revision: "v1", IntervalSeconds: 30, Targets: []protocol.ProbeTarget{{ID: "sh-ct", Address: "202.96.209.5"}}}
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/api/v1/probes" || r.URL.Query().Get("node_id") != "test node" || r.Header.Get("Authorization") != "Bearer test-only-token" {
			t.Error("missing node-scoped authentication")
		}
		_ = json.NewEncoder(w).Encode(plan)
	}))
	defer server.Close()
	for _, address := range []string{"202.96.209.5", "127.0.0.1", "::ffff:127.0.0.1", "169.254.169.254", "100.64.1.2", "10.0.0.1", "192.168.1.1", "example.com", "-c 999", "64:ff9b::a00:1", "2002:a00:1::1"} {
		plan.Targets[0].Address = address
		_, err := fetchProbePlan(context.Background(), server.Client(), server.URL, "test node", "test-only-token")
		if (err == nil) != (address == "202.96.209.5") {
			t.Fatalf("address validation failed for %s", address)
		}
	}
	plan.Targets[0].Address = "202.96.209.5"
	plan.Targets = append(plan.Targets, plan.Targets[0])
	if _, err := fetchProbePlan(context.Background(), server.Client(), server.URL, "test node", "test-only-token"); err == nil {
		t.Fatal("duplicate probe targets accepted")
	}
}

func TestProbeCancellationDoesNotPublishPartialBatch(t *testing.T) {
	p := NewProber()
	p.ping = func(ctx context.Context, _ string) protocol.PingResult {
		<-ctx.Done()
		return protocol.PingResult{Status: "unavailable"}
	}
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Millisecond)
	defer cancel()
	plan := protocol.ProbePlan{Revision: "test"}
	for i := 0; i < 6; i++ {
		plan.Targets = append(plan.Targets, protocol.ProbeTarget{ID: fmt.Sprint(i)})
	}
	p.sample(ctx, plan)
	if len(p.Snapshot().Results) != 0 {
		t.Fatal("published a canceled measurement")
	}
}
