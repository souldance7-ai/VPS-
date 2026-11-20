'use strict';
const communityText={
 configured:['按配置询价','依規格詢價','Configured pricing','構成ごとの料金'],tgSource:['频道原帖','頻道原帖','Original channel post','チャンネル原文'],rateSource:['商家产品资料','商家產品資料','Provider documentation','公式製品情報'],offerIndex:['来源与套餐报价','來源與方案報價','Sourced plan prices','情報源・プラン料金'],
 historical:['历史参考价','歷史參考價','Historical reference price','過去の参考価格'],estimate:['配置估算价','規格估算價','Configuration estimate','構成の概算料金'],quotedOn:['历史报价日期','歷史報價日期','Original quote date','当時の料金確認日'],newsOn:['消息日期','消息日期','Reported on','投稿の日付'],portal:['商家购买入口','商家購買入口','Provider checkout','公式注文窓口'],
 standalone:['查看套餐库存','查看套餐庫存','Check plan stock','プランの在庫を照会'],shortlist:['商家选集','商家選集','Provider shortlist','事業者一覧記事'],dateOnly:['仅公布日期','僅公布日期','date only','日付のみ公表'],beforeCode:['用码前价格','用碼前價格','Before coupon','コード適用前'],afterCode:['用码后价格','用碼後價格','After coupon','コード適用後'],officialPrice:['商家公布价格','商家公布價格','Provider price','公式表示価格'],title:['论坛与评测报价','論壇與評測報價','Community offer index','フォーラム・レビュー価格表'],
 matches:['这款方案的论坛与评测记录','這款方案的論壇與評測紀錄','Community coverage for this plan','このプランの掲載記録'],
 records:['条记录','筆紀錄','records','件'],sources:['个来源','個來源','sources','出典'],search:['商家、配置、线路或优惠码','商家、配置、線路或優惠碼','Provider, specs, route or code','事業者・仕様・回線・コード'],
 kind:['产品类型','產品類型','Product','製品種別'],vps:['VPS','VPS','VPS','VPS'],bare:['物理独服','實體獨服','Dedicated server','専用サーバー'],
 stock:['库存信息','庫存資訊','Inventory','在庫情報'],probe:['支持实时查询','支援即時查詢','Live check available','リアルタイム照会対応'],
 region:['地区','地區','Location','地域'],source:['信息来源','資訊來源','Source','出典'],state:['活动状态','活動狀態','Offer status','掲載区分'],
 all:['全部','全部','All','すべて'],offer:['活动期内','活動期間','Within offer period','キャンペーン期間中'],
 limited:['限量活动','限量活動','Quota limited','数量限定'],checkout:['优惠需在结账确认','優惠需在結帳確認','Confirm offer at checkout','決済画面で価格確認'],
 upcoming:['已预告','已預告','Announced','予告'],expired:['已结束','已結束','Ended','終了'],catalog:['公开报价','公開報價','Published pricing','公開価格'],
 price:['列示价格','列示價格','Listed price','掲載価格'],reference:['商家报价页','商家報價頁','Provider price page','公式料金表'],
 historicalPrice:['已结束活动报价','已結束活動報價','Past offer price','終了時の掲載価格'],
 announcedPrice:['预告报价','預告報價','Announced price','予告価格'],
 regular:['活动前价格','活動前價格','Regular price','通常料金'],renewal:['续费价格','續費價格','Renewal price','更新料金'],
 notRenewal:['条款未列明','條款未列明','Not stated in terms','条件に記載なし'],
 observed:['资料日期','資料日期','Sources checked','出典確認日'],time:['按浏览器时区','依瀏覽器時區','browser time zone','ブラウザーのタイムゾーン'],
 starts:['开始','開始','Starts','開始'],ends:['截止','截止','Ends','終了'],coupon:['优惠码','優惠碼','Coupon','クーポン'],
 sourcePost:['讨论原文','討論原文','Forum thread','投稿原文'],sourceReview:['评测或报道','評測或報導','Review or article','レビュー・記事'],
 sourceIndex:['来源栏目','來源欄目','Source index','出典の一覧'],terms:['商家条款','商家條款','Provider terms','公式条件'],
 locationProof:['机房与配置资料','機房與配置資料','Location and specification source','拠点・仕様の資料'],order:['商家产品页','商家產品頁','Provider product page','公式製品ページ'],
 bonusTerms:['商家赠送流量条款','商家贈送流量條款','Provider bandwidth bonus terms','公式の通信量特典条件'],
 sbForum:['烧饼论坛','燒餅論壇','SB Forum','SB フォーラム'],
 drawer:['目录规格与库存','目錄規格與庫存','Directory specs and stock','図鑑の仕様・在庫'],empty:['没有符合条件的记录。','沒有符合條件的紀錄。','No records match these filters.','この条件に一致する記録はありません。'],
 month:['月','月','mo','月'],year:['年','年','yr','年'],quarter:['季度','季','quarter','四半期'],hour:['小时','小時','hour','時間'],
 codeCopy:['复制优惠码','複製優惠碼','Copy coupon','コードをコピー'],datesUnknown:['截止依商家公告或额度','截止依商家公告或額度','End date subject to provider terms or quota','終了は事業者の条件・配布枠による']
};
const communityStates=['offer','limited','checkout','upcoming','catalog','configured','estimate','historical','expired'];
const communityFilters={search:'',region:'',source:'',state:'',kind:'',stock:''};
const communityOpenRecords=new Set();
let communityTimer;
function communityLabel(key){
 const words=communityText[key];
 return words?words[{sc:0,tc:1,en:2,ja:3}[lang]]:key;
}
function communityCalendar(row){
 const date=!row.end&&/^\d{4}-\d{2}-\d{2}$/.test(row.endDate||'')?Date.parse(row.endDate):NaN;
 // A date without a time zone can end anywhere from UTC+14 to UTC−12.
 return [date+10*3600000,date+36*3600000];
}
function communityStage(row,now=Date.now()){
 const starts=Date.parse(row.start),ends=Date.parse(row.end);
 const [uncertain,finished]=communityCalendar(row);
 if(row.status==='expired'||Number.isFinite(ends)&&ends<=now||now>=finished)return 'expired';
 if(Number.isFinite(starts)&&starts>now)return 'upcoming';
 if(row.priceBasis==='historical')return 'historical';
 if(row.priceBasis==='estimate')return 'estimate';
 if(row.manualCheckout&&row.price==null)return 'configured';
 if(row.status==='catalog')return 'catalog';
 if(now>=uncertain)return 'checkout';
 if(row.status==='limited')return 'limited';
 if(row.status==='upcoming'&&!Number.isFinite(starts))return 'upcoming';
 return Number.isFinite(ends)||Number.isFinite(finished)?'offer':'checkout';
}
function communityAmount(amount,row,period=true){
 if(amount===undefined||amount===null||amount==='')return '';
 let raw=typeof amount==='object'?val(amount):String(amount);
 const numeric=/^[\d,.]+(?:\s*\+)?$/.test(raw);
 if(!numeric)return raw;
 const suffix=period&&row.term?' / '+communityLabel(row.term):'';
 return (row.currency?row.currency+' ':'')+raw+suffix;
}
function communityPlace(code){
 if(MARKETS[code])return market(code);
 if(/^[A-Z]{2}$/.test(code))return new Intl.DisplayNames([tags[lang]],{type:'region'}).of(code);
 return code;
}
function communityCities(row){
 const places=(row.markets||[]).map(communityPlace);
 if(row.city){const place=typeof row.city==='object'?val(row.city):city(row);if(place&&!places.includes(place))places.push(place)}
 return places.join(' / ');
}
function communityDate(raw){
 if(!raw)return '';
 if(/^\d{4}-\d{2}-\d{2}$/.test(raw))return raw;
 const date=new Date(raw);if(!Number.isFinite(+date))return String(raw);
 return new Intl.DateTimeFormat(tags[lang],{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(date);
}
function communityHref(url){
 try{const parsed=new URL(url);return ['https:','http:'].includes(parsed.protocol)?parsed.href:''}catch{return ''}
}
function communitySources(row,node){
 const seen=new Set();
 const add=(name,value)=>{const url=communityHref(value);if(url&&!seen.has(url)){seen.add(url);node.append(link(name+' ↗',url))}};
 for(const item of [row,...(row.alsoThreads||[])]){
  const href=communityHref(item.thread);if(!href)continue;
  const path=new URL(href).pathname;
  let type='sourcePost';
 if(new URL(href).hostname==='t.me')type='tgSource';
 else if(new URL(href).hostname==='vps.taipei')type='rateSource';
  if(item.sourceScope==='shortlist'||item.source==='D-VPS'&&path==='/t/694/')type='shortlist';
  else if(path==='/'||/^\/(categories|go)\//.test(path))type='sourceIndex';
  else if(item.source==='DigVPS'||item.source==='D-VPS'&&!/\/(status|t)\//.test(path))type='sourceReview';
  add(communitySourceLabel(item.source)+' · '+communityLabel(type),href);
 }
 if(row.checkout)add(communityLabel('portal'),row.checkout);
 add(communityLabel('order'),row.url);add(communityLabel('terms'),row.official);add(communityLabel('locationProof'),row.regionProof);
 add(communityLabel('bonusTerms'),row.bonusSource);
}
function communitySourceNames(row){return [...new Set([row,...(row.alsoThreads||[])].map(s=>s.source).filter(Boolean))]}
function communitySourceLabel(source){return source==='SB'?communityLabel('sbForum'):source}
function communityHasProbe(row,region){
 if(typeof getStockKey!=='function')return false;
 const places=(row.markets||[]).filter(code=>!region||code===region);
 if(places.some(code=>getStockKey({...row,market:code})))return true;
 return (row.planIds||[]).some(id=>{const p=PLANS.find(plan=>plan.id===id);return p&&(!region||p.market===region)&&getStockKey(p)});
}
function communityPriceLabel(row){
 if(['historical','estimate'].includes(row.priceBasis))return communityLabel(row.priceBasis);
 if(row.priceBasis==='portal')return communityLabel('configured');
 const stage=communityStage(row),basis=({beforeCode:'beforeCode',afterCode:'afterCode',official:'officialPrice'})[row.priceBasis];
 const phase=stage==='expired'?'historicalPrice':stage==='upcoming'?'announcedPrice':'';
 if(phase)return communityLabel(phase)+(basis&&basis!=='officialPrice'?' · '+communityLabel(basis):'');
 return communityLabel(basis||'price');
}
function openCommunityStock(row,marketCode){
 const p={...row,market:marketCode};if(!getStockKey(p))return;
 const drawer=$('drawer');if(drawer.open)return;
 const out=$('dialog-body'),title=el('h2',row.provider+' · '+val(row.plan));title.id='dialog-title';out.replaceChildren(title);drawer.setAttribute('aria-labelledby',title.id);
 modal=null;drawer.showModal();renderStock(out,p);out.append(communityDetails(row,true));animateDialogOpen();
}
function communityDetails(row,inDrawer){
 const body=el('div',null,'community-detail'),specs=el('dl',null,'community-specs');
 const fields=[
  [communityLabel('kind'),row.kind&&communityLabel(row.kind)],
  [communityPriceLabel(row),communityAmount(row.price,row)],
  [communityLabel('regular'),String(row.regular)!==String(row.price)&&communityAmount(row.regular,row)],
  [communityLabel('renewal'),communityAmount(row.renewal,row)||communityLabel('notRenewal')],
  ...['cpu','ram','disk','port','traffic'].map(k=>[tr(k),val(row[k])]),
  [tr('route'),val(row.routeName)]
 ];
 for(const [label,value] of fields){if(!value)continue;const entry=el('div');entry.append(el('dt',label),el('dd',value));specs.append(entry)}
 body.append(specs);
 if(row.conditions)body.append(el('p',val(row.conditions)));
 const dates=el('div',null,'community-dates');
 for(const [k,raw] of [['observed',row.observed],['starts',row.start],['ends',row.end]])if(raw){const t=el('time',communityLabel(k)+' · '+communityDate(raw));t.dateTime=raw;dates.append(t)}
 for(const [name,raw] of [['quotedOn',row.quotedAt||row.quoteDate],['newsOn',row.publishedAt||row.postDate]])if(raw&&raw!==row.observed){const time=el('time',communityLabel(name)+' · '+communityDate(raw));time.dateTime=raw;dates.append(time)}
 if(row.endDate&&!row.end){const t=el('time',communityLabel('ends')+' · '+row.endDate+' ('+communityLabel('dateOnly')+')');t.dateTime=row.endDate;dates.append(t)}
 if(!row.end&&!row.endDate&&row.status!=='catalog'&&row.status!=='expired')dates.append(el('span',communityLabel('datesUnknown')));
 body.append(dates);
 if(row.code){
  const usable=['offer','checkout','limited'].includes(communityStage(row));
  const coupon=usable?btn(row.code+' ⧉',()=>{
   if(!['offer','checkout','limited'].includes(communityStage(row))){toast(communityLabel(communityStage(row)));renderCommunity();return}
   copy(row.code);
  },'community-code'):el('span',row.code,'community-code');
  body.append(el('small',communityLabel('coupon')+'  '),coupon);
  if(usable)coupon.setAttribute('aria-label',communityLabel('codeCopy')+' '+row.code);
 }
 const actions=el('div',null,'community-actions');communitySources(row,actions);
 if(!inDrawer){
  const ids=[...new Set(row.planIds||[])].filter(id=>PLANS.some(p=>p.id===id));
  if(!ids.length&&typeof getStockKey==='function'){for(const code of (row.markets||[])){if(getStockKey({...row,market:code}))actions.append(btn(communityLabel('standalone')+' · '+communityPlace(code),()=>openCommunityStock(row,code)))}}
  for(const id of ids){const p=PLANS.find(x=>x.id===id);if(!p)continue;const label=communityLabel('drawer')+(ids.length>1?' · '+market(p.market):'');actions.append(btn(label,()=>openDialog(p)))}
 }
 body.append(actions);return body;
}
function communityCard(row,inDrawer=false){
 const id=row.id,card=el('details',null,'community-record'),summary=el('summary',null,'community-summary'),name=el('span',null,'community-name'),meta=el('span',null,'community-meta');
 name.append(el('b',row.provider),el('small',val(row.plan)));
 const stage=communityStage(row),badge=el('span',communityLabel(stage),'community-badge');badge.dataset.stage=stage;
 meta.append(badge,el('small',[row.kind&&communityLabel(row.kind),communityCities(row)].filter(Boolean).join(' · ')));
 const price=el('span',null,'community-price');if(row.price!==undefined&&(row.priceBasis||stage==='expired'||stage==='upcoming'))price.append(el('small',communityPriceLabel(row)));price.append(el('strong',communityAmount(row.price,row)||communityLabel('reference')));summary.append(name,meta,price);
 card.append(summary,communityDetails(row,inDrawer));
 if(!inDrawer){
  card.open=communityOpenRecords.has(id);
  card.addEventListener('toggle',()=>{if(!card.isConnected)return;if(card.open)communityOpenRecords.add(id);else communityOpenRecords.delete(id)});
 }else card.open=true;
 return card;
}
function renderCommunityFor(out,p){
 const rows=COMMUNITY_OFFERS.filter(x=>x.planIds?.includes(p.id));
 if(!rows.length)return;
 const section=el('section',null,'community-matches');section.append(el('h3',communityLabel('matches')));
 for(const row of rows)section.append(communityCard(row,true));out.append(section);
}
function renderCommunity(out=$('community')){
 clearTimeout(communityTimer);
 if(!out)return;
 out.replaceChildren();
 if(!COMMUNITY_OFFERS.length)return;
 const hub=el('div',null,'community-hub'),head=el('div',null,'community-head'),total=el('output',null,'community-count');
 total.setAttribute('aria-live','polite');head.append(el('h3',communityLabel('offerIndex')),total);hub.append(head);
 const controls=el('div',null,'community-controls'),listing=el('div',null,'community-list');
 function field(key,control){const label=el('label');label.append(el('span',communityLabel(key)),control);controls.append(label)}
 const search=el('input');search.type='search';search.value=communityFilters.search;
 search.addEventListener('input',()=>{communityFilters.search=search.value;draw()});field('search',search);
 function choose(key,keys,labelFn){
  const select=el('select');select.add(new Option(communityLabel('all'),''));
  keys.forEach(k=>select.add(new Option(labelFn(k),k)));
  if([...select.options].some(o=>o.value===communityFilters[key]))select.value=communityFilters[key];
  select.onchange=()=>{communityFilters[key]=select.value;draw()};field(key,select);
 }
 choose('region',[...new Set(COMMUNITY_OFFERS.flatMap(r=>r.markets||[]))].sort((a,b)=>communityPlace(a).localeCompare(communityPlace(b),tags[lang])),communityPlace);
 choose('source',[...new Set(COMMUNITY_OFFERS.flatMap(communitySourceNames))].sort(),communitySourceLabel);
 choose('state',communityStates,communityLabel);
 choose('kind',['vps','bare'],communityLabel);
 choose('stock',['probe'],communityLabel);
 hub.append(controls,listing);out.append(hub);
 function draw(){
  const {region,source,state,kind,stock,search}=communityFilters;
  const tokens=search.normalize('NFKC').trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible=COMMUNITY_OFFERS.filter(row=>{
   if(region&&!row.markets?.includes(region)||source&&!communitySourceNames(row).includes(source)||state&&communityStage(row)!==state||kind&&row.kind!==kind||stock&&!communityHasProbe(row,region))return false;
   const sourceNames=communitySourceNames(row);
   const text=[row.provider,val(row.plan),row.sku,row.code,...sourceNames,...sourceNames.map(communitySourceLabel),communityCities(row),...(row.markets||[]),
    ...['cpu','ram','disk','port','traffic','routeName','ip','currency','price','renewal','regular'].map(key=>val(row[key])),
    communityAmount(row.price,row),row.kind&&communityLabel(row.kind)].join(' ').normalize('NFKC').toLowerCase();
   return tokens.every(t=>text.includes(t));
  }).sort((a,b)=>communityStates.indexOf(communityStage(a))-communityStates.indexOf(communityStage(b)));
  total.textContent=visible.length+' '+communityLabel('records')+' · '+new Set(visible.flatMap(communitySourceNames)).size+' '+communityLabel('sources');
  listing.replaceChildren(...visible.map(r=>communityCard(r)));
  if(!visible.length)listing.append(el('p',communityLabel('empty'),'community-empty'));
 }
 draw();
 const times=COMMUNITY_OFFERS.flatMap(row=>[Date.parse(row.start),Date.parse(row.end),...communityCalendar(row)]).filter(x=>Number.isFinite(x)&&x>Date.now());
 if(times.length)communityTimer=setTimeout(()=>{renderCommunity();if(modal&&modal!=='compare'&&$('drawer').open)openDialog(modal)},Math.min(2147483647,Math.max(1,Math.min(...times)-Date.now()+16)));
}
