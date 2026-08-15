#!/usr/bin/env bash
# Publish the latest route report to NT ROUTE LAB
# Version: 2.0.0

set -u
export LANG=C.UTF-8 LC_ALL=C.UTF-8 NO_COLOR=1

SCRIPT_VERSION="2.0.0"
SITE="${REPORT_SITE:-https://naiba-taiwan-route-report.souldance4.chatgpt.site}"
REPORT_DIR=""
REPORT_NAME=""
DRY_RUN=0

usage() {
    printf '%s\n' \
      '自动读取最新三网去程／回程结果，生成 NT ROUTE LAB 卡片式公开报告。' \
      '' '用法：' \
      '  bash publish-latest.sh' \
      '  bash publish-latest.sh --name "VPS名称"' \
      '  bash publish-latest.sh --dir /root/3NET_DUALWAY_xxx' \
      '  bash publish-latest.sh --dry-run' \
      '' '每次上传都会生成独立 /report/编号，不覆盖既有报告。' \
      '公开逐跳中的 IPv4 后两段与完整 IPv6 均会遮罩；ASN、城市、延迟与跳数保留。'
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --name) [[ $# -ge 2 ]] || exit 64; REPORT_NAME="$2"; shift 2 ;;
        --dir) [[ $# -ge 2 ]] || exit 64; REPORT_DIR="$2"; shift 2 ;;
        --dry-run) DRY_RUN=1; shift ;;
        -h|--help) usage; exit 0 ;;
        *) echo "🔴 未知参数：$1"; usage; exit 64 ;;
    esac
done

for cmd in find sort head sed python3; do
    command -v "$cmd" >/dev/null 2>&1 || { echo "🔴 缺少必要命令：$cmd"; exit 10; }
done

if [[ -z "$REPORT_DIR" ]]; then
    REPORT_DIR="$({ find /root -maxdepth 1 -mindepth 1 -type d -name '3NET_DUALWAY_*' -printf '%T@ %p\n' 2>/dev/null || true; } | sort -nr | head -n 1 | sed 's/^[^ ]* //')"
fi

if [[ -z "$REPORT_DIR" || ! -f "$REPORT_DIR/00_检测摘要.txt" || ! -d "$REPORT_DIR/raw" ]]; then
    echo "🔴 找不到有效的三网检测目录。请先执行 3net-dualway.sh，或用 --dir 指定。"
    exit 2
fi

echo "============================================================"
echo "NT ROUTE LAB｜公开报告上传"
echo "上传器版本：v$SCRIPT_VERSION"
echo "读取目录：$REPORT_DIR"
echo "目标网站：$SITE"
echo "版型：奶爸台湾卡片式逐跳报告"
echo "============================================================"

export PUBLISH_REPORT_DIR="$REPORT_DIR" PUBLISH_REPORT_NAME="$REPORT_NAME"
export PUBLISH_REPORT_SITE="$SITE" PUBLISH_DRY_RUN="$DRY_RUN"

python3 - <<'PY'
from __future__ import annotations
import datetime as dt
import ipaddress
import json
import os
import re
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

VERSION = "2.0.0"
ROOT = Path(os.environ["PUBLISH_REPORT_DIR"])
NAME_OVERRIDE = os.environ.get("PUBLISH_REPORT_NAME", "").strip()
SITE = os.environ.get("PUBLISH_REPORT_SITE", "https://naiba-taiwan-route-report.souldance4.chatgpt.site").rstrip("/")
DRY_RUN = os.environ.get("PUBLISH_DRY_RUN") == "1"
API = f"{SITE}/api/reports"

FILE_RE = re.compile(r"^\d+_(RETURN|FORWARD)_IPV([46])_(CT|CU|CM)_(ICMP|TCP443)\.txt$", re.I)
HOP_RE = re.compile(r"^\s*(\d{1,2})\s+([^\s]+)(.*)$")
IPV4_RE = re.compile(r"(?<![\d.])((?:\d{1,3}\.){3}\d{1,3})(?![\d.])")
IPV6_RE = re.compile(r"(?<![0-9a-f:])(?:[0-9a-f]{0,4}:){3,}[0-9a-f:]{0,4}(?![0-9a-f:])", re.I)
MS_RE = re.compile(r"(\d+(?:\.\d+)?)\s*ms", re.I)
URL_RE = re.compile(r"https?://[^\s<>'\"]+")
CARRIER = {"CT": ("ct", "中国电信"), "CU": ("cu", "中国联通"), "CM": ("cm", "中国移动")}
CITY_MAP = {"xi'an": "西安", "xian": "西安", "wuhan": "武汉", "beijing": "北京", "shanghai": "上海", "guangzhou": "广州", "shenzhen": "深圳", "chengdu": "成都", "nanjing": "南京", "hangzhou": "杭州", "chongqing": "重庆"}

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")

def summary_value(text: str, key: str) -> str:
    match = re.search(rf"^{re.escape(key)}[：:]\s*(.+?)\s*$", text, re.M)
    return match.group(1).strip() if match else ""

def mask_ip(value: str) -> str:
    token = value.strip("[](),<>")
    try:
        addr = ipaddress.ip_address(token)
    except ValueError:
        return value
    if addr.version == 4:
        parts = token.split(".")
        masked = f"{parts[0]}.{parts[1]}.*.*"
    else:
        parts = addr.exploded.split(":")
        masked = f"{parts[0]}:{parts[1]}:****:****"
    return value.replace(token, masked)

def mask_tested_vps(text: str, v4: str, v6: str) -> str:
    if v4 and is_ip(v4):
        text = text.replace(v4, mask_ip(v4))
    if v6 and is_ip(v6):
        text = text.replace(v6, mask_ip(v6))
    return text

def is_ip(token: str) -> bool:
    try:
        ipaddress.ip_address(token.strip("[](),<>"))
        return True
    except ValueError:
        return False

def extract_target(text: str) -> str:
    value = summary_value(text, "目标 IP")
    return value if is_ip(value) else ""

def extract_map(text: str) -> str:
    for url in URL_RE.findall(text):
        clean = url.rstrip(".,;)")
        lower = clean.lower()
        if "tracemap" in lower or "peer.as/trace" in lower or ("nxtrace" in lower and "map" in lower):
            return clean
    return ""

def extract_source(text: str) -> str:
    for line in text.splitlines():
        match = re.search(r">\s*([^,|]+),\s*CN\b", line, re.I)
        if match:
            source = match.group(1).strip()
            return CITY_MAP.get(source.lower(), source)
    for english, chinese in CITY_MAP.items():
        if re.search(rf"\b{re.escape(english)}\b", text, re.I):
            return chinese
    return "远端探针"

def route_tags(text: str) -> list[str]:
    upper = text.upper()
    rules = [
        ("CN2 GIA", ("AS4809", "CN2 GIA")), ("CN2", ("59.43.", "CN2")),
        ("CUII 9929", ("AS9929", "CUII")), ("CU169", ("AS4837", "CHINA169")),
        ("CMIN2", ("AS58807", "CMIN2")), ("CMI", ("AS58453", "CMI")),
        ("CMNET", ("AS9808", "CMNET")), ("CHINANET", ("AS4134", "CHINANET")),
    ]
    found = [label for label, needles in rules if any(needle in upper for needle in needles)]
    return found or ["逐跳实测"]

def hop_rows(text: str) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for line in text.splitlines():
        match = HOP_RE.match(line)
        if not match:
            continue
        hop = int(match.group(1))
        token, rest = match.group(2).strip("[](),"), match.group(3)
        if token == "*":
            rows.append({"hop": hop, "ip": "*", "line": f"{hop:02d}  *", "values": []})
            continue
        ip = token if is_ip(token) else ""
        if not ip:
            candidates = IPV4_RE.findall(rest) + IPV6_RE.findall(rest)
            ip = next((candidate for candidate in candidates if is_ip(candidate)), "")
        if not ip:
            continue
        values = [float(value) for value in MS_RE.findall(rest)]
        rows.append({"hop": hop, "ip": ip, "line": line.strip(), "values": values})
    return rows

def parse_file(path: Path) -> dict[str, Any]:
    text = read(path)
    match = FILE_RE.match(path.name)
    assert match
    direction, family, carrier, protocol = (part.upper() for part in match.groups())
    rows = hop_rows(text)
    target = extract_target(text)
    target_row = next((row for row in rows if row["ip"].lower() == target.lower()), None) if target else None
    visible = [row for row in rows if row["ip"] != "*"]
    last = visible[-1] if visible else None
    return {
        "text": text, "direction": direction, "family": f"IPv{family}", "carrier": carrier,
        "protocol": "TCP/443" if protocol == "TCP443" else "ICMP", "rows": rows,
        "target": target, "reached": target_row is not None,
        "reachedHop": target_row["hop"] if target_row else None,
        "lastHop": last["hop"] if last else None, "last": last,
        "noProbe": bool(re.search(r"no matching .*probes|no probes available", text, re.I)),
        "mapUrl": extract_map(text), "source": extract_source(text), "tags": route_tags(text),
    }

def choose(items: list[dict[str, Any]]) -> tuple[dict[str, Any], str, str]:
    icmp = next((item for item in items if item["protocol"] == "ICMP"), None)
    tcp = next((item for item in items if item["protocol"] == "TCP/443"), None)
    if icmp and icmp["reached"]:
        return icmp, "ICMP", "目标已由 ICMP 确认回应。"
    if tcp and tcp["reached"]:
        return tcp, "TCP/443", "ICMP 未确认目标，TCP/443 补测已确认到达。"
    candidates = [item for item in (icmp, tcp) if item]
    selected = max(candidates, key=lambda item: item["lastHop"] or 0)
    protocol = "ICMP + TCP/443" if icmp and tcp else selected["protocol"]
    return selected, protocol, "目标未回应，只能确认最后可见跳数；30 跳不是实际到达跳数。"

summary = read(ROOT / "00_检测摘要.txt")
name = NAME_OVERRIDE or summary_value(summary, "显示名称") or summary_value(summary, "产品名称") or "VPS"
public_v4 = summary_value(summary, "公网 IPv4")
public_v6 = summary_value(summary, "公网 IPv6")
test_time = summary_value(summary, "检测时间") or dt.datetime.now().astimezone().isoformat()
nexttrace = summary_value(summary, "NextTrace") or "NextTrace"
target_v4 = mask_ip(public_v4) if is_ip(public_v4) else "不可用"
ipv6_available = bool(public_v6 and public_v6 not in {"不可用", "未检测到"} and is_ip(public_v6))
measurements = [parse_file(path) for path in sorted((ROOT / "raw").glob("*.txt")) if FILE_RE.match(path.name)]
if not measurements:
    print("🔴 raw 目录中没有可识别的检测结果。")
    raise SystemExit(4)

routes: list[dict[str, Any]] = []
for direction in ("FORWARD", "RETURN"):
    for family in ("IPv4", "IPv6"):
        for carrier_code, (carrier_id, carrier_name) in CARRIER.items():
            items = [item for item in measurements if item["direction"] == direction and item["family"] == family and item["carrier"] == carrier_code]
            if not items:
                continue
            selected, protocol, protocol_note = choose(items)
            source = selected["source"] if direction == "FORWARD" else name
            destination = name if direction == "FORWARD" else f"上海{carrier_name[2:]}"
            reached = selected["reached"]
            no_probe = all(item["noProbe"] for item in items)
            last = selected["last"]
            values = next((row["values"] for row in selected["rows"] if row["hop"] == selected["reachedHop"]), []) if reached else (last["values"] if last else [])
            latency = "–"
            if values:
                latency = f"{min(values):.2f}–{max(values):.2f} ms" if len(values) > 1 else f"{values[0]:.2f} ms"
            if no_probe:
                status, result = "unavailable", "没有匹配探针"
            elif reached:
                status, result = "ok", f"第 {selected['reachedHop']} 跳到达"
            elif selected["lastHop"]:
                status, result = "partial", f"最后响应第 {selected['lastHop']} 跳"
            else:
                status, result = "unavailable", "没有可见响应"
            raw_lines = [row["line"] for row in selected["rows"]] or ["本项没有可展示的逐跳响应。"]
            backbone = " + ".join(selected["tags"][:3])
            note = "远端探针暂不可用；这不代表目标网络故障。" if no_probe else f"{protocol_note} 骨干识别：{backbone}。"
            routes.append({
                "id": f"{direction.lower()}-{family.lower()}-{carrier_id}", "carrier": carrier_id,
                "carrierName": carrier_name, "direction": direction.lower(), "family": family,
                "protocol": protocol, "title": f"{carrier_name} · {selected['source'] if direction == 'FORWARD' else '上海'}",
                "endpoint": mask_tested_vps(selected["target"] or destination, public_v4, public_v6), "path": f"{source} → {destination}",
                "backbone": backbone, "status": status, "result": result, "latency": latency,
                "note": note, "mapUrl": selected["mapUrl"], "raw": mask_tested_vps("\n".join(raw_lines), public_v4, public_v6),
            })

if not routes:
    print("🔴 没有可发布的路线卡。")
    raise SystemExit(5)
run_id_match = re.search(r"(\d{8}_\d{6})$", ROOT.name)
run_id = run_id_match.group(1).replace("_", "-") if run_id_match else dt.datetime.now().strftime("%Y%m%d-%H%M%S")
payload = {
    "schemaVersion": "nt-route-lab/v1", "name": name, "targetV4": target_v4,
    "ipv6Status": "已检测并生成 IPv6 路由卡" if ipv6_available else "未配置或未检测到公网 IPv6",
    "testTime": test_time, "runId": run_id, "nexttraceVersion": nexttrace,
    "notice": "仅被测 VPS 地址已脱敏；探针与中间逐跳地址保留。目标真正回应才标记到达；目标不回应时仅显示最后响应跳数，30 跳不作为实际到达跳数。",
    "routes": routes,
}
payload_text = mask_tested_vps(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), public_v4, public_v6)
payload = json.loads(payload_text)
public_json = ROOT / "NT_ROUTE_LAB_公开上传数据_已脱敏.json"
public_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
published_text = public_json.read_text(encoding="utf-8")
if (public_v4 and is_ip(public_v4) and public_v4 in published_text) or (public_v6 and is_ip(public_v6) and public_v6 in published_text):
    print("🔴 被测 VPS 地址脱敏自检失败，已经停止上传。")
    raise SystemExit(6)
if DRY_RUN:
    print("🟢 NT ROUTE LAB 数据生成及隐私自检通过。")
    print(f"脱敏数据：{public_json}")
    raise SystemExit(0)

request = urllib.request.Request(API, data=json.dumps(payload, ensure_ascii=False).encode("utf-8"), headers={"Content-Type": "application/json; charset=utf-8", "Accept": "application/json", "User-Agent": f"nt-route-lab-publisher/{VERSION}"}, method="POST")
try:
    with urllib.request.urlopen(request, timeout=60) as response:
        public_url = json.loads(response.read().decode("utf-8", "replace"))["url"]
except urllib.error.HTTPError as exc:
    detail = exc.read().decode("utf-8", "replace")[:400]
    print(f"🔴 上传失败｜HTTP {exc.code}｜{detail}")
    print(f"脱敏数据已保留：{public_json}")
    raise SystemExit(7)
except Exception as exc:
    print(f"🔴 上传失败｜{exc}")
    print(f"脱敏数据已保留：{public_json}")
    raise SystemExit(8)

lines = [f"## {name}｜中国三网 IPv4／IPv6 去程回程检测", "", f"[🔗 打开 NT ROUTE LAB 动态报告]({public_url})", "", f"- 测试目标：{target_v4}", f"- 检测时间：{test_time}", f"- IPv6：{payload['ipv6Status']}"]
for route in routes:
    lines.append(f"- {route['family']}｜{'去程' if route['direction']=='forward' else '回程'}｜{route['carrierName']}：{route['backbone']}｜{route['result']}｜{route['latency']}")
lines += ["", "> 目标真正回应才标记到达；星号不等于真实丢包；30 跳只是探测上限。"]
node_text = "\n".join(lines)
node_file = ROOT / "NodeSeek_论坛复制代码.txt"
node_file.write_text(node_text + "\n", encoding="utf-8")
print("============================================================")
print("🟢 NT ROUTE LAB 公开报告上传成功")
print("============================================================")
print(f"公开网址：{public_url}")
print(f"脱敏数据：{public_json}")
print(f"论坛代码：{node_file}")
print()
print("================ NodeSeek／Markdown 直接复制 ================")
print(node_text)
print("============================================================")
PY
