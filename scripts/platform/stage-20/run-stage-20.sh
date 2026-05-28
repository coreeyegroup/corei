#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

STATE_FILE="${ROOT}/state/governance/stage-20/stage-20.state"
CHECKPOINT_FILE="${ROOT}/state/governance/stage-20/stage-20-checkpoints.state"

LOG_DIR="${ROOT}/telemetry/operations/stage-20"
LOG_FILE="${LOG_DIR}/stage-20-orchestration.log"

mkdir -p "${LOG_DIR}"

timestamp() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

log() {
  echo "[$(timestamp)] $1" | tee -a "${LOG_FILE}"
}

fail() {
  log "[FAIL] $1"
  exit 1
}

validate_file() {
  local file="$1"

  [[ -f "${file}" ]] || fail "Missing required file: ${file}"
}

validate_semantic_governance() {

  log "Validating semantic freeze governance..."

  "${ROOT}/scripts/governance/validate-semantic-freeze-governance.sh" \
    || fail "Semantic governance validation failed"

  log "[PASS] Semantic governance certified"
}

validate_stage20_state() {

  validate_file "${STATE_FILE}"
  validate_file "${CHECKPOINT_FILE}"

  source "${STATE_FILE}"
  source "${CHECKPOINT_FILE}"

  [[ "${FREEZE_GOVERNANCE_STATUS}" == "CERTIFIED" ]] \
    || fail "Freeze governance not certified"

  [[ "${SEMANTIC_GOVERNANCE_MODEL}" == "ACTIVE" ]] \
    || fail "Semantic governance model inactive"

  log "[PASS] Stage 20 governance state validated"
}

run_foundation_checks() {

  source "${CHECKPOINT_FILE}"

  [[ "${FOUNDATION_CHECKPOINT}" == "PASSED" ]] \
    || fail "Foundation checkpoint failed"

  [[ "${PRECONDITION_CHECKPOINT}" == "PASSED" ]] \
    || fail "Precondition checkpoint failed"

  [[ "${GOVERNANCE_REFACTOR_CHECKPOINT}" == "PASSED" ]] \
    || fail "Governance refactor checkpoint failed"

  [[ "${SEMANTIC_FREEZE_CHECKPOINT}" == "PASSED" ]] \
    || fail "Semantic freeze checkpoint failed"

  log "[PASS] All foundational checkpoints validated"
}

show_stage20_status() {

  echo
  echo "=================================================="
  echo "STAGE 20 ORCHESTRATION STATUS"
  echo "=================================================="

  cat "${STATE_FILE}"

  echo
  echo "=================================================="
}

main() {

  log "=================================================="
  log "STAGE 20 ORCHESTRATOR STARTED"
  log "=================================================="

  validate_stage20_state

  validate_semantic_governance

  run_foundation_checks

  show_stage20_status

  log "[PASS] Stage 20 orchestration validated"

  log "=================================================="
  log "STAGE 20 READY FOR BROKER ONBOARDING"
  log "=================================================="
}

main "$@"
