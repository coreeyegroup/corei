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
echo "Stage 02 Repository Validation"
echo "========================================="

check "services exists" "[ -d ~/corei/services ]"

check "_template exists" "[ -d ~/corei/services/_template ]"

check "infrastructure exists" "[ -d ~/corei/infrastructure ]"

check "schemas exists" "[ -d ~/corei/schemas ]"

check "Makefile exists" "[ -f ~/corei/Makefile ]"

check "VERSION exists" "[ -f ~/corei/VERSION ]"

check ".env.example exists" "[ -f ~/corei/.env.example ]"

check "shared lib exists" "[ -f ~/corei/infrastructure/scripts/lib/log.sh ]"

check "pre-commit installed" "[ -f ~/corei/.git/hooks/pre-commit ]"

echo "========================================="

if [ "$PASS" = true ]; then
    echo "STAGE 02 VALIDATION: PASS"
    exit 0
else
    echo "STAGE 02 VALIDATION: FAIL"
    exit 1
fi
