# FILL HANDLER SERVICE — GOVERNANCE

AUTHORITATIVE PURPOSE

fill-handler-service governs:

    execution fill lineage continuity

==================================================
RESPONSIBILITIES
==================================================

- fill ingestion governance
- lineage continuity governance
- lineage hash governance
- reconciliation substrate governance
- portfolio propagation governance

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

Emits:
- portfolio_update_stream
- reconciliation_stream

==================================================
LINEAGE GOVERNANCE
==================================================

fill-handler-service MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
→ fill_id

==================================================
REPLAY GOVERNANCE
==================================================

All lineage hashing MUST preserve:

- deterministic replay
- immutable execution continuity
- deterministic reconstruction
