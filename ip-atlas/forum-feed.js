'use strict';

const publicForumTitles = {
  title:['论坛新帖','論壇新帖','Forum dispatches','フォーラムの新着'],
  nodeseek:['NodeSeek','NodeSeek','NodeSeek','NodeSeek'],
  sb:['烧饼 · 推广','燒餅 · 推廣','SB · promotions','SB・プロモーション'],
  intro:['从公开订阅源筛选 VPS、线路和商家相关标题。帖子显示原文，价格与优惠条件请打开商家活动页核对。','從公開訂閱源篩選 VPS、線路與商家相關標題。帖子顯示原文，價格與優惠條件請開啟商家活動頁核對。','Browse original forum headlines about VPS, networks and providers. Check the merchant’s campaign for prices and terms.','公開フィードから VPS、回線、事業者に関する記事の原題を表示します。価格と適用条件は販売元のキャンペーンページで確認してください。'],
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
  preview:['本地预览可直接打开论坛。在线部署后会读取订阅。','本機預覽可直接開啟論壇。線上部署後會讀取訂閱。','Open the forum in local preview. The deployed site can read live feeds.','ローカルプレビューでは掲示板を直接開けます。公開サイトでフィードを取得します。'],
  cache:['查看本栏时每 5 分钟自动刷新','查看本欄時每 5 分鐘自動重新整理','Updates every 5 min while this panel is visible','この欄の表示中は 5 分ごとに自動更新']
};
const publicForumState = {
  active:'nodeseek', inView:false, observer:null, root:null, timer:null,
  feeds:{nodeseek:{},sb:{}}
};
const forumRefreshMs = 5 * 60 * 1000;
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
    const correct = id === 'sb'
      ? u.hostname === 'sb.sb' && /^\/t\/[1-9]\d{0,14}\/$/.test(u.pathname)
      : u.hostname === 'www.nodeseek.com' && /^\/post-[1-9]\d{0,14}-1$/.test(u.pathname);
    if (correct && u.protocol === 'https:' && !u.username && !u.password && !u.port && !u.search && !u.hash) return u.href;
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
  for (const id of ['nodeseek','sb']) {
    const button = btn('',() => {
      publicForumState.active = id;
      drawForumFeed();
    });
    sources.append(button); sourceButtons[id] = button;
  }
  const refresh = btn('',() => loadForumFeed(publicForumState.active),'forum-feed-refresh');
  const actions = el('div',null,'forum-feed-actions');
  controls.append(sources,refresh); 
  const status = el('p',null,'forum-feed-status');
  status.setAttribute('role','status');
  const list = el('ul',null,'forum-feed-list');
  const foot = el('div',null,'forum-feed-foot');
  box.replaceChildren(title,intro,controls,status,list,actions,foot);
  publicForumState.root = {box,title,intro,sources,sourceButtons,refresh,status,list,foot,actions};
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
  const box = $('forum-feed');
  if (!box) return;
  if (publicForumState.root?.box !== box) setupForumUI(box);
  const ui = publicForumState.root, id = publicForumState.active, state = publicForumState.feeds[id];
  const txt = forumUIString;
  ui.title.textContent = txt('title');
  ui.intro.textContent = txt('intro');
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
  else if (state.failed) notices.push(txt('unavailable'));
  if (state.data && (state.failed || state.data.stale || navigator.onLine === false)) notices.push(txt('stale'));
  if (state.data && !state.data.items.length && !state.busy) notices.push(txt('empty'));
  ui.status.textContent = notices.join(' ');
  ui.status.hidden = !notices.length;
  ui.list.replaceChildren();
  for (const post of state.data?.items || []) {
    const href = forumItemLink(post.link,id);
    if (!href || !post.title) continue;
    const row = el('li');
    row.append(link(post.title,href));
    const date = forumDate(post.date);
    if (date) row.append(date);
    ui.list.append(row);
  }
  ui.list.hidden = !ui.list.childElementCount;
  ui.actions.replaceChildren();
  if (id === 'sb') ui.actions.append(link(txt('forum'),'https://sb.sb/go/promotion/'));
  else ui.actions.append(link(txt('nodeForum'),'https://www.nodeseek.com/categories/info'),link(txt('nodePromo'),'https://www.nodeseek.com/categories/promotion'));
  ui.foot.replaceChildren();
  if (state.data) {
    const stamp = el('span',txt('time') + ' · ');
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
  const ctl = new AbortController(), timeout = setTimeout(()=>ctl.abort(),10000);
  try {
    const response = await fetch('/api/deal-feed/' + id,{signal:ctl.signal,cache:'no-store',headers:{Accept:'application/json'}});
    if (!response.ok) throw Error('feed');
    const data = await response.json();
    if (data.source !== id || !Array.isArray(data.items) || !Number.isFinite(Date.parse(data.observed))) throw Error('payload');
    state.data = {source:id,observed:data.observed,stale:data.stale === true,
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
    if (publicForumState.active === id) drawForumFeed();
  }
}
function forumConnectivityChanged() {
  if (publicForumState.root) drawForumFeed();
}
window.addEventListener('offline',forumConnectivityChanged);
window.addEventListener('online',forumConnectivityChanged);
window.document?.addEventListener('visibilitychange',scheduleForumRead);
if (!('IntersectionObserver' in window)) {
  window.addEventListener('scroll',scheduleForumRead,{passive:true});
  window.addEventListener('resize',scheduleForumRead);
}
