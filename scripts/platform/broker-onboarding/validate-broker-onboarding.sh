#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

STATE_FILE="$ROOT_DIR/state/governance/broker-onboarding/broker-onboarding.state"
LOG_FILE="$ROOT_DIR/telemetry/operations/broker-onboarding/broker-onboarding.log"

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
log "BROKER ONBOARDING VALIDATION STARTED"
log "=================================================="

log "[1/7] Validating onboarding state..."

[[ -f "$STATE_FILE" ]] \
  && pass "Broker onboarding state present" \
  || fail "Broker onboarding state missing"

log "[2/7] Validating broker onboarding completion..."

grep -q "BROKER_ONBOARDING_STATUS=COMPLETED" "$STATE_FILE" \
  && pass "Broker onboarding completed" \
  || fail "Broker onboarding incomplete"

log "[3/7] Validating broker connectivity..."

grep -q "BROKER_CONNECTIVITY=CONNECTED" "$STATE_FILE" \
  && pass "Broker connectivity validated" \
  || fail "Broker connectivity failed"

log "[4/7] Validating EMS heartbeat..."

grep -q "EMS_HEARTBEAT=PASSED" "$STATE_FILE" \
  && pass "EMS heartbeat validated" \
  || fail "EMS heartbeat validation failed"

log "[5/7] Validating live tick flow..."

grep -q "LIVE_TICK_VALIDATION=PASSED" "$STATE_FILE" \
  && pass "Live tick validation passed" \
  || fail "Live tick validation failed"

log "[6/7] Validating synthetic execution probe..."

grep -q "SYNTHETIC_PROBE=PASSED" "$STATE_FILE" \
  && pass "Synthetic execution probe passed" \
  || fail "Synthetic execution probe failed"

log "[7/7] Validating execution constraints..."

grep -q "LIVE_AUTO_ENABLED=false" "$STATE_FILE" \
  && pass "LIVE_AUTO correctly disabled" \
  || fail "LIVE_AUTO improperly enabled"

echo ""

if [[ "$FAILED" -eq 0 ]]; then
  log "=================================================="
  log "BROKER ONBOARDING VALIDATION PASSED"
  log "=================================================="
  exit 0
else
  log "=================================================="
  log "BROKER ONBOARDING VALIDATION FAILED"
  log "=================================================="
  exit 1
fi
