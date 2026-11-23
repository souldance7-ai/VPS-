'use strict';

(() => {
 const observed = '2026-11-23';
 const blackFriday = {event: 'black-friday', campaign: 'black-friday-2026'};
 const note = (sc, tc, en, ja) => ({sc, tc, en, ja});
 const monthUSD = {term: 'month', currency: 'USD', priceType: 'official'};
 const catalogueDefaults = {kind: 'vps', ip: 'unknown', route: 'unknown', routeName: '', carriers: []};

 function addPlan({spec, ...plan}) {
  const product = {
   ...catalogueDefaults, ...plan, plan: plan.sku,
   spec: {sku: plan.sku, proof: plan.proof, date: observed, ...spec}
  };
  PLANS.push(product);
  return product;
 }

 function addOffer(product, terms) {
  const {currency, term, price, cpu, ram, disk, port, traffic} = product.spec;
  COMMUNITY_OFFERS.push({
   id: 'nov23-' + product.id, provider: product.provider, plan: product.sku, sku: product.sku,
   planIds: [product.id], markets: [product.market], city: product.city, kind: product.kind,
   currency, term, price, cpu, ram, disk, port, traffic, observed,
   url: product.url, official: product.proof, priceBasis: 'official', ...terms
  });
 }

 const servury = 'https://servury.com/servers/';
 const servuryPost = 'https://lowendtalk.com/discussion/223696/black-friday-specials-servury-no-kyc-encrypted-vps-from-4-99-mo-30-off-10x-giveaway';
 const servuryTerms = note(
  '优惠码仅享首期七折，续费恢复原价。适用蒙特利尔和阿姆斯特丹 Blackbox 套餐，售完即止。商家按 31 天计一个月。',
  '優惠碼僅享首期七折，續費恢復原價。適用蒙特婁和阿姆斯特丹 Blackbox 方案，售完即止。商家按 31 天計一個月。',
  'The code takes 30% off the first payment for Blackbox in Montreal and Amsterdam while quantities last. Renewals use the regular rate. The provider defines a billing month as 31 days.',
  'モントリオールとアムステルダムの Blackbox が在庫限りで初回30%引き。更新は通常料金です。事業者の1か月は31日です。'
 );
 for (const [market, city, locationId, nanoId, coreId] of [
  ['CA', 'Montreal', 2, 138, 108], ['NL', 'Amsterdam', 6, 139, 120]
 ]) {
  for (const [sku, planId, cpu, ram, disk, traffic, regular, discounted] of [
   ['Blackbox Nano', nanoId, '1 vCPU', '2 GB DDR4', '25 GB NVMe', '2 TB / 31 days', '4.99', '3.49'],
   ['Blackbox Core', coreId, '2 vCPU', '4 GB DDR4', '50 GB NVMe', '4 TB / 31 days', '9.99', '6.99']
  ]) {
   const url = `https://servury.com/order/?location=${locationId}&plan=${planId}&step=3`;
   const product = addPlan({
    id: 'servury-blackbox-' + planId, provider: 'Servury', market, city, sku, url, proof: servury,
    spec: {
     ...monthUSD, price: regular, proof: url, cpu, cpuModel: 'AMD EPYC 7B13', cpuModelScope: 'official',
     cpuModelSource: servuryPost, cpuModelDate: '2026-11-22', ram, disk, port: '10 Gbps', traffic,
     monthlyTraffic: traffic, diskType: 'NVMe'
    }
   });
   addOffer(product, {
    ...blackFriday, source: 'LowEndTalk', thread: servuryPost, status: 'offer', code: 'BFLET30',
    start: '2026-11-22', publishedAt: '2026-11-22', endDate: '2026-12-06', couponTerms: ['month'],
    cpu: cpu + ' · AMD EPYC 7B13', discount: '−30%', discountPercent: 30, priceBasis: 'afterCode',
    price: discounted, regular, renewal: regular, conditions: servuryTerms
   });
  }
 }

 const dediPost = 'https://t.me/vpsuu/6020';
 const dediStock = 'https://stock.vpsknow.com/provider/dedirock/dedirock-279';
 const dediUrl = 'https://billing.dedirock.com/cart.php?a=add&pid=279';
 const dediTerms = note(
  '补货频道报价为 12.88 美元年付，含一个 IPv4。11 月 23 日第三方监测曾显示有货，当前库存和续费价格请以商家结账页为准。',
  '補貨頻道報價為 12.88 美元年付，含一個 IPv4。11 月 23 日第三方監測曾顯示有貨，目前庫存和續費價格請以商家結帳頁為準。',
  'The restock channel quotes USD 12.88 per year with one IPv4. A third-party monitor reported availability on November 23. Check current availability and renewal pricing at checkout.',
  '再入荷チャンネルの案内は年額12.88米ドル、IPv4アドレス1個付きです。11月23日に外部モニターで在庫を確認。現在の在庫と更新料金は注文時にご確認ください。'
 );
 const dedirock = addPlan({
  id: 'dedirock-lax-279', provider: 'DediRock', market: 'LAX', city: 'Los Angeles', sku: 'Promo 2 GB KVM VPS LA',
  url: dediUrl, proof: dediStock, searchTerms: ['DediRock 279', 'KVM'], notes: dediTerms,
  spec: {
   term: 'year', currency: 'USD', price: '12.88', priceType: 'review', cpu: '1 vCPU',
   ram: '2 GB', disk: '30 GB SSD', diskType: 'SSD', port: '1 Gbps', traffic: '2 TB'
  }
 });
 addOffer(dedirock, {
  source: '@vpsuu', thread: dediPost, alsoThreads: [{source: 'VPSKnow Stock', thread: dediStock}],
  status: 'checkout', event: 'restock', codeRequired: false, priceBasis: '', official: '', conditions: dediTerms
 });

 const genix = 'https://genixnode.com/vps/turkey';
 const genixPost = 'https://lowendtalk.com/discussion/comment/4930641';
 const genixStore = 'https://genixnode.com/billing/store/vps';
 const genixNotes = note(
  '伊斯坦布尔机房。商家标示为 Intel Xeon 系列，具体型号未公布。下单时选择 Istanbul，以结账页的库存和价格为准。',
  '伊斯坦堡機房。商家標示為 Intel Xeon 系列，具體型號尚未公布。下單時選擇 Istanbul，以結帳頁的庫存和價格為準。',
  'Istanbul runs Intel Xeon processors. Choose Istanbul during checkout and confirm the available configuration and rate.',
  'イスタンブール拠点は Intel Xeon シリーズを採用。注文時に Istanbul を選択し、構成と料金をご確認ください。'
 );
 for (const [name, size, orderSuffix, cores, storage, diskType, price] of [
  ['Nova', 4, '/cart.php?a=add&billingcycle=monthly&pid=38', 2, 40, 'NVMe', '2.99'],
  ['Pulse', 8, '/cart.php?a=add&billingcycle=monthly&pid=39', 4, 60, 'NVMe', '5.99'],
  ['Apex', 12, '/cart.php?a=add&billingcycle=monthly&pid=41', 4, 90, 'NVMe', '8.99'],
  ['Forge', 16, '/store/vps/aydin-vps-x16', 6, 120, 'SSD', '10.99'],
  ['Titan', 24, '/store/vps/aydin-vps-x24', 6, 180, 'NVMe', '15.99'],
  ['Vertex', 32, '/store/vps/aydin-vps-x32', 6, 180, 'NVMe', '20.99']
 ]) {
  const sku = `${name} VPS x${size}`;
  const specs = {
   ...monthUSD, price, priceType: 'from', cpu: cores + ' vCPU', cpuFamily: 'Intel Xeon',
   cpuModelScope: 'official', cpuModelSource: genix, cpuModelDate: observed,
   ram: size + ' GB', disk: `${storage} GB ${diskType}`, diskType
  };
  if (size <= 12) Object.assign(specs, {port: '1 Gbps', traffic: 'Unmetered (FUP)'});
  if (size === 16) Object.assign(specs, {port: '1 Gbps', traffic: 'Unmetered'});
  if (size === 4) specs.billingRates = [{
   term: 'year', currency: 'USD', price: '28.68', priceType: 'official', date: observed, proof: genixPost
  }];
  const product = addPlan({
   id: 'genixnode-istanbul-x' + size, provider: 'GenixNode', market: 'TR', city: 'Istanbul', sku,
   url: 'https://genixnode.com/billing' + orderSuffix, proof: genix, searchTerms: ['Türkiye', 'Turkey', '土耳其', 'KVM'],
   notes: genixNotes, spec: specs
  });
  if (size === 4) addOffer(product, {
   official: genixStore, source: 'LowEndTalk', thread: genixPost, event: 'product-launch',
   status: 'catalog', codeRequired: false, conditions: note(
    '伊斯坦布尔官网公布月付 2.99 美元，商家公告列出年付 28.68 美元。计费币种为美元，库存和税费以结账页面为准。',
    '伊斯坦堡官網公布月付 2.99 美元，商家公告列出年付 28.68 美元。計費幣別為美元，庫存與稅費以結帳頁面為準。',
    'The Istanbul storefront lists USD 2.99 monthly. The provider announcement quotes USD 28.68 annually. Check availability and taxes at checkout.',
    'イスタンブールの掲載価格は月額2.99米ドル。事業者の告知では年額28.68米ドルです。在庫と税額は購入画面でご確認ください。'
   )
  });
 }

 const alex = 'https://alexhost.com/vps/';
 const alexPost = 'https://lowendtalk.com/discussion/223582/alexhost-com-blackfriday-deal-up-to-30-off-recurring-limited-vpn-offer';
 const alexPlans = [];
 for (const [market, city, slug] of [
  ['GB', 'London', 'england'], ['RO', 'Bucharest', 'romania'], ['BG', 'Sofia', 'bulgaria']
 ]) {
  const url = alex + 'vps-europe/vps-' + slug + '/';
  alexPlans.push(addPlan({
   id: 'alexhost-u2-' + market.toLowerCase(), provider: 'AlexHost', market, city, sku: 'U2', url, proof: url,
   spec: {
    term: 'month', currency: 'EUR', price: '10.00', priceType: 'official', cpu: '2 vCPU',
    ram: '4 GB', disk: '40 GB NVMe', diskType: 'NVMe', port: '1 Gbps'
   }
  }));
 }
 addOffer(alexPlans[0], {
  ...blackFriday, plan: 'U2 · UK / RO / BG', planIds: alexPlans.map(product => product.id),
  markets: alexPlans.map(product => product.market), city: '', url: alex, official: 'https://alexhost.com/',
  source: 'LowEndTalk', thread: alexPost, publishedAt: '2026-11-20', start: '2026-11-20',
  status: 'limited', code: '30BF', couponTerms: ['month'], discount: '−30%', discountPercent: 30,
  priceBasis: 'afterCode', price: '7.00', regular: '10.00', renewal: '7.00', conditions: note(
   '英国、罗马尼亚和保加利亚的指定 VPS 使用优惠码享月付七折。商家公布共 60 个名额，未公布固定截止时间。优惠及月付续费请以结账页为准。',
   '英國、羅馬尼亞和保加利亞的指定 VPS 使用優惠碼享月付七折。商家公布共 60 個名額，未公布固定截止時間。優惠及月付續費請以結帳頁為準。',
   'The code gives 30% off eligible monthly VPS in the UK, Romania and Bulgaria. The merchant announced 60 slots with no fixed end date. Check redemption and monthly renewal at checkout.',
   '英国・ルーマニア・ブルガリアの対象月額 VPS がコードで30%引き。先着60台で終了日の発表はありません。適用と月額更新料金は注文時にご確認ください。'
  )
 });
})();
