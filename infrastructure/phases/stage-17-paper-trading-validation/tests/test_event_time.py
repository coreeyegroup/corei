#!/usr/bin/env python3

import json
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

event_file = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "event-time"
    / "event-times.json"
)

report_file = (
    BASE
    / "reports"
    / "event-time-report.txt"
)

print("======================================================")
print("TEST-8 EVENT-TIME GOVERNANCE VALIDATION")
print("======================================================")

with open(event_file) as f:
    records = json.load(f)

validated = 0
violations = 0

for record in records:

    if not isinstance(record["event_time_ns"], int):
        violations += 1
        continue

    if not isinstance(record["exchange_timestamp_ns"], int):
        violations += 1
        continue

    if record["delta_ms"] > 100:
        violations += 1
        continue

    if record["derived_from_exchange"] is not True:
        violations += 1
        continue

    validated += 1

with open(report_file, "w") as report:

    report.write(f"VALIDATED_EVENTS={validated}\n")
    report.write(f"VIOLATIONS={violations}\n")

    if violations == 0:
        report.write("RESULT=PASS\n")
    else:
        report.write("RESULT=FAIL\n")

if violations == 0:
    print("[PASS] Event-time governance validated")
    sys.exit(0)
else:
    print("[FAIL] Event-time governance violation detected")
    sys.exit(1)
