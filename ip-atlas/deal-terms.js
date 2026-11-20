/* Product-specific coupon terms and public invoice amounts. */
(() => {
  const observed = '2026-11-20';
  const terms = ['month','quarter','halfyear','year'];
  const byId = new Map(PLANS.map(plan => [plan.id, plan]));
  const locale = (sc, tc, en, ja) => ({sc, tc, en, ja});
  const annualGo = locale('补货频道列出年付循环八折，续订金额请以商家购物车为准。','補貨頻道列出年付循環八折，續訂金額請以商家購物車為準。','The restock channel quotes a recurring 20% annual discount. Confirm the renewal amount in the merchant cart.','再入荷情報では年払いが継続20%引き。更新額は注文画面でご確認ください。');
  const launchGo = locale('补货公告为四个付款周期逐项列出原价和八折码，名额以商家订单页为准。','補貨公告逐項列出四個付款週期的原價與八折碼，名額以商家訂購頁為準。','The restock notice lists the regular price and 20% coupon against each billing cycle. Redemption depends on remaining quota.','再入荷告知では各請求期間の通常額に20%割引コードを明記。適用枠は注文画面でご確認ください。');
  const marketNames = {AT: ['奥地利','奧地利','Austria','オーストリア'],EE:['爱沙尼亚','愛沙尼亞','Estonia','エストニア'],LT:['立陶宛','立陶宛','Lithuania','リトアニア'],LV:['拉脱维亚','拉脫維亞','Latvia','ラトビア'],BG:['保加利亚','保加利亞','Bulgaria','ブルガリア']};
  for (const [market, labels] of Object.entries(marketNames)) MARKETS[market] ||= locale(...labels);

  function addPlan(id, provider, market, city, sku, url, notes, spec) {
    if (byId.has(id)) return byId.get(id);
    const product = {id,provider,market,city,plan:sku,sku,kind:'vps',ip:'unknown',route:'unknown',carriers:[],routeName:'',url,proof:url,notes,spec:{sku,date:observed,proof:url,...spec}};
    PLANS.push(product);
    byId.set(id,product);
    return product;
  }
  function rates(product, amounts, currency, proof, date, priceType) {
    const rows = new Map((product.spec.billingRates || []).map(r => [r.term,r]));
    const primary = product.spec;
    if (primary.priceType === 'official' && primary.term && primary.price && !rows.has(primary.term)) {
      rows.set(primary.term,{term:primary.term,price:String(primary.price),currency:primary.currency,proof:primary.proof,date:primary.date,priceType:'official'});
    }
    for (const [term, amount] of Object.entries(amounts)) {
      const old = rows.get(term);
      if (old?.priceType === 'official' && priceType !== 'official') continue;
      if (old?.priceType === priceType && old.date >= date) continue;
      rows.set(term,{term,price:String(amount),currency,proof,date,priceType});
    }
    product.spec.billingRates = Array.from(rows.values());
  }
  function offer(plan, code, term, details) {
    const previous = COMMUNITY_OFFERS.find(o => o.code === code && o.term === term && o.planIds?.includes(plan.id));
    if (previous) return previous;
    const {cpu,ram,disk,port,traffic,currency} = plan.spec || {};
    const record = {id:'coupon12-'+plan.id+'-'+code.replace(/[^a-z0-9]+/gi,'-')+'-'+(term || 'terms'),provider:plan.provider,plan:plan.sku || plan.spec?.sku || plan.plan,kind:plan.kind,
      sku:plan.spec?.sku || plan.sku || plan.plan,planIds:[plan.id],markets:[plan.market],city:plan.city,code,term,terms:term?[term]:[],currency,cpu,ram,disk,port,traffic,stockKey:plan.stockKey,
      source:plan.provider,url:plan.url,official:plan.url,status:'offer',observed,evidenceUpdatedAt:observed,...details};
    if (record.discountPercent!=null) record.discount='−'+record.discountPercent+'%';
    COMMUNITY_OFFERS.push(record);
    return record;
  }
  const goRows = [
    ['FRA.Pulse.Nano','Hi,FRA','vpsts/4421','2026-11-18',[29,87,174,348]],
    ['HKG.Pulse.Mini','GOMAMI365','vpsts/4286','2026-11-01',[59,177,354,708]],
    ['HKG.Pulse.Nano','GOMAMI365','vpsuu/5936','2026-11-01',[49,147,294,588]],
    ['HKG.Turin.Mini','GOMAMI365','vpsuu/5907','2026-10-25',[69,207,414,828]],
    ['JPN.Pulse.Mini','GOMAMI365','GCPCN/1641','2026-10-24',[49,147,294,588]],
    ['JPN.Pulse.Nano','GOMAMI365','vpsts/4295','2026-11-03',[29,87,174,348]],
    ['LAX.Pulse.Nano','Hi,LAX','vpsts/4420','2026-11-18',[29,87,174,348]],
    ['SIN.Pulse.Mini','GOMAMI365','vpsts/4299','2026-11-05',[49,147,294,588]],
    ['SIN.Pulse.Nano','GOMAMI365','vpsts/4288','2026-11-01',[29,87,174,348]]
  ];
  for (const [sku,code,post,date,amounts] of goRows) {
    const product = byId.get('ms-gomami-'+sku.toLowerCase().replace(/\./g,'-'));
    if (!product?.spec) continue;
    const source = '@'+post.split('/')[0], thread = 'https://t.me/'+post;
    rates(product,Object.fromEntries(terms.map((t,i)=>[t,amounts[i]])),'USD',thread,date,'review');
    for (const [i, term] of terms.entries()) {
      if (code==='GOMAMI365' && term!=='year') continue;
      const price = (amounts[i] * .8).toFixed(2);
      offer(product,code,term,{price,regular:amounts[i].toFixed(2),priceBasis:'afterCode',renewal:code==='GOMAMI365'?price:undefined,source,thread,publishedAt:date,evidenceUpdatedAt:date,conditions:code==='GOMAMI365'?annualGo:launchGo});
    }
  }

  const edisBF = 'https://www.edisglobal.com/black-friday';
  const edisBFNote = locale('仅限指定机房新购年付。正常年价为 11 个月，活动再减 25%，金额未含税。','限指定機房新購年付。正常年價為 11 個月，活動再減 25%，金額未含稅。','New annual VPS orders in the listed facility. A regular year costs 11 monthly payments. The promotion takes another 25% off, excluding VAT.','指定施設の新規年払い限定。通常の年額は11か月分で、期間中はさらに25%引き。税別。');
  const edisFirst = locale('新客户的首台 VPS 循环九折；结账时确认付款周期及税额。','新客戶的首台 VPS 循環九折，結帳時確認付款週期及稅額。','New customers receive 10% recurring on their first VPS. The checkout confirms the term and tax.','新規顧客の最初のVPSは継続10%引き。対象期間と税額は注文画面をご確認ください。');
  const edisNotes = locale('官网端口一栏为机房上联。价格不含税。','官網連接埠欄位為機房上聯，價格未稅。','The quoted port capacity is the facility uplink. Prices exclude VAT.','速度は施設側アップリンク。価格は税別。');
  const edisQualifyingUrls=new Set();
  for (const [market,city,slug] of [
    ['AT','Vienna · NDC2','austria-vienna'],['EE','Tallinn','estonia-tallinn'],['LT','Vilnius','lithuania-vilnius'],['LV','Riga','latvia-riga'],
    ['PL','Warsaw','poland-warsaw'],['US','New York','usa-new-york'],['ES','Seville','spain-seville'],['BG','Sofia','bulgaria-sofia']
  ]) {
    const url='https://www.edisglobal.com/vps-hosting/'+slug;
    const product=addPlan('edis-'+slug+'-smart','EDIS Global',market,city,'KVM Smart',url,edisNotes,{term:'month',currency:'EUR',price:'4.99',cpu:market==='EE'?'1 vCPU · AMD EPYC':'1 vCPU · Intel',ram:'1 GB',disk:'15 GB SSD',port:market==='ES'?'2 × 1 Gbps uplink':'2 × 10 Gbps uplink',traffic:'1 TB'});
    rates(product,{month:'4.99'},'EUR',url,observed,'official');
    edisQualifyingUrls.add(url);
  }
  // One offer may cover several identical configurations across datacenters.
  // The directory uses the explicit plan IDs to show it on each eligible card.
  function attachGroup(row, products, url) {
    row.planIds=products.map(p=>p.id);
    row.markets=Array.from(new Set(products.map(p=>p.market)));
    if (products.length>1) {
      row.city='';
      row.official=url; row.url=url;
      for (const k of ['cpu','ram','disk','port','traffic','stockKey']) delete row[k];
    }
  }
  const edisPlans=PLANS.filter(p=>p.provider==='EDIS Global' && p.kind==='vps');
  const edisGroups=new Map();
  for (const product of edisPlans) {
    if (!edisQualifyingUrls.has(product.spec?.proof) && !edisQualifyingUrls.has(product.proof)) continue;
    const monthly=Number(product.spec.price);
    if (product.spec.currency!=='EUR'||!Number.isFinite(monthly)||monthly<=0) continue;
    const rate=product.spec.billingRates?.find(r=>r.term==='year'&&r.currency==='EUR');
    const regular=rate ? Number(rate.price) : monthly*11;
    if (!Number.isFinite(regular)||regular<=0) continue;
    const key=product.spec.sku+'|'+regular.toFixed(2);
    if (!edisGroups.has(key)) edisGroups.set(key,{regular,products:[]});
    edisGroups.get(key).products.push(product);
  }
  for (const {regular,products} of edisGroups.values()) {
    const row=offer(products[0],'EDIS-BF-2026','year',{regular:regular.toFixed(2),price:(regular*.75).toFixed(2),priceBasis:'afterCode',event:'black-friday',campaign:'black-friday-2026',start:'2026-11-24',endDate:'2026-12-06',thread:edisBF,conditions:edisBFNote});
    attachGroup(row,products,edisBF);
  }
  if (edisPlans.length) {
    const url='https://www.edisglobal.com/';
    const row=offer(edisPlans[0],'TRYMEOUT','',{thread:url,discountPercent:10,conditions:edisFirst});
    row.sku=row.plan='First VPS order';
    attachGroup(row,edisPlans,url);
  }
  const dedispec = byId.get('field-2267c7feb178');
  if (dedispec) offer(dedispec,'NewSite!','',{thread:'https://www.dedispec.com/servers/',discountPercent:10,
    conditions:locale('官网公布新订单减 10%。付款周期及续费金额以结账为准。','官網公布新訂單折抵 10%。付款週期及續費金額以結帳為準。','The merchant offers 10% off new orders. Check the billing cycle and renewal price at checkout.','新規注文は10%引き。対象期間と更新額は注文画面でご確認ください。')});

  const vnPromo='https://dataonline.vn/zh/sale-off-vps-hosting-vn/';
  const vnTerms=locale('越南经济型 Cloud VPS 2+ 起，新购至少 12 个月可减 40%。每项服务限一次优惠，续费按原价。','越南經濟型 Cloud VPS 2+ 起，新購至少 12 個月折抵 40%。每項服務限一次優惠，續費按原價。','New Vietnam economy Cloud VPS orders from tier 2+, minimum 12 months, 40% off. One promotion per service. Renewals use regular pricing.','ベトナムの廉価版Cloud VPS 2+以上。新規12か月以上で40%引き。1サービス1特典、更新時は通常料金。');
  for (const [tier,id,cpu,ram,disk,prices] of [
    ['2+',262,2,3,30,[186000,530000,990000,1936000]],['3+',263,3,6,40,[330000,930000,1760000,3399000]],
    ['4+',264,4,8,50,[480000,1368000,2592000,4968000]],['5+',265,5,10,80,[680000,1938000,3672000,6960000]],
    ['6',175,6,16,100,[890000,2536000,4800000,8960000]],['7',260,8,24,150,[1200000,3420000,6480000,12388000]],
    ['8',178,16,32,200,[1990000,5360000,10150000,19560000]]
  ]) {
    const url='https://my.dataonline.vn/?action=add&cmd=cart&id='+id;
    const spec={term:'month',price:String(prices[0]),currency:'VND',cpu:cpu+' vCPU',ram:ram+' GB',disk:disk+' GB NVMe',port:'200 Mbps',traffic:'Unlimited'};
    const product=addPlan('do-vn-cloud-'+id,'DataOnline','VN','Vietnam','Cloud VPS giá rẻ '+tier,url,vnTerms,spec);
    rates(product,Object.fromEntries(terms.map((t,i)=>[t,prices[i]])),'VND',url,observed,'official');
    const annual=prices[3];offer(product,'NOVVPS40','year',{regular:String(annual),price:String(Math.round(annual*.6)),renewal:String(annual),priceBasis:'afterCode',thread:vnPromo,start:'2026-11-01',endDate:'2026-11-30',conditions:vnTerms});
  }

  const hiConditions=locale('当前订购页公布台湾 NCR、美国、英国及德国 VPS 新单七折。付款周期和续费折扣以购物车为准。','訂購頁公布台灣 NCR、美國、英國及德國 VPS 七折，付款週期與續費折扣以購物車為準。','The storefront advertises 30% off Taiwan NCR, US, UK and German VPS. Confirm the billing period and renewal terms at checkout.','台湾NCR・米国・英国・ドイツのVPSは30%引き。請求期間と更新条件は注文画面をご確認ください。');
  const pqsTerms=locale('PQS 官方 11 月 19 日公布常规 VDS 循环折扣。须选对应付款周期，特价活动款另有条件。','PQS 官方 11 月 19 日公布常規 VDS 循環折扣。須選對應付款週期，特價活動款另有條件。','PQS published recurring discounts for regular VDS orders on 19 November. Choose the matching billing cycle. Promotional editions have separate terms.','11月19日に公式が通常VDS向け継続割引を告知。対応する支払期間を選択してください。特価商品は別条件です。');
  const pqsIds=['pqs-hinet','regional-pqs-hk-1','regional-pqs-hk-2','regional-pqs-hk-3','regional-pqs-jp-1','regional-pqs-vn-1','regional-pqs-vn-2','regional-pqs-vn-3','regional-pqs-vn-4'];
  const pqsPlans=pqsIds.map(id=>byId.get(id)).filter(Boolean);
  for (const [term,code,off] of [['month','PQS2026',9],['quarter','PQS2026-SEA',17],['halfyear','PQS2026-HFY',21],['year','PQS2026-YEA',27]]) {
    const details={discountPercent:off,thread:'https://t.me/pqsnews/1668',source:'PQS · @pqsnews',evidenceUpdatedAt:'2026-11-19',publishedAt:'2026-11-19',conditions:pqsTerms};
    const noPrice=[];
    for (const p of pqsPlans) {
      const rate=p.spec?.billingRates?.find(r=>r.term===term) || (p.spec?.term===term?p.spec:null);
      if (!rate || !Number.isFinite(Number(rate.price)) || Number(rate.price)<=0) {noPrice.push(p);continue;}
      const price=(Number(rate.price)*(100-off)/100).toFixed(2);
      offer(p,code,term,{...details,regular:String(rate.price),price,renewal:price,priceBasis:'afterCode',currency:rate.currency});
    }
    if (noPrice.length) {
      const row=offer(noPrice[0],code,term,details);
      if (noPrice.length>1) row.sku=row.plan='VDS · Standard';
      attachGroup(row,noPrice,'https://www.pqs.pw/cart.php');
    }
  }
  const mhySource='https://uu889.com/hoyoverse-20261114/';
  const mhyTerms=locale('11 月德国原生 9929 套餐报价列出月付八折。单独的年付 SKU 另有年价，叠加条件以结账为准。','11 月德國原生 9929 套餐報價列出月付八折。年付 SKU 另有年價，折扣併用條件以結帳為準。','The November report quotes 20% off these monthly German 9929 plans. Annual SKUs have separate prices and checkout terms.','ドイツ9929の指定月払いプランは11月掲載の20%割引。年払いSKUは個別の料金と注文条件が適用されます。');
  for (const id of ['mhy-p64','mhy-p56','mhy-p59','mhy-p60','mhy-p63']) {
    const product=byId.get(id);
    if (!product || product.market!=='DE' || product.spec?.term!=='month') continue;
    const regular=Number(product.spec.price);
    if (!Number.isFinite(regular)||regular<=0) continue;
    offer(product,'LTC2RCYB43','month',{regular:regular.toFixed(2),price:(regular*.8).toFixed(2),priceBasis:'afterCode',source:'UU889 · @vpsuu',thread:mhySource,
      alsoThreads:[{source:'@vpsuu',thread:'https://t.me/vpsuu/5974'}],evidenceUpdatedAt:'2026-11-15',publishedAt:'2026-11-15',conditions:mhyTerms});
  }
  for (const product of PLANS.filter(p=>p.provider==='HostingInside' && p.kind==='vps' &&
      (p.market==='TW' ? /^ktwncr/i.test(p.spec?.sku || '') : ['GB','DE','US','LAX','SJC','SEA'].includes(p.market)))) {
    offer(product,'30OFF','',{discountPercent:30,thread:'https://www.hostinginside.com/billing/store/kvm-virtual-server-non-china-premium-route-taipei-taiwan',conditions:hiConditions});
  }
  const isvoroSkus = new Set(["MO Lite","HK Lite A","HK Lite B","HK Lite C","HK Lite D","HK Lite E","HK Lite F","HK PROD MiNi","HK PROD Lite","HK PROD Starter","HK PROD Standard","HK PROD Pro","HK PROD Max","HK PROD Ultra","HK PROD Pro Max","HK PROD UltraPlus","HK BGP Core","HK BGP Standard","HK BGP Pro","HKT A1","USLA Pro Mini","USLA Pro Core","USLA Pro Standard","USLA Pro Pro","USLA 9929 Core","USLA 9929 Standard","USLA 9929 Pro","USLA 9929 Ultra","USLA PR Core","USLA PR Standard","US LA 2 Core","US LA 2 Pro","US LA 2 Ultra","JP BGP MiNi","JP BGP Lite","JP BGP Starter","JP BGP Standard","JP BGP Pro","DE9929 Lite","DE9929 Starter","DE9929 Standard","DE9929 Pro","DE9929 Max","GB ISP Lite","GB ISP Starter","GB ISP Standard","GB ISP Pro"].map(s=>s.replace(/\s/g,'').toLowerCase()));
  const isvoroNote=locale('趣云笔记公布月付、年付循环九五折。折后金额依商家报价计算，结账时确认。','趣雲筆記公布月付及年付循環九五折。折後金額依商家報價計算，請於結帳確認。','ECSCoupon reports a recurring 5% off monthly and annual orders. The estimated total uses the listed price. Confirm it in the merchant cart.','掲載元によると月払いと年払いは継続5%引き。表示額は公式価格からの試算で、注文画面でご確認ください。');
  for (const product of PLANS.filter(p=>p.provider.toLowerCase()==='isvoro' && isvoroSkus.has(String(p.spec?.sku || '').replace(/\s/g,'').toLowerCase()))) {
    const options=product.spec.billingRates || [{term:product.spec.term,price:product.spec.price,currency:product.spec.currency}];
    for (const rate of options.filter(r=>['month','year'].includes(r.term)&&Number(r.price)>0)) {
      const price=(Number(rate.price)*.95).toFixed(2);
      offer(product,'ECSCOUPON95',rate.term,{price,regular:String(rate.price),renewal:price,priceBasis:'afterCode',currency:rate.currency,source:'趣雲筆記 · ECSCoupon',thread:'https://www.ecscoupon.com/25866.html',publishedAt:'2026-11-06',evidenceUpdatedAt:'2026-11-06',conditions:isvoroNote});
    }
  }
  const servitroTerms=locale('法兰克福，官网列为售罄。页面公布循环折扣，补货后可按月订购。','法蘭克福，官網列為售罄。頁面公布循環折扣，補貨後可按月訂購。','The Frankfurt storefront lists recurring monthly prices. These models were sold out when the offer was observed.','フランクフルトの月払い継続割引。掲載時は売り切れでした。');
  for (const [family,tier,chip,cpu,ram,disk,traffic,regular,price,code] of [
    ['ryzen',2,'Ryzen 9 9950X',2,8,50,2,16,8,'7Y8CF9D3CD'],
    ['epyc',3,'EPYC 7763',3,12,75,3,12,8,'5UJ2B9JGID'],
    ['epyc',4,'EPYC 7763',4,16,100,4,16,12,'99WQHJMGIC']
  ]) {
    const url='https://servitro.com/'+family, sku='Virtual-'+tier+' · '+chip;
    const product=addPlan('servitro-'+family+'-v'+tier,'Servitro','DE','Frankfurt',sku,url,servitroTerms,{term:'month',currency:'USD',price:regular.toFixed(2),cpu:cpu+' vCPU · '+chip,ram:ram+' GB',disk:disk+' GB SSD',port:'10 Gbps',traffic:traffic+' TB'});
    offer(product,code,'month',{price:price.toFixed(2),regular:regular.toFixed(2),renewal:price.toFixed(2),priceBasis:'afterCode',stockAtPublication:'sold-out',stockObservedAt:observed,thread:url,conditions:servitroTerms});
  }
  const hostwinds=byId.get('field-e42822b3e391');
  if (hostwinds) offer(hostwinds,'WELCOME15','month',{regular:'4.99',price:'4.24',priceBasis:'afterCode',thread:'https://www.hostwinds.com/special-offers',
    conditions:locale('官网 VPS 优惠减 15%，金额按公开月费计算。请于结账确认续费价。','官網 VPS 折抵 15%，金額按公開月費計算。請於結帳確認續費價。','The merchant offers 15% off VPS hosting. The net amount is calculated from the monthly list price. Confirm renewal at checkout.','VPSは公式案内で15%引き。公開月額から割引額を計算。更新額は注文画面でご確認ください。')});

})();
