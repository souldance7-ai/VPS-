# GitHub 上传命令 · LazyVPS v1.3.1

本次 v1.3.1 的重点：**README 保留原主菜单完整说明，同时新增 TUIC v5 / AnyTLS 协议扩展**。

---

## Windows CMD 执行：克隆仓库

```bat
git clone https://github.com/souldance7-ai/VPS-.git
```

把本包内文件复制到 `VPS-` 文件夹后：

## Windows CMD 执行：提交上传

```bat
cd VPS-
git status
git add .
git commit -m "feat: add TUIC v5 and AnyTLS builders while keeping original README"
git push
```

也可以直接双击运行：

```text
一键同步LazyVPS_v1.3.1到GitHub.cmd
```

---

## VPS/Linux 执行：拉取后运行原主菜单

```bash
git clone https://github.com/souldance7-ai/VPS-.git
cd VPS-
chmod +x lazy-vps-menu.sh lazy-vps-protocol-addon.sh protocols/*.sh
bash lazy-vps-menu.sh --preview
```

## VPS/Linux 执行：运行协议扩展菜单

```bash
bash lazy-vps-protocol-addon.sh
```

## VPS/Linux 执行：快速建立 AnyTLS

```bash
bash lazy-vps-protocol-addon.sh --quick anytls
```

## VPS/Linux 执行：快速建立 TUIC v5

```bash
bash lazy-vps-protocol-addon.sh --quick tuic
```

## VPS/Linux 执行：启动 HTTP 下载

```bash
bash lazy-vps-protocol-addon.sh --quick http
```

---

## 上传前检查

```bash
bash -n lazy-vps-protocol-addon.sh
bash -n protocols/install-anytls.sh
bash -n protocols/install-tuic.sh
bash -n protocols/status.sh
```

不要上传 `/opt/lazy-vps-menu/outputs/` 里的真实节点配置。
