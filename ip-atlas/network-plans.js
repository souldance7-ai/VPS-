const NETWORK_PLANS = [
 {
  "id": "mk-4",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "腾讯广州八线 BGP → 香港 · IEPL · 1TB",
   "tc": "騰訊廣州八線 BGP → 香港 · IEPL · 1TB",
   "en": "Tencent Guangzhou BGP (8 networks) → Hong Kong · IEPL · 1TB",
   "ja": "騰訊・広州 BGP（8回線） → 香港 · IEPL · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "腾讯广州八线 BGP → 香港 · IEPL",
   "tc": "騰訊廣州八線 BGP → 香港 · IEPL",
   "en": "Tencent Guangzhou BGP (8 networks) → Hong Kong · IEPL",
   "ja": "騰訊・広州 BGP（8回線） → 香港 · IEPL"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/gz-hk-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-广港IEPL",
   "gz-hk-1t",
   "腾讯广州八线BGP",
   "香港BGP",
   "腾讯广州八线 BGP → 香港 · IEPL",
   "騰訊廣州八線 BGP → 香港 · IEPL",
   "Tencent Guangzhou BGP (8 networks) → Hong Kong · IEPL",
   "騰訊・広州 BGP（8回線） → 香港 · IEPL"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gz-hk-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gz-hk-1t",
   "price": "358",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gz-hk-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-4"
 },
 {
  "id": "mk-43",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "腾讯广州八线 BGP → 香港 · IEPL · 5 Mbps",
   "tc": "騰訊廣州八線 BGP → 香港 · IEPL · 5 Mbps",
   "en": "Tencent Guangzhou BGP (8 networks) → Hong Kong · IEPL · 5 Mbps",
   "ja": "騰訊・広州 BGP（8回線） → 香港 · IEPL · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "腾讯广州八线 BGP → 香港 · IEPL",
   "tc": "騰訊廣州八線 BGP → 香港 · IEPL",
   "en": "Tencent Guangzhou BGP (8 networks) → Hong Kong · IEPL",
   "ja": "騰訊・広州 BGP（8回線） → 香港 · IEPL"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/gz-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iepl",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-广港IEPL",
   "gz-hk-5m",
   "腾讯广州八线BGP",
   "香港BGP",
   "腾讯广州八线 BGP → 香港 · IEPL",
   "騰訊廣州八線 BGP → 香港 · IEPL",
   "Tencent Guangzhou BGP (8 networks) → Hong Kong · IEPL",
   "騰訊・広州 BGP（8回線） → 香港 · IEPL"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gz-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gz-hk-5m",
   "price": "500",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gz-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-43"
 },
 {
  "id": "mk-183",
  "market": "JP",
  "city": "Japan",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 日本 · IPLC · 1TB",
   "tc": "上海電信 → 日本 · IPLC · 1TB",
   "en": "Shanghai Telecom → Japan · IPLC · 1TB",
   "ja": "上海・中国電信 → 日本 · IPLC · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 日本 · IPLC",
   "tc": "上海電信 → 日本 · IPLC",
   "en": "Shanghai Telecom → Japan · IPLC",
   "ja": "上海・中国電信 → 日本 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-jp-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-沪日IPLC",
   "sh-jp-1t",
   "上海电信",
   "日本BGP",
   "上海电信 → 日本 · IPLC",
   "上海電信 → 日本 · IPLC",
   "Shanghai Telecom → Japan · IPLC",
   "上海・中国電信 → 日本 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-jp-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-jp-1t",
   "price": "358",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-jp-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-183"
 },
 {
  "id": "mk-44",
  "market": "JP",
  "city": "Japan",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 日本 · IPLC · 5 Mbps",
   "tc": "上海電信 → 日本 · IPLC · 5 Mbps",
   "en": "Shanghai Telecom → Japan · IPLC · 5 Mbps",
   "ja": "上海・中国電信 → 日本 · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 日本 · IPLC",
   "tc": "上海電信 → 日本 · IPLC",
   "en": "Shanghai Telecom → Japan · IPLC",
   "ja": "上海・中国電信 → 日本 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-jp-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪日IPLC",
   "sh-jp-5m",
   "上海电信",
   "日本BGP",
   "上海电信 → 日本 · IPLC",
   "上海電信 → 日本 · IPLC",
   "Shanghai Telecom → Japan · IPLC",
   "上海・中国電信 → 日本 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-jp-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-jp-5m",
   "price": "600",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-jp-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-44"
 },
 {
  "id": "mk-46",
  "market": "JP",
  "city": "Japan",
  "provider": "Mkcloud",
  "plan": {
   "sc": "UCloud 上海 BGP → 日本 · IPLC · 5 Mbps",
   "tc": "UCloud 上海 BGP → 日本 · IPLC · 5 Mbps",
   "en": "UCloud Shanghai BGP → Japan · IPLC · 5 Mbps",
   "ja": "UCloud 上海 BGP → 日本 · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "UCloud 上海 BGP → 日本 · IPLC",
   "tc": "UCloud 上海 BGP → 日本 · IPLC",
   "en": "UCloud Shanghai BGP → Japan · IPLC",
   "ja": "UCloud 上海 BGP → 日本 · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/shh-jp-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪日IPLC",
   "sh-jp-5m",
   "UCloud上海BGP",
   "日本BGP",
   "UCloud 上海 BGP → 日本 · IPLC",
   "UCloud 上海 BGP → 日本 · IPLC",
   "UCloud Shanghai BGP → Japan · IPLC",
   "UCloud 上海 BGP → 日本 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/shh-jp-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-jp-5m",
   "price": "700",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/shh-jp-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-46"
 },
 {
  "id": "mk-190",
  "market": "US",
  "city": "United States",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 美国 · IPLC · 1TB",
   "tc": "上海電信 → 美國 · IPLC · 1TB",
   "en": "Shanghai Telecom → United States · IPLC · 1TB",
   "ja": "上海・中国電信 → 米国 · IPLC · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 美国 · IPLC",
   "tc": "上海電信 → 美國 · IPLC",
   "en": "Shanghai Telecom → United States · IPLC",
   "ja": "上海・中国電信 → 米国 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-us-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-沪美IPLC",
   "sh-us-1t",
   "上海电信",
   "美国BGP",
   "上海电信 → 美国 · IPLC",
   "上海電信 → 美國 · IPLC",
   "Shanghai Telecom → United States · IPLC",
   "上海・中国電信 → 米国 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-us-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-us-1t",
   "price": "428",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-us-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-190"
 },
 {
  "id": "mk-45",
  "market": "US",
  "city": "United States",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 美国 · IPLC · 5 Mbps",
   "tc": "上海電信 → 美國 · IPLC · 5 Mbps",
   "en": "Shanghai Telecom → United States · IPLC · 5 Mbps",
   "ja": "上海・中国電信 → 米国 · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 美国 · IPLC",
   "tc": "上海電信 → 美國 · IPLC",
   "en": "Shanghai Telecom → United States · IPLC",
   "ja": "上海・中国電信 → 米国 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-us-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪美IPLC",
   "sh-us-5m",
   "上海电信",
   "美国BGP",
   "上海电信 → 美国 · IPLC",
   "上海電信 → 美國 · IPLC",
   "Shanghai Telecom → United States · IPLC",
   "上海・中国電信 → 米国 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-us-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-us-5m",
   "price": "800",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-us-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-45"
 },
 {
  "id": "mk-62",
  "market": "US",
  "city": "United States",
  "provider": "Mkcloud",
  "plan": {
   "sc": "UCloud 上海 BGP → 美国 · IPLC · 5 Mbps",
   "tc": "UCloud 上海 BGP → 美國 · IPLC · 5 Mbps",
   "en": "UCloud Shanghai BGP → United States · IPLC · 5 Mbps",
   "ja": "UCloud 上海 BGP → 米国 · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "UCloud 上海 BGP → 美国 · IPLC",
   "tc": "UCloud 上海 BGP → 美國 · IPLC",
   "en": "UCloud Shanghai BGP → United States · IPLC",
   "ja": "UCloud 上海 BGP → 米国 · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/shh-us-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪美IPLC",
   "sh-us-5m",
   "UCloud上海BGP",
   "美国BGP",
   "UCloud 上海 BGP → 美国 · IPLC",
   "UCloud 上海 BGP → 美國 · IPLC",
   "UCloud Shanghai BGP → United States · IPLC",
   "UCloud 上海 BGP → 米国 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/shh-us-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-us-5m",
   "price": "850",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/shh-us-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-62"
 },
 {
  "id": "mk-91",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "深圳云厂 BGP → 香港 · IXP · 2TB",
   "tc": "深圳雲廠 BGP → 香港 · IXP · 2TB",
   "en": "Shenzhen cloud BGP → Hong Kong · IXP · 2TB",
   "ja": "深圳クラウド BGP → 香港 · IXP · 2TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "深圳云厂 BGP → 香港 · IXP",
   "tc": "深圳雲廠 BGP → 香港 · IXP",
   "en": "Shenzhen cloud BGP → Hong Kong · IXP",
   "ja": "深圳クラウド BGP → 香港 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-hk-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。 达到套餐流量后停机。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。 達到方案流量後停機。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address. The instance is stopped when its transfer allowance is exhausted.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。 転送量を使い切るとインスタンスは停止します。"
  },
  "networkFilters": [
   "ixp",
   "quota-transfer"
  ],
  "searchTerms": [
   "2TB流量-深圳上云互联优化专线",
   "cloud-hk-2t-new",
   "云厂优化网络通道",
   "香港BGP",
   "深圳云厂 BGP → 香港 · IXP",
   "深圳雲廠 BGP → 香港 · IXP",
   "Shenzhen cloud BGP → Hong Kong · IXP",
   "深圳クラウド BGP → 香港 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-hk-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-hk-2t-new",
   "price": "158",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "1000 Mbps · 峰值",
    "tc": "1000 Mbps · 峰值",
    "en": "1000 Mbps · peak",
    "ja": "1000 Mbps · ピーク"
   },
   "traffic": {
    "sc": "2TB / 月",
    "tc": "2TB / 月",
    "en": "2TB / month",
    "ja": "2TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-hk-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-91"
 },
 {
  "id": "mk-196",
  "market": "JP",
  "city": "Japan",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 日本 · IXP · 1TB",
   "tc": "上海雲廠 BGP → 日本 · IXP · 1TB",
   "en": "Shanghai cloud BGP → Japan · IXP · 1TB",
   "ja": "上海クラウド BGP → 日本 · IXP · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 日本 · IXP",
   "tc": "上海雲廠 BGP → 日本 · IXP",
   "en": "Shanghai cloud BGP → Japan · IXP",
   "ja": "上海クラウド BGP → 日本 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-jp-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。 达到套餐流量后停机。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。 達到方案流量後停機。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address. The instance is stopped when its transfer allowance is exhausted.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。 転送量を使い切るとインスタンスは停止します。"
  },
  "networkFilters": [
   "ixp",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-上海上云互联优化专线",
   "cloud-jp-1t-new",
   "云厂优化网络通道",
   "日本BGP",
   "上海云厂 BGP → 日本 · IXP",
   "上海雲廠 BGP → 日本 · IXP",
   "Shanghai cloud BGP → Japan · IXP",
   "上海クラウド BGP → 日本 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-jp-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-jp-1t-new",
   "price": "166",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-jp-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-196"
 },
 {
  "id": "mk-108",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "深圳云厂 BGP → 香港 · IXP · 100 Mbps",
   "tc": "深圳雲廠 BGP → 香港 · IXP · 100 Mbps",
   "en": "Shenzhen cloud BGP → Hong Kong · IXP · 100 Mbps",
   "ja": "深圳クラウド BGP → 香港 · IXP · 100 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "深圳云厂 BGP → 香港 · IXP",
   "tc": "深圳雲廠 BGP → 香港 · IXP",
   "en": "Shenzhen cloud BGP → Hong Kong · IXP",
   "ja": "深圳クラウド BGP → 香港 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。"
  },
  "networkFilters": [
   "ixp",
   "dedicated-port"
  ],
  "searchTerms": [
   "100M独享-深圳上云互联优化专线",
   "cloud-hk-100m",
   "云厂优化网络通道",
   "香港BGP",
   "深圳云厂 BGP → 香港 · IXP",
   "深圳雲廠 BGP → 香港 · IXP",
   "Shenzhen cloud BGP → Hong Kong · IXP",
   "深圳クラウド BGP → 香港 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-hk-100m",
   "price": "1600",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "100 Mbps · 独享",
    "tc": "100 Mbps · 獨享",
    "en": "100 Mbps · dedicated",
    "ja": "100 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-108"
 },
 {
  "id": "mk-120",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "广东移动 → 香港 · IEPL · 1000 Mbps",
   "tc": "廣東移動 → 香港 · IEPL · 1000 Mbps",
   "en": "Guangdong Mobile → Hong Kong · IEPL · 1000 Mbps",
   "ja": "広東・中国移動 → 香港 · IEPL · 1000 Mbps"
  },
  "kind": "bare",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "广东移动 → 香港 · IEPL",
   "tc": "廣東移動 → 香港 · IEPL",
   "en": "Guangdong Mobile → Hong Kong · IEPL",
   "ja": "広東・中国移動 → 香港 · IEPL"
  },
  "carriers": [
   "CM"
  ],
  "url": "https://www.mkcloud.net/index.php/store/gz-yd-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。 专线套餐含 Xeon Gold 物理服务器。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。 專線方案含 Xeon Gold 實體伺服器。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group. The circuit bundle includes a Xeon Gold dedicated server.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。 専用線に Xeon Gold の物理サーバーが付属します。"
  },
  "networkFilters": [
   "iepl",
   "dedicated-port"
  ],
  "searchTerms": [
   "1G独享-广港IEPL",
   "gz-hk-1g",
   "广东移动",
   "香港BGP",
   "广东移动 → 香港 · IEPL",
   "廣東移動 → 香港 · IEPL",
   "Guangdong Mobile → Hong Kong · IEPL",
   "広東・中国移動 → 香港 · IEPL"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gz-yd-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gz-hk-1g",
   "price": "17000",
   "currency": "CNY",
   "term": "month",
   "cpu": "28 cores",
   "ram": "64 GB",
   "disk": "512 GB",
   "port": {
    "sc": "1000 Mbps · 独享",
    "tc": "1000 Mbps · 獨享",
    "en": "1000 Mbps · dedicated",
    "ja": "1000 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gz-yd-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-120"
 },
 {
  "id": "mk-115",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "广东三线 → 香港 · IEPL · 1000 Mbps",
   "tc": "廣東三線 → 香港 · IEPL · 1000 Mbps",
   "en": "Guangdong · three carriers → Hong Kong · IEPL · 1000 Mbps",
   "ja": "広東・3キャリア → 香港 · IEPL · 1000 Mbps"
  },
  "kind": "bare",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "广东三线 → 香港 · IEPL",
   "tc": "廣東三線 → 香港 · IEPL",
   "en": "Guangdong · three carriers → Hong Kong · IEPL",
   "ja": "広東・3キャリア → 香港 · IEPL"
  },
  "carriers": [
   "CT",
   "CU",
   "CM"
  ],
  "url": "https://www.mkcloud.net/index.php/store/gz-th-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。 专线套餐含 Xeon Gold 物理服务器。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。 專線方案含 Xeon Gold 實體伺服器。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group. The circuit bundle includes a Xeon Gold dedicated server.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。 専用線に Xeon Gold の物理サーバーが付属します。"
  },
  "networkFilters": [
   "iepl",
   "dedicated-port"
  ],
  "searchTerms": [
   "1G独享-广港IEPL",
   "gz-hk-1g",
   "广东三线",
   "香港BGP",
   "广东三线 → 香港 · IEPL",
   "廣東三線 → 香港 · IEPL",
   "Guangdong · three carriers → Hong Kong · IEPL",
   "広東・3キャリア → 香港 · IEPL"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gz-th-hk-ex",
   "note": {
    "sc": "该组公开配置含 4 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 4 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 4 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 4 個含まれます。"
   }
  },
  "spec": {
   "sku": "gz-hk-1g",
   "price": "24000",
   "currency": "CNY",
   "term": "month",
   "cpu": "28 cores",
   "ram": "64 GB",
   "disk": "512 GB",
   "port": {
    "sc": "1000 Mbps · 独享",
    "tc": "1000 Mbps · 獨享",
    "en": "1000 Mbps · dedicated",
    "ja": "1000 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 4 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 4 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 4 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 4 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gz-th-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-115"
 },
 {
  "id": "mk-136",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "广东电信 → 香港 · IEPL · 1000 Mbps",
   "tc": "廣東電信 → 香港 · IEPL · 1000 Mbps",
   "en": "Guangdong Telecom → Hong Kong · IEPL · 1000 Mbps",
   "ja": "広東・中国電信 → 香港 · IEPL · 1000 Mbps"
  },
  "kind": "bare",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "广东电信 → 香港 · IEPL",
   "tc": "廣東電信 → 香港 · IEPL",
   "en": "Guangdong Telecom → Hong Kong · IEPL",
   "ja": "広東・中国電信 → 香港 · IEPL"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/gd-dx-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。 专线套餐含 Xeon Gold 物理服务器。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。 專線方案含 Xeon Gold 實體伺服器。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group. The circuit bundle includes a Xeon Gold dedicated server.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。 専用線に Xeon Gold の物理サーバーが付属します。"
  },
  "networkFilters": [
   "iepl",
   "dedicated-port"
  ],
  "searchTerms": [
   "1G独享-广港IEPL",
   "gd-hk-1g",
   "广东电信",
   "香港BGP",
   "广东电信 → 香港 · IEPL",
   "廣東電信 → 香港 · IEPL",
   "Guangdong Telecom → Hong Kong · IEPL",
   "広東・中国電信 → 香港 · IEPL"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gd-dx-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gd-hk-1g",
   "price": "22000",
   "currency": "CNY",
   "term": "month",
   "cpu": "28 cores",
   "ram": "64 GB",
   "disk": "512 GB",
   "port": {
    "sc": "1000 Mbps · 独享",
    "tc": "1000 Mbps · 獨享",
    "en": "1000 Mbps · dedicated",
    "ja": "1000 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gd-dx-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-136"
 },
 {
  "id": "mk-204",
  "market": "US",
  "city": "United States",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 美国 · IXP · 1TB",
   "tc": "上海雲廠 BGP → 美國 · IXP · 1TB",
   "en": "Shanghai cloud BGP → United States · IXP · 1TB",
   "ja": "上海クラウド BGP → 米国 · IXP · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 美国 · IXP",
   "tc": "上海雲廠 BGP → 美國 · IXP",
   "en": "Shanghai cloud BGP → United States · IXP",
   "ja": "上海クラウド BGP → 米国 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-us-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。 达到套餐流量后停机。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。 達到方案流量後停機。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address. The instance is stopped when its transfer allowance is exhausted.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。 転送量を使い切るとインスタンスは停止します。"
  },
  "networkFilters": [
   "ixp",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-上海上云互联优化专线",
   "cloud-us-1t",
   "云厂优化网络通道",
   "美国BGP",
   "上海云厂 BGP → 美国 · IXP",
   "上海雲廠 BGP → 美國 · IXP",
   "Shanghai cloud BGP → United States · IXP",
   "上海クラウド BGP → 米国 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-us-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-us-1t",
   "price": "266",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-us-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-204"
 },
 {
  "id": "mk-160",
  "market": "JP",
  "city": "Japan",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 日本 · IXP · 20 Mbps",
   "tc": "上海雲廠 BGP → 日本 · IXP · 20 Mbps",
   "en": "Shanghai cloud BGP → Japan · IXP · 20 Mbps",
   "ja": "上海クラウド BGP → 日本 · IXP · 20 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 日本 · IXP",
   "tc": "上海雲廠 BGP → 日本 · IXP",
   "en": "Shanghai cloud BGP → Japan · IXP",
   "ja": "上海クラウド BGP → 日本 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-jp-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。"
  },
  "networkFilters": [
   "ixp",
   "dedicated-port"
  ],
  "searchTerms": [
   "20M独享-上海上云互联优化专线",
   "cloud-jp-20m",
   "云厂优化网络通道",
   "日本BGP",
   "上海云厂 BGP → 日本 · IXP",
   "上海雲廠 BGP → 日本 · IXP",
   "Shanghai cloud BGP → Japan · IXP",
   "上海クラウド BGP → 日本 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-jp-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-jp-20m",
   "price": "1000",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "20 Mbps · 独享",
    "tc": "20 Mbps · 獨享",
    "en": "20 Mbps · dedicated",
    "ja": "20 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-jp-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-160"
 },
 {
  "id": "mk-162",
  "market": "US",
  "city": "United States",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 美国 · IXP · 20 Mbps",
   "tc": "上海雲廠 BGP → 美國 · IXP · 20 Mbps",
   "en": "Shanghai cloud BGP → United States · IXP · 20 Mbps",
   "ja": "上海クラウド BGP → 米国 · IXP · 20 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 美国 · IXP",
   "tc": "上海雲廠 BGP → 美國 · IXP",
   "en": "Shanghai cloud BGP → United States · IXP",
   "ja": "上海クラウド BGP → 米国 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-us-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。"
  },
  "networkFilters": [
   "ixp",
   "dedicated-port"
  ],
  "searchTerms": [
   "20M独享-上海上云互联优化专线",
   "cloud-us-20m",
   "云厂优化网络通道",
   "美国BGP",
   "上海云厂 BGP → 美国 · IXP",
   "上海雲廠 BGP → 美國 · IXP",
   "Shanghai cloud BGP → United States · IXP",
   "上海クラウド BGP → 米国 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-us-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-us-20m",
   "price": "1600",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "20 Mbps · 独享",
    "tc": "20 Mbps · 獨享",
    "en": "20 Mbps · dedicated",
    "ja": "20 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-us-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-162"
 },
 {
  "id": "mk-165",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "厦门 BGP → 香港 · IPLC · 200 Mbps",
   "tc": "廈門 BGP → 香港 · IPLC · 200 Mbps",
   "en": "Xiamen BGP → Hong Kong · IPLC · 200 Mbps",
   "ja": "厦門 BGP → 香港 · IPLC · 200 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "厦门 BGP → 香港 · IPLC",
   "tc": "廈門 BGP → 香港 · IPLC",
   "en": "Xiamen BGP → Hong Kong · IPLC",
   "ja": "厦門 BGP → 香港 · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/xm-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "200M独享-厦港IPLC",
   "xm-hk-200m",
   "厦门BGP",
   "香港BGP",
   "厦门 BGP → 香港 · IPLC",
   "廈門 BGP → 香港 · IPLC",
   "Xiamen BGP → Hong Kong · IPLC",
   "厦門 BGP → 香港 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/xm-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "xm-hk-200m",
   "price": "6000",
   "currency": "CNY",
   "term": "month",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "40 GB",
   "port": {
    "sc": "200 Mbps · 独享",
    "tc": "200 Mbps · 獨享",
    "en": "200 Mbps · dedicated",
    "ja": "200 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/xm-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-165"
 },
 {
  "id": "mk-173",
  "market": "CN",
  "city": "Shanghai",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海动态联通 → 上海 · CN2 · 500 Mbps",
   "tc": "上海動態聯通 → 上海 · CN2 · 500 Mbps",
   "en": "Shanghai Unicom · dynamic ingress → Shanghai · CN2 · 500 Mbps",
   "ja": "上海・中国聯通（動的入口） → 上海 · CN2 · 500 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海动态联通 → 上海 · CN2",
   "tc": "上海動態聯通 → 上海 · CN2",
   "en": "Shanghai Unicom · dynamic ingress → Shanghai · CN2",
   "ja": "上海・中国聯通（動的入口） → 上海 · CN2"
  },
  "carriers": [
   "CU"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-cn2-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。"
  },
  "networkFilters": [
   "optimized-transit",
   "dedicated-port"
  ],
  "searchTerms": [
   "500M独享-上海动态IP双线CN2",
   "sh-cn2-500m",
   "上海动态联通",
   "上海电信CN2",
   "上海动态联通 → 上海 · CN2",
   "上海動態聯通 → 上海 · CN2",
   "Shanghai Unicom · dynamic ingress → Shanghai · CN2",
   "上海・中国聯通（動的入口） → 上海 · CN2"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-cn2-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-cn2-500m",
   "price": "4500",
   "currency": "CNY",
   "term": "month",
   "cpu": "8 vCPU",
   "ram": "16 GB",
   "disk": "60 GB",
   "port": {
    "sc": "500 Mbps · 独享",
    "tc": "500 Mbps · 獨享",
    "en": "500 Mbps · dedicated",
    "ja": "500 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-cn2-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-173"
 },
 {
  "id": "mk-174",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "泉州电信 → 香港 · IPLC · 200 Mbps",
   "tc": "泉州電信 → 香港 · IPLC · 200 Mbps",
   "en": "Quanzhou Telecom → Hong Kong · IPLC · 200 Mbps",
   "ja": "泉州・中国電信 → 香港 · IPLC · 200 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "泉州电信 → 香港 · IPLC",
   "tc": "泉州電信 → 香港 · IPLC",
   "en": "Quanzhou Telecom → Hong Kong · IPLC",
   "ja": "泉州・中国電信 → 香港 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/qz-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "200M独享-泉港IPLC",
   "qz-hk-200m",
   "泉州电信",
   "香港BGP",
   "泉州电信 → 香港 · IPLC",
   "泉州電信 → 香港 · IPLC",
   "Quanzhou Telecom → Hong Kong · IPLC",
   "泉州・中国電信 → 香港 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/qz-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "qz-hk-200m",
   "price": "5600",
   "currency": "CNY",
   "term": "month",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "40 GB",
   "port": {
    "sc": "200 Mbps · 独享",
    "tc": "200 Mbps · 獨享",
    "en": "200 Mbps · dedicated",
    "ja": "200 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/qz-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-174"
 },
 {
  "id": "mk-217",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 香港 · IXP · 2TB",
   "tc": "上海雲廠 BGP → 香港 · IXP · 2TB",
   "en": "Shanghai cloud BGP → Hong Kong · IXP · 2TB",
   "ja": "上海クラウド BGP → 香港 · IXP · 2TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 香港 · IXP",
   "tc": "上海雲廠 BGP → 香港 · IXP",
   "en": "Shanghai cloud BGP → Hong Kong · IXP",
   "ja": "上海クラウド BGP → 香港 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。 达到套餐流量后停机。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。 達到方案流量後停機。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address. The instance is stopped when its transfer allowance is exhausted.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。 転送量を使い切るとインスタンスは停止します。"
  },
  "networkFilters": [
   "ixp",
   "quota-transfer"
  ],
  "searchTerms": [
   "2TB流量-上海上云互联优化专线",
   "cloud-hk-2t",
   "云厂优化网络通道",
   "香港BGP",
   "上海云厂 BGP → 香港 · IXP",
   "上海雲廠 BGP → 香港 · IXP",
   "Shanghai cloud BGP → Hong Kong · IXP",
   "上海クラウド BGP → 香港 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-hk-2t",
   "price": "198",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "500 Mbps · 峰值",
    "tc": "500 Mbps · 峰值",
    "en": "500 Mbps · peak",
    "ja": "500 Mbps · ピーク"
   },
   "traffic": {
    "sc": "2TB / 月",
    "tc": "2TB / 月",
    "en": "2TB / month",
    "ja": "2TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-217"
 },
 {
  "id": "mk-221",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 香港 · IXP · 100 Mbps",
   "tc": "上海雲廠 BGP → 香港 · IXP · 100 Mbps",
   "en": "Shanghai cloud BGP → Hong Kong · IXP · 100 Mbps",
   "ja": "上海クラウド BGP → 香港 · IXP · 100 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 香港 · IXP",
   "tc": "上海雲廠 BGP → 香港 · IXP",
   "en": "Shanghai cloud BGP → Hong Kong · IXP",
   "ja": "上海クラウド BGP → 香港 · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。"
  },
  "networkFilters": [
   "ixp",
   "dedicated-port"
  ],
  "searchTerms": [
   "100M独享-上海上云互联优化专线",
   "cloud-hk-100m",
   "云厂优化网络通道",
   "香港BGP",
   "上海云厂 BGP → 香港 · IXP",
   "上海雲廠 BGP → 香港 · IXP",
   "Shanghai cloud BGP → Hong Kong · IXP",
   "上海クラウド BGP → 香港 · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-hk-100m",
   "price": "2500",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "100 Mbps · 独享",
    "tc": "100 Mbps · 獨享",
    "en": "100 Mbps · dedicated",
    "ja": "100 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-221"
 },
 {
  "id": "mk-228",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "UCloud 上海 BGP → 香港 · IPLC · 5 Mbps",
   "tc": "UCloud 上海 BGP → 香港 · IPLC · 5 Mbps",
   "en": "UCloud Shanghai BGP → Hong Kong · IPLC · 5 Mbps",
   "ja": "UCloud 上海 BGP → 香港 · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "UCloud 上海 BGP → 香港 · IPLC",
   "tc": "UCloud 上海 BGP → 香港 · IPLC",
   "en": "UCloud Shanghai BGP → Hong Kong · IPLC",
   "ja": "UCloud 上海 BGP → 香港 · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/sh-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪港IPLC",
   "sh-hk-5m",
   "UCloud上海BGP",
   "香港BGP",
   "UCloud 上海 BGP → 香港 · IPLC",
   "UCloud 上海 BGP → 香港 · IPLC",
   "UCloud Shanghai BGP → Hong Kong · IPLC",
   "UCloud 上海 BGP → 香港 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-hk-5m",
   "price": "650",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-228"
 },
 {
  "id": "mk-253",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "广东联通 → 香港 · IEPL · 1000 Mbps",
   "tc": "廣東聯通 → 香港 · IEPL · 1000 Mbps",
   "en": "Guangdong Unicom → Hong Kong · IEPL · 1000 Mbps",
   "ja": "広東・中国聯通 → 香港 · IEPL · 1000 Mbps"
  },
  "kind": "bare",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "广东联通 → 香港 · IEPL",
   "tc": "廣東聯通 → 香港 · IEPL",
   "en": "Guangdong Unicom → Hong Kong · IEPL",
   "ja": "広東・中国聯通 → 香港 · IEPL"
  },
  "carriers": [
   "CU"
  ],
  "url": "https://www.mkcloud.net/index.php/store/gd-lt-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口受省份或来源 IP 白名单限制，见本组订购条件。 专线套餐含 Xeon Gold 物理服务器。",
   "tc": "需要中國大陸實名，入口受省份或來源 IP 白名單限制，見本組訂購條件。 專線方案含 Xeon Gold 實體伺服器。",
   "en": "Mainland real-name verification applies. Ingress is restricted by province or source-IP allowlist as specified for this group. The circuit bundle includes a Xeon Gold dedicated server.",
   "ja": "中国本土の本人確認が必要です。入口の省または送信元 IP 制限は商品グループの条件をご確認ください。 専用線に Xeon Gold の物理サーバーが付属します。"
  },
  "networkFilters": [
   "iepl",
   "dedicated-port"
  ],
  "searchTerms": [
   "1G独享-广港IEPL",
   "gd-hk-1g",
   "广东联通",
   "香港BGP",
   "广东联通 → 香港 · IEPL",
   "廣東聯通 → 香港 · IEPL",
   "Guangdong Unicom → Hong Kong · IEPL",
   "広東・中国聯通 → 香港 · IEPL"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gd-lt-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gd-hk-1g",
   "price": "22000",
   "currency": "CNY",
   "term": "month",
   "cpu": "28 cores",
   "ram": "64 GB",
   "disk": "512 GB",
   "port": {
    "sc": "1000 Mbps · 独享",
    "tc": "1000 Mbps · 獨享",
    "en": "1000 Mbps · dedicated",
    "ja": "1000 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gd-lt-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-253"
 },
 {
  "id": "mk-272",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 香港 · IPLC · 1TB",
   "tc": "上海電信 → 香港 · IPLC · 1TB",
   "en": "Shanghai Telecom → Hong Kong · IPLC · 1TB",
   "ja": "上海・中国電信 → 香港 · IPLC · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 香港 · IPLC",
   "tc": "上海電信 → 香港 · IPLC",
   "en": "Shanghai Telecom → Hong Kong · IPLC",
   "ja": "上海・中国電信 → 香港 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-hk-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-沪港IPLC",
   "sh-hk-1t",
   "上海电信",
   "香港BGP",
   "上海电信 → 香港 · IPLC",
   "上海電信 → 香港 · IPLC",
   "Shanghai Telecom → Hong Kong · IPLC",
   "上海・中国電信 → 香港 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-hk-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-hk-1t",
   "price": "288",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-hk-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-272"
 },
 {
  "id": "mk-278",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 香港 · IPLC · 5 Mbps",
   "tc": "上海電信 → 香港 · IPLC · 5 Mbps",
   "en": "Shanghai Telecom → Hong Kong · IPLC · 5 Mbps",
   "ja": "上海・中国電信 → 香港 · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 香港 · IPLC",
   "tc": "上海電信 → 香港 · IPLC",
   "en": "Shanghai Telecom → Hong Kong · IPLC",
   "ja": "上海・中国電信 → 香港 · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/shh-hk-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪港IPLC",
   "sh-hk-5m",
   "上海电信",
   "香港BGP",
   "上海电信 → 香港 · IPLC",
   "上海電信 → 香港 · IPLC",
   "Shanghai Telecom → Hong Kong · IPLC",
   "上海・中国電信 → 香港 · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/shh-hk-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-hk-5m",
   "price": "388",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/shh-hk-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-278"
 },
 {
  "id": "mk-293",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "腾讯广州八线 BGP → 新加坡 · IPLC · 1TB",
   "tc": "騰訊廣州八線 BGP → 新加坡 · IPLC · 1TB",
   "en": "Tencent Guangzhou BGP (8 networks) → Singapore · IPLC · 1TB",
   "ja": "騰訊・広州 BGP（8回線） → シンガポール · IPLC · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "腾讯广州八线 BGP → 新加坡 · IPLC",
   "tc": "騰訊廣州八線 BGP → 新加坡 · IPLC",
   "en": "Tencent Guangzhou BGP (8 networks) → Singapore · IPLC",
   "ja": "騰訊・広州 BGP（8回線） → シンガポール · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/gz-sg-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-广新IPLC",
   "gz-sg-1t",
   "腾讯广州八线BGP",
   "新加坡BGP",
   "腾讯广州八线 BGP → 新加坡 · IPLC",
   "騰訊廣州八線 BGP → 新加坡 · IPLC",
   "Tencent Guangzhou BGP (8 networks) → Singapore · IPLC",
   "騰訊・広州 BGP（8回線） → シンガポール · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gz-sg-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gz-sg-1t",
   "price": "398",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gz-sg-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-293"
 },
 {
  "id": "mk-299",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "深圳云厂 BGP → 新加坡 · IXP · 2TB",
   "tc": "深圳雲廠 BGP → 新加坡 · IXP · 2TB",
   "en": "Shenzhen cloud BGP → Singapore · IXP · 2TB",
   "ja": "深圳クラウド BGP → シンガポール · IXP · 2TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "深圳云厂 BGP → 新加坡 · IXP",
   "tc": "深圳雲廠 BGP → 新加坡 · IXP",
   "en": "Shenzhen cloud BGP → Singapore · IXP",
   "ja": "深圳クラウド BGP → シンガポール · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-sg-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。 达到套餐流量后停机。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。 達到方案流量後停機。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address. The instance is stopped when its transfer allowance is exhausted.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。 転送量を使い切るとインスタンスは停止します。"
  },
  "networkFilters": [
   "ixp",
   "quota-transfer"
  ],
  "searchTerms": [
   "2TB流量-深圳上云互联优化专线",
   "cloud-sg-2t",
   "云厂优化网络通道",
   "新加坡BGP",
   "深圳云厂 BGP → 新加坡 · IXP",
   "深圳雲廠 BGP → 新加坡 · IXP",
   "Shenzhen cloud BGP → Singapore · IXP",
   "深圳クラウド BGP → シンガポール · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-sg-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-sg-2t",
   "price": "198",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "500 Mbps · 峰值",
    "tc": "500 Mbps · 峰值",
    "en": "500 Mbps · peak",
    "ja": "500 Mbps · ピーク"
   },
   "traffic": {
    "sc": "2TB / 月",
    "tc": "2TB / 月",
    "en": "2TB / month",
    "ja": "2TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-sg-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-299"
 },
 {
  "id": "mk-319",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "腾讯广州八线 BGP → 新加坡 · IPLC · 5 Mbps",
   "tc": "騰訊廣州八線 BGP → 新加坡 · IPLC · 5 Mbps",
   "en": "Tencent Guangzhou BGP (8 networks) → Singapore · IPLC · 5 Mbps",
   "ja": "騰訊・広州 BGP（8回線） → シンガポール · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "腾讯广州八线 BGP → 新加坡 · IPLC",
   "tc": "騰訊廣州八線 BGP → 新加坡 · IPLC",
   "en": "Tencent Guangzhou BGP (8 networks) → Singapore · IPLC",
   "ja": "騰訊・広州 BGP（8回線） → シンガポール · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/gz-sg-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-广新IPLC",
   "gz-sg-5m",
   "腾讯广州八线BGP",
   "新加坡BGP",
   "腾讯广州八线 BGP → 新加坡 · IPLC",
   "騰訊廣州八線 BGP → 新加坡 · IPLC",
   "Tencent Guangzhou BGP (8 networks) → Singapore · IPLC",
   "騰訊・広州 BGP（8回線） → シンガポール · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/gz-sg-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "gz-sg-5m",
   "price": "550",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/gz-sg-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-319"
 },
 {
  "id": "mk-327",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "深圳云厂 BGP → 新加坡 · IXP · 100 Mbps",
   "tc": "深圳雲廠 BGP → 新加坡 · IXP · 100 Mbps",
   "en": "Shenzhen cloud BGP → Singapore · IXP · 100 Mbps",
   "ja": "深圳クラウド BGP → シンガポール · IXP · 100 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "深圳云厂 BGP → 新加坡 · IXP",
   "tc": "深圳雲廠 BGP → 新加坡 · IXP",
   "en": "Shenzhen cloud BGP → Singapore · IXP",
   "ja": "深圳クラウド BGP → シンガポール · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-sg-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。"
  },
  "networkFilters": [
   "ixp",
   "dedicated-port"
  ],
  "searchTerms": [
   "100M独享-深圳上云互联优化专线",
   "cloud-sg-100m",
   "云厂优化网络通道",
   "新加坡BGP",
   "深圳云厂 BGP → 新加坡 · IXP",
   "深圳雲廠 BGP → 新加坡 · IXP",
   "Shenzhen cloud BGP → Singapore · IXP",
   "深圳クラウド BGP → シンガポール · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-sg-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-sg-100m",
   "price": "2500",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "100 Mbps · 独享",
    "tc": "100 Mbps · 獨享",
    "en": "100 Mbps · dedicated",
    "ja": "100 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-sg-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-327"
 },
 {
  "id": "mk-306",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 新加坡 · IPLC · 1TB",
   "tc": "上海電信 → 新加坡 · IPLC · 1TB",
   "en": "Shanghai Telecom → Singapore · IPLC · 1TB",
   "ja": "上海・中国電信 → シンガポール · IPLC · 1TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 新加坡 · IPLC",
   "tc": "上海電信 → 新加坡 · IPLC",
   "en": "Shanghai Telecom → Singapore · IPLC",
   "ja": "上海・中国電信 → シンガポール · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-sg-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "quota-transfer"
  ],
  "searchTerms": [
   "1TB流量-沪新IPLC",
   "sh-sg-1t",
   "上海电信",
   "新加坡BGP",
   "上海电信 → 新加坡 · IPLC",
   "上海電信 → 新加坡 · IPLC",
   "Shanghai Telecom → Singapore · IPLC",
   "上海・中国電信 → シンガポール · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-sg-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-sg-1t",
   "price": "328",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": {
    "sc": "200 Mbps · 峰值",
    "tc": "200 Mbps · 峰值",
    "en": "200 Mbps · peak",
    "ja": "200 Mbps · ピーク"
   },
   "traffic": {
    "sc": "1TB / 月",
    "tc": "1TB / 月",
    "en": "1TB / month",
    "ja": "1TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-sg-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-306"
 },
 {
  "id": "mk-312",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 新加坡 · IXP · 2TB",
   "tc": "上海雲廠 BGP → 新加坡 · IXP · 2TB",
   "en": "Shanghai cloud BGP → Singapore · IXP · 2TB",
   "ja": "上海クラウド BGP → シンガポール · IXP · 2TB"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 新加坡 · IXP",
   "tc": "上海雲廠 BGP → 新加坡 · IXP",
   "en": "Shanghai cloud BGP → Singapore · IXP",
   "ja": "上海クラウド BGP → シンガポール · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-sh",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。 达到套餐流量后停机。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。 達到方案流量後停機。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address. The instance is stopped when its transfer allowance is exhausted.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。 転送量を使い切るとインスタンスは停止します。"
  },
  "networkFilters": [
   "ixp",
   "quota-transfer"
  ],
  "searchTerms": [
   "2TB流量-上海上云互联优化专线",
   "cloud-sg-2t",
   "云厂优化网络通道",
   "新加坡BGP",
   "上海云厂 BGP → 新加坡 · IXP",
   "上海雲廠 BGP → 新加坡 · IXP",
   "Shanghai cloud BGP → Singapore · IXP",
   "上海クラウド BGP → シンガポール · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-sh",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-sg-2t",
   "price": "248",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "500 Mbps · 峰值",
    "tc": "500 Mbps · 峰值",
    "en": "500 Mbps · peak",
    "ja": "500 Mbps · ピーク"
   },
   "traffic": {
    "sc": "2TB / 月",
    "tc": "2TB / 月",
    "en": "2TB / month",
    "ja": "2TB / 月"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-sh",
   "date": "2026-11-20"
  },
  "stockKey": "mk-312"
 },
 {
  "id": "mk-334",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海电信 → 新加坡 · IPLC · 5 Mbps",
   "tc": "上海電信 → 新加坡 · IPLC · 5 Mbps",
   "en": "Shanghai Telecom → Singapore · IPLC · 5 Mbps",
   "ja": "上海・中国電信 → シンガポール · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 新加坡 · IPLC",
   "tc": "上海電信 → 新加坡 · IPLC",
   "en": "Shanghai Telecom → Singapore · IPLC",
   "ja": "上海・中国電信 → シンガポール · IPLC"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://www.mkcloud.net/index.php/store/sh-sg-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪新IPLC",
   "sh-sg-5m",
   "上海电信",
   "新加坡BGP",
   "上海电信 → 新加坡 · IPLC",
   "上海電信 → 新加坡 · IPLC",
   "Shanghai Telecom → Singapore · IPLC",
   "上海・中国電信 → シンガポール · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/sh-sg-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-sg-5m",
   "price": "438",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/sh-sg-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-334"
 },
 {
  "id": "mk-348",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "上海云厂 BGP → 新加坡 · IXP · 100 Mbps",
   "tc": "上海雲廠 BGP → 新加坡 · IXP · 100 Mbps",
   "en": "Shanghai cloud BGP → Singapore · IXP · 100 Mbps",
   "ja": "上海クラウド BGP → シンガポール · IXP · 100 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海云厂 BGP → 新加坡 · IXP",
   "tc": "上海雲廠 BGP → 新加坡 · IXP",
   "en": "Shanghai cloud BGP → Singapore · IXP",
   "ja": "上海クラウド BGP → シンガポール · IXP"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名。入口限商家列明的中国大陆云厂商公网 BGP 地址。",
   "tc": "需要中國大陸實名。入口限商家列明的中國大陸雲廠商公網 BGP 位址。",
   "en": "Mainland real-name verification applies. Ingress requires an eligible mainland cloud provider’s public BGP address.",
   "ja": "中国本土の本人確認が必要です。入口は対象の本土クラウド事業者のパブリック BGP アドレスに限定されます。"
  },
  "networkFilters": [
   "ixp",
   "dedicated-port"
  ],
  "searchTerms": [
   "100M独享-上海上云互联优化专线",
   "cloud-sg-100m",
   "云厂优化网络通道",
   "新加坡BGP",
   "上海云厂 BGP → 新加坡 · IXP",
   "上海雲廠 BGP → 新加坡 · IXP",
   "Shanghai cloud BGP → Singapore · IXP",
   "上海クラウド BGP → シンガポール · IXP"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "cloud-sg-100m",
   "price": "3400",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "100 Mbps · 独享",
    "tc": "100 Mbps · 獨享",
    "en": "100 Mbps · dedicated",
    "ja": "100 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-348"
 },
 {
  "id": "mk-342",
  "market": "SG",
  "city": "Singapore",
  "provider": "Mkcloud",
  "plan": {
   "sc": "UCloud 上海 BGP → 新加坡 · IPLC · 5 Mbps",
   "tc": "UCloud 上海 BGP → 新加坡 · IPLC · 5 Mbps",
   "en": "UCloud Shanghai BGP → Singapore · IPLC · 5 Mbps",
   "ja": "UCloud 上海 BGP → シンガポール · IPLC · 5 Mbps"
  },
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "UCloud 上海 BGP → 新加坡 · IPLC",
   "tc": "UCloud 上海 BGP → 新加坡 · IPLC",
   "en": "UCloud Shanghai BGP → Singapore · IPLC",
   "ja": "UCloud 上海 BGP → シンガポール · IPLC"
  },
  "carriers": [],
  "url": "https://www.mkcloud.net/index.php/store/shh-sg-ex",
  "proof": "https://www.mkcloud.net/index.php",
  "notes": {
   "sc": "需要中国大陆实名，入口限所选省份。",
   "tc": "需要中國大陸實名，入口限所選省份。",
   "en": "Mainland real-name verification and one selected ingress province are required.",
   "ja": "中国本土の本人確認が必要で、入口は選択した省に限定されます。"
  },
  "networkFilters": [
   "iplc",
   "dedicated-port"
  ],
  "searchTerms": [
   "5M独享-沪新IPLC",
   "sh-sg-5m",
   "UCloud上海BGP",
   "新加坡BGP",
   "UCloud 上海 BGP → 新加坡 · IPLC",
   "UCloud 上海 BGP → 新加坡 · IPLC",
   "UCloud Shanghai BGP → Singapore · IPLC",
   "UCloud 上海 BGP → シンガポール · IPLC"
  ],
  "addressEvidence": {
   "value": "dedicated-ipv4",
   "url": "https://www.mkcloud.net/index.php/store/shh-sg-ex",
   "note": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   }
  },
  "spec": {
   "sku": "sh-sg-5m",
   "price": "698",
   "currency": "CNY",
   "term": "month",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "port": {
    "sc": "5 Mbps · 独享",
    "tc": "5 Mbps · 獨享",
    "en": "5 Mbps · dedicated",
    "ja": "5 Mbps · 専有"
   },
   "traffic": {
    "sc": "不限流量",
    "tc": "不限流量",
    "en": "Unmetered transfer",
    "ja": "転送量無制限"
   },
   "sourceNote": {
    "sc": "该组公开配置含 2 个独享 IPv4，包含入口与出口。",
    "tc": "該組公開配置含 2 個獨享 IPv4，包含入口與出口。",
    "en": "This configuration includes 2 dedicated IPv4 addresses across ingress and egress.",
    "ja": "入口・出口を合わせて専用 IPv4 が 2 個含まれます。"
   },
   "proof": "https://www.mkcloud.net/index.php/store/shh-sg-ex",
   "date": "2026-11-20"
  },
  "stockKey": "mk-342"
 },
 {
  "id": "vmsilo-tw",
  "provider": "VMSilo",
  "plan": "fz-tw ipv6（cu）",
  "kind": "vps",
  "market": "TW",
  "city": "Taiwan",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "福州联通 → 台湾 · IEPL",
   "tc": "福州聯通 → 台灣 · IEPL",
   "en": "Fuzhou Unicom → Taiwan · IEPL",
   "ja": "福州・中国聯通 → 台湾 · IEPL"
  },
  "carriers": [
   "CU"
  ],
  "url": "https://portal.vmsilo.com/store/iepl/fz-tw-ipv6cu",
  "proof": "https://portal.vmsilo.com/store/iepl",
  "notes": {
   "sc": "商家基础配置，流量合计入站和出站。配置按钮仅用于进入选配，公开列表未给出库存数量。",
   "tc": "商家基礎配置，流量合計入站和出站。配置按鈕僅用於進入選配，公開列表未給出庫存數量。",
   "en": "Base configuration. The transfer allowance counts incoming and outgoing data together. The public list offers configuration links and publishes no stock count.",
   "ja": "基本構成。転送量は送受信合算です。公開一覧に構成リンクはありますが、在庫数の表示はありません。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "福州联通 → 台湾 · IEPL",
   "福州聯通 → 台灣 · IEPL",
   "Fuzhou Unicom → Taiwan · IEPL",
   "福州・中国聯通 → 台湾 · IEPL",
   "IPv6-only",
   "福台"
  ],
  "addressEvidence": {
   "value": "ipv6-only",
   "url": "https://portal.vmsilo.com/store/iepl",
   "note": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  },
  "spec": {
   "sku": "fz-tw ipv6（cu）",
   "price": "46.12",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "port": {
    "sc": "50 Mbps · 共享",
    "tc": "50 Mbps · 共享",
    "en": "50 Mbps · shared",
    "ja": "50 Mbps · 共有"
   },
   "traffic": {
    "sc": "200 GB · 双向合计",
    "tc": "200 GB · 雙向合計",
    "en": "200 GB · in + out",
    "ja": "200 GB · 送受信合算"
   },
   "proof": "https://portal.vmsilo.com/store/iepl",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  }
 },
 {
  "id": "vmsilo-jp",
  "provider": "VMSilo",
  "plan": "sh-jp ipv6（ct）",
  "kind": "vps",
  "market": "JP",
  "city": "Japan",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 日本 · IEPL",
   "tc": "上海電信 → 日本 · IEPL",
   "en": "Shanghai Telecom → Japan · IEPL",
   "ja": "上海・中国電信 → 日本 · IEPL"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://portal.vmsilo.com/store/iepl/hrv6ct",
  "proof": "https://portal.vmsilo.com/store/iepl",
  "notes": {
   "sc": "商家基础配置，流量合计入站和出站。配置按钮仅用于进入选配，公开列表未给出库存数量。",
   "tc": "商家基礎配置，流量合計入站和出站。配置按鈕僅用於進入選配，公開列表未給出庫存數量。",
   "en": "Base configuration. The transfer allowance counts incoming and outgoing data together. The public list offers configuration links and publishes no stock count.",
   "ja": "基本構成。転送量は送受信合算です。公開一覧に構成リンクはありますが、在庫数の表示はありません。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "上海电信 → 日本 · IEPL",
   "上海電信 → 日本 · IEPL",
   "Shanghai Telecom → Japan · IEPL",
   "上海・中国電信 → 日本 · IEPL",
   "IPv6-only",
   "沪日"
  ],
  "addressEvidence": {
   "value": "ipv6-only",
   "url": "https://portal.vmsilo.com/store/iepl",
   "note": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  },
  "spec": {
   "sku": "sh-jp ipv6（ct）",
   "price": "54.12",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "port": {
    "sc": "1000 Mbps · 共享",
    "tc": "1000 Mbps · 共享",
    "en": "1000 Mbps · shared",
    "ja": "1000 Mbps · 共有"
   },
   "traffic": {
    "sc": "200 GB · 双向合计",
    "tc": "200 GB · 雙向合計",
    "en": "200 GB · in + out",
    "ja": "200 GB · 送受信合算"
   },
   "proof": "https://portal.vmsilo.com/store/iepl",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  }
 },
 {
  "id": "vmsilo-de",
  "provider": "VMSilo",
  "plan": "sh-de ipv6（ct）",
  "kind": "vps",
  "market": "DE",
  "city": "Germany",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 德国 · IEPL",
   "tc": "上海電信 → 德國 · IEPL",
   "en": "Shanghai Telecom → Germany · IEPL",
   "ja": "上海・中国電信 → ドイツ · IEPL"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://portal.vmsilo.com/store/iepl/sh-de-ipv6ct",
  "proof": "https://portal.vmsilo.com/store/iepl",
  "notes": {
   "sc": "商家基础配置，流量合计入站和出站。配置按钮仅用于进入选配，公开列表未给出库存数量。",
   "tc": "商家基礎配置，流量合計入站和出站。配置按鈕僅用於進入選配，公開列表未給出庫存數量。",
   "en": "Base configuration. The transfer allowance counts incoming and outgoing data together. The public list offers configuration links and publishes no stock count.",
   "ja": "基本構成。転送量は送受信合算です。公開一覧に構成リンクはありますが、在庫数の表示はありません。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "上海电信 → 德国 · IEPL",
   "上海電信 → 德國 · IEPL",
   "Shanghai Telecom → Germany · IEPL",
   "上海・中国電信 → ドイツ · IEPL",
   "IPv6-only",
   "沪德"
  ],
  "addressEvidence": {
   "value": "ipv6-only",
   "url": "https://portal.vmsilo.com/store/iepl",
   "note": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  },
  "spec": {
   "sku": "sh-de ipv6（ct）",
   "price": "72.12",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "port": {
    "sc": "200 Mbps · 共享",
    "tc": "200 Mbps · 共享",
    "en": "200 Mbps · shared",
    "ja": "200 Mbps · 共有"
   },
   "traffic": {
    "sc": "200 GB · 双向合计",
    "tc": "200 GB · 雙向合計",
    "en": "200 GB · in + out",
    "ja": "200 GB · 送受信合算"
   },
   "proof": "https://portal.vmsilo.com/store/iepl",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  }
 },
 {
  "id": "vmsilo-kr",
  "provider": "VMSilo",
  "plan": "sh-kr ipv6（ct）",
  "kind": "vps",
  "market": "KR",
  "city": "South Korea",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 韩国 · IEPL",
   "tc": "上海電信 → 韓國 · IEPL",
   "en": "Shanghai Telecom → South Korea · IEPL",
   "ja": "上海・中国電信 → 韓国 · IEPL"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://portal.vmsilo.com/store/iepl/sh-kr-ipv6ct",
  "proof": "https://portal.vmsilo.com/store/iepl",
  "notes": {
   "sc": "商家基础配置，流量合计入站和出站。配置按钮仅用于进入选配，公开列表未给出库存数量。",
   "tc": "商家基礎配置，流量合計入站和出站。配置按鈕僅用於進入選配，公開列表未給出庫存數量。",
   "en": "Base configuration. The transfer allowance counts incoming and outgoing data together. The public list offers configuration links and publishes no stock count.",
   "ja": "基本構成。転送量は送受信合算です。公開一覧に構成リンクはありますが、在庫数の表示はありません。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "上海电信 → 韩国 · IEPL",
   "上海電信 → 韓國 · IEPL",
   "Shanghai Telecom → South Korea · IEPL",
   "上海・中国電信 → 韓国 · IEPL",
   "IPv6-only",
   "沪韩"
  ],
  "addressEvidence": {
   "value": "ipv6-only",
   "url": "https://portal.vmsilo.com/store/iepl",
   "note": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  },
  "spec": {
   "sku": "sh-kr ipv6（ct）",
   "price": "88.12",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "port": {
    "sc": "300 Mbps · 共享",
    "tc": "300 Mbps · 共享",
    "en": "300 Mbps · shared",
    "ja": "300 Mbps · 共有"
   },
   "traffic": {
    "sc": "200 GB · 双向合计",
    "tc": "200 GB · 雙向合計",
    "en": "200 GB · in + out",
    "ja": "200 GB · 送受信合算"
   },
   "proof": "https://portal.vmsilo.com/store/iepl",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  }
 },
 {
  "id": "vmsilo-us",
  "provider": "VMSilo",
  "plan": "sh-us ipv6（ct）",
  "kind": "vps",
  "market": "US",
  "city": "United States",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 美国 · IEPL",
   "tc": "上海電信 → 美國 · IEPL",
   "en": "Shanghai Telecom → United States · IEPL",
   "ja": "上海・中国電信 → 米国 · IEPL"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://portal.vmsilo.com/store/iepl/sh-us-ipv6ct",
  "proof": "https://portal.vmsilo.com/store/iepl",
  "notes": {
   "sc": "商家基础配置，流量合计入站和出站。配置按钮仅用于进入选配，公开列表未给出库存数量。",
   "tc": "商家基礎配置，流量合計入站和出站。配置按鈕僅用於進入選配，公開列表未給出庫存數量。",
   "en": "Base configuration. The transfer allowance counts incoming and outgoing data together. The public list offers configuration links and publishes no stock count.",
   "ja": "基本構成。転送量は送受信合算です。公開一覧に構成リンクはありますが、在庫数の表示はありません。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "上海电信 → 美国 · IEPL",
   "上海電信 → 美國 · IEPL",
   "Shanghai Telecom → United States · IEPL",
   "上海・中国電信 → 米国 · IEPL",
   "IPv6-only",
   "沪美"
  ],
  "addressEvidence": {
   "value": "ipv6-only",
   "url": "https://portal.vmsilo.com/store/iepl",
   "note": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  },
  "spec": {
   "sku": "sh-us ipv6（ct）",
   "price": "58.12",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "port": {
    "sc": "100 Mbps · 共享",
    "tc": "100 Mbps · 共享",
    "en": "100 Mbps · shared",
    "ja": "100 Mbps · 共有"
   },
   "traffic": {
    "sc": "200 GB · 双向合计",
    "tc": "200 GB · 雙向合計",
    "en": "200 GB · in + out",
    "ja": "200 GB · 送受信合算"
   },
   "proof": "https://portal.vmsilo.com/store/iepl",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  }
 },
 {
  "id": "vmsilo-hk",
  "provider": "VMSilo",
  "plan": "sh-hk ipv6（ct）",
  "kind": "vps",
  "market": "HK",
  "city": "Hong Kong",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海电信 → 香港 · IEPL",
   "tc": "上海電信 → 香港 · IEPL",
   "en": "Shanghai Telecom → Hong Kong · IEPL",
   "ja": "上海・中国電信 → 香港 · IEPL"
  },
  "carriers": [
   "CT"
  ],
  "url": "https://portal.vmsilo.com/store/iepl/sh-hk-ipv6ct",
  "proof": "https://portal.vmsilo.com/store/iepl",
  "notes": {
   "sc": "商家基础配置，流量合计入站和出站。配置按钮仅用于进入选配，公开列表未给出库存数量。",
   "tc": "商家基礎配置，流量合計入站和出站。配置按鈕僅用於進入選配，公開列表未給出庫存數量。",
   "en": "Base configuration. The transfer allowance counts incoming and outgoing data together. The public list offers configuration links and publishes no stock count.",
   "ja": "基本構成。転送量は送受信合算です。公開一覧に構成リンクはありますが、在庫数の表示はありません。"
  },
  "networkFilters": [
   "iepl",
   "quota-transfer"
  ],
  "searchTerms": [
   "上海电信 → 香港 · IEPL",
   "上海電信 → 香港 · IEPL",
   "Shanghai Telecom → Hong Kong · IEPL",
   "上海・中国電信 → 香港 · IEPL",
   "IPv6-only",
   "沪港"
  ],
  "addressEvidence": {
   "value": "ipv6-only",
   "url": "https://portal.vmsilo.com/store/iepl",
   "note": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  },
  "spec": {
   "sku": "sh-hk ipv6（ct）",
   "price": "42.12",
   "currency": "CNY",
   "term": "month",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "port": {
    "sc": "1000 Mbps · 共享",
    "tc": "1000 Mbps · 共享",
    "en": "1000 Mbps · shared",
    "ja": "1000 Mbps · 共有"
   },
   "traffic": {
    "sc": "200 GB · 双向合计",
    "tc": "200 GB · 雙向合計",
    "en": "200 GB · in + out",
    "ja": "200 GB · 送受信合算"
   },
   "proof": "https://portal.vmsilo.com/store/iepl",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "默认配置列出 0 个 IPv4、1 个 IPv6。",
    "tc": "預設配置列出 0 個 IPv4、1 個 IPv6。",
    "en": "The base plan lists zero IPv4 addresses and one IPv6 address.",
    "ja": "初期構成は IPv4 が0個、IPv6 が1個です。"
   }
  }
 },
 {
  "id": "nnb-2",
  "provider": "NewNB Cloud",
  "plan": "TY #2 Performance",
  "market": "JP",
  "city": "Tokyo",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "Skyline · SB / IIJ / Lumen / PCCW",
  "carriers": [],
  "url": "https://nnb.ltd/dashboard/create?node=2",
  "proof": "https://nnb.ltd/#pricing",
  "terms": "https://nbdnet.com/terms.html",
  "notes": {
   "sc": "东京机房。Skyline 接入 SoftBank、IIJ、Lumen、PCCW，大陆方向按尽力交付；IX＋移动入口另购。",
   "tc": "東京機房。Skyline 接入 SoftBank、IIJ、Lumen、PCCW，大陸方向按盡力交付；IX＋移動入口另購。",
   "en": "Tokyo facility. Skyline uses SoftBank, IIJ, Lumen and PCCW on a best-effort basis toward mainland China. IX and Mobile ingress is an optional interface.",
   "ja": "東京拠点。Skyline は SoftBank・IIJ・Lumen・PCCW に接続し、中国本土向けはベストエフォート。IX＋中国移動の入口は追加構成です。"
  },
  "searchTerms": [
   "NNB",
   "NoBrand Cloud",
   "nnb.ltd",
   "TY #2 Performance"
  ],
  "networkFilters": [
   "quota-transfer"
  ],
  "spec": {
   "sku": "TY #2 Performance",
   "price": "23.00",
   "priceType": "from",
   "term": "month",
   "currency": "CNY",
   "cpu": "1–16 vCPU",
   "ram": "1–16 GB",
   "disk": "10–50 GB",
   "port": "1–1000 Mbps",
   "traffic": {
    "sc": "1000 GB 起 · 双向合计",
    "tc": "1000 GB 起 · 雙向合計",
    "en": "1000 GB minimum · in + out",
    "ja": "1000 GB から・送受信合算"
   },
   "proof": "https://nnb.ltd/#pricing",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "官网基价与流量、附加接口分项计费。当前公开节点开放月付。条款禁止用作代理服务或 VPN。",
    "tc": "官網基價與流量、附加介面分項計費。目前公開節點開放月付。條款禁止用作代理服務或 VPN。",
    "en": "Base price excludes transfer and optional network interfaces. Monthly ordering is enabled. The service terms prohibit proxy or VPN services.",
    "ja": "基本料金とは別に転送量・追加インターフェースが課金されます。月額注文に対応し、規約でプロキシ・VPN サービスは禁止されています。"
   }
  },
  "stockKey": "nnb-2"
 },
 {
  "id": "nnb-3",
  "provider": "NewNB Cloud",
  "plan": {
   "sc": "SH #1 沪日",
   "tc": "SH #1 滬日",
   "en": "SH #1 · Shanghai–Japan",
   "ja": "SH #1・上海–日本"
  },
  "market": "JP",
  "city": "Shanghai",
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海 → 日本 · CM + IX",
   "tc": "上海 → 日本 · CM + IX",
   "en": "Shanghai → Japan · CM + IX",
   "ja": "上海 → 日本 · CM + IX"
  },
  "carriers": [
   "CM"
  ],
  "url": "https://nnb.ltd/dashboard/create?node=3",
  "proof": "https://nnb.ltd/#pricing",
  "terms": "https://nbdnet.com/terms.html",
  "notes": {
   "sc": "主机在上海，沪日线路通往日本。CM 入口和出口采用 NAT，另有白名单要求。200 GB 起配档的端口上限为 100 Mbps。",
   "tc": "主機在上海，滬日線路通往日本。CM 入口和出口採用 NAT，另有白名單要求。200 GB 起配檔的埠速上限為 100 Mbps。",
   "en": "Shanghai host with a Japan-bound circuit. The Mobile interface uses NAT in both directions and an allowlist. The 200 GB starting tier caps bandwidth at 100 Mbps.",
   "ja": "ホストは上海、専用線の宛先は日本。中国移動は双方向 NAT と許可リストを使用。200 GB の初期枠は最大100 Mbpsです。"
  },
  "searchTerms": [
   "NNB",
   "NoBrand Cloud",
   "nnb.ltd",
   "SH #1 沪日"
  ],
  "networkFilters": [
   "private-route",
   "quota-transfer"
  ],
  "spec": {
   "sku": "SH #1 沪日",
   "price": "32.00",
   "priceType": "from",
   "term": "month",
   "currency": "CNY",
   "cpu": "1–8 vCPU",
   "ram": "0.5–8 GB",
   "disk": "15–200 GB",
   "port": "1–300 Mbps",
   "traffic": {
    "sc": "200 GB 起 · 双向合计",
    "tc": "200 GB 起 · 雙向合計",
    "en": "200 GB minimum · in + out",
    "ja": "200 GB から・送受信合算"
   },
   "proof": "https://nnb.ltd/#pricing",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "官网基价与流量、附加接口分项计费。当前公开节点开放月付。条款禁止用作代理服务或 VPN。",
    "tc": "官網基價與流量、附加介面分項計費。目前公開節點開放月付。條款禁止用作代理服務或 VPN。",
    "en": "Base price excludes transfer and optional network interfaces. Monthly ordering is enabled. The service terms prohibit proxy or VPN services.",
    "ja": "基本料金とは別に転送量・追加インターフェースが課金されます。月額注文に対応し、規約でプロキシ・VPN サービスは禁止されています。"
   }
  },
  "stockKey": "nnb-3",
  "addressEvidence": {
   "value": "shared-nat",
   "url": "https://api.nnb.ltd/api/v1/nodes",
   "note": {
    "sc": "商家注明主接口 CM 为 NAT 入站及出站。",
    "tc": "商家註明主介面 CM 為 NAT 入站及出站。",
    "en": "The primary Mobile interface is explicitly described as NAT on ingress and egress.",
    "ja": "事業者は主回線の中国移動インターフェースを双方向 NAT と明記しています。"
   }
  }
 },
 {
  "id": "nnb-5",
  "provider": "NewNB Cloud",
  "plan": {
   "sc": "SH #1 沪港",
   "tc": "SH #1 滬港",
   "en": "SH #1 · Shanghai–Hong Kong",
   "ja": "SH #1・上海–香港"
  },
  "market": "HK",
  "city": "Shanghai",
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": {
   "sc": "上海 → 香港 · IX / CM",
   "tc": "上海 → 香港 · IX / CM",
   "en": "Shanghai → Hong Kong · IX / CM",
   "ja": "上海 → 香港 · IX / CM"
  },
  "carriers": [
   "CM"
  ],
  "url": "https://nnb.ltd/dashboard/create?node=5",
  "proof": "https://nnb.ltd/#pricing",
  "terms": "https://nbdnet.com/terms.html",
  "notes": {
   "sc": "主机在上海，沪港线路通往香港。IX 入口需使用支持的云网络，移动入口需要实名。500 GB 起配档的端口上限为 200 Mbps。",
   "tc": "主機在上海，滬港線路通往香港。IX 入口需使用支援的雲網路，移動入口需要實名。500 GB 起配檔的埠速上限為 200 Mbps。",
   "en": "The host is in Shanghai with Hong Kong-bound connectivity. IX requires eligible cloud ingress. Mobile ingress requires identity verification. The 500 GB starting tier caps bandwidth at 200 Mbps.",
   "ja": "上海ホストから香港へ接続。IX は対象クラウド経由、中国移動は本人確認が必要。500 GB の初期枠は最大200 Mbpsです。"
  },
  "searchTerms": [
   "NNB",
   "NoBrand Cloud",
   "nnb.ltd",
   "SH #1 沪港"
  ],
  "networkFilters": [
   "private-route",
   "quota-transfer"
  ],
  "spec": {
   "sku": "SH #1 沪港",
   "price": "25.00",
   "priceType": "from",
   "term": "month",
   "currency": "CNY",
   "cpu": "1–8 vCPU",
   "ram": "0.5–4 GB",
   "disk": "15–50 GB",
   "port": "1–500 Mbps",
   "traffic": {
    "sc": "500 GB 起 · 双向合计",
    "tc": "500 GB 起 · 雙向合計",
    "en": "500 GB minimum · in + out",
    "ja": "500 GB から・送受信合算"
   },
   "proof": "https://nnb.ltd/#pricing",
   "date": "2026-11-20",
   "sourceNote": {
    "sc": "官网基价与流量、附加接口分项计费。当前公开节点开放月付。条款禁止用作代理服务或 VPN。",
    "tc": "官網基價與流量、附加介面分項計費。目前公開節點開放月付。條款禁止用作代理服務或 VPN。",
    "en": "Base price excludes transfer and optional network interfaces. Monthly ordering is enabled. The service terms prohibit proxy or VPN services.",
    "ja": "基本料金とは別に転送量・追加インターフェースが課金されます。月額注文に対応し、規約でプロキシ・VPN サービスは禁止されています。"
   }
  },
  "stockKey": "nnb-5"
 },
 {
  "id": "neb-hkg",
  "provider": "Neburst",
  "plan": "HKG.S3N-1C2G",
  "market": "HK",
  "city": "Hong Kong",
  "kind": "vps",
  "ip": "unknown",
  "route": "measured",
  "routeName": {
   "sc": "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "tc": "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "en": "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "ja": "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  },
  "carriers": [
   "CT",
   "CU",
   "CM"
  ],
  "url": "https://neburst.com/pricing/cloud",
  "proof": "https://www.pickmyvps.com/app/explore/neburst-hkg-s3n-1c2g",
  "notes": {
   "sc": "线路记录取自该型号往广东的三网回程测评，其他省份和时段的路径可能不同。",
   "tc": "線路紀錄取自該型號往廣東的三網回程測評，其他省份和時段的路徑可能不同。",
   "en": "Routes are the reviewer’s observations from this model toward Guangdong, for the three listed carriers. Other provinces and times can differ.",
   "ja": "当該型番から広東向けの3社の復路測定です。他省・時間帯では経路が異なり得ます。"
  },
  "searchTerms": [
   "奶爸",
   "HKG",
   "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  ],
  "networkFilters": [
   "optimized-transit",
   "quota-transfer"
  ],
  "spec": {
   "sku": "HKG.S3N-1C2G",
   "price": "39.90",
   "term": "month",
   "currency": "USD",
   "priceType": "review",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": "1 Gbps",
   "traffic": {
    "sc": "500 GB / 月",
    "tc": "500 GB / 月",
    "en": "500 GB / month",
    "ja": "500 GB / 月"
   },
   "date": "2026-11-20",
   "proof": "https://www.pickmyvps.com/app/explore/neburst-hkg-s3n-1c2g",
   "sourceNote": {
    "sc": "PickMyVPS 记录的规格和成交参考价。商家价格与当前库存请见官方定价页面。",
    "tc": "PickMyVPS 記錄的規格和成交參考價。商家價格與目前庫存請見官方定價頁面。",
    "en": "Specifications and reference price from PickMyVPS. Open the official pricing page for current terms and availability.",
    "ja": "PickMyVPS の仕様・参考価格です。現在の料金と在庫は公式料金ページで確認できます。"
   }
  }
 },
 {
  "id": "neb-tpe",
  "provider": "Neburst",
  "plan": "TPE.S3N-1C2G",
  "market": "TW",
  "city": "Hong Kong",
  "kind": "vps",
  "ip": "unknown",
  "route": "measured",
  "routeName": {
   "sc": "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "tc": "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "en": "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "ja": "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  },
  "carriers": [
   "CT",
   "CU",
   "CM"
  ],
  "url": "https://neburst.com/pricing/cloud",
  "proof": "https://www.pickmyvps.com/app/explore/neburst-tpe-s3n-1c2g",
  "notes": {
   "sc": "评测样机物理位置为香港，大陆回程走香港，国际流量由台湾出口。目的地按对外出口归类。",
   "tc": "評測樣機實體位置為香港，大陸回程走香港，國際流量由台灣出口。目的地按對外出口歸類。",
   "en": "The reviewer places this host in Hong Kong. Mainland-bound traffic exits Hong Kong, international traffic exits Taiwan. It is indexed under the international egress location.",
   "ja": "レビュー機の物理位置は香港。本土向けは香港経由、国際向けは台湾から出ます。国際出口に基づき台湾に分類しています。"
  },
  "searchTerms": [
   "奶爸",
   "TPE",
   "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  ],
  "networkFilters": [
   "optimized-transit",
   "quota-transfer"
  ],
  "spec": {
   "sku": "TPE.S3N-1C2G",
   "price": "39.90",
   "term": "month",
   "currency": "USD",
   "priceType": "review",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": "1 Gbps",
   "traffic": {
    "sc": "500 GB / 月",
    "tc": "500 GB / 月",
    "en": "500 GB / month",
    "ja": "500 GB / 月"
   },
   "date": "2026-11-20",
   "proof": "https://www.pickmyvps.com/app/explore/neburst-tpe-s3n-1c2g",
   "sourceNote": {
    "sc": "PickMyVPS 记录的规格和成交参考价。商家价格与当前库存请见官方定价页面。",
    "tc": "PickMyVPS 記錄的規格和成交參考價。商家價格與目前庫存請見官方定價頁面。",
    "en": "Specifications and reference price from PickMyVPS. Open the official pricing page for current terms and availability.",
    "ja": "PickMyVPS の仕様・参考価格です。現在の料金と在庫は公式料金ページで確認できます。"
   }
  }
 },
 {
  "id": "neb-nrt",
  "provider": "Neburst",
  "plan": "NRT.S3N-1C2G",
  "market": "JP",
  "city": "Tokyo",
  "kind": "vps",
  "ip": "unknown",
  "route": "measured",
  "routeName": {
   "sc": "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "tc": "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "en": "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "ja": "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  },
  "carriers": [
   "CT",
   "CU",
   "CM"
  ],
  "url": "https://neburst.com/pricing/cloud",
  "proof": "https://www.pickmyvps.com/app/explore/neburst-nrt-s3n-1c2g",
  "notes": {
   "sc": "线路记录取自该型号往广东的三网回程测评，其他省份和时段的路径可能不同。",
   "tc": "線路紀錄取自該型號往廣東的三網回程測評，其他省份和時段的路徑可能不同。",
   "en": "Routes are the reviewer’s observations from this model toward Guangdong, for the three listed carriers. Other provinces and times can differ.",
   "ja": "当該型番から広東向けの3社の復路測定です。他省・時間帯では経路が異なり得ます。"
  },
  "searchTerms": [
   "奶爸",
   "NRT",
   "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  ],
  "networkFilters": [
   "optimized-transit",
   "quota-transfer"
  ],
  "spec": {
   "sku": "NRT.S3N-1C2G",
   "price": "69.90",
   "term": "quarter",
   "currency": "USD",
   "priceType": "review",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": "1 Gbps",
   "traffic": {
    "sc": "500 GB / 月",
    "tc": "500 GB / 月",
    "en": "500 GB / month",
    "ja": "500 GB / 月"
   },
   "date": "2026-11-20",
   "proof": "https://www.pickmyvps.com/app/explore/neburst-nrt-s3n-1c2g",
   "sourceNote": {
    "sc": "PickMyVPS 记录的规格和成交参考价。商家价格与当前库存请见官方定价页面。",
    "tc": "PickMyVPS 記錄的規格和成交參考價。商家價格與目前庫存請見官方定價頁面。",
    "en": "Specifications and reference price from PickMyVPS. Open the official pricing page for current terms and availability.",
    "ja": "PickMyVPS の仕様・参考価格です。現在の料金と在庫は公式料金ページで確認できます。"
   }
  }
 },
 {
  "id": "neb-sin",
  "provider": "Neburst",
  "plan": "SIN.S3N-1C2G",
  "market": "SG",
  "city": "Singapore",
  "kind": "vps",
  "ip": "unknown",
  "route": "measured",
  "routeName": {
   "sc": "广东回程 · CN2 GIA / AS10099 / CMIN2",
   "tc": "廣東回程 · CN2 GIA / AS10099 / CMIN2",
   "en": "Return to Guangdong · CN2 GIA / AS10099 / CMIN2",
   "ja": "広東向け復路 · CN2 GIA / AS10099 / CMIN2"
  },
  "carriers": [
   "CT",
   "CU",
   "CM"
  ],
  "url": "https://neburst.com/pricing/cloud",
  "proof": "https://www.pickmyvps.com/app/explore/neburst-sin-s3n-1c2g",
  "notes": {
   "sc": "线路记录取自该型号往广东的三网回程测评，其他省份和时段的路径可能不同。",
   "tc": "線路紀錄取自該型號往廣東的三網回程測評，其他省份和時段的路徑可能不同。",
   "en": "Routes are the reviewer’s observations from this model toward Guangdong, for the three listed carriers. Other provinces and times can differ.",
   "ja": "当該型番から広東向けの3社の復路測定です。他省・時間帯では経路が異なり得ます。"
  },
  "searchTerms": [
   "奶爸",
   "SIN",
   "广东回程 · CN2 GIA / AS10099 / CMIN2",
   "廣東回程 · CN2 GIA / AS10099 / CMIN2",
   "Return to Guangdong · CN2 GIA / AS10099 / CMIN2",
   "広東向け復路 · CN2 GIA / AS10099 / CMIN2"
  ],
  "networkFilters": [
   "optimized-transit",
   "quota-transfer"
  ],
  "spec": {
   "sku": "SIN.S3N-1C2G",
   "price": "29.90",
   "term": "month",
   "currency": "USD",
   "priceType": "review",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": "1 Gbps",
   "traffic": {
    "sc": "500 GB / 月",
    "tc": "500 GB / 月",
    "en": "500 GB / month",
    "ja": "500 GB / 月"
   },
   "date": "2026-11-20",
   "proof": "https://www.pickmyvps.com/app/explore/neburst-sin-s3n-1c2g",
   "sourceNote": {
    "sc": "PickMyVPS 记录的规格和成交参考价。商家价格与当前库存请见官方定价页面。",
    "tc": "PickMyVPS 記錄的規格和成交參考價。商家價格與目前庫存請見官方定價頁面。",
    "en": "Specifications and reference price from PickMyVPS. Open the official pricing page for current terms and availability.",
    "ja": "PickMyVPS の仕様・参考価格です。現在の料金と在庫は公式料金ページで確認できます。"
   }
  }
 },
 {
  "id": "neb-lax",
  "provider": "Neburst",
  "plan": "LAX.S3N-1C2G",
  "market": "LAX",
  "city": "Los Angeles",
  "kind": "vps",
  "ip": "unknown",
  "route": "measured",
  "routeName": {
   "sc": "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "tc": "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "en": "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "ja": "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  },
  "carriers": [
   "CT",
   "CU",
   "CM"
  ],
  "url": "https://neburst.com/pricing/cloud",
  "proof": "https://www.pickmyvps.com/app/explore/neburst-lax-s3n-1c2g",
  "notes": {
   "sc": "线路记录取自该型号往广东的三网回程测评，其他省份和时段的路径可能不同。",
   "tc": "線路紀錄取自該型號往廣東的三網回程測評，其他省份和時段的路徑可能不同。",
   "en": "Routes are the reviewer’s observations from this model toward Guangdong, for the three listed carriers. Other provinces and times can differ.",
   "ja": "当該型番から広東向けの3社の復路測定です。他省・時間帯では経路が異なり得ます。"
  },
  "searchTerms": [
   "奶爸",
   "LAX",
   "广东回程 · CN2 GIA / AS9929 / CMIN2",
   "廣東回程 · CN2 GIA / AS9929 / CMIN2",
   "Return to Guangdong · CN2 GIA / AS9929 / CMIN2",
   "広東向け復路 · CN2 GIA / AS9929 / CMIN2"
  ],
  "networkFilters": [
   "optimized-transit",
   "quota-transfer"
  ],
  "spec": {
   "sku": "LAX.S3N-1C2G",
   "price": "29.90",
   "term": "month",
   "currency": "USD",
   "priceType": "review",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": "1 Gbps",
   "traffic": {
    "sc": "500 GB / 月",
    "tc": "500 GB / 月",
    "en": "500 GB / month",
    "ja": "500 GB / 月"
   },
   "date": "2026-11-20",
   "proof": "https://www.pickmyvps.com/app/explore/neburst-lax-s3n-1c2g",
   "sourceNote": {
    "sc": "PickMyVPS 记录的规格和成交参考价。商家价格与当前库存请见官方定价页面。",
    "tc": "PickMyVPS 記錄的規格和成交參考價。商家價格與目前庫存請見官方定價頁面。",
    "en": "Specifications and reference price from PickMyVPS. Open the official pricing page for current terms and availability.",
    "ja": "PickMyVPS の仕様・参考価格です。現在の料金と在庫は公式料金ページで確認できます。"
   }
  }
 }
];
/* Plan-level network and billing filters, plus direct merchant shortcuts. */
const networkFilterWords = {
 lineClass:['线路产品类型','線路產品類型','Network type','回線の種類'],
 usageClass:['计费与带宽','計費與頻寬','Billing and bandwidth','課金・帯域'],
 iepl:['IEPL 专线','IEPL 專線','IEPL','IEPL 専用線'],
 iplc:['IPLC 专线','IPLC 專線','IPLC','IPLC 専用線'],
 ixp:['IXP 优化互联','IXP 優化互聯','IXP optimized interconnect','IXP 最適化接続'],
 'private-route':['专线（类型未披露）','專線（類型未揭露）','Private line · type undisclosed','専用線（方式非公開）'],
 'optimized-transit':['优化公网','優化公網','Optimized public transit','最適化 IP トランジット'],
 hourly:['按小时计费','按小時計費','Hourly billing','時間課金'],
 'quota-transfer':['流量套餐','流量方案','Transfer allowance','転送量制'],
 'dedicated-port':['独享带宽','獨享頻寬','Dedicated bandwidth','専有帯域'],
 fromPrice:['起价','起價','From','最低'],
 reviewPrice:['评测记录价','評測記錄價','Review price snapshot','レビュー時点の価格'],
 reviewSource:['评测原文与记录价格','評測原文與記錄價格','Review and recorded price','レビュー・記録価格'],
 browseProviders:['查看这四家商家','查看這四家商家','Explore these providers','この4社から探す']
};
MARKETS.US = {sc:'美国（城市未公布）',tc:'美國（城市未公布）',en:'United States · city undisclosed',ja:'米国（都市非公開）'};
MARKETS.CN = {sc:'中国大陆',tc:'中國大陸',en:'Mainland China',ja:'中国本土'};
IP_EVIDENCE_OPTIONS.sharing.push('ipv6-only');
ipEvidenceWords['ipv6-only']=ipCopy('仅 IPv6','僅 IPv6','IPv6 only','IPv6 のみ');
function renderProviderShortcuts(){
 const nav=$('provider-shortcuts');if(!nav)return;
 const search=$('search').value.trim().toLowerCase();
 if(nav.dataset.lang===lang&&nav.dataset.search===search)return;
 nav.dataset.lang=lang;nav.dataset.search=search;nav.setAttribute('aria-label',quickWord('browseProviders'));
 nav.replaceChildren(el('strong',quickWord('browseProviders')));
 for(const name of ['Neburst','NewNB Cloud','Mkcloud','VMSilo']){
  const a=el('a',name);a.href='?'+new URLSearchParams({'q-search':name})+'#directory';
  a.onclick=event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
   event.preventDefault();quickChange(()=>{
    clearQuickPick();zone='all';renderControls();
    for(const field of quickFields)$(field).value='';
    $('promo').checked=false;$('search').value=name;
   });
  };
  if(search===name.toLowerCase())a.setAttribute('aria-current','true');
  nav.append(a);
 }
}
for(const plan of NETWORK_PLANS){
 if(plan.provider==='Neburst'){plan.lg='https://neburst.com/looking-glass';if(plan.market==='TW')plan.review='https://www.nodeseek.com/post-793866-1'}
 PLANS.push(plan);
 if(plan.addressEvidence){
   const evidence=plan.addressEvidence;
   IP_EVIDENCE.set(plan.id,[{dimension:'sharing',value:evidence.value,provider:plan.provider,market:plan.market,sku:plan.spec?.sku||'',url:evidence.url,scope:evidence.scope||'sku',checked:'2026-11-20',note:evidence.note}]);
 }
}

