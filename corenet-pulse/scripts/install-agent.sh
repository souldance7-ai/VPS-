#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "請以 root 執行 / run as root" >&2
  exit 1
fi

: "${PULSE_HUB_URL:?請設定 PULSE_HUB_URL，例如 https://status.example.com}"
: "${PULSE_NODE_ID:?請設定 PULSE_NODE_ID}"
: "${PULSE_NODE_TOKEN:?請設定 PULSE_NODE_TOKEN}"
[[ "$PULSE_NODE_ID" =~ ^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$ ]] || { echo '節點 ID 格式不正確' >&2; exit 1; }
[[ "$PULSE_NODE_TOKEN" =~ ^[a-zA-Z0-9_-]{20,256}$ ]] || { echo 'Token 須為 20–256 字元英數字、底線或連字號' >&2; exit 1; }
[[ "$PULSE_HUB_URL" =~ ^https://[a-zA-Z0-9.-]+(:[0-9]+)?/?$ || "$PULSE_HUB_URL" =~ ^http://(127\.0\.0\.1|localhost)(:[0-9]+)?/?$ ]] || { echo 'Hub URL 須為 HTTPS 域名，或本機 HTTP 位址' >&2; exit 1; }
[[ "${PULSE_INTERVAL:-3}" =~ ^[0-9]{1,5}$ ]] && (( 10#${PULSE_INTERVAL:-3} >= 2 && 10#${PULSE_INTERVAL:-3} <= 86400 )) || { echo '回報間隔須為 2–86400 秒的整數' >&2; exit 1; }
PULSE_INTERVAL=$((10#${PULSE_INTERVAL:-3}))
command -v systemctl >/dev/null 2>&1 || { echo '本安裝器需要 systemd' >&2; exit 1; }

PULSE_REPO="${PULSE_REPO:-souldance7-ai/VPS-}"
PULSE_PROJECT_PATH="${PULSE_PROJECT_PATH:-corenet-pulse}"
PULSE_VERSION="${PULSE_VERSION:-latest}"
PULSE_ARCH="$(uname -m)"
case "$PULSE_ARCH" in
  x86_64|amd64) PULSE_ARCH=amd64 ;;
  aarch64|arm64) PULSE_ARCH=arm64 ;;
  *) echo "不支援架構: $PULSE_ARCH" >&2; exit 1 ;;
esac

export DEBIAN_FRONTEND=noninteractive
PULSE_PACKAGES=()
for PULSE_DEPENDENCY in curl python3 tar gzip; do
  command -v "$PULSE_DEPENDENCY" >/dev/null 2>&1 || PULSE_PACKAGES+=("$PULSE_DEPENDENCY")
done
if (( ${#PULSE_PACKAGES[@]} )); then
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update
    apt-get install -y --no-install-recommends ca-certificates "${PULSE_PACKAGES[@]}"
  elif command -v dnf >/dev/null 2>&1; then
    dnf install -y ca-certificates "${PULSE_PACKAGES[@]}"
  elif command -v yum >/dev/null 2>&1; then
    yum install -y ca-certificates "${PULSE_PACKAGES[@]}"
  else
    echo "請先安裝：${PULSE_PACKAGES[*]}" >&2
    exit 1
  fi
fi

if [[ "$PULSE_VERSION" == latest ]]; then
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/latest/download/corenet-pulse-agent-linux-${PULSE_ARCH}"
else
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/download/${PULSE_VERSION}/corenet-pulse-agent-linux-${PULSE_ARCH}"
fi

install_agent_binary() (
  local temp_dir temp_binary source_url go_binary go_current go_filename go_sha
  temp_dir="$(mktemp -d)"
  temp_binary="${temp_dir}/corenet-pulse-agent"
  trap 'rm -rf -- "$temp_dir"' EXIT

  if curl -fL --retry 3 "$PULSE_DOWNLOAD" -o "$temp_binary"; then
    install -m 0755 "$temp_binary" /usr/local/bin/corenet-pulse-agent
    return
  fi

  if [[ "$PULSE_VERSION" != latest ]]; then
    echo '指定的 Release 下載失敗，停止安裝。' >&2
    exit 1
  fi
  echo "Release 下載不可用，改由 GitHub 原始碼建置…"
  go_binary="$(command -v go || true)"
  go_current="$(go version 2>/dev/null || true)"
  if [[ "$go_current" =~ go([0-9]+)\.([0-9]+) ]] && (( BASH_REMATCH[1] > 1 || (BASH_REMATCH[1] == 1 && BASH_REMATCH[2] >= 22) )); then
    echo '使用現有 Go 工具鏈。'
  else
    echo '下載 Go 官方工具鏈並驗證 SHA-256（只用於本次建置）…'
    curl -fsSL --retry 3 'https://go.dev/dl/?mode=json' -o "$temp_dir/go-releases.json"
    python3 - "$temp_dir/go-releases.json" "$PULSE_ARCH" >"$temp_dir/go-download.txt" <<'PY'
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
    read -r go_filename go_sha <"$temp_dir/go-download.txt"
    curl -fsSL --retry 3 "https://go.dev/dl/${go_filename}" -o "$temp_dir/go.tar.gz"
    printf '%s  %s\n' "$go_sha" "$temp_dir/go.tar.gz" | sha256sum -c -
    tar -xzf "$temp_dir/go.tar.gz" -C "$temp_dir"
    go_binary="$temp_dir/go/bin/go"
  fi
  source_url="https://codeload.github.com/${PULSE_REPO}/tar.gz/refs/heads/main"
  curl -fL --retry 3 "$source_url" -o "${temp_dir}/source.tar.gz"
  mkdir -p "${temp_dir}/source"
  tar -xzf "${temp_dir}/source.tar.gz" --strip-components=1 -C "${temp_dir}/source"
  (
    cd "${temp_dir}/source/${PULSE_PROJECT_PATH}"
    CGO_ENABLED=0 GOOS=linux GOARCH="$PULSE_ARCH" \
      GOTOOLCHAIN=local "$go_binary" build -buildvcs=false -trimpath -ldflags='-s -w' -o "$temp_binary" ./cmd/agent
  )
  install -m 0755 "$temp_binary" /usr/local/bin/corenet-pulse-agent
)

install -d -m 0750 /etc/corenet-pulse
install_agent_binary
cat >/etc/corenet-pulse/agent.env <<EOF
PULSE_HUB_URL=${PULSE_HUB_URL}
PULSE_NODE_ID=${PULSE_NODE_ID}
PULSE_NODE_TOKEN=${PULSE_NODE_TOKEN}
PULSE_INTERVAL=${PULSE_INTERVAL:-3}
EOF
chmod 0600 /etc/corenet-pulse/agent.env
curl -fL --retry 3 "https://raw.githubusercontent.com/${PULSE_REPO}/main/${PULSE_PROJECT_PATH}/deploy/systemd/corenet-pulse-agent.service" \
  -o /etc/systemd/system/corenet-pulse-agent.service
chmod 0644 /etc/systemd/system/corenet-pulse-agent.service
systemctl daemon-reload
systemctl enable corenet-pulse-agent
systemctl restart corenet-pulse-agent
systemctl is-active --quiet corenet-pulse-agent
echo "Agent 服務已啟動，節點：${PULSE_NODE_ID}；請在探針頁面確認 ONLINE。"
