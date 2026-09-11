# COREI PLATFORM — MACHINE SPECIFICATION
# STAGE 1 — MACHINE FOUNDATION

---

# MACHINE IDENTITY

| Field | Value |
|---|---|
| Hostname | core-node |
| Platform Root | /home/coreeye/corei |
| Environment Type | VMware VM |
| OS | Ubuntu 22.04.5 LTS |
| Kernel | 5.15.0-176-generic |
| Architecture | linux/amd64 |
| Deployment Mode | LOW RESOURCE |
| Stage Status | READY |
| Validation Status | PASS |

---

# HARDWARE PROFILE

## CPU

| Field | Value |
|---|---|
| CPU Cores | 4 |
| CPU Mode | Virtualized |
| Hypervisor | VMware |

---

## MEMORY

| Field | Value |
|---|---|
| Total RAM | 7GB |
| Swap | Disabled |
| Swappiness | 0 |

---

## STORAGE

| Field | Value |
|---|---|
| Root Disk | 57G |
| Free Disk | ~15G |
| Corei Storage Root | /var/corei |
| Backup Root | /home/coreeye/corei/backups |

---

# NETWORK PROFILE

| Field | Value |
|---|---|
| Hostname | core-node |
| Primary IP | 192.168.1.4 |
| Firewall | UFW Enabled |
| VPN Base | WireGuard Installed |
| IP Forwarding | Enabled |

---

# KERNEL FOUNDATION

## Kernel Modules

| Module | Status |
|---|---|
| overlay | Loaded |
| br_netfilter | Loaded |

---

## Kernel Persistence

| File | Purpose |
|---|---|
| /etc/modules-load.d/corei.conf | Persistent module loading |
| /etc/sysctl.d/corei.conf | Runtime kernel tuning |
| /etc/security/limits.d/corei.conf | System resource limits |

---

# SYSCTL CONFIGURATION

## Active Runtime Parameters

| Parameter | Value |
|---|---|
| net.ipv4.ip_forward | 1 |
| vm.swappiness | 0 |
| vm.max_map_count | 262144 |
| fs.file-max | 2097152 |
| fs.inotify.max_user_watches | 524288 |
| net.bridge.bridge-nf-call-iptables | 1 |

---

# SYSTEM LIMITS

| Limit | Value |
|---|---|
| nofile soft | 1048576 |
| nofile hard | 1048576 |
| nproc soft | 65535 |
| nproc hard | 65535 |
| memlock soft | unlimited |
| memlock hard | unlimited |

---

# CONTAINER RUNTIME STACK

## Docker Runtime

| Component | Version |
|---|---|
| Docker Engine | 29.4.3 |
| Docker API | 1.54 |
| containerd | v2.2.3 |
| runc | 1.3.5 |

---

## Runtime Design

| Layer | Runtime |
|---|---|
| Container Runtime | Docker CE |
| OCI Runtime | runc |
| Runtime Supervisor | containerd.io |

---

# PLATFORM TOOLCHAIN

| Tool | Version |
|---|---|
| Python | 3.10.12 |
| Go | 1.22.0 |
| Rust | 1.95.0 |
| kubectl | v1.36.0 |
| Helm | v3.20.2 |
| Terraform | v1.15.2 |
| GitHub CLI | v2.92.0 |

---

# TIME SYNCHRONIZATION

| Component | Status |
|---|---|
| Chrony | Active |
| NTP Sync | Enabled |

---

# SECURITY BASELINE

## Firewall Rules

| Port | Purpose |
|---|---|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 6443 | Kubernetes API |

---

## Security Components

| Component | Status |
|---|---|
| UFW | Enabled |
| WireGuard | Installed |
| Journald Limits | Configured |

---

# JOURNALD CONFIGURATION

| Parameter | Value |
|---|---|
| SystemMaxUse | 2G |
| MaxRetentionSec | 2week |

---

# DIRECTORY STRUCTURE

## Corei Workspace

```text
/home/coreeye/corei
├── infrastructure/
├── platform/
├── services/
├── schemas/
├── docs/
├── scripts/
├── tests/
├── backups/
├── logs/
└── repos/

# Infrastructure Runtime
/var/corei
├── data/
├── logs/
└── backups/

# INSTALLATION STATE SYSTEM
Component	Purpose
.install.state	Persistent execution checkpoints
install.log	Runtime installation logs
install.sh	Deterministic bootstrap orchestrator

# VALIDATION MODEL
Validation Guarantees
The Stage 1 installer validates:
 hostname integrity
 swap disablement
 kernel runtime parameters
 kernel module loading
 module persistence
 Docker daemon runtime
 Chrony runtime
 storage availability
 Kubernetes tooling
 Terraform tooling
 Helm tooling

# EXECUTION MODEL
Installer Characteristics
Capability		Status
Idempotent		Yes
Stateful		Yes
Resumable		Yes
Deterministic		Yes
Validation Driven	Yes
Runtime Verified	Yes

# MACHINE CLASSIFICATION
Current Classification
Attribute		Value
Environment		Development
Resource Tier		Low Resource
Production Ready	Partial
Kubernetes Ready	Yes
Docker Ready		Yes
Observability Ready	Partial

# PLATFORM READINESS
Completed Foundation Areas
machine bootstrap
kernel tuning
container runtime
firewall baseline
VPN baseline
persistent runtime configuration
deterministic validation
execution state orchestration
infrastructure reporting

# KNOWN LIMITATIONS
Current Constraints
running in VMware virtualized environment
low-resource memory profile (7GB RAM)
GitHub org repository creation permission pending
Kubernetes cluster not yet initialized
observability stack not yet installed

# AUTHORITATIVE STATUS
Layer			Status
Stage 1			COMPLETE
Validation		PASS
Runtime			HEALTHY
Bootstrap Framework	STABLE
