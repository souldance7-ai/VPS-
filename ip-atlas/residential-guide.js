'use strict';

const residentialWords = {
  title: ipCopy('家宽与 IP 纯净度', '家寬與 IP 純淨度', 'Residential IP evidence', '住宅回線と IP の判定'),
  intro: ipCopy('按接入方式和样本证据查找。纯净度结果对应测试日期、数据库和该次分配的 IP。', '依接取方式和樣本證據查找。純淨度結果對應測試日期、資料庫和該次分配的 IP。', 'Filter by access type or sample evidence. Test results describe the assigned IP, the classifiers used, and the date.', '接続方式やサンプルの根拠から検索できます。判定は測定日時、利用データベース、割り当て IP に対応します。'),
  category: ipCopy('家宽类型', '家寬類型', 'Residential type', '住宅回線の種類'),
  'home-access': ipCopy('家宽接入', '家寬接取', 'Home broadband access', '家庭用回線'),
  'home-isp': ipCopy('ISP／家宽 IP', 'ISP／家寬 IP', 'ISP / residential IP', 'ISP・住宅 IP'),
  'home-mixed': ipCopy('疑似伪家宽', '疑似偽家寬', 'Mixed classification', '住宅判定に相違'),
  'home-sample': ipCopy('有 IP 实测', '有 IP 實測', 'IP sample available', 'IP の実測あり'),
  accessNote: ipCopy('商家公开产品资料注明家庭宽带接入。', '商家公開產品資料註明家庭寬頻接取。', 'The vendor documents home broadband access for this plan.', '対象プランについて事業者が家庭用回線の利用を記載しています。'),
  ispNote: ipCopy('商家标注 ISP 或住宅 IP，接入形式仍待核对。', '商家標示 ISP 或住宅 IP，接取方式仍待核對。', 'The vendor lists ISP or residential IPs. Physical access is unverified.', '事業者の表示は ISP または住宅 IP です。物理回線の種類は未確認です。'),
  mixedNote: ipCopy('同一套餐的公开样本出现家宽与机房判定分歧。', '同一方案的公開樣本出現家寬與機房判定分歧。', 'A published sample for this plan has conflicting residential and hosting classifications.', '対象プランの公開サンプルで住宅回線とデータセンターの判定が分かれています。'),
  sampleNote: ipCopy('可查看同一方案的公开样本、测试时间和判定来源。', '可查看同一方案的公開樣本、測試時間和判定來源。', 'See published results, dates, and classification sources for the same plan.', '対象プランの公開サンプル、計測日、判定の出典を確認できます。'),
  forum: ipCopy('NodeSeek 家宽测评', 'NodeSeek 家寬測評', 'NodeSeek residential reviews', 'NodeSeek の住宅回線レビュー'),
  lookup: ipCopy('核验自己的 IP', '核驗自己的 IP', 'Check your IP', '自分の IP を確認'),
  merchant: ipCopy('商家说明', '商家說明', 'Vendor documentation', '事業者の説明'),
  sample: ipCopy('实测原帖', '實測原帖', 'Published test', '実測の原文'),
  noSample: ipCopy('这个方案目前缺少可核对的 IP 实测。', '這個方案目前缺少可核對的 IP 實測。', 'No verifiable IP test is available for this plan yet.', 'このプランで確認可能な IP 実測はまだありません。'),
};
const residentialTypes = ['home-access', 'home-isp', 'home-mixed'];
const documentedHomeAccess = new Set(['boil-kddi', 'boil-softbank', 'akile-hinet', 'lh-tw-200']);
const residentialSearch = 'https://www.nodeseek.com/search?q=%E5%AE%B6%E5%AE%BD&category=review';
const residentialProfiles = new WeakMap();

function residentialWord(key) { return val(residentialWords[key]); }

function residentialProfile(plan) {
  if (residentialProfiles.has(plan)) return residentialProfiles.get(plan);
  const evidence = getIpEvidence(plan);
  const access = plan.residentialAccess === true || (documentedHomeAccess.has(plan.id) && evidence.some(entry => entry.value === 'residential'));
  const claimed = (plan.residentialClaim === true || evidence.some(entry => entry.value === 'residential') ||
    (plan.ip === 'isp' && evidence.some(entry => entry.value === 'isp')));
  const specificReviews = typeof RESIDENTIAL_REVIEWS === 'undefined' ? [] : RESIDENTIAL_REVIEWS.get(plan.id) || [];
  const reviews = specificReviews.filter(report => /^https:\/\//.test(report.url) && /^\d{4}-\d{2}-\d{2}$/.test(report.date) && report.findings);
  const mixed = (claimed || access) && reviews.some(report => report.conflicting === true);
  const feature = mixed ? 'home-mixed' : access ? 'home-access' : claimed ? 'home-isp' : '';
  const official = evidence.find(entry => entry.value === 'residential' || entry.value === 'isp')?.url || plan.proof || plan.url;
  const profile = {access, claimed, feature, official, reviews};
  residentialProfiles.set(plan, profile);
  return profile;
}

function residentialSearchTerms(plan) {
  const profile = residentialProfile(plan);
  if (!profile.feature && !profile.reviews.length) return [];
  const aliases = ['家宽 家寬 住宅 residential'];
  if (profile.feature === 'home-mixed') aliases.push('伪家宽 偽家寬 mixed residential hosting');
  if (profile.claimed) aliases.push('ISP');
  if (profile.reviews.length) aliases.push('纯净度 純淨度 风险评分 風險評分 IPQuality');
  return aliases;
}

function renderResidentialGuide(out, counts) {
  if (!out) return;
  const homeLink = $('home-residential');
  if (homeLink) homeLink.textContent = residentialWord('title');
  const focused = out.contains(document.activeElement) ? document.activeElement.dataset.quickValue : '';
  const heading = el('h3', residentialWord('title'));
  heading.id = 'residential-guide-title';
  const options = el('div', null, 'residential-options');
  for (const [key, note] of [['home-access', 'accessNote'], ['home-isp', 'ispNote'], ['home-mixed', 'mixedNote'], ['home-sample', 'sampleNote']]) {
    const option = btn('', () => toggleQuickValue(key), 'residential-option');
    option.dataset.quickValue = key;
    option.setAttribute('aria-pressed', String(quickActive.has(key)));
    const label = el('span', null, 'residential-option-label');
    label.append(el('b', residentialWord(key)), el('small', String(counts.get(key) || 0)));
    option.append(label, el('span', residentialWord(note), 'residential-option-note'));
    options.append(option);
  }
  const links = el('div', null, 'residential-links');
  const lookup = el('a', residentialWord('lookup') + ' →'); lookup.href = '#verify';
  links.append(link(residentialWord('forum') + ' ↗', residentialSearch), lookup);
  out.replaceChildren(heading, el('p', residentialWord('intro')), options, links);
  if (focused) out.querySelector(`[data-quick-value="${CSS.escape(focused)}"]`)?.focus({preventScroll: true});
}

function renderResidentialEvidence(out, plan) {
  const profile = residentialProfile(plan);
  if (!profile.feature && !profile.reviews.length) return;
  const section = el('section', null, 'residential-evidence');
  section.append(el('h3', residentialWord('title')));
  if (profile.claimed || profile.access) {
    const claim = el('p', residentialWord(profile.access ? 'accessNote' : 'ispNote'));
    section.append(claim);
    if (/^https:\/\//.test(profile.official)) section.append(link(residentialWord('merchant') + ' ↗', profile.official));
  }
  for (const report of profile.reviews) {
    const row = el('article', null, 'residential-sample');
    const label = val(report.title) || residentialWord('sample');
    const date = el('time', report.date); date.dateTime = report.date;
    row.append(el('h4', label), date, el('p', val(report.findings)));
    if (report.conflicting === true) row.append(el('p', residentialWord('mixedNote'), 'residential-mixed-note'));
    if (report.classifiers) row.append(el('small', val(report.classifiers)));
    row.append(link(residentialWord('sample') + ' ↗', report.url));
    section.append(row);
  }
  section.append(el('p', residentialWord(profile.reviews.length ? 'intro' : 'noSample'), 'residential-evidence-note'));
  out.append(section);
}
