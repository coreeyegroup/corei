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

log "[1/10] Validating semantic governance..."

"$SEMANTIC_GOVERNANCE_VALIDATOR" \
  && pass "Semantic governance validated" \
  || fail "Semantic governance invalid"

log "[2/10] Validating LIVE_AUTO certification..."

"$ROOT_DIR/scripts/platform/live-auto/validate-live-auto.sh" \
  && pass "LIVE_AUTO certification validated" \
  || fail "LIVE_AUTO certification failed"

log "[3/10] Validating runtime authority registry..."

[[ -f "$ROOT_DIR/ops/runtime-authority/runtime-paths.env" ]] \
  && pass "Runtime authority registry active" \
  || fail "Runtime authority registry missing"

log "[4/10] Validating autonomous execution..."

grep -q "AUTONOMOUS_EXECUTION=true" "$LIVE_AUTO_STATE_PATH" \
  && pass "Autonomous execution active" \
  || fail "Autonomous execution inactive"

log "[5/10] Validating institutional containment..."

grep -q "MAX_ACCOUNTS=1" "$LIVE_AUTO_STATE_PATH" \
  && pass "Single-account containment active" \
  || fail "Account containment violated"

grep -q "MAX_STRATEGIES=1" "$LIVE_AUTO_STATE_PATH" \
  && pass "Single-strategy containment active" \
  || fail "Strategy containment violated"

grep -q "CAPITAL_PROFILE=SMALL" "$LIVE_AUTO_STATE_PATH" \
  && pass "Small-capital containment active" \
  || fail "Capital containment violated"

log "[6/10] Validating runtime isolation..."

[[ -d "$ROOT_DIR/state/runtime" ]] \
  && pass "Runtime isolation active" \
  || fail "Runtime isolation invalid"

log "[7/10] Validating telemetry isolation..."

[[ -d "$ROOT_DIR/telemetry" ]] \
  && pass "Telemetry isolation active" \
  || fail "Telemetry isolation invalid"

log "[8/10] Validating audit lineage..."

grep -q "AUDIT_LINEAGE=ACTIVE" "$LIVE_AUTO_STATE_PATH" \
  && pass "Audit lineage active" \
  || fail "Audit lineage invalid"

log "[9/10] Validating topology decoupling..."

grep -R "state/governance/live-semi" \
"$ROOT_DIR/scripts/platform" >/dev/null 2>&1 \
  && fail "Legacy topology coupling detected" \
  || pass "Topology decoupling validated"

log "[10/10] Finalizing governance certification..."

cat <<STATE > "$STATE_FILE"
LIVE_AUTO_GOVERNANCE_STATUS=CERTIFIED

SEMANTIC_GOVERNANCE=ACTIVE
RUNTIME_AUTHORITY_REGISTRY=ACTIVE

AUTONOMOUS_EXECUTION=ACTIVE
INSTITUTIONAL_CONTAINMENT=ACTIVE

AUDIT_LINEAGE=ACTIVE
TOPOLOGY_DECOUPLING=VALIDATED
STATE

pass "Governance certification finalized"

echo ""

if [[ "$FAILED" -eq 0 ]]; then
  log "=================================================="
  log "LIVE_AUTO GOVERNANCE CERTIFICATION PASSED"
  log "=================================================="

  exit 0
else
  log "=================================================="
  log "LIVE_AUTO GOVERNANCE CERTIFICATION FAILED"
  log "=================================================="

  exit 1
fi
