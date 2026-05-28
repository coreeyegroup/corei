#!/bin/bash

set -e

echo "[Stage-14] Validating instrument-monitoring-service..."

FILES=(
"core_platform/services/instrument-monitoring-service/app/main.py"
"core_platform/services/instrument-monitoring-service/app/health.py"
"core_platform/services/instrument-monitoring-service/MONITORING-GOVERNANCE.md"
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

echo "[Stage-14] instrument-monitoring-service validation PASSED"
