// Regional storefront prices and evidence collected for the 2026-11-20 edition.
// Item columns: local ID, storefront SKU, price, vCPU, memory, storage, port, monthly transfer.
(() => {
  const checked = '2026-11-20';
  const areaNames = {
    "AE": {
      "sc": "阿联酋",
      "tc": "阿聯酋",
      "en": "United Arab Emirates",
      "ja": "アラブ首長国連邦"
    },
    "AU": {
      "sc": "澳大利亚",
      "tc": "澳洲",
      "en": "Australia",
      "ja": "オーストラリア"
    },
    "CH": {
      "sc": "瑞士",
      "tc": "瑞士",
      "en": "Switzerland",
      "ja": "スイス"
    },
    "DK": {
      "sc": "丹麦",
      "tc": "丹麥",
      "en": "Denmark",
      "ja": "デンマーク"
    },
    "RO": {
      "sc": "罗马尼亚",
      "tc": "羅馬尼亞",
      "en": "Romania",
      "ja": "ルーマニア"
    },
    "SG": {
      "sc": "新加坡",
      "tc": "新加坡",
      "en": "Singapore",
      "ja": "シンガポール"
    },
    "GB": {
      "sc": "英国",
      "tc": "英國",
      "en": "United Kingdom",
      "ja": "英国"
    }
  };
  for (const [code, names] of Object.entries(areaNames)) {
    if (!MARKETS[code]) MARKETS[code] = names;
  }

  const groups = [
  {
    brand: "Back Waves",
    key: "backwaves",
    market: "SG",
    city: "Singapore",
    url: "https://backwaves.net/store/sg-sgp-global",
    currency: "HKD",
    ip: "local",
    from: true,
    evidence: ["static","dedicated-ipv4"],
    family: "SG | SIN | Global",
    filters: ["quota-transfer"],
    note: {
      sc: "商家为这个系列分配新加坡静态独享 IPv4 和 IPv6。端口共享，上传与下载合计计量。国际 BGP 没有中国大陆线路质量承诺。",
      tc: "商家為這個系列分配新加坡靜態獨享 IPv4 和 IPv6。連接埠共用，上傳與下載合計計量。國際 BGP 沒有中國大陸線路品質承諾。",
      en: "The store specifies dedicated static Singapore IPv4 and IPv6. Both directions count against the quota on a shared port. The international BGP network carries no mainland China performance guarantee.",
      ja: "専用のシンガポール固定 IPv4 と IPv6 を付与。共有ポートで送受信を合算。国際 BGP 回線の中国本土向け品質保証はありません。"
    },
    items: [
      ["sg01","SG | SIN | Global 01","29.90",1,"1 GB","8 GB NVMe","1 Gbps","2 TB"],
      ["sg02","SG | SIN | Global 02","59.90",2,"1 GB","10 GB NVMe","2 Gbps","5 TB"],
      ["sg03","SG | SIN | Global 03","119.90",3,"2 GB","15 GB NVMe","3 Gbps","10 TB"],
      ["sg04","SG | SIN | Global 04","299.90",4,"4 GB","20 GB NVMe","5 Gbps","30 TB"]
    ]
  },
  {
    brand: "Ciallo Networks",
    key: "ciallo",
    market: "HK",
    city: "Hong Kong",
    url: "https://ciallonetworks.com/index.php?rp=%2Fstore%2Fhongkong",
    review: "https://meowvps.com/blog/ciallohkepyc/",
    currency: "CNY",
    family: "Hong Kong EPYC",
    filters: ["quota-transfer"],
    note: {
      sc: "EPYC 机型提供 IPv4 /32 和 IPv6 /64。附上的测评讨论了额外出口选项，购买前可向商家确认当前可选运营商。",
      tc: "EPYC 機型提供 IPv4 /32 和 IPv6 /64。附上的測評討論了額外出口選項，購買前可向商家確認目前可選電信商。",
      en: "The EPYC series includes an IPv4 /32 and IPv6 /64. The linked review covers additional egress options. Check which carriers the store offers for a new instance.",
      ja: "EPYC シリーズには IPv4 /32 と IPv6 /64 が含まれます。レビューには追加出口の記録があります。契約時に利用できる回線は販売元に確認してください。"
    },
    items: [
      ["hk-lite","Hong Kong EPYC · Lite","19.90",1,"2 GB","20 GB NVMe","1 Gbps","1 TB"],
      ["hk-std","Hong Kong EPYC · Standard","39.80",2,"4 GB","40 GB NVMe","1 Gbps","2 TB"],
      ["hk-adv","Hong Kong EPYC · Advanced","79.60",4,"8 GB","80 GB NVMe","1 Gbps","4 TB"],
      ["hk-prem","Hong Kong EPYC · Premium","149.90",6,"16 GB","240 GB NVMe","1 Gbps","6 TB"]
    ]
  },
  {
    brand: "Wasabi Hosting",
    key: "wasabi",
    market: "SG",
    city: "Singapore",
    url: "https://billing.wasabihosting.com/store/singapore-vps",
    currency: "EUR",
    from: true,
    family: "Ryzen 9 9950X",
    note: {
      sc: "Ryzen 9 9950X、DDR5、NVMe 和异地备份。1 Gbps 受公平使用政策约束。",
      tc: "Ryzen 9 9950X、DDR5、NVMe 和異地備份。1 Gbps 受公平使用政策約束。",
      en: "Ryzen 9 9950X, DDR5, NVMe and off-site backups. The 1 Gbps port is subject to fair use.",
      ja: "Ryzen 9 9950X、DDR5、NVMe と遠隔バックアップを提供。1 Gbps は公平利用条件の対象です。"
    },
    items: [
      ["sg1","1GB - EXTREME PERFORMANCE - Singapore","7.00",1,"1 GB","25 GB NVMe","1 Gbps","FUP"],
      ["sg2","2GB - EXTREME PERFORMANCE - Singapore","10.00",1,"2 GB","35 GB NVMe","1 Gbps","FUP"],
      ["sg4","4GB - EXTREME PERFORMANCE - Singapore","15.00",2,"4 GB","45 GB NVMe","1 Gbps","FUP"]
    ]
  },
  {
    brand: "Lazco Cloud",
    key: "lazco",
    market: "TW",
    city: "Taipei",
    url: "https://cloud.lazco.tw/en/pricing",
    currency: "TWD",
    family: "Taipei Compute",
    filters: ["hourly","quota-transfer"],
    note: {
      sc: "台北定价页列出每小时费率和月价，含 NVMe。额外传输量按 GB 收费，各机房配额需按所选地区核对。",
      tc: "台北定價頁列出每小時費率和月價，含 NVMe。額外傳輸量按 GB 計費，各機房配額依選取地區而異。",
      en: "The Taipei pricing table lists hourly and monthly rates with NVMe storage. Excess transfer is billed per GB. Allowances are region-specific.",
      ja: "台北の料金表には時間単価と月額、NVMe 容量が載っています。超過転送量は GB 単位の課金。枠は地域別です。"
    },
    review: "https://www.nodeseek.com/post-1025226-1",
    items: [
      ["tpe1","Taipei · 1c-1g-30g","220",1,"1 GB","30 GB NVMe","2 Gbps","500 GB"],
      ["tpe2","Taipei · 1c-2g-60g","440",1,"2 GB","60 GB NVMe","2 Gbps","1 TB"],
      ["tpe4","Taipei · 2c-4g-90g","875",2,"4 GB","90 GB NVMe","2 Gbps","2 TB"]
    ]
  },
  {
    brand: "BERO HOST",
    key: "bero",
    market: "DE",
    city: "Frankfurt",
    url: "https://bero-host.de/server/prepaid-ryzen-vserver-mieten",
    review: "https://meowvps.com/vps/berohost/",
    currency: "EUR",
    family: "Prepaid Ryzen VPS",
    filters: ["quota-transfer"],
    note: {
      sc: "Ryzen 9 9950X、DDR5，30 天预付价含税。官方列出 10 Gbps 接入能力，流量按公平使用政策执行。",
      tc: "Ryzen 9 9950X、DDR5，30 天預付價含稅。官方列出 10 Gbps 接入能力，流量依公平使用政策執行。",
      en: "Ryzen 9 9950X with DDR5. The prepaid price includes VAT for 30 days. The advertised 10 Gbps is the network connection, with tier-specific fair-use allowances.",
      ja: "Ryzen 9 9950X と DDR5。30 日分の前払い料金は税込。ネットワーク接続は 10 Gbps、各プランに公平利用枠があります。"
    },
    items: [
      ["de-basic","Prepaid Ryzen · Basic","5.90",2,"6 GB","50 GB NVMe","10 Gbps","20 TB"],
      ["de-adv","Prepaid Ryzen · Advanced","11.90",4,"12 GB","100 GB NVMe","10 Gbps","30 TB"],
      ["de-power","Prepaid Ryzen · Power","20.90",6,"24 GB","200 GB NVMe","10 Gbps","40 TB"]
    ]
  },
  {
    brand: "ABLEnet",
    key: "ablenet",
    market: "JP",
    city: "Osaka",
    url: "https://www.ablenet.jp/vps/service/plan_fee.html",
    review: "https://www.ablenet.jp/vps/spec/",
    currency: "JPY",
    family: "Linux VPS SSD",
    note: {
      sc: "大阪机房的 Linux SSD 月缴续费价，价格含税。端口为共享 200 Mbps，IPv4 一个，月传输量不限。L1 初期优惠月价为 1,234 日元。",
      tc: "大阪機房的 Linux SSD 月繳續費價，價格含稅。連接埠共用 200 Mbps，IPv4 一個，月傳輸量不限。L1 初期優惠月價為 1,234 日圓。",
      en: "Tax-inclusive monthly renewal for the Linux SSD options in Osaka. One IPv4, shared 200 Mbps and unmetered transfer. L1 initially costs JPY 1,234 per month.",
      ja: "大阪の Linux SSD プランの税込月払い更新額です。共有 200 Mbps、IPv4 1 個、転送量無制限。L1 の初回特別料金は月額 1,234 円です。"
    },
    items: [
      ["osaka-l1","Linux L1 · SSD","1476",2,"2 GB","40 GB SSD","200 Mbps","∞"],
      ["osaka-l2","Linux L2 · SSD","2167",3,"4 GB","80 GB SSD","200 Mbps","∞"],
      ["osaka-l3","Linux L3 · SSD","2936",4,"8 GB","160 GB SSD","200 Mbps","∞"]
    ]
  },
  {
    brand: "VMRack",
    key: "vmrack",
    market: "LAX",
    city: "Los Angeles",
    url: "https://www.vmrack.net/pricing",
    currency: "USD",
    family: "L3.VPS",
    route: "CN2 / AS9929 / CMIN2",
    carriers: ["CT","CU","CM"],
    filters: ["optimized-transit","quota-transfer"],
    note: {
      sc: "商家在该组的回程栏列出 CN2、9929、CMIN2。磁盘为系统盘，传输量每月计，查看订单时应匹配完整 SKU 与机房。",
      tc: "商家在此組的回程欄列出 CN2、9929、CMIN2。磁碟為系統碟，傳輸量每月計，查看訂單時應比對完整 SKU 與機房。",
      en: "The vendor lists CN2, 9929 and CMIN2 for return routes. Figures are for the system disk and monthly transfer. Match the full SKU and facility at checkout.",
      ja: "事業者は復路に CN2、9929、CMIN2 を掲示。容量はシステムディスク、転送枠は月単位です。注文時は SKU と施設を照合してください。"
    },
    items: [
      ["dc2-base","L3.VPS.DC2.2C2G.Base","9.99",2,"2 GB","20 GB","500 Mbps","1 TB"],
      ["l3-22","L3.VPS.2C2G.Base","13.99",2,"2 GB","40 GB","500 Mbps","1500 GB"],
      ["l3-24","L3.VPS.2C4G.Base","19.99",2,"4 GB","60 GB","500 Mbps","2000 GB"],
      ["l3-44","L3.VPS.4C4G.Plus","49.99",4,"4 GB","80 GB","1 Gbps","4 TB"]
    ]
  },
  {
    brand: "ISVORO",
    key: "isvoro",
    market: "LAX",
    city: "Los Angeles",
    url: "https://isvoro.com/buy/USLAPro",
    pricing: "https://isvoro.com/buy/USLAPro?product=112",
    currency: "CNY",
    family: "USLA Pro",
    route: "CN2 / AS10099",
    carriers: ["CT","CU"],
    filters: ["optimized-transit","quota-transfer"],
    note: {
      sc: "Gold 6133 节点。商家说明电信 CN2、联通 AS10099，移动等走国际路由。不同档的流量额度和端口不同。",
      tc: "Gold 6133 節點。商家說明電信 CN2、聯通 AS10099，移動等走國際路由。各級距的流量額度和連接埠速率不同。",
      en: "Gold 6133 nodes. The provider names Telecom CN2 and Unicom AS10099, with international routing for Mobile. Port speed and transfer quota vary by tier.",
      ja: "Gold 6133 搭載。電信 CN2、聯通 AS10099 を掲示し、移動は国際回線です。プラン別に速度と転送枠が変わります。"
    },
    items: [
      ["la-mini","USLA Pro Mini","29.90",1,"1 GB","10 GB","200 Mbps","500 GB"],
      ["la-core","USLA Pro Core","59.99",1,"1 GB","10 GB","200 Mbps","1 TB"],
      ["la-standard","USLA Pro Standard","99.00",1,"1 GB","10 GB","200 Mbps","2 TB"]
    ]
  },
  {
    brand: "Geelinx",
    key: "geelinx",
    market: "GB",
    city: "London",
    url: "https://www.geelinx.com/cart?fid=1",
    currency: "EUR",
    term: "year",
    family: "London BGP 1#",
    route: "CMIN2",
    carriers: ["CM"],
    filters: ["optimized-transit","quota-transfer"],
    note: {
      sc: "商家列出 CMIN2 和 IPv6 直连。面向中国大陆的带宽为共享、尽力交付，价格按年收取。",
      tc: "商家列出 CMIN2 和 IPv6 直連。面向中國大陸的頻寬共用、盡力交付，價格按年收取。",
      en: "The store lists CMIN2 and direct IPv6 transit. Capacity to mainland China is shared and best effort. Prices are annual.",
      ja: "CMIN2 と IPv6 ダイレクト回線を掲示。中国本土向け帯域は共有のベストエフォート、料金は年払いです。"
    },
    items: [
      ["gb-clover","GB.LON.BGP.Clover","15.90",1,"0.5 GB","10 GB","80 Mbps","800 GB"],
      ["gb-taurus","GB.LON.BGP.Taurus","19.90",1,"1 GB","15 GB","100 Mbps","1 TB"]
    ]
  },
  {
    brand: "Host Addon",
    key: "hostaddon",
    market: "HK",
    city: "Hong Kong",
    url: "https://www.hostaddon.com/clients/index.php?rp=%2Fstore%2Fvps-10gbps-unmetered",
    currency: "USD",
    from: true,
    family: "HA10GU HK",
    note: {
      sc: "香港共享 10 Gbps 系列，传输量按公平使用政策不限量，含 IPv4 和 IPv6。",
      tc: "香港共用 10 Gbps 系列，傳輸量依公平使用政策不限量，附 IPv4 與 IPv6。",
      en: "Hong Kong series with a shared 10 Gbps port, unmetered transfer subject to fair use, IPv4 and IPv6.",
      ja: "香港の共有 10 Gbps シリーズ。公平利用条件の範囲で転送量無制限、IPv4 と IPv6 が付きます。"
    },
    items: [
      ["hk1","HA10GU HK - VPS 1","9.75",1,"512 MB","15 GB SSD","10 Gbps","∞ · FUP"],
      ["hk2","HA10GU HK - VPS 2","18.99",1,"1 GB","30 GB SSD","10 Gbps","∞ · FUP"]
    ]
  },
  {
    brand: "ISIF Cloud",
    key: "isif",
    market: "KR",
    city: "Seoul",
    url: "https://cloud.isif.net/vm/seoul",
    currency: "EUR",
    family: "GMP-A · Basic Compute",
    evidence: ["dedicated-ipv4"],
    filters: ["quota-transfer"],
    note: {
      sc: "首尔 Basic Compute 使用 KVM 和 NVMe，商家列出独享 IPv4 及 IPv6。此组为通用运算线路。",
      tc: "首爾 Basic Compute 使用 KVM 與 NVMe，商家列出獨享 IPv4 及 IPv6。此組為通用運算線路。",
      en: "Seoul Basic Compute is a general-purpose KVM series with NVMe. The vendor specifies dedicated IPv4 and IPv6.",
      ja: "ソウルの Basic Compute は KVM と NVMe の汎用回線シリーズ。専用 IPv4 と IPv6 が提供されます。"
    },
    items: [
      ["seoul-11","KR.GMP-A.1C1G","3.50",1,"1 GB","20 GB NVMe","200 Mbps","2 TB"],
      ["seoul-12","KR.GMP-A.1C2G","4.50",1,"2 GB","25 GB NVMe","500 Mbps","2.5 TB"],
      ["seoul-22","KR.GMP-A.2C2G","5.50",2,"2 GB","30 GB NVMe","1 Gbps","3 TB"]
    ]
  },
  {
    brand: "AkkoCloud",
    key: "akko",
    market: "DE",
    city: "Frankfurt",
    url: "https://www.akkocloud.com/cart.php?gid=7",
    currency: "CNY",
    term: "year",
    family: "Frankfurt KVM CN2",
    route: "CN2 GIA",
    carriers: ["CT","CU","CM"],
    filters: ["quota-transfer","optimized-transit"],
    note: {
      sc: "商家标注三网回程 CN2 GIA、移动去程直连。流量双向合计，商家不保证交付地址为原生 IP。",
      tc: "商家標示三網回程 CN2 GIA、移動去程直連。流量雙向合計，商家不保證交付位址為原生 IP。",
      en: "The vendor lists CN2 GIA return routes for all three carriers and direct inbound China Mobile. Both traffic directions count. Native address allocation is not guaranteed.",
      ja: "中国三社向け復路は CN2 GIA、移動の往路は直結と掲示。送受信を合算し、ネイティブ IP の割り当ては保証されません。"
    },
    items: [
      ["fra-a2","Frankfurt · KVM-CN2-A2 mini","449",1,"1024 MB","15 GB SSD","1 Gbps","800 GB"],
      ["fra-b1","Frankfurt · KVM-CN2-B1 mini","699",1,"1024 MB","20 GB SSD","1 Gbps","1200 GB"]
    ]
  },
  {
    brand: "FXTRANSIT",
    key: "fxtransit",
    market: "LAX",
    city: "Los Angeles",
    url: "https://fxtransit.io/store?billing=yearly&network=NOVA&plan=d31e54df-6489-46f7-8f81-9087ce6645df&region=us-lax",
    currency: "USD",
    term: "year",
    family: "US China Access NOVA",
    route: "CN2 AS4809 / CUG AS9929 / CMI AS58453",
    carriers: ["CT","CU","CM"],
    filters: ["quota-transfer","optimized-transit"],
    note: {
      sc: "此报价来自 US NOVA Nano 的年付配置器。它列出一个 IPv4 及每月 500 GB，须在区域选择 Los Angeles。",
      tc: "此報價來自 US NOVA Nano 的年付配置器。它列出一個 IPv4 與每月 500 GB，須在區域選擇 Los Angeles。",
      en: "The Los Angeles US NOVA Nano annual configurator lists one IPv4 and 500 GB per month. Use the Los Angeles selection for this quote.",
      ja: "ロサンゼルス向け US NOVA Nano の年払い設定には IPv4 1 個と月間 500 GB を記載。この料金は Los Angeles 選択時です。"
    },
    items: [
      ["lax-nano","US NOVA - Nano","36.00",1,"1 GB","20 GB SSD","500 Mbps","500 GB"]
    ]
  },
  {
    brand: "NoSLA Cloud",
    key: "nosla",
    market: "JP",
    city: "Tokyo",
    url: "https://ccp.nosla.cloud/order/main/packages/tyo-pre-nor/?group_id=32",
    pricing: "https://www.gsvps.com/articles/nosla-cloud-vps-ping-ce-duo-di-qu-zhong-guo-you-hua-xian-lu-he-ji",
    historical: true,
    currency: "CNY",
    family: "Tokyo Premium KVM",
    route: "CN2 / AS10099–9929 / CMIN2",
    carriers: ["CT","CU","CM"],
    filters: ["quota-transfer","optimized-transit"],
    evidence: ["broadcast"],
    note: {
      sc: "东京机房使用德国 IPv4，端口共享，流量双向合计。标价为 GSVPS 收录的参考月价；官方列出首次设置费 30 元，订单页选择周期后确认应付金额。",
      tc: "東京機房使用德國 IPv4，連接埠共用，流量雙向合計。標價為 GSVPS 收錄的參考月價。官方列出首次設定費 30 元，結帳時選付款週期確認金額。",
      en: "German IPv4 space is used in Tokyo. Both directions count on a shared port. The shown monthly rate is from a GSVPS review. The store lists a CNY 30 setup fee. Select the billing cycle for the current total.",
      ja: "東京拠点でドイツの IPv4 を使用。共有ポートで送受信を合算。掲載月額は GSVPS の記録。初期設定料は公式表記で 30 元、最新の合計は注文周期選択後に確認できます。"
    },
    items: [
      ["tyo-s","Tokyo Premium · S","189",1,"2 GB","30 GB NVMe","500 Mbps","500 GB"],
      ["tyo-m","Tokyo Premium · M","359",2,"4 GB","60 GB NVMe","1 Gbps","1000 GB"]
    ]
  },
  {
    brand: "OrangeVPS",
    key: "orange",
    market: "SG",
    city: "Singapore",
    url: "https://portal.orangevps.com/store/vps-ap-basic-cpu",
    review: "https://meowvps.com/blog/orangesg/",
    currency: "USD",
    from: true,
    family: "Asia BASIC CPU",
    filters: ["quota-transfer"],
    note: {
      sc: "在亚洲系列订单中选新加坡。默认 IPv4 的原生属性没有保证，新加坡原生 IPv4 是另购项目。报价使用标准流量。",
      tc: "在亞洲系列訂單中選新加坡。預設 IPv4 的原生屬性沒有保證，新加坡原生 IPv4 是另購項目。報價使用標準流量。",
      en: "Choose Singapore in the Asia series. Native IPv4 is an optional Singapore add-on. Listed transfer is the standard quota.",
      ja: "アジア向け注文でシンガポールを選択。ネイティブ IPv4 は有料の追加項目です。掲載の転送量は通常枠です。"
    },
    items: [
      ["sg-ap1","BASIC-AP-1","6.00",1,"2 GB","25 GB NVMe","1 Gbps","2 TB"],
      ["sg-ap2","BASIC-AP-2","12.00",2,"4 GB","40 GB NVMe","1 Gbps","4 TB"]
    ]
  },
  {
    brand: "Coffee Host",
    key: "coffee",
    market: "TW",
    city: "",
    url: "https://store.coffeehost.net/store/tw-vps-epyc",
    currency: "TWD",
    from: true,
    family: "TW EPYC VPS · 7601",
    filters: ["quota-transfer"],
    note: {
      sc: "台湾 EPYC 7601 系列，官方以 GiB/TiB 标示容量和传输量。下单须身分验证，遭受 DDoS 攻击时会封锁连接 30 分钟。订购页未列端口速率。",
      tc: "台灣 EPYC 7601 系列，官方以 GiB/TiB 標示容量和傳輸量。下單須身分驗證，遇 DDoS 攻擊時會封鎖連線 30 分鐘。訂購頁未列連接埠速率。",
      en: "Taiwan EPYC 7601 series. Capacities are in GiB or TiB. Identity verification is required. The store lists a 30-minute block in case of DDoS and does not publish a port rate.",
      ja: "台湾の EPYC 7601 シリーズ。容量は GiB/TiB 表示、購入には本人確認が必要です。DDoS 時は 30 分間遮断。販売ページにポート速度の公表はありません。"
    },
    items: [
      ["tw-e1","TW-VPS-E1","190",1,"2 GiB","10 GiB NVMe","","512 GiB"],
      ["tw-e2","TW-VPS-E2","290",1,"4 GiB","20 GiB NVMe","","512 GiB"],
      ["tw-e3","TW-VPS-E3","590",2,"8 GiB","40 GiB NVMe","","1 TiB"]
    ]
  },
  {
    brand: "YINNET",
    key: "yinnet",
    market: "TW",
    city: "",
    url: "https://www.yin-net.com/index.php?rp=%2Fstore%2Ftwvps",
    currency: "USD",
    from: true,
    family: "Taiwan VPS",
    ip: "local",
    evidence: ["native"],
    filters: ["quota-transfer"],
    note: {
      sc: "商家描述为台湾原生 IPv4 + IPv6、国际线路，未提供 DDoS 防御。原生属性来源为这个产品组的商品说明。",
      tc: "商家描述為台灣原生 IPv4 + IPv6、國際線路，未提供 DDoS 防禦。原生屬性來源為此產品組的商品說明。",
      en: "The product group advertises native Taiwan IPv4 and IPv6 with international transit and no DDoS protection. The native-IP label is the provider’s claim.",
      ja: "事業者は台湾ネイティブ IPv4 + IPv6、国際回線、DDoS 防御なしと記載。ネイティブ IP はこの商品群の事業者表記です。"
    },
    items: [
      ["tw1","Taiwan VPS ①","10.00",1,"1 GB","10 GB","200 Mbps","1000 GB"],
      ["tw2","Taiwan VPS ②","15.00",2,"2 GB","20 GB","300 Mbps","2000 GB"]
    ]
  },
  {
    brand: "LightLayer",
    key: "lightlayer",
    market: "SJC",
    city: "San Jose",
    url: "https://account.lightlayer.net/?action=add&cmd=cart&id=476",
    pricing: "https://account.lightlayer.net/?cmd=news&action=view&id=17",
    currency: "USD",
    family: "SJ-Lite Cloud",
    filters: ["quota-transfer"],
    note: {
      sc: "Linux 专用，HDD 存储，可加购流量。列出官方公告中的常规价；首发折扣限 60 台，库存和码在结账时确认。",
      tc: "Linux 專用、HDD 儲存，可加購流量。列出官方公告的常規價。首發折扣限 60 台，庫存與折扣碼於結帳時確認。",
      en: "Linux only, HDD storage and optional extra transfer. This is the regular price in the launch announcement. The launch discount was limited to 60 units.",
      ja: "Linux 専用、HDD 搭載、転送量を追加購入できます。掲載額は発売案内の通常料金です。発売割引は 60 台限定でした。"
    },
    items: [
      ["sj-lite","SJ-Lite Cloud","4.90",1,"1 GB","50 GB HDD","300 Mbps","500 GB"]
    ]
  },
  {
    brand: "VMISS",
    key: "vmiss",
    market: "LAX",
    city: "Los Angeles",
    url: "https://app.vmiss.com/store/us-los-angeles-cmin2",
    currency: "CAD",
    from: true,
    family: "US.LA.CMIN2",
    route: "CMIN2",
    carriers: ["CM"],
    filters: ["quota-transfer","optimized-transit"],
    note: {
      sc: "本组按加元起价月付，各档含一个 IPv4。CMIN2 是该商品组的运营商线路标识。",
      tc: "本組以加元起價月繳，各級距附一個 IPv4。CMIN2 為此商品組的電信商線路標示。",
      en: "This CMIN2 product group lists starting prices in Canadian dollars per month. Each tier includes one IPv4.",
      ja: "CMIN2 シリーズの月額開始価格はカナダドルです。各プランに IPv4 1 個が付属します。"
    },
    review: "https://www.nodeseek.com/post-823840-1",
    items: [
      ["la-basic","US.LA.CMIN2.Basic","5.00",1,"1024 MB","10 GB SSD","200 Mbps","400 GB"],
      ["la-core","US.LA.CMIN2.Core","10.00",1,"1024 MB","15 GB SSD","200 Mbps","800 GB"],
      ["la-pro","US.LA.CMIN2.Pro","16.00",1,"2048 MB","20 GB SSD","300 Mbps","1200 GB"]
    ]
  },
  {
    brand: "SixtyNet",
    key: "sixtynet",
    market: "LAX",
    city: "Los Angeles",
    url: "https://sixtynet.net/index.php?rp=%2Fstore%2Fat-and-t-mobility-residential",
    currency: "USD",
    from: true,
    family: "ISP Residential VPS",
    ip: "residential",
    evidence: ["residential"],
    filters: ["quota-transfer"],
    note: {
      sc: "洛杉矶住宅系列，官网将 IP 描述为双 ISP 住宅。因产品限制，80 和 443 端口关闭。此组未记录特定实例的回程 ASN。",
      tc: "洛杉磯住宅系列，官網將 IP 描述為雙 ISP 住宅。受產品限制，80 和 443 連接埠關閉。此組未記錄特定實例的回程 ASN。",
      en: "The Los Angeles store describes these as dual-ISP residential IPs. Ports 80 and 443 are closed. Per-instance return-path ASNs are not documented for these tiers.",
      ja: "ロサンゼルスのデュアル ISP 住宅 IP という事業者表記です。80/443 番ポートは閉鎖。個別インスタンスの復路 ASN は記載されていません。"
    },
    items: [
      ["la-micro","Residential-MICRO","45.00",4,"4 GB","80 GB NVMe","4 Gbps","10 TB"],
      ["la-medium","Residential-MEDIUM","85.00",8,"8 GB","160 GB NVMe","10 Gbps","20 TB"]
    ]
  }
  ];

  const hostAddon = groups.find(group => group.key === 'hostaddon');
  const regionalPortNote = {
    "sc": "共享 10 Gbps，依公平使用政策不限量。含 IPv4 及 IPv6，官方按国家列出该方案。",
    "tc": "共用 10 Gbps，依公平使用政策不限量。含 IPv4 及 IPv6，商家按國家列出此方案。",
    "en": "Shared 10 Gbps, unmetered under fair use. IPv4 and IPv6 are included. The storefront identifies the facility by country.",
    "ja": "共有 10 Gbps、フェアユース条件で転送量無制限。IPv4 と IPv6 が付きます。設置場所は国単位で掲載されています。"
  };
  for (const market of ['AE', 'AU', 'CH', 'DK', 'RO']) {
    groups.push({
      ...hostAddon, market, city: '', family: 'HA10GU ' + market, note: regionalPortNote,
      items: [[market.toLowerCase() + '1', 'HA10GU ' + market + ' - VPS 1', '9.75', 1, '512 MB', '15 GB SSD', '10 Gbps', '∞ · FUP']]
    });
  }

  const reportBySku = {
    'field-vmrack-dc2-base': 'https://www.nodeseek.com/post-857606-1',
    'field-isvoro-la-mini': 'https://www.nodeseek.com/post-989968-1'
  };
  const monitored = new Set(['field-backwaves-sg01', 'field-wasabi-sg1']);
  const dimensions = new Map(Object.entries(IP_EVIDENCE_OPTIONS).flatMap(([dimension, options]) =>
    options.map(value => [value, dimension])
  ));
  for (const group of groups) {
    for (const [code, sku, price, cores, ram, disk, port, traffic] of group.items) {
      const id = 'field-' + group.key + '-' + code;
      const spec = {
        sku, price, currency: group.currency, term: group.term || 'month',
        cpu: cores + ' vCPU', ram, disk, port, traffic,
        proof: group.pricing || group.url, date: checked, sourceNote: group.note
      };
      if (group.historical) spec.priceType = 'review';
      if (group.from) spec.priceType = 'from';
      const plan = {
        id, provider: group.brand, market: group.market, city: group.city, plan: sku,
        kind: 'vps', ip: group.ip || 'unknown', route: group.route ? 'claimed' : 'unknown',
        routeName: group.route || '', carriers: group.carriers || [], url: group.url,
        proof: reportBySku[id] || group.review || group.url, notes: group.note,
        networkFilters: group.filters || [], searchTerms: [group.family, sku], spec
      };
      if (monitored.has(id)) plan.stockKey = id;
      PLANS.push(plan);
      if (group.evidence) {
        IP_EVIDENCE.set(id, group.evidence.map(value => ({
          dimension: dimensions.get(value), value, provider: group.brand,
          market: group.market, sku, url: group.url, scope: 'sku', checked, note: group.note
        })));
      }
    }
  }
})();
