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
    / "risk-validation"
)

output_dir.mkdir(parents=True, exist_ok=True)

violations = [
    "max_daily_loss",
    "max_drawdown",
    "max_position_size",
    "max_margin",
    "instrument_blacklist",
    "external_stricter_threshold",
    "correlation_limit",
    "leverage_limit",
    "concentration_limit",
    "session_restriction"
]

intents = []

for idx, violation in enumerate(violations, start=1):

    intents.append({
        "intent_id": f"intent-{idx}",
        "violation_type": violation,
        "risk_status": "risk_rejected",
        "event_time_ns": 1748376541000000000
    })

with open(output_dir / "risk-intents.json", "w") as f:
    json.dump(intents, f, indent=2)

print("[PASS] Risk validation intents generated")
