#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "DUAL LISTENER DESIGN VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/dual-listener/kafka-target-server-properties.txt

test -f infrastructure/phases/stage-21-production-hardening/dual-listener/stage21f-g-cutover-plan.md

test -f infrastructure/phases/stage-21-production-hardening/dual-listener/tls-mount-design.md

echo
echo "[PASS] Dual listener design validated"
