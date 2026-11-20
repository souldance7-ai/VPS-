'use strict';
for(const p of PLANS){if(p.provider==='POWOKE')p.provider='Powoke'}
const regionalPlans=[
 ['sao','BR','São Paulo','7.50'],['scl','CL','Santiago','5'],['jnb','ZA','Johannesburg','5'],
 ['mel','AU','Melbourne','5'],['sto','SE','Stockholm','5'],['waw','PL','Warsaw','5'],
 ['mad','ES','Madrid','5'],['mex','MX','Mexico City','5'],['blr','IN','Bangalore','5'],['tlv','IL','Tel Aviv','5']
];
const globalLanguages={sc:'zh-CN',tc:'zh-TW',en:'en',ja:'ja'};
const globalRegions={countriesN:['国家或地区','國家或地區','Countries & territories','国・地域'],africa:['非洲','非洲','Africa','アフリカ'],oceania:['大洋洲','大洋洲','Oceania','オセアニア'],southamerica:['南美','南美','South America','南米']};
for(const [key,labels] of Object.entries(globalRegions))editionLangs.forEach((language,i)=>WORDS[language][key]=labels[i]);
for(const [region,code,city,monthly] of regionalPlans){
 if(!MARKETS[code])MARKETS[code]=Object.fromEntries(Object.entries(globalLanguages).map(([key,tag])=>[key,new Intl.DisplayNames([tag],{type:'region'}).of(code)]));
 const url='https://www.vultr.com/products/regular-performance-compute/',id='vultr-v10-'+region;
 const notes={sc:'按区域核对可部署型号。每月 1,024 GB 是流量额度，套餐接口另列小时计费。',tc:'依區域核對可部署型號。每月 1,024 GB 是流量額度，方案介面另列小時計費。',en:'The regional API lists deployable models. The 1,024 GB figure is a monthly transfer allowance. Hourly billing is listed separately.',ja:'地域別 API で作成可能な構成を確認できます。1,024 GB は月間転送枠で、時間単価は別途掲載されています。'};
 PLANS.push({id,stockKey:id,market:code,city,provider:'Vultr',plan:'Cloud Compute · vc2-1c-1gb',kind:'vps',ip:'unknown',route:'unknown',routeName:'',carriers:[],url,notes,proof:'https://api.vultr.com/v2/regions/'+region+'/availability?type=vc2',
 spec:{sku:'vc2-1c-1gb · '+region.toUpperCase(),price:monthly,currency:'USD',term:'month',cpu:'1 vCPU · Intel',ram:'1 GB',disk:'25 GB SSD',traffic:'1,024 GB',date:'2026-11-20',proof:'https://api.vultr.com/v2/plans?type=vc2&per_page=500'},searchTerms:[region,'vc2-1c-1gb']});
}
