package hub

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io"
	"math"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

type probeSlot struct {
	ID, Region, Carrier, Address string
	Primary                      bool
}

var probeSlots = []probeSlot{
	{"sh-ct", "上海", "電信", "202.96.209.5", true},
	{"sh-cu", "上海", "聯通", "210.22.70.3", true},
	{"sh-cm", "上海", "移動", "211.136.112.50", true},
	{"ah-ct", "安徽", "電信", "61.132.163.68", false},
	{"ah-cu", "安徽", "聯通", "218.104.78.2", false},
	{"ah-cm", "安徽", "移動", "211.138.180.2", false},
}

type privateProbeTarget struct {
	ID      string `json:"id"`
	Address string `json:"address"`
	Enabled bool   `json:"enabled"`
}
type probeConfig struct {
	Revision string               `json:"revision"`
	Targets  []privateProbeTarget `json:"targets"`
}
type publicProbe struct {
	ID             string   `json:"id"`
	Region         string   `json:"region"`
	Carrier        string   `json:"carrier"`
	Primary        bool     `json:"primary"`
	Status         string   `json:"status"`
	CheckedAt      int64    `json:"checked_at,omitempty"`
	AvgMS          *float64 `json:"avg_ms,omitempty"`
	MinMS          *float64 `json:"min_ms,omitempty"`
	MaxMS          *float64 `json:"max_ms,omitempty"`
	LossPercent    *float64 `json:"loss_percent,omitempty"`
	WindowSent     int      `json:"window_sent,omitempty"`
	WindowReceived int      `json:"window_received,omitempty"`
}

func defaultProbeConfig() probeConfig {
	c := probeConfig{Revision: "regional-reference-v1", Targets: make([]privateProbeTarget, 0, 6)}
	for _, s := range probeSlots {
		c.Targets = append(c.Targets, privateProbeTarget{s.ID, s.Address, true})
	}
	return c
}

func validProbeConfig(c probeConfig) bool {
	if len(c.Revision) < 1 || len(c.Revision) > 64 || len(c.Targets) != 6 {
		return false
	}
	seen := map[string]bool{}
	for _, t := range c.Targets {
		if !protocol.KnownProbeID(t.ID) || seen[t.ID] {
			return false
		}
		seen[t.ID] = true
		if (t.Enabled || t.Address != "") && !protocol.PublicProbeAddress(t.Address) {
			return false
		}
	}
	return true
}

func loadProbeSettings(c *Config) error {
	c.ProbesPath = os.Getenv("PULSE_PROBES_FILE")
	if c.ProbesPath == "" {
		c.ProbesPath = "/var/lib/corenet-pulse/probes.json"
	}
	c.Probes = defaultProbeConfig()
	f, err := os.Open(c.ProbesPath)
	if errors.Is(err, os.ErrNotExist) {
		return nil
	}
	if err != nil {
		return errors.New("cannot load probe configuration")
	}
	defer f.Close()
	dec := json.NewDecoder(io.LimitReader(f, 8192))
	dec.DisallowUnknownFields()
	if err := dec.Decode(&c.Probes); err != nil {
		return errors.New("invalid probe configuration")
	}
	if err := dec.Decode(&struct{}{}); !errors.Is(err, io.EOF) || !validProbeConfig(c.Probes) {
		return errors.New("invalid probe configuration")
	}
	return nil
}

func (s *Store) ProbeConfig() probeConfig {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return probeConfig{s.probes.Revision, append([]privateProbeTarget(nil), s.probes.Targets...)}
}

var errProbeConflict = errors.New("probe configuration changed")

func (s *Store) SaveProbes(c probeConfig) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if c.Revision != s.probes.Revision {
		return errProbeConflict
	}
	if !validProbeConfig(c) {
		return errors.New("invalid probe configuration")
	}
	var revision [16]byte
	if _, err := rand.Read(revision[:]); err != nil {
		return err
	}
	c.Revision = hex.EncodeToString(revision[:])
	if s.cfg.ProbesPath == "" {
		return errors.New("probe storage is not configured")
	}
	raw, err := json.MarshalIndent(c, "", "  ")
	if err != nil {
		return err
	}
	f, err := os.CreateTemp(filepath.Dir(s.cfg.ProbesPath), ".probes-*")
	if err != nil {
		return err
	}
	defer os.Remove(f.Name())
	if _, err = f.Write(append(raw, '\n')); err == nil {
		err = f.Sync()
	}
	closeErr := f.Close()
	if err != nil {
		return err
	}
	if closeErr != nil {
		return closeErr
	}
	if err = os.Rename(f.Name(), s.cfg.ProbesPath); err != nil {
		return err
	}
	s.probes = probeConfig{c.Revision, append([]privateProbeTarget(nil), c.Targets...)}
	for ch := range s.subscribers {
		select {
		case ch <- struct{}{}:
		default:
		}
	}
	return nil
}

func (s *Server) registerProbeRoutes() {
	s.mux.HandleFunc("GET /api/v1/probes", s.agentProbes)
	s.mux.HandleFunc("GET /api/admin/probes", s.adminGetProbes)
	s.mux.HandleFunc("PUT /api/admin/probes", s.adminSaveProbes)
}
func (s *Server) agentProbes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("cache-control", "no-store")
	node, ok := s.store.Node(r.URL.Query().Get("node_id"))
	if !ok || !validBearer(r.Header.Get("authorization"), node.Token) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	c := s.store.ProbeConfig()
	plan := protocol.ProbePlan{Revision: c.Revision, IntervalSeconds: 30, Targets: []protocol.ProbeTarget{}}
	for _, t := range c.Targets {
		if t.Enabled {
			plan.Targets = append(plan.Targets, protocol.ProbeTarget{ID: t.ID, Address: t.Address})
		}
	}
	w.Header().Set("content-type", "application/json")
	_ = json.NewEncoder(w).Encode(plan)
}
func (s *Server) adminGetProbes(w http.ResponseWriter, r *http.Request) {
	if !s.admin.requireSession(w, r) {
		return
	}
	adminJSON(w, http.StatusOK, s.store.ProbeConfig())
}
func (s *Server) adminSaveProbes(w http.ResponseWriter, r *http.Request) {
	if !s.admin.requireSession(w, r) || !s.admin.sameOrigin(w, r) {
		return
	}
	var c probeConfig
	if !decodeAdminBody(w, r, &c) {
		return
	}
	if !validProbeConfig(c) {
		adminError(w, http.StatusBadRequest, "請為六條線路設定有效的公網 IP；未使用的線路可停用")
		return
	}
	err := s.store.SaveProbes(c)
	if errors.Is(err, errProbeConflict) {
		adminError(w, http.StatusConflict, "設定已在其他視窗修改；請重新載入後再編輯")
		return
	}
	if err != nil {
		s.logger.Print("probe configuration save failed")
		adminError(w, http.StatusInternalServerError, "設定儲存失敗，原設定已保留")
		return
	}
	adminJSON(w, http.StatusOK, s.store.ProbeConfig())
}

func validProbeReport(p *protocol.ProbeReport, now time.Time) bool {
	if p == nil {
		return true
	}
	if len(p.Revision) > 64 || len(p.Results) > 6 {
		return false
	}
	seen := map[string]bool{}
	for _, r := range p.Results {
		if !protocol.KnownProbeID(r.TargetID) || seen[r.TargetID] || r.CheckedAt <= 0 || r.CheckedAt > now.Add(15*time.Second).Unix() {
			return false
		}
		seen[r.TargetID] = true
		if r.Sent < 0 || r.Sent > 3 || r.Received < 0 || r.Received > r.Sent || r.WindowSent < r.Sent || r.WindowSent > 60 || r.WindowReceived < r.Received || r.WindowReceived > r.WindowSent {
			return false
		}
		for _, v := range []float64{r.AvgMS, r.MinMS, r.MaxMS} {
			if math.IsNaN(v) || math.IsInf(v, 0) || v < 0 || v > 7000 {
				return false
			}
		}
		switch r.Status {
		case "ok":
			if r.Received < 1 || r.MinMS > r.AvgMS || r.AvgMS > r.MaxMS {
				return false
			}
		case "timeout":
			if r.Sent < 1 || r.Received != 0 || r.AvgMS != 0 || r.MinMS != 0 || r.MaxMS != 0 {
				return false
			}
		case "unavailable":
			if r.Sent != 0 || r.Received != 0 || r.AvgMS != 0 || r.MinMS != 0 || r.MaxMS != 0 {
				return false
			}
		default:
			return false
		}
	}
	return true
}

// Caller holds s.mu. Only fixed labels and bounded measurements reach the public
// state. Never encode the private config or an untrusted Agent result directly.
func (s *Store) publicProbes(rt *nodeRuntime, online bool, now time.Time) []publicProbe {
	result := make([]publicProbe, 0, 6)
	for _, slot := range probeSlots {
		p := publicProbe{ID: slot.ID, Region: slot.Region, Carrier: slot.Carrier, Primary: slot.Primary, Status: "pending"}
		enabled := false
		for _, t := range s.probes.Targets {
			if t.ID == slot.ID {
				enabled = t.Enabled
			}
		}
		switch {
		case !enabled:
			p.Status = "disabled"
		case rt == nil:
		case rt.Report.Probes == nil:
			p.Status = "awaiting_agent"
		case rt.Report.Probes.Revision != s.probes.Revision:
		default:
			for _, r := range rt.Report.Probes.Results {
				if r.TargetID != slot.ID || !validProbeReport(&protocol.ProbeReport{Results: []protocol.PingResult{r}}, now) {
					continue
				}
				p.Status = r.Status
				p.CheckedAt = r.CheckedAt
				if r.Status == "ok" {
					avg, min, max := r.AvgMS, r.MinMS, r.MaxMS
					p.AvgMS = &avg
					p.MinMS = &min
					p.MaxMS = &max
				}
				if r.WindowSent > 0 {
					loss := 100 * float64(r.WindowSent-r.WindowReceived) / float64(r.WindowSent)
					p.LossPercent = &loss
					p.WindowSent = r.WindowSent
					p.WindowReceived = r.WindowReceived
				}
				if !online || now.Unix()-r.CheckedAt > 90 {
					p.Status = "stale"
				}
				break
			}
		}
		result = append(result, p)
	}
	return result
}
