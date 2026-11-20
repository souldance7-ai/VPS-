// Public VPS offers, metered configurations and project archive references.
(() => {
  const checked = '2026-11-20';
  const local = (sc,tc,en,ja) => ({sc,tc,en,ja});
  const groups = [
    {
      provider:'ACCK', aliases:['AcckCloud','ACCK Cloud','ACCK云','ACCK雲'], market:'LAX',city:'Los Angeles',currency:'CNY',
      url:'https://acck.io/store/server?type=traffic&areaId=4&nodeId=8',
      routeName:'AS4837', native:true,
      note:local('商店列出三网 4837 优化和原生 IP。价格取自公开商品页的索引快照，订单页显示当前报价。','商店列出三網 4837 優化及原生 IP。價格取自公開商品頁的索引快照，訂單頁顯示目前報價。','The indexed storefront lists native IPv4 and three-carrier AS4837 optimization. The order screen shows current pricing.','公開の商品ページの索引価格です。ネイティブ IP と 3 社向け AS4837 を掲載。最新料金は注文画面に表示されます。'),
      rows:[['acck-4837-mini','LAX4837-MINI',24.99,1,1,10,1000,'1 Gbps'],['acck-4837-plus','LAX4837-PLUS',35.99,1,2,10,2000,'1 Gbps'],['acck-4837-pro','LAX4837-PRO',58.99,2,2,10,4000,'1 Gbps'],['acck-4837-max','LAX4837-MAX',128.99,2,4,20,8000,'1 Gbps']]
    },
    {
      provider:'ACCK', aliases:['AcckCloud','ACCK Cloud','ACCK云','ACCK雲'],market:'LAX',city:'Los Angeles',currency:'CNY',
      url:'https://acck.io/store/server?type=traffic&areaId=4&nodeId=6',routeName:'CMIN2 / AS9929',native:true,
      note:local('商家列出 CMIN2、9929 及原生 IP，回国优化为尽力提供。报价来自公开商品页索引快照。','商家列出 CMIN2、9929 及原生 IP，回國優化為盡力提供。報價來自公開商品頁索引快照。','The indexed store lists native IP, CMIN2 and AS9929 with best-effort mainland return routing.','販売ページの索引価格です。ネイティブ IP、CMIN2、AS9929 を掲載し、中国向け経路はベストエフォートです。'),
      rows:[['acck-std-limited','LAXStd-MINI-黑粉限定',29.99,1,1,5,500,'500 Mbps'],['acck-std-mini','LAXStd-MINI',19.99,1,1,5,500,'200 Mbps'],['acck-std-plus','LAXStd-PLUS',69.99,1,1,5,1100,'500 Mbps'],['acck-std-pro','LAXStd-PRO',99.99,2,2,10,2200,'500 Mbps'],['acck-std-max','LAXStd-MAX',199.99,2,4,20,4500,'500 Mbps']]
    },
    {
      provider:'ACCK', aliases:['AcckCloud','ACCK Cloud','ACCK云','ACCK雲'],market:'LAX',city:'Los Angeles',currency:'CNY',
      url:'https://acck.io/store/server?type=traffic&areaId=4&nodeId=23&planId=143',proof:'https://www.zyhot.com/archives/446.html',date:'2026-02-28',review:true,routeName:'CMIN2 / AS9929',
      note:local('发布时的常规月价。2026 年 2 月的首发折扣另有条件，现价看商家。','發表時的常規月價。2026 年 2 月的首發折扣另有條件，現價見商家。','Regular price at the February 2026 launch. Check the merchant for current pricing.','2026 年 2 月の販売開始時の通常月額です。現在価格はストアでご確認ください。'),
      rows:[['acck-143','LAX9929-MINI',19.99,1,1,5,1000,'100 Mbps']]
    },
    {
      provider:'JUSTG',aliases:['JustG','JUSTG Tokyo'],market:'JP',city:'Tokyo',url:'https://www.justg.com/vps/japan/',native:true,isp:true,
      routeName:'SoftBank / CT 163 / CMI',
      note:local('东京机房配日本运营商原生 IPv4。商家 2026 年 11 月记录的回程经 SoftBank，对接电信 163、联通骨干或移动 CMI。','東京機房配日本電信商原生 IPv4。商家 2026 年 11 月記錄的回程經 SoftBank，對接電信 163、聯通骨幹或移動 CMI。','Tokyo datacenter with native Japanese ISP IPv4. In November 2026 JUSTG reported SoftBank return paths to China Telecom 163, China Unicom backbone and China Mobile CMI.','東京 DC の日本 ISP ネイティブ IPv4。2026 年 11 月の公式計測では SoftBank 経由で CT 163、CU バックボーン、CM CMI に接続します。'),
      rows:[['justg-tokyo-1','Tokyo KVM 512 MB',19.99,1,'512 MB',10,500,'500 Mbps'],['justg-tokyo-2','Tokyo KVM 1 GB',29.99,2,1,20,'1 TB','500 Mbps'],['justg-tokyo-3','Tokyo KVM 2 GB',39.99,3,2,40,'2 TB','500 Mbps'],['justg-tokyo-4','Tokyo KVM 4 GB',49.99,4,4,80,'3 TB','500 Mbps'],['justg-tokyo-5','Tokyo KVM 8 GB',79.99,5,8,160,'4 TB','500 Mbps'],['justg-tokyo-6','Tokyo KVM 16 GB',129.99,6,16,240,'5 TB','500 Mbps'],['justg-tokyo-7','Tokyo KVM 24 GB',169.99,7,24,320,'6 TB','500 Mbps']]
    },
    {
      provider:'ServerPoint',aliases:['ColossusCloud'],market:'US',city:'Las Vegas',url:'https://www.serverpoint.com/en/vps-hosting/las-vegas-vps/',proof:'https://www.serverpoint.com/en/vps-hosting/linux-vps/',
      note:local('ColossusCloud G5 使用 AMD EPYC Milan。流量为套餐额度。','ColossusCloud G5 使用 AMD EPYC Milan。流量為方案額度。','ColossusCloud G5 runs on AMD EPYC Milan. Transfer is the plan allowance.','ColossusCloud G5 の AMD EPYC Milan 構成。転送量はプランの枠です。'),
      rows:[['sp-g51','G5.1',5,2,1,100,'2 TB'],['sp-g52','G5.2',10,2,2,100,'3 TB'],['sp-g54','G5.4',20,4,4,150,'4 TB'],['sp-g58b','G5.8B',35,8,8,160,'6 TB'],['sp-g58','G5.8',35,6,8,200,'6 TB']]
    },
    {
      provider:'Linode',aliases:['Akamai Cloud','Akamai Connected Cloud','Linode Tokyo 2'],market:'JP',city:'Tokyo',url:'https://www.akamai.com/cloud/pricing/cpu',proof:'https://www.akamai.com/cloud/pricing/asia-pacific',
      note:local('东京二区 ap-northeast 支持这些共享 CPU 机型。端口按入站／出站列示，费用按小时累计至月租上限。','東京二區 ap-northeast 支援這些共享 CPU 機型。連接埠按入站／出站列示，費用按小時計至月租上限。','These shared CPU types are listed in Tokyo 2 (ap-northeast). Network speeds are inbound/outbound. Hourly charges accrue to the monthly cap.','東京 2（ap-northeast）の共有 CPU インスタンスです。速度は受信／送信、時間課金に月額上限があります。'),
      rows:[['linode-nanode','Nanode 1 GB',5,1,1,25,'1 TB','40/1 Gbps'],['linode-2gb','Linode 2 GB',12,1,2,50,'2 TB','40/2 Gbps'],['linode-4gb','Linode 4 GB',24,2,4,80,'4 TB','40/4 Gbps'],['linode-8gb','Linode 8 GB',48,4,8,160,'5 TB','40/5 Gbps'],['linode-16gb','Linode 16 GB',96,6,16,320,'8 TB','40/6 Gbps']]
    },
    {
      provider:'Tencent Cloud',aliases:['腾讯云','騰訊雲','Lighthouse','轻量应用服务器','輕量應用伺服器'],market:'HK',city:'Hong Kong',url:'https://www.tencentcloud.com/products/lighthouse',proof:'https://www.tencentcloud.com/document/product/1103/47794',
      note:local('香港 Lighthouse 的 Linux 套餐。表中端口和月流量属于所选规格。','香港 Lighthouse 的 Linux 方案。表中的連接埠及月流量屬於所選規格。','Hong Kong Lighthouse Linux bundles. Port and monthly transfer are specific to the selected size.','香港 Lighthouse の Linux バンドル。ポート速度と月間転送量は各構成の値です。'),
      rows:[['te-hk40','Lighthouse Starter Linux · 40 GB',6,2,2,40,512,'20 Mbps'],['te-hk50','Lighthouse Starter Linux · 50 GB',8.5,2,2,50,1024,'30 Mbps'],['te-hk70','Lighthouse Starter Linux · 70 GB',15,2,4,70,2048,'30 Mbps'],['te-hk180','Lighthouse General Linux · 180 GB',36,4,8,180,5120,'35 Mbps'],['te-hk220','Lighthouse General Linux · 220 GB',54,4,16,220,6144,'40 Mbps']]
    },
    {
      provider:'NSS',aliases:['戰國策','战国策','戰國策網路科技','NSS Taiwan'],market:'TW',city:'Taiwan',currency:'TWD', url:'https://www.nss.com.tw/vpshosting',
      note:local('位于远传电信机房。报价为月缴方案，包含一个专属 IP。经济型的 Windows 授权费用另计。','位於遠傳電信機房。報價為月繳方案，包含一個專屬 IP。經濟型的 Windows 授權費另計。','Hosted in a Far EasTone datacenter. Monthly plan with one dedicated IP. Windows licensing costs extra on Economy.','遠伝電信のデータセンター。専用 IP 1 個を含む月額料金です。Economy の Windows ライセンスは別料金です。'),
      rows:[['nss-economy','經濟型 VPS',1490,1,2,40,2000],['nss-business','商務型 VPS',2180,2,4,100,3000],['nss-flagship','旗艦型 VPS',4500,8,16,200,8000]]
    },
    {
      provider:'JoySolData', aliases:['Joysol','悅陽數據','悦阳数据'],market:'HK',city:'Hong Kong',currency:'CNY',url:'https://www.joysol.net/',proof:'https://www.joysol.net/api/common/prolist-proxy.php',native:true,routeName:'BGP',
      note:local('香港优化 A 系列按端口限速，流量不限量。所列内存及 SSD 为该档基础容量。IPv6 使用国际线路。','香港優化 A 系列按連接埠限速，流量不限量。所列記憶體及 SSD 為該檔基本容量。IPv6 使用國際線路。','Hong Kong A series with capped peak port speed and unmetered traffic. Memory and SSD values are the base configurations. IPv6 uses international transit.','香港 A シリーズはポート上限あり・転送量無制限。メモリと SSD は基本構成です。IPv6 は国際回線です。'),
      rows:[['joysol-35','香港优化A-ECS 2H1G',17.99,2,1,20,'Unlimited','10 Mbps'],['joysol-36','香港优化A-ECS 2H2G',25.99,2,2,40,'Unlimited','15 Mbps'],['joysol-37','香港优化A-ECS 4H4G',34.99,4,4,60,'Unlimited','20 Mbps'],['joysol-38','香港优化A-ECS 8H8G',59.99,8,8,80,'Unlimited','25 Mbps']]
    },
    {
      provider:'Hytron',aliases:['HytronVPS','HyVPS','AS17433'],market:'HK',city:'Hong Kong',url:'https://hyvps.hytron.io/',proof:'https://hyvps.hytron.io/api/v1/nodes/catalog',term:'hour',
      note:local('香港 WPC-12 Server-2 自选配置试算，含 1 个 IPv4。CPU USD 0.003/核时、RAM 0.0025/GB时、磁盘 0.0005/GB时、IPv4 0.0055/时。一次性设定费 USD 0.50，流量另按时段计费。','香港 WPC-12 Server-2 自選配置試算，含 1 個 IPv4。CPU USD 0.003/核心時、RAM 0.0025/GB時、磁碟 0.0005/GB時、IPv4 0.0055/時。一次性設定費 USD 0.50，流量另依時段計費。','Custom estimate for WPC-12 Server-2. Per hour: CPU $0.003/core, RAM $0.0025/GB, disk $0.0005/GB and one IPv4 $0.0055. Setup costs $0.50. Usage-based traffic is charged separately by time band.','WPC-12 Server-2 の構成試算（IPv4 1 個）。毎時 CPU 0.003 USD/コア、RAM 0.0025 USD/GB、ディスク 0.0005 USD/GB、IPv4 0.0055 USD。初期費用 0.50 USD、通信料は時間帯別従量制。'),
      rows:[['hytron-hkwpc-1','WPC-12 Server-2 · 1C / 1GB / 10GB',0.016,1,1,10,'USD 0.00015–0.0006 / GB'],['hytron-hkwpc-2','WPC-12 Server-2 · 2C / 2GB / 20GB',0.0265,2,2,20,'USD 0.00015–0.0006 / GB']]
    }
  ];
  const aliasMap={NSS:['戰國策','战国策'],Kdatacenter:['KDC','KDATACENTER','K Data Center'],YecaoYun:['野草云','野草雲','Yecaoyun','Yecao Cloud'],Joyso:['就速台北雲','Joyso Cloud']};
  for(const p of PLANS){
    if(aliasMap[p.provider])p.searchTerms=[...new Set([...(p.searchTerms||[]),...aliasMap[p.provider]])];
  }
  for(const group of groups){
    for(const [key,sku,price,cpu,ram,disk,traffic,port] of group.rows){
      const id='pc-'+key;
      if(PLANS.some(p=>p.id===id || (p.provider===group.provider&&p.market===group.market&&p.spec?.sku===sku)))continue;
      const proof=group.proof||group.url;
      const url=group.provider==='JoySolData'?'https://www.joysol.net/product.php?id='+key.split('-')[1]:group.url;
      const spec={sku,price:String(price),term:group.term||'month',currency:group.currency||'USD',cpu:cpu+' vCPU',ram:typeof ram==='number'?ram+' GB':ram,disk:disk+' GB',traffic:typeof traffic==='number'?traffic+' GB':traffic,proof,date:group.date||checked};
      if(port)spec.port=port;
      if(group.review)spec.priceType='review';
      PLANS.push({id,provider:group.provider,plan:sku,market:group.market,city:group.city,kind:'vps',ip:group.native?'native':'unknown',route:group.routeName?'claimed':'unknown',routeName:group.routeName||'',carriers:[],proof,url,notes:group.note,spec,searchTerms:group.aliases});
      const attrs=[];
      if(group.native)attrs.push(['origin','native']);
      if(group.isp)attrs.push(['access','isp']);
      if(attrs.length)IP_EVIDENCE.set(id,attrs.map(([dimension,value])=>({dimension,value,provider:group.provider,market:group.market,sku,url,otherUrl:proof,checked:spec.date,scope:'sku',operator:'',note:group.note})));
    }
  }
})();