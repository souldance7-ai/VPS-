"use strict"
const $ = (selector, root = document) => root.querySelector(selector)
const put = (root, selector, value) => { const el = $(selector, root); if (el && el.textContent !== String(value)) el.textContent = value }
const number = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0
const percent = (used, total) => total > 0 ? Math.min(100, number(used) / total * 100) : 0
const dateFormat = new Intl.DateTimeFormat("zh-TW", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Taipei" })
const collator = new Intl.Collator("zh-Hant", { numeric: true })
const countries = { JP: "日本", TW: "台灣", HK: "香港", KR: "韓國", US: "美國", SG: "新加坡", DE: "德國", GB: "英國", CA: "加拿大", AU: "澳洲" }
let regions
try { regions = new Intl.DisplayNames(["zh-Hant"], { type: "region" }) } catch { /* Country codes remain readable on older browsers. */ }
let preferences = {}
try { preferences = JSON.parse(localStorage.getItem("pulse-coast-preferences") || "{}") || {} } catch { /* Storage is optional. */ }
let state = null, receivedAt = 0, stale = false, page = 1, detailSequence = 0
let pageSize = [12, 24, 50, 100].includes(preferences.pageSize) ? preferences.pageSize : 24
let chosenView = ["cards", "list"].includes(preferences.view) ? preferences.view : null
const expanded = new Set(), cards = new Map(), rows = new Map()
let refreshTimer = null, inFlight = false, lastAttempt = 0, stream = null, streamReady = false
const REFRESH_MS = 3000, STALE_MS = 30000

function savePreferences() {
  try { localStorage.setItem("pulse-coast-preferences", JSON.stringify({ view: chosenView, pageSize, sort: $("#sort").value })) } catch { /* Private browsing can disable storage. */ }
}
function countryName(code) {
  if (countries[code]) return countries[code]
  try { return regions?.of(code) || code || "未分類" } catch { return code || "未分類" }
}
function bytes(value, rate = false) {
  const n = number(value), units = ["B", "KB", "MB", "GB", "TB", "PB"]
  const i = n > 0 ? Math.min(Math.max(0, Math.floor(Math.log(n) / Math.log(1024))), units.length - 1) : 0
  const amount = n / 1024 ** i, digits = amount >= 100 || i === 0 ? 0 : amount >= 10 ? 1 : 2
  return `${amount.toFixed(digits)} ${units[i]}${rate ? "/s" : ""}`
}
function duration(seconds) {
  const n = number(seconds), days = Math.floor(n / 86400), hours = Math.floor(n % 86400 / 3600), mins = Math.floor(n % 3600 / 60)
  return days ? `${days} 天 ${hours} 小時` : hours ? `${hours} 小時 ${mins} 分` : `${mins} 分鐘`
}
function time(ts) { return ts ? dateFormat.format(new Date(ts * 1000)) : "—" }
function lastSeen(node) {
  if (!node.last_seen) return "尚未回報"
  const now = number(state?.generated_at) + (Date.now() - receivedAt) / 1000
  const age = Math.max(0, Math.floor(now - node.last_seen))
  return age < 60 ? `${age} 秒前回報` : age < 3600 ? `${Math.floor(age / 60)} 分鐘前回報` : `${duration(age)}前回報`
}
function statusText(node) { return stale && node.online ? "最後在線" : node.online ? "在線" : node.last_seen ? "離線" : "待接入" }
function meter(root, selector, value) {
  const bar = $(selector, root), n = Math.min(100, number(value))
  bar.classList.toggle("warn", n >= 75 && n < 90); bar.classList.toggle("danger", n >= 90)
  $("i", bar).style.width = `${n}%`
}
function common(root, node) {
  root.dataset.id = node.id
  root.classList.toggle("offline", !node.online && !!node.last_seen)
  root.classList.toggle("pending", !node.online && !node.last_seen)
  put(root, ".country-mark", node.country || "—")
  $(".country-mark", root).title = countryName(node.country)
  put(root, ".status-pill b", statusText(node))
  put(root, ".last-seen", lastSeen(node))
  paintProbes($(".probe-summary", root), node, "sh")
  const button = $(".details-button", root)
  button.setAttribute("aria-expanded", String(expanded.has(node.id)))
  button.setAttribute("aria-label", `${expanded.has(node.id) ? "收起" : "查看"} ${node.name} 的詳細資料`)
}
function detail(root, node) {
  const s = node.system, m = node.metrics
  put(root, ".cpu-model", s?.cpu_model || "—")
  put(root, ".system-detail", s ? [s.os, s.arch, s.kernel].filter(Boolean).join(" · ") : "等待 Agent 接入")
  put(root, ".load", m?.load ? m.load.map(x => number(x).toFixed(2)).join(" / ") : "—")
  put(root, ".connections", m ? `${number(m.tcp)} TCP / ${number(m.udp)} UDP` : "—")
  put(root, ".processes", m ? number(m.procs).toLocaleString() : "—")
  put(root, ".traffic", m ? `↓ ${bytes(m.total_rx)} / ↑ ${bytes(m.total_tx)}` : "—")
  let probes = $(".aux-probes", root)
  if (!probes) {
    const section = document.createElement("section"), title = document.createElement("h4")
    section.className = "detail-probes"; title.textContent = "安徽三網 · 輔助參考"
    probes = document.createElement("div"); probes.className = "aux-probes"
    section.append(title, probes); (root.matches(".details") ? root : $(".details", root)).append(section)
  }
  paintProbes(probes, node, "ah", true)
}
function paintProbes(root, node, region, detailed = false) {
  if (!root) return
  const labels = [["ct", "電信"], ["cu", "聯通"], ["cm", "移動"]]
  if (!root.children.length) {
    for (const [id, label] of labels) {
      const el = document.createElement("div"); el.className = "probe-line"; el.dataset.probe = `${region}-${id}`
      const carrier = document.createElement("span"), value = document.createElement("b"), loss = document.createElement("small"), checked = document.createElement("em")
      carrier.className = "probe-carrier"; carrier.textContent = label
      value.className = "probe-value"; loss.className = "probe-loss"; checked.className = "probe-checked"; checked.hidden = !detailed
      el.append(carrier, value, loss, checked); root.append(el)
    }
  }
  const statuses = {pending:"待測試",awaiting_agent:"待更新 Agent",disabled:"已停用",timeout:"無回應",unavailable:"無法測試",stale:"資料過期"}
  for (const el of root.children) {
    const p = (node.probes || []).find(x => x.id === el.dataset.probe)
    let status = p?.status || (node.last_seen ? "awaiting_agent" : "pending")
    if (stale && status === "ok") status = "stale"
    const valid = status === "ok" && Number.isFinite(p?.avg_ms)
    put(el, ".probe-value", valid ? `${p.avg_ms.toFixed(1)} ms` : statuses[status] || "待測試")
    const hasLoss = ["ok", "timeout"].includes(status) && Number.isFinite(p?.loss_percent)
    put(el, ".probe-loss", hasLoss ? `${p.loss_percent.toFixed(1)}%` : "—")
    el.classList.toggle("probe-good", valid && p.loss_percent === 0)
    el.classList.toggle("probe-warn", status === "timeout" || valid && p.loss_percent > 0)
    el.classList.toggle("probe-muted", !valid && status !== "timeout")
    const recent = p?.checked_at ? `最後測試 ${time(p.checked_at)}` : status === "awaiting_agent" ? "請更新此節點的 Agent" : "等待探測結果"
    put(el, ".probe-checked", recent)
    el.title = [recent, Number.isFinite(p?.min_ms) ? `最近一輪：最低 ${p.min_ms.toFixed(1)} / 平均 ${p.avg_ms.toFixed(1)} / 最高 ${p.max_ms.toFixed(1)} ms` : "", p?.window_sent ? `最近 10 分鐘內收到 ${p.window_received} / 送出 ${p.window_sent}，丟包 ${p.loss_percent.toFixed(1)}%` : "尚無丟包樣本"].filter(Boolean).join("\n")
  }
}
function spark(card, points) {
  const values = (points || []).slice(-120)
  const max = Math.max(1, ...values.flatMap(p => [number(p.net_rx), number(p.net_tx)]))
  for (const [selector, key] of [[".spark-rx", "net_rx"], [".spark-tx", "net_tx"]]) {
    const path = values.length < 2 ? "" : values.map((p, i) => `${i ? "L" : "M"}${(i / (values.length - 1) * 240).toFixed(1)},${(54 - number(p[key]) / max * 48).toFixed(1)}`).join(" ")
    $(selector, card).setAttribute("d", path)
  }
}
function updateCard(node) {
  let card = cards.get(node.id)
  if (!card) {
    card = $("#node-template").content.firstElementChild.cloneNode(true)
    const id = `card-detail-${++detailSequence}`
    $(".details", card).id = id; $(".details-button", card).setAttribute("aria-controls", id)
    cards.set(node.id, card)
  }
  common(card, node)
  put(card, "h3", node.name); put(card, ".region", node.region)
  for (const field of ["provider", "network", "plan"]) { put(card, `.${field}`, node[field] || ""); $(`.${field}`, card).hidden = !node[field] }
  const m = node.metrics, s = node.system
  put(card, ".cores", s ? `${s.cpu_cores} vCPU` : "— vCPU")
  put(card, ".os", s?.os || "等待 Agent 接入")
  $(".os", card).title = s?.os || ""
  const hasMetrics = !!(m && s)
  for (const [key, value] of [["cpu", m?.cpu], ["memory", percent(m?.mem_used, s?.mem_total)], ["disk", percent(m?.disk_used, s?.disk_total)]]) {
    put(card, `.${key} strong`, hasMetrics ? `${number(value).toFixed(1)}%` : "—")
    meter(card, `.${key} .bar`, hasMetrics ? value : 0)
  }
  put(card, ".cpu-hint", s?.arch || "使用率")
  put(card, ".memory-size", hasMetrics ? `${bytes(m.mem_used)} / ${bytes(s.mem_total)}` : "— / —")
  put(card, ".disk-size", hasMetrics ? `${bytes(m.disk_used)} / ${bytes(s.disk_total)}` : "— / —")
  put(card, ".rx", m && node.online ? bytes(m.net_rx, true) : "—")
  put(card, ".tx", m && node.online ? bytes(m.net_tx, true) : "—")
  put(card, ".total-traffic", m ? bytes(number(m.total_rx) + number(m.total_tx)) : "—")
  put(card, ".uptime", m ? `運行 ${duration(m.uptime)}` : "等待 Agent 接入")
  put(card, ".details-button", expanded.has(node.id) ? "收起資料 ↙" : "詳細資料 ↗")
  const details = $(".details", card)
  details.hidden = !expanded.has(node.id)
  if (!details.hidden) detail(details, node)
  spark(card, node.history)
  return card
}
function updateRow(node) {
  let pair = rows.get(node.id)
  if (!pair) {
    const row = $("#row-template").content.firstElementChild.cloneNode(true)
    const extra = document.createElement("tr"), cell = document.createElement("td")
    extra.className = "row-detail"; cell.colSpan = 10
    const probesCell = document.createElement("td"), probes = document.createElement("div")
    probesCell.className = "row-probes"; probes.className = "probe-summary"; probesCell.append(probes)
    row.insertBefore(probesCell, row.children[2])
    const details = $(".details", $("#node-template").content).cloneNode(true)
    details.hidden = false; cell.append(details); extra.append(cell)
    extra.id = `row-detail-${++detailSequence}`
    $(".details-button", row).setAttribute("aria-controls", extra.id)
    pair = { row, extra }; rows.set(node.id, pair)
  }
  const { row, extra } = pair, m = node.metrics, s = node.system, hasMetrics = !!(m && s)
  common(row, node)
  put(row, ".node-name", node.name)
  $(".node-name", row).title = [node.name, node.plan].filter(Boolean).join(" · ")
  put(row, ".row-location", [node.region, node.provider, node.network].filter(Boolean).join(" · "))
  for (const [key, value] of [["cpu", m?.cpu], ["memory", percent(m?.mem_used, s?.mem_total)], ["disk", percent(m?.disk_used, s?.disk_total)]]) {
    put(row, `.row-${key}`, hasMetrics ? `${number(value).toFixed(1)}%` : "—")
    meter(row, `.${key}-bar`, hasMetrics ? value : 0)
  }
  put(row, ".row-cores", s ? `${s.cpu_cores} vCPU` : "—")
  put(row, ".memory-size", hasMetrics ? `${bytes(m.mem_used)} / ${bytes(s.mem_total)}` : "—")
  put(row, ".disk-size", hasMetrics ? `${bytes(m.disk_used)} / ${bytes(s.disk_total)}` : "—")
  put(row, ".row-rx", m && node.online ? `↓ ${bytes(m.net_rx, true)}` : "—")
  put(row, ".row-tx", m && node.online ? `↑ ${bytes(m.net_tx, true)}` : "—")
  put(row, ".row-total-rx", m ? `↓ ${bytes(m.total_rx)}` : "—")
  put(row, ".row-total-tx", m ? `↑ ${bytes(m.total_tx)}` : "—")
  put(row, ".row-uptime", m ? duration(m.uptime) : "—")
  put(row, ".details-button", expanded.has(node.id) ? "收起" : "詳情")
  extra.hidden = !expanded.has(node.id)
  if (!extra.hidden) detail(extra, node)
  return [row, extra]
}
// Preserve the same DOM nodes, focus, and open details across telemetry refreshes.
function reconcile(parent, children) {
  const wanted = new Set(children)
  for (const child of Array.from(parent.children)) if (!wanted.has(child)) child.remove()
  children.forEach((child, i) => { if (parent.children[i] !== child) parent.insertBefore(child, parent.children[i] || null) })
}
function filterOptions(selector, entries, allLabel) {
  const select = $(selector), selected = select.value
  const signature = JSON.stringify(entries)
  if (select.dataset.options === signature) return
  select.dataset.options = signature
  const options = [["all", allLabel], ...entries].map(([value, label]) => new Option(label, value))
  select.replaceChildren(...options)
  select.value = options.some(o => o.value === selected) ? selected : "all"
}
function renderSummary() {
  const nodes = state.nodes, online = nodes.filter(n => n.online), sampled = online.filter(n => n.metrics && n.system)
  const offline = nodes.filter(n => !n.online && n.last_seen).length, pending = nodes.filter(n => !n.online && !n.last_seen).length
  put(document, "#site-name", state.site?.name || "CORENET PULSE")
  const subtitle = state.site?.subtitle
  put(document, "#site-subtitle", subtitle && subtitle !== "PRIVATE INFRASTRUCTURE TELEMETRY" ? subtitle : "每個地區的連線、資源與流量，在這裡清楚可見。")
  document.title = `${state.site?.name || "CORENET PULSE"} · ${stale ? "資料待更新" : `${online.length}/${nodes.length} 在線`}`
  put(document, "#fleet-ratio", `${online.length} / ${nodes.length}`)
  put(document, "#fleet-status", stale ? "最後收到的節點狀態" : !nodes.length ? "尚未新增節點" : online.length === nodes.length ? "所有節點運行正常" : `在線率 ${(online.length / nodes.length * 100).toFixed(0)}%`)
  put(document, "#fleet-offline", offline + pending)
  $("#fleet-offline").parentElement.classList.toggle("attention", offline > 0)
  put(document, "#offline-breakdown", `${offline} 離線 · ${pending} 待接入`)
  put(document, "#fleet-rx", bytes(online.reduce((sum, n) => sum + number(n.metrics?.net_rx), 0), true))
  put(document, "#fleet-tx", bytes(online.reduce((sum, n) => sum + number(n.metrics?.net_tx), 0), true))
  const avg = f => sampled.length ? `${(sampled.reduce((sum, n) => sum + f(n), 0) / sampled.length).toFixed(1)}%` : "—"
  put(document, "#fleet-cpu", avg(n => number(n.metrics.cpu)))
  put(document, "#fleet-memory", avg(n => percent(n.metrics.mem_used, n.system.mem_total)))
  put(document, "#last-sync", time(state.generated_at))
  put(document, "#node-count", nodes.length)
  put(document, "#region-count", `${new Set(nodes.map(n => n.country).filter(Boolean)).size} 個地區`)
  const systems = nodes.filter(n => n.system)
  put(document, "#core-count", systems.length ? `${systems.reduce((s, n) => s + number(n.system.cpu_cores), 0)} vCPU` : "— vCPU")
  put(document, "#memory-total", systems.length ? `${bytes(systems.reduce((s, n) => s + number(n.system.mem_total), 0))} 記憶體` : "— 記憶體")
  $(".fleet-facts").title = "已回報節點的資源規格合計，包含離線節點的最後資料"
  filterOptions("#country-filter", [...new Set(nodes.map(n => n.country).filter(Boolean))].sort().map(c => [c, countryName(c)]), "全部地區")
  filterOptions("#provider-filter", [...new Set(nodes.map(n => n.provider).filter(Boolean))].sort(collator.compare).map(p => [p, p]), "全部服務商")
}
function renderVisible() {
  if (!state) return
  const query = $("#search").value.trim().toLocaleLowerCase(), status = $("#status-filter").value, country = $("#country-filter").value, provider = $("#provider-filter").value
  let filtered = state.nodes.filter(n => {
    if (query && ![n.id, n.name, n.region, countryName(n.country), n.provider, n.network, n.plan].join(" ").toLocaleLowerCase().includes(query)) return false
    if (country !== "all" && n.country !== country || provider !== "all" && n.provider !== provider) return false
    if (status === "online" && !n.online || status === "offline" && (n.online || !n.last_seen) || status === "pending" && (n.online || n.last_seen)) return false
    if (status === "busy" && !(n.online && n.metrics && n.system && Math.max(number(n.metrics.cpu), percent(n.metrics.mem_used, n.system.mem_total), percent(n.metrics.disk_used, n.system.disk_total)) >= 90)) return false
    return true
  })
  const sort = $("#sort").value
  const descending = f => (a, b) => f(b) - f(a)
  const attention = n => n.online ? 2 : n.last_seen ? 0 : 1
  if (sort === "name") filtered.sort((a, b) => collator.compare(a.name, b.name))
  if (sort === "attention") filtered.sort((a, b) => attention(a) - attention(b))
  if (sort === "cpu") filtered.sort(descending(n => n.online ? number(n.metrics?.cpu) : -1))
  if (sort === "memory") filtered.sort(descending(n => n.online ? percent(n.metrics?.mem_used, n.system?.mem_total) : -1))
  if (sort === "traffic") filtered.sort(descending(n => n.online ? number(n.metrics?.net_rx) + number(n.metrics?.net_tx) : -1))
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  page = Math.min(page, pages)
  const start = (page - 1) * pageSize, visible = filtered.slice(start, start + pageSize)
  const view = chosenView || (state.nodes.length > 12 ? "list" : "cards")
  $("#view-cards").setAttribute("aria-pressed", String(view === "cards")); $("#view-list").setAttribute("aria-pressed", String(view === "list"))
  $("#node-grid").hidden = view !== "cards" || !filtered.length
  $("#node-table-wrap").hidden = view !== "list" || !filtered.length
  $("#empty").hidden = filtered.length > 0
  if (!state.nodes.length) { put(document, "#empty strong", "尚未新增節點"); put(document, "#empty p", "新增節點並安裝 Agent 後，就能在這裡查看運行狀態。") }
  else { put(document, "#empty strong", "沒有符合條件的節點"); put(document, "#empty p", "試試其他關鍵字，或清除篩選查看全部。") }
  $("#loading").hidden = true
  $("#clear-filters").hidden = !query && status === "all" && country === "all" && provider === "all"
  put(document, "#result-count", filtered.length ? `顯示 ${start + 1}–${start + visible.length}，符合 ${filtered.length} / 全部 ${state.nodes.length} 個節點` : `符合 0 / 全部 ${state.nodes.length} 個節點`)
  put(document, "#page-info", `第 ${page} / ${pages} 頁`)
  $("#prev-page").disabled = page <= 1; $("#next-page").disabled = page >= pages
  $("#node-grid").classList.toggle("small-fleet", filtered.length <= 2)
  if (view === "cards") reconcile($("#node-grid"), visible.map(updateCard))
  else reconcile($("#node-rows"), visible.flatMap(updateRow))
  const ids = new Set(state.nodes.map(n => n.id))
  for (const cache of [cards, rows]) for (const id of cache.keys()) if (!ids.has(id)) cache.delete(id)
  for (const id of expanded) if (!ids.has(id)) expanded.delete(id)
}
function connection() {
  const el = $("#connection-state")
  el.className = `connection-pill${stale ? " error" : state ? " live" : ""}`
  el.textContent = stale ? "資料待更新" : state ? (streamReady ? "即時更新" : "定時更新") : "正在連線"
  document.body.dataset.stale = String(stale)
  $("#data-warning").hidden = !stale
  if (stale) put(document, "#warning-copy", state ? `暫時無法取得最新資料，以下保留 ${time(state.generated_at)} 的最後狀態。正在自動重試。` : "暫時無法取得節點資料，正在自動重試。")
}
function markStale() {
  if (stale) return
  stale = true; connection()
  if (state) { renderSummary(); renderVisible() }
  else put(document, "#loading", "尚未收到資料，請稍候或按「重新整理」。")
}
async function refresh() {
  if (inFlight || document.hidden) return
  inFlight = true; lastAttempt = Date.now()
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const listView = chosenView === "list" || (!chosenView && (state?.nodes.length || 0) > 12)
    const response = await fetch(`/api/public/state?history=${listView ? 0 : 30}`, { cache: "no-store", signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const incoming = await response.json()
    if (!Array.isArray(incoming.nodes) || !Number.isFinite(incoming.generated_at)) throw new Error("Invalid state")
    state = incoming; receivedAt = Date.now(); stale = false
    connection(); renderSummary(); renderVisible()
  } catch { markStale() } finally { clearTimeout(timeout); inFlight = false }
}
// A 100-node fleet can emit dozens of SSE events each second. Merge them into
// one non-overlapping snapshot request per 3 seconds; only repaint this page.
function requestRefresh() {
  if (document.hidden || inFlight || refreshTimer !== null) return
  refreshTimer = setTimeout(() => { refreshTimer = null; refresh() }, Math.max(0, REFRESH_MS - (Date.now() - lastAttempt)))
}
function connect() {
  if (stream || document.hidden || !("EventSource" in window)) return
  stream = new EventSource("/api/public/events")
  stream.addEventListener("ready", () => { streamReady = true; connection(); requestRefresh() })
  stream.addEventListener("update", requestRefresh)
  stream.onerror = () => { streamReady = false; connection() }
}
function stopStream() { stream?.close(); stream = null; streamReady = false }
$("#page-size").value = String(pageSize)
if (["default", "attention", "name", "cpu", "memory", "traffic"].includes(preferences.sort)) $("#sort").value = preferences.sort
$("#search").addEventListener("input", () => { page = 1; renderVisible() })
for (const id of ["status-filter", "country-filter", "provider-filter", "sort"]) $(`#${id}`).addEventListener("change", () => { page = 1; renderVisible(); savePreferences() })
$("#clear-filters").addEventListener("click", () => { $("#search").value = ""; for (const id of ["status-filter", "country-filter", "provider-filter"]) $(`#${id}`).value = "all"; page = 1; renderVisible(); $("#search").focus() })
for (const view of ["cards", "list"]) $(`#view-${view}`).addEventListener("click", () => { chosenView = view; renderVisible(); savePreferences(); requestRefresh() })
$("#page-size").addEventListener("change", () => { pageSize = Number($("#page-size").value); page = 1; renderVisible(); savePreferences() })
for (const [id, delta] of [["prev-page", -1], ["next-page", 1]]) $(`#${id}`).addEventListener("click", () => { page = Math.max(1, page + delta); renderVisible(); $("#fleet").scrollIntoView({ block: "start" }) })
for (const id of ["node-grid", "node-rows"]) $(`#${id}`).addEventListener("click", event => {
  const button = event.target.closest(".details-button")
  if (!button) return
  const nodeID = button.closest("[data-id]").dataset.id
  if (expanded.has(nodeID)) expanded.delete(nodeID); else expanded.add(nodeID)
  renderVisible()
})
$("#retry").addEventListener("click", requestRefresh)
document.addEventListener("visibilitychange", () => { if (document.hidden) stopStream(); else { if (state && Date.now() - receivedAt > STALE_MS) markStale(); connect(); requestRefresh() } })
window.addEventListener("pagehide", stopStream)
function tick() { $("#clock").textContent = dateFormat.format(new Date()); if (state && Date.now() - receivedAt > STALE_MS) markStale() }
tick(); setInterval(tick, 1000); setInterval(requestRefresh, 15000)
connect(); requestRefresh()
