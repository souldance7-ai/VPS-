.PHONY: build test run-hub run-agent

build:
	mkdir -p bin
	CGO_ENABLED=0 go build -buildvcs=false -trimpath -ldflags="-s -w" -o bin/corenet-pulse-hub ./cmd/hub
	CGO_ENABLED=0 go build -buildvcs=false -trimpath -ldflags="-s -w" -o bin/corenet-pulse-agent ./cmd/agent

test:
	go test ./...

run-hub:
	PULSE_CONFIG=configs/hub.example.json AWS_JP_TOKEN=dev-aws-token-change-me CHT_CHANGHUA_TOKEN=dev-cht-token-change-me go run ./cmd/hub

run-agent:
	go run ./cmd/agent
