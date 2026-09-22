#!/usr/bin/env python3
"""Register public node labels, generating credentials only on the private Hub."""
import argparse
import fcntl
import json
import os
from pathlib import Path
import re
import secrets
import stat
import subprocess
import tempfile

FIELDS = {'id', 'name', 'region', 'country', 'provider', 'network', 'plan'}


def atomic_write(path, raw, metadata):
    with tempfile.NamedTemporaryFile(dir=path.parent, prefix='.pulse-config-', delete=False) as f:
        temp = Path(f.name)
        try:
            f.write(raw)
            f.flush()
            os.fsync(f.fileno())
            os.fchown(f.fileno(), metadata.st_uid, metadata.st_gid)
            os.fchmod(f.fileno(), stat.S_IMODE(metadata.st_mode))
            temp.replace(path)
        finally:
            temp.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description='批次新增 CORENET Pulse 節點，不更換既有 Token')
    parser.add_argument('--manifest', type=Path, required=True)
    parser.add_argument('--config', type=Path, default=Path('/etc/corenet-pulse/hub.json'))
    parser.add_argument('--restart', action='store_true', help='新增後重啟 Hub；失敗時恢復設定')
    args = parser.parse_args()
    manifest = json.loads(args.manifest.read_text(encoding='utf-8'))['nodes']
    if not isinstance(manifest, list) or not manifest:
        parser.error('節點清單必須包含至少一個節點')
    seen = set()
    for node in manifest:
        if not isinstance(node, dict) or set(node) - FIELDS:
            parser.error('清單只接受公開顯示欄位，不可放入 Token、IP 或連線密碼')
        if not all(isinstance(node.get(k), str) and node[k].strip() for k in ('id', 'name', 'region', 'country', 'provider')):
            parser.error('節點缺少必要的文字欄位')
        if not all(isinstance(v, str) for v in node.values()):
            parser.error('清單的所有欄位須為字串')
        if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_.-]{0,127}', node['id']) or node['id'] in seen:
            parser.error('節點 ID 格式不正確或清單含重複 ID')
        if not re.fullmatch(r'[A-Z]{2}', node['country']):
            parser.error('country 須為兩碼大寫國家代碼')
        seen.add(node['id'])
    # Lock a stable file because hub.json itself is replaced atomically.
    lock_fd = os.open(args.config.with_name('.pulse-nodes.lock'), os.O_CREAT | os.O_RDWR, 0o600)
    with os.fdopen(lock_fd, 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        original = args.config.read_bytes()
        metadata = args.config.stat()
        config = json.loads(original)
        existing = {n['id'] for n in config['nodes']}
        additions = [node for node in manifest if node['id'] not in existing]
        if not additions:
            print(f'清單內 {len(manifest)} 個節點均已登錄，沿用既有 Token。')
            return 0
        order = max((n.get('sort', 0) for n in config['nodes']), default=0)
        for node in additions:
            order += 10
            config['nodes'].append(dict(node, sort=order, token=secrets.token_urlsafe(32)))
        # The backup also contains tokens; its initial 0600 permissions remain.
        with tempfile.NamedTemporaryFile(dir=args.config.parent, prefix=args.config.name + '.bak.', delete=False) as backup:
            backup.write(original)
            backup_path = Path(backup.name)
        encoded = (json.dumps(config, ensure_ascii=False, indent=2) + '\n').encode('utf-8')
        atomic_write(args.config, encoded, metadata)
        try:
            if args.restart:
                subprocess.run(['systemctl', 'restart', 'corenet-pulse-hub'], check=True)
                subprocess.run(['systemctl', 'is-active', '--quiet', 'corenet-pulse-hub'], check=True)
        except subprocess.CalledProcessError:
            atomic_write(args.config, original, metadata)
            subprocess.run(['systemctl', 'restart', 'corenet-pulse-hub'], check=False)
            raise SystemExit('Hub 重啟失敗，已恢復原設定；請查看 corenet-pulse-hub 日誌。')
        print(f'新增 {len(additions)} 個節點，總計 {len(config["nodes"])} 個。既有 Token 已保留。')
        for node in additions:
            print(f'  {node["name"]}：待 Agent 接入')
        print(f'設定備份：{backup_path}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
