# Main Menu Hotfix v1.3.3

v1.3.3 采用 runtime bridge 方式修正主菜单：

- 不直接重写原 `run_choice` 逻辑。
- 先保存为 `orig_lazyvps_run_choice` / `orig_lazyvps_quick`。
- 再覆盖第 7 项和 AnyTLS/TUIC 快捷命令。
- 原功能通过原函数转发，降低破坏风险。
