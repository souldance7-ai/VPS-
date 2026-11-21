'use strict';
const commerceWords={
  coupons:['本方案优惠码','本方案優惠碼','Coupons for this plan','このプランのクーポン'],
  month:['月付','月付','Monthly','月払い'],quarter:['季付','季付','Quarterly','四半期払い'],
  halfyear:['半年付','半年付','Half-yearly','半年払い'],year:['年付','年付','Annual','年払い'],
  unspecified:['未公布适用周期','未公布適用週期','Billing term undisclosed','適用期間の記載なし'],
  copy:['复制','複製','Copy','コピー'],expired:['这项优惠已结束','這項優惠已結束','This offer has ended','このクーポンは終了しました'],
  dated:['库存快照','庫存快照','Stock snapshot','在庫記録'],historical:['历史库存','歷史庫存','Historical stock','過去の在庫'],
  untracked:['无实时库存读数','無即時庫存讀數','No live stock reading','リアルタイム在庫情報なし'],
  unreported:['商家未公开库存','商家未公開庫存','No public stock count','在庫情報非公開'],
  offline:['库存来源暂不可用','庫存來源暫不可用','Inventory source unavailable','在庫情報を取得できません'],
  loading:['读取商家库存','讀取商家庫存','Checking stock','在庫を照会中'],
  'in-stock':['有货','有貨','In stock','在庫あり'],'sold-out':['售罄','售罄','Sold out','売り切れ'],low:['库存紧张','庫存緊張','Low stock','残りわずか'],
  units:['台','台','units','台'],endUnknown:['商家未公布截止日 · 结账确认','商家未公布截止日 · 結帳確認','No published end date · confirm at checkout','終了日未公表 · 決済画面で確認'],
  uncertain:['优惠依结账结果','優惠依結帳結果','Confirm at checkout','決済時に確認'],
  reported:['频道刊载','頻道刊載','Channel report','チャンネル掲載'],
  official:['商家库存','商家庫存','Provider inventory','公式在庫'],
  reading:['探针读数','探針讀數','Probe reading','在庫照会'],published:['资料日期','資料日期','Source date','掲載日'],
  conditions:['适用条件与来源','適用條件與來源','Eligibility and sources','適用条件・出典'],networkSource:['网络规格','網路規格','Network specifications','ネットワーク仕様'],
  info:['库存与优惠','庫存與優惠','Stock and coupons','在庫とクーポン']
};
function commerceWord(key){return commerceWords[key]?.[{sc:0,tc:1,en:2,ja:3}[lang]]||key}
function commerceTerm(){return document.getElementById('term')?.value||''}
function couponTerms(row){
  const list=Array.isArray(row.couponTerms)?row.couponTerms:Array.isArray(row.terms)?row.terms:[row.term];
  return [...new Set(list.filter(term=>['month','quarter','halfyear','year'].includes(term)))];
}
function commerceOfferIndex(plans,rows){
  const ids=new Set(plans.map(p=>p.id)),index=new Map();
  for(const row of rows){
    const matches=row.planIds?.length?row.planIds:ids.has(row.id)?[row.id]:[];
    for(const id of new Set(matches)){
      if(!ids.has(id))continue;
      if(!index.has(id))index.set(id,[]);
      index.get(id).push(row);
    }
  }
  return index;
}
const commerceFeedRows=new Map(),commerceLastReadings=new Map();
const commerceDispatches=new Map();
let latestCouponPosts=[],latestChannelCoupons=[],dispatchTimer;
function commerceRows(p){
  const rows=[...(offersByPlan.get(p.id)||[]),...(commerceFeedRows.get(p.id)||[])];
  const deal=deals[p.deal];
  if(deal&&stateOf(deal)==='active'&&!rows.some(row=>row.code&&row.code===deal.code)){
    rows.push({id:'brand-'+p.deal,code:deal.code,start:deal.start,end:deal.end,official:deal.url,
      discount:deal.rate,conditions:tr(p.deal+'Terms'),terms:deal.couponTerms||[],source:p.provider,planIds:[p.id]});
  }
  if(!p.spec?.tiers?.length)return rows;
  const sku=activeSpec(p)?.sku;
  return rows.filter(r=>r.appliesToAllTiers===true||sku&&r.sku&&String(r.sku).toLowerCase()===String(sku).toLowerCase());
}
function currentCommerceOffer(row,term,now=Date.now()){
  if(term&&!couponTerms(row).includes(term))return false;
  const stage=communityStage(row,now);
  if(stage==='offer')return true;
  if(!['limited','checkout'].includes(stage))return false;
  const observed=boardDate(row);
  return observed>0&&observed<=now&&now-observed<=30*86400000;
}
function commerceHasPromotion(p){
  return commerceRows(p).some(row=>(row.code||row.discount||row.status==='limited'||row.start||row.end||row.endDate)&&currentCommerceOffer(row,commerceTerm()));
}
function applicableCoupons(p){
  const seen=new Set();
  return commerceRows(p).filter(row=>{
    if(typeof row.code!=='string'||!row.code.trim()||!currentCommerceOffer(row,commerceTerm()))return false;
    const sig=row.code+'|'+couponTerms(row).sort().join(',')+'|'+(row.end||row.endDate||'');
    if(seen.has(sig))return false;
    seen.add(sig);return true;
  });
}
function makeCouponButton(row){
  const terms=couponTerms(row),term=terms.length?terms.map(commerceWord).join(' / '):commerceWord('unspecified');
  const button=btn('',()=>{
    if(currentCommerceOffer(row,commerceTerm()))copy(row.code);
    else{toast(commerceWord('expired'));list();refreshDrawerCommerce()}
  },'commerce-copy');
  button.setAttribute('aria-label',communityLabel('codeCopy')+' · '+term+' · '+row.code);
  button.append(el('span',term,'commerce-term'),el('code',row.code),el('span',commerceWord('copy'),'commerce-copy-label'));
  return button;
}
function commerceCouponLines(p,detailed){
  const box=el(detailed?'section':'div',null,detailed?'commerce-deal-details':'commerce-card-codes');
  box.dataset.couponsFor=p.id;
  const rows=applicableCoupons(p);
  if(!rows.length){box.hidden=true;return box}
  box.setAttribute('aria-label',commerceWord('coupons'));
  if(detailed)box.append(el('h3',commerceWord('coupons')));
  for(const row of rows){
    const block=el('div',null,'commerce-deal-row');
    block.append(makeCouponButton(row));
    const ending=row.end||row.endDate;
    const dateOnly=!!row.endDate&&!row.end;
    const ends=ending?communityLabel('ends')+' '+communityDate(ending)+(dateOnly?' · '+communityLabel('dateOnly'):''):commerceWord('endUnknown');
    if(detailed){
      if(row.discount)block.append(el('b',val(row.discount)));
      const fees=[[communityPriceLabel(row),row.price],[communityLabel('renewal'),row.renewal]];
      if(String(row.regular)!==String(row.price))fees.splice(1,0,[communityLabel('regular'),row.regular]);
      for(const [label,amount] of fees){
       if(amount==null)continue;
       const fee=el('p',label+' '+communityAmount(amount,row));
       appendFx(fee,amount,row.currency);block.append(fee);
      }
      block.append(el('small',ends));
      const info=el('details',null,'commerce-conditions');info.append(el('summary',commerceWord('conditions')));
      if(row.conditions)info.append(el('p',val(row.conditions)));
      const evidence=el('div',null,'commerce-evidence'),observed=row.evidenceUpdatedAt||row.publishedAt||row.postDate||row.quotedAt||row.quoteDate||row.observed;
      communitySources(row,evidence);
      if(Number.isFinite(Date.parse(observed)))evidence.append(el('time',commerceWord('published')+' '+communityDate(observed)));
      info.append(evidence);block.append(info);
    }else{
      const stage=communityStage(row);
      if(row.priceBasis==='afterCode'&&row.price!=null){
       block.append(el('small',communityLabel('afterCode')+' '+communityAmount(row.price,row),'commerce-net-price'));
       appendFx(block,row.price,row.currency);
      }
      block.append(el('small',ending&&stage==='offer'?communityLabel('ends')+' '+(row.endDate||communityDate(row.end)):commerceWord('uncertain'),'commerce-deadline'));
    }
    box.append(block);
  }
  return box;
}
function commerceSnapshot(p){
  const entries=[p.stockSnapshot,commerceLastReadings.get(p.id),...(offersByPlan.get(p.id)||[]).map(row=>({state:row.stockAtPublication,checkedAt:row.stockObservedAt||row.publishedAt||row.quotedAt,source:row.thread||row.official}))];
  return entries.filter(x=>x&&['in-stock','sold-out','low'].includes(x.state)&&Number.isFinite(Date.parse(x.checkedAt))&&Date.parse(x.checkedAt)<=Date.now()+60000&&communityHref(x.source)).sort((a,b)=>Date.parse(b.checkedAt)-Date.parse(a.checkedAt))[0];
}
function commerceStamp(box,time,source){
  const date=typeof time==='number'?new Date(time).toISOString():time;
  const href=communityHref(source);
  if(!href)return;
  const label=date?communityDate(date):commerceWord('official')+' ↗';
  const a=link(label,href);a.className='commerce-stock-source';a.title=(date?commerceWord('published')+' · '+label+' · ':'')+href;box.append(a);
}
function paintCommerceStock(box,p,probe,target){
  if(!box)return;
  const snapshot=commerceSnapshot(p),direct=probe&&['in-stock','sold-out','low'].includes(probe.state)&&!target?.quoteOnly;
  if(!direct&&p.officialCatalog){paintOfficialCatalogueStock(box,p.officialCatalog);return}
  const dated=snapshot&&!direct&&(!probe||['loading','local'].includes(probe.state));
  box.replaceChildren();
  const state=direct?probe.state:dated?snapshot.state:probe?.state==='offline'?'offline':probe?.state==='loading'&&!target?.quoteOnly?'loading':probe?.state==='unreported'||target?.quoteOnly?'unreported':'untracked';
  const stale=dated&&Date.now()-Date.parse(snapshot.checkedAt)>86400000;
  box.dataset.state=stale?'historical':state;
  let title=direct?stockLabel(target,state):commerceWord(state);
  if(dated)title=commerceWord(stale?'historical':'dated')+' · '+title;
  const quantity=direct?probe.quantity:dated?snapshot.quantity:null;
  if(Number.isSafeInteger(quantity)&&(state==='sold-out'?quantity===0:quantity>0))title+=' · '+quantity+' '+commerceWord('units');
  const badge=el('strong',title,'commerce-stock-state');box.append(badge);
  if(dated)commerceStamp(box,snapshot.checkedAt,snapshot.source);
  else if(probe?.checkedAt)commerceStamp(box,probe.checkedAt,probe.source||target?.url);
  else if(state==='untracked'||state==='unreported'||state==='offline')commerceStamp(box,null,target?.url||p.url);
  if(!direct&&!dated&&snapshot&&['offline','unreported'].includes(state)){
    const last=el('small',commerceWord('dated')+' · '+commerceWord(snapshot.state)+' · ','commerce-last-stock');
    commerceStamp(last,snapshot.checkedAt,snapshot.source);box.append(last);
  }
}
function commerceStockBadge(p){
  const box=el('div',null,'commerce-stock');
  paintCommerceStock(box,p);return box;
}
function appendCardCommerce(card,p){
  const group=el('div',null,'commerce-card');
  group.append(commerceStockBadge(p),commerceCouponLines(p,false));card.append(group);
}
function appendDrawerCoupons(out,p){
  const box=commerceCouponLines(p,true),title=out.querySelector('#dialog-title');
  if(title)title.after(box);else out.append(box);
}
function refreshDrawerCommerce(){
  const box=document.querySelector('dialog[open] .commerce-deal-details');
  if(!box)return;
  const p=PLANS.find(plan=>plan.id===box.dataset.couponsFor);
  if(p)box.replaceWith(commerceCouponLines(p,true));
}
document.addEventListener('atlas:billing-change',refreshDrawerCommerce);

// A public code can join a directory SKU only when the source explicitly puts
// that code and one distinct catalog SKU together. A merchant name alone is insufficient.
let commerceFeedSignature='',commerceFeedTimer=null;
function commerceExplicitTerm(line){
  const terms=[
    ['month','月(?:付|繳|缴)|月払い|monthly'],['quarter','季(?:付|繳|缴)|四半期払い|quarterly'],
    ['halfyear','半年(?:付|繳|缴)|半年払い|semi.?annual|half.?yearly'],['year','(?<!半)年(?:付|缴|繳)|(?<!半)年払い|(?<!semi[- ])\\bannual(?:ly)?\\b|\\byearly\\b']
  ];
  const found=terms.filter(([,test])=>new RegExp('(?:'+test+')\\s*(?:专属|專屬|专用|專用|only|限定)?\\s*(?:优惠码|優惠碼|折扣[碼码]|クーポン|(?:coupon|promo|discount)(?: code)?)','i').test(line));
  return found.length===1?[found[0][0]]:[];
}
function titleHasToken(text,value){
  const source=text.normalize('NFKC').toLowerCase(),token=value.normalize('NFKC').toLowerCase();
  let index=-1;
  while((index=source.indexOf(token,index+1))>=0){
    if(!/[a-z0-9._-]/i.test(source[index-1]||'')&&!/[a-z0-9._-]/i.test(source[index+token.length]||''))return true;
  }
  return false;
}
function directoryPostMatches(post,now){
  const source=forumItemLink(post.link,post.from),time=Date.parse(post.date),deadline=Date.parse(post.endsAt);
  if(!source||post.archived||!Number.isFinite(time)||time>now||time<now-14*86400000||post.endsAt&&(!Number.isFinite(deadline)||deadline<=now))return[];
  if(!/^[a-z0-9][a-z0-9_.-]{1,48}(?:,[a-z0-9][a-z0-9_-]{0,20})?!?$/i.test(post.code||''))return[];
  const line=typeof post.scopeLine==='string'&&post.scopeLine.length<=420?post.scopeLine:post.title||'';
  if(!titleHasToken(line,post.code)||/失效|过期|過期|未开始|尚未開始|结束|已結束|无效|無效|expired|no longer|invalid|does(?:n.t| not) work|期限切れ/i.test(line+' '+post.title))return[];
  const matched=dispatchProduct(post,line);
  if(!matched)return[];
  const {p,name}=matched,provider=p.provider;
  const terms=commerceExplicitTerm(post.termsLine||line);
  return [{id:'feed-'+source+'-'+post.code,planIds:[p.id],provider,sku:name,plan:name,code:post.code,url:p.url,
    source:publicTGChannels[post.from]?'@'+publicTGChannels[post.from]:post.from,thread:source,publishedAt:post.date,
    observed:post.sourceObserved||post.date,end:post.endsAt||'',terms,term:terms[0]||'',status:'checkout'}];
}
function dispatchProduct(post,line){
  const provider=providerFromPost({...post,snippet:line});
  if(!provider)return null;
  const matches=[];
  for(const p of PLANS){
    if(p.provider!==provider)continue;
    const names=p.spec?.tiers?.length?p.spec.tiers.map(t=>t.sku):[p.spec?.sku,p.sku,typeof p.plan==='string'?p.plan:p.plan?.en];
    const exact=[...new Set(names)].find(sku=>typeof sku==='string'&&sku.length>=7&&
      (/[a-z0-9]+[._-][a-z0-9]+[._-][a-z0-9]+/i.test(sku)||sku.length>=10&&/[0-9]/.test(sku))&&titleHasToken(line,sku));
    const alias=p.feedSkus?.find(sku=>titleHasToken(line,sku));
    const name=exact||(alias&&names.find(sku=>sku));
    if(name)matches.push({p,name});
  }
  // A shared SKU on other markets or an ambiguous multi-SKU listing stays in the feed.
  return matches.length===1?matches[0]:null;
}
function refreshDirectoryCouponFeed(data){
  latestCouponPosts=[];
  if(data&&!data.editionSnapshot&&!data.stale){
    const counts=new Map();
    for(const post of data.items||[])counts.set(post.link,(counts.get(post.link)||0)+1);
    latestCouponPosts=(data.items||[]).filter(post=>counts.get(post.link)===1);
  }
  updateDirectoryCouponRows();
}
function updateDirectoryCouponRows(){
  const now=Date.now();
  const rows=[...new Map([...latestCouponPosts,...latestChannelCoupons].flatMap(post=>directoryPostMatches(post,now)).map(row=>[row.id,row])).values()];
  const signature=JSON.stringify(rows);
  if(signature===commerceFeedSignature)return;
  commerceFeedSignature=signature;commerceFeedRows.clear();
  for(const row of rows){
    const id=row.planIds[0];
    if(!commerceFeedRows.has(id))commerceFeedRows.set(id,[]);
    commerceFeedRows.get(id).push(row);
  }
  if(document.body.dataset.book==='directory'){
    if($('promo').checked||$('search').value.trim())list();
    else for(const box of document.querySelectorAll('#listing .commerce-card-codes')){
      const p=PLANS.find(candidate=>candidate.id===box.dataset.couponsFor);
      if(p)box.replaceWith(commerceCouponLines(p,false));
    }
  }
  refreshDrawerCommerce();scheduleCommerceExpiry();renderFeaturedOffers();
}
function appendProductDispatches(out,p){
  const items=commerceDispatches.get(p.id)||[];
  if(!items.length)return;
  const box=el('div',null,'product-dispatches');
  for(const item of items.slice(0,2)){
    const row=el('div');
    row.append(link('@'+publicTGChannels[item.from]+' · '+item.title+' ↗',item.link));
    const date=forumDate(item.date);if(date)row.append(date);
    box.append(row);
  }
  out.append(box);
}
async function refreshChannelProducts(){
  try{
    const response=await fetch('/api/deal-feed/channel-products',{signal:AbortSignal.timeout(14500)});
    if(!response.ok)throw Error('channel products');
    const {items}=await response.json(),now=Date.now(),grouped=new Map(),coupons=[];
    for(const post of items.slice(0,96)){
      const date=Date.parse(post.date),line=post.productLine||post.title;
      if(typeof line!=='string'||line.length>380||!Object.hasOwn(publicTGChannels,post.from)||
        !forumItemLink(post.link,post.from)||!Number.isFinite(date)||date>now||now-date>7*86400000)continue;
      const match=dispatchProduct(post,line);
      if(!match)continue;
      const existing=grouped.get(match.p.id)||[];
      existing.push(post);grouped.set(match.p.id,existing);
      if(post.coupons?.length===1){
        const entry=post.coupons[0];
        coupons.push({...post,code:entry.code,endsAt:entry.endsAt,termsLine:entry.scopeLine,scopeLine:line+' · '+entry.code});
      }
    }
    commerceDispatches.clear();
    for(const [id,items] of grouped)commerceDispatches.set(id,items.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)));
    latestChannelCoupons=coupons;
    updateDirectoryCouponRows();
    if(document.body.dataset.book==='directory')list();
  }catch{}
}
function scheduleChannelProducts(){
  clearTimeout(dispatchTimer);
  if(document.hidden||!couponFeedVisible()||location.protocol==='file:')return;
  scheduleChannelProducts.next ||= 0;
  dispatchTimer=setTimeout(async()=>{
    scheduleChannelProducts.next=Date.now()+300_000;
    await refreshChannelProducts();
    scheduleChannelProducts();
  },Math.max(0,scheduleChannelProducts.next-Date.now()));
}
new MutationObserver(scheduleChannelProducts).observe(document.body,{attributes:true,attributeFilter:['data-book']});
document.addEventListener('visibilitychange',scheduleChannelProducts);
document.addEventListener('DOMContentLoaded',scheduleChannelProducts);
function couponFeedVisible(){return ['directory','top'].includes(document.body.dataset.book)}
function scheduleDirectoryCoupons(){
  clearTimeout(commerceFeedTimer);
  if(document.hidden||!couponFeedVisible()||location.protocol==='file:')return;
  const state=publicForumState.feeds.coupons;
  const delay=Math.max(0,(state.nextAt||0)-Date.now());
  commerceFeedTimer=setTimeout(async()=>{
    if(document.hidden||!couponFeedVisible())return;
    if(!state.busy)await loadForumFeed('coupons');
    if(state.busy)commerceFeedTimer=setTimeout(scheduleDirectoryCoupons,2000);
    else scheduleDirectoryCoupons();
  },delay);
}
new MutationObserver(scheduleDirectoryCoupons).observe(document.body,{attributes:true,attributeFilter:['data-book']});
document.addEventListener('visibilitychange',scheduleDirectoryCoupons);

// Update time-bound coupon actions in an already-open tab at the published boundary.
let commerceExpiryTimer=null;
function scheduleCommerceExpiry(){
  clearTimeout(commerceExpiryTimer);
  const active=document.body.dataset.book==='directory'||document.querySelector('dialog[open] .commerce-deal-details');
  if(document.hidden||!active)return;
  const rows=[...COMMUNITY_OFFERS,...Object.values(deals),...[...commerceFeedRows.values()].flat()];
  const now=Date.now();let at=Infinity;
  for(const row of rows){
    const evidence=boardDate(row);
    for(const boundary of [Date.parse(row.start),Date.parse(row.end),...communityCalendar(row),evidence?evidence+30*86400000+1:NaN]){
      if(Number.isFinite(boundary)&&boundary>now&&boundary<at)at=boundary;
    }
  }
  if(!Number.isFinite(at))return;
  commerceExpiryTimer=setTimeout(()=>{
    if(!document.hidden){
      if(document.body.dataset.book==='directory')list();
      refreshDrawerCommerce();
    }
    scheduleCommerceExpiry();
  },Math.min(2147483640,Math.max(10,at-now+5)));
}
const commerceExpiryObserver=new MutationObserver(scheduleCommerceExpiry);
commerceExpiryObserver.observe(document.body,{attributes:true,attributeFilter:['data-book']});
const commerceDrawer=document.getElementById('drawer');
if(commerceDrawer)commerceExpiryObserver.observe(commerceDrawer,{attributes:true,attributeFilter:['open']});
document.addEventListener('visibilitychange',scheduleCommerceExpiry);
