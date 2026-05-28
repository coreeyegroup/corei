#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

STATE_DIR="${ROOT}/state/live-validation"
REPORT_DIR="${ROOT}/reports/live-validation"
AUDIT_DIR="${ROOT}/audit/live-validation"

REPORT_FILE="${REPORT_DIR}/precondition-report.json"
AUDIT_FILE="${AUDIT_DIR}/live-validation-audit.log"

TIMESTAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

PASS_COUNT=0
FAIL_COUNT=0

log() {
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] $1" \
        | tee -a "${AUDIT_FILE}"
}

pass() {
    PASS_COUNT=$((PASS_COUNT+1))
    log "[PASS] $1"
}

fail() {
    FAIL_COUNT=$((FAIL_COUNT+1))
    log "[FAIL] $1"
}

log "=================================================="
log "STAGE 20.2 LIVE PRECONDITION VALIDATION"
log "=================================================="

#
# DOMAIN 1 — STAGE VALIDATION
#

if grep -q "STAGE_17" "${ROOT}/state/install.state"; then
    pass "Stage 17 present"
else
    fail "Stage 17 missing"
fi

if grep -q "STAGE_18" "${ROOT}/state/install.state"; then
    pass "Stage 18 present"
else
    fail "Stage 18 missing"
fi

if grep -q "STAGE_19" "${ROOT}/state/install.state"; then
    pass "Stage 19 present"
else
    fail "Stage 19 missing"
fi

#
# DOMAIN 2 — REPLAY VALIDATION
#

if [[ -x "${ROOT}/scripts/platform/run-deterministic-replay-validation.sh" ]]; then
    pass "Replay validation script exists"
else
    fail "Replay validation script missing"
fi

#
# DOMAIN 3 — LIVE MODE ISOLATION
#

if grep -q "LIVE_ACTIVATION_ENABLED=false" \
    "${ROOT}/ops/live-activation/live-activation.env"; then
    pass "Live activation correctly disabled"
else
    fail "Live activation unexpectedly enabled"
fi

#
# DOMAIN 4 — GIT FREEZE VALIDATION
#

if [[ -z "$(git -C "${ROOT}" status --short)" ]]; then
    pass "Git working tree clean"
else
    fail "Git working tree not clean"
fi

#
# DOMAIN 5 — OBSERVABILITY VALIDATION
#

if kubectl get pods -n observability >/dev/null 2>&1; then
    pass "Observability namespace accessible"
else
    fail "Observability validation failed"
fi

#
# DOMAIN 6 — RECOVERY GOVERNANCE
#

if [[ -d "${ROOT}/infrastructure/backups" ]]; then
    pass "Backup governance present"
else
    fail "Backup governance missing"
fi

#
# FINAL STATUS
#

cat > "${REPORT_FILE}" <<EOF
{
  "timestamp": "${TIMESTAMP}",
  "stage": "20.2",
  "pass_count": ${PASS_COUNT},
  "fail_count": ${FAIL_COUNT},
  "status": "$( [[ ${FAIL_COUNT} -eq 0 ]] && echo PASS || echo FAIL )"
}
EOF

if [[ ${FAIL_COUNT} -eq 0 ]]; then
    echo "LIVE_PRECONDITION_VALIDATION=PASS" \
        > "${STATE_DIR}/live-preconditions.state"

    log "=================================================="
    log "LIVE PRECONDITION VALIDATION PASSED"
    log "LIVE ACTIVATION REMAINS DISABLED"
    log "=================================================="

    exit 0
else
    echo "LIVE_PRECONDITION_VALIDATION=FAIL" \
        > "${STATE_DIR}/live-preconditions.state"

    log "=================================================="
    log "LIVE PRECONDITION VALIDATION FAILED"
    log "LIVE ACTIVATION BLOCKED"
    log "=================================================="

    exit 1
fi
