package agent

import "testing"

func TestCPUPercent(t *testing.T) {
	got := cpuPercent(cpuSample{total: 100, idle: 80}, cpuSample{total: 200, idle: 140})
	if got != 40 {
		t.Fatalf("cpuPercent=%v want=40", got)
	}
}

func TestRateHandlesCounterReset(t *testing.T) {
	if got := rate(200, 100, 2); got != 0 {
		t.Fatalf("reset rate=%d want=0", got)
	}
	if got := rate(100, 300, 2); got != 100 {
		t.Fatalf("rate=%d want=100", got)
	}
}
