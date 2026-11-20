'use strict';

// Published review snapshots. SKU-specific live quotes are attached by the stock monitor.
Object.assign(MARKETS, {
  ES: {sc:'西班牙',tc:'西班牙',en:'Spain',ja:'スペイン'},
  MY: {sc:'马来西亚',tc:'馬來西亞',en:'Malaysia',ja:'マレーシア'},
  TR: {sc:'土耳其',tc:'土耳其',en:'Türkiye',ja:'トルコ'},
  AU: {sc:'澳大利亚',tc:'澳洲',en:'Australia',ja:'オーストラリア'},
  TH: {sc:'泰国',tc:'泰國',en:'Thailand',ja:'タイ'}
});
const MEOW_REPORTS = [];
(() => {
  const reviews = [
    {
      slug: "goldcloudde",
      provider: "GoldCloud",
      market: "DE",
      city: "Germany",
      series: "DE-DC1",
      official: "https://my.goldcloud.dev/products/category/e4725c11a4",
      date: "2026-11-19",
      network: "GoldCloud DC1 · SSD",
      summary: {"sc":"德国 DC1 各档均为 25 Mbps，升级主要增加内存、核心与 SSD。","tc":"德國 DC1 各級均為 25 Mbps，升級主要增加記憶體、核心與 SSD。","en":"The listed DC1 tiers share a 25 Mbps port. CPU, RAM and SSD capacity distinguish the tiers.","ja":"DC1 は全掲載構成が25 Mbps。プラン間でCPU・メモリ・SSD容量が異なります。"},
      values: [],
      plans: [
        {"i":1,"sku":"DE-DC1 2H2 GB","cpu":"2 vCPU","ram":"2 GB","disk":"40 GB SSD","port":"25 Mbps","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"37.50","currency":"CNY","term":"month"},
        {"i":2,"sku":"DE-DC1 2H4 GB","cpu":"2 vCPU","ram":"4 GB","disk":"50 GB SSD","port":"25 Mbps","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"52.50","currency":"CNY","term":"month"},
        {"i":3,"sku":"DE-DC1 4H4 GB","cpu":"4 vCPU","ram":"4 GB","disk":"60 GB SSD","port":"25 Mbps","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"67.50","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "ppflightlift",
      provider: "PPFlight",
      market: "LAX",
      city: "Los Angeles",
      series: "LIFT",
      official: "https://www.ppflight.com/",
      date: "2026-11-18",
      network: "CN2 / AS9929 / CMIN2",
      summary: {"sc":"样机为洛杉矶 LIFT S2。原文按电信、联通和移动分别记录往返路径。","tc":"樣機為洛杉磯 LIFT S2。原文按電信、聯通和移動分別記錄往返路徑。","en":"The Los Angeles sample was LIFT S2. The report traces paths for China Telecom, Unicom and Mobile.","ja":"ロサンゼルスの測定機は LIFT S2。中国電信・聯通・移動の経路を個別に確認できます。"},
      values: [],
      plans: [
        {"i":1,"sku":"LIFT S2","cpu":"1 vCPU","ram":"768 MB","disk":"10 GiB","port":"300 Mbps","traffic":{"sc":"500 GB · 上下行合计","tc":"500 GB · 上下行合計","en":"500 GB · in + out","ja":"500 GB・送受信合計"},"price":"5.49","currency":"USD","term":"month"},
        {"i":2,"sku":"LIFT MINIMO2","cpu":"1 vCPU","ram":"1 GB","disk":"10 GiB","port":"300 Mbps","traffic":{"sc":"1000 GB · 上下行合计","tc":"1000 GB · 上下行合計","en":"1000 GB · in + out","ja":"1000 GB・送受信合計"},"price":"8.99","currency":"USD","term":"month"},
        {"i":3,"sku":"LIFT M2","cpu":"1 vCPU","ram":"2 GB","disk":"20 GiB","port":"350 Mbps","traffic":{"sc":"1200 GB · 上下行合计","tc":"1200 GB · 上下行合計","en":"1200 GB · in + out","ja":"1200 GB・送受信合計"},"price":"9.99","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "bocchijp",
      provider: "Bocchi",
      market: "JP",
      city: "Tokyo",
      series: "Tokyo Pulse",
      official: "https://bocchi.sh/store/tokyo-pulse-performance",
      date: "2026-11-14",
      network: "Ryzen 9 9950X / DDR5 / NVMe",
      summary: {"sc":"东京实测采用 TYO-Pulse 2。产品表按 CPU、内存和月流量区分四档。","tc":"東京實測採用 TYO-Pulse 2。產品表按 CPU、記憶體和月流量區分四級。","en":"TYO-Pulse 2 was the tested Tokyo model. The four tiers differ in CPU, memory and transfer quota.","ja":"東京の測定機は TYO-Pulse 2。4構成のCPU・メモリ・転送量を比較できます。"},
      values: [],
      plans: [
        {"i":1,"sku":"TYO-Pulse 1","cpu":"1 vCPU","ram":"2 GB","disk":"35 GB","port":"1 Gbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"7.49","currency":"USD","term":"month"},
        {"i":2,"sku":"TYO-Pulse 2","cpu":"2 vCPU","ram":"4 GB","disk":"60 GB","port":"1 Gbps","traffic":{"sc":"8 TB · 上下行合计","tc":"8 TB · 上下行合計","en":"8 TB · in + out","ja":"8 TB・送受信合計"},"price":"14.49","currency":"USD","term":"month"},
        {"i":3,"sku":"TYO-Pulse 3","cpu":"4 vCPU","ram":"8 GB","disk":"120 GB","port":"1 Gbps","traffic":{"sc":"16 TB · 上下行合计","tc":"16 TB · 上下行合計","en":"16 TB · in + out","ja":"16 TB・送受信合計"},"price":"28.49","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "666cloudsph",
      provider: "666Clouds",
      market: "PH",
      city: "Philippines",
      series: "Philippines Dual ISP",
      official: "https://666clouds.com/",
      date: "2026-11-13",
      network: "Dual ISP",
      summary: {"sc":"菲律宾双 ISP 系列区分 200 和 300 Mbps，月配额计入上下行。","tc":"菲律賓雙 ISP 系列分為 200 與 300 Mbps，月配額計入上下行。","en":"The Philippine dual-ISP plans have 200 and 300 Mbps ports, with both directions counted.","ja":"フィリピンのデュアルISPは200・300 Mbpsの2構成。転送量は送受信合計です。"},
      values: [],
      plans: [
        {"i":1,"sku":"PH Dual ISP 1C1G","cpu":"1 vCPU","ram":"1 GB","disk":"15 GB","port":"200 Mbps","traffic":{"sc":"1 TB · 上下行合计","tc":"1 TB · 上下行合計","en":"1 TB · in + out","ja":"1 TB・送受信合計"},"price":"80","currency":"CNY","term":"month"},
        {"i":2,"sku":"PH Dual ISP 2C2G","cpu":"2 vCPU","ram":"2 GB","disk":"20 GB","port":"300 Mbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"160","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "usvps24proup",
      provider: "USVPS24",
      market: "US",
      city: "United States",
      series: "AT&T PRO",
      official: "https://usvps24.com/",
      date: "2026-11-12",
      network: "AT&T Business",
      summary: {"sc":"AT&T 商宽 PRO 含 2TB 单向高速流量，达到配额后限至 4 MB/s。","tc":"AT&T 商寬 PRO 含 2TB 單向高速流量，達到配額後限至 4 MB/s。","en":"The AT&T Business PRO plan has 2 TB of high-speed transfer in one direction, then throttles to 4 MB/s.","ja":"AT&T Business PRO の高速枠は片方向2 TB。消化後は4 MB/sです。"},
      values: [],
      plans: [
        {"i":1,"sku":"AT&T PRO Gateway","cpu":"2 vCPU","ram":"2 GB","disk":"20 GB","port":"200 Mbps","traffic":{"sc":"2 TB 单向 · 超量 4 MB/s","tc":"2 TB 單向 · 超量 4 MB/s","en":"2 TB one direction, then 4 MB/s","ja":"片方向2 TB、超過後4 MB/s"},"price":"200","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "nexkrskb",
      provider: "NexKr",
      market: "KR",
      city: "South Korea",
      series: "SKB-IPv4-Max",
      official: "https://nexkr.sh/",
      date: "2026-11-11",
      network: "SK Broadband / AS9318",
      summary: {"sc":"SK Broadband VDS 有 60 TB 出站额度，超量降至 10 Mbps。","tc":"SK Broadband VDS 有 60 TB 出站額度，超量降至 10 Mbps。","en":"The SK Broadband VDS includes 60 TB outbound and drops to 10 Mbps after the quota.","ja":"SK Broadband VDS は送信60 TBまで。超過後は10 Mbpsです。"},
      values: ["residential","isp"],
      plans: [
        {"i":1,"sku":"SKB-IPv4-Max","cpu":"4 vCPU","ram":"4 GB","disk":"32 GB NVMe","port":"2000 Mbps","traffic":{"sc":"60 TB · 出站","tc":"60 TB · 出站","en":"60 TB · outbound","ja":"60 TB・送信"},"price":"123.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "tamagowtt",
      provider: "Tamago Network",
      market: "HK",
      city: "Hong Kong",
      series: "WTT Dynamic VPS",
      official: "https://tamago.network/index.php?rp=/store/wtt-dynamic-vps",
      date: "2026-11-09",
      network: "WTT Business",
      summary: {"sc":"WTT 商宽使用动态 IPv4 和共享 500 Mbps。商家列为个人使用方案。","tc":"WTT 商寬使用動態 IPv4 和共享 500 Mbps。商家列為個人使用方案。","en":"WTT uses a dynamic IPv4 address and a shared 500 Mbps port. The provider limits this plan to personal use.","ja":"WTT は動的IPv4・共有500 Mbps。公式では個人利用限定です。"},
      values: ["isp","dynamic","dedicated-ipv4"],
      plans: [
        {"i":1,"officialRate":true,"sku":"WTT.500M.VPS.4","cpu":"1 × AMD Ryzen 7945HX","ram":"1 GB DDR5","disk":"20 GB NVMe SSD","port":{"sc":"共享 500 Mbps","tc":"共享 500 Mbps","en":"Shared 500 Mbps","ja":"共有 500 Mbps"},"traffic":{"sc":"2500 GB · 上下行合计","tc":"2500 GB · 上下行合計","en":"2500 GB · in + out","ja":"2500 GB・送受信合計"},"price":"48.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "attvpsre",
      provider: "ATTVPS",
      market: "US",
      city: "California",
      series: "AT&T Broadband",
      official: "https://attvps.com/",
      date: "2026-11-08",
      network: "AT&T",
      summary: {"sc":"加州 AT&T 两档均列出独享 50 Mbps 和不限流量，主要差异是 CPU 与内存。","tc":"加州 AT&T 兩級均列出獨享 50 Mbps 與不限流量，主要差異是 CPU 與記憶體。","en":"Both California AT&T tiers list dedicated 50 Mbps bandwidth and unmetered transfer. CPU and memory differ.","ja":"カリフォルニアのAT&Tは両構成とも専用50 Mbps・転送量無制限。CPUとメモリが異なります。"},
      values: ["residential","isp"],
      plans: [
        {"i":1,"sku":"AT&T Basic","cpu":"2 vCPU","ram":"4 GB DDR4","disk":"50 GB NVMe","port":{"sc":"独享 50 Mbps","tc":"獨享 50 Mbps","en":"Dedicated 50 Mbps","ja":"専用 50 Mbps"},"traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"28.88","currency":"USD","term":"month"},
        {"i":2,"sku":"AT&T Standard","cpu":"4 vCPU","ram":"8 GB DDR4","disk":"50 GB NVMe","port":{"sc":"独享 50 Mbps","tc":"獨享 50 Mbps","en":"Dedicated 50 Mbps","ja":"専用 50 Mbps"},"traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"35.88","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "jcloudhosting",
      provider: "JCloudHosting",
      market: "ES",
      city: "Spain",
      series: "Ryzen KVM",
      official: "https://discord.gg/jcloud",
      date: "2026-11-06",
      network: "SISTEC Telecom / Ryzen 9 9900X",
      summary: {"sc":"西班牙 Ryzen KVM 有 60 TB 月配额。商家通过其官方 Discord 接洽订单。","tc":"西班牙 Ryzen KVM 有 60 TB 月配額。商家透過官方 Discord 接洽訂單。","en":"The Spanish Ryzen KVM line lists 60 TB per month. Its provider handles enquiries on Discord.","ja":"スペインの Ryzen KVM は月60 TB。問い合わせ窓口は事業者のDiscordです。"},
      values: [],
      plans: [
        {"i":1,"sku":"RYZEN 01","cpu":"6 vCPU","ram":"16 GB","disk":"256 GB SSD","port":{"sc":"2 Gbps 起","tc":"2 Gbps 起","en":"2 Gbps and up","ja":"2 Gbps 以上"},"traffic":"60 TB","price":"9.98","currency":"EUR","term":"month"},
        {"i":2,"sku":"RYZEN 02","cpu":"8 vCPU","ram":"32 GB","disk":"512 GB SSD","port":{"sc":"2 Gbps 起","tc":"2 Gbps 起","en":"2 Gbps and up","ja":"2 Gbps 以上"},"traffic":"60 TB","price":"19.96","currency":"EUR","term":"month"},
        {"i":3,"sku":"RYZEN 03","cpu":"10 vCPU","ram":"48 GB","disk":"768 GB SSD","port":{"sc":"2 Gbps 起","tc":"2 Gbps 起","en":"2 Gbps and up","ja":"2 Gbps 以上"},"traffic":"60 TB","price":"29.80","currency":"EUR","term":"month"}
      ]
    },
    {
      slug: "panstarusdc2",
      provider: "PanstarCloud",
      market: "LAX",
      city: "Los Angeles",
      series: "LAX Premium DC2",
      official: "https://panstar.ai/servers",
      date: "2026-11-04",
      network: "CN2 / AS9929 / CMIN2",
      summary: {"sc":"洛杉矶 Premium DC2 实测机为 Mini。配置表使用 GiB 标示流量。","tc":"洛杉磯 Premium DC2 實測機為 Mini。配置表以 GiB 標示流量。","en":"The Los Angeles Premium DC2 sample was Mini. The table specifies transfer in GiB.","ja":"ロサンゼルス Premium DC2 の測定機は Mini。転送量の単位はGiBです。"},
      values: [],
      plans: [
        {"i":1,"sku":"LAX Premium DC2 Nano","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB","port":"500 Mbps","traffic":"512 GiB","price":"6.99","currency":"USD","term":"month"},
        {"i":2,"sku":"LAX Premium DC2 Mini","cpu":"2 vCPU","ram":"2 GB","disk":"20 GB","port":"500 Mbps","traffic":"1024 GiB","price":"12.99","currency":"USD","term":"month"},
        {"i":3,"sku":"LAX Premium DC2 Starter","cpu":"2 vCPU","ram":"4 GB","disk":"40 GB","port":"500 Mbps","traffic":"2048 GiB","price":"23.99","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "vpstaxisg",
      provider: "VPS.Taxi",
      market: "SG",
      city: "Singapore",
      series: "Singapore ISP",
      official: "https://my.vps.taxi/order/forms/a/Mzc3",
      date: "2026-11-03",
      network: "Singapore ISP",
      summary: {"sc":"评测使用新加坡 SG 1G。规格表标明 KVM 和上下行合计的月流量。","tc":"評測使用新加坡 SG 1G。規格表標明 KVM 和上下行合計的月流量。","en":"SG 1G was the Singapore sample. The KVM tiers count inbound and outbound transfer together.","ja":"測定機はシンガポールの SG 1G。KVM構成で送受信の合計を月枠に算入します。"},
      values: [],
      plans: [
        {"i":1,"sku":"SG 512M","cpu":"1 vCPU","ram":"512 MB","disk":"10 GB SSD","port":"1000 Mbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"3","currency":"USD","term":"month"},
        {"i":2,"sku":"SG 1 GB","cpu":"1 vCPU","ram":"1 GB","disk":"15 GB SSD","port":"1000 Mbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"5","currency":"USD","term":"month"},
        {"i":3,"sku":"SG 2 GB","cpu":"2 vCPU","ram":"2 GB","disk":"25 GB SSD","port":"1000 Mbps","traffic":{"sc":"8 TB · 上下行合计","tc":"8 TB · 上下行合計","en":"8 TB · in + out","ja":"8 TB・送受信合計"},"price":"10","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "flawlessnodebasic",
      provider: "FlawlessNode",
      market: "LAX",
      city: "Los Angeles",
      series: "LAX Basic",
      official: "https://www.flawlessnode.com/",
      date: "2026-11-02",
      network: "CDN77 / IPv4 + IPv6",
      summary: {"sc":"Basic 特别款采用年付及单向流量配额，Basic S 采用月付。","tc":"Basic 特別款採用年付與單向流量配額，Basic S 採用月付。","en":"The Basic special uses annual billing and a one-direction transfer quota. Basic S bills monthly.","ja":"Basic 特別版は年払い・片方向の転送量枠。Basic S は月払いです。"},
      values: [],
      plans: [
        {"i":1,"sku":"LAX Basic Special","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB","port":"1000 Mbps","traffic":{"sc":"2 TB · 单向","tc":"2 TB · 單向","en":"2 TB · one direction","ja":"2 TB・片方向"},"price":"36.00","currency":"USD","term":"year"},
        {"i":2,"sku":"LAX Basic S","cpu":"2 vCPU","ram":"2 GB","disk":"15 GB","port":"2000 Mbps","traffic":{"sc":"8 TB · 单向","tc":"8 TB · 單向","en":"8 TB · one direction","ja":"8 TB・片方向"},"price":"10.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "xuezhangvpshinet",
      provider: "Xuezhang VPS",
      market: "TW",
      city: "Taiwan",
      series: "HiNet NAT",
      official: "https://xuezhangvps.shop/",
      date: "2026-10-22",
      network: "HiNet / IPv4 NAT",
      summary: {"sc":"台湾 HiNet 动态住宅 NAT 提供 20 个映射端口，适合先比较端口需求。","tc":"台灣 HiNet 動態住宅 NAT 提供 20 個映射埠，選購時可先核對埠數需求。","en":"The Taiwan HiNet dynamic residential NAT plan allocates 20 forwarded ports.","ja":"台湾 HiNet の動的住宅NATには転送ポートが20個付属します。"},
      values: ["isp","residential","dynamic","shared-nat"],
      plans: [
        {"i":1,"sku":"HiNet Residential NAT","cpu":"1 vCPU","ram":"512 MB","disk":"3 GB","port":"1000 Mbps","traffic":{"sc":"1000 GB · 上下行合计","tc":"1000 GB · 上下行合計","en":"1000 GB · in + out","ja":"1000 GB・送受信合計"},"price":"35.0","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "blossomhostnetwest",
      provider: "Blossom Host",
      market: "US",
      city: "United States",
      series: "NETWEST",
      official: "https://blossomhost.us/",
      date: "2026-10-21",
      network: "NetWest",
      summary: {"sc":"评测样本归属 NetWest。ISP 地址归属描述的是接入网络，文章另列了各档硬件。","tc":"評測樣本歸屬 NetWest。ISP 位址歸屬描述的是接取網路，文章另列了各級硬體。","en":"The sample address belongs to NetWest. The report identifies the access network and lists each hardware tier separately.","ja":"測定したアドレスは NetWest 網。回線の帰属と各構成のハードウェアを確認できます。"},
      values: [],
      plans: [
        {"i":1,"sku":"ISP-XXS","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB SSD","port":"1 Gbps","traffic":"1 TB","price":"17","currency":"USD","term":"month"},
        {"i":2,"sku":"ISP-XS","cpu":"2 vCPU","ram":"2 GB","disk":"20 GB SSD","port":"1 Gbps","traffic":"1.5 TB","price":"20","currency":"USD","term":"month"},
        {"i":3,"sku":"ISP-S","cpu":"2 vCPU","ram":"4 GB","disk":"40 GB SSD","port":"1 Gbps","traffic":"2 TB","price":"27","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "zorocloudatt",
      provider: "ZoroCloud",
      market: "US",
      city: "United States",
      series: "US Astra",
      official: "https://my.zorocloud.com/",
      date: "2026-10-14",
      network: "AT&T",
      summary: {"sc":"评测样机为 US-Astra-Plus，采用 AT&T 静态独立地址。","tc":"評測樣機為 US-Astra-Plus，採用 AT&T 靜態獨立位址。","en":"US-Astra-Plus was the tested configuration, with a dedicated static AT&T address.","ja":"測定機は US-Astra-Plus。AT&T の専用固定アドレスを使用しています。"},
      values: ["residential","static","dedicated-ipv4"],
      plans: [
        {"i":1,"sku":"US-Astra-Plus","cpu":"1 vCPU","ram":"1 GB RAM","disk":"10 GB SSD","port":"100 Mbps","traffic":{"sc":"1000 GB · 上下行合计","tc":"1000 GB · 上下行合計","en":"1000 GB · in + out","ja":"1000 GB・送受信合計"},"price":"188.00","currency":"CNY","term":"month"},
        {"i":2,"sku":"US-Astra-Pro","cpu":"2 vCPU","ram":"2 GB DDR4 RAM","disk":"20 GB SSD","port":"100 Mbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"288.00","currency":"CNY","term":"month"},
        {"i":3,"sku":"US-Astra-Max","cpu":"4 vCPU","ram":"4 GB DDR4 RAM","disk":"60 GB SSD","port":"200 Mbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"588.00","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "aaitrverizonnat",
      provider: "AaITR",
      market: "US",
      city: "United States",
      series: "Verizon NAT",
      official: "https://www.aaitr.com/",
      date: "2026-10-13",
      network: "Verizon / IPv4 NAT",
      summary: {"sc":"Verizon 动态住宅 NAT 仅分配 10 个映射端口。","tc":"Verizon 動態住宅 NAT 分配 10 個映射埠。","en":"The dynamic Verizon residential NAT sample provides ten forwarded ports.","ja":"Verizon の動的住宅NATは転送ポート10個です。"},
      values: ["isp","residential","dynamic","shared-nat"],
      plans: [
        {"i":1,"sku":"Verizon Dynamic NAT","cpu":"1 vCPU","ram":"512 MB","disk":"8 GB SSD","port":"100 Mbps","traffic":{"sc":"1000 GB · 上下行合计","tc":"1000 GB · 上下行合計","en":"1000 GB · in + out","ja":"1000 GB・送受信合計"},"price":"149","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "mondozetmnet",
      provider: "Mondoze",
      market: "MY",
      city: "Malaysia",
      series: "Home Residential",
      official: "https://www.mondoze.com/",
      date: "2026-10-09",
      network: "TMNET",
      summary: {"sc":"报价来自 Home Residential 249 方案，原文的测速样机另有配置。","tc":"報價來自 Home Residential 249 方案，原文的測速樣機另有配置。","en":"The listed price is for Home Residential 249. The reviewer used a different hardware configuration for testing.","ja":"掲載料金は Home Residential 249 のもの。測定機は別のハードウェア構成です。"},
      values: ["dynamic","residential","isp"],
      plans: [
        {"i":1,"sku":"Home Residential - 249 Plan","cpu":"2 cores","ram":"2 GB RAM","disk":"30 GB","port":"100 Mbps","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"25.59","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "tamagohkt",
      provider: "Tamago Network",
      market: "HK",
      city: "Hong Kong",
      series: "HKT Dynamic VPS",
      official: "https://tamago.network/",
      date: "2026-10-08",
      network: "HKT",
      summary: {"sc":"HKT 样机为动态 IPv4、共享 2.5 Gbps。原商品入口现在导向 WTT，购买前需向商家确认 HKT。","tc":"HKT 樣機為動態 IPv4、共享 2.5 Gbps。原商品入口現導向 WTT，購買前需向商家確認 HKT。","en":"The tested HKT plan used dynamic IPv4 and shared 2.5 Gbps. Its old order link now opens WTT. Ask the provider for HKT availability.","ja":"測定したHKTは動的IPv4・共有2.5 Gbps。旧商品URLは現在WTTへ転送されるため、HKT在庫は事業者に確認してください。"},
      values: ["residential","isp","dynamic","dedicated-ipv4"],
      plans: [
        {"i":1,"sku":"HKT.2500M.VPS.2","cpu":"2 × AMD Ryzen 7950X vCPU","ram":"2 GB DDR5","disk":"20 GB NVMe SSD","port":{"sc":"共享 2500 Mbps","tc":"共享 2500 Mbps","en":"Shared 2500 Mbps","ja":"共有 2500 Mbps"},"traffic":{"sc":"5000 GB · 上下行合计","tc":"5000 GB · 上下行合計","en":"5000 GB · in + out","ja":"5000 GB・送受信合計"},"price":"78.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "mondozelinuxvps",
      provider: "Mondoze",
      market: "MY",
      city: "Malaysia",
      series: "Linux VPS",
      official: "https://www.mondoze.com/",
      date: "2026-10-05",
      network: "Linux KVM",
      summary: {"sc":"马来西亚 Linux VPS 列明不限流量，产品表未给出端口速度。","tc":"馬來西亞 Linux VPS 列明不限流量，產品表未提供埠速。","en":"The Malaysian Linux VPS line lists unmetered transfer. Its table gives no port speed.","ja":"マレーシアのLinux VPSは転送量無制限。表には回線速度の記載がありません。"},
      values: [],
      plans: [
        {"i":1,"sku":"Linux VPS 2 GB","cpu":"2 vCPU","ram":"2 GB","disk":"60 GB","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"8.33","currency":"USD","term":"month"},
        {"i":2,"sku":"Linux VPS 4 GB","cpu":"2 vCPU","ram":"4 GB","disk":"50 GB","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"35.59","currency":"USD","term":"month"},
        {"i":3,"sku":"Linux VPS 8 GB","cpu":"4 vCPU","ram":"8 GB","disk":"80 GB","traffic":{"sc":"不限量","tc":"不限量","en":"Unmetered","ja":"無制限"},"price":"64.59","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "zorocloudde",
      provider: "ZoroCloud",
      market: "DE",
      city: "Germany",
      series: "DE BGP",
      official: "https://my.zorocloud.com/",
      date: "2026-10-03",
      network: "BGP",
      summary: {"sc":"德国 BGP 样机为 DE-BGP-Plus。样本的 IP 地理归属与住宅属性分开解读。","tc":"德國 BGP 樣機為 DE-BGP-Plus。樣本的 IP 地理歸屬和住宅屬性分開解讀。","en":"DE-BGP-Plus was the German test SKU. The report distinguishes local IP geolocation from residential access.","ja":"ドイツの測定機は DE-BGP-Plus。IPの現地判定と住宅回線判定を分けて確認できます。"},
      values: [],
      plans: [
        {"i":1,"sku":"DE-BGP-Plus","cpu":"1 vCPU","ram":"1 GB DDR4 RAM","disk":"20 GB SSD","port":"100 Mbps","traffic":{"sc":"1000 GB · 上下行合计","tc":"1000 GB · 上下行合計","en":"1000 GB · in + out","ja":"1000 GB・送受信合計"},"price":"78.00","currency":"CNY","term":"month"},
        {"i":2,"sku":"DE-BGP-Pro","cpu":"2 vCPU","ram":"2 GB DDR4 RAM","disk":"40 GB SSD","port":"200 Mbps","traffic":{"sc":"2000 GB · 上下行合计","tc":"2000 GB · 上下行合計","en":"2000 GB · in + out","ja":"2000 GB・送受信合計"},"price":"109.00","currency":"CNY","term":"month"},
        {"i":3,"sku":"DE-BGP-Max","cpu":"4 vCPU","ram":"4 GB DDR4 RAM","disk":"80 GB SSD","port":"200 Mbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"219.00","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "flawlessnode9929re",
      provider: "FlawlessNode",
      market: "LAX",
      city: "Los Angeles",
      series: "LAX Pro",
      official: "https://www.flawlessnode.com/",
      date: "2026-09-29",
      network: "AS9929 / CDN77",
      summary: {"sc":"测评型号为 Pro XS。样机的 AS9929 回程及 CDN77 国际互联可在原文查阅。","tc":"測評型號為 Pro XS。樣機的 AS9929 回程及 CDN77 國際互聯可在原文查閱。","en":"The retest used Pro XS and documents AS9929 return routing and CDN77 interconnection.","ja":"再測定は Pro XS。AS9929の復路とCDN77の相互接続を記事で確認できます。"},
      values: [],
      plans: [
        {"i":1,"sku":"LAX Pro Special","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB","port":"300 Mbps","traffic":{"sc":"192 GB · 单向","tc":"192 GB · 單向","en":"192 GB · one direction","ja":"192 GB・片方向"},"price":"45.00","currency":"USD","term":"year"},
        {"i":2,"sku":"LAX Pro 2XS","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB","port":"300 Mbps","traffic":{"sc":"512 GB · 单向","tc":"512 GB · 單向","en":"512 GB · one direction","ja":"512 GB・片方向"},"price":"70.00","currency":"USD","term":"year"},
        {"i":3,"sku":"LAX Pro XS Transfer","cpu":"2 vCPU","ram":"2 GB","disk":"15 GB","port":"300 Mbps","traffic":{"sc":"1024 GB · 单向","tc":"1024 GB · 單向","en":"1024 GB · one direction","ja":"1024 GB・片方向"},"price":"14.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "bocchi",
      provider: "Bocchi",
      market: "US",
      city: "Dallas",
      series: "Dallas Pulse",
      official: "https://bocchi.sh/store/dallas-pulse-performance",
      date: "2026-09-24",
      network: "10 Gbps / RAID 10",
      summary: {"sc":"达拉斯 Pulse 系列使用 10 Gbps 网络端口，报价采用年付。","tc":"達拉斯 Pulse 系列使用 10 Gbps 網路埠，報價採用年付。","en":"Dallas Pulse lists a 10 Gbps port and annual billing.","ja":"ダラスの Pulse は10 Gbpsポート・年払いです。"},
      values: [],
      plans: [
        {"i":1,"sku":"Pulse 1","cpu":"1 vCPU","ram":"2 GB ECC","disk":"25 GB RAID10","port":"10 Gbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"48","currency":"USD","term":"year"},
        {"i":2,"sku":"Pulse 2","cpu":"2 vCPU","ram":"4 GB ECC","disk":"40 GB RAID10","port":"10 Gbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"108","currency":"USD","term":"year"},
        {"i":3,"sku":"Pulse 4","cpu":"4 vCPU","ram":"8 GB ECC","disk":"100 GB RAID10","port":"10 Gbps","traffic":{"sc":"8 TB · 上下行合计","tc":"8 TB · 上下行合計","en":"8 TB · in + out","ja":"8 TB・送受信合計"},"price":"228","currency":"USD","term":"year"}
      ]
    },
    {
      slug: "bugnetjp2",
      provider: "BugNet",
      market: "JP",
      city: "Tokyo",
      series: "Tokyo Performance",
      official: "https://bug.pw/products/japan-tokyo-performance",
      date: "2026-09-20",
      network: "Ryzen 9 7950X3D / 9950X",
      summary: {"sc":"东京测试使用 Bromine 2445，作者分别测了两款 Ryzen 9 处理器。价格表未注明计费周期。","tc":"東京測試使用 Bromine 2445，作者分別測了兩款 Ryzen 9 處理器。價格表未註明計費週期。","en":"Bromine 2445 was tested with two Ryzen 9 CPUs in Tokyo. The source price table does not specify the billing period.","ja":"東京では Bromine 2445 の Ryzen 9 を2種類測定。価格表には請求周期の明記がありません。"},
      values: [],
      plans: [
        {"i":1,"sku":"Tokyo VPS Chlorine 1230","cpu":"1 vCore","ram":"2 GB DDR5 ECC","disk":"30 GB NVMe","port":"2 Gbps","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"6.99","currency":"GBP","term":""},
        {"i":2,"sku":"Tokyo VPS Bromine 2445","cpu":"2 vCore AMD R9","ram":"4 GB DDR5 ECC","disk":"45 GB NVMe","port":"2 Gbps","traffic":{"sc":"8 TB · 上下行合计","tc":"8 TB · 上下行合計","en":"8 TB · in + out","ja":"8 TB・送受信合計"},"price":"11.99","currency":"GBP","term":""},
        {"i":3,"sku":"Tokyo VPS Iodine 4875","cpu":"4 vCore AMD","ram":"8 GB DDR5 ECC","disk":"75 GB NVMe","port":"2 Gbps","traffic":{"sc":"16 TB · 上下行合计","tc":"16 TB · 上下行合計","en":"16 TB · in + out","ja":"16 TB・送受信合計"},"price":"19.99","currency":"GBP","term":""}
      ]
    },
    {
      slug: "goodlyclouduk",
      provider: "GoodlyCloud",
      market: "GB",
      city: "London",
      series: "London AS9929",
      official: "https://goodlyclouds.com/",
      date: "2026-09-18",
      network: "AS9929",
      summary: {"sc":"伦敦 9929 系列按端口与流量区分，年付款另列独立价格。","tc":"倫敦 9929 系列按埠速與流量區分，年付款另列獨立價格。","en":"The London 9929 line varies by port and transfer allowance, with a separately priced annual tier.","ja":"ロンドン9929は帯域と転送量で区分。年払い構成は別価格です。"},
      values: [],
      plans: [
        {"i":1,"sku":"London AS9929","cpu":"1 vCPU","ram":"1 GB","disk":"15 GB","port":"200 Mbps","traffic":"1 TB","price":"68.00","currency":"CNY","term":"month"},
        {"i":2,"sku":"London AS9929 Small","cpu":"1 vCPU","ram":"1 GB","disk":"15 GB","port":"100 Mbps","traffic":"500 GB","price":"50.00","currency":"CNY","term":"month"},
        {"i":3,"sku":"London AS9929 2H2G","cpu":"2 vCPU","ram":"2 GB","disk":"20 GB","port":"100 Mbps","traffic":"1.5 TB","price":"120.00","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "goldcloudus",
      provider: "GoldCloud",
      market: "LAX",
      city: "Los Angeles",
      series: "US-DC1",
      official: "https://goldcloud.dev/",
      date: "2026-09-17",
      network: "AS4837",
      summary: {"sc":"洛杉矶 DC1 公布 100 Mbps 保底与 300 Mbps 峰值，可另购流量。","tc":"洛杉磯 DC1 公布 100 Mbps 保底與 300 Mbps 峰值，可另購流量。","en":"Los Angeles DC1 lists a 100 Mbps floor and 300 Mbps peak, with extra transfer available.","ja":"ロサンゼルス DC1 の掲載帯域は最低100・最大300 Mbps。転送量の追加購入に対応します。"},
      values: [],
      plans: [
        {"i":1,"sku":"US-DC1 2H1 GB","cpu":"2 vCPU","ram":"1 GB","disk":"30 GB","port":"100–300 Mbps","traffic":{"sc":"1 TB · 上下行合计","tc":"1 TB · 上下行合計","en":"1 TB · in + out","ja":"1 TB・送受信合計"},"price":"30.00","currency":"CNY","term":"month"},
        {"i":2,"sku":"US-DC1 2H2 GB","cpu":"2 vCPU","ram":"2 GB","disk":"40 GB","port":"100–300 Mbps","traffic":{"sc":"1 TB · 上下行合计","tc":"1 TB · 上下行合計","en":"1 TB · in + out","ja":"1 TB・送受信合計"},"price":"45.00","currency":"CNY","term":"month"},
        {"i":3,"sku":"US-DC1 4H4 GB","cpu":"4 vCPU","ram":"4 GB","disk":"50 GB","port":"100–300 Mbps","traffic":{"sc":"1 TB · 上下行合计","tc":"1 TB · 上下行合計","en":"1 TB · in + out","ja":"1 TB・送受信合計"},"price":"60.00","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "residentialserviceuk",
      provider: "Residential-Service",
      market: "GB",
      city: "United Kingdom",
      series: "UK Broadband",
      official: "https://residential-service.com/",
      date: "2026-08-26",
      network: "BT / Virgin Media",
      summary: {"sc":"英国 BT 与 Virgin Media 两档月费相同，月流量额度不同。","tc":"英國 BT 與 Virgin Media 兩級月費相同，月流量額度不同。","en":"UK BT and Virgin Media have the same listed monthly price and different transfer quotas.","ja":"英国のBTとVirgin Mediaは同じ月額で、転送量枠が異なります。"},
      values: [],
      plans: [
        {"i":1,"sku":"BT","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB Raid1","port":"100 Mbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"20.00","currency":"USD","term":"month"},
        {"i":2,"sku":"Virgin Media","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB Raid1","port":"100 Mbps","traffic":{"sc":"1 TB · 上下行合计","tc":"1 TB · 上下行合計","en":"1 TB · in + out","ja":"1 TB・送受信合計"},"price":"20.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "residentialservicetk",
      provider: "Residential-Service",
      market: "TR",
      city: "Türkiye",
      series: "Türkiye BGP",
      official: "https://residential-service.com/",
      date: "2026-08-22",
      network: "Türk Telekom",
      summary: {"sc":"土耳其样机使用 Türk Telekom 商宽，上下行规格分别为 100 和 1000 Mbps。","tc":"土耳其樣機採用 Türk Telekom 商寬，上下行規格分別為 100 與 1000 Mbps。","en":"The Türkiye sample uses Türk Telekom business access with 100 Mbps upload and 1 Gbps download.","ja":"トルコの測定機は Türk Telekom の法人回線。上り100 Mbps・下り1 Gbpsです。"},
      values: ["isp"],
      plans: [
        {"i":1,"sku":"Türkiye BGP Traffic","cpu":"2 vCPU","ram":"2 GB","disk":"10 GB RAID1","port":"100 Mbps ↑ / 1 Gbps ↓","traffic":{"sc":"4 TB · 上下行合计","tc":"4 TB · 上下行合計","en":"4 TB · in + out","ja":"4 TB・送受信合計"},"price":"20.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "wepcau",
      provider: "WEPC",
      market: "AU",
      city: "Melbourne",
      series: "Melbourne Broadband",
      official: "https://wepc.au/",
      date: "2026-08-20",
      network: "IPv4",
      summary: {"sc":"墨尔本样机列出静态住宅 IPv4，上下行流量合计 2 TB。","tc":"墨爾本樣機列出靜態住宅 IPv4，上下行流量合計 2 TB。","en":"The Melbourne sample lists a static residential IPv4 address and 2 TB of combined transfer.","ja":"メルボルンの測定機は住宅の固定IPv4・送受信合計2 TBです。"},
      values: ["static","residential"],
      plans: [
        {"i":1,"sku":"Melbourne Broadband","cpu":"2 Cores","ram":"512 MB DDR4","disk":"10 GB SSD","port":"200 Mbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"95.01","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "nubethai",
      provider: "Nube",
      market: "TH",
      city: "Bangkok",
      series: "Bangkok VPS",
      official: "https://nube.sh/zh-cn/promote/th-bangkok-native-ip-vps",
      date: "2026-08-08",
      network: "AS23932 World Internet",
      summary: {"sc":"曼谷测试款为 8 Mbps，作者注明零售配置不同。样本地址登记为托管网络。","tc":"曼谷測試款為 8 Mbps，作者註明零售配置不同。樣本位址登記為託管網路。","en":"The Bangkok test unit was limited to 8 Mbps. The reviewer distinguishes it from retail configurations and identifies colocation addressing.","ja":"バンコクの測定機は8 Mbps。市販構成とは異なり、測定IPはコロケーション登録です。"},
      values: [],
      plans: [
        {"i":1,"sku":"Bangkok Native IP · 72 h trial","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB SSD","port":"8 Mbps","price":"9","currency":"USD","term":"72 h","officialRate":true}
      ]
    },
    {
      slug: "wlxhk9955hx",
      provider: "WLX",
      market: "HK",
      city: "Tsuen Wan",
      series: "Ryzen 9 9955HX",
      official: "https://wlx.hk/",
      date: "2026-08-07",
      network: "AS150670 / 9955HX",
      summary: {"sc":"香港荃湾物理独服搭载 Ryzen 9 9955HX。可选 100 Mbps 不限量或 1 Gbps 配 10 TB。","tc":"香港荃灣實體獨服搭載 Ryzen 9 9955HX。可選 100 Mbps 不限量或 1 Gbps 配 10 TB。","en":"The Tsuen Wan dedicated server offers 100 Mbps unmetered or 1 Gbps with a 10 TB allowance.","ja":"香港・荃湾の専用機は100 Mbps無制限、または1 Gbps・10 TBから選択できます。"},
      values: [],
      plans: [
        {"i":1,"sku":"Ryzen 9 9955HX Dedicated","cpu":"Ryzen 9 9955HX · 16C / 32T","ram":"96 GB DDR5-5600","disk":"1 × 2 TB SanDisk NVMe SSD PCIE 5.0","port":"100 Mbps / 1 Gbps","traffic":{"sc":"100 Mbps 不限量或 1 Gbps / 10 TB","tc":"100 Mbps 不限量或 1 Gbps / 10 TB","en":"Unmetered at 100 Mbps or 10 TB at 1 Gbps","ja":"100 Mbps 無制限 または 1 Gbps・10 TB"},"price":"279.00","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "zouterhk",
      provider: "Zouter",
      market: "HK",
      city: "Hong Kong",
      series: "HK BGP Global",
      official: "https://console.zouter.io/products/cvm",
      date: "2026-08-04",
      network: "BGP Global",
      summary: {"sc":"香港 BGP Global 的 2 TB 额度合计上下行，额外流量按 TB 计费。","tc":"香港 BGP Global 的 2 TB 額度合計上下行，額外流量按 TB 計費。","en":"Hong Kong BGP Global counts both directions toward 2 TB and charges separately for additional transfer.","ja":"香港 BGP Global は送受信合計2 TB。追加転送量はTB単位です。"},
      values: [],
      plans: [
        {"i":1,"sku":"HK BGP Global Standard","cpu":"1 vCPU · EPYC Milan / Xeon Cascade Lake","ram":"1 GB","disk":"15 GB NVMe SSD","port":"1000 Mbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"19.80","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "yunyoode9929",
      provider: "YunYoo",
      market: "DE",
      city: "Frankfurt",
      series: "Frankfurt C.Std",
      official: "https://yunyoo.cc/",
      date: "2026-08-02",
      network: "AS9929",
      summary: {"sc":"法兰克福 C.Std 以 100 Mbps 为基准，轻量级规格配不同的双向流量。","tc":"法蘭克福 C.Std 以 100 Mbps 為基準，輕量級規格配不同的雙向流量。","en":"Frankfurt C.Std lists 100 Mbps ports on the entry tiers, with different combined transfer allowances.","ja":"フランクフルト C.Std の入門構成は100 Mbps。送受信の合計枠が異なります。"},
      values: [],
      plans: [
        {"i":1,"sku":"Frankfurt C.Std Mini","cpu":"1 vCPU","ram":"1 GB","disk":"10 GB","port":"100 Mbps","traffic":{"sc":"400 GB · 上下行合计","tc":"400 GB · 上下行合計","en":"400 GB · in + out","ja":"400 GB・送受信合計"},"price":"15.99","currency":"CNY","term":"month"},
        {"i":2,"sku":"Frankfurt C.Std Basic","cpu":"2 vCPU","ram":"1 GB","disk":"20 GB","port":"100 Mbps","traffic":{"sc":"600 GB · 上下行合计","tc":"600 GB · 上下行合計","en":"600 GB · in + out","ja":"600 GB・送受信合計"},"price":"19.99","currency":"CNY","term":"month"},
        {"i":3,"sku":"Frankfurt C.Std Plus","cpu":"2 vCPU","ram":"2 GB","disk":"30 GB","port":"100 Mbps","traffic":{"sc":"800 GB · 上下行合计","tc":"800 GB · 上下行合計","en":"800 GB · in + out","ja":"800 GB・送受信合計"},"price":"26.99","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "novixcg",
      provider: "NovixLink",
      market: "LAX",
      city: "Los Angeles",
      series: "LAX-CG",
      official: "https://novixlink.com/",
      date: "2026-07-26",
      network: "CG",
      summary: {"sc":"洛杉矶 CG 实测机为 Basic。作者讨论了托管 IP 的住宅分类差异。","tc":"洛杉磯 CG 實測機為 Basic。作者討論了託管 IP 的住宅分類差異。","en":"Basic was the Los Angeles CG sample. The review discusses differences in how classifiers label its hosted addresses.","ja":"ロサンゼルス CG の測定機は Basic。ホスティングIPの住宅判定の差異を扱っています。"},
      values: [],
      plans: [
        {"i":1,"sku":"LAX-CG Lite","cpu":"1 vCPU","ram":"768 MB DDR4","disk":"10 GB RAID10 SSD","port":"500 Mbps","traffic":{"sc":"1000 GB · 上下行合计","tc":"1000 GB · 上下行合計","en":"1000 GB · in + out","ja":"1000 GB・送受信合計"},"price":"24.95","currency":"CNY","term":"month"},
        {"i":2,"sku":"LAX-CG Basic","cpu":"1 vCPU","ram":"1 GB DDR4","disk":"10 GB RAID10 SSD","port":"700 Mbps","traffic":{"sc":"2000 GB · 上下行合计","tc":"2000 GB · 上下行合計","en":"2000 GB · in + out","ja":"2000 GB・送受信合計"},"price":"39.95","currency":"CNY","term":"month"},
        {"i":3,"sku":"LAX-CG Pro","cpu":"2 vCPU","ram":"4 GB DDR4","disk":"30 GB RAID10 SSD","port":"800 Mbps","traffic":{"sc":"4000 GB · 上下行合计","tc":"4000 GB · 上下行合計","en":"4000 GB · in + out","ja":"4000 GB・送受信合計"},"price":"79.95","currency":"CNY","term":"month"}
      ]
    },
    {
      slug: "legendvpssg",
      provider: "LegendVPS",
      market: "SG",
      city: "Singapore",
      series: "SG-Evo-2-2G",
      official: "https://legendvps.com/",
      date: "2026-07-22",
      network: "AMD EPYC 7K62",
      summary: {"sc":"新加坡 EVO 样机配置 2 核、2 GB，双向月流量 2 TB。","tc":"新加坡 EVO 樣機配置 2 核、2 GB，雙向月流量 2 TB。","en":"The Singapore EVO sample combines two cores, 2 GB RAM and 2 TB of bidirectional transfer.","ja":"シンガポール EVO の測定機は2コア・2 GB・送受信合計2 TBです。"},
      values: [],
      plans: [
        {"i":1,"sku":"SG-Evo-2-2 GB","cpu":"2 vCPU AMD 7K62","ram":"2 GB","disk":"20 GB SSD","port":"2000 Mbps","traffic":{"sc":"2 TB · 上下行合计","tc":"2 TB · 上下行合計","en":"2 TB · in + out","ja":"2 TB・送受信合計"},"price":"36","currency":"USD","term":"year"}
      ]
    },
    {
      slug: "quicksrvuk",
      provider: "quicksrv",
      market: "GB",
      city: "United Kingdom",
      series: "UK Game",
      official: "https://panel.quicksrv.io/dashboard/deploy",
      date: "2026-07-12",
      network: "DDR5 / NVMe",
      summary: {"sc":"英国 Game 32 为测试机。系列的不限量带宽适用公平使用条款。","tc":"英國 Game 32 為測試機。系列的不限量頻寬適用公平使用條款。","en":"Game 32 was the UK test model. Unmetered transfer on this line is subject to fair use.","ja":"英国の測定機は Game 32。転送量無制限には公平利用条件があります。"},
      values: [],
      plans: [
        {"i":1,"sku":"Micro","cpu":"1 vCPU","ram":"1024 MB DDR5","disk":"20 GiB NVMe","port":"10 Gbps","traffic":{"sc":"不限量 · 公平使用","tc":"不限量 · 公平使用","en":"Unmetered · fair use","ja":"無制限・公平利用条件あり"},"price":"1.99","currency":"EUR","term":"month"},
        {"i":2,"sku":"Game 2","cpu":"1 vCPU","ram":"2048 MB DDR5","disk":"40 GiB NVMe","port":"10 Gbps","traffic":{"sc":"不限量 · 公平使用","tc":"不限量 · 公平使用","en":"Unmetered · fair use","ja":"無制限・公平利用条件あり"},"price":"3.99","currency":"EUR","term":"month"},
        {"i":3,"sku":"Game 4","cpu":"2 vCPU","ram":"4096 MB DDR5","disk":"80 GiB NVMe","port":"10 Gbps","traffic":{"sc":"不限量 · 公平使用","tc":"不限量 · 公平使用","en":"Unmetered · fair use","ja":"無制限・公平利用条件あり"},"price":"4.99","currency":"EUR","term":"month"}
      ]
    },
    {
      slug: "gatewaysentry",
      provider: "GatewaySentry",
      market: "LAX",
      city: "Los Angeles",
      series: "LAX1",
      official: "https://gatewaysentry.com/",
      date: "2026-07-05",
      network: "NVMe",
      summary: {"sc":"洛杉矶 LAX1 系列采用 NVMe，流量随配置增加。10–25 Gbps 为产品表的端口范围。","tc":"洛杉磯 LAX1 系列採用 NVMe，流量隨配置增加。10–25 Gbps 為產品表的埠速範圍。","en":"The Los Angeles LAX1 line lists NVMe and a 10–25 Gbps port range. Transfer allowance varies by tier.","ja":"ロサンゼルス LAX1 はNVMe、表記帯域は10～25 Gbps。転送量は構成別です。"},
      values: [],
      plans: [
        {"i":1,"sku":"VPS-4","cpu":"2 vCPU","ram":"4 GB RAM","disk":"40 GB NVMe","port":"10–25 Gbps","traffic":"1 TB","price":"4","currency":"USD","term":"month"},
        {"i":2,"sku":"VPS-8","cpu":"4 vCPU","ram":"8 GB RAM","disk":"80 GB NVMe","port":"10–25 Gbps","traffic":"2 TB","price":"8","currency":"USD","term":"month"},
        {"i":3,"sku":"VPS-14","cpu":"8 vCPU","ram":"8 GB RAM","disk":"300 GB NVMe","port":"10–25 Gbps","traffic":"3 TB","price":"14","currency":"USD","term":"month"}
      ]
    },
    {
      slug: "ipmelaspectrum",
      provider: "IPMELA",
      market: "US",
      city: "North Carolina",
      series: "Spectrum RDP",
      official: "https://ipmela.com/",
      date: "2026-07-02",
      network: "Spectrum Business",
      summary: {"sc":"北卡罗来纳州样机经 Spectrum Business 商宽接入，端口速度无公开规格。","tc":"北卡羅來納州樣機經 Spectrum Business 商寬接取，埠速沒有公開規格。","en":"The North Carolina sample uses Spectrum Business access. The provider did not specify a port speed.","ja":"ノースカロライナの測定機は Spectrum Business 回線。公称の帯域は未掲載です。"},
      values: ["isp"],
      plans: [
        {"i":1,"sku":"Spectrum VPS/RDP","cpu":"2 cores","ram":"2 GB RAM","disk":"25 GB NVMe","traffic":{"sc":"不限量 · 公平使用","tc":"不限量 · 公平使用","en":"Unmetered · fair use","ja":"無制限・公平利用条件あり"},"price":"25.99","currency":"USD","term":"month"}
      ]
    }
  ];
  const measuredRoutes = {
    'ppflightlift-1': 'CN2 / AS9929 / CMIN2',
    'panstarusdc2-2': 'CN2 / AS9929 / CMIN2',
    'flawlessnode9929re-3': 'AS9929 / CDN77'
  };
  const dimensions = {
    native: 'origin', broadcast: 'origin', datacenter: 'access',
    isp: 'access', residential: 'access', static: 'assignment', dynamic: 'assignment',
    'dedicated-ipv4': 'sharing', 'shared-nat': 'sharing'
  };
  const priceNote = {
    sc:'采用评测发表当天列出的标准报价。结账金额与库存请查看商品页。',
    tc:'採用評測發表當天列出的標準報價。結帳金額與庫存請查看商品頁。',
    en:'The price is the regular rate listed when the review appeared. Check the order page for current pricing and stock.',
    ja:'レビュー掲載時の標準価格です。現在の料金と在庫は注文ページをご確認ください。'
  };
  const skuText = p => typeof p.plan === 'string' ? p.plan : p.plan?.en || '';
  const recordedCoupons = {
    'goldcloudde-1': {"code":"GCFWZDB75BUM","price":"30.00","conditions":{"sc":"11 月 19 日评测记录首发八折，续费同价。商家后台显示的兑换结果决定当前折扣。","tc":"11 月 19 日評測記錄首發八折，續費同價。商家後台顯示的兌換結果決定目前折扣。","en":"The 19 November review records a recurring 20% launch discount. Current redemption is determined by checkout.","ja":"11月19日の記事では初回・更新とも20%割引。現在の適用可否は注文画面で確認してください。"}},
    'nexkrskb-1': {"code":"NEXKR@MEOWVPS","price":"108.24","conditions":{"sc":"11 月 11 日评测记录一次性八八折。此金额按 123 美元月费计算，续费仍须核对原价。","tc":"11 月 11 日評測記錄一次性八八折。此金額按 123 美元月費計算，續費仍須核對原價。","en":"The 11 November review records a one-time 12% discount. The displayed amount is calculated from the $123 monthly rate.","ja":"11月11日の記事は初回12%割引を掲載。表示金額は通常月額123ドルから計算したものです。"}},
    'tamagowtt-1': {"code":"1111W3R3PM","price":"38.00","conditions":{"sc":"这是双十一评测当日的折后记录。商家目前商品页列出的标准价格为每月 48 美元。","tc":"這是雙十一評測當日的折後紀錄。商家目前商品頁列出的標準價格為每月 48 美元。","en":"The review records this Singles’ Day promotional price. The current product page lists a regular $48 monthly rate.","ja":"当時の独身の日セール価格です。現在の商品ページには通常月額48ドルとあります。"}}
  };
  const officialNote = {"sc":"商家商品页的公开报价。选购时以结账价格及可用数量为准。","tc":"商家商品頁的公開報價。選購時以結帳價格及可用數量為準。","en":"Price published on the provider’s product page. The checkout shows the current total and availability.","ja":"事業者の商品ページの掲載料金です。最新の金額と在庫は注文画面で確認できます。"};
  const trialNote = {"sc":"每位客户可申请一次 3 天测试。正式套餐另按计算资源、流量和 IP 月租报价。","tc":"每位客戶可申請一次 3 天測試。正式方案另按運算資源、流量與 IP 月租報價。","en":"One three-day trial per customer. Production pricing combines compute, transfer and IP rental.","ja":"3日間の試用は顧客ごとに1回。本契約は計算資源・転送量・IPの月額料金で見積もります。"};
  const sampleEvidence = {
    'ppflightlift-1': {"tags":["native"],"note":{"sc":"原文将洛杉矶 LIFT S2 样本地址归为美国本地原生 IP。","tc":"原文將洛杉磯 LIFT S2 樣本位址歸為美國本地原生 IP。","en":"The reviewer classifies the tested Los Angeles LIFT S2 address as US native.","ja":"ロサンゼルスの LIFT S2 測定IPは米国ネイティブと分類されています。"}},
    'panstarusdc2-2': {"tags":["native","datacenter"],"note":{"sc":"LAX Premium DC2 Mini 的实测样本为原生机房 IP，流媒体地区判定因服务而异。","tc":"LAX Premium DC2 Mini 的實測樣本為原生機房 IP，串流地區判定因服務而異。","en":"The LAX Premium DC2 Mini sample was classified as a native datacenter address. Streaming service geolocation varied.","ja":"LAX Premium DC2 Mini の測定IPは現地データセンターに分類。配信サービスの地域判定には差があります。"}},
    '666cloudsph-1': {"tags":["broadcast"],"note":{"sc":"作者将 200 Mbps 样机的菲律宾地址记为广播 IP，多家数据库对 ISP 类型的判断不同。","tc":"作者將 200 Mbps 樣機的菲律賓位址記為廣播 IP，各資料庫對 ISP 類型的判定不同。","en":"The reviewer identifies the 200 Mbps Philippine sample as a cross-region announcement and notes different ISP classifications.","ja":"フィリピン200 Mbps測定機は域外からアナウンスされたIP。ISP種別の判定はデータベース間で異なります。"}},
    'nubethai-1': {"tags":["native","isp"],"note":{"sc":"官网把此方案列为曼谷原生 IP，并注明本地接入为 AS23932 World Internet。","tc":"官網把此方案列為曼谷原生 IP，並註明本地接取為 AS23932 World Internet。","en":"The provider describes Bangkok native addressing and local ISP access through AS23932 World Internet.","ja":"事業者の表示はバンコクのネイティブIP、現地ISPは AS23932 World Internet です。"}}
  };
  for (const item of reviews) {
    const url = 'https://meowvps.com/blog/' + item.slug + '/';
    MEOW_REPORTS.push({
      provider:item.provider, market:item.market, sku:item.series, url,
      by:'ICMP不可达喵', date:item.date, summary:item.summary, official:item.official
    });
    for (const {i, sku, officialRate, ...hardware} of item.plans) {
      const rowKey = item.slug + '-' + i;
      const label = item.slug === 'blossomhostnetwest' ? 'NetWest · ' + sku : sku;
      if (PLANS.some(plan => plan.provider.toLowerCase() === item.provider.toLowerCase() &&
          plan.market === item.market && skuText(plan).toLowerCase() === label.toLowerCase())) continue;
      const route = measuredRoutes[rowKey];
      const sample = sampleEvidence[rowKey];
      const values = sample?.tags || (item.slug === 'zorocloudatt' && i !== 1 ? [] : item.values);
      const id = 'meow-' + rowKey;
      const spec = {
        ...hardware, sku, priceType:officialRate ? 'official' : 'review',
        date:officialRate ? '2026-11-20' : item.date,
        proof:officialRate ? item.official + (rowKey === 'tamagowtt-1' ? '#product27' : '') : url,
        sourceNote:rowKey === 'nubethai-1' ? trialNote : officialRate ? officialNote : priceNote
      };
      PLANS.push({
        id, provider:item.provider, market:item.market, city:item.city, plan:label,
        kind:item.slug === 'wlxhk9955hx' ? 'bare' : 'vps',
        ip:values.includes('residential') ? 'residential' : values.includes('native') ? 'local' : values.includes('isp') ? 'isp' : 'unknown',
        route:route ? 'measured' : 'unknown', routeName:route || '',
        carriers:route ? ['CT','CU','CM'] : [],
        url:item.official, proof:url, notes:item.summary,
        searchTerms:[item.series, item.network, 'MeowVPS', 'ICMP不可达喵'],
        ...(rowKey === 'tamagowtt-1' ? {stockKey:id} : {}), spec
      });
      if (values.length) {
        IP_EVIDENCE.set(id, values.map(value => ({
          value, dimension:dimensions[value], provider:item.provider, sku,
          market:item.market, checked:spec.date, scope:'sku', operator:item.network,
          url:spec.proof, otherUrl:officialRate ? url : item.official, note:sample?.note || item.summary
        })));
      }
      const coupon = recordedCoupons[rowKey];
      if (coupon) COMMUNITY_OFFERS.push({
        ...coupon, id:id + '-coupon', provider:item.provider, plan:label, sku,
        kind:'vps', markets:[item.market], city:item.city, planIds:[id], regular:hardware.price,
        currency:hardware.currency, term:hardware.term, cpu:hardware.cpu, ram:hardware.ram,
        disk:hardware.disk, port:hardware.port, traffic:hardware.traffic,
        priceBasis:'historical', source:'MeowVPS', observed:'2026-11-20', quotedAt:item.date,
        url:item.official, thread:url
      });
    }
  }
})();
