import registry from './merchant-storefronts.json' with {type:'json'};
import {readStorefront,storefrontUrl} from './merchant-parser.mjs';

const storefronts=new Map(registry.map(entry=>[entry.name,entry]));
const minute=60_000;
const slowPeriod=12*60*minute;
const fastPeriod=20*minute;
const searchPeriod=24*60*minute;
const retryPeriod=45*minute;
const maxPages=100;

export function catalogId(vendor,url,adapter,key){
 const siteKey=adapter==='whmcs'&&key.startsWith('pid:')||adapter==='jsonld'&&/^(?:sku|product):/.test(key);
 const identity=siteKey?new URL(url).hostname.replace(/^www\./,''):url;
 let hash=0xcbf29ce484222325n;
 for(const ch of vendor+'\n'+identity+'\n'+key)hash=BigInt.asUintN(64,(hash^BigInt(ch.codePointAt(0)))*0x100000001b3n);
 return 'official-'+hash.toString(16).padStart(16,'0');
}
export function normalizedProducts(vendor,page,at){
 const map=new Map();
 for(const item of page.items.slice(0,120)){
  const id=catalogId(vendor,page.canonical,page.adapter,item.key);
  if(!map.has(id))map.set(id,{...item,id,provider:vendor,source:page.canonical,observedAt:new Date(at).toISOString()});
 }
 return [...map.values()];
}
async function insertPages(db,rows){
 if(!rows.length)return;
 await db.prepare(`INSERT OR IGNORE INTO merchant_catalog_pages(vendor,url,depth,priority,due_at,status)
  SELECT json_extract(value,'$[0]'),json_extract(value,'$[1]'),json_extract(value,'$[2]'),
   json_extract(value,'$[3]'),json_extract(value,'$[4]'),'pending' FROM json_each(?)`).bind(JSON.stringify(rows)).run();
}
export async function seedMerchantCatalog(db,at){
 const rows=registry.flatMap(entry=>entry.seeds.map(u=>[entry.name,u,0,entry.priority?1:0,at]));
 await insertPages(db,rows);
}
function nextCheck(entry,page,at,failed,streak=0){
 if(failed)return at+(entry.priority&&streak<3?retryPeriod:streak<3?3*60*minute:searchPeriod);
 if(!page.items.length)return at+searchPeriod;
 return at+(entry.priority?fastPeriod:slowPeriod);
}
async function addFound(db,target,entry,urls,at){
 if(!urls.length||target.depth>=3)return;
 const {results}=await db.prepare('SELECT url FROM merchant_catalog_pages WHERE vendor=?').bind(target.vendor).all();
 const known=new Set(results.map(row=>row.url)),space=maxPages-known.size;
 if(space<=0)return;
 const depth=target.depth+1,source=target.url;
 const valid=[...new Set(urls.map(u=>storefrontUrl(u,source,entry.hosts)))].filter(u=>u&&!known.has(u));
 await insertPages(db,valid.slice(0,space).map(url=>[entry.name,url,depth,entry.priority?1:0,at]));
}
async function updatePage(db,target,entry,at,fetcher){
 let found;
 try{found=await readStorefront(target.url,entry,fetcher)}
 catch(e){
  const error=/^(blocked|large-page|unsupported-url|redirect|http-\d+)$/.test(e.message)?e.message:'unavailable';
  await db.prepare(`UPDATE merchant_catalog_pages SET checked_at=?,status=?,due_at=?,failures=failures+1
   WHERE vendor=? AND url=? AND checked_at<?`).bind(at,error,nextCheck(entry,null,at,true,target.failures),target.vendor,target.url,at).run();
  return;
 }
 const plans=normalizedProducts(target.vendor,found,at);
 let status=plans.length?(found.complete?'products':'partial'):found.links.length?'discovered':'unsupported';
 const due=nextCheck(entry,found,at,false);
 if(found.complete&&plans.length){
  await db.prepare(`UPDATE merchant_catalog_pages SET checked_at=?,status=?,due_at=?,failures=0,observed_at=?,payload=?
   WHERE vendor=? AND url=? AND checked_at<?`).bind(at,status,due,at,JSON.stringify(plans),target.vendor,target.url,at).run();
 }else if(plans.length){
  const previous=JSON.parse(target.payload||'[]');
  const merged=new Map(previous.map(p=>[p.id,p]));
  for(const p of plans)merged.set(p.id,p);
  await db.prepare(`UPDATE merchant_catalog_pages SET checked_at=?,status=?,due_at=?,failures=0,observed_at=?,payload=?
   WHERE vendor=? AND url=? AND checked_at<?`).bind(at,status,due,at,JSON.stringify([...merged.values()]),target.vendor,target.url,at).run();
 }else{
  await db.prepare(`UPDATE merchant_catalog_pages SET checked_at=?,status=?,due_at=?,failures=0
   WHERE vendor=? AND url=? AND checked_at<?`).bind(at,status,due,target.vendor,target.url,at).run();
 }
 await addFound(db,target,entry,found.links,at);
}
export async function collectMerchantCatalog(at,env,fetcher=fetch){
 const db=env.DB;
 const seeded=await db.prepare('SELECT 1 AS seeded FROM merchant_catalog_pages LIMIT 1').first();
 if(!seeded||Math.floor(at/minute)%1440===0)await seedMerchantCatalog(db,at);
 const [hot,regular]=await db.batch([
  db.prepare('SELECT * FROM merchant_catalog_pages WHERE priority=1 AND due_at<=? ORDER BY due_at,depth,url LIMIT 2').bind(at),
  db.prepare(`SELECT * FROM (SELECT *,row_number() OVER(PARTITION BY vendor ORDER BY due_at,depth,url) AS turn
   FROM merchant_catalog_pages WHERE priority=0 AND due_at<=?) WHERE turn=1 ORDER BY due_at,depth,url LIMIT 5`).bind(at)
 ]);
 const used=new Set();
 const batch=[...hot.results,...regular.results].filter(row=>{
  const identity=row.priority?row.url:new URL(row.url).hostname;
  if(used.has(identity)||!storefronts.has(row.vendor))return false;
  used.add(identity);return true;
 });
 return Promise.allSettled(batch.map(row=>updatePage(db,row,storefronts.get(row.vendor),at,fetcher)));
}

export async function readMerchantCatalog(req,env){
 const url=new URL(req.url),vendor=url.searchParams.get('vendor');
 const metaOnly=url.pathname.endsWith('/health');
 if(vendor&&!storefronts.has(vendor))return Response.json({error:'Unknown merchant'},{status:404});
 const where=vendor?' WHERE vendor=?':'';
 const select=fields=>{
  const query=env.DB.prepare('SELECT '+fields+' FROM merchant_catalog_pages'+where+(fields.includes('payload')?' ORDER BY observed_at DESC':''));
  return vendor?query.bind(vendor):query;
 };
 const columns='vendor,url,status,checked_at,observed_at';
 const {results}=await select(metaOnly?columns:columns+',payload').all();
 const now=Date.now(),providers=Object.fromEntries(registry.filter(row=>!vendor||row.name===vendor).map(row=>[
  row.name,{pages:0,checked:0,productPages:0,blocked:0,unavailable:0,unsupported:0,plans:0,checkedAt:null,observedAt:null,
   periodMinutes:(row.priority?fastPeriod:slowPeriod)/minute,source:row.seeds[0]||null}
 ]));
 const plans=new Map();
 for(const row of results){
  if(!Object.hasOwn(providers,row.vendor))continue;
  const info=providers[row.vendor];
  info.pages++;
  if(row.checked_at){info.checked++;if(!info.checkedAt||row.checked_at>info.checkedAt)info.checkedAt=row.checked_at}
  if(row.observed_at){info.productPages++;if(!info.observedAt||row.observed_at>info.observedAt)info.observedAt=row.observed_at}
  if(row.status==='blocked')info.blocked++;
  else if(row.status==='unsupported')info.unsupported++;
  else if(/^(?:http-|unavailable|redirect|large-page|unsupported-url)/.test(row.status))info.unavailable++;
  if(metaOnly||!row.payload)continue;
  const stale=row.status!=='products'&&row.status!=='partial'||now-row.observed_at>(info.periodMinutes*2+5)*minute;
  for(const plan of JSON.parse(row.payload)){
   const previous=plans.get(plan.id);
   const planStale=stale||now-Date.parse(plan.observedAt)>(info.periodMinutes*2+5)*minute;
   if(!previous||previous.stale&&!planStale)plans.set(plan.id,{...plan,stale:planStale});
  }
 }
 for(const plan of plans.values())providers[plan.provider].plans++;
 for(const info of Object.values(providers)){
  if(info.checkedAt)info.checkedAt=new Date(info.checkedAt).toISOString();
  if(info.observedAt)info.observedAt=new Date(info.observedAt).toISOString();
 }
 const body={schemaVersion:1,generatedAt:new Date(now).toISOString(),vendor,providers,...(metaOnly?{}:{plans:[...plans.values()]})};
 return Response.json(body,{headers:{'Cache-Control':'no-store','Cloudflare-CDN-Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
