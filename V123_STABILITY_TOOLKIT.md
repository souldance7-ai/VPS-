# LazyVPS v1.2.3 稳定增强工具链

## 新增功能

| 菜单 | 功能 |
|---|---|
| 35 | Public IP Guard / NAT 公网 IP 识别保护 |
| 36 | Export Safety / 导出配置安全检查 |
| 37 | Remote Publish / 远程订阅发布 |
| 38 | Node Test Pack / 节点体检包 |
| 39 | NodeQuality Archive / 酒神测试归档 |
| 40 | Airport Chain Template / 机场链规则模板 |

## 设计目标

解决配置越来越多之后的稳定性问题：

- NAT / 私网 IP 被误当公网 IP
- YAML 导出后才发现无法导入
- 远程订阅服务器发布时覆盖旧版无备份
- 节点测试没有留档
- NodeQuality 测试结果没有归档
- 机场链规则需要模板但不能泄露订阅
