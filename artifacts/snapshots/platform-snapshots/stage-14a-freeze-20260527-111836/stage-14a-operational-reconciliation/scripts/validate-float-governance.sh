#!/bin/bash

set -e

echo "[Stage-14A] Validating FLOAT governance..."

FILES=(
"core_platform/services/float_auditor.py"
"docs/governance/trading-numeric-governance.md"
)

for file in "${FILES[@]}"
do

    if [ -f "$file" ]; then
        echo "[PASS] Governance asset exists: $file"
    else
        echo "[FAIL] Missing governance asset: $file"
        exit 1
    fi

done

echo "[Stage-14A] FLOAT governance validation PASSED"
