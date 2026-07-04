# Main Menu Patch Guide v1.3.3

v1.3.3 不是只上传 addon，而是必须修正 GitHub 根目录的 `lazy-vps-menu.sh`。

执行：

```bash
bash lazy-vps-mainmenu-hotfix-v1.3.3.sh
```

这会在原主脚本最终 dispatch 前插入 runtime bridge：

- `run_choice 7` 改进为 `protocol_suite`。
- `quick anytls / tuic / anytls-tuic / protocol-suite` 接入 addon。
- 原功能通过 `orig_lazyvps_run_choice` 和 `orig_lazyvps_quick` 转发。

完成后必须提交 `lazy-vps-menu.sh`，否则一键命令仍会下载旧版。
