#!/bin/bash

set -e

echo "[Stage-14] Validating signal-processor-service..."

FILES=(
"core_platform/services/signal-processor-service/app/main.py"
"core_platform/services/signal-processor-service/app/health.py"
"core_platform/services/signal-processor-service/SIGNAL-GOVERNANCE.md"
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

echo "[Stage-14] signal-processor-service validation PASSED"
