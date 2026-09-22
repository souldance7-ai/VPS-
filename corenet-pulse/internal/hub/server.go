package hub

import (
	"crypto/subtle"
	"embed"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

//go:embed static/*
var staticFiles embed.FS

type Server struct {
	store  *Store
	logger *log.Logger
	mux    *http.ServeMux
	admin  *adminManager
}

func NewServer(cfg Config, logger *log.Logger) *Server {
	s := &Server{store: NewStore(cfg), logger: logger, mux: http.NewServeMux()}
	s.admin = newAdminManager(cfg.Admin)
	s.registerAdminRoutes()
	s.registerProbeRoutes()
	s.mux.HandleFunc("GET /healthz", s.health)
	s.mux.HandleFunc("GET /api/public/state", s.publicState)
	s.mux.HandleFunc("GET /api/public/events", s.events)
	s.mux.HandleFunc("POST /api/v1/report", s.report)
	assets, _ := fs.Sub(staticFiles, "static")
	s.mux.Handle("/", http.FileServer(http.FS(assets)))
	return s
}

func (s *Server) Handler() http.Handler {
	return securityHeaders(s.mux)
}

func (s *Server) Store() *Store { return s.store }

func (s *Server) health(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("content-type", "application/json")
	_, _ = io.WriteString(w, `{"status":"ok"}`)
}

func (s *Server) publicState(w http.ResponseWriter, r *http.Request) {
	historyLimit := -1
	if raw := r.URL.Query().Get("history"); raw != "" {
		limit, err := strconv.Atoi(raw)
		if err != nil || limit < 0 || limit > 120 {
			http.Error(w, "history must be between 0 and 120", http.StatusBadRequest)
			return
		}
		historyLimit = limit
	}
	w.Header().Set("content-type", "application/json; charset=utf-8")
	w.Header().Set("cache-control", "no-store")
	_ = json.NewEncoder(w).Encode(s.store.StateWithHistory(time.Now(), historyLimit))
}

func (s *Server) report(w http.ResponseWriter, r *http.Request) {
	if ct := r.Header.Get("content-type"); !strings.HasPrefix(ct, "application/json") {
		http.Error(w, "content-type must be application/json", http.StatusUnsupportedMediaType)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, 128<<10)
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	var report protocol.Report
	if err := dec.Decode(&report); err != nil {
		http.Error(w, "invalid report", http.StatusBadRequest)
		return
	}
	if err := dec.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		http.Error(w, "invalid trailing data", http.StatusBadRequest)
		return
	}
	node, ok := s.store.Node(report.NodeID)
	if !ok || !validBearer(r.Header.Get("authorization"), node.Token) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	if report.Timestamp == 0 || report.Timestamp > time.Now().Add(5*time.Minute).Unix() || report.Timestamp < time.Now().Add(-24*time.Hour).Unix() {
		http.Error(w, "invalid timestamp", http.StatusBadRequest)
		return
	}
	report.Metrics.CPU = clamp(report.Metrics.CPU)
	if !validProbeReport(report.Probes, time.Now()) {
		http.Error(w, "invalid probe report", http.StatusBadRequest)
		return
	}
	s.store.Update(report)
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) events(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "text/event-stream")
	w.Header().Set("cache-control", "no-cache, no-transform")
	w.Header().Set("x-accel-buffering", "no")
	updates, cancel := s.store.Subscribe()
	defer cancel()
	_, _ = io.WriteString(w, "event: ready\ndata: {}\n\n")
	flusher.Flush()
	keepalive := time.NewTicker(20 * time.Second)
	defer keepalive.Stop()
	for {
		select {
		case <-r.Context().Done():
			return
		case <-updates:
			_, _ = io.WriteString(w, "event: update\ndata: {}\n\n")
			flusher.Flush()
		case <-keepalive.C:
			_, _ = io.WriteString(w, ": keepalive\n\n")
			flusher.Flush()
		}
	}
}

func validBearer(header, token string) bool {
	const prefix = "Bearer "
	if !strings.HasPrefix(header, prefix) {
		return false
	}
	provided := strings.TrimSpace(strings.TrimPrefix(header, prefix))
	if len(provided) != len(token) {
		return false
	}
	return subtle.ConstantTimeCompare([]byte(provided), []byte(token)) == 1
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("content-security-policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
		w.Header().Set("referrer-policy", "no-referrer")
		w.Header().Set("x-content-type-options", "nosniff")
		w.Header().Set("x-frame-options", "DENY")
		w.Header().Set("permissions-policy", "geolocation=(), microphone=(), camera=()")
		next.ServeHTTP(w, r)
	})
}

func ListenAndServe(cfg Config, logger *log.Logger) error {
	srv := &http.Server{
		Addr:              cfg.Listen,
		Handler:           NewServer(cfg, logger).Handler(),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      35 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	logger.Printf("CORENET Pulse hub listening on %s with %d nodes", cfg.Listen, len(cfg.Nodes))
	return fmt.Errorf("hub stopped: %w", srv.ListenAndServe())
}
