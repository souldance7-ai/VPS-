#!/usr/bin/env python3
"""Add one node to a private hub config and print its one-time agent values."""
import argparse
import json
import secrets
import shutil
import sys
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

    path = Path(args.config)
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
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.chmod(0o600)
    temp.replace(path)
    print(f"PULSE_NODE_ID={args.id}")
    print(f"PULSE_NODE_TOKEN={token}")
    print("\n已建立備份；請重啟 Hub，並只在目標 VPS 的 agent.env 保存以上資料。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

