'use strict';

MARKETS.ZZ={sc:'机房未公布',tc:'機房未公布',en:'Location undisclosed',ja:'拠点未公開'};
MARKETS.IS={sc:'冰岛',tc:'冰島',en:'Iceland',ja:'アイスランド'};
MARKETS.IE={sc:'爱尔兰',tc:'愛爾蘭',en:'Ireland',ja:'アイルランド'};
MARKETS.NO={sc:'挪威',tc:'挪威',en:'Norway',ja:'ノルウェー'};
MARKETS.KP={sc:'朝鲜',tc:'北韓',en:'North Korea',ja:'北朝鮮'};
const curatedCatalog=PLANS.slice();
const catalogueCopy={
 sc:{official:'商家目录',tracked:'复查目标间隔',stale:'上次成功读取',known:'可查询商品',pages:'个目录页已读取商品',unparsed:'部分分类暂未能解析',blocked:'部分页面读取受限或暂不可用',noData:'已发现商家页面，等待商品读取',outside:'目前尚无可核对的商家公开目录'},
 tc:{official:'商家目錄',tracked:'複查目標間隔',stale:'上次成功讀取',known:'可查商品',pages:'個目錄頁已讀取商品',unparsed:'部分分類暫未能解析',blocked:'部分頁面讀取受限或暫不可用',noData:'已發現商家頁面，等待商品讀取',outside:'目前尚無可核對的商家公開目錄'},
 en:{official:'Merchant catalogue',tracked:'Target refresh interval',stale:'Last successful read',known:'indexed products',pages:'pages with product reads',unparsed:'Some pages still need a parser',blocked:'Some source pages blocked or unavailable',noData:'Store pages found. Product reads pending.',outside:'No verifiable public storefront yet'},
 ja:{official:'公式ストア',tracked:'目標更新間隔',stale:'前回の取得',known:'掲載商品',pages:'ページの商品データを取得済み',unparsed:'一部ページの形式は解析待ち',blocked:'一部のページは制限または取得不可',noData:'ストアのページを確認済み。商品データ取得待ち。',outside:'検証可能な公開ストアが未確認'}
};
let merchantCatalogMeta={},merchantCatalogRevision=0,merchantCatalogSignature='',merchantCatalogPending=false;
const cleanCatalogSku=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function normalStoreLink(raw){
 try{const u=new URL(raw);if(u.protocol==='https:'&&!u.port&&!u.username&&!u.password&&/^(?:[a-z\d-]+\.)+[a-z]{2,24}$/i.test(u.hostname))return u.href}catch{}
 return '';
}
function normalStoreRow(row){
 if(!row||!/^official-[a-f0-9]{16}$/.test(row.id)||typeof row.provider!=='string'||row.provider.length>120||
  typeof row.sku!=='string'||!row.sku.trim()||row.sku.length>170||!Number.isFinite(Date.parse(row.observedAt)))return null;
 const source=normalStoreLink(row.source);
 if(!source||Date.parse(row.observedAt)>Date.now()+60_000)return null;
 return {...row,source,market:Object.hasOwn(MARKETS,row.market)?row.market:'ZZ'};
}
function catalogueMatchKey(provider,market,sku){return provider+'\n'+market+'\n'+cleanCatalogSku(sku)}
function normalizedYunSku(sku){
 return cleanCatalogSku(sku).replace(/^法[兰蘭]克福/,'frankfurt');
}
function catalogProductKey(plan){
 const sku=plan.spec?.sku||plan.sku||plan.plan;
 if(plan.provider==='YunYoo'&&plan.market==='DE')return catalogueMatchKey(plan.provider,plan.market,normalizedYunSku(sku));
 if(plan.provider==='edgeNAT'&&plan.market==='KR'){
  const koreanSku=/^(?:Korea |韓國 )(G[1-4])(?:\b|\s|$)/i.exec(sku)?.[1];
  if(koreanSku)return catalogueMatchKey(plan.provider,plan.market,koreanSku);
 }
 return catalogueMatchKey(plan.provider,plan.market,sku);
}
function recordOfficialPlan(row,old){
 const date=row.observedAt.slice(0,10),hardwareFields=['cpu','ram','disk','port','traffic','trafficDirection','cpuModel','cpuModels','cpuFamily','virtualization'];
 const spec={...old?.spec,sku:row.sku,proof:row.source,date};
 for(const field of hardwareFields)if(row[field])spec[field]=row[field];
 if(row.cpuModel||row.cpuModels||row.cpuFamily){
  delete spec.cpuModel;delete spec.cpuModels;delete spec.cpuFamily;
  if(row.cpuModel)spec.cpuModel=row.cpuModel;
  if(row.cpuModels)spec.cpuModels=row.cpuModels;
  if(row.cpuFamily)spec.cpuFamily=row.cpuFamily;
  spec.cpuModelScope='official';spec.cpuModelSource=row.source;spec.cpuModelDate=date;
 }
 if(/^\d+(?:\.\d+)?$/.test(row.price||'')&&/^[A-Z]{3}$/.test(row.currency)&&['month','quarter','halfyear','year','hour'].includes(row.term)){
  Object.assign(spec,{price:row.price,currency:row.currency,term:row.term,priceType:row.from?'from':'official'});
  if(old?.spec?.billingRates?.length){
   spec.billingRates=old.spec.billingRates.filter(rate=>rate.term!==row.term);
  }
 }else if(old?.spec?.price){
  for(const field of ['date','proof'])if(old.spec[field])spec[field]=old.spec[field];
 }
 if(Array.isArray(row.billingRates)){
  spec.billingRates=row.billingRates.filter(rate=>rate&&/^\d+(?:\.\d+)?$/.test(rate.price)&&
   /^[A-Z]{3}$/.test(rate.currency)&&['month','quarter','halfyear','year'].includes(rate.term));
 }
 const catalog={stock:['in-stock','sold-out','low'].includes(row.stock)?row.stock:'unreported',
  quantity:Number.isSafeInteger(row.stockQuantity)&&row.stockQuantity>=0?row.stockQuantity:null,
  stale:row.stale===true,observedAt:row.observedAt,source:row.source};
 const order=normalStoreLink(row.orderUrl),sameStore=order&&new URL(order).hostname===new URL(row.source).hostname;
 const aliases=[row.sku,row.family,row.routeName,row.virtualization,row.ipAttribute,new URL(row.source).hostname,old?.spec?.sku,old?.sku].filter(Boolean);
 const nat=row.ipAttribute==='nat'?(row.ipv6?'IPv4 + IPv6 NAT':'IPv4 NAT'):'';
 const notes=old?.notes||(nat?{
  sc:row.virtualization+' · '+nat+'。库存以商家创建实例页面为准。',
  tc:row.virtualization+' · '+nat+'。庫存以商家建立實例頁面為準。',
  en:row.virtualization+' · '+nat+'. Check the merchant’s ordering page for availability.',
  ja:row.virtualization+' · '+nat+'。在庫は公式注文ページで確認できます。'
 }:undefined);
 const name=row.provider==='HostYun'&&row.family?row.family+' · '+row.sku:row.sku;
 return {...old,id:old?.id||row.id,provider:row.provider,sku:row.sku,plan:old?.plan||name,market:row.market,
  city:row.city||old?.city||'',kind:row.kind==='bare'?'bare':'vps',ip:old?.ip||(row.residentialClaim?'residential':'unknown'),notes,
  route:old?.route&&old.route!=='unknown'?old.route:row.routeName?'claimed':'unknown',
  routeName:old?.routeName||row.routeName||'',carriers:old?.carriers||[],
  url:sameStore?order:row.source,proof:old?.proof||row.source,spec,officialCatalog:catalog,ipv4:row.ipv4,ipv6:row.ipv6,
  searchTerms:[...new Set([...(old?.searchTerms||[]),...aliases])]};
}
function applyMerchantCatalog(batch){
 const records=batch.plans.map(normalStoreRow).filter(Boolean);
 const skus=new Map(),unlocated=new Map(),officialClaims=new Map(),byId=new Map(curatedCatalog.map(p=>[p.id,p]));
 const key=catalogProductKey;
 for(const p of curatedCatalog){
  const k=key(p);if(!skus.has(k))skus.set(k,[]);skus.get(k).push(p);
  const alt=catalogueMatchKey(p.provider,'ZZ',p.spec?.sku||p.sku||p.plan);
  if(!unlocated.has(alt))unlocated.set(alt,[]);unlocated.get(alt).push(p);
 }
 for(const row of records){
  const k=key(row);officialClaims.set(k,(officialClaims.get(k)||0)+1);
 }
 const extras=[],handled=new Set();
 for(const row of records){
  if(handled.has(row.id))continue;handled.add(row.id);
  const k=key(row),candidates=skus.get(k)||(row.market==='ZZ'?unlocated.get(k):null)||[];
  const old=officialClaims.get(k)===1&&candidates.length===1?candidates[0]:null;
  const next=recordOfficialPlan(old&&row.market==='ZZ'?{...row,market:old.market}:row,old);
  if(old)byId.set(old.id,next);else extras.push(next);
 }
 PLANS.splice(0,PLANS.length,...byId.values(),...extras);
 merchantCatalogMeta=batch.providers||{};
 merchantCatalogRevision++;
}
if(typeof ATLAS_MERCHANT_SEED!=='undefined'&&Array.isArray(ATLAS_MERCHANT_SEED.plans))applyMerchantCatalog(ATLAS_MERCHANT_SEED);

function appendMerchantCatalogStatus(body,name){
 const info=Object.hasOwn(merchantCatalogMeta,name)?merchantCatalogMeta[name]:null;
 if(!info)return;
 const t=catalogueCopy[lang],text=el('small',null,'merchant-live-status');
 const notices=[];
 if(info.plans){
  notices.push(t.official+' · '+info.plans+' '+t.known+' · '+info.productPages+'/'+info.pages+' '+t.pages);
  if(info.observedAt)notices.push(t.stale+' '+catalogueTime(info.observedAt));
  if(info.periodMinutes)notices.push(t.tracked+' '+info.periodMinutes+' min');
 }else notices.push(info.pages?t.noData:t.outside);
 if(info.blocked||info.unavailable)notices.push(t.blocked+' '+(info.blocked+info.unavailable));
 if(info.unsupported)notices.push(t.unparsed+' '+info.unsupported);
 text.textContent=notices.join(' · ');body.append(text);
}
function catalogueTime(date){
 const time=Date.parse(date);return Number.isFinite(time)?new Intl.DateTimeFormat(tags[lang],{
  timeZone:'Asia/Shanghai',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'
 }).format(time)+' UTC+8':'';
}
function paintOfficialCatalogueStock(box,row){
 const t=catalogueCopy[lang];
 box.replaceChildren();box.dataset.state=row.stale?'historical':row.stock;
 let title=commerceWord(row.stock);
 if(Number.isSafeInteger(row.quantity))title+=' · '+row.quantity+' '+commerceWord('units');
 box.append(el('strong',title,'commerce-stock-state'));
 const source=link((row.stale?t.stale:t.official)+' · '+catalogueTime(row.observedAt),row.source,'commerce-stock-source');
 box.append(source);
}
async function refreshMerchantCatalog(){
 if(merchantCatalogPending||document.hidden||location.protocol==='file:')return;
 merchantCatalogPending=true;
 try{
  const answer=await fetch('/api/stock-history/catalog',{signal:AbortSignal.timeout(15000)});
  if(!answer.ok)return;
  const batch=await answer.json();
  if(batch.schemaVersion!==1||!Array.isArray(batch.plans)||!batch.providers||(!batch.plans.length&&typeof ATLAS_MERCHANT_SEED!=='undefined'))return;
  if(typeof ATLAS_MERCHANT_SEED!=='undefined'){
   const liveProviders=new Set(batch.plans.map(row=>row.provider));
   for(const [provider,info] of Object.entries(ATLAS_MERCHANT_SEED.providers)){
    if(liveProviders.has(provider))continue;
    batch.plans.push(...ATLAS_MERCHANT_SEED.plans.filter(row=>row.provider===provider));
    batch.providers[provider]=info;
   }
  }
  const signature=JSON.stringify([batch.plans,batch.providers]);
  if(signature===merchantCatalogSignature)return;
  merchantCatalogSignature=signature;
  applyMerchantCatalog(batch);
  catalogMarkets.clear();PLANS.forEach(p=>catalogMarkets.add(p.market));
  refreshMerchantIndex();
  const names=new Set(PLANS.map(p=>p.id));
  chosen=chosen.filter(id=>names.has(id));
  renderControls();list();
 }catch{}finally{merchantCatalogPending=false}
}
function startMerchantCatalog(){
 refreshMerchantCatalog();
 setInterval(refreshMerchantCatalog,3*60_000);
 document.addEventListener('visibilitychange',refreshMerchantCatalog);
}
