'use strict';

(() => {
  const field = document.getElementById('network');
  if (!field) return;
  const connection = {asn: null, organization: '', label: ''};
  let loading = true;

  const language = () => ({'zh-Hans':'sc','zh-CN':'sc','zh-Hant':'tc','zh-TW':'tc',en:'en',ja:'ja'})[document.documentElement.lang] || 'sc';
  const messages = {
    loading: {sc:'检测中', tc:'檢測中', en:'Checking', ja:'確認中'},
    missing: {sc:'暂未取得 ASN', tc:'暫未取得 ASN', en:'ASN unavailable', ja:'ASN を取得できませんでした'}
  };

  function paint() {
    field.dataset.network = connection.label;
    field.textContent = connection.label || messages[loading ? 'loading' : 'missing'][language()];
  }

  async function readNetwork() {
    try {
      const response = await fetch('/speed/api/connection', {
        credentials:'omit', cache:'no-store', signal:AbortSignal.timeout(6000), headers:{Accept:'application/json'}
      });
      if (!response.ok) return;
      const info = await response.json();
      connection.asn = Number.isInteger(info?.asn) && info.asn > 0 && info.asn <= 0xffffffff ? info.asn : null;
      connection.organization = typeof info?.organization === 'string' ? info.organization.trim() : '';
      connection.label = [connection.asn ? `AS${connection.asn}` : '', connection.organization].filter(Boolean).join(' · ');
    } catch {
      // An unavailable lookup should not interrupt measurement or export.
    } finally {
      loading = false;
      paint();
      document.dispatchEvent(new CustomEvent('speed:network', {detail:{...connection}}));
    }
  }

  document.addEventListener('speed:locale', paint);
  paint();
  void readNetwork();
})();
