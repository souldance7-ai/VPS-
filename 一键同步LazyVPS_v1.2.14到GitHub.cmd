@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo LazyVPS v1.2.14 同步到 GitHub 仓库
set DEFAULT_REPO=%USERPROFILE%\Desktop\VPS-
set DEFAULT_SRC=%USERPROFILE%\Downloads\LazyVPS_Quick_Menu_Pack_v1.2.14_开源图文定版

set /p REPO=请输入本地 GitHub 仓库路径 [默认: %DEFAULT_REPO%]: 
if "%REPO%"=="" set REPO=%DEFAULT_REPO%

set /p SRC=请输入 v1.2.14 文件夹路径 [默认: %DEFAULT_SRC%]: 
if "%SRC%"=="" set SRC=%DEFAULT_SRC%

if not exist "%REPO%\.git" (
  echo [错误] 未找到 Git 仓库：%REPO%
  pause
  exit /b 1
)

if not exist "%SRC%\lazy-vps-menu.sh" (
  echo [错误] 未找到脚本：%SRC%\lazy-vps-menu.sh
  pause
  exit /b 1
)

cd /d "%REPO%"
copy "%SRC%\lazy-vps-menu.sh" ".\lazy-vps-menu.sh" /Y
copy "%SRC%\README.md" ".\README.md" /Y
copy "%SRC%\CHANGELOG.md" ".\CHANGELOG.md" /Y
copy "%SRC%\QUICK_START.md" ".\QUICK_START.md" /Y
copy "%SRC%\IPV6_REALITY_443_GUIDE.md" ".\IPV6_REALITY_443_GUIDE.md" /Y
copy "%SRC%\AI_SERVICE_ROUTING.md" ".\AI_SERVICE_ROUTING.md" /Y
copy "%SRC%\MEDIA_DNS_UNLOCK.md" ".\MEDIA_DNS_UNLOCK.md" /Y
copy "%SRC%\AIRPORT_CHAIN_UNLOCK.md" ".\AIRPORT_CHAIN_UNLOCK.md" /Y
copy "%SRC%\TROUBLESHOOTING.md" ".\TROUBLESHOOTING.md" /Y
copy "%SRC%\SECURITY_SHARE_CHECK.txt" ".\SECURITY_SHARE_CHECK.txt" /Y
copy "%SRC%\SCAN_REPORT.txt" ".\SCAN_REPORT.txt" /Y

if not exist ".\docs\images" mkdir ".\docs\images"
xcopy "%SRC%\docs\images" ".\docs\images" /E /I /Y

git status
git add lazy-vps-menu.sh README.md CHANGELOG.md QUICK_START.md IPV6_REALITY_443_GUIDE.md AI_SERVICE_ROUTING.md MEDIA_DNS_UNLOCK.md AIRPORT_CHAIN_UNLOCK.md TROUBLESHOOTING.md SECURITY_SHARE_CHECK.txt SCAN_REPORT.txt docs/images
git commit -m "release: LazyVPS v1.2.14 IPv6 Reality 443 open source docs"
git push origin main

if errorlevel 1 (
  echo [提醒] main 推送失败，如果你的分支是 master，请手动执行：git push origin master
)

pause
