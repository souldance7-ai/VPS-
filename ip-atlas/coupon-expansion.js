'use strict';
// One offer per SKU and billing term. The directory keeps its independently sourced standard rate.
(function addCouponQuotes() {
  const observed='2026-11-20';
  const note=(sc,tc,en,ja)=>({sc,tc,en,ja});
  const money=n=>Number(n).toFixed(2);
  const plans=new Map(PLANS.map(p=>[p.id,p]));
  const offers=new Set(COMMUNITY_OFFERS.map(r=>r.id));
  const bf={event:'black-friday',campaign:'black-friday-2026'};
  const skuOf=p=>typeof p.sku==='string'?p.sku:typeof p.spec?.sku==='string'?p.spec.sku:typeof p.plan==='string'?p.plan:p.plan?.en;
  function record(campaign, item) {
    const row={kind:'vps',observed,status:'offer',priceBasis:'afterCode',term:'month',currency:'USD',...campaign,...item};
    row.id='coupon11-'+item.key;
    if (offers.has(row.id)) return;
    const givenPlan=row.planId?plans.get(row.planId):null;
    if (row.planId && !givenPlan) throw new Error('Missing coupon SKU '+row.planId);
    row.plan=row.plan || skuOf(givenPlan||{}) || '';
    row.sku ||= row.plan;
    row.markets ||= row.market ? [row.market] : [];
    row.planIds=[];
    if(row.price!=null)row.price=money(row.price);
    if(row.regular!=null)row.regular=money(row.regular);
    if(row.renewal!=null)row.renewal=money(row.renewal);
    row.official ||= row.url;
    if(givenPlan) {
      row.planIds=[givenPlan.id];
      row.stockKey ||= givenPlan.stockKey;
    } else if(row.catalog!==false && row.markets.length===1 && typeof MARKETS!=='undefined' && MARKETS[row.markets[0]]) {
      const id='coupon-sku-'+row.provider.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+row.market.toLowerCase()+'-'+row.sku.toLowerCase().replace(/[^a-z0-9]+/g,'-');
      const match=PLANS.find(p=>p.provider.toLowerCase()===row.provider.toLowerCase()&&p.market===row.market&&skuOf(p)?.toLowerCase()===row.sku.toLowerCase());
      if(match)row.planIds=[match.id];
      else {
        const spec={sku:row.sku,currency:row.currency,term:row.term,price:row.regular||'',cpu:row.cpu,ram:row.ram,disk:row.disk,port:row.port,traffic:row.traffic,date:observed,proof:row.official};
        const p={id,market:row.market,city:row.city,provider:row.provider,plan:row.plan,sku:row.sku,kind:row.kind,ip:'unknown',route:row.routeName?'claimed':'unknown',
          routeName:row.routeName||'',carriers:row.carriers||[],proof:row.official,url:row.url,notes:row.conditions,spec};
        PLANS.push(p);plans.set(p.id,p);row.planIds=[p.id];
      }
    }
    delete row.catalog;delete row.planId;delete row.market;delete row.key;
    COMMUNITY_OFFERS.push(row);offers.add(row.id);
  }
  const goSources={
    fra:{market:'DE',city:'Frankfurt',code:'Hi,FRA',source:'VPS主机补货通知',thread:'https://t.me/vpszj/19086',evidenceUpdatedAt:'2026-11-18',
      alsoThreads:[{source:'主机收藏夹',thread:'https://www.idcfavourites.com/archives/7507.html'}],
      conditions:note('GoMami 德国 Pulse 系列。补货频道刊载月付八折，另有媒体记录结账循环折扣。截止时间未公布，请在结账页确认代码及续费金额。','GoMami 德國 Pulse 系列。補貨頻道刊載月繳八折，另有媒體記錄結帳循環折扣。截止時間未公布，請在結帳頁確認代碼及續費金額。','Frankfurt Pulse. A restock report quotes a 20% monthly discount, and a review reports recurring billing. No deadline was published. Confirm the code and renewal total at checkout.','フランクフルトの Pulse が対象。再入荷情報では月払い20%引き、レビューでは継続割引と報告されています。期限は非公表。コードと更新額は注文画面で確認してください。')},
    lax:{market:'LAX',city:'Los Angeles',code:'Hi,LAX',source:'Sharon Networks',thread:'https://t.me/SharonNotice/42',evidenceUpdatedAt:'2026-11-18',
      alsoThreads:[{source:'VPS主机补货通知',thread:'https://t.me/vpszj/19085'}],
      conditions:note('GoMami 洛杉矶 Pulse 首发码，商家公布每档折后月费。限兑换名额，用完即止，未公布截止时间及剩余名额。只有出站流量计费。','GoMami 洛杉磯 Pulse 首發碼，商家公布各檔折後月費。兌換名額用完即止，未公布截止時間及餘額。只計出站流量。','Los Angeles Pulse launch code. The merchant published the monthly prices and set a redemption limit without an end time. Its remaining quota is unpublished. Only outbound traffic is billed.','ロサンゼルス Pulse の発売記念コード。各割引月額は提供元が公表しています。利用枠がなくなり次第終了。期限と残り枠は非公表。送信量のみ計上されます。')}
  };
  for(const [region,source] of Object.entries(goSources)){
    for(const size of ['nano','mini','air','pro','ultra','titan']){
      const planId='ms-gomami-'+region+'-pulse-'+size;
      const p=plans.get(planId);
      if(!p)throw new Error('Missing GoMami plan '+planId);
      const official='https://gomami.io/store/'+region+'-pulse';
      const card=region+'pulse'+size;
      const product=official+'/'+card;
      const sku=p.spec.sku||p.sku;
      const snapshot=region==='lax' && size==='nano'?{stockAtPublication:'sold-out',stockObservedAt:observed}:{};
      record({provider:'GoMami',...source},{key:region+'-'+size,planId,plan:sku,sku,...snapshot,url:product,official,
        skuOrderId:size==='nano'?(region==='fra'?33:27):undefined,
        cpu:p.spec.cpu,ram:p.spec.ram,disk:p.spec.disk,port:p.spec.port,traffic:p.spec.traffic,regular:p.spec.price,
        price:Number(p.spec.price)*.8,routeName:p.routeName});
    }
  }

  const dev={...bf,provider:'Devoster',source:'Devoster',official:'https://devoster.com/black-friday/',url:'https://devoster.com/black-friday/',
    market:'US',city:'Utah',start:'2026-11-20T00:00:00Z',end:'2026-12-02T23:59:00Z',publishedAt:'2026-11-20',code:'BF2026',port:'1 Gbps',traffic:'Unmetered',
    conditions:note('美国犹他州 KVM。月付首期减 15%，年付首期减 30%，续费恢复各自周期原价。下方金额为当前所选周期的整张账单。','美國猶他州 KVM。月繳首期減 15%，年繳首期減 30%，續費恢復各自週期原價。金額是所選週期的整張帳單。','Utah KVM. The first monthly invoice is 15% off or the first annual invoice is 30% off. Renewals use the corresponding standard rate. The displayed amount is the full invoice for the selected term.','米国ユタ州 KVM。月払いは初月15%引き、年払いは初年度30%引き。更新は各期間の通常額。表示額は選択した期間の請求総額です。')};
  for(const [plan,cpu,ram,disk,baseMonth,saleMonth,baseYear,saleYear] of [
    ['Nano',1,1,25,3.49,2.97,37.68,26.38],['Micro',1,2,50,4.49,3.82,48.48,33.94],['Starter',2,4,75,7.99,6.79,86.28,60.40],
    ['Basic',3,6,100,10.99,9.34,118.68,83.08],['Advanced',4,8,125,13.99,11.89,151.08,105.76],
    ['Pro',6,12,150,19.99,16.99,215.88,151.12],['Elite',8,16,175,24.99,21.24,269.88,188.92]]){
    for(const [term,regular,price] of [['month',baseMonth,saleMonth],['year',baseYear,saleYear]])
      record(dev,{key:'devoster-'+plan.toLowerCase()+'-'+term,sku:plan,plan,term,regular,renewal:regular,price,cpu:cpu+' vCPU',ram:ram+' GB',disk:disk+' GB NVMe'});
  }

  const petro={...bf,provider:'PetroSky',source:'LowEndTalk',thread:'https://lowendtalk.com/discussion/223377/petrosky-black-friday-sale-30-off-kvm-vps-in-canada-france-from-4-89-mo',
    url:'https://client.petrosky.io/order/vps/small',publishedAt:'2026-11-16',endDate:'2026-11-30',code:'BLACKFRIDAY',currency:'EUR',
    conditions:note('Mini Linux VPS 打七折，商家确认折后月费可续。含独立 IPv4，2 Gbps 端口的不限量流量受公平使用政策约束。商家只写 11 月 30 日截止。','Mini Linux VPS 七折，商家確認折後月費可續。含獨立 IPv4，2 Gbps 埠速的不限量流量適用公平使用政策。商家只列 11 月 30 日截止。','The provider quotes a recurring 30% reduction for the Mini Linux VPS. Includes dedicated IPv4 and unmetered transfer on a 2 Gbps port with fair use. The published deadline is date-only.','Mini Linux VPS が30%引きで更新も同額。専用 IPv4 と2 Gbps の転送量無制限回線（フェアユース）を含みます。11月30日が期限で時刻は非公表です。')};
  for(const market of ['FR','CA'])record(petro,{key:'petrosky-mini-'+market.toLowerCase(),market,city:'',plan:'Mini Linux VPS',cpu:'1 vCPU · AMD EPYC',ram:'2 GB ECC',disk:'20 GB NVMe',port:'2 Gbps',traffic:'Unmetered (FUP)',price:4.89,renewal:4.89});
  const nodeMach={provider:'NodeMach',source:'VPSBest',thread:'https://vpsbest.cn/article/nodemach-cn2-gia-promo-2026',official:'https://www.nodemach.com/products',url:'https://www.nodemach.com/products',
    alsoThreads:[{source:'vpsrestock',thread:'https://vpsrestock.com/deals/'}],evidenceUpdatedAt:'2026-11-17',
    market:'LAX',city:'Los Angeles',endDate:'2026-12-31',status:'limited',code:'NODEMACH90',
    routeName:'CN2 GIA (CT) / AS4837 (CU)',carriers:['CT','CU'],
    conditions:note('官网公布原价与周期折扣。媒体刊载 NODEMACH90 新购与续费用九折，并列出 12 月 31 日截止；官网商品页未列截止时间。以下为按月费计算的码后价。','官網公布原價與週期折扣。媒體刊載 NODEMACH90 新購與續費打九折，並列 12 月 31 日截止；官網商品頁未列截止時間。以下為按月費計算的碼後價。','The official catalog supplies the base rate. Independent sources report 10% off new orders and renewals through 31 December. The shop does not publish that cutoff. The monthly coupon price is calculated from its posted rate.','公式サイトは通常額を掲載。独立媒体は12月31日まで新規・更新とも10%引きと報告しています。公式商品ページに期限はありません。割引月額は公式料金から算出しています。')};
  for(const [plan,cpu,ram,disk,tb,gbps,regular] of [['Lite',1,2,20,1,1,9.99],['Basic',2,2,40,1.5,2.5,15.99],['Standard',2,3,80,3,2.5,29.99],['Plus',4,4,80,5,2.5,59.99],['Pro',4,4,160,7,2.5,84.99],['Max',6,8,160,15,10,189.99]])record(nodeMach,{key:'nodemach-'+plan.toLowerCase(),sku:'CN2 GIA '+plan,plan:'CN2 GIA '+plan,cpu:cpu+' vCPU',ram:ram+' GB',disk:disk+' GB NVMe RAID10',port:gbps+' Gbps',traffic:tb+' TB / month',price:regular*.9,regular,renewal:regular*.9});

  const hd={provider:'HostDare',source:'HostDare',thread:'https://hostdare.com/promo.html',alsoThreads:[{source:'VPS实测榜',thread:'https://vpstested.com/zh/articles/hostdare/'}],evidenceUpdatedAt:'2026-11-08',
    conditions:note('官网活动页列明适用产品线。刊载价按商品原价及优惠比例计算。11 月结账记录显示折扣限三个账单周期；此后依商家账单。未公布新购截止时间。','官網活動頁列明適用產品線。所列金額依商品原價及折扣比例計算。11 月結帳紀錄顯示折扣限三個帳單週期；此後依商家帳單。未公布新購截止時間。','The merchant publishes the eligible product families and percentage. Discounted rates are calculated from the catalog. A November checkout report recorded a three-billing-period limit. No new-order deadline was published.','公式の対象シリーズと割引率から価格を算出。11月の注文画面レポートでは割引は3請求期間まで。新規適用の期限は非公表です。')};
  for(const [pid,market,city,plan,code,percent,store,cpu,ram,disk,quota,port,regular,term] of [
    [133,'JP','Tokyo','JSSD4','WWP2OEG8IM',.9,'premium-japan-kvm-vps',4,'8 GB',160,2500,'100 Mbps',80.99,'month'],
    [134,'JP','Tokyo','JSSD5','WWP2OEG8IM',.9,'premium-japan-kvm-vps',5,'16 GB',320,3500,'100 Mbps',150.99,'month'],
    [170,'LAX','Los Angeles','ASSD1','XY604XMHXK',.75,'cheap-amd-nvme-kvm-vps-la-usa',1,'1 GB',25,1000,'1 Gbps',12.99,'quarter'],
    [171,'LAX','Los Angeles','ASSD2','XY604XMHXK',.75,'cheap-amd-nvme-kvm-vps-la-usa',2,'2 GB',50,2000,'1 Gbps',26.99,'quarter'],
    [153,'BG','Sofia','BGSSD1','QQKF3H319D',.9,'bg-ssd-kvm',1,'1 GB',25,10000,'1 Gbps',15.99,'quarter'],
    [155,'BG','Sofia','BGSSD3','QQKF3H319D',.9,'bg-ssd-kvm',3,'4 GB',100,30000,'1 Gbps',13.99,'month']])
    record(hd,{key:'hostdare-'+pid,sku:plan,plan,market,city,code,cpu:cpu+' vCPU',ram,disk:disk+' GB NVMe',port,traffic:quota+' GB / month',regular,price:regular*percent,term,
      official:'https://bill.hostdare.com/store/'+store,url:'https://bill.hostdare.com/cart.php?a=add&pid='+pid});

  const noc={provider:'HostNOC',kind:'bare',source:'LowEndTalk',thread:'https://lowendtalk.com/discussion/223142/additional-10-off-first-month-promo-code-let10-dedicated-servers-from-22-50-mo',
    publishedAt:'2026-11-10',code:'LET10',port:'1 Gbps',traffic:'Unmetered',
    conditions:note('仅限原帖五款独服首月减 10%。商家逐项公布首月与续费月价，未列代码截止时间。','僅限原帖五款獨服首月減 10%。商家逐款列出首月與續費月價，未公布代碼截止時間。','Ten percent off the first month on the five dedicated servers in the post. Each has a separately listed renewal rate. No code deadline was published.','元記事の専用サーバー5機種が初月10%引き。更新月額は機種別に掲載され、コードの期限は非公表です。')};
  for(const [market,city,sku,store,cpu,ram,disk,regular,price] of [
    ['FR','Paris','HN-CD-5','hot-deal','Atom C2750 · 8C/8T',8,'1 TB HDD',22.50,20.25],['NL','Amsterdam','HN-CD-6','hot-deal','Atom C2750 · 8C/8T',16,'1 TB HDD',24.95,22.46],
    ['GB','London','HN-CD-9','hot-deal','Xeon E3-1270 v2 · 4C/8T',32,'2 × 2 TB HDD',51.31,46.18],['GB','London','HN-UK1','uk-servers','Xeon E3-1220 v2 · 4C/4T',32,'2 × 1 TB SSD',59.99,53.99],['GB','London','HN-UK2','uk-servers','Xeon E5-2430 · 6C/12T',64,'4 × 250 GB SSD',79.99,71.99]])
    record(noc,{key:'hostnoc-'+sku.toLowerCase(),market,city,plan:sku,cpu,ram:ram+' GB',disk,regular,renewal:regular,price,url:'https://members.hostnoc.com/store/'+store+'/'+sku.toLowerCase()});

  const god={provider:'Godlike.host',source:'LowEndTalk',publishedAt:'2026-11-16',code:'LEB50',url:'https://godlike.host/letoffer',thread:'https://lowendtalk.com/discussion/comment/4922810',
    markets:['US','NL'],city:'',catalog:false,port:'1 Gbps',traffic:'5 TB outbound / month',
    conditions:note('各计费周期的首期均为半价，续费原价。进站流量不限量，每月出站 5 TB。商家列有美国与荷兰机房，按订单界面的 CPU 和位置组合供应。','各計費週期首期均為半價，續費原價。進站流量不限量，每月出站 5 TB。商家列有美國與荷蘭機房，各 CPU 與地點組合依結帳頁供應。','Half off the first invoice on any billing term. Renewals use the standard rate. Incoming traffic is unmetered and outbound transfer is 5 TB per month. Available CPU and location combinations are selected in the order form.','支払期間を問わず初回請求が半額、更新は通常額。受信は無制限、送信は月5 TB。米国・オランダで選択できる CPU と拠点の組み合わせは注文画面で確認してください。')};
  for(const [plan,cpu,cores,ram,disk,regular] of [['Nitro 1','EPYC 75F3',1,2,30,4],['Nitro 2','EPYC 75F3',2,4,50,8],['Ultra 1','Ryzen 9 9950X3D',1,2,30,5],['Ultra 2','Ryzen 9 9950X3D',2,4,50,10]])
    record(god,{key:'godlike-'+plan.toLowerCase().replace(' ','-'),plan,cpu:cores+' vCPU · '+cpu,ram:ram+' GB',disk:disk+' GB NVMe',regular,renewal:regular,price:regular*.5});

  const vmiss={provider:'VMISS',market:'HK',city:'Hong Kong',currency:'CAD',term:'year',code:'INTL20%OFF',source:'大鸟笔记',
    official:'https://app.vmiss.com/store/cn-hong-kong-intl',thread:'https://www.daniao.org/30610.html',evidenceUpdatedAt:'2026-11-20',
    alsoThreads:[{source:'VPS叮',thread:'https://vpsding.com/black-friday-2026/'}],
    conditions:note('媒体报道香港国际线 INTL 系列循环八折，按官方加元年费计算。百分号是优惠码的一部分，不能与全场九折叠加。商家未公布可核对的截止时间。','媒體報導香港國際線 INTL 系列循環八折，依官方加幣年費計算。百分號是代碼的一部分，無法與全場九折疊加。商家未公布可核對的截止時間。','Published community terms give the Hong Kong INTL series a recurring 20% discount. Quotes use the CAD annual rates. The percent sign is part of the code. The provider has not published a verifiable expiry.','報道では香港 INTL の年額が継続20%引き。公式 CAD 年額から算出し、% はコードの一部です。全体10%引きとの併用は不可。公式の期限は非公表です。')};
  for(const [sku,pid,disk,tb,regular] of [['CN.HK.INTL.Basic',38,10,1,30],['CN.HK.INTL.Core',39,15,2,60]])
    record(vmiss,{key:'vmiss-'+pid,sku,plan:sku,cpu:'1 vCPU',ram:'1 GB',disk:disk+' GB SSD',port:'500 Mbps',traffic:tb+' TB / month',regular,price:regular*.8,renewal:regular*.8,url:'https://app.vmiss.com/cart.php?a=add&pid='+pid});

  const wepc={provider:'WePC',source:'WePC_八卦台',thread:'https://t.me/WePC_AU/156',url:'https://wepc.au/',official:'https://wepc.au/',
    currency:'AUD',markets:[],catalog:false,evidenceUpdatedAt:'2026-11-14',alsoThreads:[{source:'VPS365',thread:'https://www.vps365.cn/posts/news-f35a6c87cdda9f520401'}],
    conditions:note('商家频道公布月付/季付九折、年付八折，部分区域与套餐除外。11 月报道再次列出两组码。具体型号与税费按当前订单核算，未公布通用到期时间。','商家頻道公布月繳／季繳九折、年繳八折，部分地區與方案除外。11 月報導再次列出兩組碼。實際型號與稅費依當前訂單計算，未公布通用到期時間。','Merchant-announced codes give 10% off monthly or quarterly billing and 20% off annual billing on eligible plans. A November report lists both codes. Region and SKU exclusions apply. No common expiry is published.','提供元の告知では対象プランの月・四半期払いが10%引き、年払いが20%引き。11月の報道でも両コードを掲載。地域・商品による除外があり、共通の期限は非公表です。')};
  record(wepc,{key:'wepc-monthly',plan:'Monthly / Quarterly VPS',term:'month',code:'WePCMON90',discount:'−10%',price:null});
  record(wepc,{key:'wepc-annual',plan:'Annual VPS',term:'year',code:'WePCYEAR80',discount:'−20%',price:null});
})();
