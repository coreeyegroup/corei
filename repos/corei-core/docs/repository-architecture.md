# COREI — REPOSITORY ARCHITECTURE

## PURPOSE

This document defines the structural architecture of the Corei platform
as established in Stage 2 — Repository Foundation.

It explains repository boundaries, ownership, and system organization.

This is NOT a governance file.
This is an architectural reference for developers and system designers.

---

## CORE PRINCIPLE

The platform is structured by strict separation of concerns:

    infrastructure → platform → shared runtime → services → schemas

No layer may violate its responsibility.

---

## REPOSITORY OVERVIEW

### 1. corei-core (Platform Runtime)

**Purpose:**
Core platform execution layer.

**Contains:**
- Event orchestration
- Workflow engine
- Replay engine
- System runtime
- Governance enforcement

**Must NOT contain:**
- Business logic
- Infrastructure code

---

### 2. corei-sdk (Shared Runtime)

**Purpose:**
Reusable runtime components shared across all services.

**Contains:**
- Event handling utilities
- Workflow helpers
- Config management
- Resilience logic
- Context propagation

**Must NOT contain:**
- Service-specific logic
- Business rules

---

### 3. corei-services (Business Layer)

**Purpose:**
All business and trading services.

**Examples:**
- orchestration-service
- state-update-service
- market-data-service
- order-service
- risk-service

**Rules:**
- Must follow `_template/`
- Must not duplicate SDK logic
- Must not define schemas

---

### 4. corei-infrastructure (Deployment Layer)

**Purpose:**
Infrastructure provisioning and system deployment.

**Contains:**
- Terraform
- Kubernetes configs
- Networking
- Cluster definitions

**Includes:**
- database/
- frontend/

**Must NOT contain:**
- Business logic
- Platform runtime logic

---

### 5. corei-schemas (Data Contracts)

**Purpose:**
Authoritative data definitions.

**Contains:**
- Event schemas
- Database schemas
- Contracts
- Schema versions
- Governance rules (schema-specific)

**Rules:**
- No executable logic
- All services must reference this repo

---

## CROSS-CUTTING STRUCTURE

Each repository enforces:

- docs/      → documentation
- tests/     → validation layer
- scripts/   → automation

This ensures:

- consistency
- reproducibility
- CI/CD readiness

---

## SERVICE TEMPLATE

Location:

    corei-services/_template/

Defines mandatory structure for all services:

- contracts/
- config/
- bootstrap/
- tests/

This guarantees:

- uniform service design
- scalable service creation
- predictable behavior

---

## INFRASTRUCTURE EXTENSIONS

The infrastructure layer includes:

- database/
- frontend/

These represent:

- persistent state systems
- user-facing systems

They are defined early to prevent later structural drift.

---

## STRUCTURE ENFORCEMENT

All directories include `.keep` files to ensure:

- version control tracking
- consistent cloning
- CI validation compatibility

Without this, structure would not be enforceable.

---

## INSTALLATION & AUTOMATION

The platform is built using:

- install.sh → machine setup
- setup-repos.sh → repository setup

No manual setup is allowed.

System must be:

- deterministic
- idempotent
- reproducible

---

## WHAT THIS PREVENTS

Without this architecture:

- duplicated logic across services
- inconsistent schemas
- mixing infra and business logic
- unscalable system growth
- broken CI/CD pipelines

---

## WHAT THIS ENABLES

- scalable service expansion
- governance enforcement (Stage 3)
- CI/CD standardization
- deterministic system behavior
- institutional-grade platform evolution

---

## FINAL PRINCIPLE

This architecture defines:

    WHERE things are allowed to exist

Stage 3 will define:

    HOW things are allowed to behave
