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
      time:'测试时间', network:'ASN 网络', scope:'测速范围', scopeValue:'延迟 → Atlas 同站 Cloudflare 边缘 · 传输 → Cloudflare Speed',
      quick:'延迟快测', full:'五阶段完整测量', idle:'空闲 HTTP 延迟', quality:'空闲稳定性', single:'单请求', multi:'16 路并行', dl:'下载', ul:'上传',
      avg:'平均', peak:'峰值', loaded:'负载延迟', jitter:'抖动', failure:'HTTP 失败', latency:'延迟', scales:'标尺', ratio:'比例',
      effective:'有效并发', launched:'已启动', inFlight:'峰值在途', probe:'探测成功', timeout:'探测超时', probeErrors:'其他探测失败',
      bytes:'传输量', requests:'完成请求', transferErrors:'传输错误', downgraded:'降档次数', fallback:'切换端点', block:'请求块大小',
      weak:'并行样本不足', low:'少量探测，仅供参考', missing:'未测／样本不足',
    },
    tc: {
      title:'R4 網路品質實測', action:'複製為 NodeSeek 格式', reset:'還原產生版本',
      caption:'複製後貼到 NodeSeek 正文的 Markdown 編輯器。', edit:'編輯 Markdown 原始碼',
      hint:'\\x1b 代表顏色控制字元。複製時會自動轉回 ANSI。', preview:'ANSI 預覽', copied:'已複製，可直接貼到 NodeSeek。',
      copyFailed:'瀏覽器未允許自動複製。已選取論壇原始碼，可手動複製。', empty:'請輸入要複製的內容。',
      time:'測試時間', network:'ASN 網路', scope:'測速範圍', scopeValue:'延遲 → Atlas 同站 Cloudflare 邊緣 · 傳輸 → Cloudflare Speed',
      quick:'延遲快測', full:'五階段完整測量', idle:'空閒 HTTP 延遲', quality:'空閒穩定性', single:'單請求', multi:'16 路並行', dl:'下載', ul:'上傳',
      avg:'平均', peak:'峰值', loaded:'負載延遲', jitter:'抖動', failure:'HTTP 失敗', latency:'延遲', scales:'刻度', ratio:'比率',
      effective:'有效並行', launched:'已啟動', inFlight:'峰值在途', probe:'探測成功', timeout:'探測逾時', probeErrors:'其他探測失敗',
      bytes:'傳輸量', requests:'完成請求', transferErrors:'傳輸錯誤', downgraded:'降檔次數', fallback:'切換端點', block:'請求區塊大小',
      weak:'並行樣本不足', low:'探測樣本少，僅供參考', missing:'未測／樣本不足',
    },
    en: {
      title:'R4 Network Quality Test', action:'Copy NodeSeek format', reset:'Reset to generated report',
      caption:'Paste into the Markdown editor in the body of a NodeSeek post.', edit:'Edit Markdown source',
      hint:'\\x1b marks a color control character. Copy converts it back to ANSI.', preview:'ANSI preview', copied:'Copied. Paste directly into NodeSeek.',
      copyFailed:'The browser blocked automatic copying. The source is selected for manual copying.', empty:'Enter some text to copy.',
      time:'Test time', network:'ASN network', scope:'Scope', scopeValue:'Latency → Atlas Cloudflare edge · Transfer → Cloudflare Speed',
      quick:'Quick latency test', full:'Five-stage test', idle:'Idle HTTP latency', quality:'Idle stability', single:'Single request', multi:'16 parallel requests', dl:'Download', ul:'Upload',
      avg:'Mean', peak:'Peak', loaded:'Loaded', jitter:'Jitter', failure:'HTTP failed', latency:'Latency', scales:'Scales', ratio:'Ratio',
      effective:'Effective', launched:'Started', inFlight:'Peak in flight', probe:'Probes OK', timeout:'Timeouts', probeErrors:'Probe errors',
      bytes:'Transferred', requests:'Requests done', transferErrors:'Transfer errors', downgraded:'Size reductions', fallback:'Endpoint shifts', block:'Request block',
      weak:'Insufficient parallel samples', low:'Few probes; indicative only', missing:'Untested / insufficient data',
    },
    ja: {
      title:'R4 ネットワーク品質測定', action:'NodeSeek 形式でコピー', reset:'自動生成版に戻す',
      caption:'コピーした内容を NodeSeek の投稿本文の Markdown エディターに貼り付けます。', edit:'Markdown ソースを編集',
      hint:'\\x1b は色の制御文字です。コピー時に ANSI に戻します。', preview:'ANSI プレビュー', copied:'コピーしました。NodeSeek に貼り付けられます。',
      copyFailed:'自動コピーが許可されませんでした。選択されたソースを手動でコピーできます。', empty:'コピーする内容を入力してください。',
      time:'測定時刻', network:'ASN ネットワーク', scope:'測定範囲', scopeValue:'遅延 → Atlas の Cloudflare エッジ · 転送 → Cloudflare Speed',
      quick:'簡易レイテンシー測定', full:'5 段階の測定', idle:'無負荷時の HTTP 遅延', quality:'無負荷時の安定性', single:'単一リクエスト', multi:'16 並列', dl:'ダウンロード', ul:'アップロード',
      avg:'平均', peak:'最大', loaded:'負荷時遅延', jitter:'ジッター', failure:'HTTP 失敗', latency:'遅延', scales:'目盛り', ratio:'割合',
      effective:'有効', launched:'開始済み', inFlight:'最大同時実行', probe:'プローブ成功', timeout:'タイムアウト', probeErrors:'その他の失敗',
      bytes:'転送量', requests:'完了数', transferErrors:'転送エラー', downgraded:'サイズ縮小', fallback:'測定先切替', block:'リクエスト容量',
      weak:'並列サンプル不足', low:'サンプル少数（参考値）', missing:'未測定／サンプル不足',
    },
  };

  const transferPhases = ['singleDl', 'singleUl', 'multiDl', 'multiUl'];
  const escape = '\u001b';
  const resetColor = `${escape}[0m`;
  const color = (code, text) => `${escape}[${code}m${text}${resetColor}`;
  const indexed = (code, text) => color(`38;5;${code}`, text);
  const downloadRamp = [31, 38, 44, 50, 87, 123];
  const uploadRamp = [98, 99, 135, 141, 177, 219];
  const latencyRamp = [136, 172, 208, 214, 222, 229];
  const jitterRamp = [69, 75, 81, 111, 117, 153];
  const countRamp = [35, 41, 42, 48, 85, 121];
  const errorRamp = [131, 167, 203, 209, 216, 224];
  const barWidth = 10;

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
  source.maxLength = 24000;
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

  function scaleOf(values) {
    const largest = Math.max(0, ...values.filter(supported));
    if (largest <= 0) return 1;
    const magnitude = 10 ** Math.floor(Math.log10(largest));
    return Number((Math.ceil(largest / magnitude) * magnitude).toPrecision(10));
  }

  function gradient(value, max, ramp) {
    if (!supported(value) || !(max > 0)) return '';
    const units = value > 0 ? Math.max(1, Math.min(barWidth, Math.round(value / max * barWidth))) : 0;
    let chart = '';
    for (let i = 0; i < ramp.length; i++) {
      const from = Math.ceil(i * barWidth / ramp.length);
      const to = Math.min(units, Math.ceil((i + 1) * barWidth / ramp.length));
      if (from < to) chart += `${escape}[38;5;${ramp[i]}m${'█'.repeat(to - from)}`;
    }
    if (units < barWidth) chart += `${escape}[38;5;238m${'░'.repeat(barWidth - units)}`;
    return `${chart}${resetColor}`;
  }

  function cells(value) {
    let width = 0;
    for (const c of value.replace(/\u001b\[[\d;]*m/g, '')) {
      if (/\p{Mark}|\p{Format}/u.test(c)) continue;
      const code = c.codePointAt(0);
      const wide = (code >= 0x1100 && code <= 0x115f) || (code >= 0x2e80 && code <= 0xa4cf) ||
        (code >= 0xac00 && code <= 0xd7a3) || (code >= 0xf900 && code <= 0xfaff) ||
        (code >= 0xfe10 && code <= 0xfe6f) || (code >= 0xff01 && code <= 0xff60) ||
        (code >= 0xffe0 && code <= 0xffe6) || (code >= 0x20000 && code <= 0x3fffd);
      width += wide ? 2 : 1;
    }
    return width;
  }

  const padRight = (value, width) => value + ' '.repeat(Math.max(0, width - cells(value)));
  const padLeft = (value, width) => ' '.repeat(Math.max(0, width - cells(value))) + value;
  const widest = values => Math.max(0, ...values.map(cells));
  const measure = (label, value, unit, max, ramp) => [label, shown(value, unit), gradient(value, max, ramp)];
  const tally = (label, value, max, ramp) => [label, supported(value) ? String(value) : '—', gradient(value, max, ramp)];
  const ratio = (label, part, whole, ramp) => [label, count(part, whole), gradient(supported(part) ? part : null, whole, ramp)];
  const range = (max, unit) => `0–${max} ${unit}`;

  function formatColumn(rows) {
    const readings = rows.filter(Array.isArray);
    const labelWidth = widest(readings.map(row => row[0]));
    const numberWidth = widest(readings.map(row => row[1]));
    return rows.map(row => Array.isArray(row)
      ? `${padRight(row[0], labelWidth)}  ${padLeft(row[1], numberWidth)}${row[2] ? `  ${row[2]}` : ''}` : row);
  }

  function layOutColumns(pairs) {
    const leftWidth = widest(pairs.flatMap(pair => pair[0]));
    return pairs.flatMap(([left, right], index) => {
      const lines = Array.from({length:Math.max(left.length, right.length)}, (_, i) => {
        if (!right[i]) return left[i] || '';
        return `${padRight(left[i] || '', leftWidth)} ${indexed(240, '|')} ${right[i]}`;
      });
      return index ? ['', ...lines] : lines;
    });
  }

  function idleColumns(dictionary, row, maxLatency, maxJitter) {
    const successful = supported(row.total) && supported(row.failed) && row.total >= row.failed ? row.total - row.failed : null;
    const failedText = `${shown(row.loss, '%')}${supported(row.total) && supported(row.failed) ? ` (${count(row.failed, row.total)})` : ''}`;
    const latency = color('1;96', dictionary.idle);
    const quality = color('1;96', dictionary.quality);
    return [
      formatColumn([latency,
        measure(dictionary.avg, row.avg, 'ms', maxLatency, latencyRamp),
        measure(dictionary.peak, row.peak, 'ms', maxLatency, latencyRamp),
        measure('P90', row.p90, 'ms', maxLatency, latencyRamp),
      ]),
      formatColumn([quality,
        measure(dictionary.jitter, row.jitter, 'ms', maxJitter, jitterRamp),
        [dictionary.failure, failedText, gradient(row.loss, 100, errorRamp)],
        ratio(dictionary.probe, successful, row.total, countRamp),
      ]),
    ];
  }

  function transferColumns(dictionary, left, right, label, limits) {
    const counters = [
      ['bytes', 'bytes', 'MiB'], ['completed', 'requests'], ['transferErrors', 'transferErrors'],
      ['downgradeCount', 'downgraded'], ['endpointSwitches', 'fallback'], ['blockMb', 'block', 'MiB'],
    ].filter(([property]) => supported(left?.[property]) || supported(right?.[property]));
    const volumes = [left?.bytes, right?.bytes].filter(supported).map(value => value / 1048576);
    const countersScale = new Map(counters.map(([property]) => [property, scaleOf(
      property === 'bytes' ? volumes : [left?.[property], right?.[property]],
    )]));

    function column(row, mode, speedMax, ramp) {
      const direction = `${mode === 'dl' ? '↓' : '↑'} ${dictionary[mode]} · ${range(speedMax, 'Mbps')}`;
      const title = indexed(ramp.at(-1), direction);
      const phase = color('1;96', dictionary[label]);
      if (!row) return [title, phase, indexed(245, dictionary.missing)];
      const start = [title, phase,
        measure(dictionary.avg, row.avg, 'Mbps', speedMax, ramp),
        measure(dictionary.peak, row.peak, 'Mbps', speedMax, ramp),
        measure('P90', row.p90, 'Mbps', speedMax, ramp),
        measure(dictionary.loaded, row.loaded, 'ms', limits.latency, latencyRamp),
        measure(dictionary.jitter, row.jitter, 'ms', limits.jitter, jitterRamp),
        ratio(dictionary.probe, row.probeSuccess, row.probeTotal, countRamp),
        ratio(dictionary.timeout, row.probeTimeouts, row.probeTotal, errorRamp),
        ratio(dictionary.probeErrors, row.probeErrors, row.probeTotal, errorRamp),
        ratio(dictionary.effective, row.effectiveWorkers, row.threads, countRamp),
        ratio(dictionary.launched, row.startedWorkers, row.threads, countRamp),
        ratio(dictionary.inFlight, row.peakActiveRequests, row.threads, countRamp),
      ];
      for (const [property, key, unit] of counters) {
        const value = row[property];
        const max = countersScale.get(property);
        const tone = property === 'transferErrors' ? errorRamp : ramp;
        if (unit) start.push(measure(dictionary[key], property === 'bytes' && supported(value) ? value / 1048576 : value, unit, max, tone));
        else start.push(tally(dictionary[key], value, max, tone));
      }
      const low = row.probeSuccess > 0 && row.probeSuccess < 5;
      const parallelMissing = row.threads > 1 && row.parallelVerified === false;
      if (low) start.push(indexed(220, `${dictionary.low} (${count(row.probeSuccess, row.probeTotal)})`));
      if (parallelMissing) start.push(indexed(220, dictionary.weak));
      return formatColumn(start);
    }
    return [column(left, 'dl', limits.dl, downloadRamp), column(right, 'ul', limits.ul, uploadRamp)];
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
    const idle = report.phases.latency;
    const transfers = transferPhases.map(key => report.phases[key]).filter(Boolean);
    const transferMax = keys => scaleOf(keys.flatMap(key => {
      const row = report.phases[key];
      return [row?.avg, row?.peak, row?.p90];
    }));
    const limits = {
      latency:scaleOf([idle.avg, idle.peak, idle.p90, ...transfers.map(row => row.loaded)]),
      jitter:scaleOf([idle.jitter, ...transfers.map(row => row.jitter)]),
      dl:transferMax(['singleDl','multiDl']), ul:transferMax(['singleUl','multiUl']),
    };
    lines.push(indexed(247, `${dictionary.scales}  ${dictionary.latency} ${range(limits.latency, 'ms')} · ${dictionary.jitter} ${range(limits.jitter, 'ms')} · ${dictionary.ratio} 0–100%`));
    const columns = [idleColumns(dictionary, idle, limits.latency, limits.jitter)];
    if (report.mode === 'full') {
      columns.push(transferColumns(dictionary, report.phases.singleDl, report.phases.singleUl, 'single', limits));
      columns.push(transferColumns(dictionary, report.phases.multiDl, report.phases.multiUl, 'multi', limits));
    }
    lines.push('', ...layOutColumns(columns));
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
