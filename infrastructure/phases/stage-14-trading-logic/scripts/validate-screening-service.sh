#!/bin/bash

set -e

echo "[Stage-14] Validating instrument-screening-service..."

FILES=(
"core_platform/services/instrument-screening-service/app/main.py"
"core_platform/services/instrument-screening-service/app/health.py"
"core_platform/services/instrument-screening-service/SCREENING-GOVERNANCE.md"
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

echo "[Stage-14] instrument-screening-service validation PASSED"
