#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "FINAL SECURITY MANIFEST VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/deployment-diff.md

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/rollback-validation.md

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/final-statefulset-mutation.md

echo
echo "[PASS] Final manifest package validated"
