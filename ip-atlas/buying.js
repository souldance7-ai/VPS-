'use strict';
const buyingLabels={
 providerRate:['官网公布的价格','官網公布的價格','Provider-listed price','公式掲載価格'],
 reviewedRate:['评测记录的价格','評測記錄的價格','Price from a review','レビュー掲載価格'],
 liveRateFilter:['可即时查询官网价格','可即時查詢官網價格','Live provider price available','公式価格のリアルタイム照会'],
 cpuCores:['CPU 核心','CPU 核心','CPU cores','CPU コア'],
 cpuModel:['CPU 型号','CPU 型號','CPU model','CPU 型番'],
 cpuModels:['商家列出的候选型号','商家列出的候選型號','Possible CPU models','事業者記載の候補型番'],
 cpuFamily:['处理器系列','處理器系列','CPU family','CPU シリーズ'],
 cpuUnknown:['暂无可核对型号','尚無可核對型號','No verified model available','確認できる型番なし'],
 cpuOfficial:['商家规格','商家規格','Provider specification','事業者の公表仕様'],
 cpuCatalog:['目录记录','目錄紀錄','Catalog record','カタログ記録'],
 cpuSample:['样本实测','樣本實測','Sample measurement','サンプル実測'],
 cpuLive:['本次商家探针','本次商家探針','Live provider observation','事業者の今回の照会結果'],
 localPriceSource:['该报价的原始来源','該報價的原始來源','Source of this price','この料金の掲載元'],
 diskType:['存储类型','儲存類型','Storage type','ストレージの種類'],
 downlink:['下行带宽','下行頻寬','Download bandwidth','下り帯域'],
 uplink:['上行带宽','上行頻寬','Upload bandwidth','上り帯域'],
 monthlyTraffic:['每月流量上限','每月流量上限','Monthly transfer limit','月間転送量上限'],
 trafficDirection:['流量计费方向','流量計費方向','Metered direction','転送量の計測方向'],
 transferBoth:['双向合计','雙向合計','Upload + download','上り・下り合算'],
 transferOut:['仅出站','僅出站','Outbound only','送信のみ'],
 transferIn:['仅入站','僅入站','Inbound only','受信のみ'],
 transferOne:['单向（未注明哪一向）','單向（未註明哪一向）','One way (direction unspecified)','片方向（計測方向不明）'],
 commercial:['报价与配置','報價與配置','Pricing and hardware','料金・構成'],cpu:['处理器','處理器','Processor','CPU'],ram:['内存','記憶體','Memory','メモリ'],disk:['存储','儲存','Storage','ストレージ'],port:['网络端口','網路埠速','Network port','回線速度'],traffic:['流量额度','流量額度','Transfer allowance','転送量'],orderPage:['在商家官网选择配置','在商家官網選擇配置','Configure at the provider','公式サイトで構成を選択'],priceSource:['商家规格与报价','商家規格與報價','Provider specifications and pricing','公式仕様・料金表'],quoteDate:['报价采集','報價採集','Price recorded','料金確認日'],unknown:['未公开','未公開','Not published','非公開'],ipUnknown:['未声明 IP 类型','未聲明 IP 類型','IP class unspecified','IP 種別の公表なし'],routeUnknown:['未声明优化线路','未聲明優化線路','No premium route stated','優先回線の公表なし'],near:['机房位置','機房位置','Facility location','拠点所在地'],month:['月','月','mo','月'],year:['年','年','yr','年'],hour:['小时','小時','hour','時間'],'24 months':['24 个月','24 個月','24 months','24か月'],'36 months':['36 个月','36 個月','36 months','36か月'],'GPU-hour':['GPU 小时','GPU 小時','GPU-hour','GPU時間'],quarter:['季度','季','quarter','四半期'],monthlyEquivalent:['月折算（按小时计费）','月折算（按小時計費）','mo equivalent (hourly billing)','月換算（時間課金）'],publishedPrice:['有公开价格','有公開價格','Published price','公開価格あり'],fullSpec:['有价格、CPU、内存及端口','有價格、CPU、記憶體及埠速','Price, CPU, RAM and port listed','価格・CPU・メモリ・回線速度あり'],probeOnly:['支持库存探针','支援庫存探針','Live stock feed','在庫連携あり'],shoppingFilter:['报价信息','報價資訊','Buying information','購入情報'],tier:['套餐档位','套餐級別','Plan tier','プラン'],customConfig:['具体规格与价格请在商家页面选择配置或询价。','具體規格與價格請在商家頁面選擇配置或詢價。','Choose a configuration in the provider’s order form or request a quote.','公式の構成フォームで選択するか、見積もりを依頼してください。'],specAvailability:['套餐页面未列出','套餐頁面未列出','Not listed for this plan','プランに記載なし'],notesLabel:['报价条件','報價條件','Billing terms','料金の条件']
};
for(const [key,labels] of Object.entries(buyingLabels))editionLangs.forEach((l,i)=>WORDS[l][key]=labels[i]);
const hardware=['cpu','cpuModel','ram','disk','diskType','port','downlink','uplink','traffic','monthlyTraffic','trafficDirection'];
const selectedTiers=new Map();
function activeSpec(p){return billingSpecForDisplay(p)}

function cpuText(value){
 if(typeof value!=='string')return '';
 const text=value.trim().replace(/\s+/g,' ');
 return text.length<=120?text:'';
}
function cpuCoreLabel(value){
 const text=cpuText(value);
 return /^\d+(?:\.\d+)?\s*(?:[×x]\s*)?(?:vcpus?|cpus?|cores?|核(?:心)?|コア)(?:\s*(?:\+|\/|·)\s*\d+\s*(?:threads?|线程|執行緒|スレッド))?$/i.test(text)?'cpuCores':'cpu';
}
function readCpuModel(spec,{source,date,live=false}={}){
 const models=Array.isArray(spec?.cpuModels)?[...new Set(spec.cpuModels.map(cpuText).filter(Boolean))].slice(0,8):[];
 const model=cpuText(spec?.cpuModel),family=cpuText(spec?.cpuFamily);
 const kind=models.length?'cpuModels':model?'cpuModel':family?'cpuFamily':'';
 if(!kind)return null;
 const scope=spec.cpuModelScope;
 const status=scope==='sample'?'cpuSample':scope==='catalog'?'cpuCatalog':live?'cpuLive':scope==='official'?'cpuOfficial':'';
 return {kind,value:models.length?models.join(' / '):model||family,status,
  source:spec.cpuModelSource||source,date:spec.cpuModelDate||date};
}
function cpuModelDateText(input){
 if(typeof input!=='string'||!Number.isFinite(Date.parse(input)))return '';
 if(/^\d{4}-\d{2}-\d{2}$/.test(input))return input;
 return new Intl.DateTimeFormat(tags[lang],{dateStyle:'medium',timeStyle:'short'}).format(new Date(input));
}
function appendCpuEvidence(node,data){
 const date=cpuModelDateText(data.date),source=communityHref(data.source);
 if(!data.status&&!date&&!source)return;
 const note=el('small',null,'cpu-evidence');
 const label=data.status?tr(data.status):tr('source');
 if(source)note.append(link(label+' ↗',source));else if(data.status)note.append(label);
 if(date)note.append((note.childNodes.length?' · ':'')+date);
 node.append(note);
}
function paintCpuSummary(summary,plan,quote){
 const data=quote||readCpuModel(activeSpec(plan));
 summary.replaceChildren();
 summary.hidden=!data;
 if(!data)return;
 summary.append(el('small',tr(data.kind),'cpu-caption'),el('span',data.value));
 if(data.status==='cpuSample'||data.status==='cpuLive'||data.status==='cpuCatalog'){
  summary.append(el('small',tr(data.status),'cpu-caption'));
 }
}
function purchaseHardware(spec){
 const grid=el('dl',null,'hardware'),data=readCpuModel(spec);
 for(const key of hardware){
  const cell=el('div');
  if(key==='cpuModel'){
   const value=el('dd',data?.value||tr('cpuUnknown'));
   if(data)appendCpuEvidence(value,data);
   cell.append(el('dt',tr(data?.kind||key)),value);
  }else{
   const value=hardwareValue(spec,key);
   cell.append(el('dt',tr(key==='cpu'?cpuCoreLabel(value):key)),el('dd',value||tr('specAvailability')));
  }
  grid.append(cell);
 }
 return grid;
}
function published(p){return Boolean(activeSpec(p)?.price||p.price)}
function priceText(p,s=activeSpec(p)){if(s?.price){const term=s.term?((buyingLabels[s.term]||billingLabels[s.term])?tr(s.term):s.term):'';return (s.priceType==='from'?quickWord('fromPrice')+' ':'')+[s.currency,s.price].filter(Boolean).join(' ')+(term?' / '+term:'')}return val(p.price)}
function priceEvidence(p,s=activeSpec(p)){
 const type=s?.priceType||p.spec?.priceType,proof=s?.proof||p.spec?.proof;
 const snapshot={type:type==='review'?'review':proof?'provider':'unknown',proof,date:s?.date||p.spec?.date};
 if(!s?.price||type==='review'||type==='official')return snapshot;
 for(const row of offersByPlan.get(p.id)||[]){
  if(row.currency!==s.currency||row.term!==s.term||p.spec?.tiers?.length&&row.sku!==s.sku)continue;
  const amount=Number(s.price),stage=communityStage(row);
  const recorded=row.price!=null&&Number(row.price)===amount;
  const regular=row.regular!=null&&Number(row.regular)===amount;
  if(!Number.isFinite(amount)||!recorded&&!regular)continue;
  if(stage==='expired'||stage==='upcoming'||Date.now()>=communityCalendar(row)[0]){
   if(regular)return {...snapshot,qualifier:communityLabel('regular')};
   continue;
  }
  if(!recorded)continue;
  if(['historical','estimate'].includes(row.priceBasis))return {
   type:row.priceBasis,qualifier:communityLabel(row.priceBasis),proof:row.thread||proof,date:row.quotedAt||row.observed
  };
  if(['beforeCode','afterCode'].includes(row.priceBasis))return {
   type:'offer',qualifier:communityLabel(row.priceBasis)+(row.code?' · '+row.code:''),proof:row.thread||proof,
   date:row.quotedAt||row.observed
  };
  if(['limited','checkout'].includes(stage))return {...snapshot,qualifier:communityLabel(stage)};
 }
 return snapshot;
}
function purchaseQualifier(p,s=activeSpec(p)){
 const basis=priceEvidence(p,s);
 if(basis.qualifier)return basis.qualifier;
 if(basis.type==='review')return quickWord('reviewPrice');
 return basis.type==='provider'?tr('providerRate'):'';
}
function showSku(p){return activeSpec(p)?.sku || val(p.plan)}
function hardwareValue(spec,key){
 if(!spec)return '';
 if(key==='diskType'){
  if(spec.diskType)return val(spec.diskType);
  const text=val(spec.disk);
  return [...new Set((String(text).match(/NVMe|SATA SSD|SSD|HDD|SAS/gi)||[]).map(value=>value.toUpperCase()))].join(' + ');
 }
 const allowance=val(spec.traffic);
 if(key==='monthlyTraffic')return val(spec.monthlyTraffic)||(/(?:\/\s*(?:月|mo\b|month\b)|\bmonthly\b|\bper month\b|每月|月間)/i.test(allowance)?allowance:'');
 if(key==='trafficDirection'){
  const direction=spec.trafficDirection||
   (/双向|雙向|in\s*\+\s*out|up\s*\+\s*down|two.?way|bidirectional/i.test(allowance)?'both':
    /\boutbound\b|出站|出方向/.test(allowance)?'outbound':
    /\binbound\b|入站|入方向/.test(allowance)?'inbound':/单向|單向|one.?way/i.test(allowance)?'one-way':'');
  const label={both:'transferBoth',outbound:'transferOut',inbound:'transferIn','one-way':'transferOne'}[direction];
  return label?tr(label):'';
 }
 return val(spec[key]);
}
function specValue(p,k){return hardwareValue(activeSpec(p),k)}
function shoppingMatch(p){
 const mode=$('buy-filter').value,s=activeSpec(p);
 if(mode==='price')return published(p);
 if(mode==='provider'||mode==='review')return published(p)&&priceEvidence(p,s).type===mode;
 if(mode==='spec')return Boolean(published(p)&&s?.cpu&&s?.ram&&s?.port);
 if(mode==='probe')return hasStockProbe(p);
 if(mode==='live-rate'){const key=observationKey(p);return Boolean(key&&quoteCapable(stockTarget(key)))}
 return true;
}
function commercialScore(p){return (published(p)?6:0)+(p.spec?.cpu?2:0)+(p.spec?.ram?2:0)+(p.spec?.port?1:0)}
function specSummary(p){
 const line=el('div',null,'spec-summary');
 if(published(p)){
  const spec=activeSpec(p),cost=monthlyCost(p);
  line.append(el('b',priceText(p)));
  appendFx(line,spec?.price,spec?.currency);
  if($('order').value&&cost&&activeSpec(p).term!=='month')line.append(el('small',tr('monthMean')+' · '+cost.currency+' '+cost.monthly.toLocaleString(tags[lang],{minimumFractionDigits:2,maximumFractionDigits:2})));
  const note=purchaseQualifier(p);if(note)line.append(el('small',note,'offer-condition'));
 }
 const specs=['cpu','ram','disk','port','traffic'].map(k=>specValue(p,k)).filter(Boolean).join(' · ');
 if(specs)line.append(el('span',specs));
 const cpu=el('div',null,'cpu-summary');
 paintCpuSummary(cpu,p);
 line.append(cpu);
 if(!published(p))line.append(link(tr('orderPage')+' ↗',p.url));
 return line;
}
function showBuying(out,p){
 const section=el('section',null,'purchase'),head=el('div',null,'purchase-heading');head.append(el('h3',tr('commercial')));section.append(head);
 const choices=p.spec?.tiers||[],body=el('div',null,'purchase-body');
 function draw(s){
  body.replaceChildren();const rate=priceText(p,s),basis=priceEvidence(p,s);if(rate){body.append(el('strong',rate,'purchase-rate'));appendFx(body,s?.price,s?.currency);const note=purchaseQualifier(p,s);if(note)body.append(el('small',note,'offer-condition'))}
  if(s?.sku)body.append(el('span',s.sku,'sku-name'));
  if(s&&(hardware.some(k=>s[k])||readCpuModel(s)))body.append(purchaseHardware(s));
  else body.append(el('p',tr('customConfig')));
  if(typeof appendGreenCloudQuotePanel!=='function' || !appendGreenCloudQuotePanel(body,p,s))appendBillingRates(body,p);
  if(s?.sourceNote)body.append(el('p',tr('notesLabel')+' · '+val(s.sourceNote),'bill-note'));
  const sourceLabel=basis.type==='review'?quickWord('reviewSource'):basis.type==='provider'?tr('priceSource'):tr('localPriceSource');
  body.append(link((rate||s?.cpu?sourceLabel:tr('orderPage'))+' ↗',basis.proof||p.url));
  if(rate&&basis.date)body.append(el('small',tr('quoteDate')+' · '+basis.date,'spec-date'));
 }
 if(choices.length>1){const select=el('select');select.setAttribute('aria-label',tr('tier'));choices.forEach((s,i)=>{if(!billingSelection()||billingSupports(p,s,billingSelection()))select.add(new Option(s.sku,String(i)))});select.value=String(choices.indexOf(billingTierForDisplay(p)));select.onchange=()=>{selectedTiers.set(p.id,+select.value);draw(activeSpec(p));list();document.dispatchEvent(new CustomEvent('atlas:billing-change',{detail:{planId:p.id,term:activeSpec(p)?.term}}))};head.append(select)}
 section.append(body);draw(activeSpec(p));const deal=deals[p.deal];if(deal&&!deal.code&&stateOf(deal)==='active'){const note=el('div',null,'active-coupon');note.append(el('b',tr('offers')+' · '+(deal.rate||'−20%')),el('p',tr(p.deal+'Terms')),el('small',tr('deadline')+' · '+new Intl.DateTimeFormat(tags[lang],{timeZone:deal.zone,dateStyle:'medium',timeStyle:'short'}).format(new Date(deal.end))+' ('+deal.zone+')'),link(tr('terms')+' ↗',deal.url));if(deal.code)note.append(btn(deal.code+' ⧉',()=>copy(deal.code),'inline'));section.append(note)}out.append(section);
}
