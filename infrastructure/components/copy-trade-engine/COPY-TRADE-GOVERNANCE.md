# COPY TRADE ENGINE — GOVERNANCE

AUTHORITATIVE PURPOSE

copy-trade-engine governs:

    master to follower execution propagation

==================================================
RESPONSIBILITIES
==================================================

- proportional scaling governance
- follower validation governance
- async propagation governance
- follower execution continuity
- copy-trade lineage governance

==================================================
FORBIDDEN
==================================================

- strategy mutation
- portfolio mutation
- execution identity mutation
- risk mutation
- signal generation

==================================================
EVENT GOVERNANCE
==================================================

Consumes:
- fill_stream

Emits:
- copy_trade_stream
- copy_trade_audit_stream

==================================================
SCALING GOVERNANCE
==================================================

Scaling formula:

follower_lot
=
master_lot × (follower_equity / master_equity)

==================================================
LINEAGE GOVERNANCE
==================================================

copy-trade-engine MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
→ fill_id
→ follower_execution_id

==================================================
REPLAY GOVERNANCE
==================================================

All propagation MUST preserve:

- deterministic replay
- immutable continuity
- deterministic reconstruction
