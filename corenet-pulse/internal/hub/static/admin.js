'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const rows = new Map();
  let nodes = [], authenticated = false;
  let probeConfig = null, probeDirty = false;
  const notice = (message, error = false) => {
    $('notice').textContent = message;
    $('notice').classList.toggle('error', error);
    $('notice').hidden = !message;
  };
  const setLoggedIn = active => {
    authenticated = active;
    $('login-panel').hidden = active;
    $('manager').hidden = !active;
    $('logout').hidden = !active;
    $('access-status').textContent = active ? '● 已登入管理頁' : '管理員登入';
    if (!active) {
      probeConfig = null; probeDirty = false; $('probe-targets').replaceChildren();
      $('names-panel').hidden = false; $('probes-panel').hidden = true;
      $('tab-names').setAttribute('aria-pressed', 'true'); $('tab-probes').setAttribute('aria-pressed', 'false');
    }
  };
  async function api(path, method = 'GET', data) {
    const response = await fetch('/api/admin/' + path, {
      method, credentials: 'same-origin', cache: 'no-store',
      headers: data === undefined ? {} : { 'Content-Type': 'application/json' },
      body: data === undefined ? undefined : JSON.stringify(data),
      signal: AbortSignal.timeout(10000)
    });
    const payload = await response.json();
    if (!response.ok) {
      if (response.status === 401 && authenticated) setLoggedIn(false);
      const error = new Error(payload.error || '操作未完成，請稍後再試');
      error.status = response.status; error.node = payload.node;
      throw error;
    }
    return payload;
  }
  const errorText = error => error.name === 'TimeoutError' ? '連線逾時；變更可能已儲存，請重新整理確認。' : error.message || '暫時無法連線，請稍後重試。';
  function filterRows() {
    const query = $('admin-search').value.trim().toLocaleLowerCase();
    let count = 0;
    for (const node of nodes) {
      const match = [node.name, node.original_name, node.id, node.region, node.provider].join(' ').toLocaleLowerCase().includes(query);
      rows.get(node.id).form.hidden = !match;
      if (match) count++;
    }
    $('admin-empty').hidden = count !== 0;
    $('admin-count').textContent = `顯示 ${count} / 全部 ${nodes.length} 個節點`;
    $('admin-total').textContent = nodes.length;
    $('admin-custom').textContent = nodes.filter(n => n.overridden).length;
  }
  function refreshRow(row, node, keepDraft = false) {
    row.node = node;
    row.form.querySelector('.current-name').textContent = node.name;
    row.form.querySelector('.node-location').textContent = [node.region, node.provider].filter(Boolean).join(' · ');
    row.form.querySelector('.node-id').textContent = node.id;
    row.form.querySelector('.original-name').textContent = '初始名稱：' + node.original_name;
    const status = row.form.querySelector('.admin-node-status');
    status.textContent = node.online ? '在線' : node.last_seen ? '離線' : '待接入';
    status.classList.toggle('online', node.online);
    row.input.setAttribute('aria-label', node.name + '的公開顯示名稱');
    if (!keepDraft) row.input.value = node.name;
    row.save.disabled = !row.input.value.trim() || row.input.value.trim() === node.name;
    row.reset.disabled = !node.overridden;
  }
  async function saveRow(row, reset) {
    const name = reset ? '' : row.input.value.trim();
    if (!reset && !name) { row.input.focus(); return; }
    row.save.disabled = row.reset.disabled = true;
    row.input.disabled = true;
    row.message.classList.remove('error');
    row.message.textContent = '儲存中…';
    try {
      const result = await api('nodes/' + encodeURIComponent(row.node.id), 'PATCH', {name, expected_name: row.node.name});
      nodes = nodes.map(n => n.id === result.node.id ? result.node : n);
      refreshRow(row, result.node);
      row.message.textContent = reset ? '已恢復初始名稱，公開頁已同步。' : '已儲存，公開頁已同步。';
      filterRows();
    } catch (error) {
      if (error.node) {
        nodes = nodes.map(n => n.id === error.node.id ? error.node : n);
        refreshRow(row, error.node, true);
      }
      row.message.textContent = errorText(error);
      row.message.classList.add('error');
      if (error.status === 401) notice('登入已到期，請重新登入。', true);
    } finally {
      row.input.disabled = false;
      row.save.disabled = !row.input.value.trim() || row.input.value.trim() === row.node.name;
      row.reset.disabled = !row.node.overridden;
    }
  }
  async function loadNodes() {
    const result = await api('nodes');
    nodes = result.nodes;
    const fragment = document.createDocumentFragment();
    for (const node of nodes) {
      let row = rows.get(node.id);
      if (!row) {
        const form = $('admin-node-template').content.firstElementChild.cloneNode(true);
        row = {form, input: form.querySelector('.name-input'), save: form.querySelector('.save-name'), reset: form.querySelector('.reset-name'), message: form.querySelector('.row-message'), node};
        form.dataset.nodeId = node.id;
        form.addEventListener('submit', event => { event.preventDefault(); saveRow(row, false); });
        row.reset.addEventListener('click', () => saveRow(row, true));
        row.input.addEventListener('input', () => { row.save.disabled = !row.input.value.trim() || row.input.value.trim() === row.node.name; row.message.textContent = ''; });
        rows.set(node.id, row);
      }
      // Explicit refresh preserves edits the user has not yet saved.
      const dirty = row.input.value && row.input.value.trim() !== row.node.name;
      refreshRow(row, node, Boolean(dirty));
      fragment.append(row.form);
    }
    $('admin-nodes').replaceChildren(fragment);
    filterRows();
  }
  $('login-form').addEventListener('submit', async event => {
    event.preventDefault(); $('login-button').disabled = true; notice('');
    try {
      await api('login', 'POST', {password: $('password').value});
      $('password').value = ''; setLoggedIn(true); rows.clear();
      await loadNodes();
    } catch (error) { notice(errorText(error), true); }
    finally { $('login-button').disabled = false; }
  });
  $('show-password').addEventListener('click', () => {
    const show = $('password').type === 'password';
    $('password').type = show ? 'text' : 'password';
    $('show-password').textContent = show ? '隱藏' : '顯示';
    $('show-password').setAttribute('aria-pressed', String(show));
    $('show-password').setAttribute('aria-label', show ? '隱藏管理密碼' : '顯示管理密碼');
  });
  $('logout').addEventListener('click', async () => {
    $('logout').disabled = true;
    try { await api('logout', 'POST', {}); setLoggedIn(false); nodes = []; rows.clear(); $('admin-nodes').replaceChildren(); notice('已登出管理頁。'); }
    catch (error) { notice(errorText(error), true); }
    finally { $('logout').disabled = false; }
  });
  $('refresh-nodes').addEventListener('click', async () => {
    $('refresh-nodes').disabled = true;
    try { await loadNodes(); notice('已取得最新名稱；尚未儲存的輸入已保留。'); }
    catch (error) { notice(errorText(error), true); }
    finally { $('refresh-nodes').disabled = false; }
  });
  $('admin-search').addEventListener('input', filterRows);
  for (const panel of ['names', 'probes']) $('tab-' + panel).addEventListener('click', async () => {
    for (const name of ['names', 'probes']) { $(name + '-panel').hidden = name !== panel; $('tab-' + name).setAttribute('aria-pressed', String(name === panel)); }
    if (panel === 'probes' && !probeConfig) { try { await loadProbes(); } catch (error) { notice(errorText(error), true); } }
  });
  async function loadProbes() {
    probeConfig = await api('probes'); probeDirty = false;
    const fragment = document.createDocumentFragment();
    for (const [region, regionLabel] of [['sh', '上海 · 主要'], ['ah', '安徽 · 輔助']]) {
      const fieldset = document.createElement('fieldset'), legend = document.createElement('legend');
      legend.textContent = regionLabel; fieldset.append(legend);
      for (const [carrier, label] of [['ct', '電信'], ['cu', '聯通'], ['cm', '移動']]) {
        const id = region + '-' + carrier, target = probeConfig.targets.find(t => t.id === id);
        const row = document.createElement('div'), title = document.createElement('label'), toggle = document.createElement('input'), toggleLabel = document.createElement('label'), input = document.createElement('input');
        row.className = 'probe-target'; row.dataset.target = id;
        title.textContent = label; title.htmlFor = 'target-' + id;
        input.id = 'target-' + id; input.className = 'target-address'; input.value = target?.address || ''; input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.maxLength = 45; input.placeholder = '固定公網 IP'; input.setAttribute('aria-label', regionLabel + label + '探測目標');
        toggle.type = 'checkbox'; toggle.className = 'target-enabled'; toggle.checked = !!target?.enabled; toggleLabel.className = 'target-toggle'; toggleLabel.append(toggle, document.createTextNode('啟用'));
        row.append(title, input, toggleLabel); fieldset.append(row);
      }
      fragment.append(fieldset);
    }
    $('probe-targets').replaceChildren(fragment); $('save-probes').disabled = true;
    $('probe-save-status').textContent = '已載入目前設定。';
  }
  $('probe-targets').addEventListener('input', () => { probeDirty = true; $('save-probes').disabled = false; $('probe-save-status').textContent = '有尚未儲存的變更。'; });
  $('reload-probes').addEventListener('click', async () => {
    $('reload-probes').disabled = true;
    try { await loadProbes(); notice('已重新載入探測設定。'); } catch (error) { notice(errorText(error), true); }
    finally { $('reload-probes').disabled = false; }
  });
  $('probes-form').addEventListener('submit', async event => {
    event.preventDefault(); if (!probeConfig) return;
    $('save-probes').disabled = $('reload-probes').disabled = true;
    const targets = [...document.querySelectorAll('.probe-target')].map(row => ({id: row.dataset.target, address: row.querySelector('.target-address').value.trim(), enabled: row.querySelector('.target-enabled').checked}));
    for (const input of $('probe-targets').querySelectorAll('input')) input.disabled = true;
    try {
      probeConfig = await api('probes', 'PUT', {revision: probeConfig.revision, targets}); probeDirty = false;
      $('probe-save-status').textContent = '已儲存。Agent 將在約 30 秒內取用新設定；公開測試結果重新累計。'; notice('');
    } catch (error) { notice(errorText(error), true); }
    finally {
      $('save-probes').disabled = !probeDirty; $('reload-probes').disabled = false;
      for (const input of $('probe-targets').querySelectorAll('input')) input.disabled = false;
    }
  });
  window.addEventListener('beforeunload', event => {
    if (authenticated && (probeDirty || [...rows.values()].some(row => row.input.value.trim() !== row.node.name))) { event.preventDefault(); event.returnValue = ''; }
  });
  (async () => {
    try { await api('session'); setLoggedIn(true); await loadNodes(); }
    catch (error) { setLoggedIn(false); if (error.status !== 401) notice(errorText(error), true); }
  })();
})();
