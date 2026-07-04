# 修复 AnyTLS / TUIC 进入时报 lazy-vps-protocol-addon.sh 不存在

## 现象

选择 `08 / 09 / 10` 后出现：

```text
bash: [警告] 本地未找到 lazy-vps-protocol-addon.sh，尝试从 GitHub 下载。
/opt/lazy-vps-menu/lazy-vps-protocol-addon.sh: No such file or directory
```

## 原因

v1.3.6 / v1.3.7 主脚本在取得 addon 文件路径时，把警告文字也一起写进了变量，导致 bash 执行了一个不存在的「多行文件名」。

## 修复方式

上传 v1.3.8 后，在 VPS 执行：

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash -n lazy-vps-menu.sh
grep -nE 'v1.3.8|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```

进入 `2 PROTOCOL` 后再选：

```text
08 AnyTLS
09 TUIC
10 AnyTLS + TUIC
```
