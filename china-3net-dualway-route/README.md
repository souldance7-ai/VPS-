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

## License

MIT
