# STAGE-16 — SERVICE RESPONSIBILITY MATRIX

==================================================
SMART ORDER ROUTER
==================================================

NAMESPACE:
    execution

RESPONSIBILITIES:
- broker selection
- health-aware routing
- failover routing
- spread comparison
- latency-aware dispatch

FORBIDDEN:
- order mutation
- fill mutation
- ID generation
- portfolio mutation

==================================================
OMS
==================================================

NAMESPACE:
    trading-infra

RESPONSIBILITIES:
- order lifecycle state machine
- transport governance
- FIX session lifecycle
- reconnect governance
- sequencing governance

FORBIDDEN:
- order generation
- risk logic
- strategy logic
- ID generation

==================================================
EMS
==================================================

NAMESPACE:
    trading-infra

RESPONSIBILITIES:
- broker transport connectivity
- connector orchestration
- protocol abstraction

FORBIDDEN:
- strategy logic
- routing authority
- portfolio mutation

==================================================
BROKER ADAPTER
==================================================

RESPONSIBILITIES:
- connector factory
- health monitoring
- mock execution simulation

FORBIDDEN:
- authoritative execution ownership
- direct portfolio ownership

==================================================
FILL HANDLER
==================================================

RESPONSIBILITIES:
- fill ingestion
- fill normalization
- lineage extension
- fill_stream emission

FORBIDDEN:
- order mutation
- signal mutation
- portfolio ownership

==================================================
RECONCILIATION SERVICE
==================================================

RESPONSIBILITIES:
- broker reconciliation
- mismatch detection
- reconciliation event emission

FORBIDDEN:
- silent reconciliation correction
- portfolio mutation

==================================================
COPY TRADE ENGINE
==================================================

RESPONSIBILITIES:
- follower scaling
- async dispatch
- proportional sizing

FORBIDDEN:
- risk bypass
- portfolio override
- lineage mutation
