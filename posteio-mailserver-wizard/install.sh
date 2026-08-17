#!/usr/bin/env bash
set -Eeuo pipefail

RAW_BASE="https://raw.githubusercontent.com/souldance7-ai/VPS-/main/posteio-mailserver-wizard"
TARGET="/usr/local/sbin/posteio-wizard"

if (( EUID != 0 )); then
  echo "请使用 root 执行：curl -fsSL ${RAW_BASE}/install.sh | sudo bash" >&2
  exit 1
fi

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

echo "正在下载 Poste.io 邮局互动面板……"
curl -fsSL --proto '=https' --tlsv1.2 "${RAW_BASE}/posteio-wizard.sh" -o "$tmp"
bash -n "$tmp"
install -m 0755 "$tmp" "$TARGET"

echo "安装完成：${TARGET}"
echo "以后输入 posteio-wizard 即可打开面板。"

if [[ -t 0 ]]; then
  exec "$TARGET"
fi
