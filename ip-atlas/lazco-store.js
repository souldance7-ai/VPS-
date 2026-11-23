'use strict';

(() => {
  const pricing = 'https://cloud.lazco.tw/pricing';
  const deployment = 'https://cloud.lazco.tw/dashboard/deploy';
  const checked = '2026-11-23';
  const provider = 'Lazco Cloud';
  const byId = new Map(PLANS.map(plan => [plan.id, plan]));
  const legacyIds = {
    'tw-vps-a': 'field-lazco-tpe1',
    'tw-vps-b': 'field-lazco-tpe2',
    'tw-vps-d': 'field-lazco-tpe4'
  };

  // Official regional plan variants embedded in the public pricing page.
  const taiwan = [
    ['a', 1, 1, 30, '500 GB', 220, 140],
    ['b', 1, 2, 60, '1 TB', 440, 300],
    ['c', 2, 2, 70, '1.5 TB', 670, 450],
    ['d', 2, 4, 90, '2 TB', 875, 600],
    ['e', 2, 8, 110, '2.5 TB', 1100, 800],
    ['f', 4, 8, 130, '3.5 TB', 1550, 1200],
    ['g', 4, 16, 220, '5 TB', 2370, 1800],
    ['h', 6, 24, 240, '7 TB', 3000, 2400],
    ['pro', 8, 32, 450, '15 TB', 5600, 5000],
    ['max', 10, 64, 550, '20 TB', 9500, 8000]
  ];
  const regions = [
    {market:'TW', city:'Taipei', code:'TW-TPE', port:'2 Gbps', names:['台北', '台北', '台北'],
      plans:taiwan.map(([key, cores, ram, disk, traffic, price]) => ['tw-vps-' + key, cores, ram, disk, traffic, price])},
    {market:'TW', city:'Taichung', code:'TW-TXG', port:'600 Mbps', names:['台中', '台中', '台中'],
      plans:taiwan.map(([key, cores, ram, disk, traffic, _taipeiPrice, price]) => ['tw-txg-vps-' + key, cores, ram, disk, traffic, price])},
    {market:'SG', city:'Singapore', code:'SG-SIN', port:'1 Gbps', names:['新加坡', '新加坡', 'シンガポール'], plans:[
      ['sg-n1', 1, 2, 20, '500 GB', 200],
      ['sg-n2', 1, 4, 30, '1 TB', 330],
      ['sg-n3', 2, 8, 40, '2 TB', 560],
      ['sg-n4', 4, 16, 50, '4 TB', 750],
      ['sg-n5', 8, 32, 90, '8 TB', 1300],
      ['sg-n6', 16, 64, 180, '16 TB', 2400]
    ]}
  ];

  for (const {market, city, code, port, names:[sc, tc, ja], plans} of regions) {
    for (const [slug, cores, memory, storage, traffic, price] of plans) {
      const id = legacyIds[slug] || 'lazco-compute-' + slug;
      const size = `${cores}c-${memory}g-${storage}g`;
      const sku = `${city} · ${size}`;
      const notes = {
        sc:`${sc} Compute 官网页面公布的含税月价与每月流量。超量费用为 TWD 0.50/GB。首次部署 Compute 需完成组织一级身份验证。`,
        tc:`${tc} Compute 官網公布的含稅月價與每月流量。超量費用為 TWD 0.50／GB。首次部署 Compute 需完成組織第一級身分驗證。`,
        en:`Official tax-inclusive monthly price and transfer allowance for ${city} Compute. Overage is TWD 0.50/GB. Level 1 organization verification is required before the first Compute deployment.`,
        ja:`${ja} Compute の税込公式月額料金と月間転送量です。超過転送は 1 GB あたり 0.50 TWD。最初の Compute の作成には組織のレベル1認証が必要です。`
      };
      const record = {
        id, provider, market, city, sku, kind:'vps', ip:'unknown', route:'unknown', carriers:[],
        plan:{sc:`${sc} · ${size}`, tc:`${tc} · ${size}`, en:sku, ja:`${ja} · ${size}`},
        url:deployment, proof:pricing, notes, networkFilters:['hourly', 'quota-transfer'],
        searchTerms:['Lazco Compute', '拉资科', '拉資科', code, slug, sku, sc],
        spec:{sku, cpu:`${cores} vCPU`, ram:`${memory} GB`, disk:`${storage} GB NVMe`,
          port, traffic, monthlyTraffic:traffic, price:String(price), currency:'TWD', term:'month',
          priceType:'official', proof:pricing, date:checked, sourceNote:notes}
      };
      const existing = byId.get(id);
      if (existing) Object.assign(existing, record);
      else PLANS.push(record);
    }
  }
})();
