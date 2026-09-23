"use strict";

// Presentation preferences are deliberately client-side only: no language or
// theme choice is sent to the Hub, and no extra public API fields are needed.
(() => {
  const dictionaries = {
    "zh-Hant": {
      skip: "跳到節點列表", brandTagline: "每個節點，都在視線之內", connecting: "正在連線",
      displaySettings: "顯示設定", appearance: "色彩主題", language: "介面語言",
      themeMecha: "機甲白", themeCoast: "海岸青", themeMidnight: "夜航藍", themeSakura: "霓虹莓", themeAmber: "夕照金",
      langTraditional: "繁體中文", langSimplified: "简体中文", langEnglish: "English",
      heroTitle: "全域感知。<span>即刻掌控。</span>", heroSubtitle: "從東京到全球，讓每一段連線清楚可見。",
      onlineNodes: "在線節點", offlinePending: "離線／待接入", totalDownload: "總下載速率", totalUpload: "總上傳速率",
      averageCPU: "平均 CPU", averageMemory: "平均記憶體", waitingFirst: "等待第一筆資料", allOnlineTotal: "所有在線節點合計",
      onlineAverage: "在線節點平均使用率", retry: "重新整理", fleetOverview: "節點總覽", fleetSubtitle: "即時狀態、資源與流量，盡在眼前。",
      dataUpdated: "資料更新", searchPlaceholder: "搜尋名稱、地區、服務商、線路…", searchNodes: "搜尋節點",
      status: "狀態", region: "地區", provider: "服務商", sort: "排序", allStatus: "全部狀態", online: "在線", offline: "離線",
      pendingAccess: "待接入", busy: "高使用率 ≥ 90%", allRegions: "全部地區", allProviders: "全部服務商",
      defaultOrder: "預設順序", offlineFirst: "離線優先", nodeName: "節點名稱", cpuHigh: "CPU 由高到低",
      memoryHigh: "記憶體由高到低", trafficHigh: "即時流量由高到低", loadingNodes: "正在載入節點…", clearFilters: "清除篩選",
      viewMode: "顯示方式", cards: "卡片", list: "列表",
      probeExplainer: "三網延遲：上海為主，安徽於詳情查看。每約 30 秒測試 3 次，丟包統計最近 10 分鐘內的樣本；反映節點到區域參考目標的 ICMP 往返，無回應不代表主機離線。",
      receiving: "正在接收節點資料…", noMatches: "沒有符合條件的節點", tryFilters: "試試其他關鍵字，或清除篩選查看全部。",
      nodeRegion: "節點／地區", shanghaiPing: "上海三網 · Ping／丟包", memory: "記憶體", disk: "磁碟", liveTraffic: "即時流量",
      totalTraffic: "累計流量", runtimeReport: "運行／最後回報", nodeListScroll: "節點列表，可左右捲動", nodeListCaption: "節點資源、流量與上海三網延遲列表",
      perPage: "每頁", nodesUnit: "個節點", previous: "← 上一頁", next: "下一頁 →", footerTagline: "每一條連線，都在掌握之中。",
      privacyFooter: "公開資料不包含 IP、主機名稱或 Token", nodeAdmin: "節點管理", openSource: "開源專案 ↗",
      waitingAgent: "等待 Agent 接入", usage: "使用率", download: "下載", upload: "上傳", sinceBoot: "自系統啟動",
      shanghaiThree: "上海三網", pingLoss: "Ping／丟包", runtime: "運行 —", notReported: "尚未回報", details: "詳細資料 ↗",
      cpuModel: "CPU 型號", osArch: "作業系統／架構", load: "負載（1／5／15 分鐘）", connections: "TCP／UDP 連線",
      processes: "處理程序", trafficTotal: "下載／上傳累計", detailShort: "詳情", recentTrend: "近期下載與上傳速率趨勢",
      unclassified: "未分類", day: "天", hour: "小時", minute: "分鐘", secondsAgo: "{n} 秒前回報", minutesAgo: "{n} 分鐘前回報",
      durationAgo: "{duration}前回報", lastOnline: "最後在線", collapse: "收起", view: "查看", detailFor: "{action} {name} 的詳細資料", anhuiAux: "安徽三網 · 輔助參考",
      telecom: "電信", unicom: "聯通", mobile: "移動", probePending: "待測試", awaitingAgent: "待更新 Agent", disabled: "已停用",
      noResponse: "無回應", unavailable: "無法測試", staleData: "資料過期", lastTest: "最後測試 {time}", updateAgent: "請更新此節點的 Agent",
      waitingProbe: "等待探測結果", latestRound: "最近一輪：最低 {min} / 平均 {avg} / 最高 {max} ms", lossWindow: "最近 10 分鐘內收到 {received} / 送出 {sent}，丟包 {loss}%",
      noLossSample: "尚無丟包樣本", collapseData: "收起資料 ↙", showDetails: "詳細資料 ↗", reportWaiting: "等待 Agent 接入",
      dataNeedsUpdate: "資料待更新", nodesOnline: "{online}/{total} 在線", lastNodeState: "最後收到的節點狀態", noNodesYet: "尚未新增節點",
      allNodesHealthy: "所有節點運行正常", onlineRate: "在線率 {rate}%", breakdown: "{offline} 離線 · {pending} 待接入", regionsCount: "{n} 個地區",
      memorySpec: "{value} 記憶體", resourceTotalTitle: "已回報節點的資源規格合計，包含離線節點的最後資料", showing: "顯示 {from}–{to}，符合 {matched} / 全部 {total} 個節點",
      matchedZero: "符合 0 / 全部 {total} 個節點", pageInfo: "第 {page} / {pages} 頁", addNodeHint: "新增節點並安裝 Agent 後，就能在這裡查看運行狀態。",
      liveUpdate: "即時更新", timedUpdate: "定時更新", staleWarning: "暫時無法取得最新資料，以下保留 {time} 的最後狀態。正在自動重試。",
      unavailableWarning: "暫時無法取得節點資料，正在自動重試。", noData: "尚未收到資料，請稍候或按「重新整理」。",
      refreshNow: "立即更新", favoritesOnly: "只看收藏", addFavorite: "收藏 {name}", removeFavorite: "取消收藏 {name}", favoriteCount: "已收藏 {count} 個節點",
      noFavorites: "尚未收藏節點", favoriteHint: "先清除篩選，再點擊節點旁的星號加入收藏。收藏僅儲存在此瀏覽器。",
      latencyTelecom: "上海電信 · 延遲低至高", latencyUnicom: "上海聯通 · 延遲低至高", latencyMobile: "上海移動 · 延遲低至高",
      syncAge: "{seconds} 秒前同步", browserOffline: "網路已中斷", offlineWarning: "目前瀏覽器離線。保留最後資料，連線恢復後會自動更新。",
      pauseMotion: "暫停動畫", resumeMotion: "播放動畫", motionOn: "動畫開啟", motionOff: "動畫關閉", heroCta: "進入監控台", heroLabel: "機甲監控中樞",
      protocolLabel: "三網探測", mainRegion: "上海 · 主測", auxRegion: "安徽 · 輔測",
      pageTitleStale: "資料待更新", countries: { JP: "日本", TW: "台灣", HK: "香港", KR: "韓國", US: "美國", SG: "新加坡", DE: "德國", GB: "英國", CA: "加拿大", AU: "澳洲" }
    },
    "zh-Hans": {
      skip: "跳到节点列表", brandTagline: "每个节点，都在视线之内", connecting: "正在连接",
      displaySettings: "显示设置", appearance: "色彩主题", language: "界面语言",
      themeMecha: "机甲白", themeCoast: "海岸青", themeMidnight: "夜航蓝", themeSakura: "霓虹莓", themeAmber: "夕照金",
      langTraditional: "繁體中文", langSimplified: "简体中文", langEnglish: "English",
      heroTitle: "全域感知。<span>即刻掌控。</span>", heroSubtitle: "从东京到全球，让每一段连接清楚可见。",
      onlineNodes: "在线节点", offlinePending: "离线／待接入", totalDownload: "总下载速率", totalUpload: "总上传速率",
      averageCPU: "平均 CPU", averageMemory: "平均内存", waitingFirst: "等待第一笔数据", allOnlineTotal: "所有在线节点合计",
      onlineAverage: "在线节点平均使用率", retry: "重新整理", fleetOverview: "节点总览", fleetSubtitle: "实时状态、资源与流量，尽在眼前。",
      dataUpdated: "数据更新", searchPlaceholder: "搜索名称、地区、服务商、线路…", searchNodes: "搜索节点",
      status: "状态", region: "地区", provider: "服务商", sort: "排序", allStatus: "全部状态", online: "在线", offline: "离线",
      pendingAccess: "待接入", busy: "高使用率 ≥ 90%", allRegions: "全部地区", allProviders: "全部服务商",
      defaultOrder: "默认顺序", offlineFirst: "离线优先", nodeName: "节点名称", cpuHigh: "CPU 从高到低",
      memoryHigh: "内存从高到低", trafficHigh: "实时流量从高到低", loadingNodes: "正在加载节点…", clearFilters: "清除筛选",
      viewMode: "显示方式", cards: "卡片", list: "列表",
      probeExplainer: "三网延迟：以上海为主，安徽在详情中查看。每约 30 秒测试 3 次，丢包统计最近 10 分钟内的样本；反映节点到区域参考目标的 ICMP 往返，无响应不代表主机离线。",
      receiving: "正在接收节点数据…", noMatches: "没有符合条件的节点", tryFilters: "试试其他关键词，或清除筛选查看全部。",
      nodeRegion: "节点／地区", shanghaiPing: "上海三网 · Ping／丢包", memory: "内存", disk: "磁盘", liveTraffic: "实时流量",
      totalTraffic: "累计流量", runtimeReport: "运行／最后上报", nodeListScroll: "节点列表，可左右滚动", nodeListCaption: "节点资源、流量与上海三网延迟列表",
      perPage: "每页", nodesUnit: "个节点", previous: "← 上一页", next: "下一页 →", footerTagline: "每一条连接，都在掌握之中。",
      privacyFooter: "公开数据不包含 IP、主机名称或 Token", nodeAdmin: "节点管理", openSource: "开源项目 ↗",
      waitingAgent: "等待 Agent 接入", usage: "使用率", download: "下载", upload: "上传", sinceBoot: "自系统启动",
      shanghaiThree: "上海三网", pingLoss: "Ping／丢包", runtime: "运行 —", notReported: "尚未上报", details: "详细资料 ↗",
      cpuModel: "CPU 型号", osArch: "操作系统／架构", load: "负载（1／5／15 分钟）", connections: "TCP／UDP 连接",
      processes: "进程", trafficTotal: "下载／上传累计", detailShort: "详情", recentTrend: "近期下载与上传速率趋势",
      unclassified: "未分类", day: "天", hour: "小时", minute: "分钟", secondsAgo: "{n} 秒前上报", minutesAgo: "{n} 分钟前上报",
      durationAgo: "{duration}前上报", lastOnline: "最后在线", collapse: "收起", view: "查看", detailFor: "{action} {name} 的详细资料", anhuiAux: "安徽三网 · 辅助参考",
      telecom: "电信", unicom: "联通", mobile: "移动", probePending: "待测试", awaitingAgent: "待更新 Agent", disabled: "已停用",
      noResponse: "无响应", unavailable: "无法测试", staleData: "数据过期", lastTest: "最后测试 {time}", updateAgent: "请更新此节点的 Agent",
      waitingProbe: "等待探测结果", latestRound: "最近一轮：最低 {min} / 平均 {avg} / 最高 {max} ms", lossWindow: "最近 10 分钟内收到 {received} / 发出 {sent}，丢包 {loss}%",
      noLossSample: "尚无丢包样本", collapseData: "收起资料 ↙", showDetails: "详细资料 ↗", reportWaiting: "等待 Agent 接入",
      dataNeedsUpdate: "数据待更新", nodesOnline: "{online}/{total} 在线", lastNodeState: "最后收到的节点状态", noNodesYet: "尚未添加节点",
      allNodesHealthy: "所有节点运行正常", onlineRate: "在线率 {rate}%", breakdown: "{offline} 离线 · {pending} 待接入", regionsCount: "{n} 个地区",
      memorySpec: "{value} 内存", resourceTotalTitle: "已上报节点的资源规格合计，包含离线节点的最后数据", showing: "显示 {from}–{to}，符合 {matched} / 全部 {total} 个节点",
      matchedZero: "符合 0 / 全部 {total} 个节点", pageInfo: "第 {page} / {pages} 页", addNodeHint: "添加节点并安装 Agent 后，就能在这里查看运行状态。",
      liveUpdate: "实时更新", timedUpdate: "定时更新", staleWarning: "暂时无法取得最新数据，以下保留 {time} 的最后状态。正在自动重试。",
      unavailableWarning: "暂时无法取得节点数据，正在自动重试。", noData: "尚未收到数据，请稍候或点击“重新整理”。",
      refreshNow: "立即更新", favoritesOnly: "只看收藏", addFavorite: "收藏 {name}", removeFavorite: "取消收藏 {name}", favoriteCount: "已收藏 {count} 个节点",
      noFavorites: "尚未收藏节点", favoriteHint: "先清除筛选，再点击节点旁的星号加入收藏。收藏仅保存在此浏览器。",
      latencyTelecom: "上海电信 · 延迟从低到高", latencyUnicom: "上海联通 · 延迟从低到高", latencyMobile: "上海移动 · 延迟从低到高",
      syncAge: "{seconds} 秒前同步", browserOffline: "网络已断开", offlineWarning: "当前浏览器离线。保留最后数据，连接恢复后会自动更新。",
      pauseMotion: "暂停动画", resumeMotion: "播放动画", motionOn: "动画开启", motionOff: "动画关闭", heroCta: "进入监控台", heroLabel: "机甲监控中枢",
      protocolLabel: "三网探测", mainRegion: "上海 · 主测", auxRegion: "安徽 · 辅测",
      pageTitleStale: "数据待更新", countries: { JP: "日本", TW: "台湾", HK: "香港", KR: "韩国", US: "美国", SG: "新加坡", DE: "德国", GB: "英国", CA: "加拿大", AU: "澳大利亚" }
    },
    en: {
      skip: "Skip to node list", brandTagline: "Every node, clearly in sight", connecting: "Connecting",
      displaySettings: "Display", appearance: "Color theme", language: "Language",
      themeMecha: "Mecha white", themeCoast: "Coastal teal", themeMidnight: "Night blue", themeSakura: "Neon berry", themeAmber: "Sunset gold",
      langTraditional: "繁體中文", langSimplified: "简体中文", langEnglish: "English",
      heroTitle: "Every node.<span>Under control.</span>", heroSubtitle: "Your fleet, in focus. Every connection, in view.",
      onlineNodes: "Online nodes", offlinePending: "Offline / pending", totalDownload: "Total download", totalUpload: "Total upload",
      averageCPU: "Average CPU", averageMemory: "Average memory", waitingFirst: "Waiting for data", allOnlineTotal: "Combined online nodes",
      onlineAverage: "Average across online nodes", retry: "Refresh", fleetOverview: "Fleet overview", fleetSubtitle: "Live status, resources, and traffic at a glance.",
      dataUpdated: "Updated", searchPlaceholder: "Search name, region, provider, network…", searchNodes: "Search nodes",
      status: "Status", region: "Region", provider: "Provider", sort: "Sort", allStatus: "All statuses", online: "Online", offline: "Offline",
      pendingAccess: "Pending", busy: "High usage ≥ 90%", allRegions: "All regions", allProviders: "All providers",
      defaultOrder: "Default order", offlineFirst: "Offline first", nodeName: "Node name", cpuHigh: "CPU high to low",
      memoryHigh: "Memory high to low", trafficHigh: "Traffic high to low", loadingNodes: "Loading nodes…", clearFilters: "Clear filters",
      viewMode: "View mode", cards: "Cards", list: "List",
      probeExplainer: "Three-carrier latency: Shanghai is primary; Anhui appears in details. Each enabled target receives 3 ICMP probes about every 30 seconds, with loss calculated from the latest 10-minute sample. No response does not mean the host is offline.",
      receiving: "Receiving node data…", noMatches: "No matching nodes", tryFilters: "Try another keyword or clear the filters.",
      nodeRegion: "Node / region", shanghaiPing: "Shanghai carriers · Ping / loss", memory: "Memory", disk: "Disk", liveTraffic: "Live traffic",
      totalTraffic: "Total traffic", runtimeReport: "Uptime / last report", nodeListScroll: "Scrollable node list", nodeListCaption: "Node resources, traffic, and Shanghai carrier latency",
      perPage: "Per page", nodesUnit: "nodes", previous: "← Previous", next: "Next →", footerTagline: "Every connection, under control.",
      privacyFooter: "Public data excludes IPs, hostnames, and tokens", nodeAdmin: "Node admin", openSource: "Open source ↗",
      waitingAgent: "Waiting for Agent", usage: "Usage", download: "Download", upload: "Upload", sinceBoot: "Since boot",
      shanghaiThree: "Shanghai carriers", pingLoss: "Ping / loss", runtime: "Uptime —", notReported: "No report yet", details: "Details ↗",
      cpuModel: "CPU model", osArch: "Operating system / arch", load: "Load (1 / 5 / 15 min)", connections: "TCP / UDP connections",
      processes: "Processes", trafficTotal: "Download / upload total", detailShort: "Details", recentTrend: "Recent download and upload trend",
      unclassified: "Unclassified", day: "d", hour: "h", minute: "m", secondsAgo: "Reported {n}s ago", minutesAgo: "Reported {n}m ago",
      durationAgo: "{duration} ago", lastOnline: "Last online", collapse: "Collapse", view: "View", detailFor: "{action} details for {name}", anhuiAux: "Anhui carriers · Secondary reference",
      telecom: "Telecom", unicom: "Unicom", mobile: "Mobile", probePending: "Pending", awaitingAgent: "Update Agent", disabled: "Disabled",
      noResponse: "No response", unavailable: "Unavailable", staleData: "Stale", lastTest: "Last test {time}", updateAgent: "Update this node's Agent",
      waitingProbe: "Waiting for probe", latestRound: "Latest: min {min} / avg {avg} / max {max} ms", lossWindow: "Last 10 min: received {received} / sent {sent}, loss {loss}%",
      noLossSample: "No loss sample yet", collapseData: "Collapse ↙", showDetails: "Details ↗", reportWaiting: "Waiting for Agent",
      dataNeedsUpdate: "Data needs refresh", nodesOnline: "{online}/{total} online", lastNodeState: "Last received node state", noNodesYet: "No nodes added",
      allNodesHealthy: "All nodes are healthy", onlineRate: "Online rate {rate}%", breakdown: "{offline} offline · {pending} pending", regionsCount: "{n} regions",
      memorySpec: "{value} memory", resourceTotalTitle: "Reported resource totals, including the latest data from offline nodes", showing: "Showing {from}–{to}; {matched} / {total} nodes match",
      matchedZero: "0 / {total} nodes match", pageInfo: "Page {page} / {pages}", addNodeHint: "Add a node and install the Agent to see its status here.",
      liveUpdate: "Live updates", timedUpdate: "Timed updates", staleWarning: "Latest data is unavailable. Showing the last state from {time} while retrying automatically.",
      unavailableWarning: "Node data is temporarily unavailable. Retrying automatically.", noData: "No data yet. Please wait or press Refresh.",
      refreshNow: "Refresh now", favoritesOnly: "Favorites only", addFavorite: "Favorite {name}", removeFavorite: "Unfavorite {name}", favoriteCount: "{count} favorite nodes",
      noFavorites: "No favorite nodes yet", favoriteHint: "Clear filters, then select the star next to a node. Favorites are stored only in this browser.",
      latencyTelecom: "Shanghai Telecom · Lowest latency", latencyUnicom: "Shanghai Unicom · Lowest latency", latencyMobile: "Shanghai Mobile · Lowest latency",
      syncAge: "Synced {seconds}s ago", browserOffline: "Network offline", offlineWarning: "Your browser is offline. The last data is retained and updates will resume when your connection returns.",
      pauseMotion: "Pause animation", resumeMotion: "Play animation", motionOn: "Animation on", motionOff: "Animation off", heroCta: "Open dashboard", heroLabel: "MECHA COMMAND CENTER",
      protocolLabel: "Three-carrier probes", mainRegion: "Shanghai · Primary", auxRegion: "Anhui · Secondary",
      pageTitleStale: "Data needs refresh", countries: { JP: "Japan", TW: "Taiwan", HK: "Hong Kong", KR: "South Korea", US: "United States", SG: "Singapore", DE: "Germany", GB: "United Kingdom", CA: "Canada", AU: "Australia" }
    }
  }

  let saved = {}
  try { saved = JSON.parse(localStorage.getItem("pulse-coast-preferences") || "{}") || {} } catch { /* Optional storage. */ }
  const allowedLanguages = ["zh-Hant", "zh-Hans", "en"]
  const allowedThemes = ["mecha", "coast", "midnight", "sakura", "amber"]
  let language = allowedLanguages.includes(saved.language) ? saved.language : "zh-Hant"
  let theme = allowedThemes.includes(saved.theme) ? saved.theme : "mecha"
  const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)")
  let motionOverride = typeof saved.motionPaused === "boolean"
  let motionPaused = motionOverride ? saved.motionPaused : !!motionQuery?.matches

  function t(key, variables = {}) {
    let value = dictionaries[language][key]
    if (value === undefined) value = dictionaries["zh-Hant"][key]
    if (typeof value !== "string") return value
    return value.replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? `{${name}}`)
  }
  function persist() {
    try {
      const current = JSON.parse(localStorage.getItem("pulse-coast-preferences") || "{}") || {}
      localStorage.setItem("pulse-coast-preferences", JSON.stringify({ ...current, language, theme, motionPaused: motionOverride ? motionPaused : undefined }))
    } catch { /* Optional storage. */ }
  }
  function translate(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n) })
    root.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml) })
    root.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder) })
    root.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)) })
    root.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(el.dataset.i18nTitle) })
  }
  function selectButtons() {
    document.querySelectorAll("[data-theme-choice]").forEach(button => {
      const active = button.dataset.themeChoice === theme
      button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active))
    })
    document.querySelectorAll("[data-language-choice]").forEach(button => {
      const active = button.dataset.languageChoice === language
      button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active))
    })
  }
  function setTheme(next, announce = true) {
    if (!allowedThemes.includes(next)) return
    theme = next; document.documentElement.dataset.theme = theme; persist(); selectButtons()
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === "mecha" ? "#111e35" : theme === "midnight" ? "#0b1527" : theme === "sakura" ? "#fff3f8" : theme === "amber" ? "#fff8ea" : "#edf8fa"
    if (announce) document.dispatchEvent(new CustomEvent("pulse:theme", { detail: { theme } }))
  }
  function setLanguage(next, announce = true) {
    if (!allowedLanguages.includes(next)) return
    language = next; document.documentElement.lang = language; persist(); translate(); selectButtons(); updateMotion()
    if (announce) document.dispatchEvent(new CustomEvent("pulse:language", { detail: { language } }))
  }
  function updateMotion() {
    document.body.dataset.motion = motionPaused ? "paused" : "running"
    const button = document.querySelector("#motion-toggle")
    if (button) {
      button.setAttribute("aria-pressed", String(!motionPaused))
      button.setAttribute("aria-label", t(motionPaused ? "resumeMotion" : "pauseMotion"))
      const label = button.querySelector("[data-i18n]") || button
      label.textContent = t(motionPaused ? "resumeMotion" : "pauseMotion")
      if (label.dataset.i18n) label.dataset.i18n = motionPaused ? "resumeMotion" : "pauseMotion"
    }
    document.querySelectorAll("img[data-motion-still]").forEach(img => {
      if (!img.dataset.motionSource) img.dataset.motionSource = img.getAttribute("src")
      const source = motionPaused ? img.dataset.motionStill : img.dataset.motionSource
      if (source && img.getAttribute("src") !== source) img.setAttribute("src", source)
    })
  }
  function setMotion(paused, remember = true) {
    motionPaused = !!paused
    if (remember) motionOverride = true
    updateMotion(); persist()
  }
  function setMenu(open) {
    const button = document.querySelector("#display-toggle"), panel = document.querySelector("#display-panel")
    if (!button || !panel) return
    button.setAttribute("aria-expanded", String(open)); panel.setAttribute("aria-hidden", String(!open)); panel.classList.toggle("open", open)
  }
  function init() {
    setTheme(theme, false); setLanguage(language, false); updateMotion()
    const button = document.querySelector("#display-toggle"), panel = document.querySelector("#display-panel")
    button?.addEventListener("click", event => { event.stopPropagation(); setMenu(button.getAttribute("aria-expanded") !== "true") })
    panel?.addEventListener("click", event => event.stopPropagation())
    document.addEventListener("click", () => setMenu(false))
    document.addEventListener("keydown", event => { if (event.key === "Escape" && button?.getAttribute("aria-expanded") === "true") { setMenu(false); button.focus() } })
    document.querySelector("#motion-toggle")?.addEventListener("click", () => setMotion(!motionPaused))
    motionQuery?.addEventListener("change", event => { if (!motionOverride) setMotion(event.matches, false) })
    document.querySelectorAll("[data-theme-choice]").forEach(el => el.addEventListener("click", () => setTheme(el.dataset.themeChoice)))
    document.querySelectorAll("[data-language-choice]").forEach(el => el.addEventListener("click", () => setLanguage(el.dataset.languageChoice)))
  }

  window.PulseUI = {
    init, t, translate, setTheme, setLanguage, setMotion,
    get language() { return language }, get theme() { return theme },
    get motionPaused() { return motionPaused }, get motionPreference() { return motionOverride ? motionPaused : undefined },
    get locale() { return language === "en" ? "en" : language === "zh-Hans" ? "zh-CN" : "zh-TW" },
    country(code) { return dictionaries[language].countries?.[code] || code || t("unclassified") }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init()
})()
