# Repository Governance Policy

## Purpose

Define authoritative governance boundaries for the COREI platform repository.

The repository is an institutional source authority system.

It is NOT:
- operational storage
- runtime telemetry storage
- artifact archive storage
- snapshot storage
- backup storage

## Governance Domains

### SOURCE_AUTHORITY
Git governed.
Immutable between releases.

Examples:
- services/
- scripts/
- governance/
- kubernetes/
- config/
- schemas/
- contracts/

### GOVERNANCE_STATE
Git governed.

Examples:
- state/governance/

### RUNTIME_STATE
NOT Git governed.
Mutable operational state.

Examples:
- runtime/
- execution streams
- replay outputs

### ARTIFACT_STORAGE
NOT Git governed.

Examples:
- images/
- tar archives
- exports/
- snapshots/

### TELEMETRY
NOT Git governed.

Examples:
- logs/
- reports/
- metrics exports

### RECOVERY_STORAGE
NOT Git governed.

Examples:
- backup exports
- SQL dumps
- cluster-state exports
