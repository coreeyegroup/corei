#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-I-A BROKER SECURITY DESIGN"
echo "====================================="

bash scripts/security/kafka/validate-broker-security-design.sh

echo
echo "[PASS] Stage-21F-I-A completed"
