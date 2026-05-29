#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-J-B SECURITY MUTATION"
echo "====================================="

bash scripts/security/kafka/validate-security-mutation.sh

echo
echo "[PASS] Stage-21F-J-B completed"
