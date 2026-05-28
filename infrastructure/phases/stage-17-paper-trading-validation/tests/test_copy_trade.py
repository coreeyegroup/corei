#!/usr/bin/env python3

import json
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

copy_file = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "copy-trade"
    / "copy-trades.json"
)

report_file = (
    BASE
    / "reports"
    / "copy-trade-report.txt"
)

print("======================================================")
print("TEST-7 COPY TRADE CORRECTNESS VALIDATION")
print("======================================================")

with open(copy_file) as f:
    records = json.load(f)

validated = 0
failures = 0

for record in records:

    expected_lot = int(
        record["master_lot"]
        * (
            record["follower_equity"]
            / record["master_equity"]
        )
    )

    if expected_lot != record["actual_follower_lot"]:
        failures += 1
        continue

    if (
        record["parent_trade_intent_id"]
        !=
        record["master_trade_intent_id"]
    ):
        failures += 1
        continue

    if record["propagation_latency_ms"] >= 50:
        failures += 1
        continue

    validated += 1

with open(report_file, "w") as report:

    report.write(f"VALIDATED_RECORDS={validated}\n")
    report.write(f"FAILURES={failures}\n")

    if failures == 0:
        report.write("RESULT=PASS\n")
    else:
        report.write("RESULT=FAIL\n")

if failures == 0:
    print("[PASS] Copy-trade correctness validated")
    sys.exit(0)
else:
    print("[FAIL] Copy-trade validation failed")
    sys.exit(1)
