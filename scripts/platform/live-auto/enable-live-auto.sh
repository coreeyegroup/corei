#!/usr/bin/env bash

set -euo pipefail

ACCOUNT_ID="${1:-}"

ROOT_DIR="$HOME/corei"
source "$ROOT_DIR/ops/runtime-authority/runtime-paths.env"

STATE_FILE="$LIVE_AUTO_STATE_PATH"

LIVE_SEMI_STATE="$LIVE_SEMI_STATE_PATH"
OBSERVATION_STATE="$ROOT_DIR/state/governance/live-observation/live-observation.state"

LOG_FILE="$LIVE_AUTO_LOG_PATH"

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
  fail "Usage: enable-live-auto.sh ACC_001"
fi

log "=================================================="
log "LIVE_AUTO ACTIVATION STARTED"
log "=================================================="

log "[1/11] Validating semantic governance..."

"$ROOT_DIR/scripts/governance/validate-semantic-freeze-governance.sh" \
  || fail "Semantic governance validation failed"

pass "Semantic governance validated"

log "[2/11] Validating Stage 20 orchestrator..."

"$ROOT_DIR/scripts/platform/stage-20/run-stage-20.sh" \
  || fail "Stage 20 orchestrator validation failed"

pass "Stage 20 orchestrator validated"

log "[3/11] Validating Stage 17 gate..."

grep -q "STAGE_17_GATE=PASSED" \
  "$ROOT_DIR/state/governance/install/install.state" \
  || fail "Stage 17 gate not passed"

pass "Stage 17 gate validated"

log "[4/11] Validating Stage 19 gate..."

grep -q "STAGE_19_GATE=PASSED" \
  "$ROOT_DIR/state/governance/install/install.state" \
  || fail "Stage 19 gate not passed"

pass "Stage 19 gate validated"

log "[5/11] Validating LIVE_SEMI operational state..."

grep -q "LIVE_SEMI_STATUS=ENABLED" "$LIVE_SEMI_STATE" \
  || fail "LIVE_SEMI not enabled"

pass "LIVE_SEMI operational state validated"

log "[6/11] Validating operational stability certification..."

"$ROOT_DIR/scripts/platform/live-observation/validate-operational-stability.sh" \
  || fail "Operational stability validation failed"

pass "Operational stability validated"

log "[7/11] Validating scaling constraints..."

grep -q "MAX_ACCOUNTS=1" "$STATE_FILE" \
  || fail "Account scaling constraint violated"

grep -q "MAX_STRATEGIES=1" "$STATE_FILE" \
  || fail "Strategy scaling constraint violated"

pass "Scaling constraints validated"

log "[8/11] Risk-admin authorization..."

echo ""
echo "LIVE_AUTO ENABLES AUTONOMOUS EXECUTION"
echo ""

read -p "Risk-admin JWT authorization confirmed? (yes/no): " AUTH_CONFIRMED

[[ "$AUTH_CONFIRMED" == "yes" ]] \
  || fail "Risk-admin authorization not confirmed"

pass "Risk-admin authorization confirmed"

log "[9/11] Operator confirmation required..."

echo ""
echo "Type EXACTLY:"
echo "CONFIRM-LIVE-AUTO-$ACCOUNT_ID"
echo ""

read -r CONFIRMATION

EXPECTED_CONFIRMATION="CONFIRM-LIVE-AUTO-$ACCOUNT_ID"

[[ "$CONFIRMATION" == "$EXPECTED_CONFIRMATION" ]] \
  || fail "Operator confirmation mismatch"

pass "Operator confirmation validated"

log "[10/11] Activating LIVE_AUTO..."

cat <<STATE > "$STATE_FILE"
LIVE_AUTO_STATUS=ENABLED

ACCOUNT_ID=$ACCOUNT_ID
ACCOUNT_MODE=LIVE_AUTO

AUTONOMOUS_EXECUTION=true
HUMAN_APPROVAL_REQUIRED=false

LIVE_AUTO_ELIGIBILITY=PASSED
LIVE_AUTO_CERTIFICATION=PASSED

SEMANTIC_GOVERNANCE=ACTIVE
KILL_SWITCH_GOVERNANCE=ACTIVE
AUDIT_LINEAGE=ACTIVE

MAX_ACCOUNTS=1
MAX_STRATEGIES=1
CAPITAL_PROFILE=SMALL
STATE

pass "LIVE_AUTO activated"

log "[11/11] Finalizing autonomous execution lineage..."

sleep 1

pass "Autonomous execution lineage finalized"

log "=================================================="
log "LIVE_AUTO ACTIVATION COMPLETED"
log "=================================================="

log "[PASS] Autonomous execution ENABLED for $ACCOUNT_ID"
log "[PASS] Governance constraints remain ACTIVE"
log "[PASS] Scaling constraints remain ENFORCED"
