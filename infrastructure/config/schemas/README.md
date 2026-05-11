# Stage 3A — Configuration Schemas

This directory defines deterministic configuration contracts for the platform.

All runtime configuration must conform to these schemas.

Governed domains:
- environments
- strategies
- risk
- instruments
- brokers
- accounts
- runtime parameters
- feature flags

Rules:
- no float financial values
- immutable lineage
- approval-governed risk
- operation-mode governance
- deterministic runtime authority
