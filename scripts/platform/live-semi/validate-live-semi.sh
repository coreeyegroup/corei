#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

STATE_FILE="$ROOT_DIR/state/governance/live-semi/live-semi.state"
LOG_FILE="$ROOT_DIR/telemetry/operations/live-semi/live-semi.log"

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
log "LIVE_SEMI VALIDATION STARTED"
log "=================================================="

log "[1/9] Validating LIVE_SEMI state..."

[[ -f "$STATE_FILE" ]] \
  && pass "LIVE_SEMI state present" \
  || fail "LIVE_SEMI state missing"

log "[2/9] Validating LIVE_SEMI enabled..."

grep -q "LIVE_SEMI_STATUS=ENABLED" "$STATE_FILE" \
  && pass "LIVE_SEMI enabled" \
  || fail "LIVE_SEMI not enabled"

log "[3/9] Validating account mode..."

grep -q "ACCOUNT_MODE=LIVE_SEMI" "$STATE_FILE" \
  && pass "Account mode LIVE_SEMI validated" \
  || fail "Account mode not LIVE_SEMI"

log "[4/9] Validating Stage 17 lineage..."

grep -q "STAGE_17_VALIDATION=PASSED" "$STATE_FILE" \
  && pass "Stage 17 lineage validated" \
  || fail "Stage 17 lineage missing"

log "[5/9] Validating Stage 19 lineage..."

grep -q "STAGE_19_VALIDATION=PASSED" "$STATE_FILE" \
  && pass "Stage 19 lineage validated" \
  || fail "Stage 19 lineage missing"

log "[6/9] Validating broker onboarding..."

"$ROOT_DIR/scripts/platform/broker-onboarding/validate-broker-onboarding.sh" \
  && pass "Broker onboarding validated" \
  || fail "Broker onboarding invalid"

log "[7/9] Validating human supervision..."

grep -q "HUMAN_APPROVAL_REQUIRED=true" "$STATE_FILE" \
  && pass "Human supervision enforced" \
  || fail "Human supervision missing"

log "[8/9] Validating LIVE_AUTO prohibition..."

grep -q "LIVE_AUTO_ENABLED=false" "$STATE_FILE" \
  && pass "LIVE_AUTO correctly disabled" \
  || fail "LIVE_AUTO improperly enabled"

log "[9/9] Validating audit lineage..."

grep -q "AUDIT_LINEAGE=GENERATED" "$STATE_FILE" \
  && pass "Audit lineage generated" \
  || fail "Audit lineage missing"

echo ""

if [[ "$FAILED" -eq 0 ]]; then
  log "=================================================="
  log "LIVE_SEMI VALIDATION PASSED"
  log "=================================================="
  exit 0
else
  log "=================================================="
  log "LIVE_SEMI VALIDATION FAILED"
  log "=================================================="
  exit 1
fi
