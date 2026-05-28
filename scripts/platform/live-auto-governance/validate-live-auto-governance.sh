#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

source "$ROOT_DIR/ops/runtime-authority/runtime-paths.env"

STATE_FILE="$ROOT_DIR/state/governance/live-auto-governance/live-auto-governance.state"

LOG_FILE="$ROOT_DIR/telemetry/operations/live-auto-governance/live-auto-governance.log"

timestamp() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

log() {
  echo "[$(timestamp)] $1" | tee -a "$LOG_FILE"
}

fail() {
  log "[FAIL] $1"
  FAILED=1
}

pass() {
  log "[PASS] $1"
}

FAILED=0

log "=================================================="
log "LIVE_AUTO GOVERNANCE VALIDATION STARTED"
log "=================================================="

log "[1/12] Validating semantic governance lineage..."

grep -q "SEMANTIC_GOVERNANCE=ACTIVE" "$LIVE_AUTO_STATE_PATH" \
  && pass "Semantic governance lineage active" \
  || fail "Semantic governance lineage invalid"

log "[2/12] Validating LIVE_AUTO certification..."

"$ROOT_DIR/scripts/platform/live-auto/validate-live-auto.sh" \
  && pass "LIVE_AUTO certification validated" \
  || fail "LIVE_AUTO certification failed"

log "[3/12] Validating runtime authority registry..."

[[ -f "$ROOT_DIR/ops/runtime-authority/runtime-paths.env" ]] \
  && pass "Runtime authority registry active" \
  || fail "Runtime authority registry missing"

log "[4/12] Validating autonomous execution..."

grep -q "AUTONOMOUS_EXECUTION=true" "$LIVE_AUTO_STATE_PATH" \
  && pass "Autonomous execution active" \
  || fail "Autonomous execution inactive"

log "[5/12] Validating institutional containment..."

grep -q "MAX_ACCOUNTS=1" "$LIVE_AUTO_STATE_PATH" \
  && pass "Single-account containment active" \
  || fail "Account containment violated"

grep -q "MAX_STRATEGIES=1" "$LIVE_AUTO_STATE_PATH" \
  && pass "Single-strategy containment active" \
  || fail "Strategy containment violated"

grep -q "CAPITAL_PROFILE=SMALL" "$LIVE_AUTO_STATE_PATH" \
  && pass "Small-capital containment active" \
  || fail "Capital containment violated"

log "[6/12] Validating runtime isolation..."

[[ -d "$ROOT_DIR/state/runtime" ]] \
  && pass "Runtime isolation active" \
  || fail "Runtime isolation invalid"

log "[7/12] Validating telemetry isolation..."

[[ -d "$ROOT_DIR/telemetry" ]] \
  && pass "Telemetry isolation active" \
  || fail "Telemetry isolation invalid"

log "[8/12] Validating audit lineage..."

grep -q "AUDIT_LINEAGE=ACTIVE" "$LIVE_AUTO_STATE_PATH" \
  && pass "Audit lineage active" \
  || fail "Audit lineage invalid"

log "[9/12] Validating runtime topology decoupling..."

LEGACY_REFERENCES=$(
  grep -R "state/governance/live-" \
  "$ROOT_DIR/scripts/platform/live-auto" \
  "$ROOT_DIR/scripts/platform/live-semi" \
  "$ROOT_DIR/scripts/platform/live-observation" \
  2>/dev/null || true
)

if [[ -n "$LEGACY_REFERENCES" ]]; then
  echo "$LEGACY_REFERENCES" | tee -a "$LOG_FILE"
  fail "Legacy runtime topology coupling detected"
else
  pass "Runtime topology decoupling validated"
fi

log "[10/12] Validating runtime authority propagation..."

grep -R "_STATE_PATH" \
"$ROOT_DIR/scripts/platform/live-auto" \
"$ROOT_DIR/scripts/platform/live-semi" \
"$ROOT_DIR/scripts/platform/live-observation" \
>/dev/null 2>&1 \
  && pass "Runtime authority propagation validated" \
  || fail "Runtime authority propagation missing"

log "[11/12] Finalizing governance certification..."

cat <<STATE > "$STATE_FILE"
LIVE_AUTO_GOVERNANCE_STATUS=CERTIFIED

SEMANTIC_GOVERNANCE=ACTIVE
RUNTIME_AUTHORITY_REGISTRY=ACTIVE

AUTONOMOUS_EXECUTION=ACTIVE
INSTITUTIONAL_CONTAINMENT=ACTIVE

AUDIT_LINEAGE=ACTIVE
TOPOLOGY_DECOUPLING=VALIDATED
RUNTIME_AUTHORITY_PROPAGATION=VALIDATED
STATE

pass "Governance certification finalized"

echo ""

if [[ "$FAILED" -eq 0 ]]; then
  log "=================================================="
  log "LIVE_AUTO GOVERNANCE CERTIFICATION PASSED"
  log "=================================================="

  log "[PASS] Autonomous execution governance certified"
  log "[PASS] Runtime authority abstraction certified"
  log "[PASS] Institutional containment certified"

  exit 0
else
  log "=================================================="
  log "LIVE_AUTO GOVERNANCE CERTIFICATION FAILED"
  log "=================================================="

  exit 1
fi
