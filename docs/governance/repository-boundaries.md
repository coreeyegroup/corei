# COREI — REPOSITORY BOUNDARIES

## PURPOSE

Defines bounded ownership rules across repositories and platform domains.

---

# GOVERNANCE PRINCIPLE

Every repository owns one bounded operational responsibility.

Cross-domain ownership is prohibited.

---

# REPOSITORY AUTHORITIES

## corei-core

Owns:
- orchestration runtime
- replay runtime
- lineage coordination
- runtime backbone systems

Must NOT own:
- business domain services
- infrastructure provisioning

---

## corei-services

Owns:
- bounded business services
- execution services
- risk services
- market-data services

Must NOT own:
- shared runtime substrate
- orchestration authority

---

## corei-sdk

Owns:
- reusable runtime primitives
- shared libraries
- resilience primitives

Must NOT own:
- business logic
- infrastructure provisioning

---

## corei-schemas

Owns:
- schema authority
- serialization governance
- compatibility governance

Must NOT own:
- runtime execution

---

## corei-infrastructure

Owns:
- Terraform
- Kubernetes
- deployment substrate
- infrastructure lifecycle

Must NOT own:
- business services
- orchestration runtime

---

# GOVERNANCE STATUS

Repository ownership is authoritative platform law.

