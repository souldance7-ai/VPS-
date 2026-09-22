package main

import (
	"log"
	"os"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/hub"
)

func main() {
	logger := log.New(os.Stdout, "pulse-hub: ", log.Ldate|log.Ltime|log.LUTC)
	path := os.Getenv("PULSE_CONFIG")
	if path == "" {
		path = "/etc/corenet-pulse/hub.json"
	}
	cfg, err := hub.LoadConfig(path)
	if err != nil {
		logger.Fatalf("load %s: %v", path, err)
	}
	if err := hub.ListenAndServe(cfg, logger); err != nil {
		logger.Fatal(err)
	}
}
