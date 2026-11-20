'use strict';

const publicForumTitles = {
  title:['论坛与频道新帖','論壇與頻道新帖','Forum and channel dispatches','掲示板・チャンネルの新着'],
  nodeseek:['NodeSeek','NodeSeek','NodeSeek','NodeSeek'],
  carpool:['NodeSeek · 拼车','NodeSeek · 拼車','NodeSeek · group buys','NodeSeek・共同購入'],
  meow:['ICMP 不可达喵 · 文章','ICMP 不可達喵 · 文章','ICMP 不可达喵 · articles','ICMP 不可达喵・記事'],
  meowoffers:['MeowVPS · 商家动态','MeowVPS · 商家動態','MeowVPS · merchant news','MeowVPS・販売元ニュース'],
  carpoolIntro:['显示 NodeSeek 官方订阅中标记为「拼车」的社区帖子。点进原帖查看车主、分摊价格、剩余名额和续费约定。','顯示 NodeSeek 官方訂閱中標記為「拼車」的社群貼文。點進原帖查看車主、分攤價格、剩餘名額和續費約定。','Community posts tagged as group buys in the official NodeSeek feed. Open a thread for the organizer, split price, remaining seats and renewal terms.','NodeSeek 公式フィードで共同購入に分類された投稿です。募集者、分担額、空き枠、更新条件は元の投稿で確認できます。'],
  meowIntro:['ICMP 不可达喵的公开文章。查看测试对象、线路和 IP 记录时，请留意文章日期与具体套餐。','ICMP 不可達喵的公開文章。查看測試對象、線路和 IP 紀錄時，請留意文章日期與具體套餐。','Public articles by ICMP 不可达喵. When using a route or IP test, match the publication date and the exact plan.','ICMP 不可达喵の公開記事です。経路や IP の測定結果は掲載日と対象プランをあわせて確認できます。'],
  meowoffersIntro:['MeowVPS 时间线收录的商家消息。每条列出原消息来源和发布时间；点击可查看原帖或该商家的活动记录。','MeowVPS 時間線收錄的商家消息。每則列出原消息來源和發布時間，點選可查看原帖或該商家的活動紀錄。','Merchant announcements collected by MeowVPS. Each entry shows its source and publication time. Open it for the original thread or that merchant’s timeline.','MeowVPS が収録した販売元のお知らせです。各行の配信元と掲載日時を確認し、元の投稿または販売元別の履歴を開けます。'],
  carpoolEmpty:['最近读取的官方订阅里没有拼车新帖。完整列表见拼车版。','最近讀取的官方訂閱裡沒有拼車新帖。完整列表見拼車版。','No group buys in the recent official feed. The board lists older threads.','最近取得した公式フィードに共同購入の新着はありません。過去の募集は掲示板で確認できます。'],
  carpoolHosting:['仅看标题含 VPS、线路或商家的拼车','只看標題含 VPS、線路或商家的拼車','Only titles mentioning hosting, routes or providers','VPS・経路・販売元に関連する見出しのみ'],
  carpoolHostingEmpty:['这批拼车帖没有匹配的主机标题。取消筛选可查看全部拼车帖。','這批拼車帖沒有符合的主機標題。取消篩選可查看全部拼車帖。','No hosting-related titles in this batch. Clear the filter to see all group buys.','今回の取得分に VPS 関連の見出しはありません。絞り込みを外すと全件表示できます。'],
  openCarpool:['打开 NodeSeek 拼车版 ↗','開啟 NodeSeek 拼車版 ↗','Open the group-buy board ↗','共同購入板を開く ↗'],
  openTimeline:['打开 MeowVPS 时间线 ↗','開啟 MeowVPS 時間線 ↗','Open the MeowVPS timeline ↗','MeowVPS のタイムラインを開く ↗'],
  homeNews:['最新商家快讯','最新商家快訊','Latest merchant news','販売元の最新ニュース'],
  allNews:['全部快讯 →','全部快訊 →','All dispatches →','すべてのニュース →'],
  posted:['发布','發布','Published','掲載'],
  noMerchant:['本次读取没有商家快讯。','本次讀取沒有商家快訊。','No merchant announcements in this read.','今回の取得分にお知らせはありません。'],
  homeFailure:['目前无法读取商家快讯。','目前無法讀取商家快訊。','Merchant news is currently unavailable.','販売元のお知らせを現在取得できません。'],
  sb:['烧饼 · 推广','燒餅 · 推廣','SB · promotions','SB・プロモーション'],
  intro:['查看论坛原帖与 Telegram 公开频道消息。补货、价格和优惠码均按发帖时的消息展示，下单时请查看商家的库存与条款。','查看論壇原帖與 Telegram 公開頻道消息。補貨、價格和優惠碼均按發帖時的消息顯示，下單時請查看商家的庫存與條款。','Read forum threads and public Telegram posts. Restocks, prices and codes are reported at posting time. Check the merchant’s inventory and terms before ordering.','掲示板と Telegram の公開投稿を閲覧できます。入荷、価格、コードは投稿時点の情報です。注文時は販売元の在庫と条件を確認してください。'],
  openChannel:['在 Telegram 打开频道 ↗','在 Telegram 開啟頻道 ↗','Open channel in Telegram ↗','Telegram でチャンネルを開く ↗'],
  limited:['本次公开网页只提供频道入口。可在 Telegram 查看消息。','本次公開網頁只提供頻道入口。可在 Telegram 查看消息。','The public page did not provide messages on this read. Open the channel in Telegram.','今回は公開ページからメッセージを取得できませんでした。Telegram でチャンネルを開いてください。'],
  telegramEmpty:['本次公开预览没有符合条件的文字消息。','本次公開預覽沒有符合條件的文字消息。','No matching text posts in this public preview.','今回の公開プレビューには該当するテキスト投稿がありません。'],
  telegramFail:['暂时无法读取 Telegram 公开预览。可以刷新或直接打开频道。','暫時無法讀取 Telegram 公開預覽。可以重新整理或直接開啟頻道。','The public Telegram preview could not be reached. Refresh or open the channel.','Telegram の公開プレビューに接続できません。再読み込みするかチャンネルを開いてください。'],
  choose:['订阅来源','訂閱來源','Feed source','配信元'],
  refresh:['刷新','重新整理','Refresh','更新'],
  loading:['正在读取订阅…','正在讀取訂閱…','Reading feed…','フィードを読み込み中…'],
  forum:['打开发帖版块 ↗','開啟發帖版區 ↗','Open forum ↗','掲示板を開く ↗'],
  nodeForum:['打开 NodeSeek 情报 ↗','開啟 NodeSeek 情報 ↗','NodeSeek intelligence ↗','NodeSeek 情報板 ↗'],
  nodePromo:['NodeSeek 推广 ↗','NodeSeek 推廣 ↗','NodeSeek promotions ↗','NodeSeek 宣伝板 ↗'],
  time:['订阅读取时间','訂閱讀取時間','Feed read','フィード取得日時'],
  empty:['本次订阅没有 VPS 相关标题。可在原论坛查看更多帖子。','本次訂閱沒有 VPS 相關標題。可在原論壇查看更多帖子。','This feed has no matching VPS headlines. Browse the forum for more threads.','今回のフィードに VPS 関連の見出しはありません。掲示板では他の記事も読めます。'],
  unavailable:['暂时无法读取订阅。可以重试或打开原论坛。','暫時無法讀取訂閱。可以重試或開啟原論壇。','Could not reach this feed. Retry or open the forum.','フィードに接続できません。再試行するか、掲示板を開いてください。'],
  stale:['当前显示最近一次成功读取的帖子。','目前顯示最近一次成功讀取的帖子。','Showing the last successful feed read.','最後に取得できた記事を表示しています。'],
  offline:['当前处于离线状态。','目前處於離線狀態。','You are offline.','オフラインです。'],
  preview:['本地预览可直接打开原始来源。在线部署后会读取最新消息。','本機預覽可直接開啟原始來源。線上部署後會讀取最新消息。','Open the source directly in local preview. The deployed site reads live posts.','ローカルプレビューでは配信元を直接開けます。公開サイトで新着を取得します。'],
  cache:['查看本栏时每 5 分钟自动刷新','查看本欄時每 5 分鐘自動重新整理','Updates every 5 min while this panel is visible','この欄の表示中は 5 分ごとに自動更新']
};
const publicTGChannels = Object.freeze({vpsdeer:'vpsdeer',vpsts:'vpsts',vpsuu:'vpsuu',poorvpsmsg:'PoorVPSMsg'});
const publicForumState = {
  active:'nodeseek', inView:false, observer:null, root:null, timer:null, hostingOnly:true,
  feeds:Object.fromEntries(['meowoffers','meow','carpool','nodeseek','sb',...Object.keys(publicTGChannels)].map(id=>[id,{}]))
};
function choosePublicSource(id) {
  const source = id === 'all' ? 'nodeseek' : id;
  if (!Object.hasOwn(publicForumState.feeds,source)) return false;
  publicForumState.active = source;
  if (publicForumState.root) drawForumFeed();
  return true;
}
const forumRefreshMs = 5 * 60 * 1000;
let homeNewsUI = null, homeNewsTimer;
function homeNewsVisible() {
  return homeNewsUI && !homeNewsUI.panel.hidden && homeNewsUI.panel.getClientRects().length &&
    document.visibilityState !== 'hidden' && location.protocol !== 'file:' && navigator.onLine !== false;
}
function scheduleHomeNews() {
  clearTimeout(homeNewsTimer);
  if (!homeNewsVisible()) return;
  const state = publicForumState.feeds.meowoffers;
  if (state.busy) return;
  homeNewsTimer = setTimeout(() => {
    if (homeNewsVisible() && !state.busy) loadForumFeed('meowoffers');
  },Math.max(0,(state.nextAt || 0)-Date.now()));
}
function drawHomeNews() {
  if (!homeNewsUI) {
    const offers = document.querySelector('#home .home-offers');
    if (!offers) return;
    const panel = offers.closest('[data-view]'), box = el('aside',null,'home-dispatch');
    const heading = el('h3'), story = el('div',null,'home-dispatch-story'), more = el('a');
    heading.id = 'home-dispatch-title'; box.setAttribute('aria-labelledby',heading.id);
    more.className = 'home-dispatch-all';
    const full = new URL(location.href); full.searchParams.set('feed','meowoffers'); full.hash = 'offers';
    more.href = full.href;
    more.addEventListener('click',event=>{
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); choosePublicSource('meowoffers'); activateOfferTab($('tab-feed'));
      history.pushState(null,'',full.href); turnPage('offers');
    });
    box.append(heading,story,more); offers.after(box);
    homeNewsUI = {panel,heading,story,more};
    if ('MutationObserver' in window) new MutationObserver(scheduleHomeNews).observe(panel,{attributes:true,attributeFilter:['hidden']});
  }
  const txt = forumUIString, state = publicForumState.feeds.meowoffers, ui = homeNewsUI;
  ui.heading.textContent = txt('homeNews'); ui.more.textContent = txt('allNews');
  ui.story.replaceChildren();
  const post = state.data?.items[0];
  if (post) {
    const meta = el('span',post.sourceName ? 'MeowVPS · '+post.sourceName : 'MeowVPS','home-dispatch-meta');
    const date = forumDate(post.date);
    if (date) meta.append(' · '+txt('posted')+' ',date);
    ui.story.append(meta,link(post.title,post.link));
  }
  let notice = '';
  if (location.protocol === 'file:') notice = txt('preview');
  else if (navigator.onLine === false) notice = txt('offline');
  else if (state.failed) notice = txt('homeFailure');
  else if (!post) notice = txt(state.busy || !state.data ? 'loading' : 'noMerchant');
  if (post && (state.data.stale || state.failed || navigator.onLine === false)) {
    const last = el('small',txt('stale')+' '+txt('time')+' ');
    const stamp = forumDate(state.data.observed);
    if (stamp) last.append(stamp);
    ui.story.append(last);
  }
  if (notice) ui.story.append(el('small',notice));
  scheduleHomeNews();
}
function forumVisible() {
  const box = publicForumState.root?.box;
  if (!box || location.protocol === 'file:' || document.visibilityState === 'hidden' || navigator.onLine === false || !box.getClientRects().length) return false;
  if (publicForumState.observer) return publicForumState.inView;
  const rect = box.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}
function scheduleForumRead() {
  clearTimeout(publicForumState.timer);
  publicForumState.timer = null;
  const id = publicForumState.active, state = publicForumState.feeds[id];
  if (state.busy || !forumVisible()) return;
  const delay = Math.max(0,(state.nextAt || 0) - Date.now());
  publicForumState.timer = setTimeout(() => {
    publicForumState.timer = null;
    if (id === publicForumState.active && forumVisible()) loadForumFeed(id);
  },delay);
}
function forumUIString(key) {
  if (Object.hasOwn(publicTGChannels,key)) return '@'+publicTGChannels[key];
  const index = {sc:0,tc:1,en:2,ja:3}[lang] ?? 0;
  return publicForumTitles[key][index];
}
function forumDate(value) {
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return null;
  const item = el('time',new Intl.DateTimeFormat(tags[lang],{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(time));
  item.dateTime = new Date(time).toISOString();
  return item;
}
function forumItemLink(value, id) {
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:' || u.username || u.password || u.port) return '';
    if (id === 'meowoffers') {
      if (u.hostname === 'lowendtalk.com' && /^\/discussion\/[1-9]\d{0,12}\/[a-z0-9-]+\/?$/i.test(u.pathname) && !u.search && !u.hash) return u.href;
      if (u.hostname === 'meowvps.com' && u.pathname === '/timeline/' && u.hash === '#offers' &&
          [...u.searchParams].length === 1 && /^[\p{L}\p{N}_-]{1,80}$/u.test(u.searchParams.get('merchant') || '')) return u.href;
      return '';
    }
    let correct = false;
    if (Object.hasOwn(publicTGChannels,id)) {
      const parts = u.pathname.split('/');
      correct = u.hostname === 't.me' && parts.length === 3 && parts[1] === publicTGChannels[id] && /^[1-9]\d{0,14}$/.test(parts[2]);
    } else if (id === 'sb') correct = u.hostname === 'sb.sb' && /^\/t\/[1-9]\d{0,14}\/$/.test(u.pathname);
    else if (id === 'nodeseek' || id === 'carpool') correct = u.hostname === 'www.nodeseek.com' && /^\/post-[1-9]\d{0,14}-1$/.test(u.pathname);
    else if (id === 'meow') correct = u.hostname === 'meowvps.com' && /^\/blog\/[\w%-]+\/$/.test(u.pathname);
    if (correct && !u.search && !u.hash) return u.href;
  } catch {}
  return '';
}
function setupForumUI(box) {
  const title = el('h3'); title.id = 'forum-feed-title';
  const intro = el('p',null,'forum-feed-intro');
  const controls = el('div',null,'forum-feed-controls');
  const sources = el('div',null,'forum-feed-sources');
  sources.setAttribute('role','group');
  const sourceButtons = {};
  for (const id of Object.keys(publicForumState.feeds)) {
    const button = btn('',() => choosePublicSource(id));
    button.dataset.feedSource = id;
    sources.append(button); sourceButtons[id] = button;
  }
  const refresh = btn('',() => loadForumFeed(publicForumState.active),'forum-feed-refresh');
  const actions = el('div',null,'forum-feed-actions');
  const groupScope = el('label',null,'forum-feed-scope'), checkbox = document.createElement('input'), scopeText = el('span');
  checkbox.type = 'checkbox'; checkbox.checked = publicForumState.hostingOnly;
  checkbox.addEventListener('change',()=>{publicForumState.hostingOnly=checkbox.checked;drawForumFeed();});
  groupScope.append(checkbox,scopeText);
  controls.append(sources,refresh); 
  const status = el('p',null,'forum-feed-status');
  status.setAttribute('role','status');
  const list = el('ul',null,'forum-feed-list');
  const foot = el('div',null,'forum-feed-foot');
  box.replaceChildren(title,intro,controls,groupScope,status,list,actions,foot);
  publicForumState.root = {box,title,intro,sources,sourceButtons,refresh,status,list,foot,actions,groupScope,scopeText};
  publicForumState.inView = false;
  if ('IntersectionObserver' in window) {
    publicForumState.observer?.disconnect();
    publicForumState.observer = new IntersectionObserver(entries => {
      const entry = entries.at(-1);
      if (entry?.target !== publicForumState.root?.box) return;
      publicForumState.inView = entry.isIntersecting;
      scheduleForumRead();
    });
    publicForumState.observer.observe(box);
  }
}
function drawForumFeed() {
  drawHomeNews();
  const box = $('forum-feed');
  if (!box) return;
  if (publicForumState.root?.box !== box) setupForumUI(box);
  const ui = publicForumState.root, id = publicForumState.active, state = publicForumState.feeds[id];
  const txt = forumUIString, telegram = Object.hasOwn(publicTGChannels,id);
  ui.title.textContent = txt('title');
  ui.intro.textContent = txt(['carpool','meow','meowoffers'].includes(id) ? id+'Intro' : 'intro');
  ui.groupScope.hidden = id !== 'carpool';
  ui.scopeText.textContent = txt('carpoolHosting');
  const items = (state.data?.items || []).filter(post => id !== 'carpool' || !publicForumState.hostingOnly || post.hostingTitle === true);
  ui.sources.setAttribute('aria-label',txt('choose'));
  for (const [name,button] of Object.entries(ui.sourceButtons)) {
    button.textContent = txt(name);
    button.setAttribute('aria-pressed',String(name === id));
  }
  ui.refresh.textContent = txt(state.busy ? 'loading' : 'refresh');
  ui.refresh.disabled = !!state.busy || location.protocol === 'file:';
  const notices = [];
  if (location.protocol === 'file:') notices.push(txt('preview'));
  else if (navigator.onLine === false) notices.push(txt('offline'));
  else if (state.busy) notices.push(txt('loading'));
  else if (state.failed) notices.push(txt(telegram?'telegramFail':'unavailable'));
  if (state.data && (state.failed || state.data.stale || navigator.onLine === false)) notices.push(txt('stale'));
  if (state.data && !state.data.items.length && !state.busy && !state.failed) {
    notices.push(txt(state.data.visibility==='link-only'?'limited':telegram?'telegramEmpty':id==='carpool'?'carpoolEmpty':'empty'));
  } else if (state.data?.items.length && !items.length && id === 'carpool') {
    notices.push(txt('carpoolHostingEmpty'));
  }
  ui.status.dataset.feedStatus = state.failed?'failed':state.busy?'loading':state.data?.visibility==='link-only'?'link-only':state.data && !state.data.items.length?'empty':'ready';
  ui.status.textContent = notices.join(' ');
  ui.status.hidden = !notices.length;
  ui.list.replaceChildren();
  for (const post of items) {
    const href = forumItemLink(post.link,id);
    if (!href || !post.title) continue;
    const row = el('li');
    const copy = el('div',null,'forum-feed-post');
    if (id === 'meowoffers' && typeof post.sourceName === 'string') copy.append(el('span',post.sourceName,'forum-feed-byline'));
    copy.append(link(post.title,href));
    if (telegram && typeof post.snippet === 'string' && post.snippet) copy.append(el('span',post.snippet.slice(0,110),'forum-feed-snippet'));
    if(typeof feedToCatalog==="function"){const catalog=feedToCatalog(post);if(catalog)copy.append(catalog)}
    row.append(copy);
    const date = forumDate(post.date);
    if (date) row.append(date);
    ui.list.append(row);
  }
  ui.list.hidden = !ui.list.childElementCount;
  ui.actions.replaceChildren();
  if (telegram) ui.actions.append(link(txt('openChannel'),'https://t.me/'+publicTGChannels[id]));
  else if (id === 'carpool') ui.actions.append(link(txt('openCarpool'),'https://www.nodeseek.com/categories/carpool'));
  else if (id === 'meow' || id === 'meowoffers') ui.actions.append(link(txt('openTimeline'),'https://meowvps.com/timeline/'+(id==='meowoffers'?'#offers':'')));
  else if (id === 'sb') ui.actions.append(link(txt('forum'),'https://sb.sb/go/promotion/'));
  else ui.actions.append(link(txt('nodeForum'),'https://www.nodeseek.com/categories/info'),link(txt('nodePromo'),'https://www.nodeseek.com/categories/promotion'));
  ui.foot.replaceChildren();
  if (state.data) {
    const stamp = el('span',txt(id)+' · '+txt('time') + ' · ');
    stamp.append(forumDate(state.data.observed));
    ui.foot.append(stamp);
  }
  ui.foot.append(el('span',txt('cache')));
  scheduleForumRead();
}
async function loadForumFeed(id = publicForumState.active) {
  const state = publicForumState.feeds[id];
  if (!state || state.busy || location.protocol === 'file:') return;
  state.busy = true; state.failed = false;
  drawForumFeed();
  const ctl = new AbortController(), timeout = setTimeout(()=>ctl.abort(),['meow','meowoffers'].includes(id)?17500:10000);
  try {
    const response = await fetch('/api/deal-feed/' + id,{signal:ctl.signal,cache:'no-store',headers:{Accept:'application/json'}});
    if (!response.ok) throw Error('feed');
    const data = await response.json();
    if (data.source !== id || !Array.isArray(data.items) || !Number.isFinite(Date.parse(data.observed))) throw Error('payload');
    state.data = {source:id,observed:data.observed,stale:data.stale === true,visibility:data.visibility === 'link-only'?'link-only':'public',
      items:data.items.slice(0,12).filter(item=>item && typeof item.title === 'string' && forumItemLink(item.link,id))};
  } catch {
    state.failed = true;
  } finally {
    clearTimeout(timeout); state.busy = false;
    const now = Date.now();
    if (state.failed || state.data?.stale) {
      state.failures = Math.min(5,(state.failures || 0) + 1);
      state.nextAt = now + Math.min(forumRefreshMs,30000 * 2 ** (state.failures - 1));
    } else {
      state.failures = 0;
      state.nextAt = Math.max(now + 10000,Math.min(now + forumRefreshMs,Date.parse(state.data.observed) + forumRefreshMs));
    }
    if (publicForumState.active === id) drawForumFeed(); else if (id === 'meowoffers') drawHomeNews();
  }
}
function forumConnectivityChanged() {
  if (publicForumState.root) drawForumFeed();
}
window.addEventListener('offline',forumConnectivityChanged);
window.addEventListener('online',forumConnectivityChanged);
window.document?.addEventListener('visibilitychange',()=>{scheduleForumRead();scheduleHomeNews();});
if (!('IntersectionObserver' in window)) {
  window.addEventListener('scroll',scheduleForumRead,{passive:true});
  window.addEventListener('resize',scheduleForumRead);
}
