#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

OUTPUT_DIR="${ROOT}/governance/repository-governance"

mkdir -p "${OUTPUT_DIR}"

echo "=================================================="
echo "BUILDING GOVERNANCE DOMAIN INVENTORY"
echo "=================================================="

find "${ROOT}" \
  -path "${ROOT}/.git" -prune -o \
  -type d -print \
  | sort \
  > "${OUTPUT_DIR}/repository-directory-inventory.txt"

find "${ROOT}" \
  -path "${ROOT}/.git" -prune -o \
  -type f -print \
  | sort \
  > "${OUTPUT_DIR}/repository-file-inventory.txt"

TOTAL_DIRS=$(wc -l < "${OUTPUT_DIR}/repository-directory-inventory.txt")
TOTAL_FILES=$(wc -l < "${OUTPUT_DIR}/repository-file-inventory.txt")

cat <<REPORT > "${OUTPUT_DIR}/repository-governance-report.md"
# Repository Governance Inventory

Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

## Inventory Summary

- Total directories: ${TOTAL_DIRS}
- Total files: ${TOTAL_FILES}

## Governance Objective

Classify all repository assets into:
- SOURCE_AUTHORITY
- GOVERNANCE_STATE
- RUNTIME_STATE
- ARTIFACT_STORAGE
- TELEMETRY
- RECOVERY_STORAGE

This inventory becomes the authoritative governance baseline.
REPORT

echo
echo "[OK] Directory inventory created"
echo "[OK] File inventory created"
echo "[OK] Governance report created"

echo
echo "Directories: ${TOTAL_DIRS}"
echo "Files: ${TOTAL_FILES}"

echo
echo "=================================================="
echo "GOVERNANCE DOMAIN INVENTORY COMPLETE"
echo "=================================================="
