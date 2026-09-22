#!/usr/bin/env bash
# Register a private manifest without rebuilding the running Hub.
set -Eeuo pipefail
umask 077
[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo '請在 Hub 主機以 root 執行' >&2; exit 1; }
: "${PULSE_HUB_URL:?請設定探針的完整 HTTPS 網址 PULSE_HUB_URL}"
PULSE_REF="${PULSE_REF:-main}"
[[ "$PULSE_REF" =~ ^(main|[0-9a-f]{40})$ ]] || { echo 'PULSE_REF 須為 main 或完整 commit SHA' >&2; exit 1; }
[[ -s /etc/corenet-pulse/hub.json && -f /etc/corenet-pulse/hub.env ]] || { echo '找不到既有 Hub 設定，請在 Hub 主機執行' >&2; exit 1; }
for PULSE_COMMAND in curl python3 systemctl flock; do
  command -v "$PULSE_COMMAND" >/dev/null || { echo "缺少必要工具：$PULSE_COMMAND" >&2; exit 1; }
done
python3 - "$PULSE_HUB_URL" <<'PY'
import ipaddress, re, sys
from urllib.parse import urlsplit
url = sys.argv[1].rstrip('/')
if not re.fullmatch(r'https://[A-Za-z0-9.-]+(?::[0-9]+)?', url):
    raise SystemExit('PULSE_HUB_URL 須為 HTTPS 域名，不含路徑、查詢或帳密')
parsed = urlsplit(url)
try:
    ipaddress.ip_address(parsed.hostname)
except ValueError:
    pass
else:
    raise SystemExit('請使用探針公開域名，不填來源 IP')
if parsed.port is not None and not 1 <= parsed.port <= 65535:
    raise SystemExit('HTTPS 連接埠不正確')
PY
exec 9>/run/lock/corenet-pulse-update.lock
flock -n 9 || { echo '另一個 Hub 維護程序正在執行' >&2; exit 1; }
PULSE_WORK="$(mktemp -d)"
trap 'rm -rf -- "$PULSE_WORK"' EXIT
if [[ $# -gt 0 ]]; then
  cp -- "$1" "$PULSE_WORK/nodes.json"
else
  [[ ! -t 0 ]] || { echo '請用標準輸入提供節點 JSON，或傳入清單檔案路徑' >&2; exit 1; }
  cat >"$PULSE_WORK/nodes.json"
fi
# Fetch both dependencies before changing any Hub configuration.
for PULSE_SCRIPT in import-nodes.py agent-commands.py; do
  curl --http1.1 -fsSL --retry 3 --connect-timeout 15 --max-time 120 \
    "https://raw.githubusercontent.com/souldance7-ai/VPS-/$PULSE_REF/corenet-pulse/scripts/$PULSE_SCRIPT" \
    -o "$PULSE_WORK/$PULSE_SCRIPT"
done
python3 "$PULSE_WORK/import-nodes.py" --manifest "$PULSE_WORK/nodes.json" --restart
python3 "$PULSE_WORK/agent-commands.py" --manifest "$PULSE_WORK/nodes.json" --hub-url "$PULSE_HUB_URL" --ref "$PULSE_REF"
