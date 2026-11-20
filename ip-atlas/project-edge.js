'use strict';
// Commercial configurations from publicly accessible vendor order catalogues on 20 November 2026.
(function addProjectCatalogues(){
  const dated = '2026-11-20';
  const text = (sc,tc,en,ja) => ({sc,tc,en,ja});
  const notes = {
    listed: text('商家目录起价。周期、端口和流量额度按此商品列示，订购页可选择服务附加项。','商家目錄起價。週期、連接埠和流量額度依此商品列示，訂購頁可選服務附加項。','Published starting price, billing period, port and transfer allowance. The merchant configurator offers optional services.','販売元の開始価格、課金周期、ポート速度、転送量枠です。注文時に追加サービスを選べます。'),
    native: text('该机房的商家目录标注原生 IP，价格为对应商品起价。地址的静态或动态分配方式未列出。','商家目錄將此機房標示為原生 IP，價格為對應商品起價。位址的固定或動態分配方式未列出。','The vendor classifies this location as native IP. The SKU price is a starting rate. Address assignment policy is unspecified.','販売元がこの拠点を現地ネイティブ IP と表記。SKU 開始価格で、固定・動的割当の記載はありません。'),
    cnix: text('香港 CNIX 档需自行准备已接入深圳前海 CNIX 的前置服务。目录列示本侧 VPS 起价及端口。','香港 CNIX 款需自備已接入深圳前海 CNIX 的前置服務。目錄列示本側 VPS 起價與連接埠。','The Hong Kong CNIX plan requires a separate provider connected to Shenzhen Qianhai CNIX. Rates and port apply to the listed VPS.','香港 CNIX プランには深圳前海 CNIX 接続済みの別事業者が必要です。表示値はこの VPS の料金とポートです。'),
    presale: text('商家将此首尔系列列入预售区。标价为年付，列出的上游含 PCCW、NTT 和 LG。开通时间以商家订单为准。','商家將此首爾系列列入預售區。標價為年繳，上游列有 PCCW、NTT 和 LG。開通時間依商家訂單。','Seoul presale. The merchant lists annual rates and PCCW, NTT and LG upstreams. Provisioning dates are set at order time.','ソウルの先行販売。年額、上流は PCCW・NTT・LG と記載。提供時期は販売元の注文画面をご確認ください。'),
    locationNative: text('原生 IP 商品的可选部署地点。价格为商品统一月付起价，附加地址和管理服务另计。','原生 IP 商品的可選部署地點。價格為商品統一月繳起價，附加位址與管理服務另計。','Selectable location of the native IP SKU. The product starts at the displayed monthly price. Additional addresses or management change the total.','現地ネイティブ IP 商品の選択可能拠点。月額開始価格で、追加 IP や管理を選ぶと合計が変わります。'),
    locationResidential: text('商家标注 ISP 住宅 IP，配置器列出此部署地点。仅有地址类别声明，未公开具体家庭接入介质、固定或动态分配方式。月费为起价。','商家標示 ISP 住宅 IP，設定頁列出此部署地點。公開資訊為位址類別，未揭露實體住宅接取介質或固定位址分配方式。月費為起價。','The store labels the address as residential ISP IP and lists this location at checkout. Physical last-mile access and static or dynamic assignment are unspecified. Monthly starting rate.','販売元は住宅 ISP IP と明記し、注文画面でこの拠点を選択できます。宅内回線の種類や固定・動的割当は非公表。月額開始価格です。'),
    rfc: text('商家订购目录的美元月付起价与资源额度。标有 IN&OUT 的流量额度计算双向流量；端口 No limit 表示没有标出数值上限。','商家訂購目錄列出的美元月繳起價與資源額度。標示 IN&OUT 的額度計入雙向流量；No limit 表示連接埠未列數值上限。','Official USD monthly starting rate and resource allowance. IN&OUT counts both directions. A port listed as No limit has no stated numerical ceiling.','公式の米ドル月額開始価格とリソース枠。IN&OUT は送受信合算、ポートの No limit は数値上限の表記なしです。')
  };
  // Rows contain product identifier, public SKU, price, term, cores, memory, disk, port, transfer and order URL.
  const catalogue = [
    {provider:"UQIDC", market:"KR", city:"Seoul", group:"Seoul presale", currency:"CNY", source:"https://www.uqidc.com/cart?fid=1&gid=46", notes:"presale", origin:"", route:"", carriers:[], rows:[
      ["uq-266","首尔-1G","99.00","year",1,"1 GB","20 GB SSD","100 Mbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=266"],
      ["uq-267","首尔-2G","199.00","year",2,"2 GB","30 GB SSD","100 Mbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=267"],
      ["uq-268","首尔-4G","399.00","year",4,"4 GB","60 GB SSD","100 Mbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=268"],
      ["uq-269","首尔-8G","799.00","year",8,"8 GB","120 GB SSD","100 Mbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=269"]
    ]},
    {provider:"UQIDC", market:"HK", city:"Hong Kong", group:"HK DC1", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=24", notes:"native", origin:"native", route:"Premium BGP", carriers:[], rows:[
      ["uq-72","香港-1G","25.00","month",1,"1 GB","20 GB SSD","100 Mbps","500 GB","https://www.uqidc.com/cart?action=configureproduct&pid=72"],
      ["uq-10","香港-2G","50.00","month",1,"2 GB","30 GB SSD","100 Mbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=10"],
      ["uq-11","香港-4G","99.00","month",2,"4 GB","60 GB SSD","100 Mbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=11"],
      ["uq-12","香港-8G","199.00","month",4,"8 GB","120 GB SSD","100 Mbps","3 TB","https://www.uqidc.com/cart?action=configureproduct&pid=12"],
      ["uq-13","香港-16G","399.00","month",8,"16 GB","240 GB SSD","100 Mbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=13"],
      ["uq-16","香港-32G","799.00","month",16,"32 GB","480 GB SSD","100 Mbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=16"]
    ]},
    {provider:"UQIDC", market:"HK", city:"Hong Kong", group:"HK DC3", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=25", notes:"listed", origin:"", route:"Premium", carriers:[], rows:[
      ["uq-154","香港DC3-1G","25.00","month",1,"1 GB","20 GB SSD","100 Mbps","500 GB","https://www.uqidc.com/cart?action=configureproduct&pid=154"],
      ["uq-155","香港DC3-2G","50.00","month",1,"2 GB","30 GB SSD","200 Mbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=155"],
      ["uq-156","香港DC3-4G","99.00","month",2,"4 GB","60 GB SSD","300 Mbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=156"],
      ["uq-157","香港DC3-8G","199.00","month",4,"8 GB","120 GB SSD","500 Mbps","3 TB","https://www.uqidc.com/cart?action=configureproduct&pid=157"],
      ["uq-159","香港DC3-32G","799.00","month",16,"32 GB","480 GB SSD","500 Mbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=159"]
    ]},
    {provider:"UQIDC", market:"LAX", city:"Los Angeles", group:"LAX DC2", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=28", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-163","洛杉矶DC2-1G","25.00","month",1,"1 GB","20 GB NVMe","10 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=163"],
      ["uq-164","洛杉矶DC2-2G","50.00","month",1,"2 GB","30 GB NVMe","10 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=164"],
      ["uq-165","洛杉矶DC2-4G","99.00","month",2,"4 GB","60 GB NVMe","10 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=165"],
      ["uq-166","洛杉矶DC2-8G","199.00","month",4,"8 GB","120 GB NVMe","10 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=166"],
      ["uq-167","洛杉矶DC2-16G","399.00","month",8,"16 GB","240 GB NVMe","10 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=167"],
      ["uq-168","洛杉矶DC2-32G","799.00","month",16,"32 GB","480 GB NVMe","10 Gbps","80 TB","https://www.uqidc.com/cart?action=configureproduct&pid=168"]
    ]},
    {provider:"UQIDC", market:"US", city:"Salt Lake City", group:"SLC Storage", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=29", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-172","SLC-1G","25.00","month",1,"1 GB","500 GB","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=172"],
      ["uq-173","SLC-2G","50.00","month",1,"2 GB","1 TB","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=173"],
      ["uq-174","SLC-4G","99.00","month",2,"4 GB","2 TB","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=174"],
      ["uq-175","SLC-8G","199.00","month",4,"8 GB","4 TB","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=175"],
      ["uq-176","SLC-16G","399.00","month",8,"16 GB","8 TB","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=176"],
      ["uq-177","SLC-32G","799.00","month",16,"32 GB","16 TB","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=177"]
    ]},
    {provider:"UQIDC", market:"US", city:"Kansas City", group:"Kansas City Ryzen", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=3", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-230","堪萨斯-1G","25.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=230"],
      ["uq-229","堪萨斯-2G","50.00","month",1,"2 GB","30 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=229"],
      ["uq-228","堪萨斯-4G","99.00","month",2,"4 GB","60 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=228"],
      ["uq-17","堪萨斯-8G","199.00","month",4,"8 GB","120 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=17"],
      ["uq-19","堪萨斯-16G","399.00","month",8,"16 GB","240 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=19"]
    ]},
    {provider:"UQIDC", market:"US", city:"Houston", group:"Houston Ryzen", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=33", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-207","休斯敦-1G","25.00","month",1,"1 GB","20 GB NVMe","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=207"],
      ["uq-208","休斯敦-2G","50.00","month",1,"2 GB","30 GB NVMe","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=208"],
      ["uq-209","休斯敦-4G","99.00","month",2,"4 GB","60 GB NVMe","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=209"],
      ["uq-210","休斯敦-8G","199.00","month",4,"8 GB","120 GB NVMe","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=210"],
      ["uq-211","休斯敦-16G","399.00","month",8,"16 GB","240 GB NVMe","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=211"],
      ["uq-212","休斯敦-32G","799.00","month",16,"32 GB","480 GB NVMe","1 Gbps","80 TB","https://www.uqidc.com/cart?action=configureproduct&pid=212"]
    ]},
    {provider:"UQIDC", market:"DE", city:"Nuremberg", group:"Nuremberg", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=34", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-219","纽伦堡-1G","25.00","month",1,"1 GB","20 GB NVMe","10 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=219"],
      ["uq-218","纽伦堡-2G","50.00","month",1,"2 GB","30 GB NVMe","10 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=218"],
      ["uq-220","纽伦堡-4G","99.00","month",2,"4 GB","60 GB NVMe","10 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=220"],
      ["uq-221","纽伦堡-8G","199.00","month",4,"8 GB","120 GB NVMe","10 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=221"],
      ["uq-222","纽伦堡-16G","399.00","month",8,"16 GB","240 GB NVMe","10 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=222"],
      ["uq-223","纽伦堡-32G","799.00","month",16,"32 GB","480 GB NVMe","10 Gbps","80 TB","https://www.uqidc.com/cart?action=configureproduct&pid=223"]
    ]},
    {provider:"UQIDC", market:"LAX", city:"Los Angeles", group:"LAX DC3", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=35", notes:"native", origin:"native", route:"Premium", carriers:[], rows:[
      ["uq-49","洛杉矶DC3-1G","25.00","month",1,"1 GB","20 GB SSD","100 Mbps","500 GB","https://www.uqidc.com/cart?action=configureproduct&pid=49"],
      ["uq-14","洛杉矶DC3-2G","50.00","month",2,"2 GB","30 GB SSD","100 Mbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=14"],
      ["uq-15","洛杉矶DC3-4G","99.00","month",4,"4 GB","60 GB SSD","100 Mbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=15"],
      ["uq-18","洛杉矶DC3-8G","199.00","month",8,"8 GB","120 GB SSD","100 Mbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=18"]
    ]},
    {provider:"UQIDC", market:"HK", city:"Hong Kong", group:"HK CNIX", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=37", notes:"cnix", origin:"", route:"", carriers:[], rows:[
      ["uq-243","香港CNIX-1G","25.00","month",1,"1 GB","20 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=243"],
      ["uq-226","香港CNIX-2G","50.00","month",2,"2 GB","30 GB","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=226"],
      ["uq-231","香港CNIX-4G","99.00","month",4,"4 GB","60 GB","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=231"],
      ["uq-242","香港CNIX-8G","199.00","month",8,"8 GB","120 GB","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=242"]
    ]},
    {provider:"UQIDC", market:"US", city:"Tampa", group:"Tampa Ryzen", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=38", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-236","坦帕-1G","25.00","month",1,"1 GB","20 GB NVMe","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=236"],
      ["uq-237","坦帕-2G","50.00","month",1,"2 GB","30 GB NVMe","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=237"],
      ["uq-238","坦帕-4G","99.00","month",2,"4 GB","60 GB NVMe","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=238"],
      ["uq-239","坦帕-8G","199.00","month",4,"8 GB","120 GB NVMe","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=239"],
      ["uq-240","坦帕-16G","399.00","month",8,"16 GB","240 GB NVMe","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=240"],
      ["uq-241","坦帕-32G","799.00","month",16,"32 GB","480 GB NVMe","1 Gbps","80 TB","https://www.uqidc.com/cart?action=configureproduct&pid=241"]
    ]},
    {provider:"UQIDC", market:"GB", city:"Coventry", group:"Coventry", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=39", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-254","考文垂-1G","25.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=254"],
      ["uq-255","考文垂-2G","50.00","month",1,"2 GB","30 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=255"],
      ["uq-256","考文垂-4G","99.00","month",2,"4 GB","60 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=256"],
      ["uq-257","考文垂-8G","199.00","month",4,"8 GB","120 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=257"],
      ["uq-262","考文垂-16G","399.00","month",8,"16 GB","240 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=262"]
    ]},
    {provider:"UQIDC", market:"LAX", city:"Los Angeles", group:"LAX DC1", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=4", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-74","洛杉矶DC1-1G","125.00","year",1,"1 GB","10 GB SSD","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=74"],
      ["uq-20","洛杉矶DC1-2G","25.00","month",1,"2 GB","30 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=20"],
      ["uq-21","洛杉矶DC1-4G","50.00","month",2,"4 GB","60 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=21"],
      ["uq-22","洛杉矶DC1-8G","99.00","month",4,"8 GB","120 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=22"],
      ["uq-23","洛杉矶DC1-16G","199.00","month",8,"16 GB","240 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=23"],
      ["uq-24","洛杉矶DC1-32G","399.00","month",16,"32 GB","480 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=24"]
    ]},
    {provider:"UQIDC", market:"NL", city:"", group:"Netherlands", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=40", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-258","荷兰-1G","25.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=258"],
      ["uq-259","荷兰-2G","50.00","month",2,"2 GB","30 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=259"],
      ["uq-260","荷兰-4G","99.00","month",4,"4 GB","60 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=260"],
      ["uq-261","荷兰-8G","199.00","month",8,"8 GB","120 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=261"],
      ["uq-263","荷兰-16G","399.00","month",16,"16 GB","240 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=263"]
    ]},
    {provider:"UQIDC", market:"US", city:"Dallas", group:"Dallas", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=41", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-250","达拉斯-1G","125.00","year",1,"1 GB","10 GB SSD","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=250"],
      ["uq-251","达拉斯-2G","25.00","month",1,"2 GB","30 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=251"],
      ["uq-252","达拉斯-4G","50.00","month",2,"4 GB","60 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=252"],
      ["uq-253","达拉斯-8G","99.00","month",4,"8 GB","120 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=253"],
      ["uq-265","达拉斯-16G","199.00","month",8,"16 GB","240 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=265"]
    ]},
    {provider:"UQIDC", market:"HK", city:"Hong Kong", group:"HK DC2", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=47", notes:"listed", origin:"", route:"Cogent / CMIN2 / EIE", carriers:["CM"], rows:[
      ["uq-149","HK-DC2-1G","25.00","month",1,"1 GB","20 GB NVMe","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=149"],
      ["uq-150","HK-DC2-2G","50.00","month",1,"2 GB","30 GB NVMe","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=150"],
      ["uq-152","HK-DC2-4G","99.00","month",2,"4 GB","60 GB NVMe","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=152"],
      ["uq-282","HK-DC2-8G","199.00","month",4,"8 GB","120 GB NVMe","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=282"],
      ["uq-283","HK-DC2-16G","399.00","month",8,"16 GB","240 GB NVMe","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=283"]
    ]},
    {provider:"UQIDC", market:"US", city:"Kansas City", group:"Kansas City EPYC", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=49", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-288","KCMO-1G","125.00","year",1,"1 GB","10 GB SSD","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=288"],
      ["uq-289","KCMO-2G","25.00","month",1,"2 GB","30 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=289"],
      ["uq-290","KCMO-4G","50.00","month",2,"4 GB","60 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=290"],
      ["uq-291","KCMO-8G","99.00","month",4,"8 GB","120 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=291"],
      ["uq-292","KCMO-16G","199.00","month",8,"16 GB","240 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=292"],
      ["uq-293","KCMO-32G","399.00","month",16,"32 GB","480 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=293"],
      ["uq-294","KCMO-64G","799.00","month",32,"64 GB","960 GB SSD","1 Gbps","100 TB","https://www.uqidc.com/cart?action=configureproduct&pid=294"]
    ]},
    {provider:"UQIDC", market:"SEA", city:"Seattle", group:"Seattle", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=5", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-73","西雅图-1G","25.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=73"],
      ["uq-25","西雅图-2G","50.00","month",2,"2 GB","30 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=25"],
      ["uq-26","西雅图-4G","99.00","month",4,"4 GB","60 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=26"],
      ["uq-27","西雅图-8G","199.00","month",8,"8 GB","120 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=27"],
      ["uq-28","西雅图-16G","399.00","month",16,"16 GB","240 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=28"]
    ]},
    {provider:"UQIDC", market:"HK", city:"Hong Kong", group:"HK DC3 Ultra", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=56", notes:"listed", origin:"", route:"Ultra · CT / CU / CM", carriers:["CT","CU","CM"], rows:[
      ["uq-330","香港DC3-Ultra-4G","99.00","month",4,"4 GB","60 GB NVMe","50 Mbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=330"],
      ["uq-331","香港DC3-Ultra-8G","199.00","month",8,"8 GB","120 GB NVMe","50 Mbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=331"],
      ["uq-332","香港DC3-Ultra-16G","399.00","month",16,"16 GB","240 GB NVMe","50 Mbps","4 TB","https://www.uqidc.com/cart?action=configureproduct&pid=332"]
    ]},
    {provider:"UQIDC", market:"US", city:"Salt Lake City", group:"SLC Ryzen", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=6", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-48","盐湖城-1G","25.00","month",1,"1 GB","20 GB SSD","10 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=48"],
      ["uq-30","盐湖城-2G","50.00","month",1,"2 GB","30 GB SSD","10 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=30"],
      ["uq-31","盐湖城-4G","99.00","month",2,"4 GB","60 GB SSD","10 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=31"],
      ["uq-32","盐湖城-8G","199.00","month",4,"8 GB","120 GB SSD","10 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=32"],
      ["uq-33","盐湖城-16G","399.00","month",8,"16 GB","240 GB SSD","10 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=33"],
      ["uq-34","盐湖城-32G","799.00","month",16,"32 GB","480 GB SSD","10 Gbps","80 TB","https://www.uqidc.com/cart?action=configureproduct&pid=34"]
    ]},
    {provider:"UQIDC", market:"US", city:"", group:"New York State Ryzen", currency:"CNY", source:"https://www.uqidc.com/cart?fid=2&gid=7", notes:"native", origin:"native", route:"", carriers:[], rows:[
      ["uq-47","纽约-1G","25.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=47"],
      ["uq-35","纽约-2G","50.00","month",1,"2 GB","30 GB SSD","1 Gbps","5 TB","https://www.uqidc.com/cart?action=configureproduct&pid=35"],
      ["uq-36","纽约-4G","99.00","month",2,"4 GB","60 GB SSD","1 Gbps","10 TB","https://www.uqidc.com/cart?action=configureproduct&pid=36"],
      ["uq-37","纽约-8G","199.00","month",4,"8 GB","120 GB SSD","1 Gbps","20 TB","https://www.uqidc.com/cart?action=configureproduct&pid=37"],
      ["uq-38","纽约-16G","399.00","month",8,"16 GB","240 GB SSD","1 Gbps","40 TB","https://www.uqidc.com/cart?action=configureproduct&pid=38"]
    ]},
    {provider:"UQIDC", market:"SEA", city:"Seattle", group:"ISP 住宅 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationResidential", origin:"residential", rows:[
      ["uq-112-seattle","ISP 住宅 IP · Seattle","50.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=112"]
    ]},
    {provider:"UQIDC", market:"LAX", city:"Los Angeles", group:"ISP 住宅 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationResidential", origin:"residential", rows:[
      ["uq-112-los-angeles","ISP 住宅 IP · Los Angeles","50.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=112"]
    ]},
    {provider:"UQIDC", market:"GB", city:"Coventry", group:"ISP 住宅 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationResidential", origin:"residential", rows:[
      ["uq-112-coventry","ISP 住宅 IP · Coventry","50.00","month",1,"1 GB","20 GB SSD","1 Gbps","2 TB","https://www.uqidc.com/cart?action=configureproduct&pid=112"]
    ]},
    {provider:"UQIDC", market:"GB", city:"Coventry", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-coventry","原生 IP · Coventry","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"NL", city:"Haarlem", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-haarlem","原生 IP · Haarlem","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"DE", city:"Nuremberg", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-nuremberg","原生 IP · Nuremberg","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"LAX", city:"Los Angeles", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-los-angeles","原生 IP · Los Angeles","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"SEA", city:"Seattle", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-seattle","原生 IP · Seattle","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"US", city:"Salt Lake City", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-salt-lake-city","原生 IP · Salt Lake City","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"US", city:"Kansas City", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-kansas-city","原生 IP · Kansas City","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"US", city:"Buffalo", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-buffalo","原生 IP · Buffalo","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"US", city:"Tampa", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-tampa","原生 IP · Tampa","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"UQIDC", market:"US", city:"Dallas", group:"原生 IP", currency:"CNY", source:"https://www.uqidc.com/cart", notes:"locationNative", origin:"native", rows:[
      ["uq-117-dallas","原生 IP · Dallas","25.00","month",1,"1 GB","10 GB","1 Gbps","1 TB","https://www.uqidc.com/cart?action=configureproduct&pid=117"]
    ]},
    {provider:"RFCHOST", market:"HK", city:"Hong Kong", group:"HK China Optimization", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network", notes:"rfc", route:"China Optimization", carriers:[], rows:[
      ["rfc-160","HK-CO-Mini","24.99","month",1,"1 GB","15 GB SSD","200 Mbps","1500 GB","https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network/hkg1-premium-mini"],
      ["rfc-161","HK-CO-Standard","50.99","month",1,"2 GB","30 GB SSD","500 Mbps","2500 GB","https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network/hkg1-premium-standard"],
      ["rfc-163","HK-CO-Advanced","76.99","month",2,"3 GB","45 GB SSD","500 Mbps","3500 GB","https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network/hkg1-premium-advanced"],
      ["rfc-165","HK-CO-Plus","102.99","month",2,"4 GB","60 GB SSD","1000 Mbps","4500 GB","https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network/hkg1-premium-plus"],
      ["rfc-162","HK-CO-Pro","167.99","month",4,"6 GB","75 GB SSD","1000 Mbps","7500 GB","https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network/hkg1-premium-pro"],
      ["rfc-164","HK-CO-Max","336.99","month",4,"8 GB","90 GB SSD","2000 Mbps","15000 GB","https://payment.rfchost.com/index.php?rp=/store/hong-kong-1-china-optimization-network/hkg1-premium-max-1"]
    ]},
    {provider:"RFCHOST", market:"HK", city:"Hong Kong", group:"HK Jinx T1", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network-jinx", notes:"rfc", route:"", carriers:[], rows:[
      ["rfc-187","T1ION-Unlimited speed-MiniA-Jinx","10.99","month",1,"1 GB","10 GB SSD","No limit","10 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network-jinx/t1ion-unlimited-speed-minia-1"],
      ["rfc-188","T1ION-Unlimited speed-MinB-Jinx","16.99","month",1,"2 GB","20 GB SSD","No limit","20 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network-jinx/t1ion-unlimited-speed-minb-1"],
      ["rfc-189","T1ION-Unlimited speed-Standard-Jinx","32.99","month",2,"4 GB","40 GB SSD","No limit","40 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network-jinx/t1ion-unlimited-speed-standard-1"],
      ["rfc-190","T1ION-Unlimited speed-Advanced-Jinx","54.99","month",4,"8 GB","80 GB SSD","No limit","80 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/hk-tier-1-international-optimization-network-jinx/t1ion-unlimited-speed-advanced-1"]
    ]},
    {provider:"RFCHOST", market:"LAX", city:"Los Angeles", group:"LAX Premium", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/us-lax-premium", notes:"rfc", route:"CN2", carriers:["CT"], rows:[
      ["rfc-154","US LAX Mini","15.90","month",1,"1 GB","15 GB SSD","1 Gbps","1800 GB","https://payment.rfchost.com/index.php?rp=/store/us-lax-premium/us-lax-mini"],
      ["rfc-155","US LAX Standard","29.90","month",2,"2 GB","30 GB SSD","2 Gbps","3800 GB","https://payment.rfchost.com/index.php?rp=/store/us-lax-premium/usa-lax-standard"],
      ["rfc-156","US LAX Advanced","59.90","month",2,"4 GB","45 GB SSD","3 Gbps","6800 GB","https://payment.rfchost.com/index.php?rp=/store/us-lax-premium/us-lax-advanced"],
      ["rfc-158","US LAX Plus","75.90","month",4,"4 GB","60 GB SSD","4 Gbps","8000 GB","https://payment.rfchost.com/index.php?rp=/store/us-lax-premium/usa-lax-plus"],
      ["rfc-159","US LAX Pro","159.90","month",4,"8 GB","120 GB SSD","5 Gbps","16000 GB","https://payment.rfchost.com/index.php?rp=/store/us-lax-premium/us-nlax-pro"]
    ]},
    {provider:"RFCHOST", market:"LAX", city:"Los Angeles", group:"LAX Classic T1", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/us-tier-1-international-optimization-networkclassic", notes:"rfc", route:"", carriers:[], rows:[
      ["rfc-225","LAX-T1-Classic-Mini","5.99","month",1,"512 MB","10 GB HDD","No limit","10 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/us-tier-1-international-optimization-networkclassic/lax-t1ion-classic"],
      ["rfc-226","LAX-T1-Classic-Standard","8.99","month",1,"1 GB","20 GB HDD","No limit","20 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/us-tier-1-international-optimization-networkclassic/lax-t1-classic-standard"],
      ["rfc-227","LAX-T1-Classic-Max","16.99","month",4,"4 GB","40 GB HDD","No limit","40 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/us-tier-1-international-optimization-networkclassic/lax-t1-classic-max"]
    ]},
    {provider:"RFCHOST", market:"JP", city:"", group:"JP2 T1", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network", notes:"rfc", route:"", carriers:[], rows:[
      ["rfc-248","JP2-T1ION-Mini","13.99","month",1,"1 GB","16 GB SSD","No limit","3 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network/jp2-t1ion-mini"],
      ["rfc-249","JP2-T1ION-Standard","21.99","month",1,"2 GB","34 GB SSD","No limit","6 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network/jp2-t1ion-standard"],
      ["rfc-250","JP2-T1ION-Advanced","32.99","month",2,"3 GB","50 GB SSD","No limit","8 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network/jp2-t1ion-advanced"],
      ["rfc-252","JP2-T1ION-Plus","47.99","month",2,"4 GB","66 GB SSD","No limit","10 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network/jp2-t1ion-plus"],
      ["rfc-251","JP2-T1ION-Pro","69.99","month",4,"6 GB","100 GB SSD","No limit","14 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network/jp2-t1ion-pro"],
      ["rfc-253","JP2-T1ION-Max","91.99","month",4,"8 GB","120 GB SSD","No limit","20 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp2-tier-1-international-optimization-network/jp2-t1ion-max"]
    ]},
    {provider:"RFCHOST", market:"JP", city:"", group:"JP2 China Optimization Lite", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite", notes:"rfc", route:"China Optimization Lite", carriers:[], rows:[
      ["rfc-231","JP2-CO-Micro-Lite","9.99","month",1,"1 GB","20 GB SSD","200 Mbps","1 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite/jp2-co-micro-lite"],
      ["rfc-232","JP2-CO-Mini-Lite","13.99","month",2,"2 GB","40 GB SSD","500 Mbps","1.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite/jp2-co-mini-lite"],
      ["rfc-233","JP2-CO-Standard-Lite","18.99","month",2,"4 GB","60 GB SSD","700 Mbps","2.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite/jp2-co-standard-lite"],
      ["rfc-234","JP2-CO-Advanced-Lite","30.99","month",4,"4 GB","80 GB SSD","1 GB","4.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite/jp2-co-advanced-lite"],
      ["rfc-235","JP2-CO-Max-Lite","42.99","month",4,"8 GB","100 GB SSD","1 GB","8.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network-lite/jp2-co-max-lite"]
    ]},
    {provider:"RFCHOST", market:"SG", city:"Singapore", group:"SG T1", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network", notes:"rfc", route:"", carriers:[], rows:[
      ["rfc-198","SG-T1ION-Mini","13.99","month",1,"1 GB","16 GB SSD","No limit","3 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network/sg-t1ion-mini"],
      ["rfc-200","SG-T1ION-Standard","21.99","month",1,"2 GB","34 GB SSD","No limit","6 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network/sg-t1ion-standard-1"],
      ["rfc-199","SG-T1ION-Advanced","32.99","month",2,"3 GB","50 GB SSD","No limit","8 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network/sg-t1ion-standard"],
      ["rfc-202","SG-T1ION-Plus","47.99","month",2,"4 GB","66 GB SSD","No limit","10 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network/sg-t1ion-plus"],
      ["rfc-203","SG-T1ION-Pro","69.99","month",4,"6 GB","100 GB SSD","No limit","14 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network/sg-t1ion-pro"],
      ["rfc-204","SG-T1ION-Max","91.99","month",4,"8 GB","120 GB SSD","No limit","20 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/sg-tier-1-international-optimization-network/sg-t1ion-max"]
    ]},
    {provider:"RFCHOST", market:"JP", city:"", group:"JP2 China Optimization", currency:"USD", source:"https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network", notes:"rfc", route:"China Optimization", carriers:[], rows:[
      ["rfc-240","JP2-CO-Micro","19.99","month",1,"512 MB","10 GB SSD","200 Mbps","1 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network/jp2-co-micro"],
      ["rfc-241","JP2-CO-Mini","28.99","month",1,"1 GB","20 GB SSD","500 Mbps","1.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network/jp2-co-mini"],
      ["rfc-243","JP2-CO-Standard","45.99","month",2,"2 GB","40 GB SSD","700 Mbps","2.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network/jp2-co-standard"],
      ["rfc-242","JP2-CO-Advanced","62.99","month",4,"4 GB","60 GB SSD","1 GB","4.5 TB IN&OUT","https://payment.rfchost.com/index.php?rp=/store/jp-2-china-optimization-network/jp2-co-advanced"]
    ]}
  ];
  const ids = new Set(PLANS.map(plan=>plan.id));
  for(const group of catalogue){
    for(const [key,sku,price,term,cores,ram,disk,port,traffic,url] of group.rows){
      const id='project-edge-'+key;
      if(ids.has(id))continue;
      ids.add(id);
      const note=notes[group.notes];
      const spec={sku,price,currency:group.currency,term,cpu:cores+' vCPU',ram,disk,port,traffic,date:dated,proof:group.source,priceType:'from',sourceNote:note};
      const address=group.origin||'unknown';
      // "ISP residential IP" describes the marketed address class. It does not establish a residential last mile.
      const ip=address==='residential'?'isp':address==='native'?'native':'unknown';
      const p={id,market:group.market,city:group.city,provider:group.provider,plan:sku,sku,kind:'vps',ip,route:group.route?'claimed':'unknown',routeName:group.route||'',carriers:group.carriers||[],url,proof:group.source,spec,notes:note,networkFilters:['quota-transfer'],searchTerms:[sku,group.group,...(group.provider==='RFCHOST'?['RFC','花卷']:[])]};
      PLANS.push(p);
      if(address==='native'||address==='residential'){
        const value=address==='native'?'native':'isp';
        const proof=group.notes.startsWith('location')?url:group.source;
        IP_EVIDENCE.set(id,[{dimension:value==='native'?'origin':'access',value,sku,scope:group.notes==='native'?'line':'sku',market:group.market,provider:group.provider,checked:dated,url:proof,note}]);
      }
    }
  }
})();