#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "BROKER PREPARATION VALIDATION"
echo "====================================="

test -f state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

test -f state/security/kafka/recovery/kafka-config-pre-sasl.yaml

test -f state/security/kafka/recovery/pods.txt

test -f state/security/kafka/recovery/services.txt

test -f state/security/kafka/recovery/pvc.txt

echo
echo "[PASS] Preparation validation complete"
