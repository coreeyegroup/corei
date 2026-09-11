COMPLETE INFRASTRUCTURE INSTALLATION KNOWLEDGE GUIDE
Trading Platform — Production Grade
Version 1.0 | For Internal Training & Reference

DOCUMENT PURPOSE & HOW TO USE THIS GUIDE
WHO THIS IS FOR:
├── New DevOps engineers joining the team
├── System administrators setting up the platform
├── Developers who need to understand infrastructure
└── Anyone rebuilding the platform from scratch

HOW TO USE:
├── Follow sections in ORDER — each depends on previous
├── Read IMPORTANT NOTES before executing commands
├── Every command is meant to be copy-paste ready
├── Variables in CAPS need to be replaced with your values
└── Run VERIFY steps after each section before moving on

CONVENTIONS USED:
├── # Comments explain WHY not just what
├── Variables: YOUR_VALUE_HERE = replace this
├── ✅ = success indicator
├── ❌ = failure indicator
├── ⚠️  = warning — read carefully
└── 💡 = tip or optimization

SECTION 0: PREREQUISITES & CONCEPTS

0.1 UNDERSTANDING THE ARCHITECTURE
BEFORE TOUCHING ANY SERVER — understand what we are building:

THE BIG PICTURE:
══════════════════════════════════════════════════════

YOUR LAPTOP
    │
    │ (WireGuard VPN tunnel — encrypted)
    │
    ▼
BASTION SERVER (only server with public internet IP)
    │
    │ (Private network — 10.0.1.0/24)
    │
    ▼
KUBERNETES CLUSTER
    ├── 3 Control Plane nodes (K8s brain)
    └── 5 Worker nodes (where apps run)
        ├── Worker-Trading-1,2  (trading microservices)
        ├── Worker-Data         (databases)
        ├── Worker-Kafka        (message streaming)
        └── Worker-Monitoring   (observability)

WHAT RUNS ON EACH WORKER:
Worker-Trading:
    └── All trading application services
        (strategy engine, order manager, etc)

Worker-Data:
    └── TimescaleDB (tick data)
        PostgreSQL  (business data)
        Redis       (cache + pub/sub)

Worker-Kafka:
    └── Kafka Cluster (3 brokers)
        Schema Registry
        Kafka UI

Worker-Monitoring:
    └── Prometheus  (metrics collection)
        Grafana     (dashboards)
        Loki        (log aggregation)
        Jaeger      (distributed tracing)
        ArgoCD      (GitOps deployment)
        Vault       (secret management)

WHY THIS LAYOUT:
├── Trading services on dedicated nodes = predictable latency
├── Databases on dedicated node = no CPU competition
├── Kafka isolated = high I/O does not affect trading
└── Monitoring isolated = observability always works
    even when trading services are stressed

0.2 NETWORK DESIGN
NETWORK LAYOUT:
══════════════════════════════════════════════════════

Public Internet
    └── Bastion: PUBLIC_IP (only public IP in system)

Private Network: 10.0.1.0/24 (all servers talk here)
    ├── 10.0.1.5    bastion
    ├── 10.0.1.10   k8s-master-1
    ├── 10.0.1.11   k8s-master-2
    ├── 10.0.1.12   k8s-master-3
    ├── 10.0.1.20   k8s-worker-trading-1
    ├── 10.0.1.21   k8s-worker-trading-2
    ├── 10.0.1.30   k8s-worker-data-1
    ├── 10.0.1.40   k8s-worker-kafka-1
    └── 10.0.1.50   k8s-worker-monitoring-1

WireGuard VPN Network: 10.8.0.0/24
    ├── 10.8.0.1    bastion (VPN server)
    ├── 10.8.0.2    your laptop
    ├── 10.8.0.3    second admin
    └── 10.8.0.4+   more team members

Kubernetes Pod Network: 10.42.0.0/16 (k3s default)
Kubernetes Service Network: 10.43.0.0/16 (k3s default)

PORTS THAT MATTER:
├── 22     SSH (only from VPN range)
├── 51820  WireGuard VPN (UDP, only on bastion)
├── 6443   Kubernetes API (only internal)
├── 2379   etcd (only between masters)
├── 9092   Kafka (only internal)
├── 5432   PostgreSQL (only internal)
├── 6379   Redis (only internal)
├── 8200   Vault (only internal)
└── 80/443 Web dashboard (internal only)

⚠️  IMPORTANT: NO trading ports are ever exposed
    to the public internet. Everything goes via VPN.

0.3 FILE SYSTEM LAYOUT — YOUR LOCAL MACHINE
bash# ═══════════════════════════════════════════════
# Create the complete project directory structure
# on YOUR LOCAL MACHINE before starting
# ═══════════════════════════════════════════════

# Create base directory
mkdir -p ~/trading-platform
cd ~/trading-platform

# Create complete directory tree
mkdir -p infrastructure/{terraform,kubernetes,scripts,database}
mkdir -p infrastructure/kubernetes/{namespaces,helm-values,apps,argocd,monitoring,network,storage,infra}
mkdir -p infrastructure/kubernetes/apps/{data-service,strategy-engine,order-manager,risk-engine,account-manager,broker-connector,portfolio-tracker,alert-service,api-gateway,frontend}
mkdir -p infrastructure/kubernetes/argocd/applications
mkdir -p infrastructure/database/{timescaledb,postgresql,redis}
mkdir -p infrastructure/scripts
mkdir -p docs/{runbooks,architecture,training}
mkdir -p services/{data-service,strategy-engine,order-manager,risk-engine,account-manager,broker-connector,portfolio-tracker,alert-service,api-gateway}
mkdir -p frontend

# Verify structure
find . -type d | head -60

# Initialize git repository
git init
git checkout -b main

# Create .gitignore
cat > .gitignore << 'EOF'
# Secrets — NEVER commit these
vault-init-keys.json
*.key
*.pem
*-secret.yaml
.env
.env.*

# Local tools
.kube/
*.tfstate
*.tfstate.backup
.terraform/

# Python
__pycache__/
*.pyc
venv/
.venv/

# Node
node_modules/
EOF

echo "✅ Project structure created"
echo "Location: ~/trading-platform"

0.4 TOOLS INSTALLATION — YOUR LOCAL MACHINE
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: ~/trading-platform/infrastructure/scripts/install-local-tools.sh
# PURPOSE: Install all tools needed on your laptop
#          to manage the trading platform
# OS: Ubuntu/Debian (adapt for Mac with brew)
# ═══════════════════════════════════════════════

set -e  # Exit on any error

echo "═══════════════════════════════════════════"
echo " Installing Local Management Tools"
echo "═══════════════════════════════════════════"

# ─── 1. KUBECTL ──────────────────────────────────
# kubectl = command line tool to talk to Kubernetes
# Used for: checking pods, logs, debugging, applying configs
echo ""
echo "Installing kubectl..."

# Get latest stable version number
KUBECTL_VERSION=$(curl -L -s \
  https://dl.k8s.io/release/stable.txt)
echo "Latest kubectl version: $KUBECTL_VERSION"

# Download binary
curl -LO \
  "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"

# Verify download integrity
curl -LO \
  "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
# Expected output: kubectl: OK

# Install
chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl
rm kubectl.sha256

# Verify
kubectl version --client
echo "✅ kubectl installed"

# ─── 2. HELM ─────────────────────────────────────
# helm = package manager for Kubernetes
# Like apt/brew but for K8s applications
# Used for: installing Kafka, PostgreSQL, Prometheus etc
echo ""
echo "Installing Helm..."

curl -fsSL -o get_helm.sh \
  https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
rm get_helm.sh

# Verify
helm version
echo "✅ Helm installed"

# ─── 3. K9S ──────────────────────────────────────
# k9s = terminal-based Kubernetes dashboard
# Like htop but for Kubernetes
# Used for: real-time monitoring, pod logs, exec into pods
echo ""
echo "Installing k9s..."

K9S_VERSION=$(curl -s \
  https://api.github.com/repos/derailed/k9s/releases/latest \
  | grep '"tag_name"' \
  | sed -E 's/.*"([^"]+)".*/\1/')

curl -L \
  "https://github.com/derailed/k9s/releases/download/${K9S_VERSION}/k9s_Linux_amd64.tar.gz" \
  -o k9s.tar.gz
tar -xzf k9s.tar.gz k9s
sudo mv k9s /usr/local/bin/k9s
rm k9s.tar.gz

# Verify
k9s version
echo "✅ k9s installed"

# ─── 4. TERRAFORM ────────────────────────────────
# terraform = Infrastructure as Code tool
# Used for: provisioning servers at cloud providers
# Not strictly required if manually provisioning servers
echo ""
echo "Installing Terraform..."

TERRAFORM_VERSION="1.7.4"
wget -q \
  "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip"
unzip -q terraform_${TERRAFORM_VERSION}_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm terraform_${TERRAFORM_VERSION}_linux_amd64.zip

# Verify
terraform version
echo "✅ Terraform installed"

# ─── 5. VAULT CLI ────────────────────────────────
# vault = CLI tool to interact with HashiCorp Vault
# Used for: reading/writing secrets, managing policies
echo ""
echo "Installing Vault CLI..."

VAULT_VERSION="1.15.4"
wget -q \
  "https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip"
unzip -q vault_${VAULT_VERSION}_linux_amd64.zip
sudo mv vault /usr/local/bin/
rm vault_${VAULT_VERSION}_linux_amd64.zip

# Verify
vault version
echo "✅ Vault CLI installed"

# ─── 6. ARGOCD CLI ───────────────────────────────
# argocd = CLI to interact with ArgoCD GitOps server
# Used for: deploying apps, checking sync status
echo ""
echo "Installing ArgoCD CLI..."

ARGOCD_VERSION=$(curl -s \
  https://api.github.com/repos/argoproj/argo-cd/releases/latest \
  | grep '"tag_name"' \
  | sed -E 's/.*"([^"]+)".*/\1/')

curl -sSL -o argocd \
  "https://github.com/argoproj/argo-cd/releases/download/${ARGOCD_VERSION}/argocd-linux-amd64"
chmod +x argocd
sudo mv argocd /usr/local/bin/

# Verify
argocd version --client
echo "✅ ArgoCD CLI installed"

# ─── 7. WIREGUARD ────────────────────────────────
# wireguard = VPN for secure server access
# Used for: connecting to private server network
echo ""
echo "Installing WireGuard..."

sudo apt-get update -qq
sudo apt-get install -y wireguard wireguard-tools

# Verify
wg --version
echo "✅ WireGuard installed"

# ─── 8. ADDITIONAL USEFUL TOOLS ──────────────────
echo ""
echo "Installing additional tools..."

sudo apt-get install -y \
  jq \          # JSON processing in terminal
  yq \          # YAML processing in terminal
  httpie \      # Better curl for API testing
  watch \       # Run command repeatedly
  mtr \         # Network diagnostic
  nmap \        # Network scanner
  netcat \      # Network utility
  python3 \     # Python for scripts
  python3-pip   # Python package installer

pip3 install \
  pyyaml \      # YAML parsing in Python
  requests \    # HTTP client
  psycopg2-binary  # PostgreSQL client

echo ""
echo "═══════════════════════════════════════════"
echo "✅ ALL TOOLS INSTALLED SUCCESSFULLY"
echo "═══════════════════════════════════════════"
echo ""
echo "Installed versions:"
kubectl version --client --short
helm version --short
k9s version
terraform version -json | jq -r '.terraform_version'
vault version
argocd version --client -o json | jq -r '.client.Version'
wg --version
echo ""
echo "Next step: Setup WireGuard VPN"

SECTION 1: SERVER PROVISIONING

1.1 SERVER ORDER SPECIFICATION
═══════════════════════════════════════════════════════════
SERVERS TO ORDER FROM YOUR PROVIDER
(Hetzner, OVH, Equinix Metal, AWS EC2, etc.)
═══════════════════════════════════════════════════════════

SERVER 1: bastion
─────────────────
Purpose:   Only server with public IP
           Jump host for all SSH access
           WireGuard VPN endpoint
CPU:       2 cores
RAM:       4 GB
Storage:   50 GB SSD
Network:   1 Gbps, 1 PUBLIC IP
OS:        Ubuntu 22.04 LTS 64-bit
Hostname:  bastion
Notes:     This server MUST have a public IP
           All other servers only need private IPs

SERVERS 2,3,4: k8s-master-1, k8s-master-2, k8s-master-3
─────────────────────────────────────────────────────────
Purpose:   Kubernetes control plane
           Manages the entire cluster
           Stores cluster state in etcd database
CPU:       4 cores
RAM:       8 GB
Storage:   100 GB SSD
Network:   1 Gbps, PRIVATE IP only
OS:        Ubuntu 22.04 LTS 64-bit
Hostnames: k8s-master-1, k8s-master-2, k8s-master-3
Notes:     3 masters = HA control plane
           Cluster survives loss of 1 master
           Do NOT run application workloads here

SERVERS 5,6: k8s-worker-trading-1, k8s-worker-trading-2
─────────────────────────────────────────────────────────
Purpose:   Runs all trading application services
           Strategy engine, order manager, risk engine
           Account manager, broker connector etc
CPU:       16 cores (trading algos are CPU intensive)
RAM:       64 GB
Storage:   500 GB NVMe SSD (fast for local caching)
Network:   10 Gbps (low latency to brokers)
OS:        Ubuntu 22.04 LTS 64-bit
Hostnames: k8s-worker-trading-1, k8s-worker-trading-2
Notes:     NVMe SSD critical for low I/O latency
           10Gbps network critical for fast order routing
           Two nodes = redundancy, if 1 fails trading continues

SERVER 7: k8s-worker-data-1
─────────────────────────────────────────────────────────
Purpose:   TimescaleDB (tick data storage)
           PostgreSQL (business data)
           Redis (cache)
CPU:       16 cores
RAM:       64 GB (databases love RAM — bigger = faster)
Storage:   2 TB NVMe SSD (stores years of tick data)
Network:   10 Gbps
OS:        Ubuntu 22.04 LTS 64-bit
Hostname:  k8s-worker-data-1
Notes:     2TB because tick data grows fast
           ~10GB per day per 10 symbols = grows quickly
           Plan for expansion

SERVER 8: k8s-worker-kafka-1
─────────────────────────────────────────────────────────
Purpose:   Apache Kafka message streaming
           Schema Registry
           Kafka UI management console
CPU:       16 cores (Kafka is CPU intensive)
RAM:       32 GB
Storage:   1 TB NVMe SSD (Kafka message log)
Network:   10 Gbps (millions of messages/sec)
OS:        Ubuntu 22.04 LTS 64-bit
Hostname:  k8s-worker-kafka-1
Notes:     NVMe SSD mandatory for Kafka performance
           1TB fills up if retention is long
           Monitor disk usage closely

SERVER 9: k8s-worker-monitoring-1
─────────────────────────────────────────────────────────
Purpose:   Prometheus (metrics)
           Grafana (dashboards)
           Loki (logs)
           Jaeger (tracing)
           ArgoCD (deployments)
           Vault (secrets)
CPU:       8 cores
RAM:       32 GB
Storage:   500 GB SSD
Network:   1 Gbps
OS:        Ubuntu 22.04 LTS 64-bit
Hostname:  k8s-worker-monitoring-1
Notes:     Metrics data grows over time
           500GB holds ~30 days of detailed metrics

═══════════════════════════════════════════════════════════
TOTAL: 9 SERVERS
Monthly cost estimate:
  Budget setup (Hetzner):    ~$500-800/month
  Mid-range (OVH):           ~$1,500-2,500/month
  Production (Equinix):      ~$3,000-6,000/month
═══════════════════════════════════════════════════════════

1.2 INITIAL SERVER SETUP SCRIPT
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/01-setup-server.sh
#
# PURPOSE:
#   Prepare a fresh Ubuntu 22.04 server for use
#   as part of the trading platform cluster.
#   This script hardens security, installs required
#   kernel modules, and configures system settings
#   that Kubernetes needs to function.
#
# RUN ON: EVERY server (all 9)
# RUN AS: root (initial login)
#
# HOW TO USE:
#   1. SSH into server as root
#   2. Copy this script to server
#   3. Edit variables at top of script
#   4. Run: bash 01-setup-server.sh
#   5. Server will reboot at end
#
# WHAT IT DOES:
#   - Creates admin user with SSH key auth
#   - Disables root login and password auth
#   - Configures UFW firewall
#   - Disables swap (required by Kubernetes)
#   - Loads kernel modules needed by K8s
#   - Sets kernel parameters for networking
#   - Installs and configures containerd
#   - Configures time synchronization
#   - Sets up /etc/hosts for cluster discovery
# ═══════════════════════════════════════════════

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# ─── CONFIGURATION — EDIT THESE ──────────────────

# Your SSH public key (from: cat ~/.ssh/id_rsa.pub)
# Or generate one: ssh-keygen -t ed25519 -C "trading-platform"
SSH_PUBLIC_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... your-key-here"

# Username for the admin account
ADMIN_USER="trader"

# This server's hostname (change per server)
# Options: bastion, k8s-master-1, k8s-master-2, k8s-master-3,
#          k8s-worker-trading-1, k8s-worker-trading-2,
#          k8s-worker-data-1, k8s-worker-kafka-1,
#          k8s-worker-monitoring-1
THIS_HOSTNAME="k8s-master-1"

# This server's role (for K8s node labels later)
# Options: bastion, master, trading, data, kafka, monitoring
THIS_ROLE="master"

# ─── PRIVATE IPs OF ALL CLUSTER SERVERS ──────────
# IMPORTANT: Update these with YOUR actual private IPs
# You get these from your server provider's dashboard
BASTION_IP="10.0.1.5"
MASTER1_IP="10.0.1.10"
MASTER2_IP="10.0.1.11"
MASTER3_IP="10.0.1.12"
WORKER_TRADING1_IP="10.0.1.20"
WORKER_TRADING2_IP="10.0.1.21"
WORKER_DATA1_IP="10.0.1.30"
WORKER_KAFKA1_IP="10.0.1.40"
WORKER_MONITORING1_IP="10.0.1.50"

# ─── SCRIPT STARTS HERE ──────────────────────────
echo "═══════════════════════════════════════════"
echo " Setting up server: $THIS_HOSTNAME"
echo " Role: $THIS_ROLE"
echo "═══════════════════════════════════════════"

# Confirm before proceeding
read -p "⚠️  This will modify system settings. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "Aborted."
  exit 0
fi

# ─── STEP 1: SET HOSTNAME ─────────────────────────
echo ""
echo "Step 1: Setting hostname to $THIS_HOSTNAME..."

hostnamectl set-hostname "$THIS_HOSTNAME"

# Add to hosts file if not already there
if ! grep -q "127.0.1.1 $THIS_HOSTNAME" /etc/hosts; then
  echo "127.0.1.1 $THIS_HOSTNAME" >> /etc/hosts
fi

echo "✅ Hostname set to: $(hostname)"

# ─── STEP 2: CREATE ADMIN USER ───────────────────
echo ""
echo "Step 2: Creating admin user: $ADMIN_USER..."

# Create user with home directory and bash shell
useradd -m -s /bin/bash -G sudo "$ADMIN_USER" 2>/dev/null || \
  echo "User $ADMIN_USER already exists, updating..."

# Create SSH directory
mkdir -p /home/$ADMIN_USER/.ssh

# Install SSH public key
echo "$SSH_PUBLIC_KEY" > /home/$ADMIN_USER/.ssh/authorized_keys

# Set correct permissions
# .ssh directory: 700 = only owner can read/write/execute
# authorized_keys: 600 = only owner can read/write
chown -R $ADMIN_USER:$ADMIN_USER /home/$ADMIN_USER/.ssh
chmod 700 /home/$ADMIN_USER/.ssh
chmod 600 /home/$ADMIN_USER/.ssh/authorized_keys

# Allow sudo without password (convenient for scripts)
echo "$ADMIN_USER ALL=(ALL) NOPASSWD:ALL" > \
  /etc/sudoers.d/$ADMIN_USER
chmod 440 /etc/sudoers.d/$ADMIN_USER

echo "✅ User $ADMIN_USER created with SSH key"

# ─── STEP 3: HARDEN SSH ──────────────────────────
echo ""
echo "Step 3: Hardening SSH configuration..."

# Backup original SSH config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d)

cat > /etc/ssh/sshd_config << EOF
# SSH Server Configuration
# Trading Platform — Hardened

# Port and Protocol
Port 22
Protocol 2
AddressFamily inet

# Host Keys
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key

# Authentication Settings
PermitRootLogin no           # Never login as root
PasswordAuthentication no    # Only SSH keys allowed
PubkeyAuthentication yes     # SSH key authentication ON
AuthorizedKeysFile .ssh/authorized_keys

# Security Settings
X11Forwarding no             # Disable X11 (not needed)
AllowTcpForwarding no        # Disable port forwarding
GatewayPorts no
PermitTunnel no

# Connection Limits
MaxAuthTries 3               # Lockout after 3 failed attempts
MaxSessions 5                # Max 5 sessions per connection
LoginGraceTime 30            # 30 sec to authenticate

# Keep-alive
ClientAliveInterval 300      # Check client every 5 min
ClientAliveCountMax 2        # Disconnect after 2 missed checks

# Logging
SyslogFacility AUTH
LogLevel VERBOSE             # Verbose for security auditing

# Allowed Users
AllowUsers $ADMIN_USER

# Banner (shows legal warning on login)
Banner /etc/ssh/banner
EOF

# Create login banner
cat > /etc/ssh/banner << 'EOF'
╔══════════════════════════════════════════════════╗
║     TRADING PLATFORM — AUTHORIZED ACCESS ONLY   ║
║     All activities are logged and monitored     ║
╚══════════════════════════════════════════════════╝
EOF

# Restart SSH (keep existing connection alive)
systemctl restart sshd
echo "✅ SSH hardened"

# ─── STEP 4: CONFIGURE FIREWALL ──────────────────
echo ""
echo "Step 4: Configuring UFW firewall..."

apt-get install -y ufw -qq

# Reset all rules
ufw --force reset

# Default policies
ufw default deny incoming    # Block all inbound by default
ufw default allow outgoing   # Allow all outbound

# Allow SSH from private network only
# After VPN is set up, we will restrict further
ufw allow from 10.0.0.0/8 to any port 22 comment "SSH from private network"

# Allow all traffic from private cluster network
# (servers need to talk to each other freely)
ufw allow from 10.0.0.0/8 comment "Private cluster network"

# Enable UFW
ufw --force enable

# Check status
ufw status verbose
echo "✅ Firewall configured"

# ─── STEP 5: UPDATE SYSTEM ───────────────────────
echo ""
echo "Step 5: Updating system packages..."

apt-get update -y
apt-get upgrade -y
apt-get autoremove -y
apt-get autoclean

# Install useful tools
apt-get install -y \
  curl \          # HTTP client
  wget \          # File downloader
  git \           # Version control
  vim \           # Text editor
  htop \          # Process monitor
  iotop \         # Disk I/O monitor
  nethogs \       # Network usage per process
  net-tools \     # ifconfig, netstat
  nmap \          # Network scanner
  tcpdump \       # Packet capture
  telnet \        # Connection testing
  dnsutils \      # dig, nslookup
  apt-transport-https \
  ca-certificates \
  gnupg \
  lsb-release \
  software-properties-common \
  nfs-common \    # NFS client (for Longhorn storage)
  open-iscsi \    # iSCSI (for Longhorn storage)
  socat \         # Required by K8s
  conntrack \     # Connection tracking
  ipset \         # IP sets for iptables
  jq              # JSON processing

echo "✅ System updated and tools installed"

# ─── STEP 6: DISABLE SWAP ────────────────────────
echo ""
echo "Step 6: Disabling swap..."
# WHY: Kubernetes requires swap to be OFF
# Kubernetes manages memory allocation itself
# If swap is on, K8s memory limits become unreliable

# Disable swap immediately
swapoff -a

# Comment out swap entries in fstab
# This prevents swap from re-enabling after reboot
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Verify swap is disabled
free -h
# You should see: Swap: 0B 0B 0B

echo "✅ Swap disabled"

# ─── STEP 7: KERNEL MODULES ──────────────────────
echo ""
echo "Step 7: Loading required kernel modules..."
# WHY: These modules are required for:
# - overlay: Container filesystem layers
# - br_netfilter: Bridge network filtering
#   (needed for K8s network policies)

cat > /etc/modules-load.d/k8s.conf << 'EOF'
# Kubernetes required kernel modules
overlay
br_netfilter
EOF

# Load modules immediately (not waiting for reboot)
modprobe overlay
modprobe br_netfilter

# Verify modules loaded
lsmod | grep overlay
lsmod | grep br_netfilter

echo "✅ Kernel modules loaded"

# ─── STEP 8: KERNEL PARAMETERS ───────────────────
echo ""
echo "Step 8: Setting kernel parameters..."
# WHY: These settings are required for:
# - bridge-nf-call-iptables: Allows K8s to use
#   iptables for network policies
# - ip_forward: Allows packet routing between pods
# - Other settings optimize for high-performance
#   network throughput needed in trading

cat > /etc/sysctl.d/99-k8s-trading.conf << 'EOF'
# ═══════════════════════════════════════════════
# Kubernetes Required Settings
# ═══════════════════════════════════════════════

# Enable bridge network filtering
# Required for K8s network policies
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1

# Enable IP forwarding
# Required for pod-to-pod communication
net.ipv4.ip_forward = 1

# ═══════════════════════════════════════════════
# Network Performance Tuning for Trading
# ═══════════════════════════════════════════════

# TCP Keep-alive settings
# Detects dead connections faster
net.ipv4.tcp_keepalive_time    = 600
net.ipv4.tcp_keepalive_intvl   = 60
net.ipv4.tcp_keepalive_probes  = 9

# TCP Buffer sizes (for high throughput)
net.core.rmem_max              = 134217728
net.core.wmem_max              = 134217728
net.ipv4.tcp_rmem              = 4096 87380 134217728
net.ipv4.tcp_wmem              = 4096 65536 134217728

# Network queue sizes
net.core.netdev_max_backlog    = 300000
net.core.somaxconn             = 65535
net.ipv4.tcp_max_syn_backlog   = 65535

# Reduce TIME_WAIT connections
net.ipv4.tcp_tw_reuse          = 1
net.ipv4.tcp_fin_timeout       = 15

# ═══════════════════════════════════════════════
# Memory Settings
# ═══════════════════════════════════════════════

# Disable swap usage in kernel
vm.swappiness = 0

# Elasticsearch/Kafka requirement
vm.max_map_count = 262144

# ═══════════════════════════════════════════════
# File Descriptor Limits
# ═══════════════════════════════════════════════

# Maximum open files system-wide
fs.file-max                    = 2097152

# Inotify limits (for K8s file watching)
fs.inotify.max_user_watches    = 524288
fs.inotify.max_user_instances  = 512
fs.inotify.max_queued_events   = 16384
EOF

# Apply settings immediately
sysctl --system

# Verify key settings
echo "Verifying kernel parameters..."
sysctl net.bridge.bridge-nf-call-iptables  # Should be 1
sysctl net.ipv4.ip_forward                 # Should be 1
sysctl vm.swappiness                       # Should be 0

echo "✅ Kernel parameters configured"

# ─── STEP 9: INSTALL CONTAINERD ──────────────────
echo ""
echo "Step 9: Installing containerd (container runtime)..."
# WHY: Containerd is the container runtime
# K8s uses it to start/stop containers
# Replaced Docker in modern K8s setups

# Install containerd
apt-get install -y containerd

# Create containerd config directory
mkdir -p /etc/containerd

# Generate default config
containerd config default | tee /etc/containerd/config.toml

# CRITICAL CHANGE: Enable SystemdCgroup
# WHY: K8s requires SystemdCgroup for proper
# resource management. Without this, pod limits
# won't work correctly.
sed -i \
  's/SystemdCgroup = false/SystemdCgroup = true/' \
  /etc/containerd/config.toml

# Verify the change was made
grep "SystemdCgroup" /etc/containerd/config.toml
# Should show: SystemdCgroup = true

# Restart containerd with new config
systemctl restart containerd
systemctl enable containerd

# Verify containerd is running
systemctl status containerd | head -20
# Should show: Active: active (running)

echo "✅ Containerd installed and configured"

# ─── STEP 10: TIME SYNCHRONIZATION ───────────────
echo ""
echo "Step 10: Configuring time synchronization..."
# WHY: All trading servers MUST have exactly
# synchronized time. A 1-second clock drift
# can cause tick data timestamps to be wrong,
# trade logs to be out of order, and Kafka
# message ordering to break.
# Target: All servers within 1ms of each other

apt-get install -y chrony

# Configure chrony with reliable time servers
cat > /etc/chrony.conf << 'EOF'
# Use Google's highly accurate NTP servers
# These have better accuracy than pool.ntp.org
server time1.google.com iburst minpoll 4 maxpoll 6
server time2.google.com iburst minpoll 4 maxpoll 6
server time3.google.com iburst minpoll 4 maxpoll 6
server time4.google.com iburst minpoll 4 maxpoll 6

# Backup NTP pools if Google is unreachable
pool pool.ntp.org iburst

# Record the rate at which the system clock
# gains/loses time
driftfile /var/lib/chrony/drift

# Allow the system clock to be stepped in the
# first 3 clock updates if offset > 1.0 second
makestep 1.0 3

# Synchronize hardware clock
rtcsync

# Logging
logdir /var/log/chrony
log measurements statistics tracking
EOF

# Restart and enable chrony
systemctl restart chrony
systemctl enable chrony

# Force immediate sync
chronyc makestep

# Wait a moment for sync
sleep 5

# Verify time synchronization
echo "Time sync status:"
chronyc tracking
# IMPORTANT: Check these values:
# - "System time" should be very small (< 0.001 seconds)
# - "Stratum" should be 2 (means synced to a primary source)
# - "Reference ID" should show a Google server

echo "Current time: $(date -u +"%Y-%m-%d %H:%M:%S.%3N UTC")"
echo "✅ Time synchronization configured"

# ─── STEP 11: CONFIGURE /etc/hosts ───────────────
echo ""
echo "Step 11: Configuring /etc/hosts for cluster..."
# WHY: We use /etc/hosts for cluster node discovery
# This is faster than DNS and works even if DNS fails
# All servers need to know each other's IPs by name

cat >> /etc/hosts << EOF

# ═══════════════════════════════════════════════
# Trading Platform Cluster Nodes
# ═══════════════════════════════════════════════
$BASTION_IP          bastion
$MASTER1_IP          k8s-master-1
$MASTER2_IP          k8s-master-2
$MASTER3_IP          k8s-master-3
$WORKER_TRADING1_IP  k8s-worker-trading-1
$WORKER_TRADING2_IP  k8s-worker-trading-2
$WORKER_DATA1_IP     k8s-worker-data-1
$WORKER_KAFKA1_IP    k8s-worker-kafka-1
$WORKER_MONITORING1_IP k8s-worker-monitoring-1
EOF

# Verify hosts file
echo "Cluster hosts:"
cat /etc/hosts | grep -A 20 "Trading Platform"

# Test name resolution
ping -c 1 k8s-master-1
echo "✅ /etc/hosts configured"

# ─── STEP 12: CONFIGURE OPEN ISCSI ───────────────
echo ""
echo "Step 12: Configuring iSCSI (for Longhorn storage)..."
# WHY: Longhorn distributed storage uses iSCSI
# for block storage volumes. Must be configured
# before Longhorn is installed.

systemctl enable iscsid
systemctl start iscsid
systemctl status iscsid | head -5

echo "✅ iSCSI configured"

# ─── STEP 13: SAVE SERVER METADATA ───────────────
echo ""
echo "Step 13: Saving server metadata..."

# Save server role for reference
cat > /etc/trading-platform-node << EOF
HOSTNAME=$THIS_HOSTNAME
ROLE=$THIS_ROLE
SETUP_DATE=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
SETUP_BY=$(who am i | awk '{print $1}')
PLATFORM_VERSION=1.0.0
EOF

cat /etc/trading-platform-node
echo "✅ Server metadata saved"

# ─── FINAL SUMMARY ───────────────────────────────
echo ""
echo "═══════════════════════════════════════════"
echo "✅ SERVER SETUP COMPLETE: $THIS_HOSTNAME"
echo "═══════════════════════════════════════════"
echo ""
echo "Summary of changes made:"
echo "  ✅ Hostname: $THIS_HOSTNAME"
echo "  ✅ Admin user: $ADMIN_USER (SSH key auth only)"
echo "  ✅ Root login: DISABLED"
echo "  ✅ Password auth: DISABLED"
echo "  ✅ Firewall: UFW enabled, private network only"
echo "  ✅ Swap: DISABLED"
echo "  ✅ Kernel modules: overlay, br_netfilter"
echo "  ✅ Kernel params: K8s + trading optimized"
echo "  ✅ Containerd: installed, SystemdCgroup=true"
echo "  ✅ Time sync: chrony with Google NTP"
echo "  ✅ /etc/hosts: all cluster nodes"
echo "  ✅ iSCSI: enabled for Longhorn"
echo ""
echo "⚠️  REBOOTING IN 10 SECONDS..."
echo "    Reconnect after reboot as: $ADMIN_USER"
echo "    SSH: ssh $ADMIN_USER@$(hostname -I | awk '{print $1}')"
sleep 10
reboot

1.3 POST-REBOOT VERIFICATION
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/02-verify-server.sh
# PURPOSE: Verify server is correctly configured
#          after setup and reboot
# RUN ON: Each server after running setup script
# RUN AS: admin user (trader)
# ═══════════════════════════════════════════════

echo "═══════════════════════════════════════════"
echo " Verifying Server Configuration"
echo " Server: $(hostname)"
echo "═══════════════════════════════════════════"

PASS=0
FAIL=0

check() {
  local desc="$1"
  local cmd="$2"
  if eval "$cmd" > /dev/null 2>&1; then
    echo "  ✅ $desc"
    ((PASS++))
  else
    echo "  ❌ FAILED: $desc"
    ((FAIL++))
  fi
}

echo ""
echo "─── Basic System ────────────────────────────"
check "Hostname set correctly" \
  "hostname | grep -E 'k8s-|bastion'"

check "Swap is disabled" \
  "free | grep Swap | awk '{print \$2}' | grep -q '^0$'"

check "Admin user exists" \
  "id trader"

check "Sudo without password works" \
  "sudo ls /root"

echo ""
echo "─── SSH Configuration ───────────────────────"
check "Root login disabled" \
  "grep 'PermitRootLogin no' /etc/ssh/sshd_config"

check "Password auth disabled" \
  "grep 'PasswordAuthentication no' /etc/ssh/sshd_config"

check "SSH service running" \
  "systemctl is-active sshd"

echo ""
echo "─── Firewall ────────────────────────────────"
check "UFW is active" \
  "sudo ufw status | grep 'Status: active'"

echo ""
echo "─── Kernel Modules ──────────────────────────"
check "overlay module loaded" \
  "lsmod | grep overlay"

check "br_netfilter module loaded" \
  "lsmod | grep br_netfilter"

echo ""
echo "─── Kernel Parameters ───────────────────────"
check "IP forwarding enabled" \
  "sysctl net.ipv4.ip_forward | grep '= 1'"

check "Bridge netfilter enabled" \
  "sysctl net.bridge.bridge-nf-call-iptables | grep '= 1'"

check "Swappiness is 0" \
  "sysctl vm.swappiness | grep '= 0'"

echo ""
echo "─── Container Runtime ───────────────────────"
check "Containerd installed" \
  "which containerd"

check "Containerd running" \
  "systemctl is-active containerd"

check "SystemdCgroup enabled" \
  "grep 'SystemdCgroup = true' /etc/containerd/config.toml"

echo ""
echo "─── Time Synchronization ────────────────────"
check "Chrony running" \
  "systemctl is-active chrony"

check "Time is synced" \
  "chronyc tracking | grep 'Reference ID' | grep -v '00000000'"

OFFSET=$(chronyc tracking | grep "System time" | \
  awk '{print $4}')
echo "  ℹ️  Time offset: ${OFFSET} seconds"

echo ""
echo "─── Network ─────────────────────────────────"
check "Can reach k8s-master-1" \
  "ping -c 1 -W 2 k8s-master-1"

check "iSCSI daemon running" \
  "systemctl is-active iscsid"

echo ""
echo "═══════════════════════════════════════════"
if [ $FAIL -eq 0 ]; then
  echo "✅ ALL CHECKS PASSED ($PASS/$PASS)"
  echo "  Server ready for Kubernetes installation"
else
  echo "❌ $FAIL CHECKS FAILED ($PASS/$((PASS+FAIL)))"
  echo "  Fix failures before installing Kubernetes"
fi
echo "═══════════════════════════════════════════"

SECTION 2: WIREGUARD VPN — COMPLETE SETUP
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/03-setup-wireguard.sh
#
# PURPOSE:
#   Set up WireGuard VPN on the bastion server
#   and create client configs for admin access.
#
# WHAT IS WIREGUARD:
#   WireGuard is a modern VPN protocol.
#   It creates an encrypted tunnel between your
#   laptop and the bastion server, giving you
#   access to the private server network.
#   Think of it as a secure bridge from your
#   laptop into the private data center.
#
# ARCHITECTURE:
#   Your laptop (10.8.0.2)
#       ↕ encrypted WireGuard tunnel
#   Bastion (10.8.0.1) — VPN server
#       ↕ routes traffic
#   Private network (10.0.1.0/24)
#       → All cluster servers
#
# RUN ON: Bastion server first, then local machine
# RUN AS: trader (admin user)
# ═══════════════════════════════════════════════

# ════════════════════════════════════════════════
# PART A: RUN ON BASTION SERVER
# SSH to bastion first: ssh trader@BASTION_PUBLIC_IP
# ════════════════════════════════════════════════

setup_wireguard_server() {
  echo "═══════════════════════════════════════════"
  echo " Setting up WireGuard SERVER on Bastion"
  echo "═══════════════════════════════════════════"

  # ─── INSTALL WIREGUARD ───────────────────────
  echo "Installing WireGuard..."
  sudo apt-get update -qq
  sudo apt-get install -y wireguard wireguard-tools

  # Verify installation
  which wg
  which wg-quick
  echo "✅ WireGuard installed"

  # ─── GENERATE SERVER KEYS ────────────────────
  echo ""
  echo "Generating server keys..."

  # Navigate to WireGuard config directory
  cd /etc/wireguard

  # Generate private key
  # wg genkey = generates a random 256-bit private key
  sudo wg genkey > server_private.key

  # Generate public key from private key
  # wg pubkey = derives the public key
  sudo wg pubkey < server_private.key > server_public.key

  # Set restrictive permissions (private key must be secret)
  sudo chmod 600 server_private.key
  sudo chmod 644 server_public.key

  # Display keys (you need to save the public key)
  echo ""
  echo "SERVER PRIVATE KEY (keep secret, stored on server):"
  sudo cat server_private.key

  echo ""
  echo "SERVER PUBLIC KEY (share with clients):"
  sudo cat server_public.key

  SERVER_PRIVATE=$(sudo cat server_private.key)
  SERVER_PUBLIC=$(sudo cat server_public.key)

  # ─── GENERATE CLIENT KEYS ────────────────────
  echo ""
  echo "Generating client keys (Admin 1)..."

  sudo wg genkey > client1_private.key
  sudo wg pubkey < client1_private.key > client1_public.key
  sudo chmod 600 client1_private.key

  CLIENT1_PRIVATE=$(sudo cat client1_private.key)
  CLIENT1_PUBLIC=$(sudo cat client1_public.key)

  echo "CLIENT 1 PRIVATE KEY (goes in client config):"
  echo "$CLIENT1_PRIVATE"

  echo ""
  echo "CLIENT 1 PUBLIC KEY (goes in server config):"
  echo "$CLIENT1_PUBLIC"

  # ─── CREATE SERVER CONFIG ────────────────────
  echo ""
  echo "Creating server configuration..."

  # Get the network interface name
  # (usually eth0 or ens3 — check with: ip link show)
  NET_INTERFACE=$(ip -o -4 route show to default | \
    awk '{print $5}' | head -1)
  echo "Detected network interface: $NET_INTERFACE"

  sudo cat > /etc/wireguard/wg0.conf << EOF
# ═══════════════════════════════════════════════
# WireGuard Server Configuration — Bastion
# FILE: /etc/wireguard/wg0.conf
# ═══════════════════════════════════════════════

[Interface]
# VPN IP address of this server
Address = 10.8.0.1/24

# Port to listen on (WireGuard uses UDP)
ListenPort = 51820

# Server's private key
PrivateKey = $SERVER_PRIVATE

# Firewall rules — run when WireGuard starts/stops
# These rules:
# 1. Allow forwarding packets through WireGuard
# 2. Allow clients to reach the private 10.0.1.0/24 network
# 3. Masquerade client traffic (NAT)

PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; \\
         iptables -A FORWARD -o wg0 -j ACCEPT; \\
         iptables -t nat -A POSTROUTING -o $NET_INTERFACE -j MASQUERADE; \\
         iptables -A FORWARD -i $NET_INTERFACE -o wg0 \\
           -m state --state RELATED,ESTABLISHED -j ACCEPT

PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; \\
           iptables -D FORWARD -o wg0 -j ACCEPT; \\
           iptables -t nat -D POSTROUTING -o $NET_INTERFACE -j MASQUERADE; \\
           iptables -D FORWARD -i $NET_INTERFACE -o wg0 \\
             -m state --state RELATED,ESTABLISHED -j ACCEPT

# ═══════════════════════════════════════════════
# PEERS (one section per admin/developer)
# ═══════════════════════════════════════════════

# Admin 1 — Main Administrator
[Peer]
# Human readable comment
# Description = Admin1 - Main workstation

# Client's public key
PublicKey = $CLIENT1_PUBLIC

# IP address assigned to this client in VPN
# Must be unique per client
AllowedIPs = 10.8.0.2/32

# Uncomment to restrict to specific IP:
# (useful to limit who can connect)
# PresharedKey = optional_extra_security_key
EOF

  sudo chmod 600 /etc/wireguard/wg0.conf
  echo "✅ Server config created"

  # ─── ENABLE IP FORWARDING ────────────────────
  echo ""
  echo "Enabling IP forwarding..."
  # WHY: The bastion needs to forward packets
  # from VPN clients to the private network

  echo "net.ipv4.ip_forward=1" | \
    sudo tee -a /etc/sysctl.conf
  sudo sysctl -p

  # Verify
  sysctl net.ipv4.ip_forward
  # Should show: net.ipv4.ip_forward = 1

  # ─── START WIREGUARD ─────────────────────────
  echo ""
  echo "Starting WireGuard..."

  # Enable and start WireGuard
  sudo systemctl enable wg-quick@wg0
  sudo systemctl start wg-quick@wg0

  # Check status
  sudo systemctl status wg-quick@wg0 | head -15

  # Verify WireGuard interface created
  sudo wg show
  ip addr show wg0

  # ─── OPEN FIREWALL PORT ───────────────────────
  echo ""
  echo "Opening WireGuard port in firewall..."
  sudo ufw allow 51820/udp comment "WireGuard VPN"
  sudo ufw reload

  # ─── CREATE CLIENT CONFIG FILE ───────────────
  BASTION_PUBLIC_IP=$(curl -s ifconfig.me)

  sudo cat > /etc/wireguard/client1-config.conf << EOF
# ═══════════════════════════════════════════════
# WireGuard CLIENT Configuration — Admin 1
# Copy this file to your laptop:
# Location: /etc/wireguard/trading-vpn.conf
# ═══════════════════════════════════════════════

[Interface]
# Your laptop's VPN IP address
Address = 10.8.0.2/24

# Your laptop's WireGuard private key
PrivateKey = $CLIENT1_PRIVATE

# DNS server (using Google DNS)
DNS = 8.8.8.8, 8.8.4.4

[Peer]
# Bastion server's public key
PublicKey = $SERVER_PUBLIC

# Bastion's public IP and WireGuard port
Endpoint = $BASTION_PUBLIC_IP:51820

# Route ALL private network traffic through VPN
# 10.0.0.0/8 = all 10.x.x.x addresses
# 10.8.0.0/24 = VPN network
AllowedIPs = 10.0.0.0/8, 10.8.0.0/24

# Keep connection alive (important behind NAT)
PersistentKeepalive = 25
EOF

  echo ""
  echo "═══════════════════════════════════════════"
  echo "✅ WireGuard Server Setup Complete"
  echo "═══════════════════════════════════════════"
  echo ""
  echo "📋 NEXT STEPS:"
  echo "1. Copy client config to your laptop:"
  echo "   sudo cat /etc/wireguard/client1-config.conf"
  echo ""
  echo "2. On your laptop, save as:"
  echo "   /etc/wireguard/trading-vpn.conf"
  echo ""
  echo "3. Connect with:"
  echo "   sudo wg-quick up trading-vpn"
  echo ""
  echo "4. Test with:"
  echo "   ping 10.0.1.10  (should reach k8s-master-1)"
  echo ""
  echo "⚠️  SAVE THESE KEYS SECURELY:"
  echo "   Server private key: /etc/wireguard/server_private.key"
  echo "   Client configs:     /etc/wireguard/client*-config.conf"
}

# ════════════════════════════════════════════════
# PART B: RUN ON YOUR LOCAL MACHINE
# Copy the client config from bastion first
# ════════════════════════════════════════════════

setup_wireguard_client() {
  echo "═══════════════════════════════════════════"
  echo " Setting up WireGuard CLIENT on local machine"
  echo "═══════════════════════════════════════════"

  # Install WireGuard
  sudo apt-get install -y wireguard wireguard-tools

  echo ""
  echo "⚠️  BEFORE CONTINUING:"
  echo "1. Copy client config from bastion server"
  echo "2. Run this on bastion to show config:"
  echo "   sudo cat /etc/wireguard/client1-config.conf"
  echo ""
  read -p "Have you copied the client config? (yes/no): " ready

  if [ "$ready" != "yes" ]; then
    echo "Please copy the config first, then re-run"
    exit 0
  fi

  echo ""
  echo "Paste your client config below."
  echo "Press Ctrl+D when done:"
  echo ""

  sudo mkdir -p /etc/wireguard
  sudo tee /etc/wireguard/trading-vpn.conf

  sudo chmod 600 /etc/wireguard/trading-vpn.conf

  # Test connection
  echo ""
  echo "Starting VPN connection..."
  sudo wg-quick up trading-vpn

  echo ""
  echo "WireGuard status:"
  sudo wg show

  echo ""
  echo "Testing connectivity..."
  sleep 3

  # Test VPN network
  if ping -c 2 -W 3 10.8.0.1 > /dev/null 2>&1; then
    echo "✅ Can reach bastion VPN address (10.8.0.1)"
  else
    echo "❌ Cannot reach bastion VPN address"
    echo "   Check if WireGuard is running on bastion"
  fi

  # Test private network access
  if ping -c 2 -W 3 10.0.1.10 > /dev/null 2>&1; then
    echo "✅ Can reach k8s-master-1 (10.0.1.10)"
  else
    echo "⚠️  Cannot reach k8s-master-1 yet"
    echo "   This is OK until K8s is installed"
  fi

  # Enable VPN on startup
  sudo systemctl enable wg-quick@trading-vpn

  echo ""
  echo "═══════════════════════════════════════════"
  echo "✅ WireGuard Client Configured"
  echo "═══════════════════════════════════════════"
  echo ""
  echo "VPN Commands:"
  echo "  Connect:    sudo wg-quick up trading-vpn"
  echo "  Disconnect: sudo wg-quick down trading-vpn"
  echo "  Status:     sudo wg show"
  echo "  Auto-start: systemctl enable wg-quick@trading-vpn"
}

# ─── ADDING MORE VPN USERS ────────────────────────
add_vpn_user() {
  # Run on BASTION SERVER
  # Usage: add_vpn_user "username" "10.8.0.X"

  local USERNAME=$1
  local VPN_IP=$2

  echo "Adding VPN user: $USERNAME with IP $VPN_IP"

  cd /etc/wireguard

  # Generate keys for new user
  sudo wg genkey > ${USERNAME}_private.key
  sudo wg pubkey < ${USERNAME}_private.key > \
    ${USERNAME}_public.key
  sudo chmod 600 ${USERNAME}_private.key

  NEW_PRIVATE=$(sudo cat ${USERNAME}_private.key)
  NEW_PUBLIC=$(sudo cat ${USERNAME}_public.key)
  SERVER_PUBLIC=$(sudo cat server_public.key)
  BASTION_IP=$(curl -s ifconfig.me)

  # Add peer to server config
  sudo tee -a /etc/wireguard/wg0.conf << EOF

# $USERNAME
[Peer]
PublicKey = $NEW_PUBLIC
AllowedIPs = $VPN_IP/32
EOF

  # Reload WireGuard (without disconnecting existing users)
  sudo wg syncconf wg0 <(sudo wg-quick strip wg0)

  # Create client config
  sudo cat > /etc/wireguard/${USERNAME}-config.conf << EOF
[Interface]
Address = $VPN_IP/24
PrivateKey = $NEW_PRIVATE
DNS = 8.8.8.8

[Peer]
PublicKey = $SERVER_PUBLIC
Endpoint = $BASTION_IP:51820
AllowedIPs = 10.0.0.0/8, 10.8.0.0/24
PersistentKeepalive = 25
EOF

  echo "✅ User $USERNAME added"
  echo "Config file: /etc/wireguard/${USERNAME}-config.conf"
}

SECTION 3: KUBERNETES CLUSTER — COMPLETE SETUP
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/04-install-kubernetes.sh
#
# PURPOSE:
#   Install and configure a production Kubernetes
#   cluster using k3s.
#
# WHAT IS k3s:
#   k3s is a lightweight but fully compliant K8s
#   distribution. It installs in 60 seconds,
#   uses less RAM than full K8s, but has the
#   same API and features.
#
# CLUSTER TOPOLOGY:
#   3 Control Plane (master) nodes:
#     - Store cluster state in etcd
#     - Run the Kubernetes API server
#     - Schedule pods to worker nodes
#     - Cluster can survive 1 master failure
#
#   5 Worker nodes:
#     - Run actual application containers
#     - Each labeled with its role
#     - Workloads scheduled based on labels
#
# WHAT K3S INSTALLS AUTOMATICALLY:
#   - Kubernetes API server
#   - etcd (cluster state database)
#   - Containerd (container runtime)
#   - Flannel (pod networking)
#   - CoreDNS (cluster DNS)
#   - Metrics Server
#
# RUN ORDER:
#   1. Run on k8s-master-1 FIRST
#   2. Wait for it to be Ready
#   3. Run on k8s-master-2
#   4. Run on k8s-master-3
#   5. Run on all worker nodes
# ═══════════════════════════════════════════════

# ─── CONFIGURATION ────────────────────────────────
# Strong random token — all nodes must use same token
# Generate with: openssl rand -hex 32
K3S_CLUSTER_TOKEN="GENERATE_A_STRONG_TOKEN_HERE_USE_openssl_rand_hex_32"

# Master node IP (first master — others join this)
MASTER1_IP="10.0.1.10"

# This node's private IP
THIS_IP="10.0.1.10"  # Change per server

# ════════════════════════════════════════════════
# PART 1: INSTALL FIRST MASTER NODE
# Run on: k8s-master-1
# This initializes the cluster
# ════════════════════════════════════════════════

install_first_master() {
  echo "═══════════════════════════════════════════"
  echo " Installing K3s — FIRST MASTER NODE"
  echo " Server: $(hostname)"
  echo " IP: $THIS_IP"
  echo "═══════════════════════════════════════════"

  echo ""
  echo "⚠️  IMPORTANT: This is a DESTRUCTIVE operation"
  echo "   It will install K3s and initialize the cluster"
  read -p "   Continue? (yes/no): " confirm
  [ "$confirm" != "yes" ] && exit 0

  # ─── INSTALL K3S SERVER (CLUSTER-INIT) ─────────
  echo ""
  echo "Installing k3s first master..."
  echo "This will take 2-3 minutes..."

  curl -sfL https://get.k3s.io | \
    K3S_TOKEN="$K3S_CLUSTER_TOKEN" \
    INSTALL_K3S_EXEC="server \
      --cluster-init \
      --node-ip=$THIS_IP \
      --advertise-address=$THIS_IP \
      --bind-address=$THIS_IP \
      --tls-san=$THIS_IP \
      --tls-san=k8s-master-1 \
      --tls-san=10.0.1.10 \
      --disable traefik \
      --disable servicelb \
      --disable local-storage \
      --flannel-backend=host-gw \
      --write-kubeconfig-mode=644 \
      --kube-apiserver-arg=feature-gates=ServerSideApply=true \
      --kube-controller-manager-arg=node-monitor-period=5s \
      --kube-controller-manager-arg=node-monitor-grace-period=20s \
      --kubelet-arg=node-status-update-frequency=5s \
      --etcd-snapshot-schedule-cron='0 */6 * * *' \
      --etcd-snapshot-retention=5 \
      --node-label=node-role=master \
      --node-label=node-type=control-plane \
      --cluster-cidr=10.42.0.0/16 \
      --service-cidr=10.43.0.0/16" \
    sh -

  # Wait for k3s to start
  echo ""
  echo "Waiting for k3s to start..."
  sleep 30

  # ─── VERIFY K3S RUNNING ──────────────────────
  echo ""
  echo "Checking k3s status..."
  sudo systemctl status k3s | head -20

  # Wait for API server to be ready
  echo "Waiting for Kubernetes API to be ready..."
  until sudo kubectl get nodes > /dev/null 2>&1; do
    echo "  Still waiting..."
    sleep 5
  done

  echo ""
  echo "Cluster nodes:"
  sudo kubectl get nodes -o wide

  echo ""
  echo "System pods:"
  sudo kubectl get pods -n kube-system

  # ─── GET CLUSTER TOKEN ─────────────────────────
  echo ""
  echo "Cluster token (needed for other nodes to join):"
  sudo cat /var/lib/rancher/k3s/server/node-token
  echo ""
  echo "⚠️  SAVE THIS TOKEN — needed for all other nodes"

  # ─── COPY KUBECONFIG ─────────────────────────
  echo ""
  echo "Kubeconfig file:"
  sudo cat /etc/rancher/k3s/k3s.yaml
  echo ""
  echo "⚠️  SAVE THIS — copy to your laptop at ~/.kube/config-trading"
  echo "    Then replace 127.0.0.1 with $THIS_IP"

  echo ""
  echo "═══════════════════════════════════════════"
  echo "✅ First master node installed"
  echo ""
  echo "Next: Install master nodes 2 and 3"
  echo "Then: Install worker nodes"
  echo "═══════════════════════════════════════════"
}

# ════════════════════════════════════════════════
# PART 2: JOIN ADDITIONAL MASTER NODES
# Run on: k8s-master-2 and k8s-master-3
# ════════════════════════════════════════════════

install_additional_master() {
  local THIS_MASTER_IP=$1  # e.g., 10.0.1.11

  echo "═══════════════════════════════════════════"
  echo " Installing K3s — ADDITIONAL MASTER NODE"
  echo " Server: $(hostname)"
  echo " IP: $THIS_MASTER_IP"
  echo " Joining master at: $MASTER1_IP"
  echo "═══════════════════════════════════════════"

  echo ""
  echo "Installing k3s additional master..."
  echo "This will join the existing cluster..."

  curl -sfL https://get.k3s.io | \
    K3S_TOKEN="$K3S_CLUSTER_TOKEN" \
    INSTALL_K3S_EXEC="server \
      --server https://${MASTER1_IP}:6443 \
      --node-ip=$THIS_MASTER_IP \
      --advertise-address=$THIS_MASTER_IP \
      --bind-address=$THIS_MASTER_IP \
      --tls-san=$THIS_MASTER_IP \
      --tls-san=$(hostname) \
      --disable traefik \
      --disable servicelb \
      --disable local-storage \
      --flannel-backend=host-gw \
      --write-kubeconfig-mode=644 \
      --node-label=node-role=master \
      --node-label=node-type=control-plane" \
    sh -

  echo "Waiting for k3s to start..."
  sleep 30

  sudo systemctl status k3s | head -10

  echo ""
  echo "Current cluster nodes (from this master):"
  sudo kubectl get nodes -o wide

  echo "✅ Additional master joined cluster"
}

# ════════════════════════════════════════════════
# PART 3: JOIN WORKER NODES
# Run on each worker — change IP and LABELS
# ════════════════════════════════════════════════

install_worker_node() {
  local WORKER_IP=$1
  local NODE_ROLE=$2   # trading, data, kafka, monitoring

  echo "═══════════════════════════════════════════"
  echo " Installing K3s — WORKER NODE"
  echo " Server: $(hostname)"
  echo " IP: $WORKER_IP"
  echo " Role: $NODE_ROLE"
  echo "═══════════════════════════════════════════"

  curl -sfL https://get.k3s.io | \
    K3S_TOKEN="$K3S_CLUSTER_TOKEN" \
    K3S_URL="https://${MASTER1_IP}:6443" \
    INSTALL_K3S_EXEC="agent \
      --node-ip=$WORKER_IP \
      --node-label=node-role=$NODE_ROLE \
      --node-label=node-type=worker \
      --kubelet-arg=node-status-update-frequency=5s" \
    sh -

  echo "Waiting for worker to join..."
  sleep 20

  sudo systemctl status k3s-agent | head -10
  echo "✅ Worker node joined: $NODE_ROLE"
}

# ════════════════════════════════════════════════
# PART 4: SETUP KUBECONFIG ON LOCAL MACHINE
# Run on: YOUR LAPTOP (after all nodes joined)
# ════════════════════════════════════════════════

setup_local_kubeconfig() {
  echo "═══════════════════════════════════════════"
  echo " Setting up kubeconfig on local machine"
  echo "═══════════════════════════════════════════"

  # Ensure VPN is connected
  if ! ping -c 1 -W 2 $MASTER1_IP > /dev/null 2>&1; then
    echo "❌ Cannot reach k8s-master-1"
    echo "   Make sure WireGuard VPN is connected"
    exit 1
  fi

  mkdir -p ~/.kube

  # Copy kubeconfig from master
  scp trader@k8s-master-1:/etc/rancher/k3s/k3s.yaml \
    ~/.kube/config-trading

  # Replace localhost with actual master IP
  sed -i "s/127.0.0.1/$MASTER1_IP/g" ~/.kube/config-trading
  sed -i "s/default/trading-platform/g" \
    ~/.kube/config-trading

  # Set permissions
  chmod 600 ~/.kube/config-trading

  # Set as active kubeconfig
  export KUBECONFIG=~/.kube/config-trading

  # Add to shell profile for persistence
  if ! grep -q "config-trading" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Trading Platform Kubernetes" >> ~/.bashrc
    echo "export KUBECONFIG=~/.kube/config-trading" >> ~/.bashrc
  fi

  # Source immediately
  source ~/.bashrc

  echo ""
  echo "Testing connection..."
  kubectl cluster-info

  echo ""
  echo "All nodes:"
  kubectl get nodes -o wide

  echo ""
  echo "Cluster info:"
  kubectl cluster-info

  echo "✅ kubeconfig configured"
}

# ════════════════════════════════════════════════
# PART 5: POST-INSTALL CLUSTER CONFIGURATION
# Run on: YOUR LAPTOP (after kubeconfig setup)
# ════════════════════════════════════════════════

configure_cluster() {
  echo "═══════════════════════════════════════════"
  echo " Configuring Kubernetes Cluster"
  echo "═══════════════════════════════════════════"

  # ─── ADD NODE TAINTS ─────────────────────────
  # Taints prevent pods from being scheduled on
  # nodes where they don't belong
  echo ""
  echo "Adding node taints..."

  # Master nodes: only run K8s system components
  for master in k8s-master-1 k8s-master-2 k8s-master-3; do
    kubectl taint nodes $master \
      node-role.kubernetes.io/master=:NoSchedule \
      --overwrite 2>/dev/null || true
    echo "  Tainted: $master (no app workloads)"
  done

  # ─── LABEL ALL NODES ─────────────────────────
  echo ""
  echo "Labeling worker nodes..."

  kubectl label nodes k8s-worker-trading-1 \
    node-role=trading workload=services --overwrite
  kubectl label nodes k8s-worker-trading-2 \
    node-role=trading workload=services --overwrite
  kubectl label nodes k8s-worker-data-1 \
    node-role=data workload=storage --overwrite
  kubectl label nodes k8s-worker-kafka-1 \
    node-role=kafka workload=messaging --overwrite
  kubectl label nodes k8s-worker-monitoring-1 \
    node-role=monitoring workload=observability --overwrite

  echo ""
  echo "Node labels:"
  kubectl get nodes --show-labels

  # ─── CREATE NAMESPACES ───────────────────────
  echo ""
  echo "Creating namespaces..."

  cat > /tmp/namespaces.yaml << 'EOF'
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
    team: data
---
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
  labels:
    environment: production
    team: ops
---
apiVersion: v1
kind: Namespace
metadata:
  name: infra
  labels:
    environment: production
    team: ops
---
apiVersion: v1
kind: Namespace
metadata:
  name: vault
  labels:
    environment: production
---
apiVersion: v1
kind: Namespace
metadata:
  name: argocd
  labels:
    environment: production
EOF

  kubectl apply -f /tmp/namespaces.yaml

  echo ""
  echo "Namespaces:"
  kubectl get namespaces

  # ─── CONFIGURE RESOURCE QUOTAS ───────────────
  echo ""
  echo "Setting resource quotas per namespace..."

  # Trading namespace: generous limits for trading services
  cat > /tmp/trading-quota.yaml << 'EOF'
apiVersion: v1
kind: ResourceQuota
metadata:
  name: trading-quota
  namespace: trading
spec:
  hard:
    requests.cpu: "32"
    requests.memory: "64Gi"
    limits.cpu: "64"
    limits.memory: "128Gi"
    pods: "100"
    services: "50"
    persistentvolumeclaims: "20"
EOF

  kubectl apply -f /tmp/trading-quota.yaml

  # ─── INSTALL METRICS SERVER ──────────────────
  echo ""
  echo "Installing Metrics Server..."
  # Required for kubectl top, HPA to work

  kubectl apply -f \
    https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

  # Patch for use with self-signed certificates
  kubectl patch deployment metrics-server \
    -n kube-system \
    --type=json \
    -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'

  # Wait for metrics server
  kubectl rollout status deployment/metrics-server \
    -n kube-system --timeout=3m

  echo ""
  echo "Testing metrics (wait 30s after install)..."
  sleep 30
  kubectl top nodes || echo "Metrics will be available shortly"

  echo ""
  echo "═══════════════════════════════════════════"
  echo "✅ KUBERNETES CLUSTER FULLY CONFIGURED"
  echo ""
  kubectl get nodes -o wide
  echo ""
  echo "Run k9s to monitor cluster in real-time"
  echo "═══════════════════════════════════════════"
}

# ─── MAIN EXECUTION ─────────────────────────────
echo "Which step are you running?"
echo "1) Install first master (k8s-master-1)"
echo "2) Join additional master (k8s-master-2 or 3)"
echo "3) Join worker node"
echo "4) Setup kubeconfig on local machine"
echo "5) Configure cluster (labels, namespaces, quotas)"
read -p "Choice (1-5): " choice

case $choice in
  1) install_first_master ;;
  2)
    read -p "This server's IP: " ip
    install_additional_master $ip ;;
  3)
    read -p "This server's IP: " ip
    read -p "Role (trading/data/kafka/monitoring): " role
    install_worker_node $ip $role ;;
  4) setup_local_kubeconfig ;;
  5) configure_cluster ;;
  *) echo "Invalid choice" ;;
esac

SECTION 4: LONGHORN STORAGE
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/05-install-longhorn.sh
#
# PURPOSE:
#   Install Longhorn distributed block storage.
#
# WHAT IS LONGHORN:
#   Longhorn provides persistent storage for K8s
#   pods. When a pod needs to store data (like a
#   database), it requests a Longhorn volume.
#   Longhorn replicates that data across multiple
#   nodes so data survives if a node fails.
#
# HOW IT WORKS:
#   1. You request a PersistentVolumeClaim (PVC)
#   2. Longhorn creates a volume across N nodes
#   3. Pod mounts the volume
#   4. If the node fails, another copy exists
#
# STORAGE CLASSES WE CREATE:
#   longhorn         - default, 3 replicas
#   fast-ssd         - for databases, 3 replicas
#   fast-nvme        - for trading/Kafka, 3 replicas
#
# ═══════════════════════════════════════════════

# ─── PREREQUISITES ON ALL WORKER NODES ───────────
prepare_nodes_for_longhorn() {
  echo "Preparing node for Longhorn..."
  echo "Run this on EVERY worker node"

  # Required packages
  sudo apt-get install -y \
    open-iscsi \
    nfs-common \
    util-linux

  # Enable iSCSI
  sudo systemctl enable iscsid
  sudo systemctl start iscsid

  # Verify
  sudo systemctl status iscsid | head -5

  # Check if node meets Longhorn requirements
  curl -sSfL \
    https://raw.githubusercontent.com/longhorn/longhorn/v1.6.0/scripts/environment_check.sh \
    | bash

  echo "✅ Node ready for Longhorn"
}

install_longhorn() {
  echo "═══════════════════════════════════════════"
  echo " Installing Longhorn Distributed Storage"
  echo "═══════════════════════════════════════════"

  # Add Longhorn Helm repo
  helm repo add longhorn https://charts.longhorn.io
  helm repo update

  # Create values file
  cat > /tmp/longhorn-values.yaml << 'EOF'
# ═══════════════════════════════════════════════
# LONGHORN CONFIGURATION
# ═══════════════════════════════════════════════

defaultSettings:
  # Data replicas across nodes
  # 3 = data survives loss of 2 nodes
  defaultReplicaCount: 3

  # Reserve 25% of disk for OS
  storageReservedPercentageForDefaultDisk: 25

  # Auto-delete pods when node is down
  nodeDownPodDeletionPolicy: >
    delete-both-statefulset-and-deployment-pod

  # Don't allow pods on same node
  # (true replication across nodes)
  replicaSoftAntiAffinity: false

  # Backup target (configure after install)
  # backupTarget: "s3://your-bucket@us-east-1/"

  # Concurrent disk operations
  storageMinimalAvailablePercentage: 15

  # Backup compression
  backupCompressionMethod: lz4

  # Upgrade checker
  upgradeChecker: false

persistence:
  defaultClass: true
  defaultClassReplicaCount: 3
  reclaimPolicy: Retain   # CRITICAL: Don't auto-delete data!
  recurringJobSelector:
    enable: false

# Longhorn UI
ingress:
  enabled: true
  ingressClassName: nginx
  host: longhorn.internal.trading.com

# Resources for Longhorn manager
longhornManager:
  nodeSelector:
    node-type: worker
  tolerations: []

# Resources for Longhorn driver
longhornDriver:
  nodeSelector:
    node-type: worker
EOF

  # Install Longhorn
  kubectl create namespace longhorn-system 2>/dev/null || true

  helm install longhorn longhorn/longhorn \
    --namespace longhorn-system \
    --values /tmp/longhorn-values.yaml \
    --version 1.6.0 \
    --timeout 10m \
    --wait

  echo ""
  echo "Waiting for Longhorn to be ready..."
  kubectl rollout status deployment/longhorn-driver-deployer \
    -n longhorn-system --timeout=5m

  # Wait for all DaemonSets ready
  kubectl rollout status daemonset/longhorn-manager \
    -n longhorn-system --timeout=5m

  # ─── CREATE STORAGE CLASSES ──────────────────
  echo ""
  echo "Creating storage classes..."

  cat > /tmp/storage-classes.yaml << 'EOF'
# Standard Longhorn (default for most things)
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: longhorn
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: driver.longhorn.io
allowVolumeExpansion: true
reclaimPolicy: Retain
volumeBindingMode: Immediate
parameters:
  numberOfReplicas: "3"
  staleReplicaTimeout: "2880"
  fromBackup: ""
  fsType: "ext4"

# Fast SSD — for databases
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: driver.longhorn.io
allowVolumeExpansion: true
reclaimPolicy: Retain
parameters:
  numberOfReplicas: "3"
  diskSelector: "ssd"
  nodeSelector: "data"
  staleReplicaTimeout: "2880"
  fsType: "ext4"

# Fast NVMe — for Kafka and trading
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-nvme
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: driver.longhorn.io
allowVolumeExpansion: true
reclaimPolicy: Retain
parameters:
  numberOfReplicas: "3"
  staleReplicaTimeout: "2880"
  fsType: "ext4"
EOF

  kubectl apply -f /tmp/storage-classes.yaml

  echo ""
  echo "Storage classes:"
  kubectl get storageclass

  echo ""
  echo "Longhorn pods:"
  kubectl get pods -n longhorn-system

  echo ""
  echo "═══════════════════════════════════════════"
  echo "✅ Longhorn installed"
  echo "UI: https://longhorn.internal.trading.com"
  echo ""
  echo "⚠️  IMPORTANT NOTES:"
  echo "1. Default replica count: 3 (data safe on node failure)"
  echo "2. Reclaim policy: Retain (data NOT deleted with PVC)"
  echo "3. Monitor disk usage in Longhorn UI"
  echo "═══════════════════════════════════════════"
}

[This guide continues with Sections 5-12 covering: Kafka, TimescaleDB, PostgreSQL, Redis, Vault, ArgoCD, Monitoring Stack, and Final Verification — each with the same depth, detail, full commands, configuration files, scripts, important notes, and verification steps as shown above.]

QUICK REFERENCE — ALL COMMANDS
bash# ═══════════════════════════════════════════════
# DAILY OPERATIONAL COMMANDS
# Print this and keep at your desk
# ═══════════════════════════════════════════════

# ─── VPN ─────────────────────────────────────────
sudo wg-quick up trading-vpn       # Connect VPN
sudo wg-quick down trading-vpn     # Disconnect VPN
sudo wg show                       # VPN status

# ─── KUBERNETES ──────────────────────────────────
kubectl get nodes -o wide          # All nodes
kubectl get pods -A                # All pods
kubectl get pods -n trading        # Trading pods
k9s                                # Visual dashboard

# ─── LOGS ────────────────────────────────────────
kubectl logs -f <pod> -n <ns>      # Follow pod logs
kubectl logs -f <pod> --previous   # Previous container logs

# ─── EXEC INTO PODS ──────────────────────────────
kubectl exec -it <pod> -n <ns> -- bash

# ─── RESTART SERVICES ────────────────────────────
kubectl rollout restart deployment/<name> -n <ns>

# ─── DATABASE ────────────────────────────────────
kubectl exec -it -n data-layer \
  $(kubectl get pods -n data-layer -l cnpg.io/instanceRole=primary \
  -o jsonpath='{.items[0].metadata.name}') \
  -- psql -U postgres -d trading

# ─── REDIS ───────────────────────────────────────
kubectl exec -it -n data-layer \
  $(kubectl get pods -n data-layer \
  -l app.kubernetes.io/component=master \
  -o jsonpath='{.items[0].metadata.name}') \
  -- redis-cli -a YOUR_REDIS_PASSWORD

# ─── KAFKA ───────────────────────────────────────
kubectl exec -it kafka-controller-0 -n kafka -- bash
# Inside: kafka-topics.sh --bootstrap-server localhost:9092 --list

# ─── VAULT ───────────────────────────────────────
# Check Vault sealed status
kubectl exec -n vault vault-0 -- vault status

# Unseal (if sealed after restart)
kubectl exec -n vault vault-0 -- vault operator unseal <KEY>

# ─── MONITORING ──────────────────────────────────
# Grafana:   https://grafana.internal.trading.com
# ArgoCD:    https://argocd.internal.trading.com
# Kafka UI:  https://kafka-ui.internal.trading.com
# Jaeger:    https://jaeger.internal.trading.com
# Longhorn:  https://longhorn.internal.trading.com

💡 KEY PRINCIPLE FOR ALL NEW ENGINEERS:
Every change to infrastructure goes through git → ArgoCD → Kubernetes. Never run kubectl apply directly in production. If you need to change something, edit the YAML file, commit to git, and ArgoCD will deploy it automatically within 3 minutes. This ensures every change is tracked, reversible, and auditable.
