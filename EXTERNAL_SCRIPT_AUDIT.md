# EXTERNAL SCRIPT AUDIT

检查日期：2026-06-19

本工具会按使用者确认后调用下列第三方或官方脚本：

- Xray 官方安装脚本：`github.com/XTLS/Xray-install`
- Hysteria2 官方安装入口：`get.hy2.sh`
- NodeQuality 测试：`run.NodeQuality.com`
- BBR v3：`github.com/byJoey/Actions-bbr-v3`
- DNS Alice Unlock：`github.com/Jimmyzxk/DNS-Alice-Unlock`
- Linux-NetSpeed：`github.com/ylx2016/Linux-NetSpeed`
- TCP 窗口调优：`sh.nekoneko.cloud/tools.sh`

安全设计：

- 第三方脚本功能执行前均显示中文警告并要求确认。
- 本包不内置第三方脚本内容，运行时才下载。
- 第三方脚本可能修改内核、DNS、网络参数或要求重启；生产环境应先备份。
- 分享前仍建议使用者自行审阅第三方脚本来源。
