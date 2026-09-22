# CORENET PULSE

CORENET 自用、可持續擴充的 VPS／VDS 即時探針。第一版預設建立 **AWS 日本**與**彰化中華電信**兩個節點，之後可用腳本繼續加入新 VPS。

![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat-square&logo=go&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-43f0c4?style=flat-square)
![Privacy](https://img.shields.io/badge/Public_API-Zero--IP-071011?style=flat-square)

## 與參考專案的差異

本專案參考了 [monitor-theme-serverstatus](https://github.com/monitor-probe/monitor-theme-serverstatus) 的「快速掌握多節點狀態」方向，但程式、資料模型與介面均為獨立實作：

- 海洋藍、淺沙色與白色的海岸介面，放大繁體中文與即時數值；
- 卡片／列表切換、搜尋、狀態／地區／服務商篩選、排序與 12／24／50／100 筆分頁；
- 超過 12 個節點預設採用列表，可切回卡片並保存瀏覽偏好；
- 單一靜態 Go Hub 與單一靜態 Go Agent，無資料庫、無前端建置鏈；
- SSE 更新通知合併為每 3 秒至多一次快照請求；連線中斷時每 15 秒自動重試；
- CPU、記憶體、磁碟、上下行速率、累計流量、負載與連線數；
- 明確的公開資料 allow-list，從結構上排除 IP、hostname 與 token；
- Hub 預設只監聽 `127.0.0.1:9800`，適合搭配 Cloudflare Tunnel 隱藏源站。

## 架構

```mermaid
flowchart LR
    A["AWS 日本 Agent"] -->|"HTTPS + Token"| H["CORENET Pulse Hub"]
    C["彰化中華電信 Agent"] -->|"HTTPS + Token"| H
    N["後續新增 VPS"] -->|"HTTPS + Token"| H
    H --> T["Cloudflare Tunnel"]
    T --> W["公開監控頁 / Zero-IP API"]
```

Agent 只主動向 Hub 回報；監控主機不需要開放 Agent 入站連接埠。Hub 不記錄來源 IP，也不將其寫入記憶體狀態或公開 JSON。

## 本機預覽

```bash
export AWS_JP_TOKEN='replace-with-at-least-20-characters'
export CHT_CHANGHUA_TOKEN='replace-with-at-least-20-characters'
export PULSE_CONFIG=configs/hub.example.json
go run ./cmd/hub
```

瀏覽 `http://127.0.0.1:9800`。未安裝 Agent 前兩個節點會顯示 `PENDING`，這是預期行為。

另一個終端可用本機暫代 AWS 日本做聯調：

```bash
PULSE_HUB_URL=http://127.0.0.1:9800 \
PULSE_NODE_ID=aws-jp-01 \
PULSE_NODE_TOKEN="$AWS_JP_TOKEN" \
go run ./cmd/agent
```

## 正式部署

### 1. 安裝 Hub

在 Hub 主機以 root 執行（一行完成；Token 會自動產生並只保存在主機）：

```bash
curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/corenet-pulse/scripts/install-hub.sh | bash
```

安裝程式會優先下載 Release；若 Release 尚未建立，會自動安裝 Go 並從公開原始碼建置。重複執行會沿用既有 Token，不會讓已部署的 Agent 失效。

### 2. 建立公開 HTTPS 網址（Cloudflare Tunnel）

網域須已由您的 Cloudflare 帳號管理。把下方 `status.example.com` 換成自己的探針域名，在 Hub 主機以 root 執行：

```bash
curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/corenet-pulse/scripts/install-tunnel.sh -o /tmp/corenet-pulse-tunnel.sh && \
  PULSE_HOSTNAME='status.example.com' bash /tmp/corenet-pulse-tunnel.sh
```

首次執行會顯示 Cloudflare 登入連結；在電腦瀏覽器開啟、選擇該網域並授權，終端便會自動繼續。腳本安裝官方套件、建立具名 Tunnel 與 CNAME、設定開機啟動，再檢查公開 HTTPS API。這一步需您登入自己的 Cloudflare 帳號，GitHub 授權不包含 Cloudflare。

Hub 保持監聽 `127.0.0.1:9800`。設定與 Tunnel 憑證存於 `/etc/corenet-pulse/tunnel/`；服務名稱是 `corenet-pulse-tunnel`，使用獨立設定，不覆寫其他 Tunnel 的服務或設定。遇到已有的衝突 DNS 記錄會停止，不強制覆蓋。請勿另外建立指向源站 IP 的探針 A／AAAA 記錄。

```bash
systemctl is-active corenet-pulse-tunnel
curl -fsS https://status.example.com/api/public/state
```

### 3. 安裝 AWS 日本 Agent

建議先在 **Hub 主機** 一次產生兩個節點的完整安裝指令；將網址替換成自己的公開探針域名：

```bash
curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/corenet-pulse/scripts/agent-commands.py -o /tmp/pulse-agent-commands.py && \
  python3 /tmp/pulse-agent-commands.py --hub-url https://status.example.com --node-id aws-jp-01 --node-id cht-changhua-01
```

它只讀取本機設定與 Token，不新增節點、不更換 Token，也不發送資料。輸出的兩段命令分別貼到對應的 AWS 日本、彰化中華電信主機以 root 執行。**輸出包含節點專用 Token，請勿貼到 GitHub 或公開頁面。**

Agent 安裝器支援 systemd 主機；需要時會從 Go 官方下載臨時建置工具並驗證 SHA-256，因此不依賴 Debian／Ubuntu 套件庫中的 Go 版本。服務啟動後，檢查公開頁面對應節點是否變成 ONLINE。

也可手動填入對應 Token 執行：

```bash
sudo env \
  PULSE_HUB_URL='https://status.example.com' \
  PULSE_NODE_ID='aws-jp-01' \
  PULSE_NODE_TOKEN="$AWS_JP_TOKEN" \
  bash scripts/install-agent.sh
```

### 4. 安裝彰化中華電信 Agent

```bash
sudo env \
  PULSE_HUB_URL='https://status.example.com' \
  PULSE_NODE_ID='cht-changhua-01' \
  PULSE_NODE_TOKEN="$CHT_CHANGHUA_TOKEN" \
  bash scripts/install-agent.sh
```

> 指令裡的 Hub URL 應是經 Tunnel／CDN 代理的域名，不能填源站 IP。

## 更新既有 Hub

在原本的 **Hub 主機** 以 root 執行（需要既有 Go 1.22+）：

```bash
curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/corenet-pulse/scripts/update-hub.sh -o /tmp/pulse-update-hub.sh && \
  bash /tmp/pulse-update-hub.sh
```

腳本從原始碼建置最新版、備份目前程式、原子替換 Hub 並重啟；若健康檢查失敗會恢復上一版。沿用原有節點設定、Token 與 Cloudflare Tunnel；兩台 Agent 不需重裝。Hub 重啟會清空記憶體中的短期圖表，各 Agent 會在下一次回報時重新顯示在線。完成後以 `Ctrl+F5` 重新整理網頁。

### 50–100 個節點的瀏覽方式

- 列表直接顯示在線狀態、CPU、已用／總記憶體及磁碟、上下行速率、累計流量與運行時間。
- 累計流量是自系統啟動以來的網卡計數，不是月流量額度或帳單用量。
- CPU 型號、作業系統／核心、1／5／15 分鐘負載、連線數與處理程序可展開查看。
- 刷新保留搜尋、篩選、當前頁與已展開資料；只更新目前顯示的節點。
- 列表請求 `?history=0` 省略歷史點，卡片請求 `?history=30`；不因節點同時回報而重複下載快照。
- 資料取得失敗或超過 30 秒未更新時，頁面明確標記為最後收到的狀態。

## 後續新增 VPS

### 批次新增節點

以 `configs/fleet.example.json` 為格式範例，在 Hub 本機建立自己的 `/root/pulse-nodes.json`。清單只填網站上要顯示的名稱與地區標籤，不放入 IP、Token 或協議密碼。

在既有 Hub 更新介面並批次登錄這份清單：

```bash
curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/corenet-pulse/scripts/update-fleet.sh -o /tmp/pulse-update-fleet.sh && \
  PULSE_HUB_URL=https://status.example.com PULSE_FLEET_FILE=/root/pulse-nodes.json bash /tmp/pulse-update-fleet.sh
```

替換成自己的公開域名與本機清單路徑。這個組合指令更新 Hub、為尚未登錄的 ID 產生獨立 Token，並輸出清單中各節點的 Agent 安裝指令。重複執行不重複新增，也不更換既有 Token。新增節點在 Agent 回報前顯示「待接入」，不產生示範數據。原本已接入的 Agent 不需重裝；本機清單不會上傳至 GitHub。

代理設定中的 `server` 可能是中轉入口，不能直接用來判定實際出口主機。請把對應 Agent 安裝在要監控的實際主機；協議的延遲測試不能取代主機資源回報。

自訂清單可用 `scripts/import-nodes.py --manifest my-nodes.json --restart` 匯入。JSON 的 `nodes` 陣列每筆接受 `id/name/region/country/provider/network/plan`；Token 一律由 Hub 產生。新增或批次匯入會保存設定原有的擁有者與讀取權限。

### 單獨新增節點

在 Hub 上新增一個節點：

```bash
sudo python3 scripts/add-node.py \
  --id jp-gateway-02 \
  --name 'JP Gateway 02' \
  --region 'Tokyo · JP' \
  --country JP \
  --provider 'Private VDS' \
  --network 'Tokyo Premium'

sudo systemctl restart corenet-pulse-hub
```

腳本會先備份設定，再輸出一次性的 `PULSE_NODE_ID` 與 `PULSE_NODE_TOKEN`。把它們填到新主機的 Agent 安裝命令即可。Token 只存 Hub 與對應 Agent，不進 GitHub。

## 公開 API

`GET /api/public/state` 只回傳：

- 公開節點名稱、國家／地區、服務商、線路標籤；
- OS、核心數、容量與即時利用率；
- 即時／累計流量與短期圖表資料；
- 在線狀態與最後回報時間。

它不包含 `ip`、`hostname`、`token`、HTTP peer address。測試 `TestPublicStateNeverLeaksSecretsOrPeerIP` 會在每次 CI 阻止這些欄位意外回歸。

## 建置與測試

```bash
make test
make build
```

產物位於 `bin/`。推送 `pulse-v*` tag 後，GitHub Actions 會建立 amd64／arm64 的 Hub 與 Agent Release。

## 授權

[MIT](LICENSE)。參考專案僅作產品方向研究，未複製其原始碼或視覺資產。
