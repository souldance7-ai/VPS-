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

检测完成后，自动读取最新结果、脱敏并上传到 NT ROUTE LAB 卡片式公开报告：

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

公开上传器只上传解析后的路线卡与逐跳记录，不上传 SSH 密码、私钥或代理配置。公开 JSON 中的 IPv4 统一遮罩后两段，完整 IPv6 也会遮罩；ASN、城市、骨干标签、延迟和跳数仍保留用于判读。

公开网站使用与「奶爸台湾」定版一致的 NT ROUTE LAB 布局。每一次上传都会产生独立 `/report/报告编号`，不会覆盖奶爸台湾、光锥云、Lazco 或其他既有报告。

页面功能包括：电信／联通／移动筛选、IPv4／IPv6 筛选、去程／回程筛选、逐跳展开、MapTrace、NodeSeek 一键复制与长图输出。网站不再要求旧 China 3Net 的北上广矩阵、质量评分或测速栏位。

## License

MIT
