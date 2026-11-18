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
 shot=(value+2)%3+1;
 $('comic-deck').dataset.shot=shot;
 for(const b of document.querySelectorAll('[data-frame]')) b.setAttribute('aria-expanded',String(Number(b.dataset.frame)===shot));
 $('story-status').textContent='0'+shot+' / 03  ·  '+tr('chapter'+shot);
}
function localizeComic(){
 document.title=tr('comicTitle')+' · PITOPONE';
 $('scene-prev').setAttribute('aria-label',tr('previousShot'));$('scene-next').setAttribute('aria-label',tr('nextShot'));
 $('comic-deck').setAttribute('aria-label',tr('comicGesture'));selectShot(shot);
}
function syncComicMotion(){
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
 stack.classList.add('turning');
 const ease='cubic-bezier(.28,.04,.16,1)';
 function track(node,keys,timing){const a=node.animate(keys,timing);wave.push(a);return a.finished.catch(()=>{})}
 const out=track(frame,[{transform:'scale(1)',borderRadius:'0px'},{transform:'translateY(2%) scale(.91)',borderRadius:'30px'}],{duration:285,easing:ease,fill:'forwards'});
 await Promise.all([out,...cards.map((s,i)=>track(s,[{transform:'translateY(110%) scale(.92)'},{transform:'translateY(0) scale(1)'}],{duration:310,delay:i*68,easing:ease,fill:'both'}))]);
 if(token!==routeSequence)return;
 showView(name,restore,true);
 await Promise.all([track(frame,[{transform:'translateY(4%) scale(.93)'},{transform:'none'}],{duration:400,easing:ease,fill:'forwards'}),...cards.map((s,i)=>track(s,[{transform:'translateY(0)'},{transform:'translateY(-111%)'}],{duration:340,delay:(2-i)*45,easing:ease,fill:'forwards'}))]);
 if(token===routeSequence){for(const a of wave)a.cancel();wave=[];stack.classList.remove('turning')}
}
function animateDialogOpen(){
 const d=$('drawer');closing=false;drawerAnimation?.cancel();d.scrollTop=0;
 if(canMove())drawerAnimation=d.animate([{transform:'translateX(103%) rotate(1.5deg)'},{transform:'none'}],{duration:470,easing:'cubic-bezier(.12,.76,.17,1)'});
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
  const a=e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();const n=pageName(a.hash);
  if(location.hash!==a.hash)history.pushState(null,'',a.hash);turnPage(n);
 });
 window.addEventListener('popstate',()=>turnPage(pageName(location.hash),true));
 window.addEventListener('hashchange',()=>{if(!wave.length&&currentView!==pageName(location.hash))turnPage(pageName(location.hash),true)});
 turnPage(pageName(location.hash),false,true);
}