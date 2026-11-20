// Public RSS feeds and Telegram channel previews, fetched only from these fixed endpoints.
const forumSources = {
  nodeseek: {feed: 'https://rss.nodeseek.com/', hosts: ['www.nodeseek.com', 'nodeseek.com']},
  sb: {feed: 'https://sb.sb/go/promotion/rss.xml', hosts: ['sb.sb']},
  vpsdeer: {channel:'vpsdeer',feed:'https://t.me/s/vpsdeer'},
  vpsts: {channel:'vpsts',feed:'https://t.me/s/vpsts'},
  vpsuu: {channel:'vpsuu',feed:'https://t.me/s/vpsuu'},
  poorvpsmsg: {channel:'PoorVPSMsg',feed:'https://t.me/s/PoorVPSMsg'}
};
const forumFreshSeconds = 300;
const forumStaleSeconds = 86400;
const forumByteLimit = 1500000;
const forumKeywords = /vps|vds|kvm|hinet|cn2|cmin2|as9929|as4837|bare.?metal|dedicated server|服务器|伺服器|云主机|雲主機|独服|獨服|机房|機房|家宽|家寬|双isp|雙isp|racknerd|dmit|cloudcone|bandwagonhost|搬瓦工|绿云|綠雲|greencloud|ovhcloud|hetzner|jtti|akilecloud|tcscloud|dedione|kurun|pqs|海沫云|海沫雲|热陈互联|熱陳互聯|hostdare|raksmart|hosthatch|hosthink|ramnode|vir[m]?ach|buyvm|boilcloud|vultr|linode|digitalocean|netcup|clawcloud|vmiss/i;
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
  if (!Object.hasOwn(forumSources, source) || xml.length > forumByteLimit) throw Error('invalid feed');
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
    if (url && forumKeywords.test(title) && !posts.has(url)) {
      const time = Date.parse(current.pubdate || current.published || current.date || current.updated);
      posts.set(url, {title, link: url, ...(Number.isFinite(time) ? {date: new Date(time).toISOString()} : {})});
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
      current = {depth: stack.length, title: '', link: '', alternate: '', guid: '', id: '', pubdate: '', published: '', date: '', updated: ''};
    } else if (current && stack.length === current.depth + 1 && ['title','link','guid','id','pubdate','published','date','updated'].includes(local)) {
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
async function forumReadBody(reply) {
  if (!reply.body || Number(reply.headers.get('Content-Length') || 0) > forumByteLimit) throw Error('oversize');
  const reader = reply.body.getReader(), decoder = new TextDecoder('utf-8', {fatal:true});
  let size = 0, xml = '';
  try {
    for (;;) {
      const {value,done} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > forumByteLimit) throw Error('oversize');
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
async function forumFetchPayload(source, signal) {
  const config=forumSources[source];
  const isTelegram=!!config.channel;
  const response=await fetch(config.feed,{method:'GET',signal,redirect:isTelegram?'manual':'error',
    headers:{Accept:isTelegram?'text/html':'application/rss+xml, application/atom+xml, application/xml, text/xml'}});
  if (isTelegram && response.status>=300 && response.status<400) {
    const redirect=new URL(response.headers.get('Location') || '',config.feed);
    if (redirect.protocol==='https:' && redirect.host==='t.me' && !redirect.username && !redirect.password && !redirect.search && !redirect.hash &&
        redirect.pathname.toLowerCase()==='/'+config.channel.toLowerCase()) return {items:[],visibility:'link-only'};
    throw Error('redirect');
  }
  if (isTelegram && [404,410].includes(response.status)) return {items:[],visibility:'link-only'};
  if (!response.ok || (!isTelegram && response.headers.get('content-type')?.includes('text/html'))) throw Error('upstream');
  const document = await forumReadBody(response);
  return isTelegram ? telegramPreview(document,config.channel) : {items:forumHeadlines(document,source)};
}
async function serveForumFeed(req, ctx) {
  const path = new URL(req.url).pathname;
  const source = path.match(/^\/api\/deal-feed\/([a-z]+)$/)?.[1];
  if (!source || !Object.hasOwn(forumSources,source)) return forumResponse({error:'unknown feed'},404);
  if (req.method !== 'GET') return new Response(null,{status:405,headers:{Allow:'GET','Cache-Control':'no-store'}});
  const cache = globalThis.caches?.default;
  const key = new Request(new URL('/api/deal-feed/' + source + '?format=3',req.url));
  let cached = null;
  try { cached = await (await cache?.match(key))?.json(); } catch {}
  const age = cached ? (Date.now() - Date.parse(cached.observed)) / 1000 : Infinity;
  if (cached?.source === source && age >= 0 && age < forumFreshSeconds) return forumResponse(cached,200,Math.max(1,Math.floor(forumFreshSeconds - age)));
  const ctl = new AbortController(), timeout = setTimeout(() => ctl.abort(),7000);
  try {
    const payload = await forumFetchPayload(source,ctl.signal);
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
function stockTarget(key){
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
async function observe(t){
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
 let state;try{state=await observe(target)}catch{state='offline'}
 const result=json({key,state,sku:target.sku,zone:target.zone,checkedAt:new Date().toISOString(),source:target.url,refreshSeconds:TTL},200,state==='offline'?25:TTL);
 if(cache)ctx.waitUntil(cache.put(cacheKey,result.clone()).catch(()=>{}));
 return result;
}};
