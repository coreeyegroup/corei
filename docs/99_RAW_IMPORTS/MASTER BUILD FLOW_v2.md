INSTITUTIONAL TRADING PLATFORM
MASTER BUILD FLOW — AUTHORITATIVE REFERENCE

CORE ENGINEERING LAWS

LAW 1 — FOUNDATION FIRST
    The platform is built in this order. No exceptions.

    ENGINEERING GOVERNANCE
        → MACHINE FOUNDATION
        → REPOSITORY FOUNDATION
        → PLATFORM GOVERNANCE
        → INFRASTRUCTURE SUBSTRATE
        → KUBERNETES PLATFORM
        → SECURITY LAYER
        → EVENT BACKBONE
        → STORAGE LAYER
        → OBSERVABILITY
        → CI/CD PIPELINE
        → TESTING FRAMEWORK
        → PLATFORM RUNTIME
        → MARKET DATA
        → PORTFOLIO STATE
        → TRADING LOGIC
        → EXECUTION PIPELINE
        → BROKER CONNECTIVITY
        → PAPER VALIDATION
        → OPERATIONAL CONTROL
        → RECOVERY VALIDATION
        → LIVE ACTIVATION
        → PRODUCTION HARDENING
        → MULTI-NODE SCALE
        → CO-LOCATION

    Every stage depends on previous stage stability.
    No stage begins until prior stage gate passes.

LAW 2 — UNIVERSAL EXECUTION LAW
    Every stage, subsystem, service, and component follows this cycle:

    DEFINE → BUILD → IMPLEMENT → VALIDATE → DOCUMENT

    This is recursive across the entire platform.
    Applied at every level: stage, phase, service, function.

LAW 3 — UNIVERSAL SCRIPTING LAW
    Every action in this build is executed by a script.
    The human runs the script. The script does the work.

    HUMAN TYPES:    make stage-XX
    MAKEFILE CALLS: bash infrastructure/phases/stage-XX/setup.sh
    SETUP CALLS:    infrastructure/components/*/install.sh
    COMPONENTS RUN: helm upgrade --install OR kubectl apply
    VALIDATE RUNS:  infrastructure/phases/stage-XX/validate.sh
    VALIDATE EXITS: 0 = PASS → proceed | 1 = FAIL → halt with reason

    ONLY TWO MANUAL ACTIONS IN THE ENTIRE BUILD:
        1. Save Vault init keys to offline secure storage (Stage 6)
        2. Type CONFIRM-LIVE at Stage 20 go-live activation

    Everything else: scripted, automated, repeatable.

STAGE REFERENCE MAP
    Stage 0    Engineering Foundation
    Stage 0A   Windows Host Preparation        ← added (starting from Windows)
    Stage 1    Machine Foundation
    Stage 2    Repository Foundation
    Stage 3    Platform Governance Foundation
    Stage 3A   Configuration Foundation
    Stage 4    Infrastructure Foundation
    Stage 5    Kubernetes Platform Foundation
    Stage 6    Security Foundation
    Stage 7    Event Backbone Foundation
    Stage 8    Storage Foundation
    Stage 9    Observability Foundation
    Stage 10   CI/CD Foundation
    Stage 10A  Testing Foundation
    Stage 11   Core Platform Foundation
    Stage 12   Market Data Foundation
    Stage 12A  Research and Data Governance Foundation
    Stage 13   Portfolio Foundation
    Stage 14   Trading Logic Foundation
    Stage 15   Execution Foundation
    Stage 16   Broker Connectivity Foundation
    Stage 17   Paper Trading Validation
    Stage 18   UI and Operational Control
    Stage 19   Replay and Recovery Validation
    Stage 20   Live Trading Activation
    Stage 21   Production Hardening
    Stage 22   Multi-Node Scaleout
    Stage 23   Co-location Preparation

FULL STAGE DEFINITIONS

STAGE 0 — ENGINEERING FOUNDATION
    PURPOSE
    Establish institutional engineering governance before any implementation begins.
    No code is written until this stage is complete and documented.
    This stage produces the laws that govern everything downstream.

    INCLUDES
    GitHub organization and repository creation
    Repository strategy (mono-repo vs multi-repo decision + rationale)
    Branching strategy
        main    → production-ready only
        staging → integration testing
        dev     → active development
        feature → short-lived, PR-based
    Semantic versioning policy (MAJOR.MINOR.PATCH)
    ADR (Architecture Decision Record) framework and first 5 ADRs
        ADR-001 Kafka as single source of truth
        ADR-002 SHA-256 hash-chain lineage
        ADR-003 Fixed-point int64 arithmetic
        ADR-004 Event-time governance
        ADR-005 Paper-first activation policy
    Coding standards document (Python PEP8, Go formatting, type hints required)
    Commit message standards (Conventional Commits)
    Naming standards (services, topics, schemas, namespaces, environments)
    Schema versioning rules (v1, v2 — breaking changes require new topic)
    Environment naming convention (dev, staging, production)
    Definition of Done for every service (test coverage, docs, health endpoint)
    PR review policy (minimum 1 approver, CI must pass)

    SCRIPTS
    scripts/foundation/setup-github.sh         → create org, repos, branch rules
    scripts/foundation/init-adrs.sh            → create docs/adr/ with first 5 ADRs
    scripts/foundation/generate-standards.sh   → write coding + naming docs to docs/

    GATE
    GitHub repo exists with correct structure
    Main branch protection rules enforced
    docs/adr/ contains minimum 5 ADRs
    docs/architecture/standards.md exists
    validate.sh: all docs present, repo accessible

    OUTPUT
    Institutional engineering governance layer.
    Every future decision is traceable to a standard or ADR.

    TIME
    1-2 days

STAGE 0A — WINDOWS HOST PREPARATION
    PURPOSE
    Prepare the Windows machine to create, manage, and access
    the Ubuntu VM where all infrastructure will run.
    Starting point: bare Windows 10/11 machine.

    INCLUDES
    Windows system validation (CPU virtualisation, RAM, disk)
    VMware Workstation installation
    VMware network configuration (bridged adapter to physical NIC)
    Git for Windows installation
    Python 3.11+ installation on Windows host
    SSH key generation for VM access
    Host-side tooling: kubectl, helm, terraform (Windows binaries for remote ops)
    Ubuntu 22.04 LTS ISO download and verification

    SCRIPTS
    scripts/host/windows-prereq-check.ps1
        Checks: CPU VMX flag, RAM >= 12GB, disk >= 100GB free
        Checks: VMware Workstation installed, Git in PATH, Python 3.11+ in PATH
        Checks: virtualisation enabled in BIOS via systeminfo
        If any check fails: prints fix instruction, halts

    scripts/host/install-host-tools.ps1
        winget install Git.Git
        winget install Python.Python.3.11
        winget install Hashicorp.Terraform
        Downloads kubectl + helm Windows binaries, adds to PATH

    scripts/host/create-vm.ps1
        Downloads Ubuntu 22.04 ISO if not cached
        Generates cloud-init user-data and meta-data:
        hostname: core-node
        user: coreeye
        ssh: enabled
        storage: direct layout
        late-commands: enable openssh
        Packages cloud-init as seed.iso (xorriso)
        Writes VMX config file (4 vCPU, 8GB RAM, 80GB disk, bridged)
        Creates virtual disk via vmware-vdiskmanager
        Registers and starts VM via vmrun
        Polls SSH until reachable (max 20 min)

    GATE
    SSH connection: ssh coreeye@core-node succeeds
    hostname = core-node on remote
    validate.ps1: all host tools in PATH, VM reachable

    OUTPUT
    Fully provisioned Ubuntu VM accessible from Windows via SSH.
    All further stages run on the Ubuntu VM, not Windows.

    TIME
    30-60 minutes

STAGE 1 — MACHINE FOUNDATION
    PURPOSE
        Prepare the Ubuntu node as a deterministic, high-performance
        foundation for Kubernetes and trading workloads.
        This stage is the OS contract — everything above depends on it.

    INCLUDES
        Ubuntu 22.04 LTS system update and base utilities
        Swap disabled permanently (Kubernetes requirement, non-negotiable)
        Hostname standardized: core-node
        Chrony NTP time synchronization (critical for event_time accuracy)
        Ulimits configured: nofile=1048576, nproc=65535, memlock=unlimited
        Kernel parameter tuning:
            net.bridge.bridge-nf-call-iptables = 1
            net.ipv4.ip_forward = 1
            vm.swappiness = 0
            vm.max_map_count = 262144 (Kafka + Elasticsearch requirement)
            fs.file-max = 2097152
            fs.inotify.max_user_watches = 524288
        Kernel modules: overlay, br_netfilter, ip_conntrack (persisted)
        UFW firewall baseline: allow 22, 80, 443, 6443 only
        Systemd journal capped: 2GB max, 2-week retention
        Unnecessary services disabled: snapd, bluetooth, avahi-daemon
        Storage allocation: partition plan for Kubernetes PVCs
        Python 3.11, Go 1.22, Rust 1.77 installed on node
        WireGuard installed (activated in Stage 21)

    SCRIPTS
    infrastructure/phases/stage-01-machine-foundation/setup.sh
        Sources: infrastructure/config/global.env, versions.env
        Runs all steps above
        Logs every step to .logs/stage-01-TIMESTAMP.log

    infrastructure/phases/stage-01-machine-foundation/validate.sh
        hostname          = core-node           PASS/FAIL
        free swap         = 0B                  PASS/FAIL
        ulimit -Hn        = 1048576             PASS/FAIL
        vm.swappiness     = 0                   PASS/FAIL
        ip_forward        = 1                   PASS/FAIL
        chrony status     = active              PASS/FAIL
        overlay module    = loaded              PASS/FAIL
        br_netfilter      = loaded              PASS/FAIL
        python3 --version = 3.11.x              PASS/FAIL
        ufw status        = active              PASS/FAIL

    GATE
        validate.sh exits 0
        All 10 checks = PASS
        VM snapshot created: stage-01-complete

    OUTPUT
        Deterministic Ubuntu node — Kubernetes-ready, trading-workload-tuned.

    TIME: 15-20 minutes

STAGE 2 — REPOSITORY FOUNDATION
    PURPOSE
    Create the full repository architecture before any implementation begins.
    The repository is the single source of truth for all platform artifacts.
    Nothing exists that is not in this repository.

    INCLUDES
    Full directory tree scaffolded from MASTER_TREE_FULL_v_1 spec:
        infrastructure/
        platform/
        services/
        schemas/
        cicd/
        docs/
        tests/
        scripts/
    .gitignore (excludes .env, .logs, *.pyc, build artifacts, secrets)
    .env.example with ALL required environment variables and descriptions
    Makefile with all stage targets (make stage-XX for every stage)
    VERSION file initialized: 0.1.0
    README.md with build sequence reference
    services/_template/ scaffold (canonical service structure)
    Service scaffold generator script (creates new service from template)
    Shared library stubs: infrastructure/scripts/lib/
        log.sh, env.sh, retry.sh, helm.sh, k8s.sh, state.sh, validate.sh
    install.state file for build state tracking
    Pre-commit hooks installed (lint, secret scanning, commit message validation)

    SCRIPTS
    scripts/foundation/scaffold-repo.sh
        Creates all directories from tree spec
        Copies _template to create services skeleton
        Writes .gitignore, .env.example, Makefile, VERSION, README.md
        Installs pre-commit hooks

    scripts/foundation/new-service.sh <service-name> <namespace>
        Copies _template to services/<service-name>/
        Replaces _template placeholders with service-name
        Creates cicd/argocd/{dev,staging,prod}/<service-name>.yaml
        Adds service to Makefile targets

    GATE
    All required directories exist
    .env.example has all required variables
    Makefile has targets for all 24 stages
    pre-commit hooks installed and passing
    validate.sh: tree structure matches spec

    OUTPUT
    Institutional repository foundation.
    Every future artifact has a defined home before it is built.

    TIME
    30 minutes

STAGE 3 — PLATFORM GOVERNANCE FOUNDATION
    PURPOSE
    Establish the architectural laws before any workload implementation.
    These are documented, versioned rules that all services must follow.
    Violations of these rules make a service invalid — not just bad.

    INCLUDES
    Event contracts (what every Kafka event must contain):
        event_id, event_time, trace_id, execution_id, schema_version
    Schema governance rules:
        All schemas use Avro
        All financial values: int64 fixed-point (no float, no decimal)
        All timestamps: int64 epoch nanoseconds UTC (no string dates)
        Schema changes: backward-compatible only
        Breaking changes: new topic version + migration plan
    Lineage governance:
        SHA-256 hash chain mandatory from tick to fill
        Chain break = system halt (not warning)
        Hash algorithm: SHA-256 only, canonical byte encoding, fixed field order
    Timestamp governance:
        event_time = exchange timestamp (preferred) or ingestion timestamp
        System clock: operational logging only, never trading logic
        Clock drift monitoring: maximum 10ms tolerance
    Fixed-point rules:
        All prices: int64, precision defined per instrument (e.g. 5 decimal = /100000)
        All sizes: int64
        All PnL: int64
        Float comparison in any financial calculation = build failure
    Topic naming convention:
        <domain>_<entity>_<type>_<version>
        Example: execution_order_stream_v1
    Service boundary rules:
        Each service owns exactly one bounded context
        No service reads another service's database directly
        All cross-service communication through Kafka only
        HTTP only for: health checks, admin APIs, dashboard
    Dependency ownership map documented in platform/system-registry/
    Config hierarchy: platform defaults → environment → service → runtime override
    Environment hierarchy: dev → staging → production (no skipping)

    SCRIPTS
    scripts/governance/validate-governance.py
        Checks all Avro schemas for float types → fails if found
        Checks all schemas for required fields → fails if missing
        Checks all service Dockerfiles for non-root user → fails if missing
        Checks all Helm charts for resource limits → fails if missing
        Run in CI on every PR

    scripts/governance/check-lineage-rules.py
        Static analysis: checks that lineage_client is imported in every service
        Checks that no service uses time.time() in business logic paths

    GATE
    docs/architecture/governance.md exists and covers all above
    governance/validate-governance.py exits 0 on current codebase
    All 5 ADRs reference these governance rules

    OUTPUT
    Deterministic governance authority.
    Every future service is built to these rules, not interpreted from them.

    TIME
    1-2 days (documentation + tooling)

STAGE 3A — CONFIGURATION FOUNDATION
    PURPOSE
    Create centralized, deterministic configuration authority.
    Configuration is not in code. Configuration is not in environment variables.
    Configuration is a versioned, governed platform artifact.

    INCLUDES
    Environment configuration hierarchy (dev/staging/prod)
    Strategy configuration schema (per strategy, versioned, approved before deploy)
    Risk configuration schema (per-firm, per-portfolio, per-strategy, per-trade)
    Instrument metadata catalog (symbol, pip size, lot size, sessions, broker mapping)
    Broker metadata (connection parameters, supported features, rate limits)
    Account metadata (account_id, broker, group, capital, mode, strategy assignments)
    Feature flags schema (runtime toggles, no deploy required for flag changes)
    Runtime parameters (timeouts, retry counts, batch sizes)
    Operation modes: PAPER / LIVE_SEMI / LIVE_AUTO / DISABLED / BACKTEST
    Config snapshot mechanism (every config change creates immutable versioned snapshot)
    Config lineage (every snapshot traceable to who changed what and when)
    Config approval workflow (risk parameters require risk-admin role to change)

    SCRIPTS
    scripts/config/seed-config.sh
        Seeds initial configuration from .env.example into config-service
        Creates initial instrument catalog from instruments.yaml
        Creates initial account definitions from accounts.yaml
        Creates initial risk limits from risk-limits.yaml
        All values sourced from infrastructure/config/ — never hardcoded

    scripts/config/validate-config.sh
        Checks all required config keys exist
        Checks all config values are within valid ranges
        Checks risk limits are not zero or negative
        Checks operation mode = PAPER on all accounts (required for staging)

    GATE
    Config service seeded with all required keys
    All accounts in PAPER mode
    validate-config.sh exits 0

    OUTPUT
    Centralized configuration platform.
    Single config-service is the only source for all runtime configuration.

    TIME
    1 day

STAGE 4 — INFRASTRUCTURE FOUNDATION
    PURPOSE
    Build the deployable infrastructure substrate.
    This is the physical/virtual layer that Kubernetes runs on.
    For VMware: single node. For VPS/cloud: scripted provisioning.

    INCLUDES
    Terraform module structure ready for all environments:
        terraform/environments/vmware/
        terraform/environments/vps-staging/
        terraform/environments/production/
    Node provisioning scripts (VMware: already done in Stage 0A)
    Cluster bootstrap prerequisites (on each node)
    Networking: bridged adapter verified, static IP assignment
    MetalLB IP pool definition
    Ingress controller definition
    Longhorn distributed storage provisioned
    WireGuard installed (not yet active — activated in Stage 21)
    Persistent storage allocation mapped (which PVC goes to which component)
    Backup strategy defined: Velero + S3/Wasabi (activated in Stage 21)
    Time synchronization validated (Chrony, max 10ms drift)
    Hardware snapshot: core-node spec recorded in docs/

    SCRIPTS
    infrastructure/phases/stage-04-infra-foundation/setup.sh
        Installs Docker Engine 29.x (official repo)
        Configures /etc/docker/daemon.json (overlay2, systemd, json-file logging)
        Configures containerd (SystemdCgroup=true, registry mirrors)
        Installs Helm v3.20.x and adds all repos
        Installs kubectl 1.29.x
        Installs terraform 1.8.x
        Starts local Docker registry port 5000
        Runs terraform init for active environment

    infrastructure/phases/stage-04-infra-foundation/validate.sh
        docker info → Storage Driver: overlay2, Cgroup Driver: systemd
        helm version → v3.20.x
        kubectl version (client only) → v1.29.x
        terraform version → 1.8.x
        docker run hello-world → Hello from Docker!
        Registry port 5000 responding

    GATE
    validate.sh exits 0
    All container and IaC tooling available and correctly configured

    OUTPUT
    Deployable infrastructure substrate.
    Docker, Helm, kubectl, Terraform all present and version-locked.

    TIME
    20 minutes

STAGE 5 — KUBERNETES PLATFORM FOUNDATION
    PURPOSE
    Create the container orchestration platform.
    All services deploy here. All state is managed here.
    All networking, routing, and scheduling is governed here.

    INCLUDES
    Kubernetes 1.29.x cluster initialized (kubeadm, single-node dev)
    Calico CNI v3.27 installed (pod CIDR 192.168.0.0/16)
    Control-plane taint removed (single-node: allows workloads)
    All 17 namespaces created with correct labels:
        kafka, storage, auth, vault, monitoring, logging, tracing,
        registry, cicd, platform, market-data, strategy, execution,
        trading-infra, portfolio, n8n, istio-system
    Kubernetes RBAC: ClusterRoles + RoleBindings per namespace
    Network policies: deny-all-default on all trading namespaces
        allow-kafka: specifies who can talk to kafka NS
        allow-storage: specifies who can talk to storage NS
        allow-monitoring: Prometheus scrape access
        execution-isolation: execution NS only receives from strategy NS
        trading-infra-isolation: trading-infra NS only receives from execution NS
    Resource quotas per namespace (CPU, memory, PVC count limits)
    Priority classes: trading-critical > platform > infra > default
    Pod disruption budgets: critical-services + infra-services
    Service accounts created for each future service (Vault auth prerequisite)
    Longhorn storage class: set as default
    Helm release naming convention enforced via admission webhook

    SCRIPTS
    infrastructure/phases/stage-05-k8s-platform/setup.sh
        kubeadm init with kubeadm-config.yaml (generated from .env)
        Copies admin.conf to ~/.kube/config
        Removes control-plane taint
        kubectl apply -f calico.yaml, waits for Ready
        kubectl apply -f kubernetes/namespaces/all-namespaces.yaml
        kubectl apply -f kubernetes/rbac/
        kubectl apply -f kubernetes/network-policies/
        kubectl apply -f kubernetes/resource-quotas.yaml
        kubectl apply -f kubernetes/priority-classes.yaml
        kubectl apply -f kubernetes/pod-disruption-budgets/
        Helm repos added and updated

    infrastructure/phases/stage-05-k8s-platform/validate.sh
        kubectl get nodes → STATUS=Ready
        kubectl get pods -n kube-system → all Running
        All 17 namespaces exist
        Network policies applied to all trading namespaces
        Resource quotas applied
        kubectl cluster-info → control plane reachable

    GATE
    validate.sh exits 0
    Node Ready, all system pods Running
    All 17 namespaces with correct labels

    OUTPUT
    Institutional orchestration layer.
    Cluster ready for security layer before any workloads deploy.

    TIME
    20 minutes

STAGE 6 — SECURITY FOUNDATION
    PURPOSE
    Secure the platform before any workload deploys.
    Nothing runs on this cluster without identity, secrets, and mTLS.
    This stage is the non-negotiable prerequisite for all services.

    INCLUDES
    HashiCorp Vault 1.16 (secrets management)
        Vault initialized: 5 keys, threshold 3 (Shamir)
        Vault unsealed and ready
        KV v2 secrets engine: secret/trading/*
        Kubernetes auth backend configured
        Dynamic DB credential rotation (1-hour leases)
        Per-service Vault policies (minimum required access only)
        PKI secrets engine for internal TLS
        All platform secrets seeded from .env (then .env values cleared)
    Keycloak 24.x (identity provider)
        Realm: trading-platform
        Roles: system, trader, risk-admin, ops, readonly, audit
        MFA required for trader + risk-admin roles
        Service accounts configured for all platform services
        Token TTL: 15 min access, 1 hour refresh
    Istio 1.21 (service mesh, mTLS)
        istiod deployed
        PeerAuthentication STRICT on all trading namespaces
        mTLS certificate authority: Vault PKI
        Envoy sidecar on every trading pod (automatic injection)
    Kong API Gateway 3.7 (external API control)
        JWT validation plugin (Keycloak tokens)
        Rate limiting plugin (per client, per endpoint)
        Request ID plugin (trace injection)
        CORS plugin
    cert-manager 1.14.4 (TLS automation)
        ClusterIssuer: selfsigned (dev) → Let's Encrypt (staging/prod)
    Image signing policy (Cosign, activated in Stage 21)
    Falco runtime security rules deployed (monitoring only in dev)
    RBAC Pod Security Admission: baseline in dev, restricted in prod

    SCRIPTS
    infrastructure/phases/stage-06-security/setup.sh
        → calls components/vault/install.sh
        → calls components/vault/configure.sh   (Vault init + unseal + seeding)
        → calls components/keycloak/install.sh
        → calls components/keycloak/configure.sh (realm + roles + clients via REST API)
        → calls components/istio/install.sh
        → calls components/kong/install.sh
        → calls components/cert-manager/install.sh (if not already in Stage 5)

    components/vault/configure.sh (critical detail)
        Detects if already initialized
        If not: vault operator init -format=json > /root/.vault-init-DATE.json
        Unseals with keys 1, 2, 3
        Prints: SAVE /root/.vault-init-DATE.json TO OFFLINE STORAGE NOW
        Enables KV v2, Kubernetes auth
        Applies all policies from components/vault/policies/
        Seeds all secrets from .env values
        Configures Kubernetes auth backend with cluster CA

    components/keycloak/configure.sh
        Waits for Keycloak health endpoint
        Gets admin token via REST API
        POSTs realm.json to /admin/realms
        Creates all roles and service account clients via API
        No manual Keycloak UI interaction required

    infrastructure/phases/stage-06-security/validate.sh
        vault status → Initialized=true, Sealed=false
        vault kv get secret/trading/db → fields present
        vault kv get secret/trading/alerting → fields present
        keycloak /health/ready → healthy
        keycloak realm trading-platform exists (via API)
        istiod pod Running
        PeerAuthentication STRICT applied to all trading namespaces
        kong pod Running
        cert-manager pods Running

    GATE
    validate.sh exits 0
    Vault unsealed, secrets accessible
    Keycloak realm configured with all roles
    Vault init file saved (human confirms by entering: VAULT-SAVED)

    OUTPUT
    Zero-trust platform security layer.
    No secret is hardcoded anywhere. All services authenticate before accessing anything.

    TIME
    40-50 minutes

STAGE 7 — EVENT BACKBONE FOUNDATION
    PURPOSE
    Build the authoritative event system.
    Kafka is the single source of truth. All state derives from it.
    This stage is not complete until every topic, schema, and
    governance rule is in place and validated.

    INCLUDES
    Apache Kafka 3.7 (KRaft mode, no ZooKeeper)
        1 controller + 1 broker (dev) → 3+3 (production, Stage 23)
        PVC: /var/lib/kafka/data (Longhorn, 20Gi)
        log.dirs validated: NOT /tmp
        PLAINTEXT auth (dev) → SASL_SSL (Stage 21)
    Confluent Schema Registry 7.6 / (runtime is: Apicurio Registry, its acceptable)
        All 7 Avro schemas registered at startup
        Compatibility: BACKWARD (enforced — no exceptions)
        Subjects: signal_v1, trade_intent_v1, execution_intent_v1,
                execution_order_v1, fill_v1, kill_switch_v1, audit_event_v1
    Kafka UI 0.7 (operational visibility)
    All 23 Kafka topics created with correct configuration:
        Partition count: 3 (dev) → 6 (production)
        Replication factor: 1 (dev) → 3 (production)
        Retention: 7 days (trading streams)
        Retention: permanent / -1 (audit_stream — never deleted)
        Partitions: 1 (kill_switch_stream — strict global ordering)
    ACL configuration per service account
    Dead-letter architecture: dead_letter_stream with structured failure envelope
    Retry architecture: retry_stream with backoff metadata
    Consumer group naming convention: <service>-<purpose>-cg
    Partition key convention: account_id + order_id

    SCRIPTS
    infrastructure/phases/stage-07-event-backbone/setup.sh
        → components/kafka/install.sh
        → components/schema-registry/install.sh
        → components/kafka/topics.sh         (creates all 23 topics)
        → components/kafka/register-schemas.sh (POSTs .avsc files to Schema Registry)
        → components/kafka/acl.sh            (sets ACLs per service account)
        → components/kafka/tools/kafka-ui/install.sh

    components/kafka/topics.sh
        Loops over topic definition file (topics.yaml)
        For each topic: kafka-topics.sh --create --if-not-exists
        Applies per-topic configuration overrides
        Verifies each topic exists after creation

    components/kafka/register-schemas.sh
        Reads each .avsc from schemas/ directory
        POSTs to Schema Registry /subjects/<name>/versions
        Validates response: {"id": <schema_id>}
        Fails if any schema fails to register

    infrastructure/phases/stage-07-event-backbone/validate.sh
        All 23 topics exist with correct partition count
        All 7 schemas registered in Schema Registry
        Schema compatibility = BACKWARD on all subjects
        audit_stream retention.ms = -1
        kill_switch_stream partitions = 1
        Producer test: write to test topic
        Consumer test: read from test topic
        Verify message matches (no corruption)
        kafka-broker-0 PVC → Bound, log.dirs = /var/lib/kafka/data

    GATE
    validate.sh exits 0
    All 23 topics, 7 schemas, ACLs in place
    End-to-end producer → consumer test passes

    OUTPUT
    Deterministic event backbone.
    All downstream services have a governed event system to publish to and consume from.

    TIME
    20-25 minutes

STAGE 8 — STORAGE FOUNDATION
    PURPOSE
    Build authoritative state persistence systems.
    Three distinct stores with three distinct roles.
    No data model ambiguity. No authority conflicts.

    AUTHORITY RULES (enforced by architecture, not convention):
        Kafka        → single source of truth (event log)
        PostgreSQL   → materialized state derived from Kafka
        TimescaleDB  → time-series data (ticks, indicators, fills history)
        Redis        → cache only, derived, never authoritative
        No service writes to PostgreSQL without going through Kafka first

    INCLUDES
    PostgreSQL 15 + PgBouncer (state + business data)
        PVC: 20Gi Longhorn
        Database: coredb
        All 10 migration files applied in order:
        001_accounts, 002_account_groups, 003_orders, 004_positions,
        005_portfolio_snapshots, 006_strategy_versions, 007_config_snapshots,
        008_reconciliation_log, 009_audit_log, 010_operation_modes
        All financial columns: BIGINT (enforced — no FLOAT, no NUMERIC)
        All timestamp columns: BIGINT epoch nanoseconds
        audit_log: INSERT only, no UPDATE, no DELETE (trigger-enforced)
        Credentials: fetched from Vault, never hardcoded
    TimescaleDB 2.14-pg15 (time-series data)
        PVC: 50Gi Longhorn
        Database: marketdb
        Extension: timescaledb (validated after install)
        All 7 hypertables created:
        ticks, ohlcv_1m, ohlcv_5m, ohlcv_1h, signals, fills, features
        Retention policies applied: ticks=90d, features=7d, ohlcv=permanent
        All price columns: BIGINT (fixed-point)
    Redis 7.2 (cache only)
        PVC: 5Gi Longhorn (AOF for cache recovery)
        Auth: enabled, password from Vault
        Key namespaces defined and documented
    Backup framework: daily pg_dump + continuous WAL archival configured

    SCRIPTS
    infrastructure/phases/stage-08-storage/setup.sh
        → components/postgres/install.sh
        → components/pgbouncer/install.sh
        → components/timescaledb/install.sh
        → components/redis/install.sh
        Waits for all databases ready before migrations
        → components/postgres/migrate.sh   (runs all 10 SQL files in order)
        → components/timescaledb/migrate.sh (runs all 7 SQL files in order)

    components/postgres/migrate.sh
        For each file in migrations/ (sorted by number):
        kubectl exec -i postgres-postgresql-0 -n storage -- psql -U postgres -d coredb < file.sql
        Checks exit code: non-zero = halt
        Final check: SELECT count(*) FROM information_schema.tables → expected count

    infrastructure/phases/stage-08-storage/validate.sh
        postgres pg_isready → accepting connections
        timescaledb pg_isready → accepting connections
        SELECT extname FROM pg_extension → timescaledb present
        Redis: SET test ok; GET test → ok
        All 10 PostgreSQL tables exist
        All 7 TimescaleDB hypertables exist
        retention policies applied: SELECT * FROM timescaledb_information.jobs
        All PVCs → Bound
        No FLOAT columns in any financial table (automated schema check)

    GATE
    validate.sh exits 0
    All migrations applied
    No float types in financial columns

    OUTPUT
    Persistent state layer.
    Three stores with no authority ambiguity. Ready for platform services.

    TIME
    25-30 minutes

STAGE 9 — OBSERVABILITY FOUNDATION
    PURPOSE
    Create operational visibility before platform complexity grows.
    You must be able to see the system before you build on it.
    Observability is not added after — it is foundational.

    INCLUDES
    Prometheus 2.51 + Alertmanager (metrics + alerting)
        Scrapes: all pods /metrics, Kafka JMX, PG exporter, TSDB exporter,
                Redis exporter, node-exporter, kube-state-metrics
        Retention: 30 days
        Alert rules (4 files, active from day one):
        trading-alerts.yaml:
            kill_switch_triggered         → CRITICAL, all channels, immediate
            reconciliation_mismatch       → CRITICAL
            daily_pnl below threshold     → CRITICAL
            broker_disconnect             → CRITICAL
        kafka-alerts.yaml:
            consumer_lag > 10000          → WARNING
            broker_down                   → CRITICAL
            ISR below minimum             → CRITICAL
        infra-alerts.yaml:
            pod_crashloop                 → WARNING
            disk_usage > 80%              → WARNING
            node memory critical          → CRITICAL
        db-alerts.yaml:
            db_replication_lag > 30s      → CRITICAL
            connection pool exhausted     → WARNING
        Alertmanager routes:
        CRITICAL → Telegram (immediate) + PagerDuty
        WARNING  → Telegram only
    Grafana 10.4 + 9 dashboards provisioned via API:
        platform-overview, trading-pipeline, portfolio-live,
        risk-dashboard, kafka-health, broker-connections,
        account-summary, reconciliation, infrastructure
    Loki 3.0 + Promtail DaemonSet (log aggregation)
        All pod stdout/stderr collected
        Retention: 30 days
        Required structured log fields enforced:
        service, trace_id, account_id, event_time, level, message
    Jaeger 1.56 + OpenTelemetry Collector (distributed tracing)
        Retention: 7 days
        Critical trace: signal_id → fill_id (full lineage in trace)
    ServiceMonitor objects: one per service (auto-discovery)

    SCRIPTS
    infrastructure/phases/stage-09-observability/setup.sh
        → components/prometheus/install.sh
        → components/grafana/install.sh
        → components/loki/install.sh
        → components/promtail/install.sh
        → components/jaeger/install.sh
        → components/otel-collector/install.sh
        Applies all alert rule files
        Imports all 9 dashboard JSONs via Grafana API
        Sends test alert → verifies Telegram delivery

    infrastructure/phases/stage-09-observability/validate.sh
        Prometheus: all scrape targets → Up (no failed targets)
        Grafana: all 9 dashboards accessible
        Grafana datasources: Prometheus, Loki, Tempo → all green
        Alertmanager: 9 alert rules loaded
        Test alert delivered to Telegram
        Loki: receiving logs from at least 3 pods
        Jaeger: UI accessible

    GATE
    validate.sh exits 0
    Test Telegram alert received

    OUTPUT
    Institutional observability platform.
    Every future service is visible from day one of deployment.

    TIME
    25-30 minutes

STAGE 10 — CI/CD FOUNDATION
    PURPOSE
    Enable deterministic automated deployment.
    No service is deployed manually after this stage.
    All deployments go through ArgoCD. All images go through Harbor.
    Git is the desired state. ArgoCD is the reconciler.

    INCLUDES
    Harbor 2.10 (private container registry)
        Project: core-system (private, scanning required)
        Trivy vulnerability scanning: enabled, block on CRITICAL CVEs
        Pull-through cache for upstream images
        Image immutability: push-once policy (no overwriting tags)
        No :latest tags allowed in Harbor core-system project
        Image signing configured (Cosign — activated in Stage 21)
    ArgoCD 2.10 (GitOps deployment engine)
        App-of-apps pattern
        Repository linked to GitHub repo (SSH key from Vault)
        Sync policies:
        dev:      auto-sync (immediate on Git push)
        staging:  auto-sync after CI passes all safety gates
        prod:     manual approval required (risk + engineering sign-off)
        Rollback: git revert → auto-sync on dev/staging
        Health checks: readiness probe must pass before traffic routes
        cicd/safety-gates/ applied in CI before any promotion
    GitHub Actions pipelines:
        build.yaml:    lint → unit tests → docker build → trivy scan → push to Harbor
        deploy.yaml:   update Helm values (image.tag = git-sha) → ArgoCD sync trigger
        rollback.yaml: revert image tag → immediate sync
    Deployment strategies available (not yet activated):
        cicd/strategies/canary/
        cicd/strategies/blue-green/
        cicd/strategies/rollback/auto-rollback.yaml
    Safety gates (cicd/compatibility/):
        schema_compatibility_check.py
        replay_equivalence_check.py
        lineage_integrity_check.py
        latency_regression_check.py
        deployment_risk_score.py

    SCRIPTS
    infrastructure/phases/stage-10-cicd/setup.sh
        → components/harbor/install.sh
        → components/harbor/configure.sh (project + scanning via API)
        → components/argocd/install.sh
        → components/argocd/configure.sh (repo link + app-of-apps)
        Configures Docker + containerd to trust Harbor registry
        Validates image push → pull cycle

    infrastructure/phases/stage-10-cicd/validate.sh
        Harbor UI → HTTP 200
        core-system project exists, scanning enabled
        Test: docker push image to Harbor → succeeds
        Test: docker pull image from Harbor → succeeds
        ArgoCD: app-of-apps → Synced
        ArgoCD server reachable

    GATE
    validate.sh exits 0
    Image push/pull cycle works
    ArgoCD app-of-apps synced

    OUTPUT
    Institutional deployment pipeline.
    Every future service deploys via ArgoCD. No manual kubectl apply for services.

    TIME
    25-30 minutes

STAGE 10A — TESTING FOUNDATION
    PURPOSE
    Build verification capability before platform complexity scales.
    Tests are written before the services they test wherever possible.
    This stage gives every future stage a testing contract.

    INCLUDES
    Integration test framework (pytest + async fixtures)
    Contract testing framework (Pact — consumer-driven contracts)
    Schema validation test suite (Avro schema conformance checks)
    Mock broker framework (tests/mock-services/mock-broker.py)
        Simulates: MT5, IB, Alpaca broker responses
        Configurable: fill latency, partial fills, rejections, disconnects
    Synthetic market data generator
        Generates deterministic tick streams for reproducible testing
        Configurable: instruments, volatility, gaps, outliers
    Performance benchmark tooling (latency measurement per pipeline stage)
    Latency budget tests (each stage has a defined SLA, tested in CI)
    Replay simulation framework (replay Kafka events deterministically)
    Determinism test harness (run same inputs twice, compare outputs bitwise)
    Chaos testing framework (tests/orchestration/chaos-tests/chaos-engine.py)
        Pod failure injection
        Network partition simulation
        Kafka broker failure simulation
        Database connection interruption
    Load testing (tests/orchestration/load-tests/k6-scenarios.js)
        Signal throughput test
        Order submission rate test
        Portfolio state read throughput test
    Test orchestration (tests/orchestration/test-runner.py)
        Dependency graph for test execution order
        Parallel execution where safe
        Results aggregation and reporting

    SCRIPTS
    scripts/testing/setup-test-env.sh
        Installs pytest, pact-python, k6 on the node
        Starts mock broker service in tests/ namespace
        Starts synthetic market data generator
        Generates test fixtures: tests/fixtures/sample-events.json

    scripts/testing/run-tests.sh --scope=<unit|integration|e2e|performance>
        Selects test scope from argument
        Runs appropriate test suite
        Outputs JUnit XML for CI consumption

    GATE
    Mock broker starts and returns synthetic fills
    Synthetic market generator produces valid tick events
    validate.sh: all test tooling installed and functional

    OUTPUT
    Continuous verification infrastructure.
    Every Stage 11+ service can be tested immediately upon deployment.

    TIME
    1 day

STAGE 11 — CORE PLATFORM FOUNDATION
    PURPOSE
    Build and deploy the universal platform runtime.
    These services govern all trading services.
    No trading service deploys before all core platform services are healthy.

    INCLUDES

    PLATFORM SDK (shared library, not per-service duplication)
        platform/sdk/ built as Python package
        Published to Harbor PyPI registry
        All services install: pip install trading-platform-sdk==${VERSION}
        SDK modules:
        sdk/event/client.py, interceptor.py, governance.py
        sdk/workflow/client.py
        sdk/config/client.py
        sdk/lineage/client.py
        sdk/flow_control/client.py
        sdk/resilience/client.py
        sdk/context/execution_context.py, trace_context.py
        sdk/bootstrap/validator.py

    PLATFORM SERVICES (deployed via Helm, Namespace: platform)
    Deploy in this exact order — each waits for prior /health/ready:

        01 config-service
        Source of all runtime configuration
        Reads from PostgreSQL config_snapshots table
        Serves configuration to all services via REST API

        02 config-snapshot-service
        Creates immutable versioned snapshots on every config change
        Stores in PostgreSQL, emits to audit_stream

        03 identity-service
        Generates SHA-256 hash chains for all entities
        Validates lineage chain at entry and exit points

        04 audit-service
        Append-only writer to audit_stream (Kafka)
        INSERT-only to audit_log (PostgreSQL)
        No update, no delete ever

        05 event-ingestion-service
        Single Kafka producer gateway for all services
        All events MUST publish through here (enforced by SDK)
        Applies: schema validation, lineage injection, deduplication

        06 event-validation-service
        Consumes events, validates schema + content
        Routes invalid events to dead_letter_stream
        Logs violation reasons

        07 event-ordering-service
        Global ordering coordinator for cross-topic events
        Works alongside Kafka partition ordering

        08 orchestration-service
        Pipeline stage routing
        Ensures correct sequence: signal → risk → order → fill

        09 portfolio-service   ← MUST be Running before Stage 12
        State authority for all accounts
        State(t) = f(EventLog[0→t])  — authoritative
        Snapshot = derived(State) — stored PostgreSQL

        10 snapshot-service
        Periodic portfolio state snapshots → PostgreSQL
        Consistency guard: matches replay output

        11 replay-engine-service
        Deterministic replay from Kafka event log
        Replay must produce identical portfolio state

        12 failure-handling-service
        DLQ consumer: processes dead_letter_stream
        Retry orchestration with exponential backoff

        13 alert-service
        Consumes alert_stream
        Routes to: Telegram + PagerDuty + Email
        Respects severity routing rules

    PLATFORM SUBSYSTEMS (deployed alongside services):
        platform/event-bus/gateway.py           (enforced ingress/egress boundary)
        platform/event-bus/ordering_coordinator.py
        platform/event-bus/ingress_rate_limiter.py
        platform/workflow-engine/ (state_machine + guard + saga_orchestrator)
        platform/lineage/ (hasher + tracker + trace_propagation)
        platform/flow-control/ (rate_limiter + lag_monitor + throttle_controller)
        platform/resilience/ (circuit_breaker + fallback_manager)
        platform/system/ (kill_switch_controller + health_aggregator)
        platform/system-registry/ (execution_context enforcement)
        platform/replay/ (replay_controller + snapshot_consistency_guard)

    SCRIPTS
    scripts/platform/build-sdk.sh
        Builds platform/sdk/ as Python wheel
        Pushes to Harbor PyPI registry
        Validates: pip install from Harbor succeeds

    infrastructure/phases/stage-11-platform-foundation/setup.sh
        For each platform service (in exact order above):
        helm upgrade --install <service> ./services/<service>/helm/ \
            -f values-dev.yaml -n platform --wait --timeout=90s
        Waits for /health/ready = 200 before next

    infrastructure/phases/stage-11-platform-foundation/validate.sh
        All 13 platform services → /health/ready = 200
        audit_stream → events flowing
        portfolio-service → can write + read portfolio state (API test)
        identity-service → generates correct SHA-256 hash (test vector)
        replay-engine → replay 100 events, state matches original

    GATE
    validate.sh exits 0
    All 13 services healthy
    portfolio-service state write/read verified

    OUTPUT
    Institutional platform runtime.
    Every trading service from Stage 12 onward is governed by this layer.

    TIME
    30-40 minutes

STAGE 12 — MARKET DATA FOUNDATION
    PURPOSE
    Establish trusted, deterministic market data ingestion, normalization,
    and storage. Data quality here determines signal quality everywhere.

    INCLUDES
    market-data-ingestion-service (namespace: market-data)
        Connector interface: BaseBrokerConnector
        Connectors: mt5, ib, ctrader, fix, alpaca, mock
        Stage 12: MOCK connector active (no real broker connection yet)
        Produces: raw_market_data_stream
        Validates: timestamp completeness, price sanity, sequence gaps
    market-data-normalizer-service
        Symbol normalization: XAUUSD → GOLD.FX (mapping from config-service)
        event_time stamping: exchange ts preferred, ingestion ts fallback
        Deduplication: same tick from multiple feeds merged
        Produces: normalized_market_data_stream
        Writes: TimescaleDB ticks hypertable
    historical-data-service
        Serves OHLCV + tick history via REST API
        Used by: strategy warm-up, backtesting, feature computation
        Source: TimescaleDB
    feature-store-service
        Computes live indicators from normalized_market_data_stream:
        ATR, RSI, BB, EMA, VWAP, ADX, DXY correlation
        Session state, volatility regime classification
        Publishes: feature_store_updates
        TTL on feature data: 7 days (retention policy in TimescaleDB)

    SCRIPTS
    infrastructure/phases/stage-12-market-data/setup.sh
        Deploys all 4 services in order
        Each waits for /health/ready
        Verifies mock data flowing

    infrastructure/phases/stage-12-market-data/validate.sh
        All 4 services → /health/ready = 200
        normalized_market_data_stream → events appearing (>1/sec with mock)
        feature_store_updates → indicator values appearing
        TimescaleDB ticks table → rows being inserted
        No float in any event field (governance check)
        event_time = int64 nanoseconds (governance check)

    GATE
    validate.sh exits 0
    Data flowing end-to-end: mock feed → Kafka → TimescaleDB

    OUTPUT
    Authoritative market data layer.
    All indicators computed from clean, validated, normalized data.

    TIME
    15-20 minutes

STAGE 12A — RESEARCH AND DATA GOVERNANCE FOUNDATION
    PURPOSE
    Create institutional quantitative research ecosystem.
    Strategies are not written directly in production code.
    They are researched, validated, and versioned through this layer first.

    INCLUDES
    Dataset catalog (what historical data exists, format, lineage)
    Feature versioning (each feature computation is versioned)
    Research notebooks environment (JupyterHub or equivalent)
        Connected to: TimescaleDB, feature store, historical data service
        Isolated namespace: research
        No write access to production databases
    Backtest datasets (curated, versioned tick + OHLCV datasets)
    Offline feature computation (batch feature generation from historical data)
    Dataset lineage (every backtest traceable to exact data version used)
    Research sandbox (isolated Kafka namespace for research event replay)
    ML experiment tracking (MLflow or DVC)
    Research validation pipeline:
        Backtest → paper trade → walk-forward test → staging → approval → production
    Research-to-production promotion gate:
        Research PR requires: backtest results, walk-forward results, risk review
        Strategy parameters locked at promotion time
        Parameter change = new version = new approval cycle

    SCRIPTS
    scripts/research/setup-research-env.sh
        Provisions research namespace
        Installs JupyterHub via Helm
        Configures read-only connection to TimescaleDB (research user)
        Installs MLflow tracking server
        Generates initial dataset catalog from TimescaleDB metadata

    GATE
    Research environment accessible
    Read connection to TimescaleDB verified (read-only user)
    Dataset catalog populated

    OUTPUT
    Controlled quantitative research platform.
    Strategies enter production through governed process, not ad hoc.

    TIME
    1-2 days

STAGE 13 — PORTFOLIO FOUNDATION
    PURPOSE
    Establish authoritative portfolio state.
    Portfolio service is the canonical source of positions, PnL, and exposure.
    All risk decisions depend on this state being correct.

    INCLUDES
    portfolio-service (deployed in Stage 11 — verification focus here)
        State(t) = f(EventLog[0→t]) — authoritative
        Snapshot = derived(State) — stored PostgreSQL
        Tracks per account, per strategy, per instrument:
        Open positions (qty, avg_entry, direction, open_time)
        Realized PnL (gross - fees - slippage, int64 only)
        Unrealized PnL (mark-to-market from live bid/ask cache)
        Daily PnL (running accumulation from midnight UTC)
        Exposure (notional per instrument, per currency, total USD)
        Drawdown (current, peak equity, peak date, max pct)
        Margin usage (used / available / total)
        Capital allocation (per strategy, per account group)
    exposure-service
        Real-time cross-account exposure aggregation
        Cross-instrument correlation tracking
        Alerts when correlation limits approached
    capital-partition-service
        Capital isolation per account and strategy group
        No capital bleeds between partitions
        Capital allocation changes require governance approval

    SCRIPTS
    infrastructure/phases/stage-13-portfolio/setup.sh
        Deploys: exposure-service, capital-partition-service
        (portfolio-service already deployed in Stage 11)
        Seeds: initial account balances from config-service
        Seeds: initial capital allocations from config-service

    infrastructure/phases/stage-13-portfolio/validate.sh
        portfolio-service: query all accounts → returns structured state
        exposure-service: query exposure → returns 0 (no positions yet)
        capital-partition-service: query partitions → matches seeded config
        Simulate: 3 synthetic fills → verify portfolio state updates correctly
        Replay: same 3 fills → verify identical state (determinism check)

    GATE
    validate.sh exits 0
    Synthetic fill → portfolio update cycle working
    Replay produces identical state

    OUTPUT
    Authoritative portfolio state layer.
    Risk engine in Stage 15 has a reliable source of truth to enforce against.

    TIME
    15 minutes

STAGE 14 — TRADING LOGIC FOUNDATION
    PURPOSE
    Generate deterministic trading decisions from market data.
    Paper mode only. No execution connected.
    Stage completes when signals flow end-to-end from market data to trade intent.

    INCLUDES
    instrument-screening-service (namespace: strategy)
        Screens full instrument universe per configured cycle
        Scoring model: liquidity + volatility + trend + momentum + session + correlation
        Emits: top-N instruments to instrument_screened topic
        Frequency: configurable per strategy type
    instrument-monitoring-service
        Per-screened-instrument: continuous entry/exit timing analysis
        States: READY_FOR_ENTRY / IN_TRADE / APPROACHING_EXIT / NO_TRADE / BLOCKED
        Entry: session open, no news buffer, multi-timeframe alignment
        Exit: TP proximity, trailing stop, time stop, counter-signal
        Emits: instrument_monitor_events
    strategy-engine-service
        Pluggable strategy modules (each independent):
        gold_timing_strategy.py
        forex_momentum_strategy.py
        mean_reversion_strategy.py
        stock_momentum_strategy.py
        Each consumes: instrument_monitor_events (READY_FOR_ENTRY only)
        Each emits: Signal_v1 (if conditions met)
        Signal identity: SHA-256 hash of (instrument + direction + strength + event_time + strategy_id)
    signal-processor-service
        Signal validation (TTL, duplicate check, schema)
        Signal lifecycle management
        Emits: validated signals to signal_events
    decision-engine-service
        Multi-signal aggregation (conflict resolution)
        Priority enforcement (from config, immutable at runtime)
        Trade intent formation
        Emits: TradeIntent_v1 to decision_events

    SCRIPTS
    infrastructure/phases/stage-14-trading-logic/setup.sh
        Deploys all 5 services in order
        Each: wait for /health/ready before next

    infrastructure/phases/stage-14-trading-logic/validate.sh
        All 5 services → /health/ready = 200
        instrument_screened → top-N appearing per cycle
        instrument_monitor_events → state changes appearing
        signal_events → at least 1 signal per 5 minutes (mock data)
        decision_events → TradeIntent events appearing
        Signal hash validation: SHA-256 of 5 random signals = expected ✔
        No float in any signal field ✔
        event_time propagated correctly (not system clock) ✔

    GATE
    validate.sh exits 0
    Signal → TradeIntent flow verified

    OUTPUT
    Trading intelligence layer.
    Deterministic signal generation with verified lineage from market data.

    TIME
    15-20 minutes

STAGE 15 — EXECUTION FOUNDATION
    PURPOSE
    Convert trading intent into executable orders.
    All risk controls, position sizing, and routing logic deployed.
    Still paper mode — no real broker connection yet.

    INCLUDES
    execution-intent-service
        TradeIntent → ExecutionIntent (schema normalization, zero logic mutation)
        Attaches: execution_type, account_routing_key, lineage_hash extension
        Classifies: origin_type = CORE or EXTERNAL
    account-routing-service
        Multi-account dispatch per ExecutionIntent
        Operation mode enforcement per account:
        PAPER / LIVE_SEMI / LIVE_AUTO / DISABLED / BACKTEST
        Emits: one per_account_intent per eligible account
    risk-engine-service
        Enforcement hierarchy: Firm → Portfolio → Strategy → Trade
        Pre-trade checks (all from config-service, no hardcoded values):
        max_risk_per_trade_pct, max_daily_loss_pct, max_drawdown_pct,
        max_open_positions, max_position_per_instrument,
        max_margin_utilization_pct, instrument_whitelist,
        EXTERNAL origin → stricter thresholds
        Kill switch: daily_loss > threshold → HALT_ALL on affected accounts
        Emits: risk_approved or risk_rejected per intent
    policy-engine-service
        Rate limits (orders/sec per instrument)
        Session validity (no trading outside allowed windows)
        Anti-gaming and wash trade detection
        Broker-specific policy rules
        Emits: policy_approved or policy_rejected
    position-sizer-service
        ATR-based volatility-adjusted lot sizing
        Formula: size = (equity × risk_pct) / (stop_pips × pip_value)
        All calculations: int64 fixed-point (no floats)
        Applies: broker min/max lot constraints, account group scaling
    order-engine-service
        Constructs ExecutionOrder from sized intent
        Order identity: SHA-256(execution_intent_id + risk_hash + policy_hash)
        Preserves: trade_intent_id (never regenerated)
        Order lifecycle state machine: NEW → VALIDATED → SUBMITTED → ACK → FILLED

    SCRIPTS
    infrastructure/phases/stage-15-execution/setup.sh
        Deploys in strict order (risk-engine MUST be ready before order-engine)
        Waits for each /health/ready before next

    infrastructure/phases/stage-15-execution/validate.sh
        All 6 services → /health/ready = 200
        execution_intent_stream → events flowing
        per_account_intent_stream → per-account dispatch working
        risk_approved_stream → events flowing
        Risk rejection test: submit intent breaching daily_loss limit
        → risk_rejected event emitted ✔ (not approved)
        policy_decision_stream → events flowing
        execution_order_stream → orders constructed
        Order hash: SHA-256 verified on 5 random orders ✔

    GATE
    validate.sh exits 0
    Risk rejection test passes
    Order lineage chain verified

    OUTPUT
    Institutional execution layer.
    Every order is risk-checked, policy-checked, sized, and identified
    before leaving the platform toward a broker.

    TIME
    20-25 minutes

STAGE 16 — BROKER CONNECTIVITY FOUNDATION
    PURPOSE
    Connect the platform to external brokers/exchanges.
    This stage deploys the connectivity layer in MOCK mode first.
    Real connections activated in Stage 20.

    INCLUDES
    smart-order-router (namespace: execution)
        Multi-broker routing with intelligent selection:
        Spread comparison, latency history, fill quality, margin availability
        Failover: automatic to secondary on broker health failure
        Account-broker binding enforced (per config)
    OMS — Order Management System (namespace: trading-infra)
        Order state machine: tracks lifecycle of all live orders
        Transport only: does NOT create IDs (inherits from order-engine)
        Session: heartbeat, reconnect, sequence recovery
        Protocol: FIX 4.4 / REST / WebSocket
    EMS — Execution Management System (namespace: trading-infra)
        Direct broker connectivity
        Connectors: BaseBrokerConnector interface
        mt5_connector.py, ib_connector.py, ctrader_connector.py,
        fix_connector.py, alpaca_connector.py, mock_connector.py
    broker-adapter-service (namespace: trading-infra)
        Connector factory + health monitoring
        MOCK_MODE=true in dev/staging (activated from values-dev.yaml)
        Simulates fills with configurable latency and partial fill rate
    fill-handler-service
        Receives fills from broker (via EMS)
        Links fill to: order_id → trade_intent_id → signal_id
        Extends lineage hash chain with fill_id
        Emits: fill_stream
    reconciliation-service
        Broker statement vs internal order state comparison
        Real-time: on each fill
        Batch: every 5 minutes
        Mismatch: halt new orders on affected account + alert
        Emits: reconciliation_stream
    copy-trade-engine
        Master → follower order scaling
        Proportional sizing: follower_lot = master_lot × (follower_equity / master_equity)
        Parallel dispatch (asyncio.gather): target < 50ms master fill → all followers
        Each follower: independent risk check before copy

    SCRIPTS
    infrastructure/phases/stage-16-broker-connectivity/setup.sh
        Deploys all in order (SOR before OMS, OMS before EMS, EMS before broker-adapter)
        Sets MOCK_MODE=true in broker-adapter Helm values

    infrastructure/phases/stage-16-broker-connectivity/validate.sh
        All 7 services → /health/ready = 200
        broker_dispatch_stream → events flowing to mock connector
        fill_stream → mock fills appearing
        reconciliation_stream → reconciliation passing (no mismatches)
        portfolio_update_stream → portfolio state updating on mock fills
        Fill lineage: fill_lineage_hash traces back to signal_id ✔
        Copy trade: master mock fill → follower accounts receive scaled orders ✔

    GATE
    validate.sh exits 0
    End-to-end: signal → risk → order → mock fill → portfolio update ✔
    Lineage hash unbroken through full chain ✔

    OUTPUT
    External execution connectivity layer.
    Platform can send and receive orders. Currently: mock broker only.

    TIME
    20-25 minutes

STAGE 17 — PAPER TRADING VALIDATION
    PURPOSE
    Prove deterministic end-to-end correctness before any real money.
    This is a mandatory gate, not a recommendation.
    ALL tests must pass. No exceptions. No partial credit.

    VALIDATIONS (8 mandatory tests, all must exit 0)

    TEST 1 — DETERMINISM
    Script: tests/test_determinism.sh
    Method: Run 1 hour of paper trading. Record full Kafka event log.
            Replay identical events through replay-engine-service.
    Assert: portfolio_state(replay) == portfolio_state(live) bitwise identical
    Pass condition: zero deviation | Fail: any difference

    TEST 2 — LINEAGE INTEGRITY
    Script: tests/test_lineage.py
    Method: Take 20 random fills from fill_stream.
            For each fill: trace fill_lineage_hash → order → risk → signal → tick
    Assert: SHA-256 chain unbroken at every step
    Pass condition: 20/20 chain intact | Fail: any break

    TEST 3 — FIXED-POINT ENFORCEMENT
    Script: tests/test_fixed_point.py
    Method: Inspect 200 random Kafka events from all topics
    Assert: no float type in any financial field
    Assert: all prices and sizes are int64
    Pass condition: 0 floats detected | Fail: any float found

    TEST 4 — KILL SWITCH LATENCY
    Script: tests/test_kill_switch.sh
    Method: Emit {action:HALT_ALL} to kill_switch_stream
            Measure: time from emit to last order flow event
    Assert: full halt < 1000ms
    Pass condition: measured time < 1000ms | Fail: >= 1000ms
    Cleanup: emit resume, verify system resumes

    TEST 5 — RISK ENFORCEMENT
    Script: tests/test_risk_enforcement.py
    Method: Submit 10 intents each breaching a different risk limit
            (max_daily_loss, max_drawdown, max_position_size,
            max_margin, instrument_blacklist, EXTERNAL stricter threshold, etc.)
    Assert: all 10 result in risk_rejected event (not risk_approved)
    Pass condition: 10/10 rejected | Fail: any approved

    TEST 6 — RECONCILIATION DETECTION
    Script: tests/test_reconciliation.sh
    Method: Inject artificial position mismatch (broker state != internal state)
    Assert: reconciliation_mismatch alert appears in alert_stream within 30 seconds
    Pass condition: alert received < 30s | Fail: no alert or > 30s
    Cleanup: correct mismatch, verify clean reconciliation

    TEST 7 — COPY TRADE CORRECTNESS
    Script: tests/test_copy_trade.py
    Method: Execute master trade → observe all follower accounts
    Assert: follower_lot = master_lot × (follower_equity / master_equity) ✔
    Assert: all follower orders carry parent trade_intent_id ✔
    Assert: master fill → all follower submissions < 50ms ✔
    Pass condition: all 3 assertions true | Fail: any assertion fails

    TEST 8 — EVENT-TIME GOVERNANCE
    Script: tests/test_event_time.py
    Method: Inspect 200 random events from all trading topics
    Assert: all event_times are int64 epoch nanoseconds
    Assert: no event_time derived from system clock
    Assert: event_times within 100ms of corresponding exchange timestamps
    Pass condition: 0 violations | Fail: any violation

    SCRIPTS
    infrastructure/phases/stage-17-validation-gate/validate.sh
        Runs all 8 tests sequentially
        Prints PASS or FAIL for each with details
        Exits 0 only when ALL 8 pass
        On failure: prints GATE BLOCKED — TEST: <name> — REASON: <detail>

    GATE
    All 8 tests exit 0
    Recorded in install.state: STAGE_17_GATE=PASSED with timestamp

    OUTPUT
    Validated paper-trading platform.
    Provable correctness documented in install.state and audit log.

    TIME
    2-4 hours (includes paper trading observation period)

STAGE 18 — UI AND OPERATIONAL CONTROL
    PURPOSE
    Provide operational visibility and human control layer.
    Operators need to see live state, approve LIVE_SEMI trades,
    activate kill switches, and manage strategies.

    INCLUDES
    trading-dashboard-frontend (React.js, namespace: platform)
        Components: Portfolio, Positions, RiskMonitor, StrategyPanel,
                    AccountSummary, KillSwitch
        Real-time: WebSocket connection to portfolio-service
        TradingView charts for price visualization
        Live PnL, exposure, drawdown visualization
    Operations console (within dashboard)
        Strategy management (enable/disable per account)
        Operation mode control (PAPER → LIVE_SEMI requires risk-admin role)
        Risk limit viewing (read-only for trader role)
        Risk limit editing (risk-admin role + audit log entry)
        Manual order approval queue (LIVE_SEMI mode)
        Reconciliation status view
    Kill switch interface
        One-click halt for any account, strategy, or all
        Deactivation requires risk-admin role + reason
        All activations visible in dashboard with timestamp + activating user
    Workflow automation (n8n, namespace: n8n)
        Pre-trading daily checklist automation
        Post-trading reconciliation automation
        Alert routing workflows
        Strategy lifecycle event automation
    Alert channels active:
        Telegram bot: all CRITICAL alerts, immediate
        PagerDuty: CRITICAL only, on-call escalation
        Email: CRITICAL + WARNING, backup channel

    SCRIPTS
    infrastructure/phases/stage-18-ui-operations/setup.sh
        Deploys trading-dashboard-frontend via Helm
        Configures Ingress route: /dashboard → frontend
        Deploys n8n via Helm
        Configures n8n workflows via API from scripts/

    infrastructure/phases/stage-18-ui-operations/validate.sh
        Dashboard → HTTP 200
        Portfolio data visible in dashboard (non-zero accounts)
        Kill switch button present and functional (tested on paper account)
        n8n → accessible and workflows imported
        Test alert: Telegram message received

    GATE
    validate.sh exits 0
    Dashboard accessible
    Kill switch functional (tested on paper account)

    OUTPUT
    Operational management platform.
    Human operators can observe and control the entire platform.

    TIME
    20 minutes

STAGE 19 — REPLAY AND RECOVERY VALIDATION
    PURPOSE
    Prove institutional resiliency before activating live money.
    If the system cannot recover deterministically, it is not production-ready.

    VALIDATIONS

    RECOVERY TEST 1 — KAFKA REPLAY
    Method: Delete all materialized state (PostgreSQL + Redis)
            Run replay-engine from Kafka offset 0
    Assert: Final state after replay == state before delete (bitwise identical)
    Pass: identical | Fail: any difference

    RECOVERY TEST 2 — DISASTER RECOVERY (CLUSTER REBUILD)
    Method: Snapshot cluster state with Velero
            Destroy all Kubernetes workloads
            Restore from Velero backup
            Run replay-engine to catch up event log
    Assert: Platform operational within defined RTO
    RTO Target: < 30 minutes from cluster loss
    Pass: RTO met, all services healthy | Fail: RTO exceeded or services unhealthy

    RECOVERY TEST 3 — DATABASE RESTORE
    Method: Stop PostgreSQL, restore from pg_dump backup
            Start PostgreSQL with restored data
            Reconcile against Kafka log (replay from last snapshot)
    Assert: Zero data loss after restore
    Assert: State matches Kafka log
    RPO Target: < 1 minute (WAL continuous archiving)

    RECOVERY TEST 4 — BROKER RECONNECT
    Method: Kill EMS pod (simulates broker disconnect)
            Measure: time to automatic reconnect and order resumption
    Assert: Reconnect < 10 seconds
    Assert: No orders lost during reconnect (held in OMS state)

    RECOVERY TEST 5 — DEAD-LETTER RECOVERY
    Method: Introduce deliberately malformed events into dead_letter_stream
            Run failure-handling-service recovery procedure
    Assert: All recoverable events reprocessed correctly
    Assert: Unrecoverable events flagged for human review

    RECOVERY TEST 6 — FAILOVER VALIDATION
    Method: Scale broker-adapter-service to 0 replicas (simulates primary failure)
            Verify: smart-order-router switches to secondary broker config
    Assert: Failover < 10 seconds
    Assert: Zero orders lost

    SCRIPTS
    infrastructure/phases/stage-19-recovery-validation/validate.sh
        Runs all 6 recovery tests
        Each test: setup → execute → assert → cleanup
        Exits 0 only when all 6 pass

    GATE
    All 6 recovery tests pass
    Recorded in install.state: STAGE_19_GATE=PASSED

    OUTPUT
    Institutional recovery certification.
    The platform can lose a node, lose a database, lose a broker connection,
    and recover to correct state deterministically.

    TIME
    4-6 hours (tests require time for state accumulation and rebuild)

STAGE 20 — LIVE TRADING ACTIVATION
    PURPOSE
    Controlled real-money activation. Single broker. Single account.
    Small capital. Single strategy. Strict limits. Manual supervision.
    This is not a deploy — this is a controlled activation under observation.

    PRE-CONDITIONS (all checked by script, activation refused if any fail)
    ✔ Stage 17 gate: ALL 8 TESTS PASSED (verified in install.state)
    ✔ Stage 19 gate: ALL 6 RECOVERY TESTS PASSED (verified in install.state)
    ✔ Dashboard: accessible, kill switch tested functional
    ✔ Telegram alerts: confirmed working (test alert in last 24h)
    ✔ Broker demo account: tested in Stage 12-16 with mock connector
    ✔ All accounts: still in PAPER mode (validated by config-service)
    ✔ Risk limits: reviewed and confirmed by risk-admin
    ✔ Capital allocated for first live account: confirmed in config-service

    ACTIVATION FLOW

    STEP 1 — BROKER CREDENTIAL ONBOARDING
    Script: scripts/platform/onboard-broker.sh --broker=mt5

        Store broker credentials in Vault (prompted securely)
        vault kv put secret/trading/broker/mt5 SERVER=... LOGIN=... PASSWORD=...
        Update broker-adapter-service: MOCK_MODE=false, BROKER=mt5
        Restart broker-adapter-service, wait for /health/ready
        Verify: EMS heartbeat log shows connected to broker
        Verify: Live price ticks appearing in raw_market_data_stream
        Test: One synthetic order through live connector (no real execution, probe only)

    STEP 2 — LIVE_SEMI ACTIVATION (first)
    Script: scripts/platform/enable-live-semi.sh --account=ACC_001

        Re-runs Stage 17 tests (all 8 must still pass on current codebase)
        Prompts: "Type CONFIRM-LIVE-SEMI-ACC_001 to activate LIVE_SEMI:"
        On exact match:
        POST /api/v1/accounts/ACC_001/mode {"mode": "LIVE_SEMI"}
        Authenticated: risk-admin JWT token required
        Audit log entry created in audit_stream
        Dashboard: shows ACC_001 in LIVE_SEMI mode

    STEP 3 — 48-HOUR LIVE_SEMI OBSERVATION
        Human monitors dashboard for 48 hours
        Each trade: system submits → human approves/rejects via dashboard
        Checkpoints:
        Zero reconciliation mismatches in 48h
        Zero kill switch activations in 48h
        Broker connection uptime > 99% in 48h
        All fills reconciling correctly
        PnL tracking correctly in portfolio-service

    STEP 4 — LIVE_AUTO ACTIVATION (after 48h stable LIVE_SEMI)
    Script: scripts/platform/enable-live-auto.sh --account=ACC_001

        Checks all 48h stability conditions (from audit_stream + reconciliation_stream)
        Re-runs all 8 Stage 17 validation tests
        Checks install.state: STAGE_17_GATE=PASSED, STAGE_19_GATE=PASSED
        Prompts: "Type CONFIRM-LIVE-AUTO-ACC_001 to activate LIVE_AUTO:"
        On exact match:
        POST /api/v1/accounts/ACC_001/mode {"mode": "LIVE_AUTO", "reason": "48h stable"}
        Audit log entry created
        Grafana annotation: LIVE_AUTO enabled on ACC_001

    SCALING (after first account stable for 1 week)
        Add second account → same activation flow
        Add second strategy → same research → staging → approval flow
        Increase position sizes gradually (config-service change, risk-admin approval)
        Add additional brokers one at a time

    GATE
    Both manual confirmations entered
    Mode changes confirmed in audit_stream
    Broker connected, ticks flowing

    OUTPUT
    Controlled live trading.
    Real automated trading on first account, one strategy, small capital.

    TIME
    30 minutes activation + 48 hours LIVE_SEMI observation

STAGE 21 — PRODUCTION HARDENING
    PURPOSE
    Achieve production-grade operational maturity.
    Everything that was "good enough for development" gets replaced
    with production standards.

    INCLUDES
    Image tag enforcement: all :latest replaced with git-sha tags
        Script scans all Helm values, fails if any :latest remains
    Vault dynamic secret rotation activated (DB credentials every 1 hour)
    SASL_SSL enabled on Kafka (replaces PLAINTEXT)
        All service Kafka configs updated to use SASL credentials from Vault
    WireGuard VPN activated for admin access
        SSH access restricted to VPN tunnel only
        Kubernetes API (6443) restricted to VPN tunnel only
        Public ports: 80, 443, 51820 (WireGuard) only
    Velero cluster backup activated
        Daily backup: 02:00 UTC → S3/Wasabi
        PVC backups included
        Weekly restore test scheduled
    WAL archiving for PostgreSQL + TimescaleDB → S3
    Container security hardening:
        All containers: non-root (runAsNonRoot=true)
        All containers: read-only root filesystem (readOnlyRootFilesystem=true)
        No privileged containers, no hostNetwork
    Pod Security Admission: restricted profile on trading namespaces
    Falco runtime security: monitoring mode → enforcement mode
    Image signing with Cosign (all Harbor pushes signed, verified on pull)
    Autoscaling (HPA) configured and tested for high-throughput services
    Resource tuning: CPU + memory requests/limits validated under load
    Latency optimization: P99 targets validated for each pipeline stage
    SLO definitions and SLI measurements activated
    Chaos engineering: scheduled monthly chaos test runs

    SCRIPTS
    scripts/platform/harden-production.sh
        Runs all hardening steps in sequence
        Each step has its own validation check
        Exits non-zero if any hardening step fails
        Logs to .logs/harden-production-TIMESTAMP.log

    GATE
    All hardening steps complete
    No :latest tags anywhere in the system
    WireGuard VPN working, public SSH no longer accessible
    Velero backup job created and first backup completed
    All containers non-root + read-only filesystem

    OUTPUT
    Production-grade institutional platform.
    Security, reliability, and observability all at production standards.

    TIME
    2-4 hours

STAGE 22 — MULTI-NODE SCALEOUT
    PURPOSE
    Achieve institutional resilience and horizontal scalability.
    Single-node is a development topology — production requires distribution.

    INCLUDES
    Multi-node Kubernetes cluster
        3x control-plane nodes (etcd HA quorum)
        2x trading compute nodes
        2x data nodes (PostgreSQL + TimescaleDB)
        3x Kafka nodes
        2x infra nodes (observability + security)
    HA Kafka: 3 brokers + 3 controllers (KRaft quorum)
        Replication factor: 3 on all topics
        min.insync.replicas: 2
        Topic configs updated: partitions 3 → 6
    HA PostgreSQL: primary + 1 replica (streaming replication)
        Patroni or pg_auto_failover for automatic failover
        Failover target: < 120 seconds
    HA TimescaleDB: primary + 1 replica
    Redis Cluster: 3 nodes (HA, automatic failover)
    Cross-node workload scheduling (anti-affinity rules for critical services)
    Automatic failover for all critical services (PodDisruptionBudgets enforced)
    Regional redundancy: secondary site replication (if required)
    Terraform: multi-node environments defined in terraform/environments/production/

    SCRIPTS
    scripts/platform/scaleout-multi-node.sh
        Provisions additional nodes via Terraform
        Joins nodes to cluster (kubeadm join)
        Upgrades Kafka to 3 brokers + 3 controllers
        Upgrades PostgreSQL to primary + replica
        Re-applies all Helm values with production replication counts

    GATE
    All nodes in cluster and Ready
    Kafka: ISR = 3 on all topics
    PostgreSQL: replica streaming, lag < 1 second
    PodDisruptionBudgets: at least 2 replicas of each critical service

    OUTPUT
    Highly available distributed platform.
    Loss of any single node does not interrupt trading operations.

    TIME
    1-2 days

STAGE 23 — CO-LOCATION PREPARATION
    PURPOSE
    Prepare ultra-low-latency institutional deployment.
    Co-location is for capital scale where microseconds matter.
    Not required for initial live trading — triggered by scale and latency requirements.

    INCLUDES
    Equinix NY4 (US East) or LD4 (London) facility selection
        Based on: primary broker data center proximity
        Cross-connect to broker: direct fiber (no public internet)
    Dedicated hardware procurement (bare metal, not cloud):
        16+ cores, 128GB RAM, NVMe SSD, 10Gbps network
    Latency profiling: baseline measurement at each pipeline stage
    Kernel bypass networking for execution path (DPDK if required)
    Core affinity for latency-critical services
    NUMA topology awareness
    Regional deployment strategy:
        Primary: closest to primary broker DC
        Secondary: closest to secondary broker DC
        Active-active execution, passive-passive data replication
    Broker proximity optimization: direct market access (DMA)
    Cross-connect configuration with broker
    Co-location deployment strategy documented
    RTO for co-location failover defined and tested

    SCRIPTS
    scripts/platform/provision-colocation.sh
        Terraform targets co-location provider API
        Same K8s bootstrap scripts, bare-metal cloud-init targets
        Same Helm deploys, different hardware specs in values-prod.yaml

    GATE
    Latency benchmarks meet targets:
        Tick ingestion → signal generation: < 10ms P99
        Signal → order submission: < 50ms P99
        Order submission → broker ACK: < 5ms (co-location advantage)
    Cross-connect to broker verified

    OUTPUT
    Institutional low-latency execution platform.
    Physical proximity advantage + direct market access.

    TIME
    2-4 weeks (hardware procurement + facility setup)

SUMMARY — COMPLETE BUILD TIMELINE
    STAGE     NAME                              TIME ESTIMATE
    ────────────────────────────────────────────────────────────────────
    Stage 0   Engineering Foundation            1-2 days
    Stage 0A  Windows Host Preparation          30-60 min
    Stage 1   Machine Foundation               15-20 min
    Stage 2   Repository Foundation            30 min
    Stage 3   Platform Governance Foundation   1-2 days
    Stage 3A  Configuration Foundation         1 day
    Stage 4   Infrastructure Foundation        20 min
    Stage 5   Kubernetes Platform Foundation   20 min
    Stage 6   Security Foundation              40-50 min
    Stage 7   Event Backbone Foundation        20-25 min
    Stage 8   Storage Foundation               25-30 min
    Stage 9   Observability Foundation         25-30 min
    Stage 10  CI/CD Foundation                 25-30 min
    Stage 10A Testing Foundation               1 day
    Stage 11  Core Platform Foundation         30-40 min
    Stage 12  Market Data Foundation           15-20 min
    Stage 12A Research & Data Governance       1-2 days
    Stage 13  Portfolio Foundation             15 min
    Stage 14  Trading Logic Foundation         15-20 min
    Stage 15  Execution Foundation             20-25 min
    Stage 16  Broker Connectivity Foundation   20-25 min
    Stage 17  Paper Trading Validation         2-4 hours
    Stage 18  UI and Operational Control       20 min
    Stage 19  Replay and Recovery Validation   4-6 hours
    Stage 20  Live Trading Activation          30 min + 48h LIVE_SEMI
    Stage 21  Production Hardening             2-4 hours
    Stage 22  Multi-Node Scaleout              1-2 days
    Stage 23  Co-location Preparation          2-4 weeks

    ────────────────────────────────────────────────────────────────────
    TO PAPER TRADING VALIDATED:               ~1 week (Stages 0-17)
    TO FIRST LIVE TRADE:                      ~2 weeks + 48h observation
    TO FULL PRODUCTION:                       ~3-4 weeks
    TO CO-LOCATION:                           Scale-dependent
    ────────────────────────────────────────────────────────────────────

FINAL AUTHORITATIVE BUILD LAW
    FOUNDATION
    → PLATFORM GOVERNANCE
    → INFRASTRUCTURE SUBSTRATE
    → SECURITY LAYER
    → EVENT BACKBONE
    → STORAGE LAYER
    → OBSERVABILITY
    → CI/CD PIPELINE
    → TESTING FRAMEWORK
    → PLATFORM RUNTIME
    → MARKET DATA
    → PORTFOLIO STATE
    → TRADING LOGIC
    → EXECUTION PIPELINE
    → BROKER CONNECTIVITY
    → PAPER VALIDATION
    → RECOVERY VALIDATION
    → OPERATIONAL CONTROL
    → LIVE ACTIVATION
    → PRODUCTION HARDENING
    → DISTRIBUTION
    → CO-LOCATION

    This law governs everything:
    repositories      → structured before code is written
    infrastructure    → secured before workloads deploy
    services          → validated before they handle real orders
    capital           → activated gradually under manual supervision
    scale             → earned through stability, not assumed from start

    Deviation from this law at any stage creates technical debt that
    compounds at every subsequent stage and is most expensive to fix
    at the worst possible time — when real capital is at risk.
