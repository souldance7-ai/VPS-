const $ = (selector, root = document) => root.querySelector(selector)
const text = (root, selector, value) => { const node = $(selector, root); if (node) node.textContent = value }
const FLAGS = { JP: "🇯🇵", TW: "🇹🇼", HK: "🇭🇰", KR: "🇰🇷", US: "🇺🇸", SG: "🇸🇬" }

function bytes(value, rate = false) {
  if (!value) return `0 B${rate ? "/s" : ""}`
  const units = ["B", "KB", "MB", "GB", "TB", "PB"]
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1)
  const amount = value / 1024 ** index
  const digits = amount >= 100 || index === 0 ? 0 : amount >= 10 ? 1 : 2
  return `${amount.toFixed(digits)} ${units[index]}${rate ? "/s" : ""}`
}

function pct(used, total) { return total > 0 ? Math.min(100, used / total * 100) : 0 }
function uptime(seconds) {
  if (!seconds) return "—"
  const days = Math.floor(seconds / 86400), hours = Math.floor(seconds % 86400 / 3600), mins = Math.floor(seconds % 3600 / 60)
  return days ? `${days}D ${hours}H` : hours ? `${hours}H ${mins}M` : `${mins}M`
}
function time(ts) { return ts ? new Intl.DateTimeFormat("zh-TW", {hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZone:"Asia/Taipei"}).format(ts * 1000) : "—" }

function setMeter(card, selector, value) {
  const metric = $(selector, card)
  const rounded = Math.max(0, Math.min(100, value || 0))
  text(metric, "strong", `${rounded.toFixed(1)}%`)
  $(".bar i", metric).style.width = `${rounded}%`
  $(".bar", metric).className = `bar${rounded >= 90 ? " danger" : rounded >= 75 ? " warn" : ""}`
}

function spark(card, points) {
  const svg = $(".spark", card), line = $(".spark-line", svg), fill = $(".spark-fill", svg)
  if (!points?.length) { line.setAttribute("d", ""); fill.setAttribute("d", ""); return }
  const values = points.map(p => (p.net_rx || 0) + (p.net_tx || 0))
  const max = Math.max(...values, 1), last = Math.max(values.length - 1, 1)
  const coords = values.map((v, i) => [i / last * 240, 50 - v / max * 44])
  const path = coords.map(([x,y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  line.setAttribute("d", path); fill.setAttribute("d", `${path} L240,54 L0,54 Z`)
}

function renderNode(node) {
  const card = $("#node-template").content.firstElementChild.cloneNode(true)
  card.dataset.id = node.id
  card.classList.toggle("offline", !node.online)
  text(card, ".flag", FLAGS[node.country] || "◈")
  text(card, "h3", node.name); text(card, ".region", node.region)
  text(card, ".provider", node.provider); text(card, ".network", node.network); text(card, ".plan", node.plan)
  text(card, ".status-pill b", node.online ? "ONLINE" : node.last_seen ? "OFFLINE" : "PENDING")
  const m = node.metrics, s = node.system
  if (m && s) {
    setMeter(card, ".cpu", m.cpu); setMeter(card, ".memory", pct(m.mem_used, s.mem_total)); setMeter(card, ".disk", pct(m.disk_used, s.disk_total))
    text(card, ".rx", bytes(m.net_rx, true)); text(card, ".tx", bytes(m.net_tx, true))
    text(card, ".os", `${s.os} · ${s.cpu_cores}C`); text(card, ".uptime", `UP ${uptime(m.uptime)}`)
    text(card, ".load", m.load.map(v => v.toFixed(2)).join(" / "))
    text(card, ".connections", `TCP ${m.tcp} · UDP ${m.udp}`); text(card, ".processes", String(m.procs))
    text(card, ".traffic", `↓ ${bytes(m.total_rx)} · ↑ ${bytes(m.total_tx)}`)
  }
  spark(card, node.history)
  $("button", card).addEventListener("click", () => {
    const details = $(".details", card); details.hidden = !details.hidden
    text(card, "button", details.hidden ? "展開詳情 ↗" : "收起詳情 ↙")
  })
  return card
}

async function refresh() {
  const response = await fetch("/api/public/state", { cache: "no-store" })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const state = await response.json()
  text(document, "#site-name", state.site.name); text(document, "#site-subtitle", state.site.subtitle)
  document.title = `${state.site.name} · ${state.summary.online}/${state.summary.total} ONLINE`
  const allOnline = state.summary.total > 0 && state.summary.online === state.summary.total
  text(document, "#fleet-status", allOnline ? "ALL SYSTEMS NOMINAL" : state.summary.online ? "PARTIAL SERVICE" : "AWAITING SIGNAL")
  text(document, "#fleet-ratio", `${state.summary.online} / ${state.summary.total} ONLINE`)
  text(document, "#fleet-rx", bytes(state.summary.net_rx, true)); text(document, "#fleet-tx", bytes(state.summary.net_tx, true))
  text(document, "#last-sync", time(state.generated_at))
  const grid = $("#node-grid"); grid.replaceChildren(...state.nodes.map(renderNode))
}

function connect() {
  const status = $("#connection-state")
  const stream = new EventSource("/api/public/events")
  stream.addEventListener("ready", () => { status.textContent = "LIVE CHANNEL"; status.classList.add("live") })
  stream.addEventListener("update", () => refresh().catch(() => {}))
  stream.onerror = () => { status.textContent = "RECONNECTING"; status.classList.remove("live") }
}

setInterval(() => { $("#clock").textContent = `${new Date().toISOString().slice(11,19)} UTC` }, 1000)
refresh().then(connect).catch(() => { $("#connection-state").textContent = "OFFLINE" })
setInterval(() => refresh().catch(() => {}), 15000)

