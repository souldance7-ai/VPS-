// Named merchant configurations and dated public price records for the 20 November 2026 edition.
// Each item contains SKU, monthly price, vCPU, memory, disk, port, transfer and optional product URL.
(() => {
  const matrixNote = {
    "sc": "官方月付价格。峰值端口，流量按上行与下行合计；含一个 IPv4。",
    "tc": "官方月繳價格。頻寬為峰值，流量按上傳與下載合計；含一個 IPv4。",
    "en": "Official monthly rate. The port is a peak rate and transfer counts uploads and downloads together. Includes one IPv4 address.",
    "ja": "公式月額。帯域はピーク値で、転送量は送受信の合計。IPv4 アドレス 1 個を含みます。"
  };
  const premiumCloudNote = {
    "sc": "Premium Cloud 的 HAPCL 系列。AMD EPYC、DDR5、PCIe Gen 4 NVMe，包含一个 IPv4；不限流量受公平使用政策约束。",
    "tc": "Premium Cloud 的 HAPCL 系列。AMD EPYC、DDR5、PCIe Gen 4 NVMe，含一個 IPv4；不限流量適用公平使用政策。",
    "en": "HAPCL Premium Cloud with AMD EPYC, DDR5 and PCIe Gen 4 NVMe. One IPv4 is included. Unmetered transfer is subject to fair use.",
    "ja": "HAPCL Premium Cloud。AMD EPYC、DDR5、PCIe Gen 4 NVMe、IPv4 1 個。転送量無制限にはフェアユース条件があります。"
  };
  const taipeiKvmNote = {
    "sc": "台湾 KVM，CPU 公平共享。需完成身份验证及 OTP，月流量上限见配置。商家未公开去回程骨干。",
    "tc": "台灣 KVM，CPU 公平共用。需完成身分驗證及 OTP，月流量上限見配置。商家未公開去回程骨幹。",
    "en": "Taiwan KVM with fair-share CPU. Requires identity verification and OTP. The store gives a monthly traffic allowance without listing carrier paths.",
    "ja": "台湾 KVM・CPU フェアシェア。本人確認と OTP が必要です。月間転送量は記載通りで、往復経路の ASN は非公表です。"
  };
  const maidenheadNote = {
    "sc": "英国 Maidenhead KVM，CPU 公平共享，1 Gbps 端口有月流量额度。",
    "tc": "英國 Maidenhead KVM，CPU 公平共用，1 Gbps 連接埠附月流量額度。",
    "en": "Maidenhead KVM with fair-share CPU, a 1 Gbps port and a monthly transfer allowance.",
    "ja": "英国 Maidenhead の KVM。CPU はフェアシェア、1 Gbps ポートと月間転送量枠が付きます。"
  };
  const pqsHktNote = {
    "sc": "MeowVPS 于 7 月记录的 HKT 动态家宽方案。每款含独享动态 IPv4，标称不限流量，面板 100 TB 用尽可免费重置。前两档为峰值，1G 档为独享。",
    "tc": "MeowVPS 7 月記錄的 HKT 動態家寬方案。每款含獨享動態 IPv4，標稱不限流量，面板 100 TB 用盡可免費重設。前兩款為峰值，1G 款為獨享。",
    "en": "MeowVPS’s July HKT review lists one dedicated dynamic IPv4. The 100 TB panel quota can be reset at no cost. The 200/500 Mbps tiers list peak speeds, and 1 Gbps is dedicated.",
    "ja": "MeowVPS の 7 月の HKT 住宅回線記録。専用の動的 IPv4 1 個。100 TB 枠は無料リセット可。200/500 Mbps はピーク、1 Gbps は専用帯域です。"
  };
  const digvpsSnapshot = {
    "sc": "来源是 DigVPS 的公开记录，价格和配置对应记录日期。当前价格与库存请打开商家订单页。",
    "tc": "資料取自 DigVPS 的公開紀錄，價格與配置對應紀錄日期。現價與庫存可至商家訂購頁查看。",
    "en": "Price and specifications come from the dated DigVPS record. Open the merchant’s ordering page for current terms and availability.",
    "ja": "価格・仕様は DigVPS の記録日時点です。最新の条件と在庫は販売元の注文画面で確認できます。"
  };
  const fxSnapshot = {
    "sc": "来源是 FWQGO 的公开记录，价格和配置对应记录日期。当前价格与库存请打开商家订单页。",
    "tc": "資料取自 FWQGO 的公開紀錄，價格與配置對應紀錄日期。現價與庫存可至商家訂購頁查看。",
    "en": "Price and specifications come from the dated FWQGO record. Open the merchant’s ordering page for current terms and availability.",
    "ja": "価格・仕様は FWQGO の記録日時点です。最新の条件と在庫は販売元の注文画面で確認できます。"
  };
  const fxNovaNote = {
    "sc": "FWQGO 10 月月付报价，机房共享 10 Gbps 端口，中国方向接入标为 500 Mbps。",
    "tc": "FWQGO 10 月月繳報價，機房共用 10 Gbps 連接埠，中國方向接取標為 500 Mbps。",
    "en": "October FWQGO pricing. The shared 10 Gbps port has a separately described 500 Mbps China access rate.",
    "ja": "FWQGO の 10 月の記録。10 Gbps 共有ポートで、中国向け接続速度は 500 Mbps 表記です。"
  };
  const zouterSnapshot = {
    "sc": "公开目录记录的月付起价与最低配置。内存、磁盘与实际库存请在 Zouter 配置器查看。",
    "tc": "公開目錄記錄的月繳起價與最低配置。記憶體、磁碟與實際庫存請在 Zouter 設定頁查看。",
    "en": "Starting monthly rate and minimum specifications from a public catalogue snapshot. Memory, storage and current availability are shown at Zouter checkout.",
    "ja": "公開カタログの月額開始価格と最小構成。メモリ、ストレージ、現在の在庫は Zouter の構成画面で確認できます。"
  };
  const newnbPresetNote = {
    "sc": "10 月记录的预设配置，含一个 IPv4，流量双向合计。目前弹性配置器按资源重新计价。商家条款禁止代理和 VPN 服务。",
    "tc": "十月記錄的預設配置，含一個 IPv4，流量雙向合計。目前彈性設定頁按資源重新計價。商家條款禁止代理與 VPN 服務。",
    "en": "October preset with one IPv4 and combined upload/download transfer. Current pricing depends on the resource selection. Merchant terms prohibit proxy and VPN services.",
    "ja": "10 月時点の構成。IPv4 1 個、送受信合算。現在の価格は選択リソースで変わります。事業者規約でプロキシ・VPN サービスは禁止されています。"
  };

  const groups = [
    {
      provider: "MatrixIDC",
      currency: "CNY",
      filters: ["quota-transfer","optimized-transit"],
      evidence: ["dedicated-ipv4"],
      monitored: true,
      key: "matrix-q1",
      market: "LAX",
      city: "Los Angeles",
      route: "CN2 GIA · Q1",
      carriers: ["CT","CU","CM"],
      note: matrixNote,
      items: [
        ["Q1 - LA - 活动款","38.00",1,"2 GiB","30 GiB SSD","30 Mbps","800 GB","https://matrixidc.net/products/la-cn2-gia/la-telecom-cn2-optimized-promo"],
        ["Q1 - LA - 标准款","58.00",2,"4 GiB","50 GiB SSD","60 Mbps","1500 GB","https://matrixidc.net/products/la-cn2-gia/la-telecom-cn2-optimized-standard"],
        ["Q1 - LA - 进阶款","78.00",4,"6 GiB","80 GiB SSD","70 Mbps","2500 GB","https://matrixidc.net/products/la-cn2-gia/la-telecom-cn2-optimized-advanced"],
        ["Q1 - LA - 高阶款","98.00",8,"10 GiB","100 GiB SSD","80 Mbps","3000 GB","https://matrixidc.net/products/la-cn2-gia/la-telecom-cn2-optimized-premium"],
        ["Q1 - LA - 顶配款","128.00",12,"16 GiB","120 GiB SSD","100 Mbps","4000 GB","https://matrixidc.net/products/la-cn2-gia/la-telecom-cn2-optimized-top"],
      ]
    },
    {
      provider: "MatrixIDC",
      currency: "CNY",
      filters: ["quota-transfer","optimized-transit"],
      evidence: ["dedicated-ipv4"],
      monitored: true,
      key: "matrix-q2",
      market: "LAX",
      city: "Los Angeles",
      route: "CN2 GIA · Q2",
      carriers: ["CT","CU","CM"],
      note: matrixNote,
      items: [
        ["Q2 - LA - 活动款","38.00",1,"1 GiB","10 GiB SSD","200 Mbps","600 GB","https://matrixidc.net/products/sjc-cn2-gia/sjc-cn2-gia-promo"],
        ["Q2 - LA - 轻量款","58.00",1,"2 GiB","20 GiB SSD","200 Mbps","1200 GB","https://matrixidc.net/products/sjc-cn2-gia/sjc-cn2-gia-light-1c2g"],
        ["Q2 - LA - 标准款","128.00",2,"3 GiB","30 GiB SSD","300 Mbps","2000 GB","https://matrixidc.net/products/sjc-cn2-gia/sjc-cn2-gia-standard-2c3g"],
        ["Q2 - LA - 进阶款","188.00",3,"4 GiB","40 GiB SSD","400 Mbps","3000 GB","https://matrixidc.net/products/sjc-cn2-gia/sjc-cn2-gia-advanced-3c4g"],
        ["Q2 - LA - 顶配款","278.00",4,"6 GiB","50 GiB SSD","500 Mbps","4500 GB","https://matrixidc.net/products/sjc-cn2-gia/sjc-cn2-gia-premium-4c6g"],
      ]
    },
    {
      provider: "MatrixIDC",
      currency: "CNY",
      filters: ["quota-transfer","optimized-transit"],
      evidence: ["dedicated-ipv4"],
      monitored: true,
      key: "matrix-4837",
      market: "SJC",
      city: "Santa Clara",
      route: "AS4837",
      carriers: ["CU"],
      note: matrixNote,
      items: [
        ["圣何塞 4837 优化 活动款","18.80",1,"512 MiB","10 GiB SSD","1000 Mbps","800 GB","https://matrixidc.net/products/US%20Optimized%20Return-Route%20VPS/us-optimized-return-annual-promo"],
        ["圣何塞 4837 优化 轻量款","28.80",1,"2 GiB","20 GiB SSD","1000 Mbps","1500 GB","https://matrixidc.net/products/US%20Optimized%20Return-Route%20VPS/us-optimized-return-standard"],
        ["圣何塞 4837 优化 标准款","48.80",2,"2 GiB","30 GiB SSD","1000 Mbps","3000 GB","https://matrixidc.net/products/US%20Optimized%20Return-Route%20VPS/us-optimized-return-advanced"],
        ["圣何塞 4837 优化 进阶款","68.80",4,"4 GiB","40 GiB SSD","1000 Mbps","4500 GB","https://matrixidc.net/products/US%20Optimized%20Return-Route%20VPS/us-optimized-return-premium"],
        ["圣何塞 4837 优化 顶配款","88.80",4,"6 GiB","50 GiB SSD","1000 Mbps","6000 GB","https://matrixidc.net/products/US%20Optimized%20Return-Route%20VPS/sjc-4837-optimized-top"],
        ["圣何塞 4837 优化 pro","168.00",6,"12 GiB","100 GiB SSD","1000 Mbps","8000 GB","https://matrixidc.net/products/US%20Optimized%20Return-Route%20VPS/sjc-4837-optimized-pro"],
      ]
    },
    {
      key: "hostaddon-de",
      provider: "Host Addon",
      market: "DE",
      url: "https://www.hostaddon.com/clients/index.php?rp=/store/premium-cloud-hosting",
      currency: "USD",
      priceType: "from",
      evidence: ["dedicated-ipv4"],
      note: premiumCloudNote,
      items: [
        ["HAPCL - DE1","11.99",4,"8 GB DDR5","75 GB NVMe","1 Gbps","∞ · FUP"],
        ["HAPCL - DE2","21.99",6,"12 GB DDR5","100 GB NVMe","1 Gbps","∞ · FUP"],
      ]
    },
    {
      key: "hostaddon-uk",
      provider: "Host Addon",
      market: "GB",
      url: "https://www.hostaddon.com/clients/index.php?rp=/store/premium-cloud-hosting",
      currency: "USD",
      priceType: "from",
      evidence: ["dedicated-ipv4"],
      note: premiumCloudNote,
      items: [
        ["HAPCL - UK1","13.19",4,"8 GB DDR5","75 GB NVMe","1 Gbps","∞ · FUP"],
        ["HAPCL - UK2","21.99",6,"12 GB DDR5","100 GB NVMe","1 Gbps","∞ · FUP"],
      ]
    },
    {
      key: "hostaddon-usc",
      provider: "Host Addon",
      market: "US",
      url: "https://www.hostaddon.com/clients/index.php?rp=/store/premium-cloud-hosting",
      currency: "USD",
      priceType: "from",
      evidence: ["dedicated-ipv4"],
      note: premiumCloudNote,
      items: [
        ["HAPCL - USC1","13.19",4,"8 GB DDR5","75 GB NVMe","1 Gbps","∞ · FUP"],
        ["HAPCL - USC2","23.79",6,"12 GB DDR5","100 GB NVMe","1 Gbps","∞ · FUP"],
      ]
    },
    {
      key: "hostaddon-jpn",
      provider: "Host Addon",
      market: "JP",
      url: "https://www.hostaddon.com/clients/index.php?rp=/store/premium-cloud-hosting",
      currency: "USD",
      priceType: "from",
      evidence: ["dedicated-ipv4"],
      note: premiumCloudNote,
      items: [
        ["HAPCL - JPN1","14.89",4,"8 GB DDR5","75 GB NVMe","1 Gbps","∞ · FUP"],
        ["HAPCL - JPN2","26.49",6,"12 GB DDR5","100 GB NVMe","1 Gbps","∞ · FUP"],
      ]
    },
    {
      provider: "HostingInside",
      market: "TW",
      city: "Taipei",
      currency: "USD",
      priceType: "from",
      filters: ["quota-transfer"],
      key: "hi-twcr",
      url: "https://www.hostinginside.com/billing/store/kvm-virtual-server-china-premium-route-taipei-taiwan",
      route: "China Premium Route",
      note: taipeiKvmNote,
      items: [
        ["ktwcr512","18.11",1,"512 MB","20 GB HDD · RAID 10","1 Gbps","375 GB"],
        ["ktwcr1024","35.72",2,"1024 MB","40 GB HDD · RAID 10","1 Gbps","750 GB"],
        ["ktwcr1536","53.34",2,"1536 MB","60 GB HDD · RAID 10","1 Gbps","1125 GB"],
        ["ktwcr2048","70.95",3,"2048 MB","80 GB HDD · RAID 10","1 Gbps","1500 GB"],
        ["ktwcr3072","106.18",3,"3072 MB","100 GB HDD · RAID 10","1 Gbps","2250 GB"],
        ["ktwcr4096","140.46",4,"4096 MB","160 GB HDD · RAID 10","1 Gbps","3000 GB"],
      ]
    },
    {
      provider: "HostingInside",
      market: "TW",
      city: "Taipei",
      currency: "USD",
      priceType: "from",
      filters: ["quota-transfer"],
      key: "hi-twncr",
      url: "https://www.hostinginside.com/billing/store/kvm-virtual-server-non-china-premium-route-taipei-taiwan",
      note: taipeiKvmNote,
      items: [
        ["ktwncr1024","13.96",2,"1024 MB","40 GB HDD · RAID 10","1 Gbps","1000 GB"],
        ["ktwncr1536","17.96",2,"1536 MB","60 GB HDD · RAID 10","1 Gbps","1500 GB"],
        ["ktwncr2048","23.13",3,"2048 MB","80 GB HDD · RAID 10","1 Gbps","2000 GB"],
        ["ktwncr3072","31.04",3,"3072 MB","100 GB HDD · RAID 10","1 Gbps","3000 GB"],
      ]
    },
    {
      provider: "HostingInside",
      market: "GB",
      city: "Maidenhead",
      currency: "USD",
      priceType: "from",
      filters: ["quota-transfer"],
      key: "hi-uk",
      url: "https://www.hostinginside.com/billing/store/kvm-virtual-server-maidenhead-uk",
      note: maidenheadNote,
      items: [
        ["kvm512","8.60",1,"512 MB","20 GB HDD · RAID 10","1 Gbps","500 GB"],
        ["kvm1024","13.96",2,"1024 MB","40 GB HDD · RAID 10","1 Gbps","1000 GB"],
        ["kvm1536","17.96",2,"1536 MB","60 GB HDD · RAID 10","1 Gbps","1500 GB"],
        ["kvm2048","23.13",3,"2048 MB","80 GB HDD · RAID 10","1 Gbps","2000 GB"],
      ]
    },
    {
      provider: "PQS",
      url: "https://www.pqs.pw/index.php",
      currency: "CNY",
      priceType: "review",
      proof: "https://meowvps.com/blog/pqshkt/",
      search: ["PittQiao","皮丘云","皮丘雲"],
      key: "pqs-hk",
      market: "HK",
      city: "Hong Kong",
      ip: "residential",
      evidence: ["residential","dynamic","dedicated-ipv4"],
      date: "2026-07-23",
      note: pqsHktNote,
      items: [
        ["HKT · 200M-VDS-S","498",2,"2 GB","10 GB SSD","200 Mbps","∞"],
        ["HKT · 500M-VDS-S","998",2,"2 GB","10 GB SSD","500 Mbps","∞"],
        ["HKT · 1G-VDS-M","2490",4,"4 GB","20 GB SSD","1 Gbps","∞"],
      ]
    },
    {
      provider: "PQS",
      url: "https://www.pqs.pw/index.php",
      currency: "CNY",
      priceType: "review",
      proof: "https://digvps.com/review/pqs",
      search: ["PittQiao","皮丘云","皮丘雲"],
      key: "pqs-jp",
      market: "JP",
      city: "Tokyo",
      date: "2026-11-11",
      route: "CN2 / AS4837 / CMI",
      routeStatus: "measured",
      carriers: ["CT","CM","CU"],
      note: digvpsSnapshot,
      items: [
        ["TYO-CN2-VDS-500M","1738",4,"4 GB","20 GB","500 Mbps","∞"],
      ]
    },
    {
      provider: "PQS",
      url: "https://www.pqs.pw/index.php",
      currency: "CNY",
      priceType: "review",
      filters: ["dedicated-port"],
      proof: "https://digvps.com/review/pqs",
      search: ["PittQiao","皮丘云","皮丘雲"],
      key: "pqs-vn",
      market: "VN",
      date: "2026-11-15",
      ip: "isp",
      evidence: ["dynamic","isp"],
      note: digvpsSnapshot,
      items: [
        ["FPT · VN-200M-VDS-M","400",2,"2 GB","20 GB","200 Mbps","∞"],
        ["FPT · VN-300M-VDS-M","600",2,"2 GB","20 GB","300 Mbps","∞"],
        ["FPT · VN-500M-VDS-L","990",4,"4 GB","40 GB","500 Mbps","∞"],
        ["FPT · VN-1G-VDS-L","1800",4,"4 GB","40 GB","1 Gbps","∞"],
      ]
    },
    {
      provider: "Skyline Connect",
      market: "JP",
      currency: "USD",
      priceType: "review",
      proof: "https://digvps.com/review/skylineconnect",
      url: "https://www.skylineconnect.io/products",
      date: "2026-08-08",
      filters: ["quota-transfer"],
      search: ["SkylineConnect","Skyline VPS"],
      key: "sky-jp",
      note: digvpsSnapshot,
      items: [
        ["Japan VPS I","3.50",1,"1 GB","8 GB","10 Gbps","2 TB · IN + OUT"],
        ["Japan VPS II","7.50",1,"1 GB","8 GB","10 Gbps","4 TB · IN + OUT"],
        ["Japan VPS III","14.80",2,"2 GB","10 GB","10 Gbps","8 TB · IN + OUT"],
        ["Japan VPS IV","25.00",4,"4 GB","15 GB","10 Gbps","10 TB · IN + OUT"],
      ]
    },
    {
      provider: "Skyline Connect",
      market: "JP",
      currency: "USD",
      priceType: "review",
      proof: "https://digvps.com/review/skylineconnect",
      url: "https://www.skylineconnect.io/products",
      date: "2026-08-08",
      filters: ["quota-transfer"],
      search: ["SkylineConnect","Skyline VPS"],
      key: "sky-jplite",
      note: digvpsSnapshot,
      items: [
        ["Japan Lite VPS I","3.50",1,"1 GB","8 GB","10 Gbps","2 TB · IN + OUT"],
        ["Japan Lite VPS II","6.00",1,"1 GB","10 GB","50 Gbps","4 TB · IN + OUT"],
        ["Japan Lite VPS III","20.00",2,"2 GB","20 GB","50 Gbps","16 TB · IN + OUT"],
        ["Japan Lite VPS IV","64.00",4,"4 GB","20 GB","10 Gbps","64 TB · IN + OUT"],
      ]
    },
    {
      provider: "Skyline Connect",
      market: "SG",
      currency: "USD",
      priceType: "review",
      proof: "https://digvps.com/review/skylineconnect",
      url: "https://www.skylineconnect.io/products",
      date: "2026-08-08",
      filters: ["quota-transfer"],
      search: ["SkylineConnect","Skyline VPS"],
      key: "sky-sg",
      city: "Singapore",
      note: digvpsSnapshot,
      items: [
        ["Singapore VPS I","3.50",1,"1 GB","8 GB","10 Gbps","2 TB · IN + OUT"],
        ["Singapore VPS II","6.80",1,"1 GB","8 GB","10 Gbps","4 TB · IN + OUT"],
        ["Singapore VPS III","12.00",2,"2 GB","10 GB","10 Gbps","8 TB · IN + OUT"],
      ]
    },
    {
      provider: "FXTRANSIT",
      market: "HK",
      city: "Hong Kong",
      url: "https://fxtransit.io/store",
      proof: "https://fwqgo.com/fwq/posts/fxtransit-%E5%9B%9B%E6%9D%A1%E7%BA%BF%E6%80%8E%E4%B9%88%E9%80%89",
      currency: "USD",
      date: "2026-10-27",
      priceType: "review",
      filters: ["quota-transfer"],
      key: "fx-tier1",
      note: fxSnapshot,
      items: [
        ["HK Tier1 - Basic","5",1,"2 GB","10 GB","10 Gbps","2 TB"],
        ["HK Tier1 - Standard","10",2,"4 GB","20 GB","10 Gbps","5.1 TB"],
        ["HK Tier1 - Advanced","20",4,"8 GB","50 GB","10 Gbps","10.2 TB"],
        ["HK Tier1 - Elite","40",8,"16 GB","100 GB","10 Gbps","25.6 TB"],
        ["HK Tier1 - Ultra","80",16,"32 GB","200 GB","10 Gbps","51.2 TB"],
      ]
    },
    {
      provider: "FXTRANSIT",
      market: "HK",
      city: "Hong Kong",
      url: "https://fxtransit.io/store",
      proof: "https://fwqgo.com/fwq/posts/fxtransit-%E5%9B%9B%E6%9D%A1%E7%BA%BF%E6%80%8E%E4%B9%88%E9%80%89",
      currency: "USD",
      date: "2026-10-27",
      priceType: "review",
      filters: ["quota-transfer"],
      key: "fx-axis",
      note: fxSnapshot,
      items: [
        ["HK AXIS - Nano","30",1,"1 GB","20 GB","10 Gbps","1 TB"],
        ["HK AXIS - Basic","60",1,"2 GB","20 GB","10 Gbps","2 TB"],
      ]
    },
    {
      provider: "FXTRANSIT",
      market: "HK",
      city: "Hong Kong",
      url: "https://fxtransit.io/store",
      proof: "https://fwqgo.com/fwq/posts/fxtransit-%E5%9B%9B%E6%9D%A1%E7%BA%BF%E6%80%8E%E4%B9%88%E9%80%89",
      currency: "USD",
      date: "2026-10-27",
      priceType: "review",
      filters: ["quota-transfer"],
      key: "fx-via",
      note: fxSnapshot,
      items: [
        ["HK VIA - Basic","12",1,"2 GB","20 GB","1 Gbps","2 TB"],
      ]
    },
    {
      provider: "FXTRANSIT",
      market: "HK",
      city: "Hong Kong",
      url: "https://fxtransit.io/store",
      proof: "https://fwqgo.com/fwq/posts/fxtransit-%E5%9B%9B%E6%9D%A1%E7%BA%BF%E6%80%8E%E4%B9%88%E9%80%89",
      currency: "USD",
      date: "2026-10-27",
      priceType: "review",
      filters: ["quota-transfer"],
      key: "fx-nova",
      route: "NOVA · CN2 / AS9929 / CMI",
      carriers: ["CT","CU","CM"],
      note: fxNovaNote,
      items: [
        ["HK NOVA - Basic","50",1,"2 GB","20 GB","10 Gbps","2 TB"],
        ["HK NOVA - Standard","90",2,"4 GB","50 GB","10 Gbps","5.1 TB"],
        ["HK NOVA - Advanced","170",4,"8 GB","100 GB","10 Gbps","10.2 TB"],
      ]
    },
    {
      provider: "Zouter",
      url: "https://console.zouter.io/products/cvm",
      proof: "https://vps.error.moe/providers/",
      priceType: "review",
      currency: "CNY",
      filters: ["quota-transfer"],
      search: ["物语云","物語雲","Wuyuidc"],
      key: "zouter-de",
      market: "DE",
      city: "Frankfurt",
      note: zouterSnapshot,
      items: [
        ["Frankfurt BGP Global - Standard","19.80",1,"","","","4 TB"],
      ]
    },
    {
      provider: "Zouter",
      url: "https://console.zouter.io/products/cvm",
      proof: "https://vps.error.moe/providers/",
      priceType: "review",
      currency: "CNY",
      filters: ["quota-transfer"],
      search: ["物语云","物語雲","Wuyuidc"],
      key: "zouter-hk",
      market: "HK",
      city: "Hong Kong",
      note: zouterSnapshot,
      items: [
        ["HK BGP Global - Lite","9.98",1,"","","520 Mbps","1 TB"],
        ["HK BGP Global - Storage","59.80",1,"","","1 Gbps","2 TB"],
      ]
    },
    {
      provider: "Zouter",
      url: "https://console.zouter.io/products/cvm",
      proof: "https://vps.error.moe/providers/",
      priceType: "review",
      currency: "CNY",
      filters: ["quota-transfer"],
      search: ["物语云","物語雲","Wuyuidc"],
      key: "zouter-jp",
      market: "JP",
      note: zouterSnapshot,
      items: [
        ["JP BGP Global - Plus","46.66",1,"","","","1 TB"],
        ["JP BGP Global - Standard","28.00",1,"","","","1 TB"],
        ["JP BGP Global - Storage","48.00",1,"","","","1 TB"],
      ]
    },
    {
      key: "newnb-std",
      provider: "NewNB Cloud",
      market: "JP",
      city: "Tokyo",
      url: "https://nnb.ltd/dashboard/create?node=2",
      proof: "https://zjping.com/article/924.html",
      terms: "https://nbdnet.com/terms.html",
      date: "2026-10-15",
      priceType: "review",
      currency: "CNY",
      search: ["NNB","NoBrand Cloud","TY #2 STD"],
      filters: ["quota-transfer"],
      note: newnbPresetNote,
      items: [
        ["TY #2 STD-1","15.00",1,"512 MB","8 GB SSD","1 Gbps","1 TB · IN + OUT"],
        ["TY #2 STD-2","28.50",1,"1 GB","8 GB SSD","1 Gbps","2 TB · IN + OUT"],
        ["TY #2 STD-3","50.10",2,"2 GB","28 GB SSD","1 Gbps","2 TB · IN + OUT"],
      ]
    },
  ];

  const matrixTiers = {
    '活动款': ['活動款','Promo','特別'],
    '轻量款': ['輕量款','Light','ライト'],
    '标准款': ['標準款','Standard','標準'],
    '进阶款': ['進階款','Advanced','上位'],
    '高阶款': ['高階款','Premium','プレミアム'],
    '顶配款': ['頂配款','Top','最上位'],
    'pro': ['Pro','Pro','Pro']
  };

  function matrixProductLabel(sku) {
    const [tier, translations] = Object.entries(matrixTiers).find(([name]) => sku.endsWith(name));
    const family = sku.includes('4837') ? 'San Jose · AS4837' : sku.slice(0, 2) + ' · LA';
    return {
      sc: sku,
      tc: sku.replace('圣何塞 4837 优化', '聖荷西 4837 優化').replace(tier, translations[0]),
      en: family + ' · ' + translations[1],
      ja: family + ' · ' + translations[2]
    };
  }

  const evidenceDimension = new Map(Object.entries(IP_EVIDENCE_OPTIONS).flatMap(
    ([dimension, options]) => options.map(value => [value, dimension])
  ));

  for (const group of groups) {
    for (const [index, row] of group.items.entries()) {
      const [sku, price, cores, ram, disk, port, traffic, productUrl] = row;
      const id = 'regional-' + group.key + '-' + (index + 1);
      const url = productUrl || group.url;
      const proof = group.proof || url;
      const date = group.date || '2026-11-20';
      const networkFilters = [...(group.filters || [])];
      if (id === 'regional-pqs-hk-3') networkFilters.push('dedicated-port');
      const spec = {
        sku, price, currency: group.currency, term: 'month', cpu: cores + ' vCPU',
        ram, disk, port, traffic, proof, date, sourceNote: group.note
      };
      if (group.priceType) spec.priceType = group.priceType;
      const plan = {
        id, provider: group.provider, market: group.market, city: group.city || '',
        plan: group.provider === 'MatrixIDC' ? matrixProductLabel(sku) : sku,
        kind: 'vps', ip: group.ip || 'unknown',
        route: group.routeStatus || (group.route ? 'claimed' : 'unknown'),
        routeName: group.route || '', carriers: group.carriers || [],
        url, proof, notes: group.note, spec, networkFilters, searchTerms: [sku, ...(group.search || [])]
      };
      if (group.monitored) plan.stockKey = id;
      if (group.terms) plan.terms = group.terms;
      PLANS.push(plan);
      if (group.evidence) {
        IP_EVIDENCE.set(id, group.evidence.map(value => ({
          dimension: evidenceDimension.get(value), value, sku, scope: 'sku',
          market: group.market, provider: group.provider, checked: date, url: proof, note: group.note
        })));
      }
    }
  }
  const zouterStandard = PLANS.find(plan => plan.id === 'meow-zouterhk-1');
  if (zouterStandard) {
    zouterStandard.searchTerms = [...new Set([...(zouterStandard.searchTerms || []), '物语云', '物語雲', 'Wuyuidc'])];
  }
})();
