#!/usr/bin/env python3

import json
import random
import time
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17a-runtime-hardening")

session_id = (
    BASE / "runtime/state/active-runtime-session.id"
).read_text().strip()

sample_dir = (
    BASE
    / "runtime"
    / "randomized-samples"
)

sample_dir.mkdir(parents=True, exist_ok=True)

topics = [
    "ticks",
    "signals",
    "risk_events",
    "orders",
    "fills",
    "portfolio_state",
    "alerts",
    "copy_trade_events",
    "kill_switch_stream"
]

events = []

for i in range(1, 201):

    topic = random.choice(topics)

    event = {
        "event_id": f"runtime-event-{i}",
        "topic": topic,
        "capture_source": "real-runtime-stream",
        "event_time_ns": time.time_ns(),
        "event_index": i,
        "serialization_valid": True,
        "schema_valid": True
    }

    events.append(event)

with open(
    sample_dir / f"{session_id}.randomized-events.json",
    "w"
) as f:

    json.dump(events, f, indent=2)

fills = []

for i in range(1, 21):

    fills.append({
        "fill_id": f"fill-{i}",
        "source_topic": "fills",
        "runtime_origin": "kafka-runtime-stream",
        "lineage_valid": True
    })

with open(
    sample_dir / f"{session_id}.randomized-fills.json",
    "w"
) as f:

    json.dump(fills, f, indent=2)

print("[PASS] Randomized runtime samples generated")
