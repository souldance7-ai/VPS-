package hub

import (
	"encoding/json"
	"io"
	"log"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

func probeRequest(s *Server, token string) *httptest.ResponseRecorder {
	r := httptest.NewRequest("GET", "/api/v1/probes?node_id=aws-jp-01", nil)
	r.Header.Set("Authorization", "Bearer "+token)
	w := httptest.NewRecorder()
	s.Handler().ServeHTTP(w, r)
	return w
}

func TestPrivateProbeConfigAndPersistence(t *testing.T) {
	_, cfg := managementServer(t)
	cfg.ProbesPath = filepath.Join(t.TempDir(), "probes.json")
	s := NewServer(cfg, log.New(io.Discard, "", 0))
	if probeRequest(s, "").Code != 401 || probeRequest(s, "incorrect-token").Code != 401 {
		t.Fatal("unauthenticated target access")
	}
	w := probeRequest(s, testToken)
	if w.Code != 200 || w.Header().Get("Cache-Control") != "no-store" || !strings.Contains(w.Body.String(), "202.96.209.5") {
		t.Fatal("Agent plan unavailable")
	}
	if adminRequest(s, "GET", "/api/admin/probes", "", "", nil).Code != 401 {
		t.Fatal("unprotected private config")
	}
	cookie := loginAdmin(t, s)
	w = adminRequest(s, "GET", "/api/admin/probes", "", "", cookie)
	var config probeConfig
	if err := json.Unmarshal(w.Body.Bytes(), &config); err != nil {
		t.Fatal(err)
	}
	config.Targets[0].Address = "202.96.209.133"
	config.Targets[3].Enabled = false
	raw, _ := json.Marshal(config)
	if adminRequest(s, "PUT", "/api/admin/probes", string(raw), "https://other.example", cookie).Code != 403 {
		t.Fatal("cross-origin config mutation")
	}
	w = adminRequest(s, "PUT", "/api/admin/probes", string(raw), testAdminOrigin, cookie)
	if w.Code != 200 {
		t.Fatal(w.Body.String())
	}
	if adminRequest(s, "PUT", "/api/admin/probes", string(raw), testAdminOrigin, cookie).Code != 409 {
		t.Fatal("lost concurrent edit")
	}
	if s.store.ProbeConfig().Revision == config.Revision {
		t.Fatal("target change retained old revision")
	}
	info, err := os.Stat(cfg.ProbesPath)
	if err != nil || info.Mode().Perm() != 0600 {
		t.Fatal("settings need private storage")
	}
	t.Setenv("PULSE_PROBES_FILE", cfg.ProbesPath)
	if err := loadProbeSettings(&cfg); err != nil {
		t.Fatal(err)
	}
	restarted := NewServer(cfg, log.New(io.Discard, "", 0))
	if c := restarted.store.ProbeConfig(); c.Targets[0].Address != "202.96.209.133" || c.Targets[3].Enabled {
		t.Fatal("restart lost configuration")
	}
	var plan protocol.ProbePlan
	if err := json.Unmarshal(probeRequest(restarted, testToken).Body.Bytes(), &plan); err != nil || len(plan.Targets) != 5 {
		t.Fatal("disabled target still probed")
	}
	current := s.store.ProbeConfig()
	for _, bad := range []string{"127.0.0.1", "10.0.0.1", "169.254.169.254", "2001:db8::1", "example.com", "8.8.8.8;sh"} {
		current.Targets[0].Address = bad
		raw, _ = json.Marshal(current)
		if adminRequest(s, "PUT", "/api/admin/probes", string(raw), testAdminOrigin, cookie).Code != 400 {
			t.Fatalf("accepted %s", bad)
		}
	}
	current = s.store.ProbeConfig()
	s.store.cfg.ProbesPath = filepath.Join(t.TempDir(), "missing", "config.json")
	raw, _ = json.Marshal(current)
	w = adminRequest(s, "PUT", "/api/admin/probes", string(raw), testAdminOrigin, cookie)
	if w.Code != 500 || strings.Contains(w.Body.String(), s.store.cfg.ProbesPath) || s.store.ProbeConfig().Revision != current.Revision {
		t.Fatal("write failure mutated runtime or leaked path")
	}
}

func TestProbePublicResultsAndStaleness(t *testing.T) {
	s := NewStore(testConfig())
	now := time.Now()
	if s.State(now).Nodes[0].Probes[0].Status != "pending" {
		t.Fatal("uninstalled node not pending")
	}
	report := protocol.Report{NodeID: "aws-jp-01", Timestamp: now.Unix()}
	s.Update(report)
	if p := s.State(now).Nodes[0].Probes[0]; p.Status != "awaiting_agent" || p.AvgMS != nil {
		t.Fatal("old Agent fabricated a ping")
	}
	report.Probes = &protocol.ProbeReport{Revision: s.ProbeConfig().Revision, Results: []protocol.PingResult{
		{TargetID: "sh-ct", Status: "ok", CheckedAt: now.Unix(), Sent: 3, Received: 2, AvgMS: 64, MinMS: 62, MaxMS: 66, WindowSent: 30, WindowReceived: 29},
		{TargetID: "sh-cu", Status: "timeout", CheckedAt: now.Unix(), Sent: 3, WindowSent: 3},
		{TargetID: "sh-cm", Status: "unavailable", CheckedAt: now.Unix()},
	}}
	s.Update(report)
	state := s.State(now)
	p := state.Nodes[0].Probes
	if *p[0].AvgMS != 64 || *p[0].LossPercent < 3.33 || *p[0].LossPercent > 3.34 || p[1].AvgMS != nil || *p[1].LossPercent != 100 || p[2].LossPercent != nil || !state.Nodes[0].Online {
		t.Fatal("incorrect RTT/loss/status")
	}
	if s.State(now.Add(91 * time.Second)).Nodes[0].Probes[0].Status != "stale" {
		t.Fatal("stale ping shown as live")
	}
	b, _ := json.Marshal(state)
	for _, tgt := range defaultProbeConfig().Targets {
		if strings.Contains(string(b), tgt.Address) {
			t.Fatal("public state leaked private target")
		}
	}
	if strings.Contains(string(b), testToken) || strings.Contains(string(b), "203.0.113.8") || strings.Contains(string(b), "revision") {
		t.Fatal("public probe state leaks internal data")
	}
	report.Probes.Revision = "previous-target-config"
	s.Update(report)
	if p := s.State(now).Nodes[0].Probes[0]; p.Status != "pending" || p.AvgMS != nil {
		t.Fatal("old target results mislabeled")
	}
}

func TestRejectMalformedProbeReports(t *testing.T) {
	now := time.Now()
	valid := protocol.PingResult{TargetID: "sh-ct", CheckedAt: now.Unix(), Status: "ok", Sent: 3, Received: 3, AvgMS: 60, MinMS: 58, MaxMS: 62, WindowSent: 3, WindowReceived: 3}
	for _, mutate := range []func(*protocol.PingResult){
		func(r *protocol.PingResult) { r.TargetID = "203.0.113.1" }, func(r *protocol.PingResult) { r.Status = "raw error text" },
		func(r *protocol.PingResult) { r.Received = 4 }, func(r *protocol.PingResult) { r.WindowSent = 999 },
		func(r *protocol.PingResult) { r.AvgMS = -1 }, func(r *protocol.PingResult) { r.MinMS = 100 },
		func(r *protocol.PingResult) { r.CheckedAt = now.Add(time.Hour).Unix() }, func(r *protocol.PingResult) { r.Status = "timeout" },
	} {
		r := valid
		mutate(&r)
		if validProbeReport(&protocol.ProbeReport{Results: []protocol.PingResult{r}}, now) {
			t.Fatalf("accepted invalid report: %+v", r)
		}
	}
	if validProbeReport(&protocol.ProbeReport{Results: []protocol.PingResult{valid, valid}}, now) {
		t.Fatal("duplicate results accepted")
	}
}
