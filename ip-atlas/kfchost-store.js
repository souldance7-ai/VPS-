'use strict';

(() => {
  const official = 'https://kfchost.com/center/product/ecs/create';
  const pricing = 'https://kfchost.com/center/pricing';
  const inventorySource = 'https://kfchost.com/api/front/get-ecs-products?region=jp';
  const checkedAt = '2026-11-23T01:02:57.422Z';
  const date = checkedAt.slice(0, 10);
  const families = [
    {
      name: 'China Optimized RouteFlex',
      aliases: ['COR', '中国优化', '中國優化', 'vlan103'],
      route: 'claimed',
      // SKU, English name, Chinese name, vCPU, RAM GB, disk GB, port Mbps, monthly GB, USD.
      rows: [
        [1372, 'Qiming', '启明', 1, 0.5, 10, 100, 500, '7.19'],
        [1373, 'Wave Lite', '破浪', 2, 1, 20, 300, 2000, '26.39'],
        [1376, 'Windrise', '登云', 4, 2, 40, 500, 3000, '43.89'],
        [1377, 'Vault Edge', '藏锋', 6, 4, 60, 700, 5000, '80.59'],
        [1378, 'Flow Ocean', '归海', 8, 4, 80, 1000, 8000, '143.09'],
        [1379, 'Core Nexus', '定枢', 16, 8, 120, 2000, 10000, '202.09']
      ]
    },
    {
      name: 'Tier 1 Global RouteFlex',
      aliases: ['T1', '国际线路', '國際線路', 'vlan201'],
      route: 'unknown',
      rows: [
        [1325, 'Micro Start', '星火', 1, 0.5, 10, 200, 2000, '4.89'],
        [1326, 'Lite Node', '轻舟', 2, 1, 20, 500, 3000, '7.34'],
        [1327, 'Power Route', '逐风', 4, 2, 40, 2000, 10000, '22.17'],
        [1328, 'Storage Plus', '云仓', 6, 4, 160, 5000, 20000, '48.07'],
        [1329, 'Max Traffic', '瀚流', 8, 4, 80, 10000, 50000, '123.97'],
        [1330, 'Ultra Core', '极核', 16, 8, 120, null, 100000, '387.47']
      ]
    }
  ];
  const existing = new Set(PLANS.map(plan => plan.id));
  const qimingUrl = official + '/region/kfc-jp1/regionType/jp/plan/1372/cpu/1/ram/512/image/Debian-13-amd64/network/vlan103/billing/fixedFlow/flow/500/diskType/ssd/ip/1';

  for (const { name, aliases, route, rows } of families) {
    for (const [pid, sku, alias, cores, ram, disk, port, transfer, price] of rows) {
      const id = 'kfchost-jp-' + pid;
      if (existing.has(id)) continue;
      existing.add(id);
      const url = pid === 1372 ? qimingUrl : official + '/plan/' + pid;
      const spec = {
        sku, price, currency: 'USD', term: 'month', priceType: 'official', date, proof: url,
        cpu: cores + ' vCPU', ram: ram + ' GB',
        disk: disk + (pid === 1372 ? ' GB SSD' : ' GB'),
        port: port === null ? { sc: '不限速', tc: '不限速', en: 'Uncapped', ja: '速度制限なし' }
          : port < 1000 ? port + ' Mbps' : port / 1000 + ' Gbps',
        traffic: transfer + ' GB',
        monthlyTraffic: transfer + ' GB'
      };
      PLANS.push({
        id, provider: 'KFCHost', market: 'JP', city: 'Japan Region 1',
        sku, plan: sku, kind: 'vps', ip: 'unknown', route, routeName: name, carriers: [],
        url, proof: pricing, spec,
        searchTerms: ['KFC Host', '日本一区', '日本一區', '日本 Region 1', alias, String(pid), ...aliases],
        stockSnapshot: { state: 'in-stock', checkedAt, source: inventorySource }
      });
    }
  }
})();
