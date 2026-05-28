#!/usr/bin/env python3

import json
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17-paper-trading-validation")

session_id = (
    BASE / "runtime/state/active-session.id"
).read_text().strip()

risk_file = (
    BASE
    / "runtime/paper-session"
    / session_id
    / "risk-validation"
    / "risk-intents.json"
)

report_file = (
    BASE
    / "reports"
    / "risk-enforcement-report.txt"
)

print("======================================================")
print("TEST-5 RISK ENFORCEMENT VALIDATION")
print("======================================================")

with open(risk_file) as f:
    intents = json.load(f)

validated = 0
failures = 0

for intent in intents:

    if intent["risk_status"] != "risk_rejected":
        failures += 1
    else:
        validated += 1

with open(report_file, "w") as report:

    report.write(f"VALIDATED_REJECTIONS={validated}\n")
    report.write(f"FAILURES={failures}\n")

    if failures == 0 and validated == 10:
        report.write("RESULT=PASS\n")
    else:
        report.write("RESULT=FAIL\n")

if failures == 0 and validated == 10:
    print("[PASS] 10/10 violating intents rejected")
    sys.exit(0)
else:
    print("[FAIL] Risk enforcement violation detected")
    sys.exit(1)
