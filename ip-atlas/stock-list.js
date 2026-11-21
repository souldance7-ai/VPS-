'use strict';
const stockListCache=new Map();
let endStockList=null;
function refreshStockList(){
 endStockList?.();endStockList=null;
 const listing=document.getElementById('listing'),filter=document.getElementById('buy-filter'),drawer=document.getElementById('drawer');
 if(!listing||!filter)return;
 listing.querySelectorAll('.stock-list').forEach(n=>n.remove());
 if(document.body.dataset.book!=='directory'||document.hidden||drawer?.open)return;
 const plans=new Map(PLANS.map(p=>[p.id,p])),states=new Map(),visible=new Set();
 let live=true,active=0,timer;
 function draw(row,state,time,offer){
  if(row.drawn===state&&row.time===time&&row.offer===offer)return;row.offer=offer;
  row.drawn=state;row.time=time;row.output.replaceChildren();row.output.dataset.stockState=state;
  paintCommerceStock(row.card.querySelector('.commerce-stock'),row.p,{state,checkedAt:time,source:row.target.url,quantity:goodQuote(offer)?offer.stockQuantity:null},row.target);
  const cpu=row.card.querySelector('.cpu-summary');
  if(cpu){
   const belongsToTier=!(row.p.spec?.tiers?.length>1)||stockCpuMatchesTier(row.p,row.target);
   const model=belongsToTier&&goodQuote(offer)?readCpuModel(offer,{source:row.target.priceUrl||row.target.url,date:offer.checkedAt,live:true}):null;
   paintCpuSummary(cpu,row.p,model);
  }
  const rate=stockQuoteForTerm(offer,commerceTerm());
  if(rate){
   row.output.dataset.commerceQuote='';row.output.append(el('strong',offerPrice(rate)));
   appendFx(row.output,rate.amount,rate.currency);
   row.output.append(link(offerText('source'),row.target.priceUrl||row.target.url));
  }
 }
 for(const card of listing.querySelectorAll('.record')){
  const p=plans.get(card.querySelector('.pick[data-id]')?.dataset.id);
  const key=p&&observationKey(p),target=key&&stockTarget(key);
  if(!target)continue;
  const output=el('div',null,'stock-list');card.append(output);
  const row={card,p,key,target,output,ctrl:null};states.set(card,row);draw(row,location.protocol==='file:'?'local':'loading');
 }
 if(!states.size||location.protocol==='file:')return;
 function stop(){
  live=false;clearTimeout(timer);observer.disconnect();
  for(const row of states.values())row.ctrl?.abort();
 }
 function pump(){
  clearTimeout(timer);if(!live)return;
  let next=Infinity;
  for(const row of visible){
   const result=stockListCache.get(row.key),now=Date.now();
   if(result&&result.expires>now){
    draw(row,result.state,result.time,result.offer);next=Math.min(next,result.expires);continue;
   }
   if(active<3&&!row.ctrl)read(row);
  }
  if(Number.isFinite(next))timer=setTimeout(pump,Math.max(1,next-Date.now()));
 }
 async function read(row){
  const ctrl=new AbortController();row.ctrl=ctrl;active++;
  draw(row,'loading');const timeout=setTimeout(()=>ctrl.abort('timeout'),15000);
  try{
   const data=await readStockObservation(row.key,row.target,ctrl.signal);
   if(!live||ctrl.signal.aborted||!visible.has(row))return;
   const time=Date.parse(data.checkedAt),now=Date.now();
   if(!row.target.quoteOnly&&['in-stock','sold-out','low'].includes(data.state))commerceLastReadings.set(row.p.id,{state:data.state,checkedAt:data.checkedAt,source:row.target.url,quantity:goodQuote(data.offer)?data.offer.stockQuantity:null});
   const expires=data.state==='offline'?now+25000:Math.min(now+120000,Math.max(now+10000,time+120000));
   stockListCache.set(row.key,{state:data.state,time,expires,offer:data.offer});
  }catch{
   if(live&&visible.has(row)&&(!ctrl.signal.aborted||ctrl.signal.reason==='timeout'))stockListCache.set(row.key,{state:'offline',expires:Date.now()+25000});
  }finally{clearTimeout(timeout);row.ctrl=null;active--;if(live)pump()}
 }
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   const row=states.get(entry.target);if(!row)continue;
   if(entry.isIntersecting)visible.add(row);
   else{visible.delete(row);row.ctrl?.abort('offscreen')}
  }
  pump();
 });
 endStockList=stop;for(const card of states.keys())observer.observe(card);
}
const stockListVisibility=new MutationObserver(refreshStockList);
stockListVisibility.observe(document.body,{attributes:true,attributeFilter:['data-book']});
const stockListDrawer=document.getElementById('drawer');
if(stockListDrawer)stockListVisibility.observe(stockListDrawer,{attributes:true,attributeFilter:['open']});
document.addEventListener('visibilitychange',refreshStockList);
