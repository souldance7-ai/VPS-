#!/usr/bin/env bash
# LazyVPS v1.3.6 主入口替换脚本
# 用法：在 GitHub 仓库根目录执行：bash patch-replace-main-v1.3.6.sh
set -Eeuo pipefail

PKG_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
REPO_DIR="$(pwd)"
NEW_MAIN="$PKG_DIR/lazy-vps-menu-v1.3.6.sh"
MAIN="$REPO_DIR/lazy-vps-menu.sh"
LEGACY_ROOT="$REPO_DIR/lazy-vps-menu-legacy-v1.2.15.sh"
LEGACY_DIR="$REPO_DIR/legacy"
LEGACY_IN_DIR="$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.15.sh"

say(){ printf '\033[32m[信息]\033[0m %s\n' "$1"; }
warn(){ printf '\033[33m[警告]\033[0m %s\n' "$1"; }
err(){ printf '\033[31m[错误]\033[0m %s\n' "$1"; }

[[ -s "$NEW_MAIN" ]] || { err "找不到新版主入口：$NEW_MAIN"; exit 1; }
[[ -s "$MAIN" ]] || { err "当前目录找不到 lazy-vps-menu.sh。请先 cd 到 GitHub 仓库根目录。"; exit 1; }

mkdir -p "$LEGACY_DIR"

if grep -q 'Formal Version: v1.3.6' "$MAIN" 2>/dev/null; then
  warn "当前 lazy-vps-menu.sh 已经是 v1.3.6，跳过备份。"
else
  if [[ ! -s "$LEGACY_ROOT" ]]; then
    cp -f "$MAIN" "$LEGACY_ROOT"
    say "已备份原主脚本：lazy-vps-menu-legacy-v1.2.15.sh"
  else
    warn "根目录 legacy 已存在，未覆盖：lazy-vps-menu-legacy-v1.2.15.sh"
  fi
  if [[ ! -s "$LEGACY_IN_DIR" ]]; then
    cp -f "$MAIN" "$LEGACY_IN_DIR"
    say "已备份原主脚本：legacy/lazy-vps-menu-legacy-v1.2.15.sh"
  else
    warn "legacy 目录备份已存在，未覆盖。"
  fi
fi

cp -f "$NEW_MAIN" "$MAIN"
chmod +x "$MAIN" || true

# 同步 addon / protocols / templates / docs
for item in lazy-vps-protocol-addon.sh protocols templates docs QUICK_START.md README.md CHANGELOG.md FIX_NOW.md GITHUB_UPLOAD_LIST.md SECURITY_SHARE_CHECK.txt; do
  if [[ -e "$PKG_DIR/$item" ]]; then
    rm -rf "$REPO_DIR/$item"
    cp -a "$PKG_DIR/$item" "$REPO_DIR/$item"
  fi
done
chmod +x "$REPO_DIR/lazy-vps-protocol-addon.sh" "$REPO_DIR"/protocols/*.sh 2>/dev/null || true

say "已写入新版主入口：lazy-vps-menu.sh"
echo
printf '请确认下面必须看到 v1.3.6 / AnyTLS / TUIC：\n'
grep -nE 'v1\.3\.6|AnyTLS|TUIC|protocol_suite|Protocol Suite' "$MAIN" | head -60 || true
echo
printf 'Git 状态：\n'
git status --short 2>/dev/null || true
echo
say "如果看到 M lazy-vps-menu.sh，即可 git add / commit / push。"
