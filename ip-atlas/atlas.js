'use strict';
const $ = id => document.getElementById(id);
const groups = {asia:['CN','JP','TW','HK','KR','VN','PH','SG','AE','IL','IN','MY','TH','TR'],america:['CA','US','LAX','SJC','SEA','MX'],europe:['DE','NL','GB','FR','IT','ES','SE','PL','CH','DK','RO','AT','EE','LT','LV','BG','FI','CY','IE','PT','NO','CZ','UA','HU','IS','BE'],oceania:['AU'],africa:['ZA'],southamerica:['BR','CL']};
for(const [region,codes] of Object.entries(structuredMarketGroups))groups[region]=[...new Set([...groups[region],...codes])];
const catalogMarkets=new Set(PLANS.map(p=>p.market));
const tags = {sc:'zh-CN',tc:'zh-TW',en:'en',ja:'ja'};
const carrierNames = {CT:['中国电信','中國電信','China Telecom','中国電信'],CU:['中国联通','中國聯通','China Unicom','中国聯通'],CM:['中国移动','中國移動','China Mobile','中国移動']};
const deals = {
 purevoltage:{brand:'PureVoltage · Black Friday',start:'2026-11-26T00:00:00-05:00',end:'2026-11-30T23:59:59-05:00',zone:'America/New_York',url:'https://purevoltage.com/black-friday-sale/',rate:'16 GB Bolt VPS'},
 ovh:{brand:'OVHcloud · SYS-2',start:'2026-11-17T16:00:00Z',end:'2026-12-01T20:00:00Z',zone:'America/New_York',url:'https://us.ovhcloud.com/deals/'},
 nvh:{brand:'NVHCloud · VPS',start:'2026-11-16T23:00:00Z',end:'2026-11-30T22:59:59Z',zone:'Europe/Paris',url:'https://www.nvhcloud.com/en/black-friday',code:'BLACKFRIDAY26'},
 ovhfr:{brand:'OVHcloud FR · SYS-2',start:'2026-11-17T13:00:00Z',end:'2026-12-01T13:00:00Z',zone:'Europe/Paris',url:'https://www.ovhcloud.com/fr/black-friday/'},
 ovhgb:{brand:'OVHcloud UK · SYS-2',start:'2026-11-17T13:00:00Z',end:'2026-12-01T13:00:00Z',zone:'Europe/London',url:'https://www.ovhcloud.com/en-gb/black-friday/'},
 azdigi:{brand:'AZDIGI · Pro VPS Platinum',start:'2026-11-16T17:00:00Z',end:'2026-11-30T16:59:59Z',zone:'Asia/Ho_Chi_Minh',code:'BF2026_20OFF',url:'https://azdigi.com/en/black-friday'},
 ownlinux:{brand:'OwnWebServers · Linux VPS',end:'2026-12-01T04:59:59Z',zone:'America/New_York',url:'https://ownwebservers.com/vps-black-friday-offer',code:'BF50',rate:'−50%'},
 ownwin:{brand:'OwnWebServers · Windows / Forex VPS',end:'2026-12-01T04:59:59Z',zone:'America/New_York',url:'https://ownwebservers.com/vps-black-friday-offer',code:'BFWIN50',rate:'−50%'},
 devoster:{brand:'Devoster · KVM VPS',start:'2026-11-20T00:00:00Z',end:'2026-12-02T23:59:59Z',zone:'UTC',url:'https://devoster.com/black-friday/',code:'BF2026',rate:'−15% / −30%'}
};
for(const key of ['ownlinux','ownwin','nvh'])deals[key].couponTerms=['month'];
deals.devoster.couponTerms=['month','year'];
const campaignHeadings={sc:"品牌活动与适用条件",tc:"品牌活動與適用條件",en:"Merchant campaigns and eligibility",ja:"事業者キャンペーンと適用条件"};
for(const [language,heading] of Object.entries(campaignHeadings))WORDS[language].brandCampaigns=heading;
for(const [key,labels] of Object.entries({skuQuotes:['套餐报价','套餐報價','Plan prices','プラン料金'],freshPosts:['论坛新帖','論壇新帖','Latest threads','最新の投稿'],brandDeals:['品牌活动','品牌活動','Merchant campaigns','事業者のセール']}))editionLangs.forEach((language,i)=>WORDS[language][key]=labels[i]);
const pvTerms={sc:'纽约、达拉斯和西雅图列入正式黑五活动。16 GB Bolt VPS 的价格和完整配置在美国东部时间 11 月 26 日公开，具体可选机房以对应订单为准；纽约独服预售另有条款。',tc:'紐約、達拉斯和西雅圖列入正式黑五活動。16 GB Bolt VPS 的價格與完整規格於美東時間 11 月 26 日公布，可選機房依該筆訂單；紐約獨服預售另有條款。',en:'The Black Friday event covers New York, Dallas and Seattle. The price and full specs of the 16 GB Bolt VPS are revealed November 26 Eastern time. Check each SKU’s order form for locations. The NYC dedicated pre-sale has separate terms.',ja:'本セールの対象地域はニューヨーク、ダラス、シアトル。16 GB Bolt VPS の価格と詳細は米国東部時間11月26日に公開予定です。選べる拠点は各注文画面でご確認ください。ニューヨーク専用サーバーの先行販売には別の条件があります。'};
for(const [language,terms] of Object.entries(pvTerms))WORDS[language].purevoltageTerms=terms;
const rateLabels=[["sortPlans","排序","排序","Sort","並び順"],["fullestFirst","优先列出详细配置","優先列出詳細規格","Most documented first","仕様が詳しい順"],["lowestMonthly","同币种月均价 ↑","同幣種月均價 ↑","Monthly equivalent ↑","月額換算・安い順"],["monthMean","月均","月均","Monthly equivalent","月額換算"]];
for(const [key,...labels] of rateLabels)editionLangs.forEach((l,i)=>WORDS[l][key]=labels[i]);
const offerTabs=[...document.querySelectorAll('[data-offer-tab]')];
function activateOfferTab(button){
 for(const tab of offerTabs){const active=tab===button;tab.tabIndex=active?0:-1;tab.setAttribute('aria-selected',String(active));$(tab.getAttribute('aria-controls')).hidden=!active}
 if(button.dataset.offerTab==='feed')drawForumFeed();
}
offerTabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>activateOfferTab(tab));
 tab.addEventListener('keydown',e=>{
  const next={ArrowRight:(i+1)%offerTabs.length,ArrowLeft:(i+offerTabs.length-1)%offerTabs.length,Home:0,End:offerTabs.length-1}[e.key];
  if(next===undefined)return;e.preventDefault();activateOfferTab(offerTabs[next]);offerTabs[next].focus();
 });
});
const offersByPlan=commerceOfferIndex(PLANS,COMMUNITY_OFFERS);
const iso = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
function saved(key){try{return localStorage.getItem('atlas.'+key)}catch{return null}}
function save(key,v){try{localStorage.setItem('atlas.'+key,v)}catch{}}
let lang = Object.hasOwn(tags,saved('lang')) ? saved('lang') : 'sc';
let zone='all', chosen=[], modal=null, toastTimer, lookupId=0, ipState={};
let paused=saved('motion')==='paused'||(saved('motion')===null&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const tr = key => WORDS[lang][key] || key;
const val = value => typeof value==='object' && value!==null ? (value[lang]||value.en||'') : (value||'');
const carrier = id => carrierNames[id]?.[Object.keys(tags).indexOf(lang)] || id;
const market = code => MARKETS[code][lang];
function el(tag,txt,cls){const n=document.createElement(tag); if(txt!==null && txt!==undefined)n.textContent=txt;if(cls)n.className=cls;return n}
function btn(txt,fn,cls){const b=el('button',txt,cls);b.type='button';b.addEventListener('click',fn);return b}
function link(txt,url,cls){const a=el('a',txt,cls);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function opt(id,items,selected){const box=$(id);box.replaceChildren(...items.map(([v,t])=>new Option(t,v)));if(items.some(([v])=>v===selected))box.value=selected}
function toast(msg){clearTimeout(toastTimer);$('toast').textContent=msg;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,2300)}
async function copy(value){try{await navigator.clipboard.writeText(value);toast(tr('copied'))}catch{window.prompt(tr('ask'),value)}}
function stateOf(d,now=Date.now()){return d.start&&now<Date.parse(d.start)?'upcoming':now>Date.parse(d.end)?'expired':'active'}
const cityNames={'Taiwan':['台湾','台灣','台湾'],'Japan':['日本','日本','日本'],'Changhua':['彰化','彰化','彰化'],'Tokyo':['东京','東京','東京'],'Hong Kong':['香港','香港','香港'],'Los Angeles':['洛杉矶','洛杉磯','ロサンゼルス'],'Seoul':['首尔','首爾','ソウル'],'Hanoi':['河内','河內','ハノイ'],'Ho Chi Minh City':['胡志明市','胡志明市','ホーチミン市'],'Manila':['马尼拉','馬尼拉','マニラ'],'San Jose':['圣何塞','聖荷西','サンノゼ'],'Seattle':['西雅图','西雅圖','シアトル'],'Beauharnois':['博阿努瓦','博阿努瓦','ボアルノワ'],'Falkenstein':['法尔肯施泰因','法爾肯施泰因','ファルケンシュタイン'],'Frankfurt':['法兰克福','法蘭克福','フランクフルト'],'Amsterdam':['阿姆斯特丹','阿姆斯特丹','アムステルダム'],'Vancouver':['温哥华','溫哥華','バンクーバー']};
Object.assign(cityNames,{"Taipei":["台北","台北","台北"],"Taichung":["台中","台中","台中"],"Osaka":["大阪","大阪","大阪"],"Singapore":["新加坡","新加坡","シンガポール"],"London":["伦敦","倫敦","ロンドン"],"Manchester":["曼彻斯特","曼徹斯特","マンチェスター"],"Paris":["巴黎","巴黎","パリ"],"Nuremberg":["纽伦堡","紐倫堡","ニュルンベルク"],"Roubaix":["鲁贝","魯貝","ルーベ"],"Montreal":["蒙特利尔","蒙特婁","モントリオール"],"Toronto":["多伦多","多倫多","トロント"],"France":["法国","法國","フランス"],"Germany":["德国","德國","ドイツ"],"Canada":["加拿大","加拿大","カナダ"],"Netherlands":["荷兰","荷蘭","オランダ"],"United Kingdom":["英国","英國","英国"],"Ontario":["安大略省","安大略省","オンタリオ州"]});
Object.assign(cityNames,{"São Paulo":["圣保罗","聖保羅","サンパウロ"],"Santiago":["圣地亚哥","聖地牙哥","サンティアゴ"],"Johannesburg":["约翰内斯堡","約翰尼斯堡","ヨハネスブルグ"],"Melbourne":["墨尔本","墨爾本","メルボルン"],"Stockholm":["斯德哥尔摩","斯德哥爾摩","ストックホルム"],"Warsaw":["华沙","華沙","ワルシャワ"],"Madrid":["马德里","馬德里","マドリード"],"Mexico City":["墨西哥城","墨西哥城","メキシコシティ"],"Bangalore":["班加罗尔","班加羅爾","ベンガルール"],"Tel Aviv":["特拉维夫","特拉維夫","テルアビブ"],"Bangkok":["曼谷","曼谷","バンコク"],"Dubai":["迪拜","杜拜","ドバイ"],"Zurich":["苏黎世","蘇黎世","チューリッヒ"],"Copenhagen":["哥本哈根","哥本哈根","コペンハーゲン"],"Bucharest":["布加勒斯特","布加勒斯特","ブカレスト"],"Seattle":["西雅图","西雅圖","シアトル"],"Sydney":["悉尼","雪梨","シドニー"],"Istanbul":["伊斯坦布尔","伊斯坦堡","イスタンブール"],"North Carolina":["北卡罗来纳州","北卡羅來納州","ノースカロライナ州"],"Kuala Lumpur":["吉隆坡","吉隆坡","クアラルンプール"]});
function city(p){if(p.market==='US'&&p.city==='United States')return {sc:'城市未公布',tc:'城市未公布',en:'City undisclosed',ja:'都市非公開'}[lang];return cityNames[p.city]?.[{sc:0,tc:1,ja:2}[lang]]||p.city}
Object.assign(cityNames,{'United States':['美国','美國','米国'],'South Korea':['韩国','韓國','韓国'],Shanghai:['上海','上海','上海']});
const localChoice = ()=>({sc:'原生 IP 候选（含 ISP 与住宅）',tc:'原生 IP 候選（含 ISP 與住宅）',en:'Native IP candidates (local, ISP, residential)',ja:'現地 IP 候補（ISP・住宅回線を含む）'}[lang]);
function nativeLead(p){return ['isp','local','residential'].includes(p.ip)}
function monthlyCost(p){
 const s=activeSpec(p),periods={month:1,quarter:3,halfyear:6,year:12};if(!s||!Object.hasOwn(periods,s.term)||!s.currency||!s.price)return null;
 const numeric=String(s.price).trim();if(!/^(?:[0-9]+|[0-9]{1,3}(?:,[0-9]{3})+)(?:\.[0-9]+)?$/.test(numeric))return null;
 return {currency:s.currency,monthly:Number(numeric.replaceAll(",",""))/periods[s.term]};
}
function renderOrder(){const currencyCodes=[...new Set(PLANS.map(p=>monthlyCost(p)?.currency).filter(Boolean))].sort();opt("order",[["",tr("fullestFirst")],...currencyCodes.map(code=>[code,code+" · "+tr("lowestMonthly")])],$("order").value)}
function renderControls(){
 renderOrder();
 const ids=(groups[zone]||Object.keys(MARKETS)).filter(code=>catalogMarkets.has(code));
 const vendors=[...new Set(PLANS.map(p=>p.provider))].sort((a,b)=>a.localeCompare(b,tags[lang]));
 opt('vendor',[['',tr('all')],...vendors.map(name=>[name,name])],$('vendor').value);
 const zones=$('zones');zones.replaceChildren();
 for(const key of ['all',...Object.keys(groups)]){const b=btn(tr(key),()=>{applyZone(key)});b.setAttribute('aria-pressed',key===zone);zones.append(b)}
 opt('market',[['',tr('allMarkets')],...ids.map(v=>[v,market(v)])],$('market').value);
 for(const [id,values] of Object.entries({kind:['vps','bare'],ip:['local','isp','residential','unknown'],route:['claimed','measured','reported','unknown'],carrier:Object.keys(carrierNames)})){
  opt(id,[['',tr(id==='carrier'?'anyCarrier':'all')],...(id==='ip'?[['native',localChoice()]]:[]),...values.map(v=>[v,id==='carrier'?carrier(v):id==='route'?routeStatusLabel(v):tr(v==='unknown'&&id==='ip'?'ipUnknown':v)])],$(id).value)
 }
}
const norm = s => String(s).normalize('NFKC').toLowerCase().replace(/[\s·/_–-]/g,'');
function searchable(p){
 const aliases={SJC:'San Jose San José 圣河西 聖河西 圣何塞 聖荷西 圣荷西 硅谷 矽谷',SEA:'Seattle 西雅图 西雅圖',LAX:'Los Angeles 洛城 洛杉矶 洛杉磯',TW:'Taiwan 臺灣 台灣 台湾',CA:'Canada 加拿大'};
 const tokens=[...(merchantAliases.get(p.provider)||[]),...(p.searchTerms||[]),...(p.networkFilters||[]).map(quickLabel),p.market,...Object.values(MARKETS[p.market]),aliases[p.market]||'',p.provider,val(p.plan),p.city,...(cityNames[p.city]||[]),val(p.routeName),tr(p.kind),tr(p.ip)];
 for(const offer of offersByPlan.get(p.id)||[])tokens.push(currentCommerceOffer(offer,commerceTerm())?offer.code||"":"",offer.source,offer.sku||"",offer.routeName||"");
 for(const row of commerceFeedRows.get(p.id)||[])if(currentCommerceOffer(row,''))tokens.push(row.code);
 if(nativeLead(p))tokens.push('原生 native');
 tokens.push(showSku(p),...hardware.filter(k=>k!=='cpuModel').map(k=>specValue(p,k)),readCpuModel(activeSpec(p))?.value||'',priceText(p));
 for(const c of routeCarriersFor(p))tokens.push(c,...(carrierNames[c]||[]));
 for(const row of planRouteRows(p)){for(const path of row.paths)tokens.push(routePathLabel(path));if(row.direction!==anyDirection)tokens.push(quickLabel(row.direction))}
 return norm(tokens.join(' '));
}
function matches(p){
 if($('vendor').value&&p.provider!==$('vendor').value)return false;
 if(!matchesBillingTerm(p)||!shoppingMatch(p))return false;
 if($("order").value&&monthlyCost(p)?.currency!==$("order").value)return false;
 if(zone!=='all' && !groups[zone].includes(p.market))return false;
 if($('ip').value==='native' ? !nativeLead(p) : $('ip').value && $('ip').value!==p.ip)return false;
 for(const k of ['market','kind'])if($(k).value && p[k]!==$(k).value)return false;
 const routeMode=$('route').value;if(!routeMatchesMode(p,routeMode))return false;
 const carrierFilter=$('carrier').value;if(carrierFilter&&!routePredicate([],carrierFilter.toLowerCase(),routeMode)(p))return false;
 if($('promo').checked&&!commerceHasPromotion(p))return false;
 const query=$('search').value.trim();if(!query)return true;
 const haystack=searchable(p);return query.split(/\s+/).every(q=>haystack.includes(norm(q)));
}
let feedProviderAliases;
function providerFromPost(post){
 if(!feedProviderAliases){
  const providers=[...new Set(PLANS.map(p=>p.provider))];
  feedProviderAliases=providers.filter(s=>s.length>=4).map(p=>[p,p]);
  for(const [name,aliases] of merchantAliases)for(const alias of aliases)feedProviderAliases.push([alias,name]);
  for(const [label,provider] of [['绿云','GreenCloud'],['綠雲','GreenCloud'],['搬瓦工','BandwagonHost'],['狗妈','GoMami'],['狗媽','GoMami'],['台北101','VPS.TAIPEI (Taipei101)'],['奶爸','Neburst'],['NoBrand Cloud','NewNB Cloud'],['NNB','NewNB Cloud'],['丽萨主机','LisaHost'],['麗薩主機','LisaHost']])if(providers.some(p=>p.toLowerCase()===provider.toLowerCase()))feedProviderAliases.push([label,providers.find(p=>p.toLowerCase()===provider.toLowerCase())]);
  feedProviderAliases.sort((a,b)=>b[0].length-a[0].length);
 }
 const copy=(post.title+' '+(post.snippet||'')).normalize('NFKC').toLowerCase();
 for(const [label,provider] of feedProviderAliases){
  const token=label.normalize('NFKC').toLowerCase(),index=copy.indexOf(token);if(index<0)continue;
  if(/^[a-z\d]/.test(token)&&/[a-z\d]/.test(copy[index-1]||''))continue;
  if(/[a-z\d]$/.test(token)&&/[a-z\d]/.test(copy[index+token.length]||'')&&!copy.slice(index+token.length).startsWith('vps'))continue;
  return provider;
 }
 return '';
}
function feedToCatalog(post){
 const provider=providerFromPost(post);if(!provider)return null;
 const a=el('a',({sc:'查看套餐',tc:'查看方案',en:'Compare plans',ja:'プラン比較'}[lang])+' · '+provider+' →','feed-to-catalog');
 a.href='?'+new URLSearchParams({'q-vendor':provider})+'#directory';a.dataset.directoryQuery='';return a;
}
function pair(main,sub,cls){const n=el('div',null,cls);n.append(el('strong',main));if(sub)n.append(el('small',sub,'sub'));return n}
function toggle(p){
 if(chosen.includes(p.id))chosen=chosen.filter(x=>x!==p.id);
 else if(chosen.length<3)chosen.push(p.id);
 else return toast(tr('compareLimit'));
 list();const focusButton=Array.from($('listing').querySelectorAll('.pick')).find(b=>b.dataset.id===p.id);focusButton?.focus({preventScroll:true});
}
function list(){
 renderProviderShortcuts();
 const baseRows=PLANS.filter(matches);const rows=applyQuickPick(baseRows).sort((a,b)=>$("order").value?monthlyCost(a).monthly-monthlyCost(b).monthly||commercialScore(b)-commercialScore(a):commercialScore(b)-commercialScore(a));renderQuickPick($("quick-pick"),baseRows,rows);const visible=currentPageRows(rows);$('total').textContent=vendorCount(rows)+' '+tr('merchants')+' · '+rows.length+' '+tr('results');
 $('compare').textContent=tr('compare')+' ('+chosen.length+'/3)';$('compare').disabled=chosen.length<2;$('compare').title=tr('chooseTwo');
 const head=el('div',null,'colheads');for(const s of ['market','product','ip','route','links',''])head.append(el('span',s?tr(s):''));
 const out=$('listing');out.replaceChildren(head);
 for(const p of visible){
  const r=el('article',null,'record'),ip=el('div',null,'datum'),route=el('div',null,'datum');
  if(p.ip!=='unknown')ip.append(el('span',tr(p.ip),'tag'));ip.append(el('small',tr(p.kind),'sub'));
  const routeTitle=val(p.routeName)||routeSummaryFor(p),routeMode=routeStatusFor(p);
  if(routeMode!=='unknown'||routeTitle)route.append(el('span',routeTitle||routeStatusLabel(routeMode)),el('small',routeTitle&&routeMode!=='unknown'?routeEvidenceText(p):'','sub'));
  const selected=chosen.includes(p.id),pick=btn(selected?'✓':'+',()=>toggle(p),'pick');
  pick.setAttribute('aria-label',(selected?tr('remove'):tr('add'))+' · '+p.provider+' '+val(p.plan));pick.setAttribute('aria-pressed',selected);pick.dataset.id=p.id;
  r.append(pair(market(p.market),city(p),'place'),pair(p.provider,val(p.plan),'prod'),ip,route,btn(tr('details'),()=>openDialog(p),'read'),pick,specSummary(p));appendCardCommerce(r,p);out.append(r)
 }
 paintEdition(rows);if(!rows.length)out.append(el('p',tr('noResults'),'empty'));refreshStockList();
}
function attributes(p){return [
 ['market',market(p.market)+' · '+city(p)],['kind',tr(p.kind)],['ip',tr(p.ip==='unknown'?'ipUnknown':p.ip)],
 ['route',[routeEvidenceText(p),val(p.routeName)||routeSummaryFor(p)].filter(Boolean).join(' · ')],['carrier',routeCarriersFor(p).map(carrier).join(' / ')||tr('unknown')],
 ['price',priceText(p)?[priceText(p),purchaseQualifier(p)].filter(Boolean).join(' · '):tr('noPrice')],...hardware.map(k=>[k,specValue(p,k)||tr('specAvailability')])
]}
function merchantLinks(p){const links=[link(tr('source')+' ↗',p.url)];if(p.review)links.push(link('NodeSeek · '+tr('evidence')+' ↗',p.review));if(p.terms)links.push(link(tr('terms')+' ↗',p.terms));if(p.lg)links.push(link(tr('test')+' ↗',p.lg));if(p.proof && /^https?:\/\//.test(p.proof) && p.proof!==p.url)links.push(link(tr('evidence')+' ↗',p.proof));if(deals[p.deal])links.push(link(tr('terms')+' ↗',deals[p.deal].url));if(communityHref(p.networkSpecSource)&&p.networkSpecSource!==p.proof)links.push(link(commerceWord('networkSource')+' ↗',p.networkSpecSource));return links}
function openDialog(p){
 modal=p||'compare';const out=$('dialog-body');out.replaceChildren();
 const title=el('h2',p?p.provider+' · '+val(p.plan):tr('comparison'));title.id='dialog-title';out.append(title);$('drawer').setAttribute('aria-labelledby',title.id);
 if(p){
  showBuying(out,p);renderStock(out,p);appendDrawerCoupons(out,p);displayRouteProof(out,p);renderQuickEvidence(out,p);renderCommunityFor(out,p);renderRelatedReports(out,p);
  const grid=el('dl',null,'detailgrid');for(const [k,v] of attributes(p).filter(([k])=>!hardware.includes(k)&&k!=='price')){const d=el('div');d.append(el('dt',tr(k)),el('dd',v));grid.append(d)}
  const actions=el('div',null,'actionrow');actions.append(...merchantLinks(p),btn(tr('ask'),()=>copy(p.provider+' · '+val(p.plan)+'\n'+tr('askText')),'solid'));
  if(val(p.notes))out.append(el('p',val(p.notes),'detail-note'));out.append(grid);
  out.append(actions);appendEvidence(out,p)
 }else{
  const ps=chosen.map(id=>PLANS.find(p=>p.id===id));const wrap=el('div',null,'matrix-wrap'),table=el('table',null,'matrix');const head=table.createTHead().insertRow();head.append(el('th',tr('product')));ps.forEach(p=>head.append(el('th',p.provider+' · '+showSku(p))));
  const body=table.createTBody();const fields=attributes(ps[0]);
  fields.forEach(([k],i)=>{
   const row=body.insertRow(),label=k==='cpu'&&ps.every(p=>cpuCoreLabel(specValue(p,'cpu'))==='cpuCores')?'cpuCores':k;
   row.append(el('th',tr(label)));
   for(const plan of ps){
    const cell=row.insertCell();
    if(k!=='cpuModel'){cell.textContent=attributes(plan)[i][1];continue}
    const model=readCpuModel(activeSpec(plan));
    if(!model){cell.textContent=tr('cpuUnknown');continue}
    if(model.kind!=='cpuModel')cell.append(el('small',tr(model.kind),'cpu-caption'));
    cell.append(el('span',model.value));appendCpuEvidence(cell,model);
   }
  });
  for(const k of ['evidence','links']){const r=body.insertRow();r.append(el('th',tr(k)));for(const p of ps){const c=r.insertCell();if(k==='links')c.append(link(tr('source')+' ↗',p.url));else if(val(p.notes))c.textContent=val(p.notes);else c.append(link(tr('source')+' ↗',p.proof||p.url))}}
  wrap.append(table);out.append(wrap)
 }
 if(!$('drawer').open){$('drawer').showModal();animateDialogOpen()}
}
function publicIP(s){
 if(s.includes(':')){
  if(!/^[\da-f:]+$/i.test(s))return null;
  try{const ip=new URL('http://['+s+']/').hostname.slice(1,-1);
   if(!/^[23]/i.test(ip)||/^2001:(db8|0|2|10|20)(:|$)/i.test(ip)||/^2001::|^2002:|^3fff:(?:0?[0-9a-f]{1,3}:|:)/i.test(ip))return null;return ip
  }catch{return null}
 }
 const a=s.split('.');if(a.length!==4||a.some(x=>!/^(0|[1-9]\d{0,2})$/.test(x)||+x>255))return null;
 const [x,y,z]=a.map(Number);
 if(x===0||x===10||x===127||x>=224||(x===100&&y>=64&&y<=127)||(x===169&&y===254)||(x===172&&y>=16&&y<=31)||(x===192&&(y===168||(y===0&&(z===0||z===2))||(y===88&&z===99)))||(x===198&&(y===18||y===19||(y===51&&z===100)))||(x===203&&y===0&&z===113))return null;
 return s
}
function showIP(){
 const out=$('ipout'),links=$('iplinks');out.replaceChildren();links.replaceChildren();
 const {ip,status,prefix,asns}=ipState;if(!status)return;
 if(ip){const e=encodeURIComponent(ip);links.append(link(tr('registry'),'https://rdap.org/ip/'+e),link(tr('ipinfo'),'https://ipinfo.io/'+e),link('RIPEstat','https://stat.ripe.net/resource/'+e),link('DB-IP','https://db-ip.com/'+e),link(tr('risk'),'https://scamalytics.com/ip/'+e),link('Ping0','https://ping0.cc/'))}
 if(status!=='ok'){out.append(el('p',tr(status),status==='waiting'?'loading':'lookup-error'));return}
 const grid=el('div',null,'ipstats');for(const [k,v] of [['prefix',prefix],['asn',asns.map(v=>'AS'+v).join(' / ')||tr('unknown')]]){const d=el('div');d.append(el('span',tr(k),'label'),el('b',v));grid.append(d)}out.append(grid,el("p",tr("verifyNextHint"),"bill-note"))
}
async function lookup(ev){
 ev.preventDefault();const id=++lookupId,ip=publicIP($('sample').value.trim());ipState={ip,status:ip?'waiting':'invalid'};showIP();if(!ip)return;
 const c=new AbortController(),timer=setTimeout(()=>c.abort(),9000);
 try{const res=await fetch('https://stat.ripe.net/data/network-info/data.json?resource='+encodeURIComponent(ip),{signal:c.signal});if(!res.ok)throw Error();const json=await res.json();if(!json.data?.prefix||!Array.isArray(json.data.asns))throw Error();
 if(id===lookupId)ipState={ip,status:'ok',prefix:json.data.prefix,asns:json.data.asns}
 }catch{if(id===lookupId)ipState={ip,status:'failed'}}finally{clearTimeout(timer);if(id===lookupId)showIP()}
}
function offers(){
 renderFeaturedOffers();renderCommunity();drawForumFeed();
 const box=$('deals');box.replaceChildren();for(const [id,d] of Object.entries(deals)){
  const status=stateOf(d),section=el('article',null,'deal'),meta=el('div',null,'deal-meta');
  meta.append(el('h3',d.brand),el('span',tr(status),'state '+status));
  const deadline=el('time',tr('deadline')+' · '+new Intl.DateTimeFormat(tags[lang],{timeZone:d.zone,month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(new Date(d.end)));deadline.dateTime=d.end;
  const actions=el('div',null,'linkline');actions.append(link(tr('terms')+' ↗',d.url));if(d.code&&status!=='expired')actions.append(btn(d.code+' ⧉',()=>copy(d.code)));
  section.append(meta,el('strong',d.rate||'−20%','rate'),el('p',tr(id+'Terms')),deadline,actions);box.append(section)
 }
}
function countryLinks(){
 const code=$('country').value;const name=new Intl.DisplayNames(['en'],{type:'region'}).of(code);
 $('country-links').replaceChildren(link(tr('networks')+' ↗','https://bgp.he.net/country/'+code),link(tr('findProviders')+' ↗','https://www.google.com/search?q='+encodeURIComponent(name+' VPS bare metal hosting datacenter looking glass')));
}
function motion(){document.body.classList.toggle('paused',paused);$('portal-motion').textContent=paused?'▶':'Ⅱ';$('portal-motion').title=tr(paused?'play':'pause');$('portal-motion').setAttribute('aria-label',$('portal-motion').title);$('portal-motion').setAttribute('aria-pressed',paused)}
function render(){
 document.documentElement.lang=tags[lang];document.title=tr('title')+' · PITOPONE';$('language').value=lang;$('language').setAttribute('aria-label',tr('selectLang'));
 document.querySelectorAll('[data-t]').forEach(n=>n.textContent=tr(n.dataset.t));
 $('search').placeholder=tr('searchHint');$('close').setAttribute('aria-label',tr('back'));$('zones').setAttribute('aria-label',tr('region'));
 const names=new Intl.DisplayNames([tags[lang]],{type:'region'});const options=iso.map(c=>[c,names.of(c)+' · '+c]).sort((a,b)=>a[1].localeCompare(b[1],tags[lang]));
 opt('country',options,$('country').value||'PH');renderControls();restoreQuickPickOnce();list();offers();renderJournal();paintHealth();countryLinks();showIP();motion();localizeEdition()
}
$('language').onchange=e=>{lang=e.target.value;save('lang',lang);render()};
$('portal-motion').onclick=()=>{paused=!paused;save('motion',paused?'paused':'playing');motion()};
$('filters').onsubmit=e=>e.preventDefault();$('filters').oninput=e=>{if(e.target.id==='term')return;pageIndex=0;list()};
$('term').onchange=()=>{pageIndex=0;const u=quickDirectoryUrl();if(location.hash==='#directory'&&u.href!==location.href)history.pushState(null,'',u);list()};$('promo').onchange=()=>{pageIndex=0;list()};
$('order').onchange=()=>{pageIndex=0;list()};
$('reset').onclick=()=>{clearQuickPick();$('order').value='';zone='all';pageIndex=0;for(const k of ['search','vendor','kind','market','route','ip','carrier','buy-filter','term'])$(k).value='';$('promo').checked=false;renderControls();list()};
$('compare').onclick=()=>openDialog(null);$('close').onclick=()=>closeComicDialog();$('drawer').onclose=()=>{modal=null};$('drawer').onclick=e=>{if(e.target===$('drawer')){const r=$('drawer').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeComicDialog()}};
$('country').onchange=countryLinks;$('ipform').onsubmit=lookup;
render();
const incomingFeed=new URLSearchParams(location.search).get("feed");
if(location.hash==="#offers"&&incomingFeed){activateOfferTab($("tab-feed"));if(typeof choosePublicSource==="function")choosePublicSource(incomingFeed)}
document.querySelector("[data-open-feed]").addEventListener("click",()=>activateOfferTab($("tab-feed")));
document.querySelector("[data-open-offers]").addEventListener("click",()=>activateOfferTab($("tab-index")));
startComic();
startPortal();
