#!/usr/bin/env bash

set -euo pipefail

FAILURES=0

echo "=================================================="
echo "STAGE-21B TOPOLOGY VALIDATION"
echo "=================================================="

echo "[CHECK] Kubernetes connectivity"

if kubectl cluster-info >/dev/null 2>&1; then
    echo "[PASS] Kubernetes reachable"
else
    echo "[FAIL] Kubernetes unreachable"
    FAILURES=$((FAILURES+1))
fi

echo "[CHECK] Node readiness"

NOT_READY=$(kubectl get nodes --no-headers 2>/dev/null | grep -vc " Ready " || true)

if [ "${NOT_READY}" -eq 0 ]; then
    echo "[PASS] All nodes Ready"
else
    echo "[FAIL] Some nodes not Ready"
    FAILURES=$((FAILURES+1))
fi

echo "[CHECK] Stage-21 topology"

REQUIRED_DIRS=(
    infrastructure/components/wireguard
    infrastructure/components/velero
    infrastructure/components/cosign
    infrastructure/components/wal-archive
    infrastructure/components/chaos-mesh
)

for d in "${REQUIRED_DIRS[@]}"; do
    if [ -d "${d}" ]; then
        echo "[PASS] ${d}"
    else
        echo "[FAIL] ${d}"
        FAILURES=$((FAILURES+1))
    fi
done

echo "[CHECK] Governance topology"

test -d scripts/security || FAILURES=$((FAILURES+1))
test -d scripts/network || FAILURES=$((FAILURES+1))
test -d scripts/backup || FAILURES=$((FAILURES+1))
test -d scripts/performance || FAILURES=$((FAILURES+1))
test -d scripts/chaos || FAILURES=$((FAILURES+1))

echo "[CHECK] Inventory generation"

COUNT=$(find infrastructure/phases/stage-21-production-hardening/reports \
-type f | wc -l)

if [ "${COUNT}" -gt 0 ]; then
    echo "[PASS] Reports generated: ${COUNT}"
else
    echo "[FAIL] No reports generated"
    FAILURES=$((FAILURES+1))
fi

echo "=================================================="

if [ "${FAILURES}" -ne 0 ]; then
    echo "[FAIL] STAGE-21B VALIDATION FAILED"
    exit 1
fi

echo "[PASS] STAGE-21B VALIDATION PASSED"
