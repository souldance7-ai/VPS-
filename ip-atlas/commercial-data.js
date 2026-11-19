/* Seller price snapshots, 2026-11-20. Amounts keep original currency and billing term. */
const SKU_SNAPSHOTS=new Map([
 [
  "tcs-fh1",
  {
   "price": "49.99",
   "currency": "USD",
   "term": "month",
   "sku": "FH1-HINET-500M",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "20 GB",
   "port": "500 Mbps",
   "proof": "https://billing.tcscloud.net/index.php?rp=%2Fstore%2Ftaiwan-vps-fixed",
   "date": "2026-11-20"
  }
 ],
 [
  "tcs-dh1",
  {
   "price": "21.99",
   "currency": "USD",
   "term": "month",
   "sku": "DH1-HINET-500M",
   "cpu": "1 vCPU",
   "ram": "1.5 GB",
   "disk": "10 GB",
   "port": "500 Mbps",
   "proof": "https://billing.tcscloud.net/index.php?rp=%2Fstore%2Ftaiwan-vps-dynamic",
   "date": "2026-11-20"
  }
 ],
 [
  "tcs-ds1",
  {
   "price": "19.99",
   "currency": "USD",
   "term": "month",
   "sku": "DS1-SEEDNET-300M",
   "cpu": "1 vCPU",
   "ram": "1.5 GB",
   "disk": "10 GB",
   "port": "300 Mbps",
   "proof": "https://billing.tcscloud.net/index.php?rp=%2Fstore%2Ftaiwan-vps-dynamic",
   "date": "2026-11-20"
  }
 ],
 [
  "boil-kddi",
  {
   "price": "138",
   "currency": "USD",
   "term": "month",
   "sku": "KDDI/au 1000 Mbps · MAP-E",
   "cpu": "4 vCPU",
   "ram": "4 GB",
   "disk": "16 GB SSD",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://cloud.boil.network/store/japan-shared-bandwidth",
   "date": "2026-11-20"
  }
 ],
 [
  "boil-softbank",
  {
   "price": "99",
   "currency": "USD",
   "term": "month",
   "sku": "SoftBank 100 Mbps",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "12 GB SSD",
   "traffic": "1 TB",
   "port": "100 / 40 Mbps",
   "proof": "https://cloud.boil.network/store/japan-shared-bandwidth",
   "date": "2026-11-20"
  }
 ],
 [
  "sakura-tokyo",
  {
   "price": "698",
   "currency": "JPY",
   "term": "month",
   "sku": "512 MB · Tokyo",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "25 GB SSD",
   "proof": "https://vps.sakura.ad.jp/specification/",
   "date": "2026-11-20"
  }
 ],
 [
  "dmit-lax",
  {
   "price": "79.90",
   "currency": "USD",
   "term": "month",
   "sku": "LAX.AN5.Pro.MINI",
   "cpu": "4 vCPU",
   "ram": "4 GB",
   "disk": "80 GB SSD",
   "traffic": "5000 GB",
   "port": "10 Gbps",
   "proof": "https://www.dmit.io/pages/cloud-instance",
   "date": "2026-11-20"
  }
 ],
 [
  "ramnode-sea",
  {
   "price": "7",
   "currency": "USD",
   "term": "month",
   "sku": "512MB SKVM",
   "cpu": "2 vCPU",
   "ram": "512 MB",
   "disk": "15 GB SSD",
   "traffic": "2000 GB",
   "port": "1 Gbps",
   "proof": "https://clientarea.ramnode.com/store/kvm-ssd-vps-skvm-sea",
   "date": "2026-11-20"
  }
 ],
 [
  "ovh-bhs",
  {
   "price": "49",
   "currency": "USD",
   "term": "month",
   "sku": "SYS-2 · base",
   "cpu": "Xeon D-2141I · 8C/16T",
   "ram": "32 GB",
   "disk": "2 × 512 GB NVMe",
   "port": "1 Gbps",
   "proof": "https://us.ovhcloud.com/deals/",
   "date": "2026-11-20"
  }
 ],
 [
  "recloud-tfn",
  {
   "price": "70",
   "currency": "CNY",
   "term": "month",
   "sku": "TFN 1c1G 200M",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB SSD",
   "traffic": "1024 GB",
   "port": "200 Mbps",
   "proof": "https://www.oneprovide.net/store/tfn",
   "date": "2026-11-20"
  }
 ],
 [
  "field-4af1c317e4c9",
  {
   "price": "43",
   "currency": "USD",
   "term": "month",
   "sku": "HiNet PPPoE · New Taipei",
   "traffic": "Unmetered",
   "port": "500–600 Mbps",
   "proof": "https://joyso.app/store/ge-zhong-vps?language=chinese-tw",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b355e6f6defb",
  {
   "price": "59.99",
   "currency": "USD",
   "term": "month",
   "sku": "HiNet VPS · 2T",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "traffic": "2000 GB",
   "port": "100 Mbps",
   "proof": "https://serverfield.com.tw/crm/store/hinet-chunghwa-telecom-vps?language=chinese",
   "date": "2026-11-20"
  }
 ],
 [
  "field-3b38a453ade8",
  {
   "price": "8.60",
   "currency": "USD",
   "term": "month",
   "sku": "ktwncr512",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "20 GB HDD",
   "traffic": "500 GB",
   "port": "1 Gbps",
   "proof": "https://www.hostinginside.com/billing/store/kvm-virtual-server-non-china-premium-route-taipei-taiwan?language=chinese",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c4a59cc515a6",
  {
   "price": "840",
   "currency": "TWD",
   "term": "month",
   "sku": "TW-VPS-XS",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "25 GB SSD",
   "traffic": "2000 GB",
   "port": "50 Mbps",
   "proof": "https://host.com.tw/台灣VPS主機",
   "date": "2026-11-20"
  }
 ],
 [
  "field-7f3ca16490b8",
  {
   "price": "1200",
   "currency": "TWD",
   "term": "month",
   "sku": "2X – Small Plan",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "10 GB SSD",
   "traffic": "512 GB",
   "port": "1 Gbps",
   "proof": "https://portal.simple.taipei/index.php?rp=%2Fstore%2Ftaiwan-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-80f395b63317",
  {
   "price": "26",
   "currency": "USD",
   "term": "month",
   "sku": "Taiwan VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB NVMe",
   "traffic": "250 GB",
   "port": "100 Mbps",
   "proof": "https://www.formohost.com/taiwan-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-2f553455fdd1",
  {
   "price": "18",
   "currency": "USD",
   "term": "month",
   "sku": "Taiwan Cloud · 512M",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "500 GB",
   "port": "50 Mbps",
   "proof": "https://www.imidc.com/store/taiwan-cloud?language=english&zhtw=1",
   "date": "2026-11-20"
  }
 ],
 [
  "field-102aac35c7f7",
  {
   "price": "1450",
   "currency": "TWD",
   "term": "month",
   "sku": "HiCloud Linux 1 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "100 GB",
   "port": "1 Gbps",
   "proof": "https://6do.com.tw/tw-hicloud.php",
   "date": "2026-11-20"
  }
 ],
 [
  "field-8ac9b6586427",
  {
   "price": "600",
   "currency": "TWD",
   "term": "month",
   "sku": "1 vCPU / 2GB RAM",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "proof": "https://sam.net.tw/vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-dde2114b8249",
  {
   "price": "11",
   "currency": "USD",
   "term": "month",
   "sku": "Taipei KVM · 1 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "70 GB NVMe",
   "port": "10 Mbps",
   "proof": "https://www.powoke.com/tw/taiwan-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-217706c7fb55",
  {
   "price": "12",
   "currency": "USD",
   "term": "month",
   "sku": "CMI.HK · 1C-512MB-8GB-2TB",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "8 GB SSD",
   "traffic": "2 TB",
   "port": "500 Mbps",
   "proof": "https://vmshell.com/index.php?rp=%2Fstore%2Fcmin2hk",
   "date": "2026-11-20"
  }
 ],
 [
  "field-6358d2569e6e",
  {
   "price": "699",
   "currency": "CNY",
   "term": "year",
   "sku": "iCable · KVM 1 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB NVMe",
   "traffic": "1000 GB",
   "port": "100 Mbps",
   "proof": "https://lisahost.com/cart.php?gid=29",
   "date": "2026-11-20"
  }
 ],
 [
  "field-008310980414",
  {
   "price": "19",
   "currency": "USD",
   "term": "month",
   "sku": "VPS 100L SSD",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "100 GB SSD",
   "traffic": "1000 GB",
   "port": "1 Gbps",
   "proof": "https://www.kdatacenter.com/korea-ssd-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c4bcd6196775",
  {
   "price": "199",
   "currency": "USD",
   "term": "month",
   "sku": "E3-1230 v3 · 1 IPv4",
   "cpu": "Xeon E3-1230 v3",
   "ram": "16 GB",
   "disk": "512 GB SSD",
   "port": "100 Mbps",
   "proof": "https://www.imidc.com/index.php/store/korea-servers?language=english",
   "date": "2026-11-20"
  }
 ],
 [
  "field-d55ad883860a",
  {
   "price": "98000",
   "currency": "KRW",
   "term": "month",
   "sku": "KR Cloud 1C",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "25 GB SSD",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://jiguidc.com/store/korean-vps-server",
   "date": "2026-11-20"
  }
 ],
 [
  "field-f7fb2131159b",
  {
   "price": "41",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-PH 2",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "50 GB SSD",
   "proof": "https://serversinasia.com/serversphilippines.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-fdf9c6c8c912",
  {
   "price": "200",
   "currency": "USD",
   "term": "month",
   "sku": "VPS MNL6",
   "cpu": "16 vCPU",
   "ram": "32 GB",
   "disk": "250 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.servergalactic.com/vps-server.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-43d9974bd390",
  {
   "price": "50",
   "currency": "USD",
   "term": "month",
   "sku": "VPS1",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB",
   "traffic": "250 GB",
   "port": "10 Mbps",
   "proof": "https://www.web.com.ph/virtualserver.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b8939bb8d307",
  {
   "price": "9.99",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS PH Starter",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB",
   "traffic": "250 GB",
   "port": "10 Mbps",
   "proof": "https://www.estnoc.ee/vps/philippines.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-94af7d337718",
  {
   "price": "439.96",
   "currency": "USD",
   "term": "month",
   "sku": "MNL-1 · Xeon E3-1230v6",
   "cpu": "Xeon E3-1230v6 · 4C/8T",
   "ram": "32 GB",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/manila-philippines/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-8b6e75ff90fc",
  {
   "price": "13.16",
   "currency": "USD",
   "term": "month",
   "sku": "Cloud VPS Pro · Linux",
   "cpu": "1 vCPU",
   "ram": "2 GB + 1 GB",
   "disk": "25 GB SSD",
   "traffic": "Unmetered",
   "proof": "https://123host.vn/en/cloud-vps-pro.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-16f221343baf",
  {
   "price": "11",
   "currency": "USD",
   "term": "month",
   "sku": "Vietnam KVM · 1 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "70 GB NVMe",
   "port": "10 Mbps",
   "proof": "https://www.powoke.com/en/vietnam-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0c78926fda84",
  {
   "sku": "Montreal · 32 GB",
   "cpu": "14C/28T",
   "ram": "32 GB",
   "disk": "500 GB SSD",
   "traffic": "Unmetered",
   "port": "10 Gbps",
   "proof": "https://vshield.com/serveur-dedie-montreal/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-67b2a70bff03",
  {
   "price": "7.50",
   "currency": "USD",
   "term": "month",
   "sku": "VM-1C-2G",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "55 GB NVMe",
   "traffic": "5 TB",
   "port": "10 Gbps",
   "proof": "https://sucuranetworks.ca/montreal-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-7b248ac28c53",
  {
   "price": "15.99",
   "currency": "CAD",
   "term": "month",
   "sku": "Cloud VPS-1",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "port": "500 Mbps",
   "proof": "https://sheernox.com/hosting/cloud-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c574e5b6b5da",
  {
   "price": "3.99",
   "currency": "USD",
   "term": "month",
   "sku": "LA-1",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "traffic": "2 TB",
   "port": "10 Gbps",
   "proof": "https://portal.cloudnium.net/cart/los-angeles---kvm-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-687af75b7945",
  {
   "price": "4.99",
   "currency": "USD",
   "term": "month",
   "sku": "LA-KVM-512MB",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "1000 GB",
   "port": "1 Gbps",
   "proof": "https://www.owned-networks.net/client_area/index.php/store/los-angeles-cloud-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0b17331ec822",
  {
   "price": "65",
   "currency": "USD",
   "term": "month",
   "sku": "Dual L5520",
   "cpu": "2 × Xeon L5520 · 8C",
   "ram": "24 GB",
   "disk": "250 GB SSD / 2 TB HDD",
   "traffic": "10 TB",
   "port": "1 Gbps",
   "proof": "https://www.iwebfusion.net/ladedicatedspecials.php",
   "date": "2026-11-20"
  }
 ],
 [
  "field-01460f54a668",
  {
   "price": "26.99",
   "currency": "USD",
   "term": "year",
   "sku": "512 MB SSD KVM",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "30 GB SSD",
   "traffic": "500 GB",
   "port": "1 Gbps",
   "proof": "https://racknerd.com/kvm-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-4ec32669839e",
  {
   "price": "28",
   "currency": "USD",
   "term": "year",
   "sku": "SSD VPS 1",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "4 TB",
   "port": "1 Gbps",
   "proof": "https://cloudcone.com/vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-cc55683b2f91",
  {
   "price": "115.99",
   "currency": "USD",
   "term": "year",
   "sku": "CSSD2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "1000 GB",
   "port": "60 Mbps",
   "proof": "https://bill.hostdare.com/store/premium-china-optimized-nvme-kvm",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b2801d28f9d5",
  {
   "price": "6",
   "currency": "USD",
   "term": "month",
   "sku": "S2N-1C1G Premium",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "16 GB",
   "traffic": "1 TB · max(IN, OUT)",
   "proof": "https://www.misaka.io/locations/sanjose",
   "date": "2026-11-20"
  }
 ],
 [
  "field-cd998efc36a7",
  {
   "price": "14",
   "currency": "USD",
   "term": "month",
   "sku": "San Jose VPS 1",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "4 TB",
   "proof": "https://www.vpsshell.com/san-jose-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-950fd2691e07",
  {
   "price": "3.99",
   "currency": "USD",
   "term": "month",
   "sku": "Basic-1",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://cloudnium.net/hosting/vps/seattle/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-09c3eab3d654",
  {
   "price": "4.99",
   "currency": "USD",
   "term": "month",
   "sku": "SEA-KVM-512MB",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "1000 GB",
   "port": "1 Gbps",
   "proof": "https://www.owned-networks.net/seattle-vps.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-870942cdc165",
  {
   "price": "555",
   "currency": "USD",
   "term": "month",
   "sku": "Intel E-2286G",
   "cpu": "Xeon E-2286G · 6C/12T",
   "ram": "32 GB",
   "disk": "2 × 960 GB NVMe",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://hostiger.com/seattle-dedicated-server",
   "date": "2026-11-20"
  }
 ],
 [
  "field-5d3e7a9db40a",
  {
   "price": "19.99",
   "currency": "USD",
   "term": "month",
   "sku": "Starter",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "25 GB NVMe",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://portvps.com/seattle-location",
   "date": "2026-11-20"
  }
 ],
 [
  "field-1fb597c9f6c9",
  {
   "price": "8",
   "currency": "USD",
   "term": "month",
   "sku": "SEA.PRE.1C1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "1000 GB",
   "port": "2 Gbps ↓ / 200 Mbps ↑",
   "proof": "https://www.tudcloud.com/vps-seattle.php",
   "date": "2026-11-20"
  }
 ],
 [
  "field-d025dd01aa6a",
  {
   "price": "10",
   "currency": "USD",
   "term": "month",
   "sku": "S2N-1C2G Premium",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "32 GB",
   "traffic": "2 TB · max(IN, OUT)",
   "proof": "https://www.misaka.io/locations/seattle",
   "date": "2026-11-20"
  }
 ],
 [
  "field-a48cbc513ca7",
  {
   "price": "9",
   "currency": "USD",
   "term": "month",
   "sku": "Seattle VPS 1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB",
   "proof": "https://www.vpsshell.com/seattle-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c30ed98d8dee",
  {
   "price": "25",
   "currency": "USD",
   "term": "month",
   "sku": "Residential-STARTER",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "40 GB NVMe",
   "traffic": "5 TB",
   "port": "2 Gbps",
   "proof": "https://sixtynet.net/index.php?rp=%2Fstore%2Fat-and-t-mobility-residential",
   "date": "2026-11-20"
  }
 ],
 [
  "field-031f33b3453d",
  {
   "price": "29.09",
   "currency": "USD",
   "term": "month",
   "sku": "Seattle Home Broadband · Starter L",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "3000 GB",
   "port": "100 Mbps",
   "proof": "https://tovanix.com/product/cloud/vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-167ea4cba240",
  {
   "price": "15.15",
   "currency": "USD",
   "term": "month",
   "sku": "Los Angeles 9929 · Basic L",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "2000 GB",
   "port": "60 Mbps",
   "proof": "https://tovanix.com/product/cloud/vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-1b8c564e4f02",
  {
   "price": "7.99",
   "currency": "USD",
   "term": "month",
   "sku": "S-2 Standard",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "Unmetered",
   "proof": "https://www.buyvps.com/vps-amsterdam/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-d1132a1a3315",
  {
   "price": "4",
   "currency": "EUR",
   "term": "month",
   "sku": "CHVPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB",
   "traffic": "1 TB",
   "proof": "https://consulhosting.com/vps-hosting/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-151ee6171e9e",
  {
   "price": "6.95",
   "currency": "EUR",
   "term": "month",
   "sku": "AMS Starter",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://v.ps/locations/amsterdam/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-3e086ac6c308",
  {
   "price": "42",
   "currency": "EUR",
   "term": "month",
   "sku": "Falkenstein AMD CPU 2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "40 GB SSD",
   "traffic": "18 TB",
   "port": "1 Gbps",
   "proof": "https://www.idfnv.com/en/vps-hosting-germany-falkenstein/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-dee69295e12c",
  {
   "price": "15.95",
   "currency": "EUR",
   "term": "month",
   "sku": "FRA EPYC Grit",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "1 TB",
   "port": "1.25 Gbps",
   "proof": "https://v.ps/locations/frankfurt/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-740b12974590",
  {
   "price": "15.15",
   "currency": "USD",
   "term": "month",
   "sku": "Frankfurt 9929 · Basic L",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "4000 GB",
   "port": "60 Mbps",
   "proof": "https://tovanix.com/product/cloud/vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-fb5104e4f4bf",
  {
   "price": "10.99",
   "currency": "USD",
   "term": "month",
   "sku": "Starter KVM",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "1 TB",
   "proof": "https://ravanahost.com/services/hosting/vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-bc1130cc1604",
  {
   "price": "11.99",
   "currency": "USD",
   "term": "month",
   "sku": "Linux VPS · 4 vCPU",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "160 GB SSD",
   "proof": "https://www.fuerza.cloud/vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-963113bb586d",
  {
   "price": "55",
   "currency": "SGD",
   "term": "month",
   "sku": "Managed NVMe · 8 GB",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "100 GB NVMe",
   "traffic": "4 TB",
   "port": "300 Mbps",
   "proof": "https://www.quape.com/hosting/vps-hosting/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-ada576289f85",
  {
   "price": "15",
   "currency": "USD",
   "term": "month",
   "sku": "Nest",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "proof": "https://vpszoo.com/singapore-vps.php",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0d12aebe73b2",
  {
   "price": "19",
   "currency": "SGD",
   "term": "month",
   "sku": "VPS 1 · Singapore",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "40 GB NVMe",
   "traffic": "1 TB",
   "port": "100 Mbps",
   "proof": "https://www.anycloud.host/vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e0924bc05628",
  {
   "price": "59.95",
   "currency": "EUR",
   "term": "month",
   "sku": "SIN EPYC Explorer",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://v.ps/locations/singapore/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c651a0c9ced1",
  {
   "price": "11.52",
   "currency": "GBP",
   "term": "month",
   "sku": "VPS 1",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "80 GB SSD",
   "traffic": "Unmetered",
   "proof": "https://www.octopusvps.co.uk/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c17c452bc953",
  {
   "price": "6.95",
   "currency": "EUR",
   "term": "month",
   "sku": "LON Starter",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://v.ps/locations/london/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-f71e03ef5a28",
  {
   "price": "10.49",
   "currency": "GBP",
   "term": "month",
   "sku": "Starter",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "25 GB NVMe",
   "proof": "https://cloudspaceuk.co.uk/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-067c15a72938",
  {
   "price": "4.50",
   "currency": "GBP",
   "term": "month",
   "sku": "1 GB London VPS",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB",
   "traffic": "2 TB",
   "port": "2.5 Gbps",
   "proof": "https://iniz.com/vps/london",
   "date": "2026-11-20"
  }
 ],
 [
  "field-737523e36b63",
  {
   "price": "317",
   "currency": "GBP",
   "term": "month",
   "sku": "2× Xeon Gold 6230",
   "cpu": "2 × 20C/40T",
   "ram": "256 GB",
   "disk": "2 × 960 GB SSD",
   "traffic": "Unmetered",
   "port": "10 Gbps",
   "proof": "https://www.uknode.co.uk/dedicated-servers",
   "date": "2026-11-20"
  }
 ],
 [
  "field-333e9a2e74dc",
  {
   "price": "2.49",
   "currency": "EUR",
   "term": "month",
   "sku": "Linux Starter",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "10 GB NVMe",
   "proof": "https://www.nvhcloud.com/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-511aef20d3cc",
  {
   "price": "6.99",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS Nano",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "40 GB",
   "proof": "https://symnex.fr/offres/vps/paris",
   "date": "2026-11-20"
  }
 ],
 [
  "field-2a0f5c4fd803",
  {
   "price": "133",
   "currency": "EUR",
   "term": "month",
   "sku": "Power S3",
   "cpu": "AMD EPYC 4344P · 8C/16T",
   "ram": "32 GB",
   "disk": "2 × 480 GB NVMe",
   "port": "1 Gbps · 100 Mbps CIR",
   "proof": "https://www.ikoula.com/fr/serveur-dedie/power",
   "date": "2026-11-20"
  }
 ],
 [
  "akile-hinet",
  {
   "price": "149.99",
   "currency": "CNY",
   "term": "year",
   "sku": "TWHinet-Mini-NAT",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "6 GB",
   "traffic": "1000 GB → 10 Mbps",
   "port": "200 Mbps",
   "proof": "https://akile.ai/shop/server?areaId=6&nodeId=31&planId=980&type=traffic",
   "date": "2026-11-20"
  }
 ],
 [
  "conoha-vps",
  {
   "price": "460",
   "currency": "JPY",
   "term": "month",
   "sku": "512 MB · まとめトク 1ヶ月",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "30 GB SSD",
   "proof": "https://vps.conoha.jp/pricing/",
   "date": "2026-11-20"
  }
 ],
 [
  "xserver-vps",
  {
   "price": "1980",
   "currency": "JPY",
   "term": "month",
   "sku": "2 GB · 1ヶ月",
   "cpu": "3 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "proof": "https://vps.xserver.ne.jp/price.php",
   "date": "2026-11-20"
  }
 ],
 [
  "dmit-hkg",
  {
   "price": "79.90",
   "currency": "USD",
   "term": "month",
   "sku": "HKG.AS3.Pro.STARTER",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "40 GB SSD",
   "traffic": "1000 GB",
   "port": "1 Gbps",
   "proof": "https://www.dmit.io/pages/cloud-instance",
   "date": "2026-11-20"
  }
 ],
 [
  "taxi-lax",
  {
   "price": "3",
   "currency": "USD",
   "term": "month",
   "sku": "LA 512M",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "10 GB",
   "traffic": "500 GB",
   "port": "300 Mbps",
   "proof": "https://vps.taxi/los-angeles/",
   "date": "2026-11-20"
  }
 ],
 [
  "vps-sjc",
  {
   "price": "8.95",
   "currency": "EUR",
   "term": "month",
   "sku": "SJC Starter",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://v.ps/locations/san-jose/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-1e5667cec01b",
  {
   "price": "174.99",
   "currency": "USD",
   "term": "month",
   "sku": "E3-1230 v3 · 16 GB",
   "cpu": "Xeon E3-1230 v3 · 4C/8T",
   "ram": "16 GB",
   "disk": "240 GB SSD",
   "traffic": "Unmetered",
   "port": "100 Mbps",
   "proof": "https://oneprovider.com/en/dedicated-servers/taipei-taiwan?language=en",
   "date": "2026-11-20"
  }
 ],
 [
  "field-89d4298693af",
  {
   "price": "2.99",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5 · Premium Network",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "traffic": "250 GB",
   "proof": "https://evoxt.com/6667-2/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-559169de0252",
  {
   "price": "2.99",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5 · Premium Network",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "traffic": "250 GB",
   "proof": "https://evoxt.com/6667-2/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-9b2ad6f37e4d",
  {
   "price": "24.99",
   "currency": "USD",
   "term": "month",
   "sku": "VPS 1C-2G",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "1 TB",
   "proof": "https://www.kryohost.com/vps/south-korea-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0a297d6aed42",
  {
   "price": "19.99",
   "currency": "USD",
   "term": "month",
   "sku": "VPS 1C-2G",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "1 TB",
   "proof": "https://kryohost.com/vps/philippines-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-aeba39878665",
  {
   "price": "1690",
   "currency": "PHP",
   "term": "month",
   "sku": "Basic VPS",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "80 GB SSD",
   "port": "50 Mbps",
   "proof": "https://infinivan.cloud/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-99bd3dd54597",
  {
   "price": "259.80",
   "currency": "USD",
   "term": "month",
   "sku": "Philippines V1",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "50 GB SSD",
   "traffic": "100 GB",
   "proof": "https://www.navicosoft.com/vps-hosting-in-philippines/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-584eeb1bfd4a",
  {
   "price": "1881000",
   "currency": "VND",
   "term": "month",
   "sku": "Xeon E3 · 8 GB",
   "cpu": "Xeon E3 · 4C",
   "ram": "8 GB",
   "disk": "500 GB HDD",
   "traffic": "Unmetered",
   "port": "100 / 5 Mbps",
   "proof": "https://vinahost.vn/server/thue-may-chu-rieng/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-bbefba2253ef",
  {
   "price": "45",
   "currency": "USD",
   "term": "quarter",
   "sku": "VPS-VN 1 · 3 months",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "Unmetered",
   "port": "100 Mbps",
   "proof": "https://www.serversinasia.com/serversvietnam.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-3a6fa4e4f293",
  {
   "price": "64.99",
   "currency": "USD",
   "term": "month",
   "sku": "Canada VPS 8",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "50 GB NVMe",
   "traffic": "4 TB",
   "proof": "https://www.kryohost.com/vps/canada-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-11b6789df594",
  {
   "price": "8+",
   "currency": "USD",
   "term": "month",
   "sku": "Linux KVM 2GB",
   "ram": "2 GB",
   "proof": "https://www.iozoom.com/datacenter/los-angeles-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-6b310919de86",
  {
   "price": "20",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E3-1230 v2 · renewal",
   "cpu": "4 cores",
   "ram": "32 GB",
   "disk": "250 GB SSD",
   "port": "1 Gbps",
   "proof": "https://www.psychz.net/dashboard/client/web/order/dedicated-server?OrderServiceSearch%5Blocation%5D%5B%5D=LAX",
   "date": "2026-11-20"
  }
 ],
 [
  "field-bef009937f16",
  {
   "price": "999+",
   "currency": "USD",
   "term": "month",
   "sku": "IP-LA1 · AMD EPYC 9754S",
   "cpu": "128C / 128T",
   "ram": "256 GB DDR5 ECC",
   "disk": "1.92 TB + 7.6 TB NVMe",
   "traffic": "50 TB outbound",
   "port": "25 Gbps",
   "proof": "https://clients.webnx.com/index.php?rp=%2Fstore%2Finstant-provisioning-la",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e4b320f71b37",
  {
   "price": "45",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E3-1230v3",
   "cpu": "4C / 8T",
   "ram": "16 GB",
   "disk": "250 GB SSD",
   "traffic": "20 TB",
   "proof": "https://www.serverwala.com/en-us/bare-metal/dedicated-server-san-jose",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e20f1c3829fa",
  {
   "price": "209.99",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon Gold 6230 · 128 GB",
   "cpu": "20C / 40T",
   "ram": "128 GB",
   "disk": "1 TB NVMe",
   "traffic": "Unmetered · fair use",
   "port": "1 Gbps",
   "proof": "https://oneprovider.com/en/dedicated-servers/san-jose-usa",
   "date": "2026-11-20"
  }
 ],
 [
  "field-bb57393e9622",
  {
   "price": "16.20",
   "currency": "USD",
   "term": "month",
   "sku": "USA (Seattle) V1 · renewal $18",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "10 GB",
   "traffic": "500 GB",
   "port": "1 Gbps",
   "proof": "https://www.navicosoft.com/vps-hosting-in-seattle/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e9665d9ea688",
  {
   "price": "2.45",
   "currency": "USD",
   "term": "month",
   "sku": "Nano VPS",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "proof": "https://rootium.net/vps-hosting.php",
   "date": "2026-11-20"
  }
 ],
 [
  "field-39711c4580eb",
  {
   "price": "230.00",
   "currency": "EUR",
   "term": "month",
   "sku": "HP DL20 G9 · E3-1240v5",
   "cpu": "4C / 8T",
   "ram": "16 GB",
   "disk": "480 GB SSD + 8 TB SATA",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://nforce.com/dedicated-servers",
   "date": "2026-11-20"
  }
 ],
 [
  "field-78ef98be1e44",
  {
   "price": "124.00",
   "currency": "GBP",
   "term": "month",
   "sku": "Supermicro E-2388G NVMe",
   "cpu": "8C / 16T",
   "ram": "32 GB",
   "disk": "960 GB NVMe",
   "traffic": "50 TB",
   "port": "10 Gbps NIC",
   "proof": "https://www.clouvider.com/dedicated-servers/amsterdam/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-ddcb652e0578",
  {
   "price": "199.92",
   "currency": "EUR",
   "term": "month",
   "sku": "Ryzen 7 9700X · 64 GB",
   "cpu": "Ryzen 7 9700X · 8C/16T",
   "ram": "64 GB",
   "disk": "512 GB NVMe",
   "traffic": "FUP",
   "port": "2 × 10 Gbps",
   "proof": "https://index-hosting.com/en/instant-dedicated-server",
   "date": "2026-11-20"
  }
 ],
 [
  "field-5de3c0aa1c49",
  {
   "price": "24.99",
   "currency": "USD",
   "term": "month",
   "sku": "VPS 1C-2G",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "1 TB",
   "proof": "https://kryohost.com/vps/singapore-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-5775ba9a9dc3",
  {
   "price": "5.94",
   "currency": "USD",
   "term": "month",
   "sku": "Lite · Linux",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://ishosting.com/en/vps/gb",
   "date": "2026-11-20"
  }
 ],
 [
  "field-7f56168bbebf",
  {
   "price": "6.00",
   "currency": "USD",
   "term": "month",
   "sku": "1GB LON",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB NVMe",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://www.hawkhost.com/london-cloud-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e825e0824fa6",
  {
   "price": "4.79",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS Starter",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "port": "up to 10 Gbps",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://holycloud.fr/fr/vps-french",
   "date": "2026-11-20"
  }
 ],
 [
  "field-550623ddcf78",
  {
   "price": "7.90",
   "currency": "EUR",
   "term": "month",
   "sku": "Standard S · LXC",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "40 GB NVMe",
   "proof": "https://soliton.fr/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-212176c9c654",
  {
   "price": "6.00",
   "currency": "USD",
   "term": "month",
   "sku": "Basic Regular / 1 GiB",
   "cpu": "1 vCPU",
   "ram": "1 GiB",
   "disk": "25 GiB SSD",
   "traffic": "1,000 GiB",
   "proof": "https://www.digitalocean.com/pricing/droplets",
   "date": "2026-11-20"
  }
 ],
 [
  "field-af9b55bd0369",
  {
   "price": "6.00",
   "currency": "USD",
   "term": "month",
   "sku": "Basic Regular / 1 GiB",
   "cpu": "1 vCPU",
   "ram": "1 GiB",
   "disk": "25 GiB SSD",
   "traffic": "1,000 GiB",
   "proof": "https://www.digitalocean.com/pricing/droplets",
   "date": "2026-11-20"
  }
 ],
 [
  "field-67f80ab394f1",
  {
   "price": "160.00",
   "currency": "EUR",
   "term": "month",
   "sku": "Dual Xeon E5-2680 v2",
   "cpu": "2 × Xeon E5-2680 v2 · 20C",
   "ram": "192 GB",
   "disk": "2 × 1.92 TB SSD + 2 × 2 TB HDD",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://hostkey.com/about-us/special-offers/dual-cpu-bare-metal-servers-with-2x-xeon-e5-2680v2/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-3d7093e58ef4",
  {
   "price": "8.44",
   "currency": "USD",
   "term": "month",
   "sku": "Gyro Cloud Standard 1-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "22 TB",
   "proof": "https://www.gyrohosting.com/en/cloud-server-germany-nuremberg",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b9f5368f3b96",
  {
   "price": "4.53",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS-1 2027",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "traffic": "Unmetered",
   "port": "500 Mbps",
   "sourceNote": {
    "sc": "含增值税的起价。",
    "tc": "含增值稅的起價。",
    "en": "Starting price, including VAT.",
    "ja": "VAT 込みの最低料金です。"
   },
   "proof": "https://www.ovhcloud.com/de/vps/vps-deutschland/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-98c8065292c0",
  {
   "price": "680.00",
   "currency": "USD",
   "term": "month",
   "sku": "Supermicro Dedicated Server",
   "cpu": "Xeon Silver 4314 · 16C/32T",
   "ram": "64 GB",
   "disk": "32 TB HDD",
   "traffic": "Unmetered",
   "port": "10 Gbps",
   "proof": "https://www.supernetserver.co.uk/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-dfcc5c84ddf1",
  {
   "price": "3.95",
   "currency": "GBP",
   "term": "month",
   "sku": "GB.1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB",
   "traffic": "1 TB",
   "proof": "https://www.ukvps.com/pricing.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-46400c7709f7",
  {
   "price": "3.60",
   "currency": "USD",
   "term": "month",
   "sku": "FRA-512MB",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "25 GB NVMe",
   "port": "1 Gbps shared",
   "proof": "https://potenting.com/fr/vps/france/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-bffcb8773ab7",
  {
   "price": "6.99",
   "currency": "EUR",
   "term": "month",
   "sku": "Paris · 1 vCPU Linux",
   "cpu": "1 vCPU",
   "ram": "2 GB ECC",
   "disk": "20 GB NVMe",
   "proof": "https://petrosky.io/fr/france-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "bwh-ams",
  {
   "price": "56.99",
   "currency": "USD",
   "term": "month",
   "sku": "E-Commerce 80G · EUNL_9",
   "cpu": "4 vCPU",
   "ram": "4 GB",
   "disk": "80 GB SSD",
   "traffic": "3 TB",
   "port": "2.5 Gbps",
   "proof": "https://bandwagonhost.com/order/ecommerce/Amsterdam/EUNL_9",
   "date": "2026-11-20"
  }
 ],
 [
  "field-18f76e929c57",
  {
   "price": "18.99",
   "currency": "EUR",
   "term": "month",
   "sku": "Revendeur Starter",
   "cpu": "6 vCPU",
   "ram": "24 GB",
   "disk": "200 GB NVMe",
   "port": "10 Gbps",
   "proof": "https://artaun.fr/fr/revendeur-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-501b64c236d0",
  {
   "price": "179.99",
   "currency": "EUR",
   "term": "month",
   "sku": "Dedibox Core-6-M · DC5",
   "cpu": "2 × Xeon Silver 4114 · 20C/40T",
   "ram": "192 GB",
   "disk": "2 × 1 TB NVMe",
   "port": "1 Gbps",
   "proof": "https://www.scaleway.com/fr/tarifs/dedibox/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-708e2997daaf",
  {
   "price": "3.00",
   "currency": "EUR",
   "term": "month",
   "sku": "Developer · 1 CPU / 1 GB / 10 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB",
   "sourceNote": {
    "sc": "每位客户限购 2 台。",
    "tc": "每位客戶限購 2 台。",
    "en": "Limit of two per customer.",
    "ja": "1人につき2台まで購入できます。"
   },
   "proof": "https://upcloud.com/pricing/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-05f03571421d",
  {
   "price": "3.00",
   "currency": "EUR",
   "term": "month",
   "sku": "Developer · 1 CPU / 1 GB / 10 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB",
   "sourceNote": {
    "sc": "每位客户限购 2 台。",
    "tc": "每位客戶限購 2 台。",
    "en": "Limit of two per customer.",
    "ja": "1人につき2台まで購入できます。"
   },
   "proof": "https://upcloud.com/pricing/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-047683bc77ac",
  {
   "price": "134.00",
   "currency": "USD",
   "term": "month",
   "sku": "Supermicro E-2276G NVMe",
   "cpu": "6C / 12T",
   "ram": "16 GB",
   "disk": "512 GB NVMe",
   "traffic": "50 TB",
   "port": "10 Gbps NIC",
   "proof": "https://www.clouvider.com/dedicated-servers/frankfurt/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-4b85644488bb",
  {
   "price": "4.03",
   "currency": "EUR",
   "term": "month",
   "sku": "Craft Éco",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "sourceNote": {
    "sc": "按分钟计费，所列月费为估算值。",
    "tc": "按分鐘計費，所列月費為估算值。",
    "en": "Usage is billed by the minute. The monthly figure is an estimate.",
    "ja": "分単位で課金されます。表示月額は目安です。"
   },
   "proof": "https://arkya.cloud/vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-3e0b00f079ee",
  {
   "price": "6.99",
   "currency": "GBP",
   "term": "month",
   "sku": "VPS 1 · London",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "所列为标准月租。首月优惠价 GBP 3.50。",
    "tc": "所列為標準月租。首月優惠價 GBP 3.50。",
    "en": "The listed figure is the regular monthly rate. The first month costs GBP 3.50.",
    "ja": "表示額は通常月額です。初月は GBP 3.50 です。"
   },
   "proof": "https://hostworld.uk/debian-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-6c2760f7c69d",
  {
   "price": "41.50",
   "currency": "EUR",
   "term": "month",
   "sku": "PerformanceVPS · 2 dedicated vCPU",
   "cpu": "2 dedicated vCPU",
   "ram": "4 GB",
   "disk": "100 GB NVMe",
   "sourceNote": {
    "sc": "所列为标准月租。头三个月每月 EUR 20。",
    "tc": "所列為標準月租。前三個月每月 EUR 20。",
    "en": "The listed figure is the regular monthly rate. Each of the first three months costs EUR 20.",
    "ja": "表示額は通常月額です。最初の3か月は月額 EUR 20 です。"
   },
   "proof": "https://www.transip.nl/bestel-vps/performance-pakket-kiezen/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-704f701b84ee",
  {
   "price": "4.00",
   "currency": "USD",
   "term": "month",
   "sku": "NVMe 2 GB",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "10 GB NVMe",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "商家公布的入门起价。",
    "tc": "商家公布的入門起價。",
    "en": "Advertised starting price for the entry tier.",
    "ja": "事業者が公表する入門プランの最低料金です。"
   },
   "proof": "https://hosthatch.com/products",
   "date": "2026-11-20"
  }
 ],
 [
  "bwh-sjc",
  {
   "price": "49.99",
   "currency": "USD",
   "term": "quarter",
   "sku": "USCA_SJC5 · E-Commerce 20 GB",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "20 GB RAID-10 SSD",
   "traffic": "1 TB",
   "port": "2.5 Gbps",
   "proof": "https://bandwagonhost.com/order/ecommerce/San%20Jose/USCA_SJC5",
   "date": "2026-11-20"
  }
 ],
 [
  "bwh-yvr",
  {
   "price": "49.99",
   "currency": "USD",
   "term": "quarter",
   "sku": "CABC_6 · E-Commerce 20 GB",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "20 GB RAID-10 SSD",
   "traffic": "1 TB",
   "port": "2.5 Gbps",
   "proof": "https://bandwagonhost.com/order/ecommerce/Vancouver/CABC_6",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c3d56fdcecd3",
  {
   "price": "95.88",
   "currency": "CAD",
   "term": "year",
   "sku": "Micro KVM · C$7.99 × 12",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "8 TB",
   "port": "1 Gbps",
   "proof": "https://dotcanada.com/vps-hosting",
   "date": "2026-11-20"
  }
 ],
 [
  "field-62637f7e8d79",
  {
   "price": "95.88",
   "currency": "CAD",
   "term": "year",
   "sku": "Micro KVM · C$7.99 × 12",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "8 TB",
   "port": "1 Gbps",
   "proof": "https://dotcanada.com/vps-hosting",
   "date": "2026-11-20"
  }
 ],
 [
  "field-052e51e7d55b",
  {
   "price": "59",
   "currency": "USD",
   "term": "month",
   "sku": "Golden Retriever · EPYC 7551",
   "cpu": "32 cores",
   "ram": "32 GB",
   "disk": "1.6 TB NVMe",
   "proof": "https://servarica.com/dedicated/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-9651fc7316fd",
  {
   "price": "59.99",
   "currency": "CAD",
   "term": "month",
   "sku": "Windows Cloud Go",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "80 GB NVMe SSD",
   "traffic": "Unlimited¹",
   "port": "500 Mbps",
   "proof": "https://whc.ca/windows-cloud-servers",
   "date": "2026-11-20"
  }
 ],
 [
  "field-ef3fee2834cf",
  {
   "price": "18.00+",
   "currency": "CAD",
   "term": "month",
   "sku": "Self-Managed Cloud",
   "proof": "https://www.fullhost.com/cloud-servers/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0f0865b1b67b",
  {
   "price": "11.90",
   "currency": "USD",
   "term": "month",
   "sku": "Vancouver · 1 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "proof": "https://partvps.com/vps/vancouver",
   "date": "2026-11-20"
  }
 ],
 [
  "field-1ac679d5849f",
  {
   "price": "8+",
   "currency": "USD",
   "term": "month",
   "sku": "KVM Standard XS",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "64 GB NVMe",
   "traffic": "2 TB",
   "port": "10 Gbps",
   "proof": "https://clients.advinservers.com/store/los-angeles-kvm-standard-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-fa1e915c83a8",
  {
   "price": "79+",
   "currency": "USD",
   "term": "month",
   "sku": "Dedicated · base configuration",
   "cpu": "4C / 8T",
   "traffic": "15 TB",
   "port": "1 Gbps",
   "proof": "https://www.colocationamerica.com/dedicated-servers-los-angeles",
   "date": "2026-11-20"
  }
 ],
 [
  "field-d49a99b0bd4e",
  {
   "price": "5",
   "currency": "USD",
   "term": "month",
   "sku": "LAX SimpleCloud Global01",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://clientarea.gigsgigscloud.com/?action=add&cmd=cart&id=428",
   "date": "2026-11-20"
  }
 ],
 [
  "field-76ee4027b15c",
  {
   "price": "129",
   "currency": "USD",
   "term": "month",
   "sku": "Dual Xeon E5-2630L v3",
   "cpu": "16 cores",
   "ram": "64 GB",
   "disk": "1.6 TB SSD",
   "traffic": "10 TB",
   "port": "10 Gbps",
   "proof": "https://www.rdparena.com/premium-san-jose-dedicated.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-4cb6a556eeec",
  {
   "price": "79+",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E3-1280 v5 · 32 GB",
   "cpu": "4C / 8T",
   "ram": "32 GB",
   "disk": "1 TB NVMe",
   "traffic": "30 TB",
   "port": "10 Gbps",
   "proof": "https://www.spinservers.com/index.php?rp=%2Fstore%2Fsan-jose-instant-dedicated-servers",
   "date": "2026-11-20"
  }
 ],
 [
  "field-8491eedee049",
  {
   "price": "1188",
   "currency": "USD",
   "term": "year",
   "sku": "Xeon E3-1260Lv5 · $99 × 12",
   "cpu": "4C / 8T",
   "ram": "32 GB",
   "disk": "480 GB SSD",
   "port": "1 Gbps · 250 Mbps commit",
   "proof": "https://www.hostcolor.com/dedicatedhosting/san-jose-dedicated-servers.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-3d2355bc5715",
  {
   "price": "3",
   "currency": "EUR",
   "term": "month",
   "sku": "Starter · 1 GB",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB SSD",
   "port": "250 Mbps",
   "proof": "https://upcloud.com/products/cloud-servers/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-cb2f8f5d8bed",
  {
   "price": "6",
   "currency": "USD",
   "term": "month",
   "sku": "KVMSJC-1",
   "cpu": "1 vCPU",
   "ram": "1024 MB",
   "disk": "15 GB SSD RAID-10",
   "traffic": "1.5 TB",
   "port": "10 Gbps",
   "proof": "https://greencloudvps.com/billing/store/ssd-kvm-vps/?language=english",
   "date": "2026-11-20"
  }
 ],
 [
  "field-04b61058b3c4",
  {
   "price": "80+",
   "currency": "USD",
   "term": "month",
   "sku": "Seattle Bare Metal",
   "traffic": "Unmetered",
   "proof": "https://rackdog.com/data-centers/seattle",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0e53a9b2cabe",
  {
   "price": "5.99",
   "currency": "USD",
   "term": "month",
   "sku": "GP1.1-1-10-V6 · IP add-ons",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB SSD",
   "traffic": "200 GB",
   "port": "10 Gbps",
   "proof": "https://digicloud.tr/en/services/cloud/seattle/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e42822b3e391",
  {
   "price": "4.99",
   "currency": "USD",
   "term": "month",
   "sku": "Unmanaged Linux VPS · 1 CPU",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "1 TB",
   "proof": "https://www.hostwinds.com/vps/unmanaged-linux",
   "date": "2026-11-20"
  }
 ],
 [
  "alpha-sea",
  {
   "price": "2.54+",
   "currency": "EUR",
   "term": "month",
   "sku": "Seattle KVM",
   "proof": "https://alphavps.com/seattle-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-6df28c463acc",
  {
   "sku": "CA-P-3 Nano",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "512 GB high-speed / Unlimited total",
   "port": "≤400 Mbps",
   "proof": "https://shiip.cloud/en-ca/dedicated-nvme-kvm-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-2267c7feb178",
  {
   "price": "400+",
   "currency": "USD",
   "term": "month",
   "sku": "Dual Xeon E5-2683v4",
   "cpu": "32C / 64T",
   "ram": "512 GB ECC",
   "disk": "4 × 1.6 TB SSD",
   "traffic": "100 TB",
   "port": "10 Gbps",
   "proof": "https://dedispec.com/servers/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-85623723f307",
  {
   "price": "0.016",
   "currency": "USD",
   "term": "hour",
   "sku": "VM.Standard.A1.Flex · Compute + RAM",
   "cpu": "1 OCPU (Arm)",
   "ram": "4 GB",
   "proof": "https://www.oracle.com/tw/cloud/compute/arm/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-9fec248fc6bc",
  {
   "price": "6",
   "currency": "USD",
   "term": "month",
   "sku": "KangaPower",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "40 GB NVMe",
   "traffic": "3 TB",
   "proof": "https://www.hostbilby.com/ultra-vps",
   "date": "2026-11-20"
  }
 ],
 [
  "field-10402bb30dab",
  {
   "sku": "Cloud VPS S (NVMe)",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "200 GB NVMe",
   "traffic": "32 TB",
   "proof": "https://cybernet.host/cloud-vps-nvme",
   "date": "2026-11-20"
  }
 ],
 [
  "field-134c7312fb3d",
  {
   "price": "16.90",
   "currency": "USD",
   "term": "month",
   "sku": "AS2-2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "40 GB SSD",
   "traffic": "Unmetered",
   "port": "200 Mbps",
   "proof": "https://partvps.com/vps?plan=as2-2&region=sel",
   "date": "2026-11-20"
  }
 ],
 [
  "field-08136323c2ae",
  {
   "price": "3.50",
   "currency": "USD",
   "term": "month",
   "sku": "Lightsail Linux · IPv6 only",
   "cpu": "2 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "proof": "https://aws.amazon.com/lightsail/pricing/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-be1138996075",
  {
   "price": "354.99",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E-2388G · 6800",
   "cpu": "Xeon E-2388G · 8C / 16T",
   "ram": "64 GB DDR4",
   "disk": "2 × 480 GB SATA SSD",
   "traffic": "5 TB (fair use)",
   "port": "1 Gbps",
   "proof": "https://oneprovider.com/en/configure/dediconf/6800",
   "date": "2026-11-20"
  }
 ],
 [
  "field-29b482f66d82",
  {
   "price": "1000",
   "currency": "PHP",
   "term": "month",
   "sku": "KVM SSD PH-2GB",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "2000 GB/month",
   "proof": "https://gomanilahost.net/clients/store/vps-hosting-philippines",
   "date": "2026-11-20"
  }
 ],
 [
  "field-03723beabfcd",
  {
   "price": "19",
   "currency": "USD",
   "term": "month",
   "sku": "Mars · Manila",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "proof": "https://www.avanetco.com/philippines-vps-hosting/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b4e6ec76a2a5",
  {
   "price": "3.50",
   "currency": "USD",
   "term": "month",
   "sku": "KVM-PH-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "1 TB/month",
   "port": "10 Gbps (shared)",
   "proof": "https://clients.herza.cloud/index.php?rp=%2Fstore%2Fvps-manila",
   "date": "2026-11-20"
  }
 ],
 [
  "field-5a9e76cb983b",
  {
   "price": "3.56",
   "currency": "USD",
   "term": "month",
   "sku": "TOT K11",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "Unmetered",
   "port": "100 Mbps (shared)",
   "proof": "https://billing.tothost.vn/store/vps-ssd-k-plans",
   "date": "2026-11-20"
  }
 ],
 [
  "field-d95029ca3676",
  {
   "price": "1159000",
   "currency": "VND",
   "term": "month",
   "sku": "SSD Cloud Server A",
   "cpu": "6 vCPU",
   "ram": "6 GB",
   "disk": "120 GB SSD",
   "traffic": "Unlimited",
   "proof": "https://nhanhoa.com/may-chu/may-chu-cloud-server.html",
   "date": "2026-11-20"
  }
 ],
 [
  "field-a23afbfa58b7",
  {
   "price": "125",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E3-1230 v2 · 8061",
   "cpu": "Xeon E3-1230 v2 · 4C / 8T",
   "ram": "16 GB DDR3",
   "disk": "2 × 500 GB SATA HDD",
   "traffic": "Unmetered",
   "port": "100 Mbps",
   "proof": "https://oneprovider.com/en/configure/dediconf/8061",
   "date": "2026-11-20"
  }
 ],
 [
  "field-fd53ce004f37",
  {
   "price": "295000",
   "currency": "VND",
   "term": "month",
   "sku": "Cloud Server · GÓI 1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB SSD",
   "traffic": "Unlimited",
   "port": "100 Mbps",
   "proof": "https://bizflycloud.vn/cloud-server",
   "date": "2026-11-20"
  }
 ],
 [
  "field-fcb062f292eb",
  {
   "price": "68000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS MMO 2P",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "Unlimited",
   "port": "100 Mbps",
   "proof": "https://my.dataonline.vn/cart/cloud-vps-gia-re/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-71654fc691cb",
  {
   "price": "239000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS Việt Nam I VN#4",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "60 GB",
   "traffic": "Unlimited",
   "port": "300 Mbps",
   "proof": "https://xanhcloud.com/vps-viet-nam/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-2b10ad4a4d45",
  {
   "sku": "HIGH-01",
   "cpu": "8 vCPU",
   "ram": "16 GB",
   "disk": "300 GB SSD",
   "proof": "https://fptcloud.com/product/cloud-server/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e6d9966dc462",
  {
   "price": "240000",
   "currency": "VND",
   "term": "month",
   "sku": "Cloud VPS Pro 1",
   "cpu": "2 vCPU",
   "ram": "2 GB DDR4 ECC",
   "disk": "20 GB NVMe SSD",
   "traffic": "Unlimited",
   "port": "300 Mbps",
   "proof": "https://vndata.vn/cloud-vps-gia-re/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c9af9579d477",
  {
   "price": "142.50",
   "currency": "USD",
   "term": "month",
   "sku": "Ulta-X1 · 24-month term",
   "cpu": "Intel Xeon · 4C, 2.5 GHz",
   "ram": "16 GB DDR3",
   "disk": "256 GB SSD",
   "port": "300 Mbps",
   "proof": "https://ultahost.com/dedicated-server-south-korea",
   "date": "2026-11-20"
  }
 ],
 [
  "oneprovider-tyo",
  {
   "price": "179.99",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E-2276G",
   "cpu": "Xeon E-2276G · 6C/12T",
   "ram": "16 GB",
   "disk": "1 TB HDD / 240 GB SSD",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://oneprovider.com/en/dedicated-servers/tokyo-japan?language=en",
   "date": "2026-11-20"
  }
 ],
 [
  "field-73aced806b11",
  {
   "price": "149.99",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E3-1230 v5",
   "cpu": "Xeon E3-1230 v5 · 4C/8T",
   "ram": "8 GB",
   "disk": "1 TB HDD / 120 GB SSD",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://oneprovider.com/en/dedicated-servers/hong-kong-hong-kong?language=en",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b2a8380776d6",
  {
   "price": "20",
   "currency": "USD",
   "term": "month",
   "sku": "RyzenKVMHK2-3",
   "cpu": "2 vCPU",
   "ram": "4096 MB",
   "disk": "50 GB NVMe",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://greencloudvps.com/billing/store/ryzen-kvm-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-a08354315410",
  {
   "price": "40",
   "currency": "USD",
   "term": "month",
   "sku": "KVMJP-4 (IIJ)",
   "cpu": "4 vCPU",
   "ram": "8192 MB",
   "disk": "60 GB SSD RAID10",
   "traffic": "4 TB",
   "port": "10 Gbps",
   "proof": "https://greencloudvps.com/billing/store/ssd-kvm-vps/",
   "date": "2026-11-20"
  }
 ],
 [
  "field-63b7d5fa18c8",
  {
   "price": "129",
   "currency": "USD",
   "term": "month",
   "sku": "HKG.Turin.Air",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "140 GB NVMe",
   "traffic": "2000 GB",
   "port": "2 Gbps",
   "proof": "https://gomami.io/store/hkg-turin",
   "date": "2026-11-20"
  }
 ],
 [
  "field-c7af35042cfe",
  {
   "price": "0.324",
   "currency": "EUR",
   "term": "hour",
   "sku": "Ryzen 7 9700X",
   "cpu": "Ryzen 7 9700X · 8C/16T",
   "ram": "96 GB",
   "disk": "2 × 1 TB NVMe",
   "traffic": "100 TB",
   "port": "10 Gbps",
   "proof": "https://www.cherryservers.com/bare-metal-dedicated-servers/tokyo",
   "date": "2026-11-20"
  }
 ],
 [
  "field-e0e9112f5a10",
  {
   "price": "65.00",
   "currency": "USD",
   "term": "month",
   "sku": "HM24",
   "cpu": "2 AMD vCPU",
   "ram": "24 GiB",
   "disk": "200 GiB NVMe",
   "traffic": "6 TB",
   "port": "200 Mbps",
   "sourceNote": {
    "sc": "单月预付的新客户报价。",
    "tc": "新客戶預付一個月的報價。",
    "en": "One month prepaid, for new customers.",
    "ja": "新規契約で1か月前払いの料金。"
   },
   "proof": "https://www.layerstack.com/en/printable-cloud-servers/tw/highmemory",
   "date": "2026-11-20"
  }
 ],
 [
  "field-38268a787475",
  {
   "price": "32.00",
   "currency": "USD",
   "term": "month",
   "sku": "PRO200",
   "cpu": "4 AMD EPYC vCPU",
   "ram": "8 GiB",
   "disk": "200 GiB NVMe",
   "traffic": "5 TB",
   "port": "200–300 Mbps HK / 50–100 Mbps international",
   "sourceNote": {
    "sc": "新客户单月预付，PRO200 不包含 CN2。",
    "tc": "新客戶按月預付，PRO200 不含 CN2。",
    "en": "Monthly prepayment for new customers. CN2 is excluded from PRO200.",
    "ja": "新規契約の月払い。PRO200 に CN2 は含まれません。"
   },
   "proof": "https://www.layerstack.com/en/printable-cloud-servers/hk/premium",
   "date": "2026-11-20"
  }
 ],
 [
  "field-8913d1a7b9cd",
  {
   "price": "112.56",
   "currency": "USD",
   "term": "24 months",
   "sku": "VPS Basic · 24 mo",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB NVMe",
   "sourceNote": {
    "sc": "首期 24 个月按 4.69 USD/月折算，续费按 5.52 USD/月。",
    "tc": "首期 24 個月折合每月 4.69 美元，續約折合每月 5.52 美元。",
    "en": "First 24 months at USD 4.69 per month equivalent, renewal at USD 5.52 per month.",
    "ja": "初回24か月は月額換算4.69米ドル、更新は月額5.52米ドル。"
   },
   "proof": "https://ultahost.com/vps-china",
   "date": "2026-11-20"
  }
 ],
 [
  "field-35b26197a9bd",
  {
   "price": "549.36",
   "currency": "SGD",
   "term": "36 months",
   "sku": "NVMe M1 · Hermes",
   "cpu": "1 vCPU",
   "ram": "4 GB",
   "disk": "50 GB NVMe",
   "traffic": "2 TB",
   "port": "100 Mbps",
   "sourceNote": {
    "sc": "三年价格按官网月均 15.26 SGD 折算。",
    "tc": "三年總額按官網月均 15.26 新加坡元折算。",
    "en": "Three-year total calculated from the advertised SGD 15.26 monthly equivalent.",
    "ja": "公式の月額換算15.26シンガポールドルを基にした3年総額。"
   },
   "proof": "https://www.exabytes.sg/servers/nvme-vps-hermes",
   "date": "2026-11-20"
  }
 ],
 [
  "field-0a9db0c956a4",
  {
   "price": "38.90",
   "currency": "USD",
   "term": "month",
   "sku": "Starter Classic VPS · SG",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB SAS",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "含新加坡地区月费，另收 3 USD 一次性开通费。",
    "tc": "含新加坡地區月費，另收 3 美元一次性開通費。",
    "en": "Singapore regional charge included. One-time USD 3 setup fee additional.",
    "ja": "シンガポール地域料金込み。別途、初期費用3米ドル。"
   },
   "proof": "https://vpsforlife.com/vps-hosting-in-singapore",
   "date": "2026-11-20"
  }
 ],
 [
  "field-9d98e6085b60",
  {
   "sku": "MV1 SG",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB SSD",
   "traffic": "Unmetered",
   "proof": "https://console.merovps.com/order/vps-singapore",
   "date": "2026-11-20"
  }
 ],
 [
  "field-1921c6221400",
  {
   "price": "290",
   "currency": "USD",
   "term": "month",
   "sku": "AMD EPYC 4245P",
   "cpu": "EPYC 4245P · 6C/12T",
   "sourceNote": {
    "sc": "新加坡产品页公布的起价，最终配置以报价单为准。",
    "tc": "新加坡產品頁的起價，實際配置依報價單。",
    "en": "Starting price on the Singapore product page. Final configuration is quoted individually.",
    "ja": "シンガポール製品ページの最低料金。最終構成は個別見積もり。"
   },
   "proof": "https://www.datapacket.com/datacenters/singapore",
   "date": "2026-11-20"
  }
 ],
 [
  "field-b7d5e4c1ddda",
  {
   "price": "1.30",
   "currency": "USD",
   "term": "GPU-hour",
   "sku": "RTX PRO 6000 · 1 GPU-hour",
   "sourceNote": {
    "sc": "东京每 GPU 小时起价。整机金额按 GPU 数量与使用时间计算。",
    "tc": "東京每 GPU 小時起價，整機費用依 GPU 數量及時數計算。",
    "en": "Tokyo starting rate per GPU-hour. Total depends on GPU count and usage time.",
    "ja": "東京のGPU1基1時間あたりの最低料金。合計はGPU数と利用時間によります。"
   },
   "proof": "https://www.latitude.sh/changelog/metal-gpu-now-available-in-sydney-and-tokyo",
   "date": "2026-11-20"
  }
 ],
 [
  "light-seoul",
  {
   "price": "7.71",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/korea-vps",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "7.71",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "14.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Premium",
     "price": "27.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "3 TB"
    },
    {
     "sku": "Enterprise",
     "price": "52.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "4 TB"
    }
   ]
  }
 ],
 [
  "light-hanoi",
  {
   "price": "7.71",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/hanoi-vps",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "7.71",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "14.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Premium",
     "price": "27.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "3 TB"
    },
    {
     "sku": "Enterprise",
     "price": "52.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "4 TB"
    }
   ]
  }
 ],
 [
  "light-hcm",
  {
   "price": "7.71",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/vietnam-vps",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "7.71",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "14.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Premium",
     "price": "27.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "3 TB"
    },
    {
     "sku": "Enterprise",
     "price": "52.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "4 TB"
    }
   ]
  }
 ],
 [
  "light-manila",
  {
   "price": "21.2",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/manila-vds",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "21.2",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "40.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Premium",
     "price": "80.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Enterprise",
     "price": "158.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    }
   ]
  }
 ],
 [
  "field-62f0363953ae",
  {
   "price": "21.2",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/zh/taipei-vds",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "21.2",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "40.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Premium",
     "price": "80.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Enterprise",
     "price": "158.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    }
   ]
  }
 ],
 [
  "field-4b59a20d69d9",
  {
   "price": "21.2",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/tokyo-vds",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "21.2",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "40.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Premium",
     "price": "80.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Enterprise",
     "price": "158.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    }
   ]
  }
 ],
 [
  "field-117392aaa88c",
  {
   "price": "10.41",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/hong-kong-vps",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "10.41",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "20.11",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Premium",
     "price": "38.51",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "3 TB"
    },
    {
     "sku": "Enterprise",
     "price": "74.31",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "4 TB"
    }
   ]
  }
 ],
 [
  "field-d5bf12ae18c3",
  {
   "price": "7.71",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/singapore-vps",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "7.71",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "14.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Premium",
     "price": "27.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "3 TB"
    },
    {
     "sku": "Enterprise",
     "price": "52.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "4 TB"
    }
   ]
  }
 ],
 [
  "field-d25c7b12293a",
  {
   "price": "7.71",
   "currency": "USD",
   "term": "monthlyEquivalent",
   "sku": "Start",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "50 GB NVMe SSD",
   "traffic": "1 TB",
   "proof": "https://go.lightnode.com/london-vps",
   "date": "2026-11-20",
   "tiers": [
    {
     "sku": "Start",
     "price": "7.71",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "1 vCPU",
     "ram": "2 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "1 TB"
    },
    {
     "sku": "Agency",
     "price": "14.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "2 vCPU",
     "ram": "4 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "2 TB"
    },
    {
     "sku": "Premium",
     "price": "27.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "4 vCPU",
     "ram": "8 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "3 TB"
    },
    {
     "sku": "Enterprise",
     "price": "52.7",
     "term": "monthlyEquivalent",
     "currency": "USD",
     "cpu": "8 vCPU",
     "ram": "16 GB",
     "disk": "50 GB NVMe SSD",
     "traffic": "4 TB"
    }
   ]
  }
 ],
 [
  "field-00acaa4d5776",
  {
   "price": "6.00",
   "currency": "USD",
   "term": "month",
   "sku": "Basic Regular / 1 GiB",
   "cpu": "1 vCPU",
   "ram": "1 GiB",
   "disk": "25 GiB SSD",
   "traffic": "1,000 GiB",
   "proof": "https://www.digitalocean.com/pricing/droplets",
   "date": "2026-11-20"
  }
 ]
]);
for(const p of PLANS){const spec=SKU_SNAPSHOTS.get(p.id);if(spec)p.spec=spec}
PLANS.push(...[
 {
  "id": "shop-246adde843a0",
  "market": "TW",
  "city": "Taipei",
  "provider": "ByteVirt",
  "plan": "VPS-1024-KVM-Hinet-D-TW",
  "kind": "vps",
  "ip": "isp",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://web.bytevirt.net/store/tw-isp-vps?language=english",
  "spec": {
   "price": "30",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1024-KVM-Hinet-D-TW",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "20 TB",
   "port": "300 Mbps",
   "sourceNote": {
    "sc": "超出套餐流量后限速至 1 Mbps。",
    "tc": "超出方案流量後限速至 1 Mbps。",
    "en": "After the included transfer is used, the port is throttled to 1 Mbps.",
    "ja": "付属の転送量を使い切ると 1 Mbps に制限されます。"
   },
   "proof": "https://web.bytevirt.net/store/tw-isp-vps?language=english",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1af996b0bc93",
  "market": "TW",
  "city": "Taiwan",
  "provider": "CyStar",
  "plan": "TW-VPS-Light",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cystar.work/products",
  "spec": {
   "price": "840",
   "currency": "TWD",
   "term": "month",
   "sku": "TW-VPS-Light",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "2 TB",
   "port": "50 Mbps",
   "proof": "https://cystar.work/products",
   "disk": "25 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5802223d986a",
  "market": "TW",
  "city": "Taiwan",
  "provider": "CheapServer",
  "plan": "TW-VPS-S",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://store.cheapserver.tw/store/tw-vps",
  "spec": {
   "price": "320",
   "currency": "TWD",
   "term": "month",
   "sku": "TW-VPS-S",
   "cpu": "1 vCPU",
   "ram": "4 GB",
   "traffic": "1 TB",
   "proof": "https://store.cheapserver.tw/store/tw-vps",
   "disk": "20 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e746b92ab6a9",
  "market": "TW",
  "city": "Taiwan",
  "provider": "Server Plus",
  "plan": "TW-VPS-XS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://serverplus.tw/taiwan-vps",
  "spec": {
   "price": "840",
   "currency": "TWD",
   "term": "month",
   "sku": "TW-VPS-XS",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "2000 GB",
   "port": "50 Mbps",
   "proof": "https://serverplus.tw/taiwan-vps",
   "disk": "25 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ff852c216579",
  "market": "TW",
  "city": "Taiwan",
  "provider": "Foresight Digital",
  "plan": "VPS XS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.fsdt.com.tw/services/vps/",
  "spec": {
   "price": "840",
   "currency": "TWD",
   "term": "month",
   "sku": "VPS XS",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "2000 GB",
   "port": "50 Mbps",
   "proof": "https://www.fsdt.com.tw/services/vps/",
   "disk": "25 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a2ebcdbeef84",
  "market": "TW",
  "city": "Taiwan",
  "provider": "IMCLOUD",
  "plan": "Taiwan VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.imxd.net/cloudvps.html"
 },
 {
  "id": "shop-b7a639ae617d",
  "market": "TW",
  "city": "Taiwan",
  "provider": "VPS For Life",
  "plan": "KVM entry · Taiwan",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vpsforlife.com/vps-hosting-in-taiwan",
  "spec": {
   "price": "39.90",
   "currency": "USD",
   "term": "month",
   "sku": "KVM entry · Taiwan",
   "sourceNote": {
    "sc": "价格包含所选地区的附加费。",
    "tc": "價格包含所選地區的附加費。",
    "en": "The price includes the selected region’s surcharge.",
    "ja": "選択した地域の追加料金を含みます。"
   },
   "proof": "https://vpsforlife.com/vps-hosting-in-taiwan",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-abd2980a2df2",
  "market": "TW",
  "city": "Taiwan",
  "provider": "Evoxt",
  "plan": "VM-0.5",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://evoxt.com/zh/vps/vps-taiwan/",
  "spec": {
   "price": "2.99",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "proof": "https://evoxt.com/zh/vps/vps-taiwan/",
   "disk": "5 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8ebc05797210",
  "market": "TW",
  "city": "Taiwan",
  "provider": "NSS",
  "plan": "Taiwan Dedicated Server",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.nss.com.tw/dedicatedservertw-2"
 },
 {
  "id": "shop-0a45c25b519e",
  "market": "JP",
  "city": "Tokyo",
  "provider": "SORAHOST",
  "plan": "VPS Micro",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://sorahost.net/vps",
  "spec": {
   "price": "700",
   "currency": "JPY",
   "term": "month",
   "sku": "VPS Micro",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "sourceNote": {
    "sc": "使用共享 IP，端口由商家分配。",
    "tc": "使用共用 IP，連接埠由商家分配。",
    "en": "The provider assigns ports on a shared IP address.",
    "ja": "共有 IP のポートは事業者が割り当てます。"
   },
   "proof": "https://sorahost.net/vps",
   "disk": "10 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8f1aa2fb4b54",
  "market": "JP",
  "city": "Tokyo",
  "provider": "MOKLAV",
  "plan": "Ashigaru",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.moklav.co.jp/pricing",
  "spec": {
   "price": "550",
   "currency": "JPY",
   "term": "month",
   "sku": "Ashigaru",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "sourceNote": {
    "sc": "月价含税。",
    "tc": "月費含稅。",
    "en": "Monthly price including tax.",
    "ja": "月額は税込です。"
   },
   "proof": "https://www.moklav.co.jp/pricing",
   "disk": "15 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-196d2505137a",
  "market": "JP",
  "city": "Tokyo / Osaka",
  "provider": "WebARENA",
  "plan": "SuitePRO V4 · 4G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://web.arena.ne.jp/suitepro/",
  "spec": {
   "price": "10400",
   "currency": "JPY",
   "term": "month",
   "sku": "SuitePRO V4 · 4G",
   "cpu": "4 vCPU",
   "ram": "4 GB",
   "proof": "https://web.arena.ne.jp/suitepro/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-55fae6ef6799",
  "market": "JP",
  "city": "Inzai",
  "provider": "DDPS",
  "plan": "Ryzen 9 7900 · 128 GB",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://ddps.jp/dedicated/",
  "spec": {
   "price": "27500",
   "currency": "JPY",
   "term": "month",
   "sku": "Ryzen 9 7900 · 128 GB",
   "cpu": "12C / 24T",
   "ram": "128 GB",
   "traffic": "30 TB",
   "port": "10 Gbps",
   "proof": "https://ddps.jp/dedicated/",
   "disk": "2 × 2 TB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-528a444afed5",
  "market": "JP",
  "city": "Japan",
  "provider": "Powoke",
  "plan": "JP-1H1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.powoke.com/en/japan-vps",
  "spec": {
   "price": "11",
   "currency": "USD",
   "term": "month",
   "sku": "JP-1H1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "10 Mbps",
   "proof": "https://www.powoke.com/en/japan-vps",
   "disk": "70 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-48b2d9110af3",
  "market": "JP",
  "city": "Tokyo",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://virtono.com/tokyo-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "欧盟客户的增值税按结账条件另计。",
    "tc": "歐盟客戶的增值稅依結帳條件另計。",
    "en": "EU customers may owe additional VAT under the checkout terms.",
    "ja": "EU の利用者には購入時の条件に応じて VAT が別途加算されます。"
   },
   "proof": "https://virtono.com/tokyo-vps",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5fbe21ceef5a",
  "market": "JP",
  "city": "Tokyo",
  "provider": "VPS.DO",
  "plan": "Tokyo KVM 2C4G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vps.do/jp/",
  "spec": {
   "price": "12",
   "currency": "USD",
   "term": "month",
   "sku": "Tokyo KVM 2C4G",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "port": "6 Mbps",
   "proof": "https://vps.do/jp/",
   "disk": "60 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-277e526606fd",
  "market": "JP",
  "city": "Japan",
  "provider": "HostCano",
  "plan": "JP-2G-KVM-VPS · Ember",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hostcano.com/vps-japan",
  "spec": {
   "price": "6.99",
   "currency": "USD",
   "term": "month",
   "sku": "JP-2G-KVM-VPS · Ember",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "2 TB",
   "port": "10 Gbps",
   "proof": "https://hostcano.com/vps-japan",
   "disk": "30 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c431e2f9a61f",
  "market": "JP",
  "city": "Tokyo",
  "provider": "TooServer",
  "plan": "Tokyo CN2 · 32 GB / 16 cores",
  "kind": "vps",
  "ip": "local",
  "route": "claimed",
  "routeName": "CN2",
  "carriers": [],
  "url": "https://tooserver.net/en/japan-vps/tokyo-cn2-32gb-16core-10m/",
  "spec": {
   "price": "899",
   "currency": "CNY",
   "term": "month",
   "sku": "Tokyo CN2 · 32 GB / 16 cores",
   "cpu": "16 vCPU",
   "ram": "32 GB",
   "port": "10 Mbps",
   "proof": "https://tooserver.net/en/japan-vps/tokyo-cn2-32gb-16core-10m/",
   "disk": "500 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-6913da4609dc",
  "market": "TW",
  "city": "Taipei",
  "provider": "PartVPS",
  "plan": "C1-2 · Flex",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://partvps.com/vps/taipei",
  "spec": {
   "price": "37.90",
   "currency": "USD",
   "term": "month",
   "sku": "C1-2 · Flex",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "1 TB",
   "proof": "https://partvps.com/vps/taipei",
   "disk": "50 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-824d3be1eb0e",
  "market": "JP",
  "city": "Tokyo",
  "provider": "FormoHost",
  "plan": "Japan VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.formohost.com/japan-vps/",
  "spec": {
   "price": "19.85",
   "currency": "USD",
   "term": "month",
   "sku": "Japan VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "port": "200 Mbps",
   "sourceNote": {
    "sc": "官网月价另加 10% 税。",
    "tc": "官網月費另加 10% 稅。",
    "en": "The listed monthly rate is subject to an additional 10% tax.",
    "ja": "表示月額に税金 10% が加算されます。"
   },
   "proof": "https://www.formohost.com/japan-vps/",
   "disk": "20 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-cb7f723135ed",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Powoke",
  "plan": "HK-1H1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.powoke.com/en/hong-kong-vps",
  "spec": {
   "price": "8.80",
   "currency": "USD",
   "term": "month",
   "sku": "HK-1H1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "10 Mbps",
   "proof": "https://www.powoke.com/en/hong-kong-vps",
   "disk": "70 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-9406b381ea0c",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "IMIDC",
  "plan": "HK-Cloud-01",
  "kind": "vps",
  "ip": "local",
  "route": "claimed",
  "routeName": "CN2",
  "carriers": [],
  "url": "https://www.imidc.com/store/hongkong-cloud",
  "spec": {
   "price": "18",
   "currency": "USD",
   "term": "month",
   "sku": "HK-Cloud-01",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "traffic": "500 GB",
   "port": "100 Mbps",
   "proof": "https://www.imidc.com/store/hongkong-cloud",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c917a2880ebf",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "1688 St George",
  "plan": "HK-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.1688stgeorge.cloud/cloud.html",
  "spec": {
   "price": "9.99",
   "currency": "USD",
   "term": "month",
   "sku": "HK-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "500 GB",
   "port": "100 Mbps",
   "proof": "https://www.1688stgeorge.cloud/cloud.html",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-062ca5bec457",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.virtono.com/hongkong-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "欧盟客户的增值税按结账条件另计。",
    "tc": "歐盟客戶的增值稅依結帳條件另計。",
    "en": "EU customers may owe additional VAT under the checkout terms.",
    "ja": "EU の利用者には購入時の条件に応じて VAT が別途加算されます。"
   },
   "proof": "https://www.virtono.com/hongkong-vps",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-022c3cb2e958",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "KVMB",
  "plan": "Standard.A1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://kvmb.com/pricing",
  "spec": {
   "price": "15",
   "currency": "USD",
   "term": "month",
   "sku": "Standard.A1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "500 GB",
   "port": "500 Mbps",
   "proof": "https://kvmb.com/pricing",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-85efa1536feb",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "UFOCloud",
  "plan": "HKBGP-C",
  "kind": "vps",
  "ip": "local",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ufovps.com/hk_vps_pro/?language=english",
  "spec": {
   "price": "138",
   "currency": "CNY",
   "term": "month",
   "sku": "HKBGP-C",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "port": "20 Mbps",
   "proof": "https://www.ufovps.com/hk_vps_pro/?language=english",
   "disk": "80 GB RAID10",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1942a109e91e",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "LuckVM",
  "plan": "1 vCPU · 70 GB NVMe",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.luckvm.com/tw/hk-cloud-server.html",
  "spec": {
   "price": "8.80",
   "currency": "USD",
   "term": "month",
   "sku": "1 vCPU · 70 GB NVMe",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "10 Mbps",
   "proof": "https://www.luckvm.com/tw/hk-cloud-server.html",
   "disk": "70 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-fcd497867304",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Tudcloud",
  "plan": "HK.KVM.1C1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "claimed",
  "routeName": "CN2",
  "carriers": [],
  "url": "https://tudcloud.org/vps-hk.php",
  "spec": {
   "price": "5",
   "currency": "USD",
   "term": "month",
   "sku": "HK.KVM.1C1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "port": "3 Mbps",
   "proof": "https://tudcloud.org/vps-hk.php",
   "disk": "10 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-6ec774323401",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "PartVPS",
  "plan": "Flex C1-2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://partvps.com/vps/hong-kong",
  "spec": {
   "price": "21.90",
   "currency": "USD",
   "term": "month",
   "sku": "Flex C1-2",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "1 TB",
   "proof": "https://partvps.com/vps/hong-kong",
   "disk": "50 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5ea31cc476de",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "YecaoYun",
  "plan": "Linux BGP · 1C1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.yecaoyun.com/Virtual/vps.html",
  "spec": {
   "price": "19",
   "currency": "CNY",
   "term": "month",
   "sku": "Linux BGP · 1C1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "5 Mbps",
   "proof": "https://www.yecaoyun.com/Virtual/vps.html",
   "disk": "10 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4bd95c2257c3",
  "market": "KR",
  "city": "South Korea",
  "provider": "DOOLHANA.NET",
  "plan": "Standard D1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.doolhana.net/en/vps",
  "spec": {
   "price": "12",
   "currency": "USD",
   "term": "month",
   "sku": "Standard D1",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "proof": "https://www.doolhana.net/en/vps",
   "disk": "50 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4f4d8c8b637a",
  "market": "KR",
  "city": "Seoul",
  "provider": "VPS For Life",
  "plan": "KVM entry · Seoul",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vpsforlife.com/vps-hosting-in-south-korea",
  "spec": {
   "price": "37.90",
   "currency": "USD",
   "term": "month",
   "sku": "KVM entry · Seoul",
   "sourceNote": {
    "sc": "价格包含所选地区的附加费。",
    "tc": "價格包含所選地區的附加費。",
    "en": "The price includes the selected region’s surcharge.",
    "ja": "選択した地域の追加料金を含みます。"
   },
   "proof": "https://vpsforlife.com/vps-hosting-in-south-korea",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-fde919ec0396",
  "market": "KR",
  "city": "Incheon",
  "provider": "KernelHost",
  "plan": "Edge KVM - 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.kernelhost.com/en/vps-south-korea-seoul",
  "spec": {
   "price": "40.99",
   "currency": "EUR",
   "term": "month",
   "sku": "Edge KVM - 1",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "Unmetered",
   "port": "Up to 1 Gbps",
   "proof": "https://www.kernelhost.com/en/vps-south-korea-seoul",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-2b2b4cc1f813",
  "market": "KR",
  "city": "Seoul",
  "provider": "Hostex",
  "plan": "KVM 2 vCPU",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hostex.co/kr/vps",
  "spec": {
   "price": "53820",
   "currency": "KRW",
   "term": "month",
   "sku": "KVM 2 vCPU",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "traffic": "Unmetered",
   "proof": "https://hostex.co/kr/vps",
   "disk": "100 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4bac38289784",
  "market": "KR",
  "city": "Seoul",
  "provider": "FormoHost",
  "plan": "South Korea VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.formohost.com/south-korea-vps/",
  "spec": {
   "price": "19.85",
   "currency": "USD",
   "term": "month",
   "sku": "South Korea VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "500 GB",
   "port": "100 Mbps",
   "sourceNote": {
    "sc": "官网月价另加 10% 税。",
    "tc": "官網月費另加 10% 稅。",
    "en": "The listed monthly rate is subject to an additional 10% tax.",
    "ja": "表示月額に税金 10% が加算されます。"
   },
   "proof": "https://www.formohost.com/south-korea-vps/",
   "disk": "20 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-0a5b5ef7ec8c",
  "market": "KR",
  "city": "Seoul",
  "provider": "Powoke",
  "plan": "KR-1H1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.powoke.com/en/south-korea-vps",
  "spec": {
   "price": "11",
   "currency": "USD",
   "term": "month",
   "sku": "KR-1H1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "10 Mbps",
   "proof": "https://www.powoke.com/en/south-korea-vps",
   "disk": "70 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-132523f26866",
  "market": "KR",
  "city": "Seoul",
  "provider": "HELPER VPS",
  "plan": "SSD G12",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://helpervps.com/ko/locations/south-korea",
  "spec": {
   "price": "25",
   "currency": "USD",
   "term": "month",
   "sku": "SSD G12",
   "cpu": "6 vCPU",
   "ram": "12 GB",
   "traffic": "5 TB",
   "proof": "https://helpervps.com/ko/locations/south-korea",
   "disk": "260 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-adef5e1ac9db",
  "market": "KR",
  "city": "Seoul",
  "provider": "SJNoDE",
  "plan": "VPS 2 vCPU",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://sjnode.kr/products/vps",
  "spec": {
   "price": "3900",
   "currency": "KRW",
   "term": "month",
   "sku": "VPS 2 vCPU",
   "cpu": "2 vCPU",
   "ram": "1–6 GB",
   "traffic": "250 GB–1.5 TB",
   "port": "100 Mbps",
   "proof": "https://sjnode.kr/products/vps",
   "disk": "25–50 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-6e94dfb9da3d",
  "market": "KR",
  "city": "Seoul",
  "provider": "VPC.KR",
  "plan": "512 MB VPS",
  "kind": "vps",
  "ip": "local",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vpc.kr/ko",
  "spec": {
   "price": "5.80",
   "currency": "USD",
   "term": "month",
   "sku": "512 MB VPS",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "port": "5 Mbps",
   "proof": "https://vpc.kr/ko",
   "disk": "10 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8ebb1a6bffb2",
  "market": "KR",
  "city": "Seoul",
  "provider": "Datascale",
  "plan": "Nano",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://datascale.kr/vps",
  "spec": {
   "price": "5000",
   "currency": "KRW",
   "term": "month",
   "sku": "Nano",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "100 GB",
   "proof": "https://datascale.kr/vps",
   "disk": "25 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-24e38876896e",
  "market": "SG",
  "city": "Singapore",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.virtono.com/singapore-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "欧盟客户的增值税按结账条件另计。",
    "tc": "歐盟客戶的增值稅依結帳條件另計。",
    "en": "EU customers may owe additional VAT under the checkout terms.",
    "ja": "EU の利用者には購入時の条件に応じて VAT が別途加算されます。"
   },
   "proof": "https://www.virtono.com/singapore-vps",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ed56a55e8a6f",
  "market": "SG",
  "city": "Singapore",
  "provider": "Powoke",
  "plan": "SG-1H1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.powoke.com/en/singapore-vps",
  "spec": {
   "price": "11",
   "currency": "USD",
   "term": "month",
   "sku": "SG-1H1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "10 Mbps",
   "proof": "https://www.powoke.com/en/singapore-vps",
   "disk": "70 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-70052a10ee86",
  "market": "SG",
  "city": "Singapore",
  "provider": "Hostease",
  "plan": "SG01 · Native IP",
  "kind": "vps",
  "ip": "local",
  "route": "claimed",
  "routeName": "CN2",
  "carriers": [],
  "url": "https://www.hostease.com/sgvps.html",
  "spec": {
   "price": "17",
   "currency": "USD",
   "term": "month",
   "sku": "SG01 · Native IP",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "port": "10 Mbps",
   "proof": "https://www.hostease.com/sgvps.html",
   "disk": "50 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7355398a4325",
  "market": "SG",
  "city": "Singapore",
  "provider": "Hyperswitches",
  "plan": "CLVPS1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hyperswitches.com/cloud-vps/singapore",
  "spec": {
   "price": "12",
   "currency": "EUR",
   "term": "month",
   "sku": "CLVPS1",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "5 TB",
   "proof": "https://hyperswitches.com/cloud-vps/singapore",
   "disk": "40 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ae7a3e8c6bf9",
  "market": "SG",
  "city": "Singapore",
  "provider": "Nxeon",
  "plan": "Singapore NVMe VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.nxeon.cloud/vps"
 },
 {
  "id": "shop-3acf3c1473e2",
  "market": "SG",
  "city": "Singapore",
  "provider": "VPS.Taxi",
  "plan": "SG 512M",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://my.vps.taxi/order/main/packages/vps/?group_id=11",
  "spec": {
   "price": "3",
   "currency": "USD",
   "term": "month",
   "sku": "SG 512M",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://my.vps.taxi/order/main/packages/vps/?group_id=11",
   "disk": "10 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-3eca31d7e6bb",
  "market": "SG",
  "city": "Singapore",
  "provider": "AsiaWebHost",
  "plan": "VPS M",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://asiawebhost.net/linux-vps",
  "spec": {
   "price": "70",
   "currency": "SGD",
   "term": "month",
   "sku": "VPS M",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "traffic": "4 TB",
   "port": "1 Gbps",
   "proof": "https://asiawebhost.net/linux-vps",
   "disk": "100 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8612da1679b4",
  "market": "SG",
  "city": "Singapore",
  "provider": "Incognito VPS",
  "plan": "HV-1 SCOUT",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.incognitovps.com/vps/singapore",
  "spec": {
   "price": "5.50",
   "currency": "USD",
   "term": "month",
   "sku": "HV-1 SCOUT",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "2 TB",
   "proof": "https://www.incognitovps.com/vps/singapore",
   "disk": "25 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c1fd76c41019",
  "market": "SG",
  "city": "Singapore",
  "provider": "ByteVirt",
  "plan": "VPS-512-KVM-SG",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://web.bytevirt.net/store/vps-sg-kvm?language=chinese-as",
  "spec": {
   "price": "16.88",
   "currency": "USD",
   "term": "year",
   "sku": "VPS-512-KVM-SG",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "traffic": "500 GB",
   "port": "500 Mbps",
   "proof": "https://web.bytevirt.net/store/vps-sg-kvm?language=chinese-as",
   "disk": "8 GB NVMe RAID1",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-503a17807cfc",
  "market": "SG",
  "city": "Singapore",
  "provider": "DropVPS",
  "plan": "Nano",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.dropvps.com/singapore-vps/linux",
  "spec": {
   "price": "5.90",
   "currency": "USD",
   "term": "month",
   "sku": "Nano",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "proof": "https://www.dropvps.com/singapore-vps/linux",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-6286b14483db",
  "market": "SG",
  "city": "Singapore",
  "provider": "Cloudzy",
  "plan": "512 MB · ap-sgp-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloudzy.com/philippines-vps",
  "spec": {
   "price": "4.95",
   "currency": "USD",
   "term": "month",
   "sku": "512 MB · ap-sgp-1",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "traffic": "1 TB",
   "port": "40 Gbps uplink",
   "sourceNote": {
    "sc": "表中为原价。新加坡机房按年预付的促销价折合每月 USD 2.48。",
    "tc": "表中為原價。新加坡機房按年預付的促銷價折合每月 USD 2.48。",
    "en": "The listing shows the regular price. Annual promotional billing for Singapore works out to USD 2.48 per month.",
    "ja": "表示額は通常料金です。シンガポール拠点の年払いキャンペーンは月額換算 USD 2.48 です。"
   },
   "proof": "https://cloudzy.com/philippines-vps",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-9212728b51b9",
  "market": "SG",
  "city": "Singapore",
  "provider": "TOYO Hosting",
  "plan": "Starter Singapore",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hosting.tyis.co.jp/vps/",
  "spec": {
   "price": "1400",
   "currency": "JPY",
   "term": "month",
   "sku": "Starter Singapore",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "sourceNote": {
    "sc": "一次性开通费相当于一个月租金。",
    "tc": "一次性開通費相當於一個月租金。",
    "en": "The one-time setup fee equals one month’s rental.",
    "ja": "初期費用は月額料金の1か月分です。"
   },
   "proof": "https://hosting.tyis.co.jp/vps/",
   "disk": "10 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-08323017d159",
  "market": "SG",
  "city": "Singapore",
  "provider": "Temok",
  "plan": "Singapore Linux VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.temok.com/linux-virtual-private-server-vps-singapore"
 },
 {
  "id": "shop-ba610cdfd7b1",
  "market": "PH",
  "city": "Manila",
  "provider": "E4S",
  "plan": "Manila Cloud VPS · 16/32",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.e4s.network/servers/philippines",
  "spec": {
   "sku": "Manila Cloud VPS · 16/32",
   "cpu": "16 vCPU",
   "ram": "32 GB",
   "proof": "https://www.e4s.network/servers/philippines",
   "disk": "50 GB OS + 300 GB data",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-60faeb22e8e6",
  "market": "PH",
  "city": "Manila",
  "provider": "Amazon Web Services",
  "plan": "EC2 · Manila Local Zone",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/about-aws/whats-new/2023/06/general-availability-aws-local-zones-manila/"
 },
 {
  "id": "shop-531ed6d17abb",
  "market": "PH",
  "city": "Philippines",
  "provider": "CloudSigma",
  "plan": "Philippines IaaS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloud.com.ph/"
 },
 {
  "id": "shop-69f86d21a79a",
  "market": "PH",
  "city": "Quezon City",
  "provider": "CloudLake",
  "plan": "Metro Manila Cloud",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloudlake.ph/data-center"
 },
 {
  "id": "shop-859ae39b8c59",
  "market": "PH",
  "city": "Clark",
  "provider": "CTO Cloud",
  "plan": "Vitro Clark IaaS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.cto.com.ph/"
 },
 {
  "id": "shop-a6c862e49265",
  "market": "PH",
  "city": "Manila",
  "provider": "ShopKeyPri",
  "plan": "Manila KVM 2C4G",
  "kind": "vps",
  "ip": "local",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://shopkeypri.com/manila-cloud-nvme-vps-ph",
  "spec": {
   "price": "9.90",
   "currency": "USD",
   "term": "month",
   "sku": "Manila KVM 2C4G",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "proof": "https://shopkeypri.com/manila-cloud-nvme-vps-ph",
   "disk": "60 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-f7449cead9bf",
  "market": "PH",
  "city": "Manila",
  "provider": "PartVPS",
  "plan": "Flex AS2-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://partvps.com/vps/manila",
  "spec": {
   "price": "10.90",
   "currency": "USD",
   "term": "month",
   "sku": "Flex AS2-1",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "proof": "https://partvps.com/vps/manila",
   "disk": "30 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-9ed89fef3aec",
  "market": "TW",
  "city": "Taipei",
  "provider": "Hosthink",
  "plan": "TPE-1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/taipei-taiwan/",
  "sku": "TPE-1",
  "spec": {
   "price": "249.90",
   "currency": "USD",
   "term": "month",
   "sku": "TPE-1",
   "cpu": "Xeon E3-1230v3 · 4C/8T",
   "ram": "16 GB",
   "traffic": "Unmetered",
   "port": "100 Mbps",
   "proof": "https://www.hosthink.net/dedicated-servers/taipei-taiwan/",
   "disk": "240 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1932f7448005",
  "market": "TW",
  "city": "Taiwan",
  "provider": "MoonVM",
  "plan": "STATIC STARTER (HINET)",
  "kind": "vps",
  "ip": "isp",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://store.moonvm.com/index.php?rp=/store/taiwan-hinet-vps-static",
  "spec": {
   "price": "45",
   "currency": "USD",
   "term": "month",
   "sku": "STATIC STARTER (HINET)",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "4 TB outbound",
   "port": "500 Mbps shared",
   "proof": "https://store.moonvm.com/index.php?rp=/store/taiwan-hinet-vps-static",
   "disk": "10 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-33c2869a195e",
  "market": "JP",
  "city": "Tokyo",
  "provider": "Hosthink",
  "plan": "TYO-1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/tokyo-japan/",
  "sku": "TYO-1",
  "spec": {
   "price": "199.90",
   "currency": "USD",
   "term": "month",
   "sku": "TYO-1",
   "cpu": "Xeon E3-1230v2 · 4C/8T",
   "ram": "8 GB",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/tokyo-japan/",
   "disk": "1 TB SATA",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-d5e6aeb4e992",
  "market": "JP",
  "city": "Tokyo",
  "provider": "ByteVirt",
  "plan": "VPS-1024-KVM-ISP-JP",
  "kind": "vps",
  "ip": "isp",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://bytevirt.com/store/jp-isp-vps?language=english",
  "spec": {
   "price": "10",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1024-KVM-ISP-JP",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "port": "300 Mbps",
   "sourceNote": {
    "sc": "超出套餐流量后限速至 1 Mbps。",
    "tc": "超出方案流量後限速至 1 Mbps。",
    "en": "After the included transfer is used, the port is throttled to 1 Mbps.",
    "ja": "付属の転送量を使い切ると 1 Mbps に制限されます。"
   },
   "proof": "https://bytevirt.com/store/jp-isp-vps?language=english",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-f154e4373acd",
  "market": "JP",
  "city": "Tokyo",
  "provider": "PartVPS",
  "plan": "Flex C1-1-25",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://partvps.com/vps/tokyo",
  "spec": {
   "price": "9.90",
   "currency": "USD",
   "term": "month",
   "sku": "Flex C1-1-25",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "proof": "https://partvps.com/vps/tokyo",
   "disk": "25 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-9a8f925a4719",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Hosthink",
  "plan": "HKG-1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/hong-kong/",
  "sku": "HKG-1",
  "spec": {
   "price": "199.90",
   "currency": "USD",
   "term": "month",
   "sku": "HKG-1",
   "cpu": "Xeon E3-1230v2 · 4C/8T",
   "ram": "8 GB",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/hong-kong/",
   "disk": "1 TB SATA",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-58e22e954423",
  "market": "KR",
  "city": "Seoul",
  "provider": "Hosthink",
  "plan": "SEL-1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/seoul-south-korea/",
  "sku": "SEL-1",
  "spec": {
   "price": "277.50",
   "currency": "USD",
   "term": "month",
   "sku": "SEL-1",
   "cpu": "Xeon E-2286G · 6C/12T",
   "ram": "32 GB",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/seoul-south-korea/",
   "disk": "2 × 960 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-2e8909462a3b",
  "market": "KR",
  "city": "South Korea",
  "provider": "NHN Cloud",
  "plan": "Compute Instance · KR",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://docs.nhncloud.com/en/Compute/Instance/en/public-api/"
 },
 {
  "id": "shop-8026d173afaf",
  "market": "KR",
  "city": "South Korea",
  "provider": "NAVER Cloud",
  "plan": "Server · Korea Region",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://guide.ncloud-docs.com/docs/en/server-spec-classic"
 },
 {
  "id": "shop-9cb5d21242c1",
  "market": "SG",
  "city": "Singapore",
  "provider": "Hosthink",
  "plan": "SIN-1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/singapore/",
  "sku": "SIN-1",
  "spec": {
   "price": "199.90",
   "currency": "USD",
   "term": "month",
   "sku": "SIN-1",
   "cpu": "Xeon E3-1230v2 · 4C/8T",
   "ram": "8 GB",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/singapore/",
   "disk": "1 TB SATA",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-6e8d0ca9a596",
  "market": "VN",
  "city": "Hanoi",
  "provider": "ThueCloud",
  "plan": "VPS Việt Nam 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://thuecloud.vn/vps-viet-nam",
  "spec": {
   "price": "45000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS Việt Nam 1",
   "cpu": "1 vCPU",
   "ram": "1024 MB",
   "port": "1 Gbps domestic",
   "proof": "https://thuecloud.vn/vps-viet-nam",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-948f38146d15",
  "market": "VN",
  "city": "Vietnam",
  "provider": "MekongMMO",
  "plan": "Cloud VPS VN 1-1-30",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://mekongmmo.com/products/cloud-vps-vietnam/cloud-vps-vn-1-1-30",
  "spec": {
   "price": "4.80",
   "currency": "USD",
   "term": "month",
   "sku": "Cloud VPS VN 1-1-30",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "200 Mbps domestic / 20 Mbps international",
   "proof": "https://mekongmmo.com/products/cloud-vps-vietnam/cloud-vps-vn-1-1-30",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-27f7aed5df5f",
  "market": "VN",
  "city": "Vietnam",
  "provider": "Wikacloud",
  "plan": "VPS Việt Nam 1C1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://wikacloud.com/",
  "spec": {
   "price": "49000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS Việt Nam 1C1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "proof": "https://wikacloud.com/",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7c1f5ebc0430",
  "market": "VN",
  "city": "Vietnam",
  "provider": "TopCloud",
  "plan": "VPS tiêu chuẩn",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://topcloud.vn/vps-hosting/",
  "spec": {
   "sku": "VPS tiêu chuẩn",
   "port": "1 Gbps",
   "proof": "https://topcloud.vn/vps-hosting/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-f0f0d26399ad",
  "market": "VN",
  "city": "Vietnam",
  "provider": "TaiVPS",
  "plan": "Plan 1-1-20",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.tuenghievent.com/buy-cloud-vps-pro",
  "spec": {
   "price": "1000",
   "currency": "VND",
   "term": "hour",
   "sku": "Plan 1-1-20",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "port": "10 Gbps download / 50 Mbps upload",
   "proof": "https://www.tuenghievent.com/buy-cloud-vps-pro",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-539931eae471",
  "market": "VN",
  "city": "Vietnam",
  "provider": "VietServer",
  "plan": "Cloud VN #2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vietserver.vn/dich-vu/cloud-vps-viet-nam",
  "spec": {
   "price": "179000",
   "currency": "VND",
   "term": "month",
   "sku": "Cloud VN #2",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "traffic": "Unmetered",
   "port": "10 Gbps",
   "proof": "https://vietserver.vn/dich-vu/cloud-vps-viet-nam",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-fddc1c8c4262",
  "market": "VN",
  "city": "Vietnam",
  "provider": "Clouding.vn",
  "plan": "VPS Việt Nam Plan 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://clouding.vn/services/vps-viet-nam/",
  "spec": {
   "price": "109000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS Việt Nam Plan 1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "proof": "https://clouding.vn/services/vps-viet-nam/",
   "disk": "30 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-2735bf3c252e",
  "market": "VN",
  "city": "Vietnam",
  "provider": "Bumboohost",
  "plan": "Cloud VPS 2-2-20",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://bumboohost.vn/cloud-vps",
  "spec": {
   "price": "110000",
   "currency": "VND",
   "term": "month",
   "sku": "Cloud VPS 2-2-20",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "port": "200 Mbps",
   "proof": "https://bumboohost.vn/cloud-vps",
   "disk": "20 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-d89aa6f29580",
  "market": "VN",
  "city": "Vietnam",
  "provider": "TrumVPS",
  "plan": "VPS Việt Nam - 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://trumvps.devttt.com/vps-viet-nam/",
  "spec": {
   "price": "40000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS Việt Nam - 1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "proof": "https://trumvps.devttt.com/vps-viet-nam/",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-545abdb16221",
  "market": "VN",
  "city": "Vietnam",
  "provider": "VinaCloud",
  "plan": "Cloud VN #1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.vinacloud.vn/cloud-server",
  "spec": {
   "price": "149000",
   "currency": "VND",
   "term": "month",
   "sku": "Cloud VN #1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "proof": "https://www.vinacloud.vn/cloud-server",
   "disk": "30 GB NVMe",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-168aaf5d6961",
  "market": "VN",
  "city": "Vietnam",
  "provider": "CloudNest",
  "plan": "VPS 1-1-20",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloudnest.vn/bang-gia",
  "spec": {
   "price": "80000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS 1-1-20",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "Unmetered",
   "port": "200 Mbps",
   "sourceNote": {
    "sc": "默认自动分配机房。价格未含 10% VAT。指定河内或胡志明市另收每月 VND 10,000。",
    "tc": "預設自動分配機房。價格未含 10% VAT。指定河內或胡志明市另收每月 VND 10,000。",
    "en": "The default facility is assigned automatically. Add 10% VAT. Selecting Hanoi or Ho Chi Minh City costs another VND 10,000 per month.",
    "ja": "標準では拠点は自動割当です。表示額に VAT 10% が加算されます。ハノイまたはホーチミンの指定は月額 VND 10,000 の追加です。"
   },
   "proof": "https://cloudnest.vn/bang-gia",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-bb95ac25c021",
  "market": "VN",
  "city": "Vietnam",
  "provider": "Cloudzone",
  "plan": "Cloud VPS 1-1-30",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloudzone.vn/cloud-server",
  "spec": {
   "price": "100000",
   "currency": "VND",
   "term": "month",
   "sku": "Cloud VPS 1-1-30",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "port": "200 Mbps / 10 Mbps",
   "proof": "https://cloudzone.vn/cloud-server",
   "disk": "30 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-3cf0d88e8888",
  "market": "VN",
  "city": "Vietnam",
  "provider": "AZDIGI",
  "plan": "Pro VPS Platinum - 2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://azdigi.com/pro-vps",
  "deal": "azdigi",
  "proof": "https://azdigi.com/en/black-friday",
  "spec": {
   "price": "717000",
   "currency": "VND",
   "term": "quarter",
   "sku": "Pro VPS Platinum - 2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "port": "200 Mbps",
   "sourceNote": {
    "sc": "所列为三个月原价合计，未含 VAT。活动价每季 VND 573,600，续约金额见订单。",
    "tc": "所列為三個月原價合計，未含 VAT。活動價每季 VND 573,600，續約金額見訂單。",
    "en": "The quoted standard price covers three months before VAT. The promotion is VND 573,600 per quarter. The order specifies the renewal rate.",
    "ja": "表示は3か月分の通常料金で VAT 別です。キャンペーンは四半期あたり VND 573,600。更新料金は注文画面で確認できます。"
   },
   "proof": "https://azdigi.com/en/black-friday",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-143fd8be25c1",
  "market": "VN",
  "city": "Hanoi",
  "provider": "Hosthink",
  "plan": "HAN-1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/hanoi-vietnam/",
  "sku": "HAN-1",
  "spec": {
   "price": "168.30",
   "currency": "USD",
   "term": "month",
   "sku": "HAN-1",
   "cpu": "Xeon Quad-Core · 4C",
   "ram": "8 GB",
   "traffic": "Unmetered",
   "port": "100 Mbps domestic / 5 Mbps international",
   "proof": "https://www.hosthink.net/dedicated-servers/hanoi-vietnam/",
   "disk": "500 GB HDD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-cfd2be87da4f",
  "market": "TW",
  "city": "Taipei",
  "provider": "UCloud",
  "plan": "ULightHost 2C2G · 600 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost 2C2G · 600 GB",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB",
   "port": "30 Mbps",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e0a0c86b2eee",
  "market": "JP",
  "city": "Tokyo",
  "provider": "UCloud",
  "plan": "ULightHost 2C2G · 600 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost 2C2G · 600 GB",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB",
   "port": "30 Mbps",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-d6236e98cb74",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "UCloud",
  "plan": "ULightHost 2C2G · 600 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost 2C2G · 600 GB",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB",
   "port": "30 Mbps",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-73d657ee450e",
  "market": "KR",
  "city": "Seoul",
  "provider": "UCloud",
  "plan": "ULightHost 2C2G · 600 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost 2C2G · 600 GB",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB",
   "port": "30 Mbps",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1bcf1cf71afb",
  "market": "SG",
  "city": "Singapore",
  "provider": "UCloud",
  "plan": "ULightHost 2C2G · 600 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost 2C2G · 600 GB",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB",
   "port": "30 Mbps",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e19fef978593",
  "market": "VN",
  "city": "Ho Chi Minh City",
  "provider": "UCloud",
  "plan": "ULightHost 2C2G · 600 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost 2C2G · 600 GB",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB",
   "port": "30 Mbps",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a92314bbed91",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "ByteVirt",
  "plan": "VPS-1024-KVM-ISP-HK",
  "kind": "vps",
  "ip": "isp",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://bytevirt.com/store/isp-hk-vps?language=english",
  "spec": {
   "price": "10",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1024-KVM-ISP-HK",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "1 TB",
   "port": "500 Mbps",
   "sourceNote": {
    "sc": "超出套餐流量后限速至 1 Mbps。",
    "tc": "超出方案流量後限速至 1 Mbps。",
    "en": "After the included transfer is used, the port is throttled to 1 Mbps.",
    "ja": "付属の転送量を使い切ると 1 Mbps に制限されます。"
   },
   "proof": "https://bytevirt.com/store/isp-hk-vps?language=english",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-704c41c2090b",
  "market": "KR",
  "city": "South Korea",
  "provider": "KakaoCloud",
  "plan": "m1ix.large",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://kakaocloud.com/services/virtual-machine/pricing",
  "spec": {
   "price": "125",
   "currency": "KRW",
   "term": "hour",
   "sku": "m1ix.large",
   "cpu": "2 vCPU",
   "ram": "8 GiB",
   "proof": "https://kakaocloud.com/services/virtual-machine/pricing",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c628f6b0f6ac",
  "market": "KR",
  "city": "South Korea",
  "provider": "HAIONNET",
  "plan": "VMware VPS 4C4G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.haion.net/service/vps/vmware.php",
  "spec": {
   "price": "25000",
   "currency": "KRW",
   "term": "month",
   "sku": "VMware VPS 4C4G",
   "cpu": "4 vCPU",
   "ram": "4 GB",
   "sourceNote": {
    "sc": "月租未含增值税。",
    "tc": "月租未含增值稅。",
    "en": "Monthly rental excludes VAT.",
    "ja": "月額利用料は VAT 別です。"
   },
   "proof": "https://www.haion.net/service/vps/vmware.php",
   "disk": "50 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-baca457e06e6",
  "market": "PH",
  "city": "Manila",
  "provider": "UCloud",
  "plan": "ULightHost · Manila 2C2G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
  "spec": {
   "price": "9.11",
   "currency": "USD",
   "term": "month",
   "sku": "ULightHost · Manila 2C2G",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "traffic": "600 GB/month",
   "port": "30 Mbps (peak)",
   "proof": "https://www.ucloud-global.com/en/docs/ulhost/buy/Package_Pricing",
   "disk": "60 GB",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e7ca4adf9a3f",
  "market": "PH",
  "city": "Manila",
  "provider": "GigsGigsCloud",
  "plan": "PH: Manila Standard - K01",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://clientarea.gigsgigscloud.com/cart/philippines-manila-simplecloud/",
  "spec": {
   "price": "9.80",
   "currency": "USD",
   "term": "month",
   "sku": "PH: Manila Standard - K01",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "500 GB/month",
   "port": "1 Gbps (peak)",
   "proof": "https://clientarea.gigsgigscloud.com/cart/philippines-manila-simplecloud/",
   "disk": "10 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-6aedaeef7dc4",
  "market": "PH",
  "city": "Philippines",
  "provider": "TrumVPS",
  "plan": "VPS Philippines - 3",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://trumvps.devttt.com/en/vps-phillipines/",
  "spec": {
   "price": "120000",
   "currency": "VND",
   "term": "month",
   "sku": "VPS Philippines - 3",
   "cpu": "2 vCPU",
   "ram": "2 GB DDR4",
   "traffic": "5 TB",
   "port": "10 Gbps",
   "proof": "https://trumvps.devttt.com/en/vps-phillipines/",
   "disk": "25 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7f0d2cb80c5f",
  "market": "PH",
  "city": "Manila",
  "provider": "Qingtree",
  "plan": "Manila LH · 1C1G / 10M",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.qingtree.com/cloud/city_manila/1_0_0_21.html",
  "spec": {
   "price": "58.80",
   "currency": "CNY",
   "term": "month",
   "sku": "Manila LH · 1C1G / 10M",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "traffic": "500 GB/month",
   "port": "10 Mbps",
   "proof": "https://www.qingtree.com/cloud/city_manila/1_0_0_21.html",
   "disk": "20 GB SSD",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8128c1c28260",
  "market": "PH",
  "city": "Pasig / Clark / Cebu",
  "provider": "Universal Access & Systems Solutions",
  "plan": "Atmos · In-country IaaS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://uas.com.ph/atmos/"
 },
 {
  "id": "shop-bfc91635c834",
  "market": "PH",
  "city": "Manila",
  "provider": "COLO BIRD",
  "plan": "Manila Bare Metal",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.colobird.com/dedicated-servers-philippines/"
 },
 {
  "id": "shop-986be238eb2e",
  "market": "PH",
  "city": "Philippines",
  "provider": "ePLDT",
  "plan": "Pilipinas Sovereign Cloud",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.epldt.com/who-we-are/",
  "proof": "https://www.sec.gov/Archives/edgar/data/78150/000119312526182147/phi-20251231.htm"
 },
 {
  "id": "shop-c29e8f4e1ca1",
  "market": "PH",
  "city": "Manila",
  "provider": "IDCICP",
  "plan": "Manila Cloud Server",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.idcicp.com/cloud/ph.htm"
 },
 {
  "id": "shop-64d0e05f790b",
  "market": "SEA",
  "city": "Seattle",
  "provider": "Spartan Host",
  "plan": "NVMe KVM · 4096 MB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://spartanhost.org/vps",
  "spec": {
   "price": "20",
   "currency": "USD",
   "term": "month",
   "sku": "NVMe KVM · 4096 MB",
   "cpu": "4 vCore",
   "ram": "4096 MB",
   "disk": "60 GB NVMe",
   "traffic": "5000 GB",
   "port": "10 Gbps",
   "proof": "https://spartanhost.org/vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-523f83b698c1",
  "market": "SEA",
  "city": "Seattle",
  "provider": "DeployNode",
  "plan": "KVM · 6 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.deploynode.com/linux-vps/seattle-usa/",
  "spec": {
   "price": "15.99",
   "currency": "USD",
   "term": "month",
   "sku": "KVM · 6 GB",
   "cpu": "4 vCPU",
   "ram": "6 GB",
   "disk": "80 GB SSD",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://www.deploynode.com/linux-vps/seattle-usa/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5c4950078845",
  "market": "SEA",
  "city": "Seattle",
  "provider": "HostCano",
  "plan": "WA-2G-KVM-VPS · Ember",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hostcano.com/vps-seattle",
  "spec": {
   "price": "6.99",
   "currency": "USD",
   "term": "month",
   "sku": "WA-2G-KVM-VPS · Ember",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "4 TB",
   "port": "10 Gbps",
   "proof": "https://hostcano.com/vps-seattle",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-d5fa3bf98cff",
  "market": "SEA",
  "city": "Seattle",
  "provider": "GTZHost",
  "plan": "Xeon E3-1270 v6 · 57605_DC-29",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.gtzhost.com/dedicated-servers/north-america/seattle/",
  "sku": "57605_DC-29",
  "spec": {
   "price": "105",
   "currency": "USD",
   "term": "month",
   "sku": "57605_DC-29",
   "cpu": "4 cores",
   "ram": "32 GB",
   "disk": "1 TB SSD",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.gtzhost.com/dedicated-servers/north-america/seattle/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e13e550a1635",
  "market": "SEA",
  "city": "Seattle",
  "provider": "Hosthink",
  "plan": "SEA-1 · Xeon E-2286G",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/seattle-usa/",
  "sku": "SEA-1",
  "spec": {
   "price": "277.50",
   "currency": "USD",
   "term": "month",
   "sku": "SEA-1",
   "cpu": "6C / 12T",
   "ram": "32 GB",
   "disk": "2 × 960 GB SSD",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/seattle-usa/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-9a10b07d4099",
  "market": "SEA",
  "city": "Seattle",
  "provider": "KW Servers",
  "plan": "Xeon 1271 v3 · PID-37531",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.kwservers.com/usa-dedicated-servers/seattle/",
  "sku": "PID-37531",
  "spec": {
   "price": "100",
   "currency": "USD",
   "term": "month",
   "sku": "PID-37531",
   "cpu": "4C / 8T",
   "ram": "16 GB DDR3",
   "disk": "2 TB HDD",
   "traffic": "10 TB",
   "port": "100 Mbps",
   "proof": "https://www.kwservers.com/usa-dedicated-servers/seattle/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-102c2b44df11",
  "market": "SEA",
  "city": "Seattle",
  "provider": "iDatam",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.idatam.com/dedicated-servers-usa/seattle/"
 },
 {
  "id": "shop-cf530e9eccfd",
  "market": "SEA",
  "city": "Seattle",
  "provider": "GTHost",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://gthost.com/seattle-amd-dedicated-servers"
 },
 {
  "id": "shop-674defa39512",
  "market": "SEA",
  "city": "Seattle",
  "provider": "ColoCrossing",
  "plan": "Bronze · Xeon E3-1240v3",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.colocrossing.com/server/seattle-dedicated-servers/",
  "spec": {
   "price": "34.95",
   "currency": "USD",
   "term": "month",
   "sku": "Bronze · Xeon E3-1240v3",
   "cpu": "4C / 8T",
   "ram": "16 GB",
   "disk": "1 TB SSD",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.colocrossing.com/server/seattle-dedicated-servers/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-cbb4f452b8ad",
  "market": "SEA",
  "city": "Seattle",
  "provider": "CloudLinux.ro",
  "plan": "CLS-1G-10G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloudlinux.ro/en/vps-seattle",
  "spec": {
   "price": "7.43",
   "currency": "EUR",
   "term": "month",
   "sku": "CLS-1G-10G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB SSD",
   "proof": "https://cloudlinux.ro/en/vps-seattle",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-b93be6f6e560",
  "market": "SEA",
  "city": "Seattle",
  "provider": "INET.WS",
  "plan": "1 vCPU · 2 GiB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://inet.ws/vps/seattle/",
  "spec": {
   "price": "4",
   "currency": "USD",
   "term": "month",
   "sku": "1 vCPU · 2 GiB",
   "cpu": "1 vCPU",
   "ram": "2 GiB",
   "disk": "30 GiB SSD",
   "traffic": "10 TiB",
   "port": "500 Mbps",
   "proof": "https://inet.ws/vps/seattle/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-3a567c4d56b3",
  "market": "SEA",
  "city": "Seattle",
  "provider": "NodeLivo",
  "plan": "Xeon E3-1230 · 16 GB",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://nodelivo.com/store/region/seattle",
  "spec": {
   "price": "56.05",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E3-1230 · 16 GB",
   "cpu": "4 cores",
   "ram": "16 GB",
   "disk": "1 TB HDD",
   "traffic": "Unlimited",
   "port": "100 Mbps",
   "proof": "https://nodelivo.com/store/region/seattle",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e459295ece0d",
  "market": "CA",
  "city": "Montréal",
  "provider": "FlowVDS",
  "plan": "Lite · Linux",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://flowvds.com/locations/canada/",
  "spec": {
   "price": "7.99",
   "currency": "USD",
   "term": "month",
   "sku": "Lite · Linux",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "20 GB NVMe",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://flowvds.com/locations/canada/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-bd29947155cd",
  "market": "CA",
  "city": "Montréal",
  "provider": "Sable Servers",
  "plan": "Linux VPS · YUL1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://sableservers.ca/vps-montreal.html",
  "spec": {
   "sku": "Linux VPS · YUL1",
   "port": "1 Gbps",
   "proof": "https://sableservers.ca/vps-montreal.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a8e344513541",
  "market": "CA",
  "city": "Toronto",
  "provider": "DataPacket",
  "plan": "TOR1 · Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.datapacket.com/datacenters/toronto"
 },
 {
  "id": "shop-d2c3a79836b9",
  "market": "CA",
  "city": "Montréal",
  "provider": "ServerMania",
  "plan": "Dedicated Servers · Montréal",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.servermania.com/dedicated-servers-toronto.htm"
 },
 {
  "id": "shop-9dd08a6124e5",
  "market": "CA",
  "city": "Mississauga",
  "provider": "BytesRack",
  "plan": "Xeon E-2336",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.bytesrack.com/dedicated-servers-canada/toronto/",
  "spec": {
   "price": "246",
   "currency": "USD",
   "term": "month",
   "sku": "Xeon E-2336",
   "cpu": "6C / 12T",
   "ram": "16 GB",
   "disk": "480 GB SSD",
   "traffic": "20 TB",
   "port": "1 Gbps",
   "proof": "https://www.bytesrack.com/dedicated-servers-canada/toronto/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a71a1eb5e608",
  "market": "CA",
  "city": "Toronto",
  "provider": "iDatam",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.idatam.com/dedicated-servers-canada/toronto/"
 },
 {
  "id": "shop-40d933a35b2d",
  "market": "CA",
  "city": "Canada",
  "provider": "WP Support BC",
  "plan": "Managed VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.wpsupportbc.ca/services/hosting/vps/",
  "spec": {
   "price": "59",
   "currency": "CAD",
   "term": "month",
   "sku": "Managed VPS-1",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "traffic": "Unlimited",
   "port": "500 Mbps",
   "proof": "https://www.wpsupportbc.ca/services/hosting/vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-3eb9226577ed",
  "market": "CA",
  "city": "Canada",
  "provider": "Hostex",
  "plan": "Basic VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hostex.co/ca/vps",
  "spec": {
   "price": "53.04",
   "currency": "CAD",
   "term": "month",
   "sku": "Basic VPS",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "100 GB NVMe",
   "traffic": "Unlimited",
   "proof": "https://hostex.co/ca/vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-d08abe52f0a0",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "Cloudzy",
  "plan": "Sandbox · us-lax-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://cloudzy.com/los-angeles-vps",
  "spec": {
   "price": "2.48",
   "currency": "USD",
   "term": "month",
   "sku": "Sandbox · us-lax-1",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "20 GB NVMe",
   "traffic": "1 TB",
   "port": "40 Gbps",
   "proof": "https://cloudzy.com/los-angeles-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c09c6ad5b2cf",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "ComputeGuy",
  "plan": "GP1.2-2-40",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.computeguy.com/vps-los-angeles-usa/",
  "sku": "GP1.2-2-40",
  "proof": "https://www.computeguy.com/zh-Hans/vps-los-angeles-usa/",
  "spec": {
   "price": "15.64",
   "currency": "USD",
   "term": "month",
   "sku": "GP1.2-2-40",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "port": "10 Gbps",
   "proof": "https://www.computeguy.com/zh-Hans/vps-los-angeles-usa/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-782930ad0844",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "USAVPS",
  "plan": "USA VPS · 1 vCPU / 2 GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://usavps.com/los-angeles-vps/",
  "spec": {
   "price": "4",
   "currency": "USD",
   "term": "month",
   "sku": "USA VPS · 1 vCPU / 2 GB",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "30 GB SSD",
   "traffic": "1 TB",
   "proof": "https://usavps.com/los-angeles-vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-9ac8f9d2e99b",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "INET.WS",
  "plan": "1 vCPU · 2 GiB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://inet.ws/vps/los-angeles/",
  "spec": {
   "price": "4",
   "currency": "USD",
   "term": "month",
   "sku": "1 vCPU · 2 GiB",
   "cpu": "1 vCPU",
   "ram": "2 GiB",
   "disk": "30 GiB SSD",
   "traffic": "10 TiB",
   "port": "500 Mbps",
   "proof": "https://inet.ws/vps/los-angeles/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-b207a53e5e26",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "PartVPS",
  "plan": "C2-2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://partvps.com/vps/los-angeles",
  "spec": {
   "price": "28.90",
   "currency": "USD",
   "term": "month",
   "sku": "C2-2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "65 GB",
   "traffic": "3 TB",
   "proof": "https://partvps.com/vps/los-angeles",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-55c4ddb110bd",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "Hosthink",
  "plan": "LAX-1 · Xeon E3-1230v2",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/los-angeles-usa/",
  "sku": "LAX-1",
  "spec": {
   "price": "159.90",
   "currency": "USD",
   "term": "month",
   "sku": "LAX-1",
   "cpu": "4C / 8T",
   "ram": "8 GB",
   "disk": "1 × 1 TB SATA",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/los-angeles-usa/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7b00c6910692",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "ColoCrossing",
  "plan": "Bronze · Xeon E3-1240v3",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.colocrossing.com/server/los-angeles-dedicated-servers/",
  "spec": {
   "price": "34.95",
   "currency": "USD",
   "term": "month",
   "sku": "Bronze · Xeon E3-1240v3",
   "cpu": "4C / 8T",
   "ram": "16 GB",
   "disk": "1 TB SSD",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.colocrossing.com/server/los-angeles-dedicated-servers/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a67dde34055f",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "iDatam",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.idatam.com/dedicated-servers-usa/los-angeles/"
 },
 {
  "id": "shop-e75ab3d6bfba",
  "market": "SJC",
  "city": "San Jose",
  "provider": "ColoCrossing",
  "plan": "Bronze · Xeon E3-1240v3",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.colocrossing.com/server/san-jose-dedicated-servers/",
  "spec": {
   "price": "34.95",
   "currency": "USD",
   "term": "month",
   "sku": "Bronze · Xeon E3-1240v3",
   "cpu": "4C / 8T",
   "ram": "16 GB",
   "disk": "1 TB SSD",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.colocrossing.com/server/san-jose-dedicated-servers/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-bb5215969ae9",
  "market": "SJC",
  "city": "San Jose",
  "provider": "KW Servers",
  "plan": "Ryzen 9 9950X · PID-23936",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.kwservers.com/usa-dedicated-servers/san-jose/",
  "sku": "PID-23936",
  "spec": {
   "price": "931",
   "currency": "USD",
   "term": "month",
   "sku": "PID-23936",
   "cpu": "16C / 32T",
   "ram": "192 GB",
   "disk": "1.92 TB NVMe",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.kwservers.com/usa-dedicated-servers/san-jose/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-b1019708ec91",
  "market": "SJC",
  "city": "San Jose",
  "provider": "FitServers",
  "plan": "DC-296 · Dual Xeon E5-2630L v3",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.fitservers.com/billing/index.php?rp=%2Fstore%2Fan-ose-edicated-ervers-",
  "spec": {
   "price": "121+",
   "currency": "USD",
   "term": "month",
   "sku": "DC-296 · Dual Xeon E5-2630L v3",
   "cpu": "16C / 32T",
   "proof": "https://www.fitservers.com/billing/index.php?rp=%2Fstore%2Fan-ose-edicated-ervers-",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-3e11ca4399d1",
  "market": "SJC",
  "city": "San Jose",
  "provider": "iRexta",
  "plan": "Xeon E3-1240 v3 · PID-27320",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.irexta.com/bare-metal-servers/northamerica/us/sanjose/",
  "sku": "PID-27320",
  "spec": {
   "price": "64",
   "currency": "USD",
   "term": "month",
   "sku": "PID-27320",
   "cpu": "4C / 8T",
   "ram": "32 GB",
   "disk": "1 TB SSD",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.irexta.com/bare-metal-servers/northamerica/us/sanjose/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c389aee5b0f3",
  "market": "SJC",
  "city": "San Jose",
  "provider": "RackNerd",
  "plan": "Cloud VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.racknerd.com/san-jose-datacenter"
 },
 {
  "id": "shop-1f4c3531a888",
  "market": "SJC",
  "city": "San Jose",
  "provider": "Host4Fun / VPS4Crypto",
  "plan": "Nano · SJC-DC",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vps4crypto.com/san-jose-vps",
  "spec": {
   "price": "5",
   "currency": "USD",
   "term": "month",
   "sku": "Nano · SJC-DC",
   "cpu": "1 vCPU",
   "ram": "1 GB DDR5",
   "disk": "15 GB NVMe",
   "port": "10 Gbps",
   "proof": "https://vps4crypto.com/san-jose-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-fd27a327be1f",
  "market": "SJC",
  "city": "San Jose",
  "provider": "BytesRack",
  "plan": "Ryzen 9 5950X",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.bytesrack.com/dedicated-servers-usa/san-jose/",
  "spec": {
   "price": "261",
   "currency": "USD",
   "term": "month",
   "sku": "Ryzen 9 5950X",
   "cpu": "16C / 32T",
   "ram": "128 GB",
   "disk": "1 TB NVMe",
   "traffic": "40 TB",
   "port": "1 Gbps",
   "proof": "https://www.bytesrack.com/dedicated-servers-usa/san-jose/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e003e0c6ae4b",
  "market": "SJC",
  "city": "San Jose",
  "provider": "DataPacket",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.datapacket.com/datacenters/san-jose"
 },
 {
  "id": "shop-eaa6aa9c0723",
  "market": "SJC",
  "city": "San Jose",
  "provider": "NetActuate",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://netactuate.com/data-centers/san-jose-datacenter"
 },
 {
  "id": "shop-033d6e97d9f0",
  "market": "SJC",
  "city": "San Jose",
  "provider": "Hyve Managed Hosting",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hyve.com/en-us/hosting-locations/san-jose/"
 },
 {
  "id": "shop-34d3cfd75a5d",
  "market": "SEA",
  "city": "Seattle",
  "provider": "DataPacket",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.datapacket.com/datacenters/seattle"
 },
 {
  "id": "shop-025f933bf6d6",
  "market": "SEA",
  "city": "Seattle",
  "provider": "i3D.net",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.i3d.net/locations/seattle/"
 },
 {
  "id": "shop-8b47423d1246",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "DataPacket",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.datapacket.com/datacenters/los-angeles"
 },
 {
  "id": "shop-32128cbbe216",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "HostEONS",
  "plan": "Cloud VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://my.hosteons.com/knowledgebase/36/Which-Location-Shall-i-Select-Los-Angeles-New-York-Salt-Lake-City-Miami-PortLand-Dallas-Paris-or-Frankfurt-for-my-VPS.html"
 },
 {
  "id": "shop-5bd7106155ce",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "HostHatch",
  "plan": "NVMe 2 GB · LAX10",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://docs.hosthatch.com/features/",
  "proof": "https://hosthatch.com/products",
  "spec": {
   "price": "4.00+",
   "currency": "USD",
   "term": "month",
   "sku": "NVMe 2 GB · LAX10",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "10 GB NVMe",
   "traffic": "1 TB",
   "proof": "https://hosthatch.com/products",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e320c90c03cb",
  "market": "CA",
  "city": "Montréal",
  "provider": "Google Cloud",
  "plan": "Compute Engine · e2-standard-2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://docs.cloud.google.com/compute/docs/regions-zones",
  "proof": "https://docs.cloud.google.com/compute/docs/general-purpose-machines",
  "spec": {
   "sku": "Compute Engine · e2-standard-2",
   "cpu": "2 vCPU",
   "ram": "8 GB",
   "proof": "https://docs.cloud.google.com/compute/docs/general-purpose-machines",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-436155e313c5",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "Google Cloud",
  "plan": "Compute Engine · e2-standard-2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://docs.cloud.google.com/compute/docs/regions-zones",
  "proof": "https://docs.cloud.google.com/compute/docs/general-purpose-machines",
  "spec": {
   "sku": "Compute Engine · e2-standard-2",
   "cpu": "2 vCPU",
   "ram": "8 GB",
   "proof": "https://docs.cloud.google.com/compute/docs/general-purpose-machines",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-efd642490ea5",
  "market": "CA",
  "city": "Canada Central",
  "provider": "Amazon Web Services",
  "plan": "Lightsail Linux/Unix · IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "proof": "https://aws.amazon.com/tw/lightsail/pricing/",
  "spec": {
   "price": "5",
   "currency": "USD",
   "term": "month",
   "sku": "Lightsail Linux/Unix · IPv4",
   "cpu": "2 vCPU",
   "ram": "0.5 GB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "proof": "https://aws.amazon.com/tw/lightsail/pricing/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-925f09d2f4c0",
  "market": "SJC",
  "city": "San Jose",
  "provider": "XenSpec",
  "plan": "Build Your Own VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://crm.xenspec.com/index.php/store/virtual-private-servers-san-jose",
  "spec": {
   "price": "7.30+",
   "currency": "USD",
   "term": "month",
   "sku": "Build Your Own VPS",
   "proof": "https://crm.xenspec.com/index.php/store/virtual-private-servers-san-jose",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-83552db08b3a",
  "market": "SJC",
  "city": "San Jose",
  "provider": "Leo Servers",
  "plan": "Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.leoservers.com/dedicated-servers-usa/san-jose-usa/"
 },
 {
  "id": "shop-f408b7d2312e",
  "market": "SJC",
  "city": "San Jose",
  "provider": "Dianahost",
  "plan": "Dedicated Servers · SJC1",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.dianahost.com/data-center-in-san-jose/"
 },
 {
  "id": "shop-2d8d46069607",
  "market": "CA",
  "city": "Toronto",
  "provider": "INET.WS",
  "plan": "1 vCPU · 2 GiB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://inet.ws/vps/toronto/",
  "spec": {
   "price": "4",
   "currency": "USD",
   "term": "month",
   "sku": "1 vCPU · 2 GiB",
   "cpu": "1 vCPU",
   "ram": "2 GiB",
   "disk": "30 GiB NVMe",
   "traffic": "10 TiB",
   "port": "500 Mbps",
   "proof": "https://inet.ws/vps/toronto/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-50fe89d223ff",
  "market": "LAX",
  "city": "Los Angeles",
  "provider": "HostCano",
  "plan": "LA-2G-KVM-VPS · Ember",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hostcano.com/vps-los-angeles",
  "spec": {
   "price": "6.99",
   "currency": "USD",
   "term": "month",
   "sku": "LA-2G-KVM-VPS · Ember",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "30 GB NVMe",
   "traffic": "4 TB",
   "port": "10 Gbps",
   "proof": "https://hostcano.com/vps-los-angeles",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8040a6a4ab49",
  "market": "CA",
  "city": "Toronto",
  "provider": "Hosthink",
  "plan": "TOR-1 · Xeon E-2286G",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/toronto-canada/",
  "sku": "TOR-1",
  "spec": {
   "price": "277.50",
   "currency": "USD",
   "term": "month",
   "sku": "TOR-1",
   "cpu": "6C / 12T",
   "ram": "32 GB",
   "disk": "2 × 960 GB SSD",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/toronto-canada/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-21e635182179",
  "market": "SEA",
  "city": "Seattle",
  "provider": "Hosthink",
  "plan": "SEA-2 · Xeon E-2288G",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/seattle-usa/",
  "sku": "SEA-2",
  "spec": {
   "price": "525",
   "currency": "USD",
   "term": "month",
   "sku": "SEA-2",
   "cpu": "8C / 16T",
   "ram": "128 GB",
   "disk": "2 × 1.9 TB NVMe",
   "traffic": "10 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/seattle-usa/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7c13a7a6da78",
  "market": "CA",
  "city": "Toronto",
  "provider": "Hosthink",
  "plan": "TOR-3 · EPYC 4244P",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/toronto-canada/",
  "sku": "TOR-3",
  "spec": {
   "price": "444",
   "currency": "USD",
   "term": "month",
   "sku": "TOR-3",
   "cpu": "6C / 12T",
   "ram": "48 GB",
   "disk": "2 × 960 GB NVMe",
   "traffic": "20 TB",
   "port": "2 × 10 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/toronto-canada/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-cd41bd094095",
  "market": "SJC",
  "city": "San Jose",
  "provider": "Servers99",
  "plan": "Dedicated Servers · Custom Request",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.servers99.com/dedicated-server/north-america/usa/san-jose/"
 },
 {
  "id": "shop-68398ac38d4e",
  "market": "SJC",
  "city": "San Jose",
  "provider": "VirMach",
  "plan": "KVM VPS · San Jose",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://virmach.com/datacenters/"
 },
 {
  "id": "shop-64e7ede22908",
  "market": "CA",
  "city": "Toronto",
  "provider": "RackNerd",
  "plan": "VPS · Toronto",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.racknerd.com/toronto-datacenter"
 },
 {
  "id": "shop-dac04ffcc110",
  "market": "CA",
  "city": "Toronto",
  "provider": "GTHost",
  "plan": "Instant Dedicated Servers",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://gthost.com/dedicated-server-canada"
 },
 {
  "id": "shop-ab18861a1b66",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.virtono.com/frankfurt-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.virtono.com/frankfurt-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ade9053a09ce",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "FormoHost",
  "plan": "VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.formohost.com/germany-vps/",
  "spec": {
   "price": "9.49",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "另加 10% 税。",
    "tc": "另加 10% 稅。",
    "en": "An additional 10% tax applies.",
    "ja": "別途 10% の税金が加算されます。"
   },
   "proof": "https://www.formohost.com/germany-vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-df8f57bbb8c6",
  "market": "DE",
  "city": "Germany",
  "provider": "Astra Hosting",
  "plan": "Performance VPS 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.astrahosting.com/vps/germany/",
  "spec": {
   "price": "13.69",
   "currency": "EUR",
   "term": "month",
   "sku": "Performance VPS 1",
   "cpu": "1 dedicated EPYC core",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.astrahosting.com/vps/germany/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-f8a7cb220b16",
  "market": "DE",
  "city": "Karlstein",
  "provider": "EDIS Global",
  "plan": "KVM Smart",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.edisglobal.com/vps-hosting/germany-frankfurt-area/entry-level-vps",
  "spec": {
   "price": "4.99",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM Smart",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB NVMe",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含 VAT。宿主机上联为 2 × 10 Gbps。",
    "tc": "價格未含 VAT。宿主機上聯為 2 × 10 Gbps。",
    "en": "Price excludes VAT. The host has two 10 Gbps uplinks.",
    "ja": "価格は VAT 別です。ホストの上位回線は 10 Gbps が2本です。"
   },
   "proof": "https://www.edisglobal.com/vps-hosting/germany-frankfurt-area/entry-level-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-17480649071a",
  "market": "DE",
  "city": "Germany",
  "provider": "Evoxt",
  "plan": "VM-0.5",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://evoxt.com/vps/vps-germany/",
  "proof": "https://evoxt.com/pricing/",
  "spec": {
   "price": "2.99",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "traffic": "500 GB",
   "proof": "https://evoxt.com/pricing/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4882627cce5a",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "Amazon Web Services",
  "plan": "Lightsail Linux · IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "5.00",
   "currency": "USD",
   "term": "month",
   "sku": "Lightsail Linux · IPv4",
   "cpu": "2 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-bfd054e03687",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.virtono.com/amsterdam-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.virtono.com/amsterdam-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5a3eebc33169",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "FormoHost",
  "plan": "VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.formohost.com/netherlands-vps/",
  "spec": {
   "price": "9.49",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "另加 10% 税。",
    "tc": "另加 10% 稅。",
    "en": "An additional 10% tax applies.",
    "ja": "別途 10% の税金が加算されます。"
   },
   "proof": "https://www.formohost.com/netherlands-vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-46b5bedcecbb",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Astra Hosting",
  "plan": "Performance VPS 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.astrahosting.com/vps/netherlands/",
  "spec": {
   "price": "13.69",
   "currency": "EUR",
   "term": "month",
   "sku": "Performance VPS 1",
   "cpu": "1 dedicated EPYC core",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.astrahosting.com/vps/netherlands/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-bbfa3a9433c1",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "EDIS Global",
  "plan": "KVM Smart",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.edisglobal.com/vps-hosting/netherlands-amsterdam/entry-level-vps",
  "spec": {
   "price": "4.99",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM Smart",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含 VAT。宿主机上联为 2 × 10 Gbps。",
    "tc": "價格未含 VAT。宿主機上聯為 2 × 10 Gbps。",
    "en": "Price excludes VAT. The host has two 10 Gbps uplinks.",
    "ja": "価格は VAT 別です。ホストの上位回線は 10 Gbps が2本です。"
   },
   "proof": "https://www.edisglobal.com/vps-hosting/netherlands-amsterdam/entry-level-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7a35cca9c9c7",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Evoxt",
  "plan": "VM-0.5",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://evoxt.com/vps/vps-netherlands/",
  "proof": "https://evoxt.com/pricing/",
  "spec": {
   "price": "2.99",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "traffic": "500 GB",
   "proof": "https://evoxt.com/pricing/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-2cb3cbf31304",
  "market": "GB",
  "city": "London",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.virtono.com/london-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.virtono.com/london-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-3583c61bdcbf",
  "market": "GB",
  "city": "London",
  "provider": "FormoHost",
  "plan": "VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.formohost.com/uk-vps/",
  "spec": {
   "price": "9.49",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "另加 10% 税。",
    "tc": "另加 10% 稅。",
    "en": "An additional 10% tax applies.",
    "ja": "別途 10% の税金が加算されます。"
   },
   "proof": "https://www.formohost.com/uk-vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-538093176478",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "Astra Hosting",
  "plan": "Performance VPS 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.astrahosting.com/vps/united-kingdom/",
  "spec": {
   "price": "13.69",
   "currency": "EUR",
   "term": "month",
   "sku": "Performance VPS 1",
   "cpu": "1 dedicated EPYC core",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.astrahosting.com/vps/united-kingdom/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-14b9ce5b5933",
  "market": "GB",
  "city": "London",
  "provider": "EDIS Global",
  "plan": "KVM Smart",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.edisglobal.com/vps-hosting/unitedkingdom-london-docklands/entry-level-vps",
  "spec": {
   "price": "4.99",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM Smart",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含 VAT。宿主机上联为 2 × 10 Gbps。",
    "tc": "價格未含 VAT。宿主機上聯為 2 × 10 Gbps。",
    "en": "Price excludes VAT. The host has two 10 Gbps uplinks.",
    "ja": "価格は VAT 別です。ホストの上位回線は 10 Gbps が2本です。"
   },
   "proof": "https://www.edisglobal.com/vps-hosting/unitedkingdom-london-docklands/entry-level-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7b6497a99540",
  "market": "GB",
  "city": "London",
  "provider": "Evoxt",
  "plan": "VM-0.5",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://evoxt.com/vps/vps-united-kingdom/",
  "proof": "https://evoxt.com/pricing/",
  "spec": {
   "price": "2.99",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB",
   "traffic": "500 GB",
   "proof": "https://evoxt.com/pricing/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e5f54fc78821",
  "market": "GB",
  "city": "London",
  "provider": "Amazon Web Services",
  "plan": "Lightsail Linux · IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "5.00",
   "currency": "USD",
   "term": "month",
   "sku": "Lightsail Linux · IPv4",
   "cpu": "2 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4d7e689f3d1b",
  "market": "FR",
  "city": "Paris",
  "provider": "Virtono",
  "plan": "KVM 1G",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.virtono.com/paris-vps",
  "spec": {
   "price": "4.95",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM 1G",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.virtono.com/paris-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a0b7f0a2addf",
  "market": "FR",
  "city": "Paris",
  "provider": "FormoHost",
  "plan": "VPS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.formohost.com/france-vps/",
  "spec": {
   "price": "16.83",
   "currency": "USD",
   "term": "month",
   "sku": "VPS-1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB",
   "traffic": "1 TB",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "另加 10% 税。",
    "tc": "另加 10% 稅。",
    "en": "An additional 10% tax applies.",
    "ja": "別途 10% の税金が加算されます。"
   },
   "proof": "https://www.formohost.com/france-vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-fd6562acabfe",
  "market": "FR",
  "city": "France",
  "provider": "Astra Hosting",
  "plan": "Performance VPS 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.astrahosting.com/vps/france/",
  "spec": {
   "price": "13.69",
   "currency": "EUR",
   "term": "month",
   "sku": "Performance VPS 1",
   "cpu": "1 dedicated EPYC core",
   "ram": "2 GB",
   "disk": "50 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.astrahosting.com/vps/france/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c56f00ecf464",
  "market": "FR",
  "city": "Paris",
  "provider": "EDIS Global",
  "plan": "KVM Smart",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.edisglobal.com/vps-hosting/france-paris/high-traffic-vps",
  "spec": {
   "price": "4.99",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM Smart",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "15 GB SSD",
   "traffic": "1 TB",
   "sourceNote": {
    "sc": "价格未含 VAT。宿主机上联为 2 × 10 Gbps。",
    "tc": "價格未含 VAT。宿主機上聯為 2 × 10 Gbps。",
    "en": "Price excludes VAT. The host has two 10 Gbps uplinks.",
    "ja": "価格は VAT 別です。ホストの上位回線は 10 Gbps が2本です。"
   },
   "proof": "https://www.edisglobal.com/vps-hosting/france-paris/high-traffic-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-fa071a4743c9",
  "market": "FR",
  "city": "Paris",
  "provider": "Amazon Web Services",
  "plan": "Lightsail Linux · IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "5.00",
   "currency": "USD",
   "term": "month",
   "sku": "Lightsail Linux · IPv4",
   "cpu": "2 vCPU",
   "ram": "512 MB",
   "disk": "20 GB SSD",
   "traffic": "1 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-63846f3152c6",
  "market": "DE",
  "city": "Germany",
  "provider": "manitu",
  "plan": "vServer L",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.manitu.de/vserver/vserver-l/",
  "spec": {
   "price": "9.99",
   "currency": "EUR",
   "term": "month",
   "sku": "vServer L",
   "cpu": "4 vCPU",
   "ram": "8 GB",
   "disk": "120 GB SSD",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.manitu.de/vserver/vserver-l/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-a045fc02b49f",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "IP-Projects",
  "plan": "Linux Compute vServer S G2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ip-projects.de/en/virtual-server/linux-compute-vps",
  "spec": {
   "price": "22.61",
   "currency": "EUR",
   "term": "month",
   "sku": "Linux Compute vServer S G2",
   "cpu": "2 dedicated threads",
   "ram": "8 GB DDR5",
   "disk": "100 GB NVMe",
   "traffic": "50 TB FUP",
   "port": "1 Gbps",
   "proof": "https://www.ip-projects.de/en/virtual-server/linux-compute-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-b5de94eb1c36",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "HostZealot",
  "plan": "KVM-SSD 1024",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hostzealot.com/vps/location-germany",
  "spec": {
   "price": "6.40",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM-SSD 1024",
   "cpu": "3 vCPU",
   "ram": "1 GB",
   "disk": "20 GB SSD",
   "traffic": "Unmetered",
   "proof": "https://www.hostzealot.com/vps/location-germany",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1afc0be6e1a7",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "Luxvps",
  "plan": "KVM Rootserver Tiny",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.luxvps.de/pricing",
  "spec": {
   "price": "4.50",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM Rootserver Tiny",
   "cpu": "1 vCPU",
   "ram": "4 GB",
   "disk": "30 GB NVMe",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.luxvps.de/pricing",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ab284583f714",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "HostSlim",
  "plan": "KVM Starter",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hostslim.eu/vps",
  "spec": {
   "price": "9.97",
   "currency": "EUR",
   "term": "month",
   "sku": "KVM Starter",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "100 GB SSD",
   "traffic": "100 TB",
   "port": "10 Gbps",
   "proof": "https://www.hostslim.eu/vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-b1fd1d461100",
  "market": "NL",
  "city": "Netherlands",
  "provider": "eVPS",
  "plan": "VPS 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.evps.net/vps",
  "spec": {
   "price": "5.00",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS 1",
   "cpu": "1 vCPU",
   "ram": "3 GB",
   "disk": "40 GB NVMe",
   "traffic": "5 TB",
   "port": "300 Mbps",
   "proof": "https://www.evps.net/vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-f3c00d63223f",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Mynymbox",
  "plan": "NL KVM VPS 2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://client.mynymbox.io/store/kvm-vps-netherlands",
  "proof": "https://mynymbox.io/vps",
  "spec": {
   "price": "7.00",
   "currency": "EUR",
   "term": "month",
   "sku": "NL KVM VPS 2",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "30 GB NVMe",
   "traffic": "2 TB",
   "proof": "https://mynymbox.io/vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-66a6a8fa42e8",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "AltusHost",
  "plan": "Xeon E-2286G · 1 Gbps",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://altushost.com/unmetered-dedicated-servers-in-the-netherlands/",
  "spec": {
   "price": "199.95",
   "currency": "EUR",
   "term": "month",
   "sku": "Xeon E-2286G · 1 Gbps",
   "cpu": "Xeon E-2286G · 8C/16T",
   "ram": "32 GB",
   "disk": "2 × 480 GB SSD",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://altushost.com/unmetered-dedicated-servers-in-the-netherlands/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-eb3794366b08",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "VPSDime",
  "plan": "Linux6GB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://vpsdime.com/buy/linux6gb",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Linux6GB",
   "cpu": "4 vCPU",
   "ram": "6 GB",
   "disk": "30 GB SSD",
   "traffic": "2 TB",
   "port": "10 Gbps",
   "proof": "https://vpsdime.com/buy/linux6gb",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-0161d5570eb3",
  "market": "GB",
  "city": "London",
  "provider": "Clouvider",
  "plan": "London Unmetered E3v6",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.clouvider.com/dedicated-servers-sale/?param=Unmetered",
  "spec": {
   "price": "107.00",
   "currency": "USD",
   "term": "month",
   "sku": "London Unmetered E3v6",
   "cpu": "4C / 8T",
   "ram": "16 GB",
   "disk": "240 GB SSD",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.clouvider.com/dedicated-servers-sale/?param=Unmetered",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-0dec675fdf4e",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "Krystal",
  "plan": "CPU Optimised · Regular",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://krystal.io/cloud/compute",
  "proof": "https://krystal.io/technology",
  "spec": {
   "price": "10.00",
   "currency": "GBP",
   "term": "month",
   "sku": "CPU Optimised · Regular",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "10 GB",
   "traffic": "1 TB pooled",
   "proof": "https://krystal.io/technology",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ef628e513c41",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "eUKhost",
  "plan": "Hyperslice H1 · CloudLinux + Imunify360",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.eukhost.com/cloudlinux-imunify",
  "spec": {
   "price": "48.14",
   "currency": "GBP",
   "term": "month",
   "sku": "Hyperslice H1 · CloudLinux + Imunify360",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "port": "250 Mbps",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.eukhost.com/cloudlinux-imunify",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-98363945f239",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "HostPresto",
  "plan": "General 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hostpresto.com/cloud-servers/",
  "spec": {
   "price": "10.00",
   "currency": "GBP",
   "term": "month",
   "sku": "General 1",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "25 GB NVMe",
   "traffic": "1 TB",
   "proof": "https://hostpresto.com/cloud-servers/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-41d65a851211",
  "market": "GB",
  "city": "London",
  "provider": "DigitalOcean",
  "plan": "Basic Droplet · 1 GiB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.digitalocean.com/pricing/droplets",
  "proof": "https://docs.digitalocean.com/products/droplets/details/availability/",
  "spec": {
   "price": "6.00",
   "currency": "USD",
   "term": "month",
   "sku": "Basic Droplet · 1 GiB",
   "cpu": "1 vCPU",
   "ram": "1 GiB",
   "disk": "25 GiB SSD",
   "traffic": "1,000 GiB",
   "proof": "https://docs.digitalocean.com/products/droplets/details/availability/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e8acb21a8ec9",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "Fasthosts",
  "plan": "VPS 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.fasthosts.co.uk/virtual-private-servers",
  "spec": {
   "price": "5.00",
   "currency": "GBP",
   "term": "month",
   "sku": "VPS 1",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "标准月租。",
    "tc": "標準月租。",
    "en": "Standard monthly rate.",
    "ja": "通常の月額料金です。"
   },
   "proof": "https://www.fasthosts.co.uk/virtual-private-servers",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e3414d2d0893",
  "market": "FR",
  "city": "Nouvelle-Aquitaine",
  "provider": "By-Hoster",
  "plan": "VPS KVM Start",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://by-hoster.net/location-vps",
  "spec": {
   "price": "6.49",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS KVM Start",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "50 GB SSD",
   "port": "250 Mbps",
   "proof": "https://by-hoster.net/location-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5e33e0e5c697",
  "market": "FR",
  "city": "France",
  "provider": "PulseHeberg",
  "plan": "CLASSIC-2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://pulseheberg.com/fr/cloud/vps-linux",
  "spec": {
   "price": "5.00",
   "currency": "EUR",
   "term": "month",
   "sku": "CLASSIC-2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "60 GB NVMe",
   "port": "2.5 Gbps",
   "sourceNote": {
    "sc": "价格已含增值税。",
    "tc": "價格已含增值稅。",
    "en": "Price includes VAT.",
    "ja": "価格は VAT 込みです。"
   },
   "proof": "https://pulseheberg.com/fr/cloud/vps-linux",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-db32d1225ce0",
  "market": "FR",
  "city": "France",
  "provider": "HostMyServers",
  "plan": "SSD-1 · VestaCP",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hostmyservers.fr/vps-vestacp",
  "spec": {
   "price": "2.74",
   "currency": "EUR",
   "term": "month",
   "sku": "SSD-1 · VestaCP",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "port": "500 Mbps",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.hostmyservers.fr/vps-vestacp",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-ed801de86853",
  "market": "FR",
  "city": "Paris",
  "provider": "VexCloud",
  "plan": "VPS SSD-02",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.vexcloud.fr/tarifs",
  "spec": {
   "price": "2.49",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS SSD-02",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "port": "10 Gbps",
   "proof": "https://www.vexcloud.fr/tarifs",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1887b92c8802",
  "market": "FR",
  "city": "France",
  "provider": "LWS",
  "plan": "VPS S",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.lws.fr/serveur-dedie-infogere.php",
  "spec": {
   "price": "9.99",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS S",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "100 GB",
   "traffic": "Unmetered",
   "port": "100 Mbps",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.lws.fr/serveur-dedie-infogere.php",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-2c98772307d9",
  "market": "FR",
  "city": "France",
  "provider": "OnetSolutions",
  "plan": "GP-2",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://onetsolutions.net/serveur-vps",
  "spec": {
   "price": "3.99",
   "currency": "EUR",
   "term": "month",
   "sku": "GP-2",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "port": "150 Mbps",
   "sourceNote": {
    "sc": "月付方案，价格未含增值税。",
    "tc": "月繳方案，價格未含增值稅。",
    "en": "Monthly plan, excluding VAT.",
    "ja": "月払いプランで、価格は VAT 別です。"
   },
   "proof": "https://onetsolutions.net/serveur-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c39ccdbf2adc",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "POWOKE",
  "plan": "VM-0.5",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.powoke.com/en/germany-vps",
  "spec": {
   "price": "4.93",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB SSD",
   "port": "1 Gbps",
   "proof": "https://www.powoke.com/en/germany-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4d4493e6a2a1",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "POWOKE",
  "plan": "VM-0.5",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.powoke.com/en/netherlands-vps",
  "spec": {
   "price": "4.93",
   "currency": "USD",
   "term": "month",
   "sku": "VM-0.5",
   "cpu": "1 vCPU",
   "ram": "512 MB",
   "disk": "5 GB SSD",
   "port": "1 Gbps",
   "proof": "https://www.powoke.com/en/netherlands-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8a06225beef2",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Proton Servers",
  "plan": "Nano",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.protonservers.com/netherlands-kvm-vps",
  "spec": {
   "price": "15.00",
   "currency": "USD",
   "term": "month",
   "sku": "Nano",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "25 GB NVMe",
   "traffic": "10 TB",
   "port": "1 Gbps",
   "proof": "https://www.protonservers.com/netherlands-kvm-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-2358065934f3",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "Radius Hosting",
  "plan": "1GB VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://hosting.radiusmedia.uk/hosting/vps/",
  "spec": {
   "price": "9.99",
   "currency": "GBP",
   "term": "month",
   "sku": "1GB VPS",
   "cpu": "1 vCPU",
   "ram": "1 GB",
   "disk": "25 GB SSD",
   "traffic": "Unmetered",
   "port": "10 Gbps",
   "proof": "https://hosting.radiusmedia.uk/hosting/vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-60aa2ce87cb0",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "oXnames",
  "plan": "UK VPS Grow",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.oxnames.com/cloud/uk-vps-hosting/",
  "spec": {
   "price": "16.95",
   "currency": "GBP",
   "term": "month",
   "sku": "UK VPS Grow",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "50 GB SSD",
   "traffic": "2 TB",
   "port": "1 Gbps",
   "proof": "https://www.oxnames.com/cloud/uk-vps-hosting/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-426475cb0af8",
  "market": "GB",
  "city": "United Kingdom",
  "provider": "UKHost4u",
  "plan": "Entry VPS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.ukhost4u.com/vps-hosting/",
  "spec": {
   "price": "25.00",
   "currency": "GBP",
   "term": "month",
   "sku": "Entry VPS",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "50 GB SSD",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "价格未含增值税。",
    "tc": "價格未含增值稅。",
    "en": "Price excludes VAT.",
    "ja": "価格は VAT 別です。"
   },
   "proof": "https://www.ukhost4u.com/vps-hosting/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-537013ccd06d",
  "market": "FR",
  "city": "Gravelines",
  "provider": "Proton Servers",
  "plan": "France KVM 1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.protonservers.com/france-kvm-vps",
  "spec": {
   "price": "10.00",
   "currency": "USD",
   "term": "month",
   "sku": "France KVM 1",
   "cpu": "1 vCPU",
   "ram": "2 GB",
   "disk": "25 GB NVMe",
   "traffic": "Unmetered",
   "port": "1 Gbps",
   "proof": "https://www.protonservers.com/france-kvm-vps",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5b1e1328f080",
  "market": "FR",
  "city": "France",
  "provider": "PingHeberg",
  "plan": "VPS Argent",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://store.pingheberg.com/products/vps/vps-argent",
  "spec": {
   "price": "5.49",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS Argent",
   "cpu": "2 vCPU",
   "ram": "4 GB",
   "disk": "40 GB NVMe",
   "proof": "https://store.pingheberg.com/products/vps/vps-argent",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-337707fd992a",
  "market": "FR",
  "city": "Paris",
  "provider": "MilkyWan",
  "plan": "VM · IPv6 / NAT64",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://milkywan.fr/en/services/vm/",
  "spec": {
   "price": "6.00",
   "currency": "EUR",
   "term": "month",
   "sku": "VM · IPv6 / NAT64",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "disk": "40 GB NVMe",
   "traffic": "FUP",
   "sourceNote": {
    "sc": "CPU、内存和存储各计 2 × EUR 1。价格含 VAT，IPv4 另收费。",
    "tc": "CPU、記憶體和儲存各計 2 × EUR 1。價格含 VAT，IPv4 另收費。",
    "en": "CPU, RAM and storage each cost 2 × EUR 1. VAT is included. IPv4 costs extra.",
    "ja": "CPU・メモリ・ストレージはそれぞれ 2 × EUR 1 です。VAT 込みで、IPv4 は別料金です。"
   },
   "proof": "https://milkywan.fr/en/services/vm/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c2b85b8982d4",
  "market": "FR",
  "city": "France",
  "provider": "TalCloud",
  "plan": "VPS Nano",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://talcloud.fr/vps/",
  "spec": {
   "price": "3.99",
   "currency": "EUR",
   "term": "month",
   "sku": "VPS Nano",
   "cpu": "1 dedicated vCPU",
   "ram": "2 GB",
   "disk": "20 GB NVMe",
   "port": "100 Mbps",
   "proof": "https://talcloud.fr/vps/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7bbedea04aa0",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "Hosthink",
  "plan": "FRA-1 · Essential",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/frankfurt-germany/",
  "sku": "FRA-1",
  "spec": {
   "price": "119.90",
   "currency": "USD",
   "term": "month",
   "sku": "FRA-1",
   "cpu": "Xeon E3-1230v2 · 4C / 8T",
   "ram": "8 GB",
   "disk": "1 TB SATA",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/frankfurt-germany/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-1da204ecaafb",
  "market": "FR",
  "city": "Paris",
  "provider": "Hosthink",
  "plan": "PAR-1 · Essential",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/paris-france/",
  "sku": "PAR-1",
  "spec": {
   "price": "119.90",
   "currency": "USD",
   "term": "month",
   "sku": "PAR-1",
   "cpu": "Xeon E3-1230v2 · 4C / 8T",
   "ram": "8 GB",
   "disk": "1 TB SATA",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/paris-france/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-35f3ce3eb85c",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Hosthink",
  "plan": "AMS-1 · Essential",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/amsterdam-netherlands/",
  "sku": "AMS-1",
  "spec": {
   "price": "119.90",
   "currency": "USD",
   "term": "month",
   "sku": "AMS-1",
   "cpu": "Xeon E3-1230v2 · 4C / 8T",
   "ram": "8 GB",
   "disk": "1 TB SATA",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/amsterdam-netherlands/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-00b86e40aa9a",
  "market": "GB",
  "city": "London",
  "provider": "Hosthink",
  "plan": "LON-1 · Essential",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.hosthink.net/dedicated-servers/london-uk/",
  "sku": "LON-1",
  "spec": {
   "price": "119.90",
   "currency": "USD",
   "term": "month",
   "sku": "LON-1",
   "cpu": "Xeon E3-1230v2 · 4C / 8T",
   "ram": "8 GB",
   "disk": "1 TB SATA",
   "traffic": "5 TB",
   "port": "1 Gbps",
   "proof": "https://www.hosthink.net/dedicated-servers/london-uk/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-db339a629e19",
  "market": "FR",
  "city": "Gravelines",
  "provider": "OVHcloud",
  "plan": "SYS-2 · GRA · 32 GB / 2 × 512 GB NVMe",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://eco.ovhcloud.com/fr/soyoustart/sys-2/",
  "sku": "24sys02-v3",
  "deal": "ovhfr",
  "proof": "https://eco.ovhcloud.com/fr/",
  "spec": {
   "price": "37.99",
   "currency": "EUR",
   "term": "month",
   "sku": "24sys02-v3",
   "cpu": "Intel Xeon-D 2141I · 8C / 16T",
   "ram": "32 GB ECC",
   "disk": "2 × 512 GB NVMe",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "欧洲商店的基础月租未含 VAT。一次性安装费相当于一个月标准租金。",
    "tc": "歐洲商店的基本月租未含 VAT。一次性安裝費相當於一個月標準租金。",
    "en": "The EU storefront’s base rate excludes VAT. The one-time setup fee equals one regular month.",
    "ja": "欧州ストアの基本料金は VAT 別です。初期費用は通常月額の1か月分です。"
   },
   "proof": "https://eco.ovhcloud.com/fr/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-c031c219850c",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "OVHcloud",
  "plan": "SYS-2 · FRA · 32 GB / 2 × 512 GB NVMe",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://eco.ovhcloud.com/fr/soyoustart/sys-2/",
  "sku": "24sys02-v3",
  "deal": "ovhfr",
  "proof": "https://eco.ovhcloud.com/fr/",
  "spec": {
   "price": "37.99",
   "currency": "EUR",
   "term": "month",
   "sku": "24sys02-v3",
   "cpu": "Intel Xeon-D 2141I · 8C / 16T",
   "ram": "32 GB ECC",
   "disk": "2 × 512 GB NVMe",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "欧洲商店的基础月租未含 VAT。一次性安装费相当于一个月标准租金。",
    "tc": "歐洲商店的基本月租未含 VAT。一次性安裝費相當於一個月標準租金。",
    "en": "The EU storefront’s base rate excludes VAT. The one-time setup fee equals one regular month.",
    "ja": "欧州ストアの基本料金は VAT 別です。初期費用は通常月額の1か月分です。"
   },
   "proof": "https://eco.ovhcloud.com/fr/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-5a21ea502f3d",
  "market": "GB",
  "city": "London",
  "provider": "OVHcloud",
  "plan": "SYS-2 · LON · 32 GB / 2 × 512 GB NVMe",
  "kind": "bare",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://eco.ovhcloud.com/en-gb/soyoustart/sys-2/",
  "sku": "24sys02-v3",
  "deal": "ovhgb",
  "proof": "https://eco.ovhcloud.com/en-gb/",
  "spec": {
   "price": "33.89",
   "currency": "GBP",
   "term": "month",
   "sku": "24sys02-v3",
   "cpu": "Intel Xeon-D 2141I · 8C / 16T",
   "ram": "32 GB ECC",
   "disk": "2 × 512 GB NVMe",
   "port": "1 Gbps",
   "sourceNote": {
    "sc": "欧洲商店的基础月租未含 VAT。一次性安装费相当于一个月标准租金。",
    "tc": "歐洲商店的基本月租未含 VAT。一次性安裝費相當於一個月標準租金。",
    "en": "The EU storefront’s base rate excludes VAT. The one-time setup fee equals one regular month.",
    "ja": "欧州ストアの基本料金は VAT 別です。初期費用は通常月額の1か月分です。"
   },
   "proof": "https://eco.ovhcloud.com/en-gb/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-4a65ff9571a9",
  "market": "FR",
  "city": "Paris",
  "provider": "Scaleway",
  "plan": "DEV1-S · FR-PAR-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.scaleway.com/en/pricing/virtual-instances/",
  "sku": "DEV1-S",
  "proof": "https://www.scaleway.com/en/docs/instances/reference-content/instances-datasheet/",
  "spec": {
   "price": "0.00898",
   "currency": "EUR",
   "term": "hour",
   "sku": "DEV1-S",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "port": "200 Mbps",
   "sourceNote": {
    "sc": "所列仅为计算资源价格。存储和弹性 IPv4 单独计费。",
    "tc": "所列僅為運算資源價格。儲存和彈性 IPv4 單獨計費。",
    "en": "The listed price covers compute only. Storage and flexible IPv4 are billed separately.",
    "ja": "表示額は計算リソースのみです。ストレージとフレキシブル IPv4 は別料金です。"
   },
   "proof": "https://www.scaleway.com/en/docs/instances/reference-content/instances-datasheet/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-7af63c35a8a1",
  "market": "NL",
  "city": "Amsterdam",
  "provider": "Scaleway",
  "plan": "DEV1-S · NL-AMS-1",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.scaleway.com/en/pricing/virtual-instances/",
  "sku": "DEV1-S",
  "proof": "https://www.scaleway.com/en/docs/instances/reference-content/instances-datasheet/",
  "spec": {
   "sku": "DEV1-S",
   "cpu": "2 vCPU",
   "ram": "2 GB",
   "port": "200 Mbps",
   "sourceNote": {
    "sc": "所列仅为计算资源价格。存储和弹性 IPv4 单独计费。",
    "tc": "所列僅為運算資源價格。儲存和彈性 IPv4 單獨計費。",
    "en": "The listed price covers compute only. Storage and flexible IPv4 are billed separately.",
    "ja": "表示額は計算リソースのみです。ストレージとフレキシブル IPv4 は別料金です。"
   },
   "proof": "https://www.scaleway.com/en/docs/instances/reference-content/instances-datasheet/",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-d6587571e52d",
  "market": "JP",
  "city": "Tokyo",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-e43325d8d1d8",
  "market": "KR",
  "city": "Seoul",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-924e24a90d32",
  "market": "HK",
  "city": "Hong Kong",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "1 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-36f0aae02c6f",
  "market": "SG",
  "city": "Singapore",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-13ac4e96d935",
  "market": "CA",
  "city": "Montreal",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8f72b6719d9a",
  "market": "DE",
  "city": "Frankfurt",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-8cb19bb35a8c",
  "market": "GB",
  "city": "London",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-af36efcacf98",
  "market": "FR",
  "city": "Paris",
  "provider": "Amazon Web Services",
  "plan": "Lightsail · Micro-1GB Linux / IPv4",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://aws.amazon.com/lightsail/pricing/",
  "sku": "Micro-1GB Linux / IPv4",
  "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html",
  "spec": {
   "price": "7.00",
   "currency": "USD",
   "term": "month",
   "sku": "Micro-1GB Linux / IPv4",
   "cpu": "2 vCPU",
   "ram": "1 GB",
   "disk": "40 GB SSD",
   "traffic": "2 TB",
   "proof": "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-b53d74e09a52",
  "market": "SG",
  "city": "Singapore",
  "provider": "DigitalOcean",
  "plan": "Basic Droplet · Regular / 1 GiB",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.digitalocean.com/pricing/droplets",
  "proof": "https://docs.digitalocean.com/products/droplets/details/availability/",
  "spec": {
   "price": "6.00",
   "currency": "USD",
   "term": "month",
   "sku": "Basic Droplet · Regular / 1 GiB",
   "cpu": "1 vCPU",
   "ram": "1 GiB",
   "disk": "25 GiB SSD",
   "traffic": "1,000 GiB",
   "proof": "https://www.digitalocean.com/pricing/droplets",
   "date": "2026-11-20"
  }
 },
 {
  "id": "shop-636d4bfb84a1",
  "market": "SJC",
  "city": "San Jose",
  "provider": "GreenCloud",
  "plan": "EPYCVDSSJCVF-2 · VDS",
  "kind": "vps",
  "ip": "unknown",
  "route": "unknown",
  "routeName": "",
  "carriers": [],
  "url": "https://www.greencloudvps.com/billing/store/epyc-nvme-kvm-vds/?language=english",
  "sku": "EPYCVDSSJCVF-2",
  "spec": {
   "price": "20.00",
   "currency": "USD",
   "term": "month",
   "sku": "EPYCVDSSJCVF-2",
   "cpu": "2 × EPYC Milan (dedicated)",
   "ram": "16 GB",
   "disk": "160 GB NVMe 4.0 RAID-10",
   "traffic": "8 TB",
   "port": "10 Gbps",
   "proof": "https://www.greencloudvps.com/billing/store/epyc-nvme-kvm-vds/?language=english",
   "date": "2026-11-20"
  }
 }
]);
