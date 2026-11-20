// MHYIDC official product cards. Physical market and family-specific IP attributes are independent.
(() => {
  const catalog = {
"bgp-9929": [
  {"pid":64,"sku":"德国BGP-512M","price":17.99,"term":"month","cpu":1,"ram":512,"disk":10,"port":500,"allowance":"500 GB","path":"de-guo-bgp-yu-shou-kuan-512m"},
  {"pid":56,"sku":"德国BGP-1024M","price":35.9,"term":"month","cpu":1,"ram":1024,"disk":15,"port":500,"allowance":"1000 GB","path":"deyusyushyushouyushou"},
  {"pid":59,"sku":"德国BGP-2048M","price":71.8,"term":"month","cpu":2,"ram":2048,"disk":20,"port":500,"allowance":"2000 GB","path":"de-guo-bgp-yu-shou-kuan-2048m"},
  {"pid":60,"sku":"德国BGP-4096M","price":143.6,"term":"month","cpu":4,"ram":4096,"disk":40,"port":500,"allowance":"4000 GB","path":"de-guo-bgp-yu-shou-kuan-4096m"},
  {"pid":67,"sku":"德国BGP-年付-512M","price":179.99,"term":"year","cpu":1,"ram":512,"disk":10,"port":500,"allowance":"500 GB","path":"de-guo-bgp-nian-fu-512m"},
  {"pid":57,"sku":"德国BGP-年付1024M","price":359.99,"term":"year","cpu":1,"ram":1024,"disk":15,"port":500,"allowance":"1000 GB","path":"de-guo-bgp-9929-nian-fu-yu-shou"},
  {"pid":58,"sku":"德国BGP-年付2048M","price":718.99,"term":"year","cpu":2,"ram":2048,"disk":20,"port":500,"allowance":"2000 GB","path":"de-guo-bgp-yu-shou-kuan-nian-fu-2"},
  {"pid":62,"sku":"德国BGP-年付4096M","price":1436.99,"term":"year","cpu":4,"ram":4096,"disk":40,"port":500,"allowance":"4000 GB","path":"de-guo-bgp-9929-yu-shou-kuan-nian-fu-4096m"},
  {"pid":63,"sku":"德国独享-100M","price":1259.99,"term":"month","cpu":4,"ram":4096,"disk":40,"port":100,"allowance":"","path":"de-guo-du-xiang-100m"}
],
"hk-vps": [
  {"pid":30,"sku":"HK BGP - 512M","price":19.99,"term":"month","cpu":1,"ram":512,"disk":20,"port":1000,"allowance":"1000 GB","path":"hk-bgp"},
  {"pid":31,"sku":"HK BGP - 1024M","price":33.99,"term":"month","cpu":1,"ram":1024,"disk":40,"port":1000,"allowance":"2000 GB","path":"hk-vps-1024m"},
  {"pid":32,"sku":"HK BGP - 2048M","price":65.99,"term":"month","cpu":2,"ram":2048,"disk":60,"port":1000,"allowance":"4000 GB","path":"hk-bgp-2048m"},
  {"pid":33,"sku":"HK BGP - 4096M","price":119.99,"term":"month","cpu":4,"ram":4096,"disk":80,"port":1000,"allowance":"8000 GB","path":"hk-bgp-4096m"}
],
"tw-hkg": [
  {"pid":46,"sku":"TW-HKG - 512M","price":12.99,"term":"month","cpu":1,"ram":512,"disk":10,"port":1000,"allowance":"1000 GB","path":"tw-hkg-512"},
  {"pid":47,"sku":"TW-HKG - 1024M","price":25.99,"term":"month","cpu":2,"ram":1024,"disk":20,"port":1000,"allowance":"2000 GB","path":"tw-hkg-1024m"},
  {"pid":48,"sku":"TW-HKG - 2048M","price":49.99,"term":"month","cpu":2,"ram":2048,"disk":40,"port":1000,"allowance":"4000 GB","path":"tw-hkg-2048m"},
  {"pid":49,"sku":"TW-HKG - 4096M","price":99.99,"term":"month","cpu":4,"ram":4096,"disk":40,"port":1000,"allowance":"8000 GB","path":"tw-hkg-4096m"}
],
"mo-hkg": [
  {"pid":52,"sku":"MO-HKG - 512M","price":15.99,"term":"month","cpu":1,"ram":512,"disk":10,"port":1000,"allowance":"1000 GB","path":"mo-hkg-512m"},
  {"pid":53,"sku":"MO-HKG - 1024M","price":29.99,"term":"month","cpu":2,"ram":1024,"disk":20,"port":1000,"allowance":"2000 GB","path":"mo-hkg-1024m"},
  {"pid":54,"sku":"MO-HKG - 2048M","price":57.99,"term":"month","cpu":2,"ram":2048,"disk":40,"port":1000,"allowance":"4000 GB","path":"mo-hkg-2048m"},
  {"pid":55,"sku":"MO-HKG - 4096M","price":109.99,"term":"month","cpu":4,"ram":4096,"disk":80,"port":1000,"allowance":"8000 GB","path":"mo-hkg-4096m"}
],
"hkbgp": [
  {"pid":24,"sku":"HK IPV6 - 512M","price":8.99,"term":"month","cpu":1,"ram":512,"disk":5,"port":1000,"allowance":"1000 GB","path":"hk-ipv6-256m"},
  {"pid":25,"sku":"HK IPV6 - 1024M","price":16.99,"term":"month","cpu":1,"ram":1024,"disk":10,"port":1000,"allowance":"2000 GB","path":"hk-ipv6-512m"},
  {"pid":26,"sku":"HK IPV6 - 2048M","price":32.99,"term":"month","cpu":2,"ram":2048,"disk":20,"port":1000,"allowance":"4000 GB","path":"hk-ipv6-1024m"},
  {"pid":27,"sku":"HK IPV6 - 4096M","price":67.99,"term":"month","cpu":4,"ram":4096,"disk":30,"port":1000,"allowance":"8000 GB","path":"hk-ipv6-2048m"}
],
"ipv6": [
  {"pid":35,"sku":"英国 IPV6 - 256M","price":4.99,"term":"month","cpu":1,"ram":256,"disk":3,"port":1000,"allowance":"1000 GB","path":"ying-guo-ipv6-512m","forwardPorts":10},
  {"pid":36,"sku":"英国 IPV6 - 512M","price":5.99,"term":"month","cpu":1,"ram":512,"disk":5,"port":1000,"allowance":"3000 GB","path":"ying-guo-ipv6-512m-1","forwardPorts":10},
  {"pid":37,"sku":"英国 IPV6 - 1024M","price":9.99,"term":"month","cpu":2,"ram":1024,"disk":10,"port":1000,"allowance":"5000 GB","path":"ying-guo-ipv6-1024m","forwardPorts":20},
  {"pid":38,"sku":"英国 IPV6 - 2048M","price":19.99,"term":"month","cpu":2,"ram":2048,"disk":20,"port":1000,"allowance":"10000 GB","path":"ying-guo-ipv6-2048m","forwardPorts":30},
  {"pid":40,"sku":"英国 IPV6 - 4096M","price":36.99,"term":"month","cpu":4,"ram":4096,"disk":20,"port":1000,"allowance":"15000 GB","path":"ying-guo-ipv6-4096m","forwardPorts":50}
],
"nateu": [
  {"pid":42,"sku":"土耳其-NAT","price":4.99,"term":"month","cpu":2,"ram":2048,"disk":3,"port":1000,"allowance":"5 TB","path":"tu-er-qi-nat","storage":"SSD"},
  {"pid":5,"sku":"荷兰-NAT","price":1.99,"term":"month","cpu":0.4,"ram":256,"disk":10,"port":1000,"allowance":"2 TB","path":"hetzner-nat","storage":""}
],
"huo-dong": [
  {"pid":51,"sku":"香港BGP - 新年特别款","price":139.99,"term":"year","cpu":4,"ram":4096,"disk":80,"port":1000,"allowance":"1000 GB","path":"xiang-gang-bgp-xin-nian-te-bie-kuan"}
]
};
  const checked = '2026-11-20';
  const provider = 'MHYIDC';
  const localized = (sc,tc,en,ja) => ({sc,tc,en,ja});
  const hkAddress=localized('1 个香港 IPv4 及香港 IPv6 /64。共享端口，流量按进出合计。','1 個香港 IPv4 及香港 IPv6 /64。共用連接埠，流量按進出合計。','One Hong Kong IPv4 and a Hong Kong IPv6 /64. Shared port with combined inbound and outbound transfer.','香港 IPv4 1 個と香港 IPv6 /64。ポート共有、転送量は送受信合計です。');
  const taiwan=localized('机房在香港。IPv4 标示台湾归属地。标配的原生台湾 IPv6 为 /128；另可申请广播台湾 IPv6 /64。商家明确列为无大陆优化。','機房在香港。IPv4 標示臺灣歸屬地。標配的原生臺灣 IPv6 為 /128，另可申請廣播臺灣 IPv6 /64。商家明列無大陸優化。','Hosted in Hong Kong. The vendor lists a Taiwan-geolocated IPv4 and an included native Taiwan IPv6 /128. A broadcast Taiwan IPv6 /64 is optional. The vendor lists no mainland optimization.','香港設置。IPv4 の位置情報は台湾、標準 IPv6 は台湾ネイティブの /128。別途台湾広報の IPv6 /64 を追加できます。中国本土向け最適化の提供はありません。');
  const macao=localized('机房在香港，标配澳门归属地 IPv4 和澳门 IPv6 /64。澳门家宽出口只适用于商家白名单域名。商家明列无大陆优化。','機房在香港，標配澳門歸屬地 IPv4 和澳門 IPv6 /64。澳門家寬出口僅適用於商家白名單網域。商家明列無大陸優化。','Hosted in Hong Kong, with Macao-geolocated IPv4 and a Macao IPv6 /64. Residential egress is limited to allowlisted domains. No mainland optimization is advertised.','香港設置、マカオの IPv4 位置情報とマカオ IPv6 /64。家庭回線出口の適用は指定ドメインのみ。中国本土向け最適化の提供はありません。');
  const dede=localized('标配德国原生 IPv4 和德国原生 IPv6 /64。商家列出三网直连，AS9929 为尽力提供，未分别列出去程与回程。','標配德國原生 IPv4 和德國原生 IPv6 /64。商家列出三網直連，AS9929 為盡力提供，未分別列出去程與回程。','Includes native German IPv4 and IPv6 /64. The vendor advertises direct connectivity to three Chinese carriers and best-effort AS9929 without a per-direction guarantee.','ドイツのネイティブ IPv4 と IPv6 /64 を付与。中国 3 社への直接接続を掲載。AS9929 はベストエフォートで、往復別の保証はありません。');
  const hkV6=localized('本系列只列香港 IPv6 /64。商家注明移动尽力直连、目前去程 CMIN2；端口共享，流量双向合计。','此系列僅列香港 IPv6 /64。商家註明移動盡力直連、目前去程 CMIN2；連接埠共用，流量雙向合計。','This series lists only a Hong Kong IPv6 /64. The vendor lists best-effort China Mobile direct connectivity and CMIN2 on the inbound path. Shared port and two-way transfer counting.','香港 IPv6 /64 のみ。中国移動との直結はベストエフォート、中国からの往路は CMIN2 と掲載。共有ポート、転送量は送受信合計です。');
  const groups={
    'bgp-9929':{market:'DE',city:'Germany',route:'AS9929',note:dede,native:'IPv4 + IPv6 /64',v4:'DE · native · dedicated',v6:'DE · native /64',dedicated:true},
    'hk-vps':{market:'HK',city:'Hong Kong',route:'China Mobile direct',note:hkAddress,v4:'HK · dedicated',v6:'HK /64',dedicated:true},
    'tw-hkg':{market:'HK',city:'Hong Kong',note:taiwan,native:'IPv6 /128',v4:'TW · geolocation · dedicated',v6:'TW · native /128',extraV6:'TW · broadcast /64',dedicated:true},
    'mo-hkg':{market:'HK',city:'Hong Kong',note:macao,v4:'MO · geolocation · dedicated',v6:'MO /64',dedicated:true},
    'hkbgp':{market:'HK',city:'Hong Kong',route:'CMIN2',note:hkV6,v4:'—',v6:'HK /64'},
    'ipv6':{market:'GB',city:'United Kingdom',v4:'GB · shared NAT',v6:'GB /64',nat:true},
    'nateu':{v4:'shared NAT',nat:true},
    'huo-dong':{market:'HK',city:'Hong Kong',note:hkAddress,v4:'HK · dedicated',v6:'HK /64',dedicated:true}
  };
  const tracked=new Set([46,47,48,49,30,31,32,33,64,56,59,60,67,57,58,62,52,53,54,55,51]);
  const existing=new Set(PLANS.map(p=>p.id));
  for(const [name,rows] of Object.entries(catalog)){
    const group=groups[name],proof='https://mhyidc.com/index.php/store/'+name;
    for(const row of rows){
      const id='mhy-p'+row.pid;
      if(existing.has(id))continue;
      existing.add(id);
      const key=row.pid===5?'NL':row.pid===42?'TR':group.market;
      const city=row.pid===5?'Netherlands':row.pid===42?'Türkiye':group.city;
      let note=group.note;
      if(name==='ipv6'){
        const n=row.forwardPorts;
        note=localized('英国 IPv6 /64 加共享 IPv4，含 '+n+' 个 IPv4 映射端口。流量按双向合计。','英國 IPv6 /64 加共用 IPv4，含 '+n+' 個 IPv4 映射埠。流量按雙向合計。','UK IPv6 /64 plus shared IPv4 with '+n+' mapped ports. Transfer counts both directions.','英国 IPv6 /64 と共有 IPv4。IPv4 転送ポート '+n+' 個、転送量は送受信合計です。');
      } else if(name==='nateu'){
        note=row.pid===5?localized('荷兰共享 IPv4，含 1 个 SSH 端口及 10 个固定开放端口。1 Gbps 为峰值。','荷蘭共用 IPv4，含 1 個 SSH 埠及 10 個固定開放埠。1 Gbps 為峰值。','Netherlands shared IPv4. Includes one SSH port plus ten fixed open ports. The 1 Gbps speed is a peak rate.','オランダの共有 IPv4。SSH 1 ポートと固定開放 10 ポート。1 Gbps はピーク値です。'):localized('土耳其共享 IPv4，含 20 个 IPv4 映射端口。1 Gbps 为峰值。','土耳其共用 IPv4，含 20 個 IPv4 映射埠。1 Gbps 為峰值。','Türkiye shared IPv4 with 20 mapped ports. The 1 Gbps speed is a peak rate.','トルコの共有 IPv4 と転送ポート 20 個。1 Gbps はピーク値です。');
      }
      const dedicatedPort=row.pid===63;
      const port=row.port===1000?'1 Gbps':row.port+' Mbps';
      const spec={sku:row.sku,term:row.term,price:row.price.toFixed(2),currency:'CNY',cpu:row.cpu+' vCPU'+(name==='bgp-9929'?' · AMD EPYC 7413':''),ram:row.ram%1024===0?row.ram/1024+' GB':row.ram+' MB',disk:row.disk+' GB'+(row.storage===''?'':' SSD'),port,proof,date:checked};
      if(row.allowance)spec.traffic=row.allowance;
      if(dedicatedPort){
        const suffix=localized('100 Mbps 独享，商品卡未列流量额度。','100 Mbps 獨享，商品卡未列流量額度。','Dedicated 100 Mbps port; the storefront publishes no transfer allowance.','100 Mbps 専用ポート。商品ページに転送量枠の記載はありません。');
        note=Object.fromEntries(Object.keys(note).map(k=>[k,note[k]+' '+suffix[k]]));
      }
      const url=proof+'/'+row.path;
      const addressFamilies={ipv4:group.v4,ipv6:group.v6||'',optionalIpv6:group.extraV6||''};
      const searchTerms=['Hoyoverse Network','HOYOVERSE','MHY IDC','mhyidc.com',name,group.v4,group.v6,group.extraV6];
      if(name==='tw-hkg')searchTerms.push('臺灣 台灣 台湾 Taiwan /128 /64');
      if(name==='mo-hkg')searchTerms.push('澳門 澳门 Macao Macau 香港');
      if(name==='hkbgp')searchTerms.push('IPv6-only only IPv6 仅IPv6 僅IPv6');
      PLANS.push({id,provider,officialGroup:name,officialPid:row.pid,plan:row.sku,market:key,city,kind:'vps',ip:name==='bgp-9929'?'native':'unknown',route:group.route?'claimed':'unknown',routeName:group.route||'',carriers:name==='bgp-9929'?['CT','CU','CM']:[],url,proof,spec,notes:note,addressFamilies,searchTerms:searchTerms.filter(Boolean),...(tracked.has(row.pid)?{stockKey:id}:{})});
      const evidence=[];
      const add=(dimension,value,operator,claim)=>evidence.push({dimension,value,provider,market:key,sku:row.sku,scope:'sku',url,otherUrl:proof,checked,operator,note:claim});
      if(group.native)add('origin','native',group.native,note);
      if(group.dedicated)add('sharing','dedicated-ipv4','IPv4',note);
      if(group.nat)add('sharing','shared-nat','IPv4',note);
      if(evidence.length)IP_EVIDENCE.set(id,evidence);
    }
  }
})();