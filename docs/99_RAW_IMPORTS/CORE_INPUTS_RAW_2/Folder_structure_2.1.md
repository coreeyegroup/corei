trading-platform/
├── infrastructure/
│   ├── config/
│   │   ├── environment.sh
│   │   ├── environment.vmware.backup.sh
│   │   └── secrets.example.sh
│   │
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── modules/
│   │       ├── k8s-cluster/
│   │       │   ├── main.tf
│   │       │   ├── variables.tf
│   │       │   └── outputs.tf
│   │       ├── networking/
│   │       │   ├── main.tf
│   │       │   ├── variables.tf
│   │       │   └── outputs.tf
│   │       └── storage/
│   │           ├── main.tf
│   │           ├── variables.tf
│   │           └── outputs.tf
│   │
│   ├── kubernetes/
│   │   ├── namespaces/
│   │   │   └── all-namespaces.yaml
│   │   │
│   │   ├── helm-values/
│   │   │   ├── kafka-values.yaml
│   │   │   ├── timescaledb-values.yaml
│   │   │   ├── postgresql-values.yaml
│   │   │   ├── redis-values.yaml
│   │   │   ├── vault-values.yaml
│   │   │   ├── argocd-values.yaml
│   │   │   ├── prometheus-values.yaml
│   │   │   ├── loki-values.yaml
│   │   │   ├── jaeger-values.yaml
│   │   │   ├── longhorn-values.yaml
│   │   │   ├── ingress-values.yaml
│   │   │   └── cert-manager-values.yaml
│   │   │
│   │   ├── apps/
│   │   │   ├── data-service/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── strategy-engine/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── order-manager/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── risk-engine/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── account-manager/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── broker-connector/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── portfolio-tracker/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── alert-service/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   ├── api-gateway/
│   │   │   │   ├── deployment.yaml
│   │   │   │   ├── service.yaml
│   │   │   │   ├── ingress.yaml
│   │   │   │   ├── hpa.yaml
│   │   │   │   ├── pdb.yaml
│   │   │   │   ├── configmap.yaml
│   │   │   │   ├── serviceaccount.yaml
│   │   │   │   └── networkpolicy.yaml
│   │   │   │
│   │   │   └── frontend/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── ingress.yaml
│   │   │       ├── hpa.yaml
│   │   │       ├── configmap.yaml
│   │   │       └── networkpolicy.yaml
│   │   │
│   │   ├── argocd/
│   │   │   ├── app-of-apps.yaml
│   │   │   └── applications/
│   │   │       ├── data-service.yaml
│   │   │       ├── strategy-engine.yaml
│   │   │       ├── order-manager.yaml
│   │   │       ├── risk-engine.yaml
│   │   │       ├── account-manager.yaml
│   │   │       ├── broker-connector.yaml
│   │   │       ├── portfolio-tracker.yaml
│   │   │       ├── alert-service.yaml
│   │   │       ├── api-gateway.yaml
│   │   │       └── frontend.yaml
│   │   │
│   │   ├── monitoring/
│   │   │   ├── trading-alerts.yaml
│   │   │   ├── trading-dashboards.yaml
│   │   │   └── service-monitors.yaml
│   │   │
│   │   ├── network/
│   │   │   ├── network-policies.yaml
│   │   │   └── ingress-rules.yaml
│   │   │
│   │   ├── storage/
│   │   │   └── storage-classes.yaml
│   │   │
│   │   └── infra/
│   │       ├── cluster-issuer.yaml
│   │       ├── resource-quotas.yaml
│   │       └── limit-ranges.yaml
│   │
│   ├── database/
│   │   ├── timescaledb/
│   │   │   ├── init.sql
│   │   │   ├── schema.sql
│   │   │   ├── continuous-aggregates.sql
│   │   │   ├── compression-policies.sql
│   │   │   ├── retention-policies.sql
│   │   │   └── users.sql
│   │   │
│   │   ├── postgresql/
│   │   │   ├── init.sql
│   │   │   ├── schema.sql
│   │   │   ├── indexes.sql
│   │   │   ├── partitions.sql
│   │   │   ├── functions.sql
│   │   │   ├── triggers.sql
│   │   │   └── users.sql
│   │   │
│   │   └── redis/
│   │       └── key-structure.md
│   │
│   ├── scripts/
│   │   ├── install-local-tools.sh
│   │   ├── master-install.sh
│   │   ├── 01-setup-server.sh
│   │   ├── 01-setup-all-servers.sh
│   │   ├── 02-verify-server.sh
│   │   ├── 02-setup-wireguard.sh
│   │   ├── 03-install-kubernetes.sh
│   │   ├── 04-install-longhorn.sh
│   │   ├── 05-install-ingress.sh
│   │   ├── 06-install-cert-manager.sh
│   │   ├── 07-install-vault.sh
│   │   ├── 08-install-kafka.sh
│   │   ├── 09-install-timescaledb.sh
│   │   ├── 10-install-postgresql.sh
│   │   ├── 11-install-redis.sh
│   │   ├── 12-install-monitoring.sh
│   │   ├── 13-install-argocd.sh
│   │   ├── 14-verify-all.sh
│   │   ├── create-kafka-topics.sh
│   │   ├── init-all-databases.sh
│   │   ├── vault-init-vps.sh
│   │   ├── vault-setup-secrets.sh
│   │   ├── pre-migration-check.sh
│   │   ├── export-configs.sh
│   │   ├── migrate-to-vps.sh
│   │   └── post-migration-validate.sh
│   │
│   ├── vmware/
│   │   ├── vm-specs.md
│   │   ├── create-vms-guide.md
│   │   ├── network-setup.md
│   │   ├── snapshot-guide.md
│   │   └── take-cluster-snapshot.sh
│   │
│   └── migration/
│       ├── exported-configs/
│       │   ├── MIGRATION-MANIFEST.md
│       │   ├── helm-kafka-actual-values.yaml
│       │   ├── helm-timescaledb-actual-values.yaml
│       │   ├── helm-postgresql-actual-values.yaml
│       │   ├── helm-redis-actual-values.yaml
│       │   ├── helm-vault-actual-values.yaml
│       │   ├── helm-argocd-actual-values.yaml
│       │   ├── helm-kube-prometheus-stack-actual-values.yaml
│       │   ├── trading-configmaps.yaml
│       │   ├── trading-services.yaml
│       │   ├── all-ingress.yaml
│       │   ├── storage-classes.yaml
│       │   ├── network-policies.yaml
│       │   ├── timescaledb-schema.sql
│       │   ├── postgresql-schema.sql
│       │   ├── kafka-topics-list.txt
│       │   ├── kafka-topics-describe.txt
│       │   ├── vault-secret-paths.json
│       │   └── vault-policies.json
│       │
│       └── .install-progress
│
├── services/
│   ├── data-service/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── feed/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── normalizer.py
│   │   │   │   ├── bar_builder.py
│   │   │   │   └── feed_manager.py
│   │   │   ├── storage/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── tick_store.py
│   │   │   │   └── historical_server.py
│   │   │   ├── scanner/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── stock_scanner.py
│   │   │   │   └── asset_monitor.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── tick.py
│   │   │   │   ├── bar.py
│   │   │   │   └── signal.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       ├── health.py
│   │   │       └── websocket.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_normalizer.py
│   │       │   ├── test_bar_builder.py
│   │       │   └── test_scanner.py
│   │       └── integration/
│   │           ├── test_tick_store.py
│   │           └── test_kafka_producer.py
│   │
│   ├── strategy-engine/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── engine/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── strategy_runner.py
│   │   │   │   ├── strategy_loader.py
│   │   │   │   ├── indicator_engine.py
│   │   │   │   └── signal_aggregator.py
│   │   │   ├── strategies/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── base_strategy.py
│   │   │   │   ├── gold_timing.py
│   │   │   │   ├── stock_momentum.py
│   │   │   │   ├── mean_reversion.py
│   │   │   │   └── news_trading.py
│   │   │   ├── indicators/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── trend.py
│   │   │   │   ├── oscillators.py
│   │   │   │   ├── volatility.py
│   │   │   │   └── volume.py
│   │   │   ├── backtester/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── backtester.py
│   │   │   │   └── performance.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── signal.py
│   │   │   │   └── strategy_config.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_gold_strategy.py
│   │       │   ├── test_stock_momentum.py
│   │       │   └── test_indicators.py
│   │       └── integration/
│   │           └── test_signal_flow.py
│   │
│   ├── order-manager/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── oms/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── order_manager.py
│   │   │   │   ├── order_state_machine.py
│   │   │   │   ├── fill_processor.py
│   │   │   │   └── slippage_tracker.py
│   │   │   ├── sizing/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── position_sizer.py
│   │   │   │   ├── fixed_fractional.py
│   │   │   │   ├── kelly_criterion.py
│   │   │   │   └── volatility_adjusted.py
│   │   │   ├── routing/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── smart_router.py
│   │   │   │   └── broker_selector.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── order.py
│   │   │   │   └── order_result.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_order_state.py
│   │       │   ├── test_position_sizer.py
│   │       │   └── test_smart_router.py
│   │       └── integration/
│   │           └── test_order_flow.py
│   │
│   ├── risk-engine/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── risk/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── risk_engine.py
│   │   │   │   ├── rule_engine.py
│   │   │   │   ├── kill_switch.py
│   │   │   │   └── correlation_checker.py
│   │   │   ├── rules/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── base_rule.py
│   │   │   │   ├── max_loss_rule.py
│   │   │   │   ├── daily_loss_rule.py
│   │   │   │   ├── margin_rule.py
│   │   │   │   ├── position_count_rule.py
│   │   │   │   └── correlation_rule.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── risk_check.py
│   │   │   │   └── risk_decision.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_risk_rules.py
│   │       │   ├── test_kill_switch.py
│   │       │   └── test_correlation.py
│   │       └── integration/
│   │           └── test_risk_flow.py
│   │
│   ├── account-manager/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── accounts/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── account_manager.py
│   │   │   │   ├── group_manager.py
│   │   │   │   └── trade_copier.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── account.py
│   │   │   │   └── account_group.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_trade_copier.py
│   │       │   └── test_lot_scaling.py
│   │       └── integration/
│   │           └── test_account_sync.py
│   │
│   ├── broker-connector/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── connectors/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── base_connector.py
│   │   │   │   ├── mt5_connector.py
│   │   │   │   ├── ctrader_connector.py
│   │   │   │   ├── ib_connector.py
│   │   │   │   ├── fix_connector.py
│   │   │   │   └── binance_connector.py
│   │   │   ├── factory/
│   │   │   │   ├── __init__.py
│   │   │   │   └── broker_factory.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── tick.py
│   │   │   │   ├── order.py
│   │   │   │   ├── position.py
│   │   │   │   └── account_info.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_mt5_connector.py
│   │       │   ├── test_ib_connector.py
│   │       │   └── test_broker_factory.py
│   │       └── integration/
│   │           └── test_broker_connectivity.py
│   │
│   ├── portfolio-tracker/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── tracker/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── portfolio_tracker.py
│   │   │   │   ├── pnl_calculator.py
│   │   │   │   └── performance_metrics.py
│   │   │   ├── reporting/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── daily_report.py
│   │   │   │   └── snapshot_service.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── producer.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── portfolio.py
│   │   │   │   └── performance.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_pnl_calculator.py
│   │       │   └── test_performance_metrics.py
│   │       └── integration/
│   │           └── test_portfolio_tracking.py
│   │
│   ├── alert-service/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── alerts/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── alert_service.py
│   │   │   │   └── alert_router.py
│   │   │   ├── channels/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── telegram_channel.py
│   │   │   │   ├── email_channel.py
│   │   │   │   └── sms_channel.py
│   │   │   ├── kafka/
│   │   │   │   ├── __init__.py
│   │   │   │   └── consumer.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   └── alert.py
│   │   │   └── api/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── health.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_telegram_channel.py
│   │       │   └── test_alert_router.py
│   │       └── integration/
│   │           └── test_alert_delivery.py
│   │
│   ├── api-gateway/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   ├── src/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── jwt_handler.py
│   │   │   │   └── middleware.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── accounts.py
│   │   │   │   ├── orders.py
│   │   │   │   ├── positions.py
│   │   │   │   ├── strategies.py
│   │   │   │   ├── portfolio.py
│   │   │   │   ├── market_data.py
│   │   │   │   └── health.py
│   │   │   └── websocket/
│   │   │       ├── __init__.py
│   │   │       ├── manager.py
│   │   │       └── handlers.py
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── test_auth.py
│   │       │   └── test_routes.py
│   │       └── integration/
│   │           └── test_api.py
│   │
│   └── shared/
│       ├── __init__.py
│       ├── models/
│       │   ├── __init__.py
│       │   ├── tick.py
│       │   ├── bar.py
│       │   ├── signal.py
│       │   ├── order.py
│       │   ├── position.py
│       │   └── account.py
│       ├── kafka/
│       │   ├── __init__.py
│       │   ├── base_producer.py
│       │   ├── base_consumer.py
│       │   └── schemas/
│       │       ├── tick.avsc
│       │       ├── signal.avsc
│       │       ├── order.avsc
│       │       └── position.avsc
│       ├── database/
│       │   ├── __init__.py
│       │   ├── timescaledb_client.py
│       │   ├── postgresql_client.py
│       │   └── redis_client.py
│       ├── vault/
│       │   ├── __init__.py
│       │   └── vault_client.py
│       ├── logging/
│       │   ├── __init__.py
│       │   └── structured_logger.py
│       └── tracing/
│           ├── __init__.py
│           └── jaeger_tracer.py
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.svg
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Portfolio.jsx
│       │   ├── Positions.jsx
│       │   ├── Orders.jsx
│       │   ├── Strategies.jsx
│       │   ├── GoldMonitor.jsx
│       │   ├── StockScanner.jsx
│       │   ├── RiskDashboard.jsx
│       │   ├── Brokers.jsx
│       │   ├── Accounts.jsx
│       │   └── Settings.jsx
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Sidebar.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── Footer.jsx
│       │   │   └── Layout.jsx
│       │   ├── charts/
│       │   │   ├── PriceChart.jsx
│       │   │   ├── PnLChart.jsx
│       │   │   ├── EquityCurve.jsx
│       │   │   └── DrawdownChart.jsx
│       │   ├── cards/
│       │   │   ├── AccountCard.jsx
│       │   │   ├── PositionCard.jsx
│       │   │   ├── PnLCard.jsx
│       │   │   └── SignalCard.jsx
│       │   ├── tables/
│       │   │   ├── OrdersTable.jsx
│       │   │   ├── PositionsTable.jsx
│       │   │   └── TradeHistory.jsx
│       │   ├── monitors/
│       │   │   ├── GoldIndicators.jsx
│       │   │   ├── MacroPanel.jsx
│       │   │   └── SessionClock.jsx
│       │   ├── risk/
│       │   │   ├── RiskMeter.jsx
│       │   │   ├── DrawdownGauge.jsx
│       │   │   └── MarginBar.jsx
│       │   └── common/
│       │       ├── LoadingSpinner.jsx
│       │       ├── ErrorBoundary.jsx
│       │       ├── Badge.jsx
│       │       └── Modal.jsx
│       ├── services/
│       │   ├── api.js
│       │   ├── websocket.js
│       │   ├── auth.js
│       │   └── formatters.js
│       ├── store/
│       │   ├── index.js
│       │   ├── accountSlice.js
│       │   ├── positionSlice.js
│       │   ├── orderSlice.js
│       │   ├── strategySlice.js
│       │   └── marketDataSlice.js
│       └── hooks/
│           ├── useWebSocket.js
│           ├── usePositions.js
│           ├── useOrders.js
│           └── useMarketData.js
│
├── docs/
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── service-map.md
│   │   ├── data-flows.md
│   │   ├── network-design.md
│   │   └── diagrams/
│   │       ├── system-architecture.png
│   │       ├── service-map.png
│   │       ├── data-flow.png
│   │       └── network-topology.png
│   │
│   ├── runbooks/
│   │   ├── daily-operations.md
│   │   ├── troubleshooting.md
│   │   ├── emergency-procedures.md
│   │   ├── vault-unseal.md
│   │   ├── database-recovery.md
│   │   ├── kafka-recovery.md
│   │   └── cluster-recovery.md
│   │
│   ├── training/
│   │   ├── 00-introduction.md
│   │   ├── 01-vmware-setup.md
│   │   ├── 02-kubernetes-basics.md
│   │   ├── 03-kafka-basics.md
│   │   ├── 04-database-basics.md
│   │   ├── 05-vault-basics.md
│   │   ├── 06-monitoring-basics.md
│   │   ├── 07-trading-platform.md
│   │   ├── 08-vps-migration.md
│   │   └── quick-reference-card.md
│   │
│   ├── api/
│   │   ├── api-reference.md
│   │   ├── websocket-events.md
│   │   └── kafka-schemas.md
│   │
│   └── decisions/
│       ├── ADR-001-python-language.md
│       ├── ADR-002-kafka-over-redis.md
│       ├── ADR-003-timescaledb-choice.md
│       ├── ADR-004-k3s-over-kubeadm.md
│       └── ADR-005-vault-secrets.md
│
├── .github/
│   ├── workflows/
│   │   ├── build-and-test.yaml
│   │   ├── deploy-staging.yaml
│   │   ├── deploy-production.yaml
│   │   └── security-scan.yaml
│   │
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── .gitignore
├── README.md
├── CHANGELOG.md
├── Makefile
└── docker-compose.dev.yml
