'use strict';

(() => {
  const mount = document.getElementById('forumReport');
  if (!mount) return;

  const copy = {
    sc: {
      title:'R4 网络质量实测', action:'复制为 NodeSeek 格式', reset:'恢复生成版',
      caption:'复制后贴到 NodeSeek 正文的 Markdown 编辑器。', edit:'编辑 Markdown 源码',
      hint:'\\x1b 表示颜色控制符。复制时会自动转回 ANSI。', preview:'ANSI 预览', copied:'已复制，可直接贴到 NodeSeek。',
      copyFailed:'浏览器未允许自动复制。已选中论坛源码，可手动复制。', empty:'请输入要复制的内容。',
      time:'测试时间', network:'ASN 网络', scope:'测速范围', scopeValue:'浏览器到 Cloudflare 测速端点 · HTTP',
      quick:'延迟快测', full:'五阶段完整测量', idle:'空闲 HTTP 延迟', singleDl:'单请求下载', singleUl:'单请求上传',
      multiDl:'16 路并行下载', multiUl:'16 路并行上传', dl:'下载平均速度', ul:'上传平均速度',
      avg:'平均', peak:'峰值', loaded:'负载延迟', jitter:'抖动', failure:'HTTP 请求失败率',
      effective:'有效请求', inFlight:'峰值在途', probe:'负载探测超时', weak:'并行样本不足', missing:'未测／样本不足',
    },
    tc: {
      title:'R4 網路品質實測', action:'複製為 NodeSeek 格式', reset:'還原產生版本',
      caption:'複製後貼到 NodeSeek 正文的 Markdown 編輯器。', edit:'編輯 Markdown 原始碼',
      hint:'\\x1b 代表顏色控制字元。複製時會自動轉回 ANSI。', preview:'ANSI 預覽', copied:'已複製，可直接貼到 NodeSeek。',
      copyFailed:'瀏覽器未允許自動複製。已選取論壇原始碼，可手動複製。', empty:'請輸入要複製的內容。',
      time:'測試時間', network:'ASN 網路', scope:'測速範圍', scopeValue:'瀏覽器到 Cloudflare 測速端點 · HTTP',
      quick:'延遲快測', full:'五階段完整測量', idle:'空閒 HTTP 延遲', singleDl:'單請求下載', singleUl:'單請求上傳',
      multiDl:'16 路並行下載', multiUl:'16 路並行上傳', dl:'下載平均速度', ul:'上傳平均速度',
      avg:'平均', peak:'峰值', loaded:'負載延遲', jitter:'抖動', failure:'HTTP 請求失敗率',
      effective:'有效請求', inFlight:'峰值在途', probe:'負載探測逾時', weak:'並行樣本不足', missing:'未測／樣本不足',
    },
    en: {
      title:'R4 Network Quality Test', action:'Copy NodeSeek format', reset:'Reset to generated report',
      caption:'Paste into the Markdown editor in the body of a NodeSeek post.', edit:'Edit Markdown source',
      hint:'\\x1b marks a color control character. Copy converts it back to ANSI.', preview:'ANSI preview', copied:'Copied. Paste directly into NodeSeek.',
      copyFailed:'The browser blocked automatic copying. The source is selected for manual copying.', empty:'Enter some text to copy.',
      time:'Test time', network:'ASN network', scope:'Measurement scope', scopeValue:'Browser to Cloudflare speed endpoint · HTTP',
      quick:'Quick latency test', full:'Five-stage test', idle:'Idle HTTP latency', singleDl:'Single-request download', singleUl:'Single-request upload',
      multiDl:'16-request download', multiUl:'16-request upload', dl:'Average download speed', ul:'Average upload speed',
      avg:'Mean', peak:'Peak', loaded:'Loaded latency', jitter:'Jitter', failure:'HTTP request failures',
      effective:'Effective requests', inFlight:'Peak in flight', probe:'Loaded probe timeouts', weak:'Insufficient parallel samples', missing:'Untested / insufficient data',
    },
    ja: {
      title:'R4 ネットワーク品質測定', action:'NodeSeek 形式でコピー', reset:'自動生成版に戻す',
      caption:'コピーした内容を NodeSeek の投稿本文の Markdown エディターに貼り付けます。', edit:'Markdown ソースを編集',
      hint:'\\x1b は色の制御文字です。コピー時に ANSI に戻します。', preview:'ANSI プレビュー', copied:'コピーしました。NodeSeek に貼り付けられます。',
      copyFailed:'自動コピーが許可されませんでした。選択されたソースを手動でコピーできます。', empty:'コピーする内容を入力してください。',
      time:'測定時刻', network:'ASN ネットワーク', scope:'測定範囲', scopeValue:'ブラウザーから Cloudflare の測定先まで · HTTP',
      quick:'簡易レイテンシー測定', full:'5 段階の測定', idle:'無負荷時の HTTP 遅延', singleDl:'単一リクエストのダウンロード', singleUl:'単一リクエストのアップロード',
      multiDl:'16 並列ダウンロード', multiUl:'16 並列アップロード', dl:'平均ダウンロード速度', ul:'平均アップロード速度',
      avg:'平均', peak:'最大', loaded:'負荷時遅延', jitter:'ジッター', failure:'HTTP リクエストの失敗率',
      effective:'有効リクエスト', inFlight:'最大同時実行数', probe:'負荷時プローブのタイムアウト', weak:'並列サンプル不足', missing:'未測定／サンプル不足',
    },
  };

  const phases = ['latency', 'singleDl', 'singleUl', 'multiDl', 'multiUl'];
  const escape = '\u001b';
  const resetColor = `${escape}[0m`;
  const color = (code, text) => `${escape}[${code}m${text}${resetColor}`;
  const indexed = (code, text) => color(`38;5;${code}`, text);
  const downloadRamp = [24, 31, 38, 44, 50, 87];
  const uploadRamp = [54, 55, 92, 129, 135, 177];
  const barWidth = 20;

  function element(tag, id, className) {
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (className) node.className = className;
    return node;
  }

  const heading = element('h2', 'forumHeading');
  const caption = element('p', '', 'caption forum-caption');
  const toolbar = element('div', '', 'forum-toolbar');
  const copyButton = element('button', 'forumCopy', 'secondary');
  const resetButton = element('button', 'forumReset', 'secondary');
  copyButton.type = resetButton.type = 'button';
  toolbar.append(copyButton, resetButton);
  const preview = element('pre', 'forumPreview', 'forum-preview');
  preview.tabIndex = 0;
  const editor = element('details', 'forumEdit', 'forum-editor');
  const summary = element('summary');
  const hint = element('p', '', 'caption');
  const source = element('textarea', 'forumSource', 'forum-source');
  source.setAttribute('aria-labelledby', summary.id = 'forumSourceHeading');
  source.rows = 11;
  source.spellcheck = false;
  source.maxLength = 12000;
  source.wrap = 'off';
  editor.append(summary, hint, source);
  const status = element('p', 'forumStatus', 'caption forum-status');
  status.setAttribute('role', 'status');
  mount.setAttribute('aria-labelledby', heading.id);
  mount.append(heading, caption, toolbar, preview, editor, status);

  const languages = {sc:'zh-CN', tc:'zh-TW', en:'en', ja:'ja'};
  const parsedLanguage = () => {
    const lang = (document.documentElement.lang || '').toLowerCase();
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('ja')) return 'ja';
    return /^zh-(hant|tw|hk|mo)/.test(lang) ? 'tc' : 'sc';
  };
  const activeLanguage = () => {
    const locale = window.SpeedLocale?.locale;
    return Object.hasOwn(copy, locale) ? locale : parsedLanguage();
  };
  const labels = () => copy[activeLanguage()];
  const supported = value => Number.isFinite(value) && value >= 0;
  const shown = (value, unit) => supported(value) ? `${value.toFixed(2)} ${unit}` : '—';
  const count = (numerator, denominator) => supported(numerator) && supported(denominator) ? `${numerator}/${denominator}` : '—';

  let snapshot = null;
  let verifiedNetwork = '';
  let initial = '';
  let revision = 0;

  function cleanNetwork(value) {
    return `${value || ''}`.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069`]/g, ' ')
      .replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, '')
      .replace(/(?:[\da-f]{0,4}:){2,}[\da-f:.]*/gi, '')
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/\s+/g, ' ').trim().slice(0, 110);
  }

  function networkFromDocument() {
    const value = document.getElementById('network')?.textContent || '';
    const verified = /^AS\d{1,10}\b/i.test(value.trim());
    return verified ? cleanNetwork(value) : '';
  }

  function scaleOf(rows) {
    const largest = Math.max(0, ...rows.map(row => row?.avg).filter(supported));
    if (largest <= 0) return 0;
    const magnitude = 10 ** Math.floor(Math.log10(largest));
    return Number((Math.ceil(largest / magnitude) * magnitude).toPrecision(10));
  }

  function speedBar(value, limit, ramp) {
    if (!supported(value)) return indexed(245, '—');
    const units = value > 0 && limit > 0 ? Math.max(1, Math.min(barWidth, Math.round(value / limit * barWidth))) : 0;
    let chart = '';
    for (let i = 0; i < ramp.length; i++) {
      const from = Math.ceil(i * barWidth / ramp.length);
      const to = Math.min(units, Math.ceil((i + 1) * barWidth / ramp.length));
      if (from < to) chart += indexed(ramp[i], '█'.repeat(to - from));
    }
    if (units < barWidth) chart += indexed(238, '░'.repeat(barWidth - units));
    return `${chart}  ${shown(value, 'Mbps')}`;
  }

  function speedLines(dictionary, report, keys, direction, ramp) {
    const rows = keys.map(key => report.phases[key]);
    const limit = scaleOf(rows);
    const range = limit > 0 ? ` · 0–${limit} Mbps` : '';
    const chart = rows.map((row, index) => `${speedBar(row?.avg, limit, ramp)}  ${dictionary[keys[index]]}`);
    return [indexed(ramp.at(-1), `${dictionary[direction]}${range}`), ...chart];
  }

  function phaseLines(dictionary, report, key) {
    const row = report.phases[key];
    const title = color('1;96', dictionary[key === 'latency' ? 'idle' : key]);
    if (!row) return [title, indexed(245, dictionary.missing)];
    const idle = key === 'latency';
    const unit = idle ? 'ms' : 'Mbps';
    const metrics = `${dictionary.avg}  ${shown(row.avg, unit)}  ·  ${dictionary.peak}  ${shown(row.peak, unit)}  ·  P90  ${shown(row.p90, unit)}`;
    const jitter = `${dictionary.jitter}  ${shown(row.jitter, 'ms')}`;
    if (idle) {
      const failure = `${dictionary.failure}  ${shown(row.loss, '%')}  (${count(row.failed, row.total)})`;
      return [title, metrics, `${jitter}  ·  ${failure}`];
    }
    const parallel = `${dictionary.effective}  ${count(row.effectiveWorkers, row.threads)}  ·  ${dictionary.inFlight}  ${count(row.peakActiveRequests, row.threads)}`;
    const verdict = row.threads > 1 && row.parallelVerified === false ? `  ·  ${indexed(220, dictionary.weak)}` : '';
    const probe = `${dictionary.probe}  ${count(row.probeTimeouts, row.probeTotal)}`;
    return [title, metrics, `${dictionary.loaded}  ${shown(row.loaded, 'ms')}  ·  ${jitter}`, `${parallel}  ·  ${probe}${verdict}`];
  }

  function generate(report) {
    const dictionary = labels();
    const network = verifiedNetwork || networkFromDocument();
    const stamp = Date.parse(report.timestamp);
    const date = Number.isFinite(stamp) ? new Intl.DateTimeFormat(languages[activeLanguage()], {
      dateStyle:'medium', timeStyle:'medium', timeZone:'Asia/Shanghai', hourCycle:'h23',
    }).format(stamp) : '';
    const scope = `${dictionary.scope}  ${dictionary.scopeValue}`;
    const lines = [color('1;96', `PITOPONE / ${dictionary.title}`), indexed(247, dictionary[report.mode])];
    if (date) lines.push(indexed(247, `${dictionary.time}  ${date} (UTC+8)`));
    lines.push(indexed(247, scope));
    if (network) lines.push(indexed(247, `${dictionary.network}  ${network}`));
    if (report.mode === 'full') {
      lines.push('', ...speedLines(dictionary, report, ['singleDl','multiDl'], 'dl', downloadRamp));
      lines.push('', ...speedLines(dictionary, report, ['singleUl','multiUl'], 'ul', uploadRamp));
    }
    for (const key of report.mode === 'quick' ? ['latency'] : phases) lines.push('', ...phaseLines(dictionary, report, key));
    return `### PITOPONE · ${dictionary.title}\n\n\`\`\`ansi\n${lines.join('\n')}\n\`\`\`\n`;
  }

  function decode(value) {
    return value.replace(/\\x1b(?=\[\d*(?:;\d+)*m)/gi, escape)
      .replace(/\u001b(?!\[\d*(?:;\d+)*m)|[\u0000-\u0008\u000b-\u000c\u000e-\u001a\u001c-\u001f\u007f-\u009f]/g, '');
  }

  const basic = [
    '#202632', '#f17186', '#61daca', '#f5c778', '#8badff', '#c696ff', '#7cdee5', '#eaf0ff',
    '#8f9bb7', '#ff95a9', '#83ffe5', '#ffe496', '#abc6ff', '#e5c2ff', '#a8f6ff', '#fff',
  ];

  function palette(index) {
    if (index < 16) return basic[index];
    if (index >= 232) return `rgb(${[8 + 10 * (index - 232), 8 + 10 * (index - 232), 8 + 10 * (index - 232)].join(',')})`;
    const offset = index - 16;
    const channels = [0, 95, 135, 175, 215, 255];
    return `rgb(${channels[Math.floor(offset / 36)]},${channels[Math.floor(offset / 6) % 6]},${channels[offset % 6]})`;
  }

  function renderAnsi(value) {
    const text = decode(value).replace(/^```ansi[ \t]*$/gm, '').replace(/^```[ \t]*$/gm, '');
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let foreground = '';
    let bold = false;
    function append(end) {
      if (cursor >= end) return;
      const segment = text.slice(cursor, end);
      if (!foreground && !bold) {
        fragment.append(document.createTextNode(segment));
        return;
      }
      const span = element('span');
      span.textContent = segment;
      if (foreground) span.style.color = foreground;
      if (bold) span.style.fontWeight = '700';
      fragment.append(span);
    }
    for (const match of text.matchAll(/\u001b\[(\d*(?:;\d+)*)m/g)) {
      append(match.index);
      const codes = match[1].split(';').map(Number);
      for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        if (code === 0) { foreground = ''; bold = false; }
        else if (code === 1) bold = true;
        else if (code === 22) bold = false;
        else if (code === 39) foreground = '';
        else if (code >= 30 && code <= 37) foreground = basic[code - 30];
        else if (code >= 90 && code <= 97) foreground = basic[code - 82];
        else if (code === 38 && codes[i + 1] === 5) {
          if (codes[i + 2] >= 0 && codes[i + 2] <= 255) foreground = palette(codes[i + 2]);
          i += 2;
        } else if (code === 38 && codes[i + 1] === 2) {
          const rgb = codes.slice(i + 2, i + 5);
          if (rgb.length === 3 && rgb.every(channel => channel >= 0 && channel <= 255)) foreground = `rgb(${rgb.join(',')})`;
          i += 4;
        }
      }
      cursor = match.index + match[0].length;
    }
    append(text.length);
    preview.replaceChildren(fragment);
  }

  function updateLabels() {
    const dictionary = labels();
    heading.textContent = dictionary.title;
    caption.textContent = dictionary.caption;
    copyButton.textContent = dictionary.action;
    resetButton.textContent = dictionary.reset;
    summary.textContent = dictionary.edit;
    hint.textContent = dictionary.hint;
    preview.setAttribute('aria-label', dictionary.preview);
    status.textContent = '';
  }

  function syncSource(force) {
    if (!snapshot) return;
    const edited = source.value !== initial;
    initial = generate(snapshot).replaceAll(escape, '\\x1b');
    if (force || !edited) source.value = initial;
    resetButton.disabled = source.value === initial;
    renderAnsi(source.value);
  }

  function applyResult(report) {
    const valid = (report?.mode === 'quick' || report?.mode === 'full') && report.phases?.latency;
    snapshot = valid ? report : null;
    revision++;
    mount.hidden = !snapshot;
    status.textContent = '';
    if (!snapshot) {
      initial = source.value = '';
      preview.replaceChildren();
      return;
    }
    syncSource(true);
  }

  async function copyReport() {
    const value = decode(source.value);
    const message = labels();
    if (!value.trim()) { status.textContent = message.empty; return; }
    const operation = revision;
    const active = document.activeElement;
    try {
      await navigator.clipboard.writeText(value);
      if (operation === revision) status.textContent = message.copied;
      return;
    } catch {
      if (operation !== revision) return;
    }
    const buffer = element('textarea');
    buffer.value = value;
    buffer.style.position = 'fixed';
    buffer.style.opacity = '0';
    document.body.append(buffer);
    buffer.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch {}
    buffer.remove();
    if (copied) {
      active?.focus();
      status.textContent = message.copied;
      return;
    }
    editor.open = true;
    source.value = value;
    source.focus();
    source.select();
    resetButton.disabled = false;
    status.textContent = message.copyFailed;
  }

  source.addEventListener('input', () => {
    status.textContent = '';
    resetButton.disabled = source.value === initial;
    renderAnsi(source.value);
  });
  copyButton.addEventListener('click', copyReport);
  resetButton.addEventListener('click', () => {
    status.textContent = '';
    syncSource(true);
  });
  document.addEventListener('speed:result', event => applyResult(event.detail));
  document.addEventListener('speed:locale', () => {
    updateLabels();
    syncSource(false);
  });
  document.addEventListener('speed:network', event => {
    const asn = String(event.detail?.asn ?? '').match(/^(?:AS)?(\d{1,10})$/i)?.[1];
    if (!asn) return;
    const organization = cleanNetwork(event.detail.organization);
    verifiedNetwork = organization ? `AS${asn} · ${organization}` : `AS${asn}`;
    syncSource(false);
  });

  updateLabels();
  applyResult(window.SpeedStation?.result?.());
})();
