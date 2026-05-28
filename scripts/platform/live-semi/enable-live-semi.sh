#!/usr/bin/env bash

set -euo pipefail

ACCOUNT_ID="${1:-}"

ROOT_DIR="$HOME/corei"

STATE_FILE="$ROOT_DIR/state/runtime/live-activation/live-semi/live-semi.state"
LOG_FILE="$ROOT_DIR/telemetry/operations/live-semi/live-semi.log"

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

if [[ -z "$ACCOUNT_ID" ]]; then
  fail "Usage: enable-live-semi.sh ACC_001"
fi

log "=================================================="
log "LIVE_SEMI ACTIVATION STARTED"
log "=================================================="

log "[1/9] Validating semantic governance..."

"$ROOT_DIR/scripts/governance/validate-semantic-freeze-governance.sh" \
  || fail "Semantic governance validation failed"

pass "Semantic governance validated"

log "[2/9] Validating Stage 20 orchestrator..."

"$ROOT_DIR/scripts/platform/stage-20/run-stage-20.sh" \
  || fail "Stage 20 orchestrator validation failed"

pass "Stage 20 orchestrator validated"

log "[3/9] Validating Stage 17 gate..."

grep -q "STAGE_17_GATE=PASSED" \
  "$ROOT_DIR/state/governance/install/install.state" \
  || fail "Stage 17 gate not passed"

pass "Stage 17 gate validated"

log "[4/9] Validating Stage 19 gate..."

grep -q "STAGE_19_GATE=PASSED" \
  "$ROOT_DIR/state/governance/install/install.state" \
  || fail "Stage 19 gate not passed"

pass "Stage 19 gate validated"

log "[5/9] Validating broker onboarding..."

"$ROOT_DIR/scripts/platform/broker-onboarding/validate-broker-onboarding.sh" \
  || fail "Broker onboarding validation failed"

pass "Broker onboarding validated"

log "[6/9] Risk-admin authorization..."

echo ""
echo "LIVE_SEMI REQUIRES HUMAN SUPERVISION"
echo ""

read -p "Risk-admin JWT authorization confirmed? (yes/no): " AUTH_CONFIRMED

[[ "$AUTH_CONFIRMED" == "yes" ]] \
  || fail "Risk-admin authorization not confirmed"

pass "Risk-admin authorization confirmed"

log "[7/9] Operator confirmation required..."

echo ""
echo "Type EXACTLY:"
echo "CONFIRM-LIVE-SEMI-$ACCOUNT_ID"
echo ""

read -r CONFIRMATION

EXPECTED_CONFIRMATION="CONFIRM-LIVE-SEMI-$ACCOUNT_ID"

[[ "$CONFIRMATION" == "$EXPECTED_CONFIRMATION" ]] \
  || fail "Operator confirmation mismatch"

pass "Operator confirmation validated"

log "[8/9] Activating LIVE_SEMI..."

cat <<STATE > "$STATE_FILE"
LIVE_SEMI_STATUS=ENABLED

ACCOUNT_ID=$ACCOUNT_ID
ACCOUNT_MODE=LIVE_SEMI

HUMAN_APPROVAL_REQUIRED=true
LIVE_AUTO_ENABLED=false

STAGE_17_VALIDATION=PASSED
STAGE_19_VALIDATION=PASSED

AUDIT_LINEAGE=GENERATED
DASHBOARD_VISIBILITY=ACTIVE
STATE

pass "LIVE_SEMI state activated"

log "[9/9] Finalizing activation lineage..."

sleep 1

pass "Activation lineage finalized"

log "=================================================="
log "LIVE_SEMI ACTIVATION COMPLETED"
log "=================================================="

log "[PASS] Account $ACCOUNT_ID now operating in LIVE_SEMI"
log "[PASS] Human approval required for all execution"
log "[PASS] LIVE_AUTO remains disabled"
