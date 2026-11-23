'use strict';

// Report IDs and sample names come from the linked reviews.
const benchmarkRecords=[
 {provider:'VPS.Taxi',market:'LAX',planId:'taxi-lax',planNames:['LA 512M'],sample:'LA 512M',
  reports:[
   ['NQ','ICTNuAX4PRIQ98oDC0zLHDGN1SeuYTk6','https://www.nodeseek.com/post-979285-1'],
   ['TQ','9rC2rFgBvt','https://www.nodeseek.com/post-979285-1'],
   ['TQ','kkhj4seN_y','https://www.nodeseek.com/post-978599-1','2026-10-12']
  ]},
 {provider:'BandwagonHost',market:'HK',idPrefix:'ms-bwh-hk-8-',sample:'HK8 · Hong Kong CN2 GIA',reference:true,
  reports:[
   ['NQ','O2ifLGqSgqBXr1h1A4BR7Pp9FJLPslRJ','https://www.nodeseek.com/post-867503-1'],
   ['TQ','21LxHX9-mY','https://www.nodeseek.com/post-867503-1']
  ]},
 {provider:'TCSCloud',market:'TW',planNames:['Taipei Premium','TPE-P1 B','TPE-P Lite'],sample:'Taipei Premium',reference:true,
  reports:[
   ['NQ','Py8pRBvUi8Sa3Yq7Au474mcDraBvQkrf','https://www.nodeseek.com/post-853181-1'],
   ['TQ','o-4nD_xm8S','https://www.nodeseek.com/post-853181-1']
  ]},
 {provider:'VMISS',market:'LAX',planNames:['US.LA.9929.Basic'],sample:'US.LA.9929.Basic',
  reports:[['NQ','1uJIpKExtUwtd6jXta1pbMX8STz1ALwh','https://www.nodeseek.com/post-1070370-1','2026-11-21']]},
 {provider:'RFCHOST',market:'HK',planNames:['HK-CO-Mini'],sample:'HK-CO-Mini',
  reports:[
   ['NQ','PoPfjF4tgkMyAskKY4yMMtc0C9g15pWo','https://www.nodeseek.com/post-593718-1'],
   ['NQ','yl1ZJvpsSEeF79KUhEBPitpWijoXEnB6','https://www.nodeseek.com/post-614920-1']
  ]},
 {provider:'RFCHOST',market:'HK',planNames:['HK-CO-Pro'],sample:'HK-CO-Pro · 4 vCPU / 3.8 GiB RAM / 60 GiB',
  forumReview:['NodeLoc','https://www.nodeloc.com/t/topic/77473','2026-02-12']},
 {provider:'PortChannel',market:'CN',planId:'portchannel-gz-5',sample:'Guangzhou LARGE · 2 vCPU / 4 GB / 1 Gbps',
  forumReview:['NodeSeek','https://www.nodeseek.com/post-491877-1']},
 {provider:'Servitro',market:'DE',planId:'let11-servitro-virtual-servers-virtual-1',sample:'Virtual-1 · EPYC 7443P',
  forumReview:['LowEndTalk','https://lowendtalk.com/discussion/217330/servitro-90-cpu-steal-kernel-soft-lockups-36-mb-s-sequential']}
];

const benchmarkHosts={NQ:'nodequality.com',TQ:'tcpquality.ibsgss.uk'};
function benchmarkLink(raw){
 if(typeof raw!=='string'||!raw.startsWith('https://')||raw.length>180)return null;
 try{
  const url=new URL(raw),type=Object.keys(benchmarkHosts).find(key=>benchmarkHosts[key]===url.host);
  const path=url.pathname.match(/^\/r\/([A-Za-z0-9_.-]{4,128})\/?$/);
  if(!type||!path||url.username||url.password||url.search||url.hash||/\.(?:png|jpe?g|webp|svg|json|csv|zip)$/i.test(path[1]))return null;
  return {type,url:`https://${benchmarkHosts[type]}/r/${path[1]}`};
 }catch{return null}
}
function benchmarkForPlan(p){
 const planLabels=[p.plan,p.plan?.en,p.sku,p.spec?.sku];
 const tiered=Boolean(p.spec?.tiers?.length);
 const activeLabels=tiered?[billingTierForDisplay(p)?.sku]:planLabels;
 const normalized=new Set(activeLabels.filter(s=>typeof s==='string').map(norm));
 const series=new Set(planLabels.filter(s=>typeof s==='string').map(norm));
 return benchmarkRecords.filter(r=>{
  if(norm(r.provider)!==norm(p.provider)||r.market!==p.market)return false;
  if(r.planId&&r.planId!==p.id)return false;
  if(r.idPrefix&&!p.id?.startsWith(r.idPrefix))return false;
  if(r.planNames)return r.planNames.some(name=>normalized.has(norm(name))||(r.reference&&series.has(norm(name))));
  return Boolean(r.planId||r.idPrefix);
 });
}
function benchmarkReportURL(type,id){return benchmarkLink(`https://${benchmarkHosts[type]}/r/${id}`)?.url;}
function benchmarkReportName(type){return type==='NQ'?'NodeQuality (NQ)':'TcpQuality (TQ)';}
function appendBenchmarksForReview(actions,post){
 const seen=new Set();
 for(const row of benchmarkRecords)for(const [type,id,source] of row.reports||[]){
  if(source!==post)continue;
  const url=benchmarkReportURL(type,id);if(!url||seen.has(url))continue;
  seen.add(url);actions.append(link(benchmarkReportName(type)+' ↗',url));
 }
}
