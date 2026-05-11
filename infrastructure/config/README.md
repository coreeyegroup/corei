# Stage 3A — Configuration Authority

This directory contains centralized deterministic configuration authority
for the COREI platform.

Configuration is:
- versioned
- governed
- lineage-tracked
- snapshot-controlled

Configuration is NOT:
- hardcoded in services
- hidden in environment variables
- manually mutated at runtime

All runtime behavior must originate from the config-service authority.

Domains:
- environments
- strategies
- risk
- instruments
- brokers
- accounts
- runtime
- feature-flags
