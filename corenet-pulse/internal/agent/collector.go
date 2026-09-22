package agent

import (
	"bufio"
	"errors"
	"os"
	"runtime"
	"strconv"
	"strings"
	"syscall"
	"time"
	"unicode"

	"github.com/souldance7-ai/VPS-/corenet-pulse/internal/protocol"
)

type cpuSample struct{ total, idle uint64 }
type netSample struct {
	rx, tx uint64
	at     time.Time
}

type Collector struct {
	previousCPU cpuSample
	previousNet netSample
	system      protocol.System
}

func NewCollector() (*Collector, error) {
	cpu, err := readCPU()
	if err != nil {
		return nil, err
	}
	rx, tx, err := readNetwork()
	if err != nil {
		return nil, err
	}
	system, err := readSystem()
	if err != nil {
		return nil, err
	}
	return &Collector{
		previousCPU: cpu,
		previousNet: netSample{rx: rx, tx: tx, at: time.Now()},
		system:      system,
	}, nil
}

func (c *Collector) Collect() (protocol.System, protocol.Metrics, error) {
	now := time.Now()
	cpu, err := readCPU()
	if err != nil {
		return c.system, protocol.Metrics{}, err
	}
	rx, tx, err := readNetwork()
	if err != nil {
		return c.system, protocol.Metrics{}, err
	}
	memTotal, memUsed, err := readMemory()
	if err != nil {
		return c.system, protocol.Metrics{}, err
	}
	diskTotal, diskUsed, err := readDisk()
	if err != nil {
		return c.system, protocol.Metrics{}, err
	}
	load, err := readLoad()
	if err != nil {
		return c.system, protocol.Metrics{}, err
	}
	uptime, err := readUptime()
	if err != nil {
		return c.system, protocol.Metrics{}, err
	}
	dt := now.Sub(c.previousNet.at).Seconds()
	if dt < 0.1 {
		dt = 0.1
	}
	m := protocol.Metrics{
		Uptime:   uptime,
		CPU:      cpuPercent(c.previousCPU, cpu),
		Load:     load,
		MemUsed:  memUsed,
		DiskUsed: diskUsed,
		NetRX:    rate(c.previousNet.rx, rx, dt),
		NetTX:    rate(c.previousNet.tx, tx, dt),
		TotalRX:  rx,
		TotalTX:  tx,
		TCP:      countSockets("/proc/net/tcp") + countSockets("/proc/net/tcp6"),
		UDP:      countSockets("/proc/net/udp") + countSockets("/proc/net/udp6"),
		Procs:    countProcesses(),
	}
	c.system.MemTotal = memTotal
	c.system.DiskTotal = diskTotal
	c.previousCPU = cpu
	c.previousNet = netSample{rx: rx, tx: tx, at: now}
	return c.system, m, nil
}

func readSystem() (protocol.System, error) {
	var u syscall.Utsname
	if err := syscall.Uname(&u); err != nil {
		return protocol.System{}, err
	}
	return protocol.System{
		OS: readOSName(), Kernel: chars(u.Release[:]), Arch: runtime.GOARCH,
		CPUModel: readCPUModel(), CPUCores: runtime.NumCPU(),
	}, nil
}

func readCPU() (cpuSample, error) {
	f, err := os.Open("/proc/stat")
	if err != nil {
		return cpuSample{}, err
	}
	defer f.Close()
	s := bufio.NewScanner(f)
	if !s.Scan() {
		return cpuSample{}, errors.New("missing /proc/stat cpu line")
	}
	fields := strings.Fields(s.Text())
	if len(fields) < 5 || fields[0] != "cpu" {
		return cpuSample{}, errors.New("invalid /proc/stat cpu line")
	}
	var values []uint64
	for _, field := range fields[1:] {
		v, err := strconv.ParseUint(field, 10, 64)
		if err != nil {
			return cpuSample{}, err
		}
		values = append(values, v)
	}
	var total uint64
	for _, v := range values {
		total += v
	}
	idle := values[3]
	if len(values) > 4 {
		idle += values[4]
	}
	return cpuSample{total: total, idle: idle}, nil
}

func cpuPercent(old, next cpuSample) float64 {
	if next.total <= old.total {
		return 0
	}
	total := next.total - old.total
	idle := next.idle - old.idle
	return float64(total-idle) / float64(total) * 100
}

func readMemory() (uint64, uint64, error) {
	f, err := os.Open("/proc/meminfo")
	if err != nil {
		return 0, 0, err
	}
	defer f.Close()
	var total, available uint64
	s := bufio.NewScanner(f)
	for s.Scan() {
		fields := strings.Fields(s.Text())
		if len(fields) < 2 {
			continue
		}
		v, _ := strconv.ParseUint(fields[1], 10, 64)
		switch strings.TrimSuffix(fields[0], ":") {
		case "MemTotal":
			total = v * 1024
		case "MemAvailable":
			available = v * 1024
		}
	}
	if total == 0 {
		return 0, 0, errors.New("MemTotal missing")
	}
	if available > total {
		available = total
	}
	return total, total - available, s.Err()
}

func readDisk() (uint64, uint64, error) {
	var stat syscall.Statfs_t
	if err := syscall.Statfs("/", &stat); err != nil {
		return 0, 0, err
	}
	total := stat.Blocks * uint64(stat.Bsize)
	available := stat.Bavail * uint64(stat.Bsize)
	return total, total - available, nil
}

func readNetwork() (uint64, uint64, error) {
	f, err := os.Open("/proc/net/dev")
	if err != nil {
		return 0, 0, err
	}
	defer f.Close()
	var rx, tx uint64
	s := bufio.NewScanner(f)
	for s.Scan() {
		line := strings.TrimSpace(s.Text())
		if !strings.Contains(line, ":") {
			continue
		}
		parts := strings.SplitN(line, ":", 2)
		if strings.TrimSpace(parts[0]) == "lo" {
			continue
		}
		fields := strings.Fields(parts[1])
		if len(fields) < 9 {
			continue
		}
		r, e1 := strconv.ParseUint(fields[0], 10, 64)
		t, e2 := strconv.ParseUint(fields[8], 10, 64)
		if e1 == nil && e2 == nil {
			rx += r
			tx += t
		}
	}
	return rx, tx, s.Err()
}

func readLoad() ([3]float64, error) {
	var out [3]float64
	raw, err := os.ReadFile("/proc/loadavg")
	if err != nil {
		return out, err
	}
	fields := strings.Fields(string(raw))
	if len(fields) < 3 {
		return out, errors.New("invalid /proc/loadavg")
	}
	for i := range out {
		out[i], err = strconv.ParseFloat(fields[i], 64)
		if err != nil {
			return out, err
		}
	}
	return out, nil
}

func readUptime() (uint64, error) {
	raw, err := os.ReadFile("/proc/uptime")
	if err != nil {
		return 0, err
	}
	value, err := strconv.ParseFloat(strings.Fields(string(raw))[0], 64)
	return uint64(value), err
}

func readOSName() string {
	raw, err := os.ReadFile("/etc/os-release")
	if err != nil {
		return "Linux"
	}
	for _, line := range strings.Split(string(raw), "\n") {
		if strings.HasPrefix(line, "PRETTY_NAME=") {
			return strings.Trim(strings.TrimPrefix(line, "PRETTY_NAME="), `"`)
		}
	}
	return "Linux"
}

func readCPUModel() string {
	raw, err := os.ReadFile("/proc/cpuinfo")
	if err != nil {
		return ""
	}
	for _, line := range strings.Split(string(raw), "\n") {
		parts := strings.SplitN(line, ":", 2)
		if len(parts) == 2 && (strings.TrimSpace(parts[0]) == "model name" || strings.TrimSpace(parts[0]) == "Hardware") {
			return strings.Join(strings.Fields(parts[1]), " ")
		}
	}
	return ""
}

func countSockets(path string) int {
	f, err := os.Open(path)
	if err != nil {
		return 0
	}
	defer f.Close()
	count := -1
	s := bufio.NewScanner(f)
	for s.Scan() {
		count++
	}
	if count < 0 {
		return 0
	}
	return count
}

func countProcesses() int {
	entries, err := os.ReadDir("/proc")
	if err != nil {
		return 0
	}
	count := 0
	for _, e := range entries {
		if e.IsDir() && strings.IndexFunc(e.Name(), func(r rune) bool { return !unicode.IsDigit(r) }) == -1 {
			count++
		}
	}
	return count
}

func chars[T ~int8](v []T) string {
	b := make([]byte, 0, len(v))
	for _, c := range v {
		if c == 0 {
			break
		}
		b = append(b, byte(c))
	}
	return string(b)
}

func rate(previous, current uint64, seconds float64) uint64 {
	if current < previous {
		return 0
	}
	return uint64(float64(current-previous) / seconds)
}
