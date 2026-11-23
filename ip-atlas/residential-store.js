'use strict';

// Product claims come from the storefront. A dated test observation only applies
// to its exact SKU and belongs in this separate map.
const RESIDENTIAL_REVIEWS = new Map();
(() => {
  const l = (sc,tc,en,ja) => ({sc,tc,en,ja});
  const checked = '2026-11-23';
  const skuKey = value => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const key = (provider,market,sku) => `${provider}\n${market}\n${skuKey(sku)}`;
  const planIndex = new Map(PLANS.map(plan => [key(plan.provider,plan.market,plan.spec?.sku || plan.sku || plan.plan),plan]));
  const zoroIndex = new Map();
  const taxiIndex = new Map();
  function put(product, formerSku = product.sku) {
    const current = planIndex.get(key(product.provider,product.market,product.sku)) ||
      planIndex.get(key(product.provider,product.market,formerSku));
    const row = {...current,kind:'vps',route:'unknown',carriers:[],...product,
      plan:product.sku,
      spec:{...current?.spec,...product.spec,sku:product.sku,proof:product.proof,date:checked},
      searchTerms:[...new Set([...(current?.searchTerms || []),...product.searchTerms])]};
    if (current) {
      row.id = current.id;
      Object.assign(current,row);
      return current;
    }
    PLANS.push(row);
    planIndex.set(key(row.provider,row.market,row.sku),row);
    return row;
  }

  const residentialTerms = ['家宽','家寬','家庭宽带','住宅宽带','住宅寬頻','residential broadband','家庭用回線'];
  const ispTerms = ['运营商 IP','電信商 IP','ISP IP','机房 ISP','資料中心 ISP','NTT'];
  const dimensions = {residential:'access',isp:'access',static:'assignment',dynamic:'assignment','dedicated-ipv4':'sharing',native:'origin'};
  function ipEvidence(plan, operator, values) {
    IP_EVIDENCE.set(plan.id,values.map(value => ({value,dimension:dimensions[value],
      provider:plan.provider,market:plan.market,sku:plan.sku,url:plan.proof,checked,
      scope:'sku',operator,note:plan.notes})));
  }

  const zoroNotes = l(
    '商家将本系列列为住宅 BGP，并标注独享静态 IPv4；不提供退款。住宅属性按官方商品说明记录。',
    '商家將本系列列為住宅 BGP，並標註獨享靜態 IPv4，且不提供退款。住宅屬性依官方商品說明記錄。',
    'ZoroCloud lists this family as residential BGP with a dedicated static IPv4 and no refunds. This is the merchant’s product description.',
    '事業者は住宅 BGP・専用固定 IPv4 と明記しています。返金不可。回線の表記は公式商品説明に基づきます。'
  );
  const zoroHkNotes = l(
    '商家将香港系列列为住宅 BGP，并标注独享 IPv4；不提供退款。',
    '商家將香港系列列為住宅 BGP，並標註獨享 IPv4，且不提供退款。',
    'ZoroCloud advertises its Hong Kong plans as residential BGP with a dedicated IPv4 and no refunds.',
    '香港シリーズは住宅 BGP・専用 IPv4 と明記。返金不可です。'
  );
  const zoroFamilies = [
    ['JP','Japan','jpisp','JP-Titan',[
      ['Plus',1,1,10,200,'1000 GB','138'],['Pro',2,2,20,300,'2000 GB','188'],
      ['Max',4,4,40,500,'4 TB','328'],['Ultra',4,8,80,500,'8 TB','508']]],
    ['SG','Singapore','sg-bgp','SG-RES',[
      ['Plus',1,1,20,100,'1500 GB','188'],['Pro',2,2,40,200,'4 TB','288'],['Max',4,4,80,300,'6 TB','588']]],
    ['HK','Hong Kong','hk-bgp-isp','HK-RES',[
      ['Plus',1,1,20,100,'1000 GB','88'],['Pro',2,2,40,100,'2000 GB','118'],['Max',4,4,80,100,'4 TB','238']]],
    ['GB','United Kingdom','uk-jk','UK-RES',[
      ['Plus',1,1,10,200,'2000 GB','79'],['Pro',2,2,40,300,'4000 GB','109'],['Max',4,4,80,500,'8 TB','199']]],
    ['MY','Malaysia','mysisp','MYS-RES',[
      ['Plus',1,1,20,100,'1000 GB','149'],['Pro',2,2,40,100,'2000 GB','188'],['Max',4,4,80,100,'4000 GB','288']]],
    ['US','United States','att-isp','US-Astra',[
      ['Plus',1,1,10,100,'1000 GB','188'],['Pro',2,2,20,100,'2 TB','288'],['Max',4,4,60,200,'4 TB','588']]]
  ];
  for (const [market,city,slug,family,tiers] of zoroFamilies) {
    const proof = 'https://my.zorocloud.com/store/' + slug;
    for (const [name,cpu,ram,disk,port,traffic,price] of tiers) {
      const sku = `${family}-${name}`;
      const plan = put({id:'zoro-' + sku.toLowerCase(),provider:'ZoroCloud',market,city,sku,
        ip:'residential',ipv4:true,residentialClaim:true,routeName:'Residential BGP',
        url:proof,proof,notes:market==='HK'?zoroHkNotes:zoroNotes,
        searchTerms:[...residentialTerms,'索隆云','索隆雲',family,...(market==='US'?['AT&T']:[])],
        spec:{cpu:`${cpu} vCPU`,ram:`${ram} GB`,disk:`${disk} GB SSD`,port:`${port} Mbps`,traffic,
          monthlyTraffic:traffic,price,currency:'CNY',term:'month',priceType:'from'}});
      zoroIndex.set(sku,plan);
      ipEvidence(plan,market==='US'?'AT&T':'',['residential','dedicated-ipv4',...(market==='HK'?[]:['static'])]);
    }
  }

  const taxiNotes = l(
    '商家注明由 NTT 广播，并指出部分数据库会识别为 ISP。年付限时价自动生效，商家注明续费同价。',
    '商家註明由 NTT 廣播，並指出部分資料庫會辨識為 ISP。年繳限時價自動生效，商家註明續約同價。',
    'VPS.Taxi documents NTT announcements and ISP labels in some databases. The merchant says the limited annual rate is applied automatically and renews at the same price.',
    '事業者は NTT からの経路広告と一部のデータベースでの ISP 判定を明記。期間限定の年額は自動適用され、更新時も同額です。'
  );
  const taxiTiers = [
    ['512M',1,'512 MB',10,'2 TB','3','24','30'],['1G',1,'1 GB',15,'4 TB','5','40','50'],
    ['2G',2,'2 GB',25,'8 TB','10','80','100'],['4G',2,'4 GB',40,'16 TB','20','160','200']
  ];
  const taxiFamilies = [
    ['LAX','Los Angeles','LA ISP','los-angeles-isp',13,53],['SG','Singapore','SG','singapore',11,45]
  ];
  for (const [market,city,family,slug,group,basePricingId] of taxiFamilies) {
    const proof = 'https://vps.taxi/' + slug + '/';
    taxiTiers.forEach(([name,cpu,ram,disk,traffic,price,annual,regular],index) => {
      const sku = `${family} ${name}`;
      const pricingId = basePricingId + index * 2;
      const url = `https://my.vps.taxi/order/config/index/vps/?group_id=${group}&pricing_id=${pricingId}`;
      const plan = put({id:`taxi-isp-${market.toLowerCase()}-${name.toLowerCase()}`,provider:'VPS.Taxi',market,city,sku,
        ip:'isp',ipv4:true,residentialClaim:true,routeName:'NTT',url,proof,notes:taxiNotes,searchTerms:ispTerms,
        spec:{virtualization:'KVM',cpu:`${cpu} vCPU`,ram,disk:`${disk} GB SSD`,port:'1 Gbps',traffic,monthlyTraffic:traffic,
          price,currency:'USD',term:'month',priceType:'official',
          billingRates:[{price:annual,currency:'USD',term:'year',priceType:'official',proof,date:checked,renewal:annual,regular}]}},
      market==='SG'&&[1,2].includes(index)?`${family} ${name[0]} GB`:sku);
      taxiIndex.set(sku,plan);
      ipEvidence(plan,'NTT',market==='LAX'?['native','isp']:['isp']);
    });
  }

  const tcsSource = 'https://billing.tcscloud.net/index.php?rp=/store/taiwan-vps-dynamic';
  const tcsNotes = l(
    '官网标明该档通过 10G XGS-PON 接入 HiNet，实例共享 1000 Mbps，带 1 个动态 IP。需要实名验证。',
    '官網標明此級透過 10G XGS-PON 接取 HiNet，執行個體共享 1000 Mbps，提供 1 個動態 IP。須實名驗證。',
    'TCSCloud lists 10G XGS-PON for HiNet access, a shared 1000 Mbps port and one dynamic IP. Identity verification applies.',
    'HiNet へは 10G XGS-PON で接続し、1000 Mbps を共有。動的 IP を1個含み、本人確認が必要です。'
  );
  const tcs = put({id:'tcs-dh2',provider:'TCSCloud',market:'TW',city:'Taiwan',sku:'DH2-HINET-1000M DYN',
    ip:'isp',ipv4:true,residentialClaim:true,residentialAccess:true,routeName:'HiNet · XGS-PON',
    url:tcsSource,proof:tcsSource,notes:tcsNotes,searchTerms:[...residentialTerms,'HiNet','XGS-PON','中華電信','中华电信','动态 IP','動態 IP'],
    spec:{cpu:'2 vCPU',ram:'2 GB',disk:'20 GB',port:'1000 Mbps',price:'59.99',currency:'USD',term:'month',priceType:'from'}});
  ipEvidence(tcs,'HiNet',['isp','dynamic']);

  function sample(plan, data) {
    if (plan) RESIDENTIAL_REVIEWS.set(plan.id,[...(RESIDENTIAL_REVIEWS.get(plan.id) || []),data]);
  }
  const la512 = taxiIndex.get('LA ISP 512M');
  la512.searchTerms.push('伪家宽','偽家寬','IP 分类分歧','IP 分類分歧');
  sample(la512,{
    url:'https://www.nodeseek.com/post-1068812-1/',date:'2026-11-20',title:'LA ISP 512M · NodeSeek IPQuality',conflicting:true,
    findings:l('洛杉矶样机为 AS2914 NTT。Scamalytics 51，测试报告列为中风险。','洛杉磯樣機為 AS2914 NTT。Scamalytics 51，測試報告列為中風險。','The Los Angeles sample was AS2914 (NTT), with a Scamalytics score of 51, marked medium risk.','ロサンゼルスの測定機は AS2914（NTT）。Scamalytics は51で中リスク。'),
    classifiers:l('使用类型栏中，IPinfo、ipregistry、ipapi 判为家宽，IP2Location、AbuseIPDB 判为机房。','使用類型欄中，IPinfo、ipregistry、ipapi 判為家寬，IP2Location、AbuseIPDB 判為機房。','Usage type: residential in IPinfo, ipregistry and ipapi. Hosting in IP2Location and AbuseIPDB.','用途判定は IPinfo・ipregistry・ipapi が住宅、IP2Location・AbuseIPDB がホスティング。')
  });
  sample(la512,{
    url:'https://vpstarter.com/articles/vps-taxi-la-isp-2026-11/',date:'2026-11-17',title:'LA ISP 512M · VPStarter',conflicting:true,
    findings:l('该样机测试时可用美区 ChatGPT、Claude、Gemini 和 Netflix 完整片库。','該樣機測試時可用美區 ChatGPT、Claude、Gemini 和 Netflix 完整片庫。','This sample reached US ChatGPT, Claude, Gemini and the full Netflix catalogue at test time.','測定時に米国版 ChatGPT・Claude・Gemini と Netflix の全カタログを利用できました。'),
    classifiers:l('IPinfo 列商业 ISP，IPregistry 与 proxycheck 列住宅；另有数据库列为机房或骨干网。','IPinfo 列商業 ISP，IPregistry 與 proxycheck 列住宅，另有資料庫列為機房或骨幹網。','The report records IPinfo as commercial ISP, IPregistry and proxycheck as residential, and other classifiers as hosting or backbone.','IPinfo は商用 ISP、IPregistry と proxycheck は住宅、他の一部はホスティングまたはバックボーン判定でした。')
  });
  sample(zoroIndex.get('JP-Titan-Plus'),{
    url:'https://www.nodeseek.com/post-829714-1/',date:'2026-07-20',title:'JP-Titan-Plus · GLBB · NodeSeek IPQuality',
    findings:l('样机 ASN 为 GLBB Japan KK（AS55900），检测使用地与注册地均为日本。测试时 ChatGPT、Netflix 等显示日本区。','樣機 ASN 為 GLBB Japan KK（AS55900），檢測使用地與註冊地均為日本。測試時 ChatGPT、Netflix 等顯示日本區。','The sample ASN was GLBB Japan KK (AS55900). The report recorded both use and registration in Japan. ChatGPT and Netflix showed Japan at test time.','測定機は GLBB Japan KK（AS55900）。利用地域・登録地域はいずれも日本で、測定時の ChatGPT と Netflix は日本地域でした。')
  });
  sample(zoroIndex.get('SG-RES-Plus'),{
    url:'https://www.nodeseek.com/post-1063609-1/',date:'2026-11-18',title:'SG-RES-Plus · SPTEL · NodeSeek IPQuality',
    findings:l('样机为 SPTEL（AS139883），测试地及注册地同为新加坡。检测时 ChatGPT、Netflix 可用，Reddit 被屏蔽。','樣機為 SPTEL（AS139883），測試地及註冊地同為新加坡。檢測時 ChatGPT、Netflix 可用，Reddit 遭封鎖。','The SPTEL sample (AS139883) showed Singapore for both use and registration. ChatGPT and Netflix worked at test time. Reddit was blocked.','測定機は SPTEL（AS139883）。利用地域・登録地域はシンガポール。測定時に ChatGPT と Netflix は利用可能、Reddit は遮断されていました。'),
    classifiers:l('五个库的使用类型均为家宽。IP2Location 0、Scamalytics 1、AbuseIPDB 0，报告均列低风险。','五個庫的使用類型均為家寬。IP2Location 0、Scamalytics 1、AbuseIPDB 0，報告均列低風險。','Five classifiers showed residential usage. The report marked IP2Location 0, Scamalytics 1 and AbuseIPDB 0 as low risk.','用途判定は5データベースすべて住宅。IP2Location 0、Scamalytics 1、AbuseIPDB 0 はすべて低リスクでした。')
  });
  const gold = PLANS.find(plan => plan.id==='meow-goldcloudde-1');
  if (gold) gold.searchTerms = [...new Set([...(gold.searchTerms || []),'伪家宽','偽家寬','IP 分类分歧','IP 分類分歧'])];
  sample(gold,{
    url:'https://www.nodeseek.com/post-1067363-1/',date:'2026-11-20',title:'GoldCloud DE-DC1 2H2G · NodeSeek IPQuality',conflicting:true,
    findings:l('样机使用地为德国、注册地为英国，ASN 为 GTT（AS3257）。','樣機使用地為德國、註冊地為英國，ASN 為 GTT（AS3257）。','The sample used AS3257 (GTT). The report recorded use in Germany and registration in the UK.','測定機は AS3257（GTT）。利用地域はドイツ、登録地域は英国でした。'),
    classifiers:l('使用类型栏中，IPinfo、ipregistry、ipapi、AbuseIPDB 判为家宽，IP2Location 判为机房。','使用類型欄中，IPinfo、ipregistry、ipapi、AbuseIPDB 判為家寬，IP2Location 判為機房。','Usage type: residential in IPinfo, ipregistry, ipapi and AbuseIPDB. Hosting in IP2Location.','用途判定は IPinfo・ipregistry・ipapi・AbuseIPDB が住宅、IP2Location がホスティング。')
  });
})();
