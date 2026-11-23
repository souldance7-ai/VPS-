'use strict';
const merchantIndex = [
 {keys:['GreenCloud','GreenCloudVPS'],names:['绿云','綠雲','GreenCloud VPS'],short:['绿云','綠雲']},
 {keys:['DMIT'],names:['大妈','大媽','DMIT.IO'],short:['大妈','大媽']},
 {keys:['GoMami'],names:['狗妈','狗媽','Gomami.io'],short:['狗妈','狗媽']},
 {keys:['BandwagonHost'],names:['搬瓦工','般瓦工','瓦工','BWG','KiwiVM'],short:['搬瓦工','搬瓦工']},
 {keys:['BageVM'],names:['八哥','Bage VM','bagevm.com']},
 {keys:['AkileCloud','Akile'],names:['Akile','Akile.ai','AKILE CLOUD','艾可云','艾可雲']},
 {keys:['ISVORO'],names:['isvoro.com']},{keys:['ABLEnet'],names:['ABLENET VPS','ablenet.jp']},
 {keys:['Zouter'],names:['zouter.io']},
 {keys:['FXTRANSIT'],names:['fxtransit.io','FX Transit']},
 {keys:['Host Addon','HostAddon'],names:['hostaddon.com','HostAddon']},
 {keys:['HostingInside','Hosting Inside'],names:['hostinginside.com','Hosting Inside']},
 {keys:['PQS'],names:['pqs.pw']},{keys:['MatrixIDC'],names:['matrixidc.net','Matrix IDC']},
 {keys:['SkylineConnect','Skyline Connect'],names:['skylineconnect.io','Skyline Connect']},
 {keys:['NewNB Cloud'],names:['NoBrand','NoBand','NNB','NewNB','奶牛','nnb.ltd']},
 {keys:['Neburst'],names:['奶爸','neburst.com']},{keys:['Mkcloud'],names:['MKCloud','mkcloud.net']},{keys:['VMSilo'],names:['vmsilo.com','VM Silo']},
 {"keys":["AkkoCloud"],"names":["Akko","akkocloud.com","Akko Cloud"]},
 {"keys":["MoeCloud"],"names":["lite.moe","萌云","萌雲","Moe Cloud"]},
 {"keys":["LightLayer"],"names":["lightlayer.net","Light Layer","光层","光層"]},
 {"keys":["ZgoCloud"],"names":["ZGO","ZgoVPS","zgovps.com"]},
 {"keys":["VollCloud"],"names":["Voll","vollcloud.com"]},
 {"keys":["RENET"],"names":["renet.tw","HKBGP"]},
 {"keys":["YT.NET"],"names":["YunTu","云途","雲途","CNIX"]},
 {"keys":["Lamhosting"],"names":["LAM","Lam Hosting"]},
 {"keys":["RFCHOST"],"names":["RFC","RFCHost"]},
 {"keys":["KFCHost"],"names":["KFC Host"]},
 {"keys":["PortChannel"],"names":["PO0","PortChannel Zero"]},
 {"keys":["V.PS"],"names":["vps.hosting","小秘书","小秘書","xtom"]},
 {"keys":["Lazco Cloud"],"names":["Lazco","Lazco Compute","lazco.tw"]},
 {"keys":["VPS.Taxi"],"names":["VPSTaxi","VPS Taxi"]},
 {"keys":["ZoroCloud"],"names":["Zoro Cloud","Zoro"]},
 {"keys":["UQIDC"],"names":["UQ","uqidc.com"]},
 {"keys":["YunYoo"],"names":["YUNYOO","云悠","雲悠","yunyoo.cc"]},
 {"keys":["LazyCat"],"names":["懒猫云","懶貓雲","懒猫","懶貓","LazyCatCloud","LazyCat Cloud","lazycat.wiki","dash.lazycat.wiki"]},
 {"keys":["HostYun"],"names":["Host Yun","主机分享","主機分享","hostyun.com"]},
 {"keys":["Friendhosting"],"names":["Friend Hosting","friendhosting.net"]},
 {"keys":["ACCK","ACCK Cloud"],"names":["ACCKCloud","ACCK"]},
 {"keys":["Hytron"],"names":["Hytron"]},
 {"keys":["JustG"],"names":["JustG","justg.com"]},
 {"keys":["Linode","Akamai Cloud","Akamai Cloud (Linode)"],"names":["Akamai Cloud","Linode"]},
 {"keys":["ServerPoint"],"names":["Server Point","ColossusCloud"]},
 {"keys":["Tencent Cloud"],"names":["騰訊雲","腾讯云","騰訊","腾讯","QCloud"]},
 {"keys":["Joyso"],"names":["就速台北雲","就速台北云"]},
 {"keys":["JoySolData"],"names":["悦阳","悅陽","Joysol","joysol.net"]},
 {"keys":["Hoyoverse Network","MHYIDC","Hoyoverse Network (MHYIDC)"],"names":["MHYIDC","mhyidc.com"]},
 {"keys":["NSS"],"names":["戰國策","战国策","NSS"]},
 {"keys":["Riven Cloud"],"names":["RivenCloud","Riven2","Riven"]},
 {"keys":["YecaoYun"],"names":["野草雲","野草云"]},
 {"keys":["VPS.TAIPEI (Taipei101)"],"names":["台北101","臺北101","東京101","东京101"]},
 {"keys":["TCSCloud"],"names":["TCS","TCS Cloud"]},
 {"keys":["NoSLA Cloud"],"names":["NOSLA","No SLA"]},
 {"keys":["BERO HOST"],"names":["Bero"]},
 {"keys":["Kdatacenter"],"names":["KDC","Kdatacenter"]},
 {"keys":["VmShell"],"names":["VmShell"]},
 {"keys":["IMIDC"],"names":["IMIDC"]}
];
const merchantFold = s=>s.toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]/g,'');
const legacySingaporePlan=PLANS.find(p=>p.id==='field-69a190f39b02'&&p.provider==='ColossusCloud');
if(legacySingaporePlan){legacySingaporePlan.provider='ServerPoint';legacySingaporePlan.searchTerms=[...(legacySingaporePlan.searchTerms||[]),'ColossusCloud'];}
const merchantAliases=new Map();
for(const p of PLANS){
 const group=merchantIndex.find(g=>g.keys.some(k=>merchantFold(k)===merchantFold(p.provider)));
 if(group)merchantAliases.set(p.provider,group.names);
}
const merchantDomains=new Map();
for(const p of PLANS){
 const domains=merchantDomains.get(p.provider)||new Set();
 for(const raw of [p.url,p.spec?.proof]){try{const url=new URL(raw);if(url.protocol!=='https:')continue;const host=url.hostname.toLowerCase();if(/(?:^|\.)(?:nodeseek\.com|t\.me|lowendtalk\.com|meowvps\.com|richvps\.com|digvps\.com|github\.com|youtu\.be|google\.com|sb\.sb)$/.test(host))continue;domains.add(host);domains.add(host.replace(/^(?:www|my|billing|clients|portal|shop|account)\./,''));}catch{}}
 merchantDomains.set(p.provider,domains);
}
for(const [name,domains] of merchantDomains)merchantAliases.set(name,[...new Set([...(merchantAliases.get(name)||[]),...domains])]);
const merchantMenuCopy={
 sc:{label:'全站商家',choose:'查找商家',search:'输入商家名或别名，例如绿云',all:'查看商家全部方案',category:'官方商品与信息来源',market:'只看这个地区',empty:'没有找到这个商家。',scope:'当前结果还受线路与其他条件限制。',global:'所有地点',read:'本次读到的公开资料',unread:'本次未能读取商家商品页',matched:'相关优惠原帖',queried:'本次已检索公开优惠',source:'来源',website:'商家网站'},
 tc:{label:'全站商家',choose:'查找商家',search:'輸入商家名或別名，例如綠雲',all:'查看商家全部方案',category:'官方商品與資訊來源',market:'只看這個地區',empty:'沒有找到這個商家。',scope:'目前結果還受線路與其他條件限制。',global:'所有地點',read:'本次讀到的公開資料',unread:'本次未能讀取商家商品頁',matched:'相關優惠原帖',queried:'本次已檢索公開優惠',source:'來源',website:'商家網站'},
 en:{label:'All merchants',choose:'Find a merchant',search:'Merchant or alias, e.g. GreenCloud',all:'All plans from this merchant',category:'Store and public sources',market:'See this region only',empty:'No merchant matches that name.',scope:'Route and other filters also narrow these results.',global:'All locations',read:'Public sources read',unread:'Merchant product pages were unavailable on this check',matched:'Promotion posts',queried:'Public promotion search completed',source:'Source',website:'Merchant site'},
 ja:{label:'全事業者',choose:'事業者を検索',search:'会社名・別名で検索（例 GreenCloud）',all:'この事業者の全プラン',category:'商品ページ・公開情報源',market:'この地域だけで検索',empty:'一致する事業者がありません。',scope:'経路などの条件でも結果を絞り込んでいます。',global:'全地域',read:'確認できた公開資料',unread:'今回の確認では商品ページを取得できませんでした',matched:'割引の原文',queried:'公開割引を検索済み',source:'出典',website:'公式サイト'}
};
let allMerchantNames=[];
const merchantPlanCounts=new Map();
function refreshMerchantIndex(){
 merchantPlanCounts.clear();
 for(const p of PLANS)merchantPlanCounts.set(p.provider,(merchantPlanCounts.get(p.provider)||0)+1);
 allMerchantNames=[...merchantPlanCounts.keys()].sort((a,b)=>a.localeCompare(b,'en'));
}
refreshMerchantIndex();
function merchantLink(name,label,marketCode=''){
 const a=el('a',label),q=new URLSearchParams();
 if(name)q.set('q-vendor',name);if(marketCode)q.set('q-market',marketCode);
 a.href='?'+q+'#directory';a.dataset.directoryQuery='';return a;
}
const merchantCoverageLabels={
 products:['已讀商品頁','已读商品页','Product pages read','商品ページを確認'],
 categories:['已讀商店分類','已读商店分类','Store categories read','商品カテゴリを確認'],
 landing:['已讀商家首頁','已读商家首页','Merchant site read','公式トップページを確認'],
 community:['可讀資料來自公開原帖','可读资料来自公开原帖','Available evidence came from public community posts','公開記事で情報を確認'],
 unavailable:['商家商品頁暫時無法讀取','商家商品页暂时无法读取','Merchant product pages were unavailable','商品ページを取得できませんでした'],
 coverage:['下載全站商家查詢紀錄','下载全站商家查询记录','Download merchant coverage','全事業者の確認記録をダウンロード'],
 indexed:['公開索引','公开索引','Search index','公開インデックス']
};
function merchantCoverageWord(key){return merchantCoverageLabels[key]?.[{tc:0,sc:1,en:2,ja:3}[lang]]||''}
function directoryMerchantPanel(name){
 const audit=typeof MERCHANT_AUDIT==='undefined'?null:MERCHANT_AUDIT.merchants?.[name];
 const deals=typeof MERCHANT_PROMOTION_SEARCH==='undefined'?null:MERCHANT_PROMOTION_SEARCH[name];
 const expanded={
  'Lazco Cloud':[['Compute · T4 Object Storage · Networking','https://cloud.lazco.tw/pricing']],
  'V.PS':[['KVM VPS','https://v.ps/products/'],['Shared Hosting','https://v.ps/hosting/'],['Domains','https://v.ps/domains/'],['SSL Certificates','https://v.ps/ssl/']],
  Linode:[['Compute Pricing','https://www.linode.com/pricing/'],['Linode Types API','https://techdocs.akamai.com/linode-api/reference/get-linode-types']]
 };
 const official=expanded[name]||(typeof EXPANDED_MERCHANT_SOURCES==='undefined'?null:EXPANDED_MERCHANT_SOURCES[name]);
 if(!audit&&!deals&&!official&&!Object.hasOwn(merchantCatalogMeta,name))return null;
 const t=merchantMenuCopy[lang],details=el('details',null,'merchant-source-panel'),summary=el('summary',name+' · '+t.category);details.append(summary);
 details.addEventListener('toggle',()=>{
  if(!details.open||details.children.length>1)return;
  const body=el('div',null,'merchant-evidence'),used=new Set();
  const add=(url,title,box=body)=>{let parsed;try{parsed=new URL(url)}catch{return}if(!['https:','http:'].includes(parsed.protocol)||used.has(parsed.href))return;used.add(parsed.href);box.append(link((title||parsed.hostname)+' ↗',parsed.href))};
  appendMerchantCatalogStatus(body,name);
  const fresh=Object.hasOwn(merchantCatalogMeta,name)?merchantCatalogMeta[name].source:null;
  if(fresh)add(fresh,t.website);
  for(const [title,url] of official||[])add(url,title);
  if(audit){
   const at=audit.checkedAt||MERCHANT_AUDIT.checkedAt;
   body.append(el('small',(merchantCoverageWord(audit.status)||t.read)+(at?' · '+String(at).slice(0,10):'')));
   const pages=Array.isArray(audit.sources)?audit.sources:[];
   const more=el('details',null,'merchant-more'),moreLinks=el('div',null,'merchant-extra');for(const entry of pages){if(!entry.listed&&(entry.status==='unavailable'||(typeof entry.status==='number'&&(entry.status<200||entry.status>=400))))continue;add(entry.url,(entry.title||new URL(entry.url).hostname)+(entry.listed?' · '+({sc:'官网目录所列',tc:'官網目錄所列',en:'Listed in store',ja:'公式カタログ掲載'})[lang]:entry.indexed?' · '+merchantCoverageWord('indexed'):''),used.size>=8?moreLinks:body)}if(moreLinks.childElementCount){more.append(el('summary',({sc:'更多商品与分类页',tc:'更多商品與分類頁',en:'More products and categories',ja:'さらに商品とカテゴリを表示'})[lang]+' ('+moreLinks.childElementCount+')'),moreLinks);body.append(more)}
   for(const channel of audit.channels||[]){if(channel.url)add(channel.url,channel.name)}
  }
  if(!used.size){const p=PLANS.find(p=>p.provider===name);if(p)add(p.url,t.website)}
  if(deals?.searched){body.append(el('small',t.queried+' · '+String(deals.checkedAt).slice(0,10)));for(const entry of deals.leads||[])add(entry.url,entry.title)}
  details.append(body);
 });
 return details;
}
function fillMerchantMenu(){
 const nav=$('provider-shortcuts');if(!nav)return;
 const vendor=$('vendor').value,area=$('market').value,query=$('search').value.trim(),active=quickDirectoryUrl().search;
 const state=JSON.stringify([lang,vendor,area,query,active,merchantCatalogRevision]);if(nav.dataset.rendered===state)return;
 nav.dataset.rendered=state;
 const t=merchantMenuCopy[lang],open=nav.querySelector('details.merchant-picker')?.open||false;
 const previous=nav.querySelector('input.merchant-find')?.value||'';
 nav.replaceChildren(el('strong',t.label+' · '+allMerchantNames.length));nav.setAttribute('aria-label',t.label);
 for(const group of merchantIndex.slice(0,6)){
  const name=allMerchantNames.find(n=>group.keys.some(k=>merchantFold(n)===merchantFold(k)));if(!name)continue;
  const alias=group.short?.[{sc:0,tc:1}[lang]],a=merchantLink(name,alias?alias+' · '+name:name);
  if(name===vendor)a.setAttribute('aria-current','true');nav.append(a);
 }
 const picker=el('details',null,'merchant-picker'),summary=el('summary',t.choose+' ▾');
 const input=document.createElement('input');input.className='merchant-find';input.type='search';input.autocomplete='off';input.placeholder=t.search;input.setAttribute('aria-label',t.choose);input.value=previous;
 const menu=el('div',null,'merchant-menu'),field=el('div',null,'merchant-picker-content');field.append(input,menu);picker.append(summary,field);nav.append(picker);
 function draw(){
  const needle=merchantFold(input.value.trim());
  const found=needle?allMerchantNames.filter(name=>[name,...(merchantAliases.get(name)||[])].some(n=>merchantFold(n).includes(needle))):allMerchantNames;
  const items=found.map(name=>{const a=merchantLink(name,name+' · '+merchantPlanCounts.get(name));if(name===vendor)a.setAttribute('aria-current','true');return a});
  menu.replaceChildren(...(items.length?items:[el('small',t.empty)]));menu.scrollTop=0;
 }
 picker.open=open;if(open)draw();
 picker.addEventListener('toggle',()=>{if(picker.open){draw();if(!open)input.focus({preventScroll:true})}});
 input.addEventListener('input',draw);
 const exact=vendor||allMerchantNames.find(name=>query&&[name,...(merchantAliases.get(name)||[])].some(x=>merchantFold(x)===merchantFold(query)));
 const filtered=quickActive.size||['kind','ip','route','carrier','buy-filter','term'].some(id=>$(id)?.value)||$('promo').checked;
 const info=el('div',null,'merchant-scope');
 if(filtered&&(area||exact)){
  info.append(el('small',t.scope));
  if(area)info.append(merchantLink(exact||'',market(area)+' · '+t.market,area));
 }
 if(exact){info.append(merchantLink(exact,t.all+' ('+merchantPlanCounts.get(exact)+')'));const sources=directoryMerchantPanel(exact);if(sources)info.append(sources);}
 if(info.childNodes.length)nav.append(info);
 if(typeof MERCHANT_AUDIT!=='undefined'){const a=el('a',merchantCoverageWord('coverage')+' ↓','merchant-export');a.href='merchant-coverage.csv';a.download='pitopone-merchant-coverage.csv';nav.append(a);}
}
