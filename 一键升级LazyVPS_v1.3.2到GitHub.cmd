@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ============================================================
echo LazyVPS v1.3.2 AnyTLS/TUIC 主菜单集成 - GitHub 同步脚本
echo ============================================================
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo [错误] 找不到 git，请先安装 Git for Windows。
  pause
  exit /b 1
)

where bash >nul 2>nul
if errorlevel 1 (
  echo [错误] 找不到 bash，请先安装 Git for Windows，并确认 Git Bash 在 PATH。
  pause
  exit /b 1
)

if not exist lazy-vps-menu.sh (
  echo [错误] 当前目录找不到 lazy-vps-menu.sh。
  echo 请先 cd 到 VPS- 仓库根目录，再把 v1.3.2 文件复制进来。
  pause
  exit /b 1
)

if not exist patch-main-menu-v1.3.2.sh (
  echo [错误] 当前目录找不到 patch-main-menu-v1.3.2.sh。
  pause
  exit /b 1
)

if not exist lazy-vps-protocol-addon.sh (
  echo [错误] 当前目录找不到 lazy-vps-protocol-addon.sh。
  pause
  exit /b 1
)

echo [1/4] Patch 主菜单...
bash patch-main-menu-v1.3.2.sh
if errorlevel 1 (
  echo [错误] Patch 失败。
  pause
  exit /b 1
)

echo [2/4] 检查关键字...
bash -lc "grep -nE 'v1.3.2|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -30"
if errorlevel 1 (
  echo [错误] 关键字检查失败。
  pause
  exit /b 1
)

echo [3/4] Git add / commit...
git add lazy-vps-menu.sh lazy-vps-protocol-addon.sh patch-main-menu-v1.3.2.sh README.md QUICK_START.md CHANGELOG.md GITHUB_UPLOAD_LIST.md SECURITY_SHARE_CHECK.txt docs protocols templates

git commit -m "feat: integrate AnyTLS and TUIC into LazyVPS main menu"
if errorlevel 1 (
  echo [提醒] commit 没有成功，可能是没有变更或需要先设置 git user。
)

echo [4/4] Git push...
git push
if errorlevel 1 (
  echo [错误] push 失败，请检查 GitHub 权限或远程仓库。
  pause
  exit /b 1
)

echo.
echo [完成] 已推送。请到 VPS 执行：
echo bash ^<^(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh^)
echo.
pause
