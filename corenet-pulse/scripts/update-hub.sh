#!/usr/bin/env bash
# Update the embedded dashboard without changing node configs, tokens or Tunnel.
set -Eeuo pipefail
umask 077
[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo '請以 root 執行' >&2; exit 1; }
for PULSE_COMMAND in curl tar python3 go systemctl flock; do
  command -v "$PULSE_COMMAND" >/dev/null || { echo "缺少必要工具：$PULSE_COMMAND" >&2; exit 1; }
done
[[ -s /etc/corenet-pulse/hub.json && -x /usr/local/bin/corenet-pulse-hub ]] || { echo '找不到既有 Hub 安裝' >&2; exit 1; }
PULSE_REF="${PULSE_REF:-main}"
[[ "$PULSE_REF" =~ ^(main|[0-9a-f]{40})$ ]] || { echo 'PULSE_REF 須為 main 或完整 commit SHA' >&2; exit 1; }
PULSE_GO_VERSION="$(go version)"
[[ "$PULSE_GO_VERSION" =~ go([0-9]+)\.([0-9]+) ]] && (( BASH_REMATCH[1] > 1 || (BASH_REMATCH[1] == 1 && BASH_REMATCH[2] >= 22) )) || { echo '更新需要 Go 1.22 或更新版本' >&2; exit 1; }
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
echo '下載並建置海洋沙灘版 Hub…'
curl -fsSL --retry 3 "https://codeload.github.com/souldance7-ai/VPS-/tar.gz/${PULSE_REF}" -o "$PULSE_TMP/source.tar.gz"
mkdir "$PULSE_TMP/source"
tar -xzf "$PULSE_TMP/source.tar.gz" --strip-components=1 -C "$PULSE_TMP/source"
(
  cd "$PULSE_TMP/source/corenet-pulse"
  CGO_ENABLED=0 GOTOOLCHAIN=local go build -buildvcs=false -trimpath -ldflags='-s -w' -o "$PULSE_TMP/hub" ./cmd/hub
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
# Parse only successful responses and treat incomplete JSON as a retry.
pulse_hub_ready() {
  local health page
  systemctl is-active --quiet corenet-pulse-hub || return 1
  health="$(curl -fsS --max-time 2 "$PULSE_CHECK_URL/healthz" 2>/dev/null)" || return 1
  python3 -c '
import json, sys
try:
    state = json.load(sys.stdin)
except (ValueError, OSError):
    sys.exit(1)
sys.exit(0 if isinstance(state, dict) and state.get("status") == "ok" else 1)
' <<< "$health" || return 1
  page="$(curl -fsS --max-time 2 "$PULSE_CHECK_URL/" 2>/dev/null)" || return 1
  [[ "$page" == *coast-1* ]]
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
echo 'Hub 已更新為海洋沙灘版，健康檢查通過。'
echo '請以 Ctrl+F5 重新整理探針頁面。各節點會在數秒內重新回報。'
echo "上一版程式備份：$PULSE_BACKUP"
