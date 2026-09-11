# 99_RAW_IMPORTS — RAW INGESTION LAYER

## PURPOSE

This directory is the **raw input ingestion layer** of the CORE trading platform.

It stores **unstructured, external, and pre-processed documents** before they are:

→ analyzed
→ extracted
→ transformed
→ mapped into the structured system (00–10 folders)

---

## CORE PRINCIPLE

RAW FILES ARE:

- NOT part of the system
- NOT trusted directly
- NOT used in execution

They are:

→ INPUT MATERIAL for system construction

---

## STRUCTURE

99_RAW_IMPORTS/

├── CORE_INPUTS_RAW/
├── PHASE_A_RAW/
├── PHASE_B_RAW/
├── PHASE_C_RAW/
├── PHASE_D_RAW/

---

# 🔵 CORE_INPUTS_RAW

## ROLE

Contains **high-value mixed domain inputs** not tied to a specific phase.

## CONTENT TYPES

- architecture blueprints
- red team / blue team frameworks
- system-level thinking
- research documents
- cross-domain models (infra + trading + risk)

## CHARACTERISTICS

- unstructured
- mixed abstraction levels
- may contain conflicting logic
- requires extraction before usage

## USAGE RULE

→ MUST be processed FIRST before phase-specific inputs

---

# 🔵 PHASE A — TRADING MODEL DESIGN (RAW)

## ROLE

Defines the **core trading brain (logical system)**

## WHAT IT CONTAINS

Raw files corresponding to:

### Step 1 → Strategy Architecture
### Step 2 → Signal Model
### Step 3 → Decision Engine
### Step 4 → Execution Behavior
### Step 5 → Risk Philosophy
### Step 6 → Capital Allocation
### Step 7 → Portfolio Model
### Step 8 → Feedback / Learning Model

## SYSTEM COVERAGE

End-to-end deterministic trading pipeline:

Strategy
→ Signal
→ Decision
→ Trade Intent
→ Execution Behavior
→ Risk Philosophy
→ Capital Allocation
→ Portfolio
→ Learning

## IMPORTANT CONTEXT

Example:

- Signal Model defines deterministic signal schema and hashing :contentReference[oaicite:0]{index=0}
- Decision Engine converts signals → trade intents deterministically :contentReference[oaicite:1]{index=1}
- Execution Behavior maps intent → execution instructions without infra :contentReference[oaicite:2]{index=2}
- Risk Philosophy defines system-wide risk doctrine (logical, not enforcement) :contentReference[oaicite:3]{index=3}
- Capital Allocation distributes capital deterministically across strategies :contentReference[oaicite:4]{index=4}
- Portfolio Model aggregates exposures into portfolio state :contentReference[oaicite:5]{index=5}
- Learning Model closes loop with deterministic feedback system :contentReference[oaicite:6]{index=6}

## OUTPUT OF THIS PHASE

👉 Fully deterministic, replay-safe **trading model (logic only)**

## DOES NOT INCLUDE

- infrastructure
- execution systems
- brokers
- APIs

---

# 🔵 PHASE B — CONSTRAINTS & GOVERNANCE (RAW)

## ROLE

Defines **numeric limits, constraints, and system-wide control rules**

## WHAT IT CONTAINS

- risk limits (numeric)
- exposure caps
- allocation constraints
- system invariants
- validation thresholds
- constraint enforcement definitions (logical)

## PURPOSE

Ensures Phase A outputs operate within:

→ bounded
→ safe
→ institution-grade constraints

## KEY DISTINCTION

Phase A = logic
Phase B = limits on that logic

---

# 🔵 PHASE C — SYSTEM ARCHITECTURE (RAW)

## ROLE

Defines **technical architecture of the platform**

## WHAT IT CONTAINS

- microservices design
- event-driven architecture
- Kafka / message systems
- data pipelines
- APIs
- database design
- system topology

## PURPOSE

Convert logical trading model (Phase A) into:

→ scalable
→ distributed
→ production-grade system

---

# 🔵 PHASE D — EXECUTION SYSTEM (RAW)

## ROLE

Defines **real-world execution and enforcement layer**

## WHAT IT CONTAINS

- order management system (OMS)
- execution engine
- broker integration
- risk enforcement engine
- capital enforcement
- real-time execution logic

## PURPOSE

Transforms:

Trade Intent / Execution Behavior (Phase A)
+ Constraints (Phase B)

→ into **actual trades in the market**

## KEY DISTINCTION

Phase A = what to do
Phase D = actually doing it

---

# 🔴 PROCESSING RULES (CRITICAL)

1. RAW files MUST NOT be edited
2. RAW files MUST NOT be used directly in system
3. ALL content MUST be:
   - extracted
   - validated
   - mapped into structured folders

4. Processing order:

   CORE_INPUTS_RAW
   → PHASE_A_RAW
   → PHASE_B_RAW
   → PHASE_C_RAW
   → PHASE_D_RAW

---

# 🔴 PIPELINE MODEL

RAW INPUT
→ Extraction
→ Structuring
→ Validation
→ System Integration

---

# 🔴 FINAL PRINCIPLE

This folder is the **entry point of knowledge**
NOT the system itself.

System exists ONLY in:

00–10 structured directories
