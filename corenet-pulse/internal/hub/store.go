package hub

import (
	"net"
	"regexp"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

type historyPoint struct {
	Timestamp int64   `json:"timestamp"`
	CPU       float64 `json:"cpu"`
	Memory    float64 `json:"memory"`
	Disk      float64 `json:"disk"`
	NetRX     uint64  `json:"net_rx"`
	NetTX     uint64  `json:"net_tx"`
}

type nodeRuntime struct {
	LastSeen int64
	Report   protocol.Report
	History  []historyPoint
}

type publicSite struct {
	Name     string `json:"name"`
	Subtitle string `json:"subtitle"`
}

type publicSummary struct {
	Online int    `json:"online"`
	Total  int    `json:"total"`
	NetRX  uint64 `json:"net_rx"`
	NetTX  uint64 `json:"net_tx"`
}

// publicNode is deliberately allow-listed. Sensitive config fields, HTTP peer
// addresses and machine hostnames cannot leak through accidental JSON encoding.
type publicNode struct {
	ID           string            `json:"id"`
	Name         string            `json:"name"`
	Region       string            `json:"region"`
	Country      string            `json:"country"`
	Provider     string            `json:"provider"`
	Network      string            `json:"network"`
	Plan         string            `json:"plan"`
	Online       bool              `json:"online"`
	LastSeen     int64             `json:"last_seen"`
	AgentVersion string            `json:"agent_version,omitempty"`
	System       *protocol.System  `json:"system,omitempty"`
	Metrics      *protocol.Metrics `json:"metrics,omitempty"`
	History      []historyPoint    `json:"history"`
}

type publicState struct {
	GeneratedAt int64         `json:"generated_at"`
	Site        publicSite    `json:"site"`
	Summary     publicSummary `json:"summary"`
	Nodes       []publicNode  `json:"nodes"`
}

type Store struct {
	mu          sync.RWMutex
	cfg         Config
	runtime     map[string]*nodeRuntime
	subscribers map[chan struct{}]struct{}
}

var (
	ipv4Pattern   = regexp.MustCompile(`\b(?:\d{1,3}\.){3}\d{1,3}\b`)
	ipv6Candidate = regexp.MustCompile(`(?i)[0-9a-f]*:[0-9a-f:]+`)
)

func NewStore(cfg Config) *Store {
	return &Store{
		cfg:         cfg,
		runtime:     make(map[string]*nodeRuntime),
		subscribers: make(map[chan struct{}]struct{}),
	}
}

func (s *Store) Node(id string) (NodeConfig, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, n := range s.cfg.Nodes {
		if n.ID == id {
			return n, true
		}
	}
	return NodeConfig{}, false
}

func (s *Store) Update(report protocol.Report) {
	now := time.Now().Unix()
	s.mu.Lock()
	rt := s.runtime[report.NodeID]
	if rt == nil {
		rt = &nodeRuntime{}
		s.runtime[report.NodeID] = rt
	}
	rt.LastSeen = now
	rt.Report = report
	memPct := percentage(report.Metrics.MemUsed, report.System.MemTotal)
	diskPct := percentage(report.Metrics.DiskUsed, report.System.DiskTotal)
	rt.History = append(rt.History, historyPoint{
		Timestamp: now,
		CPU:       clamp(report.Metrics.CPU),
		Memory:    memPct,
		Disk:      diskPct,
		NetRX:     report.Metrics.NetRX,
		NetTX:     report.Metrics.NetTX,
	})
	if extra := len(rt.History) - s.cfg.HistoryPoints; extra > 0 {
		rt.History = append([]historyPoint(nil), rt.History[extra:]...)
	}
	for ch := range s.subscribers {
		select {
		case ch <- struct{}{}:
		default:
		}
	}
	s.mu.Unlock()
}

func (s *Store) State(now time.Time) publicState {
	s.mu.RLock()
	defer s.mu.RUnlock()
	state := publicState{
		GeneratedAt: now.Unix(),
		Site:        publicSite{Name: redactNetworkIdentifiers(s.cfg.Site.Name), Subtitle: redactNetworkIdentifiers(s.cfg.Site.Subtitle)},
		Summary:     publicSummary{Total: len(s.cfg.Nodes)},
		Nodes:       make([]publicNode, 0, len(s.cfg.Nodes)),
	}
	for _, n := range s.cfg.Nodes {
		pn := publicNode{
			ID: redactNetworkIdentifiers(n.ID), Name: redactNetworkIdentifiers(n.Name), Region: redactNetworkIdentifiers(n.Region), Country: redactNetworkIdentifiers(n.Country),
			Provider: redactNetworkIdentifiers(n.Provider), Network: redactNetworkIdentifiers(n.Network), Plan: redactNetworkIdentifiers(n.Plan),
			History: []historyPoint{},
		}
		if rt := s.runtime[n.ID]; rt != nil {
			pn.LastSeen = rt.LastSeen
			pn.Online = now.Unix()-rt.LastSeen <= int64(s.cfg.StaleAfterSeconds)
			pn.AgentVersion = rt.Report.AgentVersion
			systemCopy := rt.Report.System
			systemCopy.OS = redactNetworkIdentifiers(systemCopy.OS)
			systemCopy.Kernel = redactNetworkIdentifiers(systemCopy.Kernel)
			systemCopy.Arch = redactNetworkIdentifiers(systemCopy.Arch)
			systemCopy.CPUModel = redactNetworkIdentifiers(systemCopy.CPUModel)
			metricsCopy := rt.Report.Metrics
			pn.System = &systemCopy
			pn.Metrics = &metricsCopy
			pn.History = append([]historyPoint(nil), rt.History...)
			if pn.Online {
				state.Summary.Online++
				state.Summary.NetRX += metricsCopy.NetRX
				state.Summary.NetTX += metricsCopy.NetTX
			}
		}
		state.Nodes = append(state.Nodes, pn)
	}
	sort.SliceStable(state.Nodes, func(i, j int) bool {
		return nodeSort(s.cfg.Nodes, state.Nodes[i].ID) < nodeSort(s.cfg.Nodes, state.Nodes[j].ID)
	})
	return state
}

func redactNetworkIdentifiers(value string) string {
	value = ipv4Pattern.ReplaceAllString(value, "[redacted]")
	value = ipv6Candidate.ReplaceAllStringFunc(value, func(candidate string) string {
		if strings.Count(candidate, ":") >= 2 && net.ParseIP(candidate) != nil {
			return "[redacted]"
		}
		return candidate
	})
	return strings.TrimSpace(value)
}

func (s *Store) Subscribe() (<-chan struct{}, func()) {
	ch := make(chan struct{}, 1)
	s.mu.Lock()
	s.subscribers[ch] = struct{}{}
	s.mu.Unlock()
	return ch, func() {
		s.mu.Lock()
		delete(s.subscribers, ch)
		close(ch)
		s.mu.Unlock()
	}
}

func percentage(used, total uint64) float64 {
	if total == 0 {
		return 0
	}
	return clamp(float64(used) / float64(total) * 100)
}

func clamp(v float64) float64 {
	if v < 0 {
		return 0
	}
	if v > 100 {
		return 100
	}
	return v
}

func nodeSort(nodes []NodeConfig, id string) int {
	for _, n := range nodes {
		if n.ID == id {
			return n.Sort
		}
	}
	return 0
}
