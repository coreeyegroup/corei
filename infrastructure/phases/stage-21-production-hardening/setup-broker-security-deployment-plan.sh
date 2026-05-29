#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-I-B DEPLOYMENT PLAN"
echo "====================================="

bash scripts/security/kafka/validate-broker-security-deployment-plan.sh

echo
echo "[PASS] Stage-21F-I-B completed"
