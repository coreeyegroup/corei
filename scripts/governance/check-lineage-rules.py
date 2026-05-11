#!/usr/bin/env python3

from pathlib import Path
import sys

ROOT = Path.home() / "corei"

PASS = True

EXCLUDED_PATHS = [
    "scripts/governance",
]

print("=========================================")
print("Lineage Governance Validation")
print("=========================================")

python_files = list(ROOT.rglob("*.py"))

for pyfile in python_files:

    relative = str(pyfile.relative_to(ROOT))

    # =====================================
    # Skip governance tooling
    # =====================================

    if any(excluded in relative for excluded in EXCLUDED_PATHS):
        continue

    content = pyfile.read_text(errors="ignore")

    # =====================================
    # Forbidden runtime timestamp logic
    # =====================================

    if "time.time()" in content:
        print(f"FAIL -> forbidden time.time() usage: {pyfile}")
        PASS = False

    # =====================================
    # Lineage enforcement
    # =====================================

    if "service" in relative:

        if "lineage" not in content.lower():
            print(f"WARN -> lineage reference missing: {pyfile}")

print("=========================================")

if PASS:
    print("LINEAGE VALIDATION: PASS")
    sys.exit(0)
else:
    print("LINEAGE VALIDATION: FAIL")
    sys.exit(1)
