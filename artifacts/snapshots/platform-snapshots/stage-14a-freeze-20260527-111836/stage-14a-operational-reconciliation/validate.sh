#!/bin/bash

set -e

echo "[Stage-14A] AUTHORITATIVE VALIDATION INITIALIZED"
echo ""

VALIDATORS=(
"validate-service-orchestration.sh"
"validate-runtime-readiness.sh"
"validate-event-transport.sh"
"validate-ttl-governance.sh"
"validate-float-governance.sh"
"validate-conflict-governance.sh"
)

for validator in "${VALIDATORS[@]}"
do

    echo "[Stage-14A] Running: $validator"

    bash \
    infrastructure/phases/stage-14a-operational-reconciliation/scripts/$validator

    echo ""

done

echo "[Stage-14A] Validating runtime event lineage..."

TOPICS=(
"instrument_screened"
"instrument_monitor_events"
"signal_events"
"decision_events"
)

for topic in "${TOPICS[@]}"
do

    COUNT=$(find runtime/stage-14/events/$topic -type f | wc -l)

    if [ "$COUNT" -gt 0 ]; then
        echo "[PASS] Topic active: $topic count=$COUNT"
    else
        echo "[FAIL] Topic inactive: $topic"
        exit 1
    fi

done

echo ""

echo "[Stage-14A] Validating runtime stability..."

if grep -R "Traceback" runtime/stage-14/logs > /dev/null
then
    echo "[FAIL] Runtime traceback detected"
    exit 1
else
    echo "[PASS] No runtime tracebacks detected"
fi

echo ""

echo "[Stage-14A] Validating FLOAT integrity..."

if grep -R "FLOAT DETECTED" runtime/stage-14/logs > /dev/null
then
    echo "[FAIL] FLOAT violation detected"
    exit 1
else
    echo "[PASS] FLOAT integrity verified"
fi

echo ""

echo "[Stage-14A] FULL AUTHORITATIVE VALIDATION PASSED"
