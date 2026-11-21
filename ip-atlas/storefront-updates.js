'use strict';

(() => {
 const date='2026-11-21';
 const words=(sc,tc,en,ja)=>({sc,tc,en,ja});
 const cone='https://www.lightcone.hk/cart';
 const lightGroups=[
  {
   family:'HK',city:'Hong Kong',category:'fid=1&gid=29',routeName:'CMI · AS58453',
   cpuModel:'AMD EPYC 7V13',storage:'SSD',direction:'both',
   rows:[
    [218,'香港Light-AMD-A',2,2,30,150,1000,35],[219,'香港Light-AMD-B',4,4,50,200,1500,70],
    [220,'香港Light-AMD-C',8,8,100,250,2000,100],[221,'香港Light-AMD-D',16,16,200,500,4000,190]
   ]
  },
  {
   family:'DE',city:'',category:'fid=14',routeName:'AS9929',cpuFamily:'AMD EPYC',storage:'NVMe',direction:'both',
   rows:[
    [276,'德国9929 2核 2GB 1G带宽 A型',2,2,60,1000,500,30],[275,'德国9929 2核 4GB 1G带宽 B型',2,4,70,1000,1000,45],
    [277,'德国9929 4核 4GB 1G带宽 C型',4,4,80,1000,1500,60],[279,'德国9929 4核 8GB 1G带宽 D型',4,8,100,1000,2000,85],
    [278,'德国9929 8核 8GB 1G带宽 E型',8,8,120,1000,2500,115],[280,'德国9929 8核 16GB 1G带宽 F型',8,16,160,1000,3000,170],
    [282,'德国9929 16核 16GB 1G带宽 G型',16,16,200,1000,3500,230],[281,'德国9929 16核 32GB 1G带宽 H型',16,32,280,1000,4000,330]
   ]
  },
  {
   family:'GB',city:'',category:'fid=15',routeName:'Dual ISP',cpuModel:'AMD EPYC 7K62',storage:'NVMe',direction:'outbound',
   rows:[
    [316,'英国双ISP住宅云主机 2核 2GB 500Mbps',2,2,40,500,500,45],[317,'英国双ISP住宅云主机 2核 4GB 500Mbps',2,4,50,500,1000,65],
    [315,'英国双ISP住宅云主机 4核 4GB 500Mbps',4,4,60,500,1500,85],[318,'英国双ISP住宅云主机 4核 8GB 500Mbps',4,8,70,500,2000,125],
    [319,'英国双ISP住宅云主机 8核 8GB 500Mbps',8,8,80,500,2500,165],[320,'英国双ISP住宅云主机 8核 16GB 500Mbps',8,16,100,500,3000,245],
    [321,'英国双ISP住宅云主机 16核 16GB 500Mbps',16,16,150,500,3500,325],[322,'英国双ISP住宅云主机 16核 32GB 500Mbps',16,32,200,500,4000,485]
   ]
  }
 ];
 for(const group of lightGroups){
  const market=group.family,proof=cone+'?'+group.category+'&language=chinese_tw';
  const notes={
   HK:words('官网标注三网 CMI 与独享 IPv4。','官網標註三網 CMI 與獨享 IPv4。','The storefront lists CMI across three carriers and dedicated IPv4.','公式ストアでは3キャリアの CMI と専用 IPv4 を案内しています。'),
   DE:words('商家标注三网回程 AS9929。1 Gbps 为突发值，表中为基础配置。','商家標註三網回程 AS9929。1 Gbps 是突發值，表中為基礎配置。','The merchant lists AS9929 on return routes. 1 Gbps is a burst rate. These are the base configurations.','販売元によると復路は3キャリアとも AS9929。1 Gbps はバースト時の速度です。'),
   GB:words('商家标注英国原生、双 ISP 住宅属性及上行流量计费。','商家標註英國原生、雙 ISP 住宅屬性及上行流量計費。','The merchant describes UK dual-ISP residential IPs and metered outbound transfer.','販売元は英国のデュアル ISP 住宅 IP と上り転送量の計測を案内しています。')
  }[market];
  for(const [pid,sku,cores,memory,disk,port,traffic,price] of group.rows){
   const id='lightcone-'+pid;
   const stockTarget={family:'lightcone',pid,sku,zone:market,url:proof};
   catalogStockTargets[id]=stockTarget;
   networkStockTargets[id]=stockTarget;
   PLANS.push({
    id,stockKey:id,provider:'LightCone',market,city:group.city,sku,plan:sku,kind:'vps',ip:market==='GB'?'isp':'unknown',
    route:market==='GB'?'unknown':'claimed',routeName:group.routeName,carriers:[],url:proof,proof,notes,
    searchTerms:['光锥云','光錐雲','LightCone Cloud','lightcone.hk'],
    spec:{sku,price:price.toFixed(2),currency:'CNY',term:'month',priceType:'official',date,proof,
     cpu:cores+' vCPU',cpuModel:group.cpuModel,cpuFamily:group.cpuFamily,cpuModelScope:'official',cpuModelSource:proof,cpuModelDate:date,
     ram:memory+' GB'+(market==='HK'?' DDR4':''),disk:disk+' GB '+group.storage,
     port:port===1000?'1 Gbps':port+' Mbps',traffic:traffic+' GB',trafficDirection:group.direction}
   });
  }
 }
 const taipeiPricing='https://vps.taipei/#pricing';
 const taipeiRegions='https://vps.taipei/#regions';
 const provider='VPS.TAIPEI (Taipei101)';
 const flags=words('区域与资源影响实际报价。标准 VPS 不含企业 IEPL。','區域與資源影響實際報價。標準 VPS 不含企業 IEPL。','The quote depends on region and resources. Enterprise IEPL is separate from standard VPS service.','料金は地域と構成によります。企業向け IEPL は標準 VPS とは別サービスです。');
 for(const [id,city,region] of [['houston','Houston','HOU3 / HOU4'],['texas','Texas','TEX1'],['dfw','Dallas–Fort Worth','DFW1']]){
  const sku=region+' · configurable KVM';
  PLANS.push({id:'t101-config-'+id,provider,market:'US',city,sku,plan:sku,kind:'vps',ip:'unknown',route:'unknown',routeName:'',carriers:[],
   url:'https://vps.taipei/customer/vms/new',proof:taipeiRegions,notes:flags,spec:{sku,proof:taipeiRegions,date}});
 }
 const baseSku='KVM · 4 vCPU / 8 GB / 100 GB';
 const baseNote=words('官网计算器以默认配置示范 USD 12.80/月的基础估算。机房、加购与实际费用在部署时确认。','官網計算器以預設配置示範 USD 12.80／月的基礎估算。機房、加購與實際費用在部署時確認。','The official calculator gives a USD 12.80 monthly base estimate for this example. Check the region and add-ons before deploying.','公式計算機の構成例は月額 12.80 USD。拠点・追加項目・実際の料金は注文時にご確認ください。');
 PLANS.push({id:'t101-kvm-base-example',provider,market:'US',city:'',sku:baseSku,plan:baseSku,kind:'vps',ip:'unknown',route:'unknown',routeName:'',carriers:[],
  url:taipeiPricing,proof:taipeiPricing,notes:baseNote,spec:{sku:baseSku,proof:taipeiPricing,date,price:'12.80',currency:'USD',term:'month',
   priceType:'base-estimate',cpu:'4 vCPU',ram:'8 GB',disk:'100 GB NVMe'}});

 const nnb='https://nnb.ltd/#pricing';
 const nnbNotes=words('节点 API 当前开放月付。首页介绍的按小时计价需看各节点是否启用。','節點 API 目前開放月付。首頁介紹的按時計價需看各節點是否啟用。','The public node API currently lists monthly ordering. Hourly billing described on the homepage depends on the node.','公開ノード API では現在月額注文を受付中です。時間課金はノードごとの対応状況をご確認ください。');
 for(const id of ['nnb-2','nnb-3','nnb-5']){
  const plan=PLANS.find(p=>p.id===id);
  if(plan){
   plan.terms=nnb;
   const previous=plan.notes;
   plan.notes=Object.fromEntries(Object.entries(nnbNotes).map(([language,note])=>[
    language,[typeof previous==='string'?previous:previous?.[language]||previous?.en,note].filter(Boolean).join(' ')
   ]));
  }
 }
 const rfcPricing='https://www.rfchost.com/#pricing';
 for(const id of [160,161,163]){
  const plan=PLANS.find(p=>p.id==='project-edge-rfc-'+id);
  if(plan){plan.terms=rfcPricing;plan.spec.trafficDirection='both';plan.spec.monthlyTraffic=plan.spec.traffic}
 }
})();
