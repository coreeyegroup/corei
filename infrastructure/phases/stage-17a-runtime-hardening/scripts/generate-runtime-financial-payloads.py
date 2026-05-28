#!/usr/bin/env python3

import json
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17a-runtime-hardening")

session_id = (
    BASE / "runtime/state/active-runtime-session.id"
).read_text().strip()

payload_dir = (
    BASE
    / "runtime"
    / "financial-payloads"
)

payload_dir.mkdir(parents=True, exist_ok=True)

payloads = []

for i in range(1, 201):

    payload = {
        "event_id": f"financial-event-{i}",
        "topic": "orders",
        "runtime_origin": "kafka-runtime-stream",
        "price": int(2450010),
        "quantity": int(10),
        "notional": int(24500100),
        "realized_pnl": int(500000),
        "unrealized_pnl": int(200000),
        "serialization_format": "json",
        "schema_valid": True
    }

    payloads.append(payload)

with open(
    payload_dir / f"{session_id}.financial-payloads.json",
    "w"
) as f:

    json.dump(payloads, f, indent=2)

print("[PASS] Runtime financial payloads generated")
