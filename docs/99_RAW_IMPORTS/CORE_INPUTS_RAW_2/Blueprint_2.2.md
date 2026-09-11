🏗️ PRODUCTION-GRADE ARCHITECTURE
From Day One — No Compromises

INFRASTRUCTURE PHILOSOPHY
PRINCIPLE 1: Production-grade from commit #1
Every component chosen for scale, not convenience.
No "we'll replace this later" decisions.

PRINCIPLE 2: Everything is replaceable independently
Microservices with strict contracts.
Replace any component without touching others.

PRINCIPLE 3: Zero single points of failure
Every critical component has redundancy.
System survives any single server/service failure.

PRINCIPLE 4: Observability first
You cannot fix what you cannot see.
Logging, metrics, tracing built in from day one.

PRINCIPLE 5: Infrastructure as Code
Every server, config, deployment defined in code.
Reproducible in minutes from scratch.

COMPLETE PRODUCTION STACK
LAYER               PRODUCTION CHOICE          WHY
═══════════════════════════════════════════════════════════════

CONTAINER RUNTIME   Kubernetes (K8s)           Industry standard
                                               Self-healing
                                               Auto-scaling
                                               Zero-downtime deploy

K8s DISTRIBUTION    k3s (now, single node)     Production K8s
                    → EKS/GKE (scale, multi)   Lightweight
                                               Full K8s API

MESSAGE BUS         Apache Kafka + KRaft       No Zookeeper needed
                    (3 broker cluster)         Persistent messages
                                               Replay capability
                                               Millions msg/sec

SERVICE MESH        Istio                      mTLS between services
                                               Traffic management
                                               Observability

API GATEWAY         Kong                       Production API GW
                                               Rate limiting
                                               Auth, plugins
                                               Better than Nginx alone

TICK DATABASE       TimescaleDB                Purpose-built
                    (Primary + Replica)        Time-series
                                               Scales to TB

BUSINESS DB         PostgreSQL 15              ACID compliant
                    (Primary + 2 Replicas)     Mature, reliable
                    + PgBouncer (pooler)       Connection pooling

CACHE               Redis Cluster              HA Redis
                    (3 primary + 3 replica)    No single point fail
                                               Horizontal scaling

SEARCH/ANALYTICS    ClickHouse                 Columnar DB
                    (optional, add later)      Fastest analytics
                                               Used by trading firms

SECRET MANAGEMENT   HashiCorp Vault            Never hardcode secrets
                                               Dynamic credentials
                                               Audit trail

SERVICE DISCOVERY   Kubernetes native          Built into K8s
                    + Consul (external)        External services

CONFIG MANAGEMENT   Kubernetes ConfigMaps      K8s native
                    + Secrets                  Vault integration

CI/CD               GitHub Actions             Free, powerful
                    + ArgoCD                   GitOps deployment
                                               Auto-sync to K8s

CONTAINER REGISTRY  Harbor (self-hosted)       Private registry
                    or GHCR (GitHub)           Secure image storage

MONITORING          Prometheus + Grafana       Industry standard
                    + Alertmanager             Full metrics stack

LOGGING             Loki + Promtail            Grafana stack
                    + Grafana                  Log aggregation
                                               Cheaper than ELK

TRACING             Jaeger                     Distributed tracing
                                               Find bottlenecks
                                               Request flows

INGRESS             Nginx Ingress Controller   K8s native ingress
                    + Cert-Manager             Auto SSL/TLS

STORAGE             Longhorn (K8s)             Distributed storage
                    (now)                      K8s native
                    → Ceph (scale)             Enterprise storage

BACKUP              Velero                     K8s backup tool
                    + S3/Wasabi                Cluster snapshots
                                               Database backups

IaC TOOL            Terraform                  Provision servers
                    + Helm Charts              Deploy K8s apps
                    + Kustomize                Environment configs

VPN                 WireGuard                  Fastest VPN protocol
                                               Secure admin access

LANGUAGE            Python 3.11 (logic)        Best ecosystem
                    Go (high perf services)    10x Python speed
                    Rust (execution core)      Ultra-low latency

SERVER ARCHITECTURE
Starting Configuration (Production Minimum)
┌─────────────────────────────────────────────────────────────┐
│                    EQUINIX NY4 / LD4                        │
│                  (Co-location Facility)                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               KUBERNETES CLUSTER                    │   │
│  │                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │   MASTER 1  │  │  MASTER 2   │  │  MASTER 3  │  │   │
│  │  │  (Control   │  │  (Control   │  │ (Control   │  │   │
│  │  │   Plane)    │  │   Plane)    │  │  Plane)    │  │   │
│  │  │  4c/8GB     │  │  4c/8GB     │  │  4c/8GB   │  │   │
│  │  └─────────────┘  └─────────────┘  └────────────┘  │   │
│  │         HA Control Plane (etcd cluster)             │   │
│  │                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │  WORKER 1   │  │  WORKER 2   │  │  WORKER 3  │  │   │
│  │  │  (Trading   │  │  (Trading   │  │ (Data &    │  │   │
│  │  │  Services)  │  │  Services)  │  │  Storage)  │  │   │
│  │  │  16c/64GB   │  │  16c/64GB   │  │  16c/64GB  │  │   │
│  │  │  NVMe SSD   │  │  NVMe SSD   │  │  NVMe SSD  │  │   │
│  │  └─────────────┘  └─────────────┘  └────────────┘  │   │
│  │                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │  WORKER 4   │  │  WORKER 5   │                  │   │
│  │  │  (Kafka +   │  │  (Monitor + │                  │   │
│  │  │   Infra)    │  │   Logging)  │                  │   │
│  │  │  16c/32GB   │  │  8c/32GB    │                  │   │
│  │  │  NVMe SSD   │  │  SSD        │                  │   │
│  │  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

FAILOVER CLUSTER (Equinix LD4 London):
Same architecture — replication lag < 50ms
Auto-failover if primary cluster unreachable
Node Roles & Workloads
yaml# Node labels define what runs where

# WORKER 1 & 2: Trading Services
node-role: trading
workloads:
  - strategy-engine
  - order-manager
  - risk-engine
  - broker-connector
  - account-manager
  - signal-aggregator
resources:
  cpu: 16 cores
  ram: 64GB
  storage: 500GB NVMe
  network: 10Gbps dedicated

# WORKER 3: Data Services
node-role: data
workloads:
  - data-service
  - portfolio-tracker
  - timescaledb-primary
  - postgresql-primary
  - redis-cluster-nodes
resources:
  cpu: 16 cores
  ram: 64GB
  storage: 2TB NVMe (tick data)
  network: 10Gbps

# WORKER 4: Kafka Cluster
node-role: kafka
workloads:
  - kafka-broker-1
  - kafka-broker-2
  - kafka-broker-3
  - schema-registry
  - kafka-ui
resources:
  cpu: 16 cores
  ram: 32GB
  storage: 1TB NVMe (message log)
  network: 10Gbps

# WORKER 5: Observability
node-role: monitoring
workloads:
  - prometheus
  - grafana
  - loki
  - jaeger
  - alertmanager
  - api-gateway (Kong)
  - vault
resources:
  cpu: 8 cores
  ram: 32GB
  storage: 500GB SSD

KUBERNETES PRODUCTION SETUP
Directory Structure
infrastructure/
├── terraform/
│   ├── main.tf                 # Server provisioning
│   ├── variables.tf
│   ├── outputs.tf
│   └── modules/
│       ├── k8s-cluster/
│       ├── networking/
│       └── storage/
│
├── kubernetes/
│   ├── namespaces/
│   │   ├── trading.yaml
│   │   ├── data.yaml
│   │   ├── kafka.yaml
│   │   ├── monitoring.yaml
│   │   └── infra.yaml
│   │
│   ├── helm-values/
│   │   ├── kafka-values.yaml
│   │   ├── timescaledb-values.yaml
│   │   ├── postgresql-values.yaml
│   │   ├── redis-values.yaml
│   │   ├── prometheus-values.yaml
│   │   ├── grafana-values.yaml
│   │   ├── kong-values.yaml
│   │   └── vault-values.yaml
│   │
│   ├── apps/
│   │   ├── data-service/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   ├── hpa.yaml
│   │   │   └── configmap.yaml
│   │   ├── strategy-engine/
│   │   ├── order-manager/
│   │   ├── risk-engine/
│   │   ├── account-manager/
│   │   ├── broker-connector/
│   │   ├── portfolio-tracker/
│   │   ├── alert-service/
│   │   └── api-gateway/
│   │
│   └── argocd/
│       ├── app-of-apps.yaml
│       └── applications/
│
└── scripts/
    ├── bootstrap-cluster.sh
    ├── install-dependencies.sh
    └── setup-secrets.sh

Namespace Strategy
yaml# Every component lives in its own namespace
# Provides isolation, RBAC, and network policies

# infrastructure/kubernetes/namespaces/trading.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: trading
  labels:
    environment: production
    team: trading
---
apiVersion: v1
kind: Namespace
metadata:
  name: data-layer
  labels:
    environment: production
    team: data
---
apiVersion: v1
kind: Namespace
metadata:
  name: kafka
  labels:
    environment: production
---
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
  labels:
    environment: production
---
apiVersion: v1
kind: Namespace
metadata:
  name: infra
  labels:
    environment: production
---
apiVersion: v1
kind: Namespace
metadata:
  name: argocd
  labels:
    environment: production

Production Deployment Template
yaml# infrastructure/kubernetes/apps/strategy-engine/deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: strategy-engine
  namespace: trading
  labels:
    app: strategy-engine
    version: "1.0.0"
    component: strategy
spec:
  replicas: 2                    # Always 2 minimum for HA
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0          # Zero downtime deploys
      maxSurge: 1
  selector:
    matchLabels:
      app: strategy-engine
  template:
    metadata:
      labels:
        app: strategy-engine
        version: "1.0.0"
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      # Always run on trading nodes
      nodeSelector:
        node-role: trading

      # Spread across different nodes
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - strategy-engine
            topologyKey: kubernetes.io/hostname

      # Graceful shutdown — finish current signal
      terminationGracePeriodSeconds: 30

      containers:
      - name: strategy-engine
        image: yourregistry/strategy-engine:1.0.0
        imagePullPolicy: Always

        ports:
        - containerPort: 8080
          name: http
        - containerPort: 9090
          name: metrics

        # Resource guarantees
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"

        # Health checks
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 3

        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
          failureThreshold: 2

        # Startup probe (gives time to connect to Kafka)
        startupProbe:
          httpGet:
            path: /health/startup
            port: 8080
          failureThreshold: 30
          periodSeconds: 10

        # Environment from ConfigMap and Secrets
        envFrom:
        - configMapRef:
            name: strategy-engine-config
        - secretRef:
            name: strategy-engine-secrets

        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace

        # Structured logging to stdout
        # Promtail picks up and ships to Loki
        volumeMounts:
        - name: config-volume
          mountPath: /app/config
          readOnly: true

      volumes:
      - name: config-volume
        configMap:
          name: strategy-engine-config

---
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: strategy-engine-hpa
  namespace: trading
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: strategy-engine
  minReplicas: 2
  maxReplicas: 20              # Scale up to 20 pods
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

---
# Pod Disruption Budget — ensure HA during K8s updates
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: strategy-engine-pdb
  namespace: trading
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: strategy-engine

KAFKA PRODUCTION SETUP
Architecture
KAFKA CLUSTER DESIGN:

3 Kafka Brokers (KRaft mode — no Zookeeper):
├── kafka-0  (Worker Node 4)
├── kafka-1  (Worker Node 4)
└── kafka-2  (Worker Node 4)

Replication Factor: 3
Min In-Sync Replicas: 2
(Data survives loss of 1 broker)

Schema Registry: 1 instance
  → Enforces message schemas
  → Prevents bad data entering topics

Kafka UI: 1 instance
  → Visual topic management
  → Message inspection
  → Consumer group monitoring
Topic Design
yaml# COMPLETE TOPIC ARCHITECTURE

# ─── MARKET DATA TOPICS ──────────────────────────────
topic: market.ticks.{symbol}
  partitions: 3
  replication: 3
  retention: 7 days
  cleanup: delete
  message: {time, symbol, broker, bid, ask, volume}
  producers: broker-connector
  consumers: data-service, strategy-engine

topic: market.bars.{symbol}.{timeframe}
  partitions: 3
  replication: 3
  retention: 30 days
  message: {time, symbol, open, high, low, close, vol}
  producers: data-service
  consumers: strategy-engine, portfolio-tracker

topic: market.orderbook.{symbol}
  partitions: 3
  replication: 3
  retention: 1 hour       # Short retention, high frequency
  message: {time, symbol, bids[], asks[]}
  producers: broker-connector
  consumers: strategy-engine (for liquidity analysis)

# ─── SIGNAL TOPICS ───────────────────────────────────
topic: signals.generated
  partitions: 6
  replication: 3
  retention: 24 hours
  message: {signal_id, strategy_id, symbol, side,
            confidence, entry, sl, tp, timestamp}
  producers: strategy-engine
  consumers: order-manager

topic: signals.rejected
  partitions: 3
  replication: 3
  retention: 7 days
  message: {signal_id, reason, timestamp}
  producers: order-manager, risk-engine
  consumers: monitoring, alert-service

# ─── ORDER TOPICS ────────────────────────────────────
topic: orders.created
  partitions: 6
  replication: 3
  retention: 90 days      # Keep for audit
  compaction: false
  message: {order_id, account_id, symbol, side,
            quantity, type, strategy_id, timestamp}
  producers: order-manager
  consumers: risk-engine, broker-connector,
             portfolio-tracker

topic: orders.submitted
  partitions: 6
  replication: 3
  retention: 90 days
  message: {order_id, broker_order_id, timestamp}
  producers: broker-connector
  consumers: order-manager, portfolio-tracker

topic: orders.filled
  partitions: 6
  replication: 3
  retention: 90 days
  message: {order_id, fill_price, quantity,
            slippage, commission, timestamp}
  producers: broker-connector
  consumers: order-manager, portfolio-tracker,
             account-manager, alert-service

topic: orders.rejected
  partitions: 3
  replication: 3
  retention: 90 days
  message: {order_id, reason, timestamp}
  producers: broker-connector, risk-engine
  consumers: order-manager, alert-service

topic: orders.cancelled
  partitions: 3
  replication: 3
  retention: 90 days
  message: {order_id, reason, timestamp}

# ─── RISK TOPICS ─────────────────────────────────────
topic: risk.checks
  partitions: 6
  replication: 3
  retention: 24 hours
  message: {request_id, order_id, account_id,
            checks_requested, timestamp}
  producers: order-manager
  consumers: risk-engine

topic: risk.decisions
  partitions: 6
  replication: 3
  retention: 7 days
  message: {request_id, decision, reason, timestamp}
  producers: risk-engine
  consumers: order-manager

topic: risk.alerts
  partitions: 3
  replication: 3
  retention: 30 days
  message: {account_id, alert_type, rule,
            current_value, limit, timestamp}
  producers: risk-engine
  consumers: alert-service, monitoring

topic: risk.kill_switch
  partitions: 3
  replication: 3
  retention: 30 days
  message: {account_id, reason, action, timestamp}
  producers: risk-engine
  consumers: order-manager, broker-connector,
             alert-service

# ─── ACCOUNT TOPICS ──────────────────────────────────
topic: accounts.updated
  partitions: 3
  replication: 3
  retention: 30 days
  message: {account_id, balance, equity,
            margin_used, timestamp}
  producers: broker-connector, account-manager
  consumers: risk-engine, portfolio-tracker,
             account-manager

topic: positions.opened
  partitions: 6
  replication: 3
  retention: 90 days
  message: {position_id, account_id, symbol,
            side, quantity, entry_price, timestamp}
  producers: order-manager
  consumers: portfolio-tracker, risk-engine,
             alert-service

topic: positions.closed
  partitions: 6
  replication: 3
  retention: 90 days
  message: {position_id, exit_price, pnl,
            commission, duration_seconds, timestamp}
  producers: order-manager
  consumers: portfolio-tracker, alert-service

# ─── SYSTEM TOPICS ───────────────────────────────────
topic: system.health
  partitions: 3
  replication: 3
  retention: 7 days
  message: {service, status, metrics, timestamp}
  producers: all services
  consumers: monitoring

topic: system.audit
  partitions: 3
  replication: 3
  retention: 365 days    # 1 year for compliance
  cleanup: none          # Never delete
  message: {user, action, resource, before,
            after, timestamp}
  producers: all services
  consumers: audit-store (PostgreSQL)
Kafka Helm Values
yaml# infrastructure/kubernetes/helm-values/kafka-values.yaml

kafka:
  replicaCount: 3

  kraft:
    enabled: true           # No Zookeeper

  controller:
    replicaCount: 3

  persistence:
    enabled: true
    size: 200Gi
    storageClass: fast-ssd

  resources:
    requests:
      memory: 4Gi
      cpu: 2000m
    limits:
      memory: 8Gi
      cpu: 4000m

  config:
    # Performance tuning
    num.network.threads: 8
    num.io.threads: 16
    socket.send.buffer.bytes: 102400
    socket.receive.buffer.bytes: 102400
    socket.request.max.bytes: 104857600

    # Log retention
    log.retention.hours: 168      # 7 days default
    log.segment.bytes: 1073741824 # 1GB segments
    log.retention.check.interval.ms: 300000

    # Replication
    default.replication.factor: 3
    min.insync.replicas: 2

    # Performance
    num.partitions: 6
    compression.type: lz4         # Fast compression

  # Schema Registry
  schemaRegistry:
    enabled: true
    replicaCount: 2

  # Kafka UI
  kafkaui:
    enabled: true
    ingress:
      enabled: true
      host: kafka-ui.internal.yourdomain.com

DATABASE PRODUCTION SETUP
TimescaleDB HA
yaml# infrastructure/kubernetes/helm-values/timescaledb-values.yaml

replicaCount: 3           # 1 primary + 2 replicas
patroni:                  # HA with automatic failover
  enabled: true

postgresql:
  parameters:
    max_connections: 200
    shared_buffers: 8GB
    effective_cache_size: 24GB
    maintenance_work_mem: 2GB
    checkpoint_completion_target: 0.9
    wal_buffers: 64MB
    default_statistics_target: 100
    random_page_cost: 1.1    # SSD optimized
    work_mem: 64MB
    huge_pages: try
    wal_level: replica
    max_wal_senders: 10

    # TimescaleDB specific
    timescaledb.max_background_workers: 16
    timescaledb.telemetry_level: off

persistence:
  enabled: true
  size: 1Ti               # 1TB, expand as needed
  storageClass: fast-nvme

resources:
  requests:
    memory: 16Gi
    cpu: 4000m
  limits:
    memory: 32Gi
    cpu: 8000m

backup:
  enabled: true
  schedule: "0 2 * * *"  # Daily at 2am
  destination: s3://your-bucket/timescaledb
PostgreSQL HA
yaml# infrastructure/kubernetes/helm-values/postgresql-values.yaml
# Using CloudNativePG operator

apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: postgresql-prod
  namespace: data-layer
spec:
  instances: 3            # 1 primary + 2 replicas

  postgresql:
    parameters:
      max_connections: "500"
      shared_buffers: "4GB"
      effective_cache_size: "12GB"
      maintenance_work_mem: "1GB"
      work_mem: "32MB"
      wal_level: "replica"
      max_wal_senders: "10"
      hot_standby: "on"

  storage:
    size: 500Gi
    storageClass: fast-nvme

  resources:
    requests:
      memory: 8Gi
      cpu: 2000m
    limits:
      memory: 16Gi
      cpu: 4000m

  backup:
    retentionPolicy: "30d"
    barmanObjectStore:
      destinationPath: s3://your-bucket/postgresql
      s3Credentials:
        accessKeyId:
          name: backup-creds
          key: ACCESS_KEY
        secretAccessKey:
          name: backup-creds
          key: SECRET_KEY

  monitoring:
    enablePodMonitor: true

---
# PgBouncer — connection pooler
# Sits in front of PostgreSQL
# Services connect to PgBouncer, not Postgres directly
# Handles 10,000+ connections with 100 actual DB connections

apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbouncer
  namespace: data-layer
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: pgbouncer
        image: bitnami/pgbouncer:latest
        env:
        - name: POSTGRESQL_HOST
          value: postgresql-prod-rw
        - name: PGBOUNCER_POOL_MODE
          value: transaction          # Best for microservices
        - name: PGBOUNCER_MAX_CLIENT_CONN
          value: "10000"
        - name: PGBOUNCER_DEFAULT_POOL_SIZE
          value: "100"
        resources:
          requests:
            memory: 256Mi
            cpu: 250m
          limits:
            memory: 512Mi
            cpu: 500m
Redis Cluster HA
yaml# infrastructure/kubernetes/helm-values/redis-values.yaml

architecture: replication
auth:
  enabled: true
  password: "from-vault"

master:
  replicaCount: 1
  resources:
    requests:
      memory: 2Gi
      cpu: 500m
    limits:
      memory: 4Gi
      cpu: 1000m
  persistence:
    enabled: true
    size: 20Gi
    storageClass: fast-ssd

replica:
  replicaCount: 2
  resources:
    requests:
      memory: 2Gi
      cpu: 500m
    limits:
      memory: 4Gi
      cpu: 1000m
  persistence:
    enabled: true
    size: 20Gi

sentinel:
  enabled: true           # Auto-failover via Sentinel
  quorum: 2

metrics:
  enabled: true           # Prometheus metrics
  serviceMonitor:
    enabled: true

SECRET MANAGEMENT (HashiCorp Vault)
yaml# ALL secrets stored in Vault — never in K8s secrets
# Services get dynamic short-lived credentials

# Vault setup:
vault/
├── secret/trading/
│   ├── data-service/
│   │   ├── timescaledb_password
│   │   ├── kafka_password
│   │   └── redis_password
│   │
│   ├── strategy-engine/
│   │   ├── kafka_password
│   │   └── api_keys
│   │
│   ├── order-manager/
│   │   ├── kafka_password
│   │   ├── postgresql_password
│   │   └── broker_api_keys
│   │
│   └── broker-connectors/
│       ├── mt5_password
│       ├── ib_password
│       ├── ctrader_client_secret
│       └── fix_api_keys
│
└── database/
    ├── roles/
    │   ├── data-service      (SELECT, INSERT on ticks)
    │   ├── order-manager     (ALL on orders, positions)
    │   └── risk-engine       (SELECT on all, INSERT on risk_events)
    └── dynamic credentials   (rotate every 1 hour)

# Vault Agent Injector
# Automatically injects secrets into pods as files
# No secrets ever in environment variables
# No secrets ever in ConfigMaps

# Pod annotation to get secrets injected:
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/agent-inject-secret-db: "database/creds/order-manager"
  vault.hashicorp.com/role: "order-manager"

OBSERVABILITY STACK
Prometheus + Grafana + Loki + Jaeger
yaml# METRICS: Prometheus

# Every service exposes /metrics endpoint
# Prometheus scrapes every 15 seconds

# Custom trading metrics every service exposes:
trading_tick_processing_duration_ms    # How fast ticks processed
trading_signal_generation_total        # Signals per strategy
trading_order_placement_duration_ms    # Order latency
trading_order_fill_rate                # Fill success %
trading_slippage_pips                  # Slippage tracking
trading_active_positions               # Open positions count
trading_daily_pnl_usd                 # Real-time P&L
trading_risk_checks_total             # Risk checks passed/failed
trading_broker_latency_ms             # Per-broker latency
trading_kafka_consumer_lag            # Message processing lag

# ALERTING: Alertmanager rules

groups:
- name: trading-critical
  rules:

  - alert: KillSwitchTriggered
    expr: trading_kill_switch_active == 1
    severity: critical
    annotations:
      summary: "Kill switch triggered on {{ $labels.account }}"
    receivers: [pagerduty, telegram, sms]

  - alert: OrderManagerDown
    expr: up{job="order-manager"} == 0
    for: 30s
    severity: critical
    receivers: [pagerduty, telegram, sms]

  - alert: HighOrderLatency
    expr: trading_order_placement_duration_ms > 500
    for: 2m
    severity: warning
    receivers: [telegram]

  - alert: BrokerDisconnected
    expr: trading_broker_connected == 0
    for: 1m
    severity: critical
    receivers: [pagerduty, telegram, sms]

  - alert: KafkaConsumerLag
    expr: trading_kafka_consumer_lag > 1000
    for: 5m
    severity: warning
    receivers: [telegram]

  - alert: DatabaseReplicationLag
    expr: pg_replication_lag_seconds > 30
    for: 2m
    severity: warning
    receivers: [telegram]

  - alert: DailyLossWarning
    expr: trading_daily_pnl_pct < -0.03
    severity: warning
    annotations:
      summary: "Daily loss at {{ $value }}% on {{ $labels.account }}"
    receivers: [telegram]

# LOGGING: Loki + Promtail

# Structured JSON logs from every service:
{
  "timestamp": "2026-05-01T09:01:23.456Z",
  "level": "INFO",
  "service": "order-manager",
  "pod": "order-manager-7d4f9b-xk2j",
  "trace_id": "abc123def456",
  "span_id": "789xyz",
  "event": "order_placed",
  "order_id": "uuid-here",
  "account_id": "uuid-here",
  "symbol": "XAUUSD",
  "side": "BUY",
  "quantity": 0.5,
  "broker": "MT5",
  "latency_ms": 45
}

# Grafana dashboards pull from both
# Prometheus (metrics) and Loki (logs)
# in the same panel — click metric spike,
# see the exact logs at that moment

# TRACING: Jaeger
# Every request gets a trace_id
# Follow a signal from tick → signal → order → fill
# across all services in one trace view

CI/CD PIPELINE
GitHub Actions + ArgoCD (GitOps)
yaml# .github/workflows/deploy.yaml

name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Run unit tests
      run: |
        pip install -r requirements.txt
        pytest tests/unit/ -v --cov=.

    - name: Run integration tests
      run: |
        docker-compose -f docker-compose.test.yml up -d
        pytest tests/integration/ -v
        docker-compose down

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - name: Scan for vulnerabilities
      uses: snyk/actions/python@master

    - name: Scan Docker image
      uses: aquasecurity/trivy-action@master

  build:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    steps:
    - name: Build Docker image
      run: |
        docker build -t ghcr.io/yourorg/strategy-engine:${{ github.sha }} .
        docker push ghcr.io/yourorg/strategy-engine:${{ github.sha }}

    - name: Update K8s manifest
      run: |
        # Update image tag in deployment.yaml
        sed -i "s|image:.*|image: ghcr.io/yourorg/strategy-engine:${{ github.sha }}|" \
          infrastructure/kubernetes/apps/strategy-engine/deployment.yaml

        # Commit back to repo
        git commit -am "Deploy strategy-engine:${{ github.sha }}"
        git push

# ArgoCD watches the repo
# Detects the commit
# Automatically syncs to Kubernetes cluster
# Zero manual kubectl apply ever

# ArgoCD Application definition:
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: trading-platform
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourorg/trading-platform
    targetRevision: main
    path: infrastructure/kubernetes/apps
  destination:
    server: https://kubernetes.default.svc
    namespace: trading
  syncPolicy:
    automated:
      prune: true          # Remove deleted resources
      selfHeal: true       # Fix manual changes
    syncOptions:
    - CreateNamespace=true

NETWORK SECURITY
yaml# Network Policies — services can only talk
# to services they need to

# Order Manager can only reach:
# - Risk Engine (for checks)
# - Kafka (for events)
# - PostgreSQL (for storage)
# - Broker Connector (for orders)
# Nothing else — period.

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: order-manager-policy
  namespace: trading
spec:
  podSelector:
    matchLabels:
      app: order-manager
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-gateway
    - podSelector:
        matchLabels:
          app: strategy-engine
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: risk-engine
    ports:
    - port: 8080
  - to:
    - namespaceSelector:
        matchLabels:
          name: kafka
    ports:
    - port: 9092
  - to:
    - namespaceSelector:
        matchLabels:
          name: data-layer
    ports:
    - port: 5432   # PostgreSQL via PgBouncer

PRODUCTION BOOTSTRAP SEQUENCE
bash#!/bin/bash
# infrastructure/scripts/bootstrap-cluster.sh
# Run this once on fresh servers

# STEP 1: Install k3s (production K8s)
curl -sfL https://get.k3s.io | \
  INSTALL_K3S_EXEC="server \
    --cluster-init \
    --disable traefik \
    --disable servicelb \
    --write-kubeconfig-mode 644" \
  sh -

# STEP 2: Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# STEP 3: Install ArgoCD
kubectl create namespace argocd
helm install argocd argo/argo-cd \
  --namespace argocd \
  --values infrastructure/kubernetes/helm-values/argocd-values.yaml

# STEP 4: Install Vault
helm install vault hashicorp/vault \
  --namespace infra \
  --values infrastructure/kubernetes/helm-values/vault-values.yaml

# STEP 5: Bootstrap Vault (run once)
kubectl exec vault-0 -- vault operator init
# Save unseal keys and root token securely

# STEP 6: Install cert-manager (auto SSL)
helm install cert-manager jetstack/cert-manager \
  --namespace infra \
  --set installCRDs=true

# STEP 7: Install Nginx Ingress
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace infra

# STEP 8: Point ArgoCD to your repo
# From here, ArgoCD deploys EVERYTHING else
# Kafka, databases, Redis, all services
# All defined as code in your repo
# ArgoCD syncs automatically

echo "Cluster ready. ArgoCD URL: https://argocd.internal.yourdomain.com"
echo "Now push your kubernetes manifests to the repo"
echo "ArgoCD will deploy everything automatically"

FINAL PRODUCTION SUMMARY
WHAT YOU GET FROM DAY ONE:

✅ Kubernetes — self-healing, zero-downtime deploys
✅ Kafka — persistent, replayable, millions msg/sec
✅ TimescaleDB HA — 3-node, auto-failover
✅ PostgreSQL HA — 3-node, auto-failover + PgBouncer
✅ Redis HA — Sentinel auto-failover
✅ Vault — zero hardcoded secrets anywhere
✅ Prometheus — full metrics from every service
✅ Grafana — dashboards + alerting
✅ Loki — centralized structured logging
✅ Jaeger — distributed request tracing
✅ ArgoCD — GitOps, auto-deploy on git push
✅ GitHub Actions — test + build pipeline
✅ Network Policies — services isolated by default
✅ HPA — auto-scale on CPU/memory/custom metrics
✅ PDB — guaranteed availability during K8s upgrades
✅ Cert-Manager — automatic SSL certificates
✅ Longhorn — distributed persistent storage

SCALING PATH (no rebuilds, only additions):
├── Add worker nodes → K8s schedules more pods
├── Add Kafka partitions → more parallel consumers
├── Add DB read replicas → more query throughput
├── Add Redis nodes → more cache capacity
├── Add broker connectors → new broker.yaml file
├── Add strategies → new strategy Python file
└── Add accounts → new account in database

TOTAL MONTHLY COST:
Start (3 workers):    $2,000–4,000/month
Scale (10 workers):   $8,000–15,000/month
Full institutional:   $20,000–50,000/month
