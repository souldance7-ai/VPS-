'use strict';
/* Editorial copy and controls for the regional directory. */
const vocabulary={
 fieldEdition:['网络基础设施图鉴','網路基礎設施圖鑑','Infrastructure field guide','ネットワークインフラ図鑑'],
 merchants:['家商家','家商家','providers','社'],marketsN:['个目的地','個目的地','destinations','の目的地'],metalN:['款物理机','款實體機','bare-metal listings','件の専用サーバー'],
 destinations:['按目的地浏览','按目的地瀏覽','Browse destinations','地域から探す'],prev:['上一页','上一頁','Previous page','前のページ'],next:['下一页','下一頁','Next page','次のページ'],pages:['结果分页','結果分頁','Results pages','検索結果のページ'],
 prevScene:['上一个地区场景','上一個地區場景','Previous panorama','前の風景'],nextScene:['下一个地区场景','下一個地區場景','Next panorama','次の風景'],
 asianCaption:['海岸与登陆站','海岸與登陸站','Coast & cable landing','海岸と陸揚局'],americanCaption:['太平洋岸通信走廊','太平洋岸通訊走廊','Pacific coastal corridor','太平洋岸の通信回廊'],europeanCaption:['北海沿岸网络','北海沿岸網路','North Sea networks','北海沿岸のネットワーク'],
 lookupCase:['冷门目的地实例','冷門目的地實例','Explore a less common market','掲載の少ない地域を調べる'],
 fieldSource:['采购手记','採購手記','Field notes','調達ノート'],
 note1:['从地理库找到的域名，有时只指向上游运营商。先用国家代码找网络，再核对卖家的机房与产品。下方可以试查墨西哥、冰岛或秘鲁。','從地理庫找到的網域，有時只指向上游營運商。先用國家代碼找網路，再核對賣家的機房與產品。下方可以試查墨西哥、冰島或秘魯。','A domain in an IP record can belong to the upstream carrier. Find networks by country code, then match a seller’s facility and product. Try Mexico, Iceland or Peru.','IP 情報のドメインが上位回線事業者を指すこともあります。国コードからネットワークを探し、販売元の拠点・製品と照合します。メキシコ・アイスランド・ペルーで試せます。'],
 note2:['把商家公开的样本 IP 带到核验区，比较 BGP 起源、注册机构与两家地理库。共享 IPv4、住宅接入和独享地址，分别向商家确认。交付后再用实际出口复核。','把商家公開的樣本 IP 帶到核驗區，比較 BGP 起源、註冊機構與兩家地理庫。共享 IPv4、住宅接入和獨享位址，分別向商家確認。交付後再用實際出口複核。','Use a public provider sample to compare the BGP origin, registration and two location databases. Confirm residential access and address sharing separately. Repeat with the delivered address.','事業者の公開テスト IP で BGP 起源・登録・二つの位置情報を照合します。住宅回線と共有の有無を個別に確認し、納品後の出口 IP でも再確認します。'],
 notesBook:['我的采购记录','我的採購記錄','My procurement notes','自分の調達メモ'],bookHint:['仅保存在此浏览器。可记录样本来源、测试时间与续费报价。','僅儲存在此瀏覽器。可記錄樣本來源、測試時間與續費報價。','Saved in this browser. Record the sample source, trace time and renewal quote.','このブラウザーに保存します。サンプルの出典、測定時刻、更新料金を記録できます。'],
 sampleChecked:['已核对交付网段与样本','已核對交付網段與樣本','Sample and delivery prefix checked','納品帯域とサンプルを照合'],routeChecked:['已记录运营商、方向与时段','已記錄營運商、方向與時段','Carrier, direction and time recorded','通信会社・方向・時刻を記録'],priceChecked:['已核对首付与续费','已核對首付與續費','Initial and renewal charges checked','初期料金と更新料金を確認'],memo:['询价与实测摘要','詢價與實測摘要','Quote and test notes','見積りと実測メモ'],
 savedHere:['记录已保存','記錄已儲存','Notes saved','保存しました'],saveFail:['此浏览器无法保存记录','此瀏覽器無法儲存記錄','This browser could not save the note','このブラウザーに保存できません'],
 photoAll:['全球市场','全球市場','Global markets','世界の市場'],copyRecord:['复制记录','複製記錄','Copy notes','メモをコピー']
};
const editionLangs=['sc','tc','en','ja'];
for(const [key,labels] of Object.entries(vocabulary))editionLangs.forEach((l,i)=>WORDS[l][key]=labels[i]);
for(const [key,labels] of Object.entries({SG:['新加坡','新加坡','Singapore','シンガポール'],GB:['英国','英國','United Kingdom','英国'],FR:['法国','法國','France','フランス']}))MARKETS[key]=Object.fromEntries(editionLangs.map((l,i)=>[l,labels[i]]));
const scenes=['asia','america','europe'];
const sceneRoman=['Asia','North America','Europe'];
const sceneCaption=['asianCaption','americanCaption','europeanCaption'];
let scene=0,pageIndex=0,signature='',lastSceneAt=0;
const perPage=12;
function vendorCount(rows){return new Set(rows.map(p=>p.provider.trim().toLowerCase())).size}
function currentPageRows(rows){
 const key=[zone,...['market','kind','ip','route','carrier','search'].map(k=>$(k).value),$('promo').checked].join('|');
 if(key!==signature){signature=key;pageIndex=0}
 pageIndex=Math.min(pageIndex,Math.max(0,Math.ceil(rows.length/perPage)-1));
 return rows.slice(pageIndex*perPage,(pageIndex+1)*perPage)
}
function applyZone(key){
 zone=key;pageIndex=0;$('market').value='';
 renderControls();list();
 if(!paused&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  $('scope-title').animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:370});
  $('listing').animate([{opacity:.45,transform:'translateX(14px)'},{opacity:1,transform:'translateX(0)'}],{duration:340,easing:'ease-out'})
 }
}

function paintEdition(rows){
 let clear=$('clear-compare');if(!clear){clear=btn('',()=>{chosen=[];list()});clear.id='clear-compare';$('compare').after(clear)}clear.hidden=chosen.length===0;clear.textContent=tr('clear')+' · '+tr('compare');
 const n=Math.ceil(rows.length/perPage),paging=$('paging');paging.replaceChildren();paging.hidden=n<2;paging.setAttribute('aria-label',tr('pages'));
 function pageButton(label,d,i){const b=btn(label,()=>{pageIndex=i;list();$('listing').scrollIntoView({block:'nearest',behavior:'smooth'});$('listing').querySelector('.read')?.focus({preventScroll:true})});b.disabled=d;return b}
 if(n>1){const prev=pageButton('←',pageIndex===0,pageIndex-1);prev.setAttribute('aria-label',tr('prev'));paging.append(prev);
 const visible=new Set([0,n-1,pageIndex,pageIndex-1,pageIndex+1]);let last=-1;
 for(const i of [...visible].filter(i=>i>=0&&i<n).sort((a,b)=>a-b)){if(i-last>1)paging.append(el('span','…'));const b=pageButton(String(i+1),false,i);if(i===pageIndex)b.setAttribute('aria-current','page');paging.append(b);last=i}
 const next=pageButton('→',pageIndex===n-1,pageIndex+1);next.setAttribute('aria-label',tr('next'));paging.append(next)}
 const current=$('market').value;const active=Object.entries(groups).find(([,markets])=>markets.includes(current))?.[0]||zone;
 $('scope-banner').dataset.area=active;$('scope-title').textContent=current?market(current):tr(active==='all'?'photoAll':active);
 
 const box=$('market-counts');box.replaceChildren(el('h3',tr('destinations')));
 for(const code of groups[zone]||Object.keys(MARKETS)){
  const count=vendorCount(PLANS.filter(p=>p.market===code));const b=btn(market(code),()=>{
   $('market').value=code===current?'':code;pageIndex=0;list()
  });b.setAttribute('aria-pressed',code===current);b.append(el('small',String(count)));b.title=count+' '+tr('merchants');box.append(b)
 }
}
const starterKeys={twDynamic:['台湾 · 动态住宅','台灣 · 動態住宅','Taiwan · Dynamic residential','台湾・動的住宅回線'],jpStatic:['日本 · 固定住宅','日本 · 固定住宅','Japan · Static residential','日本・固定住宅回線'],hkCross:['香港 · 跨区 IP','香港 · 跨區 IP','Hong Kong · Cross-region IP','香港・域外 IP'],sampleFilters:['常用组合','常用組合','Common searches','よく使う条件']};
for(const [k,labels] of Object.entries(starterKeys))editionLangs.forEach((l,i)=>WORDS[l][k]=labels[i]);
const procurementGuide={"titleGuide":["从测试 IP 到具体套餐","從測試 IP 到具體套餐","From a test IP to a plan","テスト IP からプランを選ぶ"],"a":["找到同机房、同线路的样本","找到同機房、同線路的樣本","Match the sample to the plan","同じ拠点・回線のサンプルを選ぶ"],"ab":["先选目的地与运营商，再从该套餐的商家页打开测试 IP 或 Looking Glass。记录机房、套餐名和时间。多地区产品的测试页可能默认展示另一个机房。","先選目的地與電信商，再從該套餐的商家頁打開測試 IP 或 Looking Glass。記下機房、方案名稱與時間。多地產品的測試頁可能預設顯示另一個機房。","Pick a destination and carrier. Use the test IP or Looking Glass linked to that exact facility and plan. Record the time and SKU. A multi-region test page may open a different facility by default.","目的地と通信事業者を選び、同じ拠点・プランの公式テスト IP または Looking Glass を開きます。確認時刻と SKU を記録します。複数拠点のページは初期表示の場所にも注意してください。"],"b":["分别看原生、广播与住宅接入","分別看原生、廣播與住宅接入","Read each IP claim separately","ネイティブ IP・他地域アナウンス・住宅回線を区別する"],"bb":["RIPEstat 给出可见前缀和起源 ASN。核对商家描述的地址来源、宣告机房与接入线路；地理库标成当地、或 ASN 名称带电信商，都不足以判定该套餐为住宅或当地原生。固定或动态需要看换 IP 规则，共享 IPv4 还要看端口映射。","RIPEstat 列出可見前綴與起源 ASN。對照商家寫的位址來源、宣告機房與接入線路；地理庫列為當地、或 ASN 名稱含電信商，都不足以認定為住宅或當地原生。固定或動態要看換 IP 規則，共用 IPv4 還要核對埠映射。","RIPEstat shows the visible prefix and origin ASN. Compare the seller’s address sourcing, announcement location and access network. A geolocation result or carrier name alone cannot establish native or residential access. Check reassignment terms and port mappings for shared IPv4.","RIPEstat では観測プレフィックスと起源 ASN を確認できます。住所情報や事業者名だけで分類せず、アドレスの出所、アナウンス拠点、アクセス回線を照合してください。固定・動的の条件や共有 IPv4 のポート割当も確認できます。"],"c":["按自己的运营商验证体验","按自己的電信商驗證體驗","Test the carrier you actually use","利用する通信事業者ごとに確かめる"],"cb":["电信、联通、移动分开看去程与回程，重点是你所在城市晚高峰的延迟、丢包和单连接速度。商家标的 1 Gbps 是端口速率；月流量、双向计费和超量后的规则要在同一款套餐中核对。交付后再查实际出口 IP。","電信、聯通、移動分開看去程與回程，優先記錄自己所在城市晚高峰的延遲、丟包和單連線速度。商家標的 1 Gbps 是埠速；月流量、雙向計費和超量規則要對照同一款套餐。交付後再查實際出口 IP。","Check outbound and return paths separately for Telecom, Unicom and Mobile. Compare evening latency, loss and single-stream speed from your city. Port speed, transfer allowance, billing direction and overage are separate terms. Check the assigned egress IP after delivery.","中国電信・聯通・移動の往路と復路を分け、利用都市から夜間の遅延・損失・単一接続速度を比較します。ポート速度、月間転送量、課金方向、超過条件を確認し、納品後に実際の出口 IP を照合します。"],"homeDirectory":["按需求选主机","依需求選主機","Find a host","条件から探す"],"homeFeed":["看补货动态","看補貨動態","Restock reports","再入荷速報"],"homeCheck":["核验样本 IP","核驗樣本 IP","Check a test IP","テスト IP を照会"],"news":["补货与新帖","補貨與新帖","Restocks & news","再入荷・新着情報"],"liveHint":["频道消息注明发布时间。即时库存取自商家对应套餐。","頻道消息標示發布時間。即時庫存取自商家對應方案。","Channel reports carry a publication time. Live inventory comes from the matching provider SKU.","配信情報には投稿時刻が付きます。在庫照会は該当する公式 SKU を参照します。"],"verifyNextHint":["核对套餐的地址分配、机房和运营商声明。交付后用实际公网出口再查一次。","比對套餐的位址分配、機房和電信商聲明。交付後用實際公網出口再查一次。","Compare the plan’s address assignment, facility and carrier claims. Repeat the lookup with the assigned egress IP after delivery.","プランの割当方式・拠点・回線の公表資料と照合し、納品後に実際の出口 IP を再照会してください。"]};
for(const [k,labels] of Object.entries(procurementGuide))editionLangs.forEach((l,i)=>WORDS[l][k]=labels[i]);
function localizeEdition(){
 const sheet=$("procurement-guide");sheet.replaceChildren(el("h3",tr("titleGuide")));
 const labels=[["a","ab","NodeSeek","https://www.nodeseek.com/post-1062104-1"],["b","bb","RIPEstat","https://stat.ripe.net/docs/data-api/api-endpoints/network-info"],["c","cb",tr("article"),"https://bulianglin.com/archives/tiktokvps.html"]];
 for(const [heading,body,source,url] of labels){const step=el("details"),copy=el("div");step.open=heading==="a";copy.append(el("p",tr(body)),link(source+" ↗",url));if(heading==="b"){const sample=el("a",({sc:"查看有原生 IP 证据的套餐",tc:"查看有原生 IP 證據的方案",en:"Find plans with native IP evidence",ja:"現地 IP の出典があるプランを見る"}[lang])+" →","guide-query");sample.href="?q-use=native#directory";sample.dataset.directoryQuery="";copy.append(sample)}step.append(el("summary",tr(heading)),copy);sheet.append(step)}
 $('scene-prev').setAttribute('aria-label',tr('prevScene'));$('scene-next').setAttribute('aria-label',tr('nextScene'));
 localizeComic();
 const stats=$('coverage-numbers');stats.replaceChildren();
 for(const [n,k] of [[new Set(PLANS.map(p=>p.market)).size,'marketsN'],[vendorCount(PLANS),'merchants'],[PLANS.length,'results'],[PLANS.filter(p=>p.kind==='bare').length,'metalN']]){
  const node=el('div');node.append(el('strong',String(n)),el('span',tr(k)));stats.append(node)
 }
 const rail=$('research-trail');rail.replaceChildren();const h=el('h3',tr('fieldSource'));rail.append(h);
 for(const [source,k,u] of [['NodeSeek · 716路非','note1','https://www.nodeseek.com/post-1062104-1'],[tr('article'),'note2','https://bulianglin.com/archives/tiktokvps.html']]){
  const note=el('article');note.append(link(source+' ↗',u),el('p',tr(k)));rail.append(note)}
 const cases=$('field-cases');cases.replaceChildren(el('h3',tr('lookupCase')));
 const display=new Intl.DisplayNames([tags[lang]],{type:'region'});for(const code of ['MX','IS','PE','PL'])cases.append(btn(display.of(code)+' · '+code,()=>{$('country').value=code;countryLinks();$('country').focus()}));
}
function appendEvidence(out,p){
 const node=el('details',null,'notebook');node.append(el('summary',tr('notesBook')),el('p',tr('bookHint')));
 const storageKey='notebook.'+p.id;let record={};try{record=JSON.parse(saved(storageKey)||'{}')||{}}catch{}
 const feedback=el('small');feedback.setAttribute('role','status');
 function persist(){try{localStorage.setItem('atlas.'+storageKey,JSON.stringify(record));feedback.textContent=tr('savedHere')}catch{feedback.textContent=tr('saveFail')}}
 const keys=['sampleChecked','routeChecked','priceChecked'];for(const k of keys){const line=el('label'),tick=el('input');tick.type='checkbox';tick.checked=record[k]===true;tick.onchange=()=>{record[k]=tick.checked;persist()};line.append(tick,el('span',tr(k)));node.append(line)}
 const label=el('label',tr('memo'),'memo'),area=el('textarea');area.rows=3;area.maxLength=3000;area.value=record.memo||'';area.oninput=()=>{record.memo=area.value;persist()};label.append(area);
 const action=btn(tr('copyRecord'),()=>copy([p.provider+' · '+val(p.plan),market(p.market),p.url,...keys.map(k=>(record[k]?'☑ ':'☐ ')+tr(k)),area.value].join('\n')),'inline');
 node.append(label,action,feedback);out.append(node)
}
