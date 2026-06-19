# LazyVPS v1.2 服务端 AI 分流说明

## 一句话说明

`Server AI Routing` 不是端口中转。  
它是在当前 VPS 的 Xray 服务端内写入 routing，让 AI 域名走指定日本 / 台湾 Trojan outbound，其他普通流量仍走当前 VPS 默认出口。

## 角色定义

| 名称 | 说明 |
|---|---|
| 入口节点 | 客户端实际连接的 VPS，例如香港节点 |
| 普通出口 | 普通网站默认出口，通常仍然是入口 VPS 本机 |
| AI 分流出口 | GPT / OpenAI / Claude / Gemini 被转发到的日本 / 台湾落地 |
| 落地节点 | 日本 / 台湾 Trojan 节点，只写在入口 VPS 的 Xray outbound 里 |

## 应该在哪台 VPS 上执行？

在“入口 VPS”上执行。

例如你客户端连接香港节点，但香港不能 GPT，需要把 GPT 转给日本落地：

```text
在香港 VPS 上执行菜单 22
日本 VPS 只作为 AI outbound 落地
```

## 执行流程

```text
1. 上传 lazy-vps-menu.sh 到入口 VPS
2. 执行 bash /root/lazy-vps-menu.sh
3. 选择 22) Server AI Routing
4. 填写日本 / 台湾落地 Trojan 参数
5. pinnedPeerCertSha256 留空，让脚本自动抓取
6. 确认写入
7. 配置测试通过后重启 Xray
8. 选择 23) AI Route Show 检查
9. 客户端仍选入口节点
10. 打开 https://ip.net.coffee/claude/ 验证 AI 出口
```

## 必填参数说明

| 参数 | 说明 | 示例 |
|---|---|---|
| outboundTag | 给 AI outbound 起一个固定名字 | `ai-jp-out` |
| AI 落地 IP / 域名 | 日本 / 台湾 Trojan 节点地址 | `***.***.***.***` |
| Trojan 端口 | 落地 Trojan 端口 | `443` |
| Trojan password | 落地 Trojan 密码 | `node_********` |
| Trojan SNI | 落地 TLS SNI | `www.microsoft.com` |
| pinnedPeerCertSha256 | Xray 26.x 自签证书校验指纹 | 留空自动抓取 |

## 验证方式

访问：

```text
https://ip.net.coffee/claude/
```

成功结果应该类似：

```text
普通出口：香港
AI 出口：日本 / 台湾落地
Claude / GPT 支持地区：正常
```

## 常见问题

### 为什么 09 Export Files 看不到日本节点？

因为客户端只需要连接入口 VPS。  
日本 / 台湾落地是服务端 Xray outbound，不会显示在客户端导入配置里。

### 为什么 ipinfo 还是香港？

这是正常现象。普通网站仍走入口 VPS。  
请用 AI IP 检测网站看 AI 出口。

### allowInsecure 报错怎么办？

Xray 26.x 已迁移到 `pinnedPeerCertSha256`。  
v1.2 已改为自动抓取证书指纹，不再写 `allowInsecure`。
