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
async function main(){
 const sample=await fetch(new URL('/api/stock/gc-sg-prem-mini',cfg.vars.PAGES_ORIGIN),{signal:AbortSignal.timeout(15000)});
 const body=await sample.json();
 if(!sample.ok||body.key!=='gc-sg-prem-mini'||body.zone!=='SG')throw Error('请先将 V7 或更新版网站 ZIP 部署到 pitopone-ip-atlas 的生产环境。');
 console.log('将配置 '+cfg.name+'、历史数据库 '+name+' 及 '+cfg.routes[0].pattern);
 cli(['whoami']);
 let id=findDb();
 if(!id){cli(['d1','create',name]);id=findDb();}
 if(!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id||''))throw Error('无法读取数据库标识，请确认账户。');
 cfg.d1_databases[0].database_id=id;
 fs.writeFileSync('wrangler.json',JSON.stringify(cfg,null,2));
 cli(['d1','execute',name,'--remote','--config','wrangler.json','--file','schema.sql','--yes']);
 cli(['deploy','--config','wrangler.json']);
 console.log('部署成功。打开 https://ip-guide.pitopone.com/api/stock-history/health 查看采集进度。');
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
