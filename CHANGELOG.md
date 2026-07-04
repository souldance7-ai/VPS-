# CHANGELOG

## v1.3.8 / 2026-07-05

- 修复 v1.3.6 / v1.3.7 选择 AnyTLS / TUIC 时出现：`bash: [警告] ... /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh: No such file or directory`。
- 根因：主脚本用命令替换取得 addon 路径时，`warn` 输出被一起写进变量，导致 bash 把「警告文字 + 路径」当成文件名执行。
- 修复：主入口的 `ok/info/warn/err/note` 改为 stderr 输出；`install_addon_if_missing` 只向 stdout 返回脚本路径。
- 新增：下载 addon 后自动执行 `bash -n` 语法检查；若 VPS 上残留坏文件，会自动重新拉取。
- 保持：README 开源首页、一键复制指令、Protocol Suite、AnyTLS、TUIC、HTTP 下载导入说明均保留。

## v1.3.7

- GitHub 网页上传直用版：根目录直接放置 `lazy-vps-menu.sh`。

## v1.3.6

- 主入口直替版：将 Protocol Suite 接入主菜单。
