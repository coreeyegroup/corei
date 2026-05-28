# STAGE-16 — TOPOLOGY INVENTORY

==================================================
NAMESPACES
==================================================

execution
trading-infra

==================================================
EXECUTION COMPONENTS
==================================================

smart-order-router
oms
ems
broker-adapter
fill-handler
reconciliation
copy-trade-engine

==================================================
GOVERNANCE
==================================================

MOCK_MODE=true enforced

Kafka authoritative

Replay-safe execution mandatory

==================================================
DIRECTORY AUTHORITY
==================================================

kubernetes/execution/
kubernetes/trading-infra/
infrastructure/components/
infrastructure/phases/stage-16-broker-connectivity/
