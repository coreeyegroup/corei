COMPLETE INFRASTRUCTURE SETUP GUIDE
From Scratch — Click by Click

PRE-REQUISITES & SERVER PROVISIONING

STEP 0: YOUR LOCAL MACHINE SETUP
bash# ═══════════════════════════════════════════════
# YOUR LOCAL MACHINE (Mac/Linux/Windows WSL2)
# This is where you manage everything from
# ═══════════════════════════════════════════════

# ─── INSTALL REQUIRED TOOLS ─────────────────────

# 1. kubectl — K8s command line tool
curl -LO "https://dl.k8s.io/release/$(curl -L -s \
  https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl
kubectl version --client

# 2. Helm — K8s package manager
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version

# 3. k9s — Terminal K8s dashboard (very useful)
curl -sS https://webinstall.dev/k9s | bash
k9s version

# 4. Terraform — Infrastructure as Code
wget https://releases.hashicorp.com/terraform/1.7.0/terraform_1.7.0_linux_amd64.zip
unzip terraform_1.7.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
terraform version

# 5. Vault CLI
wget https://releases.hashicorp.com/vault/1.15.0/vault_1.15.0_linux_amd64.zip
unzip vault_1.15.0_linux_amd64.zip
sudo mv vault /usr/local/bin/
vault version

# 6. ArgoCD CLI
curl -sSL -o argocd \
  https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd
sudo mv argocd /usr/local/bin/
argocd version

# 7. WireGuard (VPN client)
sudo apt-get install wireguard   # Ubuntu
# or: brew install wireguard-tools  # Mac

# 8. Git
sudo apt-get install git
git --version

echo "✅ All local tools installed"

STEP 1: SERVER PROVISIONING
1A: Create Your Servers
bash# ═══════════════════════════════════════════════
# SERVER SPECIFICATIONS
# Order these from your chosen provider
# Recommended: Equinix Metal, Hetzner, or OVH
# ═══════════════════════════════════════════════

# ─── MINIMUM PRODUCTION SETUP ────────────────────
# 3 Control Plane nodes (K8s masters)
# 5 Worker nodes
# 1 Bastion/Jump server (for secure access)
# Total: 9 servers

# SERVER 1,2,3: CONTROL PLANE (K8s Masters)
# Purpose: K8s brain — scheduling, API, etcd
CPU:     4 cores
RAM:     8GB
Storage: 100GB SSD
Network: 1Gbps
OS:      Ubuntu 22.04 LTS
Names:   k8s-master-1, k8s-master-2, k8s-master-3

# SERVER 4,5: WORKER — TRADING SERVICES
# Purpose: Runs all trading microservices
CPU:     16 cores
RAM:     64GB
Storage: 500GB NVMe SSD
Network: 10Gbps
OS:      Ubuntu 22.04 LTS
Names:   k8s-worker-trading-1, k8s-worker-trading-2

# SERVER 6: WORKER — DATA & STORAGE
# Purpose: TimescaleDB, PostgreSQL, Redis
CPU:     16 cores
RAM:     64GB
Storage: 2TB NVMe SSD (tick data storage)
Network: 10Gbps
OS:      Ubuntu 22.04 LTS
Name:    k8s-worker-data-1

# SERVER 7: WORKER — KAFKA
# Purpose: Kafka message streaming cluster
CPU:     16 cores
RAM:     32GB
Storage: 1TB NVMe SSD
Network: 10Gbps
OS:      Ubuntu 22.04 LTS
Name:    k8s-worker-kafka-1

# SERVER 8: WORKER — MONITORING
# Purpose: Grafana, Prometheus, Loki, Jaeger
CPU:     8 cores
RAM:     32GB
Storage: 500GB SSD
Network: 1Gbps
OS:      Ubuntu 22.04 LTS
Name:    k8s-worker-monitoring-1

# SERVER 9: BASTION SERVER
# Purpose: Secure SSH jump host, VPN endpoint
CPU:     2 cores
RAM:     4GB
Storage: 50GB SSD
Network: 1Gbps — PUBLIC IP (only server with public IP)
OS:      Ubuntu 22.04 LTS
Name:    bastion

# IMPORTANT NOTES:
# - Only bastion has public IP
# - All other servers: private network only
# - All servers in same datacenter/VLAN
# - Note down all private IPs when provisioned
1B: Initial Server Configuration (Run on EVERY server)
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: scripts/setup-server.sh
# Run this on EVERY server immediately after
# provisioning. SSH in as root first.
# ═══════════════════════════════════════════════

# ─── VARIABLES — CHANGE THESE ────────────────────
YOUR_SSH_PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2E... your-key-here"
YOUR_USERNAME="trader"
HOSTNAME="k8s-master-1"  # Change per server

# ─── SET HOSTNAME ────────────────────────────────
hostnamectl set-hostname $HOSTNAME
echo "127.0.0.1 $HOSTNAME" >> /etc/hosts

# ─── CREATE ADMIN USER ───────────────────────────
useradd -m -s /bin/bash -G sudo $YOUR_USERNAME
mkdir -p /home/$YOUR_USERNAME/.ssh
echo "$YOUR_SSH_PUBLIC_KEY" > /home/$YOUR_USERNAME/.ssh/authorized_keys
chown -R $YOUR_USERNAME:$YOUR_USERNAME /home/$YOUR_USERNAME/.ssh
chmod 700 /home/$YOUR_USERNAME/.ssh
chmod 600 /home/$YOUR_USERNAME/.ssh/authorized_keys

# ─── HARDEN SSH ──────────────────────────────────
cat > /etc/ssh/sshd_config << 'EOF'
Port 22
Protocol 2
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
X11Forwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers trader
EOF

systemctl restart sshd

# ─── FIREWALL SETUP ──────────────────────────────
apt-get install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow from 10.0.0.0/8 to any   # Allow all private network
ufw allow 22/tcp                    # SSH (restrict later via VPN)
ufw --force enable

# ─── SYSTEM UPDATES ──────────────────────────────
apt-get update -y
apt-get upgrade -y
apt-get install -y \
  curl wget git vim htop \
  net-tools nmap tcpdump \
  apt-transport-https \
  ca-certificates \
  gnupg lsb-release \
  software-properties-common \
  nfs-common \
  open-iscsi

# ─── DISABLE SWAP (Required for K8s) ─────────────
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
# Verify swap is off:
free -h
# Should show: Swap: 0B 0B 0B

# ─── KERNEL MODULES FOR K8s ──────────────────────
cat > /etc/modules-load.d/k8s.conf << 'EOF'
overlay
br_netfilter
EOF

modprobe overlay
modprobe br_netfilter

# ─── KERNEL PARAMETERS FOR K8s ───────────────────
cat > /etc/sysctl.d/k8s.conf << 'EOF'
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
net.ipv4.tcp_keepalive_time         = 600
net.ipv4.tcp_keepalive_intvl        = 60
net.ipv4.tcp_keepalive_probes       = 9
vm.swappiness                       = 0
vm.max_map_count                    = 262144
fs.file-max                         = 2097152
fs.inotify.max_user_watches         = 524288
fs.inotify.max_user_instances       = 512
EOF

sysctl --system

# ─── INSTALL CONTAINERD (Container Runtime) ──────
apt-get install -y containerd

mkdir -p /etc/containerd
containerd config default | tee /etc/containerd/config.toml

# Enable SystemdCgroup (required for K8s)
sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' \
  /etc/containerd/config.toml

systemctl restart containerd
systemctl enable containerd

# Verify containerd running
systemctl status containerd

# ─── HOSTS FILE — ADD ALL SERVERS ────────────────
# IMPORTANT: Replace IPs with your actual private IPs
cat >> /etc/hosts << 'EOF'
# Trading Platform Cluster
10.0.1.10  k8s-master-1
10.0.1.11  k8s-master-2
10.0.1.12  k8s-master-3
10.0.1.20  k8s-worker-trading-1
10.0.1.21  k8s-worker-trading-2
10.0.1.30  k8s-worker-data-1
10.0.1.40  k8s-worker-kafka-1
10.0.1.50  k8s-worker-monitoring-1
10.0.1.5   bastion
EOF

# ─── TIME SYNC (CRITICAL FOR TRADING) ────────────
# All trading servers must have synchronized time
apt-get install -y chrony
cat > /etc/chrony.conf << 'EOF'
server time1.google.com iburst
server time2.google.com iburst
server time3.google.com iburst
server time4.google.com iburst
makestep 1.0 3
rtcsync
EOF

systemctl restart chrony
systemctl enable chrony

# Verify time sync
chronyc tracking
# Important: Check "System time" offset is < 1ms

# ─── NODE LABELS FILE ────────────────────────────
# Save this server's role for K8s labeling later
echo "SERVER_ROLE=master" > /etc/server-role
# Change to: worker-trading / worker-data /
#            worker-kafka / worker-monitoring

echo "✅ Server base setup complete: $HOSTNAME"
echo "⚠️  REBOOT REQUIRED"
reboot
1C: /etc/hosts on YOUR LOCAL MACHINE
bash# Add to your local machine's /etc/hosts
# This lets you access servers by name via VPN

sudo cat >> /etc/hosts << 'EOF'
# Trading Platform (access via VPN)
10.0.1.5    bastion
10.0.1.10   k8s-master-1
10.0.1.11   k8s-master-2
10.0.1.12   k8s-master-3
10.0.1.20   k8s-worker-trading-1
10.0.1.21   k8s-worker-trading-2
10.0.1.30   k8s-worker-data-1
10.0.1.40   k8s-worker-kafka-1
10.0.1.50   k8s-worker-monitoring-1

# Internal services (access via VPN)
10.0.1.100  argocd.internal.trading.com
10.0.1.100  grafana.internal.trading.com
10.0.1.100  kafka-ui.internal.trading.com
10.0.1.100  vault.internal.trading.com
10.0.1.100  dashboard.trading.com
EOF

INFRA 1: WIREGUARD VPN
bash# ═══════════════════════════════════════════════
# PURPOSE: Secure private network tunnel
# All admin access goes through VPN
# No direct SSH to servers — only via VPN
# Install on: BASTION server first
# ═══════════════════════════════════════════════

# ─── ON BASTION SERVER ───────────────────────────
ssh trader@<bastion-public-ip>

# Install WireGuard
sudo apt-get update
sudo apt-get install -y wireguard wireguard-tools

# Generate server keys
cd /etc/wireguard
sudo wg genkey | sudo tee server_private.key | \
  wg pubkey | sudo tee server_public.key

# View keys (save these securely)
sudo cat server_private.key
sudo cat server_public.key

# Generate client keys (one per admin/developer)
sudo wg genkey | sudo tee client1_private.key | \
  wg pubkey | sudo tee client1_public.key

sudo cat client1_private.key
sudo cat client1_public.key

# ─── CREATE SERVER CONFIG ────────────────────────
# FILE: /etc/wireguard/wg0.conf (on bastion)

sudo cat > /etc/wireguard/wg0.conf << 'EOF'
[Interface]
# Bastion server WireGuard settings
Address = 10.8.0.1/24
ListenPort = 51820
PrivateKey = <PASTE_SERVER_PRIVATE_KEY_HERE>

# Enable IP forwarding to reach internal servers
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; \
         iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE; \
         iptables -A FORWARD -i eth0 -o wg0 -m state \
         --state RELATED,ESTABLISHED -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; \
           iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE; \
           iptables -D FORWARD -i eth0 -o wg0 -m state \
           --state RELATED,ESTABLISHED -j ACCEPT

# Admin Client 1 (Your laptop)
[Peer]
PublicKey = <PASTE_CLIENT1_PUBLIC_KEY_HERE>
AllowedIPs = 10.8.0.2/32

# Add more peers for team members
# [Peer]
# PublicKey = <CLIENT2_PUBLIC_KEY>
# AllowedIPs = 10.8.0.3/32
EOF

# Set correct permissions
sudo chmod 600 /etc/wireguard/wg0.conf

# Enable IP forwarding on bastion
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Start and enable WireGuard
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
sudo systemctl status wg-quick@wg0

# Verify interface created
sudo wg show

# ─── CLIENT CONFIG (Your local machine) ──────────
# FILE: /etc/wireguard/trading-vpn.conf (on YOUR laptop)

cat > ~/trading-vpn.conf << 'EOF'
[Interface]
# Your laptop WireGuard settings
Address = 10.8.0.2/24
PrivateKey = <PASTE_CLIENT1_PRIVATE_KEY_HERE>
DNS = 8.8.8.8

[Peer]
# Bastion server
PublicKey = <PASTE_SERVER_PUBLIC_KEY_HERE>
Endpoint = <BASTION_PUBLIC_IP>:51820
# Route ALL internal traffic through VPN
AllowedIPs = 10.0.0.0/8, 10.8.0.0/24
PersistentKeepalive = 25
EOF

sudo cp ~/trading-vpn.conf /etc/wireguard/trading-vpn.conf

# Connect to VPN
sudo wg-quick up trading-vpn

# Test VPN connection
ping 10.0.1.10  # Should reach k8s-master-1

# Enable VPN on startup
sudo systemctl enable wg-quick@trading-vpn

# ─── RESTRICT SSH TO VPN ONLY ────────────────────
# On ALL servers (after VPN is working):
# Update UFW to only allow SSH from VPN network

sudo ufw delete allow 22/tcp
sudo ufw allow from 10.8.0.0/24 to any port 22
sudo ufw allow from 10.0.0.0/8 to any port 22
sudo ufw reload

# ─── IMPORTANT NOTES ─────────────────────────────
# 1. Always connect VPN before SSH to any server
# 2. Store private keys in a password manager
# 3. Generate new keys for each team member
# 4. Revoke access by removing [Peer] block
# 5. Run: sudo wg show  to see connected clients

INFRA 2: KUBERNETES CLUSTER
bash# ═══════════════════════════════════════════════
# PURPOSE: Container orchestration
# HA setup: 3 control plane + 5 workers
# Using k3s (full K8s, lightweight installer)
# ═══════════════════════════════════════════════

# ─── STEP 2.1: INSTALL FIRST MASTER ──────────────
# SSH to k8s-master-1 (via VPN)
ssh trader@k8s-master-1

# Install k3s as cluster init node
# IMPORTANT: Replace with YOUR master-1 private IP
curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  INSTALL_K3S_EXEC="server \
    --cluster-init \
    --node-ip=10.0.1.10 \
    --advertise-address=10.0.1.10 \
    --tls-san=10.0.1.10 \
    --tls-san=k8s-master-1 \
    --disable traefik \
    --disable servicelb \
    --disable local-storage \
    --flannel-backend=host-gw \
    --kube-apiserver-arg=feature-gates=ServerSideApply=true \
    --write-kubeconfig-mode=644 \
    --node-label=node-role=master" \
  sh -

# Wait for k3s to start
sleep 30

# Check status
sudo systemctl status k3s
sudo kubectl get nodes

# Get node token (needed for other masters + workers)
sudo cat /var/lib/rancher/k3s/server/node-token
# SAVE THIS TOKEN — needed for all other nodes

# Get kubeconfig
sudo cat /etc/rancher/k3s/k3s.yaml
# Copy this to your local machine

# ─── STEP 2.2: COPY KUBECONFIG TO LOCAL ──────────
# On your LOCAL machine:
mkdir -p ~/.kube

# Copy kubeconfig from master-1
scp trader@k8s-master-1:/etc/rancher/k3s/k3s.yaml \
  ~/.kube/config-trading

# Fix server IP in kubeconfig
# Change 127.0.0.1 to actual master-1 IP
sed -i 's/127.0.0.1/10.0.1.10/g' ~/.kube/config-trading

# Set as default kubeconfig
export KUBECONFIG=~/.kube/config-trading
# Add to ~/.bashrc for persistence:
echo 'export KUBECONFIG=~/.kube/config-trading' >> ~/.bashrc

# Test connection
kubectl get nodes
# Should show k8s-master-1 Ready

# ─── STEP 2.3: JOIN MASTER 2 ─────────────────────
ssh trader@k8s-master-2

curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  INSTALL_K3S_EXEC="server \
    --server https://10.0.1.10:6443 \
    --node-ip=10.0.1.11 \
    --advertise-address=10.0.1.11 \
    --tls-san=10.0.1.11 \
    --tls-san=k8s-master-2 \
    --disable traefik \
    --disable servicelb \
    --disable local-storage \
    --flannel-backend=host-gw \
    --write-kubeconfig-mode=644 \
    --node-label=node-role=master" \
  sh -

sleep 30
sudo systemctl status k3s

# ─── STEP 2.4: JOIN MASTER 3 ─────────────────────
ssh trader@k8s-master-3

curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  INSTALL_K3S_EXEC="server \
    --server https://10.0.1.10:6443 \
    --node-ip=10.0.1.12 \
    --advertise-address=10.0.1.12 \
    --tls-san=10.0.1.12 \
    --tls-san=k8s-master-3 \
    --disable traefik \
    --disable servicelb \
    --disable local-storage \
    --flannel-backend=host-gw \
    --write-kubeconfig-mode=644 \
    --node-label=node-role=master" \
  sh -

# ─── STEP 2.5: JOIN WORKER NODES ─────────────────
# Run on EACH worker node
# Change NODE_IP and NODE_NAME per server

# On k8s-worker-trading-1:
ssh trader@k8s-worker-trading-1
curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  K3S_URL="https://10.0.1.10:6443" \
  INSTALL_K3S_EXEC="agent \
    --node-ip=10.0.1.20 \
    --node-label=node-role=trading \
    --node-label=workload=services" \
  sh -

# On k8s-worker-trading-2:
ssh trader@k8s-worker-trading-2
curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  K3S_URL="https://10.0.1.10:6443" \
  INSTALL_K3S_EXEC="agent \
    --node-ip=10.0.1.21 \
    --node-label=node-role=trading \
    --node-label=workload=services" \
  sh -

# On k8s-worker-data-1:
ssh trader@k8s-worker-data-1
curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  K3S_URL="https://10.0.1.10:6443" \
  INSTALL_K3S_EXEC="agent \
    --node-ip=10.0.1.30 \
    --node-label=node-role=data \
    --node-label=workload=storage" \
  sh -

# On k8s-worker-kafka-1:
ssh trader@k8s-worker-kafka-1
curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  K3S_URL="https://10.0.1.10:6443" \
  INSTALL_K3S_EXEC="agent \
    --node-ip=10.0.1.40 \
    --node-label=node-role=kafka \
    --node-label=workload=messaging" \
  sh -

# On k8s-worker-monitoring-1:
ssh trader@k8s-worker-monitoring-1
curl -sfL https://get.k3s.io | \
  K3S_TOKEN="YOUR_STRONG_SECRET_TOKEN_HERE" \
  K3S_URL="https://10.0.1.10:6443" \
  INSTALL_K3S_EXEC="agent \
    --node-ip=10.0.1.50 \
    --node-label=node-role=monitoring \
    --node-label=workload=observability" \
  sh -

# ─── STEP 2.6: VERIFY CLUSTER ────────────────────
# On your LOCAL machine
kubectl get nodes -o wide

# Expected output:
# NAME                      STATUS   ROLES    AGE
# k8s-master-1              Ready    master   10m
# k8s-master-2              Ready    master   8m
# k8s-master-3              Ready    master   6m
# k8s-worker-trading-1      Ready    worker   4m
# k8s-worker-trading-2      Ready    worker   3m
# k8s-worker-data-1         Ready    worker   2m
# k8s-worker-kafka-1        Ready    worker   1m
# k8s-worker-monitoring-1   Ready    worker   30s

# Check all system pods running
kubectl get pods -n kube-system

# ─── STEP 2.7: CREATE NAMESPACES ─────────────────
# FILE: infrastructure/kubernetes/namespaces/all-namespaces.yaml

mkdir -p infrastructure/kubernetes/namespaces

cat > infrastructure/kubernetes/namespaces/all-namespaces.yaml << 'EOF'
---
apiVersion: v1
kind: Namespace
metadata:
  name: trading
  labels:
    environment: production
    team: trading
    istio-injection: enabled
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
---
apiVersion: v1
kind: Namespace
metadata:
  name: vault
EOF

kubectl apply -f infrastructure/kubernetes/namespaces/all-namespaces.yaml

# Verify namespaces
kubectl get namespaces

# ─── STEP 2.8: INSTALL LONGHORN (STORAGE) ────────
# Distributed block storage for K8s
# Replaces need for cloud storage provider

# Prerequisites on ALL worker nodes:
# (Run on each worker)
sudo apt-get install -y open-iscsi nfs-common
sudo systemctl enable iscsid
sudo systemctl start iscsid

# Install Longhorn via Helm
helm repo add longhorn https://charts.longhorn.io
helm repo update

# FILE: infrastructure/kubernetes/helm-values/longhorn-values.yaml
cat > infrastructure/kubernetes/helm-values/longhorn-values.yaml << 'EOF'
defaultSettings:
  defaultReplicaCount: 3
  storageReservedPercentageForDefaultDisk: 25
  nodeDownPodDeletionPolicy: delete-both-statefulset-and-deployment-pod
  replicaSoftAntiAffinity: false

persistence:
  defaultClass: true
  defaultClassReplicaCount: 3

# Storage classes
storageClass:
  name: longhorn
  isDefault: true
  reclaimPolicy: Retain    # IMPORTANT: Don't auto-delete data

# Separate storage class for fast NVMe
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-nvme
provisioner: driver.longhorn.io
parameters:
  numberOfReplicas: "3"
  diskSelector: "nvme"
  nodeSelector: "storage"
reclaimPolicy: Retain
allowVolumeExpansion: true
EOF

helm install longhorn longhorn/longhorn \
  --namespace infra \
  --values infrastructure/kubernetes/helm-values/longhorn-values.yaml

# Wait for Longhorn to be ready
kubectl rollout status deployment/longhorn-driver-deployer \
  -n infra --timeout=5m

# Verify storage classes
kubectl get storageclass

# ─── STEP 2.9: INSTALL NGINX INGRESS ─────────────
helm repo add ingress-nginx \
  https://kubernetes.github.io/ingress-nginx
helm repo update

cat > infrastructure/kubernetes/helm-values/ingress-values.yaml << 'EOF'
controller:
  replicaCount: 2

  nodeSelector:
    node-role: monitoring

  service:
    type: LoadBalancer
    externalIPs:
      - 10.0.1.100    # Your load balancer IP

  config:
    proxy-body-size: "50m"
    proxy-read-timeout: "600"
    proxy-send-timeout: "600"
    keepalive-timeout: "75"
    worker-processes: "auto"

  metrics:
    enabled: true
    serviceMonitor:
      enabled: true

  # Rate limiting
  config:
    limit-req-status-code: "429"
EOF

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace infra \
  --values infrastructure/kubernetes/helm-values/ingress-values.yaml

# ─── STEP 2.10: INSTALL CERT-MANAGER ─────────────
# Auto SSL certificates

helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace infra \
  --set installCRDs=true \
  --set prometheus.enabled=true

# Create ClusterIssuer for Let's Encrypt
# FILE: infrastructure/kubernetes/infra/cluster-issuer.yaml
cat > infrastructure/kubernetes/infra/cluster-issuer.yaml << 'EOF'
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: your-email@domain.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
    - http01:
        ingress:
          class: nginx
---
# Self-signed for internal services
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: {}
EOF

kubectl apply -f infrastructure/kubernetes/infra/cluster-issuer.yaml

echo "✅ Kubernetes cluster fully configured"

INFRA 3: APACHE KAFKA
bash# ═══════════════════════════════════════════════
# PURPOSE: Production message streaming
# Setup: 3-broker KRaft cluster (no Zookeeper)
# Namespace: kafka
# ═══════════════════════════════════════════════

# ─── STEP 3.1: ADD HELM REPO ─────────────────────
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# ─── STEP 3.2: KAFKA VALUES ──────────────────────
# FILE: infrastructure/kubernetes/helm-values/kafka-values.yaml

mkdir -p infrastructure/kubernetes/helm-values

cat > infrastructure/kubernetes/helm-values/kafka-values.yaml << 'EOF'
# ═══════════════════════════════════════════════
# KAFKA PRODUCTION CONFIGURATION
# 3-broker KRaft cluster (no Zookeeper)
# ═══════════════════════════════════════════════

replicaCount: 3

# KRaft mode — no Zookeeper dependency
kraft:
  enabled: true

controller:
  replicaCount: 3

  # Pin to kafka node
  nodeSelector:
    node-role: kafka

  # Spread brokers across nodes if multiple
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app.kubernetes.io/component: controller
          topologyKey: kubernetes.io/hostname

  persistence:
    enabled: true
    size: 200Gi
    storageClass: fast-nvme

  resources:
    requests:
      memory: 4Gi
      cpu: "2"
    limits:
      memory: 8Gi
      cpu: "4"

# Kafka configuration
extraConfig: |
  # Network
  num.network.threads=8
  num.io.threads=16
  socket.send.buffer.bytes=102400
  socket.receive.buffer.bytes=102400
  socket.request.max.bytes=104857600

  # Log / Retention
  log.retention.hours=168
  log.segment.bytes=1073741824
  log.retention.check.interval.ms=300000
  log.cleanup.policy=delete

  # Replication
  default.replication.factor=3
  min.insync.replicas=2

  # Performance
  num.partitions=6
  compression.type=lz4
  message.max.bytes=10485760

  # Producer settings
  producer.max.request.size=10485760

  # Consumer settings
  max.poll.records=500

  # Auto-create topics (disable in prod for control)
  auto.create.topics.enable=false

# Authentication (SASL)
auth:
  clientProtocol: sasl
  interBrokerProtocol: sasl
  sasl:
    mechanisms: SCRAM-SHA-512
    interBrokerMechanism: SCRAM-SHA-512
    scramsha512:
      users:
        - username: admin
          password: "CHANGE_THIS_STRONG_PASSWORD"
        - username: data-service
          password: "CHANGE_THIS_STRONG_PASSWORD_2"
        - username: strategy-engine
          password: "CHANGE_THIS_STRONG_PASSWORD_3"
        - username: order-manager
          password: "CHANGE_THIS_STRONG_PASSWORD_4"
        - username: risk-engine
          password: "CHANGE_THIS_STRONG_PASSWORD_5"
        - username: broker-connector
          password: "CHANGE_THIS_STRONG_PASSWORD_6"

# Schema Registry
schemaRegistry:
  enabled: true
  replicaCount: 2

  auth:
    enabled: true
    basicAuthEnabled: true
    basicAuthUserInfo: "admin:CHANGE_THIS_PASSWORD"

  resources:
    requests:
      memory: 512Mi
      cpu: "250m"
    limits:
      memory: 1Gi
      cpu: "500m"

# Kafka UI (management console)
kafkaui:
  enabled: true

  yamlApplicationConfig:
    kafka:
      clusters:
        - name: trading-platform
          bootstrapServers: >
            kafka-controller-0.kafka-controller-headless:9092,
            kafka-controller-1.kafka-controller-headless:9092,
            kafka-controller-2.kafka-controller-headless:9092
          schemaRegistry: http://kafka-schema-registry:8081
          properties:
            security.protocol: SASL_PLAINTEXT
            sasl.mechanism: SCRAM-SHA-512
            sasl.jaas.config: >
              org.apache.kafka.common.security.scram.ScramLoginModule
              required username="admin"
              password="CHANGE_THIS_STRONG_PASSWORD";

  ingress:
    enabled: true
    ingressClassName: nginx
    hostname: kafka-ui.internal.trading.com
    annotations:
      nginx.ingress.kubernetes.io/auth-type: basic
      nginx.ingress.kubernetes.io/auth-secret: kafka-ui-auth

# Metrics for Prometheus
metrics:
  kafka:
    enabled: true
  jmx:
    enabled: true
  serviceMonitor:
    enabled: true
    namespace: monitoring
EOF

# ─── STEP 3.3: INSTALL KAFKA ─────────────────────
helm install kafka bitnami/kafka \
  --namespace kafka \
  --values infrastructure/kubernetes/helm-values/kafka-values.yaml \
  --timeout 10m \
  --wait

# Watch pods come up
kubectl get pods -n kafka -w

# Wait for all 3 brokers ready (takes 3-5 minutes)
kubectl rollout status statefulset/kafka-controller \
  -n kafka --timeout=10m

# ─── STEP 3.4: VERIFY KAFKA ──────────────────────
# Get a shell inside kafka pod
kubectl exec -it kafka-controller-0 -n kafka -- bash

# Inside pod — test with kafka tools
# List topics (should be empty)
kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --command-config /opt/bitnami/kafka/config/producer.properties \
  --list

# Create test topic
kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --command-config /opt/bitnami/kafka/config/producer.properties \
  --create \
  --topic test-topic \
  --partitions 3 \
  --replication-factor 3

# Describe topic (verify replication)
kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --command-config /opt/bitnami/kafka/config/producer.properties \
  --describe \
  --topic test-topic

# Delete test topic
kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --command-config /opt/bitnami/kafka/config/producer.properties \
  --delete \
  --topic test-topic

exit

# ─── STEP 3.5: CREATE ALL TRADING TOPICS ─────────
# FILE: infrastructure/scripts/create-kafka-topics.sh

cat > infrastructure/scripts/create-kafka-topics.sh << 'SCRIPT'
#!/bin/bash
# Creates all required Kafka topics
# Run once after Kafka is installed

KAFKA_POD="kafka-controller-0"
KAFKA_NS="kafka"
BOOTSTRAP="localhost:9092"
CONFIG="/opt/bitnami/kafka/config/producer.properties"

create_topic() {
  local NAME=$1
  local PARTITIONS=$2
  local RETENTION_MS=$3
  local CLEANUP=$4

  echo "Creating topic: $NAME"
  kubectl exec -n $KAFKA_NS $KAFKA_POD -- \
    kafka-topics.sh \
      --bootstrap-server $BOOTSTRAP \
      --command-config $CONFIG \
      --create \
      --if-not-exists \
      --topic $NAME \
      --partitions $PARTITIONS \
      --replication-factor 3 \
      --config retention.ms=$RETENTION_MS \
      --config cleanup.policy=$CLEANUP \
      --config compression.type=lz4

  echo "✅ Created: $NAME"
}

# Time constants
ONE_HOUR=$((60*60*1000))
ONE_DAY=$((24*ONE_HOUR))
SEVEN_DAYS=$((7*ONE_DAY))
THIRTY_DAYS=$((30*ONE_DAY))
NINETY_DAYS=$((90*ONE_DAY))
ONE_YEAR=$((365*ONE_DAY))
FOREVER=-1

echo "═══════════════════════════════════════"
echo " Creating Kafka Topics"
echo "═══════════════════════════════════════"

# MARKET DATA TOPICS
create_topic "market.ticks.XAUUSD"    6 $SEVEN_DAYS  "delete"
create_topic "market.ticks.EURUSD"    6 $SEVEN_DAYS  "delete"
create_topic "market.ticks.GBPUSD"    6 $SEVEN_DAYS  "delete"
create_topic "market.ticks.USDJPY"    6 $SEVEN_DAYS  "delete"
create_topic "market.ticks.raw"       12 $ONE_DAY    "delete"
create_topic "market.bars.1m"         6 $THIRTY_DAYS "delete"
create_topic "market.bars.5m"         6 $THIRTY_DAYS "delete"
create_topic "market.bars.1h"         3 $NINETY_DAYS "delete"
create_topic "market.orderbook"       6 $ONE_HOUR    "delete"

# SIGNAL TOPICS
create_topic "signals.generated"      6 $ONE_DAY     "delete"
create_topic "signals.rejected"       3 $SEVEN_DAYS  "delete"
create_topic "signals.expired"        3 $ONE_DAY     "delete"

# ORDER TOPICS
create_topic "orders.created"         6 $NINETY_DAYS "delete"
create_topic "orders.risk-check"      6 $ONE_DAY     "delete"
create_topic "orders.approved"        6 $NINETY_DAYS "delete"
create_topic "orders.submitted"       6 $NINETY_DAYS "delete"
create_topic "orders.filled"          6 $NINETY_DAYS "delete"
create_topic "orders.rejected"        3 $NINETY_DAYS "delete"
create_topic "orders.cancelled"       3 $NINETY_DAYS "delete"
create_topic "orders.timeout"         3 $NINETY_DAYS "delete"

# POSITION TOPICS
create_topic "positions.opened"       6 $NINETY_DAYS "delete"
create_topic "positions.updated"      6 $THIRTY_DAYS "delete"
create_topic "positions.closed"       6 $NINETY_DAYS "delete"

# RISK TOPICS
create_topic "risk.checks"            6 $ONE_DAY     "delete"
create_topic "risk.decisions"         6 $SEVEN_DAYS  "delete"
create_topic "risk.alerts"            3 $THIRTY_DAYS "delete"
create_topic "risk.kill-switch"       3 $THIRTY_DAYS "delete"
create_topic "risk.metrics"           3 $SEVEN_DAYS  "delete"

# ACCOUNT TOPICS
create_topic "accounts.updated"       3 $THIRTY_DAYS "delete"
create_topic "accounts.snapshots"     3 $NINETY_DAYS "delete"

# SYSTEM TOPICS
create_topic "system.health"          3 $SEVEN_DAYS  "delete"
create_topic "system.audit"           3 $ONE_YEAR    "delete"
create_topic "system.errors"          3 $THIRTY_DAYS "delete"

# ALERT TOPICS
create_topic "alerts.notifications"   3 $SEVEN_DAYS  "delete"

echo ""
echo "═══════════════════════════════════════"
echo "✅ All topics created successfully"
echo "═══════════════════════════════════════"

# List all topics
kubectl exec -n $KAFKA_NS $KAFKA_POD -- \
  kafka-topics.sh \
    --bootstrap-server $BOOTSTRAP \
    --command-config $CONFIG \
    --list
SCRIPT

chmod +x infrastructure/scripts/create-kafka-topics.sh
bash infrastructure/scripts/create-kafka-topics.sh

echo "✅ Kafka fully configured"

INFRA 4: TIMESCALEDB
bash# ═══════════════════════════════════════════════
# PURPOSE: High-performance time-series database
# Stores all price ticks, OHLCV bars
# Setup: Primary + 2 replicas with auto-failover
# Namespace: data-layer
# ═══════════════════════════════════════════════

# ─── STEP 4.1: ADD HELM REPO ─────────────────────
helm repo add timescale \
  https://charts.timescale.com/
helm repo update

# ─── STEP 4.2: TIMESCALEDB VALUES ────────────────
cat > infrastructure/kubernetes/helm-values/timescaledb-values.yaml << 'EOF'
# ═══════════════════════════════════════════════
# TIMESCALEDB PRODUCTION CONFIGURATION
# HA Patroni cluster: 1 primary + 2 replicas
# ═══════════════════════════════════════════════

replicaCount: 3

# Pin to data node
nodeSelector:
  node-role: data

image:
  tag: pg15-ts2.12-latest

# PostgreSQL configuration
patroni:
  log:
    level: WARNING

postgresql:
  parameters:
    # Memory configuration
    shared_buffers: "16GB"
    effective_cache_size: "48GB"
    maintenance_work_mem: "2GB"
    work_mem: "64MB"
    huge_pages: "try"

    # WAL configuration
    wal_level: "replica"
    wal_buffers: "64MB"
    max_wal_size: "4GB"
    min_wal_size: "1GB"
    checkpoint_completion_target: "0.9"

    # Connections
    max_connections: "300"

    # Parallel queries
    max_parallel_workers_per_gather: "4"
    max_parallel_workers: "8"
    max_worker_processes: "16"

    # Performance
    random_page_cost: "1.1"
    effective_io_concurrency: "200"
    default_statistics_target: "100"

    # Replication
    max_wal_senders: "10"
    hot_standby: "on"
    hot_standby_feedback: "on"

    # TimescaleDB specific
    timescaledb.max_background_workers: "16"
    timescaledb.telemetry_level: "off"
    shared_preload_libraries: "timescaledb"

persistence:
  enabled: true
  size: 1Ti
  storageClass: fast-nvme

resources:
  requests:
    memory: "32Gi"
    cpu: "8"
  limits:
    memory: "48Gi"
    cpu: "16"

# Backup to S3
backup:
  enabled: true
  pgBackRest:
    compress-type: lz4
    repo1-retention-full: "7"
    schedule: "0 2 * * *"

service:
  primary:
    type: ClusterIP
    port: 5432
  replica:
    type: ClusterIP
    port: 5432
EOF

# ─── STEP 4.3: INSTALL TIMESCALEDB ───────────────
helm install timescaledb timescale/timescaledb-single \
  --namespace data-layer \
  --values infrastructure/kubernetes/helm-values/timescaledb-values.yaml \
  --timeout 15m \
  --wait

# Wait for all pods ready
kubectl get pods -n data-layer -w

# Verify primary is ready
kubectl get pods -n data-layer -l \
  app=timescaledb,role=master

# ─── STEP 4.4: INITIALIZE DATABASE SCHEMA ────────
# FILE: infrastructure/database/timescaledb/init.sql

mkdir -p infrastructure/database/timescaledb

cat > infrastructure/database/timescaledb/init.sql << 'SQL'
-- ═══════════════════════════════════════════════
-- TIMESCALEDB SCHEMA INITIALIZATION
-- Run once after TimescaleDB is installed
-- ═══════════════════════════════════════════════

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- ─── TICK DATA TABLE ─────────────────────────────
CREATE TABLE IF NOT EXISTS ticks (
    time        TIMESTAMPTZ     NOT NULL,
    symbol      TEXT            NOT NULL,
    broker      TEXT            NOT NULL,
    bid         DOUBLE PRECISION NOT NULL,
    ask         DOUBLE PRECISION NOT NULL,
    spread      DOUBLE PRECISION
                GENERATED ALWAYS AS (ask - bid) STORED,
    mid         DOUBLE PRECISION
                GENERATED ALWAYS AS ((ask + bid) / 2) STORED,
    volume      DOUBLE PRECISION DEFAULT 0,
    source      TEXT            DEFAULT 'broker'
);

-- Convert to hypertable (time-partitioned)
SELECT create_hypertable(
    'ticks',
    'time',
    chunk_time_interval => INTERVAL '6 hours',
    if_not_exists => TRUE
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_ticks_symbol_time
    ON ticks (symbol, time DESC);
CREATE INDEX IF NOT EXISTS idx_ticks_broker_symbol_time
    ON ticks (broker, symbol, time DESC);

-- ─── OHLCV CONTINUOUS AGGREGATES ─────────────────
-- Auto-computed and updated, extremely fast to query

-- 1 Minute OHLCV
CREATE MATERIALIZED VIEW IF NOT EXISTS ohlcv_1m
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 minute', time)   AS bucket,
    symbol,
    broker,
    first(bid, time)                AS open,
    max(bid)                        AS high,
    min(bid)                        AS low,
    last(bid, time)                 AS close,
    first(ask, time)                AS open_ask,
    last(ask, time)                 AS close_ask,
    avg(spread)                     AS avg_spread,
    sum(volume)                     AS volume,
    count(*)                        AS tick_count
FROM ticks
GROUP BY bucket, symbol, broker
WITH NO DATA;

-- 5 Minute OHLCV
CREATE MATERIALIZED VIEW IF NOT EXISTS ohlcv_5m
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('5 minutes', time)  AS bucket,
    symbol,
    broker,
    first(bid, time)                AS open,
    max(bid)                        AS high,
    min(bid)                        AS low,
    last(bid, time)                 AS close,
    sum(volume)                     AS volume,
    count(*)                        AS tick_count
FROM ticks
GROUP BY bucket, symbol, broker
WITH NO DATA;

-- 1 Hour OHLCV
CREATE MATERIALIZED VIEW IF NOT EXISTS ohlcv_1h
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time)     AS bucket,
    symbol,
    broker,
    first(bid, time)                AS open,
    max(bid)                        AS high,
    min(bid)                        AS low,
    last(bid, time)                 AS close,
    sum(volume)                     AS volume
FROM ticks
GROUP BY bucket, symbol, broker
WITH NO DATA;

-- 1 Day OHLCV
CREATE MATERIALIZED VIEW IF NOT EXISTS ohlcv_1d
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 day', time)      AS bucket,
    symbol,
    broker,
    first(bid, time)                AS open,
    max(bid)                        AS high,
    min(bid)                        AS low,
    last(bid, time)                 AS close,
    sum(volume)                     AS volume
FROM ticks
GROUP BY bucket, symbol, broker
WITH NO DATA;

-- ─── REFRESH POLICIES ────────────────────────────
SELECT add_continuous_aggregate_policy('ohlcv_1m',
    start_offset  => INTERVAL '10 minutes',
    end_offset    => INTERVAL '1 minute',
    schedule_interval => INTERVAL '1 minute');

SELECT add_continuous_aggregate_policy('ohlcv_5m',
    start_offset  => INTERVAL '30 minutes',
    end_offset    => INTERVAL '5 minutes',
    schedule_interval => INTERVAL '5 minutes');

SELECT add_continuous_aggregate_policy('ohlcv_1h',
    start_offset  => INTERVAL '3 hours',
    end_offset    => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');

SELECT add_continuous_aggregate_policy('ohlcv_1d',
    start_offset  => INTERVAL '3 days',
    end_offset    => INTERVAL '1 day',
    schedule_interval => INTERVAL '1 day');

-- ─── COMPRESSION POLICY ──────────────────────────
-- Compress ticks older than 7 days
-- Reduces storage by 90%+
ALTER TABLE ticks SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol, broker',
    timescaledb.compress_orderby = 'time DESC'
);

SELECT add_compression_policy('ticks',
    INTERVAL '7 days');

-- ─── RETENTION POLICY ────────────────────────────
-- Keep raw ticks for 90 days
-- OHLCV aggregates kept forever (small size)
-- REMOVE THIS LINE if you want to keep all ticks:
SELECT add_retention_policy('ticks',
    INTERVAL '90 days');

-- ─── DATABASE USERS ──────────────────────────────
-- Create separate users per service
-- Principle of least privilege

-- Data Service: can write ticks, read everything
CREATE USER data_service_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT, INSERT ON ticks TO data_service_user;
GRANT SELECT ON ohlcv_1m, ohlcv_5m,
               ohlcv_1h, ohlcv_1d
    TO data_service_user;

-- Strategy Engine: read only
CREATE USER strategy_engine_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT ON ALL TABLES IN SCHEMA public
    TO strategy_engine_user;

-- Read-only analytics user
CREATE USER analytics_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT ON ALL TABLES IN SCHEMA public
    TO analytics_user;

-- Verify setup
\dt
SELECT * FROM timescaledb_information.hypertables;
SELECT * FROM timescaledb_information.continuous_aggregates;
SELECT * FROM timescaledb_information.jobs;

\echo '✅ TimescaleDB schema initialized'
SQL

# ─── STEP 4.5: APPLY SCHEMA ──────────────────────
# Copy SQL file to pod and execute

# Get TimescaleDB primary pod name
TSDB_POD=$(kubectl get pods -n data-layer \
  -l app=timescaledb,role=master \
  -o jsonpath='{.items[0].metadata.name}')

echo "TimescaleDB primary pod: $TSDB_POD"

# Copy init SQL to pod
kubectl cp infrastructure/database/timescaledb/init.sql \
  data-layer/$TSDB_POD:/tmp/init.sql

# Execute SQL
kubectl exec -n data-layer $TSDB_POD -- \
  psql -U postgres -d postgres \
  -f /tmp/init.sql

# Verify
kubectl exec -n data-layer $TSDB_POD -- \
  psql -U postgres -d postgres \
  -c "SELECT * FROM timescaledb_information.hypertables;"

echo "✅ TimescaleDB initialized"

INFRA 5: POSTGRESQL
bash# ═══════════════════════════════════════════════
# PURPOSE: Core business data
# Accounts, orders, positions, strategies
# Setup: 3-node HA with CloudNativePG operator
# Namespace: data-layer
# ═══════════════════════════════════════════════

# ─── STEP 5.1: INSTALL CLOUDNATIVEPG OPERATOR ────
# Best PostgreSQL operator for Kubernetes

kubectl apply -f \
  https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.22/releases/cnpg-1.22.0.yaml

# Wait for operator ready
kubectl rollout status deployment/cnpg-controller-manager \
  -n cnpg-system --timeout=3m

# ─── STEP 5.2: CREATE POSTGRESQL CLUSTER ─────────
# FILE: infrastructure/kubernetes/data-layer/postgresql-cluster.yaml

mkdir -p infrastructure/kubernetes/data-layer

cat > infrastructure/kubernetes/data-layer/postgresql-cluster.yaml << 'EOF'
# ═══════════════════════════════════════════════
# POSTGRESQL HA CLUSTER — CloudNativePG
# 1 Primary + 2 Replicas
# ═══════════════════════════════════════════════

apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: postgresql-trading
  namespace: data-layer
spec:
  instances: 3

  imageName: ghcr.io/cloudnative-pg/postgresql:15.5

  # Primary always on data node
  affinity:
    nodeSelector:
      node-role: data
    podAntiAffinityType: preferred

  postgresql:
    parameters:
      # Memory
      shared_buffers: "4GB"
      effective_cache_size: "12GB"
      maintenance_work_mem: "1GB"
      work_mem: "32MB"
      huge_pages: "try"

      # Connections
      max_connections: "500"

      # WAL
      wal_level: "replica"
      wal_buffers: "64MB"
      max_wal_size: "2GB"
      min_wal_size: "512MB"
      checkpoint_completion_target: "0.9"

      # Performance
      random_page_cost: "1.1"
      effective_io_concurrency: "200"
      default_statistics_target: "100"

      # Parallel
      max_parallel_workers_per_gather: "4"
      max_parallel_workers: "8"
      max_worker_processes: "16"

      # Replication
      max_wal_senders: "10"
      hot_standby: "on"
      hot_standby_feedback: "on"

      # Extensions
      shared_preload_libraries: "pg_stat_statements"

    pg_hba:
      # Allow all users from K8s cluster
      - host all all 10.0.0.0/8 md5
      # Allow replication
      - host replication streaming_replica 10.0.0.0/8 md5

  storage:
    size: 200Gi
    storageClass: fast-nvme

  resources:
    requests:
      memory: "8Gi"
      cpu: "2"
    limits:
      memory: "16Gi"
      cpu: "4"

  monitoring:
    enablePodMonitor: true

  backup:
    retentionPolicy: "30d"
    barmanObjectStore:
      destinationPath: "s3://your-bucket/postgresql-trading"
      endpointURL: "https://s3.amazonaws.com"
      s3Credentials:
        accessKeyId:
          name: backup-s3-secret
          key: ACCESS_KEY_ID
        secretAccessKey:
          name: backup-s3-secret
          key: SECRET_ACCESS_KEY
      wal:
        compression: gzip
      data:
        compression: gzip

  # Scheduled backups
  scheduledBackup:
    - name: daily-backup
      schedule: "0 2 * * *"
      backupOwnerReference: self
EOF

# Create S3 backup secret first
kubectl create secret generic backup-s3-secret \
  --namespace data-layer \
  --from-literal=ACCESS_KEY_ID="YOUR_S3_ACCESS_KEY" \
  --from-literal=SECRET_ACCESS_KEY="YOUR_S3_SECRET_KEY"

# Apply PostgreSQL cluster
kubectl apply -f \
  infrastructure/kubernetes/data-layer/postgresql-cluster.yaml

# Watch cluster come up (takes 5-10 minutes)
kubectl get cluster -n data-layer -w

# Check all 3 instances running
kubectl get pods -n data-layer -w

# ─── STEP 5.3: INSTALL PGBOUNCER ─────────────────
# Connection pooler — critical for microservices
# Services connect to PgBouncer, not PostgreSQL directly

cat > infrastructure/kubernetes/data-layer/pgbouncer.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbouncer
  namespace: data-layer
spec:
  replicas: 2
  selector:
    matchLabels:
      app: pgbouncer
  template:
    metadata:
      labels:
        app: pgbouncer
    spec:
      nodeSelector:
        node-role: data
      containers:
      - name: pgbouncer
        image: bitnami/pgbouncer:1.22.0
        ports:
        - containerPort: 5432
          name: postgresql
        env:
        - name: POSTGRESQL_HOST
          value: "postgresql-trading-rw.data-layer.svc.cluster.local"
        - name: POSTGRESQL_PORT
          value: "5432"
        - name: PGBOUNCER_DATABASE
          value: "trading"
        - name: POSTGRESQL_USERNAME
          value: "pgbouncer_user"
        - name: POSTGRESQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: pgbouncer-secret
              key: password
        - name: PGBOUNCER_POOL_MODE
          value: "transaction"
        - name: PGBOUNCER_MAX_CLIENT_CONN
          value: "10000"
        - name: PGBOUNCER_DEFAULT_POOL_SIZE
          value: "100"
        - name: PGBOUNCER_MIN_POOL_SIZE
          value: "10"
        - name: PGBOUNCER_RESERVE_POOL_SIZE
          value: "20"
        - name: PGBOUNCER_SERVER_IDLE_TIMEOUT
          value: "600"
        - name: PGBOUNCER_IGNORE_STARTUP_PARAMETERS
          value: "extra_float_digits"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          tcpSocket:
            port: 5432
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          tcpSocket:
            port: 5432
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: pgbouncer
  namespace: data-layer
spec:
  selector:
    app: pgbouncer
  ports:
  - port: 5432
    targetPort: 5432
  type: ClusterIP
EOF

kubectl apply -f \
  infrastructure/kubernetes/data-layer/pgbouncer.yaml

# ─── STEP 5.4: POSTGRESQL SCHEMA ─────────────────
# FILE: infrastructure/database/postgresql/init.sql

mkdir -p infrastructure/database/postgresql

cat > infrastructure/database/postgresql/init.sql << 'SQL'
-- ═══════════════════════════════════════════════
-- POSTGRESQL TRADING PLATFORM SCHEMA
-- Core business data
-- ═══════════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ─── BROKERS TABLE ───────────────────────────────
CREATE TABLE IF NOT EXISTS brokers (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name            TEXT UNIQUE NOT NULL,
    display_name    TEXT NOT NULL,
    type            TEXT NOT NULL
                    CHECK (type IN (
                        'MT4','MT5','CTRADER',
                        'IB','FIX','BINANCE',
                        'ALPACA','CUSTOM')),
    server          TEXT,
    port            INTEGER,
    login           TEXT,
    is_demo         BOOLEAN DEFAULT false,
    is_active       BOOLEAN DEFAULT true,
    connection_config JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ACCOUNTS TABLE ──────────────────────────────
CREATE TABLE IF NOT EXISTS accounts (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    broker_id       UUID NOT NULL REFERENCES brokers(id),
    account_number  TEXT NOT NULL,
    account_name    TEXT,
    currency        TEXT NOT NULL DEFAULT 'USD',
    balance         DECIMAL(20,8) DEFAULT 0,
    equity          DECIMAL(20,8) DEFAULT 0,
    margin_used     DECIMAL(20,8) DEFAULT 0,
    margin_free     DECIMAL(20,8) DEFAULT 0,
    margin_level    DECIMAL(10,4) DEFAULT 0,
    leverage        INTEGER DEFAULT 100,
    group_name      TEXT,
    is_master       BOOLEAN DEFAULT false,
    master_id       UUID REFERENCES accounts(id),
    copy_ratio      DECIMAL(5,4) DEFAULT 1.0,
    is_active       BOOLEAN DEFAULT true,
    last_sync       TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(broker_id, account_number)
);

-- ─── STRATEGIES TABLE ────────────────────────────
CREATE TABLE IF NOT EXISTS strategies (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    strategy_id     TEXT UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    description     TEXT,
    version         TEXT DEFAULT '1.0.0',
    asset_class     TEXT,
    symbols         TEXT[] DEFAULT '{}',
    timeframes      TEXT[] DEFAULT '{}',
    parameters      JSONB DEFAULT '{}',
    risk_per_trade  DECIMAL(5,4) DEFAULT 0.01,
    max_positions   INTEGER DEFAULT 5,
    is_active       BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ACCOUNT-STRATEGY MAPPING ────────────────────
CREATE TABLE IF NOT EXISTS account_strategies (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id),
    strategy_id     UUID NOT NULL REFERENCES strategies(id),
    risk_pct        DECIMAL(5,4) DEFAULT 0.01,
    max_positions   INTEGER DEFAULT 5,
    lot_multiplier  DECIMAL(5,2) DEFAULT 1.0,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(account_id, strategy_id)
);

-- ─── ORDERS TABLE (Partitioned) ──────────────────
CREATE TABLE IF NOT EXISTS orders (
    id              UUID DEFAULT uuid_generate_v4(),
    account_id      UUID NOT NULL,
    broker_order_id TEXT,
    symbol          TEXT NOT NULL,
    order_type      TEXT NOT NULL
                    CHECK (order_type IN (
                        'MARKET','LIMIT','STOP',
                        'STOP_LIMIT','TRAILING_STOP')),
    side            TEXT NOT NULL CHECK (side IN ('BUY','SELL')),
    quantity        DECIMAL(20,8) NOT NULL,
    requested_price DECIMAL(20,8),
    fill_price      DECIMAL(20,8),
    slippage_pips   DECIMAL(10,4),
    commission      DECIMAL(20,8) DEFAULT 0,
    swap            DECIMAL(20,8) DEFAULT 0,
    stop_loss       DECIMAL(20,8),
    take_profit     DECIMAL(20,8),
    trailing_stop   DECIMAL(20,8),
    status          TEXT NOT NULL DEFAULT 'CREATED'
                    CHECK (status IN (
                        'CREATED','RISK_CHECK',
                        'APPROVED','REJECTED',
                        'SUBMITTED','PENDING',
                        'PARTIALLY_FILLED',
                        'FILLED','CANCELLED','TIMEOUT')),
    reject_reason   TEXT,
    strategy_id     TEXT,
    signal_id       UUID,
    kafka_offset    BIGINT,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    submitted_at    TIMESTAMPTZ,
    filled_at       TIMESTAMPTZ,
    cancelled_at    TIMESTAMPTZ,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions by month
CREATE TABLE orders_2026_01
    PARTITION OF orders
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE orders_2026_02
    PARTITION OF orders
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
-- Add more partitions monthly

-- Indexes
CREATE INDEX idx_orders_account
    ON orders(account_id, created_at DESC);
CREATE INDEX idx_orders_status
    ON orders(status)
    WHERE status IN ('PENDING','SUBMITTED','PARTIALLY_FILLED');
CREATE INDEX idx_orders_symbol
    ON orders(symbol, created_at DESC);

-- ─── POSITIONS TABLE ─────────────────────────────
CREATE TABLE IF NOT EXISTS positions (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID NOT NULL,
    broker_pos_id   TEXT,
    symbol          TEXT NOT NULL,
    side            TEXT NOT NULL CHECK (side IN ('BUY','SELL')),
    quantity        DECIMAL(20,8) NOT NULL,
    entry_price     DECIMAL(20,8) NOT NULL,
    current_price   DECIMAL(20,8),
    stop_loss       DECIMAL(20,8),
    take_profit     DECIMAL(20,8),
    unrealized_pnl  DECIMAL(20,8) DEFAULT 0,
    realized_pnl    DECIMAL(20,8) DEFAULT 0,
    commission      DECIMAL(20,8) DEFAULT 0,
    swap            DECIMAL(20,8) DEFAULT 0,
    strategy_id     TEXT,
    open_order_id   UUID,
    close_order_id  UUID,
    is_open         BOOLEAN DEFAULT true,
    opened_at       TIMESTAMPTZ DEFAULT NOW(),
    closed_at       TIMESTAMPTZ,
    duration_seconds INTEGER
        GENERATED ALWAYS AS (
            EXTRACT(EPOCH FROM (
                COALESCE(closed_at, NOW()) - opened_at
            ))::INTEGER
        ) STORED
);

CREATE INDEX idx_positions_account_open
    ON positions(account_id)
    WHERE is_open = true;
CREATE INDEX idx_positions_symbol_open
    ON positions(symbol)
    WHERE is_open = true;

-- ─── DAILY SNAPSHOTS ─────────────────────────────
CREATE TABLE IF NOT EXISTS daily_snapshots (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID NOT NULL,
    date            DATE NOT NULL,
    opening_balance DECIMAL(20,8) DEFAULT 0,
    closing_balance DECIMAL(20,8) DEFAULT 0,
    daily_pnl       DECIMAL(20,8) DEFAULT 0,
    daily_pnl_pct   DECIMAL(10,6) DEFAULT 0,
    peak_balance    DECIMAL(20,8) DEFAULT 0,
    drawdown_pct    DECIMAL(10,6) DEFAULT 0,
    trades_count    INTEGER DEFAULT 0,
    win_count       INTEGER DEFAULT 0,
    loss_count      INTEGER DEFAULT 0,
    gross_profit    DECIMAL(20,8) DEFAULT 0,
    gross_loss      DECIMAL(20,8) DEFAULT 0,
    commission_paid DECIMAL(20,8) DEFAULT 0,
    UNIQUE(account_id, date)
);

-- ─── RISK EVENTS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS risk_events (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID,
    event_type      TEXT NOT NULL,
    rule_triggered  TEXT NOT NULL,
    severity        TEXT DEFAULT 'WARNING'
                    CHECK (severity IN (
                        'INFO','WARNING','CRITICAL')),
    current_value   DECIMAL(20,8),
    limit_value     DECIMAL(20,8),
    action_taken    TEXT,
    order_id        UUID,
    details         JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AUDIT LOG ───────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id         TEXT,
    service         TEXT NOT NULL,
    action          TEXT NOT NULL,
    resource_type   TEXT,
    resource_id     UUID,
    changes         JSONB DEFAULT '{}',
    ip_address      TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DATABASE USERS ──────────────────────────────
CREATE USER order_manager_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT, INSERT, UPDATE ON orders, positions
    TO order_manager_user;
GRANT SELECT ON accounts, brokers, strategies
    TO order_manager_user;

CREATE USER risk_engine_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT ON orders, positions, accounts,
               daily_snapshots
    TO risk_engine_user;
GRANT INSERT ON risk_events TO risk_engine_user;

CREATE USER portfolio_tracker_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT ON ALL TABLES IN SCHEMA public
    TO portfolio_tracker_user;
GRANT INSERT, UPDATE ON daily_snapshots, positions
    TO portfolio_tracker_user;

CREATE USER account_manager_user
    WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT SELECT, UPDATE ON accounts
    TO account_manager_user;
GRANT INSERT ON audit_log TO account_manager_user;

-- ─── UPDATED_AT TRIGGER ───────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_brokers_updated_at
    BEFORE UPDATE ON brokers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_strategies_updated_at
    BEFORE UPDATE ON strategies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

\echo '✅ PostgreSQL schema initialized'
SQL

# Apply schema
PG_PRIMARY=$(kubectl get pods -n data-layer \
  -l cnpg.io/instanceRole=primary \
  -o jsonpath='{.items[0].metadata.name}')

kubectl cp infrastructure/database/postgresql/init.sql \
  data-layer/$PG_PRIMARY:/tmp/init.sql

kubectl exec -n data-layer $PG_PRIMARY -- \
  psql -U postgres -c "CREATE DATABASE trading;"

kubectl exec -n data-layer $PG_PRIMARY -- \
  psql -U postgres -d trading -f /tmp/init.sql

echo "✅ PostgreSQL fully configured"

INFRA 6: REDIS CLUSTER
bash# ═══════════════════════════════════════════════
# PURPOSE: Live cache, pub/sub messaging
# Setup: Master + 2 replicas + Sentinel (HA)
# Namespace: data-layer
# ═══════════════════════════════════════════════

cat > infrastructure/kubernetes/helm-values/redis-values.yaml << 'EOF'
architecture: replication

auth:
  enabled: true
  password: "CHANGE_THIS_STRONG_PASSWORD"

master:
  nodeSelector:
    node-role: data

  persistence:
    enabled: true
    size: 20Gi
    storageClass: fast-ssd

  resources:
    requests:
      memory: "4Gi"
      cpu: "1"
    limits:
      memory: "8Gi"
      cpu: "2"

  configuration: |
    maxmemory 6gb
    maxmemory-policy allkeys-lru
    activerehashing yes
    hz 100
    aof-use-rdb-preamble yes
    # Persistence
    save 900 1
    save 300 10
    save 60 10000
    appendonly yes
    appendfsync everysec
    # Performance
    tcp-keepalive 300
    timeout 0
    tcp-backlog 511
    databases 16

replica:
  replicaCount: 2

  nodeSelector:
    node-role: data

  persistence:
    enabled: true
    size: 20Gi
    storageClass: fast-ssd

  resources:
    requests:
      memory: "2Gi"
      cpu: "500m"
    limits:
      memory: "4Gi"
      cpu: "1"

sentinel:
  enabled: true
  quorum: 2
  downAfterMilliseconds: 5000
  failoverTimeout: 60000

metrics:
  enabled: true
  serviceMonitor:
    enabled: true
    namespace: monitoring
EOF

helm install redis bitnami/redis \
  --namespace data-layer \
  --values infrastructure/kubernetes/helm-values/redis-values.yaml \
  --wait --timeout 10m

# Verify Redis
REDIS_POD=$(kubectl get pods -n data-layer \
  -l app.kubernetes.io/component=master \
  -o jsonpath='{.items[0].metadata.name}')

kubectl exec -n data-layer $REDIS_POD -- \
  redis-cli -a "CHANGE_THIS_STRONG_PASSWORD" \
  PING
# Expected: PONG

# Test pub/sub
kubectl exec -n data-layer $REDIS_POD -- \
  redis-cli -a "CHANGE_THIS_STRONG_PASSWORD" \
  SUBSCRIBE test-channel &

kubectl exec -n data-layer $REDIS_POD -- \
  redis-cli -a "CHANGE_THIS_STRONG_PASSWORD" \
  PUBLISH test-channel "hello"

echo "✅ Redis configured"

INFRA 7: HASHICORP VAULT
bash# ═══════════════════════════════════════════════
# PURPOSE: Secret management
# NO hardcoded passwords anywhere
# All credentials stored and rotated by Vault
# Namespace: vault
# ═══════════════════════════════════════════════

# ─── INSTALL VAULT ───────────────────────────────
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

cat > infrastructure/kubernetes/helm-values/vault-values.yaml << 'EOF'
global:
  enabled: true

server:
  ha:
    enabled: true
    replicas: 3

    raft:
      enabled: true
      config: |
        ui = true

        listener "tcp" {
          tls_disable = 1
          address = "[::]:8200"
          cluster_address = "[::]:8201"
        }

        storage "raft" {
          path = "/vault/data"
          retry_join {
            leader_api_addr = "http://vault-0.vault-internal:8200"
          }
          retry_join {
            leader_api_addr = "http://vault-1.vault-internal:8200"
          }
          retry_join {
            leader_api_addr = "http://vault-2.vault-internal:8200"
          }
        }

        service_registration "kubernetes" {}

  nodeSelector:
    node-role: monitoring

  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"

  dataStorage:
    enabled: true
    size: 10Gi
    storageClass: fast-ssd

  auditStorage:
    enabled: true
    size: 10Gi

ui:
  enabled: true
  serviceType: ClusterIP

injector:
  enabled: true
  replicas: 2
EOF

kubectl create namespace vault

helm install vault hashicorp/vault \
  --namespace vault \
  --values infrastructure/kubernetes/helm-values/vault-values.yaml \
  --wait --timeout 5m

# ─── INITIALIZE VAULT ────────────────────────────
# CRITICAL: Save the output below very securely
# Loss of unseal keys = loss of all secrets

kubectl exec -n vault vault-0 -- vault operator init \
  -key-shares=5 \
  -key-threshold=3 \
  -format=json > vault-init-keys.json

# !!! SAVE vault-init-keys.json OFFLINE !!!
# Store in: hardware security module, password manager,
# secure physical location
cat vault-init-keys.json
# You will see 5 unseal keys and 1 root token

# ─── UNSEAL VAULT ────────────────────────────────
# Need 3 of 5 keys to unseal
# Extract keys from JSON:
KEY1=$(cat vault-init-keys.json | \
  python3 -c "import sys,json; \
  d=json.load(sys.stdin); \
  print(d['unseal_keys_b64'][0])")

KEY2=$(cat vault-init-keys.json | \
  python3 -c "import sys,json; \
  d=json.load(sys.stdin); \
  print(d['unseal_keys_b64'][1])")

KEY3=$(cat vault-init-keys.json | \
  python3 -c "import sys,json; \
  d=json.load(sys.stdin); \
  print(d['unseal_keys_b64'][2])")

ROOT_TOKEN=$(cat vault-init-keys.json | \
  python3 -c "import sys,json; \
  d=json.load(sys.stdin); \
  print(d['root_token'])")

# Unseal each vault pod
for POD in vault-0 vault-1 vault-2; do
  echo "Unsealing $POD..."
  kubectl exec -n vault $POD -- vault operator unseal $KEY1
  kubectl exec -n vault $POD -- vault operator unseal $KEY2
  kubectl exec -n vault $POD -- vault operator unseal $KEY3
done

# Verify all sealed=false
kubectl exec -n vault vault-0 -- vault status

# ─── CONFIGURE VAULT ─────────────────────────────
# Login with root token
kubectl exec -n vault vault-0 -- \
  vault login $ROOT_TOKEN

# Enable Kubernetes auth (services authenticate via K8s SA)
kubectl exec -n vault vault-0 -- \
  vault auth enable kubernetes

kubectl exec -n vault vault-0 -- \
  vault write auth/kubernetes/config \
    kubernetes_host="https://kubernetes.default.svc:443"

# Enable secrets engine
kubectl exec -n vault vault-0 -- \
  vault secrets enable -path=secret kv-v2

# Enable database secrets engine (dynamic DB credentials)
kubectl exec -n vault vault-0 -- \
  vault secrets enable database

# ─── STORE ALL SECRETS ───────────────────────────
# FILE: infrastructure/scripts/vault-setup-secrets.sh

cat > infrastructure/scripts/vault-setup-secrets.sh << 'SCRIPT'
#!/bin/bash
# Store all platform secrets in Vault
# Run after Vault is initialized and unsealed

VAULT_ADDR="http://vault.vault.svc.cluster.local:8200"
VAULT_TOKEN="YOUR_ROOT_TOKEN_HERE"

export VAULT_ADDR
export VAULT_TOKEN

vault_write() {
  kubectl exec -n vault vault-0 -- \
    vault kv put "$@"
}

echo "Storing TimescaleDB secrets..."
vault_write secret/trading/timescaledb \
  host="timescaledb.data-layer.svc.cluster.local" \
  port="5432" \
  database="postgres" \
  data_service_password="STRONG_PASSWORD_1" \
  strategy_engine_password="STRONG_PASSWORD_2" \
  analytics_password="STRONG_PASSWORD_3"

echo "Storing PostgreSQL secrets..."
vault_write secret/trading/postgresql \
  host="pgbouncer.data-layer.svc.cluster.local" \
  port="5432" \
  database="trading" \
  order_manager_password="STRONG_PASSWORD_4" \
  risk_engine_password="STRONG_PASSWORD_5" \
  portfolio_tracker_password="STRONG_PASSWORD_6" \
  account_manager_password="STRONG_PASSWORD_7"

echo "Storing Redis secrets..."
vault_write secret/trading/redis \
  host="redis-master.data-layer.svc.cluster.local" \
  port="6379" \
  password="STRONG_PASSWORD_8"

echo "Storing Kafka secrets..."
vault_write secret/trading/kafka \
  bootstrap_servers="kafka-controller-0.kafka-controller-headless.kafka.svc.cluster.local:9092,kafka-controller-1.kafka-controller-headless.kafka.svc.cluster.local:9092,kafka-controller-2.kafka-controller-headless.kafka.svc.cluster.local:9092" \
  data_service_password="KAFKA_PASSWORD_1" \
  strategy_engine_password="KAFKA_PASSWORD_2" \
  order_manager_password="KAFKA_PASSWORD_3" \
  risk_engine_password="KAFKA_PASSWORD_4" \
  broker_connector_password="KAFKA_PASSWORD_5"

echo "Storing Broker credentials..."
vault_write secret/trading/brokers/mt5 \
  server="YOUR_MT5_SERVER" \
  login="YOUR_MT5_LOGIN" \
  password="YOUR_MT5_PASSWORD"

vault_write secret/trading/brokers/interactive_brokers \
  host="YOUR_IB_HOST" \
  port="4001" \
  client_id="1"

vault_write secret/trading/brokers/ctrader \
  client_id="YOUR_CTRADER_CLIENT_ID" \
  client_secret="YOUR_CTRADER_SECRET"

echo "Setting up Vault policies..."

# Policy for data-service
kubectl exec -n vault vault-0 -- vault policy write data-service - << 'POLICY'
path "secret/data/trading/timescaledb" {
  capabilities = ["read"]
}
path "secret/data/trading/kafka" {
  capabilities = ["read"]
}
path "secret/data/trading/redis" {
  capabilities = ["read"]
}
POLICY

# Policy for order-manager
kubectl exec -n vault vault-0 -- vault policy write order-manager - << 'POLICY'
path "secret/data/trading/postgresql" {
  capabilities = ["read"]
}
path "secret/data/trading/kafka" {
  capabilities = ["read"]
}
path "secret/data/trading/redis" {
  capabilities = ["read"]
}
path "secret/data/trading/brokers/*" {
  capabilities = ["read"]
}
POLICY

# Policy for strategy-engine
kubectl exec -n vault vault-0 -- vault policy write strategy-engine - << 'POLICY'
path "secret/data/trading/kafka" {
  capabilities = ["read"]
}
path "secret/data/trading/redis" {
  capabilities = ["read"]
}
path "secret/data/trading/timescaledb" {
  capabilities = ["read"]
}
POLICY

echo "Creating Kubernetes auth roles..."

# Role for each service
for SERVICE in data-service strategy-engine \
               order-manager risk-engine \
               account-manager broker-connector \
               portfolio-tracker alert-service; do

  # Create K8s service account
  kubectl create serviceaccount $SERVICE \
    -n trading 2>/dev/null || true

  # Create Vault role
  kubectl exec -n vault vault-0 -- \
    vault write auth/kubernetes/role/$SERVICE \
      bound_service_account_names=$SERVICE \
      bound_service_account_namespaces=trading \
      policies=$SERVICE \
      ttl=1h
done

echo "✅ All secrets stored in Vault"
SCRIPT

chmod +x infrastructure/scripts/vault-setup-secrets.sh
bash infrastructure/scripts/vault-setup-secrets.sh

echo "✅ Vault fully configured"

INFRA 8: ARGOCD (GITOPS)
bash# ═══════════════════════════════════════════════
# PURPOSE: GitOps continuous deployment
# Every git push auto-deploys to K8s
# Never manually apply kubectl — ArgoCD does it
# Namespace: argocd
# ═══════════════════════════════════════════════

# ─── INSTALL ARGOCD ──────────────────────────────
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

cat > infrastructure/kubernetes/helm-values/argocd-values.yaml << 'EOF'
global:
  nodeSelector:
    node-role: monitoring

server:
  replicas: 2

  ingress:
    enabled: true
    ingressClassName: nginx
    hostname: argocd.internal.trading.com
    tls: true
    annotations:
      cert-manager.io/cluster-issuer: selfsigned-issuer

  config:
    url: https://argocd.internal.trading.com

    # RBAC config
    policy.default: role:readonly
    policy.csv: |
      p, role:admin, applications, *, */*, allow
      p, role:admin, clusters, get, *, allow
      p, role:admin, repositories, *, *, allow
      g, trading-admins, role:admin

  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"

repoServer:
  replicas: 2
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"

applicationSet:
  replicas: 2

redis:
  enabled: true

metrics:
  enabled: true
  serviceMonitor:
    enabled: true
    namespace: monitoring
EOF

helm install argocd argo/argo-cd \
  --namespace argocd \
  --values infrastructure/kubernetes/helm-values/argocd-values.yaml \
  --wait --timeout 10m

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
echo ""
# SAVE THIS PASSWORD

# Login via CLI
argocd login argocd.internal.trading.com \
  --username admin \
  --password "THE_PASSWORD_FROM_ABOVE" \
  --insecure

# Change admin password immediately
argocd account update-password \
  --current-password "OLD_PASSWORD" \
  --new-password "YOUR_STRONG_NEW_PASSWORD"

# ─── CONNECT YOUR GIT REPOSITORY ─────────────────
argocd repo add https://github.com/yourorg/trading-platform \
  --username git \
  --password "YOUR_GITHUB_TOKEN"

# ─── CREATE APP-OF-APPS ──────────────────────────
# This one ArgoCD app manages ALL other apps
# FILE: infrastructure/kubernetes/argocd/app-of-apps.yaml

mkdir -p infrastructure/kubernetes/argocd

cat > infrastructure/kubernetes/argocd/app-of-apps.yaml << 'EOF'
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: trading-platform-apps
  namespace: argocd
  finalizers:
  - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/yourorg/trading-platform
    targetRevision: main
    path: infrastructure/kubernetes/argocd/applications
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
EOF

kubectl apply -f \
  infrastructure/kubernetes/argocd/app-of-apps.yaml

# ─── CREATE INDIVIDUAL APP DEFINITIONS ───────────
mkdir -p infrastructure/kubernetes/argocd/applications

# Data Service app
cat > infrastructure/kubernetes/argocd/applications/data-service.yaml << 'EOF'
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: data-service
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourorg/trading-platform
    targetRevision: main
    path: infrastructure/kubernetes/apps/data-service
  destination:
    server: https://kubernetes.default.svc
    namespace: trading
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
EOF

# Repeat for each service...
# strategy-engine, order-manager, risk-engine,
# account-manager, broker-connector,
# portfolio-tracker, alert-service, api-gateway

echo "✅ ArgoCD configured. Push to git to deploy."

INFRA 9: MONITORING STACK
bash# ═══════════════════════════════════════════════
# PURPOSE: Full observability
# Prometheus + Grafana + Loki + Jaeger
# Namespace: monitoring
# ═══════════════════════════════════════════════

# ─── INSTALL KUBE-PROMETHEUS-STACK ───────────────
# Installs: Prometheus + Grafana + Alertmanager
# + Node Exporter + Kube State Metrics

helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts
helm repo update

cat > infrastructure/kubernetes/helm-values/prometheus-values.yaml << 'EOF'
# ═══════════════════════════════════════════════
# PROMETHEUS + GRAFANA + ALERTMANAGER
# ═══════════════════════════════════════════════

global:
  nodeSelector:
    node-role: monitoring

# Prometheus
prometheus:
  prometheusSpec:
    replicas: 2
    retention: 30d
    retentionSize: "100GB"

    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: fast-ssd
          resources:
            requests:
              storage: 100Gi

    resources:
      requests:
        memory: "4Gi"
        cpu: "1"
      limits:
        memory: "8Gi"
        cpu: "2"

    # Scrape all pods with prometheus annotations
    podMonitorSelectorNilUsesHelmValues: false
    serviceMonitorSelectorNilUsesHelmValues: false

    # Additional scrape configs for trading services
    additionalScrapeConfigs:
    - job_name: 'trading-services'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['trading']
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: (\d+)
        replacement: $1

# Grafana
grafana:
  replicas: 1

  adminUser: admin
  adminPassword: "CHANGE_THIS_PASSWORD"

  persistence:
    enabled: true
    size: 10Gi
    storageClass: fast-ssd

  ingress:
    enabled: true
    ingressClassName: nginx
    hosts:
    - grafana.internal.trading.com
    tls:
    - secretName: grafana-tls
      hosts:
      - grafana.internal.trading.com

  grafana.ini:
    server:
      root_url: https://grafana.internal.trading.com
    security:
      allow_embedding: true
    auth.anonymous:
      enabled: false
    users:
      auto_assign_org: true
      auto_assign_org_role: Viewer

  # Pre-configure datasources
  datasources:
    datasources.yaml:
      apiVersion: 1
      datasources:
      - name: Prometheus
        type: prometheus
        url: http://kube-prometheus-stack-prometheus:9090
        isDefault: true

      - name: Loki
        type: loki
        url: http://loki:3100

      - name: Jaeger
        type: jaeger
        url: http://jaeger-query:16686

  # Pre-load dashboards
  dashboardProviders:
    dashboardproviders.yaml:
      apiVersion: 1
      providers:
      - name: trading
        folder: Trading Platform
        type: file
        options:
          path: /var/lib/grafana/dashboards/trading

  resources:
    requests:
      memory: "512Mi"
      cpu: "250m"
    limits:
      memory: "1Gi"
      cpu: "500m"

# Alertmanager
alertmanager:
  alertmanagerSpec:
    replicas: 2

    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: fast-ssd
          resources:
            requests:
              storage: 10Gi

  config:
    global:
      smtp_smarthost: 'smtp.gmail.com:587'
      smtp_from: 'alerts@yourdomain.com'
      smtp_auth_username: 'alerts@yourdomain.com'
      smtp_auth_password: 'YOUR_EMAIL_PASSWORD'

    route:
      group_by: ['alertname', 'account_id']
      group_wait: 10s
      group_interval: 5m
      repeat_interval: 1h
      receiver: 'telegram-default'
      routes:
      - match:
          severity: critical
        receiver: 'critical-all-channels'
        repeat_interval: 5m
      - match:
          severity: warning
        receiver: 'telegram-default'

    receivers:
    - name: 'telegram-default'
      telegram_configs:
      - bot_token: 'YOUR_TELEGRAM_BOT_TOKEN'
        chat_id: YOUR_TELEGRAM_CHAT_ID
        message: |
          🔔 *{{ .GroupLabels.alertname }}*
          {{ range .Alerts }}
          *Status:* {{ .Status }}
          *Summary:* {{ .Annotations.summary }}
          *Description:* {{ .Annotations.description }}
          {{ end }}

    - name: 'critical-all-channels'
      telegram_configs:
      - bot_token: 'YOUR_TELEGRAM_BOT_TOKEN'
        chat_id: YOUR_TELEGRAM_CHAT_ID
        message: |
          🚨 *CRITICAL ALERT*
          *{{ .GroupLabels.alertname }}*
          {{ range .Alerts }}{{ .Annotations.summary }}{{ end }}
      email_configs:
      - to: 'your-email@domain.com'
        subject: '🚨 CRITICAL: {{ .GroupLabels.alertname }}'
        send_resolved: true

# Node Exporter (system metrics)
nodeExporter:
  enabled: true

# Kube State Metrics (K8s metrics)
kubeStateMetrics:
  enabled: true
EOF

helm install kube-prometheus-stack \
  prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --values infrastructure/kubernetes/helm-values/prometheus-values.yaml \
  --wait --timeout 15m

# ─── INSTALL LOKI (LOG AGGREGATION) ──────────────
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

cat > infrastructure/kubernetes/helm-values/loki-values.yaml << 'EOF'
loki:
  commonConfig:
    replication_factor: 3

  storage:
    type: filesystem

  auth_enabled: false

  limits_config:
    retention_period: 30d
    ingestion_rate_mb: 64
    ingestion_burst_size_mb: 128
    max_streams_per_user: 10000

singleBinary:
  replicas: 1

  nodeSelector:
    node-role: monitoring

  persistence:
    enabled: true
    size: 200Gi
    storageClass: fast-ssd

  resources:
    requests:
      memory: "2Gi"
      cpu: "500m"
    limits:
      memory: "4Gi"
      cpu: "1"

# Promtail — collects logs from all pods
promtail:
  enabled: true

  config:
    clients:
    - url: http://loki:3100/loki/api/v1/push

    scrape_configs:
    - job_name: kubernetes-pods
      kubernetes_sd_configs:
      - role: pod
      pipeline_stages:
      - docker: {}
      - json:
          expressions:
            level: level
            service: service
            trace_id: trace_id
            order_id: order_id
      - labels:
          level:
          service:
          trace_id:
EOF

helm install loki grafana/loki-stack \
  --namespace monitoring \
  --values infrastructure/kubernetes/helm-values/loki-values.yaml \
  --wait --timeout 10m

# ─── INSTALL JAEGER (DISTRIBUTED TRACING) ────────
helm repo add jaegertracing \
  https://jaegertracing.github.io/helm-charts
helm repo update

cat > infrastructure/kubernetes/helm-values/jaeger-values.yaml << 'EOF'
provisionDataStore:
  cassandra: false
  elasticsearch: false
  kafka: false

storage:
  type: memory    # Start with memory, move to ES for prod
  # type: elasticsearch
  # elasticsearch:
  #   host: elasticsearch
  #   port: 9200

allInOne:
  enabled: true

  nodeSelector:
    node-role: monitoring

  ingress:
    enabled: true
    ingressClassName: nginx
    hosts:
    - jaeger.internal.trading.com

  resources:
    requests:
      memory: "512Mi"
      cpu: "250m"
    limits:
      memory: "1Gi"
      cpu: "500m"
EOF

helm install jaeger jaegertracing/jaeger \
  --namespace monitoring \
  --values infrastructure/kubernetes/helm-values/jaeger-values.yaml \
  --wait --timeout 5m

# ─── TRADING ALERT RULES ─────────────────────────
# FILE: infrastructure/kubernetes/monitoring/trading-alerts.yaml

cat > infrastructure/kubernetes/monitoring/trading-alerts.yaml << 'EOF'
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: trading-alerts
  namespace: monitoring
spec:
  groups:
  - name: trading.critical
    interval: 30s
    rules:

    - alert: KillSwitchActivated
      expr: trading_kill_switch_active{} == 1
      for: 0m
      labels:
        severity: critical
      annotations:
        summary: "Kill switch activated on {{ $labels.account_id }}"
        description: "Immediate action required"

    - alert: OrderManagerDown
      expr: up{job="order-manager"} == 0
      for: 30s
      labels:
        severity: critical
      annotations:
        summary: "Order Manager is DOWN"
        description: "No orders can be placed"

    - alert: BrokerDisconnected
      expr: trading_broker_connected{} == 0
      for: 60s
      labels:
        severity: critical
      annotations:
        summary: "Broker {{ $labels.broker }} disconnected"

    - alert: DailyLossCritical
      expr: trading_daily_pnl_pct{} < -0.05
      for: 0m
      labels:
        severity: critical
      annotations:
        summary: "Account {{ $labels.account_id }} daily loss > 5%"

    - alert: KafkaBrokerDown
      expr: kafka_brokers{} < 3
      for: 2m
      labels:
        severity: critical
      annotations:
        summary: "Kafka cluster degraded: {{ $value }} brokers"

  - name: trading.warning
    interval: 60s
    rules:

    - alert: HighOrderLatency
      expr: >
        histogram_quantile(0.99,
          trading_order_latency_ms_bucket{}) > 500
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Order latency P99 > 500ms"

    - alert: DailyLossWarning
      expr: trading_daily_pnl_pct{} < -0.03
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: "Account {{ $labels.account_id }} daily loss at {{ $value }}%"

    - alert: KafkaConsumerLag
      expr: kafka_consumer_group_lag{} > 10000
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Kafka lag {{ $value }} on {{ $labels.topic }}"

    - alert: DatabaseReplicationLag
      expr: pg_replication_lag_seconds{} > 30
      for: 2m
      labels:
        severity: warning
      annotations:
        summary: "PostgreSQL replica lag {{ $value }}s"

    - alert: RedisMemoryHigh
      expr: >
        redis_memory_used_bytes{} /
        redis_memory_max_bytes{} > 0.85
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Redis memory > 85% full"
EOF

kubectl apply -f \
  infrastructure/kubernetes/monitoring/trading-alerts.yaml

echo "✅ Full monitoring stack configured"
echo "Access Grafana: https://grafana.internal.trading.com"
echo "Access ArgoCD: https://argocd.internal.trading.com"
echo "Access Kafka UI: https://kafka-ui.internal.trading.com"
echo "Access Jaeger: https://jaeger.internal.trading.com"

FINAL VERIFICATION SCRIPT
bash#!/bin/bash
# FILE: infrastructure/scripts/verify-all.sh
# Run after all infra is installed

echo "═══════════════════════════════════════════"
echo " TRADING PLATFORM — INFRASTRUCTURE VERIFY "
echo "═══════════════════════════════════════════"

PASS=0
FAIL=0

check() {
  local NAME=$1
  local CMD=$2
  if eval "$CMD" > /dev/null 2>&1; then
    echo "✅ $NAME"
    PASS=$((PASS+1))
  else
    echo "❌ $NAME FAILED"
    FAIL=$((FAIL+1))
  fi
}

echo ""
echo "─── KUBERNETES NODES ───────────────────────"
check "All nodes Ready" \
  "kubectl get nodes | grep -v NotReady | grep Ready | wc -l | grep -q 8"

echo ""
echo "─── KAFKA ──────────────────────────────────"
check "Kafka pods running" \
  "kubectl get pods -n kafka | grep Running | wc -l | grep -q 3"
check "Schema Registry running" \
  "kubectl get pods -n kafka -l app=kafka-schema-registry | grep Running"
check "Topics created" \
  "kubectl exec -n kafka kafka-controller-0 -- kafka-topics.sh --bootstrap-server localhost:9092 --list 2>/dev/null | grep -q market.ticks"

echo ""
echo "─── TIMESCALEDB ────────────────────────────"
check "TimescaleDB primary ready" \
  "kubectl get pods -n data-layer -l app=timescaledb,role=master | grep Running"
check "Hypertable created" \
  "kubectl exec -n data-layer \$(kubectl get pods -n data-layer -l app=timescaledb,role=master -o jsonpath='{.items[0].metadata.name}') -- psql -U postgres -c 'SELECT count(*) FROM timescaledb_information.hypertables;' 2>/dev/null | grep -q '[1-9]'"

echo ""
echo "─── POSTGRESQL ─────────────────────────────"
check "PostgreSQL primary ready" \
  "kubectl get pods -n data-layer -l cnpg.io/instanceRole=primary | grep Running"
check "PgBouncer ready" \
  "kubectl get pods -n data-layer -l app=pgbouncer | grep Running"
check "Schema exists" \
  "kubectl exec -n data-layer \$(kubectl get pods -n data-layer -l cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -- psql -U postgres -d trading -c '\dt' 2>/dev/null | grep -q orders"

echo ""
echo "─── REDIS ──────────────────────────────────"
check "Redis master ready" \
  "kubectl get pods -n data-layer -l app.kubernetes.io/component=master | grep Running"
check "Redis replicas ready" \
  "kubectl get pods -n data-layer -l app.kubernetes.io/component=replica | grep Running | wc -l | grep -q 2"
check "Redis ping" \
  "kubectl exec -n data-layer \$(kubectl get pods -n data-layer -l app.kubernetes.io/component=master -o jsonpath='{.items[0].metadata.name}') -- redis-cli ping | grep -q PONG"

echo ""
echo "─── VAULT ──────────────────────────────────"
check "Vault pods running" \
  "kubectl get pods -n vault | grep Running | wc -l | grep -q 3"
check "Vault unsealed" \
  "kubectl exec -n vault vault-0 -- vault status 2>/dev/null | grep 'Sealed.*false'"
check "Vault secrets accessible" \
  "kubectl exec -n vault vault-0 -- vault kv list secret/trading/ 2>/dev/null | grep -q kafka"

echo ""
echo "─── MONITORING ─────────────────────────────"
check "Prometheus running" \
  "kubectl get pods -n monitoring -l app.kubernetes.io/name=prometheus | grep Running"
check "Grafana running" \
  "kubectl get pods -n monitoring -l app.kubernetes.io/name=grafana | grep Running"
check "Loki running" \
  "kubectl get pods -n monitoring -l app=loki | grep Running"
check "Alertmanager running" \
  "kubectl get pods -n monitoring -l app.kubernetes.io/name=alertmanager | grep Running"

echo ""
echo "─── ARGOCD ─────────────────────────────────"
check "ArgoCD server running" \
  "kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server | grep Running"
check "ArgoCD repo server running" \
  "kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-repo-server | grep Running"

echo ""
echo "─── STORAGE ────────────────────────────────"
check "Longhorn ready" \
  "kubectl get pods -n infra -l app=longhorn-manager | grep Running"
check "StorageClass exists" \
  "kubectl get storageclass | grep fast-nvme"

echo ""
echo "═══════════════════════════════════════════"
echo " RESULTS: $PASS passed | $FAIL failed"
echo "═══════════════════════════════════════════"

if [ $FAIL -eq 0 ]; then
  echo " ✅ ALL SYSTEMS OPERATIONAL"
  echo " Ready for trading platform deployment"
else
  echo " ❌ $FAIL checks failed — fix before proceeding"
fi

IMPORTANT NOTES SUMMARY
CRITICAL THINGS TO REMEMBER:

1. VAULT UNSEAL KEYS
   Store vault-init-keys.json OFFLINE
   Hardware key, password manager + physical copy
   Loss = all secrets gone = rebuild from scratch

2. VPN FIRST
   Always connect WireGuard before SSH
   Never expose servers directly to internet

3. KAFKA MIN.INSYNC.REPLICAS=2
   Never set to 1 in production
   With 3 brokers, 1 can fail and still work

4. TIMESCALEDB RETENTION
   Raw ticks compressed after 7 days
   Retention policy removes after 90 days
   Remove retention policy to keep all ticks forever

5. POSTGRESQL PARTITIONS
   Create new orders partition each month
   Or implement auto-partition creation

6. NODE SELECTORS
   Every workload pinned to correct node type
   Trading services on trading nodes only
   Kafka on kafka node only (CPU-intensive)

7. RESOURCE LIMITS
   Always set requests AND limits
   Without limits one pod can starve others

8. ARGOCD GITOPS
   NEVER kubectl apply manually in production
   All changes via git commit → ArgoCD auto-deploys

9. TIME SYNCHRONIZATION
   All nodes must be within 1ms of each other
   Verify chrony is running on all servers
   Critical for tick data timestamps

10. BACKUP VERIFICATION
    Test restore from backup weekly
    A backup never tested is not a backup
