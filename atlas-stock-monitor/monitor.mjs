import targets from './targets.json' with { type: 'json' };
import {stockTarget,observeListing} from './stock-source.mjs';

const mkTargets=targets.filter(t=>stockTarget(t.key)?.family==='mkcloud');
const legacyTargets=targets.filter(t=>!['greenwhmcs','mkcloud','jsonldoffer'].includes(stockTarget(t.key)?.family));
const greenTargets=targets.filter(t=>stockTarget(t.key)?.family==='greenwhmcs').sort((a,b)=>stockTarget(a.key).url.localeCompare(stockTarget(b.key).url));
const byKey=new Map(targets.map(t=>[t.key,t]));
const legacyPeriodMinutes=Math.max(15,Math.ceil(legacyTargets.length/11));
const greenPeriodMinutes=Math.max(24,Math.ceil(greenTargets.length/17));
const mkPeriodMinutes=Math.max(30,Math.ceil(mkTargets.length/8));
function cadence(key){const family=stockTarget(key)?.family;return family==='greenwhmcs'?greenPeriodMinutes:family==='mkcloud'?mkPeriodMinutes:family==='jsonldoffer'?facilityPeriodMinutes:legacyPeriodMinutes}
const stable=new Set(['in-stock','sold-out','low']);
const states=new Set([...stable,'offline','unreported']);
const stockTargets=targets.filter(t=>!t.quoteOnly);
const quoteTargets=targets.filter(t=>['mkcloud','nnb','vmsilo','backwaves','wasabi','vultr','tamago','bagevm','matrix','prepaid','bwh','akile','isvoro','akko','mhy','greenwhmcs','jsonldoffer','servitro'].includes(stockTarget(t.key)?.family));
const rowsPerResponse=12;
const retention=30*86400000;

const facilityGroups=new Map(),facilitiesByKey=new Map();
for(const item of targets){
 const t=stockTarget(item.key);
 if(t?.family!=='jsonldoffer')continue;
 const location=new URL(t.url);
 const key='public-catalog:'+location.hostname+':'+location.pathname.replace(/\/+$/,'').split('/').at(-1);
 if(!facilityGroups.has(key))facilityGroups.set(key,[]);
 facilityGroups.get(key).push(item);
 facilitiesByKey.set(item.key,key);
}
const facilityPeriodMinutes=Math.max(1,Math.ceil(facilityGroups.size/2));
const regularStockTargets=stockTargets.filter(t=>!facilitiesByKey.has(t.key)),regularQuoteTargets=quoteTargets.filter(t=>!facilitiesByKey.has(t.key));
function facilityRound(at){
 const shard=Math.floor(at/60000)%facilityPeriodMinutes;
 return [...facilityGroups.keys()].filter((_,i)=>i%facilityPeriodMinutes===shard);
}
async function readFacility(db,key){
 const row=await db.prepare('SELECT observed_at,payload FROM offer_latest WHERE probe=?').bind(key).first();
 return row?{at:row.observed_at,items:JSON.parse(row.payload).items}:{at:null,items:{}};
}
function nextFacilityData(groupKey,samples,at,previous){
 const items=Object.create(null),summary={count:0,confirmed:0,offline:0,unreported:0,quotes:0,withOffer:0,lastOffer:null,oldestOffer:null};
 for(const {key,state,offer} of samples){
  const old=previous.items[key]||{},known=stable.has(state),changed=known&&old.confirmedState&&old.confirmedState!==state;
  const events=(old.events||[]).filter(e=>e.at>=at-retention).slice(0,rowsPerResponse);
  if(changed){events.unshift({at,from:old.confirmedState,to:state});if(events.length>rowsPerResponse)events.pop()}
  const lastOffer=offer||old.offer||null;
  items[key]={state,confirmedState:known?state:old.confirmedState||null,confirmedAt:known?at:old.confirmedAt||null,
   changedAt:changed?at:old.changedAt||null,events,offer:lastOffer};
  summary.count++;if(known)summary.confirmed++;else if(state==='offline')summary.offline++;else summary.unreported++;
  if(offer)summary.quotes++;
  if(lastOffer){summary.withOffer++;const when=Date.parse(lastOffer.checkedAt);if(Number.isFinite(when)){summary.lastOffer=Math.max(when,summary.lastOffer||0);summary.oldestOffer=Math.min(when,summary.oldestOffer||when)}}
 }
 return JSON.stringify({group:groupKey,items,summary});
}
export async function persistFacility(db,groupKey,samples,at){
 for(let attempt=0;attempt<3;attempt++){
  const previous=await readFacility(db,groupKey);
  if(previous.at!==null&&previous.at>=at)return;
  const payload=nextFacilityData(groupKey,samples,at,previous);
  const result=await db.prepare('INSERT INTO offer_latest(probe,observed_at,payload) VALUES(?,?,?) ON CONFLICT(probe) DO UPDATE SET observed_at=excluded.observed_at,payload=excluded.payload WHERE offer_latest.observed_at=? AND offer_latest.observed_at<excluded.observed_at')
   .bind(groupKey,at,payload,previous.at).run();
  if((result.meta?.changes??result.changes)>0)return;
 }
 throw Error('Concurrent catalog observations');
}
export async function collectFacilities(at,env,fetcher){
 const requests=new Map(),retrieve=fetcher||((url)=>readStockSource(url,requests));
 for(const groupKey of facilityRound(at)){
  const samples=[];
  for(const target of facilityGroups.get(groupKey))samples.push(await sampleTarget(target,env,retrieve));
  await persistFacility(env.DB,groupKey,samples,Math.max(...samples.map(s=>s.at)));
 }
}
async function readFacilitySKU(key,t,env){
 const entry=await readFacility(env.DB,facilitiesByKey.get(key)),row=entry.items[key];
 return json({installed:true,schemaVersion:13,key,sku:t.sku,zone:t.zone,periodMinutes:facilityPeriodMinutes,lastOffer:row?.offer||null,
  latest:row?{state:row.state,checkedAt:iso(entry.at),confirmedState:row.confirmedState,confirmedAt:iso(row.confirmedAt),changedAt:iso(row.changedAt)}:null,
  events:(row?.events||[]).filter(e=>e.at>=Date.now()-retention).map(e=>({...e,at:iso(e.at)}))});
}

const periodMinutes=Math.max(legacyPeriodMinutes,greenPeriodMinutes,mkPeriodMinutes,facilityPeriodMinutes);
export function round(at){
 const minute=Math.floor(at/60000),shard=minute%greenPeriodMinutes;
 const start=Math.floor(shard*greenTargets.length/greenPeriodMinutes);
 const end=Math.floor((shard+1)*greenTargets.length/greenPeriodMinutes);
 return [...legacyTargets.filter((_,i)=>i%legacyPeriodMinutes===minute%legacyPeriodMinutes),...greenTargets.slice(start,end),...mkTargets.filter((_,i)=>i%mkPeriodMinutes===minute%mkPeriodMinutes)];
}

// Up to 16 samples share a transaction. All three statements stay under D1's
// 100-binding limit. A failed, repeated or late observation preserves prior facts.
export async function persistBatch(db,samples){
 for(let offset=0;offset<samples.length;offset+=16){
  const block=samples.slice(offset,offset+16);
  const values=block.map(()=>'(?,?,?,?)').join(',');
  const args=block.flatMap(s=>[s.key,s.at,s.state,stable.has(s.state)?1:0]);
  const incoming='WITH incoming(probe,at,state,known) AS (VALUES '+values+') ';
  const event=incoming+'INSERT OR IGNORE INTO stock_changes(probe,at,from_state,to_state) SELECT i.probe,i.at,s.confirmed_state,i.state FROM incoming i JOIN stock_latest s ON s.probe=i.probe WHERE s.checked_at<i.at AND i.known=1 AND s.confirmed_state IS NOT NULL AND s.confirmed_state<>i.state';
  const current=incoming+'INSERT INTO stock_latest(probe,checked_at,current_state,confirmed_state,confirmed_at,changed_at) SELECT probe,at,state,CASE WHEN known=1 THEN state END,CASE WHEN known=1 THEN at END,NULL FROM incoming WHERE 1 ON CONFLICT(probe) DO UPDATE SET checked_at=excluded.checked_at,current_state=excluded.current_state,changed_at=CASE WHEN excluded.confirmed_state IS NOT NULL AND stock_latest.confirmed_state IS NOT NULL AND stock_latest.confirmed_state<>excluded.confirmed_state THEN excluded.checked_at ELSE stock_latest.changed_at END,confirmed_state=COALESCE(excluded.confirmed_state,stock_latest.confirmed_state),confirmed_at=COALESCE(excluded.confirmed_at,stock_latest.confirmed_at) WHERE stock_latest.checked_at<excluded.checked_at';
  const commands=[db.prepare(event).bind(...args),db.prepare(current).bind(...args)];
  const quoted=block.filter(s=>s.offer&&Number.isFinite(Date.parse(s.offer.checkedAt)));
  if(quoted.length){
   const placeholders=quoted.map(()=>'(?,?,?)').join(',');
   const quotes=quoted.flatMap(s=>[s.key,Date.parse(s.offer.checkedAt),JSON.stringify(s.offer)]);
   commands.push(db.prepare('INSERT INTO offer_latest(probe,observed_at,payload) VALUES '+placeholders+' ON CONFLICT(probe) DO UPDATE SET observed_at=excluded.observed_at,payload=excluded.payload WHERE offer_latest.observed_at<excluded.observed_at').bind(...quotes));
  }
  await db.batch(commands);
 }
}
export async function persist(db,sample){return persistBatch(db,[sample])}

async function sampleTarget(target, env, fetcher) {
 const started=Date.now();
 try {
  const url=new URL('/api/stock/'+target.key,env.PAGES_ORIGIN);
  const resp=await fetcher(url,{signal:AbortSignal.timeout(12000), redirect:'manual'});
  if(!resp.ok||!resp.headers.get('content-type')?.includes('application/json'))throw Error('endpoint');
  const data=await resp.json(),at=Date.parse(data.checkedAt),age=Date.now()-at;
  if(data.key!==target.key||data.sku!==target.sku||data.zone!==target.zone||!states.has(data.state)||!Number.isFinite(at)||age< -30000||age>300000)throw Error('invalid snapshot');
  let offer=null;
  const candidate=data.offer,observed=Date.parse(candidate?.checkedAt);
  if(candidate&&Number.isFinite(observed)&&observed<=at+30000&&at-observed<=300000&&/^[0-9]+(?:\.[0-9]+)?$/.test(candidate.amount)&&['CNY','HKD','EUR','USD'].includes(candidate.currency)&&['month','quarter','halfyear','year'].includes(candidate.period)&&['base','listed','base-config','starting'].includes(candidate.basis))offer=candidate;
  return {key:target.key,state:data.state,at,offer};
 } catch { return {key:target.key,state:'offline',at:started}; }
}
async function readStockSource(url,requests){
 const key=url.pathname.split('/').at(-1),target=stockTarget(key);
 if(!target)return Response.json({error:'Unknown stock probe'},{status:404});
 const observation=await observeListing(target,requests);
 return Response.json({key,sku:target.sku,zone:target.zone,...observation,checkedAt:new Date().toISOString()});
}
export async function collect(at,env,fetcher) {
 const batch=round(at),results=[],requests=new Map();let i=0;
 const retrieve=fetcher||((url)=>readStockSource(url,requests));
 async function next(){while(i<batch.length)results.push(await sampleTarget(batch[i++],env,retrieve))}
 await Promise.all([next(),next()]);
 await persistBatch(env.DB,results);
 if(Math.floor(at/60000)%60===0)await env.DB.prepare('DELETE FROM stock_changes WHERE at < ?').bind(at-retention).run();
}
function json(body,status=200){return Response.json(body,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}})}
function iso(t){return t==null?null:new Date(t).toISOString()}
const publicFeedNames=['lowendtalk','nodeseek','carpool','meow','meowoffers','sb','vpsdeer','vpsts','vpsuu','poorvpsmsg'];
const publicMessagesLife=14*86400000;
const feedPostPatterns={
 lowendtalk:/^https:\/\/lowendtalk\.com\/discussion\/[1-9]\d{0,12}\/[a-z0-9-]+\/?$/i,
 nodeseek:/^https:\/\/(?:www\.)?nodeseek\.com\/post-[1-9]\d{0,14}-[1-9]\d{0,5}\/?$/i,
 meow:/^https:\/\/meowvps\.com\/blog\/[\w%-]+\/$/i,
 sb:/^https:\/\/sb\.sb\/t\/[1-9]\d{0,14}\/?$/i
};
function trustedFeedLink(source,link){
 if(typeof link!=='string'||link.length>800)return false;
 if(source==='carpool')return feedPostPatterns.nodeseek.test(link);
 if(source==='meowoffers')return feedPostPatterns.lowendtalk.test(link)||/^https:\/\/meowvps\.com\/timeline\/\?merchant=[\w%-]{1,280}#offers$/.test(link);
 if(feedPostPatterns[source])return feedPostPatterns[source].test(link);
 return new RegExp('^https://t\\.me/'+source+'/[1-9]\\d{0,13}$','i').test(link);
}
function postText(value,max){
 return typeof value==='string'?value.replace(/[<>\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max):'';
}
function publicPosts(source,rows,now){
 const result=[],seen=new Set();
 for(const post of rows.slice(0,16)){
  const at=Date.parse(post?.date),title=postText(post?.title,230);
  if(!title||!trustedFeedLink(source,post.link)||!Number.isFinite(at)||at<now-publicMessagesLife||at>now+60000)continue;
  const date=new Date(at).toISOString(),id=post.link+' '+date+' '+title;
  if(seen.has(id))continue;
  seen.add(id);
  const coupons=[];
  for(const c of Array.isArray(post.coupons)?post.coupons.slice(0,5):[]){
   if(!c||typeof c.code!=='string'||!/^[A-Za-z0-9][A-Za-z0-9_.-]{1,48}(?:,[A-Za-z0-9][A-Za-z0-9_-]{0,20})?$/.test(c.code))continue;
   const deadline=Date.parse(c.endsAt);
   if(c.endsAt&&(!Number.isFinite(deadline)||deadline<=now))continue;
   const scopeLine=postText(c.scopeLine,220);
   coupons.push({code:c.code,...(c.endsAt?{endsAt:new Date(deadline).toISOString()}:{}),...(scopeLine?{scopeLine}:{})});
  }
  const sourceName=postText(post.sourceName,60);
  result.push({title,link:post.link,date,...(sourceName?{sourceName}:{}),...(typeof post.hostingTitle==='boolean'?{hostingTitle:post.hostingTitle}:{}),...(coupons.length?{coupons}:{})});
  if(result.length===12)break;
 }
 return result;
}
async function limitedFeedResponse(resp){
 if(!resp.ok||!resp.headers.get('content-type')?.includes('application/json')||Number(resp.headers.get('content-length'))>65536)throw Error('Invalid feed response');
 const reader=resp.body.getReader(),decoder=new TextDecoder();let body='',size=0;
 try{
  for(;;){
   const {done,value}=await reader.read();if(done)break;
   size+=value.byteLength;if(size>65536){await reader.cancel();throw Error('Feed response too large')}
   body+=decoder.decode(value,{stream:true});
  }
  return JSON.parse(body+decoder.decode());
 }finally{reader.releaseLock()}
}
export async function collectPublicFeed(at,env,readFeed=fetch){
 const source=publicFeedNames[Math.floor(at/60000)%publicFeedNames.length];
 try{
  const url=new URL('/api/deal-feed/'+source,env.PAGES_ORIGIN);
  url.searchParams.set('background','1');
  const resp=await readFeed(url,{redirect:'manual',signal:AbortSignal.timeout(19000),headers:{accept:'application/json'}});
  const data=await limitedFeedResponse(resp),observed=Date.parse(data.observed),now=Date.now();
  if(data.source!==source||data.stale!==false||data.editionSnapshot||!Array.isArray(data.items)||!Number.isFinite(observed)||observed>now+30000||observed<now-11*60000)return;
  const items=publicPosts(source,data.items,now);
  if(data.items.length&&!items.length)return;
  const payload=JSON.stringify({source,items});
  await env.DB.prepare('INSERT INTO offer_latest(probe,observed_at,payload) VALUES(?,?,?) ON CONFLICT(probe) DO UPDATE SET observed_at=excluded.observed_at,payload=excluded.payload WHERE offer_latest.observed_at<excluded.observed_at AND offer_latest.payload<>excluded.payload')
   .bind('public-feed:'+source,observed,payload).run();
 }catch{ /* The next source and SKU checks proceed independently. */ }
}
async function readPublicFeed(url,env){
 const source=url.searchParams.get('source');
 if(!publicFeedNames.includes(source))return json({error:'Unknown feed'},404);
 const row=await env.DB.prepare('SELECT observed_at,payload FROM offer_latest WHERE probe=?').bind('public-feed:'+source).first();
 const now=Date.now();
 if(!row||row.observed_at<now-publicMessagesLife)return json({source,error:'No recent background snapshot'},404);
 const record=JSON.parse(row.payload);
 if(record.source!==source||!Array.isArray(record.items))return json({source,error:'Feed unavailable'},503);
 return json({source,observed:iso(row.observed_at),items:publicPosts(source,record.items,now),stale:true,backgroundSnapshot:true});
}

export async function read(req,env) {
 const path=new URL(req.url).pathname;
 if(req.method!=='GET')return json({error:'GET required'},405);
 if(path==='/api/stock-history/feed')return readPublicFeed(new URL(req.url),env);
 if(path==='/api/stock-history/health'){
  const row=await env.DB.prepare("SELECT COUNT(*) AS sampled, SUM(current_state IN ('in-stock','sold-out','low')) AS verified, SUM(current_state = 'offline') AS offline, SUM(current_state = 'unreported') AS unreported, MAX(checked_at) AS last, MIN(checked_at) AS oldest FROM stock_latest").first();
  const now=Date.now();
  const threshold=list=>JSON.stringify(Object.fromEntries(list.map(t=>[t.key,now-(cadence(t.key)+2)*60000])));
  const [quoteRows,stockRows,facilityRows]=await env.DB.batch([
   env.DB.prepare('SELECT COUNT(*) AS count, SUM(q.observed_at>=w.value) AS fresh, MAX(q.observed_at) AS last, MIN(q.observed_at) AS oldest FROM json_each(?) w JOIN offer_latest q ON q.probe=w.key').bind(threshold(regularQuoteTargets)),
   env.DB.prepare("SELECT SUM(s.checked_at>=w.value) AS fresh, SUM(s.checked_at>=w.value AND s.current_state IN ('in-stock','sold-out','low')) AS confirmedfresh, MAX(s.checked_at) AS last FROM json_each(?) w JOIN stock_latest s ON s.probe=w.key").bind(threshold(regularStockTargets)),
   env.DB.prepare("SELECT g.observed_at,json_extract(g.payload,'$.summary') AS summary FROM json_each(?) names JOIN offer_latest g ON g.probe=names.value").bind(JSON.stringify([...facilityGroups.keys()]))
  ]);
  const quotes=quoteRows.results[0],stock=stockRows.results[0];
  for(const g of facilityRows.results){
   const s=JSON.parse(g.summary),fresh=g.observed_at>=now-(facilityPeriodMinutes+2)*60000;
   row.sampled=(row.sampled||0)+s.count;row.verified=(row.verified||0)+s.confirmed;row.offline=(row.offline||0)+s.offline;row.unreported=(row.unreported||0)+s.unreported;
   row.last=Math.max(row.last||0,g.observed_at);row.oldest=Math.min(row.oldest||g.observed_at,g.observed_at);stock.last=Math.max(stock.last||0,g.observed_at);
   quotes.count=(quotes.count||0)+s.withOffer;if(s.lastOffer){quotes.last=Math.max(quotes.last||0,s.lastOffer);quotes.oldest=Math.min(quotes.oldest||s.oldestOffer||s.lastOffer,s.oldestOffer||s.lastOffer)}
   if(fresh){quotes.fresh=(quotes.fresh||0)+s.quotes;stock.fresh=(stock.fresh||0)+s.count;stock.confirmedfresh=(stock.confirmedfresh||0)+s.confirmed}
  }
  return json({installed:true,schemaVersion:13,stockTargetCount:stockTargets.length,quoteTargetCount:quoteTargets.length,quoteSampled:quotes?.count||0,lastQuoteAt:iso(quotes?.last),oldestQuoteAt:iso(quotes?.oldest),quoteFresh:Number(quotes?.fresh||0),stockReadingsFresh:Number(stock?.confirmedfresh||0),stockChecksFresh:Number(stock?.fresh||0),lastStockCheckAt:iso(stock?.last),freshWithinMinutes:periodMinutes+2,targetCount:targets.length,periodMinutes,legacyPeriodMinutes,greenPeriodMinutes,mkPeriodMinutes,facilityPeriodMinutes,feedSources:publicFeedNames.length,feedPeriodMinutes:publicFeedNames.length,sampled:Number(row?.sampled||0),verified:Number(row?.verified||0),offline:Number(row?.offline||0),unreported:Number(row?.unreported||0),lastCheckedAt:iso(row?.last),oldestCheckedAt:iso(row?.oldest)});
 }
 const key=path.match(/^\/api\/stock-history\/([A-Za-z0-9-]+)$/)?.[1];
 const t=byKey.get(key);if(!t)return json({error:'Unknown probe'},404);
 if(facilitiesByKey.has(key))return readFacilitySKU(key,t,env);
 const [current,events,quote]=await env.DB.batch([
  env.DB.prepare('SELECT * FROM stock_latest WHERE probe=?').bind(key),
  env.DB.prepare('SELECT at,from_state,to_state FROM stock_changes WHERE probe=? AND at>=? ORDER BY at DESC LIMIT ?').bind(key,Date.now()-retention,rowsPerResponse),
  env.DB.prepare('SELECT observed_at,payload FROM offer_latest WHERE probe=?').bind(key)
 ]);
 const s=current.results[0];
 const q=quote.results[0];
 return json({installed:true,schemaVersion:13,key,sku:t.sku,zone:t.zone,periodMinutes:cadence(key),lastOffer:q?{...JSON.parse(q.payload),checkedAt:iso(q.observed_at)}:null,
  latest:s?{state:s.current_state,checkedAt:iso(s.checked_at),confirmedState:s.confirmed_state,confirmedAt:iso(s.confirmed_at),changedAt:iso(s.changed_at)}:null,
  events:events.results.map(e=>({at:iso(e.at),from:e.from_state,to:e.to_state}))});
}
export default {
 async scheduled(job,env){await Promise.all([collect(job.scheduledTime,env),collectFacilities(job.scheduledTime,env),collectPublicFeed(job.scheduledTime,env)])},
 async fetch(req,env){try{return await read(req,env)}catch{return json({error:'History unavailable'},503)}}
};
