# CORE ENGINEERING LAW

AUTHORITATIVE PURPOSE :
    This document defines the mandatory engineering execution model for the CORE platform.

It establishes:
    * execution governance
    * decision governance
    * implementation governance
    * validation governance
    * documentation governance
    * anti-duplication governance
    * architecture protection governance

This law applies to:
    * platform stages
    * services
    * Python modules
    * n8n workflows
    * APIs
    * databases
    * Kafka topics
    * schemas
    * infrastructure
    * automation
    * dashboards
    * operational tooling

# SECTION 1 — EXECUTION FLOW

    All engineering work must follow the same lifecycle.

    EXISTENCE CHECK
            ↓
        DESCRIBE
            ↓
        IMPLEMENT
            ↓
        VALIDATE
            ↓
        DOCUMENT

    Progression is sequential.
    No phase may be skipped.
    No phase may be reordered.

# SECTION 2 — AUTHORITY HIERARCHY

    When conflicts occur, the following authority order applies.

    | Priority | Authority      |
    | -------- | -------------- |
    | 1        | Architecture   |
    | 2        | Governance     |
    | 3        | Validation     |
    | 4        | Documentation  |
    | 5        | Delivery Speed |

    Rules:
    * Speed never overrides validation.
    * Validation never overrides architecture.
    * Governance never violates architecture.
    * Documentation reflects reality.
    * Architecture is final authority.

# SECTION 3 — DECISION ENGINE

    Before implementation begins, every request must pass through the decision engine.

    | Situation                                | Decision |
    | ---------------------------------------- | -------- |
    | Capability already exists                | REUSE    |
    | Capability partially exists              | EXTEND   |
    | Capability exists but violates ownership | REDESIGN |
    | Capability does not exist                | BUILD    |

    Implementation is the last option.
    Discovery is always the first option.

# SECTION 4 — GLOBAL GOVERNANCE RULES

    RULE 1:
    No duplicate ownership.
    A responsibility must belong to one authoritative owner.

    RULE 2:
    No duplicate implementation.
    Existing capabilities must be reused or extended.

    RULE 3:
    No undocumented implementation.
    Undocumented systems are incomplete systems.

    RULE 4:
    No validation bypass.
    Validation is mandatory before progression.

    RULE 5:
    No architecture violations.
    Implementation must respect ownership boundaries.

    RULE 6:
    No hidden state.
    All operational behavior must be visible and traceable.

    RULE 7:
    No runtime-only dependencies.
    All operational behavior must be reproducible from source control.

    RULE 8:
    No recovery gaps.
    Every implementation must be recoverable.

    RULE 9:
    No production assumptions.
    Capabilities must be proven through validation.

    RULE 10:
    No phase skipping.
    Every execution must follow the defined lifecycle.

# SECTION 5 — PHASE CONTRACTS

    PHASE 0 — EXISTENCE CHECK

        Purpose:
            Determine whether the requirement already exists.

        Entry Criteria
            * New requirement identified

        Required Questions
            * Does it already exist?
            * Does something similar exist?
            * Can it be extended?
            * Who owns this responsibility?
            * Would this create duplication?
            * Would this violate ownership boundaries?

        Exit Criteria
            One of:
                * REUSE
                * EXTEND
                * REDESIGN
                * BUILD

        Failure Conditions
            * Ownership ambiguity
            * Duplicate ownership
            * Architecture conflict

        Action
        Stop and resolve conflict.

    PHASE 1 — DESCRIBE

        Purpose
            Define the target before implementation begins.

        Required Definition

            | Item                 | Required |
            | -------------------- | -------- |
            | Purpose              | Yes      |
            | Responsibilities     | Yes      |
            | Non-Responsibilities | Yes      |
            | Inputs               | Yes      |
            | Outputs              | Yes      |
            | Dependencies         | Yes      |
            | Execution Model      | Yes      |
            | Validation Model     | Yes      |
            | Success Conditions   | Yes      |
            | Failure Conditions   | Yes      |
            | Recovery Model       | Yes      |
            | Handoff Contract     | Yes      |

        Exit Criteria
            All required sections completed.

        Failure Conditions
            * Missing ownership
            * Missing inputs
            * Missing outputs
            * Missing validation model
            * Missing recovery model

        Action
            Stop and complete description.

    PHASE 2 — IMPLEMENT

        Purpose
            Build the approved design.

        Entry Criteria
            * Description approved
            * Dependencies available
            * Architecture approved

        Requirements
            * Follow architecture
            * Follow ownership boundaries
            * Follow governance standards
            * Follow deterministic execution
            * Follow source-control authority

        Failure Conditions
            * Duplicate logic
            * Ownership violation
            * Architecture violation
            * Hidden state
            * Runtime-only behavior
            * Undocumented logic

        Exit Criteria
            Implementation complete.

        Action
            Return to Describe if violations are found.

    PHASE 3 — VALIDATE

        Purpose
            Prove correctness.

        Required Validation

            | Validation Area | Required |
            | --------------- | -------- |
            | Functional      | Yes      |
            | Determinism     | Yes      |
            | Schema          | Yes      |
            | Replay          | Yes      |
            | State           | Yes      |
            | Traceability    | Yes      |
            | Boundary        | Yes      |
            | Recovery        | Yes      |
            | Performance     | Yes      |
            | Ownership       | Yes      |

        Exit Criteria
            All validations pass.

        Failure Conditions
            * Validation failure
            * Replay mismatch
            * Determinism failure
            * Traceability failure
            * Recovery failure

        Action
            Return to Implement.

    PHASE 4 — DOCUMENT

        Purpose
            Convert implementation knowledge into institutional knowledge.

        Required Documentation

            | Item               | Required |
            | ------------------ | -------- |
            | Purpose            | Yes      |
            | Architecture       | Yes      |
            | Ownership          | Yes      |
            | Inputs             | Yes      |
            | Outputs            | Yes      |
            | Dependencies       | Yes      |
            | Validation Results | Yes      |
            | Operations         | Yes      |
            | Recovery Procedure | Yes      |
            | Known Constraints  | Yes      |
            | Deferred Items     | Yes      |

        Exit Criteria
            Documentation complete and aligned with implementation.

        Failure Conditions
            * Missing documentation
            * Outdated documentation
            * Missing recovery procedure

        Action
            Update documentation and re-review.

# SECTION 6 — GLOBAL STOP CONDITIONS

    Execution must stop immediately if any of the following occur:
        * Ownership ambiguity
        * Architecture violation
        * Duplicate implementation
        * Determinism failure
        * Replay failure
        * Traceability failure
        * Recovery failure
        * Missing validation criteria
        * Missing documentation
        * Undocumented implementation

# SECTION 7 — COMPLETION CRITERIA

    Work is considered complete only when:

        EXISTENCE CHECK      PASS
        DESCRIBE             PASS
        IMPLEMENT            PASS
        VALIDATE             PASS
        DOCUMENT             PASS

    All phases must pass.
    Partial completion is not completion.

# SECTION 8 — ENGINEERING PRINCIPLE

    DISCOVER FIRST
    DESIGN SECOND
    BUILD THIRD
    PROVE FOURTH
    DOCUMENT LAST

    Implementation is not the goal.
    Institutional correctness is the goal.

# FINAL LAW

    IF EXISTS
        → REUSE

    IF EXTENDABLE
        → EXTEND

    IF OWNERSHIP CONFLICT EXISTS
        → REDESIGN

    IF NOT PRESENT
        → BUILD

    IF NOT VALIDATED
        → DO NOT DEPLOY

    IF NOT DOCUMENTED
        → NOT COMPLETE

This law is globally authoritative across the entire CORE platform.
