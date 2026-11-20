// Country-specific merchant storefront quotes collected 2026-11-20.
(() => {
  const checked = '2026-11-20';
  const providers = [
    {
      code: "hostzone-br",
      brand: "Hostzone",
      market: "BR",
      city: "São Paulo",
      currency: "BRL",
      proof: "https://hostzone.com.br/vps-brasil-sao-paulo/",
      note: {
        sc: "圣保罗价目表的月缴价，含一个 IPv4。商家列出默认 10 Gbps 接入，可另行升级。",
        tc: "聖保羅價目表的月繳價，含一個 IPv4。商家列出預設 10 Gbps 接入，可另行升級。",
        en: "Monthly São Paulo pricing includes one IPv4. The vendor lists a standard 10 Gbps connection and an optional upgrade.",
        ja: "サンパウロの月払い料金には IPv4 が 1 個含まれます。標準接続は 10 Gbps で、拡張も選択できます。"
      },
      plans: [
        ["start","VPS Start","59",1,"1 GB","40 GB NVMe","10 Gbps"],
        ["pro","VPS Pro","118",2,"2 GB","50 GB NVMe","10 Gbps"],
        ["business","VPS Business","206",4,"4 GB","75 GB NVMe","10 Gbps"]
      ]
    },
    {
      code: "hospede-br",
      brand: "Hospede Aqui",
      market: "BR",
      city: "São Paulo",
      currency: "BRL",
      proof: "https://hospedeaqui.cloud/contratar/vps/personalizada",
      address: true,
      note: {
        sc: "列价对应配置器中 4 核、16 GB 内存及 100 GB NVMe 的组合。含独享 IPv4，不按传输量计费。调整资源后价格重算。",
        tc: "列價對應設定頁的 4 核、16 GB 記憶體及 100 GB NVMe 組合。含獨享 IPv4，不依傳輸量計費。更改資源後價格重算。",
        en: "This is the configurator’s displayed 4-core, 16 GB, 100 GB NVMe selection. It includes dedicated IPv4 and unmetered transfer. Changing the resources changes the quote.",
        ja: "設定画面の 4 コア、16 GB RAM、100 GB NVMe の組み合わせです。専用 IPv4 と無制限転送が含まれ、リソース変更で再計算されます。"
      },
      plans: [
        ["custom","VPS personalizada Linux · 4C/16G","156.90",4,"16 GB","100 GB NVMe","","∞"]
      ]
    },
    {
      code: "inan-cl",
      brand: "INAN",
      market: "CL",
      city: "Santiago",
      currency: "CLP",
      proof: "https://inan.cl/servidores-vps/",
      note: {
        sc: "圣地亚哥机房。月缴报价未计智利 IVA。默认 1 Gbps，商家提供不限量传输及选购端口升级。",
        tc: "聖地牙哥機房。月繳報價未計智利 IVA。預設 1 Gbps，商家提供不限量傳輸及選購連接埠升級。",
        en: "Santiago facility. Monthly CLP prices exclude Chilean VAT. The baseline port is 1 Gbps with unmetered transfer and an optional speed upgrade.",
        ja: "サンティアゴ拠点。月額はチリの付加価値税別。標準 1 Gbps、転送量無制限でポート拡張を選べます。"
      },
      plans: [
        ["xs","VPS-XS","9000",1,"2 GB","40 GB SSD","1 Gbps","∞"],
        ["s","VPS-S","15000",2,"4 GB","60 GB SSD","1 Gbps","∞"],
        ["m","VPS-M","20000",3,"6 GB","80 GB SSD","1 Gbps","∞"]
      ]
    },
    {
      code: "hostspace-mx",
      brand: "HostSpace",
      market: "MX",
      city: "Mexico City",
      currency: "MXN",
      proof: "https://www.hostspace.mx/servidores-vps",
      address: true,
      filters: ["quota-transfer"],
      note: {
        sc: "订单选择 Ciudad de México。此处为含 IVA 的标准月价，年缴折扣、首期活动价与付费备份单独计算。",
        tc: "訂單選擇 Ciudad de México。此處為含 IVA 的標準月價，年繳折扣、首期活動價與付費備份另計。",
        en: "Select Ciudad de México at checkout. Regular monthly pricing includes VAT. Annual discounts, introductory offers and optional backups are separate.",
        ja: "注文時に Ciudad de México を選択。掲載額は付加価値税込みの通常月額です。年払い割引、初回特典、バックアップは別条件です。"
      },
      plans: [
        ["1","VPS 1 GB","199",1,"1 GB","25 GB SSD","","1 TB"],
        ["2","VPS 2 GB","379",1,"2 GB","55 GB SSD","","2 TB"]
      ]
    },
    {
      code: "webacumen-za",
      brand: "WebAcumen",
      market: "ZA",
      city: "Johannesburg",
      currency: "ZAR",
      proof: "https://www.webacumen.co.za/services/vps-hosting",
      address: true,
      note: {
        sc: "约翰内斯堡 Teraco Isando，Linux KVM 自管方案。按月预付、不含 VAT。含 IPv4 及 IPv6 /64，传输量受公平使用政策约束。",
        tc: "約翰尼斯堡 Teraco Isando，Linux KVM 自管方案。按月預付、不含 VAT。含 IPv4 及 IPv6 /64，傳輸量依公平使用政策辦理。",
        en: "Self-managed Linux KVM in Teraco Isando, Johannesburg. Monthly prepayment excludes VAT. Includes dedicated IPv4, an IPv6 /64 and unmetered traffic subject to fair use.",
        ja: "ヨハネスブルグの Teraco Isando で提供する自己管理 Linux KVM。月額は前払い・VAT 別。専用 IPv4 と IPv6 /64、フェアユース条件付き無制限転送が含まれます。"
      },
      plans: [
        ["2","VPS 2 GB","249",1,"2 GB DDR5","50 GB NVMe","500 Mbps","∞ · FUP"],
        ["4","VPS 4 GB","499",2,"4 GB DDR5","100 GB NVMe","500 Mbps","∞ · FUP"],
        ["8","VPS 8 GB","999",4,"8 GB DDR5","200 GB NVMe","500 Mbps","∞ · FUP"]
      ]
    },
    {
      code: "virtualcloud-in",
      brand: "VirtualCloud India",
      market: "IN",
      city: "Mumbai",
      currency: "INR",
      proof: "https://virtualcloud.in/vps-mumbai.html",
      filters: ["quota-transfer"],
      note: {
        sc: "结账选 Mumbai / IN-WEST。各档每 30 天为一期，月价另加 18% GST。含一个 IPv4 及 5 TB 月流量。",
        tc: "結帳選 Mumbai / IN-WEST。各級距每 30 天為一期，月價另加 18% GST。含一個 IPv4 與 5 TB 月流量。",
        en: "Select Mumbai / IN-WEST. Billing periods are 30 days and the published monthly rate excludes 18% GST. One IPv4 and 5 TB of transfer are included.",
        ja: "購入時に Mumbai / IN-WEST を選択。30 日単位の掲載額は GST 18% 別。IPv4 1 個と月間転送枠 5 TB が含まれます。"
      },
      plans: [
        ["starter","Starter","674",2,"4 GB","40 GB NVMe","","5 TB"],
        ["standard","Standard","1348",4,"8 GB","80 GB NVMe","","5 TB"],
        ["performance","Performance","2696",8,"16 GB","160 GB NVMe","","5 TB"]
      ]
    },
    {
      code: "datadack-in",
      brand: "DataDack Cloud",
      market: "IN",
      city: "Noida",
      currency: "INR",
      proof: "https://www.datadack.cloud/products/vm",
      filters: ["hourly"],
      note: {
        sc: "诺伊达 ap-south-3 的月付目录。租户共享 1 Gbps 网络。Starter 使用 SAS HDD，GP Small 使用 SSD，另有按小时费率。",
        tc: "諾伊達 ap-south-3 的月付目錄。租戶共用 1 Gbps 網路。Starter 使用 SAS HDD，GP Small 使用 SSD，另有按小時費率。",
        en: "Monthly ap-south-3 pricing in Noida. Tenants share a 1 Gbps network. Starter uses SAS HDD and GP Small uses SSD. Hourly rates are also listed.",
        ja: "ノイダ ap-south-3 の月額料金。ネットワークは共有 1 Gbps。Starter は SAS HDD、GP Small は SSD を採用し、時間料金も掲載されています。"
      },
      plans: [
        ["starter4","Starter 4","1150",2,"4 GB","30 GB SAS HDD","1 Gbps"],
        ["starter8","Starter 8","2080",2,"8 GB","30 GB SAS HDD","1 Gbps"],
        ["gp-small","GP Small","1860",2,"4 GB","30 GB SSD","1 Gbps"]
      ]
    }
  ];
  for (const merchant of providers) {
    for (const [key, sku, price, cores, ram, disk, port, traffic] of merchant.plans) {
      const id = 'local-' + merchant.code + '-' + key;
      const spec = {
        sku, price, currency: merchant.currency, term: 'month', cpu: cores + ' vCPU',
        ram, disk, port: port || '', traffic: traffic || '', proof: merchant.proof,
        date: checked, sourceNote: merchant.note
      };
      PLANS.push({
        id, provider: merchant.brand, market: merchant.market, city: merchant.city,
        plan: sku, kind: 'vps', ip: 'unknown', route: 'unknown', routeName: '', carriers: [],
        url: merchant.proof, proof: merchant.proof, notes: merchant.note,
        networkFilters: merchant.filters || [], searchTerms: [merchant.city, sku], spec
      });
      if (merchant.address) {
        IP_EVIDENCE.set(id, [{
          dimension: 'sharing', value: 'dedicated-ipv4', scope: 'sku', checked,
          sku, provider: merchant.brand, market: merchant.market, url: merchant.proof,
          note: merchant.note
        }]);
      }
    }
  }
})();
