# BROKER ADAPTER SERVICE — GOVERNANCE

AUTHORITATIVE PURPOSE

broker-adapter-service governs:

    broker runtime abstraction

==================================================
RESPONSIBILITIES
==================================================

- connector factory governance
- broker runtime abstraction
- mock execution simulation
- latency simulation governance
- partial-fill governance
- broker health governance

==================================================
FORBIDDEN
==================================================

- strategy logic
- portfolio mutation
- execution identity mutation
- risk mutation
- signal generation

==================================================
MOCK GOVERNANCE
==================================================

Stage-16 runtime MUST remain:

    MOCK_MODE=true

NO live broker activation permitted.

==================================================
EVENT GOVERNANCE
==================================================

Consumes:
- broker_execution_stream

Emits:
- fill_stream
- broker_health_stream

==================================================
LINEAGE GOVERNANCE
==================================================

broker-adapter-service MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
→ fill_id
