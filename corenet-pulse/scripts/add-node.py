#!/usr/bin/env python3
"""Add one node to a private hub config and print its one-time agent values."""
import argparse
import json
import os
import re
import secrets
import shutil
import stat
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


def main() -> int:
    p = argparse.ArgumentParser(description="Add a CORENET Pulse node")
    p.add_argument("--config", default="/etc/corenet-pulse/hub.json")
    p.add_argument("--id", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--region", required=True)
    p.add_argument("--country", required=True)
    p.add_argument("--provider", required=True)
    p.add_argument("--network", default="Private")
    p.add_argument("--plan", default="VPS / VDS")
    args = p.parse_args()

    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_.-]{0,127}", args.id):
        p.error("節點 ID 須為英數字、底線、句點或連字號，並以英數字開頭")
    if not re.fullmatch(r"[A-Za-z]{2}", args.country):
        p.error("country 須為兩碼國家代碼，例如 JP 或 TW")

    path = Path(args.config)
    original_stat = path.stat()
    config = json.loads(path.read_text(encoding="utf-8"))
    if any(node.get("id") == args.id for node in config.get("nodes", [])):
        print(f"node id already exists: {args.id}", file=sys.stderr)
        return 2
    token = secrets.token_urlsafe(32)
    nodes = config.setdefault("nodes", [])
    nodes.append({
        "id": args.id,
        "name": args.name,
        "region": args.region,
        "country": args.country.upper(),
        "provider": args.provider,
        "network": args.network,
        "plan": args.plan,
        "sort": (max((n.get("sort", 0) for n in nodes), default=0) // 10 + 1) * 10,
        "token": token,
    })
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    shutil.copy2(path, path.with_name(f"{path.name}.bak.{stamp}"))
    # Keep the Hub service's read access (normally root:corenet-pulse 0640).
    # A root-owned 0600 replacement prevents an existing Hub from restarting.
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=path.parent,
                                     prefix=".hub-node-", delete=False) as handle:
        temp = Path(handle.name)
        try:
            json.dump(config, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
            os.fchown(handle.fileno(), original_stat.st_uid, original_stat.st_gid)
            os.fchmod(handle.fileno(), stat.S_IMODE(original_stat.st_mode))
            temp.replace(path)
        finally:
            temp.unlink(missing_ok=True)
    print(f"PULSE_NODE_ID={args.id}")
    print(f"PULSE_NODE_TOKEN={token}")
    print("\n已建立備份；請重啟 Hub，並只在目標 VPS 的 agent.env 保存以上資料。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
