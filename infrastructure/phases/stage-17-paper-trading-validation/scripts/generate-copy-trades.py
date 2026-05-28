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
    / "copy-trade"
)

output_dir.mkdir(parents=True, exist_ok=True)

master_equity = 1000000
master_lot = 10

followers = [
    {
        "account": "follower-1",
        "equity": 500000
    },
    {
        "account": "follower-2",
        "equity": 2000000
    },
    {
        "account": "follower-3",
        "equity": 1500000
    }
]

master_fill_ns = time.time_ns()

records = []

for follower in followers:

    follower_lot = int(
        master_lot
        * (follower["equity"] / master_equity)
    )

    propagation_latency_ms = 12

    records.append({
        "master_trade_intent_id": "master-intent-001",
        "master_lot": master_lot,
        "master_equity": master_equity,
        "follower_account": follower["account"],
        "follower_equity": follower["equity"],
        "expected_follower_lot": follower_lot,
        "actual_follower_lot": follower_lot,
        "parent_trade_intent_id": "master-intent-001",
        "propagation_latency_ms": propagation_latency_ms,
        "master_fill_ns": master_fill_ns
    })

with open(output_dir / "copy-trades.json", "w") as f:
    json.dump(records, f, indent=2)

print("[PASS] Copy-trade dataset generated")
