/* IP Attributes from named merchant configurations. Each row is a claim about the
   listed SKU, product line or expressly identified optional cloud service. */
const IP_EVIDENCE_OPTIONS = {
  origin: ['native','broadcast'],
  access: ['residential','isp','datacenter'],
  assignment: ['static','dynamic'],
  sharing: ['dedicated-ipv4','shared-nat']
};
function ipCopy(sc,tc,en,ja){return {sc,tc,en,ja}}
const ipEvidenceWords = {
  origin: ipCopy('IP 地域属性','IP 地域屬性','IP origin','IP の地域属性'),
  access: ipCopy('接入网络','接取網路','Access network','接続ネットワーク'),
  assignment: ipCopy('地址分配','位址分配','Address assignment','アドレス割り当て'),
  sharing: ipCopy('IPv4 使用方式','IPv4 使用方式','IPv4 sharing','IPv4 の共有方式'),
  native: ipCopy('本地原生 IP','本地原生 IP','Local native IP','現地ネイティブ IP'),
  broadcast: ipCopy('跨地区广播 IP','跨地區廣播 IP','Cross-region IP','域外 IP の利用'),
  residential: ipCopy('住宅 / 家宽','住宅 / 家寬','Residential broadband','住宅回線'),
  isp: ipCopy('运营商 ISP 接入','電信商 ISP 接取','ISP access','ISP 接続'),
  datacenter: ipCopy('数据中心网络','資料中心網路','Datacenter network','データセンターネットワーク'),
  static: ipCopy('静态 / 固定 IP','靜態 / 固定 IP','Static IP','固定 IP'),
  dynamic: ipCopy('动态 IP','動態 IP','Dynamic IP','動的 IP'),
  'dedicated-ipv4': ipCopy('独享公网 IPv4','獨享公網 IPv4','Dedicated public IPv4','専用グローバル IPv4'),
  'shared-nat': ipCopy('共享 IPv4 / NAT','共享 IPv4 / NAT','Shared IPv4 / NAT','共有 IPv4 / NAT')
};
const ipEvidenceGlossary = {
  native: ipCopy('商品页明确把交付地址称为当地原生 IP。地域数据库可能采用不同归属。','商品頁明確把交付位址稱為當地原生 IP。地域資料庫可能採用不同歸屬。','The merchant describes the delivered address as native to the named market. Geolocation databases may disagree.','事業者が対象地域のネイティブ IP と明記したアドレスです。位置情報データベースによって判定は異なります。'),
  broadcast: ipCopy('商家明确说明在本地机房提供其他地区的地址，或注明跨地区广播。注册、路由和网站识别的地点可能不同。','商家明確說明在本地機房提供其他地區的位址，或註明跨地區廣播。註冊、路由和網站辨識的地點可能不同。','The merchant identifies an address from another market on this location’s service, or explicitly describes a cross-region announcement. Registry, routing and geolocation describe different things.','現地のサービスで他地域の IP を提供する、または域外アナウンスを行うと事業者が明記しています。登録地域・経路・位置判定は別の情報です。'),
  residential: ipCopy('商家将该套餐的出口描述为住宅或家庭宽带。分配方式、入站端口和目标服务识别另看规格。','商家將該方案的出口描述為住宅或家庭寬頻。分配方式、入站連接埠和目標服務辨識另看規格。','The merchant describes the egress as residential or home broadband. Assignment, inbound ports and service recognition are separate properties.','事業者が出口を住宅・家庭用回線と表示しています。割り当て方式、受信ポート、サービス側の判定は別途確認できます。'),
  isp: ipCopy('产品明确提供电信运营商接入，或以 ISP 地址系列销售。运营商名称见方案证据。','產品明確提供電信商接取，或以 ISP 位址系列販售。電信商名稱見方案證據。','The plan names an access carrier or is explicitly sold as an ISP IP product. Identified operators appear in the evidence.','回線事業者が明記されるか、ISP IP 商品として販売されています。確認できた事業者名は根拠欄に記載します。'),
  datacenter: ipCopy('由云服务商的机房公网向该实例提供地址。商品的公网选项及收费方式见说明。','由雲端服務商的機房公網向該執行個體提供位址。商品的公網選項及收費方式見說明。','Public addressing comes from the cloud provider’s datacenter network. The evidence states the applicable networking option.','クラウド事業者のデータセンターネットワークから公開アドレスを付与します。対象のネットワークオプションは根拠欄に記載します。'),
  static: ipCopy('商家注明为固定地址。换机、迁移、欠费或运营商维护时的保留条件以服务条款为准。','商家註明為固定位址。換機、遷移、欠費或電信商維護時的保留條件以服務條款為準。','The merchant specifies a fixed address. Retention during migration, suspension or maintenance depends on service terms.','事業者が固定アドレスと明記しています。移行・停止・保守時の保持条件はサービス規約に従います。'),
  dynamic: ipCopy('按商家描述，出口 IP 可能自动变化或由用户主动更换，具体触发条件见方案。','依商家說明，出口 IP 可能自動變更或由使用者主動更換，具體觸發條件見方案。','The egress address can change automatically or on request. See the plan for its documented trigger.','出口 IP が自動または利用者の操作で変わります。変更条件は商品ごとの説明を参照してください。'),
  'dedicated-ipv4': ipCopy('公网 IPv4 供单个实例独享。直配地址和明确的一对一 NAT 都可归入此项。','公網 IPv4 供單一執行個體獨享。直接配置和明確的一對一 NAT 都可歸入此項。','One instance has exclusive use of the public IPv4. This also covers explicitly documented one-to-one NAT.','一つのインスタンスがグローバル IPv4 を専用利用します。明記された 1:1 NAT も含みます。'),
  'shared-nat': ipCopy('多用户共用公网 IPv4。商家可能只分配特定入站端口。','多使用者共用公網 IPv4。商家可能只分配特定入站連接埠。','Multiple users share a public IPv4. The vendor may allocate only a specific set of inbound ports.','複数利用者が一つのグローバル IPv4 を共有します。割り当てられる受信ポートが限定される場合があります。')
};
function ipEvidenceLabel(value, language=typeof lang==='string'?lang:'sc'){return ipEvidenceWords[value]?.[language]||ipEvidenceWords[value]?.sc||value}
function ipEvidenceDefinition(value,language=typeof lang==='string'?lang:'sc'){return ipEvidenceGlossary[value]?.[language]||ipEvidenceGlossary[value]?.sc||''}
const IP_EVIDENCE = new Map();
(function compileIpEvidence(){
  const checked='2026-11-20', dimensions=new Map(Object.entries(IP_EVIDENCE_OPTIONS).flatMap(([d,values])=>values.map(value=>[value,d])));
  const generic = {
    native:ipCopy('商品说明列出该地区的原生地址。','商品說明列出該地區的原生位址。','The product description lists a native address for this market.','商品説明にこの地域のネイティブ IP が記載されています。'),
    residential:ipCopy('商家把此方案列入住宅宽带产品。','商家把此方案列入住宅寬頻產品。','The merchant lists this configuration as a residential broadband product.','事業者はこの構成を住宅回線商品として掲載しています。'),
    isp:ipCopy('商品的接入线路或地址系列明确标注 ISP。','商品的接取線路或位址系列明確標示 ISP。','The provider identifies the ISP access line or ISP address product family.','事業者が ISP 回線または ISP IP シリーズを明記しています。'),
    static:ipCopy('套餐规格将分配的地址标为固定。','方案規格將分配的位址標為固定。','The plan specification lists a fixed address.','商品仕様で固定アドレスと明記されています。'),
    dynamic:ipCopy('套餐规格注明分配动态地址。','方案規格註明分配動態位址。','The specification lists a dynamically assigned address.','商品仕様で動的アドレスと明記されています。'),
    'dedicated-ipv4':ipCopy('此配置明确分配专用公网 IPv4。','此配置明確分配專用公網 IPv4。','This configuration explicitly includes a dedicated public IPv4.','この構成には専用グローバル IPv4 が明記されています。')
  };
  function add(ids,provider,market,sku,url,values,options={}){
    const rows=values.map(value=>({dimension:dimensions.get(value),value,provider,market,sku,url,checked,scope:options.scope||'sku',operator:options.operator||'',note:options[value]||generic[value],otherUrl:options.otherUrl||''}));
    for(const id of ids)IP_EVIDENCE.set(id,rows);
  }
  const tcs='https://billing.tcscloud.net/index.php?rp=/store/taiwan-vps-';
  add(['tcs-fh1'],'TCSCloud','TW','FH1-HINET-500M',tcs+'fixed',['isp','static'],{operator:'HiNet'});
  add(['tcs-dh1'],'TCSCloud','TW','DH1-HINET-500M DYN',tcs+'dynamic',['isp','dynamic'],{operator:'HiNet'});
  add(['tcs-ds1'],'TCSCloud','TW','DS1-SEEDNET-300M DYN',tcs+'dynamic',['isp','dynamic'],{operator:'Seednet',dynamic:ipCopy('规格表将地址列为动态，并提示远传维护设备时 PPPoE 地址可能变化。','規格表將位址列為動態，並提示遠傳維護設備時 PPPoE 位址可能變更。','The specification lists a dynamic IP and warns that FET equipment maintenance can change the PPPoE address.','仕様欄は動的 IP と記載し、FET の機器保守で PPPoE アドレスが変わる可能性を示しています。')});
  const boil='https://cloud.boil.network/store/japan-shared-bandwidth';
  add(['boil-kddi'],'BOILCLOUD','JP','KDDI/au 1000 Mbps · Zone 1',boil,['residential','isp','static'],{operator:'KDDI / au',static:ipCopy('东京练马一区的商品列出固定地址及 MAP-E；入站端口集合须看具体分配。','東京練馬一區的商品列出固定位址及 MAP-E；入站連接埠範圍依實際配置。','The Nerima Zone 1 listing specifies a static address with MAP-E. Inbound port availability depends on the mapping.','東京・練馬の第1区商品は固定 IP と MAP-E を明記しています。受信ポートは割り当て内容によります。')});
  add(['boil-softbank'],'BOILCLOUD','JP','SoftBank 100 Mbps · Zone 2',boil,['residential','isp','dynamic'],{operator:'SoftBank',dynamic:ipCopy('此 100 Mbps 版本支持用户主动更换动态 IP，商品还列出可选 ISP。','此 100 Mbps 版本支援使用者主動更換動態 IP，商品亦列出可選 ISP。','The 100 Mbps version allows the user to change the dynamic IP and lists alternative ISPs.','100 Mbps 版は利用者による動的 IP の変更に対応し、選択可能な ISP も掲載しています。')});
  add(['akile-hinet'],'AkileCloud','TW','TYHinet-Mini-NAT · planId 980','https://t.me/akile_notice/1125',['residential','isp','dynamic','shared-nat'],{operator:'HiNet',otherUrl:'https://akile.ai/shop/server?areaId=6&nodeId=31&planId=980&type=traffic','shared-nat':ipCopy('编号 980 使用共享 IPv4，商家为每台提供 10 个 NAT 端口。','編號 980 使用共享 IPv4，商家為每台提供 10 個 NAT 連接埠。','Plan 980 shares an IPv4 address and provides ten NAT ports per instance.','プラン 980 は IPv4 を共有し、各インスタンスに NAT ポートを10個割り当てます。'),dynamic:ipCopy('公告说明桃园 HiNet 通常每一至三天自动换址；共享 NAT 套餐与独立地址款分别列售。','公告說明桃園 HiNet 通常每一至三天自動換址；共享 NAT 方案與獨立位址款分別販售。','The announcement describes a typical one-to-three-day rollover on Taoyuan HiNet and lists the shared NAT plan separately.','告知では桃園 HiNet のアドレスが通常1～3日で変わると説明しています。共有 NAT は専用アドレスと別商品です。')});
  const lisa='https://lisahost.com/cart.php?gid=';
  add(['lh-us9929-basic'],'LisaHost','LAX','US 9929 · Basic',lisa+'12',['residential','isp'],{residential:ipCopy('洛杉矶 9929 基础版列为双 ISP 住宅 IP；规格单列一个 IPv4。','洛杉磯 9929 基礎版列為雙 ISP 住宅 IP；規格單列一個 IPv4。','The Los Angeles 9929 Basic listing describes a dual-ISP residential IP and lists one IPv4.','ロサンゼルス 9929 基本版はデュアル ISP 住宅 IP と IPv4 1個を掲載しています。')});
  add(['lh-vn-b','lh-vn-plus'],'LisaHost','VN','Vietnam Dual ISP · Basic / Advanced',lisa+'16',['native','residential','isp','static'],{scope:'series',operator:'Saigon Postel'});
  add(['lh-tw-200'],'LisaHost','TW','HiNet VDS · 200 Mbps',lisa+'17',['native','residential','isp','dynamic'],{operator:'HiNet',native:ipCopy('此商品所属的 HiNet 动态 VDS 系列标题声明台湾原生地址。','此商品所屬的 HiNet 動態 VDS 系列標題聲明台灣原生位址。','The merchant’s HiNet Dynamic VDS family identifies its addresses as native to Taiwan.','この商品の HiNet 動的 VDS シリーズに台湾ネイティブ IP と記載されています。')});
  add(['lh-de-basic'],'LisaHost','DE','Germany 9929 Dual Stack · Basic',lisa+'19',['native'],{native:ipCopy('法兰克福基础版的商品标题明确列出 IPv4 和 IPv6 双原生。','法蘭克福基礎版的商品標題明確列出 IPv4 和 IPv6 雙原生。','The Frankfurt Basic product family expressly describes both IPv4 and IPv6 as native.','フランクフルト基本版のシリーズは IPv4 と IPv6 の両方をネイティブと明記しています。')});
  add(['field-6358d2569e6e'],'LisaHost','HK','iCable · annual 1 GB',lisa+'39',['native','residential','isp','static'],{operator:'iCable'});
  add(['field-ebb0533d2474'],'LisaHost','DE','DE Dual ISP VDS · annual PID 167',lisa+'29',['native','isp','residential']);
  const tovanix='https://tovanix.com/product/cloud/vps';
  add(['field-031f33b3453d'],'Tovanix','SEA','Home Broadband Static Residential IP Starter (Zone L)',tovanix,['residential','static']);
  add(['field-167ea4cba240'],'Tovanix','LAX','9929 Residential Native IP Basic (L Zone)',tovanix,['residential','native']);
  add(['field-740b12974590'],'Tovanix','DE','Frankfurt 9929 Dual Native IP Basic (L Zone)',tovanix,['native']);
  add(['field-4af1c317e4c9'],'Joyso','TW','HiNet PPPoE · New Taipei','https://joyso.app/store/ge-zhong-vps?language=chinese-tw',['residential','isp','dynamic'],{operator:'HiNet'});
  add(['field-b355e6f6defb'],'Serverfield','TW','HiNet / Chunghwa Telecom VPS','https://serverfield.com.tw/crm/store/hinet-chunghwa-telecom-vps?language=chinese',['native','isp'],{scope:'series',operator:'HiNet'});
  add(['recloud-tfn'],'ReCloud','TW','TFN 1c1G 200M 1T','https://www.oneprovide.net/store/tfn',['native','isp'],{operator:'TFN'});
  add(['shop-246adde843a0'],'ByteVirt','TW','VPS-1024-KVM-Hinet-D-TW','https://web.bytevirt.net/store/tw-isp-vps?language=english',['isp','dynamic'],{operator:'HiNet'});
  add(['shop-d5e6aeb4e992'],'ByteVirt','JP','VPS-1024-KVM-ISP-JP','https://bytevirt.com/store/jp-isp-vps?language=english',['isp']);
  add(['shop-a92314bbed91'],'ByteVirt','HK','VPS-1024-KVM-ISP-HK','https://bytevirt.com/store/isp-hk-vps?language=english',['isp']);
  add(['shop-1932f7448005'],'MoonVM','TW','STATIC STARTER (HINET)','https://store.moonvm.com/index.php?rp=/store/taiwan-hinet-vps-static',['static','isp'],{operator:'HiNet'});
  add(['shop-70052a10ee86'],'Hostease','SG','SG01 (Native IP)','https://www.hostease.com/sgvps.html',['native'],{native:ipCopy('SG01 的原生版本列出一个原生 IPv4；同页另售非原生版本。','SG01 的原生版本列出一個原生 IPv4；同頁另售非原生版本。','The native SG01 variant lists one native IPv4. The same page sells a separate non-native variant.','SG01 ネイティブ版にはネイティブ IPv4 が1個付属し、同じページに別の非ネイティブ版も掲載されています。')});
  add(['field-6df28c463acc'],'SHIIP Cloud','CA','CA-P-3 · Dedicated IP NVMe KVM','https://shiip.cloud/en-ca/dedicated-nvme-kvm-vps',['native','residential','dedicated-ipv4'],{scope:'series',residential:ipCopy('CA-P-3 标注加拿大住宅 IP；商家脚注只保证当地原生属性，第三方对住宅类型的判定可能不同。','CA-P-3 標示加拿大住宅 IP；商家註腳只保證當地原生屬性，第三方對住宅類型的判定可能不同。','CA-P-3 is marketed as Canadian residential. The footnote guarantees native origin only and notes differences between classifiers.','CA-P-3 はカナダ住宅 IP と表示されていますが、脚注で保証されるのは現地ネイティブ属性のみで、第三者の分類は異なる場合があります。'),'dedicated-ipv4':ipCopy('每台实例独享一个公网 IP，商家通过一对一 NAT 映射。','每個執行個體獨享一個公網 IP，商家透過一對一 NAT 對映。','The merchant assigns an exclusive public IP to each instance using one-to-one NAT.','事業者はインスタンスごとに 1:1 NAT で専用グローバル IP を割り当てます。')});
  add(['field-c30ed98d8dee'],'SixtyNet','LAX','Residential-STARTER','https://sixtynet.net/index.php?rp=/store/at-and-t-mobility-residential',['residential'],{residential:ipCopy('STARTER 标注住宅出口，并注明此系列关闭 80 和 443 端口。','STARTER 標示住宅出口，並註明此系列關閉 80 和 443 連接埠。','The STARTER plan advertises a residential IP and says ports 80 and 443 are closed for this series.','STARTER は住宅 IP を明記し、このシリーズではポート 80 と 443 を開放しないと説明しています。')});
  add(['ps-depro-nano','ps-depro-mini','ps-depro-starter','ps-depro-growth'],'PanstarCloud','DE','DEPro · Nano / Mini / Starter / Growth','https://panstar.ai/servers?regionId=7&productId=21&nodeId=16',['native'],{scope:'series'});
  add(['field-2f553455fdd1'],'IMIDC','TW','Taiwan Cloud · 1 CPU / 512 MB','https://www.imidc.com/knowledgebase/660/Taiwan-VPS-Buying-Guide-Best-Taiwan-Cloud-Server-with-Native-IP.html',['native'],{scope:'series',native:ipCopy('商家的台湾云规格包含一个当地原生 IPv4。住宅及运营商地址在该说明中列作另选服务。','商家的台灣雲規格包含一個當地原生 IPv4。住宅及電信商位址在該說明中列作另選服務。','The Taiwan cloud line includes one local native IPv4; residential and ISP addresses are separate options in the guide.','台湾クラウドには現地ネイティブ IPv4 が1個含まれます。住宅・ISP アドレスは別の選択肢です。')});
  add(['hetzner-fsn'],'Hetzner','DE','Cloud fsn1 · Primary IPv4 option','https://docs.hetzner.com/cloud/servers/primary-ips/overview/',['datacenter','dedicated-ipv4'],{scope:'service',otherUrl:'https://docs.hetzner.com/cloud/general/locations/',datacenter:ipCopy('fsn1 是 Hetzner 的法尔肯施泰因云机房；可选的 Primary IP 提供该云服务的公网接入。','fsn1 是 Hetzner 的法爾肯施泰因雲端機房；可選的 Primary IP 提供該雲端服務的公網接取。','fsn1 is Hetzner’s Falkenstein cloud location. The optional Primary IP enables the cloud server’s public network interface.','fsn1 は Hetzner のファルケンシュタイン拠点です。オプションの Primary IP でクラウドの公開ネットワークを利用します。'),'dedicated-ipv4':ipCopy('选购 Primary IPv4 后，同一时刻只能绑定一台云服务器。此地址单独计费。','選購 Primary IPv4 後，同一時間只能綁定一台雲端伺服器。此位址另外計費。','The separately billed Primary IPv4 option can be assigned to only one cloud server at a time.','別料金の Primary IPv4 は同時に一台のクラウドサーバーだけに割り当てられます。')});
  add(['tg-vpsuu-edgenat-kr-g1','tg-vpsuu-edgenat-kr-g2'],'edgeNAT','KR','Korea G1 / G2 · SK','https://www.edgenat.com/store/krlocal',['native'],{scope:'series',native:ipCopy('韩国 G1/G2 产品系列声明提供韩国原生地址；该商品页同时明确禁止翻墙业务。','韓國 G1/G2 產品系列聲明提供韓國原生位址；該商品頁亦明確禁止翻牆業務。','The Korean G1/G2 family advertises Korean native IPs. Its own product page expressly prohibits services for bypassing internet restrictions.','韓国 G1/G2 シリーズは韓国ネイティブ IP を明記しています。商品ページはインターネット規制を回避するサービスを禁止しています。')});
  add(['tg-deer-moon-hgc'],'MoonVM','HK','HGC - 100Mbps','https://store.moonvm.com/index.php?rp=/store/hong-kong-vps',['isp','static'],{operator:'HGC'});
  add(['field-80f395b63317'],'FormoHost','TW','Taiwan NVMe KVM · Taichung','https://www.formohost.com/taiwan-vps/',['dedicated-ipv4'],{scope:'series'});
  add(['field-c651a0c9ced1'],'Octopus VPS','GB','Custom KVM VPS','https://www.octopusvps.co.uk/',['static','dedicated-ipv4'],{scope:'series'});
  add(['field-659780c451fc'],'PD Hosting','GB','Linux VPS on AWS','https://www.pdhosting.co.uk/linux-vps/',['static'],{scope:'series',static:ipCopy('官网将静态 IPv4 列为每款 Linux VPS 的标准配置。','官網將靜態 IPv4 列為每款 Linux VPS 的標準配置。','The Linux VPS product page includes a static IPv4 with every plan.','全 Linux VPS プランの標準仕様に固定 IPv4 が含まれています。')});
  add(['light-manila'],'LightNode','PH','Manila VDS','https://go.lightnode.com/manila-vds',['static'],{scope:'series',static:ipCopy('马尼拉 VDS 的商品页写明每台包含当地的专用静态地址。','馬尼拉 VDS 的商品頁寫明每台包含當地的專用靜態位址。','The Manila VDS page specifies a dedicated local static address on each server.','マニラ VDS の商品ページは各サーバーに現地の専用固定アドレスが含まれると明記しています。')});

  const vmStore='https://vmshell.com/index.php?rp=%2Fstore%2Fcmin2hk',vmArchive='https://vmshell.com/index.php?rp=%2Fannouncements%2F5%2FChristmas-and-New-Year--CMI-Servers.html';
  add(['v7-vms-hk-usip'],'VmShell','HK','CMIN2-US.IP',vmStore,['broadcast','dedicated-ipv4'],{otherUrl:vmArchive,broadcast:ipCopy('此 SKU 将香港机房与美国专用地址分别列明；商家另有公告说明美国地址在香港使用。','此 SKU 分別列明香港機房與美國專用位址；商家另有公告說明美國位址在香港使用。','The SKU explicitly pairs a Hong Kong datacenter with a dedicated US address. The merchant also describes US addresses announced in Hong Kong.','この SKU は香港拠点と米国専用アドレスを明記しています。別の告知で米国 IP を香港でアナウンスする運用も説明しています。')});
  add(['v7-vms-hk-moip'],'VmShell','HK','CMIN2.HK-MO.IP',vmStore,['broadcast','dedicated-ipv4'],{otherUrl:vmArchive,broadcast:ipCopy('此 SKU 列明香港机房、澳门专用地址。商家公告另说明澳门地址经香港广播。','此 SKU 列明香港機房、澳門專用位址。商家公告另說明澳門位址經香港廣播。','The SKU lists a Hong Kong datacenter and a dedicated Macao address. The merchant also documents Macao addresses announced in Hong Kong.','この SKU は香港拠点とマカオ専用アドレスを明記しています。事業者はマカオ IP の香港でのアナウンスも説明しています。')});
})();
function getIpEvidence(plan){
  if(!plan)return [];
  const rows=IP_EVIDENCE.get(plan.id);
  const market=plan.market||(Array.isArray(plan.markets)&&plan.markets.length===1?plan.markets[0]:'');
  if(!rows||String(plan.provider||'').toLowerCase()!==rows[0].provider.toLowerCase()||market!==rows[0].market)return [];
  return rows;
}
function matchIpEvidence(plan,value){return !value||getIpEvidence(plan).some(item=>item.value===value)}
