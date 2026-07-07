# QUICK_START / 一键复制指令

## 进入互动菜单

**VPS/Linux 执行：**

```bash
apt update && apt install -y curl wget ca-certificates
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

## 直接部署 AnyTLS + TUIC

**VPS/Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick anytls-tuic
```

## 快捷命令

**VPS/Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
bash lazy-vps-menu.sh --quick status
bash lazy-vps-menu.sh --quick download
```

## Windows 下载配置

**Windows CMD 执行：**

```bat
scp root@你的VPS-IP:/root/lazyvps-config.tar.gz "%USERPROFILE%\Downloads\lazyvps-config.tar.gz"
```
