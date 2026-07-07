# LazyVPS Quick Menu Pack 正式定版 v1.2.2

## 版本信息

- 版本：正式 v1.2.2 · 媒体 DNS 导出修正版
- 日期：2026-06-20
- 主脚本：lazy-vps-menu.sh
- 定位：懒人建 VPS 快速菜单包，支持快速建站、节点部署、导出配置、服务端 AI 分流、媒体 DNS 解锁辅助。

## 本次定版确认

### 1. v1.0 主流程保留

- 新 VPS 初始化
- BBR + fq
- 防火墙后端
- Xray Core
- Trojan 443 / Reality / Hysteria2
- Status 状态检查
- Export 导出配置
- HTTP 临时下载

### 2. v1.2 服务端 AI 分流

- 菜单 22：Server AI Routing / 服务端 AI 分流
- 菜单 23：AI Route Show / 查看服务端 AI 分流
- 菜单 24：AI Route Rollback / 回滚服务端 AI 分流
- 支持香港入口节点 + 日本 / 台湾 AI 落地出口
- 使用 pinnedPeerCertSha256，兼容 Xray 26.x 自签证书场景
- 成功验证：香港入口节点可用 GPT / Claude，AI 出口可转到落地节点

### 3. v1.2.1 / v1.2.2 媒体 DNS 解锁辅助

- 菜单 30：DNS Unlock / 媒体 DNS 解锁与导出同步
- 内置 Zouter Media DNS：151.243.229.229
- 支持自定义 Media DNS
- 支持 DNS Show / DNS Test / DNS Rollback
- v1.2.2 修正 Export 同步问题：设置 Media DNS 后，01_IMPORT_FLCLASH.yaml 会自动写入当前 Media DNS

### 4. 实测结果

- Zouter HK + Media DNS：DNS 写入成功
- FLClash 导出配置：已同步 151.243.229.229
- Netflix：可进入片库
- Disney+：可导向 Japan 区域页面
- GPT / Claude：可用

## 应上传到 GitHub 的文件

- lazy-vps-menu.sh
- README.md
- CHANGELOG.md
- AI_SERVICE_ROUTING.md
- MEDIA_DNS_UNLOCK.md
- TROUBLESHOOTING.md
- SECURITY_SHARE_CHECK.txt
- SCAN_REPORT.txt
- docs/images/ 下的脱敏说明图片

## 不应上传的内容

- sub.yaml
- surge.conf
- 任何节点导出包
- 任何含真实 VPS IP / password / pinnedPeerCertSha256 / 私有域名的截图或配置
- Netflix / Disney+ 实测截图若含个人书签、账号痕迹，不建议放入公开仓库

## VPS 更新命令

```bash
cd /root
rm -f lazy-vps-menu.sh
curl -L --fail -H "Cache-Control: no-cache" -o lazy-vps-menu.sh "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?ts=$(date +%s)"
chmod +x lazy-vps-menu.sh
bash ./lazy-vps-menu.sh
```

## 版本验证

```bash
grep -nE 'Formal Version|VER=|Media DNS|Server AI Routing|151.243.229.229' lazy-vps-menu.sh | head -40
```

应看到：

```text
Formal Version: v1.2.2
VER="正式 v1.2.2 · 媒体 DNS 导出修正版"
Server AI Routing
Media DNS
151.243.229.229
```
