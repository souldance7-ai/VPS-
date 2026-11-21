// Public RSS feeds and Telegram channel previews, fetched only from these fixed endpoints.
const forumSources = {
  lowendtalk: {feed:'https://lowendtalk.com/categories/offers/feed.rss',hosts:['lowendtalk.com'],maxBytes:1_500_000},
  nodeseek: {feed: 'https://rss.nodeseek.com/', hosts: ['www.nodeseek.com', 'nodeseek.com']},
  review: {feed: 'https://rss.nodeseek.com/', hosts: ['www.nodeseek.com', 'nodeseek.com']},
  carpool: {feed: 'https://rss.nodeseek.com/', hosts: ['www.nodeseek.com', 'nodeseek.com']},
  meow: {feed: 'https://meowvps.com/rss.xml', hosts: ['meowvps.com'], maxBytes: 4_000_000},
  meowoffers: {feed: 'https://meowvps.com/api/offers.json', maxBytes: 4_000_000},
  sb: {feed: 'https://sb.sb/go/promotion/rss.xml', hosts: ['sb.sb']},
  sbdiscounts: {feed:'https://sb.sb/go/discounts/rss.xml',hosts:['sb.sb']},
  idcfreview: {feed:'https://idcflare.com/c/review/11.rss',hosts:['idcflare.com']},
  idcfnews: {feed:'https://idcflare.com/c/news/7.rss',hosts:['idcflare.com']},
  vpsdeer: {channel:'vpsdeer',feed:'https://t.me/s/vpsdeer'},
  vpsts: {channel:'vpsts',feed:'https://t.me/s/vpsts'},
  vpsuu: {channel:'vpsuu',feed:'https://t.me/s/vpsuu'},
  poorvpsmsg: {channel:'PoorVPSMsg',feed:'https://t.me/s/PoorVPSMsg'},
  richvps: {channel:'richvps',feed:'https://t.me/s/richvps'},
  ovheco: {channel:'ovheco',feed:'https://t.me/s/ovheco'},
  lettelegram: {channel:'lowendtalk_offer',feed:'https://t.me/s/lowendtalk_offer'},
  bwh: {channel:'bwh82',feed:'https://t.me/s/bwh82'},
  lightcone: {channel:'lightconecloud',feed:'https://t.me/s/lightconecloud'},
  uqidc: {channel:'UQIDC_CHAT',linkOnly:true}
};
const packagedForumPosts={"nodeseek":{"source":"nodeseek","observed":"2026-11-20T06:33:00.142Z","stale":true,"editionSnapshot":true,"items":[{"title":"【收】剩余价值收Vmiss tri basic 4.5cad/月","link":"https://www.nodeseek.com/post-1067683-1","date":"2026-11-20T06:29:27.000Z"},{"title":"帮收两台，共溢价2500，ovh杜甫独服，sys-stor-le-1，4x12t硬盘的","link":"https://www.nodeseek.com/post-1067676-1","date":"2026-11-20T06:26:53.000Z"},{"title":"130收68段VMISS 4.5 TRI","link":"https://www.nodeseek.com/post-1067673-1","date":"2026-11-20T06:26:04.000Z"},{"title":"【交易中】【杀鸡】十块改油，RN racknerd，2025黑五10刀","link":"https://www.nodeseek.com/post-1067669-1","date":"2026-11-20T06:25:44.000Z"}]},"carpool":{"source":"carpool","observed":"2026-11-20T06:33:00.142Z","stale":true,"editionSnapshot":true,"items":[{"title":"gemini 20x 独享或两人700 独享 350 拼车","link":"https://www.nodeseek.com/post-1067686-1","hostingTitle":false,"date":"2026-11-20T06:30:00.000Z"}]},"meow":{"source":"meow","observed":"2026-11-20T06:34:01.784Z","stale":true,"editionSnapshot":true,"items":[{"title":"新商家GoldCloud 德国DC1产品 新品测评","link":"https://meowvps.com/blog/goldcloudde/","coupons":[{"code":"GCFWZDB75BUM"}],"date":"2026-11-18T23:00:00.000Z"},{"title":"PPFlight 美国洛杉矶LAX LIFT产品 测评","link":"https://meowvps.com/blog/ppflightlift/","date":"2026-11-17T23:00:00.000Z"},{"title":"Gomami 德国FRA Pulse产品 新品测评","link":"https://meowvps.com/blog/gomamide/","coupons":[{"code":"Hi,FRA"}],"date":"2026-11-15T23:00:00.000Z"},{"title":"新商家Bocchi 日本东京Tokyo高性能 新品首发测评","link":"https://meowvps.com/blog/bocchijp/","coupons":[{"code":"MeowVPS"}],"date":"2026-11-13T23:00:00.000Z"},{"title":"六六云 菲律宾双ISP产品 测评","link":"https://meowvps.com/blog/666cloudsph/","coupons":[{"code":"DOUBLE11"}],"date":"2026-11-12T23:00:00.000Z"},{"title":"新商家干杯云 AT&T商业宽带PRO美国家宽 产品测评","link":"https://meowvps.com/blog/usvps24proup/","coupons":[{"code":"MeowVPS"}],"date":"2026-11-11T23:00:00.000Z"},{"title":"商家NexKr 韩国SKB家宽产品 测评","link":"https://meowvps.com/blog/nexkrskb/","coupons":[{"code":"WELCOME"},{"code":"SMSVERIFYFEE"}],"date":"2026-11-10T23:00:00.000Z"},{"title":"新商家Tamago 香港WTT商宽 新品测评","link":"https://meowvps.com/blog/tamagowtt/","coupons":[{"code":"1111W3R3PM"}],"date":"2026-11-08T23:00:00.000Z"},{"title":"新商家ATTVPS AT&T美国家宽产品 复测","link":"https://meowvps.com/blog/attvpsre/","coupons":[{"code":"MeowVPS"}],"date":"2026-11-07T23:00:00.000Z"},{"title":"JCloudHosting 西班牙产品 测评","link":"https://meowvps.com/blog/jcloudhosting/","coupons":[{"code":"79FHTOS7JL"}],"date":"2026-11-05T23:00:00.000Z"},{"title":"新商家PanstarCloud 美国LAX Premium DC2 新品测评","link":"https://meowvps.com/blog/panstarusdc2/","coupons":[{"code":"USPre75DC2"}],"date":"2026-11-03T23:00:00.000Z"}]},"meowoffers":{"source":"meowoffers","observed":"2026-11-20T06:34:01.885Z","stale":true,"editionSnapshot":true,"items":[{"title":"LayerOne 提供 VPS，地区未注明，限量入门款为 1 vCPU、1 GB 内存、15 GB NVMe，7 美元/年。另一…","sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223566/layerone-black-friday-limited-time-offers-7-yr-flash-sale","date":"2026-11-19T21:12:36.000Z"},{"title":"VPSNerds 提供独立服务器，称覆盖 32 个以上地点，但未列出本次套餐具体地区；起步配置为 Xeon D-1531（6 核…","sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223563/99-9-uptime-high-powered-dedicated-servers-32-locations-world-wide","date":"2026-11-19T19:38:06.000Z"},{"title":"1GB 套餐 1 GB 内存 1 CPU 核心 20 GB SSD 存储 3000 GB 月流量 1 Gbps 带宽 1个 IP…","sourceName":"RackNerd","link":"https://meowvps.com/timeline/?merchant=racknerd_promo#offers","date":"2026-11-19T17:53:58.000Z"},{"title":"RackNerd 提供多地区 KVM VPS、达拉斯共享及分销主机和独服，VPS 可选地区以订单页库存为准。VPS 起步为 1…","sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223558/racknerd-s-black-friday-takeover-new-deals-new-tech-adminbolt-hosting-hundreds-of-giveaways","date":"2026-11-19T17:48:20.000Z"},{"title":"AvaHosting 提供共享主机、VPS 和独服，机房地区未注明；Nano VPS 配备 1 vCPU、512MB 内存、20…","coupons":[{"code":"BFAVA"}],"sourceName":"LowEndTalkのoffer","link":"https://lowendtalk.com/discussion/223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways","date":"2026-11-18T17:14:12.000Z"}]},"sb":{"source":"sb","observed":"2026-11-20T06:34:01.026Z","stale":true,"editionSnapshot":true,"items":[{"title":"PQS 双十一优惠活动即将开跑!","link":"https://sb.sb/t/18494/","date":"2026-11-09T07:47:39.000Z"},{"title":"🔥海沫云｜双十一特惠年付｜香港 / 美国 / 大陆","link":"https://sb.sb/t/18177/","date":"2026-11-08T07:38:19.000Z"}]},"lowendtalk":{"source":"lowendtalk","observed":"2026-11-20T06:33:06.265Z","stale":true,"editionSnapshot":true,"items":[{"title":"LayerOne - BLACK FRIDAY! Limited time offers! - $7/yr FLASH SALE","link":"https://lowendtalk.com/discussion/223566/layerone-black-friday-limited-time-offers-7-yr-flash-sale","date":"2026-11-19T21:12:36.000Z"},{"title":"RackNerd’s BLACK FRIDAY TAKEOVER! NEW DEALS, NEW TECH, AdminBolt HOSTING + HUNDREDS OF GIVEAWAYS!","link":"https://lowendtalk.com/discussion/223558/racknerd-s-black-friday-takeover-new-deals-new-tech-adminbolt-hosting-hundreds-of-giveaways","date":"2026-11-19T17:48:20.000Z"},{"title":"noez.de – Prepaid Hosting from Frankfurt, since 2012","link":"https://lowendtalk.com/discussion/223518/noez-de-prepaid-hosting-from-frankfurt-since-2012","date":"2026-11-19T11:17:21.000Z"},{"title":"Looking for a cPanel alternative? Get aaPanel Pro for $98 for one year and save $190","link":"https://lowendtalk.com/discussion/223509/looking-for-a-cpanel-alternative-get-aapanel-pro-for-98-for-one-year-and-save-190","date":"2026-11-19T04:12:18.000Z"},{"title":"Ava.hosting - Black Friday Deals + BIG Restock VPS Nano! + Giveaways!","link":"https://lowendtalk.com/discussion/223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways","coupons":[{"code":"BFAVA"}],"date":"2026-11-18T17:14:12.000Z"},{"title":"Streamline-Servers.com - Sydney Dedicated Servers - Early-Black Friday","link":"https://lowendtalk.com/discussion/223393/streamline-servers-com-sydney-dedicated-servers-early-black-friday","coupons":[{"code":"BLACKFRIDAY26SERVER"}],"date":"2026-11-16T23:08:54.000Z"},{"title":"PetroSky Black Friday Sale | 30% OFF KVM VPS in Canada & France | From €4.89/mo","link":"https://lowendtalk.com/discussion/223377/petrosky-black-friday-sale-30-off-kvm-vps-in-canada-france-from-4-89-mo","coupons":[{"code":"BLACKFRIDAY"}],"date":"2026-11-16T16:05:24.000Z"}]},"vpsdeer":{"source":"vpsdeer","observed":"2026-11-20T06:34:02.206Z","stale":true,"editionSnapshot":true,"items":[{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2657","date":"2026-11-20T05:14:24.000Z"},{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2656","date":"2026-11-20T05:14:17.000Z"},{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2655","date":"2026-11-20T05:13:52.000Z"},{"title":"🔴 售罄","link":"https://t.me/vpsdeer/2654","date":"2026-11-20T03:02:44.000Z"}]},"vpsts":{"source":"vpsts","observed":"2026-11-20T06:34:02.187Z","stale":true,"editionSnapshot":true,"items":[{"title":"ZgoCloud - DE Frankfurt AMD VPS - Specials - Starter","link":"https://t.me/vpsts/4425","date":"2026-11-20T06:08:54.000Z"},{"title":"PPFlight库存监控补货通知专属频道","link":"https://t.me/vpsts/4424","date":"2026-11-20T02:54:42.000Z"},{"title":"RackNerd - 2026黑五促销","link":"https://t.me/vpsts/4423","date":"2026-11-19T19:00:55.000Z"},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano - 补货","coupons":[{"code":"Hi,FRA"}],"link":"https://t.me/vpsts/4421","date":"2026-11-18T08:06:49.000Z"},{"title":"❌ GoMami - 🗻LAX.Pulse.Nano - 已售罄","coupons":[{"code":"Hi,LAX"}],"link":"https://t.me/vpsts/4420","date":"2026-11-18T08:06:45.000Z"},{"title":"PPFlight - [US.LAX02] Glide M1","coupons":[{"code":"glideyyds"}],"link":"https://t.me/vpsts/4410","date":"2026-11-17T09:46:40.000Z"},{"title":"PPFlight - [US.LAX02] Glide S1","coupons":[{"code":"glideyyds"}],"link":"https://t.me/vpsts/4409","date":"2026-11-17T09:46:28.000Z"}]},"vpsuu":{"source":"vpsuu","observed":"2026-11-20T06:34:02.173Z","stale":true,"editionSnapshot":true,"items":[{"title":"LayerOne 黑五促销 🖥","link":"https://t.me/vpsuu/6008","date":"2026-11-20T02:11:35.000Z"},{"title":"RackNerd 2026黑五促销 🛒","link":"https://t.me/vpsuu/6007","date":"2026-11-20T00:29:16.000Z"},{"title":"RAKsmart 黑五：香港物理机秒杀$29.99/月，VPS秒杀$2.99/月起，可选国际BGP/大陆优化/精品CN2","link":"https://t.me/vpsuu/6005","date":"2026-11-19T12:15:44.000Z"},{"title":"AVA Host 黑五 8折：VPS 月付 €4 起，Nano €11/年，摩尔多瓦机房/不限流量","link":"https://t.me/vpsuu/6004","date":"2026-11-19T08:58:00.000Z"},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano 补货","coupons":[{"code":"Hi,FRA"}],"link":"https://t.me/vpsuu/6000","date":"2026-11-18T10:07:02.000Z"},{"title":"✅ GoMami - 🗻LAX.Pulse.Nano 补货","coupons":[{"code":"Hi,LAX"}],"link":"https://t.me/vpsuu/5999","date":"2026-11-18T10:06:33.000Z"},{"title":"PPFlight [US.LAX02] Glide S1 补货 🚀","coupons":[{"code":"glideyyds"}],"link":"https://t.me/vpsuu/5995","date":"2026-11-17T10:17:32.000Z"}]},"poorvpsmsg":{"source":"poorvpsmsg","observed":"2026-11-20T06:34:02.165Z","stale":true,"editionSnapshot":true,"items":[{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4807","date":"2026-11-20T06:26:20.000Z"},{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4806","date":"2026-11-20T01:56:22.000Z"},{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4805","date":"2026-11-19T22:56:22.000Z"},{"title":"📊 Data Changes","link":"https://t.me/PoorVPSMsg/4804","date":"2026-11-19T22:26:19.000Z"}]},"coupons":{"source":"coupons","observed":"2026-11-20T06:34:02.206Z","items":[{"title":"Ava.hosting - Black Friday Deals + BIG Restock VPS Nano! + Giveaways!","code":"BFAVA","link":"https://lowendtalk.com/discussion/223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways","date":"2026-11-18T17:14:12.000Z","from":"lowendtalk","sourceName":"","sourceObserved":"2026-11-20T06:33:06.265Z","archived":true},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano 补货","code":"Hi,FRA","link":"https://t.me/vpsuu/6000","date":"2026-11-18T10:07:02.000Z","from":"vpsuu","sourceName":"","sourceObserved":"2026-11-20T06:34:02.173Z","archived":true},{"title":"✅ GoMami - 🗻LAX.Pulse.Nano 补货","code":"Hi,LAX","link":"https://t.me/vpsuu/5999","date":"2026-11-18T10:06:33.000Z","from":"vpsuu","sourceName":"","sourceObserved":"2026-11-20T06:34:02.173Z","archived":true},{"title":"✅ GoMami - 🗻FRA.Pulse.Nano - 补货","code":"Hi,FRA","link":"https://t.me/vpsts/4421","date":"2026-11-18T08:06:49.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"❌ GoMami - 🗻LAX.Pulse.Nano - 已售罄","code":"Hi,LAX","link":"https://t.me/vpsts/4420","date":"2026-11-18T08:06:45.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"PPFlight [US.LAX02] Glide S1 补货 🚀","code":"glideyyds","link":"https://t.me/vpsuu/5995","date":"2026-11-17T10:17:32.000Z","from":"vpsuu","sourceName":"","sourceObserved":"2026-11-20T06:34:02.173Z","archived":true},{"title":"PPFlight - [US.LAX02] Glide M1","code":"glideyyds","link":"https://t.me/vpsts/4410","date":"2026-11-17T09:46:40.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"PPFlight - [US.LAX02] Glide S1","code":"glideyyds","link":"https://t.me/vpsts/4409","date":"2026-11-17T09:46:28.000Z","from":"vpsts","sourceName":"","sourceObserved":"2026-11-20T06:34:02.187Z","archived":true},{"title":"Streamline-Servers.com - Sydney Dedicated Servers - Early-Black Friday","code":"BLACKFRIDAY26SERVER","link":"https://lowendtalk.com/discussion/223393/streamline-servers-com-sydney-dedicated-servers-early-black-friday","date":"2026-11-16T23:08:54.000Z","from":"lowendtalk","sourceName":"","sourceObserved":"2026-11-20T06:33:06.265Z","archived":true},{"title":"PetroSky Black Friday Sale | 30% OFF KVM VPS in Canada & France | From €4.89/mo","code":"BLACKFRIDAY","link":"https://lowendtalk.com/discussion/223377/petrosky-black-friday-sale-30-off-kvm-vps-in-canada-france-from-4-89-mo","date":"2026-11-16T16:05:24.000Z","from":"lowendtalk","sourceName":"","sourceObserved":"2026-11-20T06:33:06.265Z","archived":true}],"sources":[{"source":"lowendtalk","observed":"2026-11-20T06:33:06.265Z","stale":true,"editionSnapshot":true},{"source":"nodeseek","observed":"2026-11-20T06:33:00.142Z","stale":true,"editionSnapshot":true},{"source":"meowoffers","observed":"2026-11-20T06:34:01.885Z","stale":true,"editionSnapshot":true},{"source":"sb","observed":"2026-11-20T06:34:01.026Z","stale":true,"editionSnapshot":true},{"source":"vpsdeer","observed":"2026-11-20T06:34:02.206Z","stale":true,"editionSnapshot":true},{"source":"vpsts","observed":"2026-11-20T06:34:02.187Z","stale":true,"editionSnapshot":true},{"source":"vpsuu","observed":"2026-11-20T06:34:02.173Z","stale":true,"editionSnapshot":true},{"source":"poorvpsmsg","observed":"2026-11-20T06:34:02.165Z","stale":true,"editionSnapshot":true}],"stale":true,"editionSnapshot":true}};
const idcFlareRead='2026-11-21T13:10:00Z';
const idcFlareSnapshots={
 idcfreview:[
  {title:'RackNerd 2026 黑五机型与机房测评参考',link:'https://idcflare.com/t/topic/146940'},
  {title:'AVAHosting 摩尔多瓦 VPS Nano 测评',link:'https://idcflare.com/t/topic/146789'}
 ],
 idcfnews:[
  {title:'IDC Flare 2026 黑五情报汇总',link:'https://idcflare.com/t/topic/146380',date:'2026-11-18'},
  {title:'CloudCone 黑五预热活动与优惠码',link:'https://idcflare.com/t/topic/146139',date:'2026-11-17',coupons:[{code:'PREBF26'}]}
 ]
};
for(const [source,items] of Object.entries(idcFlareSnapshots)){
 packagedForumPosts[source]={source,observed:idcFlareRead,stale:true,editionSnapshot:true,items};
}
function recentPackagedPosts(id){
 const item=packagedForumPosts[id],age=Date.now()-Date.parse(item?.observed);
 return age>=0&&age<14*86400000?item:null;
}
const couponFeedSources=['lowendtalk','nodeseek','meowoffers','sb','sbdiscounts','idcfnews','vpsdeer','vpsts','vpsuu','poorvpsmsg','richvps','ovheco','lettelegram','bwh','lightcone'];
function publishedCouponCodes(raw){
 if(typeof raw!=='string')return [];
 const text=forumDecode(raw.slice(0,16000)).replace(/<(?:br\s*\/?|\/p|\/li|\/div)>/gi,'\n').replace(/<[^<>]{0,1000}>/g,' ')
   .replace(/https?:\/\/[^\s<>]+/gi,' ').replace(/&nbsp;/gi,' ');
 const labels=/(?:優惠(?:券)?碼|优惠(?:券)?码|折扣[码碼]|促[销銷][码碼]|(?:\b(?:coupon|promo(?:tional)?|discount|voucher)(?:\s+code)?|\buse\s+(?:the\s+)?code))(\s*[:：=]\s*|\s+(?:is\s+)?)(?:[“"'\x60*]{0,3})([A-Za-z0-9][A-Za-z0-9_.-]{1,48}(?:,[A-Za-z0-9][A-Za-z0-9_-]{0,20})?)/gi;
 const stop=/^(?:code|codes|here|this|does|only|where|with|not|none|unknown|expired|for|the|while|will|works|discount|expires|available|until|applied|auto|automatic|included|please|details|terms|using|notapplicable|undefined|null|offer|off|valid|new|https?|www|click|needed|applies|use|needed|removed|codeword|already|can|cannot|required|after|before|now|special|black|back|any|said|useful|hidden|was|has|that|last|free|all|more|from|credit|checkout|range|start|ends|and|thru|sent|worth|see|released|stock|time|end|summary)$/i;
 const out=new Map();
 for(const m of text.matchAll(labels)){
  let code=m[2].replace(/[.-]+$/,'');
  const tail=text.slice(m.index+m[0].length),opening=m[0].slice(0,-m[2].length);
  if(tail.startsWith('!')){
   const quoted=/[“\x22\x27\x60]$/.test(opening)&&/^![”\x22\x27\x60]/.test(tail);
   if(quoted||/^newsite$/i.test(code)&&/dedi\s?spec/i.test(text))code+='!';else continue;
  }else if(/^[#@%+\/=]/.test(tail))continue;
  if(code.length<3||stop.test(code)||/^\d+(?:[.,]\d+)?$/.test(code))continue;
  if(!/[:：=]/.test(m[1])&&!/[A-Z0-9_-]/.test(code))continue;
  const after=tail.slice(code.endsWith('!')?1:0,100).replace(/^[”\x22\x27\x60*]{1,3}/,'').split(/[\r\n]/,1)[0];
  const expiry=after.match(/^\s*[,，;；(（|]?\s*(?:expires?(?:\s+at)?|valid until|截止(?:時間|时间)?|有效至|到期(?:時間|时间)?)\s*[:：]?\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2}))/i);
  const exp=Date.parse(expiry?.[1]),endsAt=Number.isFinite(exp)?new Date(exp).toISOString():null;
  const start=text.lastIndexOf('\n',m.index-1)+1,next=text.indexOf('\n',m.index+m[0].length);
  const line=text.slice(start,next<0?text.length:next).trim();
  // Preserve a short product-and-code line only where it can identify a SKU.
  const scopeLine=line.length<=220&&/\b[a-z][a-z0-9]*[._-][a-z0-9]+[._-][a-z0-9]+/i.test(line.replace(m[0],''))?line:'';
  if(!out.has(code))out.set(code,{code,...(endsAt?{endsAt}:{}),...(scopeLine?{scopeLine}:{})});if(out.size===5)break;
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
   for(const {code,endsAt,scopeLine} of post.coupons||[]){
    if((endsAt&&Date.parse(endsAt)<=now)||seen.has(post.link+'|'+code))continue;
    seen.add(post.link+'|'+code);items.push({title:post.title,code,link:post.link,date:post.date,from,sourceName:post.sourceName||'',sourceObserved:data.observed,archived:!!data.stale,...(endsAt?{endsAt}:{}),...(typeof scopeLine==='string'&&scopeLine.length<=220?{scopeLine}:{})});
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
    if (source === 'sb' || source === 'sbdiscounts') {
      const match = u.pathname.match(/^\/t\/([1-9]\d{0,14})\/?$/);
      return match ? 'https://sb.sb/t/' + match[1] + '/' : null;
    }
    if (source === 'idcfreview' || source === 'idcfnews') {
      const match = u.pathname.match(/^\/t\/(?:(?!\d+\/)[^/]{1,400}\/)?([1-9]\d{0,14})(?:\/[1-9]\d{0,8})?\/?$/);
      return match ? 'https://idcflare.com/t/topic/' + match[1] : null;
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
    const matches = source === 'carpool' || source === 'review' ? current.category.trim().toLowerCase() === source
      : ['meow','lowendtalk','sbdiscounts','idcfreview','idcfnews'].includes(source) || forumKeywords.test(title);
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
    const productLine=[title,...lines.slice(0,6)].join(' · ').slice(0,380);
    posts.set(post.link,{title,productLine,...(coupons.length?{coupons}:{}),...(snippet ? {snippet} : {}),link:post.link,date:post.date});
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
  if(config.linkOnly)return {items:[],visibility:'link-only'};
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
    const candidates=[];
    if(cached?.source===source&&age>=0&&age<forumStaleSeconds)candidates.push({...cached,stale:true});
    const saved=recentPackagedPosts(source);if(saved)candidates.push(saved);
    if(new URL(req.url).searchParams.get('background')!=='1'){
     try{
      const history=await fetch('https://ip-guide.pitopone.com/api/stock-history/feed?source='+source,{redirect:'manual',signal:AbortSignal.timeout(3500),headers:{accept:'application/json'}});
      if(history.ok&&history.headers.get('content-type')?.includes('application/json')){
       const snapshot=await history.json(),observed=Date.parse(snapshot?.observed);
       if(snapshot?.source===source&&snapshot.backgroundSnapshot&&Array.isArray(snapshot.items)&&observed<=Date.now()+30000&&observed>=Date.now()-14*86400000)candidates.push(snapshot);
      }
     }catch{}
    }
    candidates.sort((a,b)=>Date.parse(b.observed)-Date.parse(a.observed));
    return candidates.length?forumResponse(candidates[0],200,30):forumResponse({source,error:'upstream unavailable'},503);
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
/* JoySolData targets */
  "pc-joysol-35": {
    "family": "joysol",
    "sku": "香港优化A-ECS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 35,
    "group": 3
  },
  "pc-joysol-36": {
    "family": "joysol",
    "sku": "香港优化A-ECS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 36,
    "group": 3
  },
  "pc-joysol-37": {
    "family": "joysol",
    "sku": "香港优化A-ECS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 37,
    "group": 3
  },
  "pc-joysol-38": {
    "family": "joysol",
    "sku": "香港优化A-ECS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 38,
    "group": 3
  },
  "joysol-40": {
    "family": "joysol",
    "sku": "香港优化A-ECS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 40,
    "group": 3
  },
  "joysol-7": {
    "family": "joysol",
    "sku": "香港优化A-TCS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 7,
    "group": 2
  },
  "joysol-30": {
    "family": "joysol",
    "sku": "香港优化A-TCS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 30,
    "group": 2
  },
  "joysol-31": {
    "family": "joysol",
    "sku": "香港优化A-TCS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 31,
    "group": 2
  },
  "joysol-32": {
    "family": "joysol",
    "sku": "香港优化A-TCS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 32,
    "group": 2
  },
  "joysol-34": {
    "family": "joysol",
    "sku": "香港优化A-TCS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 34,
    "group": 2
  },
  "joysol-61": {
    "family": "joysol",
    "sku": "香港优化B-ECS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 61,
    "group": 8
  },
  "joysol-62": {
    "family": "joysol",
    "sku": "香港优化B-ECS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 62,
    "group": 8
  },
  "joysol-63": {
    "family": "joysol",
    "sku": "香港优化B-ECS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 63,
    "group": 8
  },
  "joysol-64": {
    "family": "joysol",
    "sku": "香港优化B-ECS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 64,
    "group": 8
  },
  "joysol-65": {
    "family": "joysol",
    "sku": "香港优化B-ECS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 65,
    "group": 8
  },
  "joysol-70": {
    "family": "joysol",
    "sku": "香港优化B-TCS 16H16G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 70,
    "group": 9
  },
  "joysol-69": {
    "family": "joysol",
    "sku": "香港优化B-TCS 8H8G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 69,
    "group": 9
  },
  "joysol-68": {
    "family": "joysol",
    "sku": "香港优化B-TCS 4H4G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 68,
    "group": 9
  },
  "joysol-67": {
    "family": "joysol",
    "sku": "香港优化B-TCS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 67,
    "group": 9
  },
  "joysol-66": {
    "family": "joysol",
    "sku": "香港优化B-TCS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 66,
    "group": 9
  },
  "joysol-77": {
    "family": "joysol",
    "sku": "香港优化C-TCS 1H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 77,
    "group": 11
  },
  "joysol-79": {
    "family": "joysol",
    "sku": "香港优化C-TCS 2H2G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 79,
    "group": 11
  },
  "joysol-78": {
    "family": "joysol",
    "sku": "香港优化C-TCS 2H1G",
    "zone": "HK",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 78,
    "group": 11
  },
  "joysol-41": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 41,
    "group": 4
  },
  "joysol-43": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 43,
    "group": 4
  },
  "joysol-44": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 44,
    "group": 4
  },
  "joysol-46": {
    "family": "joysol",
    "sku": "洛杉矶A-ECS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 46,
    "group": 4
  },
  "joysol-53": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 53,
    "group": 6
  },
  "joysol-54": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 54,
    "group": 6
  },
  "joysol-55": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 55,
    "group": 6
  },
  "joysol-56": {
    "family": "joysol",
    "sku": "洛杉矶A-TCS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 56,
    "group": 6
  },
  "joysol-50": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 50,
    "group": 5
  },
  "joysol-52": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 52,
    "group": 5
  },
  "joysol-47": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 2 Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 47,
    "group": 5
  },
  "joysol-49": {
    "family": "joysol",
    "sku": "洛杉矶B-ECS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 49,
    "group": 5
  },
  "joysol-59": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 59,
    "group": 7
  },
  "joysol-60": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 60,
    "group": 7
  },
  "joysol-57": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 57,
    "group": 7
  },
  "joysol-58": {
    "family": "joysol",
    "sku": "洛杉矶B-TCS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 58,
    "group": 7
  },
  "joysol-71": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 2Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 71,
    "group": 10
  },
  "joysol-73": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 4Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 73,
    "group": 10
  },
  "joysol-74": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 8Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 74,
    "group": 10
  },
  "joysol-75": {
    "family": "joysol",
    "sku": "洛杉矶C-TCS 16Cores",
    "zone": "LAX",
    "url": "https://www.joysol.net/api/common/prolist-proxy.php",
    "pid": 75,
    "group": 10
  },
  "atmos-nvme-1": {
    "family": "atmos",
    "sku": "VPS NVMe 1",
    "zone": "FR",
    "pid": 1,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-2": {
    "family": "atmos",
    "sku": "VPS NVMe 2",
    "zone": "FR",
    "pid": 2,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-3": {
    "family": "atmos",
    "sku": "VPS NVMe 3",
    "zone": "FR",
    "pid": 3,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-4": {
    "family": "atmos",
    "sku": "VPS NVMe 4",
    "zone": "FR",
    "pid": 4,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-5": {
    "family": "atmos",
    "sku": "VPS NVMe 5",
    "zone": "FR",
    "pid": 5,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
  "atmos-nvme-6": {
    "family": "atmos",
    "sku": "VPS NVMe 6",
    "zone": "FR",
    "pid": 6,
    "url": "https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026"
  },
/* End JoySolData targets */


 "let11-servitro-virtual-servers-usd1-server":{"family":"servitro","sku":"$1 Server","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"usd1-server"},
 "let11-servitro-virtual-servers-virtual-1":{"family":"servitro","sku":"Virtual-1","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"virtual-1"},
 "let11-servitro-virtual-servers-ryzen-9-9950x-frankfurt-virtual-1":{"family":"servitro","sku":"Virtual-1","zone":"DE","url":"https://my.servitro.com/store/virtual-servers-ryzen-9-9950x-frankfurt","slug":"virtual-1","previousGroup":"virtual-servers-ryzen-9-7950x3d"},
 "servitro-ryzen-v2":{"family":"servitro","sku":"Virtual-2","zone":"DE","url":"https://my.servitro.com/store/virtual-servers-ryzen-9-9950x-frankfurt","slug":"virtual-2","previousGroup":"virtual-servers-ryzen-9-7950x3d"},
 "servitro-epyc-v3":{"family":"servitro","sku":"Virtual-3","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"virtual-3"},
 "servitro-epyc-v4":{"family":"servitro","sku":"Virtual-4","zone":"DE","url":"https://my.servitro.com/store/virtual-servers","slug":"virtual-4"},
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
const facilityOfferCatalogs=[
 ["https://www.computeguy.com/vps-los-angeles-usa/",[
  ["shop-c09c6ad5b2cf","gp1-2-2-40","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-2-2-40"],
  ["compute-vps-los-angeles-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-2-2-40-pro"],
  ["compute-vps-los-angeles-usa-gp1-2-4-50","gp1-2-4-50","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-2-4-50"],
  ["compute-vps-los-angeles-usa-gp1-3-4-60","gp1-3-4-60","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-3-4-60"],
  ["compute-vps-los-angeles-usa-gp1-4-8-80","gp1-4-8-80","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-4-8-80"],
  ["compute-vps-los-angeles-usa-gp1-6-16-160","gp1-6-16-160","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-6-16-160"],
  ["compute-vps-los-angeles-usa-gp1-8-32-320","gp1-8-32-320","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-8-32-320"],
  ["compute-vps-los-angeles-usa-gp1-16-64-640","gp1-16-64-640","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-16-64-640"],
  ["compute-vps-los-angeles-usa-gp1-32-128-1t","gp1-32-128-1t","LAX","#product","https://my.computeguy.com/order/metered-vps/los-angeles-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-tirana-albania/",[
  ["compute-vps-tirana-albania-gp1-1-1-10-v6","gp1-1-1-10-v6","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-1-10-v6"],
  ["compute-vps-tirana-albania-gp1-1-1-10","gp1-1-1-10","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-1-10"],
  ["compute-vps-tirana-albania-gp1-1-1-15","gp1-1-1-15","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-1-15"],
  ["compute-vps-tirana-albania-gp1-1-2-20","gp1-1-2-20","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-1-2-20"],
  ["compute-vps-tirana-albania-gp1-2-2-40","gp1-2-2-40","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-2-2-40"],
  ["compute-vps-tirana-albania-gp1-2-2-40-pro","gp1-2-2-40-pro","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-2-2-40-pro"],
  ["compute-vps-tirana-albania-gp1-2-4-50","gp1-2-4-50","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-2-4-50"],
  ["compute-vps-tirana-albania-gp1-3-4-60","gp1-3-4-60","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-3-4-60"],
  ["compute-vps-tirana-albania-gp1-4-8-80","gp1-4-8-80","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-4-8-80"],
  ["compute-vps-tirana-albania-gp1-6-16-160","gp1-6-16-160","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-6-16-160"],
  ["compute-vps-tirana-albania-gp1-8-32-320","gp1-8-32-320","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-8-32-320"],
  ["compute-vps-tirana-albania-gp1-16-64-640","gp1-16-64-640","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-16-64-640"],
  ["compute-vps-tirana-albania-gp1-32-128-1t","gp1-32-128-1t","AL","#product","https://my.computeguy.com/order/metered-vps/tirana-albania/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-vienna-austria/",[
  ["compute-vps-vienna-austria-gp1-1-1-10-v6","gp1-1-1-10-v6","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-1-10-v6"],
  ["compute-vps-vienna-austria-gp1-1-1-10","gp1-1-1-10","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-1-10"],
  ["compute-vps-vienna-austria-gp1-1-1-15","gp1-1-1-15","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-1-15"],
  ["compute-vps-vienna-austria-gp1-1-2-20","gp1-1-2-20","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-1-2-20"],
  ["compute-vps-vienna-austria-gp1-2-2-40","gp1-2-2-40","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-2-2-40"],
  ["compute-vps-vienna-austria-gp1-2-2-40-pro","gp1-2-2-40-pro","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-2-2-40-pro"],
  ["compute-vps-vienna-austria-gp1-2-4-50","gp1-2-4-50","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-2-4-50"],
  ["compute-vps-vienna-austria-gp1-3-4-60","gp1-3-4-60","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-3-4-60"],
  ["compute-vps-vienna-austria-gp1-4-8-80","gp1-4-8-80","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-4-8-80"],
  ["compute-vps-vienna-austria-gp1-6-16-160","gp1-6-16-160","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-6-16-160"],
  ["compute-vps-vienna-austria-gp1-8-32-320","gp1-8-32-320","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-8-32-320"],
  ["compute-vps-vienna-austria-gp1-16-64-640","gp1-16-64-640","AT","#product","https://my.computeguy.com/order/metered-vps/vienna-austria/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-sofia-bulgaria/",[
  ["compute-vps-sofia-bulgaria-gp1-1-1-10-v6","gp1-1-1-10-v6","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-1-10-v6"],
  ["compute-vps-sofia-bulgaria-gp1-1-1-10","gp1-1-1-10","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-1-10"],
  ["compute-vps-sofia-bulgaria-gp1-1-1-15","gp1-1-1-15","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-1-15"],
  ["compute-vps-sofia-bulgaria-gp1-1-2-20","gp1-1-2-20","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-1-2-20"],
  ["compute-vps-sofia-bulgaria-gp1-2-2-40","gp1-2-2-40","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-2-2-40"],
  ["compute-vps-sofia-bulgaria-gp1-2-2-40-pro","gp1-2-2-40-pro","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-2-2-40-pro"],
  ["compute-vps-sofia-bulgaria-gp1-2-4-50","gp1-2-4-50","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-2-4-50"],
  ["compute-vps-sofia-bulgaria-gp1-3-4-60","gp1-3-4-60","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-3-4-60"],
  ["compute-vps-sofia-bulgaria-gp1-4-8-80","gp1-4-8-80","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-4-8-80"],
  ["compute-vps-sofia-bulgaria-gp1-6-16-160","gp1-6-16-160","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-6-16-160"],
  ["compute-vps-sofia-bulgaria-gp1-8-32-320","gp1-8-32-320","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-8-32-320"],
  ["compute-vps-sofia-bulgaria-gp1-16-64-640","gp1-16-64-640","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-16-64-640"],
  ["compute-vps-sofia-bulgaria-gp1-32-128-1t","gp1-32-128-1t","BG","#product","https://my.computeguy.com/order/metered-vps/sofia-bulgaria/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-nicosia-cyprus/",[
  ["compute-vps-nicosia-cyprus-00d10c1-2","00d10c1-2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/00d10c1-2"],
  ["compute-vps-nicosia-cyprus-01d20c1-2","01d20c1-2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/01d20c1-2"],
  ["compute-vps-nicosia-cyprus-02d30c1","02d30c1","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/02d30c1"],
  ["compute-vps-nicosia-cyprus-03d40c2","03d40c2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d40c2"],
  ["compute-vps-nicosia-cyprus-03d20c4","03d20c4","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d20c4"],
  ["compute-vps-nicosia-cyprus-03d80c2","03d80c2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d80c2"],
  ["compute-vps-nicosia-cyprus-03d20c2","03d20c2","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/03d20c2"],
  ["compute-vps-nicosia-cyprus-04d60c3","04d60c3","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/04d60c3"],
  ["compute-vps-nicosia-cyprus-05d80c4","05d80c4","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/05d80c4"],
  ["compute-vps-nicosia-cyprus-06d160c6","06d160c6","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/06d160c6"],
  ["compute-vps-nicosia-cyprus-07d320c8","07d320c8","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/07d320c8"],
  ["compute-vps-nicosia-cyprus-08d640c12","08d640c12","CY","#product","https://my.computeguy.com/order/metered-vps/nicosia-cyprus/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-prague-czechia/",[
  ["compute-vps-prague-czechia-gp1-1-1-10-v6","gp1-1-1-10-v6","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-1-10-v6"],
  ["compute-vps-prague-czechia-gp1-1-1-10","gp1-1-1-10","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-1-10"],
  ["compute-vps-prague-czechia-gp1-1-1-15","gp1-1-1-15","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-1-15"],
  ["compute-vps-prague-czechia-gp1-1-2-20","gp1-1-2-20","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-1-2-20"],
  ["compute-vps-prague-czechia-gp1-2-2-40","gp1-2-2-40","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-2-2-40"],
  ["compute-vps-prague-czechia-gp1-2-2-40-pro","gp1-2-2-40-pro","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-2-2-40-pro"],
  ["compute-vps-prague-czechia-gp1-2-4-50","gp1-2-4-50","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-2-4-50"],
  ["compute-vps-prague-czechia-gp1-3-4-60","gp1-3-4-60","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-3-4-60"],
  ["compute-vps-prague-czechia-gp1-4-8-80","gp1-4-8-80","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-4-8-80"],
  ["compute-vps-prague-czechia-gp1-6-16-160","gp1-6-16-160","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-6-16-160"],
  ["compute-vps-prague-czechia-gp1-8-32-320","gp1-8-32-320","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-8-32-320"],
  ["compute-vps-prague-czechia-gp1-16-64-640","gp1-16-64-640","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-16-64-640"],
  ["compute-vps-prague-czechia-gp1-32-128-1t","gp1-32-128-1t","CZ","#product","https://my.computeguy.com/order/metered-vps/prague-czechia/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-copenhagen-denmark/",[
  ["compute-vps-copenhagen-denmark-gp1-1-1-10-v6","gp1-1-1-10-v6","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-1-10-v6"],
  ["compute-vps-copenhagen-denmark-gp1-1-1-10","gp1-1-1-10","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-1-10"],
  ["compute-vps-copenhagen-denmark-gp1-1-1-15","gp1-1-1-15","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-1-15"],
  ["compute-vps-copenhagen-denmark-gp1-1-2-20","gp1-1-2-20","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-1-2-20"],
  ["compute-vps-copenhagen-denmark-gp1-2-2-40","gp1-2-2-40","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-2-2-40"],
  ["compute-vps-copenhagen-denmark-gp1-2-2-40-pro","gp1-2-2-40-pro","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-2-2-40-pro"],
  ["compute-vps-copenhagen-denmark-gp1-2-4-50","gp1-2-4-50","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-2-4-50"],
  ["compute-vps-copenhagen-denmark-gp1-3-4-60","gp1-3-4-60","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-3-4-60"],
  ["compute-vps-copenhagen-denmark-gp1-4-8-80","gp1-4-8-80","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-4-8-80"],
  ["compute-vps-copenhagen-denmark-gp1-6-16-160","gp1-6-16-160","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-6-16-160"],
  ["compute-vps-copenhagen-denmark-gp1-8-32-320","gp1-8-32-320","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-8-32-320"],
  ["compute-vps-copenhagen-denmark-gp1-16-64-640","gp1-16-64-640","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-16-64-640"],
  ["compute-vps-copenhagen-denmark-gp1-32-128-1t","gp1-32-128-1t","DK","#product","https://my.computeguy.com/order/metered-vps/copenhagen-denmark/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-helsinki-finland/",[
  ["compute-vps-helsinki-finland-gp1-1-1-10-v6","gp1-1-1-10-v6","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-1-10-v6"],
  ["compute-vps-helsinki-finland-gp1-1-1-10","gp1-1-1-10","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-1-10"],
  ["compute-vps-helsinki-finland-gp1-1-1-15","gp1-1-1-15","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-1-15"],
  ["compute-vps-helsinki-finland-gp1-1-2-20","gp1-1-2-20","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-1-2-20"],
  ["compute-vps-helsinki-finland-gp1-2-2-40","gp1-2-2-40","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-2-2-40"],
  ["compute-vps-helsinki-finland-gp1-2-2-40-pro","gp1-2-2-40-pro","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-2-2-40-pro"],
  ["compute-vps-helsinki-finland-gp1-2-4-50","gp1-2-4-50","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-2-4-50"],
  ["compute-vps-helsinki-finland-gp1-3-4-60","gp1-3-4-60","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-3-4-60"],
  ["compute-vps-helsinki-finland-gp1-4-8-80","gp1-4-8-80","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-4-8-80"],
  ["compute-vps-helsinki-finland-gp1-6-16-160","gp1-6-16-160","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-6-16-160"],
  ["compute-vps-helsinki-finland-gp1-8-32-320","gp1-8-32-320","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-8-32-320"],
  ["compute-vps-helsinki-finland-gp1-16-64-640","gp1-16-64-640","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-16-64-640"],
  ["compute-vps-helsinki-finland-gp1-32-128-1t","gp1-32-128-1t","FI","#product","https://my.computeguy.com/order/metered-vps/helsinki-finland/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-paris-france/",[
  ["compute-vps-paris-france-00d10c1v6","00d10c1v6","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/00d10c1v6"],
  ["compute-vps-paris-france-00d10c1-2","00d10c1-2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/00d10c1-2"],
  ["compute-vps-paris-france-01d20c1-2","01d20c1-2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/01d20c1-2"],
  ["compute-vps-paris-france-02d30c1","02d30c1","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/02d30c1"],
  ["compute-vps-paris-france-03d40c2","03d40c2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d40c2"],
  ["compute-vps-paris-france-03d20c4","03d20c4","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d20c4"],
  ["compute-vps-paris-france-03d80c2","03d80c2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d80c2"],
  ["compute-vps-paris-france-03d20c2","03d20c2","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/03d20c2"],
  ["compute-vps-paris-france-04d60c3","04d60c3","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/04d60c3"],
  ["compute-vps-paris-france-05d80c4","05d80c4","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/05d80c4"],
  ["compute-vps-paris-france-06d160c6","06d160c6","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/06d160c6"],
  ["compute-vps-paris-france-07d320c8","07d320c8","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/07d320c8"],
  ["compute-vps-paris-france-08d640c12","08d640c12","FR","#product","https://my.computeguy.com/order/metered-vps/paris-france/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-frankfurt-germany/",[
  ["compute-vps-frankfurt-germany-gp1-1-1-10-v6","gp1-1-1-10-v6","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-1-10-v6"],
  ["compute-vps-frankfurt-germany-gp1-1-1-10","gp1-1-1-10","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-1-10"],
  ["compute-vps-frankfurt-germany-gp1-1-1-15","gp1-1-1-15","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-1-15"],
  ["compute-vps-frankfurt-germany-gp1-1-2-20","gp1-1-2-20","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-1-2-20"],
  ["compute-vps-frankfurt-germany-gp1-2-2-40","gp1-2-2-40","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-2-2-40"],
  ["compute-vps-frankfurt-germany-gp1-2-2-40-pro","gp1-2-2-40-pro","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-2-2-40-pro"],
  ["compute-vps-frankfurt-germany-gp1-2-4-50","gp1-2-4-50","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-2-4-50"],
  ["compute-vps-frankfurt-germany-gp1-3-4-60","gp1-3-4-60","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-3-4-60"],
  ["compute-vps-frankfurt-germany-gp1-4-8-80","gp1-4-8-80","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-4-8-80"],
  ["compute-vps-frankfurt-germany-gp1-6-16-160","gp1-6-16-160","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-6-16-160"],
  ["compute-vps-frankfurt-germany-gp1-8-32-320","gp1-8-32-320","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-8-32-320"],
  ["compute-vps-frankfurt-germany-gp1-16-64-640","gp1-16-64-640","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-16-64-640"],
  ["compute-vps-frankfurt-germany-gp1-32-128-1t","gp1-32-128-1t","DE","#product","https://my.computeguy.com/order/metered-vps/frankfurt-germany/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-vilnius-lithuania/",[
  ["compute-vps-vilnius-lithuania-gp1-1-1-10-v6","gp1-1-1-10-v6","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-1-10-v6"],
  ["compute-vps-vilnius-lithuania-gp1-1-1-10","gp1-1-1-10","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-1-10"],
  ["compute-vps-vilnius-lithuania-gp1-1-1-15","gp1-1-1-15","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-1-15"],
  ["compute-vps-vilnius-lithuania-gp1-1-2-20","gp1-1-2-20","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-1-2-20"],
  ["compute-vps-vilnius-lithuania-gp1-2-2-40","gp1-2-2-40","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-2-2-40"],
  ["compute-vps-vilnius-lithuania-gp1-2-2-40-pro","gp1-2-2-40-pro","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-2-2-40-pro"],
  ["compute-vps-vilnius-lithuania-gp1-2-4-50","gp1-2-4-50","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-2-4-50"],
  ["compute-vps-vilnius-lithuania-gp1-3-4-60","gp1-3-4-60","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-3-4-60"],
  ["compute-vps-vilnius-lithuania-gp1-4-8-80","gp1-4-8-80","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-4-8-80"],
  ["compute-vps-vilnius-lithuania-gp1-6-16-160","gp1-6-16-160","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-6-16-160"],
  ["compute-vps-vilnius-lithuania-gp1-8-32-320","gp1-8-32-320","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-8-32-320"],
  ["compute-vps-vilnius-lithuania-gp1-16-64-640","gp1-16-64-640","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-16-64-640"],
  ["compute-vps-vilnius-lithuania-gp1-32-128-1t","gp1-32-128-1t","LT","#product","https://my.computeguy.com/order/metered-vps/vilnius-lithuania/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-florence-italy/",[
  ["compute-vps-florence-italy-gp1-1-1-10-v6","gp1-1-1-10-v6","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-1-10-v6"],
  ["compute-vps-florence-italy-gp1-1-1-10","gp1-1-1-10","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-1-10"],
  ["compute-vps-florence-italy-gp1-1-1-15","gp1-1-1-15","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-1-15"],
  ["compute-vps-florence-italy-gp1-1-2-20","gp1-1-2-20","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-1-2-20"],
  ["compute-vps-florence-italy-gp1-2-2-40","gp1-2-2-40","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-2-2-40"],
  ["compute-vps-florence-italy-gp1-2-2-40-pro","gp1-2-2-40-pro","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-2-2-40-pro"],
  ["compute-vps-florence-italy-gp1-2-4-50","gp1-2-4-50","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-2-4-50"],
  ["compute-vps-florence-italy-gp1-3-4-60","gp1-3-4-60","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-3-4-60"],
  ["compute-vps-florence-italy-gp1-4-8-80","gp1-4-8-80","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-4-8-80"],
  ["compute-vps-florence-italy-gp1-6-16-160","gp1-6-16-160","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-6-16-160"],
  ["compute-vps-florence-italy-gp1-8-32-320","gp1-8-32-320","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-8-32-320"],
  ["compute-vps-florence-italy-gp1-16-64-640","gp1-16-64-640","IT","#product","https://my.computeguy.com/order/metered-vps/florence-italy/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-athens-greece/",[
  ["compute-vps-athens-greece-gp1-1-1-10-v6","gp1-1-1-10-v6","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-1-10-v6"],
  ["compute-vps-athens-greece-gp1-1-1-10","gp1-1-1-10","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-1-10"],
  ["compute-vps-athens-greece-gp1-1-1-15","gp1-1-1-15","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-1-15"],
  ["compute-vps-athens-greece-gp1-1-2-20","gp1-1-2-20","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-1-2-20"],
  ["compute-vps-athens-greece-gp1-2-2-40","gp1-2-2-40","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-2-2-40"],
  ["compute-vps-athens-greece-gp1-2-2-40-pro","gp1-2-2-40-pro","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-2-2-40-pro"],
  ["compute-vps-athens-greece-gp1-2-4-50","gp1-2-4-50","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-2-4-50"],
  ["compute-vps-athens-greece-gp1-3-4-60","gp1-3-4-60","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-3-4-60"],
  ["compute-vps-athens-greece-gp1-4-8-80","gp1-4-8-80","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-4-8-80"],
  ["compute-vps-athens-greece-gp1-6-16-160","gp1-6-16-160","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-6-16-160"],
  ["compute-vps-athens-greece-gp1-8-32-320","gp1-8-32-320","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-8-32-320"],
  ["compute-vps-athens-greece-gp1-16-64-640","gp1-16-64-640","GR","#product","https://my.computeguy.com/order/metered-vps/athens-greece/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-moscow-russia/",[
  ["compute-vps-moscow-russia-02d30c1","02d30c1","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/02d30c1"],
  ["compute-vps-moscow-russia-03d40c2","03d40c2","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d40c2"],
  ["compute-vps-moscow-russia-03d20c4","03d20c4","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d20c4"],
  ["compute-vps-moscow-russia-03d80c2","03d80c2","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d80c2"],
  ["compute-vps-moscow-russia-03d20c2","03d20c2","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/03d20c2"],
  ["compute-vps-moscow-russia-04d60c3","04d60c3","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/04d60c3"],
  ["compute-vps-moscow-russia-05d80c4","05d80c4","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/05d80c4"],
  ["compute-vps-moscow-russia-06d160c6","06d160c6","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/06d160c6"],
  ["compute-vps-moscow-russia-07d320c8","07d320c8","RU","#product","https://my.computeguy.com/order/metered-vps/moscow-russia/07d320c8"]
 ]],
 ["https://www.computeguy.com/vps-bucharest-romania/",[
  ["compute-vps-bucharest-romania-gp1-1-1-15","gp1-1-1-15","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-1-1-15"],
  ["compute-vps-bucharest-romania-gp1-1-2-20","gp1-1-2-20","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-1-2-20"],
  ["compute-vps-bucharest-romania-gp1-2-2-40","gp1-2-2-40","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-2-2-40"],
  ["compute-vps-bucharest-romania-gp1-2-2-40-pro","gp1-2-2-40-pro","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-2-2-40-pro"],
  ["compute-vps-bucharest-romania-gp1-2-4-50","gp1-2-4-50","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-2-4-50"],
  ["compute-vps-bucharest-romania-gp1-3-4-60","gp1-3-4-60","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-3-4-60"],
  ["compute-vps-bucharest-romania-gp1-4-8-80","gp1-4-8-80","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-4-8-80"],
  ["compute-vps-bucharest-romania-gp1-6-16-160","gp1-6-16-160","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-6-16-160"],
  ["compute-vps-bucharest-romania-gp1-8-32-320","gp1-8-32-320","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-8-32-320"],
  ["compute-vps-bucharest-romania-gp1-16-64-640","gp1-16-64-640","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-16-64-640"],
  ["compute-vps-bucharest-romania-gp1-32-128-1t","gp1-32-128-1t","RO","#product","https://my.computeguy.com/order/metered-vps/bucharest-romania/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-barcelona-spain/",[
  ["compute-vps-barcelona-spain-gp1-1-1-10-v6","gp1-1-1-10-v6","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-1-10-v6"],
  ["compute-vps-barcelona-spain-gp1-1-1-10","gp1-1-1-10","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-1-10"],
  ["compute-vps-barcelona-spain-gp1-1-1-15","gp1-1-1-15","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-1-15"],
  ["compute-vps-barcelona-spain-gp1-1-2-20","gp1-1-2-20","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-1-2-20"],
  ["compute-vps-barcelona-spain-gp1-2-2-40","gp1-2-2-40","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-2-2-40"],
  ["compute-vps-barcelona-spain-gp1-2-2-40-pro","gp1-2-2-40-pro","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-2-2-40-pro"],
  ["compute-vps-barcelona-spain-gp1-2-4-50","gp1-2-4-50","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-2-4-50"],
  ["compute-vps-barcelona-spain-gp1-3-4-60","gp1-3-4-60","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-3-4-60"],
  ["compute-vps-barcelona-spain-gp1-4-8-80","gp1-4-8-80","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-4-8-80"],
  ["compute-vps-barcelona-spain-gp1-6-16-160","gp1-6-16-160","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-6-16-160"],
  ["compute-vps-barcelona-spain-gp1-8-32-320","gp1-8-32-320","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-8-32-320"],
  ["compute-vps-barcelona-spain-gp1-16-64-640","gp1-16-64-640","ES","#product","https://my.computeguy.com/order/metered-vps/barcelona-spain/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-warsaw-poland/",[
  ["compute-vps-warsaw-poland-gp1-1-1-10-v6","gp1-1-1-10-v6","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-1-10-v6"],
  ["compute-vps-warsaw-poland-gp1-1-1-10","gp1-1-1-10","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-1-10"],
  ["compute-vps-warsaw-poland-gp1-1-1-15","gp1-1-1-15","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-1-15"],
  ["compute-vps-warsaw-poland-gp1-1-2-20","gp1-1-2-20","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-1-2-20"],
  ["compute-vps-warsaw-poland-gp1-2-2-40","gp1-2-2-40","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-2-2-40"],
  ["compute-vps-warsaw-poland-gp1-2-2-40-pro","gp1-2-2-40-pro","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-2-2-40-pro"],
  ["compute-vps-warsaw-poland-gp1-2-4-50","gp1-2-4-50","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-2-4-50"],
  ["compute-vps-warsaw-poland-gp1-3-4-60","gp1-3-4-60","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-3-4-60"],
  ["compute-vps-warsaw-poland-gp1-4-8-80","gp1-4-8-80","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-4-8-80"],
  ["compute-vps-warsaw-poland-gp1-6-16-160","gp1-6-16-160","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-6-16-160"],
  ["compute-vps-warsaw-poland-gp1-8-32-320","gp1-8-32-320","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-8-32-320"],
  ["compute-vps-warsaw-poland-gp1-16-64-640","gp1-16-64-640","PL","#product","https://my.computeguy.com/order/metered-vps/warsaw-poland/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-madrid-spain/",[
  ["compute-vps-madrid-spain-gp1-1-1-10-v6","gp1-1-1-10-v6","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-1-10-v6"],
  ["compute-vps-madrid-spain-gp1-1-1-10","gp1-1-1-10","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-1-10"],
  ["compute-vps-madrid-spain-gp1-1-1-15","gp1-1-1-15","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-1-15"],
  ["compute-vps-madrid-spain-gp1-1-2-20","gp1-1-2-20","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-1-2-20"],
  ["compute-vps-madrid-spain-gp1-2-2-40","gp1-2-2-40","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-2-2-40"],
  ["compute-vps-madrid-spain-gp1-2-2-40-pro","gp1-2-2-40-pro","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-2-2-40-pro"],
  ["compute-vps-madrid-spain-gp1-2-4-50","gp1-2-4-50","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-2-4-50"],
  ["compute-vps-madrid-spain-gp1-3-4-60","gp1-3-4-60","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-3-4-60"],
  ["compute-vps-madrid-spain-gp1-4-8-80","gp1-4-8-80","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-4-8-80"],
  ["compute-vps-madrid-spain-gp1-6-16-160","gp1-6-16-160","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-6-16-160"],
  ["compute-vps-madrid-spain-gp1-8-32-320","gp1-8-32-320","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-8-32-320"],
  ["compute-vps-madrid-spain-gp1-16-64-640","gp1-16-64-640","ES","#product","https://my.computeguy.com/order/metered-vps/madrid-spain/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-stockholm-sweden/",[
  ["compute-vps-stockholm-sweden-gp1-1-1-10-v6","gp1-1-1-10-v6","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-1-10-v6"],
  ["compute-vps-stockholm-sweden-gp1-1-1-10","gp1-1-1-10","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-1-10"],
  ["compute-vps-stockholm-sweden-gp1-1-1-15","gp1-1-1-15","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-1-15"],
  ["compute-vps-stockholm-sweden-gp1-1-2-20","gp1-1-2-20","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-1-2-20"],
  ["compute-vps-stockholm-sweden-gp1-2-2-40","gp1-2-2-40","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-2-2-40"],
  ["compute-vps-stockholm-sweden-gp1-2-2-40-pro","gp1-2-2-40-pro","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-2-2-40-pro"],
  ["compute-vps-stockholm-sweden-gp1-2-4-50","gp1-2-4-50","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-2-4-50"],
  ["compute-vps-stockholm-sweden-gp1-3-4-60","gp1-3-4-60","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-3-4-60"],
  ["compute-vps-stockholm-sweden-gp1-4-8-80","gp1-4-8-80","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-4-8-80"],
  ["compute-vps-stockholm-sweden-gp1-6-16-160","gp1-6-16-160","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-6-16-160"],
  ["compute-vps-stockholm-sweden-gp1-8-32-320","gp1-8-32-320","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-8-32-320"],
  ["compute-vps-stockholm-sweden-gp1-16-64-640","gp1-16-64-640","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-16-64-640"],
  ["compute-vps-stockholm-sweden-gp1-32-128-1t","gp1-32-128-1t","SE","#product","https://my.computeguy.com/order/metered-vps/stockholm-sweden/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-zurich-switzerland/",[
  ["compute-vps-zurich-switzerland-gp1-2-2-40","gp1-2-2-40","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-2-2-40"],
  ["compute-vps-zurich-switzerland-gp1-2-2-40-pro","gp1-2-2-40-pro","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-2-2-40-pro"],
  ["compute-vps-zurich-switzerland-gp1-2-4-50","gp1-2-4-50","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-2-4-50"],
  ["compute-vps-zurich-switzerland-gp1-3-4-60","gp1-3-4-60","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-3-4-60"],
  ["compute-vps-zurich-switzerland-gp1-4-8-80","gp1-4-8-80","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-4-8-80"],
  ["compute-vps-zurich-switzerland-gp1-6-16-160","gp1-6-16-160","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-6-16-160"],
  ["compute-vps-zurich-switzerland-gp1-8-32-320","gp1-8-32-320","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-8-32-320"],
  ["compute-vps-zurich-switzerland-gp1-16-64-640","gp1-16-64-640","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-16-64-640"],
  ["compute-vps-zurich-switzerland-gp1-32-128-1t","gp1-32-128-1t","CH","#product","https://my.computeguy.com/order/metered-vps/zurich-switzerland/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-kyiv-ukraine/",[
  ["compute-vps-kyiv-ukraine-gp1-1-1-10-v6","gp1-1-1-10-v6","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-1-10-v6"],
  ["compute-vps-kyiv-ukraine-gp1-1-1-10","gp1-1-1-10","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-1-10"],
  ["compute-vps-kyiv-ukraine-gp1-1-1-15","gp1-1-1-15","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-1-15"],
  ["compute-vps-kyiv-ukraine-gp1-1-2-20","gp1-1-2-20","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-1-2-20"],
  ["compute-vps-kyiv-ukraine-gp1-2-2-40","gp1-2-2-40","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-2-2-40"],
  ["compute-vps-kyiv-ukraine-gp1-2-2-40-pro","gp1-2-2-40-pro","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-2-2-40-pro"],
  ["compute-vps-kyiv-ukraine-gp1-2-4-50","gp1-2-4-50","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-2-4-50"],
  ["compute-vps-kyiv-ukraine-gp1-3-4-60","gp1-3-4-60","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-3-4-60"],
  ["compute-vps-kyiv-ukraine-gp1-4-8-80","gp1-4-8-80","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-4-8-80"],
  ["compute-vps-kyiv-ukraine-gp1-6-16-160","gp1-6-16-160","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-6-16-160"],
  ["compute-vps-kyiv-ukraine-gp1-8-32-320","gp1-8-32-320","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-8-32-320"],
  ["compute-vps-kyiv-ukraine-gp1-16-64-640","gp1-16-64-640","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-16-64-640"],
  ["compute-vps-kyiv-ukraine-gp1-32-128-1t","gp1-32-128-1t","UA","#product","https://my.computeguy.com/order/metered-vps/kyiv-ukraine/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-london-united-kingdom/",[
  ["compute-vps-london-united-kingdom-gp1-1-1-10-v6","gp1-1-1-10-v6","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-1-10-v6"],
  ["compute-vps-london-united-kingdom-gp1-1-1-10","gp1-1-1-10","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-1-10"],
  ["compute-vps-london-united-kingdom-gp1-1-1-15","gp1-1-1-15","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-1-15"],
  ["compute-vps-london-united-kingdom-gp1-1-2-20","gp1-1-2-20","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-1-2-20"],
  ["compute-vps-london-united-kingdom-gp1-2-2-40","gp1-2-2-40","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-2-2-40"],
  ["compute-vps-london-united-kingdom-gp1-2-2-40-pro","gp1-2-2-40-pro","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-2-2-40-pro"],
  ["compute-vps-london-united-kingdom-gp1-2-4-50","gp1-2-4-50","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-2-4-50"],
  ["compute-vps-london-united-kingdom-gp1-3-4-60","gp1-3-4-60","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-3-4-60"],
  ["compute-vps-london-united-kingdom-gp1-4-8-80","gp1-4-8-80","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-4-8-80"],
  ["compute-vps-london-united-kingdom-gp1-6-16-160","gp1-6-16-160","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-6-16-160"],
  ["compute-vps-london-united-kingdom-gp1-8-32-320","gp1-8-32-320","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-8-32-320"],
  ["compute-vps-london-united-kingdom-gp1-16-64-640","gp1-16-64-640","GB","#product","https://my.computeguy.com/order/metered-vps/london-united-kingdom/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-montreal-canada/",[
  ["compute-vps-montreal-canada-gp1-1-1-10-v6","gp1-1-1-10-v6","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-1-10-v6"],
  ["compute-vps-montreal-canada-gp1-1-1-10","gp1-1-1-10","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-1-10"],
  ["compute-vps-montreal-canada-gp1-1-1-15","gp1-1-1-15","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-1-15"],
  ["compute-vps-montreal-canada-gp1-1-2-20","gp1-1-2-20","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-1-2-20"],
  ["compute-vps-montreal-canada-gp1-2-2-40","gp1-2-2-40","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-2-2-40"],
  ["compute-vps-montreal-canada-gp1-2-2-40-pro","gp1-2-2-40-pro","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-2-2-40-pro"],
  ["compute-vps-montreal-canada-gp1-2-4-50","gp1-2-4-50","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-2-4-50"],
  ["compute-vps-montreal-canada-gp1-3-4-60","gp1-3-4-60","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-3-4-60"],
  ["compute-vps-montreal-canada-gp1-4-8-80","gp1-4-8-80","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-4-8-80"],
  ["compute-vps-montreal-canada-gp1-6-16-160","gp1-6-16-160","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-6-16-160"],
  ["compute-vps-montreal-canada-gp1-8-32-320","gp1-8-32-320","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-8-32-320"],
  ["compute-vps-montreal-canada-gp1-16-64-640","gp1-16-64-640","CA","#product","https://my.computeguy.com/order/metered-vps/montreal-canada/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-toronto-canada/",[
  ["compute-vps-toronto-canada-gp1-1-1-10-v6","gp1-1-1-10-v6","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-1-10-v6"],
  ["compute-vps-toronto-canada-gp1-1-1-10","gp1-1-1-10","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-1-10"],
  ["compute-vps-toronto-canada-gp1-1-1-15","gp1-1-1-15","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-1-15"],
  ["compute-vps-toronto-canada-gp1-1-2-20","gp1-1-2-20","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-1-2-20"],
  ["compute-vps-toronto-canada-gp1-2-2-40","gp1-2-2-40","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-2-2-40"],
  ["compute-vps-toronto-canada-gp1-2-2-40-pro","gp1-2-2-40-pro","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-2-2-40-pro"],
  ["compute-vps-toronto-canada-gp1-2-4-50","gp1-2-4-50","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-2-4-50"],
  ["compute-vps-toronto-canada-gp1-3-4-60","gp1-3-4-60","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-3-4-60"],
  ["compute-vps-toronto-canada-gp1-4-8-80","gp1-4-8-80","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-4-8-80"],
  ["compute-vps-toronto-canada-gp1-6-16-160","gp1-6-16-160","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-6-16-160"],
  ["compute-vps-toronto-canada-gp1-8-32-320","gp1-8-32-320","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-8-32-320"],
  ["compute-vps-toronto-canada-gp1-16-64-640","gp1-16-64-640","CA","#product","https://my.computeguy.com/order/metered-vps/toronto-canada/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-vancouver-canada/",[
  ["compute-vps-vancouver-canada-gp1-1-1-10-v6","gp1-1-1-10-v6","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-1-10-v6"],
  ["compute-vps-vancouver-canada-gp1-1-1-10","gp1-1-1-10","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-1-10"],
  ["compute-vps-vancouver-canada-gp1-1-1-15","gp1-1-1-15","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-1-15"],
  ["compute-vps-vancouver-canada-gp1-1-2-20","gp1-1-2-20","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-1-2-20"],
  ["compute-vps-vancouver-canada-gp1-2-2-40","gp1-2-2-40","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-2-2-40"],
  ["compute-vps-vancouver-canada-gp1-2-2-40-pro","gp1-2-2-40-pro","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-2-2-40-pro"],
  ["compute-vps-vancouver-canada-gp1-2-4-50","gp1-2-4-50","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-2-4-50"],
  ["compute-vps-vancouver-canada-gp1-3-4-60","gp1-3-4-60","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-3-4-60"],
  ["compute-vps-vancouver-canada-gp1-4-8-80","gp1-4-8-80","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-4-8-80"],
  ["compute-vps-vancouver-canada-gp1-6-16-160","gp1-6-16-160","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-6-16-160"],
  ["compute-vps-vancouver-canada-gp1-8-32-320","gp1-8-32-320","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-8-32-320"],
  ["compute-vps-vancouver-canada-gp1-16-64-640","gp1-16-64-640","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-16-64-640"],
  ["compute-vps-vancouver-canada-gp1-32-128-1t","gp1-32-128-1t","CA","#product","https://my.computeguy.com/order/metered-vps/vancouver-canada/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-mexico-city-mexico/",[
  ["compute-vps-mexico-city-mexico-03d40c2","03d40c2","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d40c2"],
  ["compute-vps-mexico-city-mexico-03d20c4","03d20c4","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d20c4"],
  ["compute-vps-mexico-city-mexico-03d80c2","03d80c2","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d80c2"],
  ["compute-vps-mexico-city-mexico-03d20c2","03d20c2","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/03d20c2"],
  ["compute-vps-mexico-city-mexico-04d60c3","04d60c3","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/04d60c3"],
  ["compute-vps-mexico-city-mexico-05d80c4","05d80c4","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/05d80c4"],
  ["compute-vps-mexico-city-mexico-06d160c6","06d160c6","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/06d160c6"],
  ["compute-vps-mexico-city-mexico-07d320c8","07d320c8","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/07d320c8"],
  ["compute-vps-mexico-city-mexico-08d640c12","08d640c12","MX","#product","https://my.computeguy.com/order/metered-vps/mexico-city-mexico/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-san-juan-puerto-rico/",[
  ["compute-vps-san-juan-puerto-rico-00d10c1v6","00d10c1v6","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/00d10c1v6"],
  ["compute-vps-san-juan-puerto-rico-00d10c1-2","00d10c1-2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/00d10c1-2"],
  ["compute-vps-san-juan-puerto-rico-01d20c1-2","01d20c1-2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/01d20c1-2"],
  ["compute-vps-san-juan-puerto-rico-02d30c1","02d30c1","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/02d30c1"],
  ["compute-vps-san-juan-puerto-rico-03d40c2","03d40c2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d40c2"],
  ["compute-vps-san-juan-puerto-rico-03d20c4","03d20c4","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d20c4"],
  ["compute-vps-san-juan-puerto-rico-03d80c2","03d80c2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d80c2"],
  ["compute-vps-san-juan-puerto-rico-03d20c2","03d20c2","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/03d20c2"],
  ["compute-vps-san-juan-puerto-rico-04d60c3","04d60c3","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/04d60c3"],
  ["compute-vps-san-juan-puerto-rico-05d80c4","05d80c4","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/05d80c4"],
  ["compute-vps-san-juan-puerto-rico-06d160c6","06d160c6","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/06d160c6"],
  ["compute-vps-san-juan-puerto-rico-07d320c8","07d320c8","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/07d320c8"],
  ["compute-vps-san-juan-puerto-rico-08d640c12","08d640c12","PR","#product","https://my.computeguy.com/order/metered-vps/san-juan-puerto-rico/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-atlanta-usa/",[
  ["compute-vps-atlanta-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-1-10-v6"],
  ["compute-vps-atlanta-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-1-10"],
  ["compute-vps-atlanta-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-1-15"],
  ["compute-vps-atlanta-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-1-2-20"],
  ["compute-vps-atlanta-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-2-2-40"],
  ["compute-vps-atlanta-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-2-2-40-pro"],
  ["compute-vps-atlanta-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-2-4-50"],
  ["compute-vps-atlanta-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-3-4-60"],
  ["compute-vps-atlanta-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-4-8-80"],
  ["compute-vps-atlanta-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-6-16-160"],
  ["compute-vps-atlanta-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-8-32-320"],
  ["compute-vps-atlanta-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-16-64-640"],
  ["compute-vps-atlanta-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/atlanta-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-ashburn-usa/",[
  ["compute-vps-ashburn-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-1-10-v6"],
  ["compute-vps-ashburn-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-1-10"],
  ["compute-vps-ashburn-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-1-15"],
  ["compute-vps-ashburn-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-1-2-20"],
  ["compute-vps-ashburn-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-2-2-40"],
  ["compute-vps-ashburn-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-2-2-40-pro"],
  ["compute-vps-ashburn-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-2-4-50"],
  ["compute-vps-ashburn-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-3-4-60"],
  ["compute-vps-ashburn-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-4-8-80"],
  ["compute-vps-ashburn-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-6-16-160"],
  ["compute-vps-ashburn-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-8-32-320"],
  ["compute-vps-ashburn-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-16-64-640"],
  ["compute-vps-ashburn-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/ashburn-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-chicago-usa/",[
  ["compute-vps-chicago-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-1-10-v6"],
  ["compute-vps-chicago-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-1-10"],
  ["compute-vps-chicago-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-1-15"],
  ["compute-vps-chicago-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-1-2-20"],
  ["compute-vps-chicago-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-2-2-40"],
  ["compute-vps-chicago-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-2-2-40-pro"],
  ["compute-vps-chicago-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-2-4-50"],
  ["compute-vps-chicago-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-3-4-60"],
  ["compute-vps-chicago-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-4-8-80"],
  ["compute-vps-chicago-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-6-16-160"],
  ["compute-vps-chicago-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-8-32-320"],
  ["compute-vps-chicago-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-16-64-640"],
  ["compute-vps-chicago-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/chicago-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-dallas-usa/",[
  ["compute-vps-dallas-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-1-10-v6"],
  ["compute-vps-dallas-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-1-10"],
  ["compute-vps-dallas-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-1-15"],
  ["compute-vps-dallas-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-1-2-20"],
  ["compute-vps-dallas-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-2-2-40"],
  ["compute-vps-dallas-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-2-2-40-pro"],
  ["compute-vps-dallas-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-2-4-50"],
  ["compute-vps-dallas-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-3-4-60"],
  ["compute-vps-dallas-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-4-8-80"],
  ["compute-vps-dallas-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-6-16-160"],
  ["compute-vps-dallas-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-8-32-320"],
  ["compute-vps-dallas-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-16-64-640"],
  ["compute-vps-dallas-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/dallas-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-new-york-usa/",[
  ["compute-vps-new-york-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-1-10-v6"],
  ["compute-vps-new-york-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-1-10"],
  ["compute-vps-new-york-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-1-15"],
  ["compute-vps-new-york-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-1-2-20"],
  ["compute-vps-new-york-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-2-2-40"],
  ["compute-vps-new-york-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-2-2-40-pro"],
  ["compute-vps-new-york-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-2-4-50"],
  ["compute-vps-new-york-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-3-4-60"],
  ["compute-vps-new-york-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-4-8-80"],
  ["compute-vps-new-york-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-6-16-160"],
  ["compute-vps-new-york-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-8-32-320"],
  ["compute-vps-new-york-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/new-york-usa/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-miami-usa/",[
  ["compute-vps-miami-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-1-10-v6"],
  ["compute-vps-miami-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-1-10"],
  ["compute-vps-miami-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-1-15"],
  ["compute-vps-miami-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-1-2-20"],
  ["compute-vps-miami-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-2-2-40"],
  ["compute-vps-miami-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-2-2-40-pro"],
  ["compute-vps-miami-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-2-4-50"],
  ["compute-vps-miami-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-3-4-60"],
  ["compute-vps-miami-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-4-8-80"],
  ["compute-vps-miami-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-6-16-160"],
  ["compute-vps-miami-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-8-32-320"],
  ["compute-vps-miami-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-16-64-640"],
  ["compute-vps-miami-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/miami-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-salt-lake-city-usa/",[
  ["compute-vps-salt-lake-city-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-1-10-v6"],
  ["compute-vps-salt-lake-city-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-1-10"],
  ["compute-vps-salt-lake-city-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-1-15"],
  ["compute-vps-salt-lake-city-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-1-2-20"],
  ["compute-vps-salt-lake-city-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-2-2-40"],
  ["compute-vps-salt-lake-city-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-2-2-40-pro"],
  ["compute-vps-salt-lake-city-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-2-4-50"],
  ["compute-vps-salt-lake-city-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-3-4-60"],
  ["compute-vps-salt-lake-city-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-4-8-80"],
  ["compute-vps-salt-lake-city-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-6-16-160"],
  ["compute-vps-salt-lake-city-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-8-32-320"],
  ["compute-vps-salt-lake-city-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-16-64-640"],
  ["compute-vps-salt-lake-city-usa-gp1-32-128-1t","gp1-32-128-1t","US","#product","https://my.computeguy.com/order/metered-vps/salt-lake-city-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-portland-usa/",[
  ["compute-vps-portland-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-1-10-v6"],
  ["compute-vps-portland-usa-gp1-1-1-10","gp1-1-1-10","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-1-10"],
  ["compute-vps-portland-usa-gp1-1-1-15","gp1-1-1-15","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-1-15"],
  ["compute-vps-portland-usa-gp1-1-2-20","gp1-1-2-20","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-1-2-20"],
  ["compute-vps-portland-usa-gp1-2-2-40","gp1-2-2-40","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-2-2-40"],
  ["compute-vps-portland-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-2-2-40-pro"],
  ["compute-vps-portland-usa-gp1-2-4-50","gp1-2-4-50","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-2-4-50"],
  ["compute-vps-portland-usa-gp1-3-4-60","gp1-3-4-60","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-3-4-60"],
  ["compute-vps-portland-usa-gp1-4-8-80","gp1-4-8-80","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-4-8-80"],
  ["compute-vps-portland-usa-gp1-6-16-160","gp1-6-16-160","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-6-16-160"],
  ["compute-vps-portland-usa-gp1-8-32-320","gp1-8-32-320","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-8-32-320"],
  ["compute-vps-portland-usa-gp1-16-64-640","gp1-16-64-640","US","#product","https://my.computeguy.com/order/metered-vps/portland-usa/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-seattle-usa/",[
  ["compute-vps-seattle-usa-gp1-1-1-10-v6","gp1-1-1-10-v6","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-1-10-v6"],
  ["compute-vps-seattle-usa-gp1-1-1-10","gp1-1-1-10","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-1-10"],
  ["compute-vps-seattle-usa-gp1-1-1-15","gp1-1-1-15","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-1-15"],
  ["compute-vps-seattle-usa-gp1-1-2-20","gp1-1-2-20","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-1-2-20"],
  ["compute-vps-seattle-usa-gp1-2-2-40","gp1-2-2-40","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-2-2-40"],
  ["compute-vps-seattle-usa-gp1-2-2-40-pro","gp1-2-2-40-pro","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-2-2-40-pro"],
  ["compute-vps-seattle-usa-gp1-2-4-50","gp1-2-4-50","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-2-4-50"],
  ["compute-vps-seattle-usa-gp1-3-4-60","gp1-3-4-60","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-3-4-60"],
  ["compute-vps-seattle-usa-gp1-4-8-80","gp1-4-8-80","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-4-8-80"],
  ["compute-vps-seattle-usa-gp1-6-16-160","gp1-6-16-160","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-6-16-160"],
  ["compute-vps-seattle-usa-gp1-8-32-320","gp1-8-32-320","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-8-32-320"],
  ["compute-vps-seattle-usa-gp1-16-64-640","gp1-16-64-640","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-16-64-640"],
  ["compute-vps-seattle-usa-gp1-32-128-1t","gp1-32-128-1t","SEA","#product","https://my.computeguy.com/order/metered-vps/seattle-usa/gp1-32-128-1t"]
 ]],
 ["https://www.computeguy.com/vps-hong-kong-hong-kong/",[
  ["compute-vps-hong-kong-hong-kong-02d30c1","02d30c1","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/02d30c1"],
  ["compute-vps-hong-kong-hong-kong-03d40c2","03d40c2","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d40c2"],
  ["compute-vps-hong-kong-hong-kong-03d20c4","03d20c4","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d20c4"],
  ["compute-vps-hong-kong-hong-kong-03d80c2","03d80c2","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d80c2"],
  ["compute-vps-hong-kong-hong-kong-03d20c2","03d20c2","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/03d20c2"],
  ["compute-vps-hong-kong-hong-kong-04d60c3","04d60c3","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/04d60c3"],
  ["compute-vps-hong-kong-hong-kong-05d80c4","05d80c4","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/05d80c4"],
  ["compute-vps-hong-kong-hong-kong-06d160c6","06d160c6","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/06d160c6"],
  ["compute-vps-hong-kong-hong-kong-07d320c8","07d320c8","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/07d320c8"],
  ["compute-vps-hong-kong-hong-kong-08d640c12","08d640c12","HK","#product","https://my.computeguy.com/order/metered-vps/hong-kong-hong-kong/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-jakarta-indonesia/",[
  ["compute-vps-jakarta-indonesia-gp1-1-1-10-v6","gp1-1-1-10-v6","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-1-10-v6"],
  ["compute-vps-jakarta-indonesia-gp1-1-1-10","gp1-1-1-10","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-1-10"],
  ["compute-vps-jakarta-indonesia-gp1-1-1-15","gp1-1-1-15","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-1-15"],
  ["compute-vps-jakarta-indonesia-gp1-1-2-20","gp1-1-2-20","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-1-2-20"],
  ["compute-vps-jakarta-indonesia-gp1-2-2-40","gp1-2-2-40","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-2-2-40"],
  ["compute-vps-jakarta-indonesia-gp1-2-2-40-pro","gp1-2-2-40-pro","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-2-2-40-pro"],
  ["compute-vps-jakarta-indonesia-gp1-2-4-50","gp1-2-4-50","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-2-4-50"],
  ["compute-vps-jakarta-indonesia-gp1-3-4-60","gp1-3-4-60","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-3-4-60"],
  ["compute-vps-jakarta-indonesia-gp1-4-8-80","gp1-4-8-80","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-4-8-80"],
  ["compute-vps-jakarta-indonesia-gp1-6-16-160","gp1-6-16-160","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-6-16-160"],
  ["compute-vps-jakarta-indonesia-gp1-8-32-320","gp1-8-32-320","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-8-32-320"],
  ["compute-vps-jakarta-indonesia-gp1-16-64-640","gp1-16-64-640","ID","#product","https://my.computeguy.com/order/metered-vps/jakarta-indonesia/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-mumbai-india/",[
  ["compute-vps-mumbai-india-00d10c1v6","00d10c1v6","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/00d10c1v6"],
  ["compute-vps-mumbai-india-00d10c1-2","00d10c1-2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/00d10c1-2"],
  ["compute-vps-mumbai-india-01d20c1-2","01d20c1-2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/01d20c1-2"],
  ["compute-vps-mumbai-india-02d30c1","02d30c1","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/02d30c1"],
  ["compute-vps-mumbai-india-03d40c2","03d40c2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d40c2"],
  ["compute-vps-mumbai-india-03d20c4","03d20c4","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d20c4"],
  ["compute-vps-mumbai-india-03d80c2","03d80c2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d80c2"],
  ["compute-vps-mumbai-india-03d20c2","03d20c2","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/03d20c2"],
  ["compute-vps-mumbai-india-04d60c3","04d60c3","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/04d60c3"],
  ["compute-vps-mumbai-india-05d80c4","05d80c4","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/05d80c4"],
  ["compute-vps-mumbai-india-06d160c6","06d160c6","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/06d160c6"],
  ["compute-vps-mumbai-india-07d320c8","07d320c8","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/07d320c8"],
  ["compute-vps-mumbai-india-08d640c12","08d640c12","IN","#product","https://my.computeguy.com/order/metered-vps/mumbai-india/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-singapore-singapore/",[
  ["compute-vps-singapore-singapore-gp1-1-2-20","gp1-1-2-20","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-1-2-20"],
  ["compute-vps-singapore-singapore-gp1-2-2-40","gp1-2-2-40","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-2-2-40"],
  ["compute-vps-singapore-singapore-gp1-2-2-40-pro","gp1-2-2-40-pro","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-2-2-40-pro"],
  ["compute-vps-singapore-singapore-gp1-2-4-50","gp1-2-4-50","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-2-4-50"],
  ["compute-vps-singapore-singapore-gp1-3-4-60","gp1-3-4-60","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-3-4-60"],
  ["compute-vps-singapore-singapore-gp1-4-8-80","gp1-4-8-80","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-4-8-80"],
  ["compute-vps-singapore-singapore-gp1-6-16-160","gp1-6-16-160","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-6-16-160"],
  ["compute-vps-singapore-singapore-gp1-8-32-320","gp1-8-32-320","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-8-32-320"],
  ["compute-vps-singapore-singapore-gp1-16-64-640","gp1-16-64-640","SG","#product","https://my.computeguy.com/order/metered-vps/singapore-singapore/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-taipei-taiwan/",[
  ["compute-vps-taipei-taiwan-02d30c1","02d30c1","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/02d30c1"],
  ["compute-vps-taipei-taiwan-03d40c2","03d40c2","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d40c2"],
  ["compute-vps-taipei-taiwan-03d20c4","03d20c4","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d20c4"],
  ["compute-vps-taipei-taiwan-03d80c2","03d80c2","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d80c2"],
  ["compute-vps-taipei-taiwan-03d20c2","03d20c2","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/03d20c2"],
  ["compute-vps-taipei-taiwan-04d60c3","04d60c3","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/04d60c3"],
  ["compute-vps-taipei-taiwan-05d80c4","05d80c4","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/05d80c4"],
  ["compute-vps-taipei-taiwan-06d160c6","06d160c6","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/06d160c6"],
  ["compute-vps-taipei-taiwan-07d320c8","07d320c8","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/07d320c8"],
  ["compute-vps-taipei-taiwan-08d640c12","08d640c12","TW","#product","https://my.computeguy.com/order/metered-vps/taipei-taiwan/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-istanbul-turkiye/",[
  ["compute-vps-istanbul-turkiye-gp1-1-1-15","gp1-1-1-15","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-1-1-15"],
  ["compute-vps-istanbul-turkiye-gp1-1-2-20","gp1-1-2-20","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-1-2-20"],
  ["compute-vps-istanbul-turkiye-gp1-2-2-40","gp1-2-2-40","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-2-2-40"],
  ["compute-vps-istanbul-turkiye-gp1-2-2-40-pro","gp1-2-2-40-pro","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-2-2-40-pro"],
  ["compute-vps-istanbul-turkiye-gp1-2-4-50","gp1-2-4-50","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-2-4-50"],
  ["compute-vps-istanbul-turkiye-gp1-3-4-60","gp1-3-4-60","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-3-4-60"],
  ["compute-vps-istanbul-turkiye-gp1-4-8-80","gp1-4-8-80","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-4-8-80"],
  ["compute-vps-istanbul-turkiye-gp1-6-16-160","gp1-6-16-160","TR","#product","https://my.computeguy.com/order/metered-vps/istanbul-turkiye/gp1-6-16-160"]
 ]],
 ["https://www.computeguy.com/vps-bangkok-thailand/",[
  ["compute-vps-bangkok-thailand-03d40c2","03d40c2","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d40c2"],
  ["compute-vps-bangkok-thailand-03d20c4","03d20c4","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d20c4"],
  ["compute-vps-bangkok-thailand-03d80c2","03d80c2","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d80c2"],
  ["compute-vps-bangkok-thailand-03d20c2","03d20c2","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/03d20c2"],
  ["compute-vps-bangkok-thailand-04d60c3","04d60c3","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/04d60c3"],
  ["compute-vps-bangkok-thailand-05d80c4","05d80c4","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/05d80c4"],
  ["compute-vps-bangkok-thailand-06d160c6","06d160c6","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/06d160c6"],
  ["compute-vps-bangkok-thailand-07d320c8","07d320c8","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/07d320c8"],
  ["compute-vps-bangkok-thailand-08d640c12","08d640c12","TH","#product","https://my.computeguy.com/order/metered-vps/bangkok-thailand/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-dubai-united-arab-emirates/",[
  ["compute-vps-dubai-united-arab-emirates-02d30c1","02d30c1","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/02d30c1"],
  ["compute-vps-dubai-united-arab-emirates-03d40c2","03d40c2","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d40c2"],
  ["compute-vps-dubai-united-arab-emirates-03d20c4","03d20c4","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d20c4"],
  ["compute-vps-dubai-united-arab-emirates-03d80c2","03d80c2","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d80c2"],
  ["compute-vps-dubai-united-arab-emirates-03d20c2","03d20c2","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/03d20c2"],
  ["compute-vps-dubai-united-arab-emirates-04d60c3","04d60c3","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/04d60c3"],
  ["compute-vps-dubai-united-arab-emirates-05d80c4","05d80c4","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/05d80c4"],
  ["compute-vps-dubai-united-arab-emirates-06d160c6","06d160c6","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/06d160c6"],
  ["compute-vps-dubai-united-arab-emirates-07d320c8","07d320c8","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/07d320c8"],
  ["compute-vps-dubai-united-arab-emirates-08d640c12","08d640c12","AE","#product","https://my.computeguy.com/order/metered-vps/dubai-united-arab-emirates/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-la-paz-bolivia/",[
  ["compute-vps-la-paz-bolivia-03d20c4","03d20c4","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/03d20c4"],
  ["compute-vps-la-paz-bolivia-03d80c2","03d80c2","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/03d80c2"],
  ["compute-vps-la-paz-bolivia-03d20c2","03d20c2","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/03d20c2"],
  ["compute-vps-la-paz-bolivia-04d60c3","04d60c3","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/04d60c3"],
  ["compute-vps-la-paz-bolivia-05d80c4","05d80c4","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/05d80c4"],
  ["compute-vps-la-paz-bolivia-06d160c6","06d160c6","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/06d160c6"],
  ["compute-vps-la-paz-bolivia-07d320c8","07d320c8","BO","#product","https://my.computeguy.com/order/metered-vps/la-paz-bolivia/07d320c8"]
 ]],
 ["https://www.computeguy.com/vps-san-jose-costa-rica/",[
  ["compute-vps-san-jose-costa-rica-00d10c1v6","00d10c1v6","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/00d10c1v6"],
  ["compute-vps-san-jose-costa-rica-00d10c1-2","00d10c1-2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/00d10c1-2"],
  ["compute-vps-san-jose-costa-rica-01d20c1-2","01d20c1-2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/01d20c1-2"],
  ["compute-vps-san-jose-costa-rica-02d30c1","02d30c1","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/02d30c1"],
  ["compute-vps-san-jose-costa-rica-03d40c2","03d40c2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d40c2"],
  ["compute-vps-san-jose-costa-rica-03d20c4","03d20c4","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d20c4"],
  ["compute-vps-san-jose-costa-rica-03d80c2","03d80c2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d80c2"],
  ["compute-vps-san-jose-costa-rica-03d20c2","03d20c2","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/03d20c2"],
  ["compute-vps-san-jose-costa-rica-04d60c3","04d60c3","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/04d60c3"],
  ["compute-vps-san-jose-costa-rica-05d80c4","05d80c4","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/05d80c4"],
  ["compute-vps-san-jose-costa-rica-06d160c6","06d160c6","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/06d160c6"],
  ["compute-vps-san-jose-costa-rica-07d320c8","07d320c8","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/07d320c8"],
  ["compute-vps-san-jose-costa-rica-08d640c12","08d640c12","CR","#product","https://my.computeguy.com/order/metered-vps/san-jose-costa-rica/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-sao-paulo-brazil/",[
  ["compute-vps-sao-paulo-brazil-gp1-1-1-10-v6","gp1-1-1-10-v6","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-1-10-v6"],
  ["compute-vps-sao-paulo-brazil-gp1-1-1-10","gp1-1-1-10","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-1-10"],
  ["compute-vps-sao-paulo-brazil-gp1-1-1-15","gp1-1-1-15","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-1-15"],
  ["compute-vps-sao-paulo-brazil-gp1-1-2-20","gp1-1-2-20","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-1-2-20"],
  ["compute-vps-sao-paulo-brazil-gp1-2-2-40","gp1-2-2-40","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-2-2-40"],
  ["compute-vps-sao-paulo-brazil-gp1-2-2-40-pro","gp1-2-2-40-pro","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-2-2-40-pro"],
  ["compute-vps-sao-paulo-brazil-gp1-2-4-50","gp1-2-4-50","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-2-4-50"],
  ["compute-vps-sao-paulo-brazil-gp1-3-4-60","gp1-3-4-60","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-3-4-60"],
  ["compute-vps-sao-paulo-brazil-gp1-4-8-80","gp1-4-8-80","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-4-8-80"],
  ["compute-vps-sao-paulo-brazil-gp1-6-16-160","gp1-6-16-160","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-6-16-160"],
  ["compute-vps-sao-paulo-brazil-gp1-8-32-320","gp1-8-32-320","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-8-32-320"],
  ["compute-vps-sao-paulo-brazil-gp1-16-64-640","gp1-16-64-640","BR","#product","https://my.computeguy.com/order/metered-vps/sao-paulo-brazil/gp1-16-64-640"]
 ]],
 ["https://www.computeguy.com/vps-quito-ecuador/",[
  ["compute-vps-quito-ecuador-00d10c1v6","00d10c1v6","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/00d10c1v6"],
  ["compute-vps-quito-ecuador-00d10c1-2","00d10c1-2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/00d10c1-2"],
  ["compute-vps-quito-ecuador-01d20c1-2","01d20c1-2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/01d20c1-2"],
  ["compute-vps-quito-ecuador-02d30c1","02d30c1","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/02d30c1"],
  ["compute-vps-quito-ecuador-03d40c2","03d40c2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d40c2"],
  ["compute-vps-quito-ecuador-03d20c4","03d20c4","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d20c4"],
  ["compute-vps-quito-ecuador-03d80c2","03d80c2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d80c2"],
  ["compute-vps-quito-ecuador-03d20c2","03d20c2","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/03d20c2"],
  ["compute-vps-quito-ecuador-04d60c3","04d60c3","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/04d60c3"],
  ["compute-vps-quito-ecuador-05d80c4","05d80c4","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/05d80c4"],
  ["compute-vps-quito-ecuador-06d160c6","06d160c6","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/06d160c6"],
  ["compute-vps-quito-ecuador-07d320c8","07d320c8","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/07d320c8"],
  ["compute-vps-quito-ecuador-08d640c12","08d640c12","EC","#product","https://my.computeguy.com/order/metered-vps/quito-ecuador/08d640c12"]
 ]],
 ["https://www.computeguy.com/vps-lagos-nigeria/",[
  ["compute-vps-lagos-nigeria-02d30c1","02d30c1","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/02d30c1"],
  ["compute-vps-lagos-nigeria-03d40c2","03d40c2","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d40c2"],
  ["compute-vps-lagos-nigeria-03d20c4","03d20c4","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d20c4"],
  ["compute-vps-lagos-nigeria-03d80c2","03d80c2","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d80c2"],
  ["compute-vps-lagos-nigeria-03d20c2","03d20c2","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/03d20c2"],
  ["compute-vps-lagos-nigeria-04d60c3","04d60c3","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/04d60c3"],
  ["compute-vps-lagos-nigeria-05d80c4","05d80c4","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/05d80c4"],
  ["compute-vps-lagos-nigeria-06d160c6","06d160c6","NG","#product","https://my.computeguy.com/order/metered-vps/lagos-nigeria/06d160c6"]
 ]],
 ["https://www.computeguy.com/vps-sydney-australia/",[
  ["compute-vps-sydney-australia-gp1-1-1-10-v6","gp1-1-1-10-v6","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-1-10-v6"],
  ["compute-vps-sydney-australia-gp1-1-1-10","gp1-1-1-10","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-1-10"],
  ["compute-vps-sydney-australia-gp1-1-1-15","gp1-1-1-15","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-1-15"],
  ["compute-vps-sydney-australia-gp1-1-2-20","gp1-1-2-20","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-1-2-20"],
  ["compute-vps-sydney-australia-gp1-2-2-40","gp1-2-2-40","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-2-2-40"],
  ["compute-vps-sydney-australia-gp1-2-2-40-pro","gp1-2-2-40-pro","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-2-2-40-pro"],
  ["compute-vps-sydney-australia-gp1-2-4-50","gp1-2-4-50","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-2-4-50"],
  ["compute-vps-sydney-australia-gp1-3-4-60","gp1-3-4-60","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-3-4-60"],
  ["compute-vps-sydney-australia-gp1-4-8-80","gp1-4-8-80","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-4-8-80"],
  ["compute-vps-sydney-australia-gp1-6-16-160","gp1-6-16-160","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-6-16-160"],
  ["compute-vps-sydney-australia-gp1-8-32-320","gp1-8-32-320","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-8-32-320"],
  ["compute-vps-sydney-australia-gp1-16-64-640","gp1-16-64-640","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-16-64-640"],
  ["compute-vps-sydney-australia-gp1-32-128-1t","gp1-32-128-1t","AU","#product","https://my.computeguy.com/order/metered-vps/sydney-australia/gp1-32-128-1t"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/germany-frankfurt-area",[
  ["shop-f8a7cb220b16","kvm-smart","DE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2105"],
  ["edis-germany-frankfurt-area-kvm-starter","kvm-starter","DE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2104"],
  ["edis-germany-frankfurt-area-kvm-basic","kvm-basic","DE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2103"],
  ["edis-germany-frankfurt-area-kvm-basic-plus","kvm-basic-plus","DE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2102"],
  ["edis-germany-frankfurt-area-kvm-advanced","kvm-advanced","DE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2101"],
  ["edis-germany-frankfurt-area-kvm-advanced-plus","kvm-advanced-plus","DE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2100"],
  ["edis-germany-frankfurt-area-kvm-premium","kvm-premium","DE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2099"],
  ["edis-germany-frankfurt-area-kvm-premium-plus","kvm-premium-plus","DE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2098"],
  ["edis-germany-frankfurt-area-kvm-ruby","kvm-ruby","DE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2097"],
  ["edis-germany-frankfurt-area-kvm-ruby-plus","kvm-ruby-plus","DE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2096"],
  ["edis-germany-frankfurt-area-kvm-diamond-plus","kvm-diamond-plus","DE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2094"],
  ["edis-germany-frankfurt-area-kvm-diamond","kvm-diamond","DE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2095"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/netherlands-amsterdam",[
  ["shop-bbfa3a9433c1","kvm-smart","NL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1502"],
  ["edis-netherlands-amsterdam-kvm-starter","kvm-starter","NL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1507"],
  ["edis-netherlands-amsterdam-kvm-basic","kvm-basic","NL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1512"],
  ["edis-netherlands-amsterdam-kvm-basic-plus","kvm-basic-plus","NL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1517"],
  ["edis-netherlands-amsterdam-kvm-advanced","kvm-advanced","NL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1522"],
  ["edis-netherlands-amsterdam-kvm-advanced-plus","kvm-advanced-plus","NL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1527"],
  ["edis-netherlands-amsterdam-kvm-premium","kvm-premium","NL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1532"],
  ["edis-netherlands-amsterdam-kvm-premium-plus","kvm-premium-plus","NL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1537"],
  ["edis-netherlands-amsterdam-kvm-ruby","kvm-ruby","NL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1990"],
  ["edis-netherlands-amsterdam-kvm-ruby-plus","kvm-ruby-plus","NL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1989"],
  ["edis-netherlands-amsterdam-kvm-diamond-plus","kvm-diamond-plus","NL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1987"],
  ["edis-netherlands-amsterdam-kvm-diamond","kvm-diamond","NL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1988"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/unitedkingdom-london-docklands",[
  ["shop-14b9ce5b5933","kvm-smart","GB","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1853"],
  ["edis-unitedkingdom-london-docklands-kvm-starter","kvm-starter","GB","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1854"],
  ["edis-unitedkingdom-london-docklands-kvm-basic","kvm-basic","GB","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1855"],
  ["edis-unitedkingdom-london-docklands-kvm-basic-plus","kvm-basic-plus","GB","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1856"],
  ["edis-unitedkingdom-london-docklands-kvm-advanced","kvm-advanced","GB","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1857"],
  ["edis-unitedkingdom-london-docklands-kvm-advanced-plus","kvm-advanced-plus","GB","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1858"],
  ["edis-unitedkingdom-london-docklands-kvm-premium","kvm-premium","GB","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1859"],
  ["edis-unitedkingdom-london-docklands-kvm-premium-plus","kvm-premium-plus","GB","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1860"],
  ["edis-unitedkingdom-london-docklands-kvm-ruby","kvm-ruby","GB","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1912"],
  ["edis-unitedkingdom-london-docklands-kvm-ruby-plus","kvm-ruby-plus","GB","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1911"],
  ["edis-unitedkingdom-london-docklands-kvm-diamond-plus","kvm-diamond-plus","GB","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1909"],
  ["edis-unitedkingdom-london-docklands-kvm-diamond","kvm-diamond","GB","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1910"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/france-paris",[
  ["shop-c56f00ecf464","kvm-smart","FR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1342"],
  ["edis-france-paris-kvm-starter","kvm-starter","FR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1347"],
  ["edis-france-paris-kvm-basic","kvm-basic","FR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1352"],
  ["edis-france-paris-kvm-basic-plus","kvm-basic-plus","FR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1357"],
  ["edis-france-paris-kvm-advanced","kvm-advanced","FR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1362"],
  ["edis-france-paris-kvm-advanced-plus","kvm-advanced-plus","FR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1367"],
  ["edis-france-paris-kvm-premium","kvm-premium","FR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1372"],
  ["edis-france-paris-kvm-premium-plus","kvm-premium-plus","FR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1377"],
  ["edis-france-paris-kvm-ruby","kvm-ruby","FR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1918"],
  ["edis-france-paris-kvm-ruby-plus","kvm-ruby-plus","FR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1917"],
  ["edis-france-paris-kvm-diamond-plus","kvm-diamond-plus","FR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1915"],
  ["edis-france-paris-kvm-diamond","kvm-diamond","FR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1916"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/lithuania-vilnius",[
  ["edis-lithuania-vilnius-smart","kvm-smart","LT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1702"],
  ["edis-lithuania-vilnius-kvm-starter","kvm-starter","LT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1707"],
  ["edis-lithuania-vilnius-kvm-basic","kvm-basic","LT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1712"],
  ["edis-lithuania-vilnius-kvm-basic-plus","kvm-basic-plus","LT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1717"],
  ["edis-lithuania-vilnius-kvm-advanced","kvm-advanced","LT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1722"],
  ["edis-lithuania-vilnius-kvm-advanced-plus","kvm-advanced-plus","LT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1727"],
  ["edis-lithuania-vilnius-kvm-premium","kvm-premium","LT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1732"],
  ["edis-lithuania-vilnius-kvm-premium-plus","kvm-premium-plus","LT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1737"],
  ["edis-lithuania-vilnius-kvm-ruby","kvm-ruby","LT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1964"],
  ["edis-lithuania-vilnius-kvm-ruby-plus","kvm-ruby-plus","LT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1963"],
  ["edis-lithuania-vilnius-kvm-diamond-plus","kvm-diamond-plus","LT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1961"],
  ["edis-lithuania-vilnius-kvm-diamond","kvm-diamond","LT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1962"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/austria-vienna",[
  ["edis-austria-vienna-smart","kvm-smart","AT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1622"],
  ["edis-austria-vienna-kvm-starter","kvm-starter","AT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1627"],
  ["edis-austria-vienna-kvm-basic","kvm-basic","AT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1632"],
  ["edis-austria-vienna-kvm-basic-plus","kvm-basic-plus","AT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1637"],
  ["edis-austria-vienna-kvm-advanced","kvm-advanced","AT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1642"],
  ["edis-austria-vienna-kvm-advanced-plus","kvm-advanced-plus","AT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1647"],
  ["edis-austria-vienna-kvm-premium","kvm-premium","AT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1652"],
  ["edis-austria-vienna-kvm-premium-plus","kvm-premium-plus","AT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1657"],
  ["edis-austria-vienna-kvm-ruby","kvm-ruby","AT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1812"],
  ["edis-austria-vienna-kvm-ruby-plus","kvm-ruby-plus","AT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1813"],
  ["edis-austria-vienna-kvm-diamond-plus","kvm-diamond-plus","AT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1815"],
  ["edis-austria-vienna-kvm-diamond","kvm-diamond","AT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1814"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/estonia-tallinn",[
  ["edis-estonia-tallinn-smart","kvm-smart","EE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2051"],
  ["edis-estonia-tallinn-kvm-starter","kvm-starter","EE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2050"],
  ["edis-estonia-tallinn-kvm-basic","kvm-basic","EE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2049"],
  ["edis-estonia-tallinn-kvm-basic-plus","kvm-basic-plus","EE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2048"],
  ["edis-estonia-tallinn-kvm-advanced","kvm-advanced","EE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2047"],
  ["edis-estonia-tallinn-kvm-advanced-plus","kvm-advanced-plus","EE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2046"],
  ["edis-estonia-tallinn-kvm-premium","kvm-premium","EE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2045"],
  ["edis-estonia-tallinn-kvm-premium-plus","kvm-premium-plus","EE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2044"],
  ["edis-estonia-tallinn-kvm-ruby","kvm-ruby","EE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2043"],
  ["edis-estonia-tallinn-kvm-ruby-plus","kvm-ruby-plus","EE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2042"],
  ["edis-estonia-tallinn-kvm-diamond-plus","kvm-diamond-plus","EE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2040"],
  ["edis-estonia-tallinn-kvm-diamond","kvm-diamond","EE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2041"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/latvia-riga",[
  ["edis-latvia-riga-smart","kvm-smart","LV","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1662"],
  ["edis-latvia-riga-kvm-starter","kvm-starter","LV","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1667"],
  ["edis-latvia-riga-kvm-basic","kvm-basic","LV","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1672"],
  ["edis-latvia-riga-kvm-basic-plus","kvm-basic-plus","LV","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1677"],
  ["edis-latvia-riga-kvm-advanced","kvm-advanced","LV","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1682"],
  ["edis-latvia-riga-kvm-advanced-plus","kvm-advanced-plus","LV","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1687"],
  ["edis-latvia-riga-kvm-premium","kvm-premium","LV","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1692"],
  ["edis-latvia-riga-kvm-premium-plus","kvm-premium-plus","LV","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1697"],
  ["edis-latvia-riga-kvm-ruby","kvm-ruby","LV","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1960"],
  ["edis-latvia-riga-kvm-ruby-plus","kvm-ruby-plus","LV","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1959"],
  ["edis-latvia-riga-kvm-diamond-plus","kvm-diamond-plus","LV","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1957"],
  ["edis-latvia-riga-kvm-diamond","kvm-diamond","LV","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1958"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/spain-seville",[
  ["edis-spain-seville-smart","kvm-smart","ES","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1422"],
  ["edis-spain-seville-kvm-starter","kvm-starter","ES","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1427"],
  ["edis-spain-seville-kvm-basic","kvm-basic","ES","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1432"],
  ["edis-spain-seville-kvm-basic-plus","kvm-basic-plus","ES","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1437"],
  ["edis-spain-seville-kvm-advanced","kvm-advanced","ES","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1442"],
  ["edis-spain-seville-kvm-advanced-plus","kvm-advanced-plus","ES","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1447"],
  ["edis-spain-seville-kvm-premium","kvm-premium","ES","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1452"],
  ["edis-spain-seville-kvm-premium-plus","kvm-premium-plus","ES","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1457"],
  ["edis-spain-seville-kvm-ruby","kvm-ruby","ES","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1828"],
  ["edis-spain-seville-kvm-ruby-plus","kvm-ruby-plus","ES","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1829"],
  ["edis-spain-seville-kvm-diamond-plus","kvm-diamond-plus","ES","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1831"],
  ["edis-spain-seville-kvm-diamond","kvm-diamond","ES","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1830"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/poland-warsaw",[
  ["edis-poland-warsaw-smart","kvm-smart","PL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1382"],
  ["edis-poland-warsaw-kvm-starter","kvm-starter","PL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1387"],
  ["edis-poland-warsaw-kvm-basic","kvm-basic","PL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1392"],
  ["edis-poland-warsaw-kvm-basic-plus","kvm-basic-plus","PL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1397"],
  ["edis-poland-warsaw-kvm-advanced","kvm-advanced","PL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1402"],
  ["edis-poland-warsaw-kvm-advanced-plus","kvm-advanced-plus","PL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1407"],
  ["edis-poland-warsaw-kvm-premium","kvm-premium","PL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1412"],
  ["edis-poland-warsaw-kvm-premium-plus","kvm-premium-plus","PL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1417"],
  ["edis-poland-warsaw-kvm-ruby","kvm-ruby","PL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1820"],
  ["edis-poland-warsaw-kvm-ruby-plus","kvm-ruby-plus","PL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1821"],
  ["edis-poland-warsaw-kvm-diamond-plus","kvm-diamond-plus","PL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1823"],
  ["edis-poland-warsaw-kvm-diamond","kvm-diamond","PL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1822"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/usa-new-york",[
  ["edis-usa-new-york-smart","kvm-smart","US","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=843"],
  ["edis-usa-new-york-kvm-starter","kvm-starter","US","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=848"],
  ["edis-usa-new-york-kvm-basic","kvm-basic","US","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=853"],
  ["edis-usa-new-york-kvm-basic-plus","kvm-basic-plus","US","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=858"],
  ["edis-usa-new-york-kvm-advanced","kvm-advanced","US","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=863"],
  ["edis-usa-new-york-kvm-advanced-plus","kvm-advanced-plus","US","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=868"],
  ["edis-usa-new-york-kvm-premium","kvm-premium","US","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=873"],
  ["edis-usa-new-york-kvm-premium-plus","kvm-premium-plus","US","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=878"],
  ["edis-usa-new-york-kvm-ruby","kvm-ruby","US","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1840"],
  ["edis-usa-new-york-kvm-ruby-plus","kvm-ruby-plus","US","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1841"],
  ["edis-usa-new-york-kvm-diamond-plus","kvm-diamond-plus","US","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1843"],
  ["edis-usa-new-york-kvm-diamond","kvm-diamond","US","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1842"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/bulgaria-sofia",[
  ["edis-bulgaria-sofia-smart","kvm-smart","BG","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=366"],
  ["edis-bulgaria-sofia-kvm-starter","kvm-starter","BG","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=381"],
  ["edis-bulgaria-sofia-kvm-basic","kvm-basic","BG","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=371"],
  ["edis-bulgaria-sofia-kvm-basic-plus","kvm-basic-plus","BG","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=376"],
  ["edis-bulgaria-sofia-kvm-advanced","kvm-advanced","BG","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=386"],
  ["edis-bulgaria-sofia-kvm-advanced-plus","kvm-advanced-plus","BG","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=391"],
  ["edis-bulgaria-sofia-kvm-premium","kvm-premium","BG","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=396"],
  ["edis-bulgaria-sofia-kvm-premium-plus","kvm-premium-plus","BG","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=401"],
  ["edis-bulgaria-sofia-kvm-ruby","kvm-ruby","BG","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2006"],
  ["edis-bulgaria-sofia-kvm-ruby-plus","kvm-ruby-plus","BG","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2005"],
  ["edis-bulgaria-sofia-kvm-diamond-plus","kvm-diamond-plus","BG","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2003"],
  ["edis-bulgaria-sofia-kvm-diamond","kvm-diamond","BG","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2004"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/germany-frankfurt",[
  ["edis-germany-frankfurt-kvm-smart","kvm-smart","DE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1102"],
  ["edis-germany-frankfurt-kvm-starter","kvm-starter","DE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1107"],
  ["edis-germany-frankfurt-kvm-basic","kvm-basic","DE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1112"],
  ["edis-germany-frankfurt-kvm-basic-plus","kvm-basic-plus","DE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1117"],
  ["edis-germany-frankfurt-kvm-advanced","kvm-advanced","DE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1122"],
  ["edis-germany-frankfurt-kvm-advanced-plus","kvm-advanced-plus","DE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1127"],
  ["edis-germany-frankfurt-kvm-premium","kvm-premium","DE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1132"],
  ["edis-germany-frankfurt-kvm-premium-plus","kvm-premium-plus","DE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1137"],
  ["edis-germany-frankfurt-kvm-ruby","kvm-ruby","DE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1896"],
  ["edis-germany-frankfurt-kvm-ruby-plus","kvm-ruby-plus","DE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1895"],
  ["edis-germany-frankfurt-kvm-diamond-plus","kvm-diamond-plus","DE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1893"],
  ["edis-germany-frankfurt-kvm-diamond","kvm-diamond","DE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1894"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/australia-sydney",[
  ["edis-australia-sydney-kvm-smart","kvm-smart","AU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=928"],
  ["edis-australia-sydney-kvm-starter","kvm-starter","AU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=934"],
  ["edis-australia-sydney-kvm-basic","kvm-basic","AU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=940"],
  ["edis-australia-sydney-kvm-basic-plus","kvm-basic-plus","AU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=946"],
  ["edis-australia-sydney-kvm-advanced","kvm-advanced","AU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=952"],
  ["edis-australia-sydney-kvm-advanced-plus","kvm-advanced-plus","AU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=958"],
  ["edis-australia-sydney-kvm-premium","kvm-premium","AU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=964"],
  ["edis-australia-sydney-kvm-premium-plus","kvm-premium-plus","AU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=970"],
  ["edis-australia-sydney-kvm-ruby","kvm-ruby","AU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2027"],
  ["edis-australia-sydney-kvm-ruby-plus","kvm-ruby-plus","AU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2026"],
  ["edis-australia-sydney-kvm-diamond-plus","kvm-diamond-plus","AU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2024"],
  ["edis-australia-sydney-kvm-diamond","kvm-diamond","AU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2025"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/switzerland-zurich",[
  ["edis-switzerland-zurich-kvm-smart","kvm-smart","CH","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2067"],
  ["edis-switzerland-zurich-kvm-starter","kvm-starter","CH","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2066"],
  ["edis-switzerland-zurich-kvm-basic","kvm-basic","CH","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2065"],
  ["edis-switzerland-zurich-kvm-basic-plus","kvm-basic-plus","CH","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2064"],
  ["edis-switzerland-zurich-kvm-advanced","kvm-advanced","CH","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2063"],
  ["edis-switzerland-zurich-kvm-advanced-plus","kvm-advanced-plus","CH","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2062"],
  ["edis-switzerland-zurich-kvm-premium","kvm-premium","CH","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2061"],
  ["edis-switzerland-zurich-kvm-premium-plus","kvm-premium-plus","CH","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2060"],
  ["edis-switzerland-zurich-kvm-ruby","kvm-ruby","CH","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2059"],
  ["edis-switzerland-zurich-kvm-ruby-plus","kvm-ruby-plus","CH","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2058"],
  ["edis-switzerland-zurich-kvm-diamond-plus","kvm-diamond-plus","CH","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2056 "],
  ["edis-switzerland-zurich-kvm-diamond","kvm-diamond","CH","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2057"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/austria-graz",[
  ["edis-austria-graz-kvm-smart","kvm-smart","AT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1062"],
  ["edis-austria-graz-kvm-starter","kvm-starter","AT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1067"],
  ["edis-austria-graz-kvm-basic","kvm-basic","AT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1072"],
  ["edis-austria-graz-kvm-basic-plus","kvm-basic-plus","AT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1077"],
  ["edis-austria-graz-kvm-advanced","kvm-advanced","AT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1082"],
  ["edis-austria-graz-kvm-advanced-plus","kvm-advanced-plus","AT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1087"],
  ["edis-austria-graz-kvm-premium","kvm-premium","AT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1092"],
  ["edis-austria-graz-kvm-premium-plus","kvm-premium-plus","AT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1097"],
  ["edis-austria-graz-kvm-ruby","kvm-ruby","AT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1808"],
  ["edis-austria-graz-kvm-ruby-plus","kvm-ruby-plus","AT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1809"],
  ["edis-austria-graz-kvm-diamond-plus","kvm-diamond-plus","AT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1811"],
  ["edis-austria-graz-kvm-diamond","kvm-diamond","AT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1810"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/austria-vienna-interxion",[
  ["edis-austria-vienna-interxion-kvm-smart","kvm-smart","AT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1873"],
  ["edis-austria-vienna-interxion-kvm-starter","kvm-starter","AT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1884"],
  ["edis-austria-vienna-interxion-kvm-basic","kvm-basic","AT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1883"],
  ["edis-austria-vienna-interxion-kvm-basic-plus","kvm-basic-plus","AT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1882"],
  ["edis-austria-vienna-interxion-kvm-advanced","kvm-advanced","AT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1881"],
  ["edis-austria-vienna-interxion-kvm-advanced-plus","kvm-advanced-plus","AT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1880"],
  ["edis-austria-vienna-interxion-kvm-premium","kvm-premium","AT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1879"],
  ["edis-austria-vienna-interxion-kvm-premium-plus","kvm-premium-plus","AT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1878"],
  ["edis-austria-vienna-interxion-kvm-ruby","kvm-ruby","AT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1877"],
  ["edis-austria-vienna-interxion-kvm-ruby-plus","kvm-ruby-plus","AT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1876"],
  ["edis-austria-vienna-interxion-kvm-diamond-plus","kvm-diamond-plus","AT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1874"],
  ["edis-austria-vienna-interxion-kvm-diamond","kvm-diamond","AT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1875"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/canada-montreal",[
  ["edis-canada-montreal-kvm-smart","kvm-smart","CA","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=497"],
  ["edis-canada-montreal-kvm-starter","kvm-starter","CA","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=502"],
  ["edis-canada-montreal-kvm-basic","kvm-basic","CA","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=507"],
  ["edis-canada-montreal-kvm-basic-plus","kvm-basic-plus","CA","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=512"],
  ["edis-canada-montreal-kvm-advanced","kvm-advanced","CA","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=517"],
  ["edis-canada-montreal-kvm-advanced-plus","kvm-advanced-plus","CA","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=522"],
  ["edis-canada-montreal-kvm-premium","kvm-premium","CA","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=527"],
  ["edis-canada-montreal-kvm-premium-plus","kvm-premium-plus","CA","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=532"],
  ["edis-canada-montreal-kvm-ruby","kvm-ruby","CA","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1888"],
  ["edis-canada-montreal-kvm-ruby-plus","kvm-ruby-plus","CA","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1887"],
  ["edis-canada-montreal-kvm-diamond-plus","kvm-diamond-plus","CA","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1885"],
  ["edis-canada-montreal-kvm-diamond","kvm-diamond","CA","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1886"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/belgium-brussels",[
  ["edis-belgium-brussels-kvm-smart","kvm-smart","BE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=977"],
  ["edis-belgium-brussels-kvm-starter","kvm-starter","BE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=987"],
  ["edis-belgium-brussels-kvm-basic","kvm-basic","BE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=992"],
  ["edis-belgium-brussels-kvm-basic-plus","kvm-basic-plus","BE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1037"],
  ["edis-belgium-brussels-kvm-advanced","kvm-advanced","BE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1042"],
  ["edis-belgium-brussels-kvm-advanced-plus","kvm-advanced-plus","BE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1047"],
  ["edis-belgium-brussels-kvm-premium","kvm-premium","BE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1052"],
  ["edis-belgium-brussels-kvm-premium-plus","kvm-premium-plus","BE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1057"],
  ["edis-belgium-brussels-kvm-ruby","kvm-ruby","BE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1816"],
  ["edis-belgium-brussels-kvm-ruby-plus","kvm-ruby-plus","BE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1817"],
  ["edis-belgium-brussels-kvm-diamond-plus","kvm-diamond-plus","BE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1819"],
  ["edis-belgium-brussels-kvm-diamond","kvm-diamond","BE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1818"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/chile-vina-del-mar",[
  ["edis-chile-vina-del-mar-kvm-smart","kvm-smart","CL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=662"],
  ["edis-chile-vina-del-mar-kvm-starter","kvm-starter","CL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=667"],
  ["edis-chile-vina-del-mar-kvm-basic","kvm-basic","CL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=672"],
  ["edis-chile-vina-del-mar-kvm-basic-plus","kvm-basic-plus","CL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=677"],
  ["edis-chile-vina-del-mar-kvm-advanced","kvm-advanced","CL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=682"],
  ["edis-chile-vina-del-mar-kvm-advanced-plus","kvm-advanced-plus","CL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=687"],
  ["edis-chile-vina-del-mar-kvm-premium","kvm-premium","CL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=692"],
  ["edis-chile-vina-del-mar-kvm-premium-plus","kvm-premium-plus","CL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=697"],
  ["edis-chile-vina-del-mar-kvm-ruby","kvm-ruby","CL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2035"],
  ["edis-chile-vina-del-mar-kvm-ruby-plus","kvm-ruby-plus","CL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2034"],
  ["edis-chile-vina-del-mar-kvm-diamond-plus","kvm-diamond-plus","CL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2032"],
  ["edis-chile-vina-del-mar-kvm-diamond","kvm-diamond","CL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2033"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/colombia-bogota",[
  ["edis-colombia-bogota-kvm-smart","kvm-smart","CO","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1956"],
  ["edis-colombia-bogota-kvm-starter","kvm-starter","CO","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1955"],
  ["edis-colombia-bogota-kvm-basic","kvm-basic","CO","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1954"],
  ["edis-colombia-bogota-kvm-basic-plus","kvm-basic-plus","CO","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1953"],
  ["edis-colombia-bogota-kvm-advanced","kvm-advanced","CO","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1952"],
  ["edis-colombia-bogota-kvm-advanced-plus","kvm-advanced-plus","CO","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1951"],
  ["edis-colombia-bogota-kvm-premium","kvm-premium","CO","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1950"],
  ["edis-colombia-bogota-kvm-premium-plus","kvm-premium-plus","CO","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1949"],
  ["edis-colombia-bogota-kvm-ruby","kvm-ruby","CO","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2039"],
  ["edis-colombia-bogota-kvm-ruby-plus","kvm-ruby-plus","CO","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2038"],
  ["edis-colombia-bogota-kvm-diamond-plus","kvm-diamond-plus","CO","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2036"],
  ["edis-colombia-bogota-kvm-diamond","kvm-diamond","CO","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2037"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/croatia-zagreb",[
  ["edis-croatia-zagreb-kvm-smart","kvm-smart","HR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1742"],
  ["edis-croatia-zagreb-kvm-starter","kvm-starter","HR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1743"],
  ["edis-croatia-zagreb-kvm-basic","kvm-basic","HR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1744"],
  ["edis-croatia-zagreb-kvm-basic-plus","kvm-basic-plus","HR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1745"],
  ["edis-croatia-zagreb-kvm-advanced","kvm-advanced","HR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1746"],
  ["edis-croatia-zagreb-kvm-advanced-plus","kvm-advanced-plus","HR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1747"],
  ["edis-croatia-zagreb-kvm-premium","kvm-premium","HR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1748"],
  ["edis-croatia-zagreb-kvm-premium-plus","kvm-premium-plus","HR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1749"],
  ["edis-croatia-zagreb-kvm-ruby","kvm-ruby","HR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2011"],
  ["edis-croatia-zagreb-kvm-ruby-plus","kvm-ruby-plus","HR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2010"],
  ["edis-croatia-zagreb-kvm-diamond-plus","kvm-diamond-plus","HR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2007"],
  ["edis-croatia-zagreb-kvm-diamond","kvm-diamond","HR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2009"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/cyprus-limassol",[
  ["edis-cyprus-limassol-kvm-smart","kvm-smart","CY","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2002"],
  ["edis-cyprus-limassol-kvm-starter","kvm-starter","CY","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2001"],
  ["edis-cyprus-limassol-kvm-basic","kvm-basic","CY","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2000"],
  ["edis-cyprus-limassol-kvm-basic-plus","kvm-basic-plus","CY","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1999"],
  ["edis-cyprus-limassol-kvm-advanced","kvm-advanced","CY","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1998"],
  ["edis-cyprus-limassol-kvm-advanced-plus","kvm-advanced-plus","CY","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1997"],
  ["edis-cyprus-limassol-kvm-premium","kvm-premium","CY","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1996"],
  ["edis-cyprus-limassol-kvm-premium-plus","kvm-premium-plus","CY","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1995"],
  ["edis-cyprus-limassol-kvm-ruby","kvm-ruby","CY","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1994"],
  ["edis-cyprus-limassol-kvm-ruby-plus","kvm-ruby-plus","CY","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1993"],
  ["edis-cyprus-limassol-kvm-diamond-plus","kvm-diamond-plus","CY","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1991"],
  ["edis-cyprus-limassol-kvm-diamond","kvm-diamond","CY","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1992"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/czech-republic-prague",[
  ["edis-czech-republic-prague-kvm-smart","kvm-smart","CZ","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=758"],
  ["edis-czech-republic-prague-kvm-starter","kvm-starter","CZ","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=763"],
  ["edis-czech-republic-prague-kvm-basic","kvm-basic","CZ","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=768"],
  ["edis-czech-republic-prague-kvm-basic-plus","kvm-basic-plus","CZ","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=773"],
  ["edis-czech-republic-prague-kvm-advanced","kvm-advanced","CZ","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=778"],
  ["edis-czech-republic-prague-kvm-advanced-plus","kvm-advanced-plus","CZ","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=783"],
  ["edis-czech-republic-prague-kvm-premium","kvm-premium","CZ","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=788"],
  ["edis-czech-republic-prague-kvm-premium-plus","kvm-premium-plus","CZ","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=793"],
  ["edis-czech-republic-prague-kvm-ruby","kvm-ruby","CZ","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1836"],
  ["edis-czech-republic-prague-kvm-ruby-plus","kvm-ruby-plus","CZ","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1837"],
  ["edis-czech-republic-prague-kvm-diamond-plus","kvm-diamond-plus","CZ","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1839"],
  ["edis-czech-republic-prague-kvm-diamond","kvm-diamond","CZ","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1838"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/denmark-copenhagen",[
  ["edis-denmark-copenhagen-kvm-smart","kvm-smart","DK","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=997"],
  ["edis-denmark-copenhagen-kvm-starter","kvm-starter","DK","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1002"],
  ["edis-denmark-copenhagen-kvm-basic","kvm-basic","DK","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1007"],
  ["edis-denmark-copenhagen-kvm-basic-plus","kvm-basic-plus","DK","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1012"],
  ["edis-denmark-copenhagen-kvm-advanced","kvm-advanced","DK","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1017"],
  ["edis-denmark-copenhagen-kvm-advanced-plus","kvm-advanced-plus","DK","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1022"],
  ["edis-denmark-copenhagen-kvm-premium","kvm-premium","DK","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1027"],
  ["edis-denmark-copenhagen-kvm-premium-plus","kvm-premium-plus","DK","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1032"],
  ["edis-denmark-copenhagen-kvm-ruby","kvm-ruby","DK","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1892"],
  ["edis-denmark-copenhagen-kvm-ruby-plus","kvm-ruby-plus","DK","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1891"],
  ["edis-denmark-copenhagen-kvm-diamond-plus","kvm-diamond-plus","DK","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1889"],
  ["edis-denmark-copenhagen-kvm-diamond","kvm-diamond","DK","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1890"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/finland-helsinki",[
  ["edis-finland-helsinki-kvm-smart","kvm-smart","FI","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2081"],
  ["edis-finland-helsinki-kvm-starter","kvm-starter","FI","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2080"],
  ["edis-finland-helsinki-kvm-basic","kvm-basic","FI","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2079"],
  ["edis-finland-helsinki-kvm-basic-plus","kvm-basic-plus","FI","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2078"],
  ["edis-finland-helsinki-kvm-advanced","kvm-advanced","FI","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2077"],
  ["edis-finland-helsinki-kvm-advanced-plus","kvm-advanced-plus","FI","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2076"],
  ["edis-finland-helsinki-kvm-premium","kvm-premium","FI","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2075"],
  ["edis-finland-helsinki-kvm-premium-plus","kvm-premium-plus","FI","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2074"],
  ["edis-finland-helsinki-kvm-ruby","kvm-ruby","FI","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2073"],
  ["edis-finland-helsinki-kvm-ruby-plus","kvm-ruby-plus","FI","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2072"],
  ["edis-finland-helsinki-kvm-diamond-plus","kvm-diamond-plus","FI","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2070"],
  ["edis-finland-helsinki-kvm-diamond","kvm-diamond","FI","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2071"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/france-marseille",[
  ["edis-france-marseille-kvm-smart","kvm-smart","FR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2119"],
  ["edis-france-marseille-kvm-starter","kvm-starter","FR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2118"],
  ["edis-france-marseille-kvm-basic","kvm-basic","FR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2117"],
  ["edis-france-marseille-kvm-basic-plus","kvm-basic-plus","FR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2115"],
  ["edis-france-marseille-kvm-advanced","kvm-advanced","FR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2116"],
  ["edis-france-marseille-kvm-advanced-plus","kvm-advanced-plus","FR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2114"],
  ["edis-france-marseille-kvm-premium","kvm-premium","FR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2113"],
  ["edis-france-marseille-kvm-premium-plus","kvm-premium-plus","FR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2112"],
  ["edis-france-marseille-kvm-ruby","kvm-ruby","FR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2111"],
  ["edis-france-marseille-kvm-ruby-plus","kvm-ruby-plus","FR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2110"],
  ["edis-france-marseille-kvm-diamond-plus","kvm-diamond-plus","FR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2108"],
  ["edis-france-marseille-kvm-diamond","kvm-diamond","FR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2109"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/hongkong-kwai-chung",[
  ["edis-hongkong-kwai-chung-kvm-smart","kvm-smart","HK","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=106"],
  ["edis-hongkong-kwai-chung-kvm-starter","kvm-starter","HK","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=99"],
  ["edis-hongkong-kwai-chung-kvm-basic","kvm-basic","HK","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=100"],
  ["edis-hongkong-kwai-chung-kvm-basic-plus","kvm-basic-plus","HK","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=101"],
  ["edis-hongkong-kwai-chung-kvm-advanced","kvm-advanced","HK","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=102"],
  ["edis-hongkong-kwai-chung-kvm-advanced-plus","kvm-advanced-plus","HK","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=103"],
  ["edis-hongkong-kwai-chung-kvm-premium","kvm-premium","HK","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=104"],
  ["edis-hongkong-kwai-chung-kvm-premium-plus","kvm-premium-plus","HK","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=105"],
  ["edis-hongkong-kwai-chung-kvm-ruby","kvm-ruby","HK","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1946"],
  ["edis-hongkong-kwai-chung-kvm-ruby-plus","kvm-ruby-plus","HK","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1945"],
  ["edis-hongkong-kwai-chung-kvm-diamond-plus","kvm-diamond-plus","HK","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1943"],
  ["edis-hongkong-kwai-chung-kvm-diamond","kvm-diamond","HK","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1944"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/greece-thessaloniki",[
  ["edis-greece-thessaloniki-kvm-smart","kvm-smart","GR","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=880"],
  ["edis-greece-thessaloniki-kvm-starter","kvm-starter","GR","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=886"],
  ["edis-greece-thessaloniki-kvm-basic","kvm-basic","GR","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=892"],
  ["edis-greece-thessaloniki-kvm-basic-plus","kvm-basic-plus","GR","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=898"],
  ["edis-greece-thessaloniki-kvm-advanced","kvm-advanced","GR","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=904"],
  ["edis-greece-thessaloniki-kvm-advanced-plus","kvm-advanced-plus","GR","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=910"],
  ["edis-greece-thessaloniki-kvm-premium","kvm-premium","GR","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=916"],
  ["edis-greece-thessaloniki-kvm-premium-plus","kvm-premium-plus","GR","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=922"],
  ["edis-greece-thessaloniki-kvm-ruby","kvm-ruby","GR","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2015"],
  ["edis-greece-thessaloniki-kvm-ruby-plus","kvm-ruby-plus","GR","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2014"],
  ["edis-greece-thessaloniki-kvm-diamond-plus","kvm-diamond-plus","GR","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2012"],
  ["edis-greece-thessaloniki-kvm-diamond","kvm-diamond","GR","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2013"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/hungary-budapest",[
  ["edis-hungary-budapest-kvm-smart","kvm-smart","HU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=306"],
  ["edis-hungary-budapest-kvm-starter","kvm-starter","HU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=326"],
  ["edis-hungary-budapest-kvm-basic","kvm-basic","HU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=331"],
  ["edis-hungary-budapest-kvm-basic-plus","kvm-basic-plus","HU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=336"],
  ["edis-hungary-budapest-kvm-advanced","kvm-advanced","HU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=341"],
  ["edis-hungary-budapest-kvm-advanced-plus","kvm-advanced-plus","HU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=346"],
  ["edis-hungary-budapest-kvm-premium","kvm-premium","HU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=351"],
  ["edis-hungary-budapest-kvm-premium-plus","kvm-premium-plus","HU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=356"],
  ["edis-hungary-budapest-kvm-ruby","kvm-ruby","HU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1926"],
  ["edis-hungary-budapest-kvm-ruby-plus","kvm-ruby-plus","HU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1925"],
  ["edis-hungary-budapest-kvm-diamond-plus","kvm-diamond-plus","HU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1923"],
  ["edis-hungary-budapest-kvm-diamond","kvm-diamond","HU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1924"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/iceland-hafnarfjordur",[
  ["edis-iceland-hafnarfjordur-kvm-smart","kvm-smart","IS","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=108"],
  ["edis-iceland-hafnarfjordur-kvm-starter","kvm-starter","IS","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=109"],
  ["edis-iceland-hafnarfjordur-kvm-basic","kvm-basic","IS","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=110"],
  ["edis-iceland-hafnarfjordur-kvm-basic-plus","kvm-basic-plus","IS","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=111"],
  ["edis-iceland-hafnarfjordur-kvm-advanced","kvm-advanced","IS","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=112"],
  ["edis-iceland-hafnarfjordur-kvm-advanced-plus","kvm-advanced-plus","IS","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=113"],
  ["edis-iceland-hafnarfjordur-kvm-premium","kvm-premium","IS","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=114"],
  ["edis-iceland-hafnarfjordur-kvm-premium-plus","kvm-premium-plus","IS","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=115"],
  ["edis-iceland-hafnarfjordur-kvm-ruby","kvm-ruby","IS","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1972"],
  ["edis-iceland-hafnarfjordur-kvm-ruby-plus","kvm-ruby-plus","IS","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1971"],
  ["edis-iceland-hafnarfjordur-kvm-diamond-plus","kvm-diamond-plus","IS","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1969"],
  ["edis-iceland-hafnarfjordur-kvm-diamond","kvm-diamond","IS","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1970"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/israel-tel-aviv",[
  ["edis-israel-tel-aviv-kvm-smart","kvm-smart","IL","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=622"],
  ["edis-israel-tel-aviv-kvm-starter","kvm-starter","IL","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=627"],
  ["edis-israel-tel-aviv-kvm-basic","kvm-basic","IL","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=632"],
  ["edis-israel-tel-aviv-kvm-basic-plus","kvm-basic-plus","IL","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=637"],
  ["edis-israel-tel-aviv-kvm-advanced","kvm-advanced","IL","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=642"],
  ["edis-israel-tel-aviv-kvm-advanced-plus","kvm-advanced-plus","IL","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=647"],
  ["edis-israel-tel-aviv-kvm-premium","kvm-premium","IL","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=652"],
  ["edis-israel-tel-aviv-kvm-premium-plus","kvm-premium-plus","IL","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=657"],
  ["edis-israel-tel-aviv-kvm-ruby","kvm-ruby","IL","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1968"],
  ["edis-israel-tel-aviv-kvm-ruby-plus","kvm-ruby-plus","IL","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1967"],
  ["edis-israel-tel-aviv-kvm-diamond-plus","kvm-diamond-plus","IL","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1965"],
  ["edis-israel-tel-aviv-kvm-diamond","kvm-diamond","IL","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1966"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/italy-milan",[
  ["edis-italy-milan-kvm-smart","kvm-smart","IT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1462"],
  ["edis-italy-milan-kvm-starter","kvm-starter","IT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1467"],
  ["edis-italy-milan-kvm-basic","kvm-basic","IT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1472"],
  ["edis-italy-milan-kvm-basic-plus","kvm-basic-plus","IT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1477"],
  ["edis-italy-milan-kvm-advanced","kvm-advanced","IT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1482"],
  ["edis-italy-milan-kvm-advanced-plus","kvm-advanced-plus","IT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1487"],
  ["edis-italy-milan-kvm-premium","kvm-premium","IT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1492"],
  ["edis-italy-milan-kvm-premium-plus","kvm-premium-plus","IT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1497"],
  ["edis-italy-milan-kvm-ruby","kvm-ruby","IT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1900"],
  ["edis-italy-milan-kvm-ruby-plus","kvm-ruby-plus","IT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1899"],
  ["edis-italy-milan-kvm-diamond-plus","kvm-diamond-plus","IT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1897"],
  ["edis-italy-milan-kvm-diamond","kvm-diamond","IT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1898"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/italy-palermo",[
  ["edis-italy-palermo-kvm-smart","kvm-smart","IT","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=437"],
  ["edis-italy-palermo-kvm-starter","kvm-starter","IT","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=442"],
  ["edis-italy-palermo-kvm-basic","kvm-basic","IT","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=447"],
  ["edis-italy-palermo-kvm-basic-plus","kvm-basic-plus","IT","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=452"],
  ["edis-italy-palermo-kvm-advanced","kvm-advanced","IT","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=457"],
  ["edis-italy-palermo-kvm-advanced-plus","kvm-advanced-plus","IT","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=462"],
  ["edis-italy-palermo-kvm-premium","kvm-premium","IT","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=467"],
  ["edis-italy-palermo-kvm-premium-plus","kvm-premium-plus","IT","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=472"],
  ["edis-italy-palermo-kvm-ruby","kvm-ruby","IT","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2019"],
  ["edis-italy-palermo-kvm-ruby-plus","kvm-ruby-plus","IT","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2018"],
  ["edis-italy-palermo-kvm-diamond-plus","kvm-diamond-plus","IT","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2016"],
  ["edis-italy-palermo-kvm-diamond","kvm-diamond","IT","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2017"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/japan-tokyo",[
  ["edis-japan-tokyo-kvm-smart","kvm-smart","JP","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=537"],
  ["edis-japan-tokyo-kvm-starter","kvm-starter","JP","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=542"],
  ["edis-japan-tokyo-kvm-basic","kvm-basic","JP","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=547"],
  ["edis-japan-tokyo-kvm-basic-plus","kvm-basic-plus","JP","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=552"],
  ["edis-japan-tokyo-kvm-advanced","kvm-advanced","JP","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=557"],
  ["edis-japan-tokyo-kvm-advanced-plus","kvm-advanced-plus","JP","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=562"],
  ["edis-japan-tokyo-kvm-premium","kvm-premium","JP","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=567"],
  ["edis-japan-tokyo-kvm-premium-plus","kvm-premium-plus","JP","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=572"],
  ["edis-japan-tokyo-kvm-ruby","kvm-ruby","JP","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1938"],
  ["edis-japan-tokyo-kvm-ruby-plus","kvm-ruby-plus","JP","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1937"],
  ["edis-japan-tokyo-kvm-diamond-plus","kvm-diamond-plus","JP","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1935"],
  ["edis-japan-tokyo-kvm-diamond","kvm-diamond","JP","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1936"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/moldova-chisinau",[
  ["edis-moldova-chisinau-kvm-smart","kvm-smart","MD","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=713"],
  ["edis-moldova-chisinau-kvm-starter","kvm-starter","MD","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=718"],
  ["edis-moldova-chisinau-kvm-basic","kvm-basic","MD","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=723"],
  ["edis-moldova-chisinau-kvm-basic-plus","kvm-basic-plus","MD","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=728"],
  ["edis-moldova-chisinau-kvm-advanced","kvm-advanced","MD","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=733"],
  ["edis-moldova-chisinau-kvm-advanced-plus","kvm-advanced-plus","MD","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=738"],
  ["edis-moldova-chisinau-kvm-premium","kvm-premium","MD","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=743"],
  ["edis-moldova-chisinau-kvm-premium-plus","kvm-premium-plus","MD","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=748"],
  ["edis-moldova-chisinau-kvm-ruby","kvm-ruby","MD","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2023"],
  ["edis-moldova-chisinau-kvm-ruby-plus","kvm-ruby-plus","MD","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2022"],
  ["edis-moldova-chisinau-kvm-diamond-plus","kvm-diamond-plus","MD","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2020"],
  ["edis-moldova-chisinau-kvm-diamond","kvm-diamond","MD","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2021"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/north-macedonia-skopje",[
  ["edis-north-macedonia-skopje-kvm-smart","kvm-smart","MK","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1750"],
  ["edis-north-macedonia-skopje-kvm-starter","kvm-starter","MK","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1751"],
  ["edis-north-macedonia-skopje-kvm-basic","kvm-basic","MK","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1752"],
  ["edis-north-macedonia-skopje-kvm-basic-plus","kvm-basic-plus","MK","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1753"],
  ["edis-north-macedonia-skopje-kvm-advanced","kvm-advanced","MK","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1754"],
  ["edis-north-macedonia-skopje-kvm-advanced-plus","kvm-advanced-plus","MK","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1755"],
  ["edis-north-macedonia-skopje-kvm-premium","kvm-premium","MK","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1756"],
  ["edis-north-macedonia-skopje-kvm-premium-plus","kvm-premium-plus","MK","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1757"],
  ["edis-north-macedonia-skopje-kvm-ruby","kvm-ruby","MK","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2055"],
  ["edis-north-macedonia-skopje-kvm-ruby-plus","kvm-ruby-plus","MK","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2054"],
  ["edis-north-macedonia-skopje-kvm-diamond-plus","kvm-diamond-plus","MK","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2052"],
  ["edis-north-macedonia-skopje-kvm-diamond","kvm-diamond","MK","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2053"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/norway-oslo",[
  ["edis-norway-oslo-kvm-smart","kvm-smart","NO","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1197"],
  ["edis-norway-oslo-kvm-starter","kvm-starter","NO","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1202"],
  ["edis-norway-oslo-kvm-basic","kvm-basic","NO","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1207"],
  ["edis-norway-oslo-kvm-basic-plus","kvm-basic-plus","NO","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1212"],
  ["edis-norway-oslo-kvm-advanced","kvm-advanced","NO","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1217"],
  ["edis-norway-oslo-kvm-advanced-plus","kvm-advanced-plus","NO","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1222"],
  ["edis-norway-oslo-kvm-premium","kvm-premium","NO","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1227"],
  ["edis-norway-oslo-kvm-premium-plus","kvm-premium-plus","NO","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1232"],
  ["edis-norway-oslo-kvm-ruby","kvm-ruby","NO","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1904"],
  ["edis-norway-oslo-kvm-ruby-plus","kvm-ruby-plus","NO","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1903"],
  ["edis-norway-oslo-kvm-diamond-plus","kvm-diamond-plus","NO","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1901"],
  ["edis-norway-oslo-kvm-diamond","kvm-diamond","NO","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1902"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/romania-bucharest",[
  ["edis-romania-bucharest-kvm-smart","kvm-smart","RO","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1542"],
  ["edis-romania-bucharest-kvm-starter","kvm-starter","RO","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1547"],
  ["edis-romania-bucharest-kvm-basic","kvm-basic","RO","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1552"],
  ["edis-romania-bucharest-kvm-basic-plus","kvm-basic-plus","RO","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1557"],
  ["edis-romania-bucharest-kvm-advanced","kvm-advanced","RO","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1562"],
  ["edis-romania-bucharest-kvm-advanced-plus","kvm-advanced-plus","RO","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1567"],
  ["edis-romania-bucharest-kvm-premium","kvm-premium","RO","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1572"],
  ["edis-romania-bucharest-kvm-premium-plus","kvm-premium-plus","RO","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1577"],
  ["edis-romania-bucharest-kvm-ruby","kvm-ruby","RO","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1908"],
  ["edis-romania-bucharest-kvm-ruby-plus","kvm-ruby-plus","RO","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1907"],
  ["edis-romania-bucharest-kvm-diamond-plus","kvm-diamond-plus","RO","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1905"],
  ["edis-romania-bucharest-kvm-diamond","kvm-diamond","RO","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1906"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/russia-moscow",[
  ["edis-russia-moscow-kvm-smart","kvm-smart","RU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1582"],
  ["edis-russia-moscow-kvm-starter","kvm-starter","RU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1587"],
  ["edis-russia-moscow-kvm-basic","kvm-basic","RU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1592"],
  ["edis-russia-moscow-kvm-basic-plus","kvm-basic-plus","RU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1597"],
  ["edis-russia-moscow-kvm-advanced","kvm-advanced","RU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1602"],
  ["edis-russia-moscow-kvm-advanced-plus","kvm-advanced-plus","RU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1607"],
  ["edis-russia-moscow-kvm-premium","kvm-premium","RU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1612"],
  ["edis-russia-moscow-kvm-premium-plus","kvm-premium-plus","RU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1617"],
  ["edis-russia-moscow-kvm-ruby","kvm-ruby","RU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1824"],
  ["edis-russia-moscow-kvm-ruby-plus","kvm-ruby-plus","RU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1825"],
  ["edis-russia-moscow-kvm-diamond-plus","kvm-diamond-plus","RU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1827"],
  ["edis-russia-moscow-kvm-diamond","kvm-diamond","RU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1826"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/russia-st-petersburg",[
  ["edis-russia-st-petersburg-kvm-smart","kvm-smart","RU","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=201"],
  ["edis-russia-st-petersburg-kvm-starter","kvm-starter","RU","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=211"],
  ["edis-russia-st-petersburg-kvm-basic","kvm-basic","RU","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=216"],
  ["edis-russia-st-petersburg-kvm-basic-plus","kvm-basic-plus","RU","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=221"],
  ["edis-russia-st-petersburg-kvm-advanced","kvm-advanced","RU","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=226"],
  ["edis-russia-st-petersburg-kvm-advanced-plus","kvm-advanced-plus","RU","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=231"],
  ["edis-russia-st-petersburg-kvm-premium","kvm-premium","RU","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=236"],
  ["edis-russia-st-petersburg-kvm-premium-plus","kvm-premium-plus","RU","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=241"],
  ["edis-russia-st-petersburg-kvm-ruby","kvm-ruby","RU","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1848"],
  ["edis-russia-st-petersburg-kvm-ruby-plus","kvm-ruby-plus","RU","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1849"],
  ["edis-russia-st-petersburg-kvm-diamond-plus","kvm-diamond-plus","RU","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1852"],
  ["edis-russia-st-petersburg-kvm-diamond","kvm-diamond","RU","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1851"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/serbia-belgrade",[
  ["edis-serbia-belgrade-kvm-smart","kvm-smart","RS","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=803"],
  ["edis-serbia-belgrade-kvm-starter","kvm-starter","RS","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=808"],
  ["edis-serbia-belgrade-kvm-basic","kvm-basic","RS","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=813"],
  ["edis-serbia-belgrade-kvm-basic-plus","kvm-basic-plus","RS","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=818"],
  ["edis-serbia-belgrade-kvm-advanced","kvm-advanced","RS","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=823"],
  ["edis-serbia-belgrade-kvm-advanced-plus","kvm-advanced-plus","RS","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=828"],
  ["edis-serbia-belgrade-kvm-premium","kvm-premium","RS","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=833"],
  ["edis-serbia-belgrade-kvm-premium-plus","kvm-premium-plus","RS","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=838"],
  ["edis-serbia-belgrade-kvm-ruby","kvm-ruby","RS","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1832"],
  ["edis-serbia-belgrade-kvm-ruby-plus","kvm-ruby-plus","RS","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1833"],
  ["edis-serbia-belgrade-kvm-diamond-plus","kvm-diamond-plus","RS","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1835"],
  ["edis-serbia-belgrade-kvm-diamond","kvm-diamond","RS","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1834"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/singapore-singapore",[
  ["edis-singapore-singapore-kvm-smart","kvm-smart","SG","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=577"],
  ["edis-singapore-singapore-kvm-starter","kvm-starter","SG","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=582"],
  ["edis-singapore-singapore-kvm-basic","kvm-basic","SG","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=587"],
  ["edis-singapore-singapore-kvm-basic-plus","kvm-basic-plus","SG","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=592"],
  ["edis-singapore-singapore-kvm-advanced","kvm-advanced","SG","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=597"],
  ["edis-singapore-singapore-kvm-advanced-plus","kvm-advanced-plus","SG","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=602"],
  ["edis-singapore-singapore-kvm-premium","kvm-premium","SG","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=607"],
  ["edis-singapore-singapore-kvm-premium-plus","kvm-premium-plus","SG","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=612"],
  ["edis-singapore-singapore-kvm-ruby","kvm-ruby","SG","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1942"],
  ["edis-singapore-singapore-kvm-ruby-plus","kvm-ruby-plus","SG","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1941"],
  ["edis-singapore-singapore-kvm-diamond-plus","kvm-diamond-plus","SG","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1939"],
  ["edis-singapore-singapore-kvm-diamond","kvm-diamond","SG","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1940"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/slovenia-ljubljana",[
  ["edis-slovenia-ljubljana-kvm-smart","kvm-smart","SI","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=251"],
  ["edis-slovenia-ljubljana-kvm-starter","kvm-starter","SI","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=261"],
  ["edis-slovenia-ljubljana-kvm-basic","kvm-basic","SI","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=256"],
  ["edis-slovenia-ljubljana-kvm-basic-plus","kvm-basic-plus","SI","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=266"],
  ["edis-slovenia-ljubljana-kvm-advanced","kvm-advanced","SI","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=271"],
  ["edis-slovenia-ljubljana-kvm-advanced-plus","kvm-advanced-plus","SI","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=276"],
  ["edis-slovenia-ljubljana-kvm-premium","kvm-premium","SI","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=281"],
  ["edis-slovenia-ljubljana-kvm-premium-plus","kvm-premium-plus","SI","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=286"],
  ["edis-slovenia-ljubljana-kvm-ruby","kvm-ruby","SI","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1922"],
  ["edis-slovenia-ljubljana-kvm-ruby-plus","kvm-ruby-plus","SI","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1921"],
  ["edis-slovenia-ljubljana-kvm-diamond-plus","kvm-diamond-plus","SI","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1919"],
  ["edis-slovenia-ljubljana-kvm-diamond","kvm-diamond","SI","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1920"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/sweden-stockholm",[
  ["edis-sweden-stockholm-kvm-smart","kvm-smart","SE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1302"],
  ["edis-sweden-stockholm-kvm-starter","kvm-starter","SE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1307"],
  ["edis-sweden-stockholm-kvm-basic","kvm-basic","SE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1312"],
  ["edis-sweden-stockholm-kvm-basic-plus","kvm-basic-plus","SE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1317"],
  ["edis-sweden-stockholm-kvm-advanced","kvm-advanced","SE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1322"],
  ["edis-sweden-stockholm-kvm-advanced-plus","kvm-advanced-plus","SE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1327"],
  ["edis-sweden-stockholm-kvm-premium","kvm-premium","SE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1332"],
  ["edis-sweden-stockholm-kvm-premium-plus","kvm-premium-plus","SE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1337"],
  ["edis-sweden-stockholm-kvm-ruby","kvm-ruby","SE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1930"],
  ["edis-sweden-stockholm-kvm-ruby-plus","kvm-ruby-plus","SE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1929"],
  ["edis-sweden-stockholm-kvm-diamond-plus","kvm-diamond-plus","SE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1927"],
  ["edis-sweden-stockholm-kvm-diamond","kvm-diamond","SE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1928"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/sweden-stockholm-interxion",[
  ["edis-sweden-stockholm-interxion-kvm-smart","kvm-smart","SE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=2093"],
  ["edis-sweden-stockholm-interxion-kvm-starter","kvm-starter","SE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=2092"],
  ["edis-sweden-stockholm-interxion-kvm-basic","kvm-basic","SE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=2091"],
  ["edis-sweden-stockholm-interxion-kvm-basic-plus","kvm-basic-plus","SE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2090"],
  ["edis-sweden-stockholm-interxion-kvm-advanced","kvm-advanced","SE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=2089"],
  ["edis-sweden-stockholm-interxion-kvm-advanced-plus","kvm-advanced-plus","SE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2088"],
  ["edis-sweden-stockholm-interxion-kvm-premium","kvm-premium","SE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=2087"],
  ["edis-sweden-stockholm-interxion-kvm-premium-plus","kvm-premium-plus","SE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2086"],
  ["edis-sweden-stockholm-interxion-kvm-ruby","kvm-ruby","SE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2085"],
  ["edis-sweden-stockholm-interxion-kvm-ruby-plus","kvm-ruby-plus","SE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2084"],
  ["edis-sweden-stockholm-interxion-kvm-diamond-plus","kvm-diamond-plus","SE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2082"],
  ["edis-sweden-stockholm-interxion-kvm-diamond","kvm-diamond","SE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2083"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/united-arab-emirates-dubai",[
  ["edis-united-arab-emirates-dubai-kvm-smart","kvm-smart","AE","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1242"],
  ["edis-united-arab-emirates-dubai-kvm-starter","kvm-starter","AE","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1247"],
  ["edis-united-arab-emirates-dubai-kvm-basic","kvm-basic","AE","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1252"],
  ["edis-united-arab-emirates-dubai-kvm-basic-plus","kvm-basic-plus","AE","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1257"],
  ["edis-united-arab-emirates-dubai-kvm-advanced","kvm-advanced","AE","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1262"],
  ["edis-united-arab-emirates-dubai-kvm-advanced-plus","kvm-advanced-plus","AE","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1267"],
  ["edis-united-arab-emirates-dubai-kvm-premium","kvm-premium","AE","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1272"],
  ["edis-united-arab-emirates-dubai-kvm-premium-plus","kvm-premium-plus","AE","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1277"],
  ["edis-united-arab-emirates-dubai-kvm-ruby","kvm-ruby","AE","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=2031"],
  ["edis-united-arab-emirates-dubai-kvm-ruby-plus","kvm-ruby-plus","AE","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2030"],
  ["edis-united-arab-emirates-dubai-kvm-diamond-plus","kvm-diamond-plus","AE","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=2028"],
  ["edis-united-arab-emirates-dubai-kvm-diamond","kvm-diamond","AE","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=2029"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/united-kingdom-london-city",[
  ["edis-united-kingdom-london-city-kvm-smart","kvm-smart","GB","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1182"],
  ["edis-united-kingdom-london-city-kvm-starter","kvm-starter","GB","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1187"],
  ["edis-united-kingdom-london-city-kvm-basic","kvm-basic","GB","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1192"],
  ["edis-united-kingdom-london-city-kvm-basic-plus","kvm-basic-plus","GB","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1237"],
  ["edis-united-kingdom-london-city-kvm-advanced","kvm-advanced","GB","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1282"],
  ["edis-united-kingdom-london-city-kvm-advanced-plus","kvm-advanced-plus","GB","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1287"],
  ["edis-united-kingdom-london-city-kvm-premium","kvm-premium","GB","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1292"],
  ["edis-united-kingdom-london-city-kvm-premium-plus","kvm-premium-plus","GB","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1297"],
  ["edis-united-kingdom-london-city-kvm-ruby","kvm-ruby","GB","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1934"],
  ["edis-united-kingdom-london-city-kvm-ruby-plus","kvm-ruby-plus","GB","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1933"],
  ["edis-united-kingdom-london-city-kvm-diamond-plus","kvm-diamond-plus","GB","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1931"],
  ["edis-united-kingdom-london-city-kvm-diamond","kvm-diamond","GB","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1932"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/usa-los-angeles",[
  ["edis-usa-los-angeles-kvm-smart","kvm-smart","LAX","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1975"],
  ["edis-usa-los-angeles-kvm-starter","kvm-starter","LAX","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1976"],
  ["edis-usa-los-angeles-kvm-basic","kvm-basic","LAX","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1977"],
  ["edis-usa-los-angeles-kvm-basic-plus","kvm-basic-plus","LAX","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1978"],
  ["edis-usa-los-angeles-kvm-advanced","kvm-advanced","LAX","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1979"],
  ["edis-usa-los-angeles-kvm-advanced-plus","kvm-advanced-plus","LAX","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1980"],
  ["edis-usa-los-angeles-kvm-premium","kvm-premium","LAX","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1981"],
  ["edis-usa-los-angeles-kvm-premium-plus","kvm-premium-plus","LAX","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1982"],
  ["edis-usa-los-angeles-kvm-ruby","kvm-ruby","LAX","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1983"],
  ["edis-usa-los-angeles-kvm-ruby-plus","kvm-ruby-plus","LAX","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1984"],
  ["edis-usa-los-angeles-kvm-diamond-plus","kvm-diamond-plus","LAX","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1986"],
  ["edis-usa-los-angeles-kvm-diamond","kvm-diamond","LAX","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1985"]
 ]],
 ["https://www.edisglobal.com/vps-hosting/usa-miami",[
  ["edis-usa-miami-kvm-smart","kvm-smart","US","#plan-kvm-smart","https://manage.edisglobal.com/cart.php?a=add&pid=1797"],
  ["edis-usa-miami-kvm-starter","kvm-starter","US","#plan-kvm-starter","https://manage.edisglobal.com/cart.php?a=add&pid=1804"],
  ["edis-usa-miami-kvm-basic","kvm-basic","US","#plan-kvm-basic","https://manage.edisglobal.com/cart.php?a=add&pid=1803"],
  ["edis-usa-miami-kvm-basic-plus","kvm-basic-plus","US","#plan-kvm-basic-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1802"],
  ["edis-usa-miami-kvm-advanced","kvm-advanced","US","#plan-kvm-advanced","https://manage.edisglobal.com/cart.php?a=add&pid=1801"],
  ["edis-usa-miami-kvm-advanced-plus","kvm-advanced-plus","US","#plan-kvm-advanced-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1800"],
  ["edis-usa-miami-kvm-premium","kvm-premium","US","#plan-kvm-premium","https://manage.edisglobal.com/cart.php?a=add&pid=1799"],
  ["edis-usa-miami-kvm-premium-plus","kvm-premium-plus","US","#plan-kvm-premium-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1798"],
  ["edis-usa-miami-kvm-ruby","kvm-ruby","US","#plan-kvm-ruby","https://manage.edisglobal.com/cart.php?a=add&pid=1844"],
  ["edis-usa-miami-kvm-ruby-plus","kvm-ruby-plus","US","#plan-kvm-ruby-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1845"],
  ["edis-usa-miami-kvm-diamond-plus","kvm-diamond-plus","US","#plan-kvm-diamond-plus","https://manage.edisglobal.com/cart.php?a=add&pid=1847"],
  ["edis-usa-miami-kvm-diamond","kvm-diamond","US","#plan-kvm-diamond","https://manage.edisglobal.com/cart.php?a=add&pid=1846"]
 ]]
];
for(const [url,rows] of facilityOfferCatalogs){
 for(const [key,sku,zone,suffix,orderUrl] of rows)catalogStockTargets[key]={family:'jsonldoffer',sku,zone,url,productId:url+suffix,orderUrl};
}
const mkCatalogGroups={
 "gz-hk-sh":[
  [1,"gz-hk-2t","HK"],
  [2,"gz-hk-4t","HK"],
  [5,"gz-hk-6t","HK"],
  [6,"gz-hk-10t","HK"],
  [249,"gz-hk-20t","HK"]
 ],
 "gz-hk-ex":[
  [7,"gz-hk-10m","HK"],
  [8,"gz-hk-20m","HK"],
  [9,"gz-hk-50m","HK"],
  [10,"gz-hk-100m","HK"],
  [258,"gz-hk-200m","HK"],
  [262,"gz-hk-300m","HK"]
 ],
 "sh-jp-sh":[
  [184,"sh-jp-2t","JP"],
  [185,"sh-jp-4t","JP"],
  [186,"sh-jp-6t","JP"],
  [187,"sh-jp-10t","JP"],
  [251,"sh-jp-20t","JP"]
 ],
 "sh-jp-ex":[
  [25,"sh-jp-50m","JP"],
  [26,"sh-jp-100m","JP"],
  [201,"sh-jp-10m","JP"],
  [202,"sh-jp-20m","JP"],
  [271,"sh-jp-200m","JP"],
  [286,"sh-jp-300m","JP"]
 ],
 "shh-jp-ex":[
  [28,"sh-jp-20m","JP"],
  [29,"sh-jp-50m","JP"],
  [30,"sh-jp-100m","JP"],
  [203,"sh-jp-10m","JP"]
 ],
 "sh-us-sh":[
  [191,"sh-us-2t","US"],
  [192,"sh-us-4t","US"],
  [193,"sh-us-6t","US"],
  [194,"sh-us-10t","US"],
  [195,"sh-us-20t","US"]
 ],
 "sh-us-ex":[
  [38,"sh-us-10m","US"],
  [39,"sh-us-20m","US"],
  [40,"sh-us-50m","US"],
  [42,"sh-us-100m","US"],
  [287,"sh-us-200m","US"],
  [288,"sh-us-300m","US"]
 ],
 "shh-us-ex":[
  [63,"sh-us-10m","US"],
  [64,"sh-us-20m","US"],
  [65,"sh-us-50m","US"],
  [66,"sh-us-100m","US"]
 ],
 "cloud-hk-sh":[
  [92,"cloud-hk-4t","HK"],
  [94,"cloud-hk-6t","HK"],
  [208,"cloud-hk-10t","HK"],
  [209,"cloud-hk-20t","HK"],
  [210,"cloud-hk-30t","HK"],
  [211,"cloud-hk-50t","HK"],
  [212,"cloud-hk-100t","HK"],
  [213,"cloud-hk-200t","HK"],
  [214,"cloud-hk-300t","HK"]
 ],
 "cloud-jp-sh":[
  [197,"cloud-jp-2t","JP"],
  [199,"cloud-jp-3t","JP"],
  [200,"cloud-jp-6t-1g","JP"],
  [250,"cloud-jp-10t","JP"],
  [263,"cloud-jp-20t","JP"],
  [267,"cloud-jp-30t","JP"],
  [268,"cloud-jp-50t","JP"]
 ],
 "cloud-hk-ex":[
  [109,"cloud-hk-200m","HK"],
  [110,"cloud-hk-500m","HK"],
  [111,"cloud-hk-1g","HK"],
  [130,"cloud-hk-2g","HK"],
  [131,"cloud-hk-5g","HK"]
 ],
 "gz-yd-hk-ex":[
  [121,"gz-hk-2g","HK"],
  [132,"gz-hk-5g","HK"]
 ],
 "gz-th-hk-ex":[
  [116,"gz-hk-2g","HK"],
  [133,"gz-hk-5g","HK"]
 ],
 "gd-dx-hk-ex":[
  [137,"gd-hk-2g","HK"],
  [138,"gd-hk-5g","HK"]
 ],
 "cloud-us-sh":[
  [205,"cloud-us-2t","US"],
  [206,"cloud-us-3t","US"],
  [207,"cloud-us-6t","US"],
  [289,"cloud-us-10t","US"],
  [290,"cloud-us-20t","US"],
  [291,"cloud-us-30t","US"],
  [292,"cloud-us-50t","US"]
 ],
 "cloud-jp-ex":[
  [146,"cloud-jp-100m","JP"],
  [147,"cloud-jp-200m","JP"],
  [148,"cloud-jp-500m","JP"],
  [149,"cloud-jp-1g","JP"],
  [150,"cloud-jp-2g","JP"],
  [151,"cloud-jp-5g","JP"],
  [161,"cloud-jp-50m","JP"]
 ],
 "cloud-us-ex":[
  [153,"cloud-us-100m","US"],
  [154,"cloud-us-200m","US"],
  [155,"cloud-us-500m","US"],
  [156,"cloud-us-1g","US"],
  [157,"cloud-us-2g","US"],
  [158,"cloud-us-5g","US"],
  [163,"cloud-us-50m","US"]
 ],
 "xm-hk-ex":[
  [166,"xm-hk-500m","HK"],
  [167,"xm-hk-1g","HK"],
  [168,"xm-hk-2g","HK"],
  [169,"xm-hk-5g","HK"]
 ],
 "qz-hk-ex":[
  [175,"qz-hk-500m","HK"],
  [176,"qz-hk-1g","HK"],
  [177,"qz-hk-2g","HK"],
  [178,"qz-hk-5g","HK"]
 ],
 "cloud-sh-hk-sh":[
  [218,"cloud-hk-3t","HK"],
  [219,"cloud-hk-6t","HK"],
  [252,"cloud-hk-10t","HK"],
  [264,"cloud-hk-20t","HK"],
  [265,"cloud-hk-30t","HK"],
  [266,"cloud-hk-50t","HK"]
 ],
 "cloud-sh-hk-ex":[
  [222,"cloud-hk-200m","HK"],
  [223,"cloud-hk-500m","HK"],
  [224,"cloud-hk-1g","HK"],
  [225,"cloud-hk-2g","HK"],
  [226,"cloud-hk-5g","HK"]
 ],
 "sh-hk-ex":[
  [229,"sh-hk-10m","HK"],
  [230,"sh-hk-20m","HK"],
  [231,"sh-hk-50m","HK"],
  [232,"sh-hk-100m","HK"]
 ],
 "gd-lt-hk-ex":[
  [255,"gd-hk-2g","HK"],
  [256,"gd-hk-5g","HK"]
 ],
 "sh-hk-sh":[
  [273,"sh-hk-2t","HK"],
  [274,"sh-hk-4t","HK"],
  [275,"sh-hk-6t","HK"],
  [276,"sh-hk-10t","HK"],
  [277,"sh-hk-20t","HK"]
 ],
 "shh-hk-ex":[
  [279,"sh-hk-10m","HK"],
  [280,"sh-hk-20m","HK"],
  [281,"sh-hk-50m","HK"],
  [282,"sh-hk-100m","HK"],
  [283,"sh-hk-200m","HK"],
  [284,"sh-hk-300m","HK"]
 ],
 "gz-sg-sh":[
  [294,"gz-sg-2t","SG"],
  [295,"gz-sg-4t","SG"],
  [296,"gz-sg-6t","SG"],
  [297,"gz-sg-10t","SG"],
  [298,"gz-sg-20t","SG"]
 ],
 "cloud-sg-sh":[
  [300,"cloud-sg-3t","SG"],
  [301,"cloud-sg-6t","SG"],
  [302,"cloud-sg-10t","SG"],
  [303,"cloud-sg-20t","SG"],
  [304,"cloud-sg-30t","SG"],
  [305,"cloud-sg-50t","SG"]
 ],
 "gz-sg-ex":[
  [320,"gz-sg-10m","SG"],
  [321,"gz-sg-20m","SG"],
  [322,"gz-sg-50m","SG"],
  [323,"gz-sg-100m","SG"],
  [324,"gz-sg-200m","SG"],
  [325,"gz-sg-300m","SG"]
 ],
 "cloud-sg-ex":[
  [328,"cloud-sg-200m","SG"],
  [329,"cloud-sg-500m","SG"],
  [330,"cloud-sg-1g","SG"],
  [331,"cloud-sg-2g","SG"],
  [332,"cloud-sg-5g","SG"]
 ],
 "sh-sg-sh":[
  [307,"sh-sg-2t","SG"],
  [308,"sh-sg-4t","SG"],
  [309,"sh-sg-6t","SG"],
  [310,"sh-sg-10t","SG"],
  [311,"sh-sg-20t","SG"]
 ],
 "cloud-sh-sg-sh":[
  [313,"cloud-sg-3t","SG"],
  [314,"cloud-sg-6t","SG"],
  [315,"cloud-sg-10t","SG"],
  [316,"cloud-sg-20t","SG"],
  [317,"cloud-sg-30t","SG"],
  [318,"cloud-sg-50t","SG"]
 ],
 "sh-sg-ex":[
  [335,"sh-sg-10m","SG"],
  [336,"sh-sg-20m","SG"],
  [337,"sh-sg-50m","SG"],
  [338,"sh-sg-100m","SG"],
  [339,"sh-sg-200m","SG"],
  [340,"sh-sg-300m","SG"]
 ],
 "cloud-sh-sg-ex":[
  [349,"cloud-sg-200m","SG"],
  [350,"cloud-sg-500m","SG"],
  [351,"cloud-sg-1g","SG"],
  [352,"cloud-sg-2g","SG"],
  [353,"cloud-sg-5g","SG"]
 ],
 "shh-sg-ex":[
  [343,"sh-sg-20m","SG"],
  [344,"sh-sg-10m","SG"],
  [345,"sh-sg-50m","SG"],
  [346,"sh-sg-100m","SG"]
 ]
};
for(const [group,rows] of Object.entries(mkCatalogGroups)){
 const url='https://www.mkcloud.net/index.php/store/'+group;
 for(const [pid,sku,zone] of rows)catalogStockTargets['mk-'+pid]={family:'mkcloud',pid,sku,zone,group,url};
}
const greenCatalogGroups={
 "10gbps-windows-vps":[
  [189,"10Gbps-1","MULTI",1],
  [186,"10Gbps-2","MULTI",1],
  [187,"10Gbps-3","MULTI",1],
  [188,"10Gbps-4","MULTI",1]
 ],
 "budget-kvm-sale":[
  [2623,"BudgetKVMNYC-2","US"],
  [2625,"BudgetKVMNYC-3","US"],
  [1177,"BudgetKVMVA-2","US"],
  [1179,"BudgetKVMVA-3","US"],
  [2125,"BudgetKVMUT-2","US"],
  [2123,"BudgetKVMUT-3","US"],
  [2017,"BudgetKVMIL2-2","US"],
  [2019,"BudgetKVMIL2-3","US"],
  [1541,"BudgetKVMCA-2","CA"],
  [1543,"BudgetKVMCA-3","CA"],
  [1331,"BudgetKVMSJC-2","SJC"],
  [1333,"BudgetKVMSJC-3","SJC"],
  [2431,"BudgetKVMAZ-2","US"],
  [2433,"BudgetKVMAZ-3","US"],
  [1587,"BudgetKVMLA-2","LAX"],
  [1589,"BudgetKVMLA-3","LAX"],
  [2105,"BudgetKVMJAX-2","US"],
  [2107,"BudgetKVMJAX-3","US"],
  [2257,"BudgetKVMMO-2","US"],
  [2259,"BudgetKVMMO-3","US"],
  [1021,"BudgetKVMTX-2","US"],
  [1023,"BudgetKVMTX-3","US"],
  [2405,"BudgetKVMNY-2","US"],
  [2407,"BudgetKVMNY-3","US"],
  [1243,"BudgetKVMCUK-2","GB"],
  [1245,"BudgetKVMCUK-3","GB"],
  [1975,"BudgetKVMNL-2","NL"],
  [1977,"BudgetKVMNL-3","NL"],
  [2581,"BudgetKVMDE-2","DE"],
  [2583,"BudgetKVMDE-3","DE"],
  [2925,"BudgetKVMRO-2","RO"],
  [2927,"BudgetKVMRO-3","RO"],
  [1353,"BudgetKVMSGDC1-2","SG"],
  [1355,"BudgetKVMSGDC1-3","SG"],
  [1429,"BudgetKVMSG-2 DC2","SG"],
  [1483,"BudgetKVMSG-3 DC2","SG"],
  [1303,"BudgetKVMJPVF-2","JP"],
  [1305,"BudgetKVMJPVF-3","JP"],
  [1513,"BudgetKVMJP-2 (Softbank)","JP"],
  [1515,"BudgetKVMJP-3 (Softbank)","JP"],
  [1983,"BudgetKVMHK2-2","HK"],
  [1985,"BudgetKVMHK2-3","HK"]
 ],
 "budget-windows-vps":[
  [344,"HyperUS6","MULTI",1],
  [343,"HyperUS5","MULTI",1],
  [342,"HyperUS4","MULTI",1],
  [341,"HyperUS3","MULTI",1],
  [340,"HyperUS2","MULTI",1],
  [339,"HyperUS1.5","MULTI",1],
  [335,"HyperUS1","MULTI",1],
  [334,"HyperBudget-1","MULTI",1],
  [337,"HyperBudget-2","MULTI",1],
  [338,"HyperBudget-3","MULTI",1]
 ],
 "cn-premium-optimized":[
  [2213,"CN Premium Optimized Plan Mini (Tokyo)","JP"],
  [2077,"CN Premium Optimized Plan 1 (Tokyo)","JP"],
  [2079,"CN Premium Optimized Plan 2 (Tokyo)","JP"],
  [2081,"CN Premium Optimized Plan 3 (Tokyo)","JP"],
  [2083,"CN Premium Optimized Plan 4 (Tokyo)","JP"],
  [2305,"CN Premium Optimized Plan Mini (Singapore)","SG"],
  [2307,"CN Premium Optimized Plan 1 (Singapore)","SG"],
  [2309,"CN Premium Optimized Plan 2 (Singapore)","SG"],
  [2311,"CN Premium Optimized Plan 3 (Singapore)","SG"],
  [2313,"CN Premium Optimized Plan 4 (Singapore)","SG"]
 ],
 "epyc-cloud-resources":[
  [1247,"APAC Cloud Resource 1","MULTI"],
  [1251,"APAC Cloud Resource 2","MULTI"],
  [1253,"APAC Cloud Resource 3","MULTI"],
  [1255,"USA/EU Cloud Resource 1","MULTI"],
  [1257,"USA/EU Cloud Resource 2","MULTI"],
  [1259,"USA/EU Cloud Resource 3","MULTI"]
 ],
 "epyc-nvme-kvm-vds":[
  [2633,"EPYCVDSNYC-1","US"],
  [2635,"EPYCVDSNYC-2","US"],
  [2637,"EPYCVDSNYC-3","US"],
  [2639,"EPYCVDSNYC-4","US"],
  [2641,"EPYCVDSNYC-5","US"],
  [1319,"EPYCVDSSJCVF-1","SJC"],
  [1321,"EPYCVDSSJCVF-2","SJC"],
  [1323,"EPYCVDSSJCVF-3","SJC"],
  [1325,"EPYCVDSSJCVF-4","SJC"],
  [1327,"EPYCVDSSJCVF-5","SJC"],
  [1597,"EPYCVDSLA-1","LAX"],
  [1599,"EPYCVDSLA-2","LAX"],
  [1601,"EPYCVDSLA-3","LAX"],
  [1603,"EPYCVDSLA-4","LAX"],
  [1605,"EPYCVDSLA-5","LAX"],
  [2145,"EPYCVDSUT-1","US"],
  [2147,"EPYCVDSUT-2","US"],
  [2149,"EPYCVDSUT-3","US"],
  [2151,"EPYCVDSUT-4","US"],
  [2153,"EPYCVDSUT-5","US"],
  [1165,"EPYCVDSASH-1","US"],
  [1167,"EPYCVDSASH-2","US"],
  [1169,"EPYCVDSASH-3","US"],
  [1171,"EPYCVDSASH-4","US"],
  [1173,"EPYCVDSASH-5","US"],
  [2929,"EPYCVDSMO-1","US"],
  [2931,"EPYCVDSMO-2","US"],
  [2933,"EPYCVDSMO-3","US"],
  [2935,"EPYCVDSMO-4","US"],
  [2937,"EPYCVDSMO-5","US"],
  [1227,"EPYCVDSIL-1","US"],
  [1231,"EPYCVDSIL-2","US"],
  [1233,"EPYCVDSIL-3","US"],
  [1235,"EPYCVDSIL-4","US"],
  [1237,"EPYCVDSIL-5","US"],
  [1551,"EPYCVDSCA-1","CA"],
  [1553,"EPYCVDSCA-2","CA"],
  [1555,"EPYCVDSCA-3","CA"],
  [1557,"EPYCVDSCA-4","CA"],
  [1559,"EPYCVDSCA-5","CA"],
  [1385,"EPYCVDSNL-1","NL"],
  [1387,"EPYCVDSNL-2","NL"],
  [1389,"EPYCVDSNL-3","NL"],
  [1391,"EPYCVDSNL-4","NL"],
  [1393,"EPYCVDSNL-5","NL"],
  [1399,"EPYCVDSDEVF-1","DE"],
  [1401,"EPYCVDSDEVF-2","DE"],
  [1403,"EPYCVDSDEVF-3","DE"],
  [1405,"EPYCVDSDEVF-4","DE"],
  [1407,"EPYCVDSDEVF-5","DE"],
  [1959,"EPYCVDSCUKVF-1","GB"],
  [1963,"EPYCVDSCUKVF-2","GB"],
  [1965,"EPYCVDSCUKVF-3","GB"],
  [1967,"EPYCVDSCUKVF-4","GB"],
  [1969,"EPYCVDSCUKVF-5","GB"],
  [1147,"EPYCVDSSGDC2-1","SG"],
  [1155,"EPYCVDSSGDC2-2","SG"],
  [1157,"EPYCVDSSGDC2-3","SG"],
  [1159,"EPYCVDSSGDC2-4","SG"],
  [1161,"EPYCVDSSGDC2-5","SG"],
  [1343,"EPYCVDSSGDC1-1","SG"],
  [1345,"EPYCVDSSGDC1-2","SG"],
  [1347,"EPYCVDSSGDC1-3","SG"],
  [1349,"EPYCVDSSGDC1-4","SG"],
  [1351,"EPYCVDSSGDC1-5","SG"],
  [1517,"EPYCVDSJPVF-1","JP"],
  [1519,"EPYCVDSJPVF-2","JP"],
  [1521,"EPYCVDSJPVF-3","JP"],
  [1523,"EPYCVDSJPVF-4","JP"],
  [1525,"EPYCVDSJPVF-5","JP"],
  [1647,"EPYCVDSJPSB-1","JP"],
  [1649,"EPYCVDSJPSB-2","JP"],
  [1651,"EPYCVDSJPSB-3","JP"],
  [1653,"EPYCVDSJPSB-4","JP"],
  [1655,"EPYCVDSJPSB-5","JP"],
  [1873,"EPYCVDSHKDC2-1","HK"],
  [1875,"EPYCVDSHKDC2-2","HK"],
  [1877,"EPYCVDSHKDC2-3","HK"],
  [1879,"EPYCVDSHKDC2-4","HK"],
  [1881,"EPYCVDSHKDC2-5","HK"],
  [1993,"EPYCVDSHKDC1-1","HK"],
  [1995,"EPYCVDSHKDC1-2","HK"],
  [1997,"EPYCVDSHKDC1-3","HK"],
  [1999,"EPYCVDSHKDC1-4","HK"],
  [2001,"EPYCVDSHKDC1-5","HK"]
 ],
 "forex-vps":[
  [267,"FOREX-1","MULTI",1],
  [268,"FOREX-2","MULTI",1],
  [269,"FOREX-3","MULTI",1],
  [270,"FOREX-4","MULTI",1]
 ],
 "mac-vpsmacos-vps":[
  [276,"MAC-1","MULTI",1],
  [277,"MAC-2","MULTI",1],
  [278,"MAC-3","MULTI",1],
  [279,"MAC-4","MULTI",1]
 ],
 "managed-windows-vps":[
  [756,"Managed Basic","MULTI",1],
  [757,"Managed Advanced","MULTI",1],
  [758,"Managed Premium","MULTI",1],
  [759,"Managed Business","MULTI",1]
 ],
 "premium-kvm-sale":[
  [2627,"EPYCNYC-1","US"],
  [2629,"EPYCNYC-2","US"],
  [2631,"EPYCNYC-3","US"],
  [2457,"EPYCMO-1","US"],
  [2461,"EPYCMO-2","US"],
  [2455,"EPYCMO-3","US"],
  [1315,"EPYCSJC-1","SJC"],
  [1311,"EPYCSJC-2","SJC"],
  [1313,"EPYCSJC-3","SJC"],
  [1591,"EPYCLA-1","LAX"],
  [1593,"EPYCLA-2","LAX"],
  [1595,"EPYCLA-3","LAX"],
  [2143,"EPYCUT-1","US"],
  [2141,"EPYCUT-2","US"],
  [2139,"EPYCUT-3","US"],
  [2503,"EPYCTX-1","US"],
  [2499,"EPYCTX-2","US"],
  [2505,"EPYCTX-3","US"],
  [1181,"EPYCVA-1","US"],
  [1183,"EPYCVA-2","US"],
  [1185,"EPYCVA-3","US"],
  [1221,"EPYCIL2-1","US"],
  [1223,"EPYCIL2-2","US"],
  [1225,"EPYCIL2-3","US"],
  [1545,"EPYCCA-1","CA"],
  [1547,"EPYCCA-2","CA"],
  [1549,"EPYCCA-3","CA"],
  [1379,"EPYCNL-1","NL"],
  [1381,"EPYCNL-2","NL"],
  [1383,"EPYCNL-3","NL"],
  [1411,"EPYCDE-1","DE"],
  [1397,"EPYCDE-2","DE"],
  [1413,"EPYCDE-3","DE"],
  [1953,"EPYCUK-1","GB"],
  [1955,"EPYCUK-2","GB"],
  [1957,"EPYCUK-3","GB"],
  [1499,"EPYCJP-1","JP"],
  [1497,"EPYCJP-2","JP"],
  [1501,"EPYCJP-3","JP"],
  [1503,"EPYCJP-1 (Softbank)","JP"],
  [1505,"EPYCJP-2 (Softbank)","JP"],
  [1507,"EPYCJP-3 (Softbank)","JP"],
  [1187,"EPYCSGDC2-1","SG"],
  [1189,"EPYCSGDC2-2","SG"],
  [1191,"EPYCSGDC2-3","SG"],
  [1337,"EPYCSGDC1-1","SG"],
  [1339,"EPYCSGDC1-2","SG"],
  [1341,"EPYCSGDC1-3","SG"],
  [1415,"EPYCHKDC2-1","HK"],
  [1417,"EPYCHKDC2-2","HK"],
  [1419,"EPYCHKDC2-3","HK"],
  [1987,"EPYCHKDC1-1","HK"],
  [1989,"EPYCHKDC1-2","HK"],
  [1991,"EPYCHKDC1-3","HK"]
 ],
 "ryzen-kvm-vps":[
  [1799,"RyzenLA-1","LAX"],
  [1801,"RyzenLA-2","LAX"],
  [1803,"RyzenLA-3","LAX",1],
  [1805,"RyzenLA-4","LAX",1],
  [1807,"RyzenLA-5","LAX",1],
  [2599,"RyzenIL-1","US",1],
  [2597,"RyzenIL-2","US",1],
  [2591,"RyzenIL-3","US",1],
  [2593,"RyzenIL-4","US",1],
  [2595,"RyzenIL-5","US",1],
  [2157,"RyzenUT-1","US",1],
  [2155,"RyzenUT-2","US",1],
  [2159,"RyzenUT-3","US",1],
  [2163,"RyzenUT-4","US",1],
  [2165,"RyzenUT-5","US",1],
  [2557,"RyzenNL-1","NL"],
  [2559,"RyzenNL-2","NL"],
  [2561,"RyzenNL-3","NL"],
  [2563,"RyzenNL-4","NL"],
  [2565,"RyzenNL-5","NL"],
  [2365,"RyzenSJC-1","SJC",1],
  [2367,"RyzenSJC-2","SJC",1],
  [2369,"RyzenSJC-3","SJC",1],
  [2371,"RyzenSJC-4","SJC",1],
  [2373,"RyzenSJC-5","SJC",1],
  [1809,"RyzenKVMSG2-1","SG",1],
  [1811,"RyzenKVMSG2-2","SG",1],
  [1813,"RyzenKVMSG2-3","SG",1],
  [1815,"RyzenKVMSG2-4","SG",1],
  [1817,"RyzenKVMSG2-5","SG",1],
  [2223,"RyzenKVMHK2-1","HK",1],
  [2225,"RyzenKVMHK2-2","HK",1],
  [2227,"RyzenKVMHK2-3","HK",1],
  [2229,"RyzenKVMHK2-4","HK",1],
  [2231,"RyzenKVMHK2-5","HK",1],
  [2243,"RyzenKVMJP-1","JP"],
  [2277,"RyzenKVMJP-2","JP"],
  [2279,"RyzenKVMJP-3","JP"],
  [2281,"RyzenKVMJP-4","JP"],
  [2283,"RyzenKVMJP-5","JP"],
  [2913,"RyzenKVMJP-1 (Softbank)","JP"],
  [2915,"RyzenKVMJP-2 (Softbank)","JP",1],
  [2917,"RyzenKVMJP-3 (Softbank)","JP",1],
  [2919,"RyzenKVMJP-4 (Softbank)","JP",1],
  [2923,"RyzenKVMJP-5 (Softbank)","JP",1]
 ],
 "seo-optimized-vps":[
  [523,"HyperSEO6","MULTI",1],
  [522,"HyperSEO5","MULTI",1],
  [351,"HyperSEO4","MULTI",1],
  [350,"HyperSEO3","MULTI",1],
  [349,"HyperSEO2","MULTI",1],
  [348,"HyperSEO1","MULTI",1]
 ],
 "ssd-kvm-vps":[
  [1561,"KVMCA-1","CA"],
  [1581,"KVMCA-2","CA"],
  [1583,"KVMCA-3","CA"],
  [1657,"KVMCA-4","CA"],
  [1659,"KVMCA-5","CA"],
  [1859,"KVMTX-1","US",1],
  [1861,"KVMTX-2","US",1],
  [1863,"KVMTX-3","US",1],
  [1865,"KVMTX-4","US",1],
  [1867,"KVMTX-5","US",1],
  [1661,"KVMLA-1","LAX",1],
  [1663,"KVMLA-2","LAX",1],
  [1665,"KVMLA-3","LAX",1],
  [1667,"KVMLA-4","LAX",1],
  [1669,"KVMLA-5","LAX",1],
  [2167,"KVMUT-1","US",1],
  [2169,"KVMUT-2","US",1],
  [2171,"KVMUT-3","US",1],
  [2173,"KVMUT-4","US",1],
  [2175,"KVMUT-5","US",1],
  [2693,"KVMAZ-1","US",1],
  [2695,"KVMAZ-2","US",1],
  [2697,"KVMAZ-3","US",1],
  [2699,"KVMAZ-4","US",1],
  [2701,"KVMAZ-5","US",1],
  [1467,"KVMSJC-1","SJC",1],
  [1469,"KVMSJC-2","SJC",1],
  [1471,"KVMSJC-3","SJC",1],
  [1473,"KVMSJC-4","SJC",1],
  [1475,"KVMSJC-5","SJC",1],
  [2109,"KVMJAX-1","US",1],
  [2111,"KVMJAX-2","US",1],
  [2113,"KVMJAX-3","US",1],
  [2115,"KVMJAX-4","US",1],
  [2117,"KVMJAX-5","US",1],
  [2245,"KVMMO-1","US",1],
  [2247,"KVMMO-2","US",1],
  [2249,"KVMMO-3","US",1],
  [2251,"KVMMO-4","US",1],
  [2253,"KVMMO-5","US",1],
  [1787,"KVMIL2-1","US",1],
  [1789,"KVMIL2-2","US",1],
  [1791,"KVMIL2-3","US",1],
  [1793,"KVMIL2-4","US",1],
  [1795,"KVMIL2-5","US",1],
  [1777,"KVMNL-1","NL",1],
  [1779,"KVMNL-2","NL",1],
  [1781,"KVMNL-3","NL",1],
  [1783,"KVMNL-4","NL",1],
  [1785,"KVMNL-5","NL",1],
  [1767,"KVMDE-1","DE",1],
  [1769,"KVMDE-2","DE",1],
  [1771,"KVMDE-3","DE",1],
  [1773,"KVMDE-4","DE",1],
  [1775,"KVMDE-5","DE",1],
  [1681,"KVMVA-1","US",1],
  [1685,"KVMVA-2","US",1],
  [1687,"KVMVA-3","US",1],
  [1689,"KVMVA-4","US",1],
  [1691,"KVMVA-5","US",1],
  [2393,"KVMNY-1","US",1],
  [2395,"KVMNY-2","US",1],
  [2397,"KVMNY-3","US",1],
  [2399,"KVMNY-4","US",1],
  [2401,"KVMNY-5","US",1],
  [2643,"KVMNYC-1","US",1],
  [2645,"KVMNYC-2","US",1],
  [2647,"KVMNYC-3","US",1],
  [2649,"KVMNYC-4","US",1],
  [2651,"KVMNYC-5","US",1],
  [1671,"KVMUK-1","GB",1],
  [1673,"KVMUK-2","GB",1],
  [1675,"KVMUK-3","GB",1],
  [1677,"KVMUK-4","GB",1],
  [1679,"KVMUK-5","GB",1],
  [1693,"KVMSG1-1","SG",1],
  [1695,"KVMSG1-2","SG",1],
  [1697,"KVMSG1-3","SG",1],
  [1699,"KVMSG1-4","SG",1],
  [1701,"KVMSG1-5","SG",1],
  [1703,"KVMSG2-1","SG",1],
  [1705,"KVMSG2-2","SG",1],
  [1707,"KVMSG2-3","SG",1],
  [1709,"KVMSG2-4","SG",1],
  [1711,"KVMSG2-5","SG",1],
  [1713,"KVMJP-1 (IIJ)","JP",1],
  [1715,"KVMJP-2 (IIJ)","JP",1],
  [1717,"KVMJP-3 (IIJ)","JP",1],
  [1719,"KVMJP-4 (IIJ)","JP",1],
  [1723,"KVMJP-5 (IIJ)","JP",1],
  [1725,"KVMJP-1 (Softbank)","JP",1],
  [1727,"KVMJP-2 (Softbank)","JP",1],
  [1729,"KVMJP-3 (Softbank)","JP",1],
  [1731,"KVMJP-4 (Softbank)","JP",1],
  [1733,"KVMJP-5 (Softbank)","JP",1],
  [2003,"KVMHK1-1","HK",1],
  [2005,"KVMHK1-2","HK",1],
  [2007,"KVMHK1-3","HK",1],
  [2009,"KVMHK1-4","HK",1],
  [2011,"KVMHK1-5","HK",1],
  [1747,"KVMHK2-1","HK",1],
  [1749,"KVMHK2-2","HK",1],
  [1751,"KVMHK2-3","HK",1],
  [1753,"KVMHK2-4","HK",1],
  [1755,"KVMHK2-5","HK",1]
 ],
 "storage-kvm-sale":[
  [1534,"JP10GbpsStorage-0.5TB (Softbank)","JP"],
  [1536,"JP10GbpsStorage-1 (Softbank)","JP"],
  [1538,"JP10GbpsStorage-2 (Softbank)","JP"],
  [1563,"JP10GbpsStorage-0.5TB (IIJ)","JP"],
  [1565,"JP10GbpsStorage-1 (IIJ)","JP"],
  [1567,"JP10GbpsStorage-2 (IIJ)","JP"],
  [1641,"SG10GbpsStorage0.5TB (DC1)","SG"],
  [1643,"SG10GbpsStorage-1 (DC1)","SG"],
  [1645,"SG10GbpsStorage-2 (DC1)","SG"],
  [2939,"SG10GbpsStorage0.5TB (DC2)","SG"],
  [2941,"SG10GbpsStorage-1 (DC2)","SG"],
  [2943,"SG10GbpsStorage-2 (DC2)","SG"],
  [2177,"UT10GbpStorage-0.5TB","US"],
  [2179,"UT10GbpStorage-1","US"],
  [2181,"UT10GbpStorage-2","US"],
  [2441,"NY10GbpsStorage-0.5TB","US"],
  [2443,"NY10GbpsStorage-1","US"],
  [2445,"NY10GbpsStorage-2","US"],
  [2037,"IL10GbpsStorage-0.5TB","US"],
  [2039,"IL10GbpsStorage-1","US"],
  [2041,"IL10GbpsStorage-2","US"]
 ],
 "windows-vps-sale":[
  [801,"WinPromo-1","MULTI"],
  [804,"WinPromo-2","MULTI"],
  [805,"WinPromo-3","MULTI"],
  [806,"WinPromo-4","MULTI"]
 ]
};
const greenLegacyKeys={"1321":"gc-sjc-vds2","2305":"gc-sg-prem-mini","2307":"gc-sg-prem-1"};
for(const [slug,rows] of Object.entries(greenCatalogGroups)){
 const url='https://greencloudvps.com/billing/store/'+slug+'?language=english';
 for(const [pid,sku,zone,quoteOnly] of rows){
  const key=greenLegacyKeys[pid]||'green-p'+pid;
  catalogStockTargets[key]={family:'greenwhmcs',pid,sku,zone,url,quoteOnly:Boolean(quoteOnly)};
 }
}
Object.assign(catalogStockTargets,{
  "lightcone-218": {"family":"lightcone","pid":218,"sku":"香港Light-AMD-A","zone":"HK","url":"https://www.lightcone.hk/cart?fid=1&gid=29&language=chinese_tw"},
  "lightcone-219": {"family":"lightcone","pid":219,"sku":"香港Light-AMD-B","zone":"HK","url":"https://www.lightcone.hk/cart?fid=1&gid=29&language=chinese_tw"},
  "lightcone-220": {"family":"lightcone","pid":220,"sku":"香港Light-AMD-C","zone":"HK","url":"https://www.lightcone.hk/cart?fid=1&gid=29&language=chinese_tw"},
  "lightcone-221": {"family":"lightcone","pid":221,"sku":"香港Light-AMD-D","zone":"HK","url":"https://www.lightcone.hk/cart?fid=1&gid=29&language=chinese_tw"},
  "lightcone-276": {"family":"lightcone","pid":276,"sku":"德国9929 2核 2GB 1G带宽 A型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-275": {"family":"lightcone","pid":275,"sku":"德国9929 2核 4GB 1G带宽 B型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-277": {"family":"lightcone","pid":277,"sku":"德国9929 4核 4GB 1G带宽 C型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-279": {"family":"lightcone","pid":279,"sku":"德国9929 4核 8GB 1G带宽 D型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-278": {"family":"lightcone","pid":278,"sku":"德国9929 8核 8GB 1G带宽 E型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-280": {"family":"lightcone","pid":280,"sku":"德国9929 8核 16GB 1G带宽 F型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-282": {"family":"lightcone","pid":282,"sku":"德国9929 16核 16GB 1G带宽 G型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-281": {"family":"lightcone","pid":281,"sku":"德国9929 16核 32GB 1G带宽 H型","zone":"DE","url":"https://www.lightcone.hk/cart?fid=14&language=chinese_tw"},
  "lightcone-316": {"family":"lightcone","pid":316,"sku":"英国双ISP住宅云主机 2核 2GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-317": {"family":"lightcone","pid":317,"sku":"英国双ISP住宅云主机 2核 4GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-315": {"family":"lightcone","pid":315,"sku":"英国双ISP住宅云主机 4核 4GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-318": {"family":"lightcone","pid":318,"sku":"英国双ISP住宅云主机 4核 8GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-319": {"family":"lightcone","pid":319,"sku":"英国双ISP住宅云主机 8核 8GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-320": {"family":"lightcone","pid":320,"sku":"英国双ISP住宅云主机 8核 16GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-321": {"family":"lightcone","pid":321,"sku":"英国双ISP住宅云主机 16核 16GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"},
  "lightcone-322": {"family":"lightcone","pid":322,"sku":"英国双ISP住宅云主机 16核 32GB 500Mbps","zone":"GB","url":"https://www.lightcone.hk/cart?fid=15&language=chinese_tw"}
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
function publicCpu(rawCount, ...modelInputs) {
 const clean=value=>shortText(value).replace(/&(?:trade|reg|#174|#8482);|[®™]/gi,'').replace(/&nbsp;|&#160;/gi,' ').replace(/[–−]/g,'-').replace(/\s+/g,' ').trim();
 const countText=clean(rawCount);
 const countFirst=countText.match(/^(\d+(?:\.\d+)?(?:\s*[–-]\s*\d+)?)\s*(vCPUs?|vCores?|(?:dedicated\s+)?(?:physical\s+)?cores?|核|C\b|x(?=\s*(?:AMD|Intel|ARM|Ampere)))/i);
 const countLast=countText.match(/^(\d+)\s+(dedicated\s+physical\s+)?(?:AMD\s+)?EPYC\s+(?:Rome|Milan|Genoa|Turin)(?:\/(?:Rome|Milan|Genoa|Turin))?\s+cores?\b/i);
 const number=countFirst?.[1]||countLast?.[1];
 let cpu=countText;
 if(number){
  const unit=countFirst?.[2]||countLast?.[2]||'cores';
  cpu=number.replace(/\s*-\s*/g,'–')+(/^vCPUs?$|^vCores?$|^x$/i.test(unit)?' vCPU':/dedicated/i.test(unit)?' dedicated cores':/physical/i.test(unit)?' physical cores':/^cores?$/i.test(unit)?' '+(number==='1'?'core':'cores'):' '+unit);
  const threads=countText.match(/^\d+\s*C\s*\/\s*(\d+)\s*T\b/i)?.[1];
  if(threads)cpu=number+' cores / '+threads+' threads';
 }
 const text=[countText,...modelInputs.map(clean)].filter(Boolean).join(' · ');
 const patterns=[
  [/\b(?:AMD\s*)?EPYC\s*([47-9][0-9A-Z]{3}[A-Z]?)\b/gi,'AMD EPYC'],
  [/\b(?:AMD\s*)?Ryzen\s+([3579]\s+)?(?:PRO\s+)?(\d{4}(?:X3D|XT|HX|HS|GE|[XGFUE])?)\b/gi,'AMD Ryzen'],
  [/\b(?:Intel(?:\(R\))?\s*)?(?:Xeon(?:\(R\))?\s*)?((?:E[357]-|D-)[0-9]{4}[A-Z]{0,2}(?:\s*v[2-6])?)\b/gi,'Intel Xeon'],
  [/\b(?:Intel\s*)?Xeon-D\s+(\d{4}[A-Z]{0,2})\b/gi,'Intel Xeon-D'],
  [/\b(?:Intel\s*)?Xeon\s+([ELX][356]\d{3})\b/gi,'Intel Xeon'],
  [/\b(?:Intel\s*)?(?:Xeon\s*)?(Bronze|Silver|Gold|Platinum)\s*(\d{4}[A-Z]{0,2})\b/gi,'Intel Xeon'],
  [/\b(?:Intel\s*)?Xeon\s+(W-\d{4}[A-Z]{0,2}|[356]\d{3}[A-Z]{0,2})\b/gi,'Intel Xeon'],
  [/\b(?:Intel\s*)?(?:Core\s*)?(i[3579]-\d{4,5}[A-Z]{0,2})\b/gi,'Intel Core'],
  [/\b(?:Intel\s*)?Core\s+(Ultra\s+[3579])\s+(\d{3}[A-Z]{0,2})\b/gi,'Intel Core'],
  [/\b(Ampere\s+Altra(?:\s+Max)?\s+(?:Q|M)\d{2,3}-\d{2})\b/gi,'']
 ];
 const exact=new Set();
 for(const [pattern,brand] of patterns){
  for(const match of text.matchAll(pattern)){
   const tail=text.slice(match.index+match[0].length);
   if(/^\s*(?:Series\b|系列|MHz\b|GHz\b)/i.test(tail)||brand==='AMD EPYC'&&/^(?:400[45]|700[123]|8004|900[45])$/i.test(match[1])||brand==='AMD Ryzen'&&!match[1]&&/^[3-9]000$/.test(match[2]))continue;
   const parts=match.slice(1).filter(Boolean).map(value=>value.trim().replace(/\s*v([2-6])$/i,' v$1'));
   if(brand==='AMD EPYC'||brand==='AMD Ryzen')parts[parts.length-1]=parts.at(-1).toUpperCase();
   if(brand==='Intel Xeon'){
    parts[0]=parts[0].replace(/^(bronze|silver|gold|platinum)/i,first=>first[0].toUpperCase()+first.slice(1).toLowerCase());
    const last=parts.length-1;
    parts[last]=parts[last].replace(/\d[a-z]{1,2}$/i,end=>end.toUpperCase());
   }
   const model=[brand,...parts].filter(Boolean).join(' ');
   exact.add(model);
   // These alternatives are only accepted when immediately following a fully identified processor.
   const alternatives=tail.match(/^\s*(?:\/|\bor\b|或)\s*([0-9][0-9A-Z]{3,5})\b/i)?.[1];
   if(alternatives&&(brand==='AMD EPYC'&&/^[47-9][0-9A-Z]{3}[A-Z]?$/i.test(alternatives)&&!/^(?:400[45]|700[123]|8004|900[45])$/i.test(alternatives)||brand==='AMD Ryzen'&&/^\d{4}(?:X3D|XT|HX|HS|GE|[XGFUE])?$/i.test(alternatives))){
    exact.add([brand,...parts.slice(0,-1),alternatives.toUpperCase()].join(' '));
   }
  }
 }
 const candidates=[...exact].slice(0,8);
 const qualified=/(?:or\s+(?:better|newer|equivalent)|up\s+to|such\s+as|\be\.g\.\s|and\s+above|例如|或同级|或同級|以上|或更高|随机|隨機|可能|混用)/i.test(text);
 if(candidates.length)return {cpu:number?cpu:'',...(candidates.length>1||qualified?{cpuModels:candidates}:{cpuModel:candidates[0]}),cpuModelScope:'official'};
 const resolution=[
  [/(?:\bAMD\s*)?\bEPYC(?:\s+(?:(?:Rome|Milan|Genoa|Turin)(?:\s*\/\s*(?:Rome|Milan|Genoa|Turin))*|400[45]|700[123]|8004|900[45]))?\b/gi,value=>'AMD '+value.replace(/^AMD\s*/i,'').replace(/epyc/i,'EPYC').replace(/rome|milan|genoa|turin/gi,part=>part[0].toUpperCase()+part.slice(1).toLowerCase())],
  [/(?:\bAMD\s*)?\bRyzen(?:\s+[3579])?(?:\s+AM[45](?:\/AM[45])?)?\b/gi,value=>'AMD '+value.replace(/^AMD\s*/i,'').replace(/ryzen/i,'Ryzen')],
  [/(?:\bIntel\s*)?(?:\bXeon\s*)?(?:E5\s*v[2-4](?:\/v[2-4])?|(?:Platinum|Gold|Silver|Bronze)\s+Gen\s*\d+)\b/gi,value=>'Intel Xeon '+value.replace(/^(?:Intel\s*)?(?:Xeon\s*)?/i,'')],
  [/(?:\bIntel\s*)?\bXeon(?:\s+(?:Platinum|Gold|Silver|Bronze))?\b/gi,value=>'Intel '+value.replace(/^Intel\s*/i,'').replace(/xeon/i,'Xeon')],
  [/\bAmpere\s+Altra(?:\s+Max)?\b/gi,value=>value],
  [/\bApple\s+M[1-5](?:\s+(?:Pro|Max|Ultra))?\b/gi,value=>value]
 ];
 const families=[];
 for(const [pattern,label] of resolution){
  for(const match of text.matchAll(pattern)){
   const value=label(match[0]);
   if(!families.some(existing=>existing.toLowerCase().includes(value.toLowerCase())))families.push(value);
  }
 }
 if(families.length)return {cpu:number?cpu:'',cpuFamily:families.slice(0,4).join(' / '),cpuModelScope:'official'};
 return {cpu};
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
  ...publicCpu(rangeText(node.limits?.cpu,'vCPU'),node.cpu_model,node.processor_model),ram:rangeText(node.limits?.memory_gb,'GB'),disk:rangeText(node.limits?.disk_gb,'GB'),
  port:rangeText(node.limits?.bandwidth_mbps,'Mbps'),traffic:[...new Set(allowance)].join(' / '),
  direction:node.traffic_direction==='both'?'both':'',route:network.join(' / '),ip:'',access:''};
}
function mkOffer(product){
 const cycles={monthly:'month',quarterly:'quarter',semiannually:'halfyear',annually:'year'};
 const rates=Object.entries(cycles).map(([field,period])=>({amount:amountFor(product.price?.[field]),period})).filter(rate=>rate.amount!==null);
 if(!rates.length)return null;
 const {amount,period}=rates[0];
 const description=String(product.description||'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]{0,500}>/g,' ');
 const first=(re)=>shortText(description.match(re)?.[1]);
 const cpuLine=first(/(?:^|\n|\|)\s*(CPU[^\r\n|]*)/i);
 const cpu=first(/CPU[ \t]*([\d.]+)[ \t]*核/i),ram=first(/内存[ \t]*([\d.]+[ \t]*GB)/i),disk=first(/硬盘[ \t]*([\d.]+[ \t]*[TG]B)/i);
 const speed=description.match(/带宽[ \t]*([\d.]+)[ \t]*([GM])(?:bps)?[ \t]*(峰值|独享)?/i);
 const port=speed?Number(speed[1])*(speed[2].toUpperCase()==='G'?1000:1)+' Mbps':'';
 const ingress=first(/入口[ \t]+([^\r\n|]+)/),egress=first(/出口[ \t]+([^\r\n|]+)/);
 return {amount,currency:'CNY',period,basis:'listed',billingRates:rates.map(rate=>({...rate,currency:'CNY'})),...publicCpu(cpu?cpu+(description.includes('独立服务器')?' cores':' vCPU'):'',cpuLine,product.cpu_model,product.processor_model),ram,disk,port,
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
  const parts=shortText(line).match(/^(CPU Cores|CPU Model|Processor Model|Processor|Amount Of RAM|Disk Space|IPV4|IPV6|Bandwidth|Network Rate)[：:]\s*(.+)$/i);
  if(parts)fields[parts[1].toLowerCase()]=parts[2];
 }
 const qty=(value,rawUnit,unit)=>new RegExp('^(\\d+)'+rawUnit+'$','i').test(value)?parseInt(value,10)+' '+unit:'';
 const rate=fields['network rate']?.match(/^(\d+)Mbps[（(](Shared)[）)]$/i);
 const transfer=fields.bandwidth?.match(/^(\d+)G[（(]in\+out[）)]$/i);
 return {amount,currency:'CNY',period:'month',basis:'base-config',
  ...publicCpu(qty(fields['cpu cores'],'','vCPU')||fields['cpu cores'],fields['cpu model'],fields['processor model'],fields.processor),ram:qty(fields['amount of ram'],'M','MB'),disk:qty(fields['disk space'],'G','GB'),
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
  ...publicCpu(isBack?line(/^vCPU\s+/i).replace(/^vCPU\s+(\d+)/i,'$1 vCPU'):line(/^\d+\s*vCore/i),without(/^(?:CPU Model|Processor)\s*[:：]\s*/i)),ram:isBack?without(/^vRAM\s+/i):line(/DDR5 RAM$/i),
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
    ...publicCpu(quantity(p.vcpu_count,'vCPU'),p.cpu_model,p.processor_model),ram:quantity(p.ram,'MB'),disk:quantity(p.disk,'GB')+(typeof p.disk_type==='string'?' '+shortText(p.disk_type):''),traffic:quantity(p.bandwidth,'GB'),
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
  ...publicCpu(get(/^\d+\s*x\s*(?:AMD|Intel)/i),get(/^(?:CPU Model|Processor)\s*[:：]/i)),ram:get(/^\d+\s+GB\s+DDR/i),disk:get(/^\d+\s+GB\s+NVMe/i),port:get(/^(?:共享|Shared)\s+\d+\s+Mbps/i).replace(/^(?:共享|Shared)\s+/i,''),
  portType:'shared',traffic:get(/^\d+\s+GB\s+(?:流量|Traffic)/i).replace(/\s+(?:流量|Traffic)$/i,''),route:get(/^WTT\s/i),ip:get(/^\d+\s+.+IPv4$/i),access:''}};
}

// Exact advertised offers on ComputeGuy and EDIS Global facility storefronts.
function indexJsonldOffers(html) {
  const records = new Map();
  const monthlyCards = new Map();
  for (const match of html.matchAll(/<bdi>\$([\d.,]+)\s+USD<\/bdi>\s*<span class="plan__period">\/mo<\/span><\/p>\s*<span class="plan__code" title="([^"]+)"/g)) {
    monthlyCards.set(match[2], Number(match[1].replaceAll(',', '')));
  }
  for (const script of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed;
    try { parsed = JSON.parse(script[1]); } catch { continue; }
    for (const product of parsed?.['@graph'] || (Array.isArray(parsed) ? parsed : [parsed])) {
      if (product?.['@type'] !== 'Product' || !product.offers) continue;
      const properties = Object.fromEntries((product.additionalProperty || []).map(field=>[field.name,field.value]));
      for (const offer of (Array.isArray(product.offers) ? product.offers : [product.offers])) {
        if (offer?.['@type'] !== 'Offer' || !offer.url) continue;
        let sku = '', period = '', cpu = '', cpuModel = '', ram = '', disk = '', port = '', traffic = '';
        const spec = offer.priceSpecification;
        if (product.brand?.name === 'ComputeGuy' && /^https:\/\/my\.computeguy\.com\/order\//.test(offer.url)) {
          sku = offer.sku || '';
          if (monthlyCards.has(offer.name) && monthlyCards.get(offer.name) === Number(offer.price)) period = 'month';
          const hardware = (offer.description || '').match(/^(\d+(?:\.\d+)?\s+vCPU),\s*([\d.]+\s+[GM]B) RAM,\s*([\d.]+\s+[GT]B (?:SSD|NVMe)),\s*([\d.]+\s+[GT]B\/month) at ([\d.]+\s+[GM]bps)\b/i);
          if (hardware) [,cpu,ram,disk,traffic,port]=hardware;
        } else if (product.brand?.['@id'] === 'https://www.edisglobal.com/#organization' && /^https:\/\/manage\.edisglobal\.com\/cart\.php\?/.test(offer.url)) {
          sku = String(product['@id'] || '').split('#plan-')[1] || '';
          if (spec?.referenceQuantity?.unitCode === 'MON' && Number(spec.referenceQuantity.value)===1 &&
              Number(spec.price)===Number(offer.price) && spec.priceCurrency===offer.priceCurrency) period = 'month';
          cpu=properties.CPU||''; cpuModel=properties['CPU Model']||properties['Processor Model']||properties.Processor||''; ram=properties.RAM||''; disk=properties.NVMe?properties.NVMe+' NVMe':(properties.SSD?properties.SSD+' SSD':'');
          traffic=properties.Traffic||''; port=properties.Uplink||'';
        }
        if (!sku) continue;
        let state='unreported';
        if (offer.availability==='https://schema.org/InStock') state='in-stock';
        if (['https://schema.org/OutOfStock','https://schema.org/SoldOut'].includes(offer.availability)) state='sold-out';
        const amount=amountFor(offer.price);
        const currency=offer.priceCurrency;
        const quote = amount!==null && period && ['EUR','USD'].includes(currency) ? {amount,currency,period,basis:'listed',...publicCpu(cpu,cpuModel),ram,disk,traffic,port,ip:''} : null;
        const value={sku,state,quote,orderUrl:offer.url,productId:product['@id'],productName:product.name,offerName:offer.name};
        records.set(offer.url,records.has(offer.url)?null:value);
      }
    }
  }
  return records;
}

function jsonldObservation(target, records, checkedAt) {
  const row = records.get(target.orderUrl);
  if (!row || row.sku!==target.sku || row.productId!==target.productId) return {state:'unreported',offer:null};
  return {state:row.state,offer:row.quote?{...row.quote,checkedAt}:null};
}
function indexGreenCards(html){
 const byPid=new Map();
 const cards=html.matchAll(/<div\b[^>]*class=["']product clearfix["'][^>]*id=["']product(\d+)["'][^>]*>([\s\S]*?)<\/footer>/gi);
 for(const [,id,body] of cards){
  const pid=Number(id);
  byPid.set(pid,byPid.has(pid)?null:body);
 }
 return byPid;
}
function greenObservation(t,catalog,at){
 const card=catalog.get(t.pid);
 const field=(name,tag)=>card?.match(new RegExp('<'+tag+'\\b[^>]*id=["\']product'+t.pid+'-'+name+'["\'][^>]*>([\\s\\S]*?)<\\/'+tag+'>','i'))?.[1];
 if(!card||shortText(field('name','span'))!==t.sku||!card.includes('id="product'+t.pid+'-order-button"'))return {state:'unreported',offer:null};
 const header=card.match(/<header\b[^>]*>([\s\S]*?)<\/header>/i)?.[1]||'';
 const qty=shortText(header.match(/<span\b[^>]*class=["']qty["'][^>]*>([\s\S]*?)<\/span>/i)?.[1]).match(/^(\d+)\s+Available$/i);
 const count=qty?Number(qty[1]):null,state=inventoryCount(count);
 const value=shortText(field('price','div')).match(/^(Starting from\s+)?\$\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s+USD\s+(Monthly|Quarterly|Semi-Annually|Annually)$/i);
 if(!value)return {state,offer:null};
 const amount=amountFor(value[2].replaceAll(',',''));
 if(amount===null)return {state,offer:null};
 const specs={};
 for(const [,featureId,measure,heading] of card.matchAll(/<li\b[^>]*id=["']product(\d+)-feature\d+["'][^>]*>\s*<span class=["']feature-value["']>([\s\S]*?)<\/span>([\s\S]*?)<\/li>/gi)){
  if(Number(featureId)===t.pid)specs[shortText(heading).toLowerCase()]=shortText(measure);
 }
 if(!specs.cpu){
  const lines=(field('description','p')||'').split(/<br\s*\/?>/i).map(shortText);
  specs.cpu=lines.find(x=>/^\d+\b.{0,130}\bcores?\b/i.test(x));
  specs.processor=lines.find(x=>/^(?:CPU Model|Processor)\s*[:：]/i.test(x));
  specs.ram=lines.find(x=>/^\d+\s*GB RAM$/i.test(x))?.replace(/ RAM$/i,'');
  specs['hard drive']=lines.find(x=>/^\d+\s*GB (?:SSD|NVMe)$/i.test(x));
  specs.bandwidth=lines.find(x=>/^Unmetered Bandwidth @ [\d.]+\s*[GM]bps port$/i.test(x));
 }
 const period={monthly:'month',quarterly:'quarter','semi-annually':'halfyear',annually:'year'}[value[3].toLowerCase()];
 return {state,offer:{amount,currency:'USD',period,basis:value[1]?'starting':'listed',checkedAt:at,
  ...publicCpu(specs.cpu,specs['cpu model'],specs['processor model'],specs.processor),ram:specs.ram||'',disk:specs['hard drive']||specs['hard drives']||specs.ssd||'',
  port:specs.port||specs.bandwidth?.match(/@\s*([\d.]+\s*[GM]bps)\s+port/i)?.[1]||'',traffic:specs.bandwidth||'',
  ip:[specs.ip,specs.ipv4&&specs.ipv4+' IPv4',specs.ipv6&&specs.ipv6+' IPv6'].filter(Boolean).join(' · '),
  ...(Number.isSafeInteger(count)?{stockQuantity:count}:{})}};
}

async function fetchProviderCatalog(t,key,now) {
 const jsonFormat=['bwh','akile','isvoro','joysol'].includes(t.family);
 const reply=await fetch(t.url,{redirect:'manual',signal:AbortSignal.timeout(11000),
  headers:{Accept:jsonFormat?'application/json':'text/html','Accept-Language':'en'},
  cf:{cacheEverything:true,cacheTtl:25}});
 const age=Number(reply.headers.get('age')||0),type=reply.headers.get('content-type')||'';
 if(!reply.ok||!Number.isFinite(age)||age>300||!(jsonFormat?/application\/json/i:/text\/html/i).test(type))throw Error('Unavailable provider catalog');
 const body=new TextDecoder().decode(await readLimitedBytes(reply.body,jsonFormat?1500000:['greenwhmcs','jsonldoffer'].includes(t.family)?2000000:450000));
 const entry={expires:now+25000,at:new Date(now-age*1000).toISOString(),data:jsonFormat?JSON.parse(body):t.family==='greenwhmcs'?indexGreenCards(body):t.family==='jsonldoffer'?indexJsonldOffers(body):body};
 recentStorefronts.set(key,entry);return entry;
}
async function loadProviderCatalog(t,requests){
 const key=t.family+':'+t.url,now=Date.now(),cached=recentStorefronts.get(key);
 if(cached?.expires>now)return cached;
 if(!requests)return fetchProviderCatalog(t,key,now);
 if(!requests.has(key))requests.set(key,fetchProviderCatalog(t,key,now));
 return requests.get(key);
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
 return {state,offer:{amount,currency:'USD',period:'month',basis:'listed',checkedAt:at,...publicCpu(lines.find(s=>/^\d+\s*vCPU\b/i.test(s)),lines.find(s=>/^(?:CPU Model|Processor)\s*[:：]/i.test(s))),
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
 return {state,offer:{amount,currency:'CNY',period:'month',basis:'listed',checkedAt:at,...publicCpu(cpu),ram,disk,ip,
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
 return {state,offer:{amount,currency:'EUR',period,basis:'listed',checkedAt:at,...publicCpu(lines.find(s=>/^\d+\s*vCore/i.test(s)),lines.find(s=>/^(?:CPU Model|Processor)\s*[:：]/i.test(s))),ram:lines.find(s=>/\bRAM\b/i.test(s))||'',
  disk:lines.find(s=>/\bNVMe\b/i.test(s))||'',port:lines.find(s=>/(?:Gbit|Gbps|Mbps)/i.test(s))||'',traffic:lines.find(s=>/\bTB\b/i.test(s))||''}};
}
function bwhObservation(t,catalog,at){
 const rows=Array.isArray(catalog?.offers)?catalog.offers.filter(o=>o.product_id===t.pid&&o.location?.datacenter_id===t.dc&&o.price?.billing_period===t.cycle):[];
 if(rows.length!==1||rows[0].name!==t.sku)return {state:'unreported',offer:null};
 const row=rows[0],spec=row.specifications||{},state=row.available===true?'in-stock':row.available===false?'sold-out':'unreported',cents=row.price.amount_cents;
 const period={monthly:'month',quarterly:'quarter',semiannually:'halfyear',annually:'year'}[t.cycle];
 if(!period||row.price.currency!=='USD'||!Number.isSafeInteger(cents)||cents<0)return {state,offer:null};
 const measure=(k,unit)=>Number.isFinite(spec[k])&&spec[k]>0?spec[k]+' '+unit:'';
 return {state,offer:{amount:(cents/100).toFixed(2),currency:'USD',period,basis:'listed',checkedAt:at,...publicCpu(measure('vcpu_count','vCPU'),spec.cpu_model,spec.processor_model),ram:measure('ram_mb','MB'),disk:measure('storage_gb','GB'),port:measure('port_speed_mbps','Mbps'),traffic:measure('transfer_gb_per_month','GB')}};
}
function akileObservation(t,catalog,at){
 if(catalog.status_code!==0||!Array.isArray(catalog.data?.areas))return {state:'unreported',offer:null};
 const areas=catalog.data.areas.filter(a=>a.id===t.area),nodes=areas.length===1?areas[0].nodes?.filter(n=>n.id===t.node):[];
 const matching=nodes?.length===1?nodes[0].plans?.filter(p=>p.id===t.pid&&p.plan_name===t.sku):[];
 if(matching?.length!==1)return {state:'unreported',offer:null};
 const p=matching[0],state=p.is_pre_sale===false?inventoryCount(p.stock):'unreported',prices=p.price_datas?.filter(c=>c.id===t.priceId&&c.cycle===t.cycle);
 if(prices?.length!==1||!Number.isSafeInteger(prices[0].price)||prices[0].price<0)return {state,offer:null};
 const measure=(n,u)=>Number.isFinite(n)&&n>0?n+' '+u:'';
 return {state,offer:{amount:(prices[0].price/100).toFixed(2),currency:'CNY',period:t.cycle===12?'year':'month',basis:'listed',checkedAt:at,...publicCpu(measure(p.cpu,'vCPU'),p.cpu_model,p.processor_model),ram:measure(p.memory,'MB'),disk:measure(p.disk,'GB'),port:measure(p.bandwidth,'Mbps'),traffic:measure(p.flow,'GB')}};
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
 return {state,offer:{amount,currency:'CNY',period:'month',basis:'listed',checkedAt:at,...publicCpu(measure('cores','vCPU'),settings.cpu_model,settings.processor_model),ram:measure('memory','MB'),disk:measure('disk','GB'),port:p.extension==='Proxmox' && Number(settings.ratelimit)>0?Number(settings.ratelimit)*8+' Mbps':'',traffic:p.extension==='Proxmox'?measure('bandwidth_limit','GB'):''}};
}
function akkoObservation(t,html,at){
 const empty={state:'unreported',offer:null},cards=[...html.matchAll(/<div\b[^>]*class="product clearfix"[^>]*id="product(\d+)"[^>]*>([\s\S]*?)<\/footer>/gi)];
 const match=cards.filter(c=>c[2].includes('href="cart.php?a=add&pid='+t.pid+'"')&&shortText(c[2].match(/id="product\d+-name">([\s\S]*?)<\/span>/i)?.[1])===t.sku);
 if(match.length!==1)return empty;
 const card=match[0][2],prices=card.match(/class="product-pricing"[^>]*>([\s\S]*?)<\/div>/i)?.[1]||'';
 const amount=amountFor(shortText(prices.match(/class="price">([\s\S]*?)<\/span>/i)?.[1]).match(/^[￥¥]\s*(\d+(?:\.\d+)?)\s*CNY$/)?.[1]),label=shortText(prices),period=label.endsWith('每年')?'year':label.endsWith('每月')?'month':null;
 if(amount===null||!period)return empty;
 const desc=shortText(card.match(/id="product\d+-description">([\s\S]*?)<\/p>/i)?.[1]),field=(re,suffix='')=>{const x=desc.match(re)?.[1];return x?x+suffix:''};
 return {state:'unreported',offer:{amount,currency:'CNY',period,basis:'listed',checkedAt:at,...publicCpu(field(/vCPU[：:]\s*(\d+)/i,' vCPU'),field(/(?:CPU (?:Model|型号)|处理器型号|处理器|Processor)[：:]\s*([^|]{1,140})/i)),ram:field(/内存[：:]\s*(\d+\s*MB)/),disk:field(/空间[：:]\s*(\d+\s*GB(?: SSD)?)/),port:field(/(\d+)\s*Mbps/i,' Mbps'),traffic:field(/流量[：:]\s*双向\s*(\d+\s*GB)/),direction:desc.includes('双向')?'both':''}};
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
  ...publicCpu(field(/^CPU[：:]\s*(.+)$/i),field(/^(?:CPU Model|处理器型号|处理器|Processor)[：:]\s*(.+)$/i)),ram:ram?ram+' MB':'',disk:disk?disk+' GB'+(storageType?' '+storageType:''):'',
  port:speed?speed+' Mbps':'',traffic:transfer?transfer+' GB':'',direction:lines.some(x=>/^流量[：:].+双向/.test(x))?'both':'',portType:lines.some(x=>/^带宽[：:].+共享/.test(x))?'shared':'',ip,...(Number.isSafeInteger(quantity)&&quantity>=0?{stockQuantity:quantity}:{})}};
}
function servitroObservation(t,html,at){
 const unavailable={state:'unreported',offer:null};
 const title=shortText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
 const processor=title.match(/^Virtual servers\s+-\s+(.+?)\s+-\s+Frankfurt$/i)?.[1];
 const orderPath=new URL(t.url).pathname+'/'+t.slug;
 const orderPaths=[orderPath,...(t.previousGroup?['/store/'+t.previousGroup+'/'+t.slug]:[])];
 const cards=[...html.matchAll(/<div\b[^>]*class=["']product clearfix["'][^>]*>([\s\S]*?)<\/footer>/gi)];
 const matches=cards.filter(([,card])=>[...card.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].some(a=>orderPaths.includes(a[1])));
 if(matches.length!==1)return unavailable;
 const card=matches[0][1];
 const read=(pattern)=>shortText(card.match(pattern)?.[1]);
 const name=read(/<span\b[^>]*\bid=["'][^"']*-name["'][^>]*>([\s\S]*?)<\/span>/i);
 if(name!==t.sku)return unavailable;
 const stock=read(/<span\b[^>]*class=["']qty["'][^>]*>([\s\S]*?)<\/span>/i).match(/^(\d+)\s+Available$/i);
 const quantity=stock?Number(stock[1]):null,state=inventoryCount(quantity);
 const price=read(/<div\b[^>]*class=["']product-pricing["'][^>]*>([\s\S]*?)<\/div>/i);
 const pricing=price.match(/^\$(\d+(?:\.\d{2})?)\s+USD\s+(Monthly|Quarterly|Semi-Annually|Annually)$/i);
 if(!pricing)return {state,offer:null};
 const amount=amountFor(pricing[1]);
 const period={monthly:'month',quarterly:'quarter','semi-annually':'halfyear',annually:'year'}[pricing[2].toLowerCase()];
 const description=card.match(/<p\b[^>]*\bid=["'][^"']*-description["'][^>]*>([\s\S]*?)<\/p>/i)?.[1]||'';
 const lines=description.split(/<br\s*\/?>/i).map(shortText);
 const field=(pattern)=>lines.find(line=>pattern.test(line))||'';
 return {state,offer:{amount,currency:'USD',period,basis:'listed',checkedAt:at,
  ...publicCpu(field(/^\d+\s+vCores?\b/i),processor,field(/^(?:CPU Model|Processor)\s*[:：]/i)),
  ram:field(/^\d+(?:\.\d+)?\s+GB\s+.+RAM$/i).replace(/\s+RAM$/i,''),
  disk:field(/^\d+(?:\.\d+)?\s+GB\s+(?:SSD|NVMe)$/i),
  port:field(/^\d+(?:\.\d+)?\s*(?:Gbps|Mbps)\s+Port$/i).replace(/\s+Port$/i,''),
  traffic:field(/^\d+(?:\.\d+)?\s+TB\s+Traffic\*?$/i).replace(/\s+Traffic\*?$/i,''),
  ip:lines.filter(line=>/^1x\s+IPv[46]\b/i.test(line)).join(' / '),
  ...(Number.isSafeInteger(quantity)?{stockQuantity:quantity}:{})}};
}

function joysolObservation(target,payload,checkedAt){
 const empty={state:'unreported',offer:null};
 const parent=target.zone==='HK'?2:target.zone==='LAX'?1:null;
 if(payload?.status!==200||!parent||!Array.isArray(payload.data?.fgs))return empty;
 const areas=payload.data.fgs.filter(area=>area.id===parent);
 const groups=areas.length===1&&Array.isArray(areas[0].group)?areas[0].group.filter(group=>group.id===target.group):[];
 const group=groups.length===1?groups[0]:null;
 const products=Array.isArray(group?.products)?group.products.filter(product=>product.id===target.pid&&product.gid===target.group):[];
 const product=products.length===1?products[0]:null;
 if(product?.name!==target.sku)return empty;
 const quantity=product.stock_control===1&&Number.isSafeInteger(product.qty)&&product.qty>=0?product.qty:null;
 const state=inventoryCount(quantity);
 const amount=amountFor(product.product_price);
 if(amount===null||product.billingcycle!=='monthly')return {state,offer:null};
 const fields=Object.fromEntries([...String(product.description||'').slice(0,16000).matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
  .map(([,value])=>shortText(value).split(/[：:]\s*/,2)));
 const cores=fields.CPU?.match(/^(\d+)\s*核心/)?.[1];
 const processors=(String(group.headline||'').match(/8269CY|8255C|6133|8275CL|E5-2682V4/gi)||[]).map(name=>
  name==='E5-2682V4'?'Intel Xeon E5-2682 v4':'Intel Xeon '+(name==='6133'?'Gold ':'Platinum ')+name);
 const transfer=fields['流量']?.replace(/\s+with\s+.*$/i,'').replace(/\s*@?\s*\d+(?:\.\d+)?\s*(?:Mbps|Gbps).*/i,'').trim()||'';
 const port=(fields['流量']||fields['带宽']||'').match(/\d+(?:\.\d+)?\s*(?:Mbps|Gbps)/i)?.[0]||'';
 return {state,offer:{amount,currency:'CNY',period:'month',basis:'listed',checkedAt,
  ...publicCpu(cores?cores+' vCPU':'',processors.join(' / ')),ram:fields['内存']||'',disk:fields['系统盘']||'',port,traffic:transfer,
  ...(quantity!==null?{stockQuantity:quantity}:{})}};
}

function atmosObservation(target,html,checkedAt){
 const empty={state:'unreported',offer:null};
 const card=html.match(new RegExp('<(?:div|article)\\b[^>]*\\bid="product'+target.pid+'"[^>]*>([\\s\\S]*?)</footer>','i'))?.[1];
 if(!card||shortText(card.match(/class="lz-product-name"[^>]*>([\s\S]*?)<\/span>/i)?.[1])!==target.sku)return empty;
 const stock=shortText(card.match(/class="qty[^"]*"[^>]*>([\s\S]*?)<\/span>/i)?.[1]);
 const number=/^(?:Only\s+)?(\d+)\s+(?:left|Available)$/i.exec(stock);
 const quantity=/^Out of stock$/i.test(stock)?0:number?Number(number[1]):null;
 const state=quantity!==null&&quantity>0&&quantity<=2?'low':inventoryCount(quantity);
 const pricing=card.match(/<div class="product-pricing"[^>]*>([\s\S]*?)<\/div>/i)?.[1]||'';
 const priceText=shortText(pricing.match(/class="lz-price-old"[^>]*>([\s\S]*?)<\/span>/i)?.[1]||pricing.match(/class="price(?: [^"]*)?"[^>]*>([\s\S]*?)<\/span>/i)?.[1]);
 const amount=amountFor(priceText.match(/^(\d+,\d{2})\s*€$/)?.[1].replace(',','.'));
 const frequency=shortText(pricing.match(/class="lz-cycle"[^>]*>([\s\S]*?)<\/span>/i)?.[1]);
 if(amount===null||!/\/ month$/i.test(frequency))return {state,offer:null};
 const specifications=Object.fromEntries([...card.matchAll(/<small>([^<>]+)<\/small>\s*<strong class="feature-value">([\s\S]*?)<\/strong>/gi)].map(([,key,value])=>[shortText(key),shortText(value)]));
 const count=specifications.Processor?.match(/^(\d+)\s*vCores?\b/i)?.[1];
 const model=specifications.Processor?.replace('™','').match(/AMD Ryzen\s+9\s+9950X/i)?.[0];
 const bandwidth=specifications.Bandwidth?.match(/^(\d+(?:\.\d+)?)\s*Gbit\/s/i)?.[1];
 return {state,offer:{amount,currency:'EUR',period:'month',basis:'listed',checkedAt,
  ...publicCpu(count?count+' vCPU':'',model),ram:specifications.Memory||'',disk:specifications.Storage||'',
  port:bandwidth?bandwidth+' Gbps':'',traffic:/unlimited traffic/i.test(specifications.Bandwidth||'')?'Unlimited':'',
  ...(quantity!==null?{stockQuantity:quantity}:{})}};
}

function lightConeObservation(target,html,checkedAt){
 const cards=[...html.matchAll(/<h4\b[^>]*>([^<>]+)<\/h4>([\s\S]*?)(?=<h4\b|$)/gi)];
 const matches=cards.filter(([,sku])=>forumDecode(sku).trim()===target.sku);
 if(matches.length!==1)return {state:'unreported',offer:null};
 const fullCard=matches[0][2],card=fullCard.split('class="mt-4 card-footer')[0];
 const pid=fullCard.match(/\/cart\?action=configureproduct(?:&amp;|&)pid=(\d+)/)?.[1];
 if(pid&&Number(pid)!==target.pid)return {state:'unreported',offer:null};
 const stock=card.match(/<p[^>]*>\s*(?:庫存|库存)\s*[：:]\s*(\d{1,8})\s*<\/p>/)?.[1];
 const quantity=stock===undefined?null:Number(stock);
 const amount=amountFor(card.match(/[¥￥]\s*<a class="cart-num[^"]*"[^>]*>\s*([\d.]+)\s*<\/a>\s*元\s*\/\s*(?:月|MONTHLY)/i)?.[1]);
 return {state:inventoryCount(quantity),offer:amount===null?null:{
  amount,currency:'CNY',period:'month',basis:'listed',checkedAt,...(quantity===null?{}:{stockQuantity:quantity})
 }};
}

async function catalogObservation(t,requests){
 const table={bagevm:bageObservation,matrix:matrixObservation,prepaid:prepaidObservation,bwh:bwhObservation,akile:akileObservation,isvoro:isvoroObservation,akko:akkoObservation,mhy:mhyObservation,greenwhmcs:greenObservation,jsonldoffer:jsonldObservation,servitro:servitroObservation,joysol:joysolObservation,atmos:atmosObservation,lightcone:lightConeObservation};
 const entry=await loadProviderCatalog(t,requests);
 return table[t.family](t,entry.data,entry.at);
}

async function observeListing(target,requests){
 if(['bagevm','matrix','prepaid','bwh','akile','isvoro','akko','mhy','greenwhmcs','jsonldoffer','servitro','joysol','atmos','lightcone'].includes(target.family))return catalogObservation(target,requests);
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
 const family=target.family;
 if(requests&&!requests.has(family))requests.set(family,currentStorefront(family));
 const data=await (requests?requests.get(family):currentStorefront(family)),state=classifyStorefront(target,data);
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
 if(["vmsilo","backwaves","wasabi","vultr","tamago","bagevm","matrix","prepaid","bwh","akile","isvoro","akko","mhy","greenwhmcs","jsonldoffer","servitro","joysol","atmos","lightcone"].includes(t.family))return (await observeListing(t)).state;
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
const greenCloudPricePids = new Set([186,187,188,189,267,268,269,270,276,277,278,279,334,335,337,338,339,340,341,342,343,344,348,349,350,351,522,523,756,757,758,759,801,804,805,806,1021,1023,1147,1155,1157,1159,1161,1165,1167,1169,1171,1173,1177,1179,1181,1183,1185,1187,1189,1191,1195,1197,1199,1201,1203,1221,1223,1225,1227,1231,1233,1235,1237,1243,1245,1247,1251,1253,1255,1257,1259,1303,1305,1311,1313,1315,1319,1321,1323,1325,1327,1331,1333,1337,1339,1341,1343,1345,1347,1349,1351,1353,1355,1379,1381,1383,1385,1387,1389,1391,1393,1397,1399,1401,1403,1405,1407,1411,1413,1415,1417,1419,1429,1467,1469,1471,1473,1475,1483,1497,1499,1501,1503,1505,1507,1513,1515,1517,1519,1521,1523,1525,1534,1536,1538,1541,1543,1545,1547,1549,1551,1553,1555,1557,1559,1561,1563,1565,1567,1581,1583,1587,1589,1591,1593,1595,1597,1599,1601,1603,1605,1641,1643,1645,1647,1649,1651,1653,1655,1657,1659,1661,1663,1665,1667,1669,1671,1673,1675,1677,1679,1681,1685,1687,1689,1691,1693,1695,1697,1699,1701,1703,1705,1707,1709,1711,1713,1715,1717,1719,1723,1725,1727,1729,1731,1733,1747,1749,1751,1753,1755,1767,1769,1771,1773,1775,1777,1779,1781,1783,1785,1787,1789,1791,1793,1795,1799,1801,1803,1805,1807,1809,1811,1813,1815,1817,1859,1861,1863,1865,1867,1873,1875,1877,1879,1881,1953,1955,1957,1959,1963,1965,1967,1969,1975,1977,1983,1985,1987,1989,1991,1993,1995,1997,1999,2001,2003,2005,2007,2009,2011,2017,2019,2037,2039,2041,2077,2079,2081,2083,2105,2107,2109,2111,2113,2115,2117,2123,2125,2139,2141,2143,2145,2147,2149,2151,2153,2155,2157,2159,2163,2165,2167,2169,2171,2173,2175,2177,2179,2181,2213,2223,2225,2227,2229,2231,2243,2245,2247,2249,2251,2253,2257,2259,2277,2279,2281,2283,2305,2307,2309,2311,2313,2365,2367,2369,2371,2373,2393,2395,2397,2399,2401,2405,2407,2431,2433,2441,2443,2445,2455,2457,2461,2499,2503,2505,2557,2559,2561,2563,2565,2581,2583,2591,2593,2595,2597,2599,2623,2625,2627,2629,2631,2633,2635,2637,2639,2641,2643,2645,2647,2649,2651,2693,2695,2697,2699,2701,2913,2915,2917,2919,2923,2925,2927,2929,2931,2933,2935,2937,2939,2941,2943]);
const greenCloudCycles = {month:'monthly', quarter:'quarterly', halfyear:'semiannually', year:'annually'};

async function fetchGreenCloudRate(pid, cycle) {
 const endpoint = 'https://greencloudvps.com/billing/feeds/productsinfo.php?pid='+pid+'&get=price&billingcycle='+cycle+'&currency=1';
 try {
  const upstream = await fetch(endpoint,{method:'GET',redirect:'manual',signal:AbortSignal.timeout(6000)});
  const age = Number(upstream.headers.get('age') || 0);
  if(!upstream.ok || !Number.isFinite(age) || age>900 || Number(upstream.headers.get('content-length')||0)>256) {
   await upstream.body?.cancel();
   return {state:'unavailable'};
  }
  const reader=upstream.body?.getReader();
  if(!reader)return {state:'unavailable'};
  const decoder=new TextDecoder();let text='',bytes=0;
  while(true) {
   const part=await reader.read();
   if(part.done)break;
   bytes+=part.value.byteLength;
   if(bytes>256){await reader.cancel();return {state:'unavailable'};}
   text+=decoder.decode(part.value,{stream:true});
  }
  text+=decoder.decode();
  const value=text.trim().match(/^document\.write\((['"])\$\s*(-?(?:\d+|\d{1,3}(?:,\d{3})+)\.\d{2})\s+USD\1\);?$/);
  if(!value)return {state:'unavailable'};
  const price=value[2].replaceAll(',','');
  if(price==='-1.00')return {state:'not-offered'};
  if(Number(price)<=0 || Number(price)>1000000)return {state:'unavailable'};
  return {state:'priced',price,currency:'USD'};
 } catch {return {state:'unavailable'};}
}

async function serveGreenCloudRates(req, ctx) {
 if(req.method!=='GET')return json({error:'GET required'},405);
 const url=new URL(req.url),match=/^\/api\/greencloud-prices\/([1-9]\d{0,5})$/.exec(url.pathname);
 if(!match||!greenCloudPricePids.has(Number(match[1])))return json({error:'Unknown catalog product'},404);
 if(url.search)return json({error:'Unexpected parameters'},400);
 const pid=Number(match[1]),cache=globalThis.caches?.default;
 const key=new Request(url.origin+url.pathname+'?format=1');
 let hit=null;
 try {if(cache)hit=await cache.match(key);} catch {}
 if(hit)return hit;
 const rates=Object.fromEntries(await Promise.all(Object.entries(greenCloudCycles).map(async ([term,cycle])=>[term,await fetchGreenCloudRate(pid,cycle)])));
 const complete=Object.values(rates).every(r=>r.state!=='unavailable');
 const result=json({pid,rates,checkedAt:new Date().toISOString(),refreshSeconds:complete?900:60},200,complete?900:60);
 if(cache)ctx.waitUntil(cache.put(key,result.clone()).catch(()=>{}));
 return result;
}

const fxQuoteGroups = [
 'CNY,EUR,HKD,JPY,CAD,TWD,GBP,SGD,KRW,AUD,VND',
 'AED,BRL,CHF,CLP,CZK,DKK,HUF,IDR,ILS,INR,MXN',
 'MYR,NOK,NZD,PHP,PLN,RON,SEK,THB,TRY,ZAR'
];
const fxCurrencies = new Set(fxQuoteGroups.join(',').split(','));
const fxDay = 86_400_000;
const fxSource = 'https://api.frankfurter.dev/v2/rates';
// USD-based closing reference rates verified against Frankfurter's dated series.
const fxSnapshotDate = '2026-11-20';
const fxSnapshot = {AED:3.6725,AUD:1.4961,BRL:5.9056,CAD:1.4305,CHF:0.84171,CLP:1013.02,CNY:6.6681,CZK:22.245,DKK:6.8054,EUR:0.91,GBP:0.76114,HKD:7.8479,HUF:338.11,IDR:18256,ILS:3.3115,INR:92.96,JPY:159.49,KRW:1334.29,MXN:19.0123,MYR:4.1122,NOK:9.7282,NZD:1.8166,PHP:63.754,PLN:4.0389,RON:4.8681,SEK:10.173,SGD:1.2895,THB:33.924,TRY:50.506,TWD:32.985,VND:25810,ZAR:17.3685};
let fxInFlight;

function fxIsoDay(timestamp){return new Date(timestamp).toISOString().slice(0,10)}

function fxTable(rows,from,to){
 if(!Array.isArray(rows))throw Error('Invalid rate series');
 const days = new Map();
 for(const row of rows){
  if(!row||row.base!=='USD'||!fxCurrencies.has(row.quote)||!Number.isFinite(row.rate)||row.rate<=0||
    !/^\d{4}-\d{2}-\d{2}$/.test(row.date)||row.date<from||row.date>to)continue;
  if(!days.has(row.date))days.set(row.date,new Map());
  days.get(row.date).set(row.quote,row.rate);
 }
 const rates = {};
 for(const date of [...days.keys()].sort().reverse()){
  const day = days.get(date), yuan = day.get('CNY');
  if(!yuan)continue;
  rates.USD ??= {date,usd:1,cny:yuan};
  for(const [currency,rate] of day){
   rates[currency] ??= {date,usd:1/rate,cny:yuan/rate};
  }
 }
 if(!rates.USD||!rates.CNY)throw Error('Missing USD/CNY rate');
 return rates;
}

async function loadFxGroup(quotes,from,to){
 const url=fxSource+'?base=USD&quotes='+quotes+'&from='+from+'&to='+to;
 const res=await fetch(url,{headers:{accept:'application/json'},redirect:'manual',signal:AbortSignal.timeout(5500)});
 if(!res.ok||!res.headers.get('content-type')?.includes('application/json')||!res.body)throw Error('FX upstream HTTP '+res.status);
 const rows=JSON.parse(new TextDecoder().decode(await readLimitedBytes(res.body,40_000)));
 if(!Array.isArray(rows))throw Error('Invalid FX rate series');
 return rows;
}

async function loadFxTable(from,to){
 const groups=await Promise.allSettled(fxQuoteGroups.map(quotes=>loadFxGroup(quotes,from,to)));
 const snapshotUsable=fxSnapshotDate<=to&&Date.parse(to)-Date.parse(fxSnapshotDate)<=5*fxDay;
 const fallback=snapshotUsable?Object.entries(fxSnapshot).map(([quote,rate])=>({quote,rate,base:'USD',date:fxSnapshotDate})):[];
 const rows=[...fallback,...groups.flatMap(group=>group.status==='fulfilled'?group.value:[])];
 const partial=groups.some(group=>group.status==='rejected');
 if(partial)console.warn('FX upstream groups unavailable',groups.filter(group=>group.status==='rejected').map(group=>group.reason?.message));
 return {requestedDate:to,rates:fxTable(rows,from,to),partial};
}

async function serveFx(req,ctx){
 if(req.method!=='GET')return json({error:'GET required'},405);
 const url = new URL(req.url);
 if(url.search)return json({error:'Unexpected parameters'},400);
 const yesterday = Date.now()+8*3_600_000-fxDay;
 const to = fxIsoDay(yesterday), from = fxIsoDay(yesterday-10*fxDay);
 const cache = globalThis.caches?.default;
 const cacheKey = new Request(url.origin+url.pathname+'?day='+to);
 try{
  const hit=await cache?.match(cacheKey);
  if(hit)return hit;
 }catch{}
 if(fxInFlight?.day!==to){
  const request = loadFxTable(from,to).finally(()=>{if(fxInFlight?.promise===request)fxInFlight=null});
  fxInFlight={day:to,promise:request};
 }
 try{
  const table=await fxInFlight.promise;
  const result=json(table,200,table.partial?120:900);
  if(cache)ctx.waitUntil(cache.put(cacheKey,result.clone()).catch(()=>{}));
  return result;
 }catch{return json({error:'FX rates temporarily unavailable'},503)}
}

export default {async fetch(req,env,ctx){
 const url=new URL(req.url);
 if(url.pathname==='/api/fx')return serveFx(req,ctx);
 if(url.pathname.startsWith('/api/greencloud-prices/'))return serveGreenCloudRates(req,ctx);
 if(url.pathname==='/api/deal-feed/channel-products'){
  if(req.method!=='GET')return forumResponse({error:'method'},405);
  const sources=Object.entries(forumSources).filter(([,source])=>source.channel).map(([name])=>name);
  const feeds=await Promise.all(sources.map(async from=>{
   try{
    const response=await serveForumFeed(new Request(new URL('/api/deal-feed/'+from,url)),ctx);
    if(!response.ok)return null;
    const result=await response.json();
    if(result.stale||result.editionSnapshot||result.visibility==='link-only')return null;
    return {from,items:result.items.map(post=>({...post,from,sourceObserved:result.observed}))};
   }catch{return null}
  }));
  const reads=feeds.filter(Boolean);
  if(!reads.length)return forumResponse({error:'sources unavailable'},503);
  return forumResponse({source:'channel-products',sources:reads.map(source=>source.from),items:reads.flatMap(source=>source.items)},200,120);
 }
 if(url.pathname.startsWith('/api/deal-feed/'))return serveForumFeed(req,ctx);
 if(url.pathname.startsWith('/api/stock-history/'))return json({installed:false},200,60);
 if(!url.pathname.startsWith('/api/stock/'))return env.ASSETS.fetch(req);
 if(req.method!=='GET')return json({error:'GET required'},405);
 const key=url.pathname.slice(11),target=stockTarget(key);
 if(!target)return json({error:'Unknown stock probe'},404);
 const cache=globalThis.caches?.default;
 const cacheKey=new Request(url.origin+url.pathname+"?format=v13",{method:'GET'});
 let hit=null;try{hit=cache&&await cache.match(cacheKey)}catch{}
 if(hit)return hit;
 let observation;try{observation=await observeListing(target)}catch{observation={state:'offline',offer:null}}
 const result=json({key,...observation,schemaVersion:13,sku:target.sku,zone:target.zone,checkedAt:new Date().toISOString(),source:target.url,refreshSeconds:TTL},200,observation.state==='offline'?25:TTL);
 if(cache)ctx.waitUntil(cache.put(cacheKey,result.clone()).catch(()=>{}));
 return result;
}};
