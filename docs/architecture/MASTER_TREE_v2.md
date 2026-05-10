# MASTER_TREE_v2.md

# INSTITUTIONAL REPOSITORY GOVERNANCE TREE v2

STATUS: AUTHORITATIVE
VERSION: 2.0
OWNER: PLATFORM GOVERNANCE
STAGE: STAGE 2 + STAGE 3 RECONCILIATION
LAST UPDATED: 2026-05-08

---

# PURPOSE

This document defines the authoritative repository structure for the institutional trading platform.

This tree is:

* governance-enforced
* operationally scalable
* deterministic
* ownership-aware
* environment-compatible
* CI-validated

All repository artifacts MUST exist within approved ownership boundaries.

No artifact may exist without a defined home.

---

# CORE GOVERNANCE LAW

The repository is the single source of truth for:

* infrastructure
* runtime configuration
* platform services
* schemas
* governance
* orchestration
* operational tooling
* CI/CD
* observability
* recovery
* testing
* deployment topology

Filesystem organization is an architectural control mechanism.

Repository structure is NOT cosmetic.

---

# ROOT STRUCTURE

```text
trading-platform/
│
├── infrastructure/
├── platform/
├── services/
├── schemas/
├── governance/
├── orchestration/
├── observability/
├── operations/
├── replay/
├── runtime/
├── cicd/
├── scripts/
├── tests/
├── docs/
├── tools/
├── datasets/
├── research/
├── ui/
├── sandbox/
├── tmp/
│
├── .github/
├── .gitignore
├── .env.example
├── Makefile
├── VERSION
├── README.md
└── install.state
```

---

# ROOT OWNERSHIP DEFINITIONS

---

# infrastructure/

PURPOSE

Infrastructure substrate definitions.

ALLOWED

* Terraform
* Kubernetes bootstrap
* cluster provisioning
* storage provisioning
* networking
* ingress
* VPN
* infrastructure Helm charts
* node bootstrap
* infrastructure secrets templates

PROHIBITED

* business logic
* strategy logic
* runtime market data
* trading services

---

# platform/

PURPOSE

Shared institutional platform runtime components.

ALLOWED

* shared SDK
* lineage libraries
* event libraries
* schema utilities
* config libraries
* auth libraries
* common runtime abstractions
* shared protobuf/avro helpers
* resilience utilities

PROHIBITED

* service-specific business logic
* strategy implementations

SUBTREE

```text
platform/
├── sdk/
├── lineage/
├── config/
├── eventing/
├── security/
├── observability/
├── resilience/
├── orchestration/
├── validation/
└── shared/
```

---

# services/

PURPOSE

Bounded-context deployable services.

RULES

* one service = one ownership boundary
* services never share databases
* services communicate through Kafka only
* each service independently deployable

SUBTREE

```text
services/
├── _template/
├── market-data/
├── portfolio/
├── execution/
├── risk/
├── broker/
├── orchestration/
├── replay/
├── audit/
└── ui-backend/
```

SERVICE STRUCTURE

```text
service-name/
├── app/
├── domain/
├── infrastructure/
├── adapters/
├── contracts/
├── config/
├── tests/
├── Dockerfile
├── Makefile
└── README.md
```

---

# schemas/

PURPOSE

Authoritative schema registry source.

ALLOWED

* Avro schemas
* schema versioning
* compatibility metadata
* event contracts

RULES

* backward compatible only
* breaking changes require new topic version
* float forbidden in financial domains

SUBTREE

```text
schemas/
├── market-data/
├── execution/
├── portfolio/
├── risk/
├── broker/
├── audit/
└── shared/
```

---

# governance/

PURPOSE

Architectural governance authority.

ALLOWED

* ADRs
* standards
* naming rules
* schema governance
* lineage governance
* service boundary governance
* event governance
* dependency governance
* security governance

SUBTREE

```text
governance/
├── adr/
├── standards/
├── policies/
├── contracts/
├── architecture/
├── lineage/
└── validation/
```

---

# orchestration/

PURPOSE

Deterministic workflow orchestration.

ALLOWED

* n8n workflows
* orchestration manifests
* workflow governance
* scheduling policies
* automation pipelines

SUBTREE

```text
orchestration/
├── workflows/
├── schedules/
├── automation/
├── validation/
└── recovery/
```

---

# observability/

PURPOSE

Platform-wide observability systems.

ALLOWED

* dashboards
* metrics
* tracing
* alerting
* log routing
* telemetry standards

SUBTREE

```text
observability/
├── grafana/
├── prometheus/
├── loki/
├── jaeger/
├── alerts/
└── telemetry/
```

---

# operations/

PURPOSE

Operational procedures and production operations.

ALLOWED

* runbooks
* incident response
* maintenance procedures
* deployment operations
* DR procedures
* operational checklists

SUBTREE

```text
operations/
├── runbooks/
├── incidents/
├── recovery/
├── maintenance/
├── deployment/
└── procedures/
```

---

# replay/

PURPOSE

Deterministic replay and recovery systems.

ALLOWED

* replay orchestration
* recovery tooling
* lineage reconstruction
* deterministic validation
* historical reconstruction

SUBTREE

```text
replay/
├── orchestration/
├── recovery/
├── lineage/
├── validation/
└── tooling/
```

---

# runtime/

PURPOSE

Runtime-generated assets.

IMPORTANT

runtime/ is NOT source-controlled except approved metadata.

ALLOWED

* snapshots
* caches
* generated configs
* temporary exports
* runtime state
* replay artifacts
* generated manifests

PROHIBITED

* source code
* governance artifacts
* permanent configs

SUBTREE

```text
runtime/
├── snapshots/
├── cache/
├── generated/
├── exports/
├── replay/
└── temp/
```

---

# cicd/

PURPOSE

Deployment automation and GitOps.

ALLOWED

* GitHub Actions
* ArgoCD
* Helm release definitions
* deployment validation
* promotion gates

SUBTREE

```text
cicd/
├── github-actions/
├── argocd/
├── helm/
├── pipelines/
└── validation/
```

---

# scripts/

PURPOSE

Deterministic executable platform automation.

ALLOWED

* installers
* validators
* generators
* bootstrap scripts
* migration scripts

RULES

* scripts must be idempotent
* scripts must support non-interactive execution

SUBTREE

```text
scripts/
├── foundation/
├── infrastructure/
├── governance/
├── deployment/
├── validation/
├── migration/
└── utilities/
```

---

# tests/

PURPOSE

Centralized verification systems.

SUBTREE

```text
tests/
├── integration/
├── replay/
├── load/
├── chaos/
├── performance/
├── security/
└── certification/
```

---

# docs/

PURPOSE

Institutional documentation authority.

SUBTREE

```text
docs/
├── architecture/
├── operations/
├── deployment/
├── governance/
├── services/
├── schemas/
├── recovery/
└── onboarding/
```

---

# tools/

PURPOSE

Engineering support tooling.

ALLOWED

* local utilities
* helper tooling
* development support tools

PROHIBITED

* production runtime ownership

---

# datasets/

PURPOSE

Structured datasets for research/testing.

ALLOWED

* historical datasets
* replay datasets
* synthetic datasets
* validation datasets

PROHIBITED

* production secrets
* unrestricted runtime dumps

---

# research/

PURPOSE

Research and experimental analysis.

RULES

* isolated from production services
* cannot directly deploy to production

SUBTREE

```text
research/
├── notebooks/
├── experiments/
├── feature-analysis/
├── models/
└── prototypes/
```

---

# ui/

PURPOSE

Frontend systems and operational interfaces.

SUBTREE

```text
ui/
├── operator-console/
├── admin-console/
├── monitoring-ui/
├── replay-ui/
└── shared/
```

---

# sandbox/

PURPOSE

Temporary isolated experimentation.

RULES

* never production-authoritative
* periodic cleanup mandatory

---

# tmp/

PURPOSE

Disposable temporary assets.

RULES

* fully ignored by git
* auto-cleaned
* never authoritative

---

# REPOSITORY GOVERNANCE RULES

---

# RULE 1

No service may read another service database directly.

Cross-service communication MUST occur through Kafka.

---

# RULE 2

All financial values MUST use fixed-point int64.

float and decimal are forbidden in trading logic.

---

# RULE 3

All timestamps MUST use epoch nanoseconds UTC.

---

# RULE 4

Every deployable service MUST contain:

```text
README.md
Dockerfile
health endpoint
tests/
config/
```

---

# RULE 5

Generated artifacts MUST NOT pollute source-controlled domains.

---

# RULE 6

Runtime state MUST NEVER be treated as governance truth.

---

# RULE 7

All directories MUST have explicit ownership.

Orphan directories are architecture violations.

---

# RULE 8

Filesystem placement violations are CI failures.

---

# GOVERNANCE ENFORCEMENT

Validation tooling MUST verify:

* tree structure
* prohibited file placement
* naming standards
* schema ownership
* service ownership
* runtime pollution
* generated artifact leakage

---

# VALIDATION TARGETS

```bash
make validate-tree
make validate-governance
make validate-placement
make validate-runtime
```

---

# AUTHORITATIVE STATUS

This document supersedes:

* MASTER_TREE_FULL_v1
* temporary repository layouts
* experimental filesystem structures

This document becomes the canonical repository governance authority.

END OF DOCUMENT

