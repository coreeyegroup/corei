# =============================================================================
#
# COREI OPERATING SYSTEM
#
# DOCUMENT ID
#
# DOC-05
#
# DOCUMENT NAME
#
# COREI REPOSITORY & OWNERSHIP GUIDE
#
# VERSION
#
# 2.0
#
# STATUS
#
# AUTHORITATIVE
#
# PURPOSE
#
# Define repository ownership across COREI.
#
# Every repository has one owner,
# one responsibility,
# one architectural boundary.
#
# =============================================================================



# =============================================================================
# 1. REPOSITORY PRINCIPLES
# =============================================================================

Every repository shall have

• One Owner

• One Primary Responsibility

• Clear Boundaries

• Defined Consumers

• Defined Dependencies

Repositories communicate.

Repositories never absorb each other's responsibilities.

Architecture determines ownership.

Implementation follows ownership.



# =============================================================================
# 2. COREI REPOSITORY MAP
# =============================================================================

```
COREI

├── ui/
│    └── corei-os
│
├── platform/
│
├── domains/
│
├── terminals/
│
├── shared/
│
├── infrastructure/
│
├── automation/
│
├── documentation/
│
├── scripts/
│
└── tools/
```

Every repository exists because the architecture requires it.

No repository exists for convenience.



# =============================================================================
# 3. REPOSITORY RESPONSIBILITIES
# =============================================================================

## ui/corei-os

Purpose

Institutional Operating System

Owns

• Shell

• Cognitive Surfaces

• Workspace Framework

• Registry Framework

• Experience Runtime

• Layout Engine

• Design System

• UI Runtime

Never Owns

• Business Logic

• Trading Logic

• Infrastructure Logic

• Domain Processing



------------------------------------------------------------

## platform

Purpose

Institutional Runtime

Owns

• Platform Frameworks

• Runtime Engine

• Capability Framework

• Registry Runtime

• Lifecycle

• State Management

• Dependency Management

Never Owns

• UI

• Domain Logic

• Trading Strategies



------------------------------------------------------------

## domains

Purpose

Business Intelligence

Owns

• Domain Frameworks

• Workflows

• Services

• State

• Intelligence

• Domain APIs

Never Owns

• UI Framework

• Infrastructure Runtime



------------------------------------------------------------

## terminals

Purpose

Operational Experiences

Owns

• Trading Terminal

• Infrastructure Terminal

• Risk Terminal

• Research Terminal

• Executive Terminal

• Compliance Terminal

Never Owns

• Shared Frameworks

• Platform Runtime



------------------------------------------------------------

## shared

Purpose

Common Assets

Owns

• Contracts

• Types

• SDK

• Utilities

• Shared Models

• Common Components

Never Owns

Business Features



------------------------------------------------------------

## infrastructure

Purpose

Platform Infrastructure

Owns

• Kubernetes

• Docker

• Kafka

• PostgreSQL

• Redis

• TimescaleDB

• Vault

• Keycloak

• Observability

• Networking

Never Owns

Application Logic



------------------------------------------------------------

## automation

Purpose

Automation Runtime

Owns

• n8n

• AI Automation

• Scheduled Jobs

• Workflow Automation

• Notifications

Never Owns

Business Rules



------------------------------------------------------------

## documentation

Purpose

Institutional Knowledge

Owns

• Blueprints

• Standards

• Architecture

• Stage Documents

• COREI Brain

Never Owns

Production Code



# =============================================================================
# 4. REPOSITORY RELATIONSHIP
# =============================================================================

```
Infrastructure
        │
        ▼
Platform
        │
        ▼
Shared
        │
        ▼
COREI OS
        │
        ▼
Domains
        │
        ▼
Terminals
```

Upper repositories expose capabilities.

Lower repositories consume capabilities.

Reverse ownership is prohibited.



# =============================================================================
# 5. OWNERSHIP MATRIX
# =============================================================================

| Repository | Primary Owner | Primary Consumer |
|------------|---------------|------------------|
| corei-os | UI Platform | All Terminals |
| platform | Runtime Platform | Domains, COREI OS |
| domains | Business Intelligence | Terminals |
| terminals | Operators | Human Operators |
| shared | Entire Platform | All Repositories |
| infrastructure | Infrastructure Team | Platform |
| automation | Automation Engine | Platform & Domains |
| documentation | Institutional Knowledge | Engineering Team |



# =============================================================================
# 6. DEVELOPMENT RULES
# =============================================================================

Before creating any file ask

Which repository owns it?

↓

Does this responsibility already exist?

↓

Can an existing repository own it?

↓

Does it violate repository boundaries?

↓

Will it introduce duplication?

If ownership is unclear,

implementation stops

until ownership is defined.



# =============================================================================
# 7. REPOSITORY LAW
# =============================================================================

One Repository

↓

One Mission

↓

One Owner

↓

One Responsibility

↓

Clear Boundary

↓

Defined Consumers

↓

Defined Dependencies

Repository ownership is architectural.

It shall never be determined by implementation convenience.

# =============================================================================
# END OF DOC-05
# =============================================================================
