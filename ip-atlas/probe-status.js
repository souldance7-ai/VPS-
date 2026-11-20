'use strict';
const probePanelWords={
 probeDashboard:['后台采集状态','背景採集狀態','Background monitor','バックグラウンド収集'],
 probeStatusLoading:['正在读取后台采集记录…','正在讀取背景採集紀錄…','Reading monitor records…','収集記録を読み込み中…'],
 probeStatusDown:['暂时无法取得后台记录。可打开健康接口查看返回结果。','暫時無法取得背景紀錄。可開啟健康介面查看回傳結果。','Monitor data is unavailable. Open the health endpoint to inspect its response.','収集記録を取得できません。ヘルス API の応答を確認できます。'],
 probeCycle:['完整轮巡','完整輪巡','Full rotation','巡回間隔'],
 probeMinutes:['分钟','分鐘','min','分'],
 probeTargets:['监测方案','監測方案','Monitored targets','監視対象'],
 probeWindow:['统计时间窗','統計時間窗','Freshness window','集計時間幅'],
 probeStockFresh:['窗口内已查库存','時間窗內已查庫存','Stock checks in window','期間内に照会した在庫'],
 probeQuoteFresh:['窗口内取得报价','時間窗內取得報價','Quotes read in window','期間内に取得した価格'],
 probeMostRecent:['最近采集','最近採集','Last collection','直近の取得'],
 probeHealthLink:['查看原始记录','查看原始紀錄','View health data','API の応答を見る'],
 probeNoRead:['尚无读数','尚無讀數','No reading yet','未取得'],
 probeLegacy:['当前返回基础库存记录。价格与配置统计随新版采集器部署生效。','目前回傳基礎庫存紀錄。價格與規格統計隨新版採集器部署生效。','The active monitor reports stock. Quote coverage appears when the updated collector is deployed.','現在の収集器は在庫を報告しています。更新版の導入後に価格の集計も表示します。']
};
for(const [key,variants] of Object.entries(probePanelWords))editionLangs.forEach((locale,i)=>WORDS[locale][key]=variants[i]);
const healthPanel=document.getElementById('probe-status'),healthBody=document.getElementById('probe-status-data');
let healthTimer=null,healthCtrl=null,healthRecord=null;
function paintHealth(){
 if(!healthRecord){healthBody.textContent=tr('probeStatusLoading');return}
 if(!healthRecord.installed){healthBody.textContent=tr('probeStatusDown');return}
 const r=healthRecord,modern=r.schemaVersion===10;
 const list=el('dl',null,'probe-metrics');
 const measures=[['probeTargets',r.targetCount],['probeCycle',r.periodMinutes+' '+tr('probeMinutes')]];
 if(modern)measures.push(['probeWindow',r.freshWithinMinutes+' '+tr('probeMinutes')],['probeStockFresh',r.stockChecksFresh+' / '+r.stockTargetCount],['probeQuoteFresh',r.quoteFresh+' / '+r.quoteTargetCount]);
 measures.push(['probeMostRecent',Number.isFinite(Date.parse(r.lastCheckedAt))?new Date(r.lastCheckedAt).toLocaleString(tags[lang],{hour12:false}):tr('probeNoRead')]);
 for(const [key,value] of measures){const cell=el('div');cell.append(el('dt',tr(key)),el('dd',value));list.append(cell)}
 healthBody.replaceChildren(list);if(!modern)healthBody.append(el('small',tr('probeLegacy')));
}
function shouldReadHealth(){return healthPanel.open&&document.body.dataset.book==='offers'&&!document.hidden}
async function refreshHealth(){
 clearTimeout(healthTimer);
 if(!shouldReadHealth()){healthCtrl?.abort();healthCtrl=null;return}
 if(healthCtrl)return;
 const ctrl=new AbortController();healthCtrl=ctrl;
 const timeout=setTimeout(()=>ctrl.abort(),9000);
 try{
  const result=await fetch('/api/stock-history/health',{signal:ctrl.signal,cache:'no-store'});
  if(!result.ok)throw Error('http');
  const data=await result.json();
  if(healthCtrl===ctrl)healthRecord=data?.installed&&Number.isInteger(data.targetCount)?data:{installed:false};
 }catch{if(healthCtrl===ctrl)healthRecord={installed:false}}
 finally{
  clearTimeout(timeout);if(healthCtrl===ctrl){healthCtrl=null;if(shouldReadHealth()){paintHealth();healthTimer=setTimeout(refreshHealth,120000)}}
 }
}
healthPanel.addEventListener('toggle',refreshHealth);
document.addEventListener('visibilitychange',refreshHealth);
new MutationObserver(refreshHealth).observe(document.body,{attributes:true,attributeFilter:['data-book']});
