package hub

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"sort"
	"strings"
)

type SiteConfig struct {
	Name     string `json:"name"`
	Subtitle string `json:"subtitle"`
}

type NodeConfig struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Region   string `json:"region"`
	Country  string `json:"country"`
	Provider string `json:"provider"`
	Network  string `json:"network"`
	Plan     string `json:"plan"`
	Sort     int    `json:"sort"`
	Token    string `json:"token"`
}

type Config struct {
	Listen            string            `json:"listen"`
	StaleAfterSeconds int               `json:"stale_after_seconds"`
	HistoryPoints     int               `json:"history_points"`
	Site              SiteConfig        `json:"site"`
	Nodes             []NodeConfig      `json:"nodes"`
	Admin             AdminSettings     `json:"-"`
	LabelsPath        string            `json:"-"`
	NameOverrides     map[string]string `json:"-"`
	ProbesPath        string            `json:"-"`
	Probes            probeConfig       `json:"-"`
}

func LoadConfig(path string) (Config, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return Config{}, err
	}
	expanded := os.ExpandEnv(string(raw))
	var cfg Config
	if err := json.Unmarshal([]byte(expanded), &cfg); err != nil {
		return Config{}, fmt.Errorf("parse config: %w", err)
	}
	if cfg.Listen == "" {
		cfg.Listen = "127.0.0.1:9800"
	}
	if cfg.StaleAfterSeconds <= 0 {
		cfg.StaleAfterSeconds = 15
	}
	if cfg.HistoryPoints < 30 {
		cfg.HistoryPoints = 120
	}
	if cfg.Site.Name == "" {
		cfg.Site.Name = "CORENET PULSE"
	}
	seen := make(map[string]bool, len(cfg.Nodes))
	for i := range cfg.Nodes {
		n := &cfg.Nodes[i]
		n.ID = strings.TrimSpace(n.ID)
		if n.ID == "" || n.Name == "" {
			return Config{}, errors.New("every node requires id and name")
		}
		if seen[n.ID] {
			return Config{}, fmt.Errorf("duplicate node id %q", n.ID)
		}
		seen[n.ID] = true
		if len(n.Token) < 20 || strings.Contains(n.Token, "${") {
			return Config{}, fmt.Errorf("node %q token is missing or shorter than 20 characters", n.ID)
		}
	}
	sort.SliceStable(cfg.Nodes, func(i, j int) bool { return cfg.Nodes[i].Sort < cfg.Nodes[j].Sort })
	if err := loadManagementSettings(&cfg); err != nil {
		return Config{}, err
	}
	if err := loadProbeSettings(&cfg); err != nil {
		return Config{}, err
	}
	return cfg, nil
}
