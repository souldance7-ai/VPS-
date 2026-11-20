// Storefront editions for MoeCloud, AkkoCloud and the LightLayer annual catalogue.
(() => {
  const locales = (sc, tc, en, ja) => ({sc, tc, en, ja});
  const appendNotes = (...parts) => Object.fromEntries(['sc','tc','en','ja'].map(
    language => [language, parts.filter(Boolean).map(part => part[language]).join(' ')]
  ));
  const sourceDate = '2026-11-20';
  const routeUK = locales('电信、联通去回程 CN2 GIA；移动回程 CN2 GIA。','電信、聯通去回程 CN2 GIA；移動回程 CN2 GIA。','Telecom and Unicom use CN2 GIA in both directions. Mobile uses it on the return path.','電信・聯通は往復 CN2 GIA、移動は復路 CN2 GIA と記載。');
  const routeSJC = locales('电信、联通去回程 CN2 GIA，移动去回程 CMIN2。','電信、聯通去回程 CN2 GIA，移動去回程 CMIN2。','Telecom and Unicom use CN2 GIA in both directions. Mobile uses CMIN2 both ways.','電信・聯通は往復 CN2 GIA、移動は往復 CMIN2 と記載。');
  const hinet = locales('HiNet 手动开通，需真实身份和联络资料；流量按收发合计，公平使用下可工单申请重置。','HiNet 由商家手動開通，須提供真實身分與聯絡資料；流量按收發合計，公平使用下可透過工單申請重設。','Manual HiNet provisioning requires accurate identity and contact details. Combined transfer can be reset by ticket under the fair-use policy.','HiNet は手動開通。本人・連絡情報が必要です。送受信合算の転送量はフェアユース条件でリセットを依頼できます。');
  const toronto = locales('多伦多国际网络 GTT / TorIX，流量双向合计，用完后限速 10 Mbps。','多倫多國際網路 GTT / TorIX，流量依雙向合計，用完後限速 10 Mbps。','Toronto international transit via GTT and TorIX. Transfer is counted both ways, with 10 Mbps after the allowance.','トロントの国際回線 GTT / TorIX。転送量は送受信合算で、上限後は 10 Mbps になります。');
  const moeNotes = {uk: routeUK, sjc: routeSJC, tw: hinet, ca: toronto};
  const moeLookingGlass = {uk:'https://lon.cn2.lg.lite.moe/',sjc:'https://sjc.cn2.lg.lite.moe/',ca:'https://ca.to.global.lg.lite.moe/'};
  // SKU, amount, term, vCPU, memory, storage, port, transfer, number of IPv4s,
  // displayed inventory count at collection, setup fee, and crossed-out price.
  const moe = [
    {key:"uk",market:"GB",city:"London",url:"https://lite.moe/index.php/store/uk-cn2-gia-super",items:[
      ["UK Special Plan mini","349.00","year",1,"1 GB DDR4","10 GB SSD","1000 Mbps","500 GB","1",0,null,"499.00"],
      ["UK Special Plan micro","549.00","year",1,"1 GB DDR4","10 GB SSD","500 Mbps","1000 GB","1",0,null,null],
      ["UK CN2 GIA Super 1C/1G 450G","59.00","month",1,"1 GB DDR4","10 GB SSD","200 Mbps","450 GB","1",0,null,null],
      ["UK CN2 GIA Super 1C/1G 900G","119.00","month",1,"1 GB DDR4","10 GB SSD","200 Mbps","900 GB","1",0,null,null],
      ["UK CN2 GIA Super HighData 1C/1G","119.00","month",1,"1 GB DDR4","10 GB SSD","50 Mbps","1.3 TB","1",0,null,null],
      ["UK CN2 GIA Super Commercial 1C/2G","259.00","month",1,"2048 MB DDR4","15 GB SSD","1000 Mbps","2048 GB","1",0,null,null],
      ["UK CN2 GIA Super Commercial 2C/4G/6T","769.00","month",2,"4096 MB DDR4","30 GB SSD","1000 Mbps","6 TB","1",0,null,null],
      ["UK CN2 GIA Super Commercial 2C/4G/10T","1199.00","month",2,"4096 MB DDR4","30 GB SSD","1000 Mbps","10 TB","2",0,null,null],
      ["UK CN2 GIA Super Commercial 4C/8G","2399.00","month",4,"8192 MB DDR4","60 GB SSD","1000 Mbps","20 TB","2",0,null,null]
    ]},
    {key:"sjc",market:"SJC",city:"San Jose",url:"https://lite.moe/index.php/store/sjc-cn2-gia-super",items:[
      ["SJC Special Plan mini","349.00","year",1,"1 GB DDR4","10 GB SSD","1000 Mbps","500 GB","1",0,null,"499.00"],
      ["SJC Special Plan micro","509.00","year",1,"1024 MB DDR4","10 GB SSD","500 Mbps","1000 GB","1",0,null,"549.00"],
      ["SJC CN2 GIA Super 1C/1G 450G","59.00","month",1,"1024 MB DDR4","10 GB SSD","200 Mbps","450 GB","1",0,null,null],
      ["SJC CN2 GIA Super 1C/1G 900G","119.00","month",1,"1 GB DDR4","10 GB SSD","200 Mbps","900 GB","1",4,null,null],
      ["SJC CN2 GIA Super Commercial 1C/2G/2T","189.00","month",1,"2 GB DDR4","15 GB SSD","1000 Mbps","2 TB","1",2,null,"259.00"],
      ["SJC CN2 GIA Super Commercial 2C/4G/6T","569.00","month",2,"4096 MB DDR4","30 GB SSD","1000 Mbps","6 TB","2",0,null,"769.00"],
      ["SJC CN2 GIA Commercial 2C/4G/10T","1199.00","month",2,"4 GB DDR4","30 GB SSD","1000 Mbps","10 TB","2",0,null,null]
    ]},
    {key:"tw",market:"TW",city:"",url:"https://lite.moe/index.php/store/hinet",items:[
      ["Hinet Dynamic 2C/2G","299.00","month",2,"2 GB DDR4","10 GB SSD","600 Mbps","50 TB","1",2,"50.00",null],
      ["Hinet Dynamic 250M 1C/1G","159.00","month",1,"1 GB DDR4","10 GB SSD","250 Mbps","15 TB","1",0,"20.00",null],
      ["Hinet Dynamic 2C/2G 1GUplink","499.00","month",2,"2 GB DDR4","10 GB SSD","1000 Mbps","60 TB","1",3,"50.00",null],
      ["Hinet Fixed 2C/2G","629.00","month",2,"2 GB DDR4","10 GB SSD","600 Mbps","50 TB","1",1,"50.00",null]
    ]},
    {key:"ca",market:"CA",city:"Toronto",url:"https://lite.moe/index.php/store/canada-toronto-global",items:[
      ["Toronto Global 1C/1G","349.00","year",1,"1 GB DDR4","20 GB SSD RAID 1","500 Mbps","5 TB","1",null,null,null],
      ["Toronto Global 2C/2G","69.00","month",2,"2 GB DDR4","20 GB SSD RAID 1","1 Gbps","10 TB","1",null,null,null],
      ["Toronto Global 4C/4G","139.00","month",4,"4 GB DDR4","30 GB SSD RAID 1","1 Gbps","20 TB","1",null,null,null],
      ["Toronto Global 6C/8G","279.00","month",6,"8 GB DDR4","40 GB SSD RAID 1","1 Gbps","40 TB","1",null,null,null]
    ]},
  ];

  for (const group of moe) {
    for (const [index, row] of group.items.entries()) {
      const [sku, price, term, cores, ram, disk, port, traffic, ipv4, quantity, setup, listPrice] = row;
      const id = 'supp-moe-' + group.key + '-' + (index + 1);
      const documentation = moeNotes[group.key];
      const orderFee = setup && locales('初装 CNY ' + setup + '。','初裝 CNY ' + setup + '。','Setup fee: CNY ' + setup + '.','初期費用 CNY ' + setup + '。');
      const published = listPrice && locales('官网原列价 CNY ' + listPrice + '。','官網原列價 CNY ' + listPrice + '。','Previous list price: CNY ' + listPrice + '.','掲載通常価格 CNY ' + listPrice + '。');
      const stock = quantity !== null && locales('2026-11-20 官网库存快照：' + quantity + ' 台。','2026-11-20 官網庫存快照為 ' + quantity + ' 台。','Store inventory snapshot on 2026-11-20: ' + quantity + ' units.','2026-11-20 の公式在庫表示は ' + quantity + ' 台です。');
      const address = locales(ipv4 + ' 个 IPv4。',ipv4 + ' 個 IPv4。',ipv4 + ' IPv4 address(es).','IPv4 ' + ipv4 + ' 個。');
      const notes = appendNotes(documentation, orderFee, published, stock, address);
      const optimized = group.key === 'uk' || group.key === 'sjc';
      const routeName = optimized ? (group.key === 'uk' ? 'CN2 GIA' : 'CN2 GIA / CMIN2') : '';
      const spec = {sku, price, term, currency:'CNY', cpu:cores + ' vCPU', ram, disk, port,
        traffic:traffic + ' · IN + OUT', date:sourceDate, proof:group.url, sourceNote:notes};
      PLANS.push({id, market:group.market, city:group.city, kind:'vps', provider:'MoeCloud',
        plan:sku, ip:group.key === 'tw' ? 'isp' : 'unknown', url:group.url, proof:group.url,
        lg:moeLookingGlass[group.key] || null, route:optimized ? 'claimed' : 'unknown', routeName,
        carriers:optimized ? ['CT','CU','CM'] : [], networkFilters:optimized ? ['optimized-transit','quota-transfer'] : ['quota-transfer'],
        stockSnapshot:Number.isInteger(quantity)?{state:quantity>0?'in-stock':'sold-out',checkedAt:sourceDate,source:group.url,quantity}:undefined,
        notes, searchTerms:[sku,'lite.moe','萌云','萌雲'],spec});
      const attributes = [['sharing','dedicated-ipv4']];
      if (group.key === 'tw') attributes.push(['access','isp'],['assignment',sku.includes('Fixed') ? 'static' : 'dynamic']);
      IP_EVIDENCE.set(id, attributes.map(([dimension,value]) => ({
        dimension,value,sku,scope:'sku',market:group.market,provider:'MoeCloud',checked:sourceDate,url:group.url,note:notes
      })));
    }
  }

  const akkoStore = 'https://www.akkocloud.com/cart.php?gid=17';
  const akkoNote = locales('商家标注三网回程 CN2 GIA、电信去程 CN2 GIA。套餐有一个 IPv4，地址原生属性不作保证。月流量上限按双向合计。','商家標示三網回程 CN2 GIA、電信去程 CN2 GIA。套餐有一個 IPv4，地址原生屬性不作保證。月流量上限按雙向合計。','The merchant lists CN2 GIA for all three carriers on return and for Telecom inbound. One IPv4 is included, with no native-address guarantee. Transfer allowances combine both directions.','復路は中国三社とも CN2 GIA、往路は電信 CN2 GIA との公式表記。IPv4 1 個。ネイティブ IP の保証はありません。月間転送量は送受信合算です。');
  // SKU, charge, billing cycle, vCPU, memory, storage, port, transfer, WHMCS product ID.
  const akko = [
      ["美国圣何塞KVM-CN2-A2 mini年付特惠套餐","449.00","year",1,"1024 MB","15 GB SSD","1000 Mbps","800 GB",175],
      ["美西圣何塞KVM-CN2-B1 mini 年付特惠套餐","699.00","year",1,"1024 MB","20 GB SSD","1000 Mbps","1200 GB",187],
      ["美国圣何塞KVM-CN2-B1","129.99","month",1,"1536 MB","20 GB SSD","1000 Mbps","1500 GB",178],
      ["美西圣何塞KVM-CN2-B2","233.00","month",1,"2048 MB","30 GB SSD","1000 Mbps","3000 GB",186],
      ["美西圣何塞KVM-CN2-C1","388.88","month",1,"2048 MB","30 GB SSD","1000 Mbps","4000 GB",189],
      ["美国圣何塞KVM-CN2-D1","588.88","month",2,"2048 MB","20 GB SSD","1000 Mbps","6000 GB",182],
      ["美西圣何塞KVM-CN2-E1","888.88","month",4,"8192 MB","60 GB SSD","1000 Mbps","9000 GB",191],
      ["美国圣何塞KVM-CN2-F1","1188.88","month",4,"8192 MB","60 GB SSD","1000 Mbps","12000 GB",183],
      ["美西圣何塞KVM-CN2-U1","1200.00","month",2,"2048 MB","20 GB SSD","30 Mbps","∞",192],
      ["美西圣何塞KVM-CN2-U2","2100.00","month",4,"8192 MB","50 GB SSD","50 Mbps","∞",108],
      ["美西圣何塞KVM-CN2-U3","4200.00","month",4,"8192 MB","80 GB SSD","100 Mbps","∞",109],
      ["美西圣何塞KVM-CN2-U4","8400.00","month",8,"16384 MB","100 GB SSD","200 Mbps","∞",110]
  ];
  for (const [index, row] of akko.entries()) {
    const [label,price,term,cores,ram,disk,port,traffic,pid] = row;
    const sku = label.replace(/^(?:美国|美西)圣何塞/, '').replace(/\s*年付特惠套餐$/, '').trim();
    const id = 'supp-akko-sjc-' + (index + 1);
    const url = 'https://www.akkocloud.com/cart.php?a=add&pid=' + pid;
    const spec = {sku, price, term, currency:'CNY',cpu:cores+' vCPU',ram,disk,port,traffic,proof:akkoStore,date:sourceDate,sourceNote:akkoNote};
    const plan = {id,provider:'AkkoCloud',market:'SJC',city:'San Jose',kind:'vps',plan:sku,
      ip:'unknown',route:'claimed',routeName:'CN2 GIA',carriers:['CT','CU','CM'],url,proof:akkoStore,
      lg:'http://sjclg.akkocloud.com/',notes:akkoNote,searchTerms:[label,sku,'Akko Cloud'],networkFilters:['optimized-transit'],spec};
    if (traffic !== '∞') plan.networkFilters.push('quota-transfer');
    if (index < 3) plan.stockKey = id;
    PLANS.push(plan);
    IP_EVIDENCE.set(id,[{dimension:'sharing',value:'dedicated-ipv4',sku,scope:'sku',market:'SJC',
      provider:plan.provider,checked:sourceDate,url:akkoStore,note:akkoNote}]);
  }

  const llReport = 'https://www.daniao.org/30689.html';
  const llNote = locales('2026 年 10 月 12 日记录的年付报价，官网结账需登入。Premium、Standard、Global 是相应 SKU 的线路类别。可在结账页查看现价与库存。','2026 年 10 月 12 日記錄的年繳報價，官網結帳須登入。Premium、Standard、Global 為各 SKU 的線路分類，現價及庫存可於結帳頁查看。','Annual price recorded on 12 October 2026. The merchant requires sign-in to see current checkout pricing and availability. Premium, Standard and Global identify the SKU’s network tier.','2026 年 10 月 12 日時点の年額。最新価格と在庫の確認には販売元へのログインが必要です。Premium、Standard、Global は各 SKU の回線区分です。');
  // SKU, region, disk, port, transfer, network tier, HostBill product ID.
  const annual = [
      ["TW-VP01-A","TW","50 GB SSD","5 Mbps","∞","Premium",213],
      ["TW-VP03-A","TW","50 GB SSD","10 Mbps","1 TB","Premium",214],
      ["TW-VG01-A","TW","50 GB SSD","10 Mbps","∞","Global",215],
      ["TW-VG03-A","TW","50 GB SSD","20 Mbps","1 TB","Global",216],
      ["LA-VP01-A","LAX","50 GB NVMe","20 Mbps","∞","Premium",217],
      ["LA-VP03-A","LAX","50 GB NVMe","30 Mbps","1 TB","Premium",218],
      ["LA-VS01-A","LAX","50 GB NVMe","50 Mbps","∞","Standard",219],
      ["LA-VS03-A","LAX","50 GB NVMe","100 Mbps","1 TB","Standard",220],
      ["LA-VG01-A","LAX","50 GB NVMe","100 Mbps","∞","Global",221],
      ["LA-VG03-A","LAX","50 GB NVMe","200 Mbps","1 TB","Global",222],
      ["HK-VP02-A","HK","50 GB","10 Mbps","∞","Premium",463],
      ["SG-VP02-A","SG","50 GB","10 Mbps","∞","Premium",364],
      ["SG-VG02-A","SG","50 GB","20 Mbps","∞","Global",365]
  ];
  for (const [sku,market,disk,port,traffic,tier,product] of annual) {
    const id = 'supp-lightlayer-' + sku.toLowerCase();
    const url = 'https://account.lightlayer.net/?action=add&cmd=cart&id=' + product;
    const spec = {sku,price:'24.99',currency:'USD',term:'year',cpu:'1 vCPU',ram:'1 GB',disk,port,traffic,
      date:'2026-10-12',priceType:'review',proof:llReport,sourceNote:llNote};
    PLANS.push({id,market,city:market === 'LAX' ? 'Los Angeles' : '',provider:'LightLayer',kind:'vps',
      ip:'unknown',plan:sku + ' · ' + tier,route:'unknown',routeName:'',carriers:[],url,proof:llReport,notes:llNote,
      searchTerms:[sku,tier,'1 Core 1G RAM Annual','Lightlayer'],networkFilters:traffic === '∞' ? [] : ['quota-transfer'],spec});
  }
})();
