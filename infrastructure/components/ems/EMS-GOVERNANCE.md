# EMS — GOVERNANCE

AUTHORITATIVE PURPOSE

EMS governs:

    broker transport orchestration

==================================================
RESPONSIBILITIES
==================================================

- broker connectivity governance
- connector lifecycle governance
- protocol abstraction
- transport orchestration
- session governance
- reconnect governance
- heartbeat governance

==================================================
FORBIDDEN
==================================================

- strategy logic
- portfolio mutation
- execution identity mutation
- signal generation
- risk mutation

==================================================
CONNECTOR GOVERNANCE
==================================================

EMS governs:

- mt5_connector
- ib_connector
- ctrader_connector
- fix_connector
- alpaca_connector
- mock_connector

==================================================
EVENT GOVERNANCE
==================================================

Consumes:
- broker_execution_stream

Emits:
- fill_stream
- broker_health_stream
- execution_session_stream

==================================================
MOCK GOVERNANCE
==================================================

Stage-16 EMS connects ONLY to:

    MOCK broker transport

==================================================
LINEAGE GOVERNANCE
==================================================

EMS MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
→ fill_id
