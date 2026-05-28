# SMART ORDER ROUTER — GOVERNANCE

AUTHORITATIVE PURPOSE

The smart-order-router governs:

    deterministic broker dispatch routing

==================================================
RESPONSIBILITIES
==================================================

- broker selection
- health-aware routing
- latency-aware routing
- failover routing
- spread-aware routing
- account-broker binding

==================================================
FORBIDDEN
==================================================

- strategy generation
- risk mutation
- portfolio mutation
- execution identity mutation

==================================================
MOCK GOVERNANCE
==================================================

Stage-16 routing targets:

    MOCK BROKER CONNECTORS ONLY

==================================================
REPLAY GOVERNANCE
==================================================

Identical canonical inputs MUST produce:

- identical broker selection
- identical routing decisions
- identical lineage continuity

==================================================
FAILOVER GOVERNANCE
==================================================

Broker failover permitted ONLY when:

- broker unhealthy
- heartbeat stale
- latency threshold exceeded

==================================================
LINEAGE GOVERNANCE
==================================================

Routing MUST preserve:

signal_id
→ trade_intent_id
→ execution_intent_id
→ order_id
