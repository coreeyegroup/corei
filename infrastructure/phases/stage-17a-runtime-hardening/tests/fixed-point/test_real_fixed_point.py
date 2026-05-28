#!/usr/bin/env python3

import json
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17a-runtime-hardening")

session_id = (
    BASE / "runtime/state/active-runtime-session.id"
).read_text().strip()

payload_file = (
    BASE
    / "runtime"
    / "financial-payloads"
    / f"{session_id}.financial-payloads.json"
)

report_file = (
    BASE
    / "reports"
    / "real-fixed-point-validation.txt"
)

print("======================================================")
print("REAL FIXED-POINT CERTIFICATION")
print("======================================================")

with open(payload_file) as f:
    payloads = json.load(f)

violations = 0
validated = 0

financial_fields = [
    "price",
    "quantity",
    "notional",
    "realized_pnl",
    "unrealized_pnl"
]

for payload in payloads:

    for field in financial_fields:

        value = payload[field]

        if isinstance(value, float):

            violations += 1

        elif not isinstance(value, int):

            violations += 1

    validated += 1

with open(report_file, "w") as report:

    report.write(
        f"VALIDATED_PAYLOADS={validated}\n"
    )

    report.write(
        f"FLOAT_VIOLATIONS={violations}\n"
    )

    if violations == 0:

        report.write("RESULT=PASS\n")

    else:

        report.write("RESULT=FAIL\n")

if violations == 0:

    print("[PASS] Real fixed-point certification passed")
    sys.exit(0)

else:

    print("[FAIL] Fixed-point violations detected")
    sys.exit(1)
