'use strict';
const $ = id => document.getElementById(id);
const groups = {asia:['JP','TW','HK','KR','VN','PH','SG'],america:['CA','LAX','SJC','SEA'],europe:['DE','NL','GB','FR']};
const tags = {sc:'zh-CN',tc:'zh-TW',en:'en',ja:'ja'};
const carrierNames = {CT:['中国电信','中國電信','China Telecom','中国電信'],CU:['中国联通','中國聯通','China Unicom','中国聯通'],CM:['中国移动','中國移動','China Mobile','中国移動']};
const deals = {
 ovh:{brand:'OVHcloud · SYS-2',start:'2026-11-17T16:00:00Z',end:'2026-12-01T20:00:00Z',zone:'America/New_York',url:'https://us.ovhcloud.com/deals/'},
 nvh:{brand:'NVHCloud · VPS',start:'2026-11-16T23:00:00Z',end:'2026-11-30T22:59:59Z',zone:'Europe/Paris',url:'https://www.nvhcloud.com/en/black-friday',code:'BLACKFRIDAY26'}
};
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
function stateOf(d,now=Date.now()){return now<Date.parse(d.start)?'upcoming':now>Date.parse(d.end)?'expired':'active'}
const cityNames={'Taiwan':['台湾','台灣','台湾'],'Japan':['日本','日本','日本'],'Changhua':['彰化','彰化','彰化'],'Tokyo':['东京','東京','東京'],'Hong Kong':['香港','香港','香港'],'Los Angeles':['洛杉矶','洛杉磯','ロサンゼルス'],'Seoul':['首尔','首爾','ソウル'],'Hanoi':['河内','河內','ハノイ'],'Ho Chi Minh City':['胡志明市','胡志明市','ホーチミン市'],'Manila':['马尼拉','馬尼拉','マニラ'],'San Jose':['圣何塞','聖荷西','サンノゼ'],'Seattle':['西雅图','西雅圖','シアトル'],'Beauharnois':['博阿努瓦','博阿努瓦','ボアルノワ'],'Falkenstein':['法尔肯施泰因','法爾肯施泰因','ファルケンシュタイン'],'Frankfurt':['法兰克福','法蘭克福','フランクフルト'],'Amsterdam':['阿姆斯特丹','阿姆斯特丹','アムステルダム'],'Vancouver':['温哥华','溫哥華','バンクーバー']};
Object.assign(cityNames,{"Taipei":["台北","台北","台北"],"Taichung":["台中","台中","台中"],"Osaka":["大阪","大阪","大阪"],"Singapore":["新加坡","新加坡","シンガポール"],"London":["伦敦","倫敦","ロンドン"],"Manchester":["曼彻斯特","曼徹斯特","マンチェスター"],"Paris":["巴黎","巴黎","パリ"],"Nuremberg":["纽伦堡","紐倫堡","ニュルンベルク"],"Roubaix":["鲁贝","魯貝","ルーベ"],"Montreal":["蒙特利尔","蒙特婁","モントリオール"],"Toronto":["多伦多","多倫多","トロント"],"France":["法国","法國","フランス"],"Germany":["德国","德國","ドイツ"],"Canada":["加拿大","加拿大","カナダ"],"Netherlands":["荷兰","荷蘭","オランダ"],"United Kingdom":["英国","英國","英国"],"Ontario":["安大略省","安大略省","オンタリオ州"]});
function city(p){return cityNames[p.city]?.[{sc:0,tc:1,ja:2}[lang]]||p.city}
const localChoice = ()=>({sc:'原生 IP 候选（含 ISP 与住宅）',tc:'原生 IP 候選（含 ISP 與住宅）',en:'Native IP candidates (local, ISP, residential)',ja:'現地 IP 候補（ISP・住宅回線を含む）'}[lang]);
function nativeLead(p){return ['isp','local','residential'].includes(p.ip)}
function renderControls(){
 const ids=groups[zone]||Object.keys(MARKETS);
 const zones=$('zones');zones.replaceChildren();
 for(const key of ['all',...Object.keys(groups)]){const b=btn(tr(key),()=>{applyZone(key)});b.setAttribute('aria-pressed',key===zone);zones.append(b)}
 opt('market',[['',tr('allMarkets')],...ids.map(v=>[v,market(v)])],$('market').value);
 for(const [id,values] of Object.entries({kind:['vps','bare'],ip:['local','isp','residential','unknown'],route:['claimed','measured','unknown'],carrier:Object.keys(carrierNames)})){
  opt(id,[['',tr(id==='carrier'?'anyCarrier':'all')],...(id==='ip'?[['native',localChoice()]]:[]),...values.map(v=>[v,id==='carrier'?carrier(v):tr(v)])],$(id).value)
 }
}
const norm = s => String(s).normalize('NFKC').toLowerCase().replace(/[\s·/_–-]/g,'');
function searchable(p){
 const aliases={SJC:'San Jose San José 圣河西 聖河西 圣何塞 聖荷西 圣荷西 硅谷 矽谷',SEA:'Seattle 西雅图 西雅圖',LAX:'Los Angeles 洛城 洛杉矶 洛杉磯',TW:'Taiwan 臺灣 台灣 台湾',CA:'Canada 加拿大'};
 const tokens=[p.market,...Object.values(MARKETS[p.market]),aliases[p.market]||'',p.provider,val(p.plan),p.city,...(cityNames[p.city]||[]),val(p.routeName),tr(p.kind),tr(p.ip)];
 if(nativeLead(p))tokens.push('原生 native');
 for(const c of p.carriers)tokens.push(c,...(carrierNames[c]||[]));
 return norm(tokens.join(' '));
}
function matches(p){
 if(zone!=='all' && !groups[zone].includes(p.market))return false;
 if($('ip').value==='native' ? !nativeLead(p) : $('ip').value && $('ip').value!==p.ip)return false;
 for(const k of ['market','kind','route'])if($(k).value && p[k]!==$(k).value)return false;
 if($('carrier').value && !p.carriers.includes($('carrier').value))return false;
 if($('promo').checked && !(deals[p.deal] && stateOf(deals[p.deal])==='active'))return false;
 return $('search').value.trim().split(/\s+/).every(q=>searchable(p).includes(norm(q)));
}
function pair(main,sub,cls){const n=el('div',null,cls);n.append(el('strong',main));if(sub)n.append(el('small',sub,'sub'));return n}
function toggle(p){
 if(chosen.includes(p.id))chosen=chosen.filter(x=>x!==p.id);
 else if(chosen.length<3)chosen.push(p.id);
 else return toast(tr('compareLimit'));
 list();const focusButton=Array.from($('listing').querySelectorAll('.pick')).find(b=>b.dataset.id===p.id);focusButton?.focus({preventScroll:true});
}
function list(){
 const rows=PLANS.filter(matches);const visible=currentPageRows(rows);$('total').textContent=vendorCount(rows)+' '+tr('merchants')+' · '+rows.length+' '+tr('results');
 $('compare').textContent=tr('compare')+' ('+chosen.length+'/3)';$('compare').disabled=chosen.length<2;$('compare').title=tr('chooseTwo');
 const head=el('div',null,'colheads');for(const s of ['market','product','ip','route','links',''])head.append(el('span',s?tr(s):''));
 const out=$('listing');out.replaceChildren(head);
 for(const p of visible){
  const r=el('article',null,'record'),ip=el('div',null,'datum'),route=el('div',null,'datum');
  ip.append(el('span',tr(p.ip),'tag'),el('small',tr(p.kind),'sub'));
  route.append(el('span',val(p.routeName)||tr(p.route)),el('small',p.route==='unknown'?'':tr(p.route),'sub'));
  const selected=chosen.includes(p.id),pick=btn(selected?'✓':'+',()=>toggle(p),'pick');
  pick.setAttribute('aria-label',(selected?tr('remove'):tr('add'))+' · '+p.provider+' '+val(p.plan));pick.setAttribute('aria-pressed',selected);pick.dataset.id=p.id;
  r.append(pair(market(p.market),city(p),'place'),pair(p.provider,val(p.plan),'prod'),ip,route,btn(tr('details'),()=>openDialog(p),'read'),pick);out.append(r)
 }
 paintEdition(rows);if(!rows.length)out.append(el('p',tr('noResults'),'empty'));
}
function attributes(p){return [
 ['market',market(p.market)+' · '+city(p)],['kind',tr(p.kind)],['ip',tr(p.ip)],
 ['route',[tr(p.route),val(p.routeName)].filter(Boolean).join(' · ')],['carrier',p.carriers.map(carrier).join(' / ')||tr('unknown')],
 ['price',val(p.price)||tr('noPrice')]
]}
function merchantLinks(p){const links=[link(tr('source')+' ↗',p.url)];if(p.lg)links.push(link(tr('test')+' ↗',p.lg));if(p.proof && /^https?:\/\//.test(p.proof) && p.proof!==p.url)links.push(link(tr('evidence')+' ↗',p.proof));if(deals[p.deal])links.push(link(tr('terms')+' ↗',deals[p.deal].url));return links}
function openDialog(p){
 modal=p||'compare';const out=$('dialog-body');out.replaceChildren();
 const title=el('h2',p?p.provider+' · '+val(p.plan):tr('comparison'));title.id='dialog-title';out.append(title);$('drawer').setAttribute('aria-labelledby',title.id);
 if(p){
  const grid=el('dl',null,'detailgrid');for(const [k,v] of attributes(p)){const d=el('div');d.append(el('dt',tr(k)),el('dd',v));grid.append(d)}
  const actions=el('div',null,'actionrow');actions.append(...merchantLinks(p),btn(tr('ask'),()=>copy(p.provider+' · '+val(p.plan)+'\n'+tr('askText')),'solid'));
  out.append(el('p',val(p.notes),'detail-note'),grid);
  if(p.id==='taxi-lax'){
   const carrierTable=el('table',null,'matrix'),h=carrierTable.createTHead().insertRow();
   const mainland={sc:'中国大陆',tc:'中國大陸',en:'Mainland China',ja:'中国本土'}[lang];
   for(const label of [tr('carrier'),'LA → '+mainland,mainland+' → LA'])h.append(el('th',label));
   const body=carrierTable.createTBody();
   for(const [c,ret,fwd] of [['CT','AS9929','163'],['CU','AS9929','AS4837'],['CM','CMIN2','CMIN2']]){
    const r=body.insertRow();r.append(el('th',carrier(c)),el('td',ret),el('td',fwd))
   }
   const wrap=el('div',null,'matrix-wrap');wrap.append(carrierTable);out.append(wrap)
  }
  out.append(actions);appendEvidence(out,p)
 }else{
  const ps=chosen.map(id=>PLANS.find(p=>p.id===id));const wrap=el('div',null,'matrix-wrap'),table=el('table',null,'matrix');const head=table.createTHead().insertRow();head.append(el('th',tr('product')));ps.forEach(p=>head.append(el('th',p.provider+' · '+val(p.plan))));
  const body=table.createTBody();const fields=attributes(ps[0]);
  fields.forEach(([k],i)=>{const r=body.insertRow();r.append(el('th',tr(k)));ps.forEach(p=>r.append(el('td',attributes(p)[i][1])))});
  for(const k of ['evidence','links']){const r=body.insertRow();r.append(el('th',tr(k)));for(const p of ps){const c=r.insertCell();if(k==='links')c.append(link(tr('source')+' ↗',p.url));else c.textContent=val(p.notes)}}
  wrap.append(table);out.append(wrap)
 }
 if(!$('drawer').open)$('drawer').showModal();
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
 const grid=el('div',null,'ipstats');for(const [k,v] of [['prefix',prefix],['asn',asns.map(v=>'AS'+v).join(' / ')||tr('unknown')]]){const d=el('div');d.append(el('span',tr(k),'label'),el('b',v));grid.append(d)}out.append(grid)
}
async function lookup(ev){
 ev.preventDefault();const id=++lookupId,ip=publicIP($('sample').value.trim());ipState={ip,status:ip?'waiting':'invalid'};showIP();if(!ip)return;
 const c=new AbortController(),timer=setTimeout(()=>c.abort(),9000);
 try{const res=await fetch('https://stat.ripe.net/data/network-info/data.json?resource='+encodeURIComponent(ip),{signal:c.signal});if(!res.ok)throw Error();const json=await res.json();if(!json.data?.prefix||!Array.isArray(json.data.asns))throw Error();
 if(id===lookupId)ipState={ip,status:'ok',prefix:json.data.prefix,asns:json.data.asns}
 }catch{if(id===lookupId)ipState={ip,status:'failed'}}finally{clearTimeout(timer);if(id===lookupId)showIP()}
}
function offers(){
 const box=$('deals');box.replaceChildren();for(const [id,d] of Object.entries(deals)){
  const status=stateOf(d),section=el('article',null,'deal'),meta=el('div',null,'deal-meta');
  meta.append(el('h3',d.brand),el('span',tr(status),'state '+status));
  const deadline=el('time',tr('deadline')+' · '+new Intl.DateTimeFormat(tags[lang],{timeZone:d.zone,month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(new Date(d.end)));deadline.dateTime=d.end;
  const actions=el('div',null,'linkline');actions.append(link(tr('terms')+' ↗',d.url));if(d.code)actions.append(btn(d.code+' ⧉',()=>copy(d.code)));
  section.append(meta,el('strong','−20%','rate'),el('p',tr(id+'Terms')),deadline,actions);box.append(section)
 }
}
function countryLinks(){
 const code=$('country').value;const name=new Intl.DisplayNames(['en'],{type:'region'}).of(code);
 $('country-links').replaceChildren(link(tr('networks')+' ↗','https://bgp.he.net/country/'+code),link(tr('findProviders')+' ↗','https://www.google.com/search?q='+encodeURIComponent(name+' VPS bare metal hosting datacenter looking glass')));
}
function motion(){document.body.classList.toggle('paused',paused);$('motion').textContent=paused?'▶':'Ⅱ';$('motion').title=tr(paused?'play':'pause');$('motion').setAttribute('aria-label',$('motion').title);$('motion').setAttribute('aria-pressed',paused)}
function render(){
 document.documentElement.lang=tags[lang];document.title=tr('title')+' · PITOPONE';$('language').value=lang;$('language').setAttribute('aria-label',tr('selectLang'));
 document.querySelectorAll('[data-t]').forEach(n=>n.textContent=tr(n.dataset.t));
 $('search').placeholder=tr('searchHint');$('close').setAttribute('aria-label',tr('back'));$('zones').setAttribute('aria-label',tr('region'));
 const names=new Intl.DisplayNames([tags[lang]],{type:'region'});const options=iso.map(c=>[c,names.of(c)+' · '+c]).sort((a,b)=>a[1].localeCompare(b[1],tags[lang]));
 opt('country',options,$('country').value||'PH');renderControls();list();offers();countryLinks();showIP();motion();localizeEdition()
}
$('language').onchange=e=>{lang=e.target.value;save('lang',lang);render()};
$('motion').onclick=()=>{paused=!paused;save('motion',paused?'paused':'playing');motion()};
$('filters').onsubmit=e=>e.preventDefault();$('filters').oninput=()=>{pageIndex=0;list()};$('promo').onchange=()=>{pageIndex=0;list()};
$('reset').onclick=()=>{zone='all';pageIndex=0;for(const k of ['search','kind','market','route','ip','carrier'])$(k).value='';$('promo').checked=false;renderControls();list()};
$('compare').onclick=()=>openDialog(null);$('close').onclick=()=>$('drawer').close();$('drawer').onclose=()=>{modal=null};$('drawer').onclick=e=>{if(e.target===$('drawer')){const r=$('drawer').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('drawer').close()}};
$('country').onchange=countryLinks;$('ipform').onsubmit=lookup;
render();
startEdition();