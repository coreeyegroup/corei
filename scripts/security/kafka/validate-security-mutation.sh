#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "SECURITY MUTATION VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/kafka-statefulset-live.yaml

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/kafka-security-mutation-spec.md

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/kafka-runtime-patch.yaml

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/deployment-readiness.md

echo
echo "[PASS] Security mutation package validated"
