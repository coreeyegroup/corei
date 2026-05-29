#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "BROKER SECURITY DEPLOYMENT VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/broker-security-deployment/kafka-statefulset-security-patch.yaml

test -f infrastructure/phases/stage-21-production-hardening/broker-security-deployment/kafka-jaas-runtime.conf

test -f infrastructure/phases/stage-21-production-hardening/broker-security-deployment/kafka-runtime-secret-spec.yaml

test -f infrastructure/phases/stage-21-production-hardening/broker-security-deployment/broker-security-rollback.sh

test -f infrastructure/phases/stage-21-production-hardening/broker-security-deployment/deployment-checklist.md

echo
echo "[PASS] Deployment package validated"
