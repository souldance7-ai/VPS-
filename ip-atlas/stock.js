const stockCities={
 LAX:['LAX','los-angeles-usa'],SEA:['SEA','seattle-usa'],TOR:['CA','toronto-canada'],
 AMS:['NL','amsterdam-netherlands'],FRA:['DE','frankfurt-germany'],LON:['GB','london-uk'],PAR:['FR','paris-france'],
 TPE:['TW','taipei-taiwan'],HKG:['HK','hong-kong'],TYO:['JP','tokyo-japan'],OSA:['JP','osaka-japan'],SEL:['KR','seoul-south-korea'],MNL:['PH','manila-philippines'],HAN:['VN','hanoi-vietnam'],SIN:['SG','singapore']
};
const ovhZones={CA:'bhs',FR:'gra',DE:'fra',GB:'lon'};
const campaignTargets={
 "ava-nano": {
  "family": "ava",
  "sku": "VPS Nano",
  "zone": "MD",
  "url": "https://ava.hosting/vps/vps-nano/"
 },
 "dedi-cn2annual": {
  "family": "dedione",
  "sku": "LAX.VPS.CN2.1C1G10G-Annual",
  "zone": "LAX",
  "url": "https://dedione.com/store/los-angeles-kvm-vps-cn2gia"
 },
 "dedi-cn25": {
  "family": "dedione",
  "sku": "20260520-LAX.VPS.CN.2C2G40G-Special-25.99",
  "zone": "LAX",
  "url": "https://dedione.com/store/special-vps-plans"
 },
 "dedi-cmin19": {
  "family": "dedione",
  "sku": "20260606-LAX.VPS.CMIN2.1C1G10G-Special-19.99",
  "zone": "LAX",
  "url": "https://dedione.com/store/special-vps-plans"
 }
};
const networkStockTargets={
 "mk-4": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "gz-hk-1t",
  "group": "gz-hk-sh",
  "pid": 4,
  "url": "https://www.mkcloud.net/index.php/store/gz-hk-sh"
 },
 "mk-43": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "gz-hk-5m",
  "group": "gz-hk-ex",
  "pid": 43,
  "url": "https://www.mkcloud.net/index.php/store/gz-hk-ex"
 },
 "mk-183": {
  "family": "mkcloud",
  "zone": "JP",
  "sku": "sh-jp-1t",
  "group": "sh-jp-sh",
  "pid": 183,
  "url": "https://www.mkcloud.net/index.php/store/sh-jp-sh"
 },
 "mk-44": {
  "family": "mkcloud",
  "zone": "JP",
  "sku": "sh-jp-5m",
  "group": "sh-jp-ex",
  "pid": 44,
  "url": "https://www.mkcloud.net/index.php/store/sh-jp-ex"
 },
 "mk-46": {
  "family": "mkcloud",
  "zone": "JP",
  "sku": "sh-jp-5m",
  "group": "shh-jp-ex",
  "pid": 46,
  "url": "https://www.mkcloud.net/index.php/store/shh-jp-ex"
 },
 "mk-190": {
  "family": "mkcloud",
  "zone": "US",
  "sku": "sh-us-1t",
  "group": "sh-us-sh",
  "pid": 190,
  "url": "https://www.mkcloud.net/index.php/store/sh-us-sh"
 },
 "mk-45": {
  "family": "mkcloud",
  "zone": "US",
  "sku": "sh-us-5m",
  "group": "sh-us-ex",
  "pid": 45,
  "url": "https://www.mkcloud.net/index.php/store/sh-us-ex"
 },
 "mk-62": {
  "family": "mkcloud",
  "zone": "US",
  "sku": "sh-us-5m",
  "group": "shh-us-ex",
  "pid": 62,
  "url": "https://www.mkcloud.net/index.php/store/shh-us-ex"
 },
 "mk-91": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "cloud-hk-2t-new",
  "group": "cloud-hk-sh",
  "pid": 91,
  "url": "https://www.mkcloud.net/index.php/store/cloud-hk-sh"
 },
 "mk-196": {
  "family": "mkcloud",
  "zone": "JP",
  "sku": "cloud-jp-1t-new",
  "group": "cloud-jp-sh",
  "pid": 196,
  "url": "https://www.mkcloud.net/index.php/store/cloud-jp-sh"
 },
 "mk-108": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "cloud-hk-100m",
  "group": "cloud-hk-ex",
  "pid": 108,
  "url": "https://www.mkcloud.net/index.php/store/cloud-hk-ex"
 },
 "mk-120": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "gz-hk-1g",
  "group": "gz-yd-hk-ex",
  "pid": 120,
  "url": "https://www.mkcloud.net/index.php/store/gz-yd-hk-ex"
 },
 "mk-115": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "gz-hk-1g",
  "group": "gz-th-hk-ex",
  "pid": 115,
  "url": "https://www.mkcloud.net/index.php/store/gz-th-hk-ex"
 },
 "mk-136": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "gd-hk-1g",
  "group": "gd-dx-hk-ex",
  "pid": 136,
  "url": "https://www.mkcloud.net/index.php/store/gd-dx-hk-ex"
 },
 "mk-204": {
  "family": "mkcloud",
  "zone": "US",
  "sku": "cloud-us-1t",
  "group": "cloud-us-sh",
  "pid": 204,
  "url": "https://www.mkcloud.net/index.php/store/cloud-us-sh"
 },
 "mk-160": {
  "family": "mkcloud",
  "zone": "JP",
  "sku": "cloud-jp-20m",
  "group": "cloud-jp-ex",
  "pid": 160,
  "url": "https://www.mkcloud.net/index.php/store/cloud-jp-ex"
 },
 "mk-162": {
  "family": "mkcloud",
  "zone": "US",
  "sku": "cloud-us-20m",
  "group": "cloud-us-ex",
  "pid": 162,
  "url": "https://www.mkcloud.net/index.php/store/cloud-us-ex"
 },
 "mk-165": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "xm-hk-200m",
  "group": "xm-hk-ex",
  "pid": 165,
  "url": "https://www.mkcloud.net/index.php/store/xm-hk-ex"
 },
 "mk-173": {
  "family": "mkcloud",
  "zone": "CN",
  "sku": "sh-cn2-500m",
  "group": "sh-cn2-ex",
  "pid": 173,
  "url": "https://www.mkcloud.net/index.php/store/sh-cn2-ex"
 },
 "mk-174": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "qz-hk-200m",
  "group": "qz-hk-ex",
  "pid": 174,
  "url": "https://www.mkcloud.net/index.php/store/qz-hk-ex"
 },
 "mk-217": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "cloud-hk-2t",
  "group": "cloud-sh-hk-sh",
  "pid": 217,
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-sh"
 },
 "mk-221": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "cloud-hk-100m",
  "group": "cloud-sh-hk-ex",
  "pid": 221,
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-hk-ex"
 },
 "mk-228": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "sh-hk-5m",
  "group": "sh-hk-ex",
  "pid": 228,
  "url": "https://www.mkcloud.net/index.php/store/sh-hk-ex"
 },
 "mk-253": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "gd-hk-1g",
  "group": "gd-lt-hk-ex",
  "pid": 253,
  "url": "https://www.mkcloud.net/index.php/store/gd-lt-hk-ex"
 },
 "mk-272": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "sh-hk-1t",
  "group": "sh-hk-sh",
  "pid": 272,
  "url": "https://www.mkcloud.net/index.php/store/sh-hk-sh"
 },
 "mk-278": {
  "family": "mkcloud",
  "zone": "HK",
  "sku": "sh-hk-5m",
  "group": "shh-hk-ex",
  "pid": 278,
  "url": "https://www.mkcloud.net/index.php/store/shh-hk-ex"
 },
 "mk-293": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "gz-sg-1t",
  "group": "gz-sg-sh",
  "pid": 293,
  "url": "https://www.mkcloud.net/index.php/store/gz-sg-sh"
 },
 "mk-299": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "cloud-sg-2t",
  "group": "cloud-sg-sh",
  "pid": 299,
  "url": "https://www.mkcloud.net/index.php/store/cloud-sg-sh"
 },
 "mk-319": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "gz-sg-5m",
  "group": "gz-sg-ex",
  "pid": 319,
  "url": "https://www.mkcloud.net/index.php/store/gz-sg-ex"
 },
 "mk-327": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "cloud-sg-100m",
  "group": "cloud-sg-ex",
  "pid": 327,
  "url": "https://www.mkcloud.net/index.php/store/cloud-sg-ex"
 },
 "mk-306": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "sh-sg-1t",
  "group": "sh-sg-sh",
  "pid": 306,
  "url": "https://www.mkcloud.net/index.php/store/sh-sg-sh"
 },
 "mk-312": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "cloud-sg-2t",
  "group": "cloud-sh-sg-sh",
  "pid": 312,
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-sh"
 },
 "mk-334": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "sh-sg-5m",
  "group": "sh-sg-ex",
  "pid": 334,
  "url": "https://www.mkcloud.net/index.php/store/sh-sg-ex"
 },
 "mk-348": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "cloud-sg-100m",
  "group": "cloud-sh-sg-ex",
  "pid": 348,
  "url": "https://www.mkcloud.net/index.php/store/cloud-sh-sg-ex"
 },
 "mk-342": {
  "family": "mkcloud",
  "zone": "SG",
  "sku": "sh-sg-5m",
  "group": "shh-sg-ex",
  "pid": 342,
  "url": "https://www.mkcloud.net/index.php/store/shh-sg-ex"
 },
 "nnb-2": {
  "family": "nnb",
  "pid": 2,
  "sku": "TY #2 Performance",
  "zone": "JP",
  "region": "tokyo",
  "url": "https://api.nnb.ltd/api/v1/nodes"
 },
 "nnb-3": {
  "family": "nnb",
  "pid": 3,
  "sku": "SH #1 沪日",
  "zone": "JP",
  "region": "shanghai",
  "url": "https://api.nnb.ltd/api/v1/nodes"
 },
 "nnb-5": {
  "family": "nnb",
  "pid": 5,
  "sku": "SH #1 沪港",
  "zone": "HK",
  "region": "shanghai",
  "url": "https://api.nnb.ltd/api/v1/nodes"
 }
};
Object.assign(networkStockTargets,{
 "field-backwaves-sg01": {
  "family": "backwaves",
  "zone": "SG",
  "pid": 60,
  "sku": "SG | SIN | Global 01",
  "url": "https://backwaves.net/store/sg-sgp-global"
 },
 "field-wasabi-sg1": {
  "family": "wasabi",
  "zone": "SG",
  "pid": 135,
  "sku": "1GB - EXTREME PERFORMANCE - Singapore",
  "url": "https://billing.wasabihosting.com/store/singapore-vps"
 }
});
Object.assign(networkStockTargets,{
 "vultr-v10-sao": {
  "family": "vultr",
  "zone": "sao",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/sao/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-scl": {
  "family": "vultr",
  "zone": "scl",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/scl/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-jnb": {
  "family": "vultr",
  "zone": "jnb",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/jnb/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-mel": {
  "family": "vultr",
  "zone": "mel",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/mel/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-sto": {
  "family": "vultr",
  "zone": "sto",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/sto/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-waw": {
  "family": "vultr",
  "zone": "waw",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/waw/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-mad": {
  "family": "vultr",
  "zone": "mad",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/mad/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-mex": {
  "family": "vultr",
  "zone": "mex",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/mex/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-blr": {
  "family": "vultr",
  "zone": "blr",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/blr/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 },
 "vultr-v10-tlv": {
  "family": "vultr",
  "zone": "tlv",
  "sku": "vc2-1c-1gb",
  "url": "https://api.vultr.com/v2/regions/tlv/availability?type=vc2",
  "priceUrl": "https://api.vultr.com/v2/plans?type=vc2&per_page=500"
 }
});
Object.assign(networkStockTargets,{
 "meow-tamagowtt-1": {
  "family": "tamago",
  "zone": "HK",
  "pid": 27,
  "sku": "WTT.500M.VPS.4",
  "url": "https://tamago.network/index.php?rp=/store/wtt-dynamic-vps"
 }
});
const quoteOnlyTargets={
 "vmsilo-tw": {
  "family": "vmsilo",
  "zone": "TW",
  "pid": 49,
  "sku": "fz-tw ipv6（cu）",
  "url": "https://portal.vmsilo.com/store/iepl",
  "quoteOnly": true
 },
 "vmsilo-jp": {
  "family": "vmsilo",
  "zone": "JP",
  "pid": 45,
  "sku": "sh-jp ipv6（ct）",
  "url": "https://portal.vmsilo.com/store/iepl",
  "quoteOnly": true
 },
 "vmsilo-de": {
  "family": "vmsilo",
  "zone": "DE",
  "pid": 55,
  "sku": "sh-de ipv6（ct）",
  "url": "https://portal.vmsilo.com/store/iepl",
  "quoteOnly": true
 },
 "vmsilo-kr": {
  "family": "vmsilo",
  "zone": "KR",
  "pid": 52,
  "sku": "sh-kr ipv6（ct）",
  "url": "https://portal.vmsilo.com/store/iepl",
  "quoteOnly": true
 },
 "vmsilo-us": {
  "family": "vmsilo",
  "zone": "US",
  "pid": 53,
  "sku": "sh-us ipv6（ct）",
  "url": "https://portal.vmsilo.com/store/iepl",
  "quoteOnly": true
 },
 "vmsilo-hk": {
  "family": "vmsilo",
  "zone": "HK",
  "pid": 54,
  "sku": "sh-hk ipv6（ct）",
  "url": "https://portal.vmsilo.com/store/iepl",
  "quoteOnly": true
 }
};
const catalogStockTargets = {
/* JoySolData targets */
  "pc-joysol-35": {
    "family": "joysol",
    "sku": "香港优化A-ECS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 35,
    "group": 3
  },
  "pc-joysol-36": {
    "family": "joysol",
    "sku": "香港优化A-ECS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 36,
    "group": 3
  },
  "pc-joysol-37": {
    "family": "joysol",
    "sku": "香港优化A-ECS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 37,
    "group": 3
  },
  "pc-joysol-38": {
    "family": "joysol",
    "sku": "香港优化A-ECS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 38,
    "group": 3
  },
  "joysol-40": {
    "family": "joysol",
    "sku": "香港优化A-ECS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 40,
    "group": 3
  },
  "joysol-7": {
    "family": "joysol",
    "sku": "香港优化A-TCS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 7,
    "group": 2
  },
  "joysol-30": {
    "family": "joysol",
    "sku": "香港优化A-TCS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 30,
    "group": 2
  },
  "joysol-31": {
    "family": "joysol",
    "sku": "香港优化A-TCS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 31,
    "group": 2
  },
  "joysol-32": {
    "family": "joysol",
    "sku": "香港优化A-TCS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 32,
    "group": 2
  },
  "joysol-34": {
    "family": "joysol",
    "sku": "香港优化A-TCS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 34,
    "group": 2
  },
  "joysol-61": {
    "family": "joysol",
    "sku": "香港优化B-ECS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 61,
    "group": 8
  },
  "joysol-62": {
    "family": "joysol",
    "sku": "香港优化B-ECS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 62,
    "group": 8
  },
  "joysol-63": {
    "family": "joysol",
    "sku": "香港优化B-ECS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 63,
    "group": 8
  },
  "joysol-64": {
    "family": "joysol",
    "sku": "香港优化B-ECS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 64,
    "group": 8
  },
  "joysol-65": {
    "family": "joysol",
    "sku": "香港优化B-ECS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 65,
    "group": 8
  },
  "joysol-70": {
    "family": "joysol",
    "sku": "香港优化B-TCS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 70,
    "group": 9
  },
  "joysol-69": {
    "family": "joysol",
    "sku": "香港优化B-TCS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 69,
    "group": 9
  },
  "joysol-68": {
    "family": "joysol",
    "sku": "香港优化B-TCS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 68,
    "group": 9
  },
  "joysol-67": {
    "family": "joysol",
    "sku": "香港优化B-TCS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 67,
    "group": 9
  },
  "joysol-66": {
    "family": "joysol",
    "sku": "香港优化B-TCS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 66,
    "group": 9
  },
  "joysol-77": {
    "family": "joysol",
    "sku": "香港优化C-TCS 1H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 77,
    "group": 11
  },
  "joysol-79": {
    "family": "joysol",
    "sku": "香港优化C-TCS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 79,
    "group": 11
  },
  "joysol-78": {
    "family": "joysol",
    "sku": "香港优化C-TCS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 78,
    "group": 11
  },
  "joysol-41": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 41,
    "group": 4
  },
  "joysol-43": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 43,
    "group": 4
  },
  "joysol-44": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 44,
    "group": 4
  },
  "joysol-46": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 46,
    "group": 4
  },
  "joysol-53": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 53,
    "group": 6
  },
  "joysol-54": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 54,
    "group": 6
  },
  "joysol-55": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 55,
    "group": 6
  },
  "joysol-56": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 56,
    "group": 6
  },
  "joysol-50": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 50,
    "group": 5
  },
  "joysol-52": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 52,
    "group": 5
  },
  "joysol-47": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 2 Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 47,
    "group": 5
  },
  "joysol-49": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 49,
    "group": 5
  },
  "joysol-59": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 59,
    "group": 7
  },
  "joysol-60": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 60,
    "group": 7
  },
  "joysol-57": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 57,
    "group": 7
  },
  "joysol-58": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 58,
    "group": 7
  },
  "joysol-71": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 71,
    "group": 10
  },
  "joysol-73": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 73,
    "group": 10
  },
  "joysol-74": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 74,
    "group": 10
  },
  "joysol-75": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 75,
    "group": 10
  },
  "atmos-nvme-1": {
    "family": "atmos",
    "sku": "VPS NVMe 1",
    "zone": "FR",
    "pid": 1,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-2": {
    "family": "atmos",
    "sku": "VPS NVMe 2",
    "zone": "FR",
    "pid": 2,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-3": {
    "family": "atmos",
    "sku": "VPS NVMe 3",
    "zone": "FR",
    "pid": 3,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-4": {
    "family": "atmos",
    "sku": "VPS NVMe 4",
    "zone": "FR",
    "pid": 4,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-5": {
    "family": "atmos",
    "sku": "VPS NVMe 5",
    "zone": "FR",
    "pid": 5,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-6": {
    "family": "atmos",
    "sku": "VPS NVMe 6",
    "zone": "FR",
    "pid": 6,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
/* End JoySolData targets */


 "let11-servitro-virtual-servers-usd1-server":{"family":"servitro","sku":"$1 Server","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"usd1-server"},
 "let11-servitro-virtual-servers-virtual-1":{"family":"servitro","sku":"Virtual-1","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"virtual-1"},
 "let11-servitro-virtual-servers-ryzen-9-9950x-frankfurt-virtual-1":{"family":"servitro","sku":"Virtual-1","zone":"DE","url":"https://my.servitro.com/store/virtual-servers-ryzen-9-9950x-frankfurt","slug":"virtual-1","previousGroup":"virtual-servers-ryzen-9-7950x3d"},
 "servitro-ryzen-v2":{"family":"servitro","sku":"Virtual-2","zone":"DE","url":"https://my.servitro.com/store/virtual-servers-ryzen-9-9950x-frankfurt","slug":"virtual-2","previousGroup":"virtual-servers-ryzen-9-7950x3d"},
 "servitro-epyc-v3":{"family":"servitro","sku":"Virtual-3","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"virtual-3"},
 "servitro-epyc-v4":{"family":"servitro","sku":"Virtual-4","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"virtual-4"},
 "ms-bage-jp-small": {
  "family": "bagevm",
  "sku": "Japan - SMALL",
  "zone": "JP",
  "pid": 33,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-tiny": {
  "family": "bagevm",
  "sku": "Japan - TINY",
  "zone": "JP",
  "pid": 31,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-starter": {
  "family": "bagevm",
  "sku": "Japan - STARTER",
  "zone": "JP",
  "pid": 28,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-medium": {
  "family": "bagevm",
  "sku": "Japan - MEDIUM",
  "zone": "JP",
  "pid": 29,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-large": {
  "family": "bagevm",
  "sku": "Japan - LARGE",
  "zone": "JP",
  "pid": 30,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "regional-matrix-q1-1": {
  "family": "matrix",
  "sku": "Q1 - LA - 活动款",
  "zone": "LAX",
  "pid": 9,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-2": {
  "family": "matrix",
  "sku": "Q1 - LA - 标准款",
  "zone": "LAX",
  "pid": 10,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-3": {
  "family": "matrix",
  "sku": "Q1 - LA - 进阶款",
  "zone": "LAX",
  "pid": 11,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-4": {
  "family": "matrix",
  "sku": "Q1 - LA - 高阶款",
  "zone": "LAX",
  "pid": 12,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-5": {
  "family": "matrix",
  "sku": "Q1 - LA - 顶配款",
  "zone": "LAX",
  "pid": 13,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-1": {
  "family": "matrix",
  "sku": "Q2 - LA - 活动款",
  "zone": "LAX",
  "pid": 33,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-2": {
  "family": "matrix",
  "sku": "Q2 - LA - 轻量款",
  "zone": "LAX",
  "pid": 38,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-3": {
  "family": "matrix",
  "sku": "Q2 - LA - 标准款",
  "zone": "LAX",
  "pid": 39,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-4": {
  "family": "matrix",
  "sku": "Q2 - LA - 进阶款",
  "zone": "LAX",
  "pid": 40,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-5": {
  "family": "matrix",
  "sku": "Q2 - LA - 顶配款",
  "zone": "LAX",
  "pid": 41,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-1": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 活动款",
  "zone": "SJC",
  "pid": 4,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-2": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 轻量款",
  "zone": "SJC",
  "pid": 5,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-3": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 标准款",
  "zone": "SJC",
  "pid": 6,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-4": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 进阶款",
  "zone": "SJC",
  "pid": 7,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-5": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 顶配款",
  "zone": "SJC",
  "pid": 16,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-6": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 pro",
  "zone": "SJC",
  "pid": 43,
  "url": "https://matrixidc.net/compare-plans"
 },
 "let11-prepaid-8": {
  "family": "prepaid",
  "sku": "PreBF-8",
  "zone": "DE",
  "code": "prebf-8",
  "url": "https://prepaid-host.com/en/aktion/prebf-8"
 },
 "let11-prepaid-10": {
  "family": "prepaid",
  "sku": "PreBF-10",
  "zone": "DE",
  "code": "prebf-10",
  "url": "https://prepaid-host.com/en/aktion/prebf-8"
 },
 "let11-prepaid-16": {
  "family": "prepaid",
  "sku": "FLASH-16",
  "zone": "DE",
  "code": "flash-16",
  "url": "https://prepaid-host.com/en/aktion/prebf-8"
 },
 "ms-bwh-usca-5-p166": {
  "family": "bwh",
  "sku": "80G KVM - ECOMMERCE SLA LOS ANGELES",
  "zone": "LAX",
  "pid": 166,
  "dc": "USCA_5",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usca-6-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "LAX",
  "pid": 89,
  "dc": "USCA_6",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usca-9-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "LAX",
  "pid": 89,
  "dc": "USCA_9",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usca-sjc5-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "SJC",
  "pid": 89,
  "dc": "USCA_SJC5",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-hk-8-p95": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - HONG KONG CN2 GIA",
  "zone": "HK",
  "pid": 95,
  "dc": "HK_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-jpos-6-p134": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - OSAKA CN2 GIA",
  "zone": "JP",
  "pid": 134,
  "dc": "JPOS_6",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-jpty-8-p108": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - TOKYO CN2 GIA",
  "zone": "JP",
  "pid": 108,
  "dc": "JPTY_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-sg-8-p173": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - SINGAPORE CN2 GIA",
  "zone": "SG",
  "pid": 173,
  "dc": "SG_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-cabc-6-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "CA",
  "pid": 89,
  "dc": "CABC_6",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "bwh-ams": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "NL",
  "pid": 89,
  "dc": "EUNL_9",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usny-8-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "US",
  "pid": 89,
  "dc": "USNY_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-aedxb-1-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "AE",
  "pid": 89,
  "dc": "AEDXB_1",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 }
};
Object.assign(catalogStockTargets,{
 "ms-akile-859": {
  "family": "akile",
  "sku": "TW-Dynamic-STD",
  "zone": "TW",
  "area": 6,
  "node": 16,
  "pid": 859,
  "priceId": 1235,
  "cycle": 1,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "ms-akile-906": {
  "family": "akile",
  "sku": "TW-Static-2G",
  "zone": "TW",
  "area": 6,
  "node": 21,
  "pid": 906,
  "priceId": 1297,
  "cycle": 1,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "akile-hinet": {
  "family": "akile",
  "sku": "TWHinet-Mini-NAT",
  "zone": "TW",
  "area": 6,
  "node": 31,
  "pid": 980,
  "priceId": 1402,
  "cycle": 12,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "ms-akile-827": {
  "family": "akile",
  "sku": "TWLite-Mini",
  "zone": "TW",
  "area": 6,
  "node": 11,
  "pid": 827,
  "priceId": 1181,
  "cycle": 1,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "ms-isvoro-149": {
  "family": "isvoro",
  "sku": "HK CN2 Core",
  "zone": "HK",
  "pid": 149,
  "category": 46,
  "planId": 297,
  "url": "https://isvoro.com/api/v1/products?page=1"
 }
});
Object.assign(catalogStockTargets,{
 "supp-akko-sjc-1": {
  "family": "akko",
  "sku": "美国圣何塞KVM-CN2-A2 mini年付特惠套餐",
  "zone": "SJC",
  "quoteOnly": true,
  "pid": 175,
  "url": "https://www.akkocloud.com/cart.php?gid=17"
 },
 "supp-akko-sjc-2": {
  "family": "akko",
  "sku": "美西圣何塞KVM-CN2-B1 mini 年付特惠套餐",
  "zone": "SJC",
  "quoteOnly": true,
  "pid": 187,
  "url": "https://www.akkocloud.com/cart.php?gid=17"
 },
 "supp-akko-sjc-3": {
  "family": "akko",
  "sku": "美国圣何塞KVM-CN2-B1",
  "zone": "SJC",
  "quoteOnly": true,
  "pid": 178,
  "url": "https://www.akkocloud.com/cart.php?gid=17"
 }
});
Object.assign(catalogStockTargets,{
 "mhy-p46": {
  "family": "mhy",
  "sku": "TW-HKG - 512M",
  "zone": "HK",
  "pid": 46,
  "path": "/index.php/store/tw-hkg/tw-hkg-512",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p47": {
  "family": "mhy",
  "sku": "TW-HKG - 1024M",
  "zone": "HK",
  "pid": 47,
  "path": "/index.php/store/tw-hkg/tw-hkg-1024m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p48": {
  "family": "mhy",
  "sku": "TW-HKG - 2048M",
  "zone": "HK",
  "pid": 48,
  "path": "/index.php/store/tw-hkg/tw-hkg-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p49": {
  "family": "mhy",
  "sku": "TW-HKG - 4096M",
  "zone": "HK",
  "pid": 49,
  "path": "/index.php/store/tw-hkg/tw-hkg-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p30": {
  "family": "mhy",
  "sku": "HK BGP - 512M",
  "zone": "HK",
  "pid": 30,
  "path": "/index.php/store/hk-vps/hk-bgp",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p31": {
  "family": "mhy",
  "sku": "HK BGP - 1024M",
  "zone": "HK",
  "pid": 31,
  "path": "/index.php/store/hk-vps/hk-vps-1024m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p32": {
  "family": "mhy",
  "sku": "HK BGP - 2048M",
  "zone": "HK",
  "pid": 32,
  "path": "/index.php/store/hk-vps/hk-bgp-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p33": {
  "family": "mhy",
  "sku": "HK BGP - 4096M",
  "zone": "HK",
  "pid": 33,
  "path": "/index.php/store/hk-vps/hk-bgp-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p64": {
  "family": "mhy",
  "sku": "德国BGP-512M",
  "zone": "DE",
  "pid": 64,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-512m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p56": {
  "family": "mhy",
  "sku": "德国BGP-1024M",
  "zone": "DE",
  "pid": 56,
  "path": "/index.php/store/bgp-9929/deyusyushyushouyushou",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p59": {
  "family": "mhy",
  "sku": "德国BGP-2048M",
  "zone": "DE",
  "pid": 59,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p60": {
  "family": "mhy",
  "sku": "德国BGP-4096M",
  "zone": "DE",
  "pid": 60,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p67": {
  "family": "mhy",
  "sku": "德国BGP-年付-512M",
  "zone": "DE",
  "pid": 67,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-nian-fu-512m",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p57": {
  "family": "mhy",
  "sku": "德国BGP-年付1024M",
  "zone": "DE",
  "pid": 57,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-9929-nian-fu-yu-shou",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p58": {
  "family": "mhy",
  "sku": "德国BGP-年付2048M",
  "zone": "DE",
  "pid": 58,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-nian-fu-2",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p62": {
  "family": "mhy",
  "sku": "德国BGP-年付4096M",
  "zone": "DE",
  "pid": 62,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-9929-yu-shou-kuan-nian-fu-4096m",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p52": {
  "family": "mhy",
  "sku": "MO-HKG - 512M",
  "zone": "HK",
  "pid": 52,
  "path": "/index.php/store/mo-hkg/mo-hkg-512m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p53": {
  "family": "mhy",
  "sku": "MO-HKG - 1024M",
  "zone": "HK",
  "pid": 53,
  "path": "/index.php/store/mo-hkg/mo-hkg-1024m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p54": {
  "family": "mhy",
  "sku": "MO-HKG - 2048M",
  "zone": "HK",
  "pid": 54,
  "path": "/index.php/store/mo-hkg/mo-hkg-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p55": {
  "family": "mhy",
  "sku": "MO-HKG - 4096M",
  "zone": "HK",
  "pid": 55,
  "path": "/index.php/store/mo-hkg/mo-hkg-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p51": {
  "family": "mhy",
  "sku": "香港BGP - 新年特别款",
  "zone": "HK",
  "pid": 51,
  "path": "/index.php/store/huo-dong/xiang-gang-bgp-xin-nian-te-bie-kuan",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/huo-dong"
 }
});
const facilityOfferCatalogs=[
 ["https://www.computeguy.com/vps-los-angeles-usa/",[
  ["shop-c09c6ad5b2cf","gp1-2-2-40","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-2-2-40"],
  ["compute-vps-los-angeles-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-2-2-40-pro"],
  ["compute-vps-los-angeles-usa-gp1-2-4-50","gp1-2-4-50","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-2-4-50"],
  ["compute-vps-los-angeles-usa-gp1-3-4-60","gp1-3-4-60","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-3-4-60"],
  ["compute-vps-los-angeles-usa-gp1-4-8-80","gp1-4-8-80","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-4-8-80"],
  ["compute-vps-los-angeles-usa-gp1-6-16-160","gp1-6-16-160","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-6-16-160"],
  ["compute-vps-los-angeles-usa-gp1-8-32-320","gp1-8-32-320","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-8-32-320"],
  ["compute-vps-los-angeles-usa-gp1-16-64-640","gp1-16-64-640","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-16-64-640"],
  ["compute-vps-los-angeles-usa-gp1-32-128-1t","gp1-32-128-1t","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-tirana-albania/",[
  ["compute-vps-tirana-albania-gp1-1-1-10-v6","gp1-1-1-10-v6","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-1-10-v6"],
  ["compute-vps-tirana-albania-gp1-1-1-10","gp1-1-1-10","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-1-10"],
  ["compute-vps-tirana-albania-gp1-1-1-15","gp1-1-1-15","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-1-15"],
  ["compute-vps-tirana-albania-gp1-1-2-20","gp1-1-2-20","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-2-20"],
  ["compute-vps-tirana-albania-gp1-2-2-40","gp1-2-2-40","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-2-2-40"],
  ["compute-vps-tirana-albania-gp1-2-2-40-pro","gp1-2-2-40-pro","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-2-2-40-pro"],
  ["compute-vps-tirana-albania-gp1-2-4-50","gp1-2-4-50","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-2-4-50"],
  ["compute-vps-tirana-albania-gp1-3-4-60","gp1-3-4-60","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-3-4-60"],
  ["compute-vps-tirana-albania-gp1-4-8-80","gp1-4-8-80","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-4-8-80"],
  ["compute-vps-tirana-albania-gp1-6-16-160","gp1-6-16-160","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-6-16-160"],
  ["compute-vps-tirana-albania-gp1-8-32-320","gp1-8-32-320","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-8-32-320"],
  ["compute-vps-tirana-albania-gp1-16-64-640","gp1-16-64-640","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-16-64-640"],
  ["compute-vps-tirana-albania-gp1-32-128-1t","gp1-32-128-1t","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-vienna-austria/",[
  ["compute-vps-vienna-austria-gp1-1-1-10-v6","gp1-1-1-10-v6","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-1-10-v6"],
  ["compute-vps-vienna-austria-gp1-1-1-10","gp1-1-1-10","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-1-10"],
  ["compute-vps-vienna-austria-gp1-1-1-15","gp1-1-1-15","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-1-15"],
  ["compute-vps-vienna-austria-gp1-1-2-20","gp1-1-2-20","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-2-20"],
  ["compute-vps-vienna-austria-gp1-2-2-40","gp1-2-2-40","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-2-2-40"],
  ["compute-vps-vienna-austria-gp1-2-2-40-pro","gp1-2-2-40-pro","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-2-2-40-pro"],
  ["compute-vps-vienna-austria-gp1-2-4-50","gp1-2-4-50","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-2-4-50"],
  ["compute-vps-vienna-austria-gp1-3-4-60","gp1-3-4-60","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-3-4-60"],
  ["compute-vps-vienna-austria-gp1-4-8-80","gp1-4-8-80","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-4-8-80"],
  ["compute-vps-vienna-austria-gp1-6-16-160","gp1-6-16-160","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-6-16-160"],
  ["compute-vps-vienna-austria-gp1-8-32-320","gp1-8-32-320","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-8-32-320"],
  ["compute-vps-vienna-austria-gp1-16-64-640","gp1-16-64-640","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-sofia-bulgaria/",[
  ["compute-vps-sofia-bulgaria-gp1-1-1-10-v6","gp1-1-1-10-v6","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-1-10-v6"],
  ["compute-vps-sofia-bulgaria-gp1-1-1-10","gp1-1-1-10","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-1-10"],
  ["compute-vps-sofia-bulgaria-gp1-1-1-15","gp1-1-1-15","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-1-15"],
  ["compute-vps-sofia-bulgaria-gp1-1-2-20","gp1-1-2-20","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-2-20"],
  ["compute-vps-sofia-bulgaria-gp1-2-2-40","gp1-2-2-40","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-2-2-40"],
  ["compute-vps-sofia-bulgaria-gp1-2-2-40-pro","gp1-2-2-40-pro","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-2-2-40-pro"],
  ["compute-vps-sofia-bulgaria-gp1-2-4-50","gp1-2-4-50","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-2-4-50"],
  ["compute-vps-sofia-bulgaria-gp1-3-4-60","gp1-3-4-60","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-3-4-60"],
  ["compute-vps-sofia-bulgaria-gp1-4-8-80","gp1-4-8-80","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-4-8-80"],
  ["compute-vps-sofia-bulgaria-gp1-6-16-160","gp1-6-16-160","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-6-16-160"],
  ["compute-vps-sofia-bulgaria-gp1-8-32-320","gp1-8-32-320","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-8-32-320"],
  ["compute-vps-sofia-bulgaria-gp1-16-64-640","gp1-16-64-640","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-16-64-640"],
  ["compute-vps-sofia-bulgaria-gp1-32-128-1t","gp1-32-128-1t","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-nicosia-cyprus/",[
  ["compute-vps-nicosia-cyprus-00d10c1-2","00d10c1-2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/00d10c1-2"],
  ["compute-vps-nicosia-cyprus-01d20c1-2","01d20c1-2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/01d20c1-2"],
  ["compute-vps-nicosia-cyprus-02d30c1","02d30c1","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/02d30c1"],
  ["compute-vps-nicosia-cyprus-03d40c2","03d40c2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d40c2"],
  ["compute-vps-nicosia-cyprus-03d20c4","03d20c4","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d20c4"],
  ["compute-vps-nicosia-cyprus-03d80c2","03d80c2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d80c2"],
  ["compute-vps-nicosia-cyprus-03d20c2","03d20c2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d20c2"],
  ["compute-vps-nicosia-cyprus-04d60c3","04d60c3","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/04d60c3"],
  ["compute-vps-nicosia-cyprus-05d80c4","05d80c4","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/05d80c4"],
  ["compute-vps-nicosia-cyprus-06d160c6","06d160c6","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/06d160c6"],
  ["compute-vps-nicosia-cyprus-07d320c8","07d320c8","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/07d320c8"],
  ["compute-vps-nicosia-cyprus-08d640c12","08d640c12","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-prague-czechia/",[
  ["compute-vps-prague-czechia-gp1-1-1-10-v6","gp1-1-1-10-v6","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-1-10-v6"],
  ["compute-vps-prague-czechia-gp1-1-1-10","gp1-1-1-10","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-1-10"],
  ["compute-vps-prague-czechia-gp1-1-1-15","gp1-1-1-15","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-1-15"],
  ["compute-vps-prague-czechia-gp1-1-2-20","gp1-1-2-20","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-2-20"],
  ["compute-vps-prague-czechia-gp1-2-2-40","gp1-2-2-40","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-2-2-40"],
  ["compute-vps-prague-czechia-gp1-2-2-40-pro","gp1-2-2-40-pro","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-2-2-40-pro"],
  ["compute-vps-prague-czechia-gp1-2-4-50","gp1-2-4-50","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-2-4-50"],
  ["compute-vps-prague-czechia-gp1-3-4-60","gp1-3-4-60","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-3-4-60"],
  ["compute-vps-prague-czechia-gp1-4-8-80","gp1-4-8-80","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-4-8-80"],
  ["compute-vps-prague-czechia-gp1-6-16-160","gp1-6-16-160","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-6-16-160"],
  ["compute-vps-prague-czechia-gp1-8-32-320","gp1-8-32-320","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-8-32-320"],
  ["compute-vps-prague-czechia-gp1-16-64-640","gp1-16-64-640","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-16-64-640"],
  ["compute-vps-prague-czechia-gp1-32-128-1t","gp1-32-128-1t","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-copenhagen-denmark/",[
  ["compute-vps-copenhagen-denmark-gp1-1-1-10-v6","gp1-1-1-10-v6","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-1-10-v6"],
  ["compute-vps-copenhagen-denmark-gp1-1-1-10","gp1-1-1-10","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-1-10"],
  ["compute-vps-copenhagen-denmark-gp1-1-1-15","gp1-1-1-15","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-1-15"],
  ["compute-vps-copenhagen-denmark-gp1-1-2-20","gp1-1-2-20","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-2-20"],
  ["compute-vps-copenhagen-denmark-gp1-2-2-40","gp1-2-2-40","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-2-2-40"],
  ["compute-vps-copenhagen-denmark-gp1-2-2-40-pro","gp1-2-2-40-pro","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-2-2-40-pro"],
  ["compute-vps-copenhagen-denmark-gp1-2-4-50","gp1-2-4-50","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-2-4-50"],
  ["compute-vps-copenhagen-denmark-gp1-3-4-60","gp1-3-4-60","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-3-4-60"],
  ["compute-vps-copenhagen-denmark-gp1-4-8-80","gp1-4-8-80","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-4-8-80"],
  ["compute-vps-copenhagen-denmark-gp1-6-16-160","gp1-6-16-160","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-6-16-160"],
  ["compute-vps-copenhagen-denmark-gp1-8-32-320","gp1-8-32-320","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-8-32-320"],
  ["compute-vps-copenhagen-denmark-gp1-16-64-640","gp1-16-64-640","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-16-64-640"],
  ["compute-vps-copenhagen-denmark-gp1-32-128-1t","gp1-32-128-1t","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-helsinki-finland/",[
  ["compute-vps-helsinki-finland-gp1-1-1-10-v6","gp1-1-1-10-v6","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-1-10-v6"],
  ["compute-vps-helsinki-finland-gp1-1-1-10","gp1-1-1-10","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-1-10"],
  ["compute-vps-helsinki-finland-gp1-1-1-15","gp1-1-1-15","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-1-15"],
  ["compute-vps-helsinki-finland-gp1-1-2-20","gp1-1-2-20","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-2-20"],
  ["compute-vps-helsinki-finland-gp1-2-2-40","gp1-2-2-40","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-2-2-40"],
  ["compute-vps-helsinki-finland-gp1-2-2-40-pro","gp1-2-2-40-pro","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-2-2-40-pro"],
  ["compute-vps-helsinki-finland-gp1-2-4-50","gp1-2-4-50","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-2-4-50"],
  ["compute-vps-helsinki-finland-gp1-3-4-60","gp1-3-4-60","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-3-4-60"],
  ["compute-vps-helsinki-finland-gp1-4-8-80","gp1-4-8-80","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-4-8-80"],
  ["compute-vps-helsinki-finland-gp1-6-16-160","gp1-6-16-160","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-6-16-160"],
  ["compute-vps-helsinki-finland-gp1-8-32-320","gp1-8-32-320","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-8-32-320"],
  ["compute-vps-helsinki-finland-gp1-16-64-640","gp1-16-64-640","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-16-64-640"],
  ["compute-vps-helsinki-finland-gp1-32-128-1t","gp1-32-128-1t","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-paris-france/",[
  ["compute-vps-paris-france-00d10c1v6","00d10c1v6","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/00d10c1v6"],
  ["compute-vps-paris-france-00d10c1-2","00d10c1-2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/00d10c1-2"],
  ["compute-vps-paris-france-01d20c1-2","01d20c1-2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/01d20c1-2"],
  ["compute-vps-paris-france-02d30c1","02d30c1","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/02d30c1"],
  ["compute-vps-paris-france-03d40c2","03d40c2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d40c2"],
  ["compute-vps-paris-france-03d20c4","03d20c4","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d20c4"],
  ["compute-vps-paris-france-03d80c2","03d80c2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d80c2"],
  ["compute-vps-paris-france-03d20c2","03d20c2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d20c2"],
  ["compute-vps-paris-france-04d60c3","04d60c3","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/04d60c3"],
  ["compute-vps-paris-france-05d80c4","05d80c4","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/05d80c4"],
  ["compute-vps-paris-france-06d160c6","06d160c6","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/06d160c6"],
  ["compute-vps-paris-france-07d320c8","07d320c8","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/07d320c8"],
  ["compute-vps-paris-france-08d640c12","08d640c12","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-frankfurt-germany/",[
  ["compute-vps-frankfurt-germany-gp1-1-1-10-v6","gp1-1-1-10-v6","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-1-10-v6"],
  ["compute-vps-frankfurt-germany-gp1-1-1-10","gp1-1-1-10","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-1-10"],
  ["compute-vps-frankfurt-germany-gp1-1-1-15","gp1-1-1-15","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-1-15"],
  ["compute-vps-frankfurt-germany-gp1-1-2-20","gp1-1-2-20","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-2-20"],
  ["compute-vps-frankfurt-germany-gp1-2-2-40","gp1-2-2-40","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-2-2-40"],
  ["compute-vps-frankfurt-germany-gp1-2-2-40-pro","gp1-2-2-40-pro","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-2-2-40-pro"],
  ["compute-vps-frankfurt-germany-gp1-2-4-50","gp1-2-4-50","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-2-4-50"],
  ["compute-vps-frankfurt-germany-gp1-3-4-60","gp1-3-4-60","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-3-4-60"],
  ["compute-vps-frankfurt-germany-gp1-4-8-80","gp1-4-8-80","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-4-8-80"],
  ["compute-vps-frankfurt-germany-gp1-6-16-160","gp1-6-16-160","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-6-16-160"],
  ["compute-vps-frankfurt-germany-gp1-8-32-320","gp1-8-32-320","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-8-32-320"],
  ["compute-vps-frankfurt-germany-gp1-16-64-640","gp1-16-64-640","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-16-64-640"],
  ["compute-vps-frankfurt-germany-gp1-32-128-1t","gp1-32-128-1t","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-vilnius-lithuania/",[
  ["compute-vps-vilnius-lithuania-gp1-1-1-10-v6","gp1-1-1-10-v6","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-1-10-v6"],
  ["compute-vps-vilnius-lithuania-gp1-1-1-10","gp1-1-1-10","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-1-10"],
  ["compute-vps-vilnius-lithuania-gp1-1-1-15","gp1-1-1-15","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-1-15"],
  ["compute-vps-vilnius-lithuania-gp1-1-2-20","gp1-1-2-20","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-2-20"],
  ["compute-vps-vilnius-lithuania-gp1-2-2-40","gp1-2-2-40","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-2-2-40"],
  ["compute-vps-vilnius-lithuania-gp1-2-2-40-pro","gp1-2-2-40-pro","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-2-2-40-pro"],
  ["compute-vps-vilnius-lithuania-gp1-2-4-50","gp1-2-4-50","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-2-4-50"],
  ["compute-vps-vilnius-lithuania-gp1-3-4-60","gp1-3-4-60","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-3-4-60"],
  ["compute-vps-vilnius-lithuania-gp1-4-8-80","gp1-4-8-80","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-4-8-80"],
  ["compute-vps-vilnius-lithuania-gp1-6-16-160","gp1-6-16-160","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-6-16-160"],
  ["compute-vps-vilnius-lithuania-gp1-8-32-320","gp1-8-32-320","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-8-32-320"],
  ["compute-vps-vilnius-lithuania-gp1-16-64-640","gp1-16-64-640","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-16-64-640"],
  ["compute-vps-vilnius-lithuania-gp1-32-128-1t","gp1-32-128-1t","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-florence-italy/",[
  ["compute-vps-florence-italy-gp1-1-1-10-v6","gp1-1-1-10-v6","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-1-10-v6"],
  ["compute-vps-florence-italy-gp1-1-1-10","gp1-1-1-10","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-1-10"],
  ["compute-vps-florence-italy-gp1-1-1-15","gp1-1-1-15","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-1-15"],
  ["compute-vps-florence-italy-gp1-1-2-20","gp1-1-2-20","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-2-20"],
  ["compute-vps-florence-italy-gp1-2-2-40","gp1-2-2-40","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-2-2-40"],
  ["compute-vps-florence-italy-gp1-2-2-40-pro","gp1-2-2-40-pro","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-2-2-40-pro"],
  ["compute-vps-florence-italy-gp1-2-4-50","gp1-2-4-50","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-2-4-50"],
  ["compute-vps-florence-italy-gp1-3-4-60","gp1-3-4-60","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-3-4-60"],
  ["compute-vps-florence-italy-gp1-4-8-80","gp1-4-8-80","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-4-8-80"],
  ["compute-vps-florence-italy-gp1-6-16-160","gp1-6-16-160","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-6-16-160"],
  ["compute-vps-florence-italy-gp1-8-32-320","gp1-8-32-320","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-8-32-320"],
  ["compute-vps-florence-italy-gp1-16-64-640","gp1-16-64-640","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-athens-greece/",[
  ["compute-vps-athens-greece-gp1-1-1-10-v6","gp1-1-1-10-v6","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-1-10-v6"],
  ["compute-vps-athens-greece-gp1-1-1-10","gp1-1-1-10","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-1-10"],
  ["compute-vps-athens-greece-gp1-1-1-15","gp1-1-1-15","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-1-15"],
  ["compute-vps-athens-greece-gp1-1-2-20","gp1-1-2-20","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-2-20"],
  ["compute-vps-athens-greece-gp1-2-2-40","gp1-2-2-40","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-2-2-40"],
  ["compute-vps-athens-greece-gp1-2-2-40-pro","gp1-2-2-40-pro","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-2-2-40-pro"],
  ["compute-vps-athens-greece-gp1-2-4-50","gp1-2-4-50","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-2-4-50"],
  ["compute-vps-athens-greece-gp1-3-4-60","gp1-3-4-60","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-3-4-60"],
  ["compute-vps-athens-greece-gp1-4-8-80","gp1-4-8-80","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-4-8-80"],
  ["compute-vps-athens-greece-gp1-6-16-160","gp1-6-16-160","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-6-16-160"],
  ["compute-vps-athens-greece-gp1-8-32-320","gp1-8-32-320","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-8-32-320"],
  ["compute-vps-athens-greece-gp1-16-64-640","gp1-16-64-640","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-moscow-russia/",[
  ["compute-vps-moscow-russia-02d30c1","02d30c1","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/02d30c1"],
  ["compute-vps-moscow-russia-03d40c2","03d40c2","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d40c2"],
  ["compute-vps-moscow-russia-03d20c4","03d20c4","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d20c4"],
  ["compute-vps-moscow-russia-03d80c2","03d80c2","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d80c2"],
  ["compute-vps-moscow-russia-03d20c2","03d20c2","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d20c2"],
  ["compute-vps-moscow-russia-04d60c3","04d60c3","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/04d60c3"],
  ["compute-vps-moscow-russia-05d80c4","05d80c4","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/05d80c4"],
  ["compute-vps-moscow-russia-06d160c6","06d160c6","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/06d160c6"],
  ["compute-vps-moscow-russia-07d320c8","07d320c8","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/07d320c8"]
 ]],
 ["https://www.computeguy.com/vps-bucharest-romania/",[
  ["compute-vps-bucharest-romania-gp1-1-1-15","gp1-1-1-15","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-1-1-15"],
  ["compute-vps-bucharest-romania-gp1-1-2-20","gp1-1-2-20","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-1-2-20"],
  ["compute-vps-bucharest-romania-gp1-2-2-40","gp1-2-2-40","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-2-2-40"],
  ["compute-vps-bucharest-romania-gp1-2-2-40-pro","gp1-2-2-40-pro","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-2-2-40-pro"],
  ["compute-vps-bucharest-romania-gp1-2-4-50","gp1-2-4-50","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-2-4-50"],
  ["compute-vps-bucharest-romania-gp1-3-4-60","gp1-3-4-60","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-3-4-60"],
  ["compute-vps-bucharest-romania-gp1-4-8-80","gp1-4-8-80","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-4-8-80"],
  ["compute-vps-bucharest-romania-gp1-6-16-160","gp1-6-16-160","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-6-16-160"],
  ["compute-vps-bucharest-romania-gp1-8-32-320","gp1-8-32-320","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-8-32-320"],
  ["compute-vps-bucharest-romania-gp1-16-64-640","gp1-16-64-640","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-16-64-640"],
  ["compute-vps-bucharest-romania-gp1-32-128-1t","gp1-32-128-1t","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-barcelona-spain/",[
  ["compute-vps-barcelona-spain-gp1-1-1-10-v6","gp1-1-1-10-v6","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-1-10-v6"],
  ["compute-vps-barcelona-spain-gp1-1-1-10","gp1-1-1-10","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-1-10"],
  ["compute-vps-barcelona-spain-gp1-1-1-15","gp1-1-1-15","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-1-15"],
  ["compute-vps-barcelona-spain-gp1-1-2-20","gp1-1-2-20","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-2-20"],
  ["compute-vps-barcelona-spain-gp1-2-2-40","gp1-2-2-40","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-2-2-40"],
  ["compute-vps-barcelona-spain-gp1-2-2-40-pro","gp1-2-2-40-pro","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-2-2-40-pro"],
  ["compute-vps-barcelona-spain-gp1-2-4-50","gp1-2-4-50","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-2-4-50"],
  ["compute-vps-barcelona-spain-gp1-3-4-60","gp1-3-4-60","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-3-4-60"],
  ["compute-vps-barcelona-spain-gp1-4-8-80","gp1-4-8-80","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-4-8-80"],
  ["compute-vps-barcelona-spain-gp1-6-16-160","gp1-6-16-160","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-6-16-160"],
  ["compute-vps-barcelona-spain-gp1-8-32-320","gp1-8-32-320","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-8-32-320"],
  ["compute-vps-barcelona-spain-gp1-16-64-640","gp1-16-64-640","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-warsaw-poland/",[
  ["compute-vps-warsaw-poland-gp1-1-1-10-v6","gp1-1-1-10-v6","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-1-10-v6"],
  ["compute-vps-warsaw-poland-gp1-1-1-10","gp1-1-1-10","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-1-10"],
  ["compute-vps-warsaw-poland-gp1-1-1-15","gp1-1-1-15","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-1-15"],
  ["compute-vps-warsaw-poland-gp1-1-2-20","gp1-1-2-20","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-2-20"],
  ["compute-vps-warsaw-poland-gp1-2-2-40","gp1-2-2-40","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-2-2-40"],
  ["compute-vps-warsaw-poland-gp1-2-2-40-pro","gp1-2-2-40-pro","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-2-2-40-pro"],
  ["compute-vps-warsaw-poland-gp1-2-4-50","gp1-2-4-50","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-2-4-50"],
  ["compute-vps-warsaw-poland-gp1-3-4-60","gp1-3-4-60","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-3-4-60"],
  ["compute-vps-warsaw-poland-gp1-4-8-80","gp1-4-8-80","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-4-8-80"],
  ["compute-vps-warsaw-poland-gp1-6-16-160","gp1-6-16-160","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-6-16-160"],
  ["compute-vps-warsaw-poland-gp1-8-32-320","gp1-8-32-320","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-8-32-320"],
  ["compute-vps-warsaw-poland-gp1-16-64-640","gp1-16-64-640","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-madrid-spain/",[
  ["compute-vps-madrid-spain-gp1-1-1-10-v6","gp1-1-1-10-v6","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-1-10-v6"],
  ["compute-vps-madrid-spain-gp1-1-1-10","gp1-1-1-10","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-1-10"],
  ["compute-vps-madrid-spain-gp1-1-1-15","gp1-1-1-15","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-1-15"],
  ["compute-vps-madrid-spain-gp1-1-2-20","gp1-1-2-20","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-2-20"],
  ["compute-vps-madrid-spain-gp1-2-2-40","gp1-2-2-40","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-2-2-40"],
  ["compute-vps-madrid-spain-gp1-2-2-40-pro","gp1-2-2-40-pro","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-2-2-40-pro"],
  ["compute-vps-madrid-spain-gp1-2-4-50","gp1-2-4-50","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-2-4-50"],
  ["compute-vps-madrid-spain-gp1-3-4-60","gp1-3-4-60","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-3-4-60"],
  ["compute-vps-madrid-spain-gp1-4-8-80","gp1-4-8-80","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-4-8-80"],
  ["compute-vps-madrid-spain-gp1-6-16-160","gp1-6-16-160","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-6-16-160"],
  ["compute-vps-madrid-spain-gp1-8-32-320","gp1-8-32-320","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-8-32-320"],
  ["compute-vps-madrid-spain-gp1-16-64-640","gp1-16-64-640","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-stockholm-sweden/",[
  ["compute-vps-stockholm-sweden-gp1-1-1-10-v6","gp1-1-1-10-v6","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-1-10-v6"],
  ["compute-vps-stockholm-sweden-gp1-1-1-10","gp1-1-1-10","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-1-10"],
  ["compute-vps-stockholm-sweden-gp1-1-1-15","gp1-1-1-15","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-1-15"],
  ["compute-vps-stockholm-sweden-gp1-1-2-20","gp1-1-2-20","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-2-20"],
  ["compute-vps-stockholm-sweden-gp1-2-2-40","gp1-2-2-40","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-2-2-40"],
  ["compute-vps-stockholm-sweden-gp1-2-2-40-pro","gp1-2-2-40-pro","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-2-2-40-pro"],
  ["compute-vps-stockholm-sweden-gp1-2-4-50","gp1-2-4-50","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-2-4-50"],
  ["compute-vps-stockholm-sweden-gp1-3-4-60","gp1-3-4-60","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-3-4-60"],
  ["compute-vps-stockholm-sweden-gp1-4-8-80","gp1-4-8-80","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-4-8-80"],
  ["compute-vps-stockholm-sweden-gp1-6-16-160","gp1-6-16-160","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-6-16-160"],
  ["compute-vps-stockholm-sweden-gp1-8-32-320","gp1-8-32-320","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-8-32-320"],
  ["compute-vps-stockholm-sweden-gp1-16-64-640","gp1-16-64-640","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-16-64-640"],
  ["compute-vps-stockholm-sweden-gp1-32-128-1t","gp1-32-128-1t","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-zurich-switzerland/",[
  ["compute-vps-zurich-switzerland-gp1-2-2-40","gp1-2-2-40","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-2-2-40"],
  ["compute-vps-zurich-switzerland-gp1-2-2-40-pro","gp1-2-2-40-pro","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-2-2-40-pro"],
  ["compute-vps-zurich-switzerland-gp1-2-4-50","gp1-2-4-50","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-2-4-50"],
  ["compute-vps-zurich-switzerland-gp1-3-4-60","gp1-3-4-60","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-3-4-60"],
  ["compute-vps-zurich-switzerland-gp1-4-8-80","gp1-4-8-80","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-4-8-80"],
  ["compute-vps-zurich-switzerland-gp1-6-16-160","gp1-6-16-160","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-6-16-160"],
  ["compute-vps-zurich-switzerland-gp1-8-32-320","gp1-8-32-320","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-8-32-320"],
  ["compute-vps-zurich-switzerland-gp1-16-64-640","gp1-16-64-640","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-16-64-640"],
  ["compute-vps-zurich-switzerland-gp1-32-128-1t","gp1-32-128-1t","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-kyiv-ukraine/",[
  ["compute-vps-kyiv-ukraine-gp1-1-1-10-v6","gp1-1-1-10-v6","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-1-10-v6"],
  ["compute-vps-kyiv-ukraine-gp1-1-1-10","gp1-1-1-10","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-1-10"],
  ["compute-vps-kyiv-ukraine-gp1-1-1-15","gp1-1-1-15","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-1-15"],
  ["compute-vps-kyiv-ukraine-gp1-1-2-20","gp1-1-2-20","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-2-20"],
  ["compute-vps-kyiv-ukraine-gp1-2-2-40","gp1-2-2-40","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-2-2-40"],
  ["compute-vps-kyiv-ukraine-gp1-2-2-40-pro","gp1-2-2-40-pro","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-2-2-40-pro"],
  ["compute-vps-kyiv-ukraine-gp1-2-4-50","gp1-2-4-50","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-2-4-50"],
  ["compute-vps-kyiv-ukraine-gp1-3-4-60","gp1-3-4-60","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-3-4-60"],
  ["compute-vps-kyiv-ukraine-gp1-4-8-80","gp1-4-8-80","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-4-8-80"],
  ["compute-vps-kyiv-ukraine-gp1-6-16-160","gp1-6-16-160","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-6-16-160"],
  ["compute-vps-kyiv-ukraine-gp1-8-32-320","gp1-8-32-320","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-8-32-320"],
  ["compute-vps-kyiv-ukraine-gp1-16-64-640","gp1-16-64-640","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-16-64-640"],
  ["compute-vps-kyiv-ukraine-gp1-32-128-1t","gp1-32-128-1t","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-london-united-kingdom/",[
  ["compute-vps-london-united-kingdom-gp1-1-1-10-v6","gp1-1-1-10-v6","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-1-10-v6"],
  ["compute-vps-london-united-kingdom-gp1-1-1-10","gp1-1-1-10","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-1-10"],
  ["compute-vps-london-united-kingdom-gp1-1-1-15","gp1-1-1-15","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-1-15"],
  ["compute-vps-london-united-kingdom-gp1-1-2-20","gp1-1-2-20","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-2-20"],
  ["compute-vps-london-united-kingdom-gp1-2-2-40","gp1-2-2-40","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-2-2-40"],
  ["compute-vps-london-united-kingdom-gp1-2-2-40-pro","gp1-2-2-40-pro","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-2-2-40-pro"],
  ["compute-vps-london-united-kingdom-gp1-2-4-50","gp1-2-4-50","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-2-4-50"],
  ["compute-vps-london-united-kingdom-gp1-3-4-60","gp1-3-4-60","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-3-4-60"],
  ["compute-vps-london-united-kingdom-gp1-4-8-80","gp1-4-8-80","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-4-8-80"],
  ["compute-vps-london-united-kingdom-gp1-6-16-160","gp1-6-16-160","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-6-16-160"],
  ["compute-vps-london-united-kingdom-gp1-8-32-320","gp1-8-32-320","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-8-32-320"],
  ["compute-vps-london-united-kingdom-gp1-16-64-640","gp1-16-64-640","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-montreal-canada/",[
  ["compute-vps-montreal-canada-gp1-1-1-10-v6","gp1-1-1-10-v6","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-1-10-v6"],
  ["compute-vps-montreal-canada-gp1-1-1-10","gp1-1-1-10","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-1-10"],
  ["compute-vps-montreal-canada-gp1-1-1-15","gp1-1-1-15","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-1-15"],
  ["compute-vps-montreal-canada-gp1-1-2-20","gp1-1-2-20","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-2-20"],
  ["compute-vps-montreal-canada-gp1-2-2-40","gp1-2-2-40","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-2-2-40"],
  ["compute-vps-montreal-canada-gp1-2-2-40-pro","gp1-2-2-40-pro","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-2-2-40-pro"],
  ["compute-vps-montreal-canada-gp1-2-4-50","gp1-2-4-50","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-2-4-50"],
  ["compute-vps-montreal-canada-gp1-3-4-60","gp1-3-4-60","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-3-4-60"],
  ["compute-vps-montreal-canada-gp1-4-8-80","gp1-4-8-80","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-4-8-80"],
  ["compute-vps-montreal-canada-gp1-6-16-160","gp1-6-16-160","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-6-16-160"],
  ["compute-vps-montreal-canada-gp1-8-32-320","gp1-8-32-320","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-8-32-320"],
  ["compute-vps-montreal-canada-gp1-16-64-640","gp1-16-64-640","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-toronto-canada/",[
  ["compute-vps-toronto-canada-gp1-1-1-10-v6","gp1-1-1-10-v6","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-1-10-v6"],
  ["compute-vps-toronto-canada-gp1-1-1-10","gp1-1-1-10","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-1-10"],
  ["compute-vps-toronto-canada-gp1-1-1-15","gp1-1-1-15","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-1-15"],
  ["compute-vps-toronto-canada-gp1-1-2-20","gp1-1-2-20","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-2-20"],
  ["compute-vps-toronto-canada-gp1-2-2-40","gp1-2-2-40","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-2-2-40"],
  ["compute-vps-toronto-canada-gp1-2-2-40-pro","gp1-2-2-40-pro","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-2-2-40-pro"],
  ["compute-vps-toronto-canada-gp1-2-4-50","gp1-2-4-50","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-2-4-50"],
  ["compute-vps-toronto-canada-gp1-3-4-60","gp1-3-4-60","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-3-4-60"],
  ["compute-vps-toronto-canada-gp1-4-8-80","gp1-4-8-80","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-4-8-80"],
  ["compute-vps-toronto-canada-gp1-6-16-160","gp1-6-16-160","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-6-16-160"],
  ["compute-vps-toronto-canada-gp1-8-32-320","gp1-8-32-320","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-8-32-320"],
  ["compute-vps-toronto-canada-gp1-16-64-640","gp1-16-64-640","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-vancouver-canada/",[
  ["compute-vps-vancouver-canada-gp1-1-1-10-v6","gp1-1-1-10-v6","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-1-10-v6"],
  ["compute-vps-vancouver-canada-gp1-1-1-10","gp1-1-1-10","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-1-10"],
  ["compute-vps-vancouver-canada-gp1-1-1-15","gp1-1-1-15","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-1-15"],
  ["compute-vps-vancouver-canada-gp1-1-2-20","gp1-1-2-20","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-2-20"],
  ["compute-vps-vancouver-canada-gp1-2-2-40","gp1-2-2-40","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-2-2-40"],
  ["compute-vps-vancouver-canada-gp1-2-2-40-pro","gp1-2-2-40-pro","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-2-2-40-pro"],
  ["compute-vps-vancouver-canada-gp1-2-4-50","gp1-2-4-50","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-2-4-50"],
  ["compute-vps-vancouver-canada-gp1-3-4-60","gp1-3-4-60","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-3-4-60"],
  ["compute-vps-vancouver-canada-gp1-4-8-80","gp1-4-8-80","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-4-8-80"],
  ["compute-vps-vancouver-canada-gp1-6-16-160","gp1-6-16-160","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-6-16-160"],
  ["compute-vps-vancouver-canada-gp1-8-32-320","gp1-8-32-320","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-8-32-320"],
  ["compute-vps-vancouver-canada-gp1-16-64-640","gp1-16-64-640","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-16-64-640"],
  ["compute-vps-vancouver-canada-gp1-32-128-1t","gp1-32-128-1t","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-mexico-city-mexico/",[
  ["compute-vps-mexico-city-mexico-03d40c2","03d40c2","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d40c2"],
  ["compute-vps-mexico-city-mexico-03d20c4","03d20c4","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d20c4"],
  ["compute-vps-mexico-city-mexico-03d80c2","03d80c2","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d80c2"],
  ["compute-vps-mexico-city-mexico-03d20c2","03d20c2","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d20c2"],
  ["compute-vps-mexico-city-mexico-04d60c3","04d60c3","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/04d60c3"],
  ["compute-vps-mexico-city-mexico-05d80c4","05d80c4","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/05d80c4"],
  ["compute-vps-mexico-city-mexico-06d160c6","06d160c6","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/06d160c6"],
  ["compute-vps-mexico-city-mexico-07d320c8","07d320c8","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/07d320c8"],
  ["compute-vps-mexico-city-mexico-08d640c12","08d640c12","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-san-juan-puerto-rico/",[
  ["compute-vps-san-juan-puerto-rico-00d10c1v6","00d10c1v6","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/00d10c1v6"],
  ["compute-vps-san-juan-puerto-rico-00d10c1-2","00d10c1-2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/00d10c1-2"],
  ["compute-vps-san-juan-puerto-rico-01d20c1-2","01d20c1-2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/01d20c1-2"],
  ["compute-vps-san-juan-puerto-rico-02d30c1","02d30c1","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/02d30c1"],
  ["compute-vps-san-juan-puerto-rico-03d40c2","03d40c2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d40c2"],
  ["compute-vps-san-juan-puerto-rico-03d20c4","03d20c4","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d20c4"],
  ["compute-vps-san-juan-puerto-rico-03d80c2","03d80c2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d80c2"],
  ["compute-vps-san-juan-puerto-rico-03d20c2","03d20c2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d20c2"],
  ["compute-vps-san-juan-puerto-rico-04d60c3","04d60c3","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/04d60c3"],
  ["compute-vps-san-juan-puerto-rico-05d80c4","05d80c4","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/05d80c4"],
  ["compute-vps-san-juan-puerto-rico-06d160c6","06d160c6","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/06d160c6"],
  ["compute-vps-san-juan-puerto-rico-07d320c8","07d320c8","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/07d320c8"],
  ["compute-vps-san-juan-puerto-rico-08d640c12","08d640c12","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-atlanta-usa/",[
  ["compute-vps-atlanta-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-1-10-v6"],
  ["compute-vps-atlanta-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-1-10"],
  ["compute-vps-atlanta-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-1-15"],
  ["compute-vps-atlanta-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-2-20"],
  ["compute-vps-atlanta-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-2-2-40"],
  ["compute-vps-atlanta-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-2-2-40-pro"],
  ["compute-vps-atlanta-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-2-4-50"],
  ["compute-vps-atlanta-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-3-4-60"],
  ["compute-vps-atlanta-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-4-8-80"],
  ["compute-vps-atlanta-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-6-16-160"],
  ["compute-vps-atlanta-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-8-32-320"],
  ["compute-vps-atlanta-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-16-64-640"],
  ["compute-vps-atlanta-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-ashburn-usa/",[
  ["compute-vps-ashburn-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-1-10-v6"],
  ["compute-vps-ashburn-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-1-10"],
  ["compute-vps-ashburn-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-1-15"],
  ["compute-vps-ashburn-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-2-20"],
  ["compute-vps-ashburn-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-2-2-40"],
  ["compute-vps-ashburn-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-2-2-40-pro"],
  ["compute-vps-ashburn-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-2-4-50"],
  ["compute-vps-ashburn-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-3-4-60"],
  ["compute-vps-ashburn-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-4-8-80"],
  ["compute-vps-ashburn-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-6-16-160"],
  ["compute-vps-ashburn-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-8-32-320"],
  ["compute-vps-ashburn-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-16-64-640"],
  ["compute-vps-ashburn-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-chicago-usa/",[
  ["compute-vps-chicago-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-1-10-v6"],
  ["compute-vps-chicago-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-1-10"],
  ["compute-vps-chicago-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-1-15"],
  ["compute-vps-chicago-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-2-20"],
  ["compute-vps-chicago-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-2-2-40"],
  ["compute-vps-chicago-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-2-2-40-pro"],
  ["compute-vps-chicago-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-2-4-50"],
  ["compute-vps-chicago-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-3-4-60"],
  ["compute-vps-chicago-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-4-8-80"],
  ["compute-vps-chicago-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-6-16-160"],
  ["compute-vps-chicago-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-8-32-320"],
  ["compute-vps-chicago-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-16-64-640"],
  ["compute-vps-chicago-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-dallas-usa/",[
  ["compute-vps-dallas-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-1-10-v6"],
  ["compute-vps-dallas-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-1-10"],
  ["compute-vps-dallas-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-1-15"],
  ["compute-vps-dallas-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-2-20"],
  ["compute-vps-dallas-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-2-2-40"],
  ["compute-vps-dallas-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-2-2-40-pro"],
  ["compute-vps-dallas-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-2-4-50"],
  ["compute-vps-dallas-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-3-4-60"],
  ["compute-vps-dallas-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-4-8-80"],
  ["compute-vps-dallas-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-6-16-160"],
  ["compute-vps-dallas-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-8-32-320"],
  ["compute-vps-dallas-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-16-64-640"],
  ["compute-vps-dallas-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-new-york-usa/",[
  ["compute-vps-new-york-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-1-10-v6"],
  ["compute-vps-new-york-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-1-10"],
  ["compute-vps-new-york-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-1-15"],
  ["compute-vps-new-york-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-2-20"],
  ["compute-vps-new-york-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-2-2-40"],
  ["compute-vps-new-york-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-2-2-40-pro"],
  ["compute-vps-new-york-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-2-4-50"],
  ["compute-vps-new-york-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-3-4-60"],
  ["compute-vps-new-york-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-4-8-80"],
  ["compute-vps-new-york-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-6-16-160"],
  ["compute-vps-new-york-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-8-32-320"],
  ["compute-vps-new-york-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-miami-usa/",[
  ["compute-vps-miami-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-1-10-v6"],
  ["compute-vps-miami-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-1-10"],
  ["compute-vps-miami-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-1-15"],
  ["compute-vps-miami-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-2-20"],
  ["compute-vps-miami-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-2-2-40"],
  ["compute-vps-miami-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-2-2-40-pro"],
  ["compute-vps-miami-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-2-4-50"],
  ["compute-vps-miami-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-3-4-60"],
  ["compute-vps-miami-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-4-8-80"],
  ["compute-vps-miami-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-6-16-160"],
  ["compute-vps-miami-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-8-32-320"],
  ["compute-vps-miami-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-16-64-640"],
  ["compute-vps-miami-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-salt-lake-city-usa/",[
  ["compute-vps-salt-lake-city-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-1-10-v6"],
  ["compute-vps-salt-lake-city-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-1-10"],
  ["compute-vps-salt-lake-city-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-1-15"],
  ["compute-vps-salt-lake-city-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-2-20"],
  ["compute-vps-salt-lake-city-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-2-2-40"],
  ["compute-vps-salt-lake-city-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-2-2-40-pro"],
  ["compute-vps-salt-lake-city-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-2-4-50"],
  ["compute-vps-salt-lake-city-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-3-4-60"],
  ["compute-vps-salt-lake-city-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-4-8-80"],
  ["compute-vps-salt-lake-city-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-6-16-160"],
  ["compute-vps-salt-lake-city-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-8-32-320"],
  ["compute-vps-salt-lake-city-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-16-64-640"],
  ["compute-vps-salt-lake-city-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-portland-usa/",[
  ["compute-vps-portland-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-1-10-v6"],
  ["compute-vps-portland-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-1-10"],
  ["compute-vps-portland-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-1-15"],
  ["compute-vps-portland-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-2-20"],
  ["compute-vps-portland-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-2-2-40"],
  ["compute-vps-portland-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-2-2-40-pro"],
  ["compute-vps-portland-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-2-4-50"],
  ["compute-vps-portland-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-3-4-60"],
  ["compute-vps-portland-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-4-8-80"],
  ["compute-vps-portland-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-6-16-160"],
  ["compute-vps-portland-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-8-32-320"],
  ["compute-vps-portland-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-seattle-usa/",[
  ["compute-vps-seattle-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-1-10-v6"],
  ["compute-vps-seattle-usa-gp1-1-1-10","gp1-1-1-10","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-1-10"],
  ["compute-vps-seattle-usa-gp1-1-1-15","gp1-1-1-15","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-1-15"],
  ["compute-vps-seattle-usa-gp1-1-2-20","gp1-1-2-20","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-2-20"],
  ["compute-vps-seattle-usa-gp1-2-2-40","gp1-2-2-40","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-2-2-40"],
  ["compute-vps-seattle-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-2-2-40-pro"],
  ["compute-vps-seattle-usa-gp1-2-4-50","gp1-2-4-50","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-2-4-50"],
  ["compute-vps-seattle-usa-gp1-3-4-60","gp1-3-4-60","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-3-4-60"],
  ["compute-vps-seattle-usa-gp1-4-8-80","gp1-4-8-80","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-4-8-80"],
  ["compute-vps-seattle-usa-gp1-6-16-160","gp1-6-16-160","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-6-16-160"],
  ["compute-vps-seattle-usa-gp1-8-32-320","gp1-8-32-320","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-8-32-320"],
  ["compute-vps-seattle-usa-gp1-16-64-640","gp1-16-64-640","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-16-64-640"],
  ["compute-vps-seattle-usa-gp1-32-128-1t","gp1-32-128-1t","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-hong-kong-hong-kong/",[
  ["compute-vps-hong-kong-hong-kong-02d30c1","02d30c1","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/02d30c1"],
  ["compute-vps-hong-kong-hong-kong-03d40c2","03d40c2","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d40c2"],
  ["compute-vps-hong-kong-hong-kong-03d20c4","03d20c4","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d20c4"],
  ["compute-vps-hong-kong-hong-kong-03d80c2","03d80c2","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d80c2"],
  ["compute-vps-hong-kong-hong-kong-03d20c2","03d20c2","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d20c2"],
  ["compute-vps-hong-kong-hong-kong-04d60c3","04d60c3","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/04d60c3"],
  ["compute-vps-hong-kong-hong-kong-05d80c4","05d80c4","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/05d80c4"],
  ["compute-vps-hong-kong-hong-kong-06d160c6","06d160c6","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/06d160c6"],
  ["compute-vps-hong-kong-hong-kong-07d320c8","07d320c8","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/07d320c8"],
  ["compute-vps-hong-kong-hong-kong-08d640c12","08d640c12","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-jakarta-indonesia/",[
  ["compute-vps-jakarta-indonesia-gp1-1-1-10-v6","gp1-1-1-10-v6","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-1-10-v6"],
  ["compute-vps-jakarta-indonesia-gp1-1-1-10","gp1-1-1-10","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-1-10"],
  ["compute-vps-jakarta-indonesia-gp1-1-1-15","gp1-1-1-15","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-1-15"],
  ["compute-vps-jakarta-indonesia-gp1-1-2-20","gp1-1-2-20","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-2-20"],
  ["compute-vps-jakarta-indonesia-gp1-2-2-40","gp1-2-2-40","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-2-2-40"],
  ["compute-vps-jakarta-indonesia-gp1-2-2-40-pro","gp1-2-2-40-pro","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-2-2-40-pro"],
  ["compute-vps-jakarta-indonesia-gp1-2-4-50","gp1-2-4-50","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-2-4-50"],
  ["compute-vps-jakarta-indonesia-gp1-3-4-60","gp1-3-4-60","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-3-4-60"],
  ["compute-vps-jakarta-indonesia-gp1-4-8-80","gp1-4-8-80","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-4-8-80"],
  ["compute-vps-jakarta-indonesia-gp1-6-16-160","gp1-6-16-160","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-6-16-160"],
  ["compute-vps-jakarta-indonesia-gp1-8-32-320","gp1-8-32-320","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-8-32-320"],
  ["compute-vps-jakarta-indonesia-gp1-16-64-640","gp1-16-64-640","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-mumbai-india/",[
  ["compute-vps-mumbai-india-00d10c1v6","00d10c1v6","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/00d10c1v6"],
  ["compute-vps-mumbai-india-00d10c1-2","00d10c1-2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/00d10c1-2"],
  ["compute-vps-mumbai-india-01d20c1-2","01d20c1-2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/01d20c1-2"],
  ["compute-vps-mumbai-india-02d30c1","02d30c1","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/02d30c1"],
  ["compute-vps-mumbai-india-03d40c2","03d40c2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d40c2"],
  ["compute-vps-mumbai-india-03d20c4","03d20c4","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d20c4"],
  ["compute-vps-mumbai-india-03d80c2","03d80c2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d80c2"],
  ["compute-vps-mumbai-india-03d20c2","03d20c2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d20c2"],
  ["compute-vps-mumbai-india-04d60c3","04d60c3","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/04d60c3"],
  ["compute-vps-mumbai-india-05d80c4","05d80c4","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/05d80c4"],
  ["compute-vps-mumbai-india-06d160c6","06d160c6","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/06d160c6"],
  ["compute-vps-mumbai-india-07d320c8","07d320c8","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/07d320c8"],
  ["compute-vps-mumbai-india-08d640c12","08d640c12","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-singapore-singapore/",[
  ["compute-vps-singapore-singapore-gp1-1-2-20","gp1-1-2-20","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-1-2-20"],
  ["compute-vps-singapore-singapore-gp1-2-2-40","gp1-2-2-40","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-2-2-40"],
  ["compute-vps-singapore-singapore-gp1-2-2-40-pro","gp1-2-2-40-pro","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-2-2-40-pro"],
  ["compute-vps-singapore-singapore-gp1-2-4-50","gp1-2-4-50","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-2-4-50"],
  ["compute-vps-singapore-singapore-gp1-3-4-60","gp1-3-4-60","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-3-4-60"],
  ["compute-vps-singapore-singapore-gp1-4-8-80","gp1-4-8-80","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-4-8-80"],
  ["compute-vps-singapore-singapore-gp1-6-16-160","gp1-6-16-160","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-6-16-160"],
  ["compute-vps-singapore-singapore-gp1-8-32-320","gp1-8-32-320","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-8-32-320"],
  ["compute-vps-singapore-singapore-gp1-16-64-640","gp1-16-64-640","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-taipei-taiwan/",[
  ["compute-vps-taipei-taiwan-02d30c1","02d30c1","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/02d30c1"],
  ["compute-vps-taipei-taiwan-03d40c2","03d40c2","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d40c2"],
  ["compute-vps-taipei-taiwan-03d20c4","03d20c4","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d20c4"],
  ["compute-vps-taipei-taiwan-03d80c2","03d80c2","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d80c2"],
  ["compute-vps-taipei-taiwan-03d20c2","03d20c2","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d20c2"],
  ["compute-vps-taipei-taiwan-04d60c3","04d60c3","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/04d60c3"],
  ["compute-vps-taipei-taiwan-05d80c4","05d80c4","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/05d80c4"],
  ["compute-vps-taipei-taiwan-06d160c6","06d160c6","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/06d160c6"],
  ["compute-vps-taipei-taiwan-07d320c8","07d320c8","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/07d320c8"],
  ["compute-vps-taipei-taiwan-08d640c12","08d640c12","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-istanbul-turkiye/",[
  ["compute-vps-istanbul-turkiye-gp1-1-1-15","gp1-1-1-15","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-1-1-15"],
  ["compute-vps-istanbul-turkiye-gp1-1-2-20","gp1-1-2-20","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-1-2-20"],
  ["compute-vps-istanbul-turkiye-gp1-2-2-40","gp1-2-2-40","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-2-2-40"],
  ["compute-vps-istanbul-turkiye-gp1-2-2-40-pro","gp1-2-2-40-pro","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-2-2-40-pro"],
  ["compute-vps-istanbul-turkiye-gp1-2-4-50","gp1-2-4-50","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-2-4-50"],
  ["compute-vps-istanbul-turkiye-gp1-3-4-60","gp1-3-4-60","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-3-4-60"],
  ["compute-vps-istanbul-turkiye-gp1-4-8-80","gp1-4-8-80","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-4-8-80"],
  ["compute-vps-istanbul-turkiye-gp1-6-16-160","gp1-6-16-160","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-6-16-160"]
 ]],
 ["https://www.computeguy.com/vps-bangkok-thailand/",[
  ["compute-vps-bangkok-thailand-03d40c2","03d40c2","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d40c2"],
  ["compute-vps-bangkok-thailand-03d20c4","03d20c4","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d20c4"],
  ["compute-vps-bangkok-thailand-03d80c2","03d80c2","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d80c2"],
  ["compute-vps-bangkok-thailand-03d20c2","03d20c2","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d20c2"],
  ["compute-vps-bangkok-thailand-04d60c3","04d60c3","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/04d60c3"],
  ["compute-vps-bangkok-thailand-05d80c4","05d80c4","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/05d80c4"],
  ["compute-vps-bangkok-thailand-06d160c6","06d160c6","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/06d160c6"],
  ["compute-vps-bangkok-thailand-07d320c8","07d320c8","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/07d320c8"],
  ["compute-vps-bangkok-thailand-08d640c12","08d640c12","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-dubai-united-arab-emirates/",[
  ["compute-vps-dubai-united-arab-emirates-02d30c1","02d30c1","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/02d30c1"],
  ["compute-vps-dubai-united-arab-emirates-03d40c2","03d40c2","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d40c2"],
  ["compute-vps-dubai-united-arab-emirates-03d20c4","03d20c4","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d20c4"],
  ["compute-vps-dubai-united-arab-emirates-03d80c2","03d80c2","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d80c2"],
  ["compute-vps-dubai-united-arab-emirates-03d20c2","03d20c2","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d20c2"],
  ["compute-vps-dubai-united-arab-emirates-04d60c3","04d60c3","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/04d60c3"],
  ["compute-vps-dubai-united-arab-emirates-05d80c4","05d80c4","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/05d80c4"],
  ["compute-vps-dubai-united-arab-emirates-06d160c6","06d160c6","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/06d160c6"],
  ["compute-vps-dubai-united-arab-emirates-07d320c8","07d320c8","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/07d320c8"],
  ["compute-vps-dubai-united-arab-emirates-08d640c12","08d640c12","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-la-paz-bolivia/",[
  ["compute-vps-la-paz-bolivia-03d20c4","03d20c4","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/03d20c4"],
  ["compute-vps-la-paz-bolivia-03d80c2","03d80c2","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/03d80c2"],
  ["compute-vps-la-paz-bolivia-03d20c2","03d20c2","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/03d20c2"],
  ["compute-vps-la-paz-bolivia-04d60c3","04d60c3","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/04d60c3"],
  ["compute-vps-la-paz-bolivia-05d80c4","05d80c4","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/05d80c4"],
  ["compute-vps-la-paz-bolivia-06d160c6","06d160c6","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/06d160c6"],
  ["compute-vps-la-paz-bolivia-07d320c8","07d320c8","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/07d320c8"]
 ]],
 ["https://www.computeguy.com/vps-san-jose-costa-rica/",[
  ["compute-vps-san-jose-costa-rica-00d10c1v6","00d10c1v6","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/00d10c1v6"],
  ["compute-vps-san-jose-costa-rica-00d10c1-2","00d10c1-2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/00d10c1-2"],
  ["compute-vps-san-jose-costa-rica-01d20c1-2","01d20c1-2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/01d20c1-2"],
  ["compute-vps-san-jose-costa-rica-02d30c1","02d30c1","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/02d30c1"],
  ["compute-vps-san-jose-costa-rica-03d40c2","03d40c2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d40c2"],
  ["compute-vps-san-jose-costa-rica-03d20c4","03d20c4","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d20c4"],
  ["compute-vps-san-jose-costa-rica-03d80c2","03d80c2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d80c2"],
  ["compute-vps-san-jose-costa-rica-03d20c2","03d20c2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d20c2"],
  ["compute-vps-san-jose-costa-rica-04d60c3","04d60c3","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/04d60c3"],
  ["compute-vps-san-jose-costa-rica-05d80c4","05d80c4","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/05d80c4"],
  ["compute-vps-san-jose-costa-rica-06d160c6","06d160c6","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/06d160c6"],
  ["compute-vps-san-jose-costa-rica-07d320c8","07d320c8","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/07d320c8"],
  ["compute-vps-san-jose-costa-rica-08d640c12","08d640c12","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-sao-paulo-brazil/",[
  ["compute-vps-sao-paulo-brazil-gp1-1-1-10-v6","gp1-1-1-10-v6","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-1-10-v6"],
  ["compute-vps-sao-paulo-brazil-gp1-1-1-10","gp1-1-1-10","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-1-10"],
  ["compute-vps-sao-paulo-brazil-gp1-1-1-15","gp1-1-1-15","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-1-15"],
  ["compute-vps-sao-paulo-brazil-gp1-1-2-20","gp1-1-2-20","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-2-20"],
  ["compute-vps-sao-paulo-brazil-gp1-2-2-40","gp1-2-2-40","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-2-2-40"],
  ["compute-vps-sao-paulo-brazil-gp1-2-2-40-pro","gp1-2-2-40-pro","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-2-2-40-pro"],
  ["compute-vps-sao-paulo-brazil-gp1-2-4-50","gp1-2-4-50","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-2-4-50"],
  ["compute-vps-sao-paulo-brazil-gp1-3-4-60","gp1-3-4-60","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-3-4-60"],
  ["compute-vps-sao-paulo-brazil-gp1-4-8-80","gp1-4-8-80","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-4-8-80"],
  ["compute-vps-sao-paulo-brazil-gp1-6-16-160","gp1-6-16-160","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-6-16-160"],
  ["compute-vps-sao-paulo-brazil-gp1-8-32-320","gp1-8-32-320","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-8-32-320"],
  ["compute-vps-sao-paulo-brazil-gp1-16-64-640","gp1-16-64-640","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-quito-ecuador/",[
  ["compute-vps-quito-ecuador-00d10c1v6","00d10c1v6","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/00d10c1v6"],
  ["compute-vps-quito-ecuador-00d10c1-2","00d10c1-2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/00d10c1-2"],
  ["compute-vps-quito-ecuador-01d20c1-2","01d20c1-2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/01d20c1-2"],
  ["compute-vps-quito-ecuador-02d30c1","02d30c1","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/02d30c1"],
  ["compute-vps-quito-ecuador-03d40c2","03d40c2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d40c2"],
  ["compute-vps-quito-ecuador-03d20c4","03d20c4","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d20c4"],
  ["compute-vps-quito-ecuador-03d80c2","03d80c2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d80c2"],
  ["compute-vps-quito-ecuador-03d20c2","03d20c2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d20c2"],
  ["compute-vps-quito-ecuador-04d60c3","04d60c3","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/04d60c3"],
  ["compute-vps-quito-ecuador-05d80c4","05d80c4","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/05d80c4"],
  ["compute-vps-quito-ecuador-06d160c6","06d160c6","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/06d160c6"],
  ["compute-vps-quito-ecuador-07d320c8","07d320c8","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/07d320c8"],
  ["compute-vps-quito-ecuador-08d640c12","08d640c12","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-lagos-nigeria/",[
  ["compute-vps-lagos-nigeria-02d30c1","02d30c1","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/02d30c1"],
  ["compute-vps-lagos-nigeria-03d40c2","03d40c2","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d40c2"],
  ["compute-vps-lagos-nigeria-03d20c4","03d20c4","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d20c4"],
  ["compute-vps-lagos-nigeria-03d80c2","03d80c2","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d80c2"],
  ["compute-vps-lagos-nigeria-03d20c2","03d20c2","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d20c2"],
  ["compute-vps-lagos-nigeria-04d60c3","04d60c3","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/04d60c3"],
  ["compute-vps-lagos-nigeria-05d80c4","05d80c4","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/05d80c4"],
  ["compute-vps-lagos-nigeria-06d160c6","06d160c6","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/06d160c6"]
 ]],
 ["https://www.computeguy.com/vps-sydney-australia/",[
  ["compute-vps-sydney-australia-gp1-1-1-10-v6","gp1-1-1-10-v6","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-1-10-v6"],
  ["compute-vps-sydney-australia-gp1-1-1-10","gp1-1-1-10","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-1-10"],
  ["compute-vps-sydney-australia-gp1-1-1-15","gp1-1-1-15","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-1-15"],
  ["compute-vps-sydney-australia-gp1-1-2-20","gp1-1-2-20","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-2-20"],
  ["compute-vps-sydney-australia-gp1-2-2-40","gp1-2-2-40","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-2-2-40"],
  ["compute-vps-sydney-australia-gp1-2-2-40-pro","gp1-2-2-40-pro","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-2-2-40-pro"],
  ["compute-vps-sydney-australia-gp1-2-4-50","gp1-2-4-50","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-2-4-50"],
  ["compute-vps-sydney-australia-gp1-3-4-60","gp1-3-4-60","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-3-4-60"],
  ["compute-vps-sydney-australia-gp1-4-8-80","gp1-4-8-80","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-4-8-80"],
  ["compute-vps-sydney-australia-gp1-6-16-160","gp1-6-16-160","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-6-16-160"],
  ["compute-vps-sydney-australia-gp1-8-32-320","gp1-8-32-320","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-8-32-320"],
  ["compute-vps-sydney-australia-gp1-16-64-640","gp1-16-64-640","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-16-64-640"],
  ["compute-vps-sydney-australia-gp1-32-128-1t","gp1-32-128-1t","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-32-128-1t"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/germany-frankfurt-area",[
  ["shop-f8a7cb220b16","kvm-smart","DE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2105"],
  ["edis-germany-frankfurt-area-kvm-starter","kvm-starter","DE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2104"],
  ["edis-germany-frankfurt-area-kvm-basic","kvm-basic","DE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2103"],
  ["edis-germany-frankfurt-area-kvm-basic-plus","kvm-basic-plus","DE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2102"],
  ["edis-germany-frankfurt-area-kvm-advanced","kvm-advanced","DE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2101"],
  ["edis-germany-frankfurt-area-kvm-advanced-plus","kvm-advanced-plus","DE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2100"],
  ["edis-germany-frankfurt-area-kvm-premium","kvm-premium","DE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2099"],
  ["edis-germany-frankfurt-area-kvm-premium-plus","kvm-premium-plus","DE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2098"],
  ["edis-germany-frankfurt-area-kvm-ruby","kvm-ruby","DE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2097"],
  ["edis-germany-frankfurt-area-kvm-ruby-plus","kvm-ruby-plus","DE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2096"],
  ["edis-germany-frankfurt-area-kvm-diamond-plus","kvm-diamond-plus","DE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2094"],
  ["edis-germany-frankfurt-area-kvm-diamond","kvm-diamond","DE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2095"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/netherlands-amsterdam",[
  ["shop-bbfa3a9433c1","kvm-smart","NL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1502"],
  ["edis-netherlands-amsterdam-kvm-starter","kvm-starter","NL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1507"],
  ["edis-netherlands-amsterdam-kvm-basic","kvm-basic","NL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1512"],
  ["edis-netherlands-amsterdam-kvm-basic-plus","kvm-basic-plus","NL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1517"],
  ["edis-netherlands-amsterdam-kvm-advanced","kvm-advanced","NL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1522"],
  ["edis-netherlands-amsterdam-kvm-advanced-plus","kvm-advanced-plus","NL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1527"],
  ["edis-netherlands-amsterdam-kvm-premium","kvm-premium","NL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1532"],
  ["edis-netherlands-amsterdam-kvm-premium-plus","kvm-premium-plus","NL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1537"],
  ["edis-netherlands-amsterdam-kvm-ruby","kvm-ruby","NL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1990"],
  ["edis-netherlands-amsterdam-kvm-ruby-plus","kvm-ruby-plus","NL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1989"],
  ["edis-netherlands-amsterdam-kvm-diamond-plus","kvm-diamond-plus","NL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1987"],
  ["edis-netherlands-amsterdam-kvm-diamond","kvm-diamond","NL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1988"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/unitedkingdom-london-docklands",[
  ["shop-14b9ce5b5933","kvm-smart","GB","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1853"],
  ["edis-unitedkingdom-london-docklands-kvm-starter","kvm-starter","GB","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1854"],
  ["edis-unitedkingdom-london-docklands-kvm-basic","kvm-basic","GB","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1855"],
  ["edis-unitedkingdom-london-docklands-kvm-basic-plus","kvm-basic-plus","GB","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1856"],
  ["edis-unitedkingdom-london-docklands-kvm-advanced","kvm-advanced","GB","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1857"],
  ["edis-unitedkingdom-london-docklands-kvm-advanced-plus","kvm-advanced-plus","GB","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1858"],
  ["edis-unitedkingdom-london-docklands-kvm-premium","kvm-premium","GB","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1859"],
  ["edis-unitedkingdom-london-docklands-kvm-premium-plus","kvm-premium-plus","GB","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1860"],
  ["edis-unitedkingdom-london-docklands-kvm-ruby","kvm-ruby","GB","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1912"],
  ["edis-unitedkingdom-london-docklands-kvm-ruby-plus","kvm-ruby-plus","GB","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1911"],
  ["edis-unitedkingdom-london-docklands-kvm-diamond-plus","kvm-diamond-plus","GB","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1909"],
  ["edis-unitedkingdom-london-docklands-kvm-diamond","kvm-diamond","GB","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1910"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/france-paris",[
  ["shop-c56f00ecf464","kvm-smart","FR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1342"],
  ["edis-france-paris-kvm-starter","kvm-starter","FR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1347"],
  ["edis-france-paris-kvm-basic","kvm-basic","FR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1352"],
  ["edis-france-paris-kvm-basic-plus","kvm-basic-plus","FR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1357"],
  ["edis-france-paris-kvm-advanced","kvm-advanced","FR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1362"],
  ["edis-france-paris-kvm-advanced-plus","kvm-advanced-plus","FR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1367"],
  ["edis-france-paris-kvm-premium","kvm-premium","FR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1372"],
  ["edis-france-paris-kvm-premium-plus","kvm-premium-plus","FR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1377"],
  ["edis-france-paris-kvm-ruby","kvm-ruby","FR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1918"],
  ["edis-france-paris-kvm-ruby-plus","kvm-ruby-plus","FR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1917"],
  ["edis-france-paris-kvm-diamond-plus","kvm-diamond-plus","FR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1915"],
  ["edis-france-paris-kvm-diamond","kvm-diamond","FR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1916"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/lithuania-vilnius",[
  ["edis-lithuania-vilnius-smart","kvm-smart","LT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1702"],
  ["edis-lithuania-vilnius-kvm-starter","kvm-starter","LT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1707"],
  ["edis-lithuania-vilnius-kvm-basic","kvm-basic","LT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1712"],
  ["edis-lithuania-vilnius-kvm-basic-plus","kvm-basic-plus","LT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1717"],
  ["edis-lithuania-vilnius-kvm-advanced","kvm-advanced","LT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1722"],
  ["edis-lithuania-vilnius-kvm-advanced-plus","kvm-advanced-plus","LT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1727"],
  ["edis-lithuania-vilnius-kvm-premium","kvm-premium","LT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1732"],
  ["edis-lithuania-vilnius-kvm-premium-plus","kvm-premium-plus","LT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1737"],
  ["edis-lithuania-vilnius-kvm-ruby","kvm-ruby","LT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1964"],
  ["edis-lithuania-vilnius-kvm-ruby-plus","kvm-ruby-plus","LT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1963"],
  ["edis-lithuania-vilnius-kvm-diamond-plus","kvm-diamond-plus","LT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1961"],
  ["edis-lithuania-vilnius-kvm-diamond","kvm-diamond","LT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1962"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/austria-vienna",[
  ["edis-austria-vienna-smart","kvm-smart","AT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1622"],
  ["edis-austria-vienna-kvm-starter","kvm-starter","AT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1627"],
  ["edis-austria-vienna-kvm-basic","kvm-basic","AT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1632"],
  ["edis-austria-vienna-kvm-basic-plus","kvm-basic-plus","AT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1637"],
  ["edis-austria-vienna-kvm-advanced","kvm-advanced","AT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1642"],
  ["edis-austria-vienna-kvm-advanced-plus","kvm-advanced-plus","AT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1647"],
  ["edis-austria-vienna-kvm-premium","kvm-premium","AT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1652"],
  ["edis-austria-vienna-kvm-premium-plus","kvm-premium-plus","AT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1657"],
  ["edis-austria-vienna-kvm-ruby","kvm-ruby","AT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1812"],
  ["edis-austria-vienna-kvm-ruby-plus","kvm-ruby-plus","AT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1813"],
  ["edis-austria-vienna-kvm-diamond-plus","kvm-diamond-plus","AT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1815"],
  ["edis-austria-vienna-kvm-diamond","kvm-diamond","AT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1814"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/estonia-tallinn",[
  ["edis-estonia-tallinn-smart","kvm-smart","EE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2051"],
  ["edis-estonia-tallinn-kvm-starter","kvm-starter","EE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2050"],
  ["edis-estonia-tallinn-kvm-basic","kvm-basic","EE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2049"],
  ["edis-estonia-tallinn-kvm-basic-plus","kvm-basic-plus","EE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2048"],
  ["edis-estonia-tallinn-kvm-advanced","kvm-advanced","EE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2047"],
  ["edis-estonia-tallinn-kvm-advanced-plus","kvm-advanced-plus","EE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2046"],
  ["edis-estonia-tallinn-kvm-premium","kvm-premium","EE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2045"],
  ["edis-estonia-tallinn-kvm-premium-plus","kvm-premium-plus","EE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2044"],
  ["edis-estonia-tallinn-kvm-ruby","kvm-ruby","EE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2043"],
  ["edis-estonia-tallinn-kvm-ruby-plus","kvm-ruby-plus","EE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2042"],
  ["edis-estonia-tallinn-kvm-diamond-plus","kvm-diamond-plus","EE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2040"],
  ["edis-estonia-tallinn-kvm-diamond","kvm-diamond","EE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2041"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/latvia-riga",[
  ["edis-latvia-riga-smart","kvm-smart","LV","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1662"],
  ["edis-latvia-riga-kvm-starter","kvm-starter","LV","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1667"],
  ["edis-latvia-riga-kvm-basic","kvm-basic","LV","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1672"],
  ["edis-latvia-riga-kvm-basic-plus","kvm-basic-plus","LV","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1677"],
  ["edis-latvia-riga-kvm-advanced","kvm-advanced","LV","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1682"],
  ["edis-latvia-riga-kvm-advanced-plus","kvm-advanced-plus","LV","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1687"],
  ["edis-latvia-riga-kvm-premium","kvm-premium","LV","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1692"],
  ["edis-latvia-riga-kvm-premium-plus","kvm-premium-plus","LV","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1697"],
  ["edis-latvia-riga-kvm-ruby","kvm-ruby","LV","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1960"],
  ["edis-latvia-riga-kvm-ruby-plus","kvm-ruby-plus","LV","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1959"],
  ["edis-latvia-riga-kvm-diamond-plus","kvm-diamond-plus","LV","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1957"],
  ["edis-latvia-riga-kvm-diamond","kvm-diamond","LV","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1958"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/spain-seville",[
  ["edis-spain-seville-smart","kvm-smart","ES","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1422"],
  ["edis-spain-seville-kvm-starter","kvm-starter","ES","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1427"],
  ["edis-spain-seville-kvm-basic","kvm-basic","ES","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1432"],
  ["edis-spain-seville-kvm-basic-plus","kvm-basic-plus","ES","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1437"],
  ["edis-spain-seville-kvm-advanced","kvm-advanced","ES","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1442"],
  ["edis-spain-seville-kvm-advanced-plus","kvm-advanced-plus","ES","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1447"],
  ["edis-spain-seville-kvm-premium","kvm-premium","ES","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1452"],
  ["edis-spain-seville-kvm-premium-plus","kvm-premium-plus","ES","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1457"],
  ["edis-spain-seville-kvm-ruby","kvm-ruby","ES","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1828"],
  ["edis-spain-seville-kvm-ruby-plus","kvm-ruby-plus","ES","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1829"],
  ["edis-spain-seville-kvm-diamond-plus","kvm-diamond-plus","ES","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1831"],
  ["edis-spain-seville-kvm-diamond","kvm-diamond","ES","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1830"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/poland-warsaw",[
  ["edis-poland-warsaw-smart","kvm-smart","PL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1382"],
  ["edis-poland-warsaw-kvm-starter","kvm-starter","PL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1387"],
  ["edis-poland-warsaw-kvm-basic","kvm-basic","PL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1392"],
  ["edis-poland-warsaw-kvm-basic-plus","kvm-basic-plus","PL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1397"],
  ["edis-poland-warsaw-kvm-advanced","kvm-advanced","PL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1402"],
  ["edis-poland-warsaw-kvm-advanced-plus","kvm-advanced-plus","PL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1407"],
  ["edis-poland-warsaw-kvm-premium","kvm-premium","PL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1412"],
  ["edis-poland-warsaw-kvm-premium-plus","kvm-premium-plus","PL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1417"],
  ["edis-poland-warsaw-kvm-ruby","kvm-ruby","PL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1820"],
  ["edis-poland-warsaw-kvm-ruby-plus","kvm-ruby-plus","PL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1821"],
  ["edis-poland-warsaw-kvm-diamond-plus","kvm-diamond-plus","PL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1823"],
  ["edis-poland-warsaw-kvm-diamond","kvm-diamond","PL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1822"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/usa-new-york",[
  ["edis-usa-new-york-smart","kvm-smart","US","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=843"],
  ["edis-usa-new-york-kvm-starter","kvm-starter","US","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=848"],
  ["edis-usa-new-york-kvm-basic","kvm-basic","US","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=853"],
  ["edis-usa-new-york-kvm-basic-plus","kvm-basic-plus","US","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=858"],
  ["edis-usa-new-york-kvm-advanced","kvm-advanced","US","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=863"],
  ["edis-usa-new-york-kvm-advanced-plus","kvm-advanced-plus","US","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=868"],
  ["edis-usa-new-york-kvm-premium","kvm-premium","US","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=873"],
  ["edis-usa-new-york-kvm-premium-plus","kvm-premium-plus","US","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=878"],
  ["edis-usa-new-york-kvm-ruby","kvm-ruby","US","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1840"],
  ["edis-usa-new-york-kvm-ruby-plus","kvm-ruby-plus","US","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1841"],
  ["edis-usa-new-york-kvm-diamond-plus","kvm-diamond-plus","US","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1843"],
  ["edis-usa-new-york-kvm-diamond","kvm-diamond","US","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1842"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/bulgaria-sofia",[
  ["edis-bulgaria-sofia-smart","kvm-smart","BG","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=366"],
  ["edis-bulgaria-sofia-kvm-starter","kvm-starter","BG","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=381"],
  ["edis-bulgaria-sofia-kvm-basic","kvm-basic","BG","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=371"],
  ["edis-bulgaria-sofia-kvm-basic-plus","kvm-basic-plus","BG","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=376"],
  ["edis-bulgaria-sofia-kvm-advanced","kvm-advanced","BG","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=386"],
  ["edis-bulgaria-sofia-kvm-advanced-plus","kvm-advanced-plus","BG","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=391"],
  ["edis-bulgaria-sofia-kvm-premium","kvm-premium","BG","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=396"],
  ["edis-bulgaria-sofia-kvm-premium-plus","kvm-premium-plus","BG","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=401"],
  ["edis-bulgaria-sofia-kvm-ruby","kvm-ruby","BG","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2006"],
  ["edis-bulgaria-sofia-kvm-ruby-plus","kvm-ruby-plus","BG","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2005"],
  ["edis-bulgaria-sofia-kvm-diamond-plus","kvm-diamond-plus","BG","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2003"],
  ["edis-bulgaria-sofia-kvm-diamond","kvm-diamond","BG","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2004"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/germany-frankfurt",[
  ["edis-germany-frankfurt-kvm-smart","kvm-smart","DE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1102"],
  ["edis-germany-frankfurt-kvm-starter","kvm-starter","DE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1107"],
  ["edis-germany-frankfurt-kvm-basic","kvm-basic","DE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1112"],
  ["edis-germany-frankfurt-kvm-basic-plus","kvm-basic-plus","DE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1117"],
  ["edis-germany-frankfurt-kvm-advanced","kvm-advanced","DE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1122"],
  ["edis-germany-frankfurt-kvm-advanced-plus","kvm-advanced-plus","DE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1127"],
  ["edis-germany-frankfurt-kvm-premium","kvm-premium","DE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1132"],
  ["edis-germany-frankfurt-kvm-premium-plus","kvm-premium-plus","DE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1137"],
  ["edis-germany-frankfurt-kvm-ruby","kvm-ruby","DE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1896"],
  ["edis-germany-frankfurt-kvm-ruby-plus","kvm-ruby-plus","DE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1895"],
  ["edis-germany-frankfurt-kvm-diamond-plus","kvm-diamond-plus","DE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1893"],
  ["edis-germany-frankfurt-kvm-diamond","kvm-diamond","DE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1894"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/australia-sydney",[
  ["edis-australia-sydney-kvm-smart","kvm-smart","AU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=928"],
  ["edis-australia-sydney-kvm-starter","kvm-starter","AU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=934"],
  ["edis-australia-sydney-kvm-basic","kvm-basic","AU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=940"],
  ["edis-australia-sydney-kvm-basic-plus","kvm-basic-plus","AU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=946"],
  ["edis-australia-sydney-kvm-advanced","kvm-advanced","AU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=952"],
  ["edis-australia-sydney-kvm-advanced-plus","kvm-advanced-plus","AU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=958"],
  ["edis-australia-sydney-kvm-premium","kvm-premium","AU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=964"],
  ["edis-australia-sydney-kvm-premium-plus","kvm-premium-plus","AU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=970"],
  ["edis-australia-sydney-kvm-ruby","kvm-ruby","AU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2027"],
  ["edis-australia-sydney-kvm-ruby-plus","kvm-ruby-plus","AU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2026"],
  ["edis-australia-sydney-kvm-diamond-plus","kvm-diamond-plus","AU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2024"],
  ["edis-australia-sydney-kvm-diamond","kvm-diamond","AU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2025"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/switzerland-zurich",[
  ["edis-switzerland-zurich-kvm-smart","kvm-smart","CH","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2067"],
  ["edis-switzerland-zurich-kvm-starter","kvm-starter","CH","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2066"],
  ["edis-switzerland-zurich-kvm-basic","kvm-basic","CH","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2065"],
  ["edis-switzerland-zurich-kvm-basic-plus","kvm-basic-plus","CH","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2064"],
  ["edis-switzerland-zurich-kvm-advanced","kvm-advanced","CH","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2063"],
  ["edis-switzerland-zurich-kvm-advanced-plus","kvm-advanced-plus","CH","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2062"],
  ["edis-switzerland-zurich-kvm-premium","kvm-premium","CH","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2061"],
  ["edis-switzerland-zurich-kvm-premium-plus","kvm-premium-plus","CH","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2060"],
  ["edis-switzerland-zurich-kvm-ruby","kvm-ruby","CH","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2059"],
  ["edis-switzerland-zurich-kvm-ruby-plus","kvm-ruby-plus","CH","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2058"],
  ["edis-switzerland-zurich-kvm-diamond-plus","kvm-diamond-plus","CH","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2056 "],
  ["edis-switzerland-zurich-kvm-diamond","kvm-diamond","CH","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2057"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/austria-graz",[
  ["edis-austria-graz-kvm-smart","kvm-smart","AT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1062"],
  ["edis-austria-graz-kvm-starter","kvm-starter","AT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1067"],
  ["edis-austria-graz-kvm-basic","kvm-basic","AT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1072"],
  ["edis-austria-graz-kvm-basic-plus","kvm-basic-plus","AT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1077"],
  ["edis-austria-graz-kvm-advanced","kvm-advanced","AT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1082"],
  ["edis-austria-graz-kvm-advanced-plus","kvm-advanced-plus","AT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1087"],
  ["edis-austria-graz-kvm-premium","kvm-premium","AT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1092"],
  ["edis-austria-graz-kvm-premium-plus","kvm-premium-plus","AT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1097"],
  ["edis-austria-graz-kvm-ruby","kvm-ruby","AT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1808"],
  ["edis-austria-graz-kvm-ruby-plus","kvm-ruby-plus","AT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1809"],
  ["edis-austria-graz-kvm-diamond-plus","kvm-diamond-plus","AT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1811"],
  ["edis-austria-graz-kvm-diamond","kvm-diamond","AT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1810"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/austria-vienna-interxion",[
  ["edis-austria-vienna-interxion-kvm-smart","kvm-smart","AT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1873"],
  ["edis-austria-vienna-interxion-kvm-starter","kvm-starter","AT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1884"],
  ["edis-austria-vienna-interxion-kvm-basic","kvm-basic","AT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1883"],
  ["edis-austria-vienna-interxion-kvm-basic-plus","kvm-basic-plus","AT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1882"],
  ["edis-austria-vienna-interxion-kvm-advanced","kvm-advanced","AT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1881"],
  ["edis-austria-vienna-interxion-kvm-advanced-plus","kvm-advanced-plus","AT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1880"],
  ["edis-austria-vienna-interxion-kvm-premium","kvm-premium","AT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1879"],
  ["edis-austria-vienna-interxion-kvm-premium-plus","kvm-premium-plus","AT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1878"],
  ["edis-austria-vienna-interxion-kvm-ruby","kvm-ruby","AT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1877"],
  ["edis-austria-vienna-interxion-kvm-ruby-plus","kvm-ruby-plus","AT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1876"],
  ["edis-austria-vienna-interxion-kvm-diamond-plus","kvm-diamond-plus","AT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1874"],
  ["edis-austria-vienna-interxion-kvm-diamond","kvm-diamond","AT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1875"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/canada-montreal",[
  ["edis-canada-montreal-kvm-smart","kvm-smart","CA","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=497"],
  ["edis-canada-montreal-kvm-starter","kvm-starter","CA","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=502"],
  ["edis-canada-montreal-kvm-basic","kvm-basic","CA","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=507"],
  ["edis-canada-montreal-kvm-basic-plus","kvm-basic-plus","CA","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=512"],
  ["edis-canada-montreal-kvm-advanced","kvm-advanced","CA","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=517"],
  ["edis-canada-montreal-kvm-advanced-plus","kvm-advanced-plus","CA","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=522"],
  ["edis-canada-montreal-kvm-premium","kvm-premium","CA","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=527"],
  ["edis-canada-montreal-kvm-premium-plus","kvm-premium-plus","CA","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=532"],
  ["edis-canada-montreal-kvm-ruby","kvm-ruby","CA","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1888"],
  ["edis-canada-montreal-kvm-ruby-plus","kvm-ruby-plus","CA","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1887"],
  ["edis-canada-montreal-kvm-diamond-plus","kvm-diamond-plus","CA","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1885"],
  ["edis-canada-montreal-kvm-diamond","kvm-diamond","CA","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1886"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/belgium-brussels",[
  ["edis-belgium-brussels-kvm-smart","kvm-smart","BE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=977"],
  ["edis-belgium-brussels-kvm-starter","kvm-starter","BE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=987"],
  ["edis-belgium-brussels-kvm-basic","kvm-basic","BE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=992"],
  ["edis-belgium-brussels-kvm-basic-plus","kvm-basic-plus","BE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1037"],
  ["edis-belgium-brussels-kvm-advanced","kvm-advanced","BE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1042"],
  ["edis-belgium-brussels-kvm-advanced-plus","kvm-advanced-plus","BE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1047"],
  ["edis-belgium-brussels-kvm-premium","kvm-premium","BE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1052"],
  ["edis-belgium-brussels-kvm-premium-plus","kvm-premium-plus","BE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1057"],
  ["edis-belgium-brussels-kvm-ruby","kvm-ruby","BE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1816"],
  ["edis-belgium-brussels-kvm-ruby-plus","kvm-ruby-plus","BE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1817"],
  ["edis-belgium-brussels-kvm-diamond-plus","kvm-diamond-plus","BE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1819"],
  ["edis-belgium-brussels-kvm-diamond","kvm-diamond","BE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1818"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/chile-vina-del-mar",[
  ["edis-chile-vina-del-mar-kvm-smart","kvm-smart","CL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=662"],
  ["edis-chile-vina-del-mar-kvm-starter","kvm-starter","CL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=667"],
  ["edis-chile-vina-del-mar-kvm-basic","kvm-basic","CL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=672"],
  ["edis-chile-vina-del-mar-kvm-basic-plus","kvm-basic-plus","CL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=677"],
  ["edis-chile-vina-del-mar-kvm-advanced","kvm-advanced","CL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=682"],
  ["edis-chile-vina-del-mar-kvm-advanced-plus","kvm-advanced-plus","CL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=687"],
  ["edis-chile-vina-del-mar-kvm-premium","kvm-premium","CL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=692"],
  ["edis-chile-vina-del-mar-kvm-premium-plus","kvm-premium-plus","CL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=697"],
  ["edis-chile-vina-del-mar-kvm-ruby","kvm-ruby","CL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2035"],
  ["edis-chile-vina-del-mar-kvm-ruby-plus","kvm-ruby-plus","CL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2034"],
  ["edis-chile-vina-del-mar-kvm-diamond-plus","kvm-diamond-plus","CL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2032"],
  ["edis-chile-vina-del-mar-kvm-diamond","kvm-diamond","CL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2033"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/colombia-bogota",[
  ["edis-colombia-bogota-kvm-smart","kvm-smart","CO","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1956"],
  ["edis-colombia-bogota-kvm-starter","kvm-starter","CO","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1955"],
  ["edis-colombia-bogota-kvm-basic","kvm-basic","CO","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1954"],
  ["edis-colombia-bogota-kvm-basic-plus","kvm-basic-plus","CO","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1953"],
  ["edis-colombia-bogota-kvm-advanced","kvm-advanced","CO","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1952"],
  ["edis-colombia-bogota-kvm-advanced-plus","kvm-advanced-plus","CO","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1951"],
  ["edis-colombia-bogota-kvm-premium","kvm-premium","CO","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1950"],
  ["edis-colombia-bogota-kvm-premium-plus","kvm-premium-plus","CO","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1949"],
  ["edis-colombia-bogota-kvm-ruby","kvm-ruby","CO","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2039"],
  ["edis-colombia-bogota-kvm-ruby-plus","kvm-ruby-plus","CO","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2038"],
  ["edis-colombia-bogota-kvm-diamond-plus","kvm-diamond-plus","CO","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2036"],
  ["edis-colombia-bogota-kvm-diamond","kvm-diamond","CO","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2037"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/croatia-zagreb",[
  ["edis-croatia-zagreb-kvm-smart","kvm-smart","HR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1742"],
  ["edis-croatia-zagreb-kvm-starter","kvm-starter","HR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1743"],
  ["edis-croatia-zagreb-kvm-basic","kvm-basic","HR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1744"],
  ["edis-croatia-zagreb-kvm-basic-plus","kvm-basic-plus","HR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1745"],
  ["edis-croatia-zagreb-kvm-advanced","kvm-advanced","HR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1746"],
  ["edis-croatia-zagreb-kvm-advanced-plus","kvm-advanced-plus","HR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1747"],
  ["edis-croatia-zagreb-kvm-premium","kvm-premium","HR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1748"],
  ["edis-croatia-zagreb-kvm-premium-plus","kvm-premium-plus","HR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1749"],
  ["edis-croatia-zagreb-kvm-ruby","kvm-ruby","HR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2011"],
  ["edis-croatia-zagreb-kvm-ruby-plus","kvm-ruby-plus","HR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2010"],
  ["edis-croatia-zagreb-kvm-diamond-plus","kvm-diamond-plus","HR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2007"],
  ["edis-croatia-zagreb-kvm-diamond","kvm-diamond","HR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2009"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/cyprus-limassol",[
  ["edis-cyprus-limassol-kvm-smart","kvm-smart","CY","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2002"],
  ["edis-cyprus-limassol-kvm-starter","kvm-starter","CY","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2001"],
  ["edis-cyprus-limassol-kvm-basic","kvm-basic","CY","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2000"],
  ["edis-cyprus-limassol-kvm-basic-plus","kvm-basic-plus","CY","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1999"],
  ["edis-cyprus-limassol-kvm-advanced","kvm-advanced","CY","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1998"],
  ["edis-cyprus-limassol-kvm-advanced-plus","kvm-advanced-plus","CY","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1997"],
  ["edis-cyprus-limassol-kvm-premium","kvm-premium","CY","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1996"],
  ["edis-cyprus-limassol-kvm-premium-plus","kvm-premium-plus","CY","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1995"],
  ["edis-cyprus-limassol-kvm-ruby","kvm-ruby","CY","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1994"],
  ["edis-cyprus-limassol-kvm-ruby-plus","kvm-ruby-plus","CY","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1993"],
  ["edis-cyprus-limassol-kvm-diamond-plus","kvm-diamond-plus","CY","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1991"],
  ["edis-cyprus-limassol-kvm-diamond","kvm-diamond","CY","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1992"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/czech-republic-prague",[
  ["edis-czech-republic-prague-kvm-smart","kvm-smart","CZ","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=758"],
  ["edis-czech-republic-prague-kvm-starter","kvm-starter","CZ","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=763"],
  ["edis-czech-republic-prague-kvm-basic","kvm-basic","CZ","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=768"],
  ["edis-czech-republic-prague-kvm-basic-plus","kvm-basic-plus","CZ","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=773"],
  ["edis-czech-republic-prague-kvm-advanced","kvm-advanced","CZ","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=778"],
  ["edis-czech-republic-prague-kvm-advanced-plus","kvm-advanced-plus","CZ","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=783"],
  ["edis-czech-republic-prague-kvm-premium","kvm-premium","CZ","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=788"],
  ["edis-czech-republic-prague-kvm-premium-plus","kvm-premium-plus","CZ","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=793"],
  ["edis-czech-republic-prague-kvm-ruby","kvm-ruby","CZ","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1836"],
  ["edis-czech-republic-prague-kvm-ruby-plus","kvm-ruby-plus","CZ","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1837"],
  ["edis-czech-republic-prague-kvm-diamond-plus","kvm-diamond-plus","CZ","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1839"],
  ["edis-czech-republic-prague-kvm-diamond","kvm-diamond","CZ","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1838"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/denmark-copenhagen",[
  ["edis-denmark-copenhagen-kvm-smart","kvm-smart","DK","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=997"],
  ["edis-denmark-copenhagen-kvm-starter","kvm-starter","DK","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1002"],
  ["edis-denmark-copenhagen-kvm-basic","kvm-basic","DK","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1007"],
  ["edis-denmark-copenhagen-kvm-basic-plus","kvm-basic-plus","DK","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1012"],
  ["edis-denmark-copenhagen-kvm-advanced","kvm-advanced","DK","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1017"],
  ["edis-denmark-copenhagen-kvm-advanced-plus","kvm-advanced-plus","DK","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1022"],
  ["edis-denmark-copenhagen-kvm-premium","kvm-premium","DK","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1027"],
  ["edis-denmark-copenhagen-kvm-premium-plus","kvm-premium-plus","DK","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1032"],
  ["edis-denmark-copenhagen-kvm-ruby","kvm-ruby","DK","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1892"],
  ["edis-denmark-copenhagen-kvm-ruby-plus","kvm-ruby-plus","DK","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1891"],
  ["edis-denmark-copenhagen-kvm-diamond-plus","kvm-diamond-plus","DK","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1889"],
  ["edis-denmark-copenhagen-kvm-diamond","kvm-diamond","DK","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1890"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/finland-helsinki",[
  ["edis-finland-helsinki-kvm-smart","kvm-smart","FI","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2081"],
  ["edis-finland-helsinki-kvm-starter","kvm-starter","FI","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2080"],
  ["edis-finland-helsinki-kvm-basic","kvm-basic","FI","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2079"],
  ["edis-finland-helsinki-kvm-basic-plus","kvm-basic-plus","FI","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2078"],
  ["edis-finland-helsinki-kvm-advanced","kvm-advanced","FI","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2077"],
  ["edis-finland-helsinki-kvm-advanced-plus","kvm-advanced-plus","FI","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2076"],
  ["edis-finland-helsinki-kvm-premium","kvm-premium","FI","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2075"],
  ["edis-finland-helsinki-kvm-premium-plus","kvm-premium-plus","FI","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2074"],
  ["edis-finland-helsinki-kvm-ruby","kvm-ruby","FI","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2073"],
  ["edis-finland-helsinki-kvm-ruby-plus","kvm-ruby-plus","FI","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2072"],
  ["edis-finland-helsinki-kvm-diamond-plus","kvm-diamond-plus","FI","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2070"],
  ["edis-finland-helsinki-kvm-diamond","kvm-diamond","FI","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2071"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/france-marseille",[
  ["edis-france-marseille-kvm-smart","kvm-smart","FR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2119"],
  ["edis-france-marseille-kvm-starter","kvm-starter","FR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2118"],
  ["edis-france-marseille-kvm-basic","kvm-basic","FR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2117"],
  ["edis-france-marseille-kvm-basic-plus","kvm-basic-plus","FR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2115"],
  ["edis-france-marseille-kvm-advanced","kvm-advanced","FR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2116"],
  ["edis-france-marseille-kvm-advanced-plus","kvm-advanced-plus","FR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2114"],
  ["edis-france-marseille-kvm-premium","kvm-premium","FR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2113"],
  ["edis-france-marseille-kvm-premium-plus","kvm-premium-plus","FR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2112"],
  ["edis-france-marseille-kvm-ruby","kvm-ruby","FR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2111"],
  ["edis-france-marseille-kvm-ruby-plus","kvm-ruby-plus","FR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2110"],
  ["edis-france-marseille-kvm-diamond-plus","kvm-diamond-plus","FR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2108"],
  ["edis-france-marseille-kvm-diamond","kvm-diamond","FR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2109"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/hongkong-kwai-chung",[
  ["edis-hongkong-kwai-chung-kvm-smart","kvm-smart","HK","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=106"],
  ["edis-hongkong-kwai-chung-kvm-starter","kvm-starter","HK","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=99"],
  ["edis-hongkong-kwai-chung-kvm-basic","kvm-basic","HK","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=100"],
  ["edis-hongkong-kwai-chung-kvm-basic-plus","kvm-basic-plus","HK","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=101"],
  ["edis-hongkong-kwai-chung-kvm-advanced","kvm-advanced","HK","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=102"],
  ["edis-hongkong-kwai-chung-kvm-advanced-plus","kvm-advanced-plus","HK","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=103"],
  ["edis-hongkong-kwai-chung-kvm-premium","kvm-premium","HK","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=104"],
  ["edis-hongkong-kwai-chung-kvm-premium-plus","kvm-premium-plus","HK","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=105"],
  ["edis-hongkong-kwai-chung-kvm-ruby","kvm-ruby","HK","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1946"],
  ["edis-hongkong-kwai-chung-kvm-ruby-plus","kvm-ruby-plus","HK","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1945"],
  ["edis-hongkong-kwai-chung-kvm-diamond-plus","kvm-diamond-plus","HK","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1943"],
  ["edis-hongkong-kwai-chung-kvm-diamond","kvm-diamond","HK","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1944"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/greece-thessaloniki",[
  ["edis-greece-thessaloniki-kvm-smart","kvm-smart","GR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=880"],
  ["edis-greece-thessaloniki-kvm-starter","kvm-starter","GR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=886"],
  ["edis-greece-thessaloniki-kvm-basic","kvm-basic","GR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=892"],
  ["edis-greece-thessaloniki-kvm-basic-plus","kvm-basic-plus","GR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=898"],
  ["edis-greece-thessaloniki-kvm-advanced","kvm-advanced","GR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=904"],
  ["edis-greece-thessaloniki-kvm-advanced-plus","kvm-advanced-plus","GR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=910"],
  ["edis-greece-thessaloniki-kvm-premium","kvm-premium","GR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=916"],
  ["edis-greece-thessaloniki-kvm-premium-plus","kvm-premium-plus","GR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=922"],
  ["edis-greece-thessaloniki-kvm-ruby","kvm-ruby","GR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2015"],
  ["edis-greece-thessaloniki-kvm-ruby-plus","kvm-ruby-plus","GR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2014"],
  ["edis-greece-thessaloniki-kvm-diamond-plus","kvm-diamond-plus","GR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2012"],
  ["edis-greece-thessaloniki-kvm-diamond","kvm-diamond","GR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2013"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/hungary-budapest",[
  ["edis-hungary-budapest-kvm-smart","kvm-smart","HU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=306"],
  ["edis-hungary-budapest-kvm-starter","kvm-starter","HU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=326"],
  ["edis-hungary-budapest-kvm-basic","kvm-basic","HU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=331"],
  ["edis-hungary-budapest-kvm-basic-plus","kvm-basic-plus","HU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=336"],
  ["edis-hungary-budapest-kvm-advanced","kvm-advanced","HU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=341"],
  ["edis-hungary-budapest-kvm-advanced-plus","kvm-advanced-plus","HU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=346"],
  ["edis-hungary-budapest-kvm-premium","kvm-premium","HU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=351"],
  ["edis-hungary-budapest-kvm-premium-plus","kvm-premium-plus","HU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=356"],
  ["edis-hungary-budapest-kvm-ruby","kvm-ruby","HU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1926"],
  ["edis-hungary-budapest-kvm-ruby-plus","kvm-ruby-plus","HU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1925"],
  ["edis-hungary-budapest-kvm-diamond-plus","kvm-diamond-plus","HU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1923"],
  ["edis-hungary-budapest-kvm-diamond","kvm-diamond","HU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1924"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/iceland-hafnarfjordur",[
  ["edis-iceland-hafnarfjordur-kvm-smart","kvm-smart","IS","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=108"],
  ["edis-iceland-hafnarfjordur-kvm-starter","kvm-starter","IS","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=109"],
  ["edis-iceland-hafnarfjordur-kvm-basic","kvm-basic","IS","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=110"],
  ["edis-iceland-hafnarfjordur-kvm-basic-plus","kvm-basic-plus","IS","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=111"],
  ["edis-iceland-hafnarfjordur-kvm-advanced","kvm-advanced","IS","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=112"],
  ["edis-iceland-hafnarfjordur-kvm-advanced-plus","kvm-advanced-plus","IS","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=113"],
  ["edis-iceland-hafnarfjordur-kvm-premium","kvm-premium","IS","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=114"],
  ["edis-iceland-hafnarfjordur-kvm-premium-plus","kvm-premium-plus","IS","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=115"],
  ["edis-iceland-hafnarfjordur-kvm-ruby","kvm-ruby","IS","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1972"],
  ["edis-iceland-hafnarfjordur-kvm-ruby-plus","kvm-ruby-plus","IS","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1971"],
  ["edis-iceland-hafnarfjordur-kvm-diamond-plus","kvm-diamond-plus","IS","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1969"],
  ["edis-iceland-hafnarfjordur-kvm-diamond","kvm-diamond","IS","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1970"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/israel-tel-aviv",[
  ["edis-israel-tel-aviv-kvm-smart","kvm-smart","IL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=622"],
  ["edis-israel-tel-aviv-kvm-starter","kvm-starter","IL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=627"],
  ["edis-israel-tel-aviv-kvm-basic","kvm-basic","IL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=632"],
  ["edis-israel-tel-aviv-kvm-basic-plus","kvm-basic-plus","IL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=637"],
  ["edis-israel-tel-aviv-kvm-advanced","kvm-advanced","IL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=642"],
  ["edis-israel-tel-aviv-kvm-advanced-plus","kvm-advanced-plus","IL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=647"],
  ["edis-israel-tel-aviv-kvm-premium","kvm-premium","IL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=652"],
  ["edis-israel-tel-aviv-kvm-premium-plus","kvm-premium-plus","IL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=657"],
  ["edis-israel-tel-aviv-kvm-ruby","kvm-ruby","IL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1968"],
  ["edis-israel-tel-aviv-kvm-ruby-plus","kvm-ruby-plus","IL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1967"],
  ["edis-israel-tel-aviv-kvm-diamond-plus","kvm-diamond-plus","IL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1965"],
  ["edis-israel-tel-aviv-kvm-diamond","kvm-diamond","IL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1966"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/italy-milan",[
  ["edis-italy-milan-kvm-smart","kvm-smart","IT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1462"],
  ["edis-italy-milan-kvm-starter","kvm-starter","IT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1467"],
  ["edis-italy-milan-kvm-basic","kvm-basic","IT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1472"],
  ["edis-italy-milan-kvm-basic-plus","kvm-basic-plus","IT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1477"],
  ["edis-italy-milan-kvm-advanced","kvm-advanced","IT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1482"],
  ["edis-italy-milan-kvm-advanced-plus","kvm-advanced-plus","IT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1487"],
  ["edis-italy-milan-kvm-premium","kvm-premium","IT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1492"],
  ["edis-italy-milan-kvm-premium-plus","kvm-premium-plus","IT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1497"],
  ["edis-italy-milan-kvm-ruby","kvm-ruby","IT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1900"],
  ["edis-italy-milan-kvm-ruby-plus","kvm-ruby-plus","IT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1899"],
  ["edis-italy-milan-kvm-diamond-plus","kvm-diamond-plus","IT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1897"],
  ["edis-italy-milan-kvm-diamond","kvm-diamond","IT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1898"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/italy-palermo",[
  ["edis-italy-palermo-kvm-smart","kvm-smart","IT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=437"],
  ["edis-italy-palermo-kvm-starter","kvm-starter","IT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=442"],
  ["edis-italy-palermo-kvm-basic","kvm-basic","IT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=447"],
  ["edis-italy-palermo-kvm-basic-plus","kvm-basic-plus","IT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=452"],
  ["edis-italy-palermo-kvm-advanced","kvm-advanced","IT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=457"],
  ["edis-italy-palermo-kvm-advanced-plus","kvm-advanced-plus","IT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=462"],
  ["edis-italy-palermo-kvm-premium","kvm-premium","IT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=467"],
  ["edis-italy-palermo-kvm-premium-plus","kvm-premium-plus","IT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=472"],
  ["edis-italy-palermo-kvm-ruby","kvm-ruby","IT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2019"],
  ["edis-italy-palermo-kvm-ruby-plus","kvm-ruby-plus","IT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2018"],
  ["edis-italy-palermo-kvm-diamond-plus","kvm-diamond-plus","IT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2016"],
  ["edis-italy-palermo-kvm-diamond","kvm-diamond","IT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2017"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/japan-tokyo",[
  ["edis-japan-tokyo-kvm-smart","kvm-smart","JP","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=537"],
  ["edis-japan-tokyo-kvm-starter","kvm-starter","JP","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=542"],
  ["edis-japan-tokyo-kvm-basic","kvm-basic","JP","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=547"],
  ["edis-japan-tokyo-kvm-basic-plus","kvm-basic-plus","JP","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=552"],
  ["edis-japan-tokyo-kvm-advanced","kvm-advanced","JP","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=557"],
  ["edis-japan-tokyo-kvm-advanced-plus","kvm-advanced-plus","JP","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=562"],
  ["edis-japan-tokyo-kvm-premium","kvm-premium","JP","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=567"],
  ["edis-japan-tokyo-kvm-premium-plus","kvm-premium-plus","JP","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=572"],
  ["edis-japan-tokyo-kvm-ruby","kvm-ruby","JP","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1938"],
  ["edis-japan-tokyo-kvm-ruby-plus","kvm-ruby-plus","JP","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1937"],
  ["edis-japan-tokyo-kvm-diamond-plus","kvm-diamond-plus","JP","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1935"],
  ["edis-japan-tokyo-kvm-diamond","kvm-diamond","JP","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1936"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/moldova-chisinau",[
  ["edis-moldova-chisinau-kvm-smart","kvm-smart","MD","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=713"],
  ["edis-moldova-chisinau-kvm-starter","kvm-starter","MD","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=718"],
  ["edis-moldova-chisinau-kvm-basic","kvm-basic","MD","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=723"],
  ["edis-moldova-chisinau-kvm-basic-plus","kvm-basic-plus","MD","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=728"],
  ["edis-moldova-chisinau-kvm-advanced","kvm-advanced","MD","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=733"],
  ["edis-moldova-chisinau-kvm-advanced-plus","kvm-advanced-plus","MD","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=738"],
  ["edis-moldova-chisinau-kvm-premium","kvm-premium","MD","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=743"],
  ["edis-moldova-chisinau-kvm-premium-plus","kvm-premium-plus","MD","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=748"],
  ["edis-moldova-chisinau-kvm-ruby","kvm-ruby","MD","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2023"],
  ["edis-moldova-chisinau-kvm-ruby-plus","kvm-ruby-plus","MD","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2022"],
  ["edis-moldova-chisinau-kvm-diamond-plus","kvm-diamond-plus","MD","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2020"],
  ["edis-moldova-chisinau-kvm-diamond","kvm-diamond","MD","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2021"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/north-macedonia-skopje",[
  ["edis-north-macedonia-skopje-kvm-smart","kvm-smart","MK","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1750"],
  ["edis-north-macedonia-skopje-kvm-starter","kvm-starter","MK","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1751"],
  ["edis-north-macedonia-skopje-kvm-basic","kvm-basic","MK","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1752"],
  ["edis-north-macedonia-skopje-kvm-basic-plus","kvm-basic-plus","MK","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1753"],
  ["edis-north-macedonia-skopje-kvm-advanced","kvm-advanced","MK","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1754"],
  ["edis-north-macedonia-skopje-kvm-advanced-plus","kvm-advanced-plus","MK","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1755"],
  ["edis-north-macedonia-skopje-kvm-premium","kvm-premium","MK","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1756"],
  ["edis-north-macedonia-skopje-kvm-premium-plus","kvm-premium-plus","MK","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1757"],
  ["edis-north-macedonia-skopje-kvm-ruby","kvm-ruby","MK","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2055"],
  ["edis-north-macedonia-skopje-kvm-ruby-plus","kvm-ruby-plus","MK","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2054"],
  ["edis-north-macedonia-skopje-kvm-diamond-plus","kvm-diamond-plus","MK","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2052"],
  ["edis-north-macedonia-skopje-kvm-diamond","kvm-diamond","MK","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2053"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/norway-oslo",[
  ["edis-norway-oslo-kvm-smart","kvm-smart","NO","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1197"],
  ["edis-norway-oslo-kvm-starter","kvm-starter","NO","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1202"],
  ["edis-norway-oslo-kvm-basic","kvm-basic","NO","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1207"],
  ["edis-norway-oslo-kvm-basic-plus","kvm-basic-plus","NO","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1212"],
  ["edis-norway-oslo-kvm-advanced","kvm-advanced","NO","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1217"],
  ["edis-norway-oslo-kvm-advanced-plus","kvm-advanced-plus","NO","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1222"],
  ["edis-norway-oslo-kvm-premium","kvm-premium","NO","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1227"],
  ["edis-norway-oslo-kvm-premium-plus","kvm-premium-plus","NO","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1232"],
  ["edis-norway-oslo-kvm-ruby","kvm-ruby","NO","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1904"],
  ["edis-norway-oslo-kvm-ruby-plus","kvm-ruby-plus","NO","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1903"],
  ["edis-norway-oslo-kvm-diamond-plus","kvm-diamond-plus","NO","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1901"],
  ["edis-norway-oslo-kvm-diamond","kvm-diamond","NO","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1902"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/romania-bucharest",[
  ["edis-romania-bucharest-kvm-smart","kvm-smart","RO","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1542"],
  ["edis-romania-bucharest-kvm-starter","kvm-starter","RO","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1547"],
  ["edis-romania-bucharest-kvm-basic","kvm-basic","RO","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1552"],
  ["edis-romania-bucharest-kvm-basic-plus","kvm-basic-plus","RO","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1557"],
  ["edis-romania-bucharest-kvm-advanced","kvm-advanced","RO","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1562"],
  ["edis-romania-bucharest-kvm-advanced-plus","kvm-advanced-plus","RO","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1567"],
  ["edis-romania-bucharest-kvm-premium","kvm-premium","RO","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1572"],
  ["edis-romania-bucharest-kvm-premium-plus","kvm-premium-plus","RO","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1577"],
  ["edis-romania-bucharest-kvm-ruby","kvm-ruby","RO","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1908"],
  ["edis-romania-bucharest-kvm-ruby-plus","kvm-ruby-plus","RO","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1907"],
  ["edis-romania-bucharest-kvm-diamond-plus","kvm-diamond-plus","RO","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1905"],
  ["edis-romania-bucharest-kvm-diamond","kvm-diamond","RO","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1906"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/russia-moscow",[
  ["edis-russia-moscow-kvm-smart","kvm-smart","RU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1582"],
  ["edis-russia-moscow-kvm-starter","kvm-starter","RU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1587"],
  ["edis-russia-moscow-kvm-basic","kvm-basic","RU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1592"],
  ["edis-russia-moscow-kvm-basic-plus","kvm-basic-plus","RU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1597"],
  ["edis-russia-moscow-kvm-advanced","kvm-advanced","RU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1602"],
  ["edis-russia-moscow-kvm-advanced-plus","kvm-advanced-plus","RU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1607"],
  ["edis-russia-moscow-kvm-premium","kvm-premium","RU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1612"],
  ["edis-russia-moscow-kvm-premium-plus","kvm-premium-plus","RU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1617"],
  ["edis-russia-moscow-kvm-ruby","kvm-ruby","RU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1824"],
  ["edis-russia-moscow-kvm-ruby-plus","kvm-ruby-plus","RU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1825"],
  ["edis-russia-moscow-kvm-diamond-plus","kvm-diamond-plus","RU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1827"],
  ["edis-russia-moscow-kvm-diamond","kvm-diamond","RU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1826"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/russia-st-petersburg",[
  ["edis-russia-st-petersburg-kvm-smart","kvm-smart","RU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=201"],
  ["edis-russia-st-petersburg-kvm-starter","kvm-starter","RU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=211"],
  ["edis-russia-st-petersburg-kvm-basic","kvm-basic","RU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=216"],
  ["edis-russia-st-petersburg-kvm-basic-plus","kvm-basic-plus","RU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=221"],
  ["edis-russia-st-petersburg-kvm-advanced","kvm-advanced","RU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=226"],
  ["edis-russia-st-petersburg-kvm-advanced-plus","kvm-advanced-plus","RU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=231"],
  ["edis-russia-st-petersburg-kvm-premium","kvm-premium","RU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=236"],
  ["edis-russia-st-petersburg-kvm-premium-plus","kvm-premium-plus","RU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=241"],
  ["edis-russia-st-petersburg-kvm-ruby","kvm-ruby","RU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1848"],
  ["edis-russia-st-petersburg-kvm-ruby-plus","kvm-ruby-plus","RU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1849"],
  ["edis-russia-st-petersburg-kvm-diamond-plus","kvm-diamond-plus","RU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1852"],
  ["edis-russia-st-petersburg-kvm-diamond","kvm-diamond","RU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1851"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/serbia-belgrade",[
  ["edis-serbia-belgrade-kvm-smart","kvm-smart","RS","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=803"],
  ["edis-serbia-belgrade-kvm-starter","kvm-starter","RS","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=808"],
  ["edis-serbia-belgrade-kvm-basic","kvm-basic","RS","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=813"],
  ["edis-serbia-belgrade-kvm-basic-plus","kvm-basic-plus","RS","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=818"],
  ["edis-serbia-belgrade-kvm-advanced","kvm-advanced","RS","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=823"],
  ["edis-serbia-belgrade-kvm-advanced-plus","kvm-advanced-plus","RS","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=828"],
  ["edis-serbia-belgrade-kvm-premium","kvm-premium","RS","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=833"],
  ["edis-serbia-belgrade-kvm-premium-plus","kvm-premium-plus","RS","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=838"],
  ["edis-serbia-belgrade-kvm-ruby","kvm-ruby","RS","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1832"],
  ["edis-serbia-belgrade-kvm-ruby-plus","kvm-ruby-plus","RS","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1833"],
  ["edis-serbia-belgrade-kvm-diamond-plus","kvm-diamond-plus","RS","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1835"],
  ["edis-serbia-belgrade-kvm-diamond","kvm-diamond","RS","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1834"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/singapore-singapore",[
  ["edis-singapore-singapore-kvm-smart","kvm-smart","SG","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=577"],
  ["edis-singapore-singapore-kvm-starter","kvm-starter","SG","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=582"],
  ["edis-singapore-singapore-kvm-basic","kvm-basic","SG","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=587"],
  ["edis-singapore-singapore-kvm-basic-plus","kvm-basic-plus","SG","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=592"],
  ["edis-singapore-singapore-kvm-advanced","kvm-advanced","SG","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=597"],
  ["edis-singapore-singapore-kvm-advanced-plus","kvm-advanced-plus","SG","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=602"],
  ["edis-singapore-singapore-kvm-premium","kvm-premium","SG","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=607"],
  ["edis-singapore-singapore-kvm-premium-plus","kvm-premium-plus","SG","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=612"],
  ["edis-singapore-singapore-kvm-ruby","kvm-ruby","SG","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1942"],
  ["edis-singapore-singapore-kvm-ruby-plus","kvm-ruby-plus","SG","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1941"],
  ["edis-singapore-singapore-kvm-diamond-plus","kvm-diamond-plus","SG","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1939"],
  ["edis-singapore-singapore-kvm-diamond","kvm-diamond","SG","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1940"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/slovenia-ljubljana",[
  ["edis-slovenia-ljubljana-kvm-smart","kvm-smart","SI","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=251"],
  ["edis-slovenia-ljubljana-kvm-starter","kvm-starter","SI","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=261"],
  ["edis-slovenia-ljubljana-kvm-basic","kvm-basic","SI","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=256"],
  ["edis-slovenia-ljubljana-kvm-basic-plus","kvm-basic-plus","SI","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=266"],
  ["edis-slovenia-ljubljana-kvm-advanced","kvm-advanced","SI","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=271"],
  ["edis-slovenia-ljubljana-kvm-advanced-plus","kvm-advanced-plus","SI","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=276"],
  ["edis-slovenia-ljubljana-kvm-premium","kvm-premium","SI","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=281"],
  ["edis-slovenia-ljubljana-kvm-premium-plus","kvm-premium-plus","SI","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=286"],
  ["edis-slovenia-ljubljana-kvm-ruby","kvm-ruby","SI","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1922"],
  ["edis-slovenia-ljubljana-kvm-ruby-plus","kvm-ruby-plus","SI","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1921"],
  ["edis-slovenia-ljubljana-kvm-diamond-plus","kvm-diamond-plus","SI","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1919"],
  ["edis-slovenia-ljubljana-kvm-diamond","kvm-diamond","SI","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1920"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/sweden-stockholm",[
  ["edis-sweden-stockholm-kvm-smart","kvm-smart","SE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1302"],
  ["edis-sweden-stockholm-kvm-starter","kvm-starter","SE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1307"],
  ["edis-sweden-stockholm-kvm-basic","kvm-basic","SE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1312"],
  ["edis-sweden-stockholm-kvm-basic-plus","kvm-basic-plus","SE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1317"],
  ["edis-sweden-stockholm-kvm-advanced","kvm-advanced","SE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1322"],
  ["edis-sweden-stockholm-kvm-advanced-plus","kvm-advanced-plus","SE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1327"],
  ["edis-sweden-stockholm-kvm-premium","kvm-premium","SE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1332"],
  ["edis-sweden-stockholm-kvm-premium-plus","kvm-premium-plus","SE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1337"],
  ["edis-sweden-stockholm-kvm-ruby","kvm-ruby","SE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1930"],
  ["edis-sweden-stockholm-kvm-ruby-plus","kvm-ruby-plus","SE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1929"],
  ["edis-sweden-stockholm-kvm-diamond-plus","kvm-diamond-plus","SE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1927"],
  ["edis-sweden-stockholm-kvm-diamond","kvm-diamond","SE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1928"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/sweden-stockholm-interxion",[
  ["edis-sweden-stockholm-interxion-kvm-smart","kvm-smart","SE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2093"],
  ["edis-sweden-stockholm-interxion-kvm-starter","kvm-starter","SE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2092"],
  ["edis-sweden-stockholm-interxion-kvm-basic","kvm-basic","SE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2091"],
  ["edis-sweden-stockholm-interxion-kvm-basic-plus","kvm-basic-plus","SE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2090"],
  ["edis-sweden-stockholm-interxion-kvm-advanced","kvm-advanced","SE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2089"],
  ["edis-sweden-stockholm-interxion-kvm-advanced-plus","kvm-advanced-plus","SE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2088"],
  ["edis-sweden-stockholm-interxion-kvm-premium","kvm-premium","SE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2087"],
  ["edis-sweden-stockholm-interxion-kvm-premium-plus","kvm-premium-plus","SE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2086"],
  ["edis-sweden-stockholm-interxion-kvm-ruby","kvm-ruby","SE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2085"],
  ["edis-sweden-stockholm-interxion-kvm-ruby-plus","kvm-ruby-plus","SE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2084"],
  ["edis-sweden-stockholm-interxion-kvm-diamond-plus","kvm-diamond-plus","SE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2082"],
  ["edis-sweden-stockholm-interxion-kvm-diamond","kvm-diamond","SE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2083"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/united-arab-emirates-dubai",[
  ["edis-united-arab-emirates-dubai-kvm-smart","kvm-smart","AE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1242"],
  ["edis-united-arab-emirates-dubai-kvm-starter","kvm-starter","AE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1247"],
  ["edis-united-arab-emirates-dubai-kvm-basic","kvm-basic","AE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1252"],
  ["edis-united-arab-emirates-dubai-kvm-basic-plus","kvm-basic-plus","AE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1257"],
  ["edis-united-arab-emirates-dubai-kvm-advanced","kvm-advanced","AE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1262"],
  ["edis-united-arab-emirates-dubai-kvm-advanced-plus","kvm-advanced-plus","AE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1267"],
  ["edis-united-arab-emirates-dubai-kvm-premium","kvm-premium","AE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1272"],
  ["edis-united-arab-emirates-dubai-kvm-premium-plus","kvm-premium-plus","AE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1277"],
  ["edis-united-arab-emirates-dubai-kvm-ruby","kvm-ruby","AE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2031"],
  ["edis-united-arab-emirates-dubai-kvm-ruby-plus","kvm-ruby-plus","AE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2030"],
  ["edis-united-arab-emirates-dubai-kvm-diamond-plus","kvm-diamond-plus","AE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2028"],
  ["edis-united-arab-emirates-dubai-kvm-diamond","kvm-diamond","AE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2029"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/united-kingdom-london-city",[
  ["edis-united-kingdom-london-city-kvm-smart","kvm-smart","GB","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1182"],
  ["edis-united-kingdom-london-city-kvm-starter","kvm-starter","GB","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1187"],
  ["edis-united-kingdom-london-city-kvm-basic","kvm-basic","GB","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1192"],
  ["edis-united-kingdom-london-city-kvm-basic-plus","kvm-basic-plus","GB","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1237"],
  ["edis-united-kingdom-london-city-kvm-advanced","kvm-advanced","GB","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1282"],
  ["edis-united-kingdom-london-city-kvm-advanced-plus","kvm-advanced-plus","GB","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1287"],
  ["edis-united-kingdom-london-city-kvm-premium","kvm-premium","GB","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1292"],
  ["edis-united-kingdom-london-city-kvm-premium-plus","kvm-premium-plus","GB","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1297"],
  ["edis-united-kingdom-london-city-kvm-ruby","kvm-ruby","GB","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1934"],
  ["edis-united-kingdom-london-city-kvm-ruby-plus","kvm-ruby-plus","GB","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1933"],
  ["edis-united-kingdom-london-city-kvm-diamond-plus","kvm-diamond-plus","GB","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1931"],
  ["edis-united-kingdom-london-city-kvm-diamond","kvm-diamond","GB","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1932"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/usa-los-angeles",[
  ["edis-usa-los-angeles-kvm-smart","kvm-smart","LAX","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1975"],
  ["edis-usa-los-angeles-kvm-starter","kvm-starter","LAX","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1976"],
  ["edis-usa-los-angeles-kvm-basic","kvm-basic","LAX","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1977"],
  ["edis-usa-los-angeles-kvm-basic-plus","kvm-basic-plus","LAX","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1978"],
  ["edis-usa-los-angeles-kvm-advanced","kvm-advanced","LAX","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1979"],
  ["edis-usa-los-angeles-kvm-advanced-plus","kvm-advanced-plus","LAX","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1980"],
  ["edis-usa-los-angeles-kvm-premium","kvm-premium","LAX","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1981"],
  ["edis-usa-los-angeles-kvm-premium-plus","kvm-premium-plus","LAX","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1982"],
  ["edis-usa-los-angeles-kvm-ruby","kvm-ruby","LAX","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1983"],
  ["edis-usa-los-angeles-kvm-ruby-plus","kvm-ruby-plus","LAX","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1984"],
  ["edis-usa-los-angeles-kvm-diamond-plus","kvm-diamond-plus","LAX","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1986"],
  ["edis-usa-los-angeles-kvm-diamond","kvm-diamond","LAX","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1985"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/usa-miami",[
  ["edis-usa-miami-kvm-smart","kvm-smart","US","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1797"],
  ["edis-usa-miami-kvm-starter","kvm-starter","US","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1804"],
  ["edis-usa-miami-kvm-basic","kvm-basic","US","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1803"],
  ["edis-usa-miami-kvm-basic-plus","kvm-basic-plus","US","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1802"],
  ["edis-usa-miami-kvm-advanced","kvm-advanced","US","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1801"],
  ["edis-usa-miami-kvm-advanced-plus","kvm-advanced-plus","US","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1800"],
  ["edis-usa-miami-kvm-premium","kvm-premium","US","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1799"],
  ["edis-usa-miami-kvm-premium-plus","kvm-premium-plus","US","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1798"],
  ["edis-usa-miami-kvm-ruby","kvm-ruby","US","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1844"],
  ["edis-usa-miami-kvm-ruby-plus","kvm-ruby-plus","US","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1845"],
  ["edis-usa-miami-kvm-diamond-plus","kvm-diamond-plus","US","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1847"],
  ["edis-usa-miami-kvm-diamond","kvm-diamond","US","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1846"]
 ]]
];
for(const [url,rows] of facilityOfferCatalogs){
 for(const [key,sku,zone,suffix,orderUrl] of rows)catalogStockTargets[key]={family:'jsonldoffer',sku,zone,url,productId:url+suffix,orderUrl};
}
const mkCatalogGroups={
 "gz-hk-sh":[
  [1,"gz-hk-2t","HK"],
  [2,"gz-hk-4t","HK"],
  [5,"gz-hk-6t","HK"],
  [6,"gz-hk-10t","HK"],
  [249,"gz-hk-20t","HK"]
 ],
 "gz-hk-ex":[
  [7,"gz-hk-10m","HK"],
  [8,"gz-hk-20m","HK"],
  [9,"gz-hk-50m","HK"],
  [10,"gz-hk-100m","HK"],
  [258,"gz-hk-200m","HK"],
  [262,"gz-hk-300m","HK"]
 ],
 "sh-jp-sh":[
  [184,"sh-jp-2t","JP"],
  [185,"sh-jp-4t","JP"],
  [186,"sh-jp-6t","JP"],
  [187,"sh-jp-10t","JP"],
  [251,"sh-jp-20t","JP"]
 ],
 "sh-jp-ex":[
  [25,"sh-jp-50m","JP"],
  [26,"sh-jp-100m","JP"],
  [201,"sh-jp-10m","JP"],
  [202,"sh-jp-20m","JP"],
  [271,"sh-jp-200m","JP"],
  [286,"sh-jp-300m","JP"]
 ],
 "shh-jp-ex":[
  [28,"sh-jp-20m","JP"],
  [29,"sh-jp-50m","JP"],
  [30,"sh-jp-100m","JP"],
  [203,"sh-jp-10m","JP"]
 ],
 "sh-us-sh":[
  [191,"sh-us-2t","US"],
  [192,"sh-us-4t","US"],
  [193,"sh-us-6t","US"],
  [194,"sh-us-10t","US"],
  [195,"sh-us-20t","US"]
 ],
 "sh-us-ex":[
  [38,"sh-us-10m","US"],
  [39,"sh-us-20m","US"],
  [40,"sh-us-50m","US"],
  [42,"sh-us-100m","US"],
  [287,"sh-us-200m","US"],
  [288,"sh-us-300m","US"]
 ],
 "shh-us-ex":[
  [63,"sh-us-10m","US"],
  [64,"sh-us-20m","US"],
  [65,"sh-us-50m","US"],
  [66,"sh-us-100m","US"]
 ],
 "cloud-hk-sh":[
  [92,"cloud-hk-4t","HK"],
  [94,"cloud-hk-6t","HK"],
  [208,"cloud-hk-10t","HK"],
  [209,"cloud-hk-20t","HK"],
  [210,"cloud-hk-30t","HK"],
  [211,"cloud-hk-50t","HK"],
  [212,"cloud-hk-100t","HK"],
  [213,"cloud-hk-200t","HK"],
  [214,"cloud-hk-300t","HK"]
 ],
 "cloud-jp-sh":[
  [197,"cloud-jp-2t","JP"],
  [199,"cloud-jp-3t","JP"],
  [200,"cloud-jp-6t-1g","JP"],
  [250,"cloud-jp-10t","JP"],
  [263,"cloud-jp-20t","JP"],
  [267,"cloud-jp-30t","JP"],
  [268,"cloud-jp-50t","JP"]
 ],
 "cloud-hk-ex":[
  [109,"cloud-hk-200m","HK"],
  [110,"cloud-hk-500m","HK"],
  [111,"cloud-hk-1g","HK"],
  [130,"cloud-hk-2g","HK"],
  [131,"cloud-hk-5g","HK"]
 ],
 "gz-yd-hk-ex":[
  [121,"gz-hk-2g","HK"],
  [132,"gz-hk-5g","HK"]
 ],
 "gz-th-hk-ex":[
  [116,"gz-hk-2g","HK"],
  [133,"gz-hk-5g","HK"]
 ],
 "gd-dx-hk-ex":[
  [137,"gd-hk-2g","HK"],
  [138,"gd-hk-5g","HK"]
 ],
 "cloud-us-sh":[
  [205,"cloud-us-2t","US"],
  [206,"cloud-us-3t","US"],
  [207,"cloud-us-6t","US"],
  [289,"cloud-us-10t","US"],
  [290,"cloud-us-20t","US"],
  [291,"cloud-us-30t","US"],
  [292,"cloud-us-50t","US"]
 ],
 "cloud-jp-ex":[
  [146,"cloud-jp-100m","JP"],
  [147,"cloud-jp-200m","JP"],
  [148,"cloud-jp-500m","JP"],
  [149,"cloud-jp-1g","JP"],
  [150,"cloud-jp-2g","JP"],
  [151,"cloud-jp-5g","JP"],
  [161,"cloud-jp-50m","JP"]
 ],
 "cloud-us-ex":[
  [153,"cloud-us-100m","US"],
  [154,"cloud-us-200m","US"],
  [155,"cloud-us-500m","US"],
  [156,"cloud-us-1g","US"],
  [157,"cloud-us-2g","US"],
  [158,"cloud-us-5g","US"],
  [163,"cloud-us-50m","US"]
 ],
 "xm-hk-ex":[
  [166,"xm-hk-500m","HK"],
  [167,"xm-hk-1g","HK"],
  [168,"xm-hk-2g","HK"],
  [169,"xm-hk-5g","HK"]
 ],
 "qz-hk-ex":[
  [175,"qz-hk-500m","HK"],
  [176,"qz-hk-1g","HK"],
  [177,"qz-hk-2g","HK"],
  [178,"qz-hk-5g","HK"]
 ],
 "cloud-sh-hk-sh":[
  [218,"cloud-hk-3t","HK"],
  [219,"cloud-hk-6t","HK"],
  [252,"cloud-hk-10t","HK"],
  [264,"cloud-hk-20t","HK"],
  [265,"cloud-hk-30t","HK"],
  [266,"cloud-hk-50t","HK"]
 ],
 "cloud-sh-hk-ex":[
  [222,"cloud-hk-200m","HK"],
  [223,"cloud-hk-500m","HK"],
  [224,"cloud-hk-1g","HK"],
  [225,"cloud-hk-2g","HK"],
  [226,"cloud-hk-5g","HK"]
 ],
 "sh-hk-ex":[
  [229,"sh-hk-10m","HK"],
  [230,"sh-hk-20m","HK"],
  [231,"sh-hk-50m","HK"],
  [232,"sh-hk-100m","HK"]
 ],
 "gd-lt-hk-ex":[
  [255,"gd-hk-2g","HK"],
  [256,"gd-hk-5g","HK"]
 ],
 "sh-hk-sh":[
  [273,"sh-hk-2t","HK"],
  [274,"sh-hk-4t","HK"],
  [275,"sh-hk-6t","HK"],
  [276,"sh-hk-10t","HK"],
  [277,"sh-hk-20t","HK"]
 ],
 "shh-hk-ex":[
  [279,"sh-hk-10m","HK"],
  [280,"sh-hk-20m","HK"],
  [281,"sh-hk-50m","HK"],
  [282,"sh-hk-100m","HK"],
  [283,"sh-hk-200m","HK"],
  [284,"sh-hk-300m","HK"]
 ],
 "gz-sg-sh":[
  [294,"gz-sg-2t","SG"],
  [295,"gz-sg-4t","SG"],
  [296,"gz-sg-6t","SG"],
  [297,"gz-sg-10t","SG"],
  [298,"gz-sg-20t","SG"]
 ],
 "cloud-sg-sh":[
  [300,"cloud-sg-3t","SG"],
  [301,"cloud-sg-6t","SG"],
  [302,"cloud-sg-10t","SG"],
  [303,"cloud-sg-20t","SG"],
  [304,"cloud-sg-30t","SG"],
  [305,"cloud-sg-50t","SG"]
 ],
 "gz-sg-ex":[
  [320,"gz-sg-10m","SG"],
  [321,"gz-sg-20m","SG"],
  [322,"gz-sg-50m","SG"],
  [323,"gz-sg-100m","SG"],
  [324,"gz-sg-200m","SG"],
  [325,"gz-sg-300m","SG"]
 ],
 "cloud-sg-ex":[
  [328,"cloud-sg-200m","SG"],
  [329,"cloud-sg-500m","SG"],
  [330,"cloud-sg-1g","SG"],
  [331,"cloud-sg-2g","SG"],
  [332,"cloud-sg-5g","SG"]
 ],
 "sh-sg-sh":[
  [307,"sh-sg-2t","SG"],
  [308,"sh-sg-4t","SG"],
  [309,"sh-sg-6t","SG"],
  [310,"sh-sg-10t","SG"],
  [311,"sh-sg-20t","SG"]
 ],
 "cloud-sh-sg-sh":[
  [313,"cloud-sg-3t","SG"],
  [314,"cloud-sg-6t","SG"],
  [315,"cloud-sg-10t","SG"],
  [316,"cloud-sg-20t","SG"],
  [317,"cloud-sg-30t","SG"],
  [318,"cloud-sg-50t","SG"]
 ],
 "sh-sg-ex":[
  [335,"sh-sg-10m","SG"],
  [336,"sh-sg-20m","SG"],
  [337,"sh-sg-50m","SG"],
  [338,"sh-sg-100m","SG"],
  [339,"sh-sg-200m","SG"],
  [340,"sh-sg-300m","SG"]
 ],
 "cloud-sh-sg-ex":[
  [349,"cloud-sg-200m","SG"],
  [350,"cloud-sg-500m","SG"],
  [351,"cloud-sg-1g","SG"],
  [352,"cloud-sg-2g","SG"],
  [353,"cloud-sg-5g","SG"]
 ],
 "shh-sg-ex":[
  [343,"sh-sg-20m","SG"],
  [344,"sh-sg-10m","SG"],
  [345,"sh-sg-50m","SG"],
  [346,"sh-sg-100m","SG"]
 ]
};
for(const [group,rows] of Object.entries(mkCatalogGroups)){
 const url='https://www.mkcloud.net/index.php/store/'+group;
 for(const [pid,sku,zone] of rows)catalogStockTargets['mk-'+pid]={family:'mkcloud',pid,sku,zone,group,url};
}
const greenCatalogGroups={
 "10gbps-windows-vps":[
  [189,"10Gbps-1","MULTI",1],
  [186,"10Gbps-2","MULTI",1],
  [187,"10Gbps-3","MULTI",1],
  [188,"10Gbps-4","MULTI",1]
 ],
 "budget-kvm-sale":[
  [2623,"BudgetKVMNYC-2","US"],
  [2625,"BudgetKVMNYC-3","US"],
  [1177,"BudgetKVMVA-2","US"],
  [1179,"BudgetKVMVA-3","US"],
  [2125,"BudgetKVMUT-2","US"],
  [2123,"BudgetKVMUT-3","US"],
  [2017,"BudgetKVMIL2-2","US"],
  [2019,"BudgetKVMIL2-3","US"],
  [1541,"BudgetKVMCA-2","CA"],
  [1543,"BudgetKVMCA-3","CA"],
  [1331,"BudgetKVMSJC-2","SJC"],
  [1333,"BudgetKVMSJC-3","SJC"],
  [2431,"BudgetKVMAZ-2","US"],
  [2433,"BudgetKVMAZ-3","US"],
  [1587,"BudgetKVMLA-2","LAX"],
  [1589,"BudgetKVMLA-3","LAX"],
  [2105,"BudgetKVMJAX-2","US"],
  [2107,"BudgetKVMJAX-3","US"],
  [2257,"BudgetKVMMO-2","US"],
  [2259,"BudgetKVMMO-3","US"],
  [1021,"BudgetKVMTX-2","US"],
  [1023,"BudgetKVMTX-3","US"],
  [2405,"BudgetKVMNY-2","US"],
  [2407,"BudgetKVMNY-3","US"],
  [1243,"BudgetKVMCUK-2","GB"],
  [1245,"BudgetKVMCUK-3","GB"],
  [1975,"BudgetKVMNL-2","NL"],
  [1977,"BudgetKVMNL-3","NL"],
  [2581,"BudgetKVMDE-2","DE"],
  [2583,"BudgetKVMDE-3","DE"],
  [2925,"BudgetKVMRO-2","RO"],
  [2927,"BudgetKVMRO-3","RO"],
  [1353,"BudgetKVMSGDC1-2","SG"],
  [1355,"BudgetKVMSGDC1-3","SG"],
  [1429,"BudgetKVMSG-2 DC2","SG"],
  [1483,"BudgetKVMSG-3 DC2","SG"],
  [1303,"BudgetKVMJPVF-2","JP"],
  [1305,"BudgetKVMJPVF-3","JP"],
  [1513,"BudgetKVMJP-2 (Softbank)","JP"],
  [1515,"BudgetKVMJP-3 (Softbank)","JP"],
  [1983,"BudgetKVMHK2-2","HK"],
  [1985,"BudgetKVMHK2-3","HK"]
 ],
 "budget-windows-vps":[
  [344,"HyperUS6","MULTI",1],
  [343,"HyperUS5","MULTI",1],
  [342,"HyperUS4","MULTI",1],
  [341,"HyperUS3","MULTI",1],
  [340,"HyperUS2","MULTI",1],
  [339,"HyperUS1.5","MULTI",1],
  [335,"HyperUS1","MULTI",1],
  [334,"HyperBudget-1","MULTI",1],
  [337,"HyperBudget-2","MULTI",1],
  [338,"HyperBudget-3","MULTI",1]
 ],
 "cn-premium-optimized":[
  [2213,"CN Premium Optimized Plan Mini (Tokyo)","JP"],
  [2077,"CN Premium Optimized Plan 1 (Tokyo)","JP"],
  [2079,"CN Premium Optimized Plan 2 (Tokyo)","JP"],
  [2081,"CN Premium Optimized Plan 3 (Tokyo)","JP"],
  [2083,"CN Premium Optimized Plan 4 (Tokyo)","JP"],
  [2305,"CN Premium Optimized Plan Mini (Singapore)","SG"],
  [2307,"CN Premium Optimized Plan 1 (Singapore)","SG"],
  [2309,"CN Premium Optimized Plan 2 (Singapore)","SG"],
  [2311,"CN Premium Optimized Plan 3 (Singapore)","SG"],
  [2313,"CN Premium Optimized Plan 4 (Singapore)","SG"]
 ],
 "epyc-cloud-resources":[
  [1247,"APAC Cloud Resource 1","MULTI"],
  [1251,"APAC Cloud Resource 2","MULTI"],
  [1253,"APAC Cloud Resource 3","MULTI"],
  [1255,"USA/EU Cloud Resource 1","MULTI"],
  [1257,"USA/EU Cloud Resource 2","MULTI"],
  [1259,"USA/EU Cloud Resource 3","MULTI"]
 ],
 "epyc-nvme-kvm-vds":[
  [2633,"EPYCVDSNYC-1","US"],
  [2635,"EPYCVDSNYC-2","US"],
  [2637,"EPYCVDSNYC-3","US"],
  [2639,"EPYCVDSNYC-4","US"],
  [2641,"EPYCVDSNYC-5","US"],
  [1319,"EPYCVDSSJCVF-1","SJC"],
  [1321,"EPYCVDSSJCVF-2","SJC"],
  [1323,"EPYCVDSSJCVF-3","SJC"],
  [1325,"EPYCVDSSJCVF-4","SJC"],
  [1327,"EPYCVDSSJCVF-5","SJC"],
  [1597,"EPYCVDSLA-1","LAX"],
  [1599,"EPYCVDSLA-2","LAX"],
  [1601,"EPYCVDSLA-3","LAX"],
  [1603,"EPYCVDSLA-4","LAX"],
  [1605,"EPYCVDSLA-5","LAX"],
  [2145,"EPYCVDSUT-1","US"],
  [2147,"EPYCVDSUT-2","US"],
  [2149,"EPYCVDSUT-3","US"],
  [2151,"EPYCVDSUT-4","US"],
  [2153,"EPYCVDSUT-5","US"],
  [1165,"EPYCVDSASH-1","US"],
  [1167,"EPYCVDSASH-2","US"],
  [1169,"EPYCVDSASH-3","US"],
  [1171,"EPYCVDSASH-4","US"],
  [1173,"EPYCVDSASH-5","US"],
  [2929,"EPYCVDSMO-1","US"],
  [2931,"EPYCVDSMO-2","US"],
  [2933,"EPYCVDSMO-3","US"],
  [2935,"EPYCVDSMO-4","US"],
  [2937,"EPYCVDSMO-5","US"],
  [1227,"EPYCVDSIL-1","US"],
  [1231,"EPYCVDSIL-2","US"],
  [1233,"EPYCVDSIL-3","US"],
  [1235,"EPYCVDSIL-4","US"],
  [1237,"EPYCVDSIL-5","US"],
  [1551,"EPYCVDSCA-1","CA"],
  [1553,"EPYCVDSCA-2","CA"],
  [1555,"EPYCVDSCA-3","CA"],
  [1557,"EPYCVDSCA-4","CA"],
  [1559,"EPYCVDSCA-5","CA"],
  [1385,"EPYCVDSNL-1","NL"],
  [1387,"EPYCVDSNL-2","NL"],
  [1389,"EPYCVDSNL-3","NL"],
  [1391,"EPYCVDSNL-4","NL"],
  [1393,"EPYCVDSNL-5","NL"],
  [1399,"EPYCVDSDEVF-1","DE"],
  [1401,"EPYCVDSDEVF-2","DE"],
  [1403,"EPYCVDSDEVF-3","DE"],
  [1405,"EPYCVDSDEVF-4","DE"],
  [1407,"EPYCVDSDEVF-5","DE"],
  [1959,"EPYCVDSCUKVF-1","GB"],
  [1963,"EPYCVDSCUKVF-2","GB"],
  [1965,"EPYCVDSCUKVF-3","GB"],
  [1967,"EPYCVDSCUKVF-4","GB"],
  [1969,"EPYCVDSCUKVF-5","GB"],
  [1147,"EPYCVDSSGDC2-1","SG"],
  [1155,"EPYCVDSSGDC2-2","SG"],
  [1157,"EPYCVDSSGDC2-3","SG"],
  [1159,"EPYCVDSSGDC2-4","SG"],
  [1161,"EPYCVDSSGDC2-5","SG"],
  [1343,"EPYCVDSSGDC1-1","SG"],
  [1345,"EPYCVDSSGDC1-2","SG"],
  [1347,"EPYCVDSSGDC1-3","SG"],
  [1349,"EPYCVDSSGDC1-4","SG"],
  [1351,"EPYCVDSSGDC1-5","SG"],
  [1517,"EPYCVDSJPVF-1","JP"],
  [1519,"EPYCVDSJPVF-2","JP"],
  [1521,"EPYCVDSJPVF-3","JP"],
  [1523,"EPYCVDSJPVF-4","JP"],
  [1525,"EPYCVDSJPVF-5","JP"],
  [1647,"EPYCVDSJPSB-1","JP"],
  [1649,"EPYCVDSJPSB-2","JP"],
  [1651,"EPYCVDSJPSB-3","JP"],
  [1653,"EPYCVDSJPSB-4","JP"],
  [1655,"EPYCVDSJPSB-5","JP"],
  [1873,"EPYCVDSHKDC2-1","HK"],
  [1875,"EPYCVDSHKDC2-2","HK"],
  [1877,"EPYCVDSHKDC2-3","HK"],
  [1879,"EPYCVDSHKDC2-4","HK"],
  [1881,"EPYCVDSHKDC2-5","HK"],
  [1993,"EPYCVDSHKDC1-1","HK"],
  [1995,"EPYCVDSHKDC1-2","HK"],
  [1997,"EPYCVDSHKDC1-3","HK"],
  [1999,"EPYCVDSHKDC1-4","HK"],
  [2001,"EPYCVDSHKDC1-5","HK"]
 ],
 "forex-vps":[
  [267,"FOREX-1","MULTI",1],
  [268,"FOREX-2","MULTI",1],
  [269,"FOREX-3","MULTI",1],
  [270,"FOREX-4","MULTI",1]
 ],
 "mac-vpsmacos-vps":[
  [276,"MAC-1","MULTI",1],
  [277,"MAC-2","MULTI",1],
  [278,"MAC-3","MULTI",1],
  [279,"MAC-4","MULTI",1]
 ],
 "managed-windows-vps":[
  [756,"Managed Basic","MULTI",1],
  [757,"Managed Advanced","MULTI",1],
  [758,"Managed Premium","MULTI",1],
  [759,"Managed Business","MULTI",1]
 ],
 "premium-kvm-sale":[
  [2627,"EPYCNYC-1","US"],
  [2629,"EPYCNYC-2","US"],
  [2631,"EPYCNYC-3","US"],
  [2457,"EPYCMO-1","US"],
  [2461,"EPYCMO-2","US"],
  [2455,"EPYCMO-3","US"],
  [1315,"EPYCSJC-1","SJC"],
  [1311,"EPYCSJC-2","SJC"],
  [1313,"EPYCSJC-3","SJC"],
  [1591,"EPYCLA-1","LAX"],
  [1593,"EPYCLA-2","LAX"],
  [1595,"EPYCLA-3","LAX"],
  [2143,"EPYCUT-1","US"],
  [2141,"EPYCUT-2","US"],
  [2139,"EPYCUT-3","US"],
  [2503,"EPYCTX-1","US"],
  [2499,"EPYCTX-2","US"],
  [2505,"EPYCTX-3","US"],
  [1181,"EPYCVA-1","US"],
  [1183,"EPYCVA-2","US"],
  [1185,"EPYCVA-3","US"],
  [1221,"EPYCIL2-1","US"],
  [1223,"EPYCIL2-2","US"],
  [1225,"EPYCIL2-3","US"],
  [1545,"EPYCCA-1","CA"],
  [1547,"EPYCCA-2","CA"],
  [1549,"EPYCCA-3","CA"],
  [1379,"EPYCNL-1","NL"],
  [1381,"EPYCNL-2","NL"],
  [1383,"EPYCNL-3","NL"],
  [1411,"EPYCDE-1","DE"],
  [1397,"EPYCDE-2","DE"],
  [1413,"EPYCDE-3","DE"],
  [1953,"EPYCUK-1","GB"],
  [1955,"EPYCUK-2","GB"],
  [1957,"EPYCUK-3","GB"],
  [1499,"EPYCJP-1","JP"],
  [1497,"EPYCJP-2","JP"],
  [1501,"EPYCJP-3","JP"],
  [1503,"EPYCJP-1 (Softbank)","JP"],
  [1505,"EPYCJP-2 (Softbank)","JP"],
  [1507,"EPYCJP-3 (Softbank)","JP"],
  [1187,"EPYCSGDC2-1","SG"],
  [1189,"EPYCSGDC2-2","SG"],
  [1191,"EPYCSGDC2-3","SG"],
  [1337,"EPYCSGDC1-1","SG"],
  [1339,"EPYCSGDC1-2","SG"],
  [1341,"EPYCSGDC1-3","SG"],
  [1415,"EPYCHKDC2-1","HK"],
  [1417,"EPYCHKDC2-2","HK"],
  [1419,"EPYCHKDC2-3","HK"],
  [1987,"EPYCHKDC1-1","HK"],
  [1989,"EPYCHKDC1-2","HK"],
  [1991,"EPYCHKDC1-3","HK"]
 ],
 "ryzen-kvm-vps":[
  [1799,"RyzenLA-1","LAX"],
  [1801,"RyzenLA-2","LAX"],
  [1803,"RyzenLA-3","LAX",1],
  [1805,"RyzenLA-4","LAX",1],
  [1807,"RyzenLA-5","LAX",1],
  [2599,"RyzenIL-1","US",1],
  [2597,"RyzenIL-2","US",1],
  [2591,"RyzenIL-3","US",1],
  [2593,"RyzenIL-4","US",1],
  [2595,"RyzenIL-5","US",1],
  [2157,"RyzenUT-1","US",1],
  [2155,"RyzenUT-2","US",1],
  [2159,"RyzenUT-3","US",1],
  [2163,"RyzenUT-4","US",1],
  [2165,"RyzenUT-5","US",1],
  [2557,"RyzenNL-1","NL"],
  [2559,"RyzenNL-2","NL"],
  [2561,"RyzenNL-3","NL"],
  [2563,"RyzenNL-4","NL"],
  [2565,"RyzenNL-5","NL"],
  [2365,"RyzenSJC-1","SJC",1],
  [2367,"RyzenSJC-2","SJC",1],
  [2369,"RyzenSJC-3","SJC",1],
  [2371,"RyzenSJC-4","SJC",1],
  [2373,"RyzenSJC-5","SJC",1],
  [1809,"RyzenKVMSG2-1","SG",1],
  [1811,"RyzenKVMSG2-2","SG",1],
  [1813,"RyzenKVMSG2-3","SG",1],
  [1815,"RyzenKVMSG2-4","SG",1],
  [1817,"RyzenKVMSG2-5","SG",1],
  [2223,"RyzenKVMHK2-1","HK",1],
  [2225,"RyzenKVMHK2-2","HK",1],
  [2227,"RyzenKVMHK2-3","HK",1],
  [2229,"RyzenKVMHK2-4","HK",1],
  [2231,"RyzenKVMHK2-5","HK",1],
  [2243,"RyzenKVMJP-1","JP"],
  [2277,"RyzenKVMJP-2","JP"],
  [2279,"RyzenKVMJP-3","JP"],
  [2281,"RyzenKVMJP-4","JP"],
  [2283,"RyzenKVMJP-5","JP"],
  [2913,"RyzenKVMJP-1 (Softbank)","JP"],
  [2915,"RyzenKVMJP-2 (Softbank)","JP",1],
  [2917,"RyzenKVMJP-3 (Softbank)","JP",1],
  [2919,"RyzenKVMJP-4 (Softbank)","JP",1],
  [2923,"RyzenKVMJP-5 (Softbank)","JP",1]
 ],
 "seo-optimized-vps":[
  [523,"HyperSEO6","MULTI",1],
  [522,"HyperSEO5","MULTI",1],
  [351,"HyperSEO4","MULTI",1],
  [350,"HyperSEO3","MULTI",1],
  [349,"HyperSEO2","MULTI",1],
  [348,"HyperSEO1","MULTI",1]
 ],
 "ssd-kvm-vps":[
  [1561,"KVMCA-1","CA"],
  [1581,"KVMCA-2","CA"],
  [1583,"KVMCA-3","CA"],
  [1657,"KVMCA-4","CA"],
  [1659,"KVMCA-5","CA"],
  [1859,"KVMTX-1","US",1],
  [1861,"KVMTX-2","US",1],
  [1863,"KVMTX-3","US",1],
  [1865,"KVMTX-4","US",1],
  [1867,"KVMTX-5","US",1],
  [1661,"KVMLA-1","LAX",1],
  [1663,"KVMLA-2","LAX",1],
  [1665,"KVMLA-3","LAX",1],
  [1667,"KVMLA-4","LAX",1],
  [1669,"KVMLA-5","LAX",1],
  [2167,"KVMUT-1","US",1],
  [2169,"KVMUT-2","US",1],
  [2171,"KVMUT-3","US",1],
  [2173,"KVMUT-4","US",1],
  [2175,"KVMUT-5","US",1],
  [2693,"KVMAZ-1","US",1],
  [2695,"KVMAZ-2","US",1],
  [2697,"KVMAZ-3","US",1],
  [2699,"KVMAZ-4","US",1],
  [2701,"KVMAZ-5","US",1],
  [1467,"KVMSJC-1","SJC",1],
  [1469,"KVMSJC-2","SJC",1],
  [1471,"KVMSJC-3","SJC",1],
  [1473,"KVMSJC-4","SJC",1],
  [1475,"KVMSJC-5","SJC",1],
  [2109,"KVMJAX-1","US",1],
  [2111,"KVMJAX-2","US",1],
  [2113,"KVMJAX-3","US",1],
  [2115,"KVMJAX-4","US",1],
  [2117,"KVMJAX-5","US",1],
  [2245,"KVMMO-1","US",1],
  [2247,"KVMMO-2","US",1],
  [2249,"KVMMO-3","US",1],
  [2251,"KVMMO-4","US",1],
  [2253,"KVMMO-5","US",1],
  [1787,"KVMIL2-1","US",1],
  [1789,"KVMIL2-2","US",1],
  [1791,"KVMIL2-3","US",1],
  [1793,"KVMIL2-4","US",1],
  [1795,"KVMIL2-5","US",1],
  [1777,"KVMNL-1","NL",1],
  [1779,"KVMNL-2","NL",1],
  [1781,"KVMNL-3","NL",1],
  [1783,"KVMNL-4","NL",1],
  [1785,"KVMNL-5","NL",1],
  [1767,"KVMDE-1","DE",1],
  [1769,"KVMDE-2","DE",1],
  [1771,"KVMDE-3","DE",1],
  [1773,"KVMDE-4","DE",1],
  [1775,"KVMDE-5","DE",1],
  [1681,"KVMVA-1","US",1],
  [1685,"KVMVA-2","US",1],
  [1687,"KVMVA-3","US",1],
  [1689,"KVMVA-4","US",1],
  [1691,"KVMVA-5","US",1],
  [2393,"KVMNY-1","US",1],
  [2395,"KVMNY-2","US",1],
  [2397,"KVMNY-3","US",1],
  [2399,"KVMNY-4","US",1],
  [2401,"KVMNY-5","US",1],
  [2643,"KVMNYC-1","US",1],
  [2645,"KVMNYC-2","US",1],
  [2647,"KVMNYC-3","US",1],
  [2649,"KVMNYC-4","US",1],
  [2651,"KVMNYC-5","US",1],
  [1671,"KVMUK-1","GB",1],
  [1673,"KVMUK-2","GB",1],
  [1675,"KVMUK-3","GB",1],
  [1677,"KVMUK-4","GB",1],
  [1679,"KVMUK-5","GB",1],
  [1693,"KVMSG1-1","SG",1],
  [1695,"KVMSG1-2","SG",1],
  [1697,"KVMSG1-3","SG",1],
  [1699,"KVMSG1-4","SG",1],
  [1701,"KVMSG1-5","SG",1],
  [1703,"KVMSG2-1","SG",1],
  [1705,"KVMSG2-2","SG",1],
  [1707,"KVMSG2-3","SG",1],
  [1709,"KVMSG2-4","SG",1],
  [1711,"KVMSG2-5","SG",1],
  [1713,"KVMJP-1 (IIJ)","JP",1],
  [1715,"KVMJP-2 (IIJ)","JP",1],
  [1717,"KVMJP-3 (IIJ)","JP",1],
  [1719,"KVMJP-4 (IIJ)","JP",1],
  [1723,"KVMJP-5 (IIJ)","JP",1],
  [1725,"KVMJP-1 (Softbank)","JP",1],
  [1727,"KVMJP-2 (Softbank)","JP",1],
  [1729,"KVMJP-3 (Softbank)","JP",1],
  [1731,"KVMJP-4 (Softbank)","JP",1],
  [1733,"KVMJP-5 (Softbank)","JP",1],
  [2003,"KVMHK1-1","HK",1],
  [2005,"KVMHK1-2","HK",1],
  [2007,"KVMHK1-3","HK",1],
  [2009,"KVMHK1-4","HK",1],
  [2011,"KVMHK1-5","HK",1],
  [1747,"KVMHK2-1","HK",1],
  [1749,"KVMHK2-2","HK",1],
  [1751,"KVMHK2-3","HK",1],
  [1753,"KVMHK2-4","HK",1],
  [1755,"KVMHK2-5","HK",1]
 ],
 "storage-kvm-sale":[
  [1534,"JP10GbpsStorage-0.5TB (Softbank)","JP"],
  [1536,"JP10GbpsStorage-1 (Softbank)","JP"],
  [1538,"JP10GbpsStorage-2 (Softbank)","JP"],
  [1563,"JP10GbpsStorage-0.5TB (IIJ)","JP"],
  [1565,"JP10GbpsStorage-1 (IIJ)","JP"],
  [1567,"JP10GbpsStorage-2 (IIJ)","JP"],
  [1641,"SG10GbpsStorage0.5TB (DC1)","SG"],
  [1643,"SG10GbpsStorage-1 (DC1)","SG"],
  [1645,"SG10GbpsStorage-2 (DC1)","SG"],
  [2939,"SG10GbpsStorage0.5TB (DC2)","SG"],
  [2941,"SG10GbpsStorage-1 (DC2)","SG"],
  [2943,"SG10GbpsStorage-2 (DC2)","SG"],
  [2177,"UT10GbpStorage-0.5TB","US"],
  [2179,"UT10GbpStorage-1","US"],
  [2181,"UT10GbpStorage-2","US"],
  [2441,"NY10GbpsStorage-0.5TB","US"],
  [2443,"NY10GbpsStorage-1","US"],
  [2445,"NY10GbpsStorage-2","US"],
  [2037,"IL10GbpsStorage-0.5TB","US"],
  [2039,"IL10GbpsStorage-1","US"],
  [2041,"IL10GbpsStorage-2","US"]
 ],
 "windows-vps-sale":[
  [801,"WinPromo-1","MULTI"],
  [804,"WinPromo-2","MULTI"],
  [805,"WinPromo-3","MULTI"],
  [806,"WinPromo-4","MULTI"]
 ]
};
const greenLegacyKeys={"1321":"gc-sjc-vds2","2305":"gc-sg-prem-mini","2307":"gc-sg-prem-1"};
for(const [slug,rows] of Object.entries(greenCatalogGroups)){
 const url='https://greencloudvps.com/billing/store/'+slug+'?language=english';
 for(const [pid,sku,zone,quoteOnly] of rows){
  const key=greenLegacyKeys[pid]||'green-p'+pid;
  catalogStockTargets[key]={family:'greenwhmcs',pid,sku,zone,url,quoteOnly:Boolean(quoteOnly)};
 }
}
Object.assign(networkStockTargets,catalogStockTargets);
function stockTarget(key){
 if(Object.hasOwn(quoteOnlyTargets,key))return quoteOnlyTargets[key];
 if(Object.hasOwn(networkStockTargets,key))return networkStockTargets[key];
 if(Object.hasOwn(campaignTargets,key))return campaignTargets[key];
 const host=key.match(/^hh-([A-Z]{3})-([1-7])$/);
 if(host&&stockCities[host[1]]) return {family:'hosthink',sku:host[1]+'-'+host[2],zone:stockCities[host[1]][0],url:'https://www.hosthink.net/dedicated-servers/'+stockCities[host[1]][1]+'/'};
 if(key.startsWith('ovh-')&&Object.values(ovhZones).includes(key.slice(4))){
  const zone=key.slice(4),us=zone==='bhs',sku=us?'24sys02-v3-ca':'24sys02-v3',memory='ram-32g-ecc-2133',storage='softraid-2x512nvme';
  const params=new URLSearchParams({planCode:sku,datacenters:zone,memory,storage});
  return {family:'ovh',sku,zone,memory,storage,url:'https://api.'+(us?'us':'eu')+'.ovhcloud.com/1.0/dedicated/server/datacenter/availabilities?'+params};
 }
 if(['scw-fr-par-1','scw-nl-ams-1'].includes(key)){
  const zone=key.slice(4);return {family:'scw',sku:'DEV1-S',zone,url:'https://api.scaleway.com/instance/v1/zones/'+zone+'/products/servers/availability?per_page=100'}
 }
 const twSkus={'tcs-fh1':'FH1-HINET-500M','tcs-dh1':'DH1-HINET-500M','tcs-ds1':'DS1-SEEDNET-300M'};
 if(Object.hasOwn(twSkus,key))return {family:'tcs',sku:twSkus[key],zone:'TW',url:'https://billing.tcscloud.net/index.php?rp=/store/taiwan-vps-'+(key==='tcs-fh1'?'fixed':'dynamic')};
 const jpSkus={'boil-kddi':'1區 - 靜態 KDDI/au 1000Mbps VPS','boil-softbank':'2區 - SoftBank 100Mbps VPS'};
 if(Object.hasOwn(jpSkus,key))return {family:'boil',sku:jpSkus[key],zone:'JP',url:'https://cloud.boil.network/store/japan-shared-bandwidth'};
 if(key==='gc-sjc-vds2')return {family:'greencloud',sku:'EPYCVDSSJCVF-2',zone:'SJC',url:'https://www.greencloudvps.com/billing/store/epyc-nvme-kvm-vds/?language=english'};
 const singaporePlans={'gc-sg-prem-mini':'CN Premium Optimized Plan Mini (Singapore)','gc-sg-prem-1':'CN Premium Optimized Plan 1 (Singapore)'};
 if(Object.hasOwn(singaporePlans,key))return {family:'greencloud',sku:singaporePlans[key],zone:'SG',productId:key==='gc-sg-prem-mini'?'2305':'2307',url:'https://greencloudvps.com/billing/store/cn-premium-optimized'};
 if(key==='wn-9754s')return {family:'webnx',sku:'EPYC 9754S · 256 GB / 25G',zone:'LAX',url:'https://clients.webnx.com/index.php?rp=/store/instant-provisioning-la'};
 if(key==='ph-argent')return {family:'pingheberg',sku:'VPS Argent',zone:'FR',url:'https://store.pingheberg.com/products/vps/vps-argent'};
 return null;
}
function greenPlanKey(p){
 const key=p.stockKey||p.id,t=catalogStockTargets[key];
 return /^(?:GreenCloud|GreenCloudVPS)$/i.test(p.provider||'')&&t?.family==='greenwhmcs'?key:'';
}
function getStockKey(p){
 const green=greenPlanKey(p);
 if(green)return catalogStockTargets[green].quoteOnly?'':green;
 if(Object.hasOwn(catalogStockTargets,p.id))return catalogStockTargets[p.id].quoteOnly?'':p.id;
 if(p.id==='meow-tamagowtt-1'&&/^Tamago(?: Network)?$/i.test(p.provider))return p.id;
 if(p.provider==='Vultr'&&Object.hasOwn(networkStockTargets,p.id)&&networkStockTargets[p.id].family==='vultr')return p.id;
 if(p.id==='field-backwaves-sg01'&&p.provider==='Back Waves'||p.id==='field-wasabi-sg1'&&p.provider==='Wasabi Hosting')return p.id;
 if(p.stockKey===p.id && Object.hasOwn(networkStockTargets,p.id))return p.id;
 const provider=p.provider.toLowerCase(),name=typeof p.plan==='string'?p.plan:(p.plan?.en||p.plan?.sc||'');
 const label=[p.sku,p.spec?.sku,p.specs?.sku,name].filter(s=>typeof s==='string').join(' ');
 const market=p.market||(Array.isArray(p.markets)&&p.markets.length===1?p.markets[0]:'');
 if(/^ava(?:host(?:ing)?|[.]hosting)?$/.test(provider.replace(/\s+/g,''))&&market==='MD'&&(p.stockKey==='ava-nano'||p.id==='ns-ava-nano'||/VPS Nano/i.test(label)))return 'ava-nano';
 if(/^dedione(?:[.]com)?$/.test(provider.replace(/\s+/g,''))&&market==='LAX'){for(const [k,t] of Object.entries(campaignTargets))if(t.family==='dedione'&&label.toLowerCase().includes(t.sku.toLowerCase()))return k}
 if(provider==='hosthink'){
  const sku=label.match(/\b([A-Z]{3})-([1-7])\b/);
  if(sku&&stockCities[sku[1]]?.[0]===p.market)return 'hh-'+sku[0];
 }
 if(provider==='ovhcloud'&&ovhZones[p.market]&&(p.id==='ovh-bhs'||(label.includes('SYS-2 · '+ovhZones[p.market].toUpperCase()+' · 32 GB / 2 × 512 GB NVMe'))))return 'ovh-'+ovhZones[p.market];
 if(provider==='scaleway'&&/\bDEV1-S\b/i.test(label)&&((p.market==='FR'&&label.includes('FR-PAR-1'))||(p.market==='NL'&&label.includes('NL-AMS-1'))))return p.market==='FR'?'scw-fr-par-1':'scw-nl-ams-1';
 if(p.market==='TW'&&provider==='tcscloud'&&['tcs-fh1','tcs-dh1','tcs-ds1'].includes(p.id))return p.id;
 if(p.market==='JP'&&provider==='boilcloud'&&['boil-softbank','boil-kddi'].includes(p.id))return p.id;
 if(provider==='greencloud'&&p.market==='SJC'&&/\bEPYCVDSSJCVF-2\b/.test(label))return 'gc-sjc-vds2';
 if(provider==='greencloud'&&market==='SG'){
  const skus=[p.sku,p.spec?.sku,p.specs?.sku,name].filter(s=>typeof s==='string').map(s=>s.trim());
  for(const key of ['gc-sg-prem-mini','gc-sg-prem-1'])if(skus.includes(stockTarget(key).sku))return key;
 }
 if(p.id==='field-bef009937f16'&&provider==='webnx'&&p.market==='LAX')return 'wn-9754s';
 if(provider==='pingheberg'&&p.market==='FR'&&p.url?.replace(/\/$/,'')==='https://store.pingheberg.com/products/vps/vps-argent')return 'ph-argent';
 return '';
}
function hasStockProbe(p){return Boolean(getStockKey(p))}
const stockStrings={
 history:["后台库存记录","背景庫存紀錄","Inventory history","在庫履歴"],
 notInstalled:["后台采集未启用","背景採集未啟用","Background checks disabled","定期収集は未設定"],
 awaiting:["等待首次采集","等待首次採集","Awaiting first sample","初回の収集待ち"],
 scheduled:["定时采集","定時採集","Scheduled checks","定期収集"],
 stale:["采集延迟","採集延遲","Overdue sample","収集に遅れ"],
 lastChange:["上次库存变化","上次庫存變化","Last availability change","最終在庫変動"],
 lastConfirmed:["上次商家明确状态","上次商家明確狀態","Last reported availability","直近の明示在庫"],
 noHistory:["近 30 天尚无已记录的库存变化","近 30 天尚無已記錄的庫存變化","No recorded availability changes in the past 30 days","過去30日間に記録された在庫変動はありません"],
 historyOffline:["暂时无法读取","暫時無法讀取","History unavailable","履歴を取得できません"],
 quota:['活动名额','活動名額','Campaign allotment','キャンペーン枠'],
 'quota-in-stock':['活动名额可用','活動名額可用','Campaign slots available','キャンペーン枠あり'],
 'quota-sold-out':['活动名额已满','活動名額已滿','Campaign slots exhausted','キャンペーン枠終了'],
 title:['交付库存','交付庫存','Deployment availability','在庫・提供状況'],
 loading:['正在查询商家库存…','正在查詢商家庫存…','Checking vendor inventory…','事業者の在庫を照会中…'],
 'in-stock':['商家显示有货','商家顯示有貨','In stock at the provider','事業者表示：在庫あり'],
 'sold-out':['商家显示缺货','商家顯示缺貨','Out of stock at the provider','事業者表示：在庫切れ'],
 low:['商家显示库存紧张','商家顯示庫存緊張','Limited stock at the provider','事業者表示：残りわずか'],
 unreported:['商家当前未列出这项配置的库存','商家目前未列出這項規格的庫存','The vendor has no stock status for this configuration','この構成の在庫表示はありません'],
 offline:['库存接口暂未响应','庫存介面暫未回應','Inventory feed unavailable','在庫サービスから応答がありません'],
 manual:['按机房和配置查看商家订购页','依機房和規格查看商家訂購頁','Choose the region and configuration at the provider','事業者の注文画面で拠点・構成を選択'],
 order:['商家订购信息 ↗','商家訂購資訊 ↗','Ordering information ↗','注文情報 ↗'],
 source:['库存来源 ↗','庫存來源 ↗','Inventory source ↗','在庫の出典 ↗'],
 refresh:['刷新库存','重新整理庫存','Refresh stock','在庫を更新'],
 observed:['读取时间','讀取時間','Observed','照会時刻'],
 interval:['详情打开时每 2 分钟刷新','詳情開啟時每 2 分鐘更新','Refreshes every 2 minutes while open','詳細表示中は2分ごとに更新'],
 local:['在部署后的网站查看自动库存','在部署後的網站查看自動庫存','Open the deployed site for live inventory','公開サイトで自動在庫照会を利用できます']
};
function stockText(key){return stockStrings[key][{sc:0,tc:1,en:2,ja:3}[lang]]}
const offerStrings={
 live:['商家实时报价','商家即時報價','Live provider quote','事業者の最新価格'],archived:['最近一次有效报价','最近一次有效報價','Last recorded provider quote','直近の有効な価格記録'],
 unavailable:['本次未取得报价','本次未取得報價','No quote in this reading','今回の価格は取得できませんでした'],
 fetch:['正在读取商家…','正在讀取商家…','Reading the provider…','事業者に照会中…'],
 quoteStock:['实时报价与库存','即時報價與庫存','Live pricing and stock','最新価格と在庫'],quote:['商家实时报价','商家即時報價','Live provider pricing','事業者の最新価格'],
 year:['商家年价','商家年價','Listed annual price','掲載年額'],quarter:['商家季价','商家季價','Listed quarterly price','掲載四半期価格'],halfyear:['商家半年价','商家半年價','Listed half-year price','掲載半年価格'],
 starting:['套餐月价起','方案月價起','Monthly price from','月額料金から'],
 listed:['商家月价','商家月價','Listed monthly price','掲載月額'],base:['节点基础月价起','節點基本月價起','Node base price from','ノード基本月額から'],
 'base-config':['默认配置月价','預設配置月價','Default configuration per month','初期構成の月額'],
 config:['可选配置范围','可選配置範圍','Selectable configuration range','選択できる構成の範囲'],
 stockQuantity:['商家显示可用数量','商家顯示可用數量','Units listed as available','販売元の表示在庫数'],
 cpu:['处理器','處理器','CPU','CPU'],ram:['内存','記憶體','RAM','メモリ'],disk:['磁盘','磁碟','Storage','ディスク'],
 port:['端口速率','連接埠速率','Port speed','ポート速度'],traffic:['每月流量','每月流量','Monthly transfer','月間転送量'],
 ip:['IP 配置','IP 配置','IP allocation','IP 割当'],route:['商家标示线路','商家標示線路','Route advertised by provider','事業者の公称経路'],
 peak:['峰值','峰值','peak','ピーク'],dedicated:['独享','獨享','dedicated','専有'],shared:['共享','共享','shared','共有'],both:['双向合计','雙向合計','in + out','送受信合算'],
 source:['商家数据 ↗','商家資料 ↗','Provider data ↗','事業者データ ↗'],
 refresh:['重新读取商家','重新讀取商家','Refresh provider data','事業者データを更新']
};
function offerText(k){return offerStrings[k][{sc:0,tc:1,en:2,ja:3}[lang]]}
function quoteCapable(t){return t&&['nnb','vmsilo','mkcloud','backwaves','wasabi','vultr','tamago','bagevm','matrix','prepaid','bwh','akile','isvoro','akko','mhy','greenwhmcs','jsonldoffer','servitro','joysol','atmos','lightcone'].includes(t.family)}
function observationKey(p){return greenPlanKey(p)||getStockKey(p)||(Object.hasOwn(catalogStockTargets,p.id)&&catalogStockTargets[p.id].quoteOnly?p.id:'')||(p.provider.toLowerCase()==='vmsilo'&&Object.hasOwn(quoteOnlyTargets,p.id)?p.id:'')}
function goodQuote(q){
 return q&&typeof q.amount==='string'&&/^\d{1,8}(?:\.\d{1,4})?$/.test(q.amount)&&['CNY','HKD','EUR','USD'].includes(q.currency)&&['month','quarter','halfyear','year'].includes(q.period)&&
 ['listed','base','base-config','starting'].includes(q.basis)&&Number.isFinite(Date.parse(q.checkedAt));
}
function stockQuoteForTerm(q,term){
 if(!goodQuote(q))return null;
 if(!term||q.period===term)return q;
 const rate=Array.isArray(q.billingRates)&&q.billingRates.find(row=>row?.period===term&&row.currency===q.currency);
 if(!rate)return null;
 const selected={...q,amount:rate.amount,period:rate.period};
 return goodQuote(selected)?selected:null;
}
function offerPrice(q){return offerText(q.period==='month'?q.basis:q.period)+' · '+q.currency+' '+q.amount}
function stockCpuMatchesTier(plan,target){
 const sku=billingTierForDisplay(plan)?.sku;
 return typeof sku==='string'&&sku.trim().toLowerCase()===String(target.sku).trim().toLowerCase();
}
function renderOffer(container,q,t,archived=false){
 container.replaceChildren();
 if(!goodQuote(q)){container.append(el('small',offerText('unavailable')));return}
 const price=el('strong',offerPrice(q)),time=new Date(q.checkedAt).toLocaleString(document.documentElement.lang,{hour12:false});
 container.append(el('h4',offerText(archived?'archived':'live')),price);
 appendFx(container,q.amount,q.currency);
 container.append(el('p',stockText('observed')+' '+time));
 if(q.basis==='base')container.append(el('p',offerText('config')));
 const list=el('dl',null,'stock-offer-specs');
 if(Number.isSafeInteger(q.stockQuantity)&&q.stockQuantity>=0)list.append(el('dt',offerText('stockQuantity')),el('dd',String(q.stockQuantity)));
 if(cpuText(q.cpu))list.append(el('dt',tr(cpuCoreLabel(q.cpu))),el('dd',q.cpu));
 const processor=readCpuModel(q,{source:t.priceUrl||t.url,date:q.checkedAt,live:!archived});
 if(processor){
  const value=el('dd',processor.value);
  appendCpuEvidence(value,processor);
  list.append(el('dt',tr(processor.kind)),value);
 }
 for(const key of ['ram','disk','port','traffic','ip','route']){
  if(typeof q[key]!=='string'||!q[key])continue;
  let value=q[key];
  if(key==='route'&&q.access&&q.access!==value)value=q.access+' · '+value;
  if(key==='port'&&['peak','dedicated','shared'].includes(q.portType))value+=' · '+offerText(q.portType);
  if(key==='traffic'&&q.direction==='both')value+=' · '+offerText('both');
  list.append(el('dt',offerText(key)),el('dd',value));
 }
 container.append(list,link(offerText('source'),t.priceUrl||t.url));
}

async function readStockObservation(key,t,signal){
 const resp=await fetch('/api/stock/'+encodeURIComponent(key),{signal,cache:'no-store'});
 if(!resp.ok||!resp.headers.get('content-type')?.includes('application/json'))throw Error('endpoint');
 const data=await resp.json();
 const time=Date.parse(data.checkedAt),age=Date.now()-time;
 if(data.key!==key||data.sku!==t.sku||data.zone!==t.zone||!Number.isFinite(time)||age>300000||age< -60000||!['in-stock','sold-out','low','unreported','offline'].includes(data.state))throw Error('invalid observation');
 return data;
}
function stockLabel(t,state){
 if(t.family==='vultr'&&state==='in-stock')return ({sc:'区域开放部署此规格',tc:'區域開放部署此規格',en:'Plan available for deployment in this region',ja:'この地域で構築を受付中'})[lang];
 if(t.family==='vultr'&&state==='sold-out')return ({sc:'区域未开放此规格',tc:'區域未開放此規格',en:'Plan unavailable for deployment in this region',ja:'この地域では構築を受付停止中'})[lang];
 if(t.family==='nnb'&&state==='in-stock')return ({sc:'节点开放月付订购',tc:'節點開放月付訂購',en:'Node open for monthly orders',ja:'ノードは月額注文受付中'})[lang];
 if(t.family==='nnb'&&state==='sold-out')return ({sc:'节点暂停月付订购',tc:'節點暫停月付訂購',en:'Monthly ordering closed',ja:'月額注文受付停止'})[lang];
 return stockText(t.family==='ava'&&stockStrings['quota-'+state]?'quota-'+state:state)}
function stockHistory(section,key,t){
 const details=el('details',null,'stock-history'),summary=el('summary',stockText('history')),body=el('div');
 details.append(summary,body);section.append(details);
 let ended=false,ctrl=null;
 function stamp(s){const n=Date.parse(s);return Number.isFinite(n)?new Date(n).toLocaleString(document.documentElement.lang,{hour12:false}):'—'}
 async function update(){
  if(ended||ctrl||document.hidden)return;
  ctrl=new AbortController();const timeout=setTimeout(()=>ctrl?.abort(),15000);
  try{
   const r=await fetch('/api/stock-history/'+encodeURIComponent(key),{signal:ctrl.signal,cache:'no-store'});
   if(!r.ok||!r.headers.get('content-type')?.includes('application/json'))throw Error('history');
   const d=await r.json();if(ended)return;
   body.replaceChildren();summary.textContent=stockText('history');
   if(d.installed===false){summary.textContent+=' · '+stockText('notInstalled');return}
   if(d.installed!==true||d.key!==key||d.zone!==t.zone||d.sku!==t.sku||!Number.isInteger(d.periodMinutes)||d.periodMinutes<1)throw Error('identity');
   if(d.latest===null){summary.textContent+=' · '+stockText('awaiting');return}
   const s=d.latest,age=Date.now()-Date.parse(s.checkedAt);
   if(!Number.isFinite(age)||age< -60000||!['in-stock','low','sold-out','offline','unreported'].includes(s.state))throw Error('sample');
   summary.textContent+=' · '+(age>(d.periodMinutes+2)*60000?stockText('stale'):stockText('scheduled'))+' · '+d.periodMinutes+' min';
   body.append(el('p',stockLabel(t,s.state)+' · '+stamp(s.checkedAt)));
   if(quoteCapable(t)&&goodQuote(d.lastOffer)){const archived=el('section',null,'stock-offer');renderOffer(archived,d.lastOffer,t,true);body.append(archived)}
   if(s.confirmedState&&['in-stock','low','sold-out'].includes(s.confirmedState)&&['offline','unreported'].includes(s.state)){
    body.append(el('p',stockText('lastConfirmed')+' · '+stockLabel(t,s.confirmedState)+' · '+stamp(s.confirmedAt)));
   }
   if(s.changedAt)body.append(el('p',stockText('lastChange')+' · '+stamp(s.changedAt)));
   if(!Array.isArray(d.events))throw Error('events');
   const list=el('ol');
   for(const e of d.events.slice(0,5)){
    if(Number.isFinite(Date.parse(e.at))&&['in-stock','low','sold-out'].includes(e.from)&&['in-stock','low','sold-out'].includes(e.to)){
     list.append(el('li',stamp(e.at)+' · '+stockLabel(t,e.from)+' → '+stockLabel(t,e.to)));
    }
   }
   body.append(list.childElementCount?list:el('p',stockText('noHistory')));
  }catch{if(!ended){summary.textContent=stockText('history')+' · '+stockText('historyOffline');body.replaceChildren()}}
  finally{clearTimeout(timeout);ctrl=null}
 }
 details.addEventListener('toggle',()=>{if(details.open)update()});
 return {update,stop(){ended=true;ctrl?.abort()}};
}
let stopStockSession=null;
function renderStock(out,p){
 stopStockSession?.();
 const section=el('section',null,'stock-probe'),title=el('h3',stockText('title')),status=el('strong');
 status.setAttribute('role','status');const links=el('div',null,'linkline');
 links.append(link(stockText('order'),p.url));
 section.append(title,status);out.append(section);
 const key=observationKey(p),t=stockTarget(key);
 if(!t){status.remove();section.append(commerceStockBadge(p),links);return}
 if(t.family==='ava')title.textContent=stockText('quota');
 const quote=quoteCapable(t)?el('div',null,'stock-offer'):null;
 if(quote){title.textContent=offerText(t.quoteOnly?'quote':'quoteStock');section.insertBefore(quote,status);const recorded=out.querySelector('.purchase');if(recorded?.parentElement===out)out.insertBefore(section,recorded)}
 const fixed=t.family==='ovh'?' · 32 GB ECC / 2 × 512 GB NVMe':'';
 section.append(el('p',t.zone.toUpperCase()+' · '+t.sku+fixed,'stock-config'));
 if(!quote||t.priceUrl)links.append(link(stockText('source'),t.url));
 if(location.protocol==='file:'){status.textContent=stockText('local');section.append(links);return}
 const detail=el('small',stockText('interval'),'stock-time');section.append(detail);
 const history=stockHistory(section,key,t);
 const refresh=btn(quote?offerText('refresh'):stockText('refresh'),run,'inline');links.prepend(refresh);section.append(links);
 const dialog=section.closest('dialog');let timer,ctrl,dead=false;
 function stop(){dead=true;history.stop();clearTimeout(timer);ctrl?.abort();dialog?.removeEventListener('close',stop);document.removeEventListener('visibilitychange',visible);stopStockSession=null}
 function visible(){if(!document.hidden&&!dead&&!ctrl)run()}
 async function run(){
  clearTimeout(timer);if(dead||ctrl)return;
  if(!section.isConnected){stop();return}
  if(document.hidden){status.textContent=stockText('loading');return}
  history.update();ctrl=new AbortController();refresh.disabled=true;status.textContent=quote?offerText('fetch'):stockText('loading');section.dataset.stockState='loading';detail.textContent=stockText('interval');
  const timeout=setTimeout(()=>ctrl?.abort(),15000);
  try{
   const data=await readStockObservation(key,t,ctrl.signal);if(dead)return;
   const time=Date.parse(data.checkedAt);
   if(!t.quoteOnly&&['in-stock','sold-out','low'].includes(data.state))commerceLastReadings.set(p.id,{state:data.state,checkedAt:data.checkedAt,source:t.url,quantity:goodQuote(data.offer)?data.offer.stockQuantity:null});
   status.textContent=stockLabel(t,data.state);section.dataset.stockState=data.state;if(quote)renderOffer(quote,stockQuoteForTerm(data.offer,commerceTerm())||data.offer,t);
   detail.textContent=stockText('observed')+' '+new Date(time).toLocaleString(document.documentElement.lang,{hour12:false})+' · '+stockText('interval');
  }catch{if(!dead){status.textContent=stockText('offline');section.dataset.stockState='offline';if(quote)renderOffer(quote,null,t)}}
  finally{clearTimeout(timeout);ctrl=null;if(!dead){refresh.disabled=false;timer=setTimeout(run,120000)}}
 }
 dialog?.addEventListener('close',stop);document.addEventListener('visibilitychange',visible);stopStockSession=stop;run();
}
