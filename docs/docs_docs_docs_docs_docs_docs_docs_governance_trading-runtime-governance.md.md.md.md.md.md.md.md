# TRADING RUNTIME GOVERNANCE

Institutional runtime orchestration governance.

Canonical startup order:

1. instrument-screening-service
2. instrument-monitoring-service
3. strategy-engine-service
4. signal-processor-service
5. decision-engine-service

Governance laws:

- deterministic startup ordering mandatory
- readiness validation mandatory
- fail-fast startup mandatory
- downstream dependency ordering mandatory
- runtime orchestration authoritative
