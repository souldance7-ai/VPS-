'use strict';
const journalLabels={
 journalTitle:['测评时间轴','測評時間軸','Review timeline','レビュー年表'],
 journalIntro:['沿时间查看两位作者实际测过的机房、线路和配置。报价与库存请打开对应商家的方案。','沿時間查看兩位作者實際測過的機房、線路與規格。報價與庫存請打開對應商家的方案。','Explore the locations, routes and hardware each author tested. Open a merchant’s plans for prices and availability.','両著者が実際に試した拠点、回線、仕様を時系列で表示します。価格と在庫は各社のプランで確認できます。'],
 journalFull:['原文测评','原文測評','Linked reviews','原文付きレビュー'],
 journalIndex:['作者主题索引','作者主題索引','Author’s topic index','著者の投稿索引'],
 journalIndexIntro:['按你要看的商家或地区找主题。链接打开作者列表的对应页，可按标题找到帖子。','依商家或地區找主題。連結開啟作者列表的對應頁，可按標題找到帖子。','Find a topic by merchant or region. Each link opens the author’s listing page, where you can find the original title.','事業者・地域から投稿を探せます。リンクは該当する著者一覧ページを開きます。'],
 journalIndexLink:['打开作者列表','開啟作者列表','Open listing','一覧を開く'],
 journalTopics:['个主题','個主題','topics','件のトピック'],
 journalPage:['列表页','列表頁','Listing page','一覧ページ'],
 journalAuthor:['作者','作者','Author','著者'],
 journalShare:['复制测评筛选链接','複製測評篩選連結','Copy filtered review link','絞り込みリンクをコピー'],
 journalSearch:['搜索商家、型号或线路','搜尋商家、型號或線路','Search merchant, model or route','事業者・機種・回線を検索'],
 journalReports:['篇测评','篇測評','reviews','件のレビュー'],
 journalPost:['阅读原文','閱讀原文','Read review','原文を読む'],
 journalShop:['商家官网','商家官網','Merchant site','公式サイト'],
 journalPlans:['比较该商家方案','比較該商家方案','Compare merchant plans','この事業者のプランを比較'],
 journalUndated:['原帖未列日期','原帖未列日期','Publication date unavailable','掲載日未記載'],
 journalMore:['显示更多测评','顯示更多測評','Show more reviews','さらに表示'],
 journalEmpty:['没有符合这些条件的测评。','沒有符合這些條件的測評。','No reviews match these filters.','条件に一致するレビューはありません。'],
 journalOther:['该商家的其他实测','該商家的其他實測','Other reviews of this merchant','この事業者の他の実測'],
 journalRelated:['同商家、同地区的实测','同商家、同地區的實測','Reviews of this merchant in this region','同じ事業者・地域の実測'],
 journalVendor:['商家','商家','Merchant','事業者'],
 journalReviewers:['作者的公开主题','作者的公開主題','Authors’ public discussions','著者の公開投稿']
};
for(const [key,labels] of Object.entries(journalLabels)){
 editionLangs.forEach((language,i)=>WORDS[language][key]=labels[i]);
}
const journalRows=[...AUTHOR_REPORTS,...MEOW_REPORTS].sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.provider.localeCompare(b.provider));
let journalLimit=18,journalIsIndex=false;
const journalInitial=new URLSearchParams(location.hash==='#journal'?location.search:'');
let journalRestored=false;
function journalUrl(){
 const url=new URL(location.href);url.search='';url.hash='journal';
 if(journalIsIndex)url.searchParams.set('j-view','index');
 for(const [key,id] of [['author','journal-author'],['market','journal-market'],['search','journal-search']]){
  const value=$(id).value.trim();if(value)url.searchParams.set('j-'+key,value);
 }
 return url;
}
const journalSourceRows=()=>journalIsIndex?AUTHOR_INDEX:journalRows;
const journalAliases={nobrand:'newnbcloud',nobrandcloud:'newnbcloud',taipei101:'vpstaipeitaipei101',mkcloud:'mkcloud'};
function journalVendorKeys(name){return name.split(/\s+(?:\/|&|and)\s+|、|,/i).map(n=>{const key=norm(n);return journalAliases[key]||key})}
function journalMatchesVendor(r,p){return journalVendorKeys(r.provider).includes(norm(p.provider))}

function journalMarket(code){
 if(code==='US')return new Intl.DisplayNames([tags[lang]],{type:'region'}).of(code);
 if(MARKETS[code])return market(code);
 if(/^[A-Z]{2}$/.test(code))return new Intl.DisplayNames([tags[lang]],{type:'region'}).of(code);
 return code||'';
}
function journalPlanLinks(provider){
 const keys=journalVendorKeys(provider);
 const names=[...new Set(PLANS.filter(plan=>keys.includes(norm(plan.provider))).map(plan=>plan.provider))];
 return names.map(name=>{const a=el('a',(names.length>1?name:tr('journalPlans'))+' →');
  a.href='?'+new URLSearchParams({'q-vendor':name})+'#directory';a.dataset.directoryQuery='';return a;});
}
function renderJournalList(){
 const query=norm($('journal-search').value.trim()),author=$('journal-author').value,region=$('journal-market').value;
 const rows=journalSourceRows().filter(r=>(!author||r.by===author)&&(!region||r.market===region)&&(!query||norm([r.provider,r.sku,r.market,journalMarket(r.market),r.by,val(r.summary)].join(' ')).includes(query)));
 $('journal-clear').hidden=!(query||author||region);
 $('journal-count').textContent=rows.length+' '+tr(journalIsIndex?'journalTopics':'journalReports');
 const list=$('journal-list'),parts=document.createDocumentFragment();
 let lastMonth=null;
 for(const r of rows.slice(0,journalLimit)){
  const dated=/^\d{4}-\d{2}-\d{2}/.test(r.date||'');
  const stamp=dated?r.date.slice(0,10):'',month=journalIsIndex?tr('journalPage')+' '+r.indexPage:stamp.slice(0,7);
  if(month!==lastMonth){parts.append(el('h3',month||tr('journalUndated'),'journal-month'));lastMonth=month}
  const row=el('article',null,'journal-entry'),body=el('div',null,'journal-entry-body'),time=el('time',journalIsIndex?String(r.indexPage):stamp?stamp.slice(8):'—','journal-day');
  if(stamp)time.dateTime=stamp;
  const heading=el('h4');heading.append(link(r.provider+' · '+r.sku,r.url));
  const meta=el('p',[journalMarket(r.market),r.by].filter(Boolean).join('  /  '),'journal-meta');
  const actions=el('div',null,'journal-actions');actions.append(link(tr(journalIsIndex?'journalIndexLink':'journalPost')+' ↗',r.url));
  actions.append(...journalPlanLinks(r.provider));
  if(r.official&&r.official!==r.url)actions.append(link(tr('journalShop')+' ↗',r.official));
  body.append(meta,heading,el('p',val(r.summary),'journal-summary'),actions);row.append(time,body);parts.append(row);
 }
 if(!rows.length)parts.append(el('p',tr('journalEmpty'),'empty'));
 list.replaceChildren(parts);$('journal-more').hidden=rows.length<=journalLimit;
}
function renderJournal(){
 if(!journalRestored)journalIsIndex=journalInitial.get('j-view')==='index';
 $('journal-full').setAttribute('aria-pressed',String(!journalIsIndex));$('journal-index').setAttribute('aria-pressed',String(journalIsIndex));
 $('journal-description').hidden=journalIsIndex;
 $('journal-context').textContent=journalIsIndex?tr('journalIndexIntro'):'';
 const data=journalSourceRows(),authors=[...new Set(data.map(r=>r.by))].sort(),regions=[...new Set(data.map(r=>r.market).filter(Boolean))];
 opt('journal-author',[['',tr('all')],...authors.map(a=>[a,a])],$('journal-author').value);
 opt('journal-market',[['',tr('allMarkets')],...regions.map(r=>[r,journalMarket(r)]).sort((a,b)=>a[1].localeCompare(b[1],tags[lang]))],$('journal-market').value);
 if(!journalRestored){
  journalRestored=true;
  for(const [key,id] of [['author','journal-author'],['market','journal-market']]){
   const pick=journalInitial.get('j-'+key);if(pick&&[...$(id).options].some(o=>o.value===pick))$(id).value=pick;
  }
  $('journal-search').value=journalInitial.get('j-search')||'';
 }
 renderJournalList();
}
function journalRegionMatches(r,p){
 if(r.market===p.market)return true;
 if(r.market!=='US')return false;
 const cities={LAX:/Los Angeles|LAX|洛杉[矶磯]/i,SJC:/San Jose|SJC|圣何塞|聖荷西/i,SEA:/Seattle|西雅[图圖]/i};
 return cities[p.market]?.test(r.sku+' '+val(r.summary))||false;
}
function renderRelatedReports(out,p){
 const rows=journalRows.filter(r=>journalMatchesVendor(r,p));
 const local=rows.filter(r=>journalRegionMatches(r,p)),others=rows.filter(r=>!journalRegionMatches(r,p));
 for(const [label,reports,limit] of [['journalRelated',local,4],['journalOther',others,2]]){
  if(!reports.length)continue;
  const section=el('section',null,'journal-related');section.append(el('h3',tr(label)));
  for(const r of reports.slice(0,limit))section.append(link([journalMarket(r.market),r.sku,r.by].join(' · ')+' ↗',r.url));
  out.append(section);
 }
}
document.getElementById('journal-clear').addEventListener('click',()=>{
 $('journal-author').value='';$('journal-market').value='';$('journal-search').value='';journalLimit=18;renderJournalList();
});
document.getElementById('journal-share').addEventListener('click',()=>copy(journalUrl().href));
for(const id of ['journal-full','journal-index']){
 document.getElementById(id).addEventListener('click',()=>{journalIsIndex=id==='journal-index';journalLimit=18;renderJournal()});
}
document.getElementById('journal-controls').addEventListener('input',()=>{journalLimit=18;renderJournalList()});
document.getElementById('journal-controls').addEventListener('submit',event=>event.preventDefault());
document.getElementById('journal-more').addEventListener('click',()=>{
 const n=$('journal-list').querySelectorAll('article').length;journalLimit+=18;renderJournalList();
 $('journal-list').querySelectorAll('article')[n]?.querySelector('h4 a')?.focus({preventScroll:true});
});