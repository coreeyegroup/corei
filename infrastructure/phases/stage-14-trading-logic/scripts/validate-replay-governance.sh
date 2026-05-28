#!/bin/bash

set -e

echo "[Stage-14] Validating replay governance..."

FILES=(
"infrastructure/replay/stage-14/datasets/trading-lineage.json"
"infrastructure/replay/stage-14/contracts/replay-governance.md"
"infrastructure/replay/stage-14/run-replay.py"
)

for file in "${FILES[@]}"
do
    if [ -f "$file" ]; then
        echo "[PASS] Replay asset exists: $file"
    else
        echo "[FAIL] Missing replay asset: $file"
        exit 1
    fi
done

echo "[Stage-14] Replay governance validation PASSED"
