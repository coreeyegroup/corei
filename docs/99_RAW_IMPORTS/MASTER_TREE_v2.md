~/corei
│
├── .env.example
├── .gitignore
├── .pre-commit-config.yaml
├── Makefile
├── README.md
├── VERSION
├── install.log
├── install.sh
│
├── artifacts/
├── backups/
├── brokers/
├── chaos/
│
├── cicd/
│   ├── github-actions/
│   ├── pipelines/
│   ├── release/
│   ├── validation/
│   └── README.md
│
├── compliance/
│
├── contracts/
│   ├── .keep
│   └── events/
│       └── event-envelope.yaml
│
├── datasets/
├── deployments/
│
├── docs/
│   │
│   ├── adr/
│   │   ├── ADR-001-kafka-authority.md
│   │   ├── ADR-002-replay-first-governance.md
│   │   ├── ADR-003-bounded-context-services.md
│   │   ├── ADR-004-governance-before-scale.md
│   │   ├── ADR-005-multi-repo-topology.md
│   │   └── README.md
│   │
│   ├── architecture/
│   │   ├── governance.md
│   │   ├── MASTER_TREE_v2.md
│   │   └── README.md
│   │
│   ├── governance/
│   │   ├── build-state-governance.md
│   │   ├── configuration-governance.md
│   │   ├── environment-governance.md
│   │   ├── event-governance.md
│   │   ├── filesystem-governance.md
│   │   ├── fixed-point-governance.md
│   │   ├── installer-governance.md
│   │   ├── lineage-governance.md
│   │   ├── README.md
│   │   ├── repository-boundaries.md
│   │   ├── repository-topology.md
│   │   ├── schema-governance.md
│   │   ├── scripting-governance.md
│   │   ├── service-boundary-governance.md
│   │   ├── service-ownership-governance.md
│   │   ├── timestamp-governance.md
│   │   ├── topic-governance.md
│   │   └── validation-governance.md
│   │
│   ├── infrastructure/
│   │   └── README.md
│   │
│   ├── lineage/
│   │
│   ├── machine-spec.md
│   │
│   ├── observability/
│   │
│   ├── operations/
│   │   └── README.md
│   │
│   ├── recovery/
│   │
│   ├── replay/
│   │
│   ├── runbooks/
│   │   └── README.md
│   │
│   ├── runtime/
│   │
│   ├── schemas/
│   │   └── README.md
│   │
│   ├── security/
│   │
│   ├── services/
│   │   └── README.md
│   │
│   ├── stages/
│   │   ├── README.md
│   │   ├── stage-02-repository-foundation.md
│   │   └── stage-03-platform-governance-foundation.md
│   │
│   └── standards/
│       └── engineering-principles.md
│
├── environments/
├── feature-store/
├── generated/
├── governance/
│
├── infrastructure/
│   │
│   ├── phases/
│   │   ├── stage-01-machine-foundation/
│   │   │   ├── README.md
│   │   │   ├── rollback.sh
│   │   │   ├── setup.sh
│   │   │   ├── state.sh
│   │   │   └── validate.sh
│   │   │
│   │   ├── stage-02-repository-foundation/
│   │   │   ├── README.md
│   │   │   ├── rollback.sh
│   │   │   ├── setup.sh
│   │   │   ├── state.sh
│   │   │   └── validate.sh
│   │   │
│   │   └── stage-03-governance-foundation/
│   │       ├── README.md
│   │       ├── rollback.sh
│   │       ├── setup.sh
│   │       ├── state.sh
│   │       └── validate.sh
│   │
│   ├── scripts/
│   │   └── lib/
│   │       ├── docker.sh
│   │       ├── env.sh
│   │       ├── filesystem.sh
│   │       ├── github.sh
│   │       ├── governance.sh
│   │       ├── helm.sh
│   │       ├── kubernetes.sh
│   │       ├── log.sh
│   │       ├── report.sh
│   │       ├── retry.sh
│   │       ├── state.sh
│   │       └── validate.sh
│   │
│   └── validation/
│       ├── filesystem/
│       │   └── validate-root-structure.sh
│       │
│       ├── governance/
│       │   ├── check-no-float.sh
│       │   ├── validate-governance.sh
│       │   └── validate-stage-03.sh
│       │
│       ├── repository/
│       │   └── validate-repositories.sh
│       │
│       ├── scripts/
│       │   └── validate-libraries.sh
│       │
│       ├── services/
│       │   └── validate-service-template.sh
│       │
│       └── stages/
│           └── validate-phases.sh
│
├── libraries/
├── lineage/
├── logs/
├── observability/
├── operations/
├── orchestration/
│
├── platform/
│   ├── contracts/
│   ├── governance/
│   ├── README.md
│   ├── runtime/
│   ├── sdk/
│   ├── shared/
│   └── system-registry/
│       └── README.md
│
├── policies/
├── replay/
│
├── repos/
│   ├── corei-core/
│   ├── corei-infrastructure/
│   ├── corei-sdk/
│   ├── corei-schemas/
│   └── corei-services/
│
├── research/
├── runbooks/
├── runtime/
│
├── schemas/
│   ├── avro/
│   │   ├── audit/
│   │   ├── common/
│   │   │   └── base-event.avsc
│   │   ├── execution/
│   │   ├── governance/
│   │   ├── market-data/
│   │   ├── portfolio/
│   │   └── strategy/
│   │
│   ├── compatibility/
│   ├── registry/
│   └── README.md
│
├── scratch/
│
├── scripts/
│   ├── foundation/
│   │   └── new-service.sh
│   │
│   ├── governance/
│   │   └── setup-stage-03-governance.sh
│   │
│   ├── setup-repos.sh
│   └── .keep
│
├── security/
│
├── services/
│   │
│   ├── _template/
│   │   ├── app/
│   │   │   └── main.py
│   │   │
│   │   ├── config/
│   │   │   └── service.yaml
│   │   │
│   │   ├── contracts/
│   │   │   └── events.yaml
│   │   │
│   │   ├── helm/
│   │   │   ├── templates/
│   │   │   │   ├── deployment.yaml
│   │   │   │   └── service.yaml
│   │   │   │
│   │   │   ├── Chart.yaml
│   │   │   └── values.yaml
│   │   │
│   │   ├── scripts/
│   │   │   └── start.sh
│   │   │
│   │   ├── tests/
│   │   │   └── test_health.py
│   │   │
│   │   ├── Dockerfile
│   │   ├── Makefile
│   │   ├── README.md
│   │   └── service.yaml
│   │
│   ├── market-data-service/
│   │   ├── app/
│   │   │   └── main.py
│   │   │
│   │   ├── config/
│   │   │   └── service.yaml
│   │   │
│   │   ├── contracts/
│   │   │   └── events.yaml
│   │   │
│   │   ├── helm/
│   │   │   ├── templates/
│   │   │   │   ├── deployment.yaml
│   │   │   │   └── service.yaml
│   │   │   │
│   │   │   ├── Chart.yaml
│   │   │   └── values.yaml
│   │   │
│   │   ├── scripts/
│   │   │   └── start.sh
│   │   │
│   │   ├── tests/
│   │   │   └── test_health.py
│   │   │
│   │   ├── Dockerfile
│   │   ├── Makefile
│   │   ├── README.md
│   │   ├── service-metadata.yaml
│   │   └── service.yaml
│   │
│   └── README.md
│
├── simulation/
├── state/
├── strategies/
├── tests/
├── tools/
├── ui/
└── workflows/
