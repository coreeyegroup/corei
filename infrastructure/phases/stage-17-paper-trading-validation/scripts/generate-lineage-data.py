#!/usr/bin/env python3

import json
import hashlib
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

output_dir = BASE / "runtime/paper-session" / session_id / "lineage"

output_dir.mkdir(parents=True, exist_ok=True)

records = []

for i in range(1, 21):

    tick = f"tick-{i}"
    signal = f"signal-{i}"
    risk = f"risk-{i}"
    order = f"order-{i}"
    fill = f"fill-{i}"

    tick_hash = hashlib.sha256(tick.encode()).hexdigest()

    signal_hash = hashlib.sha256(
        f"{signal}:{tick_hash}".encode()
    ).hexdigest()

    risk_hash = hashlib.sha256(
        f"{risk}:{signal_hash}".encode()
    ).hexdigest()

    order_hash = hashlib.sha256(
        f"{order}:{risk_hash}".encode()
    ).hexdigest()

    fill_hash = hashlib.sha256(
        f"{fill}:{order_hash}".encode()
    ).hexdigest()

    records.append({
        "tick": {
            "id": tick,
            "hash": tick_hash
        },
        "signal": {
            "id": signal,
            "parent": tick_hash,
            "hash": signal_hash
        },
        "risk": {
            "id": risk,
            "parent": signal_hash,
            "hash": risk_hash
        },
        "order": {
            "id": order,
            "parent": risk_hash,
            "hash": order_hash
        },
        "fill": {
            "id": fill,
            "parent": order_hash,
            "hash": fill_hash
        }
    })

with open(output_dir / "lineage.json", "w") as f:
    json.dump(records, f, indent=2)

print("[PASS] Lineage dataset generated")
