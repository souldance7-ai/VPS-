import targets from './targets.json' with { type: 'json' };
import {stockTarget,observe} from './stock-source.mjs';

const LIMIT = 6;
const byKey = new Map(targets.map(t => [t.key,t]));
const periodMinutes = Math.ceil(targets.length / LIMIT);
const stable = new Set(['in-stock','sold-out','low']);
const states = new Set([...stable,'offline','unreported']);
const rowsPerResponse = 12;
const retention = 30 * 86400000;

export function round(at) {
 const shard = Math.floor(at / 60000) % periodMinutes;
 return targets.filter((_,i) => i % periodMinutes === shard);
}

// Both statements execute in one D1 transaction. Previous successful stock survives
// an unavailable vendor, and duplicate/delayed observations cannot roll time backwards.
const eventSql = 'INSERT OR IGNORE INTO stock_changes(probe, at, from_state, to_state) SELECT probe, ?2, confirmed_state, ?3 FROM stock_latest WHERE probe=?1 AND checked_at<?2 AND confirmed_state IS NOT NULL AND ?4=1 AND confirmed_state<>?3';
const upsertSql = [
 'INSERT INTO stock_latest(probe,checked_at,current_state,confirmed_state,confirmed_at,changed_at)',
 'VALUES(?1,?2,?3,CASE WHEN ?4=1 THEN ?3 END,CASE WHEN ?4=1 THEN ?2 END,NULL)',
 'ON CONFLICT(probe) DO UPDATE SET checked_at=excluded.checked_at, current_state=excluded.current_state,',
 'changed_at=CASE WHEN ?4=1 AND stock_latest.confirmed_state IS NOT NULL AND stock_latest.confirmed_state<>?3 THEN ?2 ELSE stock_latest.changed_at END,',
 'confirmed_state=COALESCE(excluded.confirmed_state,stock_latest.confirmed_state), confirmed_at=COALESCE(excluded.confirmed_at,stock_latest.confirmed_at)',
 'WHERE stock_latest.checked_at<excluded.checked_at'
].join(' ');
export async function persist(db, sample) {
 const args = [sample.key,sample.at,sample.state,stable.has(sample.state)?1:0];
 return db.batch([db.prepare(eventSql).bind(...args),db.prepare(upsertSql).bind(...args)]);
}
async function sampleTarget(target, env, fetcher) {
 const started=Date.now();
 try {
  const url=new URL('/api/stock/'+target.key,env.PAGES_ORIGIN);
  const resp=await fetcher(url,{signal:AbortSignal.timeout(12000), redirect:'error'});
  if(!resp.ok||!resp.headers.get('content-type')?.includes('application/json'))throw Error('endpoint');
  const data=await resp.json(),at=Date.parse(data.checkedAt),age=Date.now()-at;
  if(data.key!==target.key||data.sku!==target.sku||data.zone!==target.zone||!states.has(data.state)||!Number.isFinite(at)||age< -30000||age>300000)throw Error('invalid snapshot');
  return {key:target.key,state:data.state,at};
 } catch { return {key:target.key,state:'offline',at:started}; }
}
async function readStockSource(url){
 const key=url.pathname.split('/').at(-1),target=stockTarget(key);
 if(!target)return Response.json({error:'Unknown stock probe'},{status:404});
 const state=await observe(target);
 return Response.json({key,sku:target.sku,zone:target.zone,state,checkedAt:new Date().toISOString()});
}
export async function collect(at,env,fetcher=readStockSource) {
 const batch=round(at);let i=0;
 async function next(){while(i<batch.length){const result=await sampleTarget(batch[i++],env,fetcher);await persist(env.DB,result)}}
 await Promise.all([next(),next()]);
 if(Math.floor(at/60000)%60===0)await env.DB.prepare('DELETE FROM stock_changes WHERE at < ?').bind(at-retention).run();
}
function json(body,status=200){return Response.json(body,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}})}
function iso(t){return t==null?null:new Date(t).toISOString()}
export async function read(req,env) {
 const path=new URL(req.url).pathname;
 if(req.method!=='GET')return json({error:'GET required'},405);
 if(path==='/api/stock-history/health'){
  const row=await env.DB.prepare("SELECT COUNT(*) AS sampled, SUM(current_state IN ('in-stock','sold-out','low')) AS verified, SUM(current_state = 'offline') AS offline, SUM(current_state = 'unreported') AS unreported, MAX(checked_at) AS last, MIN(checked_at) AS oldest FROM stock_latest").first();
  return json({installed:true,targetCount:targets.length,periodMinutes,sampled:Number(row?.sampled||0),verified:Number(row?.verified||0),offline:Number(row?.offline||0),unreported:Number(row?.unreported||0),lastCheckedAt:iso(row?.last),oldestCheckedAt:iso(row?.oldest)});
 }
 const key=path.match(/^\/api\/stock-history\/([A-Za-z0-9-]+)$/)?.[1];
 const t=byKey.get(key);if(!t)return json({error:'Unknown probe'},404);
 const [current,events]=await env.DB.batch([
  env.DB.prepare('SELECT * FROM stock_latest WHERE probe=?').bind(key),
  env.DB.prepare('SELECT at,from_state,to_state FROM stock_changes WHERE probe=? AND at>=? ORDER BY at DESC LIMIT ?').bind(key,Date.now()-retention,rowsPerResponse)
 ]);
 const s=current.results[0];
 return json({installed:true,key,sku:t.sku,zone:t.zone,periodMinutes,
  latest:s?{state:s.current_state,checkedAt:iso(s.checked_at),confirmedState:s.confirmed_state,confirmedAt:iso(s.confirmed_at),changedAt:iso(s.changed_at)}:null,
  events:events.results.map(e=>({at:iso(e.at),from:e.from_state,to:e.to_state}))});
}
export default {
 async scheduled(job,env){await collect(job.scheduledTime,env)},
 async fetch(req,env){try{return await read(req,env)}catch{return json({error:'History unavailable'},503)}}
};
