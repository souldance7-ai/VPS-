package hub

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

const testAdminPassword = "only-a-test-admin-password-256-bit-placeholder"
const testAdminOrigin = "https://status.example.com"

func managementServer(t *testing.T) (*Server, Config) {
	t.Helper()
	cfg := testConfig()
	digest := sha256.Sum256([]byte(testAdminPassword))
	cfg.Admin = AdminSettings{KeyHash: hex.EncodeToString(digest[:]), Origin: testAdminOrigin}
	cfg.LabelsPath = filepath.Join(t.TempDir(), "node-labels.json")
	return NewServer(cfg, log.New(io.Discard, "", 0)), cfg
}

func adminRequest(s *Server, method, path, body, origin string, cookie *http.Cookie) *httptest.ResponseRecorder {
	r := httptest.NewRequest(method, path, strings.NewReader(body))
	r.Header.Set("Content-Type", "application/json")
	r.Header.Set("Origin", origin)
	if cookie != nil {
		r.AddCookie(cookie)
	}
	w := httptest.NewRecorder()
	s.Handler().ServeHTTP(w, r)
	return w
}

func loginAdmin(t *testing.T, s *Server) *http.Cookie {
	t.Helper()
	w := adminRequest(s, "POST", "/api/admin/login", `{"password":"`+testAdminPassword+`"}`, testAdminOrigin, nil)
	if w.Code != http.StatusOK {
		t.Fatalf("login: %d %s", w.Code, w.Body.String())
	}
	cookies := w.Result().Cookies()
	if len(cookies) != 1 {
		t.Fatal("missing login cookie")
	}
	c := cookies[0]
	if c.Name != adminCookie || !c.HttpOnly || !c.Secure || c.SameSite != http.SameSiteStrictMode || c.Domain != "" || c.Path != "/" || c.MaxAge != 28800 {
		t.Fatalf("unsafe session cookie: %+v", c)
	}
	if strings.Contains(w.Body.String(), testAdminPassword) || strings.Contains(w.Body.String(), c.Value) {
		t.Fatal("login JSON must not expose secrets")
	}
	return c
}

func TestAdminAuthenticationAndIsolation(t *testing.T) {
	s, _ := managementServer(t)
	for _, path := range []string{"/api/admin/session", "/api/admin/nodes"} {
		w := adminRequest(s, "GET", path, "", "", nil)
		if w.Code != 401 || w.Header().Get("Cache-Control") != "no-store" {
			t.Fatalf("unprotected %s", path)
		}
	}
	for _, origin := range []string{"", "https://attacker.example", "null"} {
		w := adminRequest(s, "POST", "/api/admin/login", `{"password":"`+testAdminPassword+`"}`, origin, nil)
		if w.Code != 403 {
			t.Fatalf("login accepted Origin %q", origin)
		}
	}
	for _, body := range []string{`{"password":"wrong"}`, `{"password":"` + testToken + `"}`} {
		if adminRequest(s, "POST", "/api/admin/login", body, testAdminOrigin, nil).Code != 401 {
			t.Fatal("incorrect password accepted")
		}
	}
	cookie := loginAdmin(t, s)
	w := adminRequest(s, "GET", "/api/admin/nodes", "", "", cookie)
	if w.Code != 200 || !strings.Contains(w.Body.String(), "AWS 日本") {
		t.Fatal(w.Body.String())
	}
	for _, secret := range []string{testToken, testAdminPassword, "203.0.113.8", `"token"`, `"ip"`, `"hostname"`} {
		if strings.Contains(w.Body.String(), secret) {
			t.Fatalf("management leaked %s", secret)
		}
	}
	if adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", `{"name":"new","expected_name":"AWS 日本"}`, "https://attacker.example", cookie).Code != 403 {
		t.Fatal("cross-origin mutation accepted")
	}
	if adminRequest(s, "POST", "/api/admin/logout", "{}", testAdminOrigin, cookie).Code != 200 {
		t.Fatal("logout failed")
	}
	if adminRequest(s, "GET", "/api/admin/nodes", "", "", cookie).Code != 401 {
		t.Fatal("logged out cookie still accepted")
	}
	cookie = loginAdmin(t, s)
	s.admin.mu.Lock()
	s.admin.sessions[sha256.Sum256([]byte(cookie.Value))] = time.Now().Add(-time.Second)
	s.admin.mu.Unlock()
	if adminRequest(s, "GET", "/api/admin/session", "", "", cookie).Code != 401 {
		t.Fatal("expired session accepted")
	}
	disabled := NewServer(testConfig(), log.New(io.Discard, "", 0))
	if adminRequest(disabled, "GET", "/api/admin/nodes", "", "", nil).Code != 503 {
		t.Fatal("unconfigured administration is enabled")
	}
}

func TestAdminLoginRateLimitAndBodyValidation(t *testing.T) {
	s, _ := managementServer(t)
	for _, body := range []string{`{`, `{"password":"ok","token":"extra"}`, `{"password":"` + strings.Repeat("x", 5000) + `"}`, `{} {}`} {
		if adminRequest(s, "POST", "/api/admin/login", body, testAdminOrigin, nil).Code != 400 {
			t.Fatal("invalid login body accepted")
		}
	}
	for i := 0; i < 10; i++ {
		if adminRequest(s, "POST", "/api/admin/login", `{"password":"wrong"}`, testAdminOrigin, nil).Code != 401 {
			t.Fatal("unexpected login attempt result")
		}
	}
	w := adminRequest(s, "POST", "/api/admin/login", `{"password":"wrong"}`, testAdminOrigin, nil)
	if w.Code != 429 || w.Header().Get("Retry-After") == "" {
		t.Fatal("login is not rate limited")
	}
	s.admin.loginWindow = time.Now().Add(-2 * time.Minute)
	loginAdmin(t, s)
}

func TestAdminRenamePersistenceAndLiveUpdates(t *testing.T) {
	s, cfg := managementServer(t)
	s.store.Update(protocol.Report{NodeID: "aws-jp-01", Timestamp: time.Now().Unix(), AgentVersion: "test", Metrics: protocol.Metrics{CPU: 12}})
	before := s.store.State(time.Now()).Nodes[0]
	updates, cancel := s.store.Subscribe()
	defer cancel()
	cookie := loginAdmin(t, s)
	w := adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", `{"name":"  東京・海岸一號  ","expected_name":"AWS 日本"}`, testAdminOrigin, cookie)
	if w.Code != 200 {
		t.Fatalf("rename: %d %s", w.Code, w.Body.String())
	}
	after := s.store.State(time.Now()).Nodes[0]
	if after.Name != "東京・海岸一號" || after.LastSeen != before.LastSeen || len(after.History) != len(before.History) || !after.Online {
		t.Fatal("rename disrupted live telemetry")
	}
	node, _ := s.store.Node("aws-jp-01")
	if node.Token != testToken || node.ID != "aws-jp-01" {
		t.Fatal("rename changed Agent identity")
	}
	select {
	case <-updates:
	default:
		t.Fatal("rename did not notify public subscribers")
	}
	info, err := os.Stat(cfg.LabelsPath)
	if err != nil || info.Mode().Perm() != 0600 {
		t.Fatalf("label file mode: %v", err)
	}
	raw, _ := os.ReadFile(cfg.LabelsPath)
	if strings.Contains(string(raw), testToken) || strings.Contains(string(raw), testAdminPassword) {
		t.Fatal("label file contains credentials")
	}
	cfg.NameOverrides, err = readLabels(cfg.LabelsPath)
	if err != nil {
		t.Fatal(err)
	}
	restarted := NewServer(cfg, log.New(io.Discard, "", 0))
	if restarted.store.State(time.Now()).Nodes[0].Name != "東京・海岸一號" {
		t.Fatal("name lost after restart")
	}
	conflict := adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", `{"name":"過時的修改","expected_name":"AWS 日本"}`, testAdminOrigin, cookie)
	if conflict.Code != 409 || s.store.State(time.Now()).Nodes[0].Name != "東京・海岸一號" {
		t.Fatal("stale edit overwrote a newer name")
	}
	reset := adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", `{"name":"","expected_name":"東京・海岸一號"}`, testAdminOrigin, cookie)
	if reset.Code != 200 || s.store.State(time.Now()).Nodes[0].Name != "AWS 日本" {
		t.Fatal("reset failed")
	}
	saved, _ := readLabels(cfg.LabelsPath)
	if len(saved) != 0 {
		t.Fatal("reset not persisted")
	}
}

func TestAdminRenameValidationAndWriteFailure(t *testing.T) {
	s, cfg := managementServer(t)
	cookie := loginAdmin(t, s)
	for _, name := range []string{"node 203.0.113.1", "node 2001:db8::1", strings.Repeat("海", 81), "名字\n第二行"} {
		body, _ := json.Marshal(map[string]string{"name": name, "expected_name": "AWS 日本"})
		w := adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", string(body), testAdminOrigin, cookie)
		if w.Code != 400 {
			t.Fatalf("invalid name accepted: %q (%d)", name, w.Code)
		}
	}
	if _, err := os.Stat(cfg.LabelsPath); !os.IsNotExist(err) {
		t.Fatal("invalid input wrote labels")
	}
	for _, body := range []string{`{"name":"new"}`, `{"name":null,"expected_name":"AWS 日本"}`, `{"name":"new","expected_name":"AWS 日本","token":"replace"}`} {
		if adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", body, testAdminOrigin, cookie).Code != 400 {
			t.Fatal("invalid mutation accepted")
		}
	}
	if adminRequest(s, "PATCH", "/api/admin/nodes/missing", `{"name":"new","expected_name":"old"}`, testAdminOrigin, cookie).Code != 404 {
		t.Fatal("unknown node accepted")
	}
	s.store.cfg.LabelsPath = filepath.Join(t.TempDir(), "missing-directory", "labels.json")
	w := adminRequest(s, "PATCH", "/api/admin/nodes/aws-jp-01", `{"name":"新名稱","expected_name":"AWS 日本"}`, testAdminOrigin, cookie)
	if w.Code != 500 || s.store.State(time.Now()).Nodes[0].Name != "AWS 日本" {
		t.Fatal("failed disk write changed live state")
	}
	if strings.Contains(w.Body.String(), "missing-directory") {
		t.Fatal("save error exposed filesystem details")
	}
}

func TestLoadManagementSettings(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("PULSE_LABELS_FILE", filepath.Join(dir, "labels.json"))
	digest := sha256.Sum256([]byte(testAdminPassword))
	t.Setenv("PULSE_ADMIN_KEY_HASH", hex.EncodeToString(digest[:]))
	t.Setenv("PULSE_PUBLIC_URL", testAdminOrigin)
	if err := writeLabels(filepath.Join(dir, "labels.json"), map[string]string{"aws-jp-01": "讀取保存名稱"}); err != nil {
		t.Fatal(err)
	}
	cfg := testConfig()
	raw, _ := json.Marshal(cfg)
	path := filepath.Join(dir, "hub.json")
	if err := os.WriteFile(path, raw, 0600); err != nil {
		t.Fatal(err)
	}
	loaded, err := LoadConfig(path)
	if err != nil || loaded.Admin.Origin != testAdminOrigin || loaded.NameOverrides["aws-jp-01"] != "讀取保存名稱" {
		t.Fatalf("settings: %+v %v", loaded.Admin, err)
	}
	for _, origin := range []string{"http://status.example.com", "https://status.example.com/admin", "https://user:pass@status.example.com", ""} {
		t.Setenv("PULSE_PUBLIC_URL", origin)
		if _, err := LoadConfig(path); err == nil {
			t.Fatalf("unsafe origin accepted: %s", origin)
		}
	}
	t.Setenv("PULSE_PUBLIC_URL", testAdminOrigin)
	t.Setenv("PULSE_ADMIN_KEY_HASH", "bad")
	if _, err := LoadConfig(path); err == nil {
		t.Fatal("invalid admin hash accepted")
	}
}
