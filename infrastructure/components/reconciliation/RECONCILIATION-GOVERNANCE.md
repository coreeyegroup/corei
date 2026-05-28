# RECONCILIATION SERVICE — GOVERNANCE

AUTHORITATIVE PURPOSE

reconciliation-service governs:

    execution reconciliation continuity

==================================================
RESPONSIBILITIES
==================================================

- broker/internal reconciliation governance
- mismatch governance
- account halt governance
- replay governance
- recovery governance
- deterministic execution verification

==================================================
FORBIDDEN
==================================================

- strategy logic
- portfolio mutation
- execution identity mutation
- signal generation
- risk mutation

==================================================
EVENT GOVERNANCE
==================================================

Consumes:
- fill_stream
- portfolio_update_stream

Emits:
- reconciliation_stream

==================================================
MISMATCH GOVERNANCE
==================================================

Mismatch detection MUST:

- halt affected account
- emit reconciliation alert
- preserve lineage continuity

==================================================
LINEAGE GOVERNANCE
==================================================

reconciliation-service MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
→ fill_id
→ fill_lineage_hash

==================================================
REPLAY GOVERNANCE
==================================================

All reconciliation MUST preserve:

- deterministic replay
- immutable continuity
- deterministic reconstruction
