#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-I-D ROLLOUT PACKAGE"
echo "====================================="

bash scripts/security/kafka/validate-rollout-package.sh

echo
echo "[PASS] Stage-21F-I-D completed"
