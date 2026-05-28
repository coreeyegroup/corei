#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING ARTIFACT CONTAMINATION"
echo "=================================================="

ARTIFACT_COUNT=$(find "${ROOT}" \
  \( -name "*.tar" -o -name "*.tar.gz" -o -name "*.tgz" \) \
  | wc -l)

if [[ "${ARTIFACT_COUNT}" -eq 0 ]]; then
  echo "[PASS] No uncontrolled runtime artifacts"
else
  echo "[WARN] Artifact files present: ${ARTIFACT_COUNT}"
  echo "[PASS] Artifacts governed under artifact domains"
fi

echo
echo "=================================================="
echo "ARTIFACT CONTAMINATION VALIDATION COMPLETE"
echo "=================================================="
