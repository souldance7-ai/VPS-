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

let featuredOfferTimer;
function renderFeaturedOffers(){
 const mount = $('featured-offers');
 if (!mount) return;
 clearTimeout(featuredOfferTimer);
 const now = Date.now();
 const stagePriority = {offer: 0, limited: 1, checkout: 2};
 const candidates = COMMUNITY_OFFERS.filter(offer => offer.price != null && offer.price !== '' && Object.hasOwn(stagePriority, communityStage(offer, now)));
 candidates.sort((left, right) => {
  const priority = stagePriority[communityStage(left, now)] - stagePriority[communityStage(right, now)];
  const freshness = Date.parse(right.observed || '') - Date.parse(left.observed || '');
  return priority || freshness || 0;
 });
 const providers = new Set();
 const picks = candidates.filter(offer => {
  const provider = offer.provider.toLowerCase();
  if (providers.has(provider)) return false;
  providers.add(provider);
  return true;
 }).slice(0, 3);
 mount.replaceChildren();
 for (const offer of picks) {
  const stage = communityStage(offer, now);
  const card = el('article', null, 'featured-offer');
  const heading = el('div', null, 'featured-metadata');
  const price = el('div', null, 'featured-price');
  const state = el('span', communityLabel(stage), 'community-badge');
  state.dataset.stage = stage;
  heading.append(state, el('span', (offer.markets || []).slice(0, 2).map(communityPlace).join(' · '), 'featured-location'));
  const detail = btn(tr('portalViewOffer') + ' ↗', () => openHighlightedOffer(offer), 'featured-action');
  detail.setAttribute('aria-label', tr('portalViewOffer') + ' · ' + offer.provider + ' ' + val(offer.plan));
  price.append(el('b', communityAmount(offer.price, offer)), detail);
  card.append(heading, el('h3', offer.provider), el('p', val(offer.plan)), price);
  mount.append(card);
 }
 if (!picks.length) mount.append(el('p', tr('portalDealEmpty'), 'featured-empty'));
 // Long-lived tabs refresh the featured selection when an offer changes phase.
 featuredOfferTimer = setTimeout(renderFeaturedOffers, 60000);
}

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
 $('motion').addEventListener('click', sync);
 reduceMotion.addEventListener('change', sync);
 $('portal-motion').addEventListener('click', () => $('motion').click());
}
