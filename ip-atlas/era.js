'use strict';

// The cover, captions and network notes share the site's language switch.
const eraCopy = {
  portalTitle: ['越过长城，寻找 VPS', '越過長城，尋找 VPS', 'Beyond the wall. Find your VPS.', '長城を越えて、VPS を探す'],
  eraCoverAlt: ['蓝色法斗 YUKI 背着无线电跃过长城，烽火台后方升起未来城市。','藍色法鬥 YUKI 揹著無線電躍過長城，烽火臺後方升起未來城市。','YUKI, a blue French bulldog with a field radio, leaps over the Great Wall toward a futuristic skyline.','青いフレンチブルドッグの YUKI が無線機を背負って長城を跳び越える。見張り台の先には未来都市。'],
  portalIntro: ['跟着 YUKI 看机房、读回程、比配置。先看近期优惠，再查每个报价背后的线路与库存。', '跟著 YUKI 看機房、讀回程、比配置。先看近期優惠，再查每個報價背後的線路與庫存。', 'Follow YUKI from the watchtowers to the server racks. Browse offers, compare routes and check the hardware behind each price.', 'YUKI と巡る世界のデータセンター。新着セールから、経路・構成・在庫を比較できます。'],
  eraOffersLink: ['近期优惠', '近期優惠', 'Browse offers', '新着セール'],
  eraJournalLink: ['评测时间线', '評測時間線', 'Review timeline', 'レビュー年表'],

};
for (const [key, variants] of Object.entries(eraCopy)) {
  editionLangs.forEach((locale, index) => { WORDS[locale][key] = variants[index]; });
}


document.querySelector('[data-era-offers]').addEventListener('click', () => activateOfferTab($('tab-index')));

function localizeEraCover() {
  const locale = document.getElementById('language').value;
  document.querySelector('.portal-art').alt = WORDS[locale].eraCoverAlt;
}
document.getElementById('language').addEventListener('change', localizeEraCover);
document.addEventListener('DOMContentLoaded', localizeEraCover);