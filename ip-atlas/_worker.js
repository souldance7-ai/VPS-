// Public RSS feeds and Telegram channel previews, fetched only from these fixed endpoints.
const forumSources = {
  lowendtalk: {feed:'https://lowendtalk.com/categories/offers/feed.rss',hosts:['lowendtalk.com'],maxBytes:1_500_000},
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
const packagedForumPosts={"nodeseek":{"source":"nodeseek","observed":"2026-11-20T06:33:00.142Z","stale":true,"editionSnapshot":true,"items":[{"title":"【收】剩余价值收Vmiss tri basic 4.5cad/月","link":"https://www.nodeseek.com/post-1067683-1","date":"2026-11-20T06:29:27.000Z"},{"title":"帮收两台，共溢价2500，ovh杜甫独服，sys-stor-le-1，4x12t硬盘的","link":"https://www.nodeseek.com/post-1067676-1","date":"2026-11-20T06:26:53.000Z"},{"title":"130收68段VMISS 4.5 TRI","link":"https://www.nodeseek.com/post-1067673-1","date":"2026-11-20T06:26:04.000Z"},{"title":"【交易中】【杀鸡】十块改油，RN racknerd，2025黑五10刀","link":"https://www.nodeseek.com/post-1067669-1","date":"2026-11-20T06:25:44.000Z"}]},"carpool":{"source":"carpool","observed":"2026-11-20T06:33:00.142Z","stale":true,"editionSnapshot":true,"items":[{"title":"gemini 20x 独享或两人700 独享 350 拼车","link":"https://www.nodeseek.com/post-1067686-1","hostingTitle":false,"date":"2026-11-20T06:30:00.000Z"}]},"meow":{"source":"meow","observed":"2026-11-20T06:34:01.784Z","stale":true,"editionSnapshot":true,"items":[{"title":"新商家GoldCloud 德国DC1产品 新品测评","link":"https://meowvps.com/blog/goldcloudde/","coupons":[{"code":"GCFWZDB75BUM"}],"date":"2026-11-18T23:00:00.000Z"},{"title":"PPFlight 美国洛杉矶LAX LIFT产品 测评","link":"https://meowvps.com/blog/ppflightlift/","date":"2026-11-17T23:00:00.000Z"},{"title":"Gomami 德国FRA Pulse产品 新品测评","link":"https://meowvps.com/blog/gomamide/","coupons":[{"code":"Hi,FRA"}],"date":"2026-11-15T23:00:00.000Z"},{"title":"新商家Bocchi 日本东京Tokyo高性能 新品首发测评","link":"https://meowvps.com/blog/bocchijp/","coupons":[{"code":"MeowVPS"}],"date":"2026-11-13T23:00:00.000Z"},{"title":"六六云 菲律宾双ISP产品 测评","link":"https://meowvps.com/blog/666cloudsph/","coupons":[{"code":"DOUBLE11"}],"date":"2026-11-12T23:00:00.000Z"},{"title":"新商家干杯云 AT&T商业宽带PRO美国家宽 产品测评","link":"https://meowvps.com/blog/usvps24proup/","coupons":[{"code":"MeowVPS"}],"date":"2026-11-11T23:00:00.000Z"},{"title":"商家NexKr 韩国SKB家宽产品 测评","link":"https://meowvps.com/blog/nexkrskb/","coupons":[{"code":"WELCOME"},{"code":"SMSVERIFYFEE"}],"date":"2026-11-10T23:00:00.000Z"},{"title":"新商家Tamago 香港WTT商宽 新品测评","link":"https://meowvps.com/blog/tamagowtt/","coupons":[{"code":"1111W3R3PM"}],"date":"2026-11-08T23:00:00.000Z"},{"title":"新商家ATTVPS AT&T美国家宽产品 复测","link":"https://meowvps.com/blog/attvpsre/","coupons":[{"code":"MeowVPS"}],"date":"2026-11-07T23:00:00.000Z"},{"title":"JCloudHosting 西班牙产品 测评","link":"https://meowvps.com/blog/jcloudhosting/","coupons":[{"code":"79FHTOS7JL"}],"date":"2026-11-05T23:00:00.000Z"},{"title":"新商家PanstarCloud 美国LAX Premium DC2 新品测评","link":"https://meowvps.com/blog/panstarusdc2/","coupons":[{"code":"USPre75DC2"}],"date":"2026-11-03T23:00:00.000Z"}]},"meowoffers":{"source":"meowoffers","observed":"2026-11-20T06:34:01.885Z","stale":true,"editionSnapshot":true,"items":[{"title":"LayerOne 提供 VPS，地区未注明，限量入门款为 1 vCPU、1 GB 内存、15 GB NVMe，7 美元/年。另一…","sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223566/layerone-black-friday-limited-time-offers-7-yr-flash-sale","date":"2026-11-19T21:12:36.000Z"},{"title":"VPSNerds 提供独立服务器，称覆盖 32 个以上地点，但未列出本次套餐具体地区；起步配置为 Xeon D-1531（6 核…","sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223563/99-9-uptime-high-powered-dedicated-servers-32-locations-world-wide","date":"2026-11-19T19:38:06.000Z"},{"title":"1GB 套餐 1 GB 内存 1 CPU 核心 20 GB SSD 存储 3000 GB 月流量 1 Gbps 带宽 1个 IP…","sourceName":"RackNerd","link":"https://meowvps.com/timeline/?merchant=racknerd_promo#offers","date":"2026-11-19T17:53:58.000Z"},{"title":"RackNerd 提供多地区 KVM VPS、达拉斯共享及分销主机和独服，VPS 可选地区以订单页库存为准。VPS 起步为 1…","sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223558/racknerd-s-black-friday-takeover-new-deals-new-tech-adminbolt-hosting-hundreds-of-giveaways","date":"2026-11-19T17:48:20.000Z"},{"title":"AvaHosting 提供共享主机、VPS 和独服，机房地区未注明；Nano VPS 配备 1 vCPU、512MB 内存、20…","coupons":[{"code":"BFAVA"}],"sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways","date":"2026-11-18T17:14:12.000Z"}]},"sb":{"source":"sb","observed":"2026-11-20T06:34:01.026Z","stale":true,"editionSnapshot":true,"items":[{"title":"PQS 双十一优惠活动即将开跑!","link":"https://sb.sb/t/18494/","date":"2026-11-09T07:47:39.000Z"},{"title":"🔥海沫云｜双十一特惠年付｜香港 / 美国 / 大陆","link":"https://sb.sb/t/18177/","date":"2026-11-08T07:38:19.000Z"}]},"lowendtalk":{"source":"lowendtalk","observed":"2026-11-20T06:33:06.265Z","stale":true,"editionSnapshot":true,"items":[{"title":"LayerOne - BLACK FRIDAY! Limited time offers! - $7/yr FLASH SALE","link":"https://lowendtalk.com/discussion/223566/layerone-black-friday-limited-time-offers-7-yr-flash-sale","date":"2026-11-19T21:12:36.000Z"},{"title":"RackNerd’s BLACK FRIDAY TAKEOVER! NEW DEALS, NEW TECH, AdminBolt HOSTING + HUNDREDS OF GIVEAWAYS!","link":"https://lowendtalk.com/discussion/223558/racknerd-s-black-friday-takeover-new-deals-new-tech-adminbolt-hosting-hundreds-of-giveaways","date":"2026-11-19T17:48:20.000Z"},{"title":"noez.de – Prepaid Hosting from Frankfurt, since 2012","link":"https://lowendtalk.com/discussion/223518/noez-de-prepaid-hosting-from-frankfurt-since-2012","date":"2026-11-19T11:17:21.000Z"},{"title":"Looking for a cPanel alternative? Get aaPanel Pro for $98 for one year and save $190","link":"https://lowendtalk.com/discussion/223509/looking-for-a-cpanel-alternative-get-aapanel-pro-for-98-for-one-year-and-save-190","date":"2026-11-19T04:12:18.000Z"},{"title":"Ava.hosting - Black Friday Deals + BIG Restock VPS Nano! + Giveaways!","link":"https://lowendtalk.com/discussion/223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways","coupons":[{"code":"BFAVA"}],"date":"2026-11-18T17:14:12.000Z"},{"title":"Streamline-Servers.com - Sydney Dedicated Servers - Early-Black Friday","link":"https://lowendtalk.com/discussion/223393/streamline-servers-com-sydney-dedicated-servers-early-black-friday","coupons":[{"code":"BLACKFRIDAY26SERVER"}],"date":"2026-11-16T23:08:54.000Z"},{"title":"PetroSky Black Friday Sale | 30% OFF KVM VPS in Canada & France | From €4.89/mo","link":"https://lowendtalk.com/discussion/223377/petrosky-black-friday-sale-30-off-kvm-vps-in-canada-france-from-4-89-mo","coupons":[{"code":"BLACKFRIDAY"}],"date":"2026-11-16T16:05:24.000Z"}]},"vpsdeer":{"source":"vpsdeer","observed":"2026-11-20T06:34:02.206Z","stale":true,"editionSnapshot":true,"items":[{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2657","date":"2026-11-20T05:14:24.000Z"},{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2656","date":"2026-11-20T05:14:17.000Z"},{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2655","date":"2026-11-20T05:13:52.000Z"},{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2654","date":"2026-11-20T03:02:44.000Z"}]},"vpsts":{"source":"vpsts","observed":"2026-11-20T06:34:02.187Z","stale":true,"editionSnapshot":true,"items":[{"title":"ZgoCloud - DE Frankfurt AMD VPS - Specials - Starter","link":"https://t.me/vpsts/4425","date":"2026-11-20T06:08:54.000Z"},{"title":"PPFlight库存监控补货通知专属频道","link":"https://t.me/vpsts/4424","date":"2026-11-20T02:54:42.000Z"},{"title":"RackNerd - 2026黑五促销","link":"https://t.me/vpsts/4423","date":"2026-11-19T19:00:55.000Z"},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano - 补货","coupons":[{"code":"Hi,FRA"}],"link":"https://t.me/vpsts/4421","date":"2026-11-18T08:06:49.000Z"},{"title":"❌ GoMami - 🗻LAX.Pulse.Nano - 已售罄","coupons":[{"code":"Hi,LAX"}],"link":"https://t.me/vpsts/4420","date":"2026-11-18T08:06:45.000Z"},{"title":"PPFlight - [US.LAX02] Glide M1","coupons":[{"code":"glideyyds"}],"link":"https://t.me/vpsts/4410","date":"2026-11-17T09:46:40.000Z"},{"title":"PPFlight - [US.LAX02] Glide S1","coupons":[{"code":"glideyyds"}],"link":"https://t.me/vpsts/4409","date":"2026-11-17T09:46:28.000Z"}]},"vpsuu":{"source":"vpsuu","observed":"2026-11-20T06:34:02.173Z","stale":true,"editionSnapshot":true,"items":[{"title":"LayerOne 黑五促销 🖥","link":"https://t.me/vpsuu/6008","date":"2026-11-20T02:11:35.000Z"},{"title":"RackNerd 2026黑五促销 🛒","link":"https://t.me/vpsuu/6007","date":"2026-11-20T00:29:16.000Z"},{"title":"RAKsmart 黑五：香港物理机秒杀$29.99/月，VPS秒杀$2.99/月起，可选国际BGP/大陆优化/精品CN2","link":"https://t.me/vpsuu/6005","date":"2026-11-19T12:15:44.000Z"},{"title":"AVA Host 黑五 8折：VPS 月付 €4 起，Nano €11/年，摩尔多瓦机房/不限流量","link":"https://t.me/vpsuu/6004","date":"2026-11-19T08:58:00.000Z"},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano 补货","coupons":[{"code":"Hi,FRA"}],"link":"https://t.me/vpsuu/6000","date":"2026-11-18T10:07:02.000Z"},{"title":"✅ GoMami - 🗻LAX.Pulse.Nano 补货","coupons":[{"code":"Hi,LAX"}],"link":"https://t.me/vpsuu/5999","date":"2026-11-18T10:06:33.000Z"},{"title":"PPFlight [US.LAX02] Glide S1 补货 🚀","coupons":[{"code":"glideyyds"}],"link":"https://t.me/vpsuu/5995","date":"2026-11-17T10:17:32.000Z"}]},"poorvpsmsg":{"source":"poorvpsmsg","observed":"2026-11-20T06:34:02.165Z","stale":true,"editionSnapshot":true,"items":[{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4807","date":"2026-11-20T06:26:20.000Z"},{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4806","date":"2026-11-20T01:56:22.000Z"},{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4805","date":"2026-11-19T22:56:22.000Z"},{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4804","date":"2026-11-19T22:26:19.000Z"}]},"coupons":{"source":"coupons","observed":"2026-11-20T06:34:02.206Z","items":[{"title":"Ava.hosting - Black Friday Deals + BIG Restock VPS Nano! + Giveaways!","code":"BFAVA","link":"https://lowendtalk.com/discussion/223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways","date":"2026-11-18T17:14:12.000Z","from":"lowendtalk","sourceName":"","sourceObserved":"2026-11-20T06:33:06.265Z","archived":true},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano 补货","code":"Hi,FRA","link":"https://t.me/vpsuu/6000","date":"2026-11-18T10:07:02.000Z","from":"vpsuu","sourceName":"","sourceObserved":"2026-11-20T06:34:02.173Z","archived":true},{"title":"✅ GoMami - 🗻LAX.Pulse.Nano 补货","code":"Hi,LAX","link":"https://t.me/vpsuu/5999","date":"2026-11-18T10:06:33.000Z","from":"vpsuu","sourceName":"","sourceObserved":"2026-11-20T06:34:02.173Z","archived":true},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano - 补货","code":"Hi,FRA","link":"https://t.me/vpsts/4421","date":"2026-11-18T08:06:49.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"❌ GoMami - 🗻LAX.Pulse.Nano - 已售罄","code":"Hi,LAX","link":"https://t.me/vpsts/4420","date":"2026-11-18T08:06:45.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"PPFlight [US.LAX02] Glide S1 补货 🚀","code":"glideyyds","link":"https://t.me/vpsuu/5995","date":"2026-11-17T10:17:32.000Z","from":"vpsuu","sourceName":"","sourceObserved":"2026-11-20T06:34:02.173Z","archived":true},{"title":"PPFlight - [US.LAX02] Glide M1","code":"glideyyds","link":"https://t.me/vpsts/4410","date":"2026-11-17T09:46:40.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"PPFlight - [US.LAX02] Glide S1","code":"glideyyds","link":"https://t.me/vpsts/4409","date":"2026-11-17T09:46:28.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"Streamline-Servers.com - Sydney Dedicated Servers - Early-Black Friday","code":"BLACKFRIDAY26SERVER","link":"https://lowendtalk.com/discussion/223393/streamline-servers-com-sydney-dedicated-servers-early-black-friday","date":"2026-11-16T23:08:54.000Z","from":"lowendtalk","sourceName":"","sourceObserved":"2026-11-20T06:33:06.265Z","archived":true},{"title":"PetroSky Black Friday Sale | 30% OFF KVM VPS in Canada & France | From €4.89/mo","code":"BLACKFRIDAY","link":"https://lowendtalk.com/discussion/223377/petrosky-black-friday-sale-30-off-kvm-vps-in-canada-france-from-4-89-mo","date":"2026-11-16T16:05:24.000Z","from":"lowendtalk","sourceName":"","sourceObserved":"2026-11-20T06:33:06.265Z","archived":true}],"sources":[{"source":"lowendtalk","observed":"2026-11-20T06:33:06.265Z","stale":true,"editionSnapshot":true},{"source":"nodeseek","observed":"2026-11-20T06:33:00.142Z","stale":true,"editionSnapshot":true},{"source":"meowoffers","observed":"2026-11-20T06:34:01.885Z","stale":true,"editionSnapshot":true},{"source":"sb","observed":"2026-11-20T06:34:01.026Z","stale":true,"editionSnapshot":true},{"source":"vpsdeer","observed":"2026-11-20T06:34:02.206Z","stale":true,"editionSnapshot":true},{"source":"vpsts","observed":"2026-11-20T06:34:02.187Z","stale":true,"editionSnapshot":true},{"source":"vpsuu","observed":"2026-11-20T06:34:02.173Z","stale":true,"editionSnapshot":true},{"source":"poorvpsmsg","observed":"2026-11-20T06:34:02.165Z","stale":true,"editionSnapshot":true}],"stale":true,"editionSnapshot":true}};
function recentPackagedPosts(id){
 const item=packagedForumPosts[id],age=Date.now()-Date.parse(item?.observed);
 return age>=0&&age<14*86400000?item:null;
}
const couponFeedSources=['lowendtalk','nodeseek','meowoffers','sb','vpsdeer','vpsts','vpsuu','poorvpsmsg'];
function publishedCouponCodes(raw){
 if(typeof raw!=='string')return [];
 const text=forumDecode(raw.slice(0,16000)).replace(/<(?:br\s*\/?|\/p|\/li|\/div)>/gi,'\n').replace(/<[^<>]{0,1000}>/g,' ')
   .replace(/https?:\/\/[^\s<>]+/gi,' ').replace(/&nbsp;/gi,' ');
 const labels=/(?:優惠(?:券)?碼|优惠(?:券)?码|折扣[码碼]|促[销銷][码碼]|(?:\b(?:coupon|promo(?:tional)?|discount|voucher)(?:\s+code)?|\buse\s+(?:the\s+)?code))(\s*[:：=]\s*|\s+(?:is\s+)?)(?:[“"'\x60*]{0,3})([A-Za-z0-9][A-Za-z0-9_.-]{1,48}(?:,[A-Za-z0-9][A-Za-z0-9_-]{0,20})?)/gi;
 const stop=/^(?:code|codes|here|this|does|only|where|with|not|none|unknown|expired|for|the|while|will|works|discount|expires|available|until|applied|auto|automatic|included|please|details|terms|using|notapplicable|undefined|null|offer|off|valid|new|https?|www|click|needed|applies|use|needed|removed|codeword|already|can|cannot|required|after|before|now|special|black|back|any|said|useful|hidden|was|has|that|last|free|all|more|from|credit|checkout|range|start|ends|and|thru|sent|worth|see|released|stock|time|end|summary)$/i;
 const out=new Map();
 for(const m of text.matchAll(labels)){
  const code=m[2].replace(/[.-]+$/,'');if(code.length<3||stop.test(code)||/^\d+(?:[.,]\d+)?$/.test(code))continue;
  if(!/[:：=]/.test(m[1])&&!/[A-Z0-9_-]/.test(code))continue;
  const after=text.slice(m.index+m[0].length,m.index+m[0].length+100).split(/[\r\n]/,1)[0];
  const expiry=after.match(/^\s*[,，;；(（|]?\s*(?:expires?(?:\s+at)?|valid until|截止(?:時間|时间)?|有效至|到期(?:時間|时间)?)\s*[:：]?\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2}))/i);
  const exp=Date.parse(expiry?.[1]),endsAt=Number.isFinite(exp)?new Date(exp).toISOString():null;
  if(!out.has(code))out.set(code,{code,...(endsAt?{endsAt}:{})});if(out.size===5)break;
 }
 return [...out.values()];
}
function aggregatePublicCodes(records,now=Date.now()){
 const items=[],seen=new Set(),sources=[];
 for(const from of couponFeedSources){
  const data=records[from];if(!data||data.source!==from||!Array.isArray(data.items))continue;
  if(!Number.isFinite(Date.parse(data.observed))||now-Date.parse(data.observed)>14*86400000)continue;
  sources.push({source:from,observed:data.observed,stale:!!data.stale,editionSnapshot:!!data.editionSnapshot});
  for(const post of data.items){
   const date=Date.parse(post.date);if(!Number.isFinite(date)||date>now+60000||date<now-14*86400000)continue;
   for(const {code,endsAt} of post.coupons||[]){
    if((endsAt&&Date.parse(endsAt)<=now)||seen.has(post.link+'|'+code))continue;
    seen.add(post.link+'|'+code);items.push({title:post.title,code,link:post.link,date:post.date,from,sourceName:post.sourceName||'',sourceObserved:data.observed,archived:!!data.stale,...(endsAt?{endsAt}:{})});
   }
  }
 }
 items.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
 return {source:'coupons',observed:new Date(now).toISOString(),items:items.slice(0,30),sources,stale:sources.every(s=>s.stale),editionSnapshot:sources.length>0&&sources.every(s=>s.editionSnapshot)};
}
async function servePublicCodes(req,ctx){
 if(req.method!=='GET')return new Response(null,{status:405,headers:{Allow:'GET'}});
 const records={};
 await Promise.all(couponFeedSources.map(async source=>{
  try{const url=new URL('/api/deal-feed/'+source,req.url);
   const res=await serveForumFeed(new Request(url),ctx);
   if(res.ok)records[source]=await res.json();
  }catch{}
 }));
 const body=aggregatePublicCodes(records);
 if(!body.sources.length)return forumResponse({error:'coupon sources unavailable'},503);
 return forumResponse(body,200,body.stale?30:180);
}
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
    if (source === 'lowendtalk') return /^\/discussion\/[1-9]\d{0,12}\/[a-z0-9-]+\/?$/i.test(u.pathname) && !u.search ? u.origin+u.pathname : null;
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
    const limit=['description','summary','encoded','content'].includes(field)?16000:1024;
    if (field && current && current[field].length < limit) current[field] += (decode ? forumDecode(raw) : raw).slice(0, limit - current[field].length);
  }
  function close(name) {
    const depth = stack.length;
    if (!depth || stack.pop().name !== name) throw Error('unbalanced XML');
    if (fieldDepth === depth) { field = ''; fieldDepth = 0; }
    if (!current || current.depth !== depth) return;
    const title = current.title.replace(/<[^<>]{1,250}>/g, ' ').replace(/[\u0000-\u0020\u007f]+/g, ' ').trim().slice(0, 230);
    const url = forumPostURL(current.alternate || current.link || current.guid || current.id, source);
    const matches = source === 'carpool' ? current.category.trim().toLowerCase() === 'carpool'
      : source === 'meow' || source === 'lowendtalk' || forumKeywords.test(title);
    if (url && title && matches && !posts.has(url)) {
      const time = Date.parse(current.pubdate || current.published || current.date || current.updated);
      const coupons=publishedCouponCodes([current.title,current.encoded||current.content||current.description||current.summary].join('\n'));
      posts.set(url, {title, link: url,...(coupons.length?{coupons}:{}), ...(source === 'carpool' ? {hostingTitle:forumKeywords.test(title)} : {}),
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
      current = {depth: stack.length, title: '', link: '', alternate: '', guid: '', id: '', pubdate: '', published: '', date: '', updated: '', category: '', description:'',summary:'',encoded:'',content:''};
    } else if (current && stack.length === current.depth + 1 && ['title','link','guid','id','pubdate','published','date','updated','category','description','summary','encoded','content'].includes(local)) {
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
    const coupons=publishedCouponCodes(post.text);
    posts.set(post.link,{title,...(coupons.length?{coupons}:{}),...(snippet ? {snippet} : {}),link:post.link,date:post.date});
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
    const coupons=publishedCouponCodes(fullText);
    items.push({title,...(coupons.length?{coupons}:{}), sourceName:sourceName.slice(0,60), link, date:new Date(date).toISOString()});
    if (items.length === 12) break; // The public timeline delivers newest first.
  }
  if (rows.length && !items.length) throw Error('unrecognized merchant records');
  return {items};
}
async function forumFetchPayload(source, signal) {
  const config=forumSources[source];
  const isTelegram=!!config.channel;
  const response=await fetch(config.feed,{method:'GET',signal,redirect:'manual',
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
  if(source==='coupons')return servePublicCodes(req,ctx);
  if (!source || !Object.hasOwn(forumSources,source)) return forumResponse({error:'unknown feed'},404);
  if (req.method !== 'GET') return new Response(null,{status:405,headers:{Allow:'GET','Cache-Control':'no-store'}});
  const cache = globalThis.caches?.default;
  const key = new Request(new URL('/api/deal-feed/' + source + '?format=6',req.url));
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
    const saved=recentPackagedPosts(source);
    return saved?forumResponse(saved,200,30):forumResponse({source,error:'upstream unavailable'},503);
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
const catalogStockTargets = {
 "ms-bage-jp-small": {
  "family": "bagevm",
  "sku": "Japan - SMALL",
  "zone": "JP",
  "pid": 33,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-tiny": {
  "family": "bagevm",
  "sku": "Japan - TINY",
  "zone": "JP",
  "pid": 31,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-starter": {
  "family": "bagevm",
  "sku": "Japan - STARTER",
  "zone": "JP",
  "pid": 28,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-medium": {
  "family": "bagevm",
  "sku": "Japan - MEDIUM",
  "zone": "JP",
  "pid": 29,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "ms-bage-jp-large": {
  "family": "bagevm",
  "sku": "Japan - LARGE",
  "zone": "JP",
  "pid": 30,
  "url": "https://www.bagevm.com/index.php/store/japan-servers"
 },
 "regional-matrix-q1-1": {
  "family": "matrix",
  "sku": "Q1 - LA - 活动款",
  "zone": "LAX",
  "pid": 9,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-2": {
  "family": "matrix",
  "sku": "Q1 - LA - 标准款",
  "zone": "LAX",
  "pid": 10,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-3": {
  "family": "matrix",
  "sku": "Q1 - LA - 进阶款",
  "zone": "LAX",
  "pid": 11,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-4": {
  "family": "matrix",
  "sku": "Q1 - LA - 高阶款",
  "zone": "LAX",
  "pid": 12,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q1-5": {
  "family": "matrix",
  "sku": "Q1 - LA - 顶配款",
  "zone": "LAX",
  "pid": 13,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-1": {
  "family": "matrix",
  "sku": "Q2 - LA - 活动款",
  "zone": "LAX",
  "pid": 33,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-2": {
  "family": "matrix",
  "sku": "Q2 - LA - 轻量款",
  "zone": "LAX",
  "pid": 38,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-3": {
  "family": "matrix",
  "sku": "Q2 - LA - 标准款",
  "zone": "LAX",
  "pid": 39,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-4": {
  "family": "matrix",
  "sku": "Q2 - LA - 进阶款",
  "zone": "LAX",
  "pid": 40,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-q2-5": {
  "family": "matrix",
  "sku": "Q2 - LA - 顶配款",
  "zone": "LAX",
  "pid": 41,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-1": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 活动款",
  "zone": "SJC",
  "pid": 4,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-2": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 轻量款",
  "zone": "SJC",
  "pid": 5,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-3": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 标准款",
  "zone": "SJC",
  "pid": 6,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-4": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 进阶款",
  "zone": "SJC",
  "pid": 7,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-5": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 顶配款",
  "zone": "SJC",
  "pid": 16,
  "url": "https://matrixidc.net/compare-plans"
 },
 "regional-matrix-4837-6": {
  "family": "matrix",
  "sku": "圣何塞 4837 优化 pro",
  "zone": "SJC",
  "pid": 43,
  "url": "https://matrixidc.net/compare-plans"
 },
 "let11-prepaid-8": {
  "family": "prepaid",
  "sku": "PreBF-8",
  "zone": "DE",
  "code": "prebf-8",
  "url": "https://prepaid-host.com/en/aktion/prebf-8"
 },
 "let11-prepaid-10": {
  "family": "prepaid",
  "sku": "PreBF-10",
  "zone": "DE",
  "code": "prebf-10",
  "url": "https://prepaid-host.com/en/aktion/prebf-8"
 },
 "let11-prepaid-16": {
  "family": "prepaid",
  "sku": "FLASH-16",
  "zone": "DE",
  "code": "flash-16",
  "url": "https://prepaid-host.com/en/aktion/prebf-8"
 },
 "ms-bwh-usca-5-p166": {
  "family": "bwh",
  "sku": "80G KVM - ECOMMERCE SLA LOS ANGELES",
  "zone": "LAX",
  "pid": 166,
  "dc": "USCA_5",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usca-6-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "LAX",
  "pid": 89,
  "dc": "USCA_6",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usca-9-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "LAX",
  "pid": 89,
  "dc": "USCA_9",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usca-sjc5-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "SJC",
  "pid": 89,
  "dc": "USCA_SJC5",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-hk-8-p95": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - HONG KONG CN2 GIA",
  "zone": "HK",
  "pid": 95,
  "dc": "HK_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-jpos-6-p134": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - OSAKA CN2 GIA",
  "zone": "JP",
  "pid": 134,
  "dc": "JPOS_6",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-jpty-8-p108": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - TOKYO CN2 GIA",
  "zone": "JP",
  "pid": 108,
  "dc": "JPTY_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-sg-8-p173": {
  "family": "bwh",
  "sku": "SPECIAL 40G KVM PROMO V5 - SINGAPORE CN2 GIA",
  "zone": "SG",
  "pid": 173,
  "dc": "SG_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-cabc-6-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "CA",
  "pid": 89,
  "dc": "CABC_6",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "bwh-ams": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "NL",
  "pid": 89,
  "dc": "EUNL_9",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-usny-8-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "US",
  "pid": 89,
  "dc": "USNY_8",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 },
 "ms-bwh-aedxb-1-p89": {
  "family": "bwh",
  "sku": "SPECIAL 80G KVM PROMO V5 - CN2 GIA ECOMMERCE",
  "zone": "AE",
  "pid": 89,
  "dc": "AEDXB_1",
  "cycle": "monthly",
  "url": "https://bandwagonhost.com/order/catalog.json"
 }
};
Object.assign(catalogStockTargets,{
 "ms-akile-859": {
  "family": "akile",
  "sku": "TW-Dynamic-STD",
  "zone": "TW",
  "area": 6,
  "node": 16,
  "pid": 859,
  "priceId": 1235,
  "cycle": 1,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "ms-akile-906": {
  "family": "akile",
  "sku": "TW-Static-2G",
  "zone": "TW",
  "area": 6,
  "node": 21,
  "pid": 906,
  "priceId": 1297,
  "cycle": 1,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "akile-hinet": {
  "family": "akile",
  "sku": "TWHinet-Mini-NAT",
  "zone": "TW",
  "area": 6,
  "node": 31,
  "pid": 980,
  "priceId": 1402,
  "cycle": 12,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "ms-akile-827": {
  "family": "akile",
  "sku": "TWLite-Mini",
  "zone": "TW",
  "area": 6,
  "node": 11,
  "pid": 827,
  "priceId": 1181,
  "cycle": 1,
  "url": "https://api.akile.ai/api/v1/store/GetVpsStoreV3"
 },
 "ms-isvoro-149": {
  "family": "isvoro",
  "sku": "HK CN2 Core",
  "zone": "HK",
  "pid": 149,
  "category": 46,
  "planId": 297,
  "url": "https://isvoro.com/api/v1/products?page=1"
 }
});
Object.assign(catalogStockTargets,{
 "supp-akko-sjc-1": {
  "family": "akko",
  "sku": "美国圣何塞KVM-CN2-A2 mini年付特惠套餐",
  "zone": "SJC",
  "quoteOnly": true,
  "pid": 175,
  "url": "https://www.akkocloud.com/cart.php?gid=17"
 },
 "supp-akko-sjc-2": {
  "family": "akko",
  "sku": "美西圣何塞KVM-CN2-B1 mini 年付特惠套餐",
  "zone": "SJC",
  "quoteOnly": true,
  "pid": 187,
  "url": "https://www.akkocloud.com/cart.php?gid=17"
 },
 "supp-akko-sjc-3": {
  "family": "akko",
  "sku": "美国圣何塞KVM-CN2-B1",
  "zone": "SJC",
  "quoteOnly": true,
  "pid": 178,
  "url": "https://www.akkocloud.com/cart.php?gid=17"
 }
});
Object.assign(catalogStockTargets,{
 "mhy-p46": {
  "family": "mhy",
  "sku": "TW-HKG - 512M",
  "zone": "HK",
  "pid": 46,
  "path": "/index.php/store/tw-hkg/tw-hkg-512",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p47": {
  "family": "mhy",
  "sku": "TW-HKG - 1024M",
  "zone": "HK",
  "pid": 47,
  "path": "/index.php/store/tw-hkg/tw-hkg-1024m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p48": {
  "family": "mhy",
  "sku": "TW-HKG - 2048M",
  "zone": "HK",
  "pid": 48,
  "path": "/index.php/store/tw-hkg/tw-hkg-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p49": {
  "family": "mhy",
  "sku": "TW-HKG - 4096M",
  "zone": "HK",
  "pid": 49,
  "path": "/index.php/store/tw-hkg/tw-hkg-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/tw-hkg"
 },
 "mhy-p30": {
  "family": "mhy",
  "sku": "HK BGP - 512M",
  "zone": "HK",
  "pid": 30,
  "path": "/index.php/store/hk-vps/hk-bgp",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p31": {
  "family": "mhy",
  "sku": "HK BGP - 1024M",
  "zone": "HK",
  "pid": 31,
  "path": "/index.php/store/hk-vps/hk-vps-1024m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p32": {
  "family": "mhy",
  "sku": "HK BGP - 2048M",
  "zone": "HK",
  "pid": 32,
  "path": "/index.php/store/hk-vps/hk-bgp-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p33": {
  "family": "mhy",
  "sku": "HK BGP - 4096M",
  "zone": "HK",
  "pid": 33,
  "path": "/index.php/store/hk-vps/hk-bgp-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/hk-vps"
 },
 "mhy-p64": {
  "family": "mhy",
  "sku": "德国BGP-512M",
  "zone": "DE",
  "pid": 64,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-512m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p56": {
  "family": "mhy",
  "sku": "德国BGP-1024M",
  "zone": "DE",
  "pid": 56,
  "path": "/index.php/store/bgp-9929/deyusyushyushouyushou",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p59": {
  "family": "mhy",
  "sku": "德国BGP-2048M",
  "zone": "DE",
  "pid": 59,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p60": {
  "family": "mhy",
  "sku": "德国BGP-4096M",
  "zone": "DE",
  "pid": 60,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p67": {
  "family": "mhy",
  "sku": "德国BGP-年付-512M",
  "zone": "DE",
  "pid": 67,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-nian-fu-512m",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p57": {
  "family": "mhy",
  "sku": "德国BGP-年付1024M",
  "zone": "DE",
  "pid": 57,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-9929-nian-fu-yu-shou",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p58": {
  "family": "mhy",
  "sku": "德国BGP-年付2048M",
  "zone": "DE",
  "pid": 58,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-yu-shou-kuan-nian-fu-2",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p62": {
  "family": "mhy",
  "sku": "德国BGP-年付4096M",
  "zone": "DE",
  "pid": 62,
  "path": "/index.php/store/bgp-9929/de-guo-bgp-9929-yu-shou-kuan-nian-fu-4096m",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/bgp-9929"
 },
 "mhy-p52": {
  "family": "mhy",
  "sku": "MO-HKG - 512M",
  "zone": "HK",
  "pid": 52,
  "path": "/index.php/store/mo-hkg/mo-hkg-512m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p53": {
  "family": "mhy",
  "sku": "MO-HKG - 1024M",
  "zone": "HK",
  "pid": 53,
  "path": "/index.php/store/mo-hkg/mo-hkg-1024m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p54": {
  "family": "mhy",
  "sku": "MO-HKG - 2048M",
  "zone": "HK",
  "pid": 54,
  "path": "/index.php/store/mo-hkg/mo-hkg-2048m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p55": {
  "family": "mhy",
  "sku": "MO-HKG - 4096M",
  "zone": "HK",
  "pid": 55,
  "path": "/index.php/store/mo-hkg/mo-hkg-4096m",
  "period": "month",
  "url": "https://mhyidc.com/index.php/store/mo-hkg"
 },
 "mhy-p51": {
  "family": "mhy",
  "sku": "香港BGP - 新年特别款",
  "zone": "HK",
  "pid": 51,
  "path": "/index.php/store/huo-dong/xiang-gang-bgp-xin-nian-te-bie-kuan",
  "period": "year",
  "url": "https://mhyidc.com/index.php/store/huo-dong"
 }
});
Object.assign(networkStockTargets,catalogStockTargets);
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
 const reply=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(11000),headers:{accept:catalog?'application/octet-stream, application/json':'application/json'},cf:{cacheEverything:true,cacheTtl:catalog?300:25}});
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
  const r=await fetch(t.url,{redirect:'manual',signal:AbortSignal.timeout(7000),headers:{accept:'text/html'},cf:{cacheEverything:true,cacheTtl:45}});
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
 const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(6500),headers:{accept:'application/json'},cf:{cacheEverything:true,cacheTtl:45}});
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
 const r=await fetch(t.url,{redirect:'manual',signal:AbortSignal.timeout(7000),headers:{accept:'text/html'},cf:{cacheEverything:true,cacheTtl:45}});
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

async function loadProviderCatalog(t) {
 const key=t.family+':'+t.url, now=Date.now(),cached=recentStorefronts.get(key);
 if(cached&&cached.expires>now)return cached;
 const jsonFormat=['bwh','akile','isvoro'].includes(t.family);
 const reply=await fetch(t.url,{redirect:'manual',signal:AbortSignal.timeout(11000),
  headers:{Accept:jsonFormat?'application/json':'text/html','Accept-Language':'en'},
  cf:{cacheEverything:true,cacheTtl:25}});
 const age=Number(reply.headers.get('age')||0),type=reply.headers.get('content-type')||'';
 if(!reply.ok||!Number.isFinite(age)||age>300||!(jsonFormat?/application\/json/i:/text\/html/i).test(type))throw Error('Unavailable provider catalog');
 const body=new TextDecoder().decode(await readLimitedBytes(reply.body,jsonFormat?1500000:450000));
 const entry={expires:now+25000,at:new Date(now-age*1000).toISOString(),data:jsonFormat?JSON.parse(body):body};
 recentStorefronts.set(key,entry);return entry;
}
function inventoryCount(n){
 return Number.isSafeInteger(n)&&n>=0?(n===0?'sold-out':'in-stock'):'unreported';
}
function bageObservation(t,data,at){
 const escaped=t.pid,block=data.match(new RegExp('<h5\\s+id="product'+escaped+'-name">([\\s\\S]{1,480}?)</h5>','i'));
 if(!block||shortText(block[1].split('<em')[0])!==t.sku)return {state:'unreported',offer:null};
 const raw=shortText(block[1]).match(/\b(\d+) Available$/i),state=raw?inventoryCount(Number(raw[1])):'unreported';
 const card=data.slice(block.index+block[0].length).split(/<h5\s+id="product\d+-name"/i)[0];
 const priceSection=card.match(new RegExp('id="product'+escaped+'-price"[^>]*>([\\s\\S]*?)</div>','i'))?.[1]||'';
 const amount=amountFor(shortText(priceSection.match(/class="price"[^>]*>([\s\S]*?)<\/span>/i)?.[1]).match(/^\$(\d+(?:\.\d+)?) USD$/)?.[1]);
 if(amount===null||shortText(priceSection.match(/class="cycle"[^>]*>([\s\S]*?)<\/span>/)?.[1])!=='Monthly')return {state,offer:null};
 const desc=card.match(new RegExp('id="product'+escaped+'-description"[^>]*>([\\s\\S]*?)</div>','i'))?.[1]||'';
 const lines=desc.split(/<br\s*\/?>/i).map(shortText),transfer=lines.find(s=>/\bTransfer\s*@/i.test(s))?.match(/^(\d+(?:\.\d+)?\s*[GT]B)\s+Transfer\s*@\s*(\d+)\s*Mbps/i);
 return {state,offer:{amount,currency:'USD',period:'month',basis:'listed',checkedAt:at,cpu:lines.find(s=>/^\d+\s*vCPU$/i.test(s))||'',
  ram:lines.find(s=>/^\d+\s*GB RAM$/i.test(s))||'',disk:lines.find(s=>/^\d+\s*GB SSD$/i.test(s))||'',port:transfer?transfer[2]+' Mbps':'',
  traffic:transfer?.[1]||'',direction:/In\s*(?:&amp;|&)\s*Out/i.test(desc)?'both':'',ip:lines.find(s=>/IPv4.+IPv6/i.test(s))?.replace(/&amp;/g,'&')||''}};
}
function matrixObservation(t,html,at){
 const rows=[...html.matchAll(/<tr\b([^>]*\bdata-matrix-product="(\d+)"[^>]*)>([\s\S]*?)<\/tr>/gi)].filter(m=>Number(m[2])===t.pid);
 if(rows.length!==1)return {state:'unreported',offer:null};
 const cells=[...rows[0][3].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(m=>shortText(m[1]));
 if(cells.length!==6||cells[0]!==t.sku)return {state:'unreported',offer:null};
 const stock=cells[5].match(/^剩余\s*(\d+)\s*台$/);
 const state=!/\bdata-stock-ready="1"/.test(rows[0][1])?'unreported':stock?inventoryCount(Number(stock[1])):cells[5]==='已售罄'?'sold-out':'unreported';
 const amount=amountFor(cells[4].match(/^¥\s*(\d+(?:\.\d+)?)\s*\/\s*月付$/)?.[1]);
 if(amount===null)return {state,offer:null};
 const [cpu,ram]=cells[1].split(/\s*\/\s*/),[disk,ip]=cells[2].split(/\s*\/\s*/),[port,traffic]=cells[3].split(/\s*\/\s*/);
 return {state,offer:{amount,currency:'CNY',period:'month',basis:'listed',checkedAt:at,cpu,ram,disk,ip,
  port,traffic:traffic?.replace(/\s*双向合计$/,'')||'',direction:traffic?.includes('双向合计')?'both':''}};
}
function prepaidObservation(t,html,at){
 const cards=[...html.matchAll(/<article\b[^>]*\bdata-promo-card="([^"]+)"[^>]*>([\s\S]*?)<\/article>/gi)].filter(m=>m[1]===t.code);
 if(cards.length!==1)return {state:'unreported',offer:null};
 const body=cards[0][2],field=re=>shortText(body.match(re)?.[1]);
 if(field(/<h3\b[^>]*class="phb-name"[^>]*>([\s\S]*?)<\/h3>/i)!==t.sku)return {state:'unreported',offer:null};
 const ends=Date.parse(body.match(/<time\s+datetime="([^"]+)"/i)?.[1]),stock=field(/<span\b[^>]*class="phb-flag[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
 if(!Number.isFinite(ends)||Date.now()>=ends)return {state:'unreported',offer:null};
 const state=/^sold out$/i.test(stock)?'sold-out':/^(?:in stock|available)$/i.test(stock)?'in-stock':'unreported';
 const raw=field(/<span\b[^>]*class="phb-price__num"[^>]*>([\s\S]*?)<\/span>/i);
 const amount=amountFor(raw.match(/^(\d+(?:[,.]\d{2})?)\s*€$/)?.[1].replace(',','.'));
 const period={'/ year':'year','/ month':'month'}[field(/class="phb-price__per"[^>]*>([\s\S]*?)<\/span>/i)];
 if(amount===null||!period)return {state,offer:null};
 const lines=[...body.matchAll(/<li><i[^>]*><\/i><span>([\s\S]*?)<\/span>/gi)].map(m=>shortText(m[1]));
 return {state,offer:{amount,currency:'EUR',period,basis:'listed',checkedAt:at,cpu:lines.find(s=>/^\d+\s*vCore/i.test(s))||'',ram:lines.find(s=>/\bRAM\b/i.test(s))||'',
  disk:lines.find(s=>/\bNVMe\b/i.test(s))||'',port:lines.find(s=>/(?:Gbit|Gbps|Mbps)/i.test(s))||'',traffic:lines.find(s=>/\bTB\b/i.test(s))||''}};
}
function bwhObservation(t,catalog,at){
 const rows=Array.isArray(catalog?.offers)?catalog.offers.filter(o=>o.product_id===t.pid&&o.location?.datacenter_id===t.dc&&o.price?.billing_period===t.cycle):[];
 if(rows.length!==1||rows[0].name!==t.sku)return {state:'unreported',offer:null};
 const row=rows[0],spec=row.specifications||{},state=row.available===true?'in-stock':row.available===false?'sold-out':'unreported',cents=row.price.amount_cents;
 const period={monthly:'month',quarterly:'quarter',semiannually:'halfyear',annually:'year'}[t.cycle];
 if(!period||row.price.currency!=='USD'||!Number.isSafeInteger(cents)||cents<0)return {state,offer:null};
 const measure=(k,unit)=>Number.isFinite(spec[k])&&spec[k]>0?spec[k]+' '+unit:'';
 return {state,offer:{amount:(cents/100).toFixed(2),currency:'USD',period,basis:'listed',checkedAt:at,cpu:measure('vcpu_count','vCPU'),ram:measure('ram_mb','MB'),disk:measure('storage_gb','GB'),port:measure('port_speed_mbps','Mbps'),traffic:measure('transfer_gb_per_month','GB')}};
}
function akileObservation(t,catalog,at){
 if(catalog.status_code!==0||!Array.isArray(catalog.data?.areas))return {state:'unreported',offer:null};
 const areas=catalog.data.areas.filter(a=>a.id===t.area),nodes=areas.length===1?areas[0].nodes?.filter(n=>n.id===t.node):[];
 const matching=nodes?.length===1?nodes[0].plans?.filter(p=>p.id===t.pid&&p.plan_name===t.sku):[];
 if(matching?.length!==1)return {state:'unreported',offer:null};
 const p=matching[0],state=p.is_pre_sale===false?inventoryCount(p.stock):'unreported',prices=p.price_datas?.filter(c=>c.id===t.priceId&&c.cycle===t.cycle);
 if(prices?.length!==1||!Number.isSafeInteger(prices[0].price)||prices[0].price<0)return {state,offer:null};
 const measure=(n,u)=>Number.isFinite(n)&&n>0?n+' '+u:'';
 return {state,offer:{amount:(prices[0].price/100).toFixed(2),currency:'CNY',period:t.cycle===12?'year':'month',basis:'listed',checkedAt:at,cpu:measure(p.cpu,'vCPU'),ram:measure(p.memory,'MB'),disk:measure(p.disk,'GB'),port:measure(p.bandwidth,'Mbps'),traffic:measure(p.flow,'GB')}};
}
function isvoroObservation(t,catalog,at){
 if(catalog.code!==0||!Array.isArray(catalog.data))return {state:'unreported',offer:null};
 const rows=catalog.data.filter(p=>p.id===t.pid&&p.category_id===t.category&&p.name===t.sku&&p.hidden===false);
 if(rows.length!==1)return {state:'unreported',offer:null};
 const p=rows[0],settings=Object.fromEntries((p.settings||[]).filter(s=>s.settingable_id===t.pid).map(s=>[s.key,s.value]));
 const state=p.ip_available===false?'sold-out':settings.presale_enabled==='0'?inventoryCount(p.stock):'unreported';
 const plans=p.plans?.filter(s=>s.priceable_id===t.pid&&s.id===t.planId&&s.billing_period===1&&s.billing_unit==='month'&&s.type==='recurring'&&s.hidden===false);
 const rates=plans?.length===1?plans[0].prices?.filter(r=>r.plan_id===t.planId&&r.currency_code==='CNY'):[];
 const amount=rates?.length===1?amountFor(rates[0].price):null;
 if(amount===null)return {state,offer:null};
 const measure=(k,u)=>/^[1-9]\d*$/.test(settings[k])?settings[k]+' '+u:'';
 return {state,offer:{amount,currency:'CNY',period:'month',basis:'listed',checkedAt:at,cpu:measure('cores','vCPU'),ram:measure('memory','MB'),disk:measure('disk','GB'),port:p.extension==='Proxmox' && Number(settings.ratelimit)>0?Number(settings.ratelimit)*8+' Mbps':'',traffic:p.extension==='Proxmox'?measure('bandwidth_limit','GB'):''}};
}
function akkoObservation(t,html,at){
 const empty={state:'unreported',offer:null},cards=[...html.matchAll(/<div\b[^>]*class="product clearfix"[^>]*id="product(\d+)"[^>]*>([\s\S]*?)<\/footer>/gi)];
 const match=cards.filter(c=>c[2].includes('href="cart.php?a=add&pid='+t.pid+'"')&&shortText(c[2].match(/id="product\d+-name">([\s\S]*?)<\/span>/i)?.[1])===t.sku);
 if(match.length!==1)return empty;
 const card=match[0][2],prices=card.match(/class="product-pricing"[^>]*>([\s\S]*?)<\/div>/i)?.[1]||'';
 const amount=amountFor(shortText(prices.match(/class="price">([\s\S]*?)<\/span>/i)?.[1]).match(/^[￥¥]\s*(\d+(?:\.\d+)?)\s*CNY$/)?.[1]),label=shortText(prices),period=label.endsWith('每年')?'year':label.endsWith('每月')?'month':null;
 if(amount===null||!period)return empty;
 const desc=shortText(card.match(/id="product\d+-description">([\s\S]*?)<\/p>/i)?.[1]),field=(re,suffix='')=>{const x=desc.match(re)?.[1];return x?x+suffix:''};
 return {state:'unreported',offer:{amount,currency:'CNY',period,basis:'listed',checkedAt:at,cpu:field(/vCPU[：:]\s*(\d+)/i,' vCPU'),ram:field(/内存[：:]\s*(\d+\s*MB)/),disk:field(/空间[：:]\s*(\d+\s*GB(?: SSD)?)/),port:field(/(\d+)\s*Mbps/i,' Mbps'),traffic:field(/流量[：:]\s*双向\s*(\d+\s*GB)/),direction:desc.includes('双向')?'both':''}};
}
function mhyObservation(t,html,at){
 const empty={state:'unreported',offer:null};
 const starts=[...html.matchAll(/<div\b[^>]*class="package"[^>]*id="product(\d+)"[^>]*>/gi)],matches=starts.filter(block=>Number(block[1])===t.pid);
 if(matches.length!==1)return empty;
 const block=matches[0],end=starts[starts.indexOf(block)+1]?.index??html.length,card=html.slice(block.index,end);
 const title=shortText(card.match(/<h3\b[^>]*class="package-title"[^>]*>([\s\S]*?)<\/h3>/i)?.[1]);
 if(title!==t.sku||!card.includes('href="'+t.path+'"'))return empty;
 const unique=re=>{const values=new Set([...card.matchAll(re)].map(x=>shortText(x[1])));return values.size===1?[...values][0]:''};
 const rawQty=unique(/<div class="package-qty"[^>]*>([\s\S]*?)<\/div>/gi).match(/^(\d+)\s*(?:可用|Available)$/i);
 const quantity=rawQty?Number(rawQty[1]):null,state=inventoryCount(quantity);
 const listed=unique(/<div class="price-amount"[^>]*>([\s\S]*?)<\/div>/gi);
 const amount=amountFor(listed.match(/^[¥￥]\s*(\d{1,3}(?:,\d{3})+|\d+)(\.\d{2})?\s*CNY$/)?.[0].replace(/^[¥￥]\s*|,|\s*CNY$/g,''));
 const cycle=unique(/<div class="price-cycle\s*"[^>]*>([\s\S]*?)<\/div>/gi),period=({'每月':'month','每年':'year',Monthly:'month',Annually:'year'})[cycle];
 if(amount===null||period!==t.period)return {state,offer:null};
 const lines=(card.match(/<div class="package-content"[^>]*>\s*<p>([\s\S]*?)<\/p>/i)?.[1]||'').split(/<br\s*\/?>|[\r\n]+/gi).map(shortText).filter(Boolean);
 const field=re=>{for(const line of lines){const match=line.match(re);if(match)return match[1]}return ''};
 const transfer=field(/^流量[：:]\s*(\d+(?:\.\d+)?)[Gg]\b/),speed=field(/^带宽[：:]\s*(\d+(?:\.\d+)?)[Mm]\b/);
 const ram=field(/^RAM[：:]\s*(\d+)M\b/i),disk=field(/^硬盘[：:]\s*(\d+)G\b/),storageType=field(/^硬盘[：:]\s*\d+G\s+(SSD|NVMe|HDD)\b/i);
 const ip=lines.filter(x=>/^IPv[46][：:]|^可额外获得.+IPv6/i.test(x)).join(' · ');
 return {state,offer:{amount,currency:'CNY',period,basis:'listed',checkedAt:at,
  cpu:field(/^CPU[：:]\s*(\d+C(?:\s*\*[^<>]+)?)/i),ram:ram?ram+' MB':'',disk:disk?disk+' GB'+(storageType?' '+storageType:''):'',
  port:speed?speed+' Mbps':'',traffic:transfer?transfer+' GB':'',direction:lines.some(x=>/^流量[：:].+双向/.test(x))?'both':'',portType:lines.some(x=>/^带宽[：:].+共享/.test(x))?'shared':'',ip,...(Number.isSafeInteger(quantity)&&quantity>=0?{stockQuantity:quantity}:{})}};
}
async function catalogObservation(t){
 const table={bagevm:bageObservation,matrix:matrixObservation,prepaid:prepaidObservation,bwh:bwhObservation,akile:akileObservation,isvoro:isvoroObservation,akko:akkoObservation,mhy:mhyObservation};
 const entry=await loadProviderCatalog(t);
 return table[t.family](t,entry.data,entry.at);
}

async function observeListing(target){
 if(['bagevm','matrix','prepaid','bwh','akile','isvoro','akko','mhy'].includes(target.family))return catalogObservation(target);
 if(target.family==="tamago")return tamagoObservation(target);
 if(target.family==="vultr")return vultrObservation(target);
 if(["backwaves","wasabi"].includes(target.family))return lagomObservation(target);
 if(target.family==='vmsilo'){
  const now=Date.now(),cached=recentStorefronts.get('vmsilo');let html=cached?.data,at=cached?.at;
  if(!cached||cached.expires<=now){
   const r=await fetch(target.url,{redirect:'manual',signal:AbortSignal.timeout(7000),headers:{accept:'text/html','accept-language':'en'},cf:{cacheEverything:true,cacheTtl:60}});
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
 if(["vmsilo","backwaves","wasabi","vultr","tamago","bagevm","matrix","prepaid","bwh","akile","isvoro","akko","mhy"].includes(t.family))return (await observeListing(t)).state;
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
 const cacheKey=new Request(url.origin+url.pathname+"?format=v11",{method:'GET'});
 let hit=null;try{hit=cache&&await cache.match(cacheKey)}catch{}
 if(hit)return hit;
 let observation;try{observation=await observeListing(target)}catch{observation={state:'offline',offer:null}}
 const result=json({key,...observation,schemaVersion:11,sku:target.sku,zone:target.zone,checkedAt:new Date().toISOString(),source:target.url,refreshSeconds:TTL},200,observation.state==='offline'?25:TTL);
 if(cache)ctx.waitUntil(cache.put(cacheKey,result.clone()).catch(()=>{}));
 return result;
}};
