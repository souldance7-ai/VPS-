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
function getStockKey(p){
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
 starting:['套餐月价起','方案月價起','Monthly price from','月額料金から'],
 listed:['商家月价','商家月價','Listed monthly price','掲載月額'],base:['节点基础月价起','節點基本月價起','Node base price from','ノード基本月額から'],
 'base-config':['默认配置月价','預設配置月價','Default configuration per month','初期構成の月額'],
 config:['可选配置范围','可選配置範圍','Selectable configuration range','選択できる構成の範囲'],
 cpu:['处理器','處理器','CPU','CPU'],ram:['内存','記憶體','RAM','メモリ'],disk:['磁盘','磁碟','Storage','ディスク'],
 port:['端口速率','連接埠速率','Port speed','ポート速度'],traffic:['每月流量','每月流量','Monthly transfer','月間転送量'],
 ip:['IP 配置','IP 配置','IP allocation','IP 割当'],route:['商家标示线路','商家標示線路','Route advertised by provider','事業者の公称経路'],
 peak:['峰值','峰值','peak','ピーク'],dedicated:['独享','獨享','dedicated','専有'],shared:['共享','共享','shared','共有'],both:['双向合计','雙向合計','in + out','送受信合算'],
 source:['商家数据 ↗','商家資料 ↗','Provider data ↗','事業者データ ↗'],
 refresh:['重新读取商家','重新讀取商家','Refresh provider data','事業者データを更新']
};
function offerText(k){return offerStrings[k][{sc:0,tc:1,en:2,ja:3}[lang]]}
function quoteCapable(t){return t&&['nnb','vmsilo','mkcloud','backwaves','wasabi','vultr','tamago'].includes(t.family)}
function observationKey(p){return getStockKey(p)||(p.provider.toLowerCase()==='vmsilo'&&Object.hasOwn(quoteOnlyTargets,p.id)?p.id:'')}
function goodQuote(q){
 return q&&typeof q.amount==='string'&&/^\d{1,8}(?:\.\d{1,4})?$/.test(q.amount)&&['CNY','HKD','EUR','USD'].includes(q.currency)&&q.period==='month'&&
 ['listed','base','base-config','starting'].includes(q.basis)&&Number.isFinite(Date.parse(q.checkedAt));
}
function offerPrice(q){return offerText(q.basis)+' · '+q.currency+' '+q.amount}
function renderOffer(container,q,t,archived=false){
 container.replaceChildren();
 if(!goodQuote(q)){container.append(el('small',offerText('unavailable')));return}
 const price=el('strong',offerPrice(q)),time=new Date(q.checkedAt).toLocaleString(document.documentElement.lang,{hour12:false});
 container.append(el('h4',offerText(archived?'archived':'live')),price,el('p',stockText('observed')+' '+time));
 if(q.basis==='base')container.append(el('p',offerText('config')));
 const list=el('dl',null,'stock-offer-specs');
 for(const key of ['cpu','ram','disk','port','traffic','ip','route']){
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
  ctrl=new AbortController();const timeout=setTimeout(()=>ctrl?.abort(),10000);
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
 if(!t){status.textContent=stockText('manual');section.append(links);return}
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
  const timeout=setTimeout(()=>ctrl?.abort(),10000);
  try{
   const data=await readStockObservation(key,t,ctrl.signal);if(dead)return;
   const time=Date.parse(data.checkedAt);
   status.textContent=stockLabel(t,data.state);section.dataset.stockState=data.state;if(quote)renderOffer(quote,data.offer,t);
   detail.textContent=stockText('observed')+' '+new Date(time).toLocaleString(document.documentElement.lang,{hour12:false})+' · '+stockText('interval');
  }catch{if(!dead){status.textContent=stockText('offline');section.dataset.stockState='offline';if(quote)renderOffer(quote,null,t)}}
  finally{clearTimeout(timeout);ctrl=null;if(!dead){refresh.disabled=false;timer=setTimeout(run,120000)}}
 }
 dialog?.addEventListener('close',stop);document.addEventListener('visibilitychange',visible);stopStockSession=stop;run();
}
