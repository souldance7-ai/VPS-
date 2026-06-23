# QUICK START / 快速使用

## 一键进入互动界面

```bash
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

## 新 VPS 常规流程

```text
1 → 2 → 3 → 4 → 5/6/7 → 8 → 10 → 16
```

## IPv6 主力 + IPv4 备用流程

```text
35 → 7 → 10  生成 IPv6 Reality 443
35 → 7 → 12  生成 IPv4 Reality 备用端口
35 → 7 → 13  生成 V4/V6 Split 策略配置
16           开启 HTTP 下载
```

## 快捷命令

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```
