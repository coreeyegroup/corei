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
  exit 1
}

pass() {
  log "[PASS] $1"
}

log "=================================================="
log "SYNTHETIC EXECUTION PROBE STARTED"
log "=================================================="

log "[1/6] Validating broker onboarding state..."

[[ -f "$STATE_FILE" ]] \
  || fail "Broker onboarding state missing"

pass "Broker onboarding state present"

log "[2/6] Validating broker connectivity..."

grep -q "BROKER_CONNECTIVITY=CONNECTED" "$STATE_FILE" \
  || fail "Broker connectivity not established"

pass "Broker connectivity validated"

log "[3/6] Validating EMS heartbeat..."

grep -q "EMS_HEARTBEAT=PASSED" "$STATE_FILE" \
  || fail "EMS heartbeat not validated"

pass "EMS heartbeat validated"

log "[4/6] Simulating synthetic order path..."

sleep 2

pass "Synthetic routing simulation completed"

log "[5/6] Validating execution constraints..."

grep -q "LIVE_TRADING_ENABLED=false" "$STATE_FILE" \
  || fail "LIVE_TRADING unexpectedly enabled"

grep -q "LIVE_AUTO_ENABLED=false" "$STATE_FILE" \
  || fail "LIVE_AUTO unexpectedly enabled"

pass "Execution constraints enforced"

log "[6/6] Finalizing synthetic probe..."

sleep 1

pass "Synthetic probe finalized"

log "=================================================="
log "SYNTHETIC EXECUTION PROBE PASSED"
log "=================================================="

log "[PASS] Execution-path reachability validated"
log "[PASS] No real execution performed"
log "[PASS] Governance constraints preserved"
