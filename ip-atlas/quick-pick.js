'use strict';
const quickWords={
 ...networkFilterWords,
 title:['找出口','找出口','Find an exit','出口を探す'],
 intro:['选择目的地、入口线路和 IP 属性，机房与出口分别列在方案详情。','選擇目的地、入口線路和 IP 屬性，機房與出口分別列在方案詳情。','Filter by destination, ingress and IP properties. Plan details identify the host and egress.','対象地域、入口回線、IP 属性で絞り込みます。設置拠点と出口はプラン詳細で確認できます。'],
 count:['个方案','個方案','plans','プラン'], merchants:['家商家','家商家','providers','事業者'],
 location:['目的地 / 出口','目的地 / 出口','Destination / egress','対象地域・出口'],
 allLocations:['全部地点','全部地點','All locations','すべての拠点'],
 route:['大陆优化线路','大陸優化線路','Mainland routing','中国本土向け回線'],
 hosting:['服务器与库存','伺服器與庫存','Server and stock','サーバー・在庫'],
 ct:['电信优化','電信優化','China Telecom','中国電信向け'],cu:['联通优化','聯通優化','China Unicom','中国聯通向け'],cm:['移动优化','移動優化','China Mobile','中国移動向け'],
 bare:['物理独服','實體獨服','Dedicated server','専用サーバー'],probe:['可查询库存','可查詢庫存','Stock probe','在庫照会対応'],
 share:['复制筛选链接','複製篩選連結','Copy search link','検索リンクをコピー'],
 clear:['清除用途与地点','清除用途與地點','Clear use and location','用途・拠点を解除'],
 documentation:['套餐 IP 证据','套餐 IP 證據','IP evidence for this plan','このプランの IP 根拠'],
 sku:['此套餐','此套餐','This SKU','個別 SKU'],series:['产品系列','產品系列','Product series','製品シリーズ'],service:['服务政策','服務政策','Service policy','サービス方針'],
 viewSource:['查看依据','查看依據','View source','出典を見る'],checked:['查阅日期','查閱日期','Reviewed','確認日'],
 extraSource:['补充依据','補充依據','Supporting source','補足の出典'],
 fromPlan:['套餐与线路原文','套餐與線路原文','Plan and network sources','プラン・回線の出典'],
 noMatches:['此组合没有匹配方案。可移除已选条件，或切换地点。','此組合沒有匹配方案。可移除已選條件，或切換地點。','No plans match. Remove a selection or try another location.','一致するプランがありません。条件を外すか、拠点を変更してください。'],
 matched:['匹配','匹配','matches','該当'],
 markets:['匹配地点','匹配地點','Matching locations','該当する拠点'],
 notices:['已选条件','已選條件','Selected filters','選択中の条件']
};
function quickWord(key){return quickWords[key][{sc:0,tc:1,en:2,ja:3}[lang]]}
const quickActive=new Set(),quickFeatures=new WeakMap();
const quickFields=['search','vendor','market','kind','ip','route','carrier','buy-filter','order'];
let quickInitialized=false,quickRestoring=false,quickFeedback=false;
function quickGroups(){
 const groups=Object.entries(IP_EVIDENCE_OPTIONS).map(([id,values])=>({id,values}));
 groups.push({id:'lineClass',values:['iepl','iplc','ixp','private-route','optimized-transit']},{id:'usageClass',values:['hourly','quota-transfer','dedicated-port']},{id:'route',values:['ct','cu','cm']},{id:'hosting',values:['bare','probe']});
 return groups;
}
function quickLabel(value){return Object.hasOwn(quickWords,value)?quickWord(value):ipEvidenceLabel(value,lang)}
function quickClass(value){return quickGroups().find(g=>g.values.includes(value))?.id||''}
function quickExclusive(group){return group!=='hosting'&&group!=='route'}
function quickEvidenceFeatures(plan){
 let values=quickFeatures.get(plan);if(values)return values;
 values=new Set([...getIpEvidence(plan).map(e=>e.value),...(plan.networkFilters||[])]);
 if(plan.route==='claimed'||plan.route==='measured'){for(const c of plan.carriers||[])values.add(c.toLowerCase())}
 if(plan.spec?.term==='hour')values.add('hourly');
 if(!plan.networkFilters){
  const line=typeof plan.routeName==='object'?plan.routeName.en:plan.routeName||'';
  for(const k of ['iepl','iplc','ixp'])if(new RegExp('\\b'+k+'\\b','i').test(line))values.add(k);
  const transfer=plan.spec?.traffic,allowance=typeof transfer==='object'?transfer?.en:transfer;
  if(typeof allowance==='string'&&/\d\s*(?:TB|GB)\b/i.test(allowance))values.add('quota-transfer');
 }
 if(plan.kind==='bare')values.add('bare');
 if(typeof getStockKey==='function'&&getStockKey(plan))values.add('probe');
 quickFeatures.set(plan,values);return values;
}
function applyQuickPick(rows){
 if(!quickActive.size)return rows;
 return rows.filter(p=>{const values=quickEvidenceFeatures(p);return [...quickActive].every(k=>values.has(k))});
}
function quickCandidateCounts(baseRows){
 const counts=new Map(),selected=[...quickActive];
 for(const group of quickGroups()){
  for(const value of group.values){
   const others=selected.filter(k=>k!==value&&(!quickExclusive(group.id)||!group.values.includes(k)));
   let count=0;for(const p of baseRows){const keys=quickEvidenceFeatures(p);if(keys.has(value)&&others.every(k=>keys.has(k)))count++}
   counts.set(value,count);
  }
 }
 return counts;
}
function quickDirectoryUrl(){
 const u=new URL(location.href);u.hash='#directory';
 for(const name of [...u.searchParams.keys()])if(name.startsWith('q-'))u.searchParams.delete(name);
 if(quickActive.size)u.searchParams.set('q-use',[...quickActive].join(','));
 if(zone!=='all')u.searchParams.set('q-zone',zone);
 for(const field of quickFields){
  const element=$(field);if(!element)continue;
  const value=element.value.trim(),defaultValue=field==='order'?element.options[0]?.value:'';
  if(value&&value!==defaultValue)u.searchParams.set('q-'+field,value);
 }
 if($('promo')?.checked)u.searchParams.set('q-promo','1');
 return u;
}
function quickReplaceUrl(){
 if(quickRestoring||location.hash!=='#directory')return;
 const u=quickDirectoryUrl();if(u.href!==location.href)history.replaceState(history.state,'',u);
}
function quickRestoreLocation(){
 const params=new URL(location.href).searchParams;quickRestoring=true;
 try{
  quickActive.clear();
  for(const value of (params.get('q-use')||'').toLowerCase().split(',')){
   const group=quickClass(value);if(!group)continue;
   if(quickExclusive(group))for(const k of quickActive)if(quickClass(k)===group)quickActive.delete(k);
   quickActive.add(value);
  }
  const area=params.get('q-zone');zone=Object.hasOwn(groups,area)?area:'all';renderControls();
  for(const field of quickFields){
   const input=$(field);if(!input)continue;
   const value=params.get('q-'+field)||'';
   if(input.tagName==='SELECT')input.value=[...input.options].some(o=>o.value===value)?value:input.options[0]?.value||'';
   else input.value=value;
  }
  if($('promo'))$('promo').checked=params.get('q-promo')==='1';
  pageIndex=0;
 }finally{quickRestoring=false}
}
function restoreQuickPickOnce(){
 if(quickInitialized)return;quickInitialized=true;
 if(location.hash==='#directory'||[...new URL(location.href).searchParams.keys()].some(k=>k.startsWith('q-')))quickRestoreLocation();
 window.addEventListener('popstate',()=>{if(location.hash==='#directory'){quickRestoreLocation();list()}});
}
function quickChange(change){
 quickReplaceUrl();change();pageIndex=0;quickFeedback=true;
 const u=quickDirectoryUrl();if(u.href!==location.href)history.pushState(null,'',u);
 list();
}
function toggleQuickValue(value){
 const group=quickClass(value);if(!group)return;
 quickChange(()=>{
  if(quickActive.has(value)){quickActive.delete(value);return}
  if(quickExclusive(group))for(const k of quickActive)if(quickClass(k)===group)quickActive.delete(k);
  quickActive.add(value);
 });
}
function clearQuickPick(){quickActive.clear()}
function quickClearLocation(){clearQuickPick();zone='all';renderControls();$('market').value=''}
function renderQuickPick(out,baseRows,rows){
 if(!out)return;
 quickReplaceUrl();
 const focus=out.contains(document.activeElement)?(document.activeElement.dataset.quickValue||document.activeElement.id):'';
 const head=el('div',null,'quick-mast'),heading=el('div',null,'quick-heading'),title=el('h3',quickWord('title')),summary=el('output',null,'quick-count');
 title.id='quick-title';out.setAttribute('aria-labelledby',title.id);summary.id='quick-count';summary.setAttribute('aria-live','polite');
 const placeLabel=el('label',null,'quick-place'),place=el('select');place.id='quick-market';
 place.add(new Option(quickWord('allLocations'),''));for(const code of Object.keys(MARKETS).filter(code=>catalogMarkets.has(code)))place.add(new Option(market(code),code));
 place.value=$('market').value;
 place.onchange=()=>{const code=place.value;quickChange(()=>{if(!code||zone!=='all'&&!groups[zone].includes(code)){zone='all';renderControls()}$('market').value=code})};
 placeLabel.append(el('span',quickWord('location')),place);
 heading.append(title,el('p',quickWord('intro')));head.append(heading,placeLabel);
 const matrix=el('div',null,'quick-matrix'),counts=quickCandidateCounts(baseRows);
 for(const group of quickGroups()){
  const lane=el('fieldset',null,'quick-lane');lane.dataset.dimension=group.id;lane.append(el('legend',quickLabel(group.id)));
  const buttons=el('div',null,'quick-buttons');
  for(const value of group.values){
   const button=btn('',()=>toggleQuickValue(value),'quick-chip'),n=counts.get(value)||0;
   button.dataset.quickValue=value;button.setAttribute('aria-pressed',String(quickActive.has(value)));button.setAttribute('aria-label',quickLabel(value)+' · '+n+' '+quickWord('count'));
   button.append(el('span',quickLabel(value)),el('small',String(n)));
   buttons.append(button);
  }
  lane.append(buttons);matrix.append(lane);
 }
 const footer=el('div',null,'quick-foot'),actions=el('div',null,'quick-actions');
 summary.append(el('strong',String(rows.length)),el('span',quickWord('count')+' · '+vendorCount(rows)+' '+quickWord('merchants')));
 const share=btn(quickWord('share'),()=>copy(quickDirectoryUrl().href),'quick-share'),clear=btn(quickWord('clear'),()=>quickChange(quickClearLocation),'quick-clear');
 share.id='quick-share';clear.id='quick-clear';clear.disabled=!quickActive.size&&!place.value&&zone==='all';
 actions.append(clear,share);footer.append(summary,actions);out.replaceChildren(head,matrix,footer);
 if(!rows.length&&quickActive.size)out.append(el('p',quickWord('noMatches'),'quick-empty'));
 if(rows.length&&quickActive.size&&!place.value){
  const marketCounts=new Map();for(const p of rows)marketCounts.set(p.market,(marketCounts.get(p.market)||0)+1);
  const strip=el('div',null,'quick-map');strip.append(el('span',quickWord('markets')));
  for(const [code,count] of [...marketCounts].sort((a,b)=>b[1]-a[1]).slice(0,6)){
   strip.append(btn(market(code)+' · '+count,()=>quickChange(()=>{$('market').value=code}),'quick-market-shortcut'));
  }
  out.append(strip);
 }
 if(quickFeedback){
  quickFeedback=false;
  if(!paused&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
   summary.animate([{opacity:.4,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});
   const selected=out.querySelector('[data-quick-value="'+CSS.escape(focus)+'"][aria-pressed=true]');
   selected?.animate([{transform:'scale(.94) rotate(-1deg)'},{transform:'scale(1.03)'},{transform:'none'}],{duration:220,easing:'ease-out'});
  }
 }
 if(focus)out.querySelector('[data-quick-value="'+CSS.escape(focus)+'"],#'+CSS.escape(focus))?.focus({preventScroll:true});
}
function renderQuickEvidence(out,plan){
 const entries=getIpEvidence(plan);if(!entries.length)return;
 const section=el('section',null,'quick-evidence-section');
 section.append(el('h3',quickWord('documentation')));
 const skus=[...new Set(entries.map(e=>e.sku).filter(Boolean))];if(skus.length)section.append(el('p',skus.join(' · '),'quick-source-skus'));
 for(const entry of entries){
  const row=el('div',null,'quick-evidence-row'),title=el('div',null,'quick-claim'),sources=el('div',null,'quick-proof');
  title.append(el('small',quickLabel(entry.dimension)),el('b',quickLabel(entry.value)));
  const note=val(entry.note)||ipEvidenceDefinition(entry.value,lang);if(note)row.append(title,el('p',note));else row.append(title);
  const sourceUrl=raw=>{try{const url=new URL(raw);return ['https:','http:'].includes(url.protocol)?url.href:''}catch{return ''}};
  const url=sourceUrl(entry.url),additional=sourceUrl(entry.otherUrl);
  if(['sku','series','service'].includes(entry.scope))sources.append(el('span',quickWord(entry.scope)));
  if(url)sources.append(link((entry.provider||quickWord('viewSource'))+' ↗',url));
  if(additional&&additional!==url)sources.append(link(quickWord('extraSource')+' ↗',additional));
  if(entry.operator)sources.append(el('span',entry.operator));
  if(entry.checked){const time=el('time',quickWord('checked')+' · '+entry.checked);time.dateTime=entry.checked;sources.append(time)}
  row.append(sources);section.append(row);
 }
 out.append(section);
}
