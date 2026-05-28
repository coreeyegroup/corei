#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

OBSERVATION_STATE="$ROOT_DIR/state/runtime/live-activation/live-observation/live-observation.state"
LIVE_SEMI_STATE="$ROOT_DIR/state/governance/live-semi/live-semi.state"

LOG_FILE="$ROOT_DIR/telemetry/operations/live-observation/live-observation.log"

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
log "OPERATIONAL STABILITY VALIDATION STARTED"
log "=================================================="

log "[1/10] Validating LIVE_SEMI operational state..."

grep -q "LIVE_SEMI_STATUS=ENABLED" "$LIVE_SEMI_STATE" \
  && pass "LIVE_SEMI operational state active" \
  || fail "LIVE_SEMI operational state invalid"

log "[2/10] Validating observation state..."

grep -q "LIVE_OBSERVATION_STATUS=ACTIVE" "$OBSERVATION_STATE" \
  && pass "Observation state active" \
  || fail "Observation state invalid"

log "[3/10] Validating reconciliation stability..."

grep -q "RECONCILIATION_STATUS=PASSED" "$OBSERVATION_STATE" \
  && pass "Reconciliation stability validated" \
  || fail "Reconciliation instability detected"

log "[4/10] Validating broker uptime..."

grep -q "BROKER_UPTIME_STATUS=PASSED" "$OBSERVATION_STATE" \
  && pass "Broker uptime stability validated" \
  || fail "Broker uptime instability detected"

log "[5/10] Validating fill integrity..."

grep -q "FILL_VALIDATION_STATUS=PASSED" "$OBSERVATION_STATE" \
  && pass "Fill integrity validated" \
  || fail "Fill integrity instability detected"

log "[6/10] Validating PnL accounting..."

grep -q "PNL_VALIDATION_STATUS=PASSED" "$OBSERVATION_STATE" \
  && pass "PnL accounting validated" \
  || fail "PnL accounting instability detected"

log "[7/10] Validating kill-switch stability..."

grep -q "KILL_SWITCH_STATUS=PASSED" "$OBSERVATION_STATE" \
  && pass "Kill-switch stability validated" \
  || fail "Kill-switch instability detected"

log "[8/10] Validating human supervision..."

grep -q "HUMAN_APPROVAL_ENFORCEMENT=ACTIVE" "$OBSERVATION_STATE" \
  && pass "Human supervision enforced" \
  || fail "Human supervision enforcement missing"

log "[9/10] Validating audit lineage..."

grep -q "AUDIT_LINEAGE=ACTIVE" "$OBSERVATION_STATE" \
  && pass "Audit lineage continuity validated" \
  || fail "Audit lineage continuity missing"

log "[10/10] Validating LIVE_AUTO prohibition..."

grep -q "LIVE_AUTO_ENABLED=false" "$OBSERVATION_STATE" \
  && pass "LIVE_AUTO correctly prohibited" \
  || fail "LIVE_AUTO improperly enabled"

echo ""

if [[ "$FAILED" -eq 0 ]]; then
  log "=================================================="
  log "OPERATIONAL STABILITY VALIDATION PASSED"
  log "=================================================="

  log "[PASS] Platform eligible for LIVE_AUTO consideration"

  exit 0
else
  log "=================================================="
  log "OPERATIONAL STABILITY VALIDATION FAILED"
  log "=================================================="

  exit 1
fi
