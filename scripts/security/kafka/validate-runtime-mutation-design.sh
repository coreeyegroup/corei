#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "RUNTIME MUTATION DESIGN VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/runtime-mutation-design/kafka-server-properties-secured.txt

test -f infrastructure/phases/stage-21-production-hardening/runtime-mutation-design/kafka-startup-script-secured.txt

test -f infrastructure/phases/stage-21-production-hardening/runtime-mutation-design/kafka-runtime-env-design.md

test -f infrastructure/phases/stage-21-production-hardening/runtime-mutation-design/kafka-final-rollout-checklist.md

echo
echo "[PASS] Runtime mutation design validated"
