'use strict';
// Published merchant offers, collected on 20 November 2026. Offer periods and checkout stock are independent.
(function addNovemberMerchantOffers() {
  const observed = '2026-11-20';
  const blackFriday = {event:'black-friday', campaign:'black-friday-2026'};
  const note = (sc, tc, en, ja) => ({sc, tc, en, ja});
  const letUrl = path => 'https://lowendtalk.com/discussion/' + path;
  const gb = value => value + ' GB';
  const vcpu = value => value + ' vCPU';
  const transfer = value => value + ' TB / month';
  const money = value => Number(value).toFixed(2);
  const rowsById = new Map(COMMUNITY_OFFERS.map(row => [row.id, row]));
  const plansById = new Map(PLANS.map(plan => [plan.id, plan]));
  function offer(defaults, item) {
    const row = {kind:'vps', observed, source:'LowEndTalk', priceBasis:'official', status:'offer', ...defaults, ...item};
    row.id = 'let11-' + row.key;
    row.markets = row.market ? [row.market] : [];
    row.planIds = row.market ? [row.id] : [];
    row.price = money(row.price);
    if (row.regular != null) row.regular = money(row.regular);
    if (row.renewal != null) row.renewal = money(row.renewal);
    row.official ||= row.url;
    row.sku ||= row.plan;
    if (row.stockAtPublication === 'sold-out' && row.provider === 'DeluxHost') {
      const status = note('11 月 20 日，商家将此规格标为售罄。','11 月 20 日，商家將此規格標為售罄。',
        'The merchant marked this SKU out of stock on 20 November.','11月20日の商品ページではこの構成は完売でした。');
      row.conditions = Object.fromEntries(Object.keys(status).map(lang => [lang,status[lang]+' '+row.conditions[lang]]));
    }
    delete row.key;
    delete row.market;
    if (rowsById.has(row.id)) return;
    COMMUNITY_OFFERS.push(row);
    rowsById.set(row.id, row);
    for (const market of row.markets) {
      const spec = {sku:row.sku, currency:row.currency, term:row.term, cpu:row.cpu, ram:row.ram,
        disk:row.disk, port:row.port || '', traffic:row.traffic || '', date:observed, proof:row.official, sourceNote:row.conditions};
      Object.defineProperty(spec, 'price', {enumerable:true, get() {
        const stage = communityStage(row);
        // A renewal for subscribers is not a new customer's post-sale price.
        if (stage === 'upcoming' || stage === 'expired') return row.regular || '';
        if (row.endDate && stage === 'checkout') return row.regular || '';
        return row.price;
      }});
      const p = {id:row.id, market, city:row.city, provider:row.provider, plan:row.plan, sku:row.sku,
        kind:row.kind, ip:'unknown', route:'unknown', routeName:'', carriers:[], notes:row.conditions,
        url:row.url, proof:row.official, spec};
      if (row.stockKey) p.stockKey = row.stockKey;
      if (row.lg) p.lg = row.lg;
      if (!plansById.has(p.id)) { PLANS.push(p); plansById.set(p.id, p); }
      if (row.ipv4Use && typeof IP_EVIDENCE !== 'undefined') {
        IP_EVIDENCE.set(p.id, [{dimension:'sharing', value:row.ipv4Use, provider:p.provider, market,
          sku:p.sku, url:row.thread || row.official, scope:'sku', checked:observed, note:row.conditions}]);
      }
    }
  }
  function addForumEvidence(row, thread, publishedAt) {
    Object.assign(row, blackFriday, {publishedAt});
    row.alsoThreads ||= [];
    if (row.thread !== thread && !row.alsoThreads.some(s => s.thread === thread)) row.alsoThreads.push({source:'LowEndTalk', thread});
  }
  const rackForum = letUrl('223558/racknerd-s-black-friday-takeover-new-deals-new-tech-adminbolt-hosting-hundreds-of-giveaways');
  for (const row of COMMUNITY_OFFERS.filter(r => r.id.startsWith('racknerd-bf26-'))) {
    addForumEvidence(row, rackForum, '2026-11-19');
    row.codeRequired = false;
  }
  const avaForum = letUrl('223492/ava-hosting-black-friday-deals-big-restock-vps-nano-giveaways');
  for (const row of COMMUNITY_OFFERS.filter(r => r.provider === 'AvaHost' && r.code === 'BFAVA')) {
    addForumEvidence(row, avaForum, '2026-11-18');
  }

  const d4 = {provider:'D4 Networks', publishedAt:'2026-11-17', campaign:'thanksgiving-2026',
    end:'2026-11-27T07:59:00Z', currency:'USD', term:'year', status:'limited', codeRequired:false, ipv4Use:'dedicated-ipv4',
    thread:letUrl('223445/d4-networks-kvm-vps-deals-from-69-yr-nvme-ipv4-64-new-york-dallas-amsterdam'),
    conditions:note('限量年付。续费同价，含独立 IPv4 和 IPv6 /64。在原帖提交订单号可多获一个月。','限量年繳。續費同價，含獨立 IPv4 和 IPv6 /64。在原帖提供訂單號可多得一個月。','Annual renewals keep the quoted rate. Includes a dedicated IPv4 and routed IPv6 /64. Post the order number in the thread to claim a 13th month.','数量限定の年払いで更新も同額。専用 IPv4 と IPv6 /64 を含み、元記事に注文番号を投稿すると利用期間が1か月延長されます。')};
  for (const [site,market,city,port] of [[0,'US','New York','2.5 Gbps'],[1,'US','Dallas','4 Gbps'],[2,'NL','Amsterdam','2.5 Gbps']]) {
    for (const [firstPid,cores,ram,disk,tb,price] of [[73,2,5,100,6,69],[76,3,7,140,8,89]]) {
      const pid = firstPid + site;
      offer(d4, {key:'d4-'+pid, market, city, plan:'KVM '+ram+' GB', sku:String(pid), cpu:vcpu(cores),
        ram:gb(ram), disk:gb(disk)+' NVMe', traffic:transfer(tb), port, price, renewal:price, url:'https://my.d4networks.com/cart.php?a=add&pid='+pid});
    }
  }

  const pre = {...blackFriday, provider:'Prepaid-Host', publishedAt:'2026-11-12', end:'2026-11-26T22:59:00Z',
    market:'DE', city:'Frankfurt', currency:'EUR', port:'2 Gbps', traffic:transfer(10), stockAtPublication:'sold-out', status:'limited',
    stockObservedAt:'2026-11-20', codeRequired:false, lg:'https://lg.prepaid-host.com/',
    thread:letUrl('223243/prepaid-host-pre-bf-frankfurt-epyc-kvm-8gb-58-80-yr-16gb-7-99-mo'),
    conditions:note('11 月 20 日商品页显示售罄。续费同价，含 IPv4，月流量用完后适用公平使用政策。','11 月 20 日商品頁顯示售罄。續費同價，含 IPv4，用完月流量後適用公平使用政策。','The SKU showed sold out on 20 November. Renewals keep the deal rate. Includes one IPv4. Fair use applies after the monthly transfer allowance.','11月20日に各商品ページで完売を確認。更新は同額で IPv4 を1個含みます。月間転送量を超えるとフェアユースが適用されます。')};
  for (const [name,cores,ram,disk,term,price] of [['PreBF-8',4,8,180,'year',58.80],['PreBF-10',6,10,200,'month',6.39],['FLASH-16',6,16,250,'month',7.99]]) {
    const key='prepaid-'+ram;
    offer(pre, {key,stockKey:'let11-'+key,plan:name,cpu:vcpu(cores),ram:gb(ram),disk:gb(disk)+' NVMe',price,renewal:price,term,url:'https://prepaid-host.com/en/aktion/'+name.toLowerCase()});
  }

  const hostdz = {...blackFriday, provider:'HostDZire', publishedAt:'2026-10-16', market:'IN', city:'Mumbai', currency:'EUR', term:'year', port:'1 Gbps',
    thread:letUrl('222164/early-black-friday-sale-'),
    conditions:note('LowEndTalk 专属报价，未含税及手续费。流量合计上下行。商家未承诺长期保留该价格。','LowEndTalk 專屬報價，未含稅及手續費。流量合計上下行。商家未承諾長期維持此價。','Provider-posted LET price before taxes and transaction charges. Uploads and downloads count together. The provider may revise prices.','LET 向けの税・手数料別価格。上下双方向の転送量を合算します。提供元は価格の据え置きを保証していません。')};
  for (const [pid,cores,ram,disk,tb,price] of [[1261,2,4,40,4,21],[1262,4,6,80,4,30],[1263,8,12,120,8,45],[1264,12,24,240,12,71]]) {
    offer(hostdz,{key:'hostdz-'+pid,plan:'IN CloudVPS Special #'+(pid-1258),sku:String(pid),cpu:vcpu(cores),ram:gb(ram),disk:gb(disk)+' NVMe',traffic:transfer(tb),price,
      url:'https://hostdzire.com/billing/cart.php?a=add&pid='+pid+'&currency=1&billingcycle=annually'});
  }
  for (const [pid,cores,ram,disk,tb,price] of [[1320,1,2,'500 GB',1,18],[1321,2,3,'1 TB',2,29],[1322,2,4,'2 TB',4,58],[1323,4,6,'4 TB',8,93]]) {
    offer(hostdz,{key:'hostdz-'+pid,plan:'IN StorageVPS #'+(pid-1319),sku:String(pid),cpu:vcpu(cores),ram:gb(ram),disk:disk+' SATA RAID60',traffic:transfer(tb),price,
      url:'https://hostdzire.com/billing/cart.php?a=add&pid='+pid+'&currency=1&billingcycle=annually'});
  }
  for (const [pid,cpu,disk,price] of [[1362,'2 × Xeon E5-2620 v3','2 × 960 GB SSD',25],[1363,'2 × Xeon E5-2650 v3','12 × 2 TB SATA',30],[1364,'2 × Xeon E5-2620 v3','4 × 8 TB SATA',35],[1365,'2 × Xeon E5-2650 v3','12 × 4 TB SATA',50]]) {
    offer(hostdz,{key:'hostdz-'+pid,market:'CA',city:'Montréal',kind:'bare',term:'month',plan:cpu+' · '+disk,sku:String(pid),cpu,ram:gb(32),disk,traffic:transfer(100),price,url:'https://hostdzire.com/billing/cart.php?a=add&pid='+pid});
  }

  const hhs = {provider:'HyperHost Solutions', publishedAt:'2026-11-16', start:'2026-11-16T00:00:00Z', end:'2026-11-22T23:59:00Z', code:'VICE50',
    term:'month',currency:'GBP',market:'GB',city:'Coventry',port:'1 Gbps',priceBasis:'afterCode',
    official:'https://clients.hyperhostsolutions.com/campaign/gta-vi-launch-2026/FGI9KSnegypxqXY9knGiygY86RRCge55jJ0GOlo7',
    thread:letUrl('223355/hyperhost-gta-vi-50-recurring-vps-from-0-63-mo-directadmin-from-1-mo'),
    conditions:note('新订单首期和续费都打五折，英镑结算，须在下单后四小时内付款。超过月流量限速。IPv6 VPS 没有公网 IPv4。','新訂單首期和續費都打五折，以英鎊結算，須在下單後四小時內付款。超過月流量限速。IPv6 VPS 沒有公網 IPv4。','New orders get 50% off on the initial bill and renewals. Pay in GBP within four hours. Transfer resets monthly and excess usage is throttled. The IPv6 series has no public IPv4.','新規注文と各更新が半額。注文後4時間以内に英ポンドで支払います。月間転送枠超過後は速度制限。IPv6 シリーズには公開 IPv4 は含まれません。')};
  for (const [pid,plan,cores,ram,disk,tb,price] of [
    [1,'HHS VPS 1',1,2,20,1,1.50],[2,'HHS VPS 2',2,2,30,1.5,2.50],[3,'HHS VPS 3',3,4,60,2,3.50],[4,'HHS VPS 4',4,8,80,3,5.50],[5,'HHS VPS 5',6,10,100,3.5,7.50],
    [45,'IPv6 VPS 1',1,1,20,1,0.63],[46,'IPv6 VPS 2',2,2,40,2,0.84],[47,'IPv6 VPS 3',3,4,60,4,1.67],[48,'IPv6 VPS 4',4,8,80,6,1.67]]) {
    offer(hhs,{key:'hyperhost-'+pid,plan,sku:String(pid),cpu:vcpu(cores),ram:gb(ram),disk:gb(disk)+' SSD',traffic:transfer(tb),price,renewal:price,
      ipv4Use:pid>=45?'ipv6-only':'dedicated-ipv4',url:hhs.official+'/order/'+pid});
  }

  const own = {...blackFriday, provider:'OwnWebServers', source:'OwnWebServers', observed,
    end:'2026-12-01T04:59:00Z', market:'US', city:'United States', currency:'USD', term:'month', official:'https://www.ownwebservers.com/vps-black-friday-offer',
    conditions:note('仅限月付新订单。首月五折，第 2 个月开始按原价续费。Linux 使用 BF50，Windows 使用 BFWIN50，活动页按钮会带入适用代码。','僅限月繳新訂單。首月五折，第 2 個月起按原價續費。Linux 使用 BF50，Windows 使用 BFWIN50，活動頁按鈕會帶入適用代碼。','Monthly billing only. The first month is half price and the regular rate starts in month two. Campaign links prefill BF50 for Linux or BFWIN50 for Windows.','月払いのみ。初月は半額、2か月目から通常月額です。セールページから進むと Linux は BF50、Windows は BFWIN50 が自動適用されます。')};
  for (const [pid,plan,cores,ram,disk,traffic,price,regular,code] of [
    [153,'Linux VPS-II',2,4,'60 GB NVMe','Unmetered',4.50,9,'BF50'],[154,'Linux VPS-III',4,6,'80 GB NVMe','Unmetered',7.50,15,'BF50'],[156,'Linux VPS-IV',6,8,'120 GB NVMe','Unmetered',9.50,19,'BF50'],
    [127,'Windows 11 Basic',2,2,'50 GB SSD',transfer(6),9.50,19,'BFWIN50'],[128,'Windows 11 Starter',3,4,'80 GB SSD',transfer(7),13,26,'BFWIN50']]) {
    offer(own,{key:'own-'+pid,plan,sku:String(pid),cpu:vcpu(cores),ram:gb(ram),disk,traffic,price,regular,renewal:regular,code,priceBasis:'afterCode',
      url:'https://ownwebservers.com/serviceinfo/cart.php?a=add&pid='+pid+'&promocode='+code});
  }

  const serv = {provider:'Servitro', publishedAt:'2026-10-30', market:'DE',city:'Frankfurt',currency:'USD',term:'year',traffic:transfer(1),
    thread:letUrl('222738/frankfurt-vps-at-12-year-50-giveaway-another-servitro-let-deal'),lg:'https://servitro.com/frankfurt',
    conditions:note('含 IPv4 与 IPv6 /64，流量适用公平使用政策。发帖商家接受用户在下单后开工单申请 CPU 与磁盘加倍。未公布优惠截止时间。','含 IPv4 與 IPv6 /64，流量適用公平使用政策。發帖商家接受用戶在下單後開工單申請 CPU 與磁碟加倍。未公布優惠截止時間。','IPv4 and an IPv6 /64 are included. Traffic is subject to fair use. The provider offers double CPU and disk on request by ticket after purchase. No sale deadline was given.','IPv4 と IPv6 /64 を含み、転送にはフェアユースを適用。購入後にチケットで申請すると CPU とストレージが倍増。セールの終了日は非公表です。')};
  for (const [slug,plan,platform,ram,disk,port,price,code] of [
    ['virtual-servers/usd1-server','EPYC $1 Server','EPYC',1,10,1,12,''],
    ['virtual-servers-ryzen-9-9950x-frankfurt/virtual-1','Virtual-1 · Ryzen 9 9950X','Ryzen 9 9950X',4,25,10,35.20,'BFJH1873LA'],
    ['virtual-servers/virtual-1','Virtual-1 · EPYC 7443P','EPYC 7443P',4,25,10,20,'S8KQX51KF6']]) {
    offer(serv,{key:'servitro-'+slug.replace('/','-'),plan,cpu:'1 vCPU · '+platform,ram:gb(ram),disk:gb(disk)+' SSD',port:port+' Gbps',price,code,priceBasis:code?'afterCode':'official',url:'https://my.servitro.com/store/'+slug});
  }

  const pure = {...blackFriday,provider:'PureVoltage',market:'US',city:'New York',publishedAt:'2026-11-02',endDate:'2026-11-25',term:'month',currency:'USD',
    kind:'bare',traffic:transfer(100),status:'limited',thread:letUrl('222865/purevoltage-pre-black-friday-%CF%9F-nyc-dedicated-from-60-mo-%CF%9F-free-double-bandwidth-giveaways'),
    conditions:note('每位客户最多 2 台，仅限新增服务。基础月流量 100 TB，在原帖登记订单号经商家确认后可增至 200 TB。','每位客戶最多 2 台，僅限新增服務。基本月流量 100 TB，在原帖登記訂單號經商家確認後可增至 200 TB。','Up to two new servers per customer. The included 100 TB can be doubled after the merchant verifies an order number posted in its LET thread.','新規サーバーは1人2台まで。月間100 TB の転送枠は元記事に注文番号を投稿し、確認を受けると200 TB に増量されます。')};
  for (const [pid,cpu,ram,disk,port,price] of [[253,'Xeon E5-2670 v3','64 GB DDR4','1 TB SSD',1,60],[254,'Xeon E5-2699 v3','64 GB DDR4','1 TB SSD',1,70],[178,'Ryzen 9 9950X','64 GB DDR5','2 × 1 TB NVMe',10,200]]) {
    offer(pure,{key:'pure-'+pid,plan:'NYC · '+cpu,sku:String(pid),cpu,ram,disk,port:port+' Gbps',price,url:'https://my.purevoltage.com/?action=add&cmd=cart&id='+pid});
  }

  const delux = {...blackFriday,provider:'DeluxHost',publishedAt:'2026-11-02',market:'NL',city:'Amsterdam',currency:'EUR',term:'year',
    official:'https://deluxhost.net/en/deals/x',thread:letUrl('222883/deluxhost-net-pre-black-friday-x-series-back-from-6-yr-storage-vps-storage-boxes-nl'),
    conditions:note('X-0 仅提供 IPv6，其余 X 系列含 IPv4 和 IPv6。不限量流量适用公平使用政策。年付可在原帖申请随机扩容，具体奖励取决于资源。','X-0 僅提供 IPv6，其餘 X 系列含 IPv4 和 IPv6。不限量流量適用公平使用政策。年繳可在原帖申請隨機升級，實際獎勵視資源而定。','X-0 is IPv6-only. Other X tiers include IPv4 and IPv6. Unmetered transfer is subject to fair use. Eligible annual purchases may claim a random upgrade in the thread.','X-0 は IPv6 のみ、その他は IPv4 と IPv6 を含みます。無制限転送はフェアユース対象。対象年払いは元記事で抽選式の増量を申請できます。')};
  for (const [tier,cores,ram,disk,port,price] of [[0,1,'512 MB',10,1,6],[1,1,'1 GB',20,1,9],[2,1,'2 GB',40,1,12],[3,2,'4 GB',60,10,14],[4,2,'8 GB',80,10,18]]) {
    const snapshot = tier === 0 ? {ipv4Use:'ipv6-only'} : {stockAtPublication:'sold-out', stockObservedAt:observed};
    offer(delux,{...snapshot,key:'delux-x-'+tier,plan:'X-'+tier,cpu:vcpu(cores),ram,disk:gb(disk)+' SSD',port:port+' Gbps',traffic:'Unmetered (FUP)',price,url:'https://deluxhost.net/en/cart?add=x-'+tier+'&cycle=annually'});
  }
  for (const [tier,cores,ram,hdd,nvme,price] of [[1,1,2,'500 GB',5,1.49],[2,2,3,'1 TB',10,1.99],[3,2,4,'2 TB',20,3.99],[4,2,6,'3 TB',30,6.99]]) {
    offer(delux,{key:'delux-storage-'+tier,city:'Eygelshoven',term:'month',plan:'STORAGE-'+tier,cpu:vcpu(cores),ram:gb(ram),disk:hdd+' HDD + '+gb(nvme)+' NVMe',port:'1 Gbps',traffic:'Unmetered (FUP)',price,
      stockAtPublication:'sold-out',stockObservedAt:observed,
      official:'https://deluxhost.net/en/storage',url:'https://deluxhost.net/en/cart?add=storage-'+tier+'&cycle=monthly',
      conditions:note('面向备份和归档的 KVM，含 IPv4 与 IPv6。商家单列的 PREBF26 优惠码适用于 Storage Box。','供備份與封存使用的 KVM，含 IPv4 與 IPv6。商家另列的 PREBF26 優惠碼適用於 Storage Box。','KVM for backups and archives with IPv4 and IPv6. The PREBF26 coupon in the same post is for the separate Storage Box product.','バックアップ・アーカイブ向け KVM。IPv4 と IPv6 に対応。同じ記事の PREBF26 は別商品の Storage Box 用です。')});
  }

  const layer = {...blackFriday,provider:'LayerOne',market:'US',city:'Tampa',term:'year',currency:'USD',publishedAt:'2026-11-19',
    endDate:'2026-11-30',codeRequired:false,thread:letUrl('223566/layerone-black-friday-limited-time-offers-7-yr-flash-sale'),
    official:'https://layeronecloud.com/early-black-friday',lg:'https://layeronecloud.com/looking-glass/',
    conditions:note('常规年付黑五档降价 35%，商家写明活动持续至美国网络星期一。闪购有独立配额。','常規年繳黑五方案降價 35%，商家寫明活動持續至美國網路星期一。限時搶購另有配額。','The regular annual Black Friday tiers are 35% off through Cyber Monday. Flash batches have separate quantities.','通常セール枠の年払いはサイバーマンデーまで35%引き。フラッシュセールの販売枠は別です。')};
  for (const row of COMMUNITY_OFFERS.filter(r => r.provider === 'LayerOne' && ['gc.small','gc.nano'].includes(r.sku))) {
    addForumEvidence(row,layer.thread,layer.publishedAt); row.codeRequired = false;
  }
  for (const [slug,plan,cores,ram,disk,price] of [['starter','gc.micro',1,2,40,31.20],['pro','gc.medium',4,8,160,93.60]]) {
    offer(layer,{key:'layer-'+slug,plan,cpu:vcpu(cores),ram:gb(ram),disk:gb(disk)+' NVMe',price,url:'https://layeronecloud.com/client/order/layerone-'+slug+'-bf-2026/?cadence=annual'});
  }
})();
