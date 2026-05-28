#!/usr/bin/env bash
set -euo pipefail

STATE_FILE="install.state"

echo "======================================================"
echo "INSTALL.STATE UPDATE"
echo "======================================================"

if [ ! -f "${STATE_FILE}" ]; then
  touch "${STATE_FILE}"
fi

echo "STAGE_17_GATE=PASSED" >> "${STATE_FILE}"
echo "STAGE_17_GATE_TIMESTAMP=$(date --iso-8601=seconds)" >> "${STATE_FILE}"

echo "[PASS] install.state updated"
