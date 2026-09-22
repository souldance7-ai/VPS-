package protocol

import "net/netip"

// Addresses travel only over the authenticated Agent configuration endpoint.
// A result contains a slot identifier, never an address or command output.
type ProbeTarget struct {
	ID      string `json:"id"`
	Address string `json:"address"`
}

type ProbePlan struct {
	Revision        string        `json:"revision"`
	IntervalSeconds int           `json:"interval_seconds"`
	Targets         []ProbeTarget `json:"targets"`
}

type ProbeReport struct {
	Revision string       `json:"revision"`
	Results  []PingResult `json:"results"`
}

type PingResult struct {
	TargetID       string  `json:"target_id"`
	CheckedAt      int64   `json:"checked_at"`
	Status         string  `json:"status"`
	Sent           int     `json:"sent"`
	Received       int     `json:"received"`
	AvgMS          float64 `json:"avg_ms"`
	MinMS          float64 `json:"min_ms"`
	MaxMS          float64 `json:"max_ms"`
	WindowSent     int     `json:"window_sent"`
	WindowReceived int     `json:"window_received"`
}

func KnownProbeID(id string) bool {
	switch id {
	case "sh-ct", "sh-cu", "sh-cm", "ah-ct", "ah-cu", "ah-cm":
		return true
	}
	return false
}

// IP literals avoid DNS rebinding. Block private, local, transition, and special
// purpose destinations, even when a privileged user changes a reference target.
func PublicProbeAddress(raw string) bool {
	a, err := netip.ParseAddr(raw)
	if err != nil || a.Zone() != "" {
		return false
	}
	a = a.Unmap()
	if !a.IsGlobalUnicast() || a.IsPrivate() || a.IsLoopback() || a.IsLinkLocalUnicast() {
		return false
	}
	for _, prefix := range nonPublicProbeRanges {
		if prefix.Contains(a) {
			return false
		}
	}
	return true
}

var nonPublicProbeRanges = func() []netip.Prefix {
	var result []netip.Prefix
	for _, value := range []string{
		"0.0.0.0/8", "100.64.0.0/10", "192.0.0.0/24", "192.0.2.0/24", "192.88.99.0/24",
		"198.18.0.0/15", "198.51.100.0/24", "203.0.113.0/24", "240.0.0.0/4",
		"::/96", "64:ff9b::/96", "64:ff9b:1::/48", "100::/64", "2001::/23", "2001:db8::/32", "2002::/16", "3fff::/20",
	} {
		result = append(result, netip.MustParsePrefix(value))
	}
	return result
}()
