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
function stockTarget(key){
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
const TTL=120,MAX_DOCUMENT=2500000;
function ovhStatus(data,t){
 if(!Array.isArray(data))return 'unreported';
 const values=data.filter(r=>r?.planCode===t.sku&&r.memory===t.memory&&r.storage===t.storage)
  .flatMap(r=>Array.isArray(r.datacenters)?r.datacenters:[]).filter(r=>r?.datacenter===t.zone).map(r=>r.availability);
 if(!values.length)return 'unreported';
 if(values.every(v=>v==='unavailable'))return 'sold-out';
 if(values.every(v=>typeof v==='string'&&/^(1H(?:-(?:low|high))?|24H|72H|120H|240H|480H|2160H)$/.test(v)))return 'in-stock';
 return 'unreported';
}
function hosthinkStatus(cards,sku){
 const exact=new RegExp('^'+sku+'(?:\\s|$)');
 const matching=cards.map(t=>t.replace(/\s+/g,' ').trim()).filter(t=>exact.test(t)&&!t.match(/\b[A-Z]{3}-\d+\b/g)?.some(code=>code!==sku));
 const statuses=matching.flatMap(t=>[...t.matchAll(/\b(in stock|out of stock)\b/gi)].map(m=>m[1].toLowerCase()));
 if(statuses.length&&statuses.every(s=>s==='in stock'))return 'in-stock';
 if(statuses.length&&statuses.every(s=>s==='out of stock'))return 'sold-out';
 return 'unreported';
}
function webnxStatus(cards){
 const quantities=[];
 for(const row of cards){const found=row.replace(/\s+/g,' ').trim().match(/^\(IP-LA1\) AMD EPYC 9754S, 256GB RAM, 1\.92TB NVMe, 7\.6TB NVMe, 25G\s+(\d+) Available\b/i);if(found)quantities.push(Number(found[1]))}
 if(!quantities.length||new Set(quantities).size!==1)return 'unreported';
 return quantities[0]>0?'in-stock':'sold-out';
}
function pinghebergStatus(heading,product){
 if(heading.trim().toLowerCase()!=='vps argent')return 'unreported';
 const txt=product.replace(/\s+/g,' '),sold=/\bRupture de stock\b/i.test(txt),qty=txt.match(/\b(\d+)\s+disponible(?:\(s\)|s)?\b/i);
 if(sold&&(!qty||Number(qty[1])===0))return 'sold-out';
 if(qty&&!sold)return Number(qty[1])>0?'in-stock':'sold-out';
 return 'unreported';
}
function quantityStatus(values){if(!values.length||new Set(values).size!==1)return 'unreported';return Number(values[0])>0?'in-stock':'sold-out'}
function greenPremiumStatus(headers,target){
 const amounts=[];
 for(const header of headers){
  const text=header.replace(/\s+/g,' ').trim();
  if(text!==target.sku&&!text.startsWith(target.sku+' '))continue;
  const qty=text.slice(target.sku.length).trim().match(/^(\d{1,6}) Available$/i);
  if(!qty)return 'unreported';
  amounts.push(qty[1]);
 }
 return quantityStatus(amounts);
}
function stockQuantityCards(cards,t){
 const prefix=new RegExp('^'+t.sku+'(?: DYN)?\\s+(\\d+)\\s*(?:可用|Available)');
 return quantityStatus(cards.map(s=>s.replace(/\s+/g,' ').trim().match(prefix)?.[1]).filter(Boolean));
}
function boilStatus(panels,t){
 const matches=panels.filter(p=>p.name.replace(/\s+/g,'').toLowerCase()===t.sku.replace(/\s+/g,'').toLowerCase());
 return quantityStatus(matches.flatMap(p=>Array.from(p.body.matchAll(/(?:^|\s)(\d+)\s*(?:可用|Available)(?:\s|$)/gi),m=>m[1])));
}
function avaStatus(text){
 const match=text.replace(/\s+/g,' ').match(/Black Friday\s*[·•|-]\s*VPS Nano\s+11[.,]00\s*€\s*\/\s*year\s*[·•|-]\s*([\d,]+)\s+of\s+1,024\s+left\b/i);
 if(!match||!/^(?:\d{1,3}|1,0(?:[01]\d|2[0-4]))$/.test(match[1]))return 'unreported';
 return Number(match[1].replace(',',''))>0?'in-stock':'sold-out';
}
function dediStatus(cards,target){
 const amounts=[];
 for(const text of cards){
  // Require one complete product wrapper; a neighboring package heading may
  // follow a quantity in the extracted text representation of the entire page.
  const ids=text.match(/(?:\d{8}-)?LAX[.]VPS[.][\w.-]+/gi)||[];
  if(!ids.length||ids.some(id=>id.toLowerCase()!==target.sku.toLowerCase()))continue;
  const values=[...text.matchAll(/\b(\d+)\s+Available\b/gi)];
  for(const [,qty] of values)amounts.push(qty);
 }
 return quantityStatus(amounts);
}
async function htmlStatus(response,t){
 // Stream only human-visible text. A price, checkout link or success status alone never establishes stock.
 const cards=[],greenHeaders=[],active=new Set();let intro='';let heading='',product='',inTitle=false,inProduct=false,suppress=0;
 const ignored={element(e){suppress++;e.onEndTag(()=>suppress--)}};
 const rows={element(e){const row={text:''};active.add(row);e.onEndTag(()=>{active.delete(row);if(row.text.length<11000)cards.push(row.text)})}};
 let greenHeader=null,greenField=null;
 const greenSelector='#product'+(t.productId || 'unused')+' > header';
 const greenSection={element(e){
  if(t.family!=='greencloud'||t.zone!=='SG')return;
  const header={name:[],qty:[]};greenHeader=header;
  e.onEndTag(()=>{
   greenHeader=null;greenField=null;
   if(!header.name.length)return;
   if(header.name.length!==1||header.qty.length!==1){greenHeaders.push(t.sku);return}
   greenHeaders.push(header.name[0].text+' '+header.qty[0].text);
  });
 }};
 function readGreenField(e,key){
  if(!greenHeader)return;
  const field={text:''};greenHeader[key].push(field);greenField=field;e.onEndTag(()=>greenField=null);
 }
 const panels=[];let panel=null,readingHeading=false;
 const couponHeading={element(e){if(t.family!=='boil')return;panel={name:'',body:''};panels.push(panel);readingHeading=true;e.onEndTag(()=>readingHeading=false)}};
 const collector={text(chunk){
  if(suppress)return;
  if(greenField&&greenField.text.length<180)greenField.text+=chunk.text+(chunk.lastInTextNode?' ':'');
  if(t.family==='ava'&&intro.length<1800)intro+=chunk.text+(chunk.lastInTextNode?' ':'');
  if(panel){const part=readingHeading?'name':'body';if(panel[part].length<14000)panel[part]+=chunk.text+(chunk.lastInTextNode?' ':'')}
  for(const row of active)if(row.text.length<11000)row.text+=chunk.text+(chunk.lastInTextNode?' ':'');
  if(inTitle&&heading.length<240)heading+=chunk.text;
  if(inProduct&&product.length<25000)product+=chunk.text+(chunk.lastInTextNode?' ':'');
 }};
 const reader=new HTMLRewriter().on('script',ignored).on('style',ignored).on('li',rows).on('tr',rows).on('header',rows).on('.product',rows).on('.package',rows).on('.product-item',rows).on('[id^="product"]',rows)
  .on(greenSelector,greenSection)
  .on(greenSelector+' > span[id]',{element(e){if(e.getAttribute('id')==='product'+t.productId+'-name')readGreenField(e,'name')}})
  .on(greenSelector+' > span.qty',{element(e){readGreenField(e,'qty')}})
  .on('h3',couponHeading).on('h4',couponHeading).on('h5',couponHeading).on('h6',couponHeading)
  .on('h1',{element(e){inTitle=true;inProduct=true;e.onEndTag(()=>inTitle=false)}})
  .on('h2',{element(){inProduct=false}}).onDocument(collector).transform(response).body.getReader();
 let bytes=0;
 try{for(;;){const {value,done}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>MAX_DOCUMENT){await reader.cancel();throw Error('size')}}}finally{reader.releaseLock()}
 if(t.family==='ava')return avaStatus(intro);
 if(t.family==='dedione')return dediStatus(cards,t);
 if(t.family==='webnx')return webnxStatus(cards);
 if(t.family==='greencloud'&&t.zone==='SG')return greenPremiumStatus(greenHeaders,t);
 if(t.family==='tcs'||t.family==='greencloud')return stockQuantityCards(cards,t);
 if(t.family==='boil')return boilStatus(panels,t);
 return t.family==='hosthink'?hosthinkStatus(cards,t.sku):pinghebergStatus(heading,product);
}
// The two public storefronts expose different inventory semantics.
const recentStorefronts = new Map();
async function readLimitedBytes(stream, limit) {
 if(!stream)throw Error('Missing response body');
 const reader=stream.getReader(),chunks=[];
 let length=0;
 try{
  for(;;){
   const {value,done}=await reader.read();if(done)break;
   length+=value.byteLength;
   if(length>limit){await reader.cancel();throw Error('Storefront response too large')}
   chunks.push(value);
  }
 }finally{reader.releaseLock()}
 const buffer=new Uint8Array(length);let offset=0;
 for(const chunk of chunks){buffer.set(chunk,offset);offset+=chunk.length}
 return buffer;
}
async function storefrontJson(url,{catalog=false}={}){
 const reply=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(7500),headers:{accept:catalog?'application/octet-stream, application/json':'application/json'},cf:{cacheEverything:true,cacheTtl:catalog?300:25}});
 if(!reply.ok)throw Error('Storefront HTTP '+reply.status);
 const type=reply.headers.get('content-type')||'';
 if(/text\/html/i.test(type))throw Error('Unexpected store response');
 const age=Number(reply.headers.get('age')||0);
 if(!catalog&&(!Number.isFinite(age)||age>300))throw Error('Stale stock response');
 let bytes=await readLimitedBytes(reply.body,800000);
 if(catalog&&bytes[0]===0x1f&&bytes[1]===0x8b){
  bytes=await readLimitedBytes(new Response(bytes).body.pipeThrough(new DecompressionStream('gzip')),800000);
 }
 return JSON.parse(new TextDecoder().decode(bytes));
}
async function currentStorefront(family){
 const now=Date.now(),entry=recentStorefronts.get(family);
 if(entry&&entry.expires>now)return entry.data;
 let data;
 if(family==='mkcloud'){
  const inventory=await storefrontJson('https://www.mkcloud.net/index.php?m=newcart&page=getoutofstock');
  if(!Array.isArray(inventory.products)||inventory.count!==inventory.products.length||!inventory.products.every(Number.isSafeInteger)||!Number.isSafeInteger(inventory.bin_parameter)||inventory.bin_parameter<0)throw Error('Invalid stock list');
  const catalog=await storefrontJson('https://www.mkcloud.net/modules/addons/newcart/product_bin.json.gz?param='+inventory.bin_parameter,{catalog:true});
  if(!Array.isArray(catalog.productgroups)||!catalog.productgroups.length)throw Error('Empty product catalog');
  const products=new Map();
  for(const group of catalog.productgroups){
   if(typeof group.slug!=='string'||!Array.isArray(group.products))throw Error('Invalid product group');
   for(const product of group.products){
    if(products.has(product.id))throw Error('Ambiguous product ID');
    products.set(product.id,{group:group.slug,sku:product.slug});
   }
  }
  data={products,sold:new Set(inventory.products)};
 }else{
  const result=await storefrontJson('https://api.nnb.ltd/api/v1/nodes');
  if(result.code!==200||!Array.isArray(result.data?.items))throw Error('Invalid node catalog');
  data=result.data.items;
 }
 recentStorefronts.set(family,{expires:now+25000,data});
 return data;
}
function classifyStorefront(target,data){
 if(target.family==='mkcloud'){
  const p=data.products.get(target.pid);
  if(p?.group!==target.group||p.sku!==target.sku)return 'unreported';
  return data.sold.has(target.pid)?'sold-out':'in-stock';
 }
 const nodes=data.filter(n=>n.id===target.pid&&n.name===target.sku&&n.region===target.region);
 if(nodes.length!==1)return 'unreported';
 const n=nodes[0];
 if(typeof n.orderable!=='boolean'||typeof n.provisionable!=='boolean'||typeof n.monthly_available!=='boolean'||typeof n.status!=='string')return 'unreported';
 if(!n.orderable||!n.monthly_available)return 'sold-out';
 if(n.status==='active'&&n.provisionable)return 'in-stock';
 return 'unreported';
}

async function observe(t){
 if(t.family==="mkcloud"||t.family==="nnb")return classifyStorefront(t,await currentStorefront(t.family));
 const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),7000);
 try{
  const html=['hosthink','pingheberg','webnx','tcs','boil','greencloud','ava','dedione'].includes(t.family);
  let u=new URL(t.url),r;
  for(let i=0;i<3;i++){
   r=await fetch(u.href,{headers:{accept:html?'text/html':'application/json','accept-language':['tcs','boil'].includes(t.family)?'zh-TW':'en'},signal:ctrl.signal,redirect:'manual',cf:{cacheEverything:true,cacheTtl:45}});
   if(![301,302,303,307,308].includes(r.status))break;
   const dest=new URL(r.headers.get('location')||'',u);
   const merchantAlias=t.family==='greencloud'&&dest.origin==='https://greencloudvps.com';
   if((dest.origin!==u.origin&&!merchantAlias)||dest.username||dest.password||!r.headers.get('location'))throw Error('invalid redirect');
   await r.body?.cancel();u=dest;
  }
  const type=r.headers.get('content-type')||'';
  if(!r.ok||!(html?/text\/html/i:/application\/json/i).test(type)||Number(r.headers.get('content-length')||0)>MAX_DOCUMENT)throw Error('invalid response');
  const age=Number(r.headers.get('age')||0);if(!Number.isFinite(age)||age>300)throw Error('stale upstream cache');
  if(html)return await htmlStatus(r,t);
  const data=await r.json();
  if(t.family==='ovh')return ovhStatus(data,t);
  const raw=data?.servers?.[t.sku]?.availability;
  return ({available:'in-stock',scarce:'low',shortage:'sold-out'})[raw]||'unreported';
 }finally{clearTimeout(timeout)}
}
export {stockTarget, observe};
