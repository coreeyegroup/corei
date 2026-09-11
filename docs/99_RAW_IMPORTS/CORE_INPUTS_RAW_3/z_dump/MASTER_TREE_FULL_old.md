trading-platform/
│
├── README.md
├── Makefile
├── VERSION
├── .env.example
├── .gitignore
│
│
├── .github/
│   └── workflows/
│       ├── build.yaml
│       ├── deploy.yaml
│       └── rollback.yaml
│
│
├── cicd/
│   ├── policies/
│   │   ├── deployment-policy.yaml
│   │   ├── rollback-policy.yaml
│   │   └── promotion-policy.yaml
│   └── argocd/
│       ├── app-of-apps.yaml
│       ├── mapping.yaml
│       ├── dev/
│       │   ├── market-data-ingestion-service.yaml
│       │   ├── market-data-normalizer-service.yaml
│       │   ├── historical-data-service.yaml
│       │   ├── feature-store-service.yaml
│       │   ├── instrument-screening-service.yaml
│       │   ├── instrument-monitoring-service.yaml
│       │   ├── strategy-engine-service.yaml
│       │   ├── signal-processor-service.yaml
│       │   ├── decision-engine-service.yaml
│       │   ├── constraint-engine-service.yaml
│       │   ├── event-ingestion-service.yaml
│       │   ├── event-validation-service.yaml
│       │   ├── event-ordering-service.yaml
│       │   ├── identity-service.yaml
│       │   ├── orchestration-service.yaml
│       │   ├── state-update-service.yaml
│       │   ├── snapshot-service.yaml
│       │   ├── replay-engine-service.yaml
│       │   ├── execution-intent-service.yaml
│       │   ├── account-routing-service.yaml
│       │   ├── risk-engine-service.yaml
│       │   ├── policy-engine-service.yaml
│       │   ├── position-sizer-service.yaml
│       │   ├── order-engine-service.yaml
│       │   ├── smart-order-router.yaml
│       │   ├── oms-service.yaml
│       │   ├── ems-service.yaml
│       │   ├── broker-adapter-service.yaml
│       │   ├── fill-handler-service.yaml
│       │   ├── reconciliation-service.yaml
│       │   ├── copy-trade-engine.yaml
│       │   ├── portfolio-service.yaml
│       │   ├── exposure-service.yaml
│       │   ├── capital-partition-service.yaml
│       │   ├── backtest-engine-service.yaml
│       │   ├── api-gateway-service.yaml
│       │   ├── config-service.yaml
│       │   ├── config-snapshot-service.yaml
│       │   ├── audit-service.yaml
│       │   ├── alert-service.yaml
│       │   ├── failure-handling-service.yaml
│       │   └── trading-dashboard-frontend.yaml
│       ├── staging/
│       │   ├── market-data-ingestion-service.yaml
│       │   ├── market-data-normalizer-service.yaml
│       │   ├── historical-data-service.yaml
│       │   ├── feature-store-service.yaml
│       │   ├── instrument-screening-service.yaml
│       │   ├── instrument-monitoring-service.yaml
│       │   ├── strategy-engine-service.yaml
│       │   ├── signal-processor-service.yaml
│       │   ├── decision-engine-service.yaml
│       │   ├── constraint-engine-service.yaml
│       │   ├── event-ingestion-service.yaml
│       │   ├── event-validation-service.yaml
│       │   ├── event-ordering-service.yaml
│       │   ├── identity-service.yaml
│       │   ├── orchestration-service.yaml
│       │   ├── state-update-service.yaml
│       │   ├── snapshot-service.yaml
│       │   ├── replay-engine-service.yaml
│       │   ├── execution-intent-service.yaml
│       │   ├── account-routing-service.yaml
│       │   ├── risk-engine-service.yaml
│       │   ├── policy-engine-service.yaml
│       │   ├── position-sizer-service.yaml
│       │   ├── order-engine-service.yaml
│       │   ├── smart-order-router.yaml
│       │   ├── oms-service.yaml
│       │   ├── ems-service.yaml
│       │   ├── broker-adapter-service.yaml
│       │   ├── fill-handler-service.yaml
│       │   ├── reconciliation-service.yaml
│       │   ├── copy-trade-engine.yaml
│       │   ├── portfolio-service.yaml
│       │   ├── exposure-service.yaml
│       │   ├── capital-partition-service.yaml
│       │   ├── backtest-engine-service.yaml
│       │   ├── api-gateway-service.yaml
│       │   ├── config-service.yaml
│       │   ├── config-snapshot-service.yaml
│       │   ├── audit-service.yaml
│       │   ├── alert-service.yaml
│       │   ├── failure-handling-service.yaml
│       │   └── trading-dashboard-frontend.yaml
│       └── prod/
│           ├── market-data-ingestion-service.yaml
│           ├── market-data-normalizer-service.yaml
│           ├── historical-data-service.yaml
│           ├── feature-store-service.yaml
│           ├── instrument-screening-service.yaml
│           ├── instrument-monitoring-service.yaml
│           ├── strategy-engine-service.yaml
│           ├── signal-processor-service.yaml
│           ├── decision-engine-service.yaml
│           ├── constraint-engine-service.yaml
│           ├── event-ingestion-service.yaml
│           ├── event-validation-service.yaml
│           ├── event-ordering-service.yaml
│           ├── identity-service.yaml
│           ├── orchestration-service.yaml
│           ├── state-update-service.yaml
│           ├── snapshot-service.yaml
│           ├── replay-engine-service.yaml
│           ├── execution-intent-service.yaml
│           ├── account-routing-service.yaml
│           ├── risk-engine-service.yaml
│           ├── policy-engine-service.yaml
│           ├── position-sizer-service.yaml
│           ├── order-engine-service.yaml
│           ├── smart-order-router.yaml
│           ├── oms-service.yaml
│           ├── ems-service.yaml
│           ├── broker-adapter-service.yaml
│           ├── fill-handler-service.yaml
│           ├── reconciliation-service.yaml
│           ├── copy-trade-engine.yaml
│           ├── portfolio-service.yaml
│           ├── exposure-service.yaml
│           ├── capital-partition-service.yaml
│           ├── backtest-engine-service.yaml
│           ├── api-gateway-service.yaml
│           ├── config-service.yaml
│           ├── config-snapshot-service.yaml
│           ├── audit-service.yaml
│           ├── alert-service.yaml
│           ├── failure-handling-service.yaml
│           └── trading-dashboard-frontend.yaml
│
│
├── schemas/
│   ├── versioning-policy.md
│   ├── registry/
│   │   └── schema-registry.yaml
│   ├── compatibility/
│   │   └── compatibility-tests.md
│   ├── signal_v1.avsc
│   ├── trade_intent_v1.avsc
│   ├── execution_intent_v1.avsc
│   ├── execution_order_v1.avsc
│   ├── fill_v1.avsc
│   ├── kill_switch_v1.avsc
│   └── audit_event_v1.avsc
│
│
├── infrastructure/
│   │
│   ├── config/
│   │   ├── global.env
│   │   ├── versions.env
│   │   └── secrets.example.env
│   │
│   ├── state/
│   │   └── install.state
│   │
│   ├── scripts/
│   │   ├── lib/
│   │   │   ├── env.sh
│   │   │   ├── log.sh
│   │   │   ├── retry.sh
│   │   │   ├── helm.sh
│   │   │   ├── k8s.sh
│   │   │   ├── state.sh
│   │   │   └── validate.sh
│   │   ├── master/
│   │   │   └── install-all.sh
│   │   ├── verify/
│   │   │   └── cluster-health.sh
│   │   ├── secrets/
│   │   │   └── sync-vault-to-k8s.sh
│   │   └── debug/
│   │       ├── logs.sh
│   │       ├── exec.sh
│   │       └── inspect.sh
│   │
│   ├── components/
│   │   │
│   │   ├── metallb/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── ip-pool.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── ingress-nginx/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── cert-manager/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── cluster-issuer.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── longhorn/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── vault/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── configure.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── policies/
│   │   │       ├── platform-policy.hcl
│   │   │       ├── trading-policy.hcl
│   │   │       ├── execution-policy.hcl
│   │   │       ├── market-data-policy.hcl
│   │   │       ├── portfolio-policy.hcl
│   │   │       └── readonly-policy.hcl
│   │   │
│   │   ├── keycloak/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── realm.json
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── istio/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── peer-authentication/
│   │   │       ├── platform-mtls.yaml
│   │   │       ├── market-data-mtls.yaml
│   │   │       ├── strategy-mtls.yaml
│   │   │       ├── execution-mtls.yaml
│   │   │       ├── trading-infra-mtls.yaml
│   │   │       ├── portfolio-mtls.yaml
│   │   │       ├── kafka-mtls.yaml
│   │   │       └── storage-mtls.yaml
│   │   │
│   │   ├── kong/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── plugins/
│   │   │       ├── jwt-plugin.yaml
│   │   │       ├── rate-limit-plugin.yaml
│   │   │       ├── request-id-plugin.yaml
│   │   │       └── cors-plugin.yaml
│   │   │
│   │   ├── kafka/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── topics.sh
│   │   │   ├── register-schemas.sh
│   │   │   ├── acl.sh
│   │   │   ├── consumer-groups.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── tools/
│   │   │       └── kafka-ui/
│   │   │           ├── install.sh
│   │   │           ├── validate.sh
│   │   │           ├── healthcheck.sh
│   │   │           ├── values.yaml
│   │   │           └── version.env
│   │   │
│   │   ├── schema-registry/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── postgres/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── migrate.sh
│   │   │   ├── backup.sh
│   │   │   ├── restore.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── migrations/
│   │   │       ├── 001_accounts.sql
│   │   │       ├── 002_account_groups.sql
│   │   │       ├── 003_orders.sql
│   │   │       ├── 004_positions.sql
│   │   │       ├── 005_portfolio_snapshots.sql
│   │   │       ├── 006_strategy_versions.sql
│   │   │       ├── 007_config_snapshots.sql
│   │   │       ├── 008_reconciliation_log.sql
│   │   │       ├── 009_audit_log.sql
│   │   │       └── 010_operation_modes.sql
│   │   │
│   │   ├── pgbouncer/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── timescaledb/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── migrate.sh
│   │   │   ├── backup.sh
│   │   │   ├── restore.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── migrations/
│   │   │       ├── 001_enable_extension.sql
│   │   │       ├── 002_ticks_hypertable.sql
│   │   │       ├── 003_ohlcv_hypertables.sql
│   │   │       ├── 004_signals_hypertable.sql
│   │   │       ├── 005_fills_hypertable.sql
│   │   │       ├── 006_features_hypertable.sql
│   │   │       └── 007_retention_policies.sql
│   │   │
│   │   ├── redis/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── prometheus/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── alertmanager-config.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── rules/
│   │   │       ├── trading-alerts.yaml
│   │   │       ├── kafka-alerts.yaml
│   │   │       ├── infra-alerts.yaml
│   │   │       └── db-alerts.yaml
│   │   │
│   │   ├── grafana/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   ├── README.md
│   │   │   └── dashboards/
│   │   │       ├── platform-overview.json
│   │   │       ├── trading-pipeline.json
│   │   │       ├── portfolio-live.json
│   │   │       ├── risk-dashboard.json
│   │   │       ├── kafka-health.json
│   │   │       ├── broker-connections.json
│   │   │       ├── account-summary.json
│   │   │       ├── reconciliation.json
│   │   │       └── infrastructure.json
│   │   │
│   │   ├── loki/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── promtail/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── jaeger/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── otel-collector/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── harbor/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   ├── argocd/
│   │   │   ├── install.sh
│   │   │   ├── validate.sh
│   │   │   ├── healthcheck.sh
│   │   │   ├── values.yaml
│   │   │   ├── version.env
│   │   │   └── README.md
│   │   │
│   │   └── wireguard/
│   │       ├── install.sh
│   │       ├── validate.sh
│   │       ├── healthcheck.sh
│   │       ├── generate-keys.sh
│   │       ├── server.conf.template
│   │       ├── client.conf.template
│   │       ├── version.env
│   │       ├── README.md
│   │       └── configs/
│   │           └── .gitkeep
│   │
│   ├── phases/
│   │   ├── phase-00-machine-prep/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-01-k8s-cluster/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   ├── kubeadm-config.yaml
│   │   │   └── README.md
│   │   ├── phase-02-cluster-foundation/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-03-security/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-04-event-backbone/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-05-storage/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-06-observability/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-07-cicd/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-08-platform-services/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-09-trading-pipeline/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-10-execution-pipeline/
│   │   │   ├── setup.sh
│   │   │   ├── validate.sh
│   │   │   └── README.md
│   │   ├── phase-11-validation-gate/
│   │   │   ├── validate.sh
│   │   │   ├── README.md
│   │   │   └── tests/
│   │   │       ├── test_determinism.sh
│   │   │       ├── test_lineage.py
│   │   │       ├── test_fixed_point.py
│   │   │       ├── test_kill_switch.sh
│   │   │       ├── test_risk_enforcement.py
│   │   │       ├── test_reconciliation.sh
│   │   │       ├── test_copy_trade.py
│   │   │       └── test_event_time.py
│   │   └── phase-12-wireguard/
│   │       ├── setup.sh
│   │       ├── validate.sh
│   │       └── README.md
│   │
│   ├── kubernetes/
│   │   ├── priority-classes.yaml
│   │   ├── resource-quotas.yaml
│   │   ├── namespaces/
│   │   │   └── all-namespaces.yaml
│   │   ├── network-policies/
│   │   │   ├── deny-all-default.yaml
│   │   │   ├── allow-kafka.yaml
│   │   │   ├── allow-storage.yaml
│   │   │   ├── allow-monitoring.yaml
│   │   │   ├── allow-vault.yaml
│   │   │   ├── execution-isolation.yaml
│   │   │   └── trading-infra-isolation.yaml
│   │   └── pod-disruption-budgets/
│   │       ├── critical-services.yaml
│   │       └── infra-services.yaml
│   │
│   └── terraform/
│       ├── backend.tf
│       ├── providers.tf
│       ├── environments/
│       │   ├── vmware/
│       │   │   ├── main.tf
│       │   │   ├── variables.tf
│       │   │   └── terraform.tfvars
│       │   ├── vps-staging/
│       │   │   ├── main.tf
│       │   │   ├── variables.tf
│       │   │   └── terraform.tfvars
│       │   └── production/
│       │       ├── main.tf
│       │       ├── variables.tf
│       │       └── terraform.tfvars
│       └── modules/
│           ├── k8s-node/
│           │   ├── main.tf
│           │   └── variables.tf
│           ├── networking/
│           │   ├── main.tf
│           │   └── variables.tf
│           └── storage/
│               ├── main.tf
│               └── variables.tf
│
│
├── services/
│   │
│   ├── _template/
│   │   ├── app/
│   │   │   └── main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/
│   │       └── _template/
│   │           ├── Chart.yaml
│   │           ├── values.yaml
│   │           ├── values-dev.yaml
│   │           ├── values-staging.yaml
│   │           ├── values-prod.yaml
│   │           └── templates/
│   │               ├── deployment.yaml
│   │               ├── service.yaml
│   │               ├── hpa.yaml
│   │               ├── pdb.yaml
│   │               ├── configmap.yaml
│   │               ├── secret.yaml
│   │               ├── serviceaccount.yaml
│   │               ├── networkpolicy.yaml
│   │               └── servicemonitor.yaml
│   │
│   │
│   ├── market-data-ingestion-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   └── connectors/
│   │   │       ├── base_connector.py
│   │   │       ├── mt5_connector.py
│   │   │       ├── ib_connector.py
│   │   │       ├── ctrader_connector.py
│   │   │       ├── fix_connector.py
│   │   │       └── alpaca_connector.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/market-data-ingestion-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── market-data-normalizer-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/market-data-normalizer-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── historical-data-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/historical-data-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── feature-store-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/feature-store-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── instrument-screening-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/instrument-screening-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── instrument-monitoring-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/instrument-monitoring-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── strategy-engine-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   └── strategies/
│   │   │       ├── base_strategy.py
│   │   │       ├── gold_timing_strategy.py
│   │   │       ├── forex_momentum_strategy.py
│   │   │       ├── mean_reversion_strategy.py
│   │   │       └── stock_momentum_strategy.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/strategy-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── signal-processor-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/signal-processor-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── decision-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/decision-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── constraint-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/constraint-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── event-ingestion-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/event-ingestion-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── event-validation-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/event-validation-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── event-ordering-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/event-ordering-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── identity-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/identity-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── orchestration-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/orchestration-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── state-update-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/state-update-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── snapshot-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/snapshot-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── replay-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/replay-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── execution-intent-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/execution-intent-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── account-routing-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/account-routing-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── risk-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/risk-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── policy-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/policy-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── position-sizer-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/position-sizer-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── order-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/order-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── smart-order-router/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/smart-order-router/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── oms-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/oms-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── ems-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/ems-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── broker-adapter-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   └── connectors/
│   │   │       ├── base_connector.py
│   │   │       ├── mt5_connector.py
│   │   │       ├── ib_connector.py
│   │   │       ├── ctrader_connector.py
│   │   │       ├── fix_connector.py
│   │   │       ├── alpaca_connector.py
│   │   │       └── mock_connector.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/broker-adapter-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── fill-handler-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/fill-handler-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── reconciliation-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/reconciliation-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── copy-trade-engine/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/copy-trade-engine/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── portfolio-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/portfolio-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── exposure-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/exposure-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── capital-partition-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/capital-partition-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── backtest-engine-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/backtest-engine-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── api-gateway-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/api-gateway-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── config-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/config-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── config-snapshot-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/config-snapshot-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── audit-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/audit-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── alert-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/alert-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   ├── failure-handling-service/
│   │   ├── app/main.py
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── OWNERS.yaml
│   │   ├── configs/
│   │   │   ├── base.yaml
│   │   │   ├── dev.yaml
│   │   │   ├── staging.yaml
│   │   │   └── prod.yaml
│   │   ├── kafka/
│   │   │   ├── producers.yaml
│   │   │   ├── consumers.yaml
│   │   │   └── topics.yaml
│   │   ├── observability/
│   │   │   ├── metrics.yaml
│   │   │   ├── alerts.yaml
│   │   │   └── dashboards.json
│   │   └── helm/failure-handling-service/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-staging.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           ├── hpa.yaml
│   │           ├── pdb.yaml
│   │           ├── configmap.yaml
│   │           ├── secret.yaml
│   │           ├── serviceaccount.yaml
│   │           ├── networkpolicy.yaml
│   │           └── servicemonitor.yaml
│   │
│   └── trading-dashboard-frontend/
│       ├── src/
│       │   ├── index.js
│       │   ├── App.js
│       │   └── components/
│       │       ├── Portfolio.js
│       │       ├── Positions.js
│       │       ├── RiskMonitor.js
│       │       ├── StrategyPanel.js
│       │       ├── AccountSummary.js
│       │       └── KillSwitch.js
│       ├── tests/
│       │   ├── unit/
│       │   └── integration/
│       ├── Dockerfile
│       ├── package.json
│       ├── OWNERS.yaml
│       ├── configs/
│       │   ├── base.yaml
│       │   ├── dev.yaml
│       │   ├── staging.yaml
│       │   └── prod.yaml
│       ├── observability/
│       │   ├── metrics.yaml
│       │   ├── alerts.yaml
│       │   └── dashboards.json
│       └── helm/trading-dashboard-frontend/
│           ├── Chart.yaml
│           ├── values.yaml
│           ├── values-dev.yaml
│           ├── values-staging.yaml
│           ├── values-prod.yaml
│           └── templates/
│               ├── deployment.yaml
│               ├── service.yaml
│               ├── ingress.yaml
│               ├── hpa.yaml
│               ├── pdb.yaml
│               ├── configmap.yaml
│               ├── secret.yaml
│               ├── serviceaccount.yaml
│               ├── networkpolicy.yaml
│               └── servicemonitor.yaml
│
│
├── docs/
│   ├── architecture/
│   │   ├── system-overview.md
│   │   ├── event-flow.md
│   │   └── service-boundaries.md
│   ├── runbooks/
│   │   ├── deployment.md
│   │   ├── rollback.md
│   │   ├── incident-response.md
│   │   ├── kill-switch.md
│   │   ├── broker-failover.md
│   │   ├── db-recovery.md
│   │   ├── kafka-recovery.md
│   │   └── vault-unseal.md
│   └── adr/
│       ├── 001-kafka-source-of-truth.md
│       ├── 002-sha256-lineage.md
│       ├── 003-fixed-point-arithmetic.md
│       ├── 004-event-time-only.md
│       └── 005-paper-first-policy.md
│
│
└── tests/
    ├── unit/
    ├── integration/
    ├── e2e/
    ├── fixtures/
    │   └── sample-events.json
    └── mock-services/
        └── mock-broker.py
