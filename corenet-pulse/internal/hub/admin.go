package hub

import (
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"
)

const adminCookie = "__Host-pulse_admin"
const adminSessionLifetime = 8 * time.Hour

type AdminSettings struct {
	KeyHash string
	Origin  string
}

func loadManagementSettings(cfg *Config) error {
	cfg.LabelsPath = os.Getenv("PULSE_LABELS_FILE")
	if cfg.LabelsPath == "" {
		cfg.LabelsPath = "/var/lib/corenet-pulse/node-labels.json"
	}
	var err error
	cfg.NameOverrides, err = readLabels(cfg.LabelsPath)
	if err != nil {
		return fmt.Errorf("load node names: %w", err)
	}
	cfg.Admin.KeyHash = os.Getenv("PULSE_ADMIN_KEY_HASH")
	if cfg.Admin.KeyHash == "" {
		return nil
	}
	digest, err := hex.DecodeString(cfg.Admin.KeyHash)
	if err != nil || len(digest) != sha256.Size {
		return errors.New("invalid admin key hash")
	}
	u, err := url.Parse(os.Getenv("PULSE_PUBLIC_URL"))
	if err != nil || u.Scheme != "https" || u.Hostname() == "" || u.User != nil || (u.Path != "" && u.Path != "/") || u.RawQuery != "" || u.Fragment != "" {
		return errors.New("management requires a public HTTPS origin")
	}
	cfg.Admin.Origin = "https://" + u.Host
	return nil
}

type adminManager struct {
	mu          sync.Mutex
	settings    AdminSettings
	sessions    map[[32]byte]time.Time
	loginWindow time.Time
	loginCount  int
}

func newAdminManager(settings AdminSettings) *adminManager {
	return &adminManager{settings: settings, sessions: make(map[[32]byte]time.Time)}
}

func (s *Server) registerAdminRoutes() {
	s.mux.HandleFunc("GET /admin", s.adminPage)
	s.mux.HandleFunc("GET /admin/{$}", s.adminPage)
	s.mux.HandleFunc("POST /api/admin/login", s.adminLogin)
	s.mux.HandleFunc("POST /api/admin/logout", s.adminLogout)
	s.mux.HandleFunc("GET /api/admin/session", s.adminSession)
	s.mux.HandleFunc("GET /api/admin/nodes", s.adminNodes)
	s.mux.HandleFunc("PATCH /api/admin/nodes/{id}", s.adminRename)
}

func adminJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("content-type", "application/json; charset=utf-8")
	w.Header().Set("cache-control", "no-store")
	w.Header().Set("x-robots-tag", "noindex, nofollow")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}

func adminError(w http.ResponseWriter, status int, message string) {
	adminJSON(w, status, map[string]string{"error": message})
}

func (s *Server) adminPage(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("cache-control", "no-store")
	w.Header().Set("x-robots-tag", "noindex, nofollow")
	w.Header().Set("content-type", "text/html; charset=utf-8")
	page, _ := staticFiles.ReadFile("static/admin.html")
	_, _ = w.Write(page)
}

func (a *adminManager) enabled(w http.ResponseWriter) bool {
	if a.settings.KeyHash == "" || a.settings.Origin == "" {
		adminError(w, http.StatusServiceUnavailable, "管理功能尚未啟用，請先在 Hub 執行管理頁啟用指令")
		return false
	}
	return true
}

func (a *adminManager) sameOrigin(w http.ResponseWriter, r *http.Request) bool {
	if r.Header.Get("Origin") != a.settings.Origin {
		adminError(w, http.StatusForbidden, "請從設定的探針 HTTPS 網址操作")
		return false
	}
	return true
}

func decodeAdminBody(w http.ResponseWriter, r *http.Request, value any) bool {
	if strings.TrimSpace(strings.Split(r.Header.Get("Content-Type"), ";")[0]) != "application/json" {
		adminError(w, http.StatusUnsupportedMediaType, "需要 JSON 格式")
		return false
	}
	r.Body = http.MaxBytesReader(w, r.Body, 4096)
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(value); err != nil {
		adminError(w, http.StatusBadRequest, "資料格式不正確")
		return false
	}
	if err := dec.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		adminError(w, http.StatusBadRequest, "資料格式不正確")
		return false
	}
	return true
}

func (a *adminManager) session(r *http.Request) (time.Time, bool) {
	cookie, err := r.Cookie(adminCookie)
	if err != nil || len(cookie.Value) != 64 {
		return time.Time{}, false
	}
	key := sha256.Sum256([]byte(cookie.Value))
	a.mu.Lock()
	defer a.mu.Unlock()
	expires, ok := a.sessions[key]
	if !ok || !time.Now().Before(expires) {
		delete(a.sessions, key)
		return time.Time{}, false
	}
	return expires, true
}

func (a *adminManager) requireSession(w http.ResponseWriter, r *http.Request) bool {
	if !a.enabled(w) {
		return false
	}
	if _, ok := a.session(r); !ok {
		adminError(w, http.StatusUnauthorized, "請先登入管理頁")
		return false
	}
	return true
}

func (s *Server) adminLogin(w http.ResponseWriter, r *http.Request) {
	a := s.admin
	if !a.enabled(w) || !a.sameOrigin(w, r) {
		return
	}
	var input struct {
		Password string `json:"password"`
	}
	if !decodeAdminBody(w, r, &input) {
		return
	}
	a.mu.Lock()
	defer a.mu.Unlock()
	now := time.Now()
	if now.Sub(a.loginWindow) >= time.Minute {
		a.loginWindow = now
		a.loginCount = 0
	}
	if a.loginCount >= 10 {
		w.Header().Set("retry-after", "60")
		adminError(w, http.StatusTooManyRequests, "登入嘗試過於頻繁，請稍候一分鐘")
		return
	}
	a.loginCount++
	provided := sha256.Sum256([]byte(input.Password))
	expected, err := hex.DecodeString(a.settings.KeyHash)
	if err != nil || len(expected) != sha256.Size || subtle.ConstantTimeCompare(provided[:], expected) != 1 {
		adminError(w, http.StatusUnauthorized, "管理密碼不正確")
		return
	}
	for key, expires := range a.sessions {
		if !now.Before(expires) {
			delete(a.sessions, key)
		}
	}
	if len(a.sessions) >= 32 {
		var oldest [32]byte
		var oldestTime time.Time
		for key, expires := range a.sessions {
			if oldestTime.IsZero() || expires.Before(oldestTime) {
				oldest, oldestTime = key, expires
			}
		}
		delete(a.sessions, oldest)
	}
	var random [32]byte
	if _, err := rand.Read(random[:]); err != nil {
		adminError(w, http.StatusInternalServerError, "暫時無法登入")
		return
	}
	value := hex.EncodeToString(random[:])
	expires := now.Add(adminSessionLifetime)
	a.sessions[sha256.Sum256([]byte(value))] = expires
	// A fresh session replaces the browser's previous one after authentication.
	if old, err := r.Cookie(adminCookie); err == nil {
		delete(a.sessions, sha256.Sum256([]byte(old.Value)))
	}
	http.SetCookie(w, &http.Cookie{Name: adminCookie, Value: value, Path: "/", Secure: true, HttpOnly: true, SameSite: http.SameSiteStrictMode, Expires: expires, MaxAge: int(adminSessionLifetime.Seconds())})
	adminJSON(w, http.StatusOK, map[string]any{"authenticated": true, "expires_at": expires.Unix()})
}

func (s *Server) adminLogout(w http.ResponseWriter, r *http.Request) {
	if !s.admin.enabled(w) || !s.admin.sameOrigin(w, r) {
		return
	}
	if cookie, err := r.Cookie(adminCookie); err == nil {
		s.admin.mu.Lock()
		delete(s.admin.sessions, sha256.Sum256([]byte(cookie.Value)))
		s.admin.mu.Unlock()
	}
	http.SetCookie(w, &http.Cookie{Name: adminCookie, Value: "", Path: "/", Secure: true, HttpOnly: true, SameSite: http.SameSiteStrictMode, MaxAge: -1})
	adminJSON(w, http.StatusOK, map[string]bool{"authenticated": false})
}

func (s *Server) adminSession(w http.ResponseWriter, r *http.Request) {
	if !s.admin.requireSession(w, r) {
		return
	}
	expires, _ := s.admin.session(r)
	adminJSON(w, http.StatusOK, map[string]any{"authenticated": true, "expires_at": expires.Unix()})
}

func (s *Server) adminNodes(w http.ResponseWriter, r *http.Request) {
	if !s.admin.requireSession(w, r) {
		return
	}
	adminJSON(w, http.StatusOK, map[string]any{"nodes": s.store.ManagedNodes()})
}

func (s *Server) adminRename(w http.ResponseWriter, r *http.Request) {
	if !s.admin.requireSession(w, r) || !s.admin.sameOrigin(w, r) {
		return
	}
	var input struct {
		Name         *string `json:"name"`
		ExpectedName *string `json:"expected_name"`
	}
	if !decodeAdminBody(w, r, &input) {
		return
	}
	if input.Name == nil || input.ExpectedName == nil {
		adminError(w, http.StatusBadRequest, "缺少節點名稱")
		return
	}
	if err := validDisplayName(strings.TrimSpace(*input.Name)); err != nil {
		adminError(w, http.StatusBadRequest, err.Error())
		return
	}
	node, err := s.store.RenameNode(r.PathValue("id"), *input.Name, *input.ExpectedName)
	switch {
	case errors.Is(err, errUnknownNode):
		adminError(w, http.StatusNotFound, err.Error())
	case errors.Is(err, errNameConflict):
		adminJSON(w, http.StatusConflict, map[string]any{"error": err.Error(), "node": node})
	case err != nil:
		s.logger.Print("node name save failed")
		adminError(w, http.StatusInternalServerError, "名稱儲存失敗，請確認 Hub 資料目錄可寫入；原名稱已保留")
	default:
		adminJSON(w, http.StatusOK, map[string]any{"node": node})
	}
}
