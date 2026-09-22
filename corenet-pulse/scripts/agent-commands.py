#!/usr/bin/env python3
"""Print per-node install commands on the Hub; never upload credentials."""
import argparse
import ipaddress
import json
from pathlib import Path
import re
import shlex
import sys
from urllib.parse import urlsplit

INSTALLER = 'https://raw.githubusercontent.com/souldance7-ai/VPS-/main/corenet-pulse/scripts/install-agent.sh'


def read_env(path):
    values = {}
    for line in path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        key, sep, value = line.partition('=')
        if not sep or not re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]*', key):
            raise ValueError('hub.env 格式不正確')
        parsed = shlex.split(value, comments=False)
        if len(parsed) > 1:
            raise ValueError('hub.env 的值須為單一字串')
        values[key] = parsed[0] if parsed else ''
    return values


def main():
    p = argparse.ArgumentParser(description='在 Hub 上產生各節點的 Agent 安裝指令')
    p.add_argument('--hub-url', required=True)
    p.add_argument('--config', type=Path, default=Path('/etc/corenet-pulse/hub.json'))
    p.add_argument('--env-file', type=Path, default=Path('/etc/corenet-pulse/hub.env'))
    p.add_argument('--node-id', action='append', help='只輸出指定節點，可重複使用')
    p.add_argument('--manifest', type=Path, help='只輸出清單中的節點')
    args = p.parse_args()
    hub_url = args.hub_url.rstrip('/')
    if not re.fullmatch(r'https://[A-Za-z0-9.-]+(?::[0-9]+)?', hub_url):
        p.error('Hub 網址須為 HTTPS 域名，不含路徑、查詢或帳密')
    parsed = urlsplit(hub_url)
    try:
        ipaddress.ip_address(parsed.hostname)
    except ValueError:
        pass
    else:
        p.error('請使用經 Tunnel 代理的域名，不可使用源站 IP')
    try:
        config = json.loads(args.config.read_text(encoding='utf-8'))
        env = read_env(args.env_file)
        nodes = config.get('nodes', [])
        selected = args.node_id
        if args.manifest:
            selected = list(selected or []) + [node['id'] for node in json.loads(args.manifest.read_text(encoding='utf-8'))['nodes']]
            if not selected:
                raise ValueError('節點清單不可為空')
        if selected:
            unknown = set(selected) - {node.get('id') for node in nodes}
            if unknown:
                raise ValueError('找不到指定節點')
            nodes = [node for node in nodes if node.get('id') in selected]
        commands = []
        for node in nodes:
            node_id = node['id']
            if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_.-]{0,127}', node_id):
                raise ValueError('節點 ID 格式不正確')
            token = node['token']
            reference = re.fullmatch(r'\$\{([A-Za-z_][A-Za-z0-9_]*)\}|\$([A-Za-z_][A-Za-z0-9_]*)', token)
            if reference:
                token = env.get(reference[1] or reference[2], '')
            if not re.fullmatch(r'[A-Za-z0-9_-]{20,256}', token):
                raise ValueError(f'節點 {node_id} 的 Token 缺失或格式不支援')
            # JSON encoding prevents names with newlines/control characters
            # from turning a printed comment into an executable command.
            label = json.dumps(node.get('name', node_id), ensure_ascii=False)
            commands.append(f'''# 在對應的 {label} 主機以 root 執行（節點 {node_id}）
bash <<'CORENET_AGENT_INSTALL'
set -Eeuo pipefail
export PULSE_HUB_URL={shlex.quote(hub_url)}
export PULSE_NODE_ID={shlex.quote(node_id)}
export PULSE_NODE_TOKEN={shlex.quote(token)}
PULSE_INSTALLER="$(mktemp)"
trap 'rm -f -- "$PULSE_INSTALLER"' EXIT
curl -fsSL --retry 3 {shlex.quote(INSTALLER)} -o "$PULSE_INSTALLER"
bash "$PULSE_INSTALLER"
CORENET_AGENT_INSTALL''')
        if not commands:
            raise ValueError('沒有可產生安裝指令的節點')
    except (OSError, ValueError, KeyError, TypeError) as err:
        # Do not echo file contents or token values on an error.
        print(f'無法產生指令：{err}', file=sys.stderr)
        return 1
    print('# 以下指令含各節點的專用 Token，請只複製到對應主機，不要貼到 GitHub 或聊天。\n')
    print('\n\n'.join(commands))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
