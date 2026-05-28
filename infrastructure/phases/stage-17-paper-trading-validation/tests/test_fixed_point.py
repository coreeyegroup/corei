#!/usr/bin/env python3

import json
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

events_file = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "financial-events"
    / "financial-events.json"
)

report_file = (
    BASE
    / "reports"
    / "fixed-point-report.txt"
)

print("======================================================")
print("TEST-3 FIXED-POINT ENFORCEMENT VALIDATION")
print("======================================================")

with open(events_file) as f:
    events = json.load(f)

violations = 0
validated = 0

financial_fields = [
    "price",
    "quantity",
    "notional",
    "pnl",
    "fees",
    "event_time"
]

for event in events:

    for field in financial_fields:

        value = event[field]

        if isinstance(value, float):
            violations += 1

        if not isinstance(value, int):
            violations += 1

    validated += 1

with open(report_file, "w") as report:
    report.write(f"VALIDATED_EVENTS={validated}\n")
    report.write(f"FLOAT_VIOLATIONS={violations}\n")

    if violations == 0:
        report.write("RESULT=PASS\n")
    else:
        report.write("RESULT=FAIL\n")

if violations == 0:
    print("[PASS] 0 floats detected")
    sys.exit(0)
else:
    print(f"[FAIL] Float violations detected: {violations}")
    sys.exit(1)
