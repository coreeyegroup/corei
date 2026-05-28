#!/usr/bin/env bash

PASS=true

check() {
    local name="$1"
    local command="$2"

    if eval "$command" >/dev/null 2>&1; then
        echo "PASS -> $name"
    else
        echo "FAIL -> $name"
        PASS=false
    fi
}

echo "========================================="
echo "Stage 03 Governance Validation"
echo "========================================="

check "governance directory exists" \
"[ -d \"$HOME/corei/governance\" ]"

check "schemas directory exists" \
"[ -d \"$HOME/corei/schemas\" ]"

check "contracts directory exists" \
"[ -d \"$HOME/corei/contracts\" ]"

check "system-registry exists" \
"[ -d \"$HOME/corei/core_platform/system-registry\" ]"

check "governance scripts exist" \
"[ -d \"$HOME/corei/scripts/governance\" ]"

check "docs/stage-03 exists" \
"[ -d \"$HOME/corei/docs/stage-03\" ]"

echo "========================================="

if [ "$PASS" = true ]; then
    echo "STAGE 03 VALIDATION: PASS"
    exit 0
else
    echo "STAGE 03 VALIDATION: FAIL"
    exit 1
fi
