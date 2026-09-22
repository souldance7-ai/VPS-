package hub

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

const testToken = "test-token-that-is-long-enough"

func testConfig() Config {
	return Config{
		StaleAfterSeconds: 15,
		HistoryPoints:     30,
		Site:              SiteConfig{Name: "Test Pulse", Subtitle: "Safe"},
		Nodes: []NodeConfig{{
			ID: "aws-jp-01", Name: "AWS 日本", Region: "origin 203.0.113.8", Country: "JP", Token: testToken,
		}},
	}
}

func TestPublicStateNeverLeaksSecretsOrPeerIP(t *testing.T) {
	server := NewServer(testConfig(), log.New(io.Discard, "", 0))
	report := protocol.Report{
		NodeID: "aws-jp-01", AgentVersion: "test", Timestamp: time.Now().Unix(),
		System:  protocol.System{OS: "Debian 13 via 2001:db8::7", CPUCores: 4, MemTotal: 8 << 30, DiskTotal: 80 << 30},
		Metrics: protocol.Metrics{CPU: 12.5, MemUsed: 2 << 30, DiskUsed: 20 << 30, NetRX: 1000, NetTX: 500},
	}
	body, _ := json.Marshal(report)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/report", bytes.NewReader(body))
	req.RemoteAddr = "198.51.100.42:49999"
	req.Header.Set("content-type", "application/json")
	req.Header.Set("authorization", "Bearer "+testToken)
	w := httptest.NewRecorder()
	server.Handler().ServeHTTP(w, req)
	if w.Code != http.StatusNoContent {
		t.Fatalf("report status = %d, body=%s", w.Code, w.Body.String())
	}

	stateReq := httptest.NewRequest(http.MethodGet, "/api/public/state", nil)
	stateW := httptest.NewRecorder()
	server.Handler().ServeHTTP(stateW, stateReq)
	payload := stateW.Body.String()
	for _, forbidden := range []string{testToken, "198.51.100.42", "203.0.113.8", "2001:db8::7", `"ip"`, `"hostname"`, `"token"`} {
		if strings.Contains(strings.ToLower(payload), strings.ToLower(forbidden)) {
			t.Fatalf("public payload leaked %q: %s", forbidden, payload)
		}
	}
	if !strings.Contains(payload, "AWS 日本") {
		t.Fatalf("public payload missing node: %s", payload)
	}
}

func TestReportAuthenticationAndStrictJSON(t *testing.T) {
	server := NewServer(testConfig(), log.New(io.Discard, "", 0))
	valid := `{"node_id":"aws-jp-01","agent_version":"test","timestamp":` +
		strings.TrimSpace(time.Now().Format("05")) + `}`
	_ = valid // A full report is tested above; these cases only exercise rejection.
	cases := []struct {
		name, token, body string
		want              int
	}{
		{"missing token", "", `{"node_id":"aws-jp-01","timestamp":1}`, http.StatusUnauthorized},
		{"wrong token", "wrong-token-that-is-long-enough", `{"node_id":"aws-jp-01","timestamp":1}`, http.StatusUnauthorized},
		{"unknown field", testToken, `{"node_id":"aws-jp-01","timestamp":1,"ip":"203.0.113.8"}`, http.StatusBadRequest},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodPost, "/api/v1/report", strings.NewReader(tc.body))
			req.Header.Set("content-type", "application/json")
			if tc.token != "" {
				req.Header.Set("authorization", "Bearer "+tc.token)
			}
			w := httptest.NewRecorder()
			server.Handler().ServeHTTP(w, req)
			if w.Code != tc.want {
				t.Fatalf("status=%d want=%d body=%s", w.Code, tc.want, w.Body.String())
			}
		})
	}
}
