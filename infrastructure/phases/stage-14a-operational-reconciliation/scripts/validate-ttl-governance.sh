#!/bin/bash

set -e

echo "[Stage-14A] Validating TTL governance..."

FILES=(
"core_platform/services/ttl_validator.py"
"docs/governance/trading-temporal-governance.md"
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

echo "[Stage-14A] TTL governance validation PASSED"
