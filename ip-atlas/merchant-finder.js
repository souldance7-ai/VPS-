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
 {"keys":["UQIDC"],"names":["UQ","uqidc.com"]},
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
const merchantMenuWords={sc:['常用商家','展开商家','收起'],tc:['常用商家','展開商家','收起'],en:['Popular merchants','More merchants','Show fewer'],ja:['注目の事業者','事業者をもっと見る','折りたたむ']};
function fillMerchantMenu(){
 const nav=$('provider-shortcuts');if(!nav)return;
 const vendor=$('vendor').value;
 if(nav.dataset.lang===lang&&nav.dataset.vendor===vendor)return;
 nav.dataset.lang=lang;nav.dataset.vendor=vendor;
 const labels=merchantMenuWords[lang],providers=[...new Set(PLANS.map(p=>p.provider))];
 const open=nav.querySelector('details')?.open||false;
 nav.replaceChildren(el('strong',labels[0]));nav.setAttribute('aria-label',labels[0]);
 const extra=el('details',null,'merchant-additional'),sum=el('summary',labels[1]),panel=el('div',null,'merchant-menu');extra.append(sum,panel);extra.open=open;
 extra.addEventListener('toggle',()=>{sum.textContent=extra.open?labels[2]:labels[1]});
 for(const group of merchantIndex){
  const name=providers.find(p=>group.keys.some(k=>merchantFold(k)===merchantFold(p)));if(!name)continue;
  const short=group.short?.[{sc:0,tc:1}[lang]],a=el('a',short?short+' · '+name:name);
  a.href='?'+new URLSearchParams({'q-vendor':name})+'#directory';a.dataset.directoryQuery='';
  if(vendor===name)a.setAttribute('aria-current','true');
  if(nav.querySelectorAll(':scope > a').length<6)nav.append(a);else panel.append(a);
 }
 if(panel.children.length){nav.append(extra);if(panel.querySelector('[aria-current]'))extra.open=true}
}
