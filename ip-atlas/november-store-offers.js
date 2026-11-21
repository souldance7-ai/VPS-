'use strict';

(() => {
 const observed='2026-11-22T00:00:00+08:00';
 const blackFriday={event:'black-friday',campaign:'black-friday-2026'};
 const note=(sc,tc,en,ja)=>({sc,tc,en,ja});
 const catalogue=ATLAS_MERCHANT_SEED.plans;
 const price=value=>Number(value).toFixed(2);

 function skuOffer(product,terms){
  return {
   id:'nov22-'+product.id,provider:product.provider,plan:product.sku,sku:product.sku,
   planIds:[product.id],markets:product.market==='ZZ'?[]:[product.market],city:product.city,
   kind:product.kind,priceBasis:'official',currency:product.currency,term:product.term,
   price:product.price,cpu:product.cpu,ram:product.ram,disk:product.disk,port:product.port,traffic:product.traffic,
   url:product.orderUrl||product.source,official:product.source,routeName:product.routeName,
   observed,status:'checkout',...terms
  };
 }

 const lazy=catalogue.find(row=>row.provider==='LazyCat'&&row.source.endsWith('/jp/23')&&row.sku.includes('Nano'));
 if(lazy){
  COMMUNITY_OFFERS.push(skuOffer(lazy,{
   source:'LazyCatCloud',thread:'https://t.me/s/lazycat_notice',event:'product-launch',
   codeRequired:false,
   conditions:note('日本 GLBB 动态家宽。LXC、IPv4 NAT，Nano 特别款按月付。商家创建实例页可核对库存。',
    '日本 GLBB 動態家寬。LXC、IPv4 NAT，Nano 特別款按月付。可在商家建立實例頁核對庫存。',
    'Japanese GLBB dynamic residential access. The Nano offer uses LXC with IPv4 NAT and monthly billing. Check availability in the merchant panel.',
    '日本の GLBB 動的住宅回線です。Nano 特別版は LXC、IPv4 NAT、月払いです。在庫は公式注文ページで確認できます。')
  }));
 }

 for(const product of catalogue.filter(row=>row.provider==='HostUS'&&row.source.endsWith('/2026-black-friday-end-of-year-specials'))){
  COMMUNITY_OFFERS.push(skuOffer(product,{
   ...blackFriday,source:'HostUS',codeRequired:false,
   conditions:note('官网列出的年付特价。机房选项、库存和续费金额在下单时核对。',
    '官網列出的年付特價。機房選項、庫存和續費金額請在下單時核對。',
    'Merchant’s listed annual sale price. Check the location options, availability and renewal rate when ordering.',
    '公式ページ掲載の年払い特価です。注文時に拠点、在庫、更新料金を確認してください。')
  }));
 }

 const friend='https://friendhosting.net/en/promo/bfday26.php';
 const friendTerms=note('新客户新购指定 SSD、High CPU 或 HDD VDS，首个付款周期打四折。这里是按官网默认月价计算的首月参考价。季付及机房加价以结账为准，后续按正常价格续费。',
  '新客戶新購指定 SSD、High CPU 或 HDD VDS，首個付款週期打四折。這裡是按官網預設月價計算的首月參考價。季付及機房加價以結帳為準，後續按正常價格續費。',
  'New customers receive 60% off the first billing period for eligible SSD, High CPU or HDD VDS plans. The monthly estimate uses the displayed default rate. Verify quarterly and location-specific prices at checkout. Renewals use the applicable regular rate.',
  '新規顧客の対象 SSD・High CPU・HDD VDS は初回の支払期間のみ60%引きです。月額は標準表示から計算した参考額です。四半期払いと拠点別料金は注文画面で確認できます。更新は通常料金です。');
 for(const product of catalogue.filter(row=>row.provider==='Friendhosting'&&Number(row.price)>0)){
  COMMUNITY_OFFERS.push(skuOffer(product,{
   ...blackFriday,source:'Friendhosting',official:friend,thread:friend,status:'offer',start:'2026-11-19',endDate:'2026-12-20',
   plan:product.family+' · '+product.sku,code:'bfday26',couponTerms:['month','quarter'],
   discount:'−60%',priceBasis:'afterCode',regular:product.price,renewal:product.price,price:price(Number(product.price)*0.4),conditions:friendTerms
  }));
 }

 const edgeArticle='https://www.vpsgo.com/edgenat-black-friday-2026.html';
 const edgeTerms=note('活动发布页列出 VPS 月付及续费七折，独服不参加。这里以商家公开常规月费计算。实际库存、用码及可叠加情况以结账为准。',
  '活動發布頁列出 VPS 月付及續費七折，獨服不參加。這裡以商家公開常規月費計算。實際庫存、用碼及可疊加情況以結帳為準。',
  'The published VPS promotion gives 30% off monthly orders and renewals. Dedicated servers are excluded. The quote uses the merchant’s public base rate. Confirm stock and coupon acceptance at checkout.',
  '公開告知では VPS の月額と更新が30%引きです。専用サーバーは対象外です。掲載の通常月額を基に計算し、在庫と適用状況は決済時に確認できます。');
 for(const product of catalogue.filter(row=>row.provider==='edgeNAT'&&row.term==='month'&&Number(row.price)>0&&!/特惠/.test(row.sku))){
  const oldId={'韓國 G1':'tg-vpsuu-edgenat-kr-g1','韓國 G2':'tg-vpsuu-edgenat-kr-g2'}[product.sku];
  const dealPrice=price(Number(product.price)*0.7);
  const terms={...blackFriday,source:'VPS GO',thread:edgeArticle,code:'NBD71E0D1V',status:'offer',
   endDate:'2026-11-30',discount:'−30%',priceBasis:'afterCode',regular:product.price,renewal:dealPrice,price:dealPrice,
   conditions:edgeTerms};
  const known=oldId&&COMMUNITY_OFFERS.find(row=>row.id===oldId);
  if(known)Object.assign(known,blackFriday,{evidenceUpdatedAt:observed,renewal:dealPrice,
   alsoThreads:[...(known.alsoThreads||[]),{source:'VPS GO',thread:edgeArticle}]});
  else COMMUNITY_OFFERS.push(skuOffer(product,terms));
 }

 const hostYun='https://www.hostyun.com/';
 COMMUNITY_OFFERS.push({
  id:'nov22-hostyun',provider:'HostYun',source:'HostYun',plan:'HostYun VPS',kind:'vps',status:'checkout',
  markets:['HK','JP','LAX','KR'],url:hostYun,official:hostYun,observed,discount:'−10%',code:'hostyun',
  planIds:catalogue.filter(row=>row.provider==='HostYun').map(row=>row.id),
  conditions:note('官方首页公布全场九折码。截止日期、付款周期及续费条件需结账确认。',
   '官方首頁公布全場九折碼。截止日期、付款週期及續費條件需結帳確認。',
   'The official homepage advertises 10% off. Confirm the end date, billing term and renewal rules at checkout.',
   '公式トップページ掲載の10%引きコードです。終了日、支払い期間、更新条件は決済画面で確認できます。')
 });

 const orangeStore='https://portal.orangevps.com/store/vps-budget';
 COMMUNITY_OFFERS.push({
  id:'nov22-orangevps-bf',...blackFriday,provider:'OrangeVPS',source:'国外VPS测评',plan:'BF26 · Annual VPS',kind:'vps',
  markets:['US','LAX','JP','SG','HK'],official:orangeStore,url:orangeStore,code:'BF2026GOODYEAR',term:'year',
  observed,discount:'−10%',status:'checkout',thread:'https://www.gwvpsceping.com/en/20762.html',
  alsoThreads:[{source:'国外主机分享',thread:'https://www.zjfx.net/45832.html'}],
  conditions:note('转载的商家公告写明指定 BF26 年付可再打九折，续费同样打折，限量且不可叠加。当前商店入口需核对活动机型和代码可用性。',
   '轉載的商家公告寫明指定 BF26 年付可再打九折，續費同樣打折，限量且不可疊加。目前商店入口需核對活動機型和代碼可用性。',
   'The republished vendor announcement describes a limited, non-stackable 10% recurring discount on eligible BF26 annual plans. Confirm that the promotional SKU and code are available in the shop.',
   '販売元告知の転載では、対象 BF26 年払いが更新時も10%引きです。数量限定・併用不可です。ストアで対象プランとコードの有効性を確認できます。')
 });

 const sydney='https://streamline-servers.com/dedicated-servers/sydney-australia';
 const streamlineThread='https://lowendtalk.com/discussion/223393/streamline-servers-com-sydney-dedicated-servers-early-black-friday';
 const streamlineTerms=note('悉尼 Equinix SY5 独服。商家帖给出 50 TB 配额、1 或 10 Gbps 接口，免开通费。库存与具体速率以订单配置为准。',
  '雪梨 Equinix SY5 獨服。商家貼文列出 50 TB 配額、1 或 10 Gbps 介面，免開通費。庫存與實際速率以訂單配置為準。',
  'Sydney Equinix SY5 dedicated server. The provider lists 50 TB transfer, 1 or 10 Gbps ports and no setup fee. Check the port option and availability in the order configuration.',
  'シドニー Equinix SY5 の専用サーバーです。告知では転送量50 TB、1または10 Gbps ポート、初期費用無料です。注文画面で構成と在庫を確認できます。');
 for(const [pid,model,ram,disk] of [
  [344,'Intel Xeon E3-1230 v3','32 GB DDR3 ECC','500 GB SSD'],
  [531,'Intel Xeon E3-1240 v6','32 GB DDR4 ECC','250 / 500 GB SSD']
 ]){
  const id='streamline-syd-'+pid;
  const url='https://billing.streamline-servers.com/cart.php?a=add&pid='+pid+'&currency=4&promocode=BLACKFRIDAY26SERVER';
  const spec={sku:model,cpu:'4 cores',cpuModel:model,cpuModelScope:'official',
   cpuModelSource:streamlineThread,cpuModelDate:'2026-11-22',ram,disk,port:'1 / 10 Gbps',traffic:'50 TB',date:'2026-11-22',proof:streamlineThread};
  PLANS.push({id,provider:'Streamline Servers',market:'AU',city:'Sydney',sku:model,plan:model,kind:'bare',
   ip:'unknown',route:'unknown',routeName:'',carriers:[],url,proof:sydney,notes:streamlineTerms,
   searchTerms:['Streamline-Servers','Equinix SY5'],spec});
  COMMUNITY_OFFERS.push({
   id:'nov22-'+id,...blackFriday,provider:'Streamline Servers',source:'LowEndTalk',plan:model,sku:model,
   planIds:[id],markets:['AU'],city:'Sydney',kind:'bare',url,official:sydney,thread:streamlineThread,
   observed,status:'offer',endDate:'2026-11-30',code:'BLACKFRIDAY26SERVER',currency:'USD',term:'month',
   price:'45.00',priceBasis:'afterCode',cpu:spec.cpu+' · '+model,ram,disk,port:spec.port,traffic:spec.traffic,conditions:streamlineTerms
  });
 }
})();
