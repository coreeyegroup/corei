#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

STATE_FILE="$ROOT_DIR/state/runtime/live-activation/live-auto/live-auto.state"

LOG_FILE="$ROOT_DIR/telemetry/operations/live-auto/live-auto.log"

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
log "LIVE_AUTO VALIDATION STARTED"
log "=================================================="

log "[1/10] Validating LIVE_AUTO state..."

[[ -f "$STATE_FILE" ]] \
  && pass "LIVE_AUTO state present" \
  || fail "LIVE_AUTO state missing"

log "[2/10] Validating LIVE_AUTO enabled..."

grep -q "LIVE_AUTO_STATUS=ENABLED" "$STATE_FILE" \
  && pass "LIVE_AUTO enabled" \
  || fail "LIVE_AUTO not enabled"

log "[3/10] Validating account mode..."

grep -q "ACCOUNT_MODE=LIVE_AUTO" "$STATE_FILE" \
  && pass "LIVE_AUTO account mode validated" \
  || fail "Account mode invalid"

log "[4/10] Validating autonomous execution..."

grep -q "AUTONOMOUS_EXECUTION=true" "$STATE_FILE" \
  && pass "Autonomous execution enabled" \
  || fail "Autonomous execution invalid"

log "[5/10] Validating human approval release..."

grep -q "HUMAN_APPROVAL_REQUIRED=false" "$STATE_FILE" \
  && pass "Human approval correctly disabled" \
  || fail "Human approval incorrectly enforced"

log "[6/10] Validating semantic governance..."

grep -q "SEMANTIC_GOVERNANCE=ACTIVE" "$STATE_FILE" \
  && pass "Semantic governance active" \
  || fail "Semantic governance invalid"

log "[7/10] Validating kill-switch governance..."

grep -q "KILL_SWITCH_GOVERNANCE=ACTIVE" "$STATE_FILE" \
  && pass "Kill-switch governance active" \
  || fail "Kill-switch governance invalid"

log "[8/10] Validating scaling constraints..."

grep -q "MAX_ACCOUNTS=1" "$STATE_FILE" \
  && pass "Single-account containment enforced" \
  || fail "Account containment violated"

grep -q "MAX_STRATEGIES=1" "$STATE_FILE" \
  && pass "Single-strategy containment enforced" \
  || fail "Strategy containment violated"

grep -q "CAPITAL_PROFILE=SMALL" "$STATE_FILE" \
  && pass "Small-capital containment enforced" \
  || fail "Capital containment violated"

log "[9/10] Validating operational certification..."

grep -q "LIVE_AUTO_CERTIFICATION=PASSED" "$STATE_FILE" \
  && pass "Operational certification validated" \
  || fail "Operational certification invalid"

log "[10/10] Validating audit lineage..."

grep -q "AUDIT_LINEAGE=ACTIVE" "$STATE_FILE" \
  && pass "Audit lineage active" \
  || fail "Audit lineage invalid"

echo ""

if [[ "$FAILED" -eq 0 ]]; then
  log "=================================================="
  log "LIVE_AUTO VALIDATION PASSED"
  log "=================================================="

  log "[PASS] Autonomous execution governance certified"

  exit 0
else
  log "=================================================="
  log "LIVE_AUTO VALIDATION FAILED"
  log "=================================================="

  exit 1
fi
