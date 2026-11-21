// Current public listings and dated community records, 2026-11-21.
(() => {
 const date='2026-11-21';
 const joyProof='https://www.joysol.net/api/common/prolist-proxy.php';
 const evoProof='https://evoxt.com/pricing/';
 const local=(sc,tc,en,ja)=>({sc,tc,en,ja});
 function add(entry,provider,market,city,url,proof,notes,aliases=[]){
  const candidate={id:entry.id,provider,market,city,plan:entry.sku,sku:entry.sku,kind:'vps',ip:'unknown',
   route:entry.routeName?'claimed':'unknown',routeName:entry.routeName||'',carriers:[],url,proof,notes,
   review:entry.review,searchTerms:aliases,feedSkus:entry.feedSkus||[],
   spec:{sku:entry.sku,proof,date,priceType:'official',...entry.spec}};
  const existing=PLANS.find(p=>p.id===entry.id);
  if(existing)Object.assign(existing,candidate);else PLANS.push(candidate);
  return existing||candidate;
 }
 const joyNote=local('报价、库存及规格按官网产品 ID 核对。路由为同系列的商家说明，实测记录见来源。','報價、庫存及規格按官網產品 ID 核對。路由為同系列的商家說明，實測紀錄見來源。','Price, stock and specifications use the merchant product ID. Routes are described by the merchant for the series.','価格・在庫・仕様は公式の商品 ID と照合。経路はシリーズに対する販売元の説明です。');
 for(const entry of reviewedJoySolPlans){
  entry.feedSkus=[entry.sku.replace('香港优化','')];
  add(entry,'JoySolData',entry.market,entry.market==='HK'?'Hong Kong':'Los Angeles',entry.url,joyProof,joyNote,['Joysol','悦阳数据','悅陽數據']);
 }
 const evoNote=local('官网报价对应马来西亚 Premium Plus，不同于 Standard。','官網報價對應馬來西亞 Premium Plus，採用該區專屬價格表。','This rate comes from the Malaysia Premium Plus table.','マレーシア Premium Plus 専用の価格表です。');
 for(const entry of reviewedEvoxtPlans){
  const sku=entry.sku.split(' · ')[1];
  entry.feedSkus=['EVOXT-Malaysia-PremiumPlus-'+sku];
  if(sku==='VM-0.5')entry.review='https://www.nodeseek.com/post-1069381-1';
  add(entry,'Evoxt','MY','Malaysia',evoProof,evoProof,evoNote,['EVOXT Malaysia','PremiumPlus']);
 }
 const atmosEndpoint='https://atmosnode.com/dashboard/index.php?rp=/store/vps-2026';
 const atmosNote=local('黑五折扣仅适用于首月。商品卡金额为官网页面所列折扣前起价，续费与机房细节以订单为准。','黑五折扣僅適用首月。商品卡金額為官網頁面所列折扣前起價，續費與機房細節以訂單為準。','The Black Friday discount is for the first month. Catalog prices are the published regular starting rates. Check renewal pricing and facility details in the order.','ブラックフライデー割引は初月のみ。掲載価格は通常の開始価格です。更新料金と拠点は注文画面をご確認ください。');
 for(const entry of reviewedAtmosPlans){
  if(entry.sku==='VPS NVMe 2')entry.review='https://www.nodeseek.com/post-1068318-1';
  entry.feedSkus=[entry.sku];
  const plan=add(entry,'AtmosNode','FR','France',atmosEndpoint,atmosEndpoint,atmosNote,['AtmosNode VPS Linux 2026','9950X']);
  plan.spec.priceType='from';
  COMMUNITY_OFFERS.push({id:plan.id+'-black-friday',provider:plan.provider,sku:plan.sku,plan:plan.plan,kind:'vps',
   planIds:[plan.id],markets:['FR'],city:'France',term:'month',currency:'EUR',price:entry.rate,regular:entry.spec.price,
   event:'black-friday',status:'limited',stockAtPublication:entry.stock,stockObservedAt:date,stockKey:plan.id,source:plan.provider,
   url:atmosEndpoint,official:atmosEndpoint,endDate:entry.endDate,publishedAt:date,observed:date,codeRequired:false,conditions:atmosNote});
 }
 const ytReview='https://www.nodeseek.com/post-1069554-1';
 const ytPromo='https://www.nodeseek.com/post-1069507-1';
 const ytStore='https://cloud.yt.net/deploy/lax-3c';
 const yt=add({id:'yt-lax-3c',sku:'LAX-3C · CN2 / AS9929 / CMIN2',routeName:'CN2 / AS9929 / CMIN2',
  review:'https://www.nodeseek.com/post-1069723-1',feedSkus:['LAX-3C','CN2+9929+CMIN2款'],spec:{cpu:'2 vCPU',ram:'2 GB',priceType:'review',proof:ytReview,
   price:'33.70',currency:'CNY',term:'month',billingRates:[{price:'337.00',currency:'CNY',term:'year',priceType:'review'}]}},
  'YT.NET','LAX','Los Angeles',ytStore,ytReview,
  local('论坛发布时为 2 核 2 GB，折后示例 CNY 33.70/月或 337/年。活动帖未公布明确截止时间，现价及名额在结账页核对。','論壇發佈時為 2 核 2 GB，折後範例 CNY 33.70／月或 337／年。活動帖未公佈明確截止時間，現價及名額在結帳頁核對。','The launch post reports 2 vCPU and 2 GB RAM, with discounted examples of CNY 33.70 monthly and 337 annually. Check current terms and availability at checkout.','告知時は 2 vCPU / 2 GB RAM。割引例は月額 33.70 CNY、年額 337 CNY。現在の条件と在庫は注文画面でご確認ください。'),['云途','雲途','lax-3c']);
 COMMUNITY_OFFERS.push({
  id:'yt-lax-3c-ytus75',provider:yt.provider,plan:yt.plan,sku:yt.sku,planIds:[yt.id],markets:['LAX'],city:'Los Angeles',kind:'vps',
  code:'YTUS75',discount:'−25%',source:'NodeSeek',thread:ytPromo,url:ytStore,official:ytStore,
  status:'checkout',terms:['month','year'],observed:date,publishedAt:date,cpu:yt.spec.cpu,ram:yt.spec.ram,conditions:yt.notes
 });
 const reportNote=local('记录对应链接中的送测或自购样本。当前价格、硬件批次和库存请查商家。','紀錄對應連結中的送測或自購樣本。現行價格、硬體批次和庫存請查商家。','Specifications describe the cited sample. Check the merchant for current pricing, hardware batches and stock.','掲載仕様はリンク先の測定サンプルです。現在の価格・機器・在庫は販売元でご確認ください。');
 for(const [id,provider,market,city,sku,url,review,aliases,spec] of [
  ['legend-lax-community-512','LegendVPS','LAX','Los Angeles','LAX 512 MB · 0.5 USD review','https://legendvps.com/','https://www.nodeseek.com/post-1069104-1',['Legend Lax','传奇洛杉矶','傳奇洛杉磯'],{cpu:'1 vCPU',ram:'512 MB',disk:'2 GB',port:'1 Gbps',traffic:'2 TB',price:'0.50',currency:'USD',term:'month'}],
  ['datawave-sg-lite-a1','DataWave','SG','Singapore','SG A1 Lite · 1 TB','https://datawave.sh/','https://www.nodeseek.com/post-1062532-1',['DataWave SG Lite','数据波','數據波','SG LITE 1T'],{cpu:'1 vCPU',ram:'512 MB',traffic:'1 TB',price:'12.00',currency:'CNY',term:'month'}],
  ['uzumaru-my','Uzumaru','MY','Malaysia','Malaysia VPS','https://uzuma.ru/status','https://www.nodeseek.com/post-1069717-1',['马来西亚家宽','馬來西亞家寬','UZUMARU Malaysia'],{}]
 ]){
  add({id,sku,review,feedSkus:sku.includes('Lite')?['SG LITE 1T','SG A1 Lite']:[],spec:{...spec,priceType:review?'review':undefined}},provider,market,city,url,review||url,review?reportNote:undefined,aliases);
 }
 const zgoStore='https://clients.zgovps.com/index.php?%2Fcart%2F=&cat_id=7';
 const sku='DE Frankfurt AMD VPS - Specials - Starter';
 if(!PLANS.some(p=>p.provider==='ZgoCloud'&&p.market==='DE'&&p.spec?.sku===sku)){
  add({id:'zgo-de-9929-starter',sku,routeName:'AS9929',feedSkus:[sku,'DE Frankfurt AMD VPS'],spec:{
    cpu:'1 vCPU',cpuFamily:'AMD EPYC 7002 Series',cpuModelScope:'official',cpuModelSource:zgoStore,cpuModelDate:date,
    ram:'1 GB DDR4',disk:'10 GB NVMe SSD',port:'200 Mbps',traffic:'1 TB / month',monthlyTraffic:'1 TB',
    price:'45.00',currency:'USD',term:'year'}},
   'ZgoCloud','DE','Frankfurt',zgoStore,zgoStore,undefined,['ZgoVPS','Zgo Frankfurt 9929']);
 }
 const skyline=PLANS.find(p=>p.id==='regional-sky-sg-1');
 if(skyline){skyline.review='https://www.nodeseek.com/post-1068478-1';skyline.feedSkus=['SG Ⅰ 型','SG I 型','Singapore SG I'];}
 const zouter=PLANS.find(p=>p.id==='regional-zouter-jp-1');
 if(zouter){
  zouter.review='https://www.nodeseek.com/post-1047518-1';
  zouter.feedSkus=['Zouter JP Plus','JP BGP Global - Plus'];
  Object.assign(zouter.spec,{cpu:'2 vCPU',ram:'6 GB',disk:'40 GB'});
  zouter.notes=local('2 核、6 GB 内存及 40 GB 磁盘为所链接的 JP Plus 测评样本。','2 核、6 GB 記憶體及 40 GB 磁碟為所連結的 JP Plus 測評樣本。','The 2 vCPU, 6 GB RAM and 40 GB disk are from the linked JP Plus review sample.','2 vCPU、6 GB RAM、40 GB ディスクはリンク先の JP Plus 測定構成です。');
 }
 for(const plan of PLANS){
  const spec=plan.spec;
  if(!spec)continue;
  if(plan.id.startsWith('pc-linode-')){
   const speeds=spec.port?.match(/^(\d+)\/(\d+)\s+Gbps$/);
   if(speeds)Object.assign(spec,{downlink:speeds[1]+' Gbps',uplink:speeds[2]+' Gbps',monthlyTraffic:spec.traffic});
  }
  if(plan.id.startsWith('racknerd-bf26-')&&spec.traffic)spec.monthlyTraffic=spec.traffic;
 }
})();
