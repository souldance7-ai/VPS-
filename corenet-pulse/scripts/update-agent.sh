#!/usr/bin/env bash
# Run on each existing node. Its ID, token and complete env file are preserved.
set -Eeuo pipefail
umask 077
[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo '請以 root 執行' >&2; exit 1; }
PULSE_REF="${PULSE_REF:-main}"
[[ "$PULSE_REF" =~ ^(main|[0-9a-f]{40})$ ]] || { echo 'PULSE_REF 格式錯誤' >&2; exit 1; }
[[ -s /etc/corenet-pulse/agent.env ]] || { echo '此主機尚未安裝 Agent，請使用對應節點的安裝指令。' >&2; exit 1; }
PULSE_INSTALLER="$(mktemp)"
trap 'rm -f -- "$PULSE_INSTALLER"' EXIT
curl -fsSL --retry 3 "https://raw.githubusercontent.com/souldance7-ai/VPS-/${PULSE_REF}/corenet-pulse/scripts/install-agent.sh" -o "$PULSE_INSTALLER"
export PULSE_REF PULSE_UPGRADE_EXISTING=1
bash "$PULSE_INSTALLER"
