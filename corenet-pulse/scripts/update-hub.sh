#!/usr/bin/env bash
# Update the embedded dashboard without changing node configs, tokens or Tunnel.
set -Eeuo pipefail
umask 077
[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo '請以 root 執行' >&2; exit 1; }
for PULSE_COMMAND in curl tar python3 sha256sum systemctl flock; do
  command -v "$PULSE_COMMAND" >/dev/null || { echo "缺少必要工具：$PULSE_COMMAND" >&2; exit 1; }
done
[[ -s /etc/corenet-pulse/hub.json && -x /usr/local/bin/corenet-pulse-hub ]] || { echo '找不到既有 Hub 安裝' >&2; exit 1; }
PULSE_REF="${PULSE_REF:-main}"
[[ "$PULSE_REF" =~ ^(main|[0-9a-f]{40})$ ]] || { echo 'PULSE_REF 須為 main 或完整 commit SHA' >&2; exit 1; }
exec 9>/run/lock/corenet-pulse-update.lock
flock -n 9 || { echo '另一個 Hub 更新正在執行' >&2; exit 1; }
PULSE_CHECK_URL="$(python3 - <<'PY'
import json
from urllib.parse import urlsplit
with open('/etc/corenet-pulse/hub.json', encoding='utf-8') as f:
    config = json.load(f)
url = 'http://' + config.get('listen', '127.0.0.1:9800')
parsed = urlsplit(url)
if parsed.hostname not in ('127.0.0.1', 'localhost', '::1') or not parsed.port or parsed.path or parsed.query or parsed.fragment or parsed.username:
    raise SystemExit('Hub 必須只監聽本機 loopback 位址')
print(url)
PY
)"
PULSE_TMP="$(mktemp -d)"
PULSE_STAGED=""
PULSE_BACKUP=""
PULSE_SWAPPED=0
PULSE_SUCCESS=0
cleanup() {
  local result=$?
  trap - EXIT
  if [[ "$PULSE_SWAPPED" == 1 && "$PULSE_SUCCESS" != 1 ]]; then
    echo '新版未通過健康檢查，正在恢復上一版 Hub…' >&2
    if install -m 0755 "$PULSE_BACKUP" "$PULSE_STAGED" && mv -f -- "$PULSE_STAGED" /usr/local/bin/corenet-pulse-hub && systemctl restart corenet-pulse-hub; then
      echo '已恢復上一版；節點設定與 Token 保持原值。' >&2
    else
      echo "恢復未完成，原版備份位於：$PULSE_BACKUP" >&2
    fi
    result=1
  fi
  [[ -z "$PULSE_STAGED" ]] || rm -f -- "$PULSE_STAGED"
  rm -rf -- "$PULSE_TMP"
  exit "$result"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
PULSE_GO_BINARY="$(command -v go || true)"
PULSE_GO_VERSION="$(go version 2>/dev/null || true)"
if [[ "$PULSE_GO_VERSION" =~ go([0-9]+)\.([0-9]+) ]] && (( BASH_REMATCH[1] > 1 || (BASH_REMATCH[1] == 1 && BASH_REMATCH[2] >= 22) )); then
  echo '使用現有 Go 工具鏈。'
else
  case "$(uname -m)" in
    x86_64|amd64) PULSE_ARCH=amd64 ;;
    aarch64|arm64) PULSE_ARCH=arm64 ;;
    *) echo '找不到 Go 1.22+，且不支援此架構的自動工具鏈下載。' >&2; exit 1 ;;
  esac
  echo '下載 Go 官方工具鏈並驗證 SHA-256（只用於本次建置）…'
  curl -fsSL --retry 3 'https://go.dev/dl/?mode=json' -o "$PULSE_TMP/go-releases.json"
  python3 - "$PULSE_TMP/go-releases.json" "$PULSE_ARCH" >"$PULSE_TMP/go-download.txt" <<'PY'
import json, re, sys
with open(sys.argv[1], encoding='utf-8') as f:
    releases = json.load(f)
for release in releases:
    if not release.get('stable'):
        continue
    for item in release.get('files', []):
        if item.get('os') == 'linux' and item.get('arch') == sys.argv[2] and item.get('kind') == 'archive':
            name, digest = item['filename'], item['sha256']
            if not re.fullmatch(r'go[0-9]+\.[0-9]+\.[0-9]+\.linux-' + re.escape(sys.argv[2]) + r'\.tar\.gz', name) or not re.fullmatch(r'[0-9a-f]{64}', digest):
                raise SystemExit('Go 下載資訊格式不正確')
            print(name, digest)
            raise SystemExit(0)
raise SystemExit('找不到適合本機架構的 Go 官方工具鏈')
PY
  read -r PULSE_GO_FILE PULSE_GO_HASH <"$PULSE_TMP/go-download.txt"
  curl --http1.1 -fL --retry 8 --retry-delay 3 --retry-all-errors \
    --connect-timeout 15 --continue-at - "https://go.dev/dl/$PULSE_GO_FILE" -o "$PULSE_TMP/go.tar.gz"
  printf '%s  %s\n' "$PULSE_GO_HASH" "$PULSE_TMP/go.tar.gz" | sha256sum -c -
  tar -xzf "$PULSE_TMP/go.tar.gz" -C "$PULSE_TMP"
  PULSE_GO_BINARY="$PULSE_TMP/go/bin/go"
fi
echo '下載並建置機甲漫畫動態版 Hub…'
curl -fsSL --retry 3 "https://codeload.github.com/souldance7-ai/VPS-/tar.gz/${PULSE_REF}" -o "$PULSE_TMP/source.tar.gz"
mkdir "$PULSE_TMP/source"
tar -xzf "$PULSE_TMP/source.tar.gz" --strip-components=1 -C "$PULSE_TMP/source"
(
  cd "$PULSE_TMP/source/corenet-pulse"
  CGO_ENABLED=0 GOTOOLCHAIN=local "$PULSE_GO_BINARY" build -buildvcs=false -trimpath -ldflags='-s -w' -o "$PULSE_TMP/hub" ./cmd/hub
)
install -d -o root -g root -m 0700 /var/backups/corenet-pulse
PULSE_BACKUP="$(mktemp /var/backups/corenet-pulse/hub.XXXXXXXX)"
install -m 0700 /usr/local/bin/corenet-pulse-hub "$PULSE_BACKUP"
PULSE_STAGED="$(mktemp /usr/local/bin/.corenet-pulse-hub.XXXXXXXX)"
install -m 0755 "$PULSE_TMP/hub" "$PULSE_STAGED"
# Mark before swapping so an interruption immediately after rename rolls back.
PULSE_SWAPPED=1
mv -f -- "$PULSE_STAGED" /usr/local/bin/corenet-pulse-hub
systemctl restart corenet-pulse-hub
# A systemd process may be active before its HTTP listener is ready.
# Verify the actual built page/assets, so a UI version change cannot trigger
# a false rollback. Never log private configuration or response bodies.
pulse_hub_ready() {
  systemctl is-active --quiet corenet-pulse-hub || return 1
  python3 - "$PULSE_CHECK_URL" "$PULSE_TMP/source/corenet-pulse/internal/hub/static" <<'PY'
import hashlib, json, pathlib, sys
from html.parser import HTMLParser
from urllib.parse import urlsplit
from urllib.request import build_opener, ProxyHandler

base, static_root = sys.argv[1], pathlib.Path(sys.argv[2]).resolve()
opener = build_opener(ProxyHandler({}))

def get(path):
    with opener.open(base + path, timeout=3) as response:
        return response.read()

class Assets(HTMLParser):
    paths = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        raw = attrs.get('src') if tag in ('script', 'img', 'source') else attrs.get('href') if tag == 'link' else None
        for raw in (raw, attrs.get('data-motion-still')):
            if not raw:
                continue
            url = urlsplit(raw)
            if not url.scheme and not url.netloc and url.path:
                self.paths.add('/' + url.path.lstrip('/'))

try:
    if json.loads(get('/healthz')).get('status') != 'ok':
        sys.exit(1)
    with open('/etc/corenet-pulse/hub.json', encoding='utf-8') as f:
        configured_ids = {node['id'] for node in json.load(f).get('nodes', [])}
    state = json.loads(get('/api/public/state?history=0'))
    if {node['id'] for node in (state.get('nodes') or [])} != configured_ids:
        sys.exit(1)
    page = get('/')
    expected_page = (static_root / 'index.html').read_bytes()
    if page != expected_page:
        sys.exit(1)
    assets = Assets()
    assets.feed(expected_page.decode('utf-8'))
    for path in assets.paths:
        expected = (static_root / path.lstrip('/')).resolve()
        if static_root not in expected.parents:
            sys.exit(1)
        if hashlib.sha256(get(path)).digest() != hashlib.sha256(expected.read_bytes()).digest():
            sys.exit(1)
except (ValueError, OSError, KeyError, TypeError, AttributeError):
    sys.exit(1)
PY
}
for PULSE_ATTEMPT in {1..15}; do
  if pulse_hub_ready; then
    PULSE_SUCCESS=1
    break
  fi
  if [[ "$PULSE_ATTEMPT" == 1 ]]; then
    echo 'Hub 正在啟動，等待健康檢查…'
  fi
  sleep 1
done
[[ "$PULSE_SUCCESS" == 1 ]] || exit 1
echo 'Hub 已更新，公開 API、節點清單與新版頁面／靜態資產檢查通過。'
echo '請以 Ctrl+F5 重新整理探針頁面。各節點會在數秒內重新回報。'
echo "上一版程式備份：$PULSE_BACKUP"
