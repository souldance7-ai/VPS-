/* Public merchant listings for providers found in the project. All fields below are public. */
(() => {
  const copy = (sc,tc,en,ja) => ({sc,tc,en,ja});
  const date = '2026-11-20';
  const dimensions = new Map(Object.entries(IP_EVIDENCE_OPTIONS).flatMap(([dim,values])=>values.map(value=>[value,dim])));
  const renet = 'https://renet.tw/index.php/store/hkbgp-vps', voll = 'https://vollcloud.com/store/hong-kong-cmi-vps-sale';
  const zgo = 'https://clients.zgovps.com/index.php?/cart/special-offer/';
  const renetNote = copy('香港国际 BGP，商家对大陆移动尽力优化。每款含 IPv4 和 /64 IPv6。列的是基础配置起价。','香港國際 BGP，商家對大陸移動盡力優化。各款含 IPv4 與 /64 IPv6。此處為基礎配置起價。','International BGP. The merchant offers best-effort routing to China Mobile. Base prices include IPv4 and an IPv6 /64.','国際 BGP。中国移動向けはベストエフォート。基本構成には IPv4 と IPv6 /64 が含まれます。');
  const zgoNote = copy('德国特价 Starter，商品编号 160。11 月 20 日频道发布年价和补货通知。机房资料列 AMD EPYC 7002、9929 和公平使用条款。库存以订单页为准。','德國特價 Starter，商品編號 160。11 月 20 日頻道發布年價及補貨通知。機房資料列 AMD EPYC 7002、9929 與公平使用條款。庫存以訂購頁為準。','Frankfurt special, product 160. A 20 November restock post quotes the annual price. The store specifies EPYC 7002, 9929 and fair use. Check the order page for current stock.','フランクフルト特価商品 160。11月20日の再入荷投稿に年額を掲載。販売元は EPYC 7002、9929、公平利用を明記。在庫は注文画面で確認できます。');
  const hkZgo = copy('香港特价 AMD EPYC 7002，官页列 BGP、一个 IPv4 与公平使用条款。VPSME 列出的年价附于价格来源。','香港特價 AMD EPYC 7002，官頁列 BGP、一個 IPv4 與公平使用條款。年價取自 VPSME 公開記錄。','Hong Kong EPYC 7002 specials. The store specifies BGP, one IPv4 and fair use. VPSME records the annual rates.','香港 EPYC 7002 特価。公式は BGP、IPv4 1個、公平利用を明記。年額は VPSME の公開記録。');
  const vollNote = (uk) => uk ? copy('香港部署。该 SKU 的 IPv4 由商家标作英国原生；详情可查看三网分方向路径。','部署於香港，商家將此 SKU 的 IPv4 標為英國原生。詳情可看三網去回程。','Hosted in Hong Kong. The merchant describes this SKU’s IPv4 as UK-native. Carrier paths appear in the details.','香港設置。事業者はこの SKU の IPv4 を英国ネイティブと表記。各社の経路は詳細を参照。') : copy('香港部署。此年付 SKU 由商家标作香港原生 IPv4。','部署於香港，商家將此年付 SKU 標為香港原生 IPv4。','Hosted in Hong Kong. The merchant lists Hong Kong-native IPv4 for this annual SKU.','香港設置。事業者はこの年払い SKU に香港ネイティブ IPv4 を明記。');
  const lamNat = copy('台湾 HiNet 家宽，动态共享 IPv4，按单向计算流量。商品页列明端口数量。','台灣 HiNet 家寬，動態共享 IPv4，流量按單向計。可選連接埠數量見商品頁。','Taiwan HiNet residential access with a shared dynamic IPv4. Transfer is metered in one direction. The store lists the number of forwarded ports.','台湾 HiNet 家庭回線、共有動的 IPv4、片方向の転送量。割当ポート数は商品ページに明記。');
  const lamVds = copy('台湾 HiNet 本地家宽，独立 IP，可在面板更换。不限流量受公平使用条款约束。','台灣 HiNet 本地家寬，獨立 IP，可在面板更換。不限流量適用公平使用條款。','Taiwan HiNet residential access with a dedicated IP changeable in the control panel. Unmetered transfer is subject to fair use.','台湾 HiNet 家庭回線。専用 IP はパネルで変更可。転送量無制限には公平利用条件が適用されます。');
  const ytNote = copy('物理服务器位于深圳，香港网络出口。此处按物理位置筛选。2026-07-01 的测评记录列出四档月价及双向流量。','實體主機在深圳，網路出口在香港。此處按實體位置篩選。四檔月價及雙向流量取自 2026-07-01 的測評記錄。','Physical server in Shenzhen with a Hong Kong network exit. The market filter uses physical location. Monthly rates and two-way transfer are from the 1 July 2026 review.','物理設置は深圳、ネットワーク出口は香港。地域フィルターは物理設置場所を使用。料金・双方向転送量は2026年7月1日の記録。');
  function add(g,items) {
    for (const [key,sku,price,term,cores,ram,disk,port,traffic] of items) {
      const id='project-'+key, note=typeof g.note==='function'?g.note(key):g.note;
      const proof=g.proof||g.url,checked=g.date||date;
      PLANS.push({id,provider:g.provider,market:g.market,city:g.city,plan:sku,kind:'vps',ip:g.ip||'unknown',
        route:g.route?'claimed':'unknown',routeName:g.route||'',carriers:g.carriers||[],url:g.url,proof,
        notes:note,searchTerms:[sku,...(g.search||[])],
        spec:{sku,price:String(price),currency:g.currency||'USD',term,cpu:cores+' vCPU',ram,disk,port,traffic,date:checked,proof,sourceNote:note,...(g.priceType?{priceType:g.priceType}:{})}});
      const evidence=typeof g.ipFacts==='function'?g.ipFacts(key):g.ipFacts||[];
      if(evidence.length)IP_EVIDENCE.set(id,evidence.map(value=>({dimension:dimensions.get(value),value,provider:g.provider,market:g.market,sku,url:g.url,scope:'sku',checked,note})));
    }
  }
  add({provider:'ZgoCloud',market:'DE',city:'Frankfurt',route:'AS9929',url:'https://clients.zgovps.com/?cmd=cart&action=add&id=160',proof:'https://t.me/vpsts/4425',priceType:'review',note:zgoNote,search:['ZGO','ZgoVPS','EPYC 7002'],ipFacts:['dedicated-ipv4']},[['zgo-fra160','DE Frankfurt AMD VPS - Specials - Starter',45,'year',1,'1 GB DDR4','10 GB NVMe','200 Mbps','1 TB / month']]);
  add({provider:'ZgoCloud',market:'DE',city:'Frankfurt',route:'AS9929',url:zgo,proof:'https://zgocloud.org/gem/',date:'2026-07-28',priceType:'review',ipFacts:['dedicated-ipv4'],
    note:copy('特惠 Standard，2026-07-28 的同系列评测报价为 88 美元/年。','特惠 Standard，2026-07-28 同系列測評記錄為 88 美元／年。','Specials Standard. The 28 July 2026 review lists $88 per year.','Specials Standard。2026年7月28日の記録は年額88米ドル。')},
    [['zgo-fra-standard','DE Frankfurt AMD VPS - Specials - Standard',88,'year',2,'2 GB DDR4','20 GB NVMe','200 Mbps','2 TB / month']]);
  COMMUNITY_OFFERS.push({id:'project-zgo-fra160',provider:'ZgoCloud',plan:'DE Frankfurt AMD VPS - Specials - Starter',markets:['DE'],city:'Frankfurt',kind:'vps',sku:'DE Frankfurt AMD VPS - Specials - Starter',price:'45.00',currency:'USD',term:'year',status:'limited',priceBasis:'publisher',conditions:zgoNote,source:'@vpsts',sourceUrl:'https://t.me/vpsts/4425',thread:'https://t.me/vpsts/4425',official:zgo,url:'https://clients.zgovps.com/?cmd=cart&action=add&id=160',cpu:'1 vCPU',ram:'1 GB DDR4',disk:'10 GB NVMe',port:'200 Mbps',traffic:'1 TB / month',routeName:'AS9929',publishedAt:date,observed:date,stockAtPublication:'in-stock',stockObservedAt:date});
  add({provider:'ZgoCloud',market:'HK',city:'Hong Kong',route:'BGP',url:zgo,proof:'https://www.vpsme.de/g/5',priceType:'review',note:hkZgo,search:['ZGO','ZgoVPS'],ipFacts:['dedicated-ipv4']},[
    ['zgo-hk-starter','HongKong AMD VPS - Specials - Starter',45,'year',1,'1 GB DDR4','10 GB NVMe','100 Mbps','500 GB / month'],
    ['zgo-hk-standard','HongKong AMD VPS - Specials - Standard',88,'year',2,'2 GB DDR4','20 GB NVMe','100 Mbps','1 TB / month']]);
  add({provider:'RENET',market:'HK',city:'Hong Kong',url:renet,route:'International BGP',priceType:'from',note:renetNote,ipFacts:['dedicated-ipv4']},[
    ['renet-lite','HKBGP VPS Lite',2.5,'month',1,'1 GB','10 GB SSD','1 Gbps','2 TB / month'],
    ['renet-standard','HKBGP VPS Standard',5,'month',2,'2 GB','20 GB SSD','1 Gbps','4 TB / month'],
    ['renet-medium','HKBGP VPS Medium',10,'month',4,'4 GB','30 GB SSD','1 Gbps','8 TB / month'],
    ['renet-large','HKBGP VPS Large',19,'month',4,'8 GB','40 GB SSD','2 Gbps','16 TB / month'],
    ['renet-ultra','HKBGP VPS Ultra',38,'month',8,'16 GB','60 GB SSD','10 Gbps','32 TB / month']]);
  add({provider:'VollCloud',market:'HK',city:'Hong Kong',route:'163 · CMI · CMIN2',carriers:['CT','CU','CM'],url:voll,note:key=>vollNote(!['voll-hk-20','voll-hk-12'].includes(key)),ipFacts:key=>['dedicated-ipv4',['voll-hk-20','voll-hk-12'].includes(key)?'native':'broadcast']},[
    ['voll-hk-0','HK-Group 0',8,'month',1,'512 MB DDR4','10 GB SSD RAID10','100 Mbps','500 GB / month'],
    ['voll-hk-2','HK-Group 2',16,'month',2,'1 GB DDR4','10 GB SSD RAID10','200 Mbps','1.5 TB / month'],
    ['voll-hk-3','HK-Group 3',59,'month',4,'2 GB DDR4','10 GB SSD RAID10','300 Mbps','4 TB / month'],
    ['voll-hk-20','HK-Group 20',59,'year',1,'384 MB DDR4','10 GB SSD RAID10','200 Mbps','500 GB / month'],
    ['voll-hk-12','HK-Group 12',99,'year',1,'512 MB DDR4','10 GB SSD RAID10','300 Mbps','1000 GB / month']]);
  add({provider:'Lamhosting',market:'TW',city:'Taiwan',currency:'CNY',url:'https://lamhosting.com/index.php/store/hinet-nat',note:lamNat,ip:'residential',ipFacts:['residential','isp','dynamic','shared-nat'],priceType:'from',search:['LAM','HiNet NAT','中華電信','中华电信']},[
    ['lam-zero','HiNet-Zero',6.99,'month',1,'512 MB','10 GB','100 Mbps','300 GB / month'],
    ['lam-a','HiNet-A',15.99,'month',1,'1 GB','20 GB','300 Mbps','1 TB / month'],
    ['lam-b','HiNet-B',29.99,'month',2,'2 GB','20 GB','300 Mbps','2 TB / month'],
    ['lam-c','HiNet-C',59.99,'month',4,'4 GB','30 GB','500 Mbps','4 TB / month']]);
  add({provider:'Lamhosting',market:'TW',city:'Taiwan',currency:'CNY',url:'https://lamhosting.com/index.php/store/hinet-vds',note:lamVds,ip:'residential',ipFacts:['residential','isp','dedicated-ipv4'],priceType:'from',search:['LAM','HiNet VDS']},[['lam-vds','HiNet-VDS',288,'month',4,'4 GB','50 GB','500 Mbps','FUP']]);
  add({provider:'YT.NET',market:'CN',city:'Shenzhen',currency:'CNY',url:'https://yt.net/',proof:'https://digvps.com/review/yt',priceType:'review',date:'2026-07-01',note:ytNote,search:['云途','雲途','YunTu','香港出口','Hong Kong exit','深港高頻','深港高频','CNIX']},[
    ['yt-esa','HK.ES.A',25,'month',1,'512 MB','10 GB','300 Mbps','500 GB / month'],
    ['yt-esb','HK.ES.B',38,'month',1,'1 GB','15 GB','500 Mbps','800 GB / month'],
    ['yt-esc','HK.ES.C',50,'month',2,'2 GB','20 GB','1 Gbps','1.2 TB / month'],
    ['yt-esd','HK.ES.D',88,'month',4,'4 GB','25 GB','1.2 Gbps','1.5 TB / month']]);
})();