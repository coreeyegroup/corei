#!/bin/bash

set -e

echo "[Stage-14A] Validating service orchestration governance..."

FILES=(
"infrastructure/phases/stage-14a-operational-reconciliation/scripts/start-services.sh"
"infrastructure/phases/stage-14a-operational-reconciliation/scripts/stop-services.sh"
"infrastructure/phases/stage-14a-operational-reconciliation/scripts/validate-runtime-readiness.sh"
"docs/governance/trading-runtime-governance.md"
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

echo "[Stage-14A] Service orchestration governance validation PASSED"
