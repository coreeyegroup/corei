#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-15 STEP-2 — GOVERNANCE IMPLEMENTATION"
echo "=================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

cd "$ROOT_DIR"

echo "[1/5] Writing stage-15 execution foundation blueprint..."

cat <<'DOC' > docs/blueprints/stage-15-execution-foundation.md
# STAGE-15 — EXECUTION FOUNDATION

## AUTHORITATIVE PURPOSE

Stage-15 establishes the institutional execution governance substrate.

This stage converts governed TradeIntent entities into
deterministically governed ExecutionOrder entities.

This stage introduces:

- execution normalization
- account dispatch governance
- deterministic risk enforcement
- execution policy governance
- deterministic position sizing
- authoritative execution-order construction

Stage-15 remains:

PAPER MODE ONLY

NO live broker connectivity exists in this stage.

Broker connectivity is deferred to Stage-16.

---

## AUTHORITATIVE EXECUTION FLOW

Signal
→ TradeIntent
→ ExecutionIntent
→ PerAccountIntent
→ Risk Validation
→ Policy Validation
→ Position Sizing
→ ExecutionOrder

---

## AUTHORITATIVE EXECUTION SERVICES

execution-intent-service
account-routing-service
risk-engine-service
policy-engine-service
position-sizer-service
order-engine-service

---

## EXECUTION GOVERNANCE GUARANTEES

The execution layer MUST remain:

- deterministic
- replay-safe
- lineage-verifiable
- event-driven
- schema-governed
- fixed-point-safe

---

## EXECUTION STATE MACHINE

NEW
VALIDATED
REJECTED
SUBMITTED
ACKNOWLEDGED
PARTIALLY_FILLED
FILLED
CANCELLED
EXPIRED

---

## EXECUTION LINEAGE GUARANTEE

Every execution entity MUST preserve:

- trade_intent_id
- execution_intent_id
- lineage_hash

Lineage chain breaks are considered:

HARD FAILURES

---

## EXECUTION REPLAY GUARANTEE

Replay MUST reproduce:

- identical execution orders
- identical hashes
- identical routing
- identical risk decisions
- identical sizing
- identical policy outcomes

Bit-level determinism is mandatory.

DOC

echo "[2/5] Writing execution governance document..."

cat <<'DOC' > docs/governance/execution-governance.md
# EXECUTION GOVERNANCE
# AUTHORITATIVE EXECUTION GOVERNANCE MODEL

## AUTHORITATIVE PURPOSE

This document defines the deterministic execution governance model
for CORE SYSTEM.

The execution layer governs:

TradeIntent
→ ExecutionIntent
→ ExecutionOrder

under deterministic institutional controls.

---

## GLOBAL EXECUTION RULES

### RULE 1 — NO FLOATING POINT

All execution calculations MUST use:

int64 fixed-point arithmetic

Floating-point execution logic is forbidden.

---

### RULE 2 — NO EXECUTION MUTATION

Execution services MUST NOT reinterpret strategy intent.

Execution services MAY:

- normalize
- enrich
- validate
- constrain
- size
- route

Execution services MUST NOT:

- alter signal meaning
- alter strategy direction
- alter strategy semantics

---

### RULE 3 — DETERMINISTIC OUTPUTS

Identical canonical inputs MUST produce:

- identical outputs
- identical hashes
- identical routing
- identical execution orders

Deterministic replay is mandatory.

---

### RULE 4 — EVENT GOVERNANCE

Execution services operate ONLY through governed Kafka events.

Direct service-to-service execution ownership is forbidden.

Kafka remains authoritative source-of-truth.

---

### RULE 5 — EXECUTION STATE GOVERNANCE

Execution states MUST remain:

- monotonic
- replay-safe
- auditable
- deterministic

Invalid state transitions are forbidden.

---

## EXECUTION ORDER GOVERNANCE

ExecutionOrder identities MUST derive from:

SHA-256(
    execution_intent_id
    + risk_hash
    + policy_hash
)

Execution identity regeneration is forbidden.

DOC

echo "[3/5] Writing execution lineage governance..."

cat <<'DOC' > docs/governance/execution-lineage-governance.md
# EXECUTION LINEAGE GOVERNANCE

## AUTHORITATIVE PURPOSE

This document defines deterministic lineage governance
for the execution layer.

---

## AUTHORITATIVE LINEAGE CHAIN

Signal
→ TradeIntent
→ ExecutionIntent
→ PerAccountIntent
→ ExecutionOrder
→ Fill

---

## LINEAGE RULES

Every downstream execution entity MUST contain:

- lineage_hash
- trace_id
- event_id
- trade_intent_id
- execution_intent_id

---

## HASH GOVERNANCE

Lineage hashes MUST use:

SHA-256

Allowed:

- canonical byte ordering
- deterministic serialization

Forbidden:

- non-deterministic serialization
- unordered map hashing
- mutable lineage identifiers

---

## CHAIN BREAK GOVERNANCE

If lineage continuity breaks:

- execution MUST halt
- validation MUST fail
- replay MUST fail

Lineage corruption is considered:

CRITICAL

---

## REPLAY GOVERNANCE

Replay MUST reproduce:

- identical lineage hashes
- identical ordering
- identical execution identities

Bit-level replay equality is mandatory.

DOC

echo "[4/5] Writing execution risk governance..."

cat <<'DOC' > docs/governance/execution-risk-governance.md
# EXECUTION RISK GOVERNANCE

## AUTHORITATIVE PURPOSE

This document defines deterministic pre-trade
risk governance for the execution layer.

---

## AUTHORITATIVE RISK HIERARCHY

Firm
→ Portfolio
→ Strategy
→ Trade

Lower-precedence rules MUST NOT override higher-precedence rules.

---

## REQUIRED RISK CONTROLS

The risk-engine-service MUST enforce:

- max_risk_per_trade_pct
- max_daily_loss_pct
- max_drawdown_pct
- max_open_positions
- max_position_per_instrument
- max_margin_utilization_pct
- instrument_whitelist

All limits MUST derive from governed configuration.

Hardcoded runtime limits are forbidden.

---

## EXTERNAL EXECUTION GOVERNANCE

origin_type = EXTERNAL

MUST use stricter thresholds than:

origin_type = CORE

---

## KILL SWITCH GOVERNANCE

If:

daily_loss > threshold

then:

HALT_ALL

must activate for affected accounts.

---

## RISK REJECTION GOVERNANCE

Risk rejection MUST produce:

risk_rejected events

Rejected executions MUST NOT progress further downstream.

---

## RISK REPLAY GOVERNANCE

Replay MUST reproduce:

- identical approvals
- identical rejections
- identical risk hashes
- identical limit evaluations

Risk replay divergence is forbidden.

DOC

echo "[5/5] Governance implementation completed."

echo
echo "Stage-15 governance documents successfully implemented."
echo
echo "Next step:"
echo "→ Validate governance documents"
echo "→ Implement Avro schemas"
echo "→ Scaffold runtime services"
echo
