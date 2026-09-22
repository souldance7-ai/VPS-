"use strict"
const $ = (selector, root = document) => root.querySelector(selector)
const put = (root, selector, value) => { const el = $(selector, root); if (el && el.textContent !== String(value)) el.textContent = value }
const number = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0
const percent = (used, total) => total > 0 ? Math.min(100, number(used) / total * 100) : 0
const UI = window.PulseUI
const t = (key, variables) => UI.t(key, variables)
let dateFormat, collator, regions
function refreshFormatters() {
  dateFormat = new Intl.DateTimeFormat(UI.locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Taipei" })
  collator = new Intl.Collator(UI.locale, { numeric: true })
  try { regions = new Intl.DisplayNames([UI.locale], { type: "region" }) } catch { regions = null }
}
refreshFormatters()
let preferences = {}
try { preferences = JSON.parse(localStorage.getItem("pulse-coast-preferences") || "{}") || {} } catch { /* Storage is optional. */ }
let state = null, receivedAt = 0, stale = false, page = 1, detailSequence = 0
let pageSize = [12, 24, 50, 100].includes(preferences.pageSize) ? preferences.pageSize : 24
let chosenView = ["cards", "list"].includes(preferences.view) ? preferences.view : null
const expanded = new Set(), cards = new Map(), rows = new Map()
let refreshTimer = null, inFlight = false, lastAttempt = 0, stream = null, streamReady = false
const REFRESH_MS = 3000, STALE_MS = 30000

function savePreferences() {
  try { localStorage.setItem("pulse-coast-preferences", JSON.stringify({ ...preferences, view: chosenView, pageSize, sort: $("#sort").value, language: UI.language, theme: UI.theme })) } catch { /* Private browsing can disable storage. */ }
}
function countryName(code) {
  const known = UI.country(code)
  if (known && known !== code) return known
  try { return regions?.of(code) || code || t("unclassified") } catch { return code || t("unclassified") }
}
function bytes(value, rate = false) {
  const n = number(value), units = ["B", "KB", "MB", "GB", "TB", "PB"]
  const i = n > 0 ? Math.min(Math.max(0, Math.floor(Math.log(n) / Math.log(1024))), units.length - 1) : 0
  const amount = n / 1024 ** i, digits = amount >= 100 || i === 0 ? 0 : amount >= 10 ? 1 : 2
  return `${amount.toFixed(digits)} ${units[i]}${rate ? "/s" : ""}`
}
function duration(seconds) {
  const n = number(seconds), days = Math.floor(n / 86400), hours = Math.floor(n % 86400 / 3600), mins = Math.floor(n % 3600 / 60)
  return days ? `${days} ${t("day")} ${hours} ${t("hour")}` : hours ? `${hours} ${t("hour")} ${mins} ${t("minute")}` : `${mins} ${t("minute")}`
}
function time(ts) { return ts ? dateFormat.format(new Date(ts * 1000)) : "—" }
function lastSeen(node) {
  if (!node.last_seen) return t("notReported")
  const now = number(state?.generated_at) + (Date.now() - receivedAt) / 1000
  const age = Math.max(0, Math.floor(now - node.last_seen))
  return age < 60 ? t("secondsAgo", { n: age }) : age < 3600 ? t("minutesAgo", { n: Math.floor(age / 60) }) : t("durationAgo", { duration: duration(age) })
}
function statusText(node) { return stale && node.online ? t("lastOnline") : node.online ? t("online") : node.last_seen ? t("offline") : t("pendingAccess") }
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
  button.setAttribute("aria-label", t("detailFor", { action: expanded.has(node.id) ? t("collapse") : t("view"), name: node.name }))
}
function detail(root, node) {
  const s = node.system, m = node.metrics
  put(root, ".cpu-model", s?.cpu_model || "—")
  put(root, ".system-detail", s ? [s.os, s.arch, s.kernel].filter(Boolean).join(" · ") : t("waitingAgent"))
  put(root, ".load", m?.load ? m.load.map(x => number(x).toFixed(2)).join(" / ") : "—")
  put(root, ".connections", m ? `${number(m.tcp)} TCP / ${number(m.udp)} UDP` : "—")
  put(root, ".processes", m ? number(m.procs).toLocaleString() : "—")
  put(root, ".traffic", m ? `↓ ${bytes(m.total_rx)} / ↑ ${bytes(m.total_tx)}` : "—")
  let probes = $(".aux-probes", root)
  if (!probes) {
    const section = document.createElement("section"), title = document.createElement("h4")
    section.className = "detail-probes"; title.textContent = t("anhuiAux"); title.dataset.i18n = "anhuiAux"
    probes = document.createElement("div"); probes.className = "aux-probes"
    section.append(title, probes); (root.matches(".details") ? root : $(".details", root)).append(section)
  }
  paintProbes(probes, node, "ah", true)
}
function paintProbes(root, node, region, detailed = false) {
  if (!root) return
  const labels = [["ct", "telecom"], ["cu", "unicom"], ["cm", "mobile"]]
  if (!root.children.length) {
    for (const [id, label] of labels) {
      const el = document.createElement("div"); el.className = "probe-line"; el.dataset.probe = `${region}-${id}`
      const carrier = document.createElement("span"), value = document.createElement("b"), loss = document.createElement("small"), checked = document.createElement("em")
      carrier.className = "probe-carrier"; carrier.dataset.carrier = label; carrier.textContent = t(label)
      value.className = "probe-value"; loss.className = "probe-loss"; checked.className = "probe-checked"; checked.hidden = !detailed
      el.append(carrier, value, loss, checked); root.append(el)
    }
  }
  const statuses = {pending:"probePending",awaiting_agent:"awaitingAgent",disabled:"disabled",timeout:"noResponse",unavailable:"unavailable",stale:"staleData"}
  for (const el of root.children) {
    put(el, ".probe-carrier", t($(".probe-carrier", el).dataset.carrier))
    const p = (node.probes || []).find(x => x.id === el.dataset.probe)
    let status = p?.status || (node.last_seen ? "awaiting_agent" : "pending")
    if (stale && status === "ok") status = "stale"
    const valid = status === "ok" && Number.isFinite(p?.avg_ms)
    put(el, ".probe-value", valid ? `${p.avg_ms.toFixed(1)} ms` : t(statuses[status] || "probePending"))
    const hasLoss = ["ok", "timeout"].includes(status) && Number.isFinite(p?.loss_percent)
    put(el, ".probe-loss", hasLoss ? `${p.loss_percent.toFixed(1)}%` : "—")
    el.classList.toggle("probe-good", valid && p.loss_percent === 0)
    el.classList.toggle("probe-warn", status === "timeout" || valid && p.loss_percent > 0)
    el.classList.toggle("probe-muted", !valid && status !== "timeout")
    const recent = p?.checked_at ? t("lastTest", { time: time(p.checked_at) }) : status === "awaiting_agent" ? t("updateAgent") : t("waitingProbe")
    put(el, ".probe-checked", recent)
    el.title = [recent, Number.isFinite(p?.min_ms) ? t("latestRound", { min: p.min_ms.toFixed(1), avg: p.avg_ms.toFixed(1), max: p.max_ms.toFixed(1) }) : "", p?.window_sent ? t("lossWindow", { received: p.window_received, sent: p.window_sent, loss: p.loss_percent.toFixed(1) }) : t("noLossSample")].filter(Boolean).join("\n")
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
    UI.translate(card)
    const id = `card-detail-${++detailSequence}`
    $(".details", card).id = id; $(".details-button", card).setAttribute("aria-controls", id)
    cards.set(node.id, card)
  }
  common(card, node)
  put(card, "h3", node.name); put(card, ".region", node.region)
  for (const field of ["provider", "network", "plan"]) { put(card, `.${field}`, node[field] || ""); $(`.${field}`, card).hidden = !node[field] }
  const m = node.metrics, s = node.system
  put(card, ".cores", s ? `${s.cpu_cores} vCPU` : "— vCPU")
  put(card, ".os", s?.os || t("waitingAgent"))
  $(".os", card).title = s?.os || ""
  const hasMetrics = !!(m && s)
  for (const [key, value] of [["cpu", m?.cpu], ["memory", percent(m?.mem_used, s?.mem_total)], ["disk", percent(m?.disk_used, s?.disk_total)]]) {
    put(card, `.${key} strong`, hasMetrics ? `${number(value).toFixed(1)}%` : "—")
    meter(card, `.${key} .bar`, hasMetrics ? value : 0)
  }
  put(card, ".cpu-hint", s?.arch || t("usage"))
  put(card, ".memory-size", hasMetrics ? `${bytes(m.mem_used)} / ${bytes(s.mem_total)}` : "— / —")
  put(card, ".disk-size", hasMetrics ? `${bytes(m.disk_used)} / ${bytes(s.disk_total)}` : "— / —")
  put(card, ".rx", m && node.online ? bytes(m.net_rx, true) : "—")
  put(card, ".tx", m && node.online ? bytes(m.net_tx, true) : "—")
  put(card, ".total-traffic", m ? bytes(number(m.total_rx) + number(m.total_tx)) : "—")
  put(card, ".uptime", m ? `${t("runtime").replace("—", "").trim()} ${duration(m.uptime)}` : t("waitingAgent"))
  put(card, ".details-button", expanded.has(node.id) ? t("collapseData") : t("showDetails"))
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
    UI.translate(row)
    const extra = document.createElement("tr"), cell = document.createElement("td")
    extra.className = "row-detail"; cell.colSpan = 10
    const probesCell = document.createElement("td"), probes = document.createElement("div")
    probesCell.className = "row-probes"; probes.className = "probe-summary"; probesCell.append(probes)
    row.insertBefore(probesCell, row.children[2])
    const details = $(".details", $("#node-template").content).cloneNode(true)
    UI.translate(details)
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
  put(row, ".details-button", expanded.has(node.id) ? t("collapse") : t("detailShort"))
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
  const signature = JSON.stringify([allLabel, entries])
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
  put(document, "#site-subtitle", subtitle && subtitle !== "PRIVATE INFRASTRUCTURE TELEMETRY" ? subtitle : t("heroSubtitle"))
  document.title = `${state.site?.name || "CORENET PULSE"} · ${stale ? t("pageTitleStale") : t("nodesOnline", { online: online.length, total: nodes.length })}`
  put(document, "#fleet-ratio", `${online.length} / ${nodes.length}`)
  put(document, "#fleet-status", stale ? t("lastNodeState") : !nodes.length ? t("noNodesYet") : online.length === nodes.length ? t("allNodesHealthy") : t("onlineRate", { rate: (online.length / nodes.length * 100).toFixed(0) }))
  put(document, "#fleet-offline", offline + pending)
  $("#fleet-offline").parentElement.classList.toggle("attention", offline > 0)
  put(document, "#offline-breakdown", t("breakdown", { offline, pending }))
  put(document, "#fleet-rx", bytes(online.reduce((sum, n) => sum + number(n.metrics?.net_rx), 0), true))
  put(document, "#fleet-tx", bytes(online.reduce((sum, n) => sum + number(n.metrics?.net_tx), 0), true))
  const avg = f => sampled.length ? `${(sampled.reduce((sum, n) => sum + f(n), 0) / sampled.length).toFixed(1)}%` : "—"
  put(document, "#fleet-cpu", avg(n => number(n.metrics.cpu)))
  put(document, "#fleet-memory", avg(n => percent(n.metrics.mem_used, n.system.mem_total)))
  put(document, "#last-sync", time(state.generated_at))
  put(document, "#node-count", nodes.length)
  put(document, "#region-count", t("regionsCount", { n: new Set(nodes.map(n => n.country).filter(Boolean)).size }))
  const systems = nodes.filter(n => n.system)
  put(document, "#core-count", systems.length ? `${systems.reduce((s, n) => s + number(n.system.cpu_cores), 0)} vCPU` : "— vCPU")
  put(document, "#memory-total", t("memorySpec", { value: systems.length ? bytes(systems.reduce((s, n) => s + number(n.system.mem_total), 0)) : "—" }))
  $(".fleet-facts").title = t("resourceTotalTitle")
  filterOptions("#country-filter", [...new Set(nodes.map(n => n.country).filter(Boolean))].sort().map(c => [c, countryName(c)]), t("allRegions"))
  filterOptions("#provider-filter", [...new Set(nodes.map(n => n.provider).filter(Boolean))].sort(collator.compare).map(p => [p, p]), t("allProviders"))
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
  if (!state.nodes.length) { put(document, "#empty strong", t("noNodesYet")); put(document, "#empty p", t("addNodeHint")) }
  else { put(document, "#empty strong", t("noMatches")); put(document, "#empty p", t("tryFilters")) }
  $("#loading").hidden = true
  $("#clear-filters").hidden = !query && status === "all" && country === "all" && provider === "all"
  put(document, "#result-count", filtered.length ? t("showing", { from: start + 1, to: start + visible.length, matched: filtered.length, total: state.nodes.length }) : t("matchedZero", { total: state.nodes.length }))
  put(document, "#page-info", t("pageInfo", { page, pages }))
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
  el.textContent = stale ? t("dataNeedsUpdate") : state ? (streamReady ? t("liveUpdate") : t("timedUpdate")) : t("connecting")
  document.body.dataset.stale = String(stale)
  $("#data-warning").hidden = !stale
  if (stale) put(document, "#warning-copy", state ? t("staleWarning", { time: time(state.generated_at) }) : t("unavailableWarning"))
}
function markStale() {
  if (stale) return
  stale = true; connection()
  if (state) { renderSummary(); renderVisible() }
  else put(document, "#loading", t("noData"))
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
document.addEventListener("pulse:language", () => {
  refreshFormatters(); UI.translate()
  // Filters and pagination can detach cached elements from the document.
  for (const card of cards.values()) UI.translate(card)
  for (const { row, extra } of rows.values()) { UI.translate(row); UI.translate(extra) }
  connection()
  if (state) { renderSummary(); renderVisible() }
  else if (stale) put(document, "#loading", t("noData"))
  tick(); savePreferences()
})
document.addEventListener("visibilitychange", () => { if (document.hidden) stopStream(); else { if (state && Date.now() - receivedAt > STALE_MS) markStale(); connect(); requestRefresh() } })
window.addEventListener("pagehide", stopStream)
function tick() { $("#clock").textContent = dateFormat.format(new Date()); if (state && Date.now() - receivedAt > STALE_MS) markStale() }
tick(); setInterval(tick, 1000); setInterval(requestRefresh, 15000)
connect(); requestRefresh()
