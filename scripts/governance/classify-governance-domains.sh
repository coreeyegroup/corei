#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

OUTPUT_DIR="${ROOT}/governance/repository-governance"

mkdir -p "${OUTPUT_DIR}"

echo "=================================================="
echo "CLASSIFYING GOVERNANCE DOMAINS"
echo "=================================================="

SOURCE_FILE="${OUTPUT_DIR}/immutable-domain-index.json"
RUNTIME_FILE="${OUTPUT_DIR}/runtime-domain-index.json"
ARTIFACT_FILE="${OUTPUT_DIR}/artifact-domain-index.json"
MUTABLE_FILE="${OUTPUT_DIR}/mutable-domain-index.json"

cat <<EOF_JSON > "${SOURCE_FILE}"
{
  "domain": "SOURCE_AUTHORITY",
  "paths": [
    "services/",
    "scripts/",
    "governance/",
    "config/",
    "kubernetes/",
    "contracts/",
    "schemas/",
    "docs/"
  ]
}
EOF_JSON

cat <<EOF_JSON > "${RUNTIME_FILE}"
{
  "domain": "RUNTIME_STATE",
  "paths": [
    "runtime/",
    "logs/",
    "reports/",
    "state/runtime/"
  ]
}
EOF_JSON

cat <<EOF_JSON > "${ARTIFACT_FILE}"
{
  "domain": "ARTIFACT_STORAGE",
  "paths": [
    "artifacts/",
    "images/",
    "snapshots/",
    "exports/"
  ]
}
EOF_JSON

cat <<EOF_JSON > "${MUTABLE_FILE}"
{
  "domain": "MUTABLE_DOMAINS",
  "domains": [
    "RUNTIME_STATE",
    "ARTIFACT_STORAGE",
    "TELEMETRY",
    "RECOVERY_STORAGE"
  ]
}
EOF_JSON

echo "[OK] Immutable domain index created"
echo "[OK] Runtime domain index created"
echo "[OK] Artifact domain index created"
echo "[OK] Mutable domain index created"

echo
echo "=================================================="
echo "GOVERNANCE DOMAIN CLASSIFICATION COMPLETE"
echo "=================================================="
