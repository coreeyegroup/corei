# COREI — FILESYSTEM GOVERNANCE

## PURPOSE

This document defines the authoritative ownership model for the Corei platform filesystem.

The filesystem is governed by bounded ownership principles.

Directories represent operational and architectural responsibility boundaries.

Filesystem structure must remain deterministic and governance-driven.

---

# ROOT GOVERNANCE PRINCIPLE

The root platform directory:

    ~/corei

acts as:

- governance authority
- orchestration authority
- deployment authority
- operational authority

It is NOT merely a code repository.

---

# OWNERSHIP MODEL

Each root directory owns one bounded operational responsibility.

Cross-domain contamination is prohibited.

---

# AUTHORITATIVE ROOT STRUCTURE

## infrastructure/

Owns:
- Terraform
- Kubernetes
- provisioning
- networking
- storage
- deployment substrate

---

## system/

Owns:
- runtime backbone systems
- orchestration coordinators
- replay coordinators
- lineage coordinators
- audit systems

---

## services/

Owns:
- business domain services
- execution services
- risk services
- portfolio services
- market-data services

---

## libraries/

Owns:
- reusable runtime primitives
- SDK components
- shared infrastructure libraries

---

## schemas/

Owns:
- serialization authority
- Avro schemas
- Protobuf schemas
- schema compatibility governance

---

## contracts/

Owns:
- API contracts
- event contracts
- orchestration contracts
- service contracts

---

## governance/

Owns:
- platform laws
- naming standards
- replay laws
- deployment governance
- orchestration governance

---

## policies/

Owns:
- retry policies
- replay policies
- routing policies
- runtime execution policies

---

## runtime/

Owns:
- runtime coordination
- supervisors
- leases
- execution lifecycle

---

## state/

Owns:
- materialized state
- runtime persistence
- execution state snapshots

---

## lineage/

Owns:
- lineage tracking
- traceability
- audit reconstruction

---

## replay/

Owns:
- deterministic replay systems
- historical reconstruction

---

## simulation/

Owns:
- hypothetical execution environments
- stress simulation
- market simulation

---

## observability/

Owns:
- metrics
- logging
- tracing
- dashboards
- alerts

---

## security/

Owns:
- secrets governance
- authentication
- authorization
- security policies

---

## compliance/

Owns:
- audit retention
- reporting
- surveillance
- regulatory governance

---

## orchestration/

Owns:
- workflow engines
- orchestration runtime
- execution coordination

---

## workflows/

Owns:
- operational workflows
- deployment workflows
- runtime procedures

---

# REPOSITORY GOVERNANCE

Repositories currently exist under:

    ~/corei/repos

This is transitional architecture.

The root filesystem is authoritative governance authority.

Repositories are implementation authorities.

Future convergence strategy is governed separately.

---

# STRUCTURAL GOVERNANCE RULES

1. No random root directories.
2. All ownership domains must be explicit.
3. Shared ownership is prohibited.
4. Runtime systems must remain isolated.
5. Research must remain isolated from production runtime.
6. Governance must precede implementation scale.
7. Replay and lineage are mandatory architectural concerns.
8. Policies must externalize mutable runtime behavior.

---

# PROHIBITED PATTERNS

- generic shared dumping directories
- cross-service database mutation
- runtime logic inside infrastructure ownership
- undocumented ownership domains
- hidden orchestration paths

---

# GOVERNANCE STATUS

This filesystem structure is authoritative platform law.

Changes require governance review.

