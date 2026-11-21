'use strict';

const fxWords = {
 date:['汇率','匯率','FX','為替'],
 about:[
  '人民币与美元为按前一日中间汇率折算的参考价。休市沿用最近公布日，以单笔报价旁的日期为准。',
  '人民幣與美元為按前一日中間匯率換算的參考價。休市沿用最近公布日，以各報價旁的日期為準。',
  'CNY and USD estimates use the previous day’s mid-market rate or the latest published rate on holidays. The rate date appears beside each quote.',
  '人民元・米ドルは前日の仲値による参考額です。休場日は直近の公表値を使用し、適用日は各料金の横に表示します。'
 ],
 unavailable:[
  '暂未取得参考汇率，报价以原币显示。',
  '暫未取得參考匯率，報價以原幣顯示。',
  'Exchange rates are unavailable. Prices are shown in their original currencies.',
  '為替レートを取得できません。元の通貨で表示しています。'
 ]
};
const fxProvider='https://frankfurter.dev/#are-rates-mid-bid-or-ask';
let fxData=null;
let fxTimer;
let fxPending=false;
let fxFailed=false;

function fxWord(key){return fxWords[key][editionLangs.indexOf(lang)] || fxWords[key][2]}
function fxAmount(raw){
 if(typeof raw==='number')return Number.isFinite(raw)&&raw>=0?raw:null;
 if(typeof raw!=='string'||!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(raw.trim()))return null;
 const value=Number(raw.replaceAll(',',''));
 return Number.isFinite(value)?value:null;
}
function fxRateDate(){
 return new Date(Date.now()+8*3_600_000-86_400_000).toISOString().slice(0,10);
}
function fxFormat(amount){
 return amount.toLocaleString(tags[lang],{minimumFractionDigits:2,maximumFractionDigits:amount>0&&amount<0.1?4:2});
}
function paintFxAmount(node){
 const currency=node.dataset.fxCurrency, amount=Number(node.dataset.fxAmount);
 const rate=fxData?.rates[currency];
 node.hidden=!rate;
 node.replaceChildren();
 if(!rate)return;
 const parts=[];
 if(currency!=='CNY')parts.push('CNY '+fxFormat(amount*rate.cny));
 if(currency!=='USD')parts.push('USD '+fxFormat(amount*rate.usd));
 const date=el('time',fxWord('date')+' '+rate.date,'fx-date');
 date.dateTime=rate.date;
 node.append(el('span','≈ '+parts.join(' · '),'fx-values'),date);
}
function appendFx(parent,raw,currency){
 const amount=fxAmount(raw);
 if(amount===null||typeof currency!=='string'||!/^[A-Z]{3}$/.test(currency))return;
 const node=el('small',null,'fx-conversion');
 node.dataset.fxAmount=amount;
 node.dataset.fxCurrency=currency;
 paintFxAmount(node);
 parent.append(node);
 return node;
}
function paintFx(){
 for(const node of document.querySelectorAll('.fx-conversion'))paintFxAmount(node);
 const note=$('fx-status');
 if(!note)return;
 note.replaceChildren(fxWord(fxFailed&&!fxData?'unavailable':'about'),' ',link('Frankfurter ↗',fxProvider));
}
async function fetchFx(){
 if(fxPending||location.protocol==='file:')return;
 fxPending=true;
 clearTimeout(fxTimer);
 try{
  const response=await fetch('/api/fx',{cache:'no-store',signal:AbortSignal.timeout(9000)});
  if(!response.ok)throw Error('FX response');
  const data=await response.json(),yesterday=fxRateDate();
  if(data.requestedDate!==yesterday||!data.rates?.CNY||!data.rates?.USD)throw Error('FX date');
  const rates=Object.fromEntries(Object.entries(data.rates).filter(([code,rate])=>/^[A-Z]{3}$/.test(code)&&
   rate&&/^\d{4}-\d{2}-\d{2}$/.test(rate.date)&&rate.date<=yesterday&&Number.isFinite(rate.cny)&&rate.cny>0&&Number.isFinite(rate.usd)&&rate.usd>0));
  if(!rates.CNY||!rates.USD)throw Error('FX coverage');
  fxData={requestedDate:yesterday,rates};
  fxFailed=false;
 }catch{
  if(fxData?.requestedDate!==fxRateDate())fxData=null;
  fxFailed=true;
 }finally{
  fxPending=false;
  paintFx();
  const midnight=86_400_000-(Date.now()+8*3_600_000)%86_400_000;
  fxTimer=setTimeout(fetchFx,Math.min(midnight,fxFailed?180_000:900_000));
 }
}
document.addEventListener('DOMContentLoaded',()=>{
 paintFx();
 fetchFx();
 $('language').addEventListener('change',paintFx);
 document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&fxData?.requestedDate!==fxRateDate())fetchFx();
 });
});
