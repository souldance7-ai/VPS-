'use strict';

// The cover, captions and network notes share the site's language switch.
const eraCopy = {
  portalTitle: ['越过长城，寻找 VPS', '越過長城，尋找 VPS', 'Beyond the wall. Find your VPS.', '長城を越えて、VPS を探す'],
  eraCoverAlt: ['蓝色法斗 YUKI 背着无线电跃过长城，烽火台后方升起未来城市。','藍色法鬥 YUKI 揹著無線電躍過長城，烽火臺後方升起未來城市。','YUKI, a blue French bulldog with a field radio, leaps over the Great Wall toward a futuristic skyline.','青いフレンチブルドッグの YUKI が無線機を背負って長城を跳び越える。見張り台の先には未来都市。'],
  portalIntro: ['跟着 YUKI 看机房、读回程、比配置。先看近期优惠，再查每个报价背后的线路与库存。', '跟著 YUKI 看機房、讀回程、比配置。先看近期優惠，再查每個報價背後的線路與庫存。', 'Follow YUKI from the watchtowers to the server racks. Browse offers, compare routes and check the hardware behind each price.', 'YUKI と巡る世界のデータセンター。新着セールから、経路・構成・在庫を比較できます。'],
  eraOffersLink: ['近期优惠', '近期優惠', 'Browse offers', '新着セール'],
  eraJournalLink: ['评测时间线', '評測時間線', 'Review timeline', 'レビュー年表'],
  eraTitle: ['YUKI 的长城三跳', 'YUKI 的長城三跳', 'YUKI in three hops', 'YUKI、長城を三跳び'],
  eraIntro: ['点开一格，跟着同一份数据包穿越三个时代。', '點開一格，跟著同一份資料封包穿越三個時代。', 'Open a panel and follow one packet across three eras.', 'コマを選んで、ひとつのパケットの時代旅行をたどろう。'],
  chapter1: ['烽火台', '烽火臺', 'The beacon', 'のろし台'],
  chapter2: ['拨号年代', '撥號年代', 'The dial-up years', 'ダイヤルアップの時代'],
  chapter3: ['AI 边境', 'AI 邊境', 'The AI frontier', 'AI の国境'],
  bubble1: ['驿站说一路畅通。我问的是回程。','驛站說一路暢通。我問的是回程。','“Clear road ahead!” Great. How do I get back?','「行きは順調！」で、帰り道は？'],
  bubble2: ['问墙外在不在，城墙替对方保持了沉默。','問牆外在不在，城牆替對方保持了沉默。','I pinged the far side. The wall politely declined to comment.','壁の向こうへ ping。壁が代わりに黙ってくれた。'],
  bubble3: ['AI 画了条直线。我跑了十七跳。','AI 畫了條直線。我跑了十七跳。','AI drew a straight line. My packet took seventeen hops.','AI が引いたのは直線。走ったら十七ホップ。'],
  eraNote1: ['去程与回程可能走不同网络。挑大陆优化线路时，先对照运营商与测试方向。','去程與回程可能走不同網路。挑大陸優化線路時，先對照電信商與測試方向。','The outbound and return paths may differ. Compare the carrier and test direction when choosing a mainland route.','往路と復路は異なることがあります。中国大陸向け回線は、キャリアと測定方向を揃えて比較しましょう。'],
  eraNote2: ['没有 ping 回应也可能是 ICMP 被过滤。读评测时一起看应用可达性与测试时间。','沒有 ping 回應也可能是 ICMP 被過濾。讀評測時一起看應用可達性與測試時間。','Silence on ping can mean ICMP was filtered. Check whether the service was reachable and when the reviewer tested it.','ping が返らない理由には ICMP のフィルタリングもあります。サービスへの到達可否と測定時刻を確認しましょう。'],
  eraNote3: ['地图上的距离只是起点。同一城市的机房也会使用不同上游，晚高峰表现要看实测。','地圖上的距離只是起點。同一城市的機房也會使用不同上游，晚高峰表現要看實測。','Two facilities in one city can use different upstreams. Look for measurements taken during the evening peak.','同じ都市でもデータセンターごとに上流回線は違います。夜間の混雑は実測記録から読み取りましょう。'],
  eraRead: ['读实测档案', '讀實測檔案', 'Read the field reports', '実測記録を読む'],
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