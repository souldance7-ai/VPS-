#!/usr/bin/env bash
# Publish the latest generic China 3-network dual-way route report
# Version: 1.0.1

set -u

export LANG=C.UTF-8
export LC_ALL=C.UTF-8
export NO_COLOR=1

SCRIPT_VERSION="1.0.1"
SITE="${REPORT_SITE:-https://china-3net-route-report.souldance4.chatgpt.site}"
REPORT_DIR=""
REPORT_NAME=""
DRY_RUN=0

usage() {
    cat <<'EOF'
自动读取最新三网去程／回程结果，脱敏后上传公开报告网站。

用法：
  bash publish-latest.sh
  bash publish-latest.sh --name "奶爸台湾"
  bash publish-latest.sh --dir /root/3NET_DUALWAY_xxx
  bash publish-latest.sh --dry-run

参数：
  --name       覆盖公开报告显示名称
  --dir        指定报告目录；默认自动寻找 /root/3NET_DUALWAY_* 最新目录
  --dry-run    只生成脱敏 JSON，不实际上传
  -h, --help   显示帮助

隐私：
  仅上传解析后的统计、骨干标签和脱敏地址；不会上传原始逐跳日志。
  IPv4 只保留前两段，例如 152.175.*.*。
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --name)
            [[ $# -ge 2 ]] || { echo "🔴 --name 缺少参数"; exit 64; }
            REPORT_NAME="$2"
            shift 2
            ;;
        --dir)
            [[ $# -ge 2 ]] || { echo "🔴 --dir 缺少参数"; exit 64; }
            REPORT_DIR="$2"
            shift 2
            ;;
        --dry-run)
            DRY_RUN=1
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "🔴 未知参数：$1"
            usage
            exit 64
            ;;
    esac
done

for CMD in find sort head sed python3; do
    if ! command -v "$CMD" >/dev/null 2>&1; then
        echo "🔴 缺少必要命令：$CMD"
        exit 10
    fi
done

if [[ -z "$REPORT_DIR" ]]; then
    REPORT_DIR="$({
        find /root -maxdepth 1 -mindepth 1 -type d -name '3NET_DUALWAY_*' \
            -printf '%T@ %p\n' 2>/dev/null || true
    } | sort -nr | head -n 1 | sed 's/^[^ ]* //')"
fi

if [[ -z "$REPORT_DIR" || ! -d "$REPORT_DIR" ]]; then
    echo "🔴 找不到三网检测目录。"
    echo "请先执行 3net-dualway.sh，或使用 --dir 指定目录。"
    exit 2
fi

if [[ ! -f "$REPORT_DIR/00_检测摘要.txt" || ! -d "$REPORT_DIR/raw" ]]; then
    echo "🔴 目录不是有效的三网检测结果：$REPORT_DIR"
    exit 3
fi

echo "============================================================"
echo "中国三网公开报告自动上传"
echo "上传器版本：v$SCRIPT_VERSION"
echo "============================================================"
echo "读取目录：$REPORT_DIR"
echo "公开网站：$SITE"
echo "隐私规则：IPv4 后两段脱敏；不上传原始逐跳日志"
[[ -n "$REPORT_NAME" ]] && echo "报告名称：$REPORT_NAME"
[[ "$DRY_RUN" == "1" ]] && echo "运行模式：DRY-RUN，不实际上传"
echo "============================================================"

export PUBLISH_REPORT_DIR="$REPORT_DIR"
export PUBLISH_REPORT_NAME="$REPORT_NAME"
export PUBLISH_REPORT_SITE="$SITE"
export PUBLISH_DRY_RUN="$DRY_RUN"

python3 - <<'PY'
from __future__ import annotations

import datetime as dt
import json
import os
import re
import statistics
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

VERSION = "1.0.1"
REPORT_DIR = Path(os.environ["PUBLISH_REPORT_DIR"])
NAME_OVERRIDE = os.environ.get("PUBLISH_REPORT_NAME", "").strip()
SITE = os.environ.get(
    "PUBLISH_REPORT_SITE",
    "https://china-3net-route-report.souldance4.chatgpt.site",
).rstrip("/")
DRY_RUN = os.environ.get("PUBLISH_DRY_RUN") == "1"
API = f"{SITE}/api/reports"

CARRIER_NAMES = {"CT": "中国电信", "CU": "中国联通", "CM": "中国移动"}
FILE_RE = re.compile(
    r"^\d+_(RETURN|FORWARD)_IPV([46])_(CT|CU|CM)_(ICMP|TCP443)\.txt$",
    re.I,
)
IPV4_RE = re.compile(r"(?<![\d.])((?:\d{1,3}\.){3}\d{1,3})(?![\d.])")
ASN_RE = re.compile(r"\bAS(\d{2,10})\b", re.I)
HOP_RE = re.compile(r"^\s*(\d+)\s+([^\s]+)(.*)$")
MS_RE = re.compile(r"(\d+(?:\.\d+)?)\s*ms", re.I)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def summary_value(text: str, key: str) -> str:
    match = re.search(rf"^{re.escape(key)}[：:]\s*(.+?)\s*$", text, re.M)
    return match.group(1).strip() if match else ""


def valid_ipv4(ip: str) -> bool:
    try:
        parts = [int(x) for x in ip.split(".")]
        return len(parts) == 4 and all(0 <= x <= 255 for x in parts)
    except ValueError:
        return False


def mask_ipv4(ip: str) -> str:
    if not valid_ipv4(ip):
        return "不可用"
    p = ip.split(".")
    return f"{p[0]}.{p[1]}.*.*"


def sanitize_text(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        return mask_ipv4(match.group(1))

    return IPV4_RE.sub(repl, text)


def stars(score: int | float) -> str:
    count = max(1, min(5, round(float(score) / 20)))
    return "★" * count + "☆" * (5 - count)


def route_tags(text: str) -> list[str]:
    upper = text.upper()
    tags: list[str] = []
    rules = (
        ("CN2 GIA", ("AS4809", "CN2 GIA")),
        ("CN2", ("59.43.", "CN2")),
        ("CU 9929", ("AS9929", "CUII")),
        ("CU 4837", ("AS4837", "UNICOM-BACKBONE")),
        ("CMIN2", ("AS58807", "CMIN2")),
        ("CMI", ("AS58453", "CMI-INT")),
        ("CMNET", ("AS9808", "CMNET")),
        ("CT 163", ("AS4134", "CHINANET-BACKBONE")),
    )
    for label, needles in rules:
        if any(needle in upper for needle in needles) and label not in tags:
            tags.append(label)
    return tags or ["未识别"]


def route_class(tags: list[str]) -> str:
    priority = ("CN2 GIA", "CMIN2", "CU 9929", "CN2", "CMI", "CU 4837", "CMNET", "CT 163")
    for label in priority:
        if label in tags:
            return label
    return "普通国际／未识别"


def parse_target_ip(text: str) -> str:
    value = summary_value(text, "目标 IP")
    return value if value and value != "解析失败" else ""


def parse_hops(text: str) -> list[dict[str, Any]]:
    hops: list[dict[str, Any]] = []
    for raw_line in text.splitlines():
        match = HOP_RE.match(raw_line)
        if not match:
            continue
        hop = int(match.group(1))
        token = match.group(2).strip("[](),")
        rest = match.group(3)
        if token == "*":
            continue
        values = [float(x) for x in MS_RE.findall(rest)]
        hops.append({"hop": hop, "ip": token, "latencies": values})
    return hops


def parse_measurement(path: Path, direction: str, family: str, carrier: str, protocol: str) -> dict[str, Any]:
    text = read_text(path)
    target_ip = parse_target_ip(text)
    hops = parse_hops(text)
    last = hops[-1] if hops else None
    reached = bool(target_ip and any(str(x["ip"]).lower() == target_ip.lower() for x in hops))
    reached_hop = next((x["hop"] for x in hops if str(x["ip"]).lower() == target_ip.lower()), None)
    latency_values = [v for x in hops[-3:] for v in x["latencies"]]
    avg = round(statistics.mean(latency_values), 2) if latency_values else None
    tags = route_tags(text)
    score = 92 if reached else (62 if last else 20)
    if protocol == "TCP443" and reached:
        score = 94
    note = (
        f"目标已确认到达，第 {reached_hop} 跳"
        if reached_hop is not None
        else (
            f"目标未确认到达，最后响应第 {last['hop']} 跳"
            if last
            else "没有可见响应跳点"
        )
    )
    asns = sorted({f"AS{x}" for x in ASN_RE.findall(text)})
    return {
        "direction": direction,
        "family": f"IPv{family}",
        "carrier": carrier,
        "protocol": "TCP/443" if protocol == "TCP443" else "ICMP",
        "reached": reached,
        "lastHop": last["hop"] if last else 0,
        "reachedHop": reached_hop,
        "avg": avg,
        "tags": tags,
        "route": route_class(tags),
        "routeNote": note,
        "score": score,
        "asns": asns,
        "sourceFile": path.name,
    }


def prefer_measurement(items: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not items:
        return None
    return sorted(
        items,
        key=lambda x: (x["reached"], x["protocol"] == "TCP/443", x["lastHop"]),
        reverse=True,
    )[0]


summary_text = read_text(REPORT_DIR / "00_检测摘要.txt")
name = NAME_OVERRIDE or summary_value(summary_text, "显示名称") or summary_value(summary_text, "产品名称") or "VPS"
public_v4 = summary_value(summary_text, "公网 IPv4")
public_v6 = summary_value(summary_text, "公网 IPv6")
generated = summary_value(summary_text, "检测时间") or dt.datetime.now(dt.timezone.utc).astimezone().isoformat()
masked_v4 = mask_ipv4(public_v4)

measurements: list[dict[str, Any]] = []
for path in sorted((REPORT_DIR / "raw").glob("*.txt")):
    match = FILE_RE.match(path.name)
    if not match:
        continue
    direction, family, carrier, protocol = match.groups()
    measurements.append(
        parse_measurement(path, direction.upper(), family, carrier.upper(), protocol.upper())
    )

if not measurements:
    print("🔴 raw 目录中没有可识别的检测文件。")
    raise SystemExit(4)

carriers: list[dict[str, Any]] = []
carrier_summary: list[dict[str, Any]] = []

for carrier in ("CT", "CU", "CM"):
    carrier_items = [x for x in measurements if x["carrier"] == carrier]
    forward_selected: list[dict[str, Any]] = []
    return_selected: list[dict[str, Any]] = []
    for family in ("IPv4", "IPv6"):
        forward = prefer_measurement([
            x for x in carrier_items if x["direction"] == "FORWARD" and x["family"] == family
        ])
        returned = prefer_measurement([
            x for x in carrier_items if x["direction"] == "RETURN" and x["family"] == family
        ])
        if forward:
            forward_selected.append(forward)
        if returned:
            return_selected.append(returned)

    forward_score = round(statistics.mean(x["score"] for x in forward_selected)) if forward_selected else 0
    return_score = round(statistics.mean(x["score"] for x in return_selected)) if return_selected else 0
    available_scores = [x for x in (forward_score, return_score) if x > 0]
    score = round(statistics.mean(available_scores)) if available_scores else 0
    all_selected = forward_selected + return_selected
    all_tags = sorted({tag for x in all_selected for tag in x["tags"] if tag != "未识别"}) or ["未识别"]
    route = route_class(all_tags)
    reached_count = sum(1 for x in all_selected if x["reached"])
    coverage = reached_count / len(all_selected) if all_selected else 0.0

    # The public site uses its established three-region schema. This generic
    # detector has one nationwide carrier reference per family rather than
    # three region-specific forward probes. Keep all three compatibility rows
    # explicitly marked NATIONAL_REFERENCE so they cannot be mistaken for
    # Beijing/Shanghai/Guangdong measurements.
    forward_tags = sorted({tag for x in forward_selected for tag in x["tags"]}) or ["未识别"]
    forward_route = route_class(forward_tags)
    forward_avg = (
        round(statistics.mean(x["avg"] for x in forward_selected if x["avg"] is not None), 2)
        if any(x["avg"] is not None for x in forward_selected) else None
    )
    forward_hops = max((x["reachedHop"] or x["lastHop"] for x in forward_selected), default=0)
    forward_detail = "；".join(
        f"{x['family']}｜{x['protocol']}｜{x['routeNote']}" for x in forward_selected
    ) or "没有可用全国探针结果"
    forward_probes = []
    for region, capital in (("北京", "北京市"), ("上海", "上海市"), ("广东", "广州市")):
        forward_probes.append({
            "region": region,
            "label": f"{region}兼容栏位｜全国同运营商参考 → VPS",
            "access": CARRIER_NAMES[carrier],
            "publicIp": "",
            "verified": False,
            "route": forward_route,
            "evidence": "NATIONAL_CARRIER_REFERENCE｜非指定地区实测",
            "score": 0,
            "stars": "☆☆☆☆☆",
            "avg": forward_avg, "min": None, "max": None,
            "p95": None, "jitter": None, "stddev": None, "loss": None,
            "success": "0/0",
            "routeHops": forward_hops,
            "timeoutHops": 0,
            "backboneTags": forward_tags,
            "routeNote": f"{forward_detail}｜全国参考复制到网站兼容栏位，不冒充{region}实测。",
            "probeCapital": capital,
            "probeHealth": "NATIONAL_REFERENCE",
            "reachability": "INCONCLUSIVE",
        })

    # The generic return test genuinely targets Shanghai only. Keep Shanghai's
    # combined IPv4/IPv6 result and emit NOT-TESTED placeholders for Beijing
    # and Guangdong to satisfy the site's legacy shape without fabricating data.
    return_tags = sorted({tag for x in return_selected for tag in x["tags"]}) or ["未识别"]
    return_route = route_class(return_tags)
    return_avg = (
        round(statistics.mean(x["avg"] for x in return_selected if x["avg"] is not None), 2)
        if any(x["avg"] is not None for x in return_selected) else None
    )
    return_hops = max((x["reachedHop"] or x["lastHop"] for x in return_selected), default=0)
    return_reached = sum(1 for x in return_selected if x["reached"])
    return_detail = "；".join(
        f"{x['family']}｜{x['protocol']}｜{x['routeNote']}" for x in return_selected
    ) or "没有可用上海回程结果"
    return_probes = []
    for city in ("北京", "上海", "广东"):
        tested = city == "上海" and bool(return_selected)
        return_probes.append({
            "city": city,
            "host": f"{city}{CARRIER_NAMES[carrier][2:]}｜{'IPv4＋IPv6' if tested else '未检测'}",
            "ip": "已脱敏" if tested else "N/A",
            "targetPort": 443 if tested else 0,
            "nodeSource": "NextTrace 上海三网测试目标" if tested else "NOT-TESTED",
            "fallbackUsed": bool(tested and any(x["protocol"] == "TCP/443" for x in return_selected)),
            "route": return_route if tested else "NOT-TESTED",
            "evidence": return_detail if tested else "本次通用脚本仅检测上海回程",
            "observedClasses": return_tags if tested else [],
            "score": return_score if tested else 0,
            "stars": stars(return_score) if tested else "☆☆☆☆☆",
            "avg": return_avg if tested else None, "min": None, "max": None,
            "p95": None, "jitter": None, "stddev": None, "loss": None,
            "success": f"{return_reached}/{len(return_selected)}" if tested else "0/0",
            "routeHops": return_hops if tested else 0,
            "timeoutHops": 0,
            "backboneTags": return_tags if tested else [],
            "routeNote": return_detail if tested else "NOT-TESTED｜没有伪造地区数据",
            "probeCapital": f"{city}市" if city != "广东" else "广州市",
            "probeHealth": ("PASS" if return_reached else "INCONCLUSIVE") if tested else "NOT-TESTED",
            "reachability": ("PASS" if return_reached else "INCONCLUSIVE") if tested else "NOT-TESTED",
        })

    forward_aggregate = {
        "region": "中国三网",
        "label": f"{CARRIER_NAMES[carrier]}远端探针 → VPS",
        "access": CARRIER_NAMES[carrier],
        "publicIp": "",
        "verified": bool(forward_selected) and all(x["reached"] for x in forward_selected),
        "route": forward_route,
        "evidence": f"去程有效 {sum(1 for x in forward_selected if x['reached'])}/{len(forward_selected)}",
        "score": forward_score,
        "stars": stars(forward_score),
        "avg": forward_avg,
        "min": None, "max": None, "p95": None, "jitter": None, "stddev": None,
        "loss": None,
        "success": f"{sum(1 for x in forward_selected if x['reached'])}/{len(forward_selected)}",
        "routeHops": max((x["reachedHop"] or x["lastHop"] for x in forward_selected), default=0),
        "timeoutHops": 0,
        "backboneTags": forward_tags,
        "routeNote": "全国同运营商参考；不是北上广指定地区实测。IPv4／IPv6 合并展示。",
        "reachability": "PASS" if forward_selected and all(x["reached"] for x in forward_selected) else "INCONCLUSIVE",
    }

    carrier_record = {
        "id": carrier,
        "name": CARRIER_NAMES[carrier],
        "route": route,
        "score": score,
        "stars": stars(score),
        "probeCount": len(return_probes),
        "routeTypes": len(set(x["route"] for x in all_selected)),
        "forward": forward_aggregate,
        "forwardRoute": forward_aggregate["route"],
        "forwardProbes": forward_probes,
        "forwardScore": forward_score,
        "returnScore": return_score,
        "scoreBasis": "全国运营商去程参考＋上海回程实测；ICMP 未确认时采用 TCP/443 补测",
        "evidenceCoverage": round(coverage, 3),
        "forwardRegional": 0,
        "forwardReference": len(forward_selected),
        "bidirectional": bool(forward_selected and return_selected)
            and any(x["reached"] for x in forward_selected)
            and any(x["reached"] for x in return_selected),
        "probes": return_probes,
    }
    carriers.append(carrier_record)
    carrier_summary.append({
        "name": CARRIER_NAMES[carrier],
        "score": score,
        "route": route,
        "forwardReached": sum(1 for x in forward_selected if x["reached"]),
        "forwardTotal": len(forward_selected),
        "returnReached": sum(1 for x in return_selected if x["reached"]),
        "returnTotal": len(return_selected),
    })

final_score = round(statistics.mean(x["score"] for x in carriers))
payload = {
    "version": f"3net-dualway-publisher v{VERSION}",
    "generated": generated,
    "target": masked_v4,
    "targetPort": 443,
    "returnSshHost": masked_v4,
    "selfTest": False,
    "mode": "NEXTTRACE-DUALWAY-PARSED",
    "matrix": "北上广网站兼容格式｜去程为全国同运营商参考；回程仅上海实测",
    "methodology": (
        "去程由中国三网全国同运营商远端探针发起，不能冒充北上广指定地区实测；"
        "回程由 VPS 发往上海三网目标，北京与广东栏位明确标记 NOT-TESTED；"
        "ICMP 未确认目标时追加 TCP/443。目标真正回应才标记到达跳数，"
        "否则只标记最后响应跳数；30 跳仅为探测上限。"
    ),
    "privacy": "IPv4 仅保留前两段；未上传原始逐跳日志、完整 IPv6 或凭据。",
    "reportName": sanitize_text(name),
    "ipv6Status": "可用（地址不公开）" if public_v6 and public_v6 not in ("不可用", "未检测到") else "不可用／未检测",
    "bgp": {"asn": "解析自逐跳记录", "provider": sanitize_text(name), "location": ""},
    "final": {
        "score": final_score,
        "stars": stars(final_score),
        "title": f"{sanitize_text(name)}｜三网 IPv4＋IPv6 去程／回程",
        "elapsed": "N/A",
    },
    "carriers": carriers,
    "dedicatedLine": {
        "topology": "中国三网远端探针 ⇄ 当前 VPS",
        "portStatus": "NextTrace 报告解析完成",
        "entry": "中国电信／联通／移动远端探针",
        "entryAsn": "AS4134／AS4837／AS9808",
        "exit": masked_v4,
        "exitAsn": "按逐跳骨干标签识别",
        "internalVerdict": "仅依据可见逐跳结果判定；星号不直接视为丢包。",
    },
}

# Final recursive privacy guard. No unmasked IPv4 may leave this process.
payload_text = sanitize_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
payload = json.loads(payload_text)

public_json = REPORT_DIR / "公开上传数据_已脱敏.json"
public_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

unmasked = [ip for ip in IPV4_RE.findall(public_json.read_text(encoding="utf-8")) if valid_ipv4(ip)]
if unmasked:
    print("🔴 脱敏自检失败，已经停止上传。")
    raise SystemExit(5)


def upload() -> str:
    request = urllib.request.Request(
        API,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
            "User-Agent": f"3net-dualway-publisher/{VERSION}",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        result = json.loads(response.read().decode("utf-8", "replace"))
    for key in ("url", "reportUrl", "report_url", "publicUrl"):
        value = result.get(key)
        if value:
            value = str(value)
            return value if value.startswith("http") else f"{SITE}/{value.lstrip('/')}"
    if result.get("id"):
        return f"{SITE}/report/{result['id']}"
    raise RuntimeError("服务器已回应，但没有返回公开报告网址")


if DRY_RUN:
    print("🟢 脱敏 JSON 生成与隐私自检通过。")
    print(f"脱敏数据：{public_json}")
    raise SystemExit(0)

try:
    public_url = upload()
except urllib.error.HTTPError as exc:
    detail = exc.read().decode("utf-8", "replace")[:300]
    print(f"🟡 自动上传失败｜HTTP {exc.code}｜{detail}")
    print(f"脱敏数据：{public_json}")
    print(f"手动上传：{SITE}/")
    raise SystemExit(6)
except Exception as exc:
    print(f"🟡 自动上传失败｜{exc}")
    print(f"脱敏数据：{public_json}")
    print(f"手动上传：{SITE}/")
    raise SystemExit(7)

node_lines = [
    f"## {sanitize_text(name)}｜IPv4＋IPv6 中国三网去程／回程检测",
    "",
    f"[🔗 打开公开动态检测报告]({public_url})",
    "",
    f"- 测试目标：{masked_v4}",
    f"- 检测时间：{generated}",
    f"- IPv6：{payload['ipv6Status']}",
]
for item in carrier_summary:
    node_lines.append(
        f"- {item['name']}：{item['route']}｜{item['score']} 分｜"
        f"去程到达 {item['forwardReached']}/{item['forwardTotal']}｜"
        f"回程到达 {item['returnReached']}/{item['returnTotal']}"
    )
node_lines.extend([
    "",
    "> 中间路由器不回应 traceroute 不等于端到端丢包；30 跳是探测上限，不是实际到达跳数。",
])
node_text = "\n".join(node_lines)
node_file = REPORT_DIR / "NodeSeek_论坛复制代码.txt"
node_file.write_text(node_text + "\n", encoding="utf-8")

print("============================================================")
print("🟢 公开检测报告上传成功")
print("============================================================")
print(f"公开网址：{public_url}")
print(f"脱敏数据：{public_json}")
print(f"论坛代码：{node_file}")
print()
print("================ NodeSeek／Markdown 直接复制 ================")
print(node_text)
print("============================================================")
PY
