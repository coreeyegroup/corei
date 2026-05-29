#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "REAL STATEFULSET GENERATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/security-mutation/kafka-statefulset-secured-final.yaml

test -f state/security/kafka/final-manifest-review/original.yaml

test -f state/security/kafka/final-manifest-review/runtime-changes.md

test -f state/security/kafka/final-manifest-review/deployable-manifest-checklist.md

echo
echo "[PASS] StatefulSet generation package validated"
