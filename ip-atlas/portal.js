'use strict';

const portalLabels = {
 homeComic:['首页','首頁','Home','ホーム'],
 portalTitle:['全球 VPS，快速定位','全球 VPS，快速定位','Find your next VPS','世界の VPS を探す'],
 portalIntro:['比较全球 VPS 与独服。按地区、IP 属性和回国线路筛选，核对价格、活动和商家库存。','比較全球 VPS 與獨服。依地區、IP 屬性及回國線路篩選，核對價格、活動和商家庫存。','Compare VPS and dedicated servers worldwide. Filter by region, IP type and routes to mainland China, then check prices, offers and stock.','世界の VPS と専用サーバーを地域、IP の種類、中国本土向け回線で絞り込み、料金・セール・在庫を確認できます。'],
 portalMotion:['切换动态效果','切換動態效果','Toggle motion','モーション切替'],
 portalAll:['查看全部优惠','查看全部優惠','All offers','すべてのセール'],
 portalDealEmpty:['目前没有可展示的活动，打开优惠页可查看后续活动和最新消息。','目前沒有可展示的活動，開啟優惠頁可查看後續活動與最新消息。','No featured offers right now. Check the offers page for upcoming campaigns and news.','掲載中のセールはありません。今後のキャンペーンと新着はセール一覧をご覧ください。'],
 portalYuki:['Yuki 漫画','Yuki 漫畫','Yuki’s comic','ユキのコミック'],
 portalViewOffer:['查看方案','查看方案','View offer','プランを見る'],
};
for (const [key, values] of Object.entries(portalLabels)) {
 editionLangs.forEach((language, index) => WORDS[language][key] = values[index]);
}

const boardWords={
 boardRecent:['近期活动','近期活動','Recent offers','最近のセール'], boardCode:['有效期内优惠码','有效期內優惠碼','Current codes','期限内のコード'],
 boardBF:['黑五特惠','黑五特惠','Black Friday','ブラックフライデー'], boardDirect:['套餐特价','方案特價','Plan deals','特価プラン'],
 boardMore:['展开更多优惠','展開更多優惠','Show more offers','セールをさらに表示'], boardCount:['项活动','項活動','offers','件'],
 boardEnd:['截止','截止','Ends','終了'],boardDateOnly:['仅公布日期','僅公布日期','date only','日付のみ公表'],boardNoEnd:['截止日未公布','截止日未公布','End date unpublished','終了日未公表'],
 boardCheckout:['结账确认','結帳確認','Confirm at checkout','決済時に確認'],boardCopy:['复制优惠码','複製優惠碼','Copy code','コードをコピー'],
 boardStore:['商家活动页','商家活動頁','Merchant offer','公式セール'],boardSource:['活动原文','活動原文','Original offer','掲載元'],
 boardNoCode:['免用码','免用碼','No code needed','コード不要'],boardDetails:['配置与条款','規格與條款','Specs & terms','仕様と条件'],
 boardNoMatches:['当前所选分类没有符合条件的优惠。','目前所選分類沒有符合條件的優惠。','There are no qualifying offers in this category.','現在、この分類に該当するセールはありません。'],
 boardWatch:['查看商家快讯','查看商家快訊','See merchant updates','事業者の新着情報'],
 boardMinimum:['活动条件','活動條件','Eligibility','適用条件'],boardPrice:['报价','報價','Price','料金'],
 boardDirectRate:['活动折扣','活動折扣','Campaign discount','割引'],
 boardCopiedDate:['优惠期限已变，请打开商家条款。','優惠期限已變，請開啟商家條款。','The offer window changed. Open the merchant terms.','期限が変わりました。公式条件をご確認ください。']
};
for (const [key,variants] of Object.entries(boardWords)) editionLangs.forEach((language,i)=>WORDS[language][key]=variants[i]);

const boardPageSize=6;
const boardSampleLifetime=10*60_000;
const boardSamples=new Map(),boardSignatures=new Map();
const recentOfferBoard={id:'featured-offers',more:'board-more',limit:boardPageSize};
const blackFridayBoard={id:'featured-black-friday',more:'black-friday-more',limit:boardPageSize};
let boardMode='all',featuredOfferTimer;
const boardReadings=new Map();
let activeBoardReads=0;
function boardReading(row,now){
 const reading=boardReadings.get(row.stockKey);
 const noted=Date.parse(row.stockObservedAt)||0;
 return reading?.time>=noted&&now-reading.time<=300000?reading:null;
}
function boardSoldOut(row,now){
 return (boardReading(row,now)?.state||row.stockAtPublication)==='sold-out';
}
function refreshBoardStock(visible,now){
 if(location.protocol==='file:'||document.hidden||document.body.dataset.book!=='top')return;
 const restocks=COMMUNITY_OFFERS.filter(r=>{
  if(!r.stockKey||r.stockAtPublication!=='sold-out'&&boardReadings.get(r.stockKey)?.state!=='sold-out')return false;
  const phase=communityStage(r,now),recent=boardDate(r);
  return phase==='offer'||['limited','checkout'].includes(phase)&&recent<=now&&now-recent<=30*86400000;
 });
 for(const row of [...visible,...restocks]){
  if(activeBoardReads>=3)return;
  const key=row.stockKey,target=key&&stockTarget(key),previous=boardReadings.get(key);
  if(!target||target.quoteOnly||previous?.retryAt>now)continue;
  const entry={...previous,retryAt:now+120000};boardReadings.set(key,entry);activeBoardReads++;
  const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),8000);
  readStockObservation(key,target,ctrl.signal).then(data=>{
   if(['in-stock','low','sold-out'].includes(data.state)){
    entry.time=Date.parse(data.checkedAt);entry.state=data.state;
   }else{delete entry.time;delete entry.state}
  }).catch(()=>{delete entry.time;delete entry.state}).finally(()=>{
   clearTimeout(timeout);activeBoardReads--;renderFeaturedOffers();
  });
 }
}
function boardDate(row){
 for(const date of [row.evidenceUpdatedAt,row.publishedAt,row.postDate,row.quotedAt,row.quoteDate,row.start,row.observed]){
  const stamp=Date.parse(date);if(Number.isFinite(stamp))return stamp;
 }
 return 0;
}
function boardCodeInWindow(row,now){
 return Boolean(row.code)&&communityStage(row,now)==='offer'&&!boardSoldOut(row,now);
}
function boardCheckoutCode(row,now){
 const recent=boardDate(row),phase=communityStage(row,now);
 return Boolean(row.code)&&['limited','checkout'].includes(phase)&&!boardSoldOut(row,now)&&recent>0&&recent<=now&&now-recent<=30*86400000;
}
function boardCampaignRows(){
 return Object.entries(deals).map(([id,d])=>{
  const split=d.brand.split(' · '),provider=split.shift(),plan=split.join(' · ')||d.brand;
  const terms=tr(id+'Terms');
  const manualRates={azdigi:'−20%',nvh:'−20%',ovh:'−20%',ovhfr:'−20%',ovhgb:'−20%'};
  return {id:'brand-'+id,provider,plan,source:tr('boardStore'),event:d.event||(/black[ -]?friday/i.test(d.brand+' '+d.url)?'black-friday':''),brandCampaign:true,
   start:d.start,end:d.end,code:d.code,url:d.url,official:d.url,discount:d.rate||manualRates[id]||'',conditions:terms};
 });
}
function boardOffers(now,mode=boardMode){
 const qualified=row=>{
  const phase=communityStage(row,now);
  if(!['offer','limited','checkout'].includes(phase)||boardSoldOut(row,now))return false;
  if(row.start&&Date.parse(row.start)>now)return false;
  if(phase==='offer')return true;
  const recent=boardDate(row);
  const promo=row.code||row.discount||row.event||row.campaign||row.status==='limited'||row.status==='active'||row.regular&&String(row.regular)!==String(row.price);
  return Boolean(promo)&&recent>0&&recent<=now&&now-recent<=30*86400000;
 };
 const plans=[...COMMUNITY_OFFERS,...[...commerceFeedRows.values()].flat()].filter(qualified);
 const key=r=>r.provider.toLowerCase().replace(/[^a-z0-9]/g,'')+'|'+r.code;
 const exactCodes=new Set(plans.filter(r=>boardCodeInWindow(r,now)).map(key));
 const campaigns=boardCampaignRows().filter(r=>qualified(r)&&!(r.code&&exactCodes.has(key(r))));
 const rows=[...plans,...campaigns];
 const bf=r=>r.event==='black-friday'||/black[ -]?friday|prebf\d/i.test([r.campaign,r.plan?.en||r.plan,r.code,r.official].join(' '));
 const modeRows=rows.filter(r=>mode==='coupon'?boardCodeInWindow(r,now):mode==='blackfriday'?bf(r):mode==='direct'?!r.code&&r.price!=null: true);
 const priority=r=>(boardCodeInWindow(r,now)?8:0)+(bf(r)?4:0)+(r.price!=null?2:0)+(communityStage(r,now)==='offer'?1:0);
 modeRows.sort((a,b)=>(mode==='all'?boardDate(b)-boardDate(a):0)||priority(b)-priority(a)||boardDate(b)-boardDate(a)||a.provider.localeCompare(b.provider));
 const seen=new Set(),first=[],rest=[];
 for(const r of modeRows){const brand=r.provider.toLowerCase();if(seen.has(brand))rest.push(r);else{seen.add(brand);first.push(r)}}
 return [...first,...rest];
}
function orderOfferBoard(rows,key,now,skip=new Set()){
 const newest=[...new Map(rows.map(row=>[row.id,row])).values()].sort((a,b)=>boardDate(b)-boardDate(a));
 const available=newest.filter(row=>!skip.has(row.id));
 const source=available.length>=boardPageSize?available:newest;
 const merchants=new Set();
 const pool=[];
 for(const row of source){
  const merchant=row.provider.toLowerCase();
  if(merchants.has(merchant))continue;
  merchants.add(merchant);
  pool.push(row);
  if(pool.length>=boardPageSize*2)break;
 }
 if(pool.length<boardPageSize){
  const distinct=new Set(pool.map(row=>row.id));
  pool.push(...source.filter(row=>!distinct.has(row.id)).slice(0,boardPageSize-pool.length));
 }
 const ids=pool.map(row=>row.id),count=Math.min(boardPageSize,ids.length);
 const version=JSON.stringify(pool.map(row=>[row.id,boardDate(row)]));
 const storageKey='home-offers.'+key;
 let sample=boardSamples.get(key);
 if(sample?.version!==version){
  try{sample=JSON.parse(saved(storageKey))}catch{sample=null}
  if(sample?.version!==version||!(sample.expiresAt>now)||!Array.isArray(sample.ids)||
   sample.ids.length!==count||new Set(sample.ids).size!==count||sample.ids.some(id=>!ids.includes(id))){
   for(let i=0;i<count;i++){
    const j=i+Math.floor(Math.random()*(ids.length-i));
    [ids[i],ids[j]]=[ids[j],ids[i]];
   }
   sample={version,ids:ids.slice(0,count),expiresAt:now+boardSampleLifetime};
   if(count)save(storageKey,JSON.stringify(sample));
  }
  boardSamples.set(key,sample);
 }
 const selected=new Set(sample.ids);
 return [...newest.filter(row=>selected.has(row.id)),...newest.filter(row=>!selected.has(row.id))];
}
function boardDateText(row){
 if(row.end)return tr('boardEnd')+' · '+communityDate(row.end);
 if(row.endDate)return tr('boardEnd')+' · '+row.endDate+' ('+tr('boardDateOnly')+')';
 return tr('boardNoEnd');
}
function boardCard(row,now){
 const card=el('article',null,'featured-offer');
 card.dataset.offerId=row.id;
 const valid=boardCodeInWindow(row,now),phase=communityStage(row,now);
 const meta=el('div',null,'featured-metadata'),status=el('span',communityLabel(phase),'community-badge');
 status.dataset.stage=phase;
 meta.append(status,el('span',communityCities(row)||row.source,'featured-location'));
 const title=el('h3',row.provider),product=el('p',val(row.plan)||row.sku,'board-product');
 const spec=[val(row.cpu),val(row.ram),val(row.disk),val(row.port)].filter(Boolean).join(' · ');
 const pricing=el('div',null,'featured-price'),quote=el('div',null,'featured-quote');
 quote.append(el('small',row.price!=null?communityPriceLabel(row):tr('boardDirectRate')),el('b',row.price!=null?communityAmount(row.price,row):val(row.discount)||tr('boardMinimum')));
 appendFx(quote,row.price,row.currency);
 pricing.append(quote);
 if(valid||boardCheckoutCode(row,now)){
  const code=btn(row.code+' ⧉',()=>{
   if(valid?boardCodeInWindow(row,Date.now()):boardCheckoutCode(row,Date.now()))copy(row.code);
   else{toast(tr('boardCopiedDate'));renderFeaturedOffers()}
  },'board-coupon');
  code.setAttribute('aria-label',tr('boardCopy')+' '+row.code+(valid?'':' · '+tr('boardCheckout')));code.title=tr('boardCopy');
  if(valid)pricing.append(code);
  else{
   const conditional=el('div',null,'board-conditional');
   conditional.append(el('small',tr('boardCheckout')),code);pricing.append(conditional);
  }
 }else if(row.codeRequired===false||row.automatic)pricing.append(el('small',tr('boardNoCode'),'board-auto'));
 const condition=val(row.conditions),short=condition?el('p',condition,'board-eligibility'):null;
 const actions=el('div',null,'board-actions');
 const details=btn(tr('boardDetails'),()=>openHighlightedOffer(row),'featured-action');
 details.setAttribute('aria-label',tr('boardDetails')+' · '+row.provider+' '+val(row.plan));
 actions.append(details,link(tr('boardStore')+' ↗',row.url,'board-order'));
 if(row.thread&&row.thread!==row.url&&row.thread!==row.official)actions.append(link(row.source+' ↗',row.thread,'board-order'));
 card.append(meta,title,product);if(spec)card.append(el('p',spec,'board-specs'));
 card.append(pricing);
 const deadline=el('p',boardDateText(row),'board-deadline');
 card.append(deadline);
 const reading=boardReading(row,now);
 if(reading)card.append(el('p',stockLabel(stockTarget(row.stockKey),reading.state)+' · '+communityDate(new Date(reading.time).toISOString()),'board-stock'));
 if(short)card.append(short);
 card.append(actions);
 return card;
}
function renderOfferBoard(board,rows,now){
 const visible=rows.slice(0,board.limit);
 const signature=JSON.stringify([lang,...visible.map(row=>[row,communityStage(row,now),boardReading(row,now)?.time])]);
 if(signature!==boardSignatures.get(board.id)){
  boardSignatures.set(board.id,signature);
  const mount=$(board.id);
  if(visible.length)mount.replaceChildren(...visible.map(row=>boardCard(row,now)));
  else{
   const empty=el('div',null,'featured-empty');
   empty.append(el('p',tr('boardNoMatches')));
   if(board===recentOfferBoard){
    const all=el('a',tr('boardWatch')+' →');all.href='#offers';all.addEventListener('click',()=>activateOfferTab($('tab-feed')));
    empty.append(all,link('LowEndTalk · Offers ↗','https://lowendtalk.com/categories/offers'));
   }
   mount.replaceChildren(empty);
  }
 }
 $(board.more).hidden=rows.length<=board.limit;
 return visible;
}
function renderFeaturedOffers(){
 if(!$('featured-offers'))return;
 clearTimeout(featuredOfferTimer);
 const now=Date.now(),blackFriday=orderOfferBoard(boardOffers(now,'blackfriday'),'black-friday',now);
 const above=new Set(blackFriday.slice(0,boardPageSize).map(row=>row.id));
 const rows=orderOfferBoard(boardOffers(now),'recent-'+boardMode,now,above);
 const displayedBlackFriday=renderOfferBoard(blackFridayBoard,blackFriday,now);
 const displayedRecent=renderOfferBoard(recentOfferBoard,rows,now);
 for(const button of document.querySelectorAll('[data-home-filter]'))button.setAttribute('aria-pressed',String(button.dataset.homeFilter===boardMode));
 const count=$('board-count'),label=rows.length+' '+tr('boardCount');
 if(count.textContent!==label)count.textContent=label;
 if(!document.hidden&&(!document.body.dataset.book||document.body.dataset.book==='top')){
  refreshBoardStock([...displayedRecent,...displayedBlackFriday],now);
  const boundaries=[...rows,...blackFriday].flatMap(r=>[Date.parse(r.end),...communityCalendar(r)]).filter(t=>t>now);
  const upcoming=[...COMMUNITY_OFFERS,...Object.values(deals)].map(r=>Date.parse(r.start)).filter(t=>t>now);
  const interval=Math.max(200,Math.min(60000,...boundaries.map(t=>t-now+20),...upcoming.map(t=>t-now+20)));
  featuredOfferTimer=setTimeout(renderFeaturedOffers,interval);
 }
}
for(const button of document.querySelectorAll('[data-home-filter]')){
 button.addEventListener('click',()=>{boardMode=button.dataset.homeFilter;recentOfferBoard.limit=boardPageSize;renderFeaturedOffers()});
}
for(const board of [recentOfferBoard,blackFridayBoard]){
 document.getElementById(board.more).addEventListener('click',()=>{
  const from=board.limit;
  board.limit+=boardPageSize;
  renderFeaturedOffers();
  $(board.id).children[from]?.querySelector('button,a')?.focus({preventScroll:true});
 });
}
document.addEventListener('DOMContentLoaded',renderFeaturedOffers);
document.addEventListener('visibilitychange',renderFeaturedOffers);
new MutationObserver(renderFeaturedOffers).observe(document.body,{attributes:true,attributeFilter:['data-book']});


function openHighlightedOffer(offer){
 const drawer = $('drawer');
 if (drawer.open) return;
 const body = $('dialog-body');
 const title = el('h2', offer.provider + ' · ' + val(offer.plan));
 title.id = 'dialog-title';
 body.replaceChildren(title);
 drawer.setAttribute('aria-labelledby', title.id);
 const plan = (offer.planIds || []).map(id => PLANS.find(entry => entry.id === id)).find(entry => entry && getStockKey(entry));
 const market = (offer.markets || []).find(code => getStockKey({...offer, market: code}));
 if (plan || market) renderStock(body, plan || {...offer, market});
 body.append(communityDetails(offer, true));
 drawer.showModal();
 animateDialogOpen();
}

function startPortal(){
 const canvas = $('portal-field');
 const context = canvas?.getContext('2d');
 if (!context) return;
 const points = Array.from({length: 40}, (_, index) => ({
  angle: (index * 2.39996) % (Math.PI * 2),
  orbit: 0.15 + ((index * 29) % 98) / 120,
  size: 0.6 + (index % 6) / 9,
  pace: 0.24 + (index % 7) / 12,
 }));
 let width = 0, height = 0, frame, visible = true;
 function draw(time){
  context.clearRect(0, 0, width, height);
  const horizontal = width > 580;
  const x = width * (horizontal ? .752 : .78);
  const y = height * (horizontal ? .54 : .42);
  const radius = Math.min(width * .24, height * .52);
  for (const point of points) {
   const angle = point.angle + time * point.pace;
   const distance = radius * point.orbit * 1.42;
   const opacity = .24 + (.5 + .5 * Math.sin(time * 2 + point.angle)) * .61;
   const px = x + Math.cos(angle) * distance;
   const py = y + Math.sin(angle) * distance * .81;
   context.fillStyle = 'rgba(205,198,255,' + opacity + ')';
   context.beginPath();
   context.arc(px, py, point.size, 0, Math.PI * 2);
   context.fill();
  }
 }
 function renderFrame(timestamp){
  draw(timestamp / 1000);
  frame = requestAnimationFrame(renderFrame);
 }
 function sync(){
  cancelAnimationFrame(frame);
  if (visible && !document.hidden && canMove() && canvas.offsetWidth) frame = requestAnimationFrame(renderFrame);
  else if (canvas.offsetWidth) draw(0);
 }
 new ResizeObserver(() => {
  const bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  width = bounds.width;
  height = bounds.height;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  sync();
 }).observe(canvas);
 new IntersectionObserver(([entry]) => {visible = entry.isIntersecting;sync()}).observe(canvas);
 document.addEventListener('visibilitychange', sync);
 $('portal-motion').addEventListener('click', sync);
 reduceMotion.addEventListener('change', sync);

}
