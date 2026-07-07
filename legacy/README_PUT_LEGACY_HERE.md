# Legacy 主脚本放这里

如果要完整保留 LazyVPS v1.2.6 / v1.2.x 的所有旧功能，请把旧版主脚本放到这里：

```text
legacy/lazy-vps-menu-legacy-v1.2.6.sh
```

v1.4.0 新主入口会自动识别它，并将 Trojan / VLESS / Hysteria2 / 旧 BASIC/CHECK/BACKUP/RELAY/TUNE 功能交给 legacy 执行。

AnyTLS / TUIC / AnyTLS+TUIC 不需要 legacy，直接由 `lazy-vps-protocol-addon.sh` 执行。
