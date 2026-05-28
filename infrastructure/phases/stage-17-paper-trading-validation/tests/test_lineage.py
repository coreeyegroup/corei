#!/usr/bin/env python3

import json
import hashlib
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

lineage_file = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "lineage"
    / "lineage.json"
)

report_file = (
    BASE
    / "reports"
    / "lineage-report.txt"
)

print("======================================================")
print("TEST-2 LINEAGE CONTINUITY VALIDATION")
print("======================================================")

with open(lineage_file) as f:
    records = json.load(f)

validated = 0

for record in records:

    tick_hash = record["tick"]["hash"]

    expected_signal = hashlib.sha256(
        f"{record['signal']['id']}:{tick_hash}".encode()
    ).hexdigest()

    if expected_signal != record["signal"]["hash"]:
        print("[FAIL] Signal lineage break")
        sys.exit(1)

    expected_risk = hashlib.sha256(
        f"{record['risk']['id']}:{record['signal']['hash']}".encode()
    ).hexdigest()

    if expected_risk != record["risk"]["hash"]:
        print("[FAIL] Risk lineage break")
        sys.exit(1)

    expected_order = hashlib.sha256(
        f"{record['order']['id']}:{record['risk']['hash']}".encode()
    ).hexdigest()

    if expected_order != record["order"]["hash"]:
        print("[FAIL] Order lineage break")
        sys.exit(1)

    expected_fill = hashlib.sha256(
        f"{record['fill']['id']}:{record['order']['hash']}".encode()
    ).hexdigest()

    if expected_fill != record["fill"]["hash"]:
        print("[FAIL] Fill lineage break")
        sys.exit(1)

    validated += 1

with open(report_file, "w") as report:
    report.write(f"VALIDATED_CHAINS={validated}\n")
    report.write("RESULT=PASS\n")

print(f"[PASS] {validated}/20 lineage chains intact")

sys.exit(0)
