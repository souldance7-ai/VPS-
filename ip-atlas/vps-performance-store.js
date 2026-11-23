'use strict';

(() => {
  const date = '2026-11-23';
  const faq = 'https://v.ps/faq/';
  const locations = {
    SIN: ['SG', 'Singapore'], NRT: ['JP', 'Tokyo'], KIX: ['JP', 'Osaka'],
    HKG: ['HK', 'Hong Kong'], SYD: ['AU', 'Sydney'], AMS: ['NL', 'Amsterdam'],
    FRA: ['DE', 'Frankfurt'], LON: ['GB', 'London'], DUS: ['DE', 'Düsseldorf'],
    TLL: ['EE', 'Tallinn'], SJC: ['SJC', 'San Jose']
  };
  const families = [
    ['Performance', 'month', 'AMD EPYC', 2, [
      ['SIN', 'sin-premium', [
        [235, 'EPYC Explorer', 2, 2, '30 GB NVMe', '1 TB', '1 Gbps', '59.95'],
        [236, 'EPYC Enhancer', 4, 4, '60 GB NVMe', '2 TB', '1.25 Gbps', '119.95'],
        [237, 'EPYC Enterprise', 4, 8, '120 GB NVMe', '4 TB', '1.5 Gbps', '239.95'],
        [238, 'EPYC Elite', 8, 16, '240 GB NVMe', '8 TB', '2 Gbps', '495.95']
      ]],
      ['NRT', 'tok-premium', [
        [259, 'EPYC Flash Gen 2', 2, 4, '30 GB NVMe', '1 TB', '1 Gbps', '59.95'],
        [260, 'EPYC Flow Gen 2', 2, 8, '60 GB NVMe', '2 TB', '1.25 Gbps', '119.95'],
        [261, 'EPYC Fleet Gen 2', 4, 16, '120 GB NVMe', '4 TB', '2 Gbps', '239.95'],
        [262, 'EPYC Formula Gen 2', 8, 32, '240 GB NVMe', '8 TB', '2.5 Gbps', '495.95']
      ]],
      ['FRA', 'fra-premium', [
        [291, 'EPYC Grit', 2, 2, '30 GB NVMe', '1 TB', '1.25 Gbps', '15.95'],
        [292, 'EPYC Gutsy', 4, 4, '60 GB NVMe', '2 TB', '1.5 Gbps', '29.95'],
        [293, 'EPYC Grand', 4, 8, '120 GB NVMe', '4 TB', '1.75 Gbps', '59.95'],
        [294, 'EPYC Gleam', 8, 16, '240 GB NVMe', '8 TB', '2 Gbps', '119.95']
      ]]
    ]],
    ['Edge', 'month', 'AMD EPYC', 1, [
      ['SIN', 'sin-edge', [
        [250, 'Edge Green', 1, 2, '20 GB NVMe', '1024 GB', '1 Gbps', '15.95']
      ]],
      ['KIX', 'kix-iij', [
        [268, 'Edge Green', 1, 2, '20 GB NVMe', '1024 GB', '1 Gbps', '8.95'],
        [270, 'Edge Blue', 2, 4, '40 GB NVMe', '2048 GB', '1 Gbps', '17.95'],
        [271, 'Edge Yellow', 4, 8, '80 GB NVMe', '4096 GB', '1 Gbps', '35.95'],
        [272, 'Edge Orange', 8, 16, '160 GB NVMe', '8192 GB', '1 Gbps', '65.95']
      ]]
    ]],
    ['Cloud', 'month', null, 0, [
      ['NRT', 'tok-sb', [
        [148, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [149, 'Essential', 2, 2, '30 GB NVMe', '1 TB', '1 Gbps', '7.95'],
        [150, 'Pro', 4, 4, '40 GB NVMe', '1 TB', '1 Gbps', '9.95'],
        [151, 'Premium', 8, 8, '80 GB NVMe', '1 TB', '1 Gbps', '19.95']
      ]],
      ['KIX', 'kix-iij', [
        [140, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [141, 'Essential', 2, 2, '30 GB NVMe', '1 TB', '1 Gbps', '7.95'],
        [142, 'Pro', 4, 4, '40 GB NVMe', '1 TB', '1 Gbps', '9.95'],
        [143, 'Premium', 8, 8, '80 GB NVMe', '1 TB', '1 Gbps', '19.95']
      ]],
      ['HKG', 'hkg', [
        [286, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [287, 'Essential', 2, 2, '30 GB NVMe', '2 TB', '1 Gbps', '7.95'],
        [288, 'Pro', 4, 4, '40 GB NVMe', '4 TB', '1 Gbps', '9.95'],
        [289, 'Premium', 8, 8, '80 GB NVMe', '8 TB', '1 Gbps', '19.95']
      ]],
      ['SYD', 'syd', [
        [152, 'Starter', 2, 1, '20 GB SSD', '1 TB', '1 Gbps', '6.95'],
        [153, 'Essential', 2, 2, '30 GB SSD', '1 TB', '1 Gbps', '7.95'],
        [154, 'Pro', 4, 4, '40 GB SSD', '1 TB', '1 Gbps', '9.95'],
        [155, 'Premium', 8, 8, '80 GB SSD', '1 TB', '1 Gbps', '19.95']
      ]],
      ['AMS', 'ams-premium', [
        [91, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [105, 'Essential', 2, 2, '30 GB NVMe', '1 TB', '1 Gbps', '7.95'],
        [106, 'Pro', 4, 4, '40 GB NVMe', '1 TB', '1 Gbps', '9.95'],
        [107, 'Premium', 8, 8, '80 GB NVMe', '1 TB', '1 Gbps', '19.95']
      ]],
      ['FRA', 'fra-premium', [
        [118, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [119, 'Essential', 2, 2, '30 GB NVMe', '1 TB', '1 Gbps', '7.95'],
        [120, 'Pro', 4, 4, '40 GB NVMe', '1 TB', '1 Gbps', '9.95'],
        [121, 'Premium', 8, 8, '80 GB NVMe', '1 TB', '1 Gbps', '19.95']
      ]],
      ['LON', 'lon-premium', [
        [135, 'Starter', 2, 1, '20 GB SSD', '1 TB', '1 Gbps', '6.95'],
        [136, 'Essential', 2, 2, '30 GB SSD', '1 TB', '1 Gbps', '7.95'],
        [137, 'Pro', 4, 4, '40 GB SSD', '1 TB', '1 Gbps', '9.95'],
        [138, 'Premium', 8, 8, '80 GB SSD', '1 TB', '1 Gbps', '19.95']
      ]],
      ['DUS', 'dus', [
        [104, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [112, 'Essential', 2, 2, '30 GB NVMe', '2 TB', '1 Gbps', '7.95'],
        [113, 'Pro', 4, 4, '40 GB NVMe', '4 TB', '1 Gbps', '9.95'],
        [114, 'Premium', 8, 8, '80 GB NVMe', '8 TB', '1 Gbps', '19.95']
      ]],
      ['TLL', 'tll', [
        [122, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '6.95'],
        [123, 'Essential', 2, 2, '30 GB NVMe', '2 TB', '1 Gbps', '7.95'],
        [124, 'Pro', 4, 4, '40 GB NVMe', '4 TB', '1 Gbps', '9.95'],
        [125, 'Premium', 8, 8, '80 GB NVMe', '8 TB', '1 Gbps', '19.95']
      ]],
      ['SJC', 'sjc-premium', [
        [144, 'Starter', 2, 1, '20 GB NVMe', '1 TB', '1 Gbps', '8.95'],
        [145, 'Essential', 2, 2, '30 GB NVMe', '1 TB', '1 Gbps', '9.95'],
        [146, 'Pro', 4, 4, '40 GB NVMe', '1 TB', '1 Gbps', '19.95'],
        [147, 'Premium', 8, 8, '80 GB NVMe', '1 TB', '1 Gbps', '39.95']
      ]]
    ]],
    ['Storage', 'month', null, 0, [
      ['AMS', 'ams', [
        [177, 'Small', 1, 2, '500 GB HDD', '5 TB', '1 Gbps', '6.95'],
        [181, 'Medium', 2, 4, '1000 GB HDD', '10 TB', '1 Gbps', '7.95'],
        [182, 'Large', 4, 8, '1500 GB HDD', '15 TB', '1 Gbps', '9.95'],
        [183, 'X-Large', 8, 16, '2000 GB HDD', '20 TB', '1 Gbps', '19.95']
      ]]
    ]],
    ['Mini', 'year', null, 0, [
      ['NRT', 'tok-sb', [
        [161, 'Mini', 1, 1, '15 GB SSD', '500 GB', '400 Mbps', '39.95'],
        [164, 'Mini Pro', 1, 1, '15 GB NVMe', '600 GB', '500 Mbps', '49.95']
      ]],
      ['SYD', 'syd', [
        [167, 'Mini Pro', 1, 1, '15 GB SSD', '600 GB', '500 Mbps', '49.95']
      ]],
      ['FRA', 'fra-premium', [
        [169, 'Mini Pro', 1, 1, '15 GB NVMe', '600 GB', '500 Mbps', '49.95']
      ]],
      ['SJC', 'sjc-premium', [
        [163, 'Mini Pro', 1, 1, '15 GB NVMe', '600 GB', '500 Mbps', '49.95']
      ]]
    ]],
    ['Nano', 'year', null, 0, [
      ['AMS', 'ams', [
        [184, 'Nano', 1, 1, '15 GB SSD', '1 TB', '1 Gbps', '9.95'],
        [185, 'Nano Pro', 1, 2, '30 GB SSD', '2 TB', '1 Gbps', '19.95']
      ]],
      ['FRA', 'fra', [
        [194, 'Nano', 1, 1, '15 GB SSD', '1 TB', '1 Gbps', '9.95'],
        [195, 'Nano Pro', 1, 2, '30 GB SSD', '2 TB', '1 Gbps', '19.95']
      ]]
    ]]
  ];

  function familyNotes(backups, throttled) {
    return {
      sc: `含独立 IPv4 和 IPv6 地址。${backups ? `含 ${backups} 个备份槽。` : ''}月流量双向合计。${throttled ? '用完后端口限速至 1 Mbps。' : '用完后暂停服务至下月。'}`,
      tc: `含獨立 IPv4 和 IPv6 位址。${backups ? `含 ${backups} 個備份槽。` : ''}月流量雙向合計。${throttled ? '用完後連接埠限速至 1 Mbps。' : '用完後暫停服務至下月。'}`,
      en: `Includes dedicated IPv4 and IPv6 addresses. ${backups ? `Includes ${backups} backup slot${backups === 1 ? '' : 's'}. ` : ''}Monthly transfer counts both directions. ${throttled ? 'The port is throttled to 1 Mbps when the allowance is exhausted.' : 'Service is paused until the next month when the allowance is exhausted.'}`,
      ja: `専用 IPv4・IPv6 アドレス付き。${backups ? `バックアップ枠 ${backups} 個付き。` : ''}月間転送量は両方向の合計。${throttled ? '上限到達後はポート速度が 1 Mbps に制限されます。' : '上限到達後は翌月までサービスが停止されます。'}`
    };
  }

  const existing = new Map(PLANS.filter(plan => plan.provider === 'V.PS')
    .map(plan => [`${plan.market}:${plan.spec?.sku || plan.sku || plan.plan}`, plan]));
  const speedLimitedFamilies = new Set(['Performance', 'Storage', 'Nano']);
  for (const [family, term, cpuFamily, backups, groups] of families) {
    const source = `https://v.ps/products/${family.toLowerCase()}-kvm-vps/`;
    const series = `${family} KVM VPS`;
    const notes = familyNotes(backups, speedLimitedFamilies.has(family));
    for (const [code, lookingGlass, rows] of groups) {
      const [market, city] = locations[code];
      for (const [pid, name, cores, ram, disk, traffic, port, price] of rows) {
        const sku = `${code} ${name}`;
        const old = existing.get(`${market}:${sku}`);
        const spec = {
          sku, proof: source, date, price, currency: 'EUR', term, priceType: 'official',
          cpu: `${cores} vCPU`, ram: `${ram} GB`, disk, traffic, monthlyTraffic: traffic,
          trafficDirection: 'both', port, virtualization: 'KVM'
        };
        if (cpuFamily) Object.assign(spec, {cpuFamily, cpuModelScope: 'official', cpuModelSource: source, cpuModelDate: date});
        const plan = {
          id: old?.id || `vps-market-${pid}`, provider: 'V.PS', market, city, sku,
          plan: `${sku} · ${series}`, kind: 'vps', ip: 'unknown', route: 'unknown',
          routeName: '', carriers: [], ipv4: true, ipv6: true, spec, notes,
          url: `https://vps.hosting/?cmd=cart&action=add&id=${pid}`, proof: source, terms: faq,
          lg: `https://${lookingGlass}.lg.xtom.com/`,
          searchTerms: [...new Set([...(old?.searchTerms || []), series, 'v.ps', 'vps.hosting', 'xTom', '小秘书', '小秘書', String(pid)])]
        };
        if (old) Object.assign(old, plan);
        else PLANS.push(plan);
      }
    }
  }
})();
