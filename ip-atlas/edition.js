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
 zone=key;pageIndex=0;$('market').value='';if(scenes.includes(key))changeScene(scenes.indexOf(key));
 renderControls();list();
 if(!paused&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  $('scope-title').animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:370});
  $('listing').animate([{opacity:.45,transform:'translateX(14px)'},{opacity:1,transform:'translateX(0)'}],{duration:340,easing:'ease-out'})
 }
}
function changeScene(index){
 scene=(index+scenes.length)%scenes.length;document.body.dataset.scene=scenes[scene];
 $('scene-name').textContent=sceneRoman[scene];$('scene-caption').textContent=tr(sceneCaption[scene]);lastSceneAt=performance.now()
}
function paintEdition(rows){
 let clear=$('clear-compare');if(!clear){clear=btn('',()=>{chosen=[];list()});clear.id='clear-compare';$('compare').after(clear)}clear.hidden=chosen.length===0;clear.textContent=tr('clear')+' · '+tr('compare');
 const n=Math.ceil(rows.length/perPage),paging=$('paging');paging.replaceChildren();paging.hidden=n<2;paging.setAttribute('aria-label',tr('pages'));
 function pageButton(label,d,i){const b=btn(label,()=>{pageIndex=i;list();$('scope-banner').scrollIntoView({block:'start',behavior:'instant'});$('paging').querySelector('[aria-current]')?.focus({preventScroll:true})});b.disabled=d;return b}
 if(n>1){const prev=pageButton('←',pageIndex===0,pageIndex-1);prev.setAttribute('aria-label',tr('prev'));paging.append(prev);
 const visible=new Set([0,n-1,pageIndex,pageIndex-1,pageIndex+1]);let last=-1;
 for(const i of [...visible].filter(i=>i>=0&&i<n).sort((a,b)=>a-b)){if(i-last>1)paging.append(el('span','…'));const b=pageButton(String(i+1),false,i);if(i===pageIndex)b.setAttribute('aria-current','page');paging.append(b);last=i}
 const next=pageButton('→',pageIndex===n-1,pageIndex+1);next.setAttribute('aria-label',tr('next'));paging.append(next)}
 const current=$('market').value;const active=Object.entries(groups).find(([,markets])=>markets.includes(current))?.[0]||zone;
 $('scope-banner').dataset.area=active;$('scope-title').textContent=current?market(current):tr(active==='all'?'photoAll':active);
 if(scenes.includes(active)&&scene!==scenes.indexOf(active))changeScene(scenes.indexOf(active));
 const box=$('market-counts');box.replaceChildren(el('h3',tr('destinations')));
 for(const code of groups[zone]||Object.keys(MARKETS)){
  const count=vendorCount(PLANS.filter(p=>p.market===code));const b=btn(market(code),()=>{
   $('market').value=code===current?'':code;pageIndex=0;list()
  });b.setAttribute('aria-pressed',code===current);b.append(el('small',String(count)));b.title=count+' '+tr('merchants');box.append(b)
 }
}
function localizeEdition(){
 $('scene-prev').setAttribute('aria-label',tr('prevScene'));$('scene-next').setAttribute('aria-label',tr('nextScene'));
 changeScene(scene);
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
function startEdition(){
 changeScene(0);const step=d=>{const i=(scene+d+3)%3;applyZone(scenes[i])};$('scene-prev').onclick=()=>step(-1);$('scene-next').onclick=()=>step(1);
 const canvas=$('waves'),ctx=canvas.getContext('2d');if(!ctx)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let w=0,h=0,t=0,last=0,frame=0,visible=true;const colors=['252,219,156','144,220,250','239,200,142'];
 function draw(time){
  frame=0;if(!visible||document.hidden)return;
  const stop=paused||reduced.matches;
  if(!stop){t+=Math.min(50,time-(last||time))*0.00034;if(zone==='all'&&!$('market').value&&time-lastSceneAt>10500&&!canvas.parentElement.parentElement.matches(':focus-within,:hover'))changeScene(scene+1)}
  last=time;ctx.clearRect(0,0,w,h);const color=colors[scene];
  for(let i=0;i<9;i++){
   const f=i/9;ctx.lineWidth=i%3===0?1.15:.65;ctx.strokeStyle='rgba('+color+','+(i%3===0?.56:.33)+')';ctx.beginPath();
   function y(x){return h*(.70-.32*x+.13*Math.sin(6*x+t*.65+f*.85)+f*.20+.08*Math.cos(11*x+f+t*.5))}
   for(let n=0;n<=90;n++){const x=n/90;n?ctx.lineTo(x*w,y(x)):ctx.moveTo(0,y(0))}ctx.stroke();
   if(i%3===0){const x=(t*.16+f)%1;ctx.beginPath();ctx.fillStyle='rgba('+color+',.98)';ctx.arc(w*x,y(x),2.4,0,Math.PI*2);ctx.fill()}
  }
  if(!stop)frame=requestAnimationFrame(draw)
 }
 function restart(){if(frame)cancelAnimationFrame(frame);last=0;frame=requestAnimationFrame(draw)}
 const observer=new ResizeObserver(()=>{const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);restart()});observer.observe(canvas);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;restart()}).observe(canvas);document.addEventListener('visibilitychange',restart);$('motion').addEventListener('click',restart);reduced.addEventListener('change',restart)
}