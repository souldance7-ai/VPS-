'use strict';

const EXPANDED_MERCHANT_SOURCES = {
  RFCHOST: [
    ['HK China Optimization', 'https://payment.rfchost.com/index.php?currency=8&rp=/store/hong-kong-1-china-optimization-network'],
    ['JP2 China Optimization', 'https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network'],
    ['JP2 China Optimization Lite', 'https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite'],
    ['HK CTC T1', 'https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network'],
    ['HK Jinx T1', 'https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network-jinx'],
    ['JP2 T1', 'https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network'],
    ['SG T1', 'https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network'],
    ['US LAX Classic T1', 'https://payment.rfchost.com/index.php?rp=/store/us-tier-1-international-optimization-networkclassic'],
    ['US LAX Premium', 'https://payment.rfchost.com/index.php?rp=/store/us-lax-premium'],
    ['VN T1', 'https://payment.rfchost.com/index.php?rp=/store/vn-premium'],
    ['FCC Identity Verification', 'https://payment.rfchost.com/index.php?rp=/store/fcct1-hk']
  ],
  KFCHost: [
    ['ECS Pricing', 'https://kfchost.com/center/pricing'],
    ['Japan RouteFlex', 'https://kfchost.com/center/routeflex'],
    ['ECS Deploy', 'https://kfchost.com/center/product/ecs/create'],
    ['Traffic Packages · COR 1,000 GB / T1 2,000 GB', 'https://kfchost.com/center/product/flow-packet'],
    ['5GPN', 'https://kfchost.com/center/5gpn']
  ],
  PortChannel: [
    ['Tencent Cloud Guangzhou BGP', 'https://console.po0.io/store/tencent-can-bgp'],
    ['Tencent Cloud East China BGP', 'https://console.po0.io/store/tencent-sha-bgp'],
    ['Tencent Cloud T1 Hong Kong', 'https://console.po0.io/store/tencentcloud-hongkong'],
    ['Tencent Cloud T1 USA', 'https://console.po0.io/store/tencentcloud-us']
  ]
};

(() => {
  const checkedAt = '2026-11-23T02:10:36Z';
  const date = checkedAt.slice(0, 10);
  const byId = new Map(PLANS.map(plan => [plan.id, plan]));
  const l10n = (sc, tc, en, ja) => ({sc, tc, en, ja});

  function register(plan) {
    if (byId.has(plan.id)) return;
    byId.set(plan.id, plan);
    PLANS.push(plan);
  }

  const rfcBase = 'https://payment.rfchost.com/index.php?rp=/store/';
  const rfcNotes = l10n(
    '商家目录月付起价，含 1 个 IPv4，入站和出站流量均计入额度。线路说明来自商家。',
    '商家目錄月付起價，含 1 個 IPv4，入站和出站流量均計入額度。線路說明來自商家。',
    'Official monthly starting rate. Includes one IPv4. Both inbound and outbound traffic count toward the allowance. Route information is from the merchant.',
    '公式の月額開始価格。IPv4 アドレス 1 個付き。受信と送信の両方が転送量に計上されます。回線情報は事業者公表値です。'
  );
  const rfcGroups = [
    {
      market: 'HK', city: 'Hong Kong', family: 'HK CTC T1',
      category: 'hk-tier-1-international-optimization-network', soldOut: true,
      rows: [
        [168, 'T1ION-Unlimited speed-MiniA', '10.99', 1, 1, 10, 'No limit', '10 TB', 't1ion-unlimited-speed-minia'],
        [169, 'T1ION-Unlimited speed-MinB', '16.99', 1, 2, 20, 'No limit', '20 TB', 't1ion-unlimited-speed-minb'],
        [171, 'T1ION-Unlimited speed-Standard', '32.99', 2, 4, 40, 'No limit', '40 TB', 't1ion-unlimited-speed-standard'],
        [172, 'T1ION-Unlimited speed-Advanced', '54.99', 4, 8, 80, 'No limit', '80 TB', 't1ion-unlimited-speed-advanced']
      ]
    },
    {
      market: 'VN', city: '', family: 'VN T1', category: 'vn-premium',
      rows: [
        [262, 'VN-T1ION-Mini', '8.99', 2, 2, 8, '1 Gbps', '1 TB', 'vn-t1ion-mini'],
        [263, 'VN-T1ION-Plus', '10.99', 4, 6, 8, '2 Gbps', '2 TB', 'vn-t1ion-plus'],
        [264, 'VN-T1ION-Pro', '16.99', 8, 12, 10, '3 Gbps', '3 TB', 'vn-t1ion-pro'],
        [265, 'VN-T1ION-Ultra', '49.99', 16, 16, 16, '20 Gbps', '10 TB', 'vn-t1ion-ultra']
      ]
    }
  ];
  for (const {market, city, family, category, rows, soldOut} of rfcGroups) {
    const proof = rfcBase + category;
    for (const [skuId, sku, price, cores, ram, disk, port, traffic, slug] of rows) {
      const id = 'project-edge-rfc-' + skuId;
      register({
        id, provider: 'RFCHOST', market, city, sku, plan: sku, kind: 'vps', ip: 'unknown', ipv4: true,
        route: 'unknown', routeName: 'Tier 1 International Optimization', carriers: [],
        url: proof + '/' + slug, proof, notes: rfcNotes, networkFilters: ['quota-transfer'],
        searchTerms: ['RFC', '花卷', family, String(skuId)],
        spec: {sku, price, currency: 'USD', term: 'month', priceType: 'from', proof, date,
          cpu: cores + ' vCPU', ram: ram + ' GB', disk: disk + ' GB SSD', port,
          traffic: traffic + ' IN&OUT', monthlyTraffic: traffic, trafficDirection: 'both'},
        ...(soldOut ? {stockSnapshot: {state: 'sold-out', checkedAt, source: proof, quantity: 0}} : {})
      });
    }
  }

  // The official pages still report zero availability for these existing Los Angeles products.
  for (const skuId of [154, 155, 156, 158, 159, 225, 226, 227]) {
    const plan = byId.get('project-edge-rfc-' + skuId);
    if (plan) plan.stockSnapshot = {state: 'sold-out', checkedAt, source: plan.proof, quantity: 0};
  }
  for (const skuId of [234, 235, 242]) {
    const plan = byId.get('project-edge-rfc-' + skuId);
    if (plan?.spec) plan.spec.port = '1 Gbps';
  }

  const poBase = 'https://console.po0.io/store/';
  const poBGP = l10n(
    '月付起价，含 1 个独立华东 BGP 地址，流量单向计量，商家未说明具体方向。需实名并绑定「鸡险」，购买后不退款。禁止用于回国访问和 HTTP/HTTPS，80、443、8080、8443、8000、1080 的 TCP/UDP 双向默认封禁。',
    '月繳起價，含 1 個獨立華東 BGP 位址，流量單向計量，商家未說明具體方向。需實名並綁定「雞險」，購買後不退款。禁止用於回國訪問和 HTTP/HTTPS，80、443、8080、8443、8000、1080 的 TCP/UDP 雙向預設封鎖。',
    'Monthly starting rate with one dedicated East China BGP address. One-way metering applies. The merchant does not specify the direction. Real-name verification and bundled coverage are mandatory. Orders are nonrefundable. The merchant prohibits access back to mainland China and HTTP/HTTPS. TCP/UDP ports 80, 443, 8080, 8443, 8000 and 1080 are blocked both ways by default.',
    '月額開始価格。華東 BGP 専用アドレス 1 個付き。転送量は片方向として計上されます。対象方向は事業者未公表です。実名認証と付帯サービスが必須です。返金不可。中国本土への回線利用および HTTP/HTTPS は禁止されています。TCP/UDP ポート 80、443、8080、8443、8000、1080 は初期設定で双方向遮断です。'
  );
  const poT1 = l10n(
    '商家注明为国际优化线路，不含中国大陆优化。含 1 个独立地址，流量单向计量，商家未说明具体方向。',
    '商家註明為國際最佳化線路，不含中國大陸最佳化。含 1 個獨立位址，流量單向計量，商家未說明具體方向。',
    'The merchant describes this as an internationally optimized route with no mainland China optimization. Includes one dedicated address. One-way metering applies. The merchant does not specify the direction.',
    '事業者公表の国際最適化回線で、中国本土向けの最適化は含みません。専用アドレス 1 個付き。転送量は片方向として計上されます。対象方向は事業者未公表です。'
  );
  const poGroups = [
    {
      key: 'sha', market: 'CN', city: '', category: 'tencent-sha-bgp', routeName: 'BGP', notes: poBGP,
      label: l10n('腾讯云华东 BGP', '騰訊雲華東 BGP', 'Tencent Cloud East China BGP', 'Tencent Cloud 華東 BGP'),
      rows: [
        [17, 'NANO', '169.89', 2, 2, 20, '200 Mbps', '100 GB', 'nano'],
        [18, 'TINY', '298.90', 2, 2, 20, '500 Mbps', '200 GB', 'tiny'],
        [19, 'SMALL', '418.90', 2, 2, 20, '500 Mbps', '500 GB', 'small'],
        [20, 'MEDIUM', '658.90', 2, 2, 20, '700 Mbps', '1 TB', 'medium'],
        [22, 'LARGE', '1018.90', 2, 4, 20, '1 Gbps', '2 TB', 'large'],
        [23, 'TITAN', '2458.90', 4, 8, 50, '1 Gbps', '5 TB', 'titan'],
        [24, 'ULTRA', '4858.90', 4, 8, 50, '1 Gbps', '10 TB', 'ultra']
      ]
    },
    {
      key: 'hk', market: 'HK', city: 'Hong Kong', category: 'tencentcloud-hongkong', routeName: 'T1 International', notes: poT1,
      label: l10n('腾讯云 T1 香港', '騰訊雲 T1 香港', 'Tencent Cloud T1 Hong Kong', 'Tencent Cloud T1 香港'),
      rows: [
        [67, 'MICRO', '59.99', 2, 2, 20, '100 Mbps', '300 GB', 'teng-xun-yun-t1-xiang-gang-micro'],
        [28, 'NANO', '91.99', 2, 2, 20, '200 Mbps', '500 GB', 'teng-xun-yun-xiang-gang-nano'],
        [68, 'PRO', '139.99', 2, 2, 20, '500 Mbps', '1 TB', 'teng-xun-yun-t1-xiang-gang-pro'],
        [29, 'LARGE', '189.99', 4, 4, 20, '1 Gbps', '2 TB', 'teng-xun-yun-large']
      ]
    },
    {
      key: 'us', market: 'US', city: '', category: 'tencentcloud-us', routeName: 'T1 International', notes: poT1,
      label: l10n('腾讯云 T1 美国', '騰訊雲 T1 美國', 'Tencent Cloud T1 USA', 'Tencent Cloud T1 米国'),
      rows: [
        [55, 'NANO', '98.99', 2, 2, 20, '200 Mbps', '500 GB', 'teng-xun-yun-t1mei-guo-nano'],
        [56, 'LARGE', '189.99', 4, 4, 50, '1 Gbps', '2 TB', 'teng-xun-yun-t1mei-guo-large']
      ]
    }
  ];
  for (const {key, market, city, category, routeName, notes, label, rows} of poGroups) {
    const proof = poBase + category;
    for (const [pid, tier, price, cores, ram, disk, port, traffic, slug] of rows) {
      const plan = Object.fromEntries(Object.entries(label).map(([locale, name]) => [locale, name + ' - ' + tier]));
      const sku = plan.sc;
      register({
        id: 'portchannel-' + key + '-' + pid, provider: 'PortChannel', market, city, sku, plan,
        kind: 'vps', ip: 'unknown', route: 'unknown', routeName, carriers: [],
        url: proof + '/' + slug, proof, notes, networkFilters: ['quota-transfer'],
        searchTerms: ['PortChannel Zero', 'PO0', 'po0.io', label.sc, label.tc, tier],
        spec: {sku, price, currency: 'CNY', term: 'month', priceType: 'from', date, proof,
          cpu: cores + ' vCPU', ram: ram + ' GB', disk: disk + ' GB SSD', port,
          traffic, monthlyTraffic: traffic, trafficDirection: 'one-way'}
      });
    }
  }
})();
