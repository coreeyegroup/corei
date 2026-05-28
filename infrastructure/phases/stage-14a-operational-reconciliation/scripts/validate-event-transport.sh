#!/bin/bash

set -e

echo "[Stage-14A] Validating event transport governance..."

FILES=(
"core_platform/services/event_emitter.py"
"docs/governance/trading-event-transport-governance.md"
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

TOPICS=(
"instrument_screened"
"instrument_monitor_events"
"signal_events"
"decision_events"
)

for topic in "${TOPICS[@]}"
do

    if [ -d "runtime/stage-14/events/$topic" ]; then
        echo "[PASS] Event topic exists: $topic"
    else
        echo "[FAIL] Missing event topic: $topic"
        exit 1
    fi

done

echo "[Stage-14A] Event transport governance validation PASSED"
