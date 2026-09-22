package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/agent"
	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

var version = "dev"

func main() {
	logger := log.New(os.Stdout, "pulse-agent: ", log.Ldate|log.Ltime|log.LUTC)
	hubURL := strings.TrimRight(os.Getenv("PULSE_HUB_URL"), "/")
	nodeID := os.Getenv("PULSE_NODE_ID")
	token := os.Getenv("PULSE_NODE_TOKEN")
	interval := durationEnv("PULSE_INTERVAL", 3*time.Second)
	if err := validate(hubURL, nodeID, token); err != nil {
		logger.Fatal(err)
	}
	collector, err := agent.NewCollector()
	if err != nil {
		logger.Fatalf("initialize collector: %v", err)
	}
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	client := &http.Client{Timeout: 10 * time.Second}
	prober := agent.NewProber()
	go prober.Run(ctx, client, hubURL, nodeID, token)
	logger.Printf("started node=%s interval=%s", nodeID, interval)
	// Establish CPU/network deltas before the first report.
	select {
	case <-ctx.Done():
		return
	case <-time.After(interval):
	}
	for {
		system, metrics, err := collector.Collect()
		if err != nil {
			logger.Printf("collect failed: %v", err)
		} else if err := send(ctx, client, hubURL, token, protocol.Report{
			NodeID: nodeID, AgentVersion: version, Timestamp: time.Now().Unix(),
			System: system, Metrics: metrics, Probes: prober.Snapshot(),
		}); err != nil {
			logger.Printf("report failed: %v", err)
		}
		select {
		case <-ctx.Done():
			return
		case <-time.After(interval):
		}
	}
}

func send(ctx context.Context, client *http.Client, hubURL, token string, report protocol.Report) error {
	body, err := json.Marshal(report)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, hubURL+"/api/v1/report", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("content-type", "application/json")
	req.Header.Set("authorization", "Bearer "+token)
	req.Header.Set("user-agent", "corenet-pulse-agent/"+version)
	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusNoContent {
		message, _ := io.ReadAll(io.LimitReader(res.Body, 512))
		return fmt.Errorf("hub returned %s: %s", res.Status, strings.TrimSpace(string(message)))
	}
	return nil
}

func validate(rawURL, nodeID, token string) error {
	if rawURL == "" || nodeID == "" || len(token) < 20 {
		return errors.New("PULSE_HUB_URL, PULSE_NODE_ID and a 20+ character PULSE_NODE_TOKEN are required")
	}
	u, err := url.Parse(rawURL)
	if err != nil || u.Host == "" {
		return errors.New("PULSE_HUB_URL is invalid")
	}
	if u.Scheme != "https" {
		local := u.Scheme == "http" && (u.Hostname() == "127.0.0.1" || u.Hostname() == "localhost")
		if !local && os.Getenv("PULSE_ALLOW_INSECURE") != "1" {
			return errors.New("PULSE_HUB_URL must use HTTPS")
		}
	}
	return nil
}

func durationEnv(name string, fallback time.Duration) time.Duration {
	raw := os.Getenv(name)
	if raw == "" {
		return fallback
	}
	if seconds, err := strconv.Atoi(raw); err == nil && seconds >= 2 {
		return time.Duration(seconds) * time.Second
	}
	if parsed, err := time.ParseDuration(raw); err == nil && parsed >= 2*time.Second {
		return parsed
	}
	return fallback
}
