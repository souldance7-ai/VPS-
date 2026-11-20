'use strict';
const comicWords = {
 comicTitle:['长城外有信号！','長城外有訊號！','Signal beyond the Wall!','長城の向こうに電波あり！'],
 comicIntro:['山那边，哪条线路通？跟着电台犬 Yuki 翻过长城，挑一处落脚的机房。','山那邊，哪條線路通？跟著電台犬 Yuki 翻過長城，挑一處落腳的機房。','Which route gets through the mountains? Cross the Great Wall with Yuki the radio dog and find a place to host.','山の向こうへ届く回線は？ 無線犬ユキと長城を越えて、サーバーの設置先を探そう。'],
 chapter1:['城下收讯','城下收訊','Radio check','城下で受信'],chapter2:['一跃过关','一躍過關','Clear the wall','関所をひと跳び'],chapter3:['山外连线','山外連線','On the air','山の向こうへ'],
 bubble1:['喂？山那边听得到吗？','喂？山那邊聽得到嗎？','Hello? Can you hear me?','もしもし、聞こえる？'],bubble2:['汪！再高一点！','汪！再高一點！','Woof! A little higher!','ワン！ もう少し高く！'],bubble3:['收到，换你选站！','收到，換你選站！','Loud and clear. Pick a station!','受信したよ。次は局を選ぼう！'],
 homeComic:['封面','封面','Cover','表紙'], enterBook:['打开商家图鉴','打開商家圖鑑','Open the directory','事業者図鑑を開く'], filters:['筛选条件','篩選條件','Search filters','絞り込み条件'],
 previousShot:['上一格','上一格','Previous panel','前のコマ'],nextShot:['下一格','下一格','Next panel','次のコマ'],comicGesture:['点击画格或左右滑动','點選畫格或左右滑動','Tap a panel or swipe','コマをタップ・左右にスワイプ']
};
for(const [key,values] of Object.entries(comicWords)) editionLangs.forEach((l,i)=>WORDS[l][key]=values[i]);
let shot=1, currentView='', routeSequence=0, wave=[], drawerAnimation=null, closing=false, storyTimer;
const scrollMemory=new Map(), reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const canMove=()=>!paused&&!reduceMotion.matches;
function selectShot(value) {
 const previous=shot;
 shot=(value+2)%3+1;
 $('comic-deck').dataset.shot=shot;
 for(const b of document.querySelectorAll('[data-frame]')) b.setAttribute('aria-expanded',String(Number(b.dataset.frame)===shot));
 $('story-status').textContent='0'+shot+' / 03  ·  '+tr('chapter'+shot);
 if(previous!==shot&&currentView==='top'&&canMove()) {
  const panel=$('comic-deck').children[shot-1];
  const pulse=document.createElement('i');
  pulse.className='radio-ripple';pulse.setAttribute('aria-hidden','true');panel.append(pulse);
  transient(pulse,[{transform:'scale(.16)',opacity:0},{transform:'scale(.35)',opacity:.82,offset:.18},{transform:'scale(2.6)',opacity:0}],{duration:850});
 }
}
function localizeComic(){
 $('portal-motion')?.setAttribute('aria-label',tr('portalMotion'));
 document.title=tr('title')+' · PITOPONE';
 $('scene-prev').setAttribute('aria-label',tr('previousShot'));$('scene-next').setAttribute('aria-label',tr('nextShot'));
 $('comic-deck').setAttribute('aria-label',tr('comicGesture'));selectShot(shot);
}
function syncComicMotion(){
 const motionButton=$('portal-motion');
 if(motionButton){motionButton.textContent=canMove()?'Ⅱ':'▶';motionButton.setAttribute('aria-label',tr('portalMotion'));motionButton.setAttribute('aria-pressed',String(!canMove()))}
 if(!canMove())for(const a of comicEffects)a.cancel();
 for(const img of document.querySelectorAll('.jump-loop')) img.src='art/'+(canMove()?'yuki-jump.gif':'yuki-still.webp');
 clearInterval(storyTimer);
 if(canMove()) storyTimer=setInterval(()=>{
  if(currentView==='top'&&!document.hidden&&!$('comic-deck').matches(':hover,:focus-within')&&!document.querySelector('.play-controls:focus-within'))selectShot(shot+1);
 },7000);
}
function pageName(hash){const name=hash.replace(/^#/,'');return ['directory','verify','offers','field'].includes(name)?name:'top'}
function showView(name,restore,focus){
 for(const panel of document.querySelectorAll('[data-view]')) panel.hidden=panel.dataset.view!==name;
 for(const a of document.querySelectorAll('.mast nav a')) {
  if(a.hash==='#'+name)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
 }
 currentView=name;document.body.dataset.book=name;$('top').scrollTop=restore?(scrollMemory.get(name)||0):0;
 if(focus){const heading=document.querySelector('[data-view="'+name+'"] :is(h1,h2)');heading.tabIndex=-1;heading.focus({preventScroll:true})}
}
async function turnPage(name,restore=false,initial=false){
 const token=++routeSequence;
 for(const a of wave)a.cancel();wave=[];
 const stack=$('ink-transition');stack.classList.remove('turning');
 if(currentView===name)return;
 if(currentView)scrollMemory.set(currentView,$('top').scrollTop);
 if(initial||!canMove()){showView(name,restore,!initial);return}
 const frame=$('top'), cards=[...stack.children];
 stack.dataset.destination=name;
 stack.classList.add('turning');
 const ease='cubic-bezier(.28,.04,.16,1)';
 function track(node,keys,timing){const a=node.animate(keys,timing);wave.push(a);return a.finished.catch(()=>{})}
 const out=track(frame,[{transform:'scale(1)',opacity:1},{transform:'scale(.975)',opacity:.72}],{duration:215,easing:ease,fill:'both'});
 await Promise.all([out,...cards.map((card,i)=>track(card,[
  {opacity:0,clipPath:'circle(0% at 74% 50%)',transform:'scale(1.08)'},
  {opacity:1,clipPath:'circle(120% at 74% 50%)',transform:'scale(1)'}
 ],{duration:200,delay:i*24,easing:ease,fill:'both'}))]);
 if(token!==routeSequence)return;
 showView(name,restore,true);
 await Promise.all([track(frame,[{transform:'scale(1.012)',opacity:.83},{transform:'none',opacity:1}],{duration:290,easing:ease,fill:'both'}),
  ...cards.map((card,i)=>track(card,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale('+(1.08+i*.1)+')'}],{duration:275,delay:(2-i)*18,easing:ease,fill:'both'}))]);
 if(token===routeSequence){for(const a of wave)a.cancel();wave=[];stack.classList.remove('turning')}
}
function animateDialogOpen(){
 const d=$('drawer');closing=false;drawerAnimation?.cancel();d.scrollTop=0;
 if(canMove()){
  drawerAnimation=d.animate([{transform:'translateX(103%) rotate(1.5deg)'},{transform:'none'}],{duration:470,easing:'cubic-bezier(.12,.76,.17,1)'});
  const details=d.querySelectorAll('#dialog-title, #dialog-body > p, #dialog-body > section, .detailgrid, .matrix-wrap, .actionrow');
  for(const [i,node] of [...details].entries())comicAnimate(node,[{opacity:.25,transform:'translateX(28px)'},{opacity:1,transform:'none'}],{duration:340,delay:140+Math.min(i,5)*38,fill:'backwards'});
 }
}
async function closeComicDialog(){
 const d=$('drawer');if(!d.open||closing)return;closing=true;drawerAnimation?.cancel();
 if(canMove()){
  drawerAnimation=d.animate([{transform:'none'},{transform:'translateX(106%)'}],{duration:245,easing:'cubic-bezier(.55,0,.85,.47)'});
  await drawerAnimation.finished.catch(()=>{});
 }
 d.close();closing=false;
}
function startComic(){
 const deck=$('comic-deck');let pointer=null,suppress=0;
 for(const b of deck.children)b.onclick=()=>{if(performance.now()>suppress)selectShot(Number(b.dataset.frame))};
 deck.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();selectShot(shot+(e.key==='ArrowLeft'?-1:1));deck.children[shot-1].focus()});
 deck.addEventListener('pointerdown',e=>{pointer={x:e.clientX,y:e.clientY}});
 deck.addEventListener('pointercancel',()=>pointer=null);
 deck.addEventListener('pointerup',e=>{if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){suppress=performance.now()+500;selectShot(shot+(dx<0?1:-1))}});
 $('scene-prev').onclick=()=>selectShot(shot-1);$('scene-next').onclick=()=>selectShot(shot+1);
 $('motion').addEventListener('click',syncComicMotion);reduceMotion.addEventListener('change',syncComicMotion);syncComicMotion();
 $('filter-toggle').onclick=e=>{const button=e.currentTarget,open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',open);$('filter-fold').inert=!open;$('catalog-layout').classList.toggle('folded',!open)};
 $('drawer').addEventListener('cancel',e=>{e.preventDefault();closeComicDialog()});
 history.scrollRestoration='manual';
 document.addEventListener('click',e=>{
  const deep=e.target.closest('a[data-directory-query]');
  if(deep&&!e.defaultPrevented&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();history.pushState(null,'',deep.href);quickRestoreLocation();list();turnPage('directory');return}
  const a=e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();const n=pageName(a.hash);
  if(location.hash!==a.hash)history.pushState(null,'',a.hash);turnPage(n);
 });
 window.addEventListener('popstate',()=>turnPage(pageName(location.hash),true));
 window.addEventListener('hashchange',()=>{if(!wave.length&&currentView!==pageName(location.hash))turnPage(pageName(location.hash),true)});
 startDirectoryMotion();
 turnPage(pageName(location.hash),false,true);
}

const comicEffects=new Set();
function comicAnimate(node,frames,options){
 const animation=node.animate(frames,{easing:'cubic-bezier(.18,.78,.23,1)',...options});
 comicEffects.add(animation);
 animation.finished.then(()=>comicEffects.delete(animation),()=>comicEffects.delete(animation));
 return animation;
}
function transient(node,frames,options){
 const a=comicAnimate(node,frames,options);
 a.finished.then(()=>node.remove(),()=>node.remove());
}
function sweepRegion(previous){
 const banner=$('scope-banner'),old=document.createElement('i');
 old.className='region-print';old.dataset.area=previous;old.setAttribute('aria-hidden','true');
 banner.prepend(old);
 transient(old,[{clipPath:'polygon(0 0,114% 0,100% 100%,0 100%)'},{clipPath:'polygon(0 0,0 0,-14% 100%,0 100%)'}],{duration:550});
}
function turnRecords(nodes,direction){
 const visible=nodes.filter(node=>{
  const r=node.getBoundingClientRect();return r.top<innerHeight+200&&r.bottom>0;
 });
 for(const [i,node] of visible.entries()){
  const sign=direction||((i%2)?1:-1);
  comicAnimate(node,[
   {opacity:.2,transform:'perspective(600px) translateX('+sign*30+'px) rotateY('+sign*16+'deg)'},
   {opacity:1,transform:'perspective(600px) translateX(0) rotateY(0deg)'}
  ],{duration:365,delay:Math.min(i,6)*36,fill:'backwards'});
 }
}
function compareStamp(original,button,added){
 comicAnimate(button,[{transform:'scale(.68) rotate(-12deg)'},{transform:'scale(1.22) rotate(6deg)',offset:.6},{transform:'none'}],{duration:380});
 const target=$('compare').getBoundingClientRect();
 if(!added||target.bottom<0||target.top>innerHeight)return;
 const stamp=document.createElement('i');stamp.className='compare-stamp';stamp.setAttribute('aria-hidden','true');document.body.append(stamp);
 const x=original.left+original.width/2-14,y=original.top+original.height/2-14;
 const endX=target.left+target.width/2-14,endY=target.top+target.height/2-14;
 const translate=(a,b,rotate,scale)=>'translate('+a+'px,'+b+'px) rotate('+rotate+'deg) scale('+scale+')';
 transient(stamp,[{transform:translate(x,y,-18,.65),opacity:0},{transform:translate(x,y,-8,1),opacity:1,offset:.14},
  {transform:translate(x+(endX-x)*.42,Math.min(y,endY)-28,15,.85),opacity:1,offset:.53},
  {transform:translate(endX,endY,3,.4),opacity:0}],{duration:560,easing:'ease-in-out'});
}
function startDirectoryMotion(){
 const listing=$('listing'),scope=$('scope-banner');let lastPick=null;
 function snapshot(){return {area:scope.dataset.area,market:$('market').value,page:pageIndex,ids:[...listing.querySelectorAll('.pick')].map(b=>b.dataset.id).join('|')}}
 let last=snapshot();
 listing.addEventListener('click',e=>{
  const b=e.target.closest('.pick');
  if(b)lastPick={id:b.dataset.id,bounds:b.getBoundingClientRect(),pressed:b.getAttribute('aria-pressed')};
 },true);
 new MutationObserver(()=>{
  const next=snapshot(),previous=last;last=next;
  const picked=lastPick;lastPick=null;
  if(!canMove()||currentView!=='directory'||document.hidden)return;
  if(next.area!==previous.area||next.market!==previous.market)sweepRegion(previous.area);
  if(next.ids!==previous.ids)turnRecords([...listing.querySelectorAll('.record,.empty')],Math.sign(next.page-previous.page));
  if(picked){
   const b=[...listing.querySelectorAll('.pick')].find(n=>n.dataset.id===picked.id);
   if(b&&b.getAttribute('aria-pressed')!==picked.pressed)compareStamp(picked.bounds,b,b.getAttribute('aria-pressed')==='true');
  }
 }).observe(listing,{childList:true});
 $('filter-toggle').addEventListener('click',()=>{
  if(!canMove()||$('filter-toggle').getAttribute('aria-expanded')!=='true')return;
  [...$('filters').querySelectorAll('label')].forEach((n,i)=>comicAnimate(n,[{transform:'translateX(-13px)',opacity:.2},{transform:'none',opacity:1}],{duration:260,delay:i*24,fill:'backwards'}));
 });
}
