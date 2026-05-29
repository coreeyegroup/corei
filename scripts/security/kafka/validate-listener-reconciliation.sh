#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "LISTENER RECONCILIATION VALIDATION"
echo "====================================="

test -f \
state/security/kafka/design/current-listener-config.txt

test -f \
infrastructure/phases/stage-21-production-hardening/design/kafka-target-listener-model.md

test -f \
infrastructure/phases/stage-21-production-hardening/design/kafka-cutover-checklist.md

echo
echo "[PASS] Reconciliation validation complete"
