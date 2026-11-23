'use strict';

(() => {
 const date='2026-11-23';
 const localized=(sc,tc,en,ja)=>({sc,tc,en,ja});
 const plansById=new Map(PLANS.map(plan=>[plan.id,plan]));

 const rfcPath='/store/hong-kong-1-china-optimization-network';
 const rfcCny='https://payment.rfchost.com/index.php?currency=8&rp='+rfcPath;
 const rfcUsd='https://payment.rfchost.com/index.php?rp='+rfcPath;
 const rfcPrices=[
  [160,'166.88','24.99'],[161,'340.50','50.99'],[163,'514.12','76.99'],
  [165,'687.74','102.99'],[162,'1121.79','167.99'],[164,'2250.32','336.99']
 ];
 for(const [pid,cny,usd] of rfcPrices){
  const plan=plansById.get('project-edge-rfc-'+pid);
  if(!plan)continue;
  const notes=localized(
   `官网人民币月付起价，美元页面另列 USD ${usd}/月起。含 1 个 IPv4。线路为商家标注的中国大陆优化。`,
   `官網人民幣月繳起價，美元頁面另列 USD ${usd}／月起。含 1 個 IPv4。線路為商家標註的中國大陸優化。`,
   `The merchant lists this CNY monthly starting rate and a separate USD ${usd} monthly starting rate. Includes one IPv4. Mainland China optimization is a merchant claim.`,
   `公式の人民元建て月額開始価格です。米ドル建てでは月額 ${usd} USD から。IPv4 を1個含み、中国本土向け最適化は販売元の表記です。`
  );
  Object.assign(plan,{proof:rfcCny,terms:rfcUsd,notes,ipv4:true});
  Object.assign(plan.spec,{price:cny,currency:'CNY',term:'month',priceType:'from',proof:rfcCny,date,sourceNote:notes});
 }

 const poStore='https://console.po0.io/store/tencent-can-bgp';
 const poNotes=localized(
  '官网月付起价，含 1 个广州 BGP IPv4。流量按单向计量，官网未注明计量方向。需实名并绑定「鸡险」，购买后不可退款。商家禁止用于回国访问，默认双向封禁 80、443、8080、8443、8000、1080（TCP/UDP），且禁止 HTTP/HTTPS。',
  '官網月繳起價，含 1 個廣州 BGP IPv4。流量按單向計量，官網未註明計量方向。需實名並綁定「雞險」，購買後不可退款。商家禁止用於回國存取，預設雙向封鎖 80、443、8080、8443、8000、1080（TCP/UDP），且禁止 HTTP/HTTPS。',
  'Official monthly starting rate with one Guangzhou BGP IPv4. One-way metering applies. The merchant does not specify the direction. Real-name verification and the bundled 鸡险 service are mandatory. Orders are nonrefundable. The merchant prohibits access back to mainland China and HTTP/HTTPS. TCP and UDP ports 80, 443, 8080, 8443, 8000 and 1080 are blocked in both directions by default.',
  '公式の月額開始価格で、広州 BGP IPv4 を1個含みます。転送量は片方向課金で、計測方向の記載はありません。実名認証と「鸡险」の契約が必須で、返金不可です。中国本土へのアクセス用途と HTTP/HTTPS は禁止されています。TCP/UDP の 80、443、8080、8443、8000、1080 は初期状態で双方向とも遮断されます。'
 );
 const poRows=[
  [15,'NANO','147.89',2,2,20,'200 Mbps','100 GB','teng-xun-yun-yan-zhou-nano'],
  [2,'TINY','258.90',2,2,20,'500 Mbps','200 GB','gzbgp-tiny'],
  [3,'SMALL','358.90',2,2,20,'500 Mbps','500 GB','gzbgp-small'],
  [4,'MEDIUM','558.90',2,2,20,'700 Mbps','1 TB','gzbgp-medium'],
  [5,'LARGE','858.90',2,4,20,'1 Gbps','2 TB','gzbgp-large'],
  [6,'TITAN','2058.90',4,8,50,'1 Gbps','5 TB','teng-xun-yun-yan-zhou-ultra'],
  [7,'ULTRA','4058.90',4,8,50,'1 Gbps','10 TB','teng-xun-yun-yan-zhou-ultra-1']
 ];
 for(const [pid,tier,price,cores,ram,disk,port,traffic,slug] of poRows){
  const id='portchannel-gz-'+pid;
  if(plansById.has(id))continue;
  const sku='腾讯云广州 - '+tier;
  PLANS.push({
   id,provider:'PortChannel',market:'CN',city:'Guangzhou',sku,
   plan:localized(sku,'騰訊雲廣州 - '+tier,'Tencent Cloud Guangzhou - '+tier,'Tencent Cloud 広州 - '+tier),
   kind:'vps',ip:'unknown',ipv4:true,route:'unknown',routeName:'BGP',carriers:[],
   url:poStore+'/'+slug,proof:poStore,notes:poNotes,networkFilters:['quota-transfer'],
   searchTerms:['PortChannel Zero','PO0','po0.io','腾讯云广州 BGP','騰訊雲廣州 BGP','广州','廣州','GZBGP',tier],
   spec:{sku,price,currency:'CNY',term:'month',priceType:'from',date,proof:poStore,
    cpu:cores+' vCPU',ram:ram+' GB',disk:disk+' GB SSD',port,traffic,monthlyTraffic:traffic,trafficDirection:'one-way'}
  });
 }
})();
