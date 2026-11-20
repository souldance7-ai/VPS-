'use strict';
const greenCloudPriceCache = new Map();
const greenCloudPriceCopy = {
 loading:['正在读取商家周期价格…','正在讀取商家週期價格…','Checking merchant billing rates…','事業者の支払周期別料金を取得中…'],
 stored:['显示最近收录的报价','顯示最近收錄的報價','Showing recorded prices','記録済みの料金を表示'],
 live:['商家周期报价','商家週期報價','Merchant rates checked','公式料金の確認日時'],
 partial:['部分周期使用已收录报价','部分週期使用已收錄報價','Some terms use recorded prices','一部の周期は記録済み料金を表示'],
 removed:['此付款周期已停止提供','此付款週期已停止提供','This billing cycle is no longer offered','この支払周期の提供は終了しました']
};
function greenCloudPriceWord(key){return greenCloudPriceCopy[key][editionLangs.indexOf(lang)] || greenCloudPriceCopy[key][2];}
function greenCloudSkuPid(plan,spec){return plan.provider==='GreenCloud' ? Number(spec?.pid || plan.officialProductId) : 0;}
function greenCloudDisplayedPid(plan){return greenCloudSkuPid(plan,billingTierForDisplay(plan));}
function greenCloudKnownRates(plan,spec,initial) {
 const pid=greenCloudSkuPid(plan,spec),cache=greenCloudPriceCache.get(pid);
 if(!cache?.data || cache.expires<=Date.now())return initial;
 const byTerm=new Map(initial.map(rate=>[rate.term,rate]));
 for(const term of billingTerms){
  const live=cache.data.rates[term];
  if(live?.state==='not-offered'){byTerm.delete(term);continue;}
  if(live?.state!=='priced' || live.currency!=='USD' || !/^\d+(?:\.\d{2})$/.test(live.price))continue;
  byTerm.set(term,{term,price:live.price,currency:'USD',proof:greenCloudOfficialRateUrl(pid,term),date:cache.data.checkedAt,priceType:spec.priceType,url:byTerm.get(term)?.url || spec.url || plan.url});
 }
 return billingTerms.map(term=>byTerm.get(term)).filter(Boolean);
}
function greenCloudOfficialRateUrl(pid,term){
 const cycle={month:'monthly',quarter:'quarterly',halfyear:'semiannually',year:'annually'}[term];
 return 'https://greencloudvps.com/billing/feeds/productsinfo.php?pid='+pid+'&get=price&billingcycle='+cycle+'&currency=1';
}
async function greenCloudPrices(pid) {
 const cached=greenCloudPriceCache.get(pid);
 if(cached && cached.expires>Date.now())return cached.promise;
 const pending=fetch('/api/greencloud-prices/'+pid,{headers:{accept:'application/json'},signal:AbortSignal.timeout(9000)})
  .then(async response=>{
   if(!response.ok || !(response.headers.get('content-type')||'').includes('application/json'))return null;
   const data=await response.json(),age=Date.now()-Date.parse(data.checkedAt);
   if(data.pid!==pid || !data.rates || !Number.isFinite(age) || age>900000 || age < -60000)return null;
   return data;
  }).catch(()=>null);
 const entry={promise:pending,expires:Date.now()+10000};
 greenCloudPriceCache.set(pid,entry);
 const data=await pending;
 entry.data=data;
 entry.expires=data ? Math.min(Date.now()+900000,Date.parse(data.checkedAt)+Math.min(Number(data.refreshSeconds)||60,900)*1000) : Date.now()+30000;
 return data;
}
function appendGreenCloudQuotePanel(body,plan,shownSpec) {
 const pid=greenCloudDisplayedPid(plan);
 if(!pid || !Number.isSafeInteger(pid))return false;
 const selected=billingSelection(),term=selected || shownSpec.term;
 const panel=el('div',null,'greencloud-quote-panel');
 const table=el('div'),status=el('small',greenCloudPriceWord('loading'),'spec-date');
 panel.append(table,status);body.append(panel);
 const previous=billingOptionsForPlan(plan);
 appendBillingRates(table,plan,previous,true);
 greenCloudPrices(pid).then(data=>{
  if(!panel.isConnected || modal!==plan || billingSelection()!==selected || greenCloudDisplayedPid(plan)!==pid || !$('drawer').open)return;
  if(!data){status.textContent=greenCloudPriceWord('stored');return;}
  const byTerm=new Map(greenCloudKnownRates(plan,billingTierForDisplay(plan),previous).map(rate=>[rate.term,rate]));
  let checked=0;
  for(const name of billingTerms){
   const live=data.rates[name];
   if(live?.state==='not-offered' || (live?.state==='priced' && byTerm.has(name)))checked++;
  }
  if(!checked){status.textContent=greenCloudPriceWord('stored');return;}
  table.replaceChildren();
  appendBillingRates(table,plan,billingTerms.map(name=>byTerm.get(name)).filter(Boolean),true);
  const headline=body.querySelector('.purchase-rate');
  if(headline && data.rates[term]?.state==='not-offered'){headline.textContent=greenCloudPriceWord('removed');body.querySelector('.offer-condition')?.remove();}
  else if(headline && data.rates[term]?.state==='priced' && byTerm.has(term))headline.textContent=priceText(plan,{...shownSpec,...byTerm.get(term)});
  status.textContent=greenCloudPriceWord(checked===billingTerms.length?'live':'partial')+' · '+new Intl.DateTimeFormat(tags[lang],{dateStyle:'short',timeStyle:'short'}).format(new Date(data.checkedAt));
 });
 return true;
}
