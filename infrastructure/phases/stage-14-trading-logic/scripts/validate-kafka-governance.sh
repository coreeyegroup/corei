#!/bin/bash

set -e

echo "[Stage-14] Validating Kafka governance..."

FILES=(
"kubernetes/trading-logic/kafka/topics.yaml"
"docs/governance/trading-event-governance/topic-governance.md"
"kafka/stage-14/create-topics.sh"
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

echo "[Stage-14] Kafka governance validation PASSED"
