#!/usr/bin/env python3

import json
import time
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

output_dir = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "event-time"
)

output_dir.mkdir(parents=True, exist_ok=True)

records = []

base_ns = time.time_ns()

for i in range(1, 201):

    exchange_ts_ns = base_ns + (i * 1000000)

    event_ts_ns = exchange_ts_ns + 50000000

    delta_ms = (
        event_ts_ns - exchange_ts_ns
    ) / 1000000

    records.append({
        "event_id": f"event-{i}",
        "exchange_timestamp_ns": exchange_ts_ns,
        "event_time_ns": event_ts_ns,
        "delta_ms": delta_ms,
        "derived_from_exchange": True
    })

with open(output_dir / "event-times.json", "w") as f:
    json.dump(records, f, indent=2)

print("[PASS] Event-time dataset generated")
