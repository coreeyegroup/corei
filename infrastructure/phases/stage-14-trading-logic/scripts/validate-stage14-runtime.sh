#!/bin/bash

set -e

echo "[Stage-14] Running end-to-end runtime validation..."

SCRIPTS=(
"validate-schema-governance.sh"
"validate-kafka-governance.sh"
"validate-screening-service.sh"
"validate-monitoring-service.sh"
"validate-strategy-engine.sh"
"validate-signal-processor.sh"
"validate-decision-engine.sh"
)

for script in "${SCRIPTS[@]}"
do
    echo ""
    echo "[Stage-14] Running: $script"

    bash infrastructure/phases/stage-14-trading-logic/scripts/$script
done

echo ""
echo "[Stage-14] FULL STAGE-14 VALIDATION PASSED"
