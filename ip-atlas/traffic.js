'use strict';

const trafficLabels={
 trafficTitle:['网站访问','網站訪問','Site traffic','サイトのアクセス'],
 trafficOnline:['近 5 分钟在线','近 5 分鐘在線','Active in the last 5 min','直近5分の利用者'],
 trafficViews:['累计浏览人次','累計瀏覽人次','Total pageviews','累計閲覧数'],
 trafficVisitors:['累计访客','累計訪客','Unique browsers','累計ブラウザー数'],
 trafficToday:['今日浏览人次','今日瀏覽人次','Pageviews today','本日の閲覧数'],
 trafficAbout:['按匿名浏览器去重。今日按 UTC+8 计算。','按匿名瀏覽器去重。今日按 UTC+8 計算。','Visitors are counted per anonymous browser. Today uses UTC+8.','匿名のブラウザー単位で計測。本日は UTC+8 基準。'],
 trafficSince:['开始统计','開始統計','Counting since','計測開始'],
 trafficUnavailable:['统计暂时无法读取','統計暫時無法讀取','Traffic data unavailable','アクセス統計を取得できません']
};
for(const [key,labels] of Object.entries(trafficLabels))editionLangs.forEach((locale,i)=>WORDS[locale][key]=labels[i]);

function startTraffic(){
 if(location.hostname!=='ip-guide.pitopone.com'||!crypto.randomUUID)return;
 let visitor;
 const storageKey='atlas.traffic.visitor';
 try{
  let stored=localStorage.getItem(storageKey);
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(stored||'')){
   stored=crypto.randomUUID();
   localStorage.setItem(storageKey,stored);
  }
  visitor=stored;
 }catch{}
 let latest=null,section='',view=null,sequence=0,timer;
 const metrics=['online','pageviews','visitors','todayPageviews'];
 const note=$('traffic-note');
 function paint(){
  for(const key of metrics){
   $('traffic-'+key).textContent=Number.isSafeInteger(latest?.[key])?latest[key].toLocaleString(tags[lang]):'—';
  }
  note.textContent=latest?tr('trafficSince')+' '+new Intl.DateTimeFormat(tags[lang],{dateStyle:'medium',timeZone:'Asia/Taipei'}).format(new Date(latest.countedSince)):tr('trafficUnavailable');
 }
 async function send(trackView=false){
  clearTimeout(timer);
  if(document.hidden)return;
  const current=++sequence;
  if(trackView){
   const next=document.body.dataset.book||'top';
   if(next!==section){section=next;view=crypto.randomUUID()}
  }
  const pending=view;
  try{
   const response=await fetch(visitor?'/api/traffic/event':'/api/traffic/stats',visitor?{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor,view:pending}),signal:AbortSignal.timeout(6500)
   }:{signal:AbortSignal.timeout(6500)});
   if(!response.ok)throw Error('traffic request');
   const data=await response.json();
   if(!metrics.every(key=>Number.isSafeInteger(data[key])&&data[key]>=0)||!Number.isFinite(Date.parse(data.countedSince)))throw Error('traffic data');
   if(view===pending)view=null;
   if(current===sequence){latest=data;paint()}
  }catch{
   if(current===sequence){latest=null;paint()}
  }finally{
   if(current===sequence&&!document.hidden)timer=setTimeout(send,120_000);
  }
 }
 const observe=new MutationObserver(()=>{if((document.body.dataset.book||'top')!==section)send(true)});
 observe.observe(document.body,{attributes:true,attributeFilter:['data-book']});
 document.addEventListener('visibilitychange',()=>send(true));
 $('language').addEventListener('change',paint);
 send(true);
}
document.addEventListener('DOMContentLoaded',startTraffic);
