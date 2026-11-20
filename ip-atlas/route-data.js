'use strict';
const ROUTE_CHOICES={
 route:['ct','cu','cm','three-carriers'],
 routeDirection:['mainland-out','mainland-back','mainland-both'],
 backbone:['net-4134','net-cn2','net-gia','net-gt','net-4809','net-23764','net-4837','net-9929','net-10099','net-cmi','net-cmin2']
};
const ROUTE_LABELS={
 route:['大陆接入运营商','大陸接入電信商','Mainland access carrier','中国本土の接続事業者'],
 ct:['中国电信','中國電信','China Telecom','中国電信'],cu:['中国联通','中國聯通','China Unicom','中国聯通'],cm:['中国移动','中國移動','China Mobile','中国移動'],
 'three-carriers':['三网（电信＋联通＋移动）','三網（電信＋聯通＋移動）','All three carriers','中国3社すべて'],
 routeDirection:['流量方向','流量方向','Traffic direction','通信方向'],
 'mainland-out':['去程 · 大陆 → 机房','去程 · 大陸 → 機房','Outbound · mainland → host','往路 · 中国本土 → 拠点'],
 'mainland-back':['回程 · 机房 → 大陆','回程 · 機房 → 大陸','Return · host → mainland','復路 · 拠点 → 中国本土'],
 'mainland-both':['双向均有记录','雙向均有紀錄','Both directions documented','往復の記録あり'],
 backbone:['骨干 / 线路等级','骨幹 / 線路級別','Backbone / service tier','バックボーン・サービス区分'],
 'net-4134':'163 · AS4134','net-cn2':'CN2','net-4809':'AS4809 · CN2','net-gia':'CN2 GIA','net-gt':'CN2 GT',
 'net-23764':'CTGNet · AS23764','net-4837':'China169 · AS4837','net-9929':'CUII · AS9929','net-10099':'CUG · AS10099',
 'net-cmi':'CMI · AS58453','net-cmin2':'CMIN2 · AS58807','net-softbank':'SoftBank','net-cu-backbone':['联通骨干','聯通骨幹','Unicom backbone','中国聯通バックボーン'],'net-ctg':'CTG','net-lumen':'Lumen','net-direct':['直连','直連','Direct transit','直接接続'],
 routeProof:['大陆线路与方向','大陸線路與方向','Mainland routes by direction','中国本土の回線と方向'],
 sourceBoth:['商家公布 · 样本实测','商家公布 · 樣本實測','Merchant + measured sample','事業者公表・サンプル実測'],
 sourceOfficial:['商家公布','商家公布','Merchant specification','事業者公表'],
 cityBsg:['北京 / 上海 / 广州','北京 / 上海 / 廣州','Beijing / Shanghai / Guangzhou','北京・上海・広州'],cityChengdu:['成都','成都','Chengdu','成都'],cityGuangdong:['广东','廣東','Guangdong','広東'],
 sourceReported:['历史发布记录','歷史發布紀錄','Historical publication','過去の掲載記録'],
 sourceMeasured:['样本实测','樣本實測','Measured sample','サンプル実測'],
 routeGeneral:['方向未披露','方向未披露','Direction undisclosed','方向未公表'],
 routeUnknownCarrier:['运营商未拆分','電信商未拆分','Carrier unspecified','事業者別情報なし'],
 routeUnknownHop:['骨干未拆分','骨幹未拆分','Backbone unspecified','経路詳細なし'],
 routeCaption:['去程从大陆客户端出发，回程从机房出发。选择“三网”和某条骨干，可找出三家都有该骨干记录的方案。','去程從大陸用戶端出發，回程從機房出發。選擇「三網」與一條骨幹，可找出三家都有該骨幹紀錄的方案。','Outbound starts on the mainland. Return starts at the host. Select all three carriers plus a backbone to match a documented path for each carrier.','往路は中国本土発、復路は拠点発です。中国3社と経路を同時に選ぶと、各社について該当経路を確認できるプランに絞ります。'],
 routeTerms:['线路名怎么看','線路名稱怎麼看','Read network labels','経路表記について'],
 routeTermNote:['CMI 是 AS58453，CMIN2 是 AS58807。遇到「CMII」请对照商家原文与 ASN。CN2 GIA 与 CN2 GT 按明确标注的服务等级收录，单独看到 AS4809 只能确认 CN2 骨干。','CMI 是 AS58453，CMIN2 是 AS58807。遇到「CMII」請對照商家原文與 ASN。CN2 GIA 與 CN2 GT 依明確標示的服務級別收錄，單獨看到 AS4809 只能確認 CN2 骨幹。','CMI uses AS58453 and CMIN2 uses AS58807. Check the merchant’s wording and ASN for “CMII”. A GIA or GT match requires an explicit service-tier label. AS4809 alone identifies the CN2 backbone.','CMI は AS58453、CMIN2 は AS58807 です。「CMII」は事業者の表記と ASN を照合してください。GIA と GT は明示されたサービス区分を使用します。AS4809 だけで判定できるのは CN2 バックボーンまでです。']
};
for(const key of Object.keys(ROUTE_LABELS)){
 if(typeof ROUTE_LABELS[key]==='string')ROUTE_LABELS[key]=Array(4).fill(ROUTE_LABELS[key]);
}
const routeMerchantNetworks=new Map(), routeSnapshots=new WeakMap();
const carrierSequence=['ct','cu','cm'];
const anyDirection='unspecified',outbound='mainland-out',returning='mainland-back';
function attachRoute(planIds, source, evidence, table, date='',scope=''){
 for(const id of planIds){
  const result=routeMerchantNetworks.get(id)||[];
  for(const [direction,lanes] of Object.entries(table)){
   carrierSequence.forEach((carrier,index)=>{
    if(lanes[index]!==null&&lanes[index]!==undefined)result.push({direction,carrier,paths:lanes[index],source,evidence,date,scope});
   });
  }
  routeMerchantNetworks.set(id,result);
 }
}
function routePathLabel(key){return key.startsWith('via:')?key.slice(4):quickLabel(key)}
function routePaths(tokens){return tokens.map(t=>'net-'+t)}
const documentPaths=(tokens)=>tokens.map(list=>list===null?null:routePaths(list));
function addRoutes(plans,table,{source='',measured=false,date='',scope=''}={}){
 for(const p of plans){
  const url=source||p.url;
  const sheets=Object.fromEntries(Object.entries(table).map(([key,lanes])=>[key,documentPaths(lanes)]));
  attachRoute([p.id],url,measured?'sourceMeasured':'sourceOfficial',sheets,date,scope);
 }
}
const hostDareGT='https://hostdare.com/asiaoptimizedvps.html';
for(const [sku,cpu,ram,disk,traffic,port,price] of [
 ['QKVM1',1,'756 MB','35 GB HDD','600 GB','50 Mbps','39.99'],
 ['QKVM2',2,'1.5 GB','75 GB HDD','1,000 GB','60 Mbps','59.99'],
 ['QKVM3',3,'4 GB','150 GB HDD','1,500 GB','80 Mbps','109.99']
]){
 if(PLANS.some(p=>p.provider==='HostDare'&&(p.spec?.sku||p.plan)===sku))continue;
 PLANS.push({id:'route-hostdare-'+sku.toLowerCase(),provider:'HostDare',market:'LAX',city:'Los Angeles',plan:sku,kind:'vps',ip:'unknown',route:'claimed',routeName:'CN2 GT / CU / CM',carriers:['CT','CU','CM'],
 url:hostDareGT,proof:hostDareGT,spec:{sku,price,priceType:'official',currency:'USD',term:'year',cpu:cpu+' vCPU',ram,disk,port,traffic,date:'2026-11-20',proof:hostDareGT}});
}
(function prepareRouteSources(){
 const reviewedOn='2026-11-20';
 const gia=['cn2','gia'],gt=['cn2','gt'],cn2=['cn2'],cu169=['4837'],cuii=['9929'],cug=['10099'],cmi=['cmi'],cmin2=['cmin2'],chinaNet=['4134'];
 const get=id=>PLANS.filter(p=>p.id===id),match=regex=>PLANS.filter(p=>regex.test(p.id));
 function shop(plans,table,source='',scope=''){addRoutes(plans,table,{source,date:reviewedOn,scope})}
 shop(match(/^pc-acck-4837-/),{[anyDirection]:[cu169,cu169,cu169]},'https://acck.io/store/server?type=traffic&areaId=4&nodeId=8');
 for(const p of match(/^pc-acck-std-/)){
  routeMerchantNetworks.set(p.id,[{direction:returning,carrier:'',paths:routePaths(['cmin2','9929']),source:p.url,evidence:'sourceOfficial',date:reviewedOn,scope:p.spec?.sku}]);
 }
 for(const p of get('pc-acck-143')){
  routeMerchantNetworks.set(p.id,[{direction:returning,carrier:'',paths:routePaths(['cmin2','9929']),source:'https://www.zyhot.com/archives/446.html',evidence:'sourceReported',date:'2026-02-28',scope:'LAX9929-MINI'}]);
 }
 shop(match(/^pc-justg-tokyo-/),{[returning]:[['softbank','4134'],['softbank','cu-backbone'],['softbank','cmi']]},'https://www.justg.com/vps/japan/','Tokyo · 2026-11');
 shop(PLANS.filter(p=>p.provider==='MHYIDC'&&p.officialGroup==='hkbgp'),{[outbound]:[null,null,cmin2]},'https://mhyidc.com/index.php/store/hkbgp','IPv6');
 shop(match(/^project-voll-hk-/),{[outbound]:[chinaNet,chinaNet,cmi],[returning]:[cmi,cmi,cmin2]},'https://vollcloud.com/store/hong-kong-cmi-vps-sale');
 addRoutes(get('project-yt-esc'),{[outbound]:[cn2,cu169,cmi],[returning]:[chinaNet,cu169,cmi]}, {source:'https://digvps.com/review/yt',measured:true,date:'2026-07-01',scope:'HK.ES.C · IPv4'});
 for(const p of get('project-zgo-fra160')){
  routeMerchantNetworks.set(p.id,[{direction:anyDirection,carrier:'',paths:routePaths(['9929']),source:'https://clients.zgovps.com/index.php?/cart/special-offer/',evidence:'sourceOfficial',date:reviewedOn,scope:'Starter'}]);
  const reference={source:'https://zgocloud.org/gem/',measured:true,date:'2026-07-27'};
  addRoutes([p],{[returning]:[cuii,cuii,cuii]},{...reference,scope:'cityBsg'});
  addRoutes([p],{[returning]:[cu169,cu169,cu169]},{...reference,scope:'cityChengdu'});
 }
 shop(get('taxi-lax'),{[outbound]:[chinaNet,cu169,cmin2],[returning]:[cuii,cuii,cmin2]},'https://vps.taxi/los-angeles/');
 shop(match(/^route-hostdare-qkvm/),{[anyDirection]:[gt,[],[]]},hostDareGT);
 shop(match(/^field-vmrack-(dc2-base|l3-)/),{[returning]:[gia,cuii,cmin2]},'https://www.vmrack.net/pricing');
 shop(match(/^field-akko-fra-/),{[outbound]:[gia,gia,['direct']],[returning]:[gia,gia,gia]});
 shop(match(/^supp-akko-sjc-/),{[outbound]:[gia,null,null],[returning]:[gia,gia,gia]},'https://www.akkocloud.com/cart.php?gid=17');
 shop(match(/^supp-moe-uk-/),{[outbound]:[gia,gia,null],[returning]:[gia,gia,gia]},'https://lite.moe/index.php/store/uk-cn2-gia-super');
 shop(match(/^supp-moe-sjc-/),{[outbound]:[gia,gia,cmin2],[returning]:[gia,gia,cmin2]},'https://lite.moe/index.php/store/sjc-cn2-gia-super');
 shop(match(/^ps-depro-/),{[returning]:[cuii,cuii,cuii]});
 shop(match(/^field-isvoro-la-/),{[anyDirection]:[cn2,cug,null]},'https://isvoro.com/buy/USLAPro');
 shop(match(/^dedi-cn2annual$|^dedi-cn2-lim$/),{[anyDirection]:[gia,cuii,cmin2]});
 shop(get('dedi-cn25'),{[anyDirection]:[chinaNet,cu169,cmi]});
 shop(match(/^dedi-cmin(19|29)$/),{[anyDirection]:[null,['9929','10099'],cmin2]});
 shop(match(/^sb-rcvps-hk-/),{[anyDirection]:[cn2,['4837','ctg'],cmi]});
 shop(match(/^regional-matrix-q[12]-/),{[returning]:[['cn2','gia','4809'],cuii,cmin2]});
 shop(match(/^regional-matrix-4837-/),{[returning]:[null,cu169,null]});
 addRoutes(PLANS.filter(p=>p.provider==='PQS'&&p.spec?.sku==='TYO-CN2-VDS-500M'),{[outbound]:[cn2,cu169,cmi],[returning]:[chinaNet,cu169,['lumen']]},{source:'https://digvps.com/review/pqs',measured:true,date:'2026-11-11',scope:'TYO-CN2-VDS-500M · IPv4'});
 for(const p of PLANS.filter(p=>p.provider==='GoMami'&&/Turin/i.test(p.spec?.sku||p.plan?.en||p.plan))){
  const source='https://docs.gomami.io/en/products/turin/';
  shop([p],{[anyDirection]:[[],[],[]]},source,'Turin');
  routeMerchantNetworks.get(p.id).push({direction:anyDirection,carrier:'',paths:routePaths(['cn2','9929','cmin2']),source,evidence:'sourceOfficial',date:reviewedOn,scope:'Turin'});
 }
 shop(match(/^field-fxtransit-lax-nano$/),{[anyDirection]:[['cn2','4809'],cuii,cmi]});
 const greenPremium = PLANS.filter(p=>p.provider==='GreenCloud' && (p.officialGroup==='cn-premium-optimized'||/^tg-vpsts-green-sg-(mini|one)$/.test(p.id)));
 for(const plan of greenPremium){
  const mobile = plan.market==='JP' ? 'net-cmin2' : 'net-cmi';
  attachRoute([plan.id],'https://greencloudvps.com/billing/store/cn-premium-optimized','sourceOfficial',
    {[anyDirection]:[['net-cn2','net-gia'],['via:CU Premium'],[mobile]]},reviewedOn,plan.spec?.sku);
 }
 const greenTokyoMini=greenPremium.filter(p=>p.market==='JP' && p.officialProductId===2213);
 addRoutes(greenTokyoMini,{[outbound]:[cn2,cuii,cmi],[returning]:[cn2,cuii,cn2]},
   {source:'https://meowvps.com/blog/greencloudjp/',measured:true,date:'2026-05-07',scope:'CN Premium Optimized Plan Mini · IPv4'});
 for(const p of PLANS.filter(p=>p.provider==='DMIT')){
  const sku=String(p.spec?.sku||p.plan?.en||p.plan);
  if(/\.Pro\./i.test(sku)||/^dmit-(hkg|lax)$/.test(p.id)){
   const paths=['HK','JP'].includes(p.market)?['cn2','gia','23764']:gia;
   shop([p],{[anyDirection]:[paths,null,null]},'https://www.dmit.io/pages/cloud-instance',sku);
  }
 }
 shop(get('bwh-sjc'),{[anyDirection]:[gia,null,null]},'https://bandwagonhost.com/news?id=233');
 for(const p of PLANS.filter(p=>p.provider==='BandwagonHost'&&p.officialDC)){
  const dc=p.officialDC;let lanes;
  if(dc==='USCA_5'&&/ECOMMERCE SLA/i.test(p.spec?.sku||p.plan))lanes=[['cn2','gia','4809','23764'],cug,cmin2];
  else if(['USCA_6','USCA_9','USCA_5','USCA_SJC5','CABC_6','USNY_8'].includes(dc))lanes=[gia,[],cmin2];
  else if(dc==='SG_8')lanes=[gia,null,cmin2];
  else if(['HK_8','JPOS_6','JPTY_8'].includes(dc))lanes=[gia,null,null];
  else if(dc==='EUNL_9')lanes=[null,cug,null];
  if(lanes)shop([p],{[anyDirection]:lanes},'https://bandwagonhost.com/order/catalog.json',dc);
 }
 for(const p of PLANS.filter(p=>p.officialGroup&&p.provider.toLowerCase()==='isvoro')){
  const group=p.officialGroup.toLowerCase();
  const unallocated=(direction,paths)=>{
   const list=routeMerchantNetworks.get(p.id)||[];
   list.push({direction,carrier:'',paths,source:p.url,evidence:'sourceOfficial',date:reviewedOn,scope:p.officialGroup});
   routeMerchantNetworks.set(p.id,list);
  };
  if(group==='hkbgp')shop([p],{[returning]:[chinaNet,['4837','10099'],cmi]});
  else if(['hk-prod','hkcn2'].includes(group))unallocated(returning,routePaths(['cn2','10099']));
  else if(group.replace(/[^a-z]/g,'')==='hkapex')unallocated(returning,['via:163PP',...routePaths(['9929','cmin2'])]);
  else if(group==='jpbgp')unallocated(anyDirection,routePaths(['cn2','gt','4134','10099','4837','cmi']));
  else if(group==='uslapro')shop([p],{[anyDirection]:[cn2,cug,null]});
  else if(['us9929','uslapr'].includes(group))shop([p],{[anyDirection]:[null,cuii,cmin2]});
  else if(['de9929','gbisp'].includes(group))shop([p],{[anyDirection]:[[],cuii,[]]});
  else if(['uslaca','uslaca2'].includes(group))shop([p],{[anyDirection]:[chinaNet,null,null]});
 }
 for(const p of PLANS.filter(p=>p.provider==='AkileCloud'&&Number(p.officialNode)===30)){
  shop([p],{[returning]:[cu169,cu169,cu169]});
 }
 for(const p of PLANS.filter(p=>p.provider==='AkileCloud'&&Number(p.officialNode)===46)){
  shop([p],{[anyDirection]:[[],[],[]]});
  routeMerchantNetworks.get(p.id).push({direction:returning,carrier:'',paths:routePaths(['9929']),source:p.url,evidence:'sourceOfficial',date:reviewedOn,scope:''});
 }
 for(const p of PLANS.filter(p=>/^neb-(hkg|tpe|nrt|sin|lax)$/.test(p.id))){
  addRoutes([p],{[returning]:[gia,p.id==='neb-sin'?cug:cuii,cmin2]}, {source:p.proof,measured:true,scope:'cityGuangdong'});
 }
 function reviewed(slug,index,table){
  const source='https://meowvps.com/blog/'+slug+'/',report=MEOW_REPORTS.find(r=>r.url===source);
  if(report)addRoutes(get('meow-'+slug+'-'+index),table,{source,measured:true,date:report.date,scope:report.sku});
 }
 reviewed('goldcloudus',1,{[outbound]:[chinaNet,cu169,cmin2],[returning]:[['4837','4134'],cu169,cu169]});
 reviewed('zouterhk',1,{[outbound]:[[],[],[]],[returning]:[[],[],[]]});
 reviewed('ppflightlift',1,{[outbound]:[gia,cuii,cmin2],[returning]:[gia,cuii,cmin2]});
 reviewed('panstarusdc2',2,{[outbound]:[gia,cuii,cmin2],[returning]:[gia,cuii,cmin2]});
 reviewed('flawlessnode9929re',3,{[outbound]:[chinaNet,cuii,cmi],[returning]:[cuii,cuii,cuii]});
 reviewed('yunyoode9929',1,{[outbound]:[chinaNet,cuii,cmi],[returning]:[cuii,cuii,cuii]});
})();
// IPv4 measurements paired with an exact catalog SKU and source date.
for(const [id,site,date,sku,go,back] of [
 ["ms-gomami-hkg-turin-mini","gomami","2026-09-03","HKG.Turin.Mini",["net-4134","net-10099","net-cmi"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-gomami-hkg-pulse-mini","gomami","2026-09-03","HKG.Pulse.Mini",["net-4134","net-10099","net-cmi"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-gomami-jpn-pulse-mini","gomami","2025-12-06","JPN.Pulse.Mini",["net-4134","net-10099","net-cmi"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-gomami-sin-pulse-mini","gomami","2026-04-29","SIN.Pulse.Mini",["net-4134","net-10099","net-cmi"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-gomami-lax-pulse-mini","gomami","2026-07-06","LAX.Pulse.Mini",["net-cn2","net-9929","net-cmin2"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-gomami-fra-pulse-nano","gomami","2026-11-07","FRA.Pulse.Nano",["net-cn2","net-9929","net-cmi"],["via:CTG","net-9929","via:CTG"]],
 ["field-vmrack-dc2-base","vmrack","2026-09-07","L3.VPS.DC2.2C2G.Base",["net-cn2","net-9929","net-cmin2"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-isvoro-149","isvoro","2026-08-09","HK CN2 Core",["net-cn2","net-4837","net-cmi"],["via:CTG","net-10099","net-cmi"]],
 ["ms-isvoro-189","isvoro","2026-07-23","HK PROD Lite",["via:CTG","net-4837","net-cmi"],["via:CTG","net-10099","net-cmi"]],
 ["ms-isvoro-181","isvoro","2026-07-23","USLA PR Core",["net-4134","net-4837","net-cmi"],["net-9929","net-9929","net-9929"]],
 ["ms-isvoro-184","isvoro","2026-07-24","USLA 9929 Core",["net-4134","net-9929","net-cmi"],["net-9929","net-9929","net-cmin2"]],
 ["ms-isvoro-127","isvoro","2026-05-18","US LA Ultra",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-isvoro-215","isvoro","2026-08-28","DE9929 Lite",["net-4134","net-9929","net-cmi"],["net-9929","net-9929","net-9929"]],
 ["ms-isvoro-213","isvoro","2026-08-29","GB ISP Lite",["net-4134","net-9929","net-cmi"],["net-9929","net-9929","net-9929"]],
 ["ms-akile-1060","akile","2026-08-03","HKOPT-Lite",["net-cn2","net-4837","net-cmi"],["net-4134","net-10099","net-cmi"]],
 ["ms-akile-812","akile","2026-06-02","HKLite-Starter",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-923","akile","2025-11-20","HKS-Starter",["net-4134","net-4837","net-cmin2"],["net-4134","net-4837","net-lumen"]],
 ["ms-akile-818","akile","2026-05-30","HKPRO-Max",["net-cn2","net-4837","net-cmi"],["net-cn2","net-cn2","net-cn2"]],
 ["ms-akile-832","akile","2026-06-04","HKPlus-Standard",["net-cn2","net-4837","net-cmi"],["via:CTG","via:CTG","net-lumen"]],
 ["ms-akile-923","akile","2025-06-20","HKS-Starter",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-1012","akile","2026-05-16","MOLite-Mini",["net-4134","net-4837","net-lumen"],["net-4134","net-4837","net-lumen"]],
 ["ms-akile-827","akile","2025-06-20","TWLite-Mini",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-1048","akile","2026-08-04","HKL-TW-Starter",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-820","akile","2026-10-14","JPIIJ-Starter",["via:IIJ","via:IIJ","via:IIJ"],["via:SoftBank","via:SoftBank","via:IIJ"]],
 ["ms-akile-1030","akile","2026-05-23","JPIIJ-Y-Standard",["via:IIJ","via:IIJ","via:IIJ"],["via:IIJ","via:IIJ","via:IIJ"]],
 ["ms-akile-836","akile","2026-02-12","JPPro-Standard",["via:IIJ","via:IIJ","net-cmi"],["via:—","via:—","via:—"]],
 ["ms-akile-947","akile","2026-02-24","JPHyper-Pro",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-968","akile","2026-01-04","IT-UNLIMITED-500M",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-892","akile","2025-06-20","SGLite-Mini",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-1025","akile","2026-05-27","SGBase-Standard",["net-4134","net-4837","net-lumen"],["net-4134","net-4837","net-lumen"]],
 ["ms-akile-1039","akile","2026-08-02","NL-UNLIMITED-500M",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-884","akile","2026-05-17","KRBGP-Pro Standard",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-987","akile","2025-11-22","LAXPremium-Pro",["net-cn2","net-9929","net-cmin2"],["net-cn2","net-9929","net-cmin2"]],
 ["ms-akile-1008","akile","2026-02-09","LAXLite-Starter",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-858","akile","2026-06-06","LAXPro-Light",["net-4134","net-4837","net-cmin2"],["net-cn2","net-cn2","net-cn2"]],
 ["ms-akile-976","akile","2025-11-22","LAX4837-ISPMini",["net-4134","net-4837","net-cmi"],["net-4837","net-4837","net-4837"]],
 ["ms-akile-953","akile","2025-06-20","LAXISP-Mini",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-935","akile","2026-06-11","LAX4837-Starter",["net-4134","net-4837","net-cmi"],["net-10099","net-10099","net-10099"]],
 ["ms-akile-899","akile","2025-11-22","LAXStandard-UNLIMITED-500M",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-960","akile","2026-06-08","SJCBGP-1024M",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-846","akile","2026-04-28","UKLite-Starter",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["ms-akile-1106","akile","2026-07-31","DE9929-Starter",["net-4134","net-9929","net-cmi"],["net-9929","net-9929","net-9929"]],
 ["ms-akile-1034","akile","2026-08-01","DEBase-Lite",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["regional-sky-jp-1","skylineconnect","2026-08-08","Japan VPS I",["via:SoftBank","via:SoftBank","via:SoftBank"],["net-lumen","via:SoftBank","net-lumen"]],
 ["regional-sky-jplite-1","skylineconnect","2026-08-08","Japan Lite VPS I",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["regional-sky-sg-1","skylineconnect","2026-08-08","Singapore VPS I",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]],
 ["regional-pqs-hk-2","pqs","2026-11-18","HKT-500M-VDS-S",["net-4134","net-4837","net-cmi"],["net-4134","net-4837","net-cmi"]]
]){
 const sheet={};for(const [d,paths] of [[outbound,go],[returning,back]])sheet[d]=paths.map(path=>path==="via:—"?null:[path]);
 attachRoute([id],"https://digvps.com/review/"+site,"sourceMeasured",sheet,date,sku+" · IPv4");
}
// End of dated IPv4 measurements.
const backboneTerms=[
 ['4134',/\b(?:AS\s*)?4134\b|\bChinaNet\b|\b163\b/i],
 ['cn2',/\bCN2(?:GIA|GT)?\b|\bAS\s*4809\b/i],['4809',/\b(?:AS\s*)?4809\b/i],
 ['gia',/\bCN2[\s-]*GIA\b/i],['gt',/\bCN2[\s-]*GT\b/i],['23764',/\b(?:AS\s*)?23764\b|CTGNet/i],
 ['4837',/\b(?:AS\s*)?4837\b|China169/i],['9929',/\b(?:AS\s*)?9929\b|\bCUII\b/i],
 ['10099',/\b(?:AS\s*)?10099\b|\bCUG\b/i],['cmi',/\bCMI\b|\b(?:AS\s*)?58453\b/i],
 ['cmin2',/\bCMIN2\b|\b(?:AS\s*)?58807\b/i]
];
function planRouteRows(plan){
 if(routeSnapshots.has(plan))return routeSnapshots.get(plan);
 const rows=[...(routeMerchantNetworks.get(plan.id)||[])];
 if(!rows.length||(plan.route==='claimed'&&!rows.some(row=>row.evidence==='sourceOfficial'||row.evidence==='sourceReported'))){
  const label=typeof plan.routeName==='string'?plan.routeName:plan.routeName?.en||'';
  const paths=backboneTerms.filter(([,test])=>test.test(label)).map(([key])=>'net-'+key);
  const carriers=plan.route==='claimed'||plan.route==='measured'?(plan.carriers||[]).map(c=>c.toLowerCase()).filter(c=>carrierSequence.includes(c)):[];
  const base={direction:anyDirection,source:plan.route==='measured'?(plan.review||plan.proof||plan.url):plan.url,evidence:plan.route==='measured'?'sourceMeasured':'sourceOfficial',date:'',scope:''};
  for(const c of carriers)rows.push({...base,carrier:c,paths:carriers.length===1?paths:[]});
  if(paths.length&&carriers.length!==1)rows.push({...base,carrier:'',paths});
 }
 routeSnapshots.set(plan,rows);return rows;
}
const routeObservationCache=new WeakMap();
function routeObservations(plan){
 let observations=routeObservationCache.get(plan);if(observations)return observations;
 const grouped=new Map();for(const row of planRouteRows(plan)){
  const key=[row.evidence,row.source,row.date,row.scope].join('\n');
  if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(row);
 }
 observations=[...grouped.values()].sort((a,b)=>Number(a[0].evidence!=='sourceOfficial')-Number(b[0].evidence!=='sourceOfficial')||b[0].date.localeCompare(a[0].date));routeObservationCache.set(plan,observations);return observations;
}
function routeMatchesMode(plan,mode){
 if(!mode||routeStatusFor(plan)===mode)return true;
 const evidence={claimed:'sourceOfficial',reported:'sourceReported'}[mode];return Boolean(evidence)&&planRouteRows(plan).some(row=>row.evidence===evidence);
}
const routeTokens=new Set(Object.values(ROUTE_CHOICES).flat());
function routeStatusFor(plan){
 const rows=planRouteRows(plan);
 if(rows.some(row=>row.evidence==='sourceMeasured'))return 'measured';
 if(rows.some(row=>row.evidence==='sourceOfficial'))return 'claimed';
 if(rows.some(row=>row.evidence==='sourceReported'))return 'reported';
 if(plan.route==='measured'||plan.route==='claimed')return plan.route;
 return rows.length?'claimed':(plan.route||'unknown');
}
function routeStatusLabel(mode){return mode==='reported'?quickWord('sourceReported'):tr(mode==='unknown'?'routeUnknown':mode)}
function routeEvidenceText(plan){
 const sources=new Set(planRouteRows(plan).map(row=>row.evidence));
 if(sources.size>1)return sources.has('sourceReported')?[...sources].map(quickWord).join(' · '):quickWord('sourceBoth');
 return routeStatusLabel(routeStatusFor(plan));
}
function routeCarriersFor(plan){return [...new Set(planRouteRows(plan).map(row=>row.carrier).filter(Boolean))].map(c=>c.toUpperCase())}
function displayBackbones(keys){return [...new Set(keys)].filter(key=>key!=='net-cn2'||!keys.some(other=>['net-gia','net-gt','net-4809'].includes(other)))}
function routeSummaryFor(plan){return displayBackbones(planRouteRows(plan).flatMap(row=>row.paths)).map(routePathLabel).join(' / ')}
function routePredicate(selected,sideCarrier='',sourceMode=''){
 const route=selected.filter(value=>routeTokens.has(value));
 if(sideCarrier&&!route.includes(sideCarrier))route.push(sideCarrier);
 if(!route.length)return null;
 const carriers=route.includes('three-carriers')?carrierSequence:route.filter(v=>carrierSequence.includes(v));
 const directions=route.includes('mainland-both')?[outbound,returning]:[route.find(v=>v===outbound||v===returning)||''];
 const backbone=route.find(v=>v.startsWith('net-'));
 return plan=>{
  const evidence={measured:'sourceMeasured',claimed:'sourceOfficial',reported:'sourceReported'}[sourceMode];
  return routeObservations(plan).some(rows=>{
   if(evidence&&rows[0].evidence!==evidence)return false;
   const perCarrier=c=>directions.every(d=>rows.some(row=>(!c||row.carrier===c)&&(!d||row.direction===d)&&(!backbone||row.paths.includes(backbone))));
   if(!carriers.length&&directions.length===2)return carrierSequence.some(perCarrier);
   return (carriers.length?carriers:['']).every(perCarrier);
  });
 };
}
function displayRouteProof(out,plan){
 const observations=routeObservations(plan);if(!observations.length)return;
 const section=el('section',null,'route-proof');section.append(el('h3',quickWord('routeProof')));
 for(const rows of observations){
  const observation=rows[0],scope=Object.hasOwn(ROUTE_LABELS,observation.scope)?quickWord(observation.scope):observation.scope,caption=[quickWord(observation.evidence),scope,observation.date].filter(Boolean).join(' · ');
  const table=el('table',null,'route-table'),head=table.createTHead().insertRow(),body=table.createTBody();
 const directions=[outbound,returning,anyDirection].filter(d=>rows.some(row=>row.direction===d));
 [quickWord('route'),...directions.map(d=>quickWord(d===anyDirection?'routeGeneral':d))].forEach(t=>{const h=el('th',t);h.scope='col';head.append(h)});
 for(const c of [...carrierSequence,''].filter(k=>rows.some(r=>r.carrier===k))){
  const row=body.insertRow(),h=el('th',quickWord(c||'routeUnknownCarrier'));h.scope='row';row.append(h);
  for(const d of directions){
   const hits=rows.filter(r=>r.carrier===c&&r.direction===d),keys=[...new Set(hits.flatMap(r=>r.paths))];
   const visible=displayBackbones(keys);
   row.append(el('td',visible.length?visible.map(routePathLabel).join(' / '):hits.length?quickWord('routeUnknownHop'):'—'));
  }
 }
 const wrap=el('div',null,'route-table-wrap');wrap.append(table);section.append(wrap);
 if(observation.source)section.append(link(caption+' ↗',observation.source,'route-citation'));else section.append(el('small',caption));
 }
 out.append(section);
}
