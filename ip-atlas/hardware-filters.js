'use strict';

const hardwareFilterLabels={
 portMin:['最低端口速率','最低網路埠速','Minimum port speed','最低回線速度'],
 trafficMin:['最低流量额度','最低流量額度','Minimum transfer','最低転送量'],
 unlimitedTraffic:['不限流量','不限流量','Unmetered transfer','転送量無制限'],
 cpuQueryHint:['例如 9950X、EPYC 7V13','例如 9950X、EPYC 7V13','e.g. 9950X, EPYC 7V13','例 9950X、EPYC 7V13'],
 hardwareOrder:['端口、流量与 CPU','埠速、流量與 CPU','Port, transfer and CPU','回線・転送量・CPU'],
 priceOrder:['价格','價格','Price','料金'],
 portAsc:['端口速率 ↑','網路埠速 ↑','Port speed ↑','回線速度 ↑'],
 portDesc:['端口速率 ↓','網路埠速 ↓','Port speed ↓','回線速度 ↓'],
 trafficAsc:['流量额度 ↑','流量額度 ↑','Transfer allowance ↑','転送量 ↑'],
 trafficDesc:['流量额度 ↓','流量額度 ↓','Transfer allowance ↓','転送量 ↓'],
 coresAsc:['核心 / vCPU 数 ↑','核心 / vCPU 數 ↑','Core / vCPU count ↑','コア・vCPU 数 ↑'],
 coresDesc:['核心 / vCPU 数 ↓','核心 / vCPU 數 ↓','Core / vCPU count ↓','コア・vCPU 数 ↓'],
 modelAsc:['CPU 型号 / 系列 A–Z','CPU 型號 / 系列 A–Z','CPU model / family A–Z','CPU 型番・シリーズ A–Z'],
 modelDesc:['CPU 型号 / 系列 Z–A','CPU 型號 / 系列 Z–A','CPU model / family Z–A','CPU 型番・シリーズ Z–A'],
 portOrderHint:[
  '按较高的公开单端口速率比较。卡片保留商家标示的端口数、上下行和适用条件。',
  '依較高的公開單埠速率比較。卡片保留商家標示的埠數、上下行和適用條件。',
  'Compares the highest listed speed per port. Cards retain port counts, directions and conditions.',
  '公表されている単一ポートの最高速度で比較します。ポート数、上下方向、条件はカードで確認できます。'
 ],
 trafficOrderHint:[
  '按标示的流量额度比较。范围取下限，有高速额度时采用该数值。周期见方案详情。',
  '依標示的流量額度比較。範圍取下限，有高速額度時採用該數值。週期請見方案詳情。',
  'Compares the listed allowance, using the lower end of ranges and any high-speed quota. See the plan for the period.',
  '公表の転送量で比較します。範囲は下限を、高速転送の上限があればその値を使用します。適用期間はプランを確認してください。'
 ],
 hardwareUnknownLast:['未公布该项的方案列在最后。','未公布該項的方案列在最後。','Plans with no listed value appear last.','この項目が非公開のプランは末尾に表示します。']
};
for(const [key,labels] of Object.entries(hardwareFilterLabels))editionLangs.forEach((language,i)=>WORDS[language][key]=labels[i]);

const hardwareFilterFields=['port-min','traffic-min','cpu-query'];
const hardwareOrderMetrics={port:'portOrderHint',traffic:'trafficOrderHint',cores:'',model:''};
const hardwareOrderKeys=Object.keys(hardwareOrderMetrics).flatMap(key=>[key+'-asc',key+'-desc']);
const hardwareSpecMetrics=new WeakMap();
let directoryHardwareQuery=null;

function specText(value){
 const text=value&&typeof value==='object'?value.en||value.sc||value.tc||value.ja:value;
 return typeof text==='string'?text.normalize('NFKC').replace(/(?<=\d),(?=\d{3}(?:\D|$))/g,'')
  .replace(/[–—−~〜]/g,'-').trim():'';
}

function listedPortSpeed(spec){
 const factors={K:0.001,M:1,G:1000,T:1000000};
 const rates=[];
 for(const field of ['port','downlink','uplink']){
  const text=specText(spec[field]);
  for(const [,numbers,unit] of text.matchAll(/(\d+(?:\.\d+)?(?:\s*[-/]\s*\d+(?:\.\d+)?)*)\s*([KMGT])\s*(?:bps|b\s*\/\s*s|bits?(?:\s*\/\s*s)?)\b/gi)){
   for(const amount of numbers.match(/\d+(?:\.\d+)?/g))rates.push(Number(amount)*factors[unit.toUpperCase()]);
  }
 }
 return rates.length?Math.max(...rates):null;
}

function listedTransfer(value,source){
 let text=specText(value);
 if(/^https:\/\/(?:www\.)?serverfield\.com\.tw\//i.test(source||'')){
  text=text.replace(/\b[1-9]\d{0,2}(?:\.\d{3})+(?=\s*GB\b)/gi,group=>group.replaceAll('.',''));
 }
 const factors={K:0.000001,M:0.001,G:1,T:1000,P:1000000};
 const binary={K:2**10/1e9,M:2**20/1e9,G:2**30/1e9,T:2**40/1e9,P:2**50/1e9};
 const amounts=[];
 for(const [,numbers,unit,suffix] of text.matchAll(/(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)*)\s*([KMGTP])(i?B)?(?![a-z0-9]|\s*\/\s*s\b)/gi)){
  const multiplier=(suffix?.toLowerCase()==='ib'?binary:factors)[unit.toUpperCase()];
  for(const amount of numbers.match(/\d+(?:\.\d+)?/g))amounts.push(Number(amount)*multiplier);
 }
 if(amounts.length)return Math.min(...amounts);
 return /(?:\b(?:unlimited|unmetered)(?![a-z])|不[限计計]|無制限|无限|∞)/i.test(text)?Infinity:null;
}

function listedCores(value){
 const found=specText(value).match(/(?<![\p{L}\p{N}.])(?:(\d+)\s*[x×]\s*(?=\d))?(\d+(?:\.\d+)?)(?:\s*-\s*\d+(?:\.\d+)?)?\s*(?:x\s*)?(?:(?:dedicated|shared|AMD|EPYC|Intel|Milan)\s+)*(?:vcpus?|ocpus?|cpus?|v?cores?|c\b|核(?:心)?|コア)(?![a-z0-9])/iu);
 return found?Number(found[2])*Number(found[1]||1):null;
}

function listedCpuNames(spec){
 const reported=readCpuModel(spec);
 if(reported)return reported.kind==='cpuModels'?spec.cpuModels.map(cpuText).filter(Boolean):[reported.value];
 return specText(spec.cpu).match(/\b(?:AMD\s+)?(?:EPYC(?:\s+[a-z]*\d[a-z0-9]{2,7})?|(?:Ryzen(?:\s+[3579])?|R[3579])\s+\d{4}[a-z0-9]*|[79][a-z]\d{2}|Atom\s+[a-z]?\d{4})\b/gi)||[];
}

function hardwareMetrics(spec){
 if(!spec)return null;
 let metrics=hardwareSpecMetrics.get(spec);
 if(!metrics){
  metrics={
   port:listedPortSpeed(spec),traffic:listedTransfer(spec.monthlyTraffic,spec.proof)??listedTransfer(spec.traffic,spec.proof),
   cores:listedCores(spec.cpu),names:listedCpuNames(spec)
  };
  hardwareSpecMetrics.set(spec,metrics);
 }
 return metrics;
}

function cpuSearchText(value){return value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'')}
function readHardwareQuery(){
 const minPort=Number($('port-min')?.value)||0,transfer=$('traffic-min')?.value;
 const minTraffic=transfer==='unmetered'?Infinity:Number(transfer)||0;
 const cpu=$('cpu-query')?.value.trim().split(/\s+/).map(cpuSearchText).filter(Boolean)||[];
 return minPort||minTraffic||cpu.length?{minPort,minTraffic,cpu}:null;
}
function matchesDirectoryHardware(spec,query=directoryHardwareQuery){
 if(!query)return true;
 const info=hardwareMetrics(spec);
 if(!info)return false;
 if(query.minPort&&(info.port===null||info.port<query.minPort))return false;
 if(query.minTraffic&&(info.traffic===null||info.traffic<query.minTraffic))return false;
 return !query.cpu.length||info.names.some(name=>{
  const folded=cpuSearchText(name);
  return query.cpu.every(token=>folded.includes(token));
 });
}
function renderCpuModelChoices(){
 const options=$('cpu-model-choices');
 if(!options)return;
 const names=new Map();
 for(const plan of PLANS){
  for(const spec of billingTiers(plan)){
   for(const name of hardwareMetrics(spec)?.names||[])names.set(cpuSearchText(name),name);
  }
 }
 const collator=new Intl.Collator(tags[lang],{numeric:true,sensitivity:'base'});
 options.replaceChildren(...[...names.values()].sort(collator.compare).map(name=>new Option(name,name)));
}

function compareHardware(order){
 if(!hardwareOrderKeys.includes(order))return null;
 const [key,direction]=order.split('-'),factor=direction==='desc'?-1:1;
 const collator=key==='model'?new Intl.Collator(tags[lang],{numeric:true,sensitivity:'base'}):null;
 const values=new Map();
 function value(plan){
  if(!values.has(plan)){
   const info=hardwareMetrics(billingTierForDisplay(plan));
   values.set(plan,key==='model'?info?.names[0]||null:info?.[key]??null);
  }
  return values.get(plan);
 }
 return (a,b)=>{
  const first=value(a),second=value(b);
  if(first===null||second===null)return Number(first===null)-Number(second===null);
  if(collator)return factor*collator.compare(first,second);
  return first===second?0:factor*(first<second?-1:1);
 };
}

function hardwareOrderNote(order){
 const key=hardwareOrderMetrics[order.split('-')[0]];
 return (key?tr(key)+' ':'')+tr('hardwareUnknownLast');
}
