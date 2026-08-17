#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

bash -n "$ROOT_DIR/posteio-wizard.sh"
bash -n "$ROOT_DIR/install.sh"

output=$(bash "$ROOT_DIR/posteio-wizard.sh" --help)
grep -q "Poste.io 邮局全自动互动引导面板" <<<"$output"
grep -q -- "--check" <<<"$output"

version=$(bash "$ROOT_DIR/posteio-wizard.sh" --version)
[[ "$version" == "1.0.0" ]]

# 在子 Shell 中载入函数，不触发主菜单。
# shellcheck disable=SC1091
source "$ROOT_DIR/posteio-wizard.sh"

is_ipv4 "203.0.113.10"
! is_ipv4 "999.0.0.1"
is_domain "mail.example.com"
! is_domain "not_a_domain"
is_port "443"
! is_port "70000"
[[ "$(default_mail_domain mail.example.com)" == "example.com" ]]

if command -v shellcheck >/dev/null 2>&1; then
  shellcheck "$ROOT_DIR/posteio-wizard.sh" "$ROOT_DIR/install.sh" "$0"
else
  echo "提示：未安装 shellcheck，仅完成 Bash 语法和 CLI 冒烟测试。"
fi

echo "全部静态测试通过。"
