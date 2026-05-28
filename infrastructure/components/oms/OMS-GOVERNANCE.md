# OMS — GOVERNANCE

AUTHORITATIVE PURPOSE

OMS governs:

    execution transport lifecycle

==================================================
RESPONSIBILITIES
==================================================

- order lifecycle governance
- sequencing governance
- session governance
- reconnect governance
- transport governance
- replay-safe execution ordering

==================================================
FORBIDDEN
==================================================

- strategy logic
- portfolio mutation
- execution identity mutation
- signal generation
- risk mutation

==================================================
ORDER STATE MACHINE
==================================================

NEW
→ ACCEPTED
→ DISPATCHED
→ PARTIAL_FILL
→ FILLED
→ CANCELLED
→ REJECTED

==================================================
EVENT GOVERNANCE
==================================================

Consumes:
- broker_dispatch_stream

Emits:
- broker_execution_stream
- execution_session_stream

==================================================
MOCK GOVERNANCE
==================================================

Stage-16 OMS connects ONLY to:

    MOCK execution transport

==================================================
LINEAGE GOVERNANCE
==================================================

OMS MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
