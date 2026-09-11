# STAGE 09 — OBSERVABILITY OPERATIONS

## PURPOSE

This document defines the authoritative observability architecture, operational procedures, deployment governance, validation workflows, and recovery processes for the CORE EYE platform.

Stage 09 establishes institutional-grade observability infrastructure for:

- metrics
- logs
- traces
- alerting
- visualization
- telemetry collection

---

# OBSERVABILITY ARCHITECTURE

## COMPONENTS

| Component | Purpose |
|---|---|
| Prometheus | Metrics collection |
| Alertmanager | Alert routing and escalation |
| Grafana | Visualization and operational dashboards |
| Loki | Centralized log aggregation |
| Promtail | Kubernetes log shipping |
| Jaeger | Distributed tracing |
| OpenTelemetry Collector | Telemetry ingestion and routing |

---

# OBSERVABILITY SIGNAL FLOW

```text
Applications
    ↓

OpenTelemetry
    ↓

Metrics → Prometheus
Logs    → Loki
Traces  → Jaeger

    ↓

Grafana
    ↓

Alertmanager
    ↓

Telegram Escalation
```

---

# KUBERNETES NAMESPACE

```text
observability
```

---

# DEPLOYMENT STRUCTURE

## VALUES FILES

```text
infrastructure/phases/stage-09-observability/values/
```

### Files

- prometheus-values.yaml
- loki-values.yaml
- promtail-values.yaml
- jaeger-values.yaml
- otel-values.yaml

---

# ALERT GOVERNANCE

## Alert Rules

```text
infrastructure/phases/stage-09-observability/alerts/
```

## Telegram Routing

Alertmanager routes operational alerts to Telegram using:

- bot token secret
- chat-id secret
- Alertmanager receiver configuration

---

# GRAFANA GOVERNANCE

## Datasource Provisioning

```text
infrastructure/phases/stage-09-observability/grafana/provisioning/datasources/
```

## Dashboard Provisioning

```text
infrastructure/phases/stage-09-observability/grafana/provisioning/dashboards/
```

## Dashboard Files

```text
infrastructure/phases/stage-09-observability/grafana/dashboards/
```

## Deployment Manifest

```text
infrastructure/phases/stage-09-observability/grafana/grafana-deployment.yaml
```

---

# CONFIGMAP GOVERNANCE

## Grafana Datasources

```text
grafana-datasources
```

## Grafana Dashboard Providers

```text
grafana-dashboard-providers
```

## Grafana Dashboards

```text
grafana-dashboards
```

---

# OPERATIONAL VALIDATION

## Validation Script

```text
infrastructure/phases/stage-09-observability/scripts/validate.sh
```

Purpose:
- operational readiness verification
- infrastructure validation
- deployment verification
- recovery validation

---

# BOOTSTRAP AUTOMATION

## Setup Script

```text
infrastructure/phases/stage-09-observability/scripts/setup.sh
```

Purpose:
- environment bootstrap
- deterministic deployment
- infrastructure recovery
- reproducible setup

---

# OPERATIONAL RECOVERY PROCEDURES

## Grafana Recovery

```bash
kubectl rollout restart deployment/grafana -n observability
```

---

## Alertmanager Recovery

```bash
kubectl rollout restart statefulset alertmanager-kube-prometheus-stack-alertmanager -n observability
```

---

## Prometheus Recovery

```bash
kubectl rollout restart statefulset/prometheus-kube-prometheus-stack-prometheus -n observability
```

---

## CoreDNS Recovery

```bash
kubectl rollout restart deployment/coredns -n kube-system
```

---

## Calico Recovery

```bash
kubectl rollout restart daemonset/calico-node -n kube-system

kubectl rollout restart deployment/calico-kube-controllers -n kube-system
```

---

# TELEGRAM ALERT VALIDATION

## DNS Validation

```bash
kubectl run dns-test \
  --rm -it \
  --restart=Never \
  --image=busybox:1.36 \
  -n observability -- nslookup api.telegram.org
```

---

## HTTPS Connectivity Validation

```bash
kubectl run curl-test \
  --rm -it \
  --restart=Never \
  --image=curlimages/curl \
  -n observability -- curl https://api.telegram.org
```

---

# GRAFANA ACCESS

## Port Forward

```bash
kubectl port-forward svc/grafana -n observability 3000:80
```

## URL

```text
http://localhost:3000
```

---

# JAEGER ACCESS

## Port Forward

```bash
kubectl port-forward svc/jaeger -n observability 16686:16686
```

## URL

```text
http://localhost:16686
```

---

# ALERTMANAGER ACCESS

## Port Forward

```bash
kubectl port-forward svc/alertmanager-operated -n observability 9093:9093
```

## URL

```text
http://localhost:9093
```

---

# INSTITUTIONAL GOVERNANCE PRINCIPLES

The observability stack must remain:

- declarative
- Git-governed
- reproducible
- environment-portable
- operationally deterministic

Runtime-generated metadata must never be committed to Git repositories.

---

# STAGE 09 STATUS

## STATUS

```text
COMPLETE
```

## OBSERVABILITY MATURITY

```text
INSTITUTIONAL-GRADE
```
