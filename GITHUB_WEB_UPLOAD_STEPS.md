# GitHub 网页上传步骤 / LazyVPS v1.3.8

适合使用 GitHub 页面 `Add file → Upload files` 的方式，不需要 git clone。

## 重点原则

必须让 GitHub 根目录的 `lazy-vps-menu.sh` 被覆盖成新版。

如果只上传 README、lazy-vps-protocol-addon.sh、patch 脚本，VPS 一键命令仍然会拉到旧版主菜单。

## 上传内容

打开本文件所在文件夹，选择以下内容拖到 GitHub Upload files 页面：

```text
lazy-vps-menu.sh
lazy-vps-menu-v1.3.8.sh
lazy-vps-protocol-addon.sh
protocols/
README.md
QUICK_START.md
CHANGELOG.md
GITHUB_WEB_UPLOAD_STEPS.md
SECURITY_SHARE_CHECK.txt
```

## 不要这样传

```text
不要只上传 LazyVPS-WebUpload-v1.3.8 这个外层文件夹
不要只上传 DIRECT_REPLACE
不要只上传 patch 脚本
不要只上传 README
```

## Commit message

```text
fix: replace LazyVPS main entry with v1.3.8 protocol suite
```

## 提交后检查

点开 GitHub 根目录的 `lazy-vps-menu.sh`，确认看到：

```text
Formal Version: v1.3.8
Protocol Suite / AnyTLS + TUIC
```

然后在 VPS 上执行：

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
grep -nE 'v1.3.8|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```
