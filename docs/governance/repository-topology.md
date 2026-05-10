# COREI — REPOSITORY TOPOLOGY

## PURPOSE

This document defines repository ownership and topology governance for the Corei platform.

---

# CURRENT MODEL

Corei currently operates as a multi-repository platform.

Repositories exist under:

    ~/corei/repos

This structure is transitional but intentional.

---

# AUTHORITATIVE REPOSITORIES

## corei-core

Owns:
- runtime backbone systems
- orchestration engines
- replay coordination
- lineage systems

---

## corei-infrastructure

Owns:
- Terraform
- Kubernetes
- infrastructure provisioning
- deployment substrate

---

## corei-services

Owns:
- business services
- execution services
- market-data services
- risk services

---

## corei-sdk

Owns:
- reusable runtime libraries
- SDK primitives
- resilience primitives
- messaging utilities

---

## corei-schemas

Owns:
- schema authority
- serialization governance
- event compatibility

---

# TOPOLOGY PRINCIPLES

1. Governance root remains authoritative.
2. Repositories remain implementation authorities.
3. Runtime boundaries must remain deterministic.
4. Repository responsibilities must remain bounded.
5. Cross-repository contamination is prohibited.

---

# FUTURE EVOLUTION

The current:

    repos/

model is transitional.

Future convergence may evolve toward:

    modules/

or direct ownership convergence.

This migration must remain governance-driven.

Premature flattening is prohibited.

---

# PROHIBITED PATTERNS

- monolithic shared repositories
- ownership ambiguity
- runtime coupling
- undocumented dependencies

---

# GOVERNANCE STATUS

Repository topology changes require governance review.

