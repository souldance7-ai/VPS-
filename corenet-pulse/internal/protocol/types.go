package protocol

type System struct {
	OS        string `json:"os"`
	Kernel    string `json:"kernel"`
	Arch      string `json:"arch"`
	CPUModel  string `json:"cpu_model"`
	CPUCores  int    `json:"cpu_cores"`
	MemTotal  uint64 `json:"mem_total"`
	DiskTotal uint64 `json:"disk_total"`
}

type Metrics struct {
	Uptime   uint64     `json:"uptime"`
	CPU      float64    `json:"cpu"`
	Load     [3]float64 `json:"load"`
	MemUsed  uint64     `json:"mem_used"`
	DiskUsed uint64     `json:"disk_used"`
	NetRX    uint64     `json:"net_rx"`
	NetTX    uint64     `json:"net_tx"`
	TotalRX  uint64     `json:"total_rx"`
	TotalTX  uint64     `json:"total_tx"`
	TCP      int        `json:"tcp"`
	UDP      int        `json:"udp"`
	Procs    int        `json:"procs"`
}

type Report struct {
	NodeID       string  `json:"node_id"`
	AgentVersion string  `json:"agent_version"`
	Timestamp    int64   `json:"timestamp"`
	System       System  `json:"system"`
	Metrics      Metrics `json:"metrics"`
}
