# Institutional Governance Doctrine

## Purpose

Define the authoritative governance architecture for the COREI institutional trading platform.

## Governance Principles

The platform is governed through explicit lifecycle-domain separation.

The following domains are authoritative:

- SOURCE_AUTHORITY
- GOVERNANCE_STATE
- RUNTIME_STATE
- ARTIFACT_STORAGE
- TELEMETRY
- RECOVERY_STORAGE

Each asset belongs to exactly one governance domain.

## Institutional Principle

Operational lineage must never contaminate release authority.

## Governance Objective

Ensure:
- deterministic releases
- replay-safe operations
- operational lineage isolation
- institutional freeze governance
- stable activation governance
