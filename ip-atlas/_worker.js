// Public RSS feeds and Telegram channel previews, fetched only from these fixed endpoints.
const forumSources = {
  nodeseek: {feed: 'https://rss.nodeseek.com/', hosts: ['www.nodeseek.com', 'nodeseek.com']},
  carpool: {feed: 'https://rss.nodeseek.com/', hosts: ['www.nodeseek.com', 'nodeseek.com']},
  meow: {feed: 'https://meowvps.com/rss.xml', hosts: ['meowvps.com'], maxBytes: 4_000_000},
  meowoffers: {feed: 'https://meowvps.com/api/offers.json', maxBytes: 4_000_000},
  sb: {feed: 'https://sb.sb/go/promotion/rss.xml', hosts: ['sb.sb']},
  vpsdeer: {channel:'vpsdeer',feed:'https://t.me/s/vpsdeer'},
  vpsts: {channel:'vpsts',feed:'https://t.me/s/vpsts'},
  vpsuu: {channel:'vpsuu',feed:'https://t.me/s/vpsuu'},
  poorvpsmsg: {channel:'PoorVPSMsg',feed:'https://t.me/s/PoorVPSMsg'}
};
const forumFreshSeconds = 300;
const forumStaleSeconds = 86400;
const forumByteLimit = 1500000;
const forumKeywords = /vps|vds|kvm|hinet|cn2|cmin2|as9929|as4837|bare.?metal|dedicated server|服务器|伺服器|云主机|雲主機|独服|獨服|机房|機房|家宽|家寬|双isp|雙isp|racknerd|dmit|cloudcone|bandwagonhost|搬瓦工|绿云|綠雲|greencloud|ovhcloud|hetzner|jtti|akilecloud|tcscloud|dedione|kurun|pqs|海沫云|海沫雲|热陈互联|熱陳互聯|hostdare|raksmart|hosthatch|hosthink|ramnode|vir[m]?ach|buyvm|boilcloud|vultr|linode|digitalocean|netcup|clawcloud|vmiss|neburst|奶爸|mkcloud|newnb|nnb\.ltd|vmsilo/i;
function forumDecode(text) {
  const table = {amp: '&', lt: '<', gt: '>', apos: "'", quot: '"'};
  return text.replace(/&(amp|lt|gt|apos|quot|#\d{1,7}|#x[\da-f]{1,6});/gi, (all, key) => {
    if (key[0] !== '#') return table[key.toLowerCase()];
    const hex = key[1].toLowerCase() === 'x';
    const n = parseInt(key.slice(hex ? 2 : 1), hex ? 16 : 10);
    return n >= 32 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : ' ';
  });
}
function forumPostURL(raw, source) {
  if (!raw || raw.length > 800) return null;
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== 'https:' || u.username || u.password || u.port || !forumSources[source].hosts.includes(u.hostname)) return null;
    if (source === 'meow') return /^\/blog\/[\w%-]+\/$/.test(u.pathname) ? u.origin + u.pathname : null;
    if (source === 'sb') {
      const match = u.pathname.match(/^\/t\/([1-9]\d{0,14})\/?$/);
      return match ? 'https://sb.sb/t/' + match[1] + '/' : null;
    }
    const match = u.pathname.match(/^\/post-([1-9]\d{0,14})-[1-9]\d{0,5}\/?$/);
    return match ? 'https://www.nodeseek.com/post-' + match[1] + '-1' : null;
  } catch { return null; }
}
function forumOpenTag(xml, start) {
  // The sticky tokenizer advances once per name/attribute, including quoted '>' values.
  const namePattern = /[A-Za-z_:][A-Za-z0-9_.:-]*/y;
  const attrPattern = /\s+([A-Za-z_:][A-Za-z0-9_.:-]*)\s*=\s*(?:"([^"<]*)"|'([^'<]*)')/y;
  const endPattern = /\s*(\/?)>/y;
  namePattern.lastIndex = start + 1;
  const name = namePattern.exec(xml);
  if (!name) throw Error('invalid XML tag');
  let i = namePattern.lastIndex;
  const attrs = Object.create(null);
  for (;;) {
    endPattern.lastIndex = i;
    const end = endPattern.exec(xml);
    if (end) return {name: name[0], attrs, empty: !!end[1], end: endPattern.lastIndex};
    attrPattern.lastIndex = i;
    const field = attrPattern.exec(xml);
    if (!field || attrPattern.lastIndex - start > 65536 || Object.hasOwn(attrs, field[1])) throw Error('invalid XML attribute');
    attrs[field[1]] = forumDecode(field[2] ?? field[3]);
    i = attrPattern.lastIndex;
  }
}
function forumHeadlines(xml, source = 'nodeseek') {
  if (!Object.hasOwn(forumSources, source) || xml.length > (forumSources[source].maxBytes || forumByteLimit)) throw Error('invalid feed');
  const stack = [], posts = new Map();
  const localName = name => name.slice(name.lastIndexOf(':') + 1).toLowerCase();
  let current = null, field = '', fieldDepth = 0, root = '', i = 0;
  function append(raw, decode) {
    if (!stack.length && raw.trim()) throw Error('unexpected XML text');
    if (field && current && current[field].length < 1024) current[field] += (decode ? forumDecode(raw) : raw).slice(0, 1024 - current[field].length);
  }
  function close(name) {
    const depth = stack.length;
    if (!depth || stack.pop().name !== name) throw Error('unbalanced XML');
    if (fieldDepth === depth) { field = ''; fieldDepth = 0; }
    if (!current || current.depth !== depth) return;
    const title = current.title.replace(/<[^<>]{1,250}>/g, ' ').replace(/[\u0000-\u0020\u007f]+/g, ' ').trim().slice(0, 230);
    const url = forumPostURL(current.alternate || current.link || current.guid || current.id, source);
    const matches = source === 'carpool' ? current.category.trim().toLowerCase() === 'carpool'
      : source === 'meow' || forumKeywords.test(title);
    if (url && title && matches && !posts.has(url)) {
      const time = Date.parse(current.pubdate || current.published || current.date || current.updated);
      posts.set(url, {title, link: url, ...(source === 'carpool' ? {hostingTitle:forumKeywords.test(title)} : {}),
        ...(Number.isFinite(time) ? {date: new Date(time).toISOString()} : {})});
    }
    current = null;
  }
  function after(from, marker) {
    const end = xml.indexOf(marker, from);
    if (end < 0) throw Error('unterminated XML');
    return end + marker.length;
  }
  while (i < xml.length) {
    if (xml[i] !== '<') {
      const end = xml.indexOf('<', i);
      append(xml.slice(i, end === -1 ? xml.length : end), true);
      i = end === -1 ? xml.length : end;
      continue;
    }
    if (xml.startsWith('<!--', i)) { i = after(i + 4, '-->'); continue; }
    if (xml.startsWith('<?', i)) { i = after(i + 2, '?>'); continue; }
    if (xml.startsWith('<![CDATA[', i)) {
      const end = after(i + 9, ']]>');
      append(xml.slice(i + 9, end - 3), false);
      i = end;
      continue;
    }
    // DTDs, ENTITY definitions and arbitrary declarations are not part of the public feed contract.
    if (xml.startsWith('<!', i)) throw Error('unsupported XML declaration');
    if (xml.startsWith('</', i)) {
      const end = xml.indexOf('>', i + 2);
      if (end < 0) throw Error('unterminated end tag');
      close(xml.slice(i + 2, end).trim());
      i = end + 1;
      continue;
    }
    const tag = forumOpenTag(xml, i), local = localName(tag.name);
    const parent = stack.at(-1)?.local;
    if (!stack.length) {
      if (root || !['rss', 'feed'].includes(local)) throw Error('unexpected XML root');
      root = local;
    }
    stack.push({name: tag.name, local});
    if (stack.length > 64) throw Error('XML too deep');
    const rssItem = root === 'rss' && parent === 'channel' && local === 'item' && stack.length === 3;
    const atomItem = root === 'feed' && parent === 'feed' && local === 'entry' && stack.length === 2;
    if (rssItem || atomItem) {
      current = {depth: stack.length, title: '', link: '', alternate: '', guid: '', id: '', pubdate: '', published: '', date: '', updated: '', category: ''};
    } else if (current && stack.length === current.depth + 1 && ['title','link','guid','id','pubdate','published','date','updated','category'].includes(local)) {
      field = local;
      fieldDepth = stack.length;
      if (local === 'link' && root === 'feed' && tag.attrs.href && (!tag.attrs.rel || tag.attrs.rel === 'alternate')) {
        current.alternate ||= forumPostURL(tag.attrs.href, source) || '';
      }
    }
    if (tag.empty) close(tag.name);
    i = tag.end;
  }
  if (!root || stack.length) throw Error('incomplete XML');
  return Array.from(posts.values()).sort((a,b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0)).slice(0, 12);
}
async function forumReadBody(reply, limit = forumByteLimit) {
  if (!reply.body || Number(reply.headers.get('Content-Length') || 0) > limit) throw Error('oversize');
  const reader = reply.body.getReader(), decoder = new TextDecoder('utf-8', {fatal:true});
  let size = 0, xml = '';
  try {
    for (;;) {
      const {value,done} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) throw Error('oversize');
      xml += decoder.decode(value, {stream:true});
    }
    return xml + decoder.decode();
  } catch (e) {
    await reader.cancel().catch(()=>{});
    throw e;
  } finally { reader.releaseLock(); }
}
function forumResponse(data, status = 200, seconds = 0) {
  return Response.json(data, {status,headers:{
    'Cache-Control': seconds ? 'public, max-age=' + seconds : 'no-store',
    'X-Content-Type-Options':'nosniff'
  }});
}
// Telegram optional text previews. Only message text and the post's own time field are used.
function telegramPostLink(url, channel) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    if (u.protocol !== 'https:' || u.host !== 't.me' || u.username || u.password || u.search || u.hash ||
        parts.length !== 3 || parts[1].toLowerCase() !== channel.toLowerCase() || !/^[1-9]\d{0,14}$/.test(parts[2])) return '';
    return 'https://t.me/' + channel + '/' + parts[2];
  } catch { return ''; }
}
function telegramPreview(html, channel) {
  if (html.length > forumByteLimit) throw Error('oversize');
  const stack = [], posts = new Map(), lower = html.toLowerCase();
  const voidTags = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
  const rawTags = new Set(['script','style','textarea','title','noscript','template']);
  const attr = /([^\s=\/>"'<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g;
  const tagName = /<(\/?)([a-z][\w:-]*)/iy;
  let i = 0, current = null, textDepth = 0, dateDepth = 0, shell = false, wrappers = 0;
  function collect(s) {
    if (current && textDepth && current.text.length < 2200) current.text += s.slice(0,2200-current.text.length);
  }
  function finish(post) {
    if (!post.link || !post.date || !post.text.trim() || posts.has(post.link)) return;
    const lines = post.text.split(/\n+/).map(s=>s.replace(/https?:\/\/\S+/gi,'').replace(/[\s\u0000-\u001f\u007f]+/g,' ').trim()).filter(s=>s && !/^[\s\p{S}\p{P}]+$/u.test(s));
    if (!lines.length || !(forumKeywords.test(post.text) || /补货|補貨|库存|庫存|售罄|缺货|有货|現貨|restock|sold out|data changes|LET offers|vCPU|NVMe|云服务器|雲伺服器|V\.PS/i.test(post.text))) return;
    const title = lines.shift().slice(0,105);
    const snippet = lines.filter(s=>!/^([#@]|[🛒🛍]|购买链接|購買連結|立即搶購|立即抢购)/u.test(s)).join(' · ').slice(0,110);
    posts.set(post.link,{title,...(snippet ? {snippet} : {}),link:post.link,date:post.date});
  }
  function close(depth) {
    while (stack.length > depth) {
      const d = stack.length;
      if (textDepth === d) textDepth = 0;
      if (dateDepth === d) dateDepth = 0;
      if (current?.depth === d) { finish(current); current = null; }
      stack.pop();
    }
  }
  while (i < html.length) {
    const open = html.indexOf('<',i);
    if (open < 0) { collect(forumDecode(html.slice(i))); break; }
    if (open > i) collect(forumDecode(html.slice(i,open)).replace(/&nbsp;/gi,' '));
    if (html.startsWith('<!--',open)) {
      const end = html.indexOf('-->',open+4);
      if (end === -1) throw Error('incomplete HTML comment');
      i = end+3; continue;
    }
    tagName.lastIndex=open;
    const tag=tagName.exec(html);
    if (!tag) { i=open+1;continue; }
    const name=tag[2].toLowerCase(), first=tagName.lastIndex;
    let pos=first, quote='';
    for (;pos<html.length && pos-first<=65536;pos++) {
      const ch=html[pos];
      if (quote) { if (ch===quote) quote=''; }
      else if (ch==='"' || ch==="'") quote=ch;
      else if (ch==='>') break;
    }
    if (pos===html.length || pos-first>65536) throw Error('invalid HTML tag');
    i=pos+1;
    if (tag[1]) {
      const index=stack.lastIndexOf(name);
      if (index!==-1) close(index);
      continue;
    }
    if (rawTags.has(name)) {
      const stop=lower.indexOf('</'+name+'>',i);
      if (stop===-1) throw Error('unclosed raw tag');
      i=stop+name.length+3;continue;
    }
    const attributes=Object.create(null);
    for (const m of html.slice(first,pos).matchAll(attr)) {
      if (['class','data-post','href','datetime'].includes(m[1].toLowerCase())) attributes[m[1].toLowerCase()]=forumDecode(m[2]??m[3]??m[4]??'');
    }
    const classes=(attributes.class || '').split(/\s+/);
    if (classes.some(c=>['tgme_page_wrap','tgme_page','tgme_channel_info','tgme_page_action','tgme_channel_history'].includes(c))) shell=true;
    if (voidTags.has(name)) { if (name==='br') collect('\n'); continue; }
    stack.push(name);
    if (stack.length>128) throw Error('HTML too deep');
    if (classes.includes('tgme_widget_message') && attributes['data-post'] && !current) {
      const link=telegramPostLink('https://t.me/'+attributes['data-post'],channel);
      if (link) { wrappers++;current={depth:stack.length,text:'',link,date:''}; }
    }
    if (!current) continue;
    if (classes.includes('tgme_widget_message_text') && !textDepth) textDepth=stack.length;
    if (name==='a' && classes.includes('tgme_widget_message_date') && telegramPostLink(attributes.href,channel)===current.link) dateDepth=stack.length;
    if (dateDepth && name==='time' && /^\d{4}-\d{2}-\d{2}T.+(?:Z|[+-]\d{2}:?\d{2})$/i.test(attributes.datetime || '')) {
      const stamp=Date.parse(attributes.datetime);
      if (Number.isFinite(stamp)) current.date=new Date(stamp).toISOString();
    }
  }
  // Unrelated HTML, including challenge pages, is a failed read. A genuine channel landing page can be link-only.
  if (!wrappers && !shell) throw Error('unexpected Telegram page');
  return {items:Array.from(posts.values()).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,12),...(wrappers?{}:{visibility:'link-only'})};
}
function meowMerchantEvents(document) {
  const rows = JSON.parse(document);
  if (!Array.isArray(rows)) throw Error('unexpected merchant timeline');
  const items = [];
  const seen = new Set();
  for (const row of rows) {
    if (!row || typeof row.html !== 'string' || typeof row.merchant !== 'string' ||
        !/^[\p{L}\p{N}_-]{1,80}$/u.test(row.merchant) || row.html.length > 65536) continue;
    const html = row.html;
    const clean = s => forumDecode(s.replace(/<[^>]*>/g,' ')).replace(/https?:\/\/\S+/gi,'').replace(/[\s\u0000-\u001f]+/g,' ').trim();
    const sourceName = clean(html.match(/class="merchant-name"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || '');
    const fullText = clean(html.match(/class="offer-body"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || '').replace(/^[=\s]+|^服务器[：:]\s*/g,'');
    const date = Date.parse(html.match(/<time\s+datetime="([^"]+)"/i)?.[1]);
    if (!sourceName || !fullText || !Number.isFinite(date)) continue;
    const key = row.merchant + ':' + date + ':' + fullText.slice(0,50);
    if (seen.has(key)) continue;
    seen.add(key);
    // The timeline supports deep-linking to a merchant. Use the original post when it supplies one.
    const original = forumDecode(html.match(/<a\s+class="original-link"\s+href="([^"]+)"/i)?.[1] || '');
    const sourceLink = /^https:\/\/lowendtalk\.com\/discussion\/[1-9]\d{0,12}\/[a-z0-9-]+\/?$/i.test(original) ? original : '';
    const link = sourceLink || 'https://meowvps.com/timeline/?merchant=' + encodeURIComponent(row.merchant) + '#offers';
    const title = fullText.length > 64 ? fullText.slice(0,64).trimEnd() + '…' : fullText;
    items.push({title, sourceName:sourceName.slice(0,60), link, date:new Date(date).toISOString()});
    if (items.length === 12) break; // The public timeline delivers newest first.
  }
  if (rows.length && !items.length) throw Error('unrecognized merchant records');
  return {items};
}
async function forumFetchPayload(source, signal) {
  const config=forumSources[source];
  const isTelegram=!!config.channel;
  const response=await fetch(config.feed,{method:'GET',signal,redirect:isTelegram?'manual':'error',
    headers:{Accept:isTelegram?'text/html':source==='meowoffers'?'application/json':'application/rss+xml, application/atom+xml, application/xml, text/xml'}});
  if (isTelegram && response.status>=300 && response.status<400) {
    const redirect=new URL(response.headers.get('Location') || '',config.feed);
    if (redirect.protocol==='https:' && redirect.host==='t.me' && !redirect.username && !redirect.password && !redirect.search && !redirect.hash &&
        redirect.pathname.toLowerCase()==='/'+config.channel.toLowerCase()) return {items:[],visibility:'link-only'};
    throw Error('redirect');
  }
  if (isTelegram && [404,410].includes(response.status)) return {items:[],visibility:'link-only'};
  if (!response.ok || (!isTelegram && response.headers.get('content-type')?.includes('text/html'))) throw Error('upstream');
  const document = await forumReadBody(response,config.maxBytes || forumByteLimit);
  if (source === 'meowoffers') return meowMerchantEvents(document);
  return isTelegram ? telegramPreview(document,config.channel) : {items:forumHeadlines(document,source)};
}
async function serveForumFeed(req, ctx) {
  const path = new URL(req.url).pathname;
  const source = path.match(/^\/api\/deal-feed\/([a-z]+)$/)?.[1];
  if (!source || !Object.hasOwn(forumSources,source)) return forumResponse({error:'unknown feed'},404);
  if (req.method !== 'GET') return new Response(null,{status:405,headers:{Allow:'GET','Cache-Control':'no-store'}});
  const cache = globalThis.caches?.default;
  const key = new Request(new URL('/api/deal-feed/' + source + '?format=4',req.url));
  let cached = null;
  try { cached = await (await cache?.match(key))?.json(); } catch {}
  const age = cached ? (Date.now() - Date.parse(cached.observed)) / 1000 : Infinity;
  if (cached?.source === source && age >= 0 && age < forumFreshSeconds) return forumResponse(cached,200,Math.max(1,Math.floor(forumFreshSeconds - age)));
  const ctl = new AbortController(), timeout = setTimeout(() => ctl.abort(),forumSources[source].maxBytes ? 14000 : 7000);
  try {
    const payload = await forumFetchPayload(source,ctl.signal);
    if (source === 'carpool' && cached?.source === source && Array.isArray(cached.items)) {
      // Keep recently seen group buys when the short global RSS window rolls forward.
      const recent = cached.items.filter(post => Date.parse(post.date) >= Date.now() - 86400_000);
      const unique = new Map([...recent,...payload.items].map(post => [post.link,post]));
      payload.items = [...unique.values()].sort((a,b) => Date.parse(b.date) - Date.parse(a.date)).slice(0,12);
    }
    const body = {source,observed:new Date().toISOString(),stale:false,...payload};
    if (cache) {
      const write = cache.put(key,forumResponse(body,200,forumStaleSeconds)).catch(()=>{});
      if (ctx?.waitUntil) ctx.waitUntil(write); else await write;
    }
    return forumResponse(body,200,forumFreshSeconds);
  } catch {
    if (cached?.source === source && age >= 0 && age < forumStaleSeconds) return forumResponse({...cached,stale:true},200,30);
    return forumResponse({source,error:'upstream unavailable'},503);
  } finally { clearTimeout(timeout); }
}
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
    products.set(product.id,{group:group.slug,sku:product.slug,product});
   }
  }
  data={products,sold:new Set(inventory.products)};
 }else{
  const result=await storefrontJson('https://api.nnb.ltd/api/v1/nodes');
  if(result.code!==200||!Array.isArray(result.data?.items))throw Error('Invalid node catalog');
  data=result.data.items;
 }
 recentStorefronts.set(family,{expires:now+25000,data,at:new Date().toISOString()});
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

function amountFor(value){
 if(typeof value!=='string'&&typeof value!=='number')return null;
 const amount=String(value);
 return /^\d{1,8}(?:\.\d{1,4})?$/.test(amount)?amount:null;
}
function shortText(text){
 return typeof text==='string'?text.replace(/<[^>]{0,500}>/g,' ').replace(/\s+/g,' ').trim().slice(0,240):'';
}
function rangeText(range,unit){
 if(!Number.isFinite(range?.min)||!Number.isFinite(range?.max)||range.min<0||range.max<range.min)return '';
 return (range.min===range.max?range.min:range.min+'–'+range.max)+' '+unit;
}
function newNbOffer(node){
 const amount=amountFor(node.monthly_prices?.base?.yuan);
 if(node.monthly_available!==true||amount===null)return null;
 const net=Array.isArray(node.primary_nics)?node.primary_nics.slice(0,5):[];
 const network=net.map(n=>[shortText(n.label),shortText(n.hint)].filter(Boolean).join(' · ')).filter(Boolean);
 const allowance=net.map(n=>({min:n.traffic?.min_gb,max:n.traffic?.max_gb})).map(r=>rangeText(r,'GB')).filter(Boolean);
 return {amount,currency:'CNY',period:'month',basis:'base',
  cpu:rangeText(node.limits?.cpu,'vCPU'),ram:rangeText(node.limits?.memory_gb,'GB'),disk:rangeText(node.limits?.disk_gb,'GB'),
  port:rangeText(node.limits?.bandwidth_mbps,'Mbps'),traffic:[...new Set(allowance)].join(' / '),
  direction:node.traffic_direction==='both'?'both':'',route:network.join(' / '),ip:'',access:''};
}
function mkOffer(product){
 const amount=amountFor(product.price?.monthly);
 if(amount===null)return null;
 const description=String(product.description||'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]{0,500}>/g,' ');
 const first=(re)=>shortText(description.match(re)?.[1]);
 const cpu=first(/CPU[ \t]*([\d.]+)[ \t]*核/i),ram=first(/内存[ \t]*([\d.]+[ \t]*GB)/i),disk=first(/硬盘[ \t]*([\d.]+[ \t]*[TG]B)/i);
 const speed=description.match(/带宽[ \t]*([\d.]+)[ \t]*([GM])(?:bps)?[ \t]*(峰值|独享)?/i);
 const port=speed?Number(speed[1])*(speed[2].toUpperCase()==='G'?1000:1)+' Mbps':'';
 const ingress=first(/入口[ \t]+([^\r\n|]+)/),egress=first(/出口[ \t]+([^\r\n|]+)/);
 return {amount,currency:'CNY',period:'month',basis:'listed',cpu:cpu?cpu+(description.includes('独立服务器')?' cores':' vCPU'):'',ram,disk,port,
  portType:speed?.[3]==='峰值'?'peak':speed?.[3]==='独享'?'dedicated':'',
  traffic:first(/流量\/月[ \t]+([^\r\n|]+)/),route:[ingress,egress].filter(Boolean).join(' → '),
  ip:first(/(独享IPv4[^\r\n|]+)/i),access:shortText(product.name)};
}
function vmsiloOffer(target,html){
 // Require exactly one card with both the merchant-assigned product ID and expected heading.
 const cards=[...html.matchAll(/<article\b[^>]{0,600}\bid=["']product(\d+)["'][^>]*>([\s\S]*?)<\/article>/gi)].filter(m=>Number(m[1])===target.pid);
 if(cards.length!==1)return null;
 const body=cards[0][2];
 if(shortText(body.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i)?.[1])!==target.sku)return null;
 const footer=body.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i)?.[1]||'';
 const amount=amountFor(shortText(footer.match(/<span\s+class=["']price["'][^>]*>([^<]*)<\/span>/i)?.[1]).match(/^¥?\s*(\d+(?:\.\d+)?)\s*CNY$/)?.[1]);
 if(amount===null||!/<small>\/\s*month<\/small>/i.test(footer))return null;
 const fields={};
 const desc=body.match(/<div\s+class=["']bv-plan-desc["'][^>]*>([\s\S]*?)<footer/i)?.[1]||'';
 for(const line of desc.split(/<br\s*\/?>/i)){
  const parts=shortText(line).match(/^(CPU Cores|Amount Of RAM|Disk Space|IPV4|IPV6|Bandwidth|Network Rate)[：:]\s*(.+)$/i);
  if(parts)fields[parts[1].toLowerCase()]=parts[2];
 }
 const qty=(value,rawUnit,unit)=>new RegExp('^(\\d+)'+rawUnit+'$','i').test(value)?parseInt(value,10)+' '+unit:'';
 const rate=fields['network rate']?.match(/^(\d+)Mbps[（(](Shared)[）)]$/i);
 const transfer=fields.bandwidth?.match(/^(\d+)G[（(]in\+out[）)]$/i);
 return {amount,currency:'CNY',period:'month',basis:'base-config',
  cpu:qty(fields['cpu cores'],'','vCPU'),ram:qty(fields['amount of ram'],'M','MB'),disk:qty(fields['disk space'],'G','GB'),
  port:rate?rate[1]+' Mbps':'',portType:rate?'shared':'',traffic:transfer?transfer[1]+' GB':'',direction:transfer?'both':'',
  ip:fields.ipv4!=null&&fields.ipv6!=null?'IPv4 × '+fields.ipv4+' / IPv6 × '+fields.ipv6:'',
  route:target.sku,access:'IEPL'};
}
async function lagomObservation(t){
 const now=Date.now(),cached=recentStorefronts.get(t.family);
 let html=cached?.data,at=cached?.at;
 if(!cached||cached.expires<=now){
  const r=await fetch(t.url,{redirect:'error',signal:AbortSignal.timeout(7000),headers:{accept:'text/html'},cf:{cacheEverything:true,cacheTtl:45}});
  const age=Number(r.headers.get('age')||0);
  if(!r.ok||!r.headers.get('content-type')?.includes('text/html')||!Number.isFinite(age)||age>300)throw Error('Invalid store response');
  html=new TextDecoder().decode(await readLimitedBytes(r.body,350000));at=new Date().toISOString();recentStorefronts.set(t.family,{expires:now+25000,data:html,at});
 }
 const nodes=html.split(/<div\b[^>]*class=["']package["'][^>]*id=["']product/i).slice(1);
 const card=nodes.filter(row=>row.startsWith(t.pid+'"')||row.startsWith(t.pid+"'"));
 if(card.length!==1)return {state:'unreported',offer:null};
 const packageBody=card[0].split(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*(?:<\/section>|<form|<script)/i)[0].slice(0,18000);
 const field=(re)=>shortText(packageBody.match(re)?.[1]);
 if(field(/<h3\s+class=["']package-title["'][^>]*>([\s\S]*?)<\/h3>/i)!==t.sku)return {state:'unreported',offer:null};
 const qty=field(/<div\s+class=["']package-qty["'][^>]*>([\s\S]*?)<\/div>/i).match(/^(\d+)\s*(?:可用|Available)$/i);
 let state=qty?(Number(qty[1])===0?'sold-out':'in-stock'):'unreported';
 if(!qty&&/(?:>\s*(?:Out of stock|Sold out|售完|缺貨|缺货)\s*<)/i.test(packageBody))state='sold-out';
 const cycle=field(/<div\s+class=["']price-cycle[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
 const price=field(/<div\s+class=["']price-amount[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
 const isBack=t.family==='backwaves';
 const literal=isBack?price.match(/^HK\$(\d+(?:\.\d+)?)$/):price.match(/^€(\d+(?:[,.]\d{1,2})?)\s*EUR$/);
 const amount=amountFor(literal?.[1].replace(',','.'));
 if(amount===null||!/^(?:月繳|月缴|Monthly)$/i.test(cycle))return {state,offer:null};
 const lines=[...packageBody.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/ig)].map(m=>shortText(m[1]));
 const line=(pattern)=>lines.find(value=>pattern.test(value))||'';
 const without=(pattern)=>line(pattern).replace(pattern,'').trim();
 const offer={amount,currency:isBack?'HKD':'EUR',period:'month',basis:'starting',checkedAt:at,
  cpu:isBack?without(/^vCPU\s+/i):line(/^\d+\s*vCore/i),ram:isBack?without(/^vRAM\s+/i):line(/DDR5 RAM$/i),
  disk:isBack?without(/^vDisk\s+/i):line(/SSD Storage$/i),port:isBack?without(/^Shared Port\s+/i):line(/Bandwidth \(FUP\)/i),portType:isBack?'shared':'',
  traffic:isBack?without(/^Traffic\s+/i):'',ip:isBack?[without(/^IPv4\s+/),without(/^IPv6\s+/)].filter(Boolean).join(' / '):'',route:isBack?t.sku:'',access:''};
 return {state,offer};
}

async function vultrDocument(cacheKey,url){
 const now=Date.now(),cached=recentStorefronts.get(cacheKey);
 if(cached&&cached.expires>now)return cached;
 const r=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(6500),headers:{accept:'application/json'},cf:{cacheEverything:true,cacheTtl:45}});
 const age=Number(r.headers.get('age')||0);
 if(!r.ok||!r.headers.get('content-type')?.includes('application/json')||!Number.isFinite(age)||age>300)throw Error('Invalid Vultr source');
 const raw=await readLimitedBytes(r.body,350000),data=JSON.parse(new TextDecoder().decode(raw));
 const result={expires:now+25000,data,at:new Date().toISOString()};recentStorefronts.set(cacheKey,result);return result;
}
async function vultrObservation(t){
 const [rates,availability]=await Promise.allSettled([vultrDocument('vultr-plans',t.priceUrl),vultrDocument('vultr-'+t.zone,t.url)]);
 let state='offline',offer=null;
 if(availability.status==='fulfilled'){
  const list=availability.value.data.available_plans;
  state=!Array.isArray(list)||!list.every(x=>typeof x==='string')?'unreported':list.includes(t.sku)?'in-stock':'sold-out';
 }
 if(rates.status==='fulfilled'){
  const document=rates.value.data,plans=document.plans;
  const matched=Array.isArray(plans)?plans.filter(p=>p.id===t.sku&&p.type==='vc2'&&Array.isArray(p.locations)&&p.locations.includes(t.zone)):[];
  if(matched.length===1){
   const p=matched[0],override=p.location_cost?.[t.zone],amount=amountFor(override?override.monthly_cost:p.monthly_cost);
   const quantity=(v,u)=>Number.isFinite(v)&&v>0?v+' '+u:'';
   if(amount!==null&&p.invoice_type==='monthly')offer={amount,currency:'USD',period:'month',basis:'listed',checkedAt:rates.value.at,
    cpu:quantity(p.vcpu_count,'vCPU'),ram:quantity(p.ram,'MB'),disk:quantity(p.disk,'GB')+(typeof p.disk_type==='string'?' '+shortText(p.disk_type):''),traffic:quantity(p.bandwidth,'GB'),
    port:'',ip:'',route:'',access:''};
  }
 }
 return {state,offer};
}

async function tamagoObservation(t){
 const r=await fetch(t.url,{redirect:'error',signal:AbortSignal.timeout(7000),headers:{accept:'text/html'},cf:{cacheEverything:true,cacheTtl:45}});
 const age=Number(r.headers.get('age')||0);
 if(!r.ok||!r.headers.get('content-type')?.includes('text/html')||!Number.isFinite(age)||age>300)throw Error('Invalid Tamago catalog');
 const html=new TextDecoder().decode(await readLimitedBytes(r.body,250000));
 const matched=[...html.matchAll(/<div\b[^>]*\bid=["']product27["'][^>]*>([\s\S]*?<\/footer>)/ig)];
 if(matched.length!==1)return {state:'unreported',offer:null};
 const card=matched[0][1],name=shortText(card.match(/<span\s+id=["']product27-name["']>([^<]+)<\/span>/i)?.[1]);
 if(name!==t.sku||/<div\b[^>]*\bid=["']product\d+["']/.test(card))return {state:'unreported',offer:null};
 const header=card.match(/<header>([\s\S]*?)<\/header>/i)?.[1]||'',quantity=shortText(header.match(/<span\s+class=["']qty["']>([\s\S]*?)<\/span>/i)?.[1]).match(/^(\d+)\s*(?:可用|Available)$/i);
 const state=quantity?quantityStatus([quantity[1]]):'unreported';
 const pricing=shortText(card.match(/<div\b[^>]*id=["']product27-price["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]);
 const amount=amountFor(pricing.match(/^\$(\d+(?:\.\d+)?) USD (?:月繳|月缴|Monthly)$/i)?.[1]);
 if(amount===null)return {state,offer:null};
 const description=card.match(/<p\s+id=["']product27-description["']>([\s\S]*?)<\/p>/i)?.[1]||'';
 const lines=description.split(/<br\s*\/?>/i).map(shortText);
 const get=re=>lines.find(s=>re.test(s))||'';
 return {state,offer:{amount,currency:'USD',period:'month',basis:'listed',checkedAt:new Date().toISOString(),
  cpu:get(/^\d+x\s+AMD/i),ram:get(/^\d+\s+GB\s+DDR/i),disk:get(/^\d+\s+GB\s+NVMe/i),port:get(/^(?:共享|Shared)\s+\d+\s+Mbps/i).replace(/^(?:共享|Shared)\s+/i,''),
  portType:'shared',traffic:get(/^\d+\s+GB\s+(?:流量|Traffic)/i).replace(/\s+(?:流量|Traffic)$/i,''),route:get(/^WTT\s/i),ip:get(/^\d+\s+.+IPv4$/i),access:''}};
}

async function observeListing(target){
 if(target.family==="tamago")return tamagoObservation(target);
 if(target.family==="vultr")return vultrObservation(target);
 if(["backwaves","wasabi"].includes(target.family))return lagomObservation(target);
 if(target.family==='vmsilo'){
  const now=Date.now(),cached=recentStorefronts.get('vmsilo');let html=cached?.data,at=cached?.at;
  if(!cached||cached.expires<=now){
   const r=await fetch(target.url,{redirect:'error',signal:AbortSignal.timeout(7000),headers:{accept:'text/html','accept-language':'en'},cf:{cacheEverything:true,cacheTtl:60}});
   if(!r.ok||!r.headers.get('content-type')?.includes('text/html')||Number(r.headers.get('age')||0)>300)throw Error('Invalid store HTML');
   html=new TextDecoder().decode(await readLimitedBytes(r.body,300000));at=new Date().toISOString();recentStorefronts.set('vmsilo',{expires:now+25000,data:html,at});
  }
  const offer=vmsiloOffer(target,html);
  return {state:'unreported',offer:offer?{...offer,checkedAt:at}:null};
 }
 if(target.family!=='mkcloud'&&target.family!=='nnb')return {state:await observe(target),offer:null};
 const data=await currentStorefront(target.family),state=classifyStorefront(target,data);
 let offer=null;
 if(target.family==='mkcloud'){
  const p=data.products.get(target.pid);
  if(p?.group===target.group&&p.sku===target.sku)offer=mkOffer(p.product);
 }else{
  const nodes=data.filter(n=>n.id===target.pid&&n.name===target.sku&&n.region===target.region);
  if(nodes.length===1)offer=newNbOffer(nodes[0]);
 }
 return {state,offer:offer?{...offer,checkedAt:recentStorefronts.get(target.family).at}:null};
}

async function observe(t){
 if(["vmsilo","backwaves","wasabi","vultr","tamago"].includes(t.family))return (await observeListing(t)).state;
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
function json(body,status=200,age=0){
 return Response.json(body,{status,headers:{'Cache-Control':age?'public, max-age='+age:'no-store','X-Content-Type-Options':'nosniff'}});
}
export default {async fetch(req,env,ctx){
 const url=new URL(req.url);
 if(url.pathname.startsWith('/api/deal-feed/'))return serveForumFeed(req,ctx);
 if(url.pathname.startsWith('/api/stock-history/'))return json({installed:false},200,60);
 if(!url.pathname.startsWith('/api/stock/'))return env.ASSETS.fetch(req);
 if(req.method!=='GET')return json({error:'GET required'},405);
 const key=url.pathname.slice(11),target=stockTarget(key);
 if(!target)return json({error:'Unknown stock probe'},404);
 const cache=globalThis.caches?.default;
 const cacheKey=new Request(url.origin+url.pathname,{method:'GET'});
 const hit=cache&&await cache.match(cacheKey);
 if(hit)return hit;
 let observation;try{observation=await observeListing(target)}catch{observation={state:'offline',offer:null}}
 const result=json({key,...observation,schemaVersion:10,sku:target.sku,zone:target.zone,checkedAt:new Date().toISOString(),source:target.url,refreshSeconds:TTL},200,observation.state==='offline'?25:TTL);
 if(cache)ctx.waitUntil(cache.put(cacheKey,result.clone()).catch(()=>{}));
 return result;
}};
