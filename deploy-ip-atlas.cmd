@echo off
setlocal EnableExtensions
cd /d "%~dp0"
if not exist "ip-atlas\index.html" goto layout
if not exist "atlas-stock-monitor\install.mjs" goto layout
if exist "C:\workspace\pitopone-node-v24\node-v24.22.3-win-arm64\npx.cmd" (
  set "PATH=C:\workspace\pitopone-node-v24\node-v24.22.3-win-arm64;%PATH%"
  set "npm_config_cache=C:\workspace\pitopone-node-v24\npm-cache"
)
where npx.cmd >nul 2>nul
if errorlevel 1 goto node_missing
node -e "process.exit(((p)=>p[0]>22||(p[0]===22&&p[1]>=12))(process.versions.node.split('.').map(Number))?0:1)"
if errorlevel 1 goto node_missing
if /i "%~1"=="monitor" goto monitor
echo [1/2] Publishing the website to pitopone-ip-atlas ^(production, main^) ...
call npx.cmd --yes wrangler@4 pages deploy ip-atlas --project-name pitopone-ip-atlas --branch main
if errorlevel 1 goto pages_failed
:monitor
echo [2/2] Updating pitopone-stock-watch and its existing D1 history ...
node atlas-stock-monitor\install.mjs
if errorlevel 1 goto monitor_failed
echo Deployment complete. Open https://ip-guide.pitopone.com/
echo Collection status: https://ip-guide.pitopone.com/api/stock-history/health
pause
exit /b 0
:layout
echo Run deploy-ip-atlas.cmd from the repository root with the ip-atlas and atlas-stock-monitor folders beside it.
goto failed
:node_missing
echo Node.js 22.12 or newer with npm and npx is required. Open a terminal with Node on PATH.
goto failed
:pages_failed
echo Website upload failed. Check the Wrangler message above. For an expired login, run: npx --yes wrangler@4 login
goto failed
:monitor_failed
echo Monitor update failed. Keep the website deployment. After correcting the error, run: deploy-ip-atlas.cmd monitor
:failed
pause
exit /b 1
