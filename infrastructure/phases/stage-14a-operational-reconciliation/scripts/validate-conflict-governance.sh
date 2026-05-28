#!/bin/bash

set -e

echo "[Stage-14A] Validating conflict governance..."

FILES=(
"core_platform/services/conflict_resolver.py"
"docs/governance/trading-conflict-governance.md"
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

echo "[Stage-14A] Conflict governance validation PASSED"
