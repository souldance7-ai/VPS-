#!/usr/bin/env bash
# China 3-network IPv4/IPv6 forward + return route measurement
# Version: 1.0.0

set -u

export LANG=C.UTF-8
export LC_ALL=C.UTF-8
export NO_COLOR=1

SCRIPT_VERSION="1.0.0"
VPS_NAME="${VPS_NAME:-}"
EXPECTED_IP="${EXPECTED_IP:-}"
SSH_PORT="${SSH_PORT:-22}"

usage() {
    cat <<'EOF'
中国三网 IPv4／IPv6 去程＋回程逐跳检测

用法：
  bash 3net-dualway.sh
  bash 3net-dualway.sh --name "奶爸台湾"
  bash 3net-dualway.sh --name "奶爸台湾" --expected-ip 152.175.214.23
  bash 3net-dualway.sh --ssh-port 60946

参数：
  --name          报告显示名称；默认使用主机名
  --expected-ip   可选 IPv4 安全闸门；不一致时停止
  --ssh-port      生成下载指令所用 SSH 端口；默认 22
  -h, --help      显示帮助

环境变量也可使用：VPS_NAME、EXPECTED_IP、SSH_PORT
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --name)
            [[ $# -ge 2 ]] || { echo "🔴 --name 缺少参数"; exit 64; }
            VPS_NAME="$2"
            shift 2
            ;;
        --expected-ip)
            [[ $# -ge 2 ]] || { echo "🔴 --expected-ip 缺少参数"; exit 64; }
            EXPECTED_IP="$2"
            shift 2
            ;;
        --ssh-port)
            [[ $# -ge 2 ]] || { echo "🔴 --ssh-port 缺少参数"; exit 64; }
            SSH_PORT="$2"
            shift 2
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

for CMD in curl awk grep sed tr tee timeout tar getent; do
    if ! command -v "$CMD" >/dev/null 2>&1; then
        echo "🔴 缺少必要命令：$CMD"
        echo "请先安装基础工具后再执行。Debian/Ubuntu 可运行："
        echo "apt-get update && apt-get install -y curl coreutils gawk grep sed tar libc-bin"
        exit 10
    fi
done

if ! [[ "$SSH_PORT" =~ ^[0-9]+$ ]] || (( SSH_PORT < 1 || SSH_PORT > 65535 )); then
    echo "🔴 SSH 端口无效：$SSH_PORT"
    exit 64
fi

NOW="$(date +%Y%m%d_%H%M%S)"
HOST_NOW="$(hostname 2>/dev/null || echo unknown)"
[[ -n "$VPS_NAME" ]] || VPS_NAME="$HOST_NOW"

SAFE_HOST="$(printf '%s' "$HOST_NOW" | tr -cs 'A-Za-z0-9._-' '_')"
SAFE_NAME="$(printf '%s' "$VPS_NAME" | tr -cs 'A-Za-z0-9._-' '_')"
[[ -n "$SAFE_NAME" && "$SAFE_NAME" != "_" ]] || SAFE_NAME="VPS"
SAFE_REPORT_NAME="$(printf '%s' "$VPS_NAME" | sed 's#[/\\]#_#g; s/[[:cntrl:]]/_/g')"
[[ -n "$SAFE_REPORT_NAME" ]] || SAFE_REPORT_NAME="VPS"

OUT="/root/3NET_DUALWAY_${SAFE_NAME}_${SAFE_HOST}_${NOW}"
RAW="$OUT/raw"
SUMMARY="$OUT/00_检测摘要.txt"
REPORT="$OUT/${SAFE_REPORT_NAME}_IPv4_IPv6三网去程回程完整报告.txt"

mkdir -p "$RAW"

detect_v4() {
    curl -4 -fsS --connect-timeout 8 --max-time 12 https://api64.ipify.org 2>/dev/null ||
    curl -4 -fsS --connect-timeout 8 --max-time 12 https://ifconfig.co/ip 2>/dev/null ||
    curl -4 -fsS --connect-timeout 8 --max-time 12 https://icanhazip.com 2>/dev/null ||
    true
}

detect_v6() {
    curl -6 -fsS --connect-timeout 8 --max-time 12 https://api64.ipify.org 2>/dev/null ||
    curl -6 -fsS --connect-timeout 8 --max-time 12 https://icanhazip.com 2>/dev/null ||
    true
}

V4="$(detect_v4)"
V4="$(printf '%s' "$V4" | tr -d '[:space:]')"
V6="$(detect_v6)"
V6="$(printf '%s' "$V6" | tr -d '[:space:]')"

echo "============================================================"
echo "$VPS_NAME"
echo "中国三网 IPv4／IPv6 去程＋回程逐跳检测"
echo "脚本版本：v$SCRIPT_VERSION"
echo "============================================================"
echo "实际 IPv4：${V4:-未检测到}"
echo "实际 IPv6：${V6:-未检测到}"
echo "主机名称：$HOST_NOW"
echo "显示名称：$VPS_NAME"
echo "报告目录：$OUT"
[[ -n "$EXPECTED_IP" ]] && echo "安全闸门：$EXPECTED_IP"
echo
echo "检测方向："
echo "去程：中国电信／联通／移动远端探针 → $VPS_NAME"
echo "回程：$VPS_NAME → 上海电信／联通／移动"
echo
echo "不会修改代理、端口、防火墙、内核或网络优化参数。"
echo "仅在缺少 NextTrace 时安装官方完整版。"
echo "============================================================"

if [[ -z "$V4" ]]; then
    echo "🔴 未检测到公网 IPv4，停止执行。"
    exit 2
fi

if [[ -n "$EXPECTED_IP" && "$V4" != "$EXPECTED_IP" ]]; then
    echo "🔴 IPv4 安全闸门不通过。"
    echo "预期：$EXPECTED_IP"
    echo "实际：$V4"
    echo "为防止跑错服务器，已经停止。"
    exit 3
fi

echo "🟢 已确认当前 VPS 公网 IPv4：$V4"

if ! command -v nexttrace >/dev/null 2>&1; then
    echo
    echo "未发现 NextTrace，开始安装官方完整版……"
    curl -fsSL https://nxtrace.org/nt | bash
fi

NT="$(command -v nexttrace 2>/dev/null || true)"

if [[ -z "$NT" ]]; then
    echo "🔴 NextTrace 安装失败，停止执行。"
    exit 4
fi

if ! "$NT" --help 2>&1 | grep -q -- '--from'; then
    echo "当前 NextTrace 不支持远端探针，重新安装官方完整版……"
    curl -fsSL https://nxtrace.org/nt | bash
    NT="$(command -v nexttrace 2>/dev/null || true)"
fi

if [[ -z "$NT" ]] || ! "$NT" --help 2>&1 | grep -q -- '--from'; then
    echo "🔴 当前 NextTrace 不支持 --from 远端探针，停止执行。"
    exit 5
fi

{
    echo "============================================================"
    echo "$VPS_NAME｜中国三网去程／回程检测摘要"
    echo "============================================================"
    echo "脚本版本：v$SCRIPT_VERSION"
    echo "显示名称：$VPS_NAME"
    echo "主机名称：$HOST_NOW"
    echo "公网 IPv4：$V4"
    echo "公网 IPv6：${V6:-不可用}"
    echo "检测时间：$(date -Is)"
    echo "NextTrace：$("$NT" --version 2>&1 | head -n 1)"
    echo
    echo "方向定义："
    echo "去程＝中国三网远端探针 → $VPS_NAME"
    echo "回程＝$VPS_NAME → 上海三网测试目标"
    echo
} > "$SUMMARY"

target_reached() {
    local FILE="$1"
    local TARGET_IP="$2"
    [[ -n "$TARGET_IP" ]] || return 1

    awk -v target="$(printf '%s' "$TARGET_IP" | tr '[:upper:]' '[:lower:]')" '
        $1 ~ /^[0-9]+$/ {
            ip=tolower($2)
            if (ip == target) reached=1
        }
        END { exit(reached ? 0 : 1) }
    ' "$FILE"
}

last_visible_hop() {
    local FILE="$1"
    awk '
        $1 ~ /^[0-9]+$/ && $2 != "*" { hop=$1 }
        END { if (hop != "") print hop; else print "无" }
    ' "$FILE"
}

run_return() {
    local TITLE="$1" BASE="$2" IP_FLAG="$3" TARGET="$4" TARGET_IP="$5"
    local ICMP_FILE="$RAW/${BASE}_ICMP.txt"
    local TCP_FILE="$RAW/${BASE}_TCP443.txt"

    echo
    echo "############################################################"
    echo "$TITLE"
    echo "############################################################"

    {
        echo "============================================================"
        echo "$TITLE"
        echo "协议：ICMP"
        echo "目标：$TARGET"
        echo "目标 IP：${TARGET_IP:-解析失败}"
        echo "开始时间：$(date -Is)"
        echo "============================================================"

        timeout 360 "$NT" "$IP_FLAG" --route-path --max-hops 30 \
            --queries 3 --no-color "$TARGET"
        RC=$?

        echo
        echo "NextTrace 返回码：$RC"
        echo "完成时间：$(date -Is)"
    } 2>&1 | tee "$ICMP_FILE"

    local LAST
    LAST="$(last_visible_hop "$ICMP_FILE")"

    if target_reached "$ICMP_FILE" "$TARGET_IP"; then
        {
            echo "🟢 $TITLE｜ICMP 已到达目标"
            echo "目标实际到达跳数：第 $LAST 跳"
            echo
        } | tee -a "$SUMMARY"
        return
    fi

    {
        echo "🟡 $TITLE｜ICMP 未确认目标到达"
        echo "ICMP 最后可见跳数：第 $LAST 跳"
        echo "自动追加 TCP/443 检测。"
        echo
    } | tee -a "$SUMMARY"

    {
        echo "============================================================"
        echo "$TITLE"
        echo "协议：TCP/443 补测"
        echo "目标：$TARGET"
        echo "目标 IP：${TARGET_IP:-解析失败}"
        echo "开始时间：$(date -Is)"
        echo "============================================================"

        timeout 360 "$NT" "$IP_FLAG" --tcp --port 443 --route-path \
            --max-hops 30 --queries 3 --no-color "$TARGET"
        RC=$?

        echo
        echo "NextTrace 返回码：$RC"
        echo "完成时间：$(date -Is)"
    } 2>&1 | tee "$TCP_FILE"

    local LAST_TCP
    LAST_TCP="$(last_visible_hop "$TCP_FILE")"

    if target_reached "$TCP_FILE" "$TARGET_IP"; then
        {
            echo "🟢 $TITLE｜TCP/443 已到达目标"
            echo "目标实际到达跳数：第 $LAST_TCP 跳"
            echo
        } | tee -a "$SUMMARY"
    else
        {
            echo "🟡 $TITLE｜ICMP、TCP/443 均未确认目标到达"
            echo "TCP 最后可见跳数：第 $LAST_TCP 跳"
            echo "只能认定最后响应位置，不能将 30 跳探测上限当成实际跳数。"
            echo
        } | tee -a "$SUMMARY"
    fi
}

run_forward() {
    local TITLE="$1" BASE="$2" IP_FLAG="$3" TARGET_DOMAIN="$4"
    local TARGET_IP="$5" PROBE="$6"
    local ICMP_FILE="$RAW/${BASE}_ICMP.txt"
    local TCP_FILE="$RAW/${BASE}_TCP443.txt"

    echo
    echo "############################################################"
    echo "$TITLE"
    echo "############################################################"

    {
        echo "============================================================"
        echo "$TITLE"
        echo "方向：中国远端探针 → $VPS_NAME"
        echo "协议：ICMP"
        echo "探针条件：$PROBE"
        echo "目标域名：$TARGET_DOMAIN"
        echo "目标 IP：$TARGET_IP"
        echo "开始时间：$(date -Is)"
        echo "============================================================"

        timeout 420 "$NT" "$IP_FLAG" --from "$PROBE" --route-path \
            --max-hops 30 --queries 3 --no-color "$TARGET_DOMAIN"
        RC=$?

        echo
        echo "NextTrace 返回码：$RC"
        echo "完成时间：$(date -Is)"
    } 2>&1 | tee "$ICMP_FILE"

    if grep -Eqi 'no matching .*probes available|no matching IPv6 probes|no probes available' "$ICMP_FILE"; then
        {
            echo "🟡 $TITLE｜没有匹配的远端探针"
            echo "这是 Globalping 探针覆盖限制，不代表目标不可达。"
            echo
        } | tee -a "$SUMMARY"
        return
    fi

    local LAST
    LAST="$(last_visible_hop "$ICMP_FILE")"

    if target_reached "$ICMP_FILE" "$TARGET_IP"; then
        {
            echo "🟢 $TITLE｜ICMP 已到达目标"
            echo "目标实际到达跳数：第 $LAST 跳"
            echo
        } | tee -a "$SUMMARY"
        return
    fi

    {
        echo "🟡 $TITLE｜ICMP 未确认目标到达"
        echo "ICMP 最后可见跳数：第 $LAST 跳"
        echo "自动追加 TCP/443 去程检测。"
        echo
    } | tee -a "$SUMMARY"

    {
        echo "============================================================"
        echo "$TITLE"
        echo "方向：中国远端探针 → $VPS_NAME"
        echo "协议：TCP/443 补测"
        echo "探针条件：$PROBE"
        echo "目标域名：$TARGET_DOMAIN"
        echo "目标 IP：$TARGET_IP"
        echo "开始时间：$(date -Is)"
        echo "============================================================"

        timeout 420 "$NT" "$IP_FLAG" --tcp --port 443 --from "$PROBE" \
            --route-path --max-hops 30 --queries 3 --no-color "$TARGET_DOMAIN"
        RC=$?

        echo
        echo "NextTrace 返回码：$RC"
        echo "完成时间：$(date -Is)"
    } 2>&1 | tee "$TCP_FILE"

    local LAST_TCP
    LAST_TCP="$(last_visible_hop "$TCP_FILE")"

    if target_reached "$TCP_FILE" "$TARGET_IP"; then
        {
            echo "🟢 $TITLE｜TCP/443 已到达目标"
            echo "目标实际到达跳数：第 $LAST_TCP 跳"
            echo
        } | tee -a "$SUMMARY"
    else
        {
            echo "🟡 $TITLE｜ICMP、TCP/443 均未确认目标到达"
            echo "TCP 最后可见跳数：第 $LAST_TCP 跳"
            echo "只能认定最后响应位置，不能将 30 跳探测上限当成实际跳数。"
            echo
        } | tee -a "$SUMMARY"
    fi
}

V4_DOMAIN="${V4}.nip.io"

# IPv4 回程：本机 VPS → 上海三网
run_return "回程｜IPv4｜$VPS_NAME → 上海电信" "01_RETURN_IPV4_CT" "-4" "202.96.209.5" "202.96.209.5"
run_return "回程｜IPv4｜$VPS_NAME → 上海联通" "02_RETURN_IPV4_CU" "-4" "210.22.70.3" "210.22.70.3"
run_return "回程｜IPv4｜$VPS_NAME → 上海移动" "03_RETURN_IPV4_CM" "-4" "211.136.112.50" "211.136.112.50"

# IPv4 去程：中国三网远端探针 → 本机 VPS
run_forward "去程｜IPv4｜中国电信 → $VPS_NAME" "04_FORWARD_IPV4_CT" "-4" "$V4_DOMAIN" "$V4" "AS4134+China"
run_forward "去程｜IPv4｜中国联通 → $VPS_NAME" "05_FORWARD_IPV4_CU" "-4" "$V4_DOMAIN" "$V4" "AS4837+China"
run_forward "去程｜IPv4｜中国移动 → $VPS_NAME" "06_FORWARD_IPV4_CM" "-4" "$V4_DOMAIN" "$V4" "AS9808+China"

if [[ -n "$V6" ]]; then
    echo
    echo "🟢 检测到公网 IPv6，开始 IPv6 三网去程／回程。"

    V6_DOMAIN="${V6//:/-}.sslip.io"
    CT6_DOMAIN="ipv6.sha-4134.endpoint.nxtrace.org"
    CU6_DOMAIN="ipv6.sha-4837.endpoint.nxtrace.org"
    CM6_DOMAIN="ipv6.sha-9808.endpoint.nxtrace.org"

    CT6_IP="$(getent ahostsv6 "$CT6_DOMAIN" 2>/dev/null | awk 'NR==1 {print $1}')"
    CU6_IP="$(getent ahostsv6 "$CU6_DOMAIN" 2>/dev/null | awk 'NR==1 {print $1}')"
    CM6_IP="$(getent ahostsv6 "$CM6_DOMAIN" 2>/dev/null | awk 'NR==1 {print $1}')"

    run_return "回程｜IPv6｜$VPS_NAME → 上海电信" "07_RETURN_IPV6_CT" "-6" "$CT6_DOMAIN" "$CT6_IP"
    run_return "回程｜IPv6｜$VPS_NAME → 上海联通" "08_RETURN_IPV6_CU" "-6" "$CU6_DOMAIN" "$CU6_IP"
    run_return "回程｜IPv6｜$VPS_NAME → 上海移动" "09_RETURN_IPV6_CM" "-6" "$CM6_DOMAIN" "$CM6_IP"

    run_forward "去程｜IPv6｜中国电信 → $VPS_NAME" "10_FORWARD_IPV6_CT" "-6" "$V6_DOMAIN" "$V6" "AS4134+China"
    run_forward "去程｜IPv6｜中国联通 → $VPS_NAME" "11_FORWARD_IPV6_CU" "-6" "$V6_DOMAIN" "$V6" "AS4837+China"
    run_forward "去程｜IPv6｜中国移动 → $VPS_NAME" "12_FORWARD_IPV6_CM" "-6" "$V6_DOMAIN" "$V6" "AS9808+China"
else
    {
        echo "🟡 当前没有可用公网 IPv6"
        echo "已跳过 IPv6 去程／回程，不影响 IPv4 报告。"
        echo
    } | tee -a "$SUMMARY"
fi

{
    cat "$SUMMARY"

    for FILE in "$RAW"/*.txt; do
        [[ -f "$FILE" ]] || continue
        echo
        echo "############################################################"
        echo "原始文件：$(basename "$FILE")"
        echo "############################################################"
        cat "$FILE"
    done

    echo
    echo "============================================================"
    echo "检测说明"
    echo "============================================================"
    echo "1. 去程数据来自 Globalping 中国运营商远端探针。"
    echo "2. 回程数据由当前 VPS 本机发起。"
    echo "3. 目标真正回应时，才标记目标到达跳数。"
    echo "4. 目标不回应时，只标记最后可见跳数。"
    echo "5. 30 跳是探测上限，不能当成实际到达跳数。"
    echo "6. 星号可能只是中间设备不回复探测，不等于真实丢包。"
    echo "7. IPv6 没有匹配探针，不代表 VPS IPv6 故障。"
} > "$REPORT"

ARCHIVE="${OUT}.tar.gz"
tar -C /root -czf "$ARCHIVE" "$(basename "$OUT")"

echo
echo "============================================================"
echo "🟢 $VPS_NAME｜三网去程／回程检测执行完成"
echo "============================================================"
echo "检测摘要：$SUMMARY"
echo "完整报告：$REPORT"
echo "原始结果：$RAW"
echo "压缩包：$ARCHIVE"
echo
echo "Windows PowerShell 下载指令："
echo "scp -P ${SSH_PORT} root@${V4}:$ARCHIVE \"\$env:USERPROFILE\\Downloads\\\""
echo "============================================================"
