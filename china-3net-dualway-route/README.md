# 中国三网 IPv4／IPv6 去程＋回程检测

适用于常见 Debian、Ubuntu VPS。脚本自动识别当前公网 IPv4、IPv6 和主机名，检测：

- IPv4／IPv6 中国电信、联通、移动远端探针到 VPS 的去程；
- VPS 到上海电信、联通、移动的回程；
- ICMP 未确认目标时自动追加 TCP/443；
- 正确区分目标到达跳数、最后响应跳数与 30 跳探测上限；
- 输出摘要、完整报告、原始逐跳文件及 tar.gz 压缩包。

## 一键执行

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/3net-dualway.sh)
```

检测完成后，自动读取最新结果、脱敏并上传公开报告：

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/publish-latest.sh)
```

检测与公开上传连续执行：

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/3net-dualway.sh) --name "VPS名称" && bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/publish-latest.sh)
```

自定义报告名称：

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/3net-dualway.sh) --name "奶爸台湾"
```

自定义名称并启用 IPv4 安全闸门：

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/3net-dualway.sh) --name "奶爸台湾" --expected-ip 152.175.214.23
```

非标准 SSH 端口：

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/china-3net-dualway-route/3net-dualway.sh) --ssh-port 60946
```

## 安全说明

脚本不会修改代理、端口、防火墙、内核或网络优化参数。仅在未安装 NextTrace 时使用官方安装入口安装完整版。

公开上传器只上传解析后的统计、骨干标签与脱敏地址，不上传原始逐跳日志。IPv4 统一保留前两段并将后两段替换为 `*.*`；若香港等节点自动上传收到 HTTP 403，会保留脱敏 JSON 并显示手动上传网址。

公开网站沿用北上广三地区数据结构。本通用脚本的去程属于全国同运营商参考，因此三个兼容栏位均明确标记 `NATIONAL_REFERENCE`，不冒充地区实测；回程仅上海为真实检测，北京与广东明确标记 `NOT-TESTED`。

## License

MIT
