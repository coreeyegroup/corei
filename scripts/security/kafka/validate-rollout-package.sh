#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "ROLLOUT PACKAGE VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/kafka-rollout/kafka-statefulset-secured.yaml

test -f infrastructure/phases/stage-21-production-hardening/kafka-rollout/kafka-server-properties-template.conf

test -f infrastructure/phases/stage-21-production-hardening/kafka-rollout/kafka-jaas-runtime.conf

test -f infrastructure/phases/stage-21-production-hardening/kafka-rollout/rollout-kafka-security.sh

test -f infrastructure/phases/stage-21-production-hardening/kafka-rollout/rollback-kafka-security.sh

test -f infrastructure/phases/stage-21-production-hardening/kafka-rollout/validate-kafka-security.sh

echo
echo "[PASS] Rollout package validated"
