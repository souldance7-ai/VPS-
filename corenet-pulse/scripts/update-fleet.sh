#!/usr/bin/env bash
# Update the Hub, then register the selected public-label manifest.
set -Eeuo pipefail
umask 077
[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo '請以 root 執行' >&2; exit 1; }
: "${PULSE_HUB_URL:?請設定公開的 PULSE_HUB_URL}"
: "${PULSE_FLEET_FILE:?請設定本機節點清單 JSON 路徑 PULSE_FLEET_FILE}"
[[ -f "$PULSE_FLEET_FILE" ]] || { echo '找不到本機節點清單' >&2; exit 1; }
PULSE_REF="${PULSE_REF:-main}"
[[ "$PULSE_REF" =~ ^(main|[0-9a-f]{40})$ ]] || { echo 'PULSE_REF 格式錯誤' >&2; exit 1; }
PULSE_WORK="$(mktemp -d)"
trap 'rm -rf -- "$PULSE_WORK"' EXIT
cp -- "$PULSE_FLEET_FILE" "$PULSE_WORK/fleet.json"
PULSE_BASE="https://raw.githubusercontent.com/souldance7-ai/VPS-/${PULSE_REF}/corenet-pulse"
for PULSE_SCRIPT in update-hub.sh import-nodes.py agent-commands.py; do
  curl -fsSL --retry 3 "$PULSE_BASE/scripts/$PULSE_SCRIPT" -o "$PULSE_WORK/$PULSE_SCRIPT"
done
if [[ "${PULSE_ENABLE_ADMIN:-0}" == 1 ]]; then
  curl -fsSL --retry 3 "$PULSE_BASE/scripts/setup-admin.sh" -o "$PULSE_WORK/setup-admin.sh"
fi
export PULSE_REF
bash "$PULSE_WORK/update-hub.sh"
python3 "$PULSE_WORK/import-nodes.py" --manifest "$PULSE_WORK/fleet.json" --restart
printf '\n請把以下各段指令貼到對應的實際主機執行。中轉路線請選擇要監控的出口主機。\n\n'
python3 "$PULSE_WORK/agent-commands.py" --manifest "$PULSE_WORK/fleet.json" --hub-url "$PULSE_HUB_URL"
if [[ "${PULSE_ENABLE_ADMIN:-0}" == 1 ]]; then
  bash "$PULSE_WORK/setup-admin.sh"
fi
