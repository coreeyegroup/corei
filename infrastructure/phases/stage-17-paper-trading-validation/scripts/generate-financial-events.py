#!/usr/bin/env python3

import json
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

output_dir = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "financial-events"
)

output_dir.mkdir(parents=True, exist_ok=True)

events = []

for i in range(1, 201):

    event = {
        "event_id": f"event-{i}",
        "symbol": "NIFTY",
        "price": 2450010,
        "quantity": 10,
        "notional": 24500100,
        "pnl": 125000,
        "fees": 100,
        "event_time": 1748376541000000000
    }

    events.append(event)

with open(output_dir / "financial-events.json", "w") as f:
    json.dump(events, f, indent=2)

print("[PASS] Financial events generated")
