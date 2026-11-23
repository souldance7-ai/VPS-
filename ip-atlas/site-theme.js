(() => {
  const key = 'pitopone-theme';
  const modes = ['system', 'light', 'dark'];
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const meta = document.querySelector('meta[name="theme-color"]');
  const darkChrome = meta?.content;
  const names = {
    sc: ['外观主题', '跟随系统', '浅色', '深色'],
    tc: ['外觀主題', '跟隨系統', '淺色', '深色'],
    en: ['Appearance', 'System', 'Light', 'Dark'],
    ja: ['表示テーマ', 'システム', 'ライト', 'ダーク']
  };
  const localeFor = {
    'zh-cn': 'sc', 'zh-hans': 'sc', 'zh-tw': 'tc', 'zh-hant': 'tc', en: 'en', ja: 'ja'
  };
  let control;

  function storedMode() {
    try {
      const saved = localStorage.getItem(key);
      if (modes.includes(saved)) return saved;
    } catch {
      // The current page still supports choosing a theme when storage is disabled.
    }
    return 'system';
  }

  let mode = storedMode();

  function apply() {
    const theme = mode === 'system' ? (system.matches ? 'dark' : 'light') : mode;
    if (root.dataset.theme === theme && root.dataset.themeMode === mode) return;
    root.dataset.theme = theme;
    root.dataset.themeMode = mode;
    if (control) control.value = mode;
    if (meta) meta.content = theme === 'light' ? '#f5f6fc' : darkChrome;
    document.dispatchEvent(new CustomEvent('themechange', {detail: {theme, mode}}));
  }

  function label() {
    const [caption, ...options] = names[localeFor[root.lang.toLowerCase()] || 'en'];
    control.setAttribute('aria-label', caption);
    control.title = caption;
    for (const [index, option] of Array.from(control.options).entries()) {
      option.textContent = options[index];
    }
  }

  apply();
  if (system.addEventListener) system.addEventListener('change', apply);
  else system.addListener?.(apply);
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    mode = storedMode();
    apply();
  });

  document.addEventListener('DOMContentLoaded', () => {
    control = document.getElementById('site-theme');
    if (!control) return;
    label();
    control.value = mode;
    control.closest('.site-theme').hidden = false;
    new MutationObserver(label).observe(root, {attributes: true, attributeFilter: ['lang']});
    control.addEventListener('change', () => {
      if (!modes.includes(control.value)) return;
      mode = control.value;
      try { localStorage.setItem(key, mode); } catch { /* The current page can still apply the choice. */ }
      apply();
    });
  }, {once: true});
})();
