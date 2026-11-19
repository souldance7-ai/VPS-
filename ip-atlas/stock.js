const stockCities={
 LAX:['LAX','los-angeles-usa'],SEA:['SEA','seattle-usa'],TOR:['CA','toronto-canada'],
 AMS:['NL','amsterdam-netherlands'],FRA:['DE','frankfurt-germany'],LON:['GB','london-uk'],PAR:['FR','paris-france'],
 TPE:['TW','taipei-taiwan'],HKG:['HK','hong-kong'],TYO:['JP','tokyo-japan'],OSA:['JP','osaka-japan'],SEL:['KR','seoul-south-korea'],MNL:['PH','manila-philippines'],HAN:['VN','hanoi-vietnam'],SIN:['SG','singapore']
};
const ovhZones={CA:'bhs',FR:'gra',DE:'fra',GB:'lon'};
function stockTarget(key){
 const host=key.match(/^hh-([A-Z]{3})-([1-7])$/);
 if(host&&stockCities[host[1]]) return {family:'hosthink',sku:host[1]+'-'+host[2],zone:stockCities[host[1]][0],url:'https://www.hosthink.net/dedicated-servers/'+stockCities[host[1]][1]+'/'};
 if(key.startsWith('ovh-')&&Object.values(ovhZones).includes(key.slice(4))){
  const zone=key.slice(4),us=zone==='bhs',sku=us?'24sys02-v3-ca':'24sys02-v3',memory='ram-32g-ecc-2133',storage='softraid-2x512nvme';
  const params=new URLSearchParams({planCode:sku,datacenters:zone,memory,storage});
  return {family:'ovh',sku,zone,memory,storage,url:'https://api.'+(us?'us':'eu')+'.ovhcloud.com/1.0/dedicated/server/datacenter/availabilities?'+params};
 }
 if(['scw-fr-par-1','scw-nl-ams-1'].includes(key)){
  const zone=key.slice(4);return {family:'scw',sku:'DEV1-S',zone,url:'https://api.scaleway.com/instance/v1/zones/'+zone+'/products/servers/availability?per_page=100'}
 }
 const twSkus={'tcs-fh1':'FH1-HINET-500M','tcs-dh1':'DH1-HINET-500M','tcs-ds1':'DS1-SEEDNET-300M'};
 if(Object.hasOwn(twSkus,key))return {family:'tcs',sku:twSkus[key],zone:'TW',url:'https://billing.tcscloud.net/index.php?rp=/store/taiwan-vps-'+(key==='tcs-fh1'?'fixed':'dynamic')};
 const jpSkus={'boil-kddi':'1區 - 靜態 KDDI/au 1000Mbps VPS','boil-softbank':'2區 - SoftBank 100Mbps VPS'};
 if(Object.hasOwn(jpSkus,key))return {family:'boil',sku:jpSkus[key],zone:'JP',url:'https://cloud.boil.network/store/japan-shared-bandwidth'};
 if(key==='gc-sjc-vds2')return {family:'greencloud',sku:'EPYCVDSSJCVF-2',zone:'SJC',url:'https://www.greencloudvps.com/billing/store/epyc-nvme-kvm-vds/?language=english'};
 if(key==='wn-9754s')return {family:'webnx',sku:'EPYC 9754S · 256 GB / 25G',zone:'LAX',url:'https://clients.webnx.com/index.php?rp=/store/instant-provisioning-la'};
 if(key==='ph-argent')return {family:'pingheberg',sku:'VPS Argent',zone:'FR',url:'https://store.pingheberg.com/products/vps/vps-argent'};
 return null;
}
function getStockKey(p){
 const provider=p.provider.toLowerCase(),name=typeof p.plan==='string'?p.plan:(p.plan?.en||p.plan?.sc||'');
 const label=[p.sku,p.spec?.sku,p.specs?.sku,name].filter(s=>typeof s==='string').join(' ');
 if(provider==='hosthink'){
  const sku=label.match(/\b([A-Z]{3})-([1-7])\b/);
  if(sku&&stockCities[sku[1]]?.[0]===p.market)return 'hh-'+sku[0];
 }
 if(provider==='ovhcloud'&&ovhZones[p.market]&&(p.id==='ovh-bhs'||(label.includes('SYS-2 · '+ovhZones[p.market].toUpperCase()+' · 32 GB / 2 × 512 GB NVMe'))))return 'ovh-'+ovhZones[p.market];
 if(provider==='scaleway'&&/\bDEV1-S\b/i.test(label)&&((p.market==='FR'&&label.includes('FR-PAR-1'))||(p.market==='NL'&&label.includes('NL-AMS-1'))))return p.market==='FR'?'scw-fr-par-1':'scw-nl-ams-1';
 if(p.market==='TW'&&provider==='tcscloud'&&['tcs-fh1','tcs-dh1','tcs-ds1'].includes(p.id))return p.id;
 if(p.market==='JP'&&provider==='boilcloud'&&['boil-softbank','boil-kddi'].includes(p.id))return p.id;
 if(provider==='greencloud'&&p.market==='SJC'&&/\bEPYCVDSSJCVF-2\b/.test(label))return 'gc-sjc-vds2';
 if(p.id==='field-bef009937f16'&&provider==='webnx'&&p.market==='LAX')return 'wn-9754s';
 if(provider==='pingheberg'&&p.market==='FR'&&p.url?.replace(/\/$/,'')==='https://store.pingheberg.com/products/vps/vps-argent')return 'ph-argent';
 return '';
}
function hasStockProbe(p){return Boolean(getStockKey(p))}
const stockStrings={
 title:['交付库存','交付庫存','Deployment availability','在庫・提供状況'],
 loading:['正在查询商家库存…','正在查詢商家庫存…','Checking vendor inventory…','事業者の在庫を照会中…'],
 'in-stock':['商家显示有货','商家顯示有貨','In stock at the provider','事業者表示：在庫あり'],
 'sold-out':['商家显示缺货','商家顯示缺貨','Out of stock at the provider','事業者表示：在庫切れ'],
 low:['商家显示库存紧张','商家顯示庫存緊張','Limited stock at the provider','事業者表示：残りわずか'],
 unreported:['商家当前未列出这项配置的库存','商家目前未列出這項規格的庫存','The vendor has no stock status for this configuration','この構成の在庫表示はありません'],
 offline:['库存接口暂未响应','庫存介面暫未回應','Inventory feed unavailable','在庫サービスから応答がありません'],
 manual:['按机房和配置查看商家订购页','依機房和規格查看商家訂購頁','Choose the region and configuration at the provider','事業者の注文画面で拠点・構成を選択'],
 order:['商家订购信息 ↗','商家訂購資訊 ↗','Ordering information ↗','注文情報 ↗'],
 source:['库存来源 ↗','庫存來源 ↗','Inventory source ↗','在庫の出典 ↗'],
 refresh:['刷新库存','重新整理庫存','Refresh stock','在庫を更新'],
 observed:['读取时间','讀取時間','Observed','照会時刻'],
 interval:['详情打开时每 2 分钟刷新','詳情開啟時每 2 分鐘更新','Refreshes every 2 minutes while open','詳細表示中は2分ごとに更新'],
 local:['在部署后的网站查看自动库存','在部署後的網站查看自動庫存','Open the deployed site for live inventory','公開サイトで自動在庫照会を利用できます']
};
function stockText(key){return stockStrings[key][{sc:0,tc:1,en:2,ja:3}[lang]]}
async function readStockObservation(key,t,signal){
 const resp=await fetch('/api/stock/'+encodeURIComponent(key),{signal,cache:'no-store'});
 if(!resp.ok||!resp.headers.get('content-type')?.includes('application/json'))throw Error('endpoint');
 const data=await resp.json();
 const time=Date.parse(data.checkedAt),age=Date.now()-time;
 if(data.key!==key||data.sku!==t.sku||data.zone!==t.zone||!Number.isFinite(time)||age>300000||age< -60000||!['in-stock','sold-out','low','unreported','offline'].includes(data.state))throw Error('invalid observation');
 return data;
}
let stopStockSession=null;
function renderStock(out,p){
 stopStockSession?.();
 const section=el('section',null,'stock-probe'),title=el('h3',stockText('title')),status=el('strong');
 status.setAttribute('role','status');const links=el('div',null,'linkline');
 links.append(link(stockText('order'),p.url));
 section.append(title,status);out.append(section);
 const key=getStockKey(p),t=stockTarget(key);
 if(!t){status.textContent=stockText('manual');section.append(links);return}
 const fixed=t.family==='ovh'?' · 32 GB ECC / 2 × 512 GB NVMe':'';
 section.append(el('p',t.zone.toUpperCase()+' · '+t.sku+fixed,'stock-config'));
 links.append(link(stockText('source'),t.url));
 if(location.protocol==='file:'){status.textContent=stockText('local');section.append(links);return}
 const detail=el('small',stockText('interval'),'stock-time');section.append(detail);
 const refresh=btn(stockText('refresh'),run,'inline');links.prepend(refresh);section.append(links);
 const dialog=section.closest('dialog');let timer,ctrl,dead=false;
 function stop(){dead=true;clearTimeout(timer);ctrl?.abort();dialog?.removeEventListener('close',stop);document.removeEventListener('visibilitychange',visible);stopStockSession=null}
 function visible(){if(!document.hidden&&!dead&&!ctrl)run()}
 async function run(){
  clearTimeout(timer);if(dead||ctrl)return;
  if(!section.isConnected){stop();return}
  if(document.hidden){status.textContent=stockText('loading');return}
  ctrl=new AbortController();refresh.disabled=true;status.textContent=stockText('loading');section.dataset.stockState='loading';detail.textContent=stockText('interval');
  const timeout=setTimeout(()=>ctrl?.abort(),10000);
  try{
   const data=await readStockObservation(key,t,ctrl.signal);if(dead)return;
   const time=Date.parse(data.checkedAt);
   status.textContent=stockText(data.state);section.dataset.stockState=data.state;
   detail.textContent=stockText('observed')+' '+new Date(time).toLocaleString(document.documentElement.lang,{hour12:false})+' · '+stockText('interval');
  }catch{if(!dead){status.textContent=stockText('offline');section.dataset.stockState='offline'}}
  finally{clearTimeout(timeout);ctrl=null;if(!dead){refresh.disabled=false;timer=setTimeout(run,120000)}}
 }
 dialog?.addEventListener('close',stop);document.addEventListener('visibilitychange',visible);stopStockSession=stop;run();
}