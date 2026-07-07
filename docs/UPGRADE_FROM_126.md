# 从 v1.2.6 / v1.2.x 升级到 v1.4.0

v1.4.0 是互动主入口，不直接删除旧功能。推荐做法：

```bash
mkdir -p legacy
cp lazy-vps-menu.sh legacy/lazy-vps-menu-legacy-v1.2.6.sh
# 再把 v1.4.0 包内 lazy-vps-menu.sh 覆盖到仓库根目录
```

这样：

- T / Trojan：调用 legacy 旧版部署逻辑
- V / VLESS Reality：调用 legacy 旧版部署逻辑
- H / Hysteria2：调用 legacy 旧版部署逻辑
- A / AnyTLS：v1.4.0 addon 直接部署
- U / TUIC：v1.4.0 addon 直接部署
- D / AnyTLS + TUIC：v1.4.0 addon 直接部署

如果旧版脚本没有保存，AnyTLS/TUIC 仍可使用，但 T/V/H 旧功能会提示放入 legacy 文件。
