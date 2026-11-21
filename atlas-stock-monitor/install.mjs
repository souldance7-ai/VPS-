import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
process.chdir(dirname(fileURLToPath(import.meta.url)));
const cfg=JSON.parse(fs.readFileSync('wrangler.template.json','utf8'));
const name=cfg.d1_databases[0].database_name;
function cli(args,output=false){
 const win=process.platform==='win32';
 const tokens=['--yes','wrangler@4',...args];
 if(win&&!tokens.every(s=>/^[A-Za-z0-9.@_-]+$/.test(s)))throw Error('Unexpected CLI token');
 const p=win?spawnSync('cmd.exe',['/d','/s','/c','npx.cmd '+tokens.join(' ')],{stdio:output?['inherit','pipe','inherit']:'inherit',encoding:'utf8'}):spawnSync('npx',tokens,{stdio:output?['inherit','pipe','inherit']:'inherit',encoding:'utf8'});
 if(p.error||p.status!==0)throw Error('Wrangler '+args[0]+' failed. '+(p.error?.message||'检查 Cloudflare 登录及账户权限。'));
 return p.stdout||'';
}
function findDb(){
 const result=JSON.parse(cli(['d1','list','--json'],true));
 const matches=result.filter(x=>x.name===name);
 if(matches.length>1)throw Error('多个同名数据库。请选择正确的 Cloudflare 账户。');
 return matches[0]?.uuid;
}
async function confirmPublicMonitor(){
 const expected=JSON.parse(fs.readFileSync('targets.json','utf8')).length;
 const healthUrl='https://ip-guide.pitopone.com/api/stock-history/health';
 for(let attempt=0;attempt<4;attempt++){
  try{
   const r=await fetch(healthUrl,{cache:'no-store',signal:AbortSignal.timeout(4500)});
   if(r.ok){
    const report=await r.json();
    if(report.installed&&report.schemaVersion===13&&report.targetCount===expected){
     console.log('公网已确认新版采集器。共 '+report.targetCount+' 个目标，'+report.stockTargetCount+' 个库存目标，'+report.quoteTargetCount+' 个报价目标，轮巡约 '+report.periodMinutes+' 分钟。');
     console.log('当前时间窗有效库存 '+report.stockReadingsFresh+' / '+report.stockTargetCount+'，有效报价 '+report.quoteFresh+' / '+report.quoteTargetCount+'。新目标会在下一轮采集逐步出现。');
     return;
    }
   }
  }catch{}
  if(attempt<3)await new Promise(resolve=>setTimeout(resolve,2500));
 }
 console.log('Cloudflare 已接收 Worker 部署。公网状态可能正在传播，请稍后在「近期优惠 → 后台采集状态」查看目标数 '+expected+'。');
}
async function main(){
 let found=false;
 for(let attempt=0;attempt<8&&!found;attempt++){
  try{
   const response=await fetch(new URL('/api/stock/nnb-2',cfg.vars.PAGES_ORIGIN),{signal:AbortSignal.timeout(10000)});
   const data=await response.json();
   found=response.ok&&data.key==='nnb-2'&&data.zone==='JP'&&data.sku==='TY #2 Performance'&&data.schemaVersion===13;
  }catch{}
  if(!found&&attempt<7)await new Promise(resolve=>setTimeout(resolve,5000));
 }
 if(!found)throw Error('V13 网页尚未在 Pages 生产域名生效。确认网页部署成功后，在完整包目录运行 deploy.cmd monitor。');
 console.log('将升级 '+cfg.name+'，连接现有历史数据库 '+name+'，更新 '+cfg.routes[0].pattern);
 cli(['whoami']);
 const id=findDb();
 if(!id)throw Error('当前 Cloudflare 账户没有 历史监控使用的 pitopone-stock-history 数据库。请使用已部署库存历史监控器的账户，再运行 deploy.cmd monitor。首次安装需要单独准备数据库及 V10 数据表。');
 if(!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id||''))throw Error('无法读取数据库标识，请确认账户。');
 cfg.d1_databases[0].database_id=id;
 fs.writeFileSync('wrangler.json',JSON.stringify(cfg,null,2));
 cli(['d1','execute',name,'--remote','--file','schema.sql','--config','wrangler.json']);
 cli(['deploy','--config','wrangler.json']);
 await confirmPublicMonitor();
 console.log('部署成功。打开 https://ip-guide.pitopone.com/api/stock-history/health 查看采集进度。');
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
