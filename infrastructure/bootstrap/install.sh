#!/usr/bin/env bash

set -euo pipefail

# ============================================================
# COREI — STAGE 1 MACHINE FOUNDATION
# v2 COMPLIANT
# ============================================================

# ============================================================
# GLOBAL CONFIG
# ============================================================

ORG="corei"
ROOT="$HOME/corei"

STATE_FILE="$ROOT/.install.state"
LOG_FILE="$ROOT/install.log"

mkdir -p "$ROOT"
mkdir -p "$ROOT/scripts"

touch "$STATE_FILE"

export PATH="$HOME/.local/bin:$PATH"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "========== STAGE 1: MACHINE FOUNDATION =========="

PASS=true
ORG_STATUS="UNKNOWN"
REPO_STATUS="UNKNOWN"

# ============================================================
# STATE FUNCTIONS
# ============================================================

mark_done() {
  grep -qx "$1" "$STATE_FILE" || echo "$1" >> "$STATE_FILE"
}

is_done() {
  grep -qx "$1" "$STATE_FILE" 2>/dev/null
}

# ============================================================
# VALIDATION HELPERS
# ============================================================

fail_validation() {
  PASS=false
}

check() {
  local cmd="$1"
  local label="$2"

  if eval "$cmd" >/dev/null 2>&1; then
    echo "  PASS → $label"
  else
    echo "  FAIL → $label"
    fail_validation
  fi
}

validate_kernel_module() {

  local module="$1"

  sudo modprobe "$module" 2>/dev/null || true

  if awk '{print $1}' /proc/modules | grep -qx "$module"; then
    echo "  PASS → ${module} module"
  else
    echo "  FAIL → ${module} module not loaded"
    fail_validation
  fi
}

# ============================================================
# FINAL REPORT
# ============================================================

run_report() {

  echo ""
  echo "========== STAGE 1 REPORT =========="

  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  RAM=$(free -g | awk '/^Mem:/{print $2}')
  CPU=$(nproc)
  DISK=$(df -h "$ROOT" | awk 'NR==2 {print $4 " free / " $2}')

  MODE="PRODUCTION"

  if [ "$RAM" -lt 8 ]; then
    MODE="LOW RESOURCE"
  fi

  echo ""
  echo "System:"
  echo "  Timestamp : $TIMESTAMP"
  echo "  OS        : $(lsb_release -ds 2>/dev/null || echo Unknown)"
  echo "  Kernel    : $(uname -r)"
  echo "  RAM       : ${RAM}GB"
  echo "  CPU       : ${CPU} cores"
  echo "  Disk      : $DISK"

  COREI_DISK=$(df -h /var/corei 2>/dev/null | awk 'NR==2 {print $4 " free / " $2}')

  [ -n "$COREI_DISK" ] && \
    echo "  Corei Storage: $COREI_DISK"

  echo "  Mode      : ${MODE}"

  echo ""
  echo "Versions:"
  echo "  Python    : $(python3 --version 2>/dev/null || echo MISSING)"
  echo "  Go        : $(go version 2>/dev/null || echo MISSING)"
  echo "  Rust      : $(rustc --version 2>/dev/null || echo MISSING)"
  echo "  Docker    : $(docker --version 2>/dev/null || echo MISSING)"
  echo "  containerd: $(containerd --version 2>/dev/null || echo MISSING)"

  KUBE_VER=$(kubectl version --client 2>/dev/null | grep "Client Version" || true)

  [ -n "$KUBE_VER" ] && \
    echo "  kubectl   : $KUBE_VER" || \
    echo "  kubectl   : MISSING"

  echo "  Helm      : $(helm version --short 2>/dev/null || echo MISSING)"
  echo "  Terraform : $(terraform version 2>/dev/null | head -n1 || echo MISSING)"
  echo "  GitHub CLI: $(gh --version 2>/dev/null | head -n1 || echo MISSING)"

  check_cmd() {
    command -v "$1" >/dev/null 2>&1 && echo OK || echo MISSING
  }

  echo ""
  echo "Tools:"
  echo "  Python      : $(check_cmd python3)"
  echo "  Go          : $(check_cmd go)"
  echo "  Rust        : $(check_cmd rustc)"
  echo "  Docker      : $(check_cmd docker)"
  echo "  containerd  : $(check_cmd containerd)"
  echo "  kubectl     : $(check_cmd kubectl)"
  echo "  Helm        : $(check_cmd helm)"
  echo "  Terraform   : $(check_cmd terraform)"
  echo "  GitHub CLI  : $(check_cmd gh)"
  echo "  Chrony (NTP): $(check_cmd chronyd)"

  echo ""
  echo "GitHub:"

  GH_USER=$(gh api user -q .login 2>/dev/null || echo NOT_AUTHENTICATED)

  if [ "$GH_USER" = "NOT_AUTHENTICATED" ]; then
    echo "  Auth : FAILED"
  else
    echo "  Auth : OK ($GH_USER)"
  fi

  if gh api orgs/$ORG >/dev/null 2>&1; then
    echo "  Org  : OK ($ORG)"
    ORG_STATUS="OK"
  else
    echo "  Org  : MISSING ($ORG)"
    ORG_STATUS="MISSING"
  fi

  REPO_COUNT=$(gh repo list "$ORG" --limit 1 2>/dev/null | wc -l | tr -d ' ')

  if [ "$REPO_COUNT" -eq 0 ]; then
    REPO_STATUS="EMPTY (bootstrap state)"
  else
    REPO_STATUS="OK"
  fi

  echo "  Repos: $REPO_STATUS"

  echo ""
  echo "Platform Extensions:"

  [ -d "/var/corei/data" ] && \
    echo "  Storage   : OK" || \
    echo "  Storage   : MISSING"

  [ -f "$ROOT/scripts/backup.sh" ] && \
    echo "  Backup    : OK" || \
    echo "  Backup    : MISSING"

  command -v wg >/dev/null 2>&1 && \
    echo "  WireGuard : OK" || \
    echo "  WireGuard : MISSING"

  echo ""
  echo "Filesystem:"

  [ -d "$ROOT" ] && \
    echo "  Root      : OK ($ROOT)" || \
    echo "  Root      : MISSING"

  [ -d "$ROOT/infrastructure" ] && \
    echo "  Installer : OK" || \
    echo "  Installer : MISSING"

  echo ""
  echo "Network:"
  echo "  Hostname : $(hostname)"
  echo "  IP       : $(hostname -I | awk '{print $1}')"

  echo ""
  echo "Validation:"

  if [ "$PASS" = true ]; then
    echo "  STATUS : PASS"
  else
    echo "  STATUS : FAIL"
  fi

  echo ""
  echo "Final Status:"

  FINAL_STATUS="READY"

  if [ "$PASS" != true ]; then
    FINAL_STATUS="BLOCKED"
  fi

  if [ "$ORG_STATUS" != "OK" ]; then
    FINAL_STATUS="PARTIAL"
  fi

  echo "  $FINAL_STATUS"

  echo "========================================="
}

# ============================================================
# STEP 0 — SYSTEM CHECK
# ============================================================

if ! is_done "system_check"; then

  echo "[0] System check"

  RAM=$(free -g | awk '/^Mem:/{print $2}')
  CPU=$(nproc)

  MIN_RAM=4
  PROD_RAM=8

  if [ "$RAM" -lt "$MIN_RAM" ]; then
    echo "ERROR: Minimum ${MIN_RAM}GB RAM required"
    exit 1
  fi

  if [ "$RAM" -lt "$PROD_RAM" ]; then
    echo "WARNING: LOW RESOURCE MODE (${RAM}GB RAM)"
  else
    echo "INFO: PRODUCTION MODE (${RAM}GB RAM)"
  fi

  if [ "$CPU" -lt 2 ]; then
    echo "ERROR: Minimum 2 CPU cores required"
    exit 1
  fi

  mark_done "system_check"
fi

# ============================================================
# STEP 1 — OS PREP + NTP
# ============================================================

if ! is_done "os_prep"; then

  echo "[1] OS prep"

  sudo apt update -y
  sudo apt upgrade -y

  sudo apt install -y \
    curl \
    wget \
    git \
    unzip \
    jq \
    tree \
    build-essential \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    chrony

  sudo systemctl enable chrony
  sudo systemctl start chrony

  mark_done "os_prep"
fi

# ============================================================
# STEP 1A — STORAGE SETUP
# ============================================================

if ! is_done "storage"; then

  echo "[1A] Storage setup"

  sudo mkdir -p /var/corei/{data,logs,backups}

  sudo chown -R "$USER:$USER" /var/corei

  mkdir -p "$ROOT"/{repos,backups,logs}

  mark_done "storage"
fi

# ============================================================
# STEP 1B — BACKUP SYSTEM
# ============================================================

if ! is_done "backup"; then

  echo "[1B] Backup system"

  mkdir -p "$ROOT/backups"

  cat > "$ROOT/scripts/backup.sh" <<'EOF'
#!/usr/bin/env bash

set -euo pipefail

SRC="/var/corei"
DEST="$HOME/corei/backups"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$DEST"

tar -czf "$DEST/corei_backup_$TIMESTAMP.tar.gz" "$SRC"

ls -tp "$DEST" | \
grep -v '/$' | \
tail -n +8 | \
xargs -I {} rm -- "$DEST/{}"
EOF

  chmod +x "$ROOT/scripts/backup.sh"

  mark_done "backup"
fi

# ============================================================
# STEP 1C — SYSTEM TUNING
# ============================================================

if ! is_done "system_tuning"; then

  echo "[1C] System tuning"

  sudo swapoff -a || true

  sudo sed -i '/swap/d' /etc/fstab

  mark_done "system_tuning"
fi

# ============================================================
# STEP 1D — KERNEL + LIMITS
# ============================================================

if ! is_done "kernel_tuning"; then

  echo "[1D] Kernel + limits configuration"

  cat <<EOF | sudo tee /etc/modules-load.d/corei.conf
overlay
br_netfilter
EOF

  sudo modprobe overlay || true
  sudo modprobe br_netfilter || true

  cat <<EOF | sudo tee /etc/sysctl.d/corei.conf
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.max_map_count = 262144
fs.file-max = 2097152
fs.inotify.max_user_watches = 524288
EOF

  sudo sysctl --system

  cat <<EOF | sudo tee /etc/security/limits.d/corei.conf
* soft nofile 1048576
* hard nofile 1048576
* soft nproc 65535
* hard nproc 65535
* soft memlock unlimited
* hard memlock unlimited
EOF

  mark_done "kernel_tuning"
fi

# ============================================================
# STEP 1E — SECURITY BASELINE
# ============================================================

if ! is_done "security"; then

  echo "[1E] Security baseline"

  sudo apt install -y ufw

  sudo ufw allow 22
  sudo ufw allow 80
  sudo ufw allow 443
  sudo ufw allow 6443

  sudo ufw --force enable

  mark_done "security"
fi

# ============================================================
# STEP 1F — JOURNALD TUNING
# ============================================================

if ! is_done "journald"; then

  echo "[1F] Journald tuning"

  sudo mkdir -p /etc/systemd/journald.conf.d

  cat <<EOF | sudo tee /etc/systemd/journald.conf.d/corei.conf
[Journal]
SystemMaxUse=2G
MaxRetentionSec=2week
EOF

  sudo systemctl restart systemd-journald

  mark_done "journald"
fi

# ============================================================
# STEP 2 — PYTHON
# ============================================================

if ! is_done "python"; then

  echo "[2] Python"

  sudo apt install -y python3 python3-pip

  python3 -m pip install --user pipx
  python3 -m pipx ensurepath

  mark_done "python"
fi

# ============================================================
# STEP 2A — GO + RUST
# ============================================================

if ! is_done "languages"; then

  echo "[2A] Go + Rust"

  if ! command -v go >/dev/null 2>&1; then

    wget -q https://go.dev/dl/go1.22.0.linux-amd64.tar.gz

    sudo rm -rf /usr/local/go

    sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz

    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
  fi

  if ! command -v rustc >/dev/null 2>&1; then
    curl https://sh.rustup.rs -sSf | sh -s -- -y
  fi

  mark_done "languages"
fi

# ============================================================
# STEP 4 — DOCKER + CONTAINERD
# ============================================================

if ! is_done "docker"; then

  echo "[4] Docker"

  curl -fsSL https://get.docker.com | sh

  sudo usermod -aG docker "$USER"

  sudo systemctl enable docker
  sudo systemctl start docker

  mark_done "docker"
fi

# ============================================================
# STEP 4A — VPN (WIREGUARD BASE)
# ============================================================

if ! is_done "vpn"; then

  echo "[4A] WireGuard install"

  sudo apt install -y wireguard

  mark_done "vpn"
fi

# ============================================================
# STEP 5 — KUBECTL
# ============================================================

if ! is_done "kubectl"; then

  echo "[5] kubectl"

  curl -LO "https://dl.k8s.io/release/$(curl -L -s \
  https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

  chmod +x kubectl

  sudo mv kubectl /usr/local/bin/

  mark_done "kubectl"
fi

# ============================================================
# STEP 6 — HELM
# ============================================================

if ! is_done "helm"; then

  echo "[6] Helm"

  curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

  mark_done "helm"
fi

# ============================================================
# STEP 7 — TERRAFORM
# ============================================================

if ! is_done "terraform"; then

  echo "[7] Terraform"

  sudo apt install -y software-properties-common

  curl -fsSL https://apt.releases.hashicorp.com/gpg | \
  gpg --dearmor | \
  sudo dd of=/usr/share/keyrings/hashicorp-archive-keyring.gpg \
  status=none

  echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

  sudo apt update

  sudo apt install -y terraform

  mark_done "terraform"
fi

# ============================================================
# STEP 8 — GITHUB AUTH
# ============================================================

if ! is_done "auth"; then

  echo "[8] GitHub auth"

  gh auth status || gh auth login

  mark_done "auth"
fi

# ============================================================
# STEP 9 — ROOT STRUCTURE
# ============================================================

if ! is_done "workspace"; then

  echo "[9] Creating root structure"

  mkdir -p \
    "$ROOT/infrastructure" \
    "$ROOT/platform" \
    "$ROOT/services" \
    "$ROOT/schemas" \
    "$ROOT/docs" \
    "$ROOT/tests" \
    "$ROOT/scripts"

  mark_done "workspace"
fi

# ============================================================
# STEP 10 — ORG VALIDATION
# ============================================================

if ! is_done "org_check"; then

  echo "[10] Validating GitHub org"

  if ! gh api orgs/$ORG >/dev/null 2>&1; then
    echo "ERROR: GitHub org '$ORG' does not exist"
    exit 1
  fi

  mark_done "org_check"
fi

# ============================================================
# STEP 11 — REPO CREATION
# ============================================================

if ! is_done "repos"; then

  echo "[11] Creating GitHub repos"

  repos=(
    corei-core
    corei-infrastructure
    corei-sdk
    corei-services
    corei-schemas
  )

  REPO_STATUS="OK"

  for repo in "${repos[@]}"; do

  if gh repo view "$ORG/$repo" >/dev/null 2>&1; then

    echo "INFO: Repo exists → $repo"

  else

    echo "INFO: Creating repo → $repo"

    gh repo create "$ORG/$repo" \
      --private || REPO_STATUS="FAILED"
  fi

  done

  if [ "$REPO_STATUS" = "OK" ]; then
    mark_done "repos"
  fi
fi

# ============================================================
# STEP 11A — NETWORK VALIDATION
# ============================================================

if ! is_done "network_check"; then

  echo "[11A] Network validation"

  IP=$(hostname -I | awk '{print $1}')

  echo "INFO: Detected IP → $IP"

  if [ -z "$IP" ]; then
    echo "ERROR: No IP detected"
    exit 1
  fi

  mark_done "network_check"
fi

# ============================================================
# STEP 12 — INSTALLER BASE
# ============================================================

if ! is_done "installer"; then

  echo "[12] Installer framework"

  mkdir -p \
    "$ROOT/infrastructure/scripts" \
    "$ROOT/infrastructure/stages" \
    "$ROOT/infrastructure/state" \
    "$ROOT/infrastructure/logs"

  touch "$ROOT/infrastructure/state/install.state"

  mark_done "installer"
fi

# ============================================================
# VALIDATION EXECUTION
# ============================================================

echo ""
echo "========== STAGE 1 VALIDATION =========="

check "hostname | grep -q core-node" "Hostname"

check "swapon --noheadings | wc -l | grep -q '^0$'" \
"Swap disabled"

check "sysctl net.ipv4.ip_forward | grep -q '= 1'" \
"IP forward"

check "sysctl vm.swappiness | grep -q '= 0'" \
"Swappiness"

validate_kernel_module overlay
validate_kernel_module br_netfilter

check "grep -q overlay /etc/modules-load.d/corei.conf" \
"Overlay persistence"

check "grep -q br_netfilter /etc/modules-load.d/corei.conf" \
"br_netfilter persistence"

check "systemctl is-active chrony >/dev/null 2>&1" \
"Chrony active"

check "systemctl is-active docker >/dev/null 2>&1" \
"Docker active"

check "test -d /var/corei/data" \
"Corei storage"

check "command -v kubectl" \
"kubectl installed"

check "command -v helm" \
"Helm installed"

check "command -v terraform" \
"Terraform installed"

echo ""
echo "Validation Summary:"

if [ "$PASS" = true ]; then
  echo "  STATUS: PASS"
else
  echo "  STATUS: FAIL"
fi

echo ""
echo "========== STAGE 1 COMPLETE =========="

# ============================================================
# FINAL REPORT TRAP
# ============================================================

trap 'run_report' EXIT
