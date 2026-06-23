@echo off
chcp 65001 >nul
echo [LazyVPS] 同步 v1.2.15 到当前 GitHub 仓库
if not exist .git (
  echo [错误] 当前目录不是 Git 仓库，请先 cd 到你的仓库目录。
  pause
  exit /b 1
)
copy /Y lazy-vps-menu.sh .\lazy-vps-menu.sh
copy /Y README.md .\README.md
copy /Y CHANGELOG.md .\CHANGELOG.md
copy /Y QUICK_START.md .\QUICK_START.md
copy /Y IPV6_REALITY_443_GUIDE.md .\IPV6_REALITY_443_GUIDE.md
copy /Y V4V6_SPLIT_GUIDE.md .\V4V6_SPLIT_GUIDE.md
copy /Y AI_SERVICE_ROUTING.md .\AI_SERVICE_ROUTING.md
copy /Y MEDIA_DNS_UNLOCK.md .\MEDIA_DNS_UNLOCK.md
copy /Y AIRPORT_CHAIN_UNLOCK.md .\AIRPORT_CHAIN_UNLOCK.md
copy /Y TROUBLESHOOTING.md .\TROUBLESHOOTING.md
copy /Y SECURITY_SHARE_CHECK.txt .\SECURITY_SHARE_CHECK.txt
copy /Y SCAN_REPORT.txt .\SCAN_REPORT.txt
xcopy /E /I /Y docs\images .\docs\images
git add .
git commit -m "Update LazyVPS v1.2.15 V4V6 split strategy"
git push
pause
