# Repository Governance Standard

## Repository Role

The repository is institutional source authority.

The repository is NOT:
- runtime storage
- operational telemetry storage
- artifact registry
- backup archive
- replay-output storage

## Git-Governed Domains

Examples:
- services/
- scripts/
- governance/
- kubernetes/
- docs/

## Forbidden Domains

The following must never contaminate repository authority:

- node_modules/
- venv/
- runtime artifacts
- logs/
- reports/
- snapshots/
- recovery dumps

## Freeze Certification

Release certification requires:
- deterministic repository convergence
- clean governance state
- runtime isolation
- artifact isolation
