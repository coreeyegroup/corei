#!/bin/bash

set -e

echo "[Stage-14] Validating decision-engine-service..."

FILES=(
"core_platform/services/decision-engine-service/app/main.py"
"core_platform/services/decision-engine-service/app/health.py"
"core_platform/services/decision-engine-service/DECISION-GOVERNANCE.md"
)

for file in "${FILES[@]}"
do
    if [ -f "$file" ]; then
        echo "[PASS] Service asset exists: $file"
    else
        echo "[FAIL] Missing service asset: $file"
        exit 1
    fi
done

echo "[Stage-14] decision-engine-service validation PASSED"
