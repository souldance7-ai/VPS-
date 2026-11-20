'use strict';
const buyingLabels={
 commercial:['报价与配置','報價與配置','Pricing and hardware','料金・構成'],cpu:['处理器','處理器','Processor','CPU'],ram:['内存','記憶體','Memory','メモリ'],disk:['存储','儲存','Storage','ストレージ'],port:['网络端口','網路埠速','Network port','回線速度'],traffic:['流量额度','流量額度','Transfer allowance','転送量'],orderPage:['在商家官网选择配置','在商家官網選擇配置','Configure at the provider','公式サイトで構成を選択'],priceSource:['商家规格与报价','商家規格與報價','Provider specifications and pricing','公式仕様・料金表'],quoteDate:['报价采集','報價採集','Price recorded','料金確認日'],unknown:['未公开','未公開','Not published','非公開'],ipUnknown:['未声明 IP 类型','未聲明 IP 類型','IP class unspecified','IP 種別の公表なし'],routeUnknown:['未声明优化线路','未聲明優化線路','No premium route stated','優先回線の公表なし'],near:['机房位置','機房位置','Facility location','拠点所在地'],month:['月','月','mo','月'],year:['年','年','yr','年'],hour:['小时','小時','hour','時間'],'24 months':['24 个月','24 個月','24 months','24か月'],'36 months':['36 个月','36 個月','36 months','36か月'],'GPU-hour':['GPU 小时','GPU 小時','GPU-hour','GPU時間'],quarter:['季度','季','quarter','四半期'],monthlyEquivalent:['月折算（按小时计费）','月折算（按小時計費）','mo equivalent (hourly billing)','月換算（時間課金）'],publishedPrice:['有公开价格','有公開價格','Published price','公開価格あり'],fullSpec:['有价格、CPU、内存及端口','有價格、CPU、記憶體及埠速','Price, CPU, RAM and port listed','価格・CPU・メモリ・回線速度あり'],probeOnly:['支持库存探针','支援庫存探針','Live stock feed','在庫連携あり'],shoppingFilter:['报价信息','報價資訊','Buying information','購入情報'],tier:['套餐档位','套餐級別','Plan tier','プラン'],customConfig:['具体规格与价格请在商家页面选择配置或询价。','具體規格與價格請在商家頁面選擇配置或詢價。','Choose a configuration in the provider’s order form or request a quote.','公式の構成フォームで選択するか、見積もりを依頼してください。'],specAvailability:['套餐页面未列出','套餐頁面未列出','Not listed for this plan','プランに記載なし'],notesLabel:['报价条件','報價條件','Billing terms','料金の条件']
};
for(const [key,labels] of Object.entries(buyingLabels))editionLangs.forEach((l,i)=>WORDS[l][key]=labels[i]);
const hardware=['cpu','ram','disk','port','traffic'];
const selectedTiers=new Map();
function activeSpec(p){return p.spec?.tiers?.[selectedTiers.get(p.id)||0] || p.spec}
function published(p){return Boolean(p.spec?.price||p.price)}
function priceText(p,s=activeSpec(p)){if(s?.price){const term=s.term?(buyingLabels[s.term]?tr(s.term):s.term):'';return [s.currency,s.price].filter(Boolean).join(' ')+(term?' / '+term:'')}return val(p.price)}
function purchaseQualifier(p){
 const row=offersByPlan.get(p.id)?.[0];if(!row)return '';if(['historical','estimate'].includes(row.priceBasis))return communityLabel(row.priceBasis);
 if(row.status==='expired'||row.start&&Date.now()<Date.parse(row.start)||row.end&&Date.now()>=Date.parse(row.end)||Date.now()>=communityCalendar(row)[0])return row.regular?communityLabel('regular'):'';
 if(['beforeCode','afterCode'].includes(row.priceBasis))return communityLabel(row.priceBasis)+(row.code?' · '+row.code:'');
 const stage=communityStage(row);return ['limited','checkout'].includes(stage)?communityLabel(stage):'';
}
function showSku(p){return activeSpec(p)?.sku || val(p.plan)}
function specValue(p,k){return val(activeSpec(p)?.[k])}
function shoppingMatch(p){const mode=$('buy-filter').value;if(mode==='price')return published(p);if(mode==='spec')return Boolean(published(p)&&p.spec?.cpu&&p.spec?.ram&&p.spec?.port);if(mode==='probe')return hasStockProbe(p);return true}
function commercialScore(p){return (published(p)?6:0)+(p.spec?.cpu?2:0)+(p.spec?.ram?2:0)+(p.spec?.port?1:0)}
function specSummary(p){const line=el('div',null,'spec-summary');if(published(p)){line.append(el('b',priceText(p)));const cost=monthlyCost(p);if($('order').value&&cost&&activeSpec(p).term!=='month')line.append(el('small',tr('monthMean')+' · '+cost.currency+' '+cost.monthly.toLocaleString(tags[lang],{minimumFractionDigits:2,maximumFractionDigits:2})));const note=purchaseQualifier(p);if(note)line.append(el('small',note,'offer-condition'))}const specs=[specValue(p,'cpu'),specValue(p,'ram'),specValue(p,'port')].filter(Boolean).join(' · ');if(specs)line.append(el('span',specs));if(!published(p))line.append(link(tr('orderPage')+' ↗',p.url));return line}
function showBuying(out,p){
 const section=el('section',null,'purchase'),head=el('div',null,'purchase-heading');head.append(el('h3',tr('commercial')));section.append(head);
 const choices=p.spec?.tiers||[],body=el('div',null,'purchase-body');
 function draw(s){
  body.replaceChildren();const rate=priceText(p,s);if(rate){body.append(el('strong',rate,'purchase-rate'));const note=purchaseQualifier(p);if(note)body.append(el('small',note,'offer-condition'))}
  if(s?.sku)body.append(el('span',s.sku,'sku-name'));
  if(s&&hardware.some(k=>s[k])){const grid=el('dl',null,'hardware');for(const k of hardware){const cell=el('div');cell.append(el('dt',tr(k)),el('dd',val(s[k])||tr('specAvailability')));grid.append(cell)}body.append(grid)}else body.append(el('p',tr('customConfig')));
  if(s?.sourceNote)body.append(el('p',tr('notesLabel')+' · '+val(s.sourceNote),'bill-note'));
  body.append(link((rate||s?.cpu?tr('priceSource'):tr('orderPage'))+' ↗',s?.proof||p.spec?.proof||p.url));
  if(rate)body.append(el('small',tr('quoteDate')+' · '+(s?.price&&p.spec?.date||'2026-11-18'),'spec-date'));
 }
 if(choices.length>1){const select=el('select');select.setAttribute('aria-label',tr('tier'));choices.forEach((s,i)=>select.add(new Option(s.sku,String(i))));select.value=String(selectedTiers.get(p.id)||0);select.onchange=()=>{selectedTiers.set(p.id,+select.value);draw(activeSpec(p));list()};head.append(select)}
 section.append(body);draw(activeSpec(p));const deal=deals[p.deal];if(deal&&stateOf(deal)==='active'){const note=el('div',null,'active-coupon');note.append(el('b',tr('offers')+' · '+(deal.rate||'−20%')),el('p',tr(p.deal+'Terms')),el('small',tr('deadline')+' · '+new Intl.DateTimeFormat(tags[lang],{timeZone:deal.zone,dateStyle:'medium',timeStyle:'short'}).format(new Date(deal.end))+' ('+deal.zone+')'),link(tr('terms')+' ↗',deal.url));if(deal.code)note.append(btn(deal.code+' ⧉',()=>copy(deal.code),'inline'));section.append(note)}out.append(section);
}
