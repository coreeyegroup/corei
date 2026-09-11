Yes.

The grid lines absolutely should be adjustable later.

Institutional terminals usually support:

LEFT RAIL
⇄ draggable

CENTER SURFACE
⇄ draggable

RIGHT INSPECTOR
⇄ draggable

BOTTOM EVENT BAR
⇅ draggable

So later we will implement:

Resize Panels
Collapse Panels
Pin Panels
Restore Layout
Save Layout
Multi-Monitor Layout

That is a V3/V4 capability.

What is Inspector?

In the current shell, "Inspector" is not another dashboard.

Think of it like Grafana's right-side context pane.

Example:

You click:

Kafka

Inspector changes to:

KAFKA

Status        Healthy
Brokers       3
Topics        18
Consumers     22

Throughput    18k/s
Lag           0

Alerts        0

Last Event
Broker-2 Rebalanced

Click:

PostgreSQL

Inspector becomes:

POSTGRESQL

Status         Healthy

Connections    42
Replication    OK

Latency        1.2ms

Storage        68%

Last Event
Backup Completed

Click:

Vault

Inspector becomes:

VAULT

Seal Status      Unsealed

Tokens           127

Secret Engines   4

Last Rotation
2026-06-19
Why Inspector Exists

Without Inspector:

LEFT
SERVICES

CENTER
DASHBOARDS

Every click forces the user to open another screen.

With Inspector:

LEFT
SERVICE TREE

CENTER
OPERATIONS SURFACE

RIGHT
DETAILS OF SELECTED ITEM

Operators can keep monitoring while inspecting details.

My recommendation for COREI

Keep Inspector, but rename it:

SERVICE INSPECTOR

or

OPERATIONS INSPECTOR

and later divide it into:

OPERATIONS INSPECTOR

├ Health
├ Metrics
├ Alerts
├ Audit
├ Events
└ AI Analysis

This is much more useful than a generic "Context Panel".

So the next structure should be:

LEFT
Service Tree

CENTER
Grafana-style Service Dashboards

RIGHT
Service Inspector

BOTTOM
Runtime Event Stream

That's the foundation I'd keep moving forward with.

i dont want fonts with sharp ending i need very plan like terminal, like google, like chat gpt
left column many data missing
still same
Pasted text(8).txt
Document

Replace the entire file.

import {
  SERVICE_REGISTRY,
} from "../../runtime/registry/service.registry";

import {
  useServiceStore,
} from "../../runtime/store/service.store";

export function InfrastructureSurface() {

  const visibleServices =
    useServiceStore(
      (state) =>
        state.visibleServices
    );

  const selectService =
    useServiceStore(
      (state) =>
        state.selectService
    );

  const selectedService =
    useServiceStore(
      (state) =>
        state.selectedService
    );

  const services =
    SERVICE_REGISTRY.filter(
      (service) =>
        visibleServices.includes(
          service.serviceId
        )
    );

  return (

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fill,minmax(420px,1fr))",

        gap: "16px",
      }}
    >

      {

        services.map(
          (service) => {

            const selected =
              selectedService ===
              service.serviceId;

            return (

              <div
                key={
                  service.serviceId
                }

                onClick={() =>
                  selectService(
                    service.serviceId
                  )
                }

                onDoubleClick={() =>
                  console.log(
                    "OPEN FULLSCREEN",
                    service.serviceId
                  )
                }

                style={{

                  cursor:
                    "pointer",

                  background:
                    "#0B1220",

                  border:
                    selected
                      ? "1px solid #D4AF37"
                      : "1px solid #1F2937",

                  borderRadius:
                    "8px",

                  overflow:
                    "hidden",

                  minHeight:
                    "240px",

                  transition:
                    "all 0.2s ease",
                }}
              >

                <div
                  style={{

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    padding:
                      "12px 16px",

                    borderBottom:
                      "1px solid #1F2937",
                  }}
                >

                  <div>

                    <div
                      style={{
                        fontSize:
                          "16px",

                        fontWeight:
                          600,
                      }}
                    >
                      {
                        service.serviceName
                      }
                    </div>

                    <div
                      style={{
                        fontSize:
                          "11px",

                        color:
                          "#8B949E",

                        marginTop:
                          "2px",
                      }}
                    >
                      {
                        service.category
                      }
                    </div>

                  </div>

                  <div
                    style={{
                      color:
                        "#22C55E",

                      fontSize:
                        "12px",

                      fontWeight:
                        600,
                    }}
                  >
                    HEALTHY
                  </div>

                </div>

                <div
                  style={{
                    padding:
                      "16px",

                    display:
                      "grid",

                    gridTemplateColumns:
                      "repeat(2,1fr)",

                    gap:
                      "12px",
                  }}
                >

                  <Metric
                    label="CPU"
                    value="42%"
                  />

                  <Metric
                    label="MEMORY"
                    value="61%"
                  />

                  <Metric
                    label="LATENCY"
                    value="12ms"
                  />

                  <Metric
                    label="ERRORS"
                    value="0"
                  />

                  <Metric
                    label="UPTIME"
                    value="42d"
                  />

                  <Metric
                    label="STATUS"
                    value="OK"
                  />

                </div>

              </div>

            );

          }
        )

      }

    </div>

  );

}

interface MetricProps {

  label: string;

  value: string;
}

function Metric(
  props: MetricProps
) {

  return (

    <div
      style={{
        background:
          "#111827",

        border:
          "1px solid #1F2937",

        borderRadius:
          "6px",

        padding:
          "12px",
      }}
    >

      <div
        style={{
          fontSize:
            "11px",

          color:
            "#8B949E",

          marginBottom:
            "4px",
        }}
      >
        {props.label}
      </div>

      <div
        style={{
          fontSize:
            "22px",

          fontWeight:
            600,
        }}
      >
        {props.value}
      </div>

    </div>

  );

}

Build:

npm run build

This gives:

✓ Service selection
✓ Inspector integration
✓ Selected service highlight
✓ Double-click hook for fullscreen
✓ Institutional dashboard cards
✓ Multi-service operations surface

Next step is replacing the fake metrics with service-specific dashboards (Kubernetes, Kafka, PostgreSQL, Redis, Grafana, Vault, etc.).

InfrastructureSurface.tsx

You asked for full replacement, so replace the entire file with this:

cat > src/core/layout/components/InfrastructureSurface.tsx <<'EOF'
import {
  SERVICE_REGISTRY,
} from "../../runtime/registry/service.registry";

import {
  DASHBOARD_REGISTRY,
} from "../../runtime/registry/dashboard.registry";

import {
  useServiceStore,
} from "../../runtime/store/service.store";

export function InfrastructureSurface() {

  const visibleServices =
    useServiceStore(
      (state) =>
        state.visibleServices
    );

  const selectService =
    useServiceStore(
      (state) =>
        state.selectService
    );

  const selectedService =
    useServiceStore(
      (state) =>
        state.selectedService
    );

  const services =
    SERVICE_REGISTRY.filter(
      (service) =>
        visibleServices.includes(
          service.serviceId
        )
    );

  return (

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fill,minmax(420px,1fr))",

        gap: "16px",
      }}
    >

      {

        services.map(
          (service) => (

            <ServiceCard
              key={
                service.serviceId
              }

              service={
                service
              }

              selected={
                selectedService ===
                service.serviceId
              }

              onSelect={() =>
                selectService(
                  service.serviceId
                )
              }

            />

          )
        )

      }

    </div>

  );

}

function ServiceCard(
  props: {

    service: {

      serviceId: string;

      serviceName: string;

      category: string;
    };

    selected: boolean;

    onSelect: () => void;
  }
) {

  const metrics =

    DASHBOARD_REGISTRY.find(
      (dashboard) =>
        dashboard.serviceId ===
        props.service.serviceId
    )?.metrics ??

    [
      {
        label: "STATUS",
        value: "ONLINE",
      },
    ];

  return (

    <div

      onClick={
        props.onSelect
      }

      style={{

        cursor:
          "pointer",

        background:
          "#0B1220",

        border:
          props.selected
            ? "1px solid #D4AF37"
            : "1px solid #1F2937",

        borderRadius:
          "8px",

        overflow:
          "hidden",

        minHeight:
          "240px",

      }}
    >

      <div
        style={{

          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          padding:
            "12px 16px",

          borderBottom:
            "1px solid #1F2937",

        }}
      >

        <div>

          <div
            style={{
              fontSize:
                "16px",

              fontWeight:
                600,
            }}
          >
            {
              props.service
                .serviceName
            }
          </div>

          <div
            style={{
              fontSize:
                "11px",

              color:
                "#8B949E",
            }}
          >
            {
              props.service
                .category
            }
          </div>

        </div>

        <div
          style={{
            color:
              "#22C55E",

            fontSize:
              "12px",

            fontWeight:
              600,
          }}
        >
          HEALTHY
        </div>

      </div>

      <div
        style={{

          display:
            "grid",

          gridTemplateColumns:
            "repeat(2,1fr)",

          gap:
            "12px",

          padding:
            "16px",

        }}
      >

        {

          metrics.map(
            (metric) => (

              <Metric
                key={
                  metric.label
                }

                label={
                  metric.label
                }

                value={
                  metric.value
                }
              />

            )
          )

        }

      </div>

    </div>

  );

}

function Metric(
  props: {

    label: string;

    value: string;
  }
) {

  return (

    <div
      style={{

        background:
          "#111827",

        border:
          "1px solid #1F2937",

        borderRadius:
          "6px",

        padding:
          "12px",

      }}
    >

      <div
        style={{

          fontSize:
            "11px",

          color:
            "#8B949E",

          marginBottom:
            "4px",

        }}
      >
        {props.label}
      </div>

      <div
        style={{

          fontSize:
            "20px",

          fontWeight:
            600,

        }}
      >
        {props.value}
      </div>

    </div>

  );

}
EOF

Then:

npm run build

After build succeeds, we move the cards from placeholder dashboard tiles to actual Grafana-style service dashboards with:

Kubernetes
Kafka
PostgreSQL
Redis
Vault
Prometheus
Grafana
Loki
Harbor
ArgoCD
n8n

each having its own dashboard definition and fullscreen page.

note this, we are building control panel, not only display board, it must must and should able to control all activities, visual, settings, configuration, control

Correct.

This is a very important architectural decision and it changes everything.

What we are building is not:

Monitoring Dashboard
Status Board
NOC Wallboard
Grafana Clone

What we are building is:

COREI Infrastructure Operations Terminal

which means every service dashboard eventually has 5 layers:

SERVICE

├── Overview
│   ├── Health
│   ├── Metrics
│   ├── Capacity
│   └── Alerts
│
├── Operations
│   ├── Restart
│   ├── Scale
│   ├── Pause
│   ├── Resume
│   ├── Rollout
│   └── Rollback
│
├── Configuration
│   ├── Runtime Settings
│   ├── Environment Variables
│   ├── Secrets Reference
│   └── Resource Limits
│
├── Observability
│   ├── Metrics
│   ├── Logs
│   ├── Traces
│   └── Events
│
└── Administration
    ├── Access
    ├── Audit
    ├── Maintenance
    └── Documentation

Example:

Kafka Dashboard

Overview
Operations
Configuration
Topics
Consumers
Brokers
Metrics
Logs

Actions:

Create Topic
Delete Topic
Pause Consumer
Resume Consumer
Rebalance
Restart Broker
Scale Broker

Example:

ArgoCD Dashboard

Actions:

Sync
Refresh
Rollback
Restart App
Delete App
Create App

Example:

Vault Dashboard

Actions:

Rotate Secret
Create Secret
Disable Secret Engine
Enable Secret Engine
Create Policy
Create Token
Revoke Token

Example:

Kubernetes Dashboard

Actions:

Drain Node
Cordone Node
Restart Deployment
Scale Deployment
Delete Pod
Rollout Restart
View YAML
Edit Manifest

Therefore the center architecture must evolve into:

Service Dashboard

Header
Health
Metrics

Tabs

[Overview]
[Operations]
[Configuration]
[Observability]
[Administration]

and the inspector becomes:

Selected Service Context
Recent Events
Audit Trail
Active Alerts
Pending Actions

This is the correct institutional control-terminal architecture and aligns with your goal of a control plane rather than a display board.

# COREI INFRASTRUCTURE OPERATIONS TERMINAL

## Institutional Control Plane Specification v1.0

---

# 1. PURPOSE

The Infrastructure Terminal is not a monitoring dashboard.

The Infrastructure Terminal is the operational control plane for the entire COREI platform.

It must provide:

* Visibility
* Control
* Configuration
* Administration
* Auditability
* Incident Response
* Capacity Management
* Change Management

for every infrastructure component.

---

# 2. TERMINAL STRUCTURE

## Left Navigation

Service Explorer

Grouped by domains.

```text
PLATFORM
DATA
STREAMING
OBSERVABILITY
SECURITY
DELIVERY
AUTOMATION
AI PLATFORM
STORAGE
NETWORK
RUNTIME
ALERTING
AUDIT
SYSTEM
```

Capabilities:

* Search
* Filter
* Pin Service
* Favorite Service
* Service Health Dot
* Alert Count
* Collapse Groups
* Expand Groups
* Drag Ordering

---

## Center Workspace

Dynamic Dashboard Workspace

Supports:

* Multi Dashboard View
* Grid Layout
* Fullscreen Dashboard
* Split View
* Floating Dashboard
* Saved Layouts
* Workspace Presets

Examples:

```text
Operations Workspace
Observability Workspace
Security Workspace
Incident Workspace
Deployment Workspace
```

---

## Right Inspector

Context Sensitive Inspector

Contains:

* Selected Service
* Health
* Recent Events
* Active Alerts
* Recent Changes
* Audit Trail
* Quick Actions
* Documentation Links

---

## Bottom Event Stream

Global Event Bus

Shows:

* Infrastructure Events
* Security Events
* Deployments
* Rollbacks
* Failures
* Alerts
* User Actions

Real Time.

---

# 3. GLOBAL TERMINAL FEATURES

Every service must support:

## Overview

Health

Metrics

Capacity

Status

Dependencies

Topology

Ownership

Version

Environment

---

## Operations

Start

Stop

Restart

Pause

Resume

Scale

Drain

Enable

Disable

Maintenance Mode

---

## Configuration

Runtime Settings

Environment Variables

Resource Limits

Secrets References

Policies

Schedules

Thresholds

Feature Flags

---

## Observability

Metrics

Logs

Traces

Events

Alert History

SLO

SLA

Latency

Errors

---

## Administration

Users

Roles

Permissions

Certificates

Backups

Retention

Audit Logs

Change History

---

# 4. PLATFORM DOMAIN

## Kubernetes

Overview

* Cluster Health
* Node Health
* Namespace Health
* Pod Health
* Deployment Health

Operations

* Restart Deployment
* Scale Deployment
* Delete Pod
* Rollout Restart
* Rollback
* Drain Node
* Cordon Node

Configuration

* View Manifest
* Edit Manifest
* Resource Limits
* HPA
* Affinity Rules

Observability

* Cluster Metrics
* Events
* Logs

Administration

* RBAC
* Service Accounts
* Certificates

---

## MetalLB

Overview

* Address Pools
* Assigned IPs
* Allocation Status

Operations

* Allocate
* Release
* Refresh

---

## Ingress

Overview

* Hosts
* Routes
* Certificates

Operations

* Reload
* Enable Route
* Disable Route

---

# 5. STREAMING DOMAIN

## Kafka

Overview

* Brokers
* Topics
* Partitions
* Consumer Groups

Operations

* Create Topic
* Delete Topic
* Pause Consumer
* Resume Consumer
* Rebalance
* Restart Broker

Configuration

* Retention
* Replication
* Compression

Observability

* Lag
* Throughput
* Broker Health

Administration

* ACL
* Audit

---

# 6. DATA DOMAIN

## PostgreSQL

Overview

* Connections
* Databases
* Replication
* Storage

Operations

* Backup
* Restore
* Restart

Configuration

* Memory
* WAL
* Replication

Observability

* Query Performance
* Locks
* Slow Queries

---

## TimescaleDB

Overview

* Hypertables
* Compression
* Retention

Operations

* Compression Jobs
* Retention Jobs

---

## Redis

Overview

* Memory
* Key Count
* Evictions

Operations

* Flush Cache
* Restart

---

# 7. OBSERVABILITY DOMAIN

## Prometheus

Overview

* Targets
* Rules
* Scrapes

Operations

* Reload
* Refresh Targets

---

## Grafana

Overview

* Dashboards
* Datasources
* Alerts

Operations

* Create Dashboard
* Clone Dashboard
* Export Dashboard

---

## Loki

Overview

* Streams
* Ingestion

Operations

* Query Logs
* Retention Management

---

## Jaeger

Overview

* Traces
* Services

Operations

* Trace Analysis

---

## OpenTelemetry

Overview

* Collectors
* Pipelines

Operations

* Reload Pipelines

---

# 8. SECURITY DOMAIN

## Vault

Overview

* Secret Engines
* Tokens
* Leases

Operations

* Create Secret
* Rotate Secret
* Revoke Token

Administration

* Policies
* Access Control

---

## Keycloak

Overview

* Realms
* Users
* Clients

Operations

* Create User
* Disable User
* Reset Credentials

---

## WireGuard

Overview

* Peers
* Tunnels

Operations

* Add Peer
* Remove Peer

---

# 9. DELIVERY DOMAIN

## Harbor

Overview

* Images
* Repositories

Operations

* Delete Image
* Scan Image

---

## ArgoCD

Overview

* Applications
* Sync Status

Operations

* Sync
* Refresh
* Rollback

---

## Trivy

Overview

* Vulnerabilities

Operations

* Scan

---

## Cosign

Overview

* Signatures

Operations

* Verify
* Sign

---

# 10. AUTOMATION DOMAIN

## n8n

Overview

* Workflows
* Executions
* Errors

Operations

* Enable Workflow
* Disable Workflow
* Execute Workflow

Configuration

* Credentials
* Variables

Observability

* Execution Metrics
* Error Tracking

---

# 11. AI PLATFORM DOMAIN

## Ollama

Overview

* Models
* Memory
* Requests

Operations

* Load Model
* Unload Model

---

## LLM Gateway

Overview

* Providers
* Routing

Operations

* Enable Provider
* Disable Provider

---

## AI Runtime

Overview

* Agents
* Queues

Operations

* Restart Agent
* Pause Agent

---

# 12. SYSTEM DOMAIN

## Cluster Health

* CPU
* Memory
* Storage
* Network

## Resource Health

* Utilization
* Saturation

## Network Health

* Latency
* Packet Loss

## Storage Health

* Capacity
* IOPS

## Event Stream

* Global Events
* Alert Feed

---

# 13. FUTURE PHASES

Phase 1
Visibility

Phase 2
Operational Control

Phase 3
Configuration Management

Phase 4
Change Management

Phase 5
Incident Response

Phase 6
Automation & Runbooks

Phase 7
AI Assisted Operations

Phase 8
Autonomous Operations
