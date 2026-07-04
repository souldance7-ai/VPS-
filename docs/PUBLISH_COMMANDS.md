# GitHub 上传命令

以下命令用于把本次 v1.3.0 协议扩展包上传到你的公开仓库。

## Windows CMD 执行

```bat
git clone https://github.com/souldance7-ai/VPS-.git
```

把本包内文件复制到 `VPS-` 文件夹后：

## Windows CMD 执行

```bat
cd VPS-
git status
git add .
git commit -m "feat: add TUIC v5 and AnyTLS protocol builders"
git push
```

## VPS/Linux 执行：拉取后直接运行

```bash
git clone https://github.com/souldance7-ai/VPS-.git
cd VPS-
chmod +x lazy-vps-protocol-addon.sh protocols/*.sh
bash lazy-vps-protocol-addon.sh
```

## VPS/Linux 执行：快速建立 AnyTLS

```bash
bash lazy-vps-protocol-addon.sh --quick anytls
```

## VPS/Linux 执行：快速建立 TUIC

```bash
bash lazy-vps-protocol-addon.sh --quick tuic
```

