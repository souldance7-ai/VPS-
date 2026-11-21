const maxPageBytes=1_500_000;
const cartQuery=['fid','gid','rp'];
const markets=[
 ['LAX','Los Angeles',/los[ -]?angeles|洛[杉山][矶磯]|\blax\d*\b/i],
 ['SJC','San Jose',/san[ -]?jos[eé]|圣何塞|聖荷西|矽谷|硅谷|\bsjc\d*\b/i],
 ['SEA','Seattle',/seattle|西雅[图圖]|\bsea[0-9]+\b/i],
 ['HK','Hong Kong',/hong[ -]?kong|香港|荃湾|荃灣|九龙|九龍|将军澳|將軍澳|\bhkg?\d+\b/i],
 ['TW','Taipei',/taipei|台北|臺北/i],['TW','Changhua',/changhua|彰化/i],
 ['TW','Taiwan',/taiwan|[台臺][湾灣]|hinet|\btw\d+\b/i],
 ['JP','Osaka',/osaka|大阪/i],['JP','Tokyo',/tokyo|[东東]京|\bnrt\b/i],
 ['JP','',/japan|日本|\bjp[0-9]+\b/i],
 ['DE','Frankfurt',/frankfurt|法[兰蘭]克福|\bfra\d*\b/i],
 ['DE','',/germany|德国|德國|\bde[0-9]+\b|nuremberg|limburg/i],
 ['GB','London',/london|[伦倫]敦/i],['GB','Newcastle',/newcastle|[纽紐]卡斯[尔爾]/i],
 ['GB','',/united[ -]kingdom|英国|英國|\buk\b/i],
 ['NL','Amsterdam',/amsterdam|阿姆斯特丹/i],['NL','',/netherlands|荷[兰蘭]/i],
 ['SG','Singapore',/singapore|新加坡|\bsin\d*\b/i],
 ['US','Kansas City',/kansas|堪[萨薩]斯/i],['US','Dallas',/dallas|达拉斯|達拉斯/i],
 ['US','',/united[ -]states|美国|美國|\busa?\b|new[ -]york|chicago|miami|houston|atlanta/i],
 ['KR','Seoul',/seoul|首[尔爾]/i],['KR','',/korea|[韩韓][国國]|釜山/i],
 ['FR','Paris',/paris|巴黎/i],['FR','',/france|法[国國]|roubaix|strasbourg/i],
 ['CA','',/canada|加拿大|toronto|montreal|vancouver|beauharnois/i],
 ['AU','',/australia|澳大利[亚亞]|澳洲|sydney|melbourne/i],
 ['IN','',/india|印度|mumbai|bangalore/i],['MY','',/malaysia|马来西亚|馬來西亞|kuala[ -]lumpur/i],
 ['VN','',/vietnam|越南|hanoi|ho[ -]chi[ -]minh/i],['PH','',/philippines|菲律[宾賓]|manila/i],
 ['TH','',/thailand|泰[国國]|bangkok/i],['ID','',/indonesia|印尼|jakarta/i],
 ['SE','',/sweden|瑞典|stockholm/i],['FI','',/finland|芬[兰蘭]|helsinki/i],
 ['CH','',/switzerland|瑞士|zurich/i],['PL','',/poland|波[兰蘭]|warsaw/i],
 ['ES','',/spain|西班牙|madrid/i],['IT','',/italy|意大利|義大利|milan/i],
 ['BR','',/brazil|巴西|s[aã]o[ -]paulo/i],['ZA','',/south[ -]africa|南非|johannesburg/i]
];
const hosting=/\b(?:vps|vds|cvm|tcvm|kvm|vpsssd|vserver|bare[ -]?metal|dedicated|cloud[ -]?(?:server|instance|compute))\b|云服务器|雲伺服器|云主机|虛擬主機|虚拟服务器|专用服务器|專用伺服器|独立服务器|獨立伺服器|(?:\bstore\b|\bcart\b).*(?:nvme|premium-cloud|servers|ryzen|epyc|hostinginstance)/i;
const otherProduct=/shared[ -]?(?:web[ -]?)?hosting|reseller[ -]?hosting|wordpress|domain[ -]?registration|email[ -]?hosting|virtualizor[ -]license|\bssl certificates?\b|backup storage|object storage|域名注册|虚拟空间|虛擬空間|共享主机|共享主機|网站空间|流量包|充值卡/i;
const commercePath=/(?:^|\/)(?:cart(?:\.php)?|store|shop|pricing|products?|vps(?:-hosting)?|vds|vserver|dedicated(?:-servers)?|bare-metal(?:-servers)?|cloud(?:-servers|-hosting|-compute)?|servers?|compute|[\w-]+-(?:vps|vds)(?:-[\w-]+)?|virtual-servers)(?:\/|$)/i;
const privatePath=/(?:^|\/)(?:account|dashboard|admin|login|signup|register|members|clientarea(?:\.php)?|checkout|invoice|payment|affiliate|logout|contact|ticket|api|status|metrics|telemetry|analytics|tracking|auth|oauth|news|blog|kb|docs|support|terms|privacy)(?:[./-]|$)/i;
const lazyCatFamily=/^\/instances\/create\/([a-z]{2})\/(\d+)\/?$/;
const lazyCatStore=url=>url.hostname==='dash.lazycat.wiki'&&
 (url.pathname==='/instances/create'||lazyCatFamily.test(url.pathname));
const hostYunFeed='https://my.hostyun.com/process.aspx?c=jsapi&action=product&groupid=';
const hostYunGroup=url=>{
 const match=/^https:\/\/my\.hostyun\.com\/process\.aspx\?c=jsapi&action=product&groupid=(\d{1,6})$/.exec(url.href);
 return match?.[1]||'';
};

function decode(text){
 const named={amp:'&',quot:'"',apos:"'",nbsp:' ',yen:'¥',euro:'€',pound:'£',lt:'<',gt:'>',ndash:'–',mdash:'—'};
 return String(text||'').replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi,(s,num,hex,entity)=>{
  if(entity)return named[entity.toLowerCase()]??s;
  const code=hex?parseInt(hex,16):Number(num);
  return code>0&&code<=0x10ffff?String.fromCodePoint(code):' ';
 });
}
function plain(text){return decode(String(text||'').replace(/<[^>]*>/g,' ')).replace(/[\s\u0000-\u001f]+/g,' ').trim()}
const short=(value,limit=170)=>plain(value).slice(0,limit);
const hostKey=host=>host.replace(/^www\./,'').toLowerCase();
function attributes(tag){
 return Object.fromEntries([...tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(m=>[m[1],decode(m[2]??m[3]??m[4])]));
}
export function storefrontUrl(raw,base,hosts,{seed=false}={}){
 try{
  const url=new URL(decode(raw),base);
  if(url.protocol!=='https:'||url.username||url.password||url.port||
   !/^(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z]{2,24}$/i.test(url.hostname)||
   !hosts.some(host=>hostKey(host)===hostKey(url.hostname))||privatePath.test(url.pathname))return '';
  if(/\.(?:xml|rss|json|js|css|zip|pdf|png|jpe?g|svg|mp4|woff2?)$/i.test(url.pathname))return '';
  url.hash='';
  if(hostYunGroup(url))return url.href;
  for(const key of [...url.searchParams.keys()]){
   if(/^(?:utm_.*|aff(?:id)?|ref(?:errer)?|gclid|fbclid|language|lang|currency)$/i.test(key)){url.searchParams.delete(key);continue}
   const value=url.searchParams.get(key);
   if(!cartQuery.includes(key)||url.searchParams.getAll(key).length!==1||
    (key==='rp'?!/^\/store(?:\/[a-z0-9_-]+){0,4}\/?$/i.test(value):!/^\d{1,6}$/.test(value)))return '';
  }
  if(!seed&&url.pathname!=='/'&&!commercePath.test(url.pathname)&&!lazyCatStore(url)&&!url.searchParams.has('rp'))return '';
  if(url.searchParams.has('fid')||url.searchParams.has('gid')){
   if(!/(?:^|\/)(?:cart(?:\.php)?|index\.php)\/?$/.test(url.pathname))return '';
   const ordered=new URLSearchParams();
   for(const key of cartQuery)if(url.searchParams.has(key))ordered.set(key,url.searchParams.get(key));
   url.search=ordered;
  }
  return url.href;
 }catch{return ''}
}
function marketFor(...texts){
 for(const text of texts){
  const matches=markets.filter(([, ,test])=>test.test(text||''));
  const countries=new Set(matches.map(([market])=>['LAX','SEA','SJC'].includes(market)?'US':market));
  if(countries.size===1)return matches[0].slice(0,2);
 }
 return ['ZZ',''];
}
const countPattern=/\b(\d{1,4})\s*(?:x\s*)?(?:v\s*cpus?|cpus?|vcores?|cores?)\b|(\d{1,4})\s*(?:核心|核|コア)/i;
const ramPattern=/(?:\d+(?:\.\d+)?\s*[GM](?:i?B)?(?:\s*\/\s*|\s+)(?:DDR[345]?|RAM))|(?:\d+(?:\.\d+)?\s*[GM](?:i?B)?\s*(?:RAM|memory))/i;
const diskPattern=/\d+(?:\.\d+)?\s*(?:[GMTP](?:i?B)?)\s*(?:NVMe(?: SSD)?|SSD|HDD)/i;
const speedPattern=/\d+(?:\.\d+)?\s*(?:M|G|T)bps\b/i;
const transferPattern=/\d+(?:\.\d+)?\s*(?:[GT](?:i?B)?)(?:\s*[-–~]\s*\d+(?:\.\d+)?\s*[GT](?:i?B)?)?\s*(?:transfer|traffic|双向|雙向|单向|單向|出站|入站|流量)/i;
function specs(raw){
 const lines=raw.split(/<\/?(?:li|tr|p)\b[^>]*>|<br\s*\/?>|\n\s*\n/i).map(x=>short(x)).filter(x=>x.length>1);
 const field=(re)=>lines.find(x=>re.test(x))?.replace(re,'').trim()||'';
 const flat=lines.join(' ');
 const cpuText=field(/^(?:CPU|Processor|处理器|處理器)\s*[:：]\s*/i);
 const num=(cpuText||flat).match(countPattern);
 const ram=field(/^(?:内存|內存|RAM|Memory|メモリ)\s*[:：]\s*/i)||flat.match(ramPattern)?.[0]||'';
 const disk=field(/^(?:系统盘|系統盤|硬盘|硬碟|存储|Storage|System disk|Disk)\s*[:：]\s*/i)||flat.match(diskPattern)?.[0]||'';
 const dataDisk=field(/^(?:数据盘|資料碟|Data disk)\s*[:：]\s*/i);
 const lane=field(/^(?:带宽|頻寬|带寬|网络|網路|Bandwidth|Port)\s*[:：]\s*/i);
 const port=(lane||flat).match(speedPattern)?.[0]||'';
 const transfer=field(/^(?:流量|Traffic|Transfer|Bandwidth allowance)\s*[:：]\s*/i)||flat.match(transferPattern)?.[0]||'';
 const cpuModels=[...new Set((cpuText||flat).match(/(?:AMD\s+)?EPYC\s+\d[A-Z\d]{3,5}|(?:AMD\s+)?Ryzen\s+(?:[3579]\s+)?\d{4}[A-Z0-9]{0,4}|(?:Intel\s+)?(?:Xeon\s+)?E[357]-\d{4}[A-Z]?(?:\s*v[1-6])?|(?:Intel\s+)?Xeon\s+(?:Gold|Silver|Platinum|Bronze)\s+\d{4}[A-Z]{0,3}/gi)||[])].slice(0,5);
 const cpuFamily=short((cpuText||flat).match(/(?:Intel\s+Xeon|AMD\s+EPYC)(?:\s+(?:或|or|\/|／)\s+(?:Intel\s+Xeon|AMD\s+EPYC))?/i)?.[0]||'');
 const directionEvidence=transfer?transfer+' '+flat:'';
 const trafficDirection=/双向|雙向|In\s*&\s*Out|bidirectional/i.test(directionEvidence)?'both':
  /outbound|出站|仅上行|僅上行/i.test(directionEvidence)?'outbound':/inbound|入站/i.test(directionEvidence)?'inbound':/单向|單向/i.test(directionEvidence)?'one-way':'';
 return {cpu:num?(num[1]||num[2])+' vCPU':short(cpuText),ram:short(ram),disk:short([disk,dataDisk&&'Data: '+dataDisk].filter(Boolean).join(' · ')),
  port:short(port),traffic:short(transfer),trafficDirection,
  ...(cpuModels.length===1?{cpuModel:cpuModels[0]}:cpuModels.length?{cpuModels}:cpuFamily?{cpuFamily}:{}),
  ipv4:/ipv4/i.test(flat),ipv6:/ipv6/i.test(flat)};
}
function priceFrom(raw,cycle,currency=''){
 const value=short(raw),label=short(cycle)||value;
 const currencyCode=value.match(/\b(?:USD|EUR|GBP|CNY|RMB|JPY|HKD|TWD|NZD|AUD|CAD|SGD|INR|KRW|BRL|CHF|PLN|RUB|THB|VND|TRY|IDR|MYR|SEK|NOK)\b/i)?.[0].toUpperCase();
 const code=currencyCode==='RMB'?'CNY':currencyCode||
  (/€/.test(value)?'EUR':/£/.test(value)?'GBP':/\bHK\s*\$/.test(value)?'HKD':/\bNT\s*\$/.test(value)?'TWD':/円/.test(value)?'JPY':/[¥￥].*元/.test(value)?'CNY':currency);
 const price=value.match(/(?:\d{1,3}(?:,\d{3})+|\d{1,9})(?:\.\d{1,4})?/)?.[0];
 const term=/one[ -]?time|setup fee|一次性/i.test(label)?'':/per[ -]hour|hourly|\/\s*(?:hour|hr)\b|小时|小時/i.test(label)?'hour':/semi.?annual|half.?year|半年/i.test(label)?'halfyear':
  /biennial|two years|triennial|two-year|三年|两年|兩年/i.test(label)?'':/quarter|季/i.test(label)?'quarter':/annually|annual|yearly|per year|\/\s*(?:y|yr|year)\b|年/i.test(label)?'year':
   /monthly|month|\/\s*mo\b|月/i.test(label)?'month':'';
 return price&&term&&code?{price:price.replaceAll(',',''),currency:code,term,from:/起|\bfrom\b|starting/i.test(value+' '+label)}:{};
}
function availability(raw){
 const text=plain(raw);
 const quantity=text.match(/\b(\d{1,8})\s+(?:Available|in stock)\b|(?:库存|庫存|剩余|剩餘)\s*[：:]\s*(\d{1,8})(?!\d)/i);
 if(quantity){const stockQuantity=Number(quantity[1]??quantity[2]);return {stockQuantity,stock:stockQuantity===0?'sold-out':'in-stock'}}
 if(/^(?:售罄|缺货|缺貨|无货|無貨|sold[ -]?out|out of stock|unavailable)$/i.test(text))return {stock:'sold-out'};
 if(/^(?:较少|較少|少量|库存紧张|庫存緊張|low stock|limited stock)$/i.test(text))return {stock:'low'};
 if(/^(?:有货|有貨|充足|库存充足|庫存充足|in stock|available)$/i.test(text))return {stock:'in-stock'};
 return {stock:'unreported'};
}
function classText(html,cls,tag='[a-z0-9]+'){
 const re=new RegExp('<('+tag+')\\b[^>]*\\bclass=["\'][^"\']*\\b'+cls+'\\b[^"\']*["\'][^>]*>([\\s\\S]*?)<\\/\\1>','i');
 return html.match(re)?.[2]||'';
}
function networkLabel(raw){
 const tokens=[['AS9929',/\b(?:AS)?9929\b|CUII/i],['CMIN2',/CMIN2|\bAS58807\b/i],['CN2 GIA',/CN2\s*GIA/i],
  ['CN2',/CN2(?!\s*GIA)/i],['AS4837',/\b(?:AS)?4837\b/i],['CMI',/\bCMI\b|AS58453/i],['IIJ',/\bIIJ\b/i],
  ['SoftBank',/\bSoftBank\b|软银|軟銀/i],['HINET',/\bHiNet\b|中华电信|中華電信/i],['BGP',/\bBGP\b/i]];
 return tokens.filter(([,re])=>re.test(raw)).map(([word])=>word).join(' / ');
}
function result(name,basis,header,row,offer,state,key='',kind=''){
 const sku=short(name);if(sku.length<2||otherProduct.test(sku))return null;
 const [market,city]=marketFor(sku,header,new URL(basis).pathname.replace(/[-_]/g,' '));
 const bare=/bare[ -]?metal|dedicated|专用服务器|專用伺服器|独立服务器|獨立伺服器/i;
 const dedicated=bare.test(sku+' '+new URL(basis).pathname)||bare.test(header)&&!/\bvps\b|云服务器|雲伺服器/i.test(header);
 return {key:key||sku.toLowerCase(),sku,market,city,kind:kind||(dedicated?'bare':'vps'),
  ...row,...offer,...state,routeName:networkLabel(sku+' '+header)};
}

function yunYoo(html,url){
 const section=html.match(/<section\b[^>]*id="yy-cart-page"[^>]*>/)?.[0];if(!section)return null;
 const attrs=attributes(section);
 const fid=attrs['data-first-group-id'],gid=attrs['data-product-group-id'];
 if(!fid||!gid)return null;
 const page=new URL(url);page.search='?fid='+fid+'&gid='+gid;
 const heading=classText(html,'yy-cart-intro-title','h3');
 const selected=[...html.matchAll(/<a\b([^>]*data-cart-group-navigate[^>]*)>([\s\S]*?)<\/a>/gi)]
  .find(m=>attributes(m[1])['data-cart-product-group-id']===gid);
 const header=short(heading||selected?.[2]||'');
 const cards=[...html.matchAll(/<article\b[^>]*\byy-cart-product\b[^>]*>([\s\S]*?)<\/article>/gi)];
 const items=cards.map(([,card])=>{
  const name=classText(card,'yy-cart-product-name','h3');
  const offer=priceFrom(classText(card,'yy-cart-price-current'),classText(card,'yy-cart-price-cycle'),'CNY');
  const raw=classText(card,'yy-cart-product-specs','ul');
  const row=specs(raw);if(fid==='7'&&row.cpu)row.cpu=row.cpu.replace('vCPU','cores');
  return result(name,page.href,header,row,offer,availability(classText(card,'yy-cart-stock','span')),gid+':'+short(name),fid==='7'?'bare':'vps');
 });
 return {canonical:page.href,complete:cards.length>0&&items.every(Boolean),items:items.filter(Boolean),adapter:'yunyoo'};
}
function whmcs(html,url,title,currency){
 const matched=[...html.matchAll(/\bid=["']product(\d+)-name["'][^>]*>([\s\S]*?)<\/(?:span|h[2345]|strong|div)>/gi)];
 if(!matched.length)return null;
 const items=[];
 for(const [idx,match] of matched.entries()){
  const [,pid,name]=match;
  const card=html.slice(match.index,Math.min(matched[idx+1]?.index??html.length,match.index+22_000));
  const desc=card.match(new RegExp('\\bid=["\']product'+pid+'-description["\'][^>]*>([\\s\\S]*?)<\\/div>','i'))?.[1]||'';
  const offer=classText(card,'price','span')||card.match(/class=["'](?:product-price|price-value)["'][^>]*>([^<]{1,100})/)?.[1]||'';
  const cycle=classText(card,'cycle','span')||classText(card,'period','span');
  const nameText=short(name.replace(/<em\b[^>]*>[\s\S]*/i,'').replace(/<span\b[^>]*class=["'][^"']*badge[\s\S]*/i,''));
  const row=specs(desc);
  if(!hosting.test(nameText+' '+title+' '+decodeURIComponent(url))&&!(row.cpu&&row.ram&&row.disk))continue;
  const stock=availability(classText(name,'badge','span')||short(name).match(/\b\d+\s+Available\b|Out of stock|Sold out/i)?.[0]||'');
  const item=result(nameText,url,title,row,priceFrom(offer,cycle,currency),stock,'pid:'+pid);
  if(item)items.push(item);
 }
 return {complete:items.length>0&&items.length===matched.length,items,adapter:'whmcs'};
}
function whmcsPackages(html,url,title,entry){
 const packages=[...html.matchAll(/<div\b[^>]*\bclass=["']package["'][^>]*\bid=["']product(\d+)["'][^>]*>/gi)];
 const items=[];
 for(const [index,pkg] of packages.entries()){
  const card=html.slice(pkg.index,Math.min(packages[index+1]?.index??html.length,pkg.index+20_000));
  const name=classText(card,'package-title','h3');
  const description=classText(card,'package-content','div');
  if(!name||!hosting.test(name+' '+title+' '+url))continue;
  const details=specs(description);
  details.traffic||=plain(description).match(/\d+(?:\.\d+)?\s*(?:GB|TB)\s+Bandwidth\b/i)?.[0].replace(/\s+Bandwidth$/i,'')||'';
  details.disk||=plain(description).match(/\d+(?:\.\d+)?\s*(?:GB|TB)\s+Disk Space\b/i)?.[0].replace(/\s+Disk Space$/i,'')||'';
  if(/\bKVM\b/i.test(name+' '+plain(description)))details.virtualization='KVM';
  const order=card.match(/<a\b([^>]*\bid=["']product\d+-order-button["'][^>]*)>/i);
  const orderUrl=order?storefrontUrl(attributes(order[1]).href,url,entry.hosts):'';
  const price=classText(card,'price-amount','div'),cycle=classText(card,'price-cycle','div');
  const item=result(name,url,title,details,priceFrom(price,cycle,entry.currency),
   availability(plain(card).match(/\b\d+\s+Available\b|Out of stock|Sold out/i)?.[0]),'pid:'+pkg[1]);
  if(item)items.push(orderUrl?{...item,orderUrl}:item);
 }
 return items.length?{complete:items.length===packages.length,items,adapter:'whmcs'}:null;
}
function edgeNat(html,url,title){
 const cards=[...html.matchAll(/<div\b[^>]*\bclass=["']boxe["'][^>]*>/gi)];
 const items=[];
 for(const [index,match] of cards.entries()){
  const card=html.slice(match.index,Math.min(cards[index+1]?.index??html.length,match.index+14_000));
  const sku=classText(card,'name','em'),list=card.match(/<dl\b[^>]*>([\s\S]*?)<\/dl>/i)?.[1];
  if(!sku||!list)continue;
  const fields=Object.fromEntries([...list.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/gi)].map(([,key,value])=>[plain(key),plain(value)]));
  const rate=priceFrom(classText(card,'big','span'),classText(card,'won','span'),'CNY');
  const cores=fields['核心數']?.match(/^\d+/)?.[0];
  if(!cores||!rate.term)continue;
  const specs={cpu:cores+' vCPU',ram:fields['記憶體']||'',disk:fields['儲存']||'',port:fields['寬帶']||'',
   traffic:/不限制|不限量/.test(fields['流量'])?'Unmetered':fields['流量']?.replace(/^(\d+(?:\.\d+)?)([GT])$/,'$1 $2B')||'',
   virtualization:/KVM/i.test(fields['架構'])?'KVM':'',ipv4:Boolean(fields['IPv4地址'])};
  const badge=plain(classText(card,'qty','span')||classText(card,'badge','span'));
  const stock=availability(badge.replace(/^(\d+)\s*可用$/,'$1 Available').replace(/^缺貨中$/,'缺貨'));
  const pid=card.match(/(?:[?&])pid=(\d{1,8})\b/)?.[1];
  const item=result(sku,url,title,specs,rate,stock,pid?'pid:'+pid:'','vps');
  if(item)items.push({...item,routeName:fields['線路']||item.routeName});
 }
 return items.length?{complete:items.length===cards.length,items,adapter:'edgenat'}:null;
}
function friendHosting(html,url,title){
 const cards=[...html.matchAll(/<div\b[^>]*\bclass=["']tariff js-tariff-item[^"']*["'][^>]*\bdata-id=["'](\d+)["'][^>]*>/gi)];
 const items=[];
 for(const [index,match] of cards.entries()){
  const card=html.slice(match.index,Math.min(cards[index+1]?.index??html.length,match.index+22_000));
  const sku=classText(card,'tariff__title','div'),options=classText(card,'tariff__options','ul');
  const val=card.match(/<span\b[^>]*\bclass=["']tariff__cost-sum[^"']*["'][^>]*>\s*<strong>(\d+)<\/strong>(\.\d+)?\s*€/i);
  if(!sku||!options||!val)continue;
  const fields=specs(options);
  const item=result(sku,url,title,{...fields,family:title.split('|')[0].trim()},
   {price:val[1]+(val[2]||''),currency:'EUR',term:'month',from:true},{stock:'unreported'},'tariff:'+match[1],'vps');
  if(item)items.push(item);
 }
 return items.length?{complete:items.length===cards.length,items,adapter:'friendhosting'}:null;
}
function hostYunProducts(body,url){
 const group=hostYunGroup(new URL(url)),raw=JSON.parse(body);
 if(!group||!Array.isArray(raw))throw Error('unsupported-url');
 const names={'45':'香港 CLD','60':'香港 EPYC','59':'日本東京 EQ','42':'美国洛杉矶','31':'韩国数据中心'};
 const cycleTerms={'1':'month','3':'quarter','6':'halfyear','12':'year'};
 const items=[];
 for(const product of raw.slice(0,120)){
  if(String(product?.phidden)!=='0'||String(product.pgid)!==group||!/^\d{1,8}$/.test(product.pid))continue;
  const sku=short(product.pname),config=product.pconfig||{};
  const cycles=String(product.pprice?.cycle||'').split(','),amounts=String(product.pprice?.cprice||'').split(',');
  const billingRates=cycles.flatMap((cycle,index)=>Object.hasOwn(cycleTerms,cycle)&&/^\d+(?:\.\d+)?$/.test(amounts[index]||'')?
   [{term:cycleTerms[cycle],price:amounts[index],currency:'CNY'}]:[]);
  const monthly=billingRates.find(rate=>rate.term==='month');
  const quantity=/^\d{1,8}$/.test(product.pstock)?Number(product.pstock):null;
  const number=(key,unit)=>/^\d+(?:\.\d+)?$/.test(config[key])?config[key]+' '+unit:'';
  const incoming=number('netupbandwidth','Mbps'),outgoing=number('netdownbandwidth','Mbps');
  const port=incoming&&outgoing&&incoming===outgoing?incoming:[incoming&&'In '+incoming,outgoing&&'Out '+outgoing].filter(Boolean).join(' / ');
  const details={cpu:number('cpu','vCPU'),ram:number('mem','MB'),disk:number('hdd','GB SSD'),port,
   traffic:number('plantraffic','GB'),billingRates,family:names[group]||'',cpuFamily:group==='60'?'AMD EPYC':''};
  const state=quantity===null?{stock:'unreported'}:{stock:quantity?'in-stock':'sold-out',stockQuantity:quantity};
  const item=result(sku,url,names[group]||'',details,monthly||{},state,'pid:'+product.pid,'vps');
  if(item)items.push({...item,orderUrl:'https://my.hostyun.com/idcSystem.aspx?c=order&ptype=6&pg='+group+'&pid='+product.pid});
 }
 return {links:[],canonical:url,items,complete:items.length>0,adapter:'hostyun'};
}
function idcsmart(html,url,title,currency){
 const matches=[...html.matchAll(/<div\b[^>]*\bclass=["'][^"']*\bcartitem\b[^"']*["'][^>]*>[\s\S]{0,650}?<h[345][^>]*>([\s\S]{1,250}?)<\/h[345]>/gi)];
 if(!matches.length)return null;
 const items=[];
 for(const [i,match] of matches.entries()){
  const name=short(match[1]);
  const body=html.slice(match.index+match[0].length,Math.min(matches[i+1]?.index??html.length,match.index+20_000));
  const card=body.split(/<div\b[^>]*class=["'][^"']*\bcard-footer\b/i)[0];
  const price=card.match(/([¥$€£￥])\s*<a\b[^>]*class=["'][^"']*\bcart-num\b[^"']*["'][^>]*>\s*([\d.,]+)\s*<\/a>\s*([^<]{1,28})/i);
  const row=specs(card.split(/\bclass=["'][^"']*\bjustify-content-between\b/i)[0]);
  if(!price&&!(row.cpu&&row.ram))continue;
  if(!hosting.test(name+' '+title+' '+url)&&!marketFor(name,title)[0].match(/^(?!ZZ)[A-Z]{2,3}$/)&&!(row.cpu&&row.ram&&row.disk))continue;
  const stockRaw=plain(card).match(/(?:库存|庫存)\s*[：:]\s*\d+|(?:售罄|无货|無貨)/)?.[0]||'';
  const item=result(name,url,title,row,price?priceFrom(price[1]+price[2]+price[3],price[3],currency):{},availability(stockRaw));
  if(item)items.push(item);
 }
 return {complete:items.length>0&&items.length===matches.length,items,adapter:'idcsmart'};
}
function jsonLd(html,url,title){
 const items=[];
 const visit=entry=>{
  if(!entry||typeof entry!=='object')return;
  if(Array.isArray(entry)){entry.slice(0,100).forEach(visit);return}
  if(entry['@graph'])visit(entry['@graph']);
  if(entry.itemListElement)visit(entry.itemListElement);
  if(entry.item)visit(entry.item);
  if(![entry['@type']].flat().includes('Product')||typeof entry.name!=='string')return;
  const name=short(entry.name),body=short(entry.description,1800);
  const fields=Array.isArray(entry.additionalProperty)?entry.additionalProperty.slice(0,25).map(x=>short(x?.name)+': '+short(x?.value)):[];
  const row=specs(fields.join('<br>')+'<br>'+body);
  if(!hosting.test(name+' '+title+' '+url)&&!(row.cpu&&row.ram&&row.disk))return;
  const offer=[entry.offers].flat().find(x=>x&&x['@type']==='Offer');
  const interval=offer?.priceSpecification?.unitText||offer?.priceSpecification?.billingDuration||offer?.description||'';
  const term=typeof interval==='string'?interval.replace(/^P1M$/,'monthly').replace(/^P1Y$/,'yearly'):'';
  const rate=offer&&typeof offer.priceCurrency==='string'&&/^[A-Z]{3}$/.test(offer.priceCurrency)&&/^\d+(?:\.\d+)?$/.test(offer.price)?
   priceFrom(offer.price+' '+offer.priceCurrency,term):{};
  const stock={'InStock':'in-stock','OutOfStock':'sold-out','SoldOut':'sold-out','LimitedAvailability':'low'}[String(offer?.availability||'').split('/').at(-1)]||'unreported';
  let productUrl='';
  for(const raw of [entry.url,offer?.url]){
   if(typeof raw!=='string')continue;
   const guess=storefrontUrl(raw,url,[new URL(url).hostname]);
   if(guess&&guess!==url){productUrl=guess;break}
  }
  const explicitSku=typeof entry.sku==='string'&&short(entry.sku);
  const location=marketFor(name,productUrl?new URL(productUrl).pathname.replace(/[-_]/g,' '):'',
   short(offer?.availableAtOrFrom?.address?.addressCountry));
  const item=result(name,url,title,row,rate,{stock},explicitSku?'sku:'+explicitSku:productUrl?'product:'+productUrl:'');
  if(item){[item.market,item.city]=location;}
  if(item)items.push(item);
 };
 for(const [,tag,body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
  if(attributes(tag).type!=='application/ld+json'||body.length>300_000)continue;
  try{visit(JSON.parse(body))}catch{}
 }
 return items.length?{complete:true,items,adapter:'jsonld'}:null;
}

function lazyCat(html,url,entry,title){
 const fallback=html.match(/<noscript\b[^>]*>([\s\S]*?)<\/noscript>/i)?.[1]||'';
 const links=storefrontLinks(fallback,url,entry.hosts);
 const family=new URL(url).pathname.match(lazyCatFamily);
 if(!family)return {links,items:[],complete:false,adapter:'lazycat'};
 const market=family[1].toUpperCase();
 const summary=short(fallback.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1],380);
 const virtualization=/\bLXC\b/i.test(summary)?'LXC':/\bKVM\b/i.test(summary)?'KVM':'';
 const ipAttribute=/\bNAT\b/i.test(summary)?'nat':'';
 const products=[...fallback.matchAll(/<li\b[^>]*>([\s\S]{1,1200}?)<\/li>/gi)];
 const items=[];
 for(const [,raw] of products){
  const parts=plain(raw).match(/^(.{2,170}?)[：:]\s*(.+?)\s*[，,]\s*([¥￥]\s*[\d.]+\s*\/\s*月)(?:\s*(?:[（(]([^）)]+)[）)]))?$/);
  if(!parts)continue;
  const [,sku,configuration,amount,stockText]=parts;
  const fields=configuration.split(/\s*·\s*/);
  const number=configuration.match(countPattern);
  const memory=fields.find(field=>/内存|內存/.test(field))?.replace(/\s*(?:内存|內存).*$/,'')||'';
  const disk=fields.find(field=>/硬盘|硬碟/.test(field))?.replace(/\s*(?:硬盘|硬碟).*$/,'')||'';
  const {port,traffic,trafficDirection}=specs(fields.join('<br>'));
  const ipText=sku+' '+summary;
  const product=result(sku,url,title,{cpu:number?(number[1]||number[2])+' vCPU':'',ram:memory,disk,port,
   traffic:traffic.replace(/\s*流量$/,''),trafficDirection,virtualization,ipAttribute,
   residentialClaim:/家宽|家寬|residential/i.test(ipText),ipv4:/IPv4/i.test(summary),ipv6:/IPv6/i.test(summary)},
   priceFrom(amount,'month','CNY'),availability(stockText));
  if(product){
   const located=market==='US'&&['LAX','SJC','SEA'].includes(product.market)?product.market:market;
   items.push({...product,market:located,family:title.split('|')[0].trim()});
  }
 }
 return {links,items,complete:items.length>0&&items.length===products.length,adapter:'lazycat'};
}

function storefrontLinks(html,url,hosts){
 const links=new Set();
 for(const [,tag,body] of html.matchAll(/<a\b([^>]*)>([\s\S]{0,1600}?)<\/a>/gi)){
  const attrs=attributes(tag);
  if(!attrs.href||otherProduct.test(short(body)))continue;
  const href=storefrontUrl(attrs.href,url,hosts);
  if(!href||href===url)continue;
  const parsed=new URL(href);
  if(parsed.pathname==='/'&&!parsed.search)continue;
  const isCartCategory=parsed.searchParams.has('fid')||parsed.searchParams.has('gid')||parsed.searchParams.has('rp');
  if(!isCartCategory&&!commercePath.test(parsed.pathname)&&!lazyCatStore(parsed)&&!hosting.test(short(body)))continue;
  links.add(href);
  if(links.size===100)break;
 }
 return [...links];
}
export function parseStorefront(html,url,entry){
 const title=short(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'');
 if(/just a moment|access denied|verify (?:that )?you are human|security checkpoint|domain for sale/i.test(title))throw Error('blocked');
 const markup=html.replace(/<!--[\s\S]*?-->|<(?:script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/(?:script|style|svg|noscript)>/gi,' ');
 const headings=[...markup.matchAll(/<h[12]\b[^>]*>([\s\S]{0,280}?)<\/h[12]>/gi)].map(x=>short(x[1])).filter(x=>x&&!/^Shopping Cart$/i.test(x)).slice(0,4);
 const context=[title,...headings].join(' · ');
 const links=storefrontLinks(markup,url,entry.hosts);
 if(entry.adapter==='hostyun'&&new URL(url).hostname==='www.hostyun.com'){
  const configured=html.match(/const\s+productGroups\s*=\s*\[([^\]]{1,5000})\]/)?.[1]||'';
  for(const [,id] of configured.matchAll(/\bid:\s*(\d{1,6})\b/g))links.push(hostYunFeed+id);
 }
 const parsed=(entry.adapter==='lazycat'?lazyCat(html,url,entry,context):null)||
  (entry.adapter==='yunyoo'?yunYoo(markup,url):null)||
  (entry.adapter==='edgenat'?edgeNat(markup,url,context):null)||
  (entry.adapter==='whmcs-packages'?whmcsPackages(markup,url,context,entry):null)||
  (entry.adapter==='friendhosting'?friendHosting(markup,url,context):null)||
  whmcs(markup,url,context,entry.currency)||
  idcsmart(markup,url,context,entry.currency)||jsonLd(html,url,context);
 return {links,title,canonical:url,items:[],complete:false,...parsed};
}
export async function readStorefront(url,entry,fetcher=fetch){
 let current=storefrontUrl(url,undefined,entry.hosts,{seed:true});if(!current)throw Error('unsupported-url');
 const signal=AbortSignal.timeout(9000);
 for(let step=0;step<4;step++){
  const feedsHostYun=entry.adapter==='hostyun'&&hostYunGroup(new URL(current));
  const response=await fetcher(current,{signal,redirect:'manual',headers:{Accept:feedsHostYun?'application/json':'text/html','Accept-Language':'zh-CN, en;q=0.8'}});
  if(response.status>=300&&response.status<400){
   const destination=response.headers.get('location');await response.body?.cancel();
   const next=destination&&storefrontUrl(destination,current,entry.hosts,{seed:true});if(!next||next===current)throw Error('redirect');
   current=next;continue;
  }
  const type=response.headers.get('content-type')||'';
  if(!response.ok||!(feedsHostYun?/^(?:application\/json|text\/(?:plain|html))\b/i:/^text\/html\b/i).test(type)){
   await response.body?.cancel();
   throw Error(response.status===403||response.status===429?'blocked':'http-'+response.status);
  }
  let size=0,text='';
  const reader=response.body.getReader(),decoder=new TextDecoder();
  try{
   for(;;){
    const {done,value}=await reader.read();if(done)break;
    size+=value.byteLength;if(size>maxPageBytes){await reader.cancel();throw Error('large-page')}
    text+=decoder.decode(value,{stream:true});
   }
   text+=decoder.decode();
   return feedsHostYun?hostYunProducts(text,current):parseStorefront(text,current,entry);
  }finally{reader.releaseLock()}
 }
 throw Error('redirect');
}
