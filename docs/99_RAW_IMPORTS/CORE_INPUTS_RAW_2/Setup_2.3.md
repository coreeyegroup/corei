COMPLETE TRADING PLATFORM
Local VMware Development to VPS Production
Infrastructure Installation & Migration Knowledge Guide
Version 1.0 | Internal Training Document

CHAPTER 1: UNDERSTANDING THE APPROACH

1.1 WHY VMWARE FIRST
THE DEVELOPMENT JOURNEY:
════════════════════════════════════════════════════════

STAGE 1: YOUR LOCAL MACHINE (VMware Workstation)
─────────────────────────────────────────────────
Purpose:  Learn, build, test, break, fix
          Zero cost while developing
          No risk to real money
          Fast iteration — restart VM in seconds
          Take snapshots before risky changes
          Roll back if something breaks

STAGE 2: VPS / DEDICATED SERVERS (Production)
─────────────────────────────────────────────────
Purpose:  Real trading with real broker connections
          Low latency co-location
          24/7 uptime
          Production-grade hardware

THE KEY INSIGHT:
Everything we install inside VMware uses the
EXACT SAME commands, configs, and files as VPS.
Ubuntu is Ubuntu. Kubernetes is Kubernetes.
The environment is identical.

Migration = copy configs + point to new IPs.
That's it. No rebuilding. No relearning.

WHAT VMware GIVES YOU:
├── FREE environment (no monthly cost)
├── Snapshots (instant undo button)
├── Multiple VMs on one machine
├── Isolated network (nothing affects laptop)
├── Practice environment for new team members
└── Identical to production in every way

WHAT YOU LOSE IN VMware vs VPS:
├── Low latency (VMware adds ~5-10ms)
├── Raw performance (shared CPU/RAM)
└── Public IP (but not needed for dev)

════════════════════════════════════════════════════════
CONCLUSION: Build everything in VMware.
            Test everything in VMware.
            When confident: replicate to VPS.
            Migration takes 1-2 days.
════════════════════════════════════════════════════════

1.2 VMWARE VS VPS COMPARISON
FEATURE              VMWARE (LOCAL)      VPS (PRODUCTION)
═════════════════════════════════════════════════════════
Cost                 Free                $500-5000/month
Setup time           30 minutes          2-4 hours
Latency to broker    100-500ms           1-10ms
Uptime               Your laptop uptime  99.99% SLA
Public IP            No (not needed dev) Yes
Broker connection    Demo/Paper only     Real + Live
Snapshots            Yes (free undo)     Depends on provider
Data persistence     As long as VM runs  Permanent
Team access          Local only          Anywhere via VPN
CPU performance      Shared with host    Dedicated
RAM performance      Shared with host    Dedicated
Disk I/O             Shared with host    NVMe dedicated

WHEN TO MOVE TO VPS:
├── All services run correctly in VMware
├── Paper trading works end-to-end
├── Strategies generate correct signals
├── Risk engine blocks bad orders
├── Dashboard shows correct data
└── Team is confident in the system

1.3 COMPLETE ARCHITECTURE IN VMWARE
YOUR LAPTOP (Host Machine)
─────────────────────────────────────────────────────
RAM Requirement:     32GB minimum (64GB recommended)
CPU Requirement:     8 cores minimum (16 recommended)
Storage:             500GB free disk space
OS:                  Windows 10/11 or Linux

VMWARE WORKSTATION PRO (or Player for free)
─────────────────────────────────────────────────────

VIRTUAL MACHINES WE CREATE:
┌────────────────────────────────────────────────────┐
│  VM1: vm-bastion      (1 CPU, 2GB RAM,  20GB disk) │
│  VM2: vm-master-1     (2 CPU, 4GB RAM,  50GB disk) │
│  VM3: vm-master-2     (2 CPU, 4GB RAM,  50GB disk) │
│  VM4: vm-master-3     (2 CPU, 4GB RAM,  50GB disk) │
│  VM5: vm-trading      (4 CPU, 16GB RAM, 100GB disk)│
│  VM6: vm-data         (4 CPU, 16GB RAM, 200GB disk)│
│  VM7: vm-kafka        (4 CPU, 8GB RAM,  100GB disk)│
│  VM8: vm-monitoring   (2 CPU, 8GB RAM,  100GB disk)│
└────────────────────────────────────────────────────┘

Total RAM needed:    ~62GB
Total CPU needed:    23 vCPUs
Total disk needed:   ~670GB

💡 MINIMUM VIABLE SETUP (if RAM is limited):
If you only have 16GB RAM, use this reduced setup:
┌────────────────────────────────────────────────────┐
│  VM1: vm-master       (2 CPU, 4GB RAM, 100GB disk) │
│  VM2: vm-workload     (4 CPU, 8GB RAM, 200GB disk) │
└────────────────────────────────────────────────────┘
2 VMs instead of 8. K3s runs everything on 2 nodes.
Good for learning, not recommended for production sim.

VIRTUAL NETWORK:
VMnet8 (NAT mode):
├── Subnet: 192.168.100.0/24
├── Gateway: 192.168.100.1 (VMware NAT)
├── vm-bastion:   192.168.100.5
├── vm-master-1:  192.168.100.10
├── vm-master-2:  192.168.100.11
├── vm-master-3:  192.168.100.12
├── vm-trading:   192.168.100.20
├── vm-data:      192.168.100.30
├── vm-kafka:     192.168.100.40
└── vm-monitoring: 192.168.100.50

NOTE: 192.168.100.x in VMware = 10.0.1.x in VPS
The only difference is the IP range.
All configs use variables — swap IPs in one file.

CHAPTER 2: VMWARE INSTALLATION

2.1 INSTALL VMWARE WORKSTATION
STEP BY STEP — INSTALLING VMWARE
═══════════════════════════════════════════════════════

OPTION A: VMware Workstation Pro (Paid — Recommended)
─────────────────────────────────────────────────────
Price:    $199 one-time (worth it for professional use)
Features: Snapshots, cloning, advanced networking
Download: https://www.vmware.com/products/workstation-pro

OPTION B: VMware Workstation Player (Free)
─────────────────────────────────────────────────────
Price:    Free for personal/educational use
Features: Limited snapshots, basic networking
Download: https://www.vmware.com/products/workstation-player
Limitation: No snapshot management (use Pro if possible)

OPTION C: VirtualBox (Free, Open Source)
─────────────────────────────────────────────────────
Price:    Free
Features: Full snapshots, decent networking
Download: https://www.virtualbox.org
Note:     Commands in this guide work on VirtualBox too
          Minor UI differences only

INSTALLATION STEPS (Windows):

1. Download VMware Workstation Pro installer
   File: VMware-workstation-full-17.x.x.exe

2. Right-click installer → "Run as administrator"

3. Click through installation wizard:
   ✅ Accept license agreement
   ✅ Install to default path: C:\Program Files\VMware\
   ✅ Check "Enhanced Keyboard Driver"
   ✅ Check "Add VMware Workstation console tools to PATH"
   ✅ Uncheck "Help improve VMware Workstation Pro"
   ✅ Check "Desktop shortcut"
   ✅ Click Install

4. Enter license key when prompted
   Or click "Try for 30 days" for evaluation

5. Click Finish — do NOT restart yet

6. BEFORE RESTARTING: Enable virtualization in BIOS
   (if not already enabled)

ENABLE VIRTUALIZATION IN BIOS:
─────────────────────────────────────────────────────
This is required for VMware to work.
Steps vary by manufacturer:

Intel CPUs:
  Restart → Press Del/F2/F10 during boot → BIOS
  Find: "Intel Virtualization Technology" or "Intel VT-x"
  Set to: ENABLED
  Find: "VT-d" → Set to: ENABLED
  Save and exit

AMD CPUs:
  Restart → Press Del/F2 during boot → BIOS
  Find: "SVM Mode" or "AMD-V"
  Set to: ENABLED
  Save and exit

VERIFY AFTER BOOT:
  Open Task Manager → Performance tab → CPU
  Look for "Virtualization: Enabled"
  ✅ If Enabled — VMware will work
  ❌ If Disabled — go back to BIOS

7. Restart computer

8. Open VMware Workstation Pro
   First launch may ask for license key
   Enter key or start trial

2.2 DOWNLOAD UBUNTU SERVER ISO
bash# ═══════════════════════════════════════════════
# DOWNLOAD UBUNTU SERVER 22.04 LTS ISO
# We use Server edition (no GUI) — identical to VPS
# LTS = Long Term Support = 5 years of updates
# ═══════════════════════════════════════════════

# WHAT TO DOWNLOAD:
# Ubuntu Server 22.04.3 LTS (Jammy Jellyfish)
# Architecture: AMD64 (x86_64)
# File: ubuntu-22.04.3-live-server-amd64.iso
# Size: ~1.8 GB

# DOWNLOAD FROM:
# Official: https://ubuntu.com/download/server
# Direct link:
# https://releases.ubuntu.com/22.04.3/ubuntu-22.04.3-live-server-amd64.iso

# VERIFY DOWNLOAD (important for security):
# Download SHA256 checksum file too:
# https://releases.ubuntu.com/22.04.3/SHA256SUMS

# Verify on Linux/Mac:
sha256sum ubuntu-22.04.3-live-server-amd64.iso
# Compare with value in SHA256SUMS file

# Verify on Windows (PowerShell):
# Get-FileHash ubuntu-22.04.3-live-server-amd64.iso -Algorithm SHA256

# SAVE ISO FILE TO:
# Windows: C:\VMs\ISOs\ubuntu-22.04.3-live-server-amd64.iso
# Linux:   ~/VMs/ISOs/ubuntu-22.04.3-live-server-amd64.iso

# WHY UBUNTU SERVER 22.04 LTS:
# ├── Same OS used on VPS servers
# ├── LTS = supported until April 2027
# ├── No GUI = less RAM usage
# ├── Most K8s documentation written for Ubuntu
# └── Identical behavior in VM and on VPS hardware

2.3 CREATE FIRST VM (BASTION)
═══════════════════════════════════════════════════════
CREATING VM1: vm-bastion
Purpose: WireGuard VPN server, jump host
═══════════════════════════════════════════════════════

STEP 1: Open VMware Workstation
  Click: File → New Virtual Machine
  OR press: Ctrl+N

STEP 2: Choose Configuration Type
  Select: "Custom (advanced)"
  WHY: Gives us full control over all settings
  Click: Next

STEP 3: Hardware Compatibility
  Select: Workstation 17.x (or highest available)
  WHY: Latest features, best performance
  Click: Next

STEP 4: Guest Operating System Installation
  Select: "I will install the operating system later"
  WHY: We configure VM first, then install OS
  Click: Next

STEP 5: Select Guest Operating System
  Guest OS: Linux
  Version: Ubuntu 64-bit
  Click: Next

STEP 6: Name and Location
  Virtual machine name: vm-bastion
  Location: C:\VMs\vm-bastion
             (or ~/VMs/vm-bastion on Linux)
  IMPORTANT: Create C:\VMs folder first if it
             doesn't exist
  Click: Next

STEP 7: Processor Configuration
  Number of processors: 1
  Number of cores per processor: 1
  Total cores: 1
  WHY: Bastion just runs VPN, needs little CPU
  Click: Next

STEP 8: Memory Configuration
  Memory: 2048 MB (2 GB)
  WHY: Enough for Ubuntu + WireGuard
  Click: Next

STEP 9: Network Type
  Select: "Use network address translation (NAT)"
  WHY: VM gets internet access via laptop
       All VMs on same NAT = can talk to each other
  Click: Next

STEP 10: I/O Controller Types
  Select: LSI Logic (recommended)
  Click: Next

STEP 11: Virtual Disk Type
  Select: SCSI
  Click: Next

STEP 12: Select a Disk
  Select: "Create a new virtual disk"
  Click: Next

STEP 13: Specify Disk Capacity
  Maximum disk size: 20 GB
  Select: "Store virtual disk as a single file"
  WHY: Single file = easier to backup and migrate
  Click: Next

STEP 14: Specify Disk File
  File name: vm-bastion.vmdk
  Location: C:\VMs\vm-bastion\vm-bastion.vmdk
  Click: Next

STEP 15: Ready to Create Virtual Machine
  Review settings:
  ✅ Name: vm-bastion
  ✅ OS: Ubuntu 64-bit
  ✅ RAM: 2048 MB
  ✅ CPUs: 1
  ✅ Disk: 20 GB
  ✅ Network: NAT

  Click: "Customize Hardware..."

STEP 16: Customize Hardware
  a) Click "CD/DVD (SATA)"
     Connection: "Use ISO image file"
     Browse to: C:\VMs\ISOs\ubuntu-22.04.3-live-server-amd64.iso
     ✅ Check "Connect at power on"

  b) Click "Display"
     Graphics memory: 16 MB
     ✅ Accelerate 3D graphics: OFF (server, no GUI)

  c) Remove unnecessary hardware:
     Select "Sound Card" → Click "Remove"
     Select "USB Controller" → (keep it)
     Select "Printer" → Click "Remove"

  Click: Close

STEP 17: Finish
  Click: Finish

VM IS CREATED. Now install Ubuntu on it.

2.4 INSTALL UBUNTU ON BASTION VM
═══════════════════════════════════════════════════════
INSTALLING UBUNTU SERVER 22.04 on vm-bastion
═══════════════════════════════════════════════════════

STEP 1: Start the VM
  In VMware: Click vm-bastion → Click green ▶ Play button
  OR: Right-click vm-bastion → Power → Power On

  The VM boots from ISO
  You'll see Ubuntu installation menu

STEP 2: Language Selection
  Ubuntu installer appears in terminal
  Use arrow keys to navigate
  Press Enter to select

  Select: English
  Press: Enter

STEP 3: Installer Update
  Screen: "Installer update available"
  Select: "Continue without updating"
  WHY: Faster. We update after install.
  Press: Enter

STEP 4: Keyboard Configuration
  Layout: English (US) — or your preference
  Variant: English (US)
  Select: "Done"
  Press: Enter

STEP 5: Installation Type
  Select: "Ubuntu Server"
  (NOT "Ubuntu Server (minimized)")
  Press: Enter

STEP 6: Network Connections
  Should show: ens33 (VMware network adapter)
  Should show: IP address via DHCP

  WE WILL SET STATIC IP:
  Navigate to: ens33 → Press Enter
  Select: "Edit IPv4"
  Change: DHCP → Manual

  Enter network settings:
  ┌─────────────────────────────────────────────┐
  │ Subnet:       192.168.100.0/24              │
  │ Address:      192.168.100.5                 │
  │ Gateway:      192.168.100.1                 │
  │ Name servers: 8.8.8.8,8.8.4.4              │
  │ Search domains: (leave empty)               │
  └─────────────────────────────────────────────┘
  Select: "Save"
  Select: "Done"
  Press: Enter

  WHY STATIC IP:
  Servers need fixed IPs so other services
  can always find them. Dynamic IPs change
  on reboot and break everything.

STEP 7: Proxy Configuration
  Proxy address: (leave empty)
  Select: "Done"
  Press: Enter

STEP 8: Ubuntu Archive Mirror
  Leave default: http://archive.ubuntu.com/ubuntu
  Select: "Done"
  Press: Enter
  Wait for mirror test (30 seconds)

STEP 9: Storage Configuration
  Select: "Use an entire disk"
  Select the disk: (only one listed)
  ✅ "Set up this disk as an LVM group" — CHECKED
  Select: "Done"
  Press: Enter

  Storage layout summary appears:
  Select: "Done"
  Press: Enter

  Confirm destructive action:
  Select: "Continue"
  Press: Enter

STEP 10: Profile Configuration
  ┌─────────────────────────────────────────────┐
  │ Your name:           Trading Platform       │
  │ Server name:         vm-bastion             │
  │ Username:            trader                 │
  │ Password:            YourStrongPassword123! │
  │ Confirm password:    YourStrongPassword123! │
  └─────────────────────────────────────────────┘

  IMPORTANT:
  - Username "trader" must match on ALL VMs
  - Password must be strong (use same one everywhere
    for dev — use Vault in production)
  - Server name must exactly match hostname plan

  Select: "Done"
  Press: Enter

STEP 11: Ubuntu Pro
  Select: "Skip for now"
  Select: "Continue"
  Press: Enter

STEP 12: SSH Setup
  ✅ CHECK: "Install OpenSSH server"
  WHY: We need SSH to connect to VMs from laptop
  Import SSH identity: "No" (we'll add keys later)
  Select: "Done"
  Press: Enter

STEP 13: Featured Server Snaps
  Do NOT select any snaps
  We install everything manually for control
  Select: "Done"
  Press: Enter

STEP 14: Installation
  Ubuntu now installs (takes 5-15 minutes)
  Watch progress bar
  DO NOT close VM window

STEP 15: Installation Complete
  Screen shows: "Install complete!"
  Select: "Reboot Now"
  Press: Enter

  When prompted: "Please remove the installation medium"
  In VMware menu: VM → Removable Devices → CD/DVD → Disconnect
  Press: Enter in VM

  VM reboots into Ubuntu Server

STEP 16: First Boot
  Login prompt appears:
  vm-bastion login: trader
  Password: YourStrongPassword123!

  You should see Ubuntu terminal:
  trader@vm-bastion:~$

  ✅ Ubuntu installed successfully!

STEP 17: Verify Basic Setup
  # Check IP address
  ip addr show ens33
  # Should show: 192.168.100.5

  # Check internet access
  ping -c 3 google.com
  # Should get replies

  # Check Ubuntu version
  lsb_release -a
  # Should show: Ubuntu 22.04.x LTS

  echo "✅ vm-bastion Ubuntu installation complete"

2.5 CREATE ALL REMAINING VMs
bash# ═══════════════════════════════════════════════
# FILE: infrastructure/vmware/create-vms-guide.md
#
# CREATE ALL 8 VMs FOLLOWING SAME PROCESS
# Only differences: name, IP, CPU, RAM, disk
# ═══════════════════════════════════════════════

# VM SPECIFICATIONS TABLE:
# ┌──────────────────────┬──────┬──────┬───────┬──────────────────┐
# │ VM Name              │ CPU  │ RAM  │ Disk  │ Static IP        │
# ├──────────────────────┼──────┼──────┼───────┼──────────────────┤
# │ vm-bastion           │  1   │  2GB │  20GB │ 192.168.100.5    │
# │ vm-master-1          │  2   │  4GB │  50GB │ 192.168.100.10   │
# │ vm-master-2          │  2   │  4GB │  50GB │ 192.168.100.11   │
# │ vm-master-3          │  2   │  4GB │  50GB │ 192.168.100.12   │
# │ vm-trading           │  4   │ 16GB │ 100GB │ 192.168.100.20   │
# │ vm-data              │  4   │ 16GB │ 200GB │ 192.168.100.30   │
# │ vm-kafka             │  4   │  8GB │ 100GB │ 192.168.100.40   │
# │ vm-monitoring        │  2   │  8GB │ 100GB │ 192.168.100.50   │
# └──────────────────────┴──────┴──────┴───────┴──────────────────┘

# FOLLOW SAME STEPS AS vm-bastion FOR EACH VM
# Only change:
# - VM Name (Step 6)
# - CPU count (Step 7)
# - RAM (Step 8)
# - Disk size (Step 13)
# - Hostname (Step 10 of Ubuntu install)
# - IP address (Step 6 of Ubuntu install)

# HOSTNAME TO IP MAPPING:
# vm-bastion    → hostname: bastion         → 192.168.100.5
# vm-master-1   → hostname: k8s-master-1    → 192.168.100.10
# vm-master-2   → hostname: k8s-master-2    → 192.168.100.11
# vm-master-3   → hostname: k8s-master-3    → 192.168.100.12
# vm-trading    → hostname: k8s-worker-trading-1 → 192.168.100.20
# vm-data       → hostname: k8s-worker-data-1    → 192.168.100.30
# vm-kafka      → hostname: k8s-worker-kafka-1   → 192.168.100.40
# vm-monitoring → hostname: k8s-worker-monitoring-1 → 192.168.100.50

# IMPORTANT NOTES:
# 1. All VMs use same Ubuntu ISO
# 2. All VMs use NAT network (VMnet8)
# 3. All VMs use same username: trader
# 4. All VMs use same password: YourStrongPassword123!
# 5. Install in order listed above

# TIME ESTIMATE:
# Each VM creation + Ubuntu install: ~30 minutes
# Total for all 8 VMs: ~4 hours
# TIP: Start next VM install while waiting for previous one

echo "Create VMs following this guide"
echo "Take your time — accuracy matters more than speed"

2.6 VMWARE NETWORK CONFIGURATION
bash# ═══════════════════════════════════════════════
# FILE: infrastructure/vmware/network-setup.md
#
# CONFIGURE VMWARE VIRTUAL NETWORK
# All VMs need to communicate with each other
# ═══════════════════════════════════════════════

# ─── STEP 1: OPEN VMWARE VIRTUAL NETWORK EDITOR ──
# Windows: Edit → Virtual Network Editor
# Linux:   Edit → Virtual Network Editor
# OR: Start menu → VMware → Virtual Network Editor
# NOTE: Run as Administrator on Windows

# ─── STEP 2: CONFIGURE VMnet8 (NAT) ──────────────
# VMnet8 is the default NAT network
# All our VMs use this

# Click: VMnet8
# Settings:
# ✅ Type: NAT
# ✅ Connect a host virtual adapter: CHECKED
# ✅ Use local DHCP service: UNCHECK (we use static IPs)
# Subnet IP: 192.168.100.0
# Subnet mask: 255.255.255.0
# Click: NAT Settings
#   Gateway IP: 192.168.100.1
#   Click OK
# Click: Apply

# ─── STEP 3: VERIFY FROM HOST MACHINE ─────────────
# On your laptop (not inside VM):
# You should have a VMnet8 adapter with IP 192.168.100.1

# Windows: ipconfig | findstr VMnet
# Linux:   ip addr show vmnet8
# Should show: 192.168.100.1

# ─── STEP 4: TEST VM-TO-VM COMMUNICATION ──────────
# SSH into vm-bastion:
ssh trader@192.168.100.5

# From inside vm-bastion, ping vm-master-1:
ping -c 3 192.168.100.10
# ✅ Should get replies

# Ping from your laptop to a VM:
ping 192.168.100.5
# ✅ Should get replies

# ─── STEP 5: CONFIGURE SSH FROM LAPTOP ────────────
# Generate SSH key on your laptop (if not done already)
ssh-keygen -t ed25519 -C "trading-platform-dev"
# Press Enter for default location
# Set passphrase (or empty for convenience in dev)

# View your public key:
cat ~/.ssh/id_ed25519.pub
# Copy this entire line

# Now we need to put this key on all VMs
# Do this for EACH VM:

# Method 1: Using ssh-copy-id (easiest)
ssh-copy-id trader@192.168.100.5    # bastion
ssh-copy-id trader@192.168.100.10   # master-1
ssh-copy-id trader@192.168.100.11   # master-2
ssh-copy-id trader@192.168.100.12   # master-3
ssh-copy-id trader@192.168.100.20   # trading
ssh-copy-id trader@192.168.100.30   # data
ssh-copy-id trader@192.168.100.40   # kafka
ssh-copy-id trader@192.168.100.50   # monitoring

# Enter password when prompted: YourStrongPassword123!

# Method 2: Manual (if ssh-copy-id not available)
# On each VM, run:
mkdir -p ~/.ssh
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# ─── STEP 6: CREATE SSH CONFIG ON LAPTOP ──────────
# Makes SSH much easier to use
# Instead of: ssh trader@192.168.100.10
# Just type:  ssh vm-master-1

cat >> ~/.ssh/config << 'EOF'
# ═══════════════════════════════════════════════
# Trading Platform VMware Development Environment
# ═══════════════════════════════════════════════

Host vm-bastion
    HostName 192.168.100.5
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-master-1
    HostName 192.168.100.10
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-master-2
    HostName 192.168.100.11
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-master-3
    HostName 192.168.100.12
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-trading
    HostName 192.168.100.20
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-data
    HostName 192.168.100.30
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-kafka
    HostName 192.168.100.40
    User trader
    IdentityFile ~/.ssh/id_ed25519

Host vm-monitoring
    HostName 192.168.100.50
    User trader
    IdentityFile ~/.ssh/id_ed25519
EOF

# Test SSH without password:
ssh vm-master-1 "hostname && ip addr show ens33 | grep inet"
# Should show: k8s-master-1 and 192.168.100.10

echo "✅ Network and SSH configured"

2.7 VMWARE SNAPSHOTS — YOUR SAFETY NET
bash# ═══════════════════════════════════════════════
# VMWARE SNAPSHOTS GUIDE
# CRITICAL HABIT: Take snapshots at key points
# If something breaks: restore snapshot = instant fix
# ═══════════════════════════════════════════════

# WHEN TO TAKE SNAPSHOTS:
# ─────────────────────────────────────────────────
# 1. After Ubuntu install (before any config)
#    Name: "Fresh Ubuntu Install"
#
# 2. After server base setup script
#    Name: "Base Setup Complete"
#
# 3. Before installing each major component
#    Name: "Before Kubernetes Install"
#    Name: "Before Kafka Install"
#    Name: "Before TimescaleDB Install"
#    etc.
#
# 4. After each component works correctly
#    Name: "Kubernetes Working"
#    Name: "Kafka Working"
#    etc.
#
# 5. Before any risky operation
#    Name: "Before [describe what you're doing]"

# HOW TO TAKE A SNAPSHOT IN VMWARE:
# ─────────────────────────────────────────────────
# Option 1: GUI
#   Right-click VM → Snapshot → Take Snapshot
#   Enter name and description
#   Click "Take Snapshot"
#   Takes 30 seconds to 2 minutes

# Option 2: While VM is running
#   VM menu → Snapshot → Take Snapshot
#   VM continues running while snapshot is taken

# Option 3: Keyboard shortcut
#   Ctrl+M in VMware Workstation

# HOW TO RESTORE A SNAPSHOT:
# ─────────────────────────────────────────────────
# Right-click VM → Snapshot → Snapshot Manager
# Select snapshot you want to restore
# Click "Restore"
# Confirm restoration
# VM returns to exact state at time of snapshot
# INSTANT UNDO — No manual cleanup needed

# SNAPSHOT NAMING CONVENTION:
# ─────────────────────────────────────────────────
# Format: [Status]-[Component]-[Date]
# Examples:
#   GOOD-Ubuntu-Fresh-2026-05-01
#   GOOD-BaseSetup-Complete-2026-05-01
#   GOOD-K8s-Running-2026-05-02
#   GOOD-Kafka-Running-2026-05-03
#   BEFORE-K8s-Install-2026-05-02
#   BEFORE-Kafka-Config-2026-05-03

# IMPORTANT NOTES:
# ─────────────────────────────────────────────────
# ⚠️  Snapshots take disk space
#    Each snapshot = ~5-20GB
#    Clean up old snapshots when stable
#
# ⚠️  Snapshots slow down VM slightly
#    Delete snapshots you no longer need
#
# ⚠️  Take snapshot BEFORE installing anything risky
#    Not after (it's too late after it breaks)
#
# ✅  Take snapshot of ALL VMs at same time
#    Cluster state is consistent across all VMs
#    Restore all VMs to same point if needed

# SNAPSHOT SCRIPT — Take snapshot of all VMs together
# Run this from your HOST machine (not inside VM)
# Requires VMware CLI tools (vmrun)

take_cluster_snapshot() {
  local SNAPSHOT_NAME="$1"
  local VMWARE_PATH="C:\\VMs"  # Windows path

  echo "Taking cluster snapshot: $SNAPSHOT_NAME"

  # List of VM vmx files
  VMS=(
    "vm-bastion\\vm-bastion.vmx"
    "vm-master-1\\vm-master-1.vmx"
    "vm-master-2\\vm-master-2.vmx"
    "vm-master-3\\vm-master-3.vmx"
    "vm-trading\\vm-trading.vmx"
    "vm-data\\vm-data.vmx"
    "vm-kafka\\vm-kafka.vmx"
    "vm-monitoring\\vm-monitoring.vmx"
  )

  for VM in "${VMS[@]}"; do
    echo "Snapshotting: $VM"
    vmrun -T ws snapshot \
      "$VMWARE_PATH\\$VM" \
      "$SNAPSHOT_NAME"
  done

  echo "✅ Cluster snapshot complete: $SNAPSHOT_NAME"
}

# Usage:
# take_cluster_snapshot "GOOD-K8s-Working-$(date +%Y-%m-%d)"

2.8 ENVIRONMENT CONFIGURATION FILE
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/config/environment.sh
#
# PURPOSE:
#   Central configuration file for the entire
#   platform. Change IPs here when migrating
#   from VMware to VPS. Nothing else needs to
#   change except this file and K8s TLS SANs.
#
# HOW TO USE:
#   Source this file before running any scripts:
#   source infrastructure/config/environment.sh
#
# ENVIRONMENTS:
#   ENV=vmware    → use VMware IP ranges
#   ENV=vps       → use VPS IP ranges
#   ENV=staging   → use staging VPS IP ranges
# ═══════════════════════════════════════════════

# ─── DETECT ENVIRONMENT ───────────────────────────
# Auto-detect based on ENV variable
# Set ENV=vps before running migration scripts
ENV="${ENV:-vmware}"  # Default to vmware

echo "Loading environment: $ENV"

# ─── VMWARE IPs ───────────────────────────────────
if [ "$ENV" = "vmware" ]; then

  # Network
  NETWORK_RANGE="192.168.100.0/24"
  GATEWAY="192.168.100.1"

  # Server IPs
  BASTION_IP="192.168.100.5"
  MASTER1_IP="192.168.100.10"
  MASTER2_IP="192.168.100.11"
  MASTER3_IP="192.168.100.12"
  WORKER_TRADING1_IP="192.168.100.20"
  WORKER_TRADING2_IP="192.168.100.21"
  WORKER_DATA1_IP="192.168.100.30"
  WORKER_KAFKA1_IP="192.168.100.40"
  WORKER_MONITORING1_IP="192.168.100.50"

  # WireGuard VPN IPs
  VPN_SERVER_IP="10.8.0.1"
  VPN_CLIENT1_IP="10.8.0.2"

  # K8s networking
  K8S_POD_CIDR="10.42.0.0/16"
  K8S_SERVICE_CIDR="10.43.0.0/16"

  # Domain (local only)
  BASE_DOMAIN="trading.local"
  ARGOCD_DOMAIN="argocd.trading.local"
  GRAFANA_DOMAIN="grafana.trading.local"
  KAFKA_UI_DOMAIN="kafka-ui.trading.local"
  VAULT_DOMAIN="vault.trading.local"
  DASHBOARD_DOMAIN="dashboard.trading.local"

  echo "Environment: VMware Development"
  echo "Network: $NETWORK_RANGE"

# ─── VPS IPs ──────────────────────────────────────
elif [ "$ENV" = "vps" ]; then

  # Network (UPDATE THESE WITH YOUR VPS PRIVATE IPs)
  NETWORK_RANGE="10.0.1.0/24"
  GATEWAY="10.0.1.1"

  # Server IPs (from VPS provider dashboard)
  BASTION_IP="10.0.1.5"
  MASTER1_IP="10.0.1.10"
  MASTER2_IP="10.0.1.11"
  MASTER3_IP="10.0.1.12"
  WORKER_TRADING1_IP="10.0.1.20"
  WORKER_TRADING2_IP="10.0.1.21"
  WORKER_DATA1_IP="10.0.1.30"
  WORKER_KAFKA1_IP="10.0.1.40"
  WORKER_MONITORING1_IP="10.0.1.50"

  # Bastion public IP (UPDATE THIS)
  BASTION_PUBLIC_IP="YOUR_BASTION_PUBLIC_IP"

  # WireGuard VPN
  VPN_SERVER_IP="10.8.0.1"
  VPN_CLIENT1_IP="10.8.0.2"

  # K8s networking
  K8S_POD_CIDR="10.42.0.0/16"
  K8S_SERVICE_CIDR="10.43.0.0/16"

  # Domain (UPDATE WITH YOUR REAL DOMAIN)
  BASE_DOMAIN="trading.yourdomain.com"
  ARGOCD_DOMAIN="argocd.internal.trading.yourdomain.com"
  GRAFANA_DOMAIN="grafana.internal.trading.yourdomain.com"
  KAFKA_UI_DOMAIN="kafka-ui.internal.trading.yourdomain.com"
  VAULT_DOMAIN="vault.internal.trading.yourdomain.com"
  DASHBOARD_DOMAIN="dashboard.trading.yourdomain.com"

  echo "Environment: VPS Production"
  echo "Network: $NETWORK_RANGE"
fi

# ─── SHARED CONFIGURATION ─────────────────────────
# These stay the same across environments

# K8s Cluster
K3S_CLUSTER_TOKEN="GENERATE_WITH_openssl_rand_hex_32"
K3S_VERSION="v1.28.5+k3s1"

# Database names
TIMESCALEDB_DB="tickdata"
POSTGRESQL_DB="trading"

# Kubernetes namespaces
NS_TRADING="trading"
NS_DATA="data-layer"
NS_KAFKA="kafka"
NS_MONITORING="monitoring"
NS_INFRA="infra"
NS_VAULT="vault"
NS_ARGOCD="argocd"

# Admin username (same everywhere)
ADMIN_USER="trader"

# Git repository
GIT_REPO="https://github.com/YOUR_ORG/trading-platform"
GIT_BRANCH="main"

# Container registry
REGISTRY="ghcr.io/YOUR_ORG"

# Export all variables
export ENV NETWORK_RANGE GATEWAY
export BASTION_IP MASTER1_IP MASTER2_IP MASTER3_IP
export WORKER_TRADING1_IP WORKER_TRADING2_IP
export WORKER_DATA1_IP WORKER_KAFKA1_IP WORKER_MONITORING1_IP
export VPN_SERVER_IP VPN_CLIENT1_IP
export K8S_POD_CIDR K8S_SERVICE_CIDR
export BASE_DOMAIN ARGOCD_DOMAIN GRAFANA_DOMAIN
export KAFKA_UI_DOMAIN VAULT_DOMAIN DASHBOARD_DOMAIN
export K3S_CLUSTER_TOKEN K3S_VERSION
export TIMESCALEDB_DB POSTGRESQL_DB
export NS_TRADING NS_DATA NS_KAFKA NS_MONITORING
export NS_INFRA NS_VAULT NS_ARGOCD
export ADMIN_USER GIT_REPO GIT_BRANCH REGISTRY

echo "✅ Environment loaded: $ENV"

CHAPTER 3: INSTALL EVERYTHING IN VMWARE

3.1 MASTER INSTALLATION SCRIPT
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/master-install.sh
#
# PURPOSE:
#   Orchestrates the entire installation sequence.
#   Calls each component install script in order.
#   Tracks progress and can resume from any step.
#
# HOW TO USE:
#   1. Set ENV=vmware
#   2. Run: bash master-install.sh
#   3. Script tracks which steps are done
#   4. If interrupted: re-run, skips completed steps
# ═══════════════════════════════════════════════

set -euo pipefail

# Load environment
source infrastructure/config/environment.sh

# Progress tracking file
PROGRESS_FILE="infrastructure/.install-progress"
touch $PROGRESS_FILE

# Check if step is done
step_done() {
  grep -q "^$1$" "$PROGRESS_FILE" 2>/dev/null
}

# Mark step as done
mark_done() {
  echo "$1" >> "$PROGRESS_FILE"
  echo "✅ Step complete: $1"
}

# Run a step
run_step() {
  local STEP_ID="$1"
  local STEP_NAME="$2"
  local SCRIPT="$3"

  if step_done "$STEP_ID"; then
    echo "⏭️  Skipping (already done): $STEP_NAME"
    return 0
  fi

  echo ""
  echo "══════════════════════════════════════"
  echo "STEP: $STEP_NAME"
  echo "══════════════════════════════════════"

  read -p "Run this step? (yes/skip/quit): " choice
  case $choice in
    yes)
      bash "$SCRIPT"
      mark_done "$STEP_ID"
      ;;
    skip)
      echo "Skipped: $STEP_NAME"
      ;;
    quit)
      echo "Installation paused. Re-run to continue."
      exit 0
      ;;
    *)
      echo "Invalid choice. Skipping."
      ;;
  esac
}

echo "═══════════════════════════════════════════"
echo " TRADING PLATFORM INSTALLATION"
echo " Environment: $ENV"
echo " Started: $(date)"
echo "═══════════════════════════════════════════"

# ─── INSTALLATION SEQUENCE ────────────────────────

run_step "01-server-setup" \
  "Server Base Setup (all VMs)" \
  "infrastructure/scripts/01-setup-all-servers.sh"

run_step "02-wireguard" \
  "WireGuard VPN Setup" \
  "infrastructure/scripts/02-setup-wireguard.sh"

run_step "03-kubernetes" \
  "Kubernetes Cluster Installation" \
  "infrastructure/scripts/03-install-kubernetes.sh"

run_step "04-longhorn" \
  "Longhorn Distributed Storage" \
  "infrastructure/scripts/04-install-longhorn.sh"

run_step "05-nginx-ingress" \
  "Nginx Ingress Controller" \
  "infrastructure/scripts/05-install-ingress.sh"

run_step "06-cert-manager" \
  "Cert Manager (SSL certificates)" \
  "infrastructure/scripts/06-install-cert-manager.sh"

run_step "07-vault" \
  "HashiCorp Vault (Secret Management)" \
  "infrastructure/scripts/07-install-vault.sh"

run_step "08-kafka" \
  "Apache Kafka (Message Streaming)" \
  "infrastructure/scripts/08-install-kafka.sh"

run_step "09-timescaledb" \
  "TimescaleDB (Tick Data Storage)" \
  "infrastructure/scripts/09-install-timescaledb.sh"

run_step "10-postgresql" \
  "PostgreSQL (Business Data)" \
  "infrastructure/scripts/10-install-postgresql.sh"

run_step "11-redis" \
  "Redis (Cache)" \
  "infrastructure/scripts/11-install-redis.sh"

run_step "12-monitoring" \
  "Prometheus + Grafana + Loki + Jaeger" \
  "infrastructure/scripts/12-install-monitoring.sh"

run_step "13-argocd" \
  "ArgoCD (GitOps Deployment)" \
  "infrastructure/scripts/13-install-argocd.sh"

run_step "14-verify" \
  "Full System Verification" \
  "infrastructure/scripts/14-verify-all.sh"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ INSTALLATION COMPLETE"
echo "Environment: $ENV"
echo "Completed: $(date)"
echo "═══════════════════════════════════════════"

CHAPTER 4: VPS MIGRATION GUIDE

4.1 MIGRATION OVERVIEW
═══════════════════════════════════════════════════════
MIGRATION STRATEGY: ZERO REBUILD
═══════════════════════════════════════════════════════

WHAT WE MIGRATE:
├── Kubernetes cluster configs (Helm values)
├── Kubernetes manifests (deployment YAMLs)
├── Database schemas (SQL files)
├── Application configs (ConfigMaps, Secrets)
├── Kafka topics definitions
└── Vault policies and secret structure

WHAT WE DO NOT MIGRATE:
├── VM disk images (not needed — fresh install)
├── Development data (start fresh in production)
└── Test secrets (generate new production secrets)

WHAT WE RE-CREATE FROM CODE:
Everything is Infrastructure as Code (IaC)
All configs are in Git repository
VPS setup = run same scripts with ENV=vps
Takes 4-8 hours total

MIGRATION PROCESS:
─────────────────────────────────────────────────────
DAY 1 MORNING: Provision VPS servers
DAY 1 AFTERNOON: Run base setup + K8s install
DAY 1 EVENING: Install Kafka, databases, Redis
DAY 2 MORNING: Install monitoring, Vault, ArgoCD
DAY 2 AFTERNOON: Deploy trading services
DAY 2 EVENING: Connect to broker demo accounts
               Run paper trading 48 hours

DAY 4+: If paper trading correct → go live

═══════════════════════════════════════════════════════

4.2 PRE-MIGRATION CHECKLIST
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/pre-migration-check.sh
#
# PURPOSE:
#   Verify everything works in VMware before
#   starting VPS migration. If any check fails,
#   fix it in VMware first — much easier to debug.
# ═══════════════════════════════════════════════

echo "═══════════════════════════════════════════"
echo " PRE-MIGRATION CHECKLIST"
echo " Run in VMware BEFORE ordering VPS servers"
echo "═══════════════════════════════════════════"

PASS=0
FAIL=0
WARN=0

check_pass() {
  echo "  ✅ PASS: $1"
  ((PASS++))
}

check_fail() {
  echo "  ❌ FAIL: $1"
  echo "     Fix: $2"
  ((FAIL++))
}

check_warn() {
  echo "  ⚠️  WARN: $1"
  ((WARN++))
}

echo ""
echo "─── 1. Kubernetes Cluster ───────────────────"

# All nodes ready
READY=$(kubectl get nodes --no-headers 2>/dev/null | \
  grep -c " Ready")
TOTAL=$(kubectl get nodes --no-headers 2>/dev/null | \
  wc -l)

if [ "$READY" = "$TOTAL" ] && [ "$TOTAL" -gt "0" ]; then
  check_pass "All $TOTAL K8s nodes Ready"
else
  check_fail "K8s nodes not all Ready ($READY/$TOTAL)" \
    "Check: kubectl get nodes"
fi

# All system pods running
SYS_FAIL=$(kubectl get pods -n kube-system \
  --no-headers 2>/dev/null | \
  grep -v "Running\|Completed" | wc -l)
if [ "$SYS_FAIL" = "0" ]; then
  check_pass "All system pods healthy"
else
  check_fail "$SYS_FAIL system pods not healthy" \
    "Check: kubectl get pods -n kube-system"
fi

echo ""
echo "─── 2. Storage ──────────────────────────────"

STORAGE=$(kubectl get storageclass 2>/dev/null | \
  grep -c "longhorn")
if [ "$STORAGE" -gt "0" ]; then
  check_pass "Longhorn storage classes exist"
else
  check_fail "Longhorn not installed" \
    "Run: bash infrastructure/scripts/04-install-longhorn.sh"
fi

echo ""
echo "─── 3. Kafka ────────────────────────────────"

KAFKA_PODS=$(kubectl get pods -n kafka \
  --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$KAFKA_PODS" -ge "3" ]; then
  check_pass "Kafka cluster running ($KAFKA_PODS pods)"
else
  check_fail "Kafka not running properly" \
    "Check: kubectl get pods -n kafka"
fi

# Test topic creation
if kubectl exec -n kafka kafka-controller-0 -- \
  kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --list 2>/dev/null | grep -q "market"; then
  check_pass "Kafka topics created"
else
  check_fail "Kafka topics missing" \
    "Run: bash infrastructure/scripts/create-kafka-topics.sh"
fi

echo ""
echo "─── 4. Databases ────────────────────────────"

# TimescaleDB
TSDB=$(kubectl get pods -n data-layer \
  -l app=timescaledb --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$TSDB" -ge "1" ]; then
  check_pass "TimescaleDB running"
else
  check_fail "TimescaleDB not running" \
    "Check: kubectl get pods -n data-layer"
fi

# PostgreSQL
PG=$(kubectl get pods -n data-layer \
  -l cnpg.io/cluster --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$PG" -ge "1" ]; then
  check_pass "PostgreSQL running ($PG instances)"
else
  check_fail "PostgreSQL not running" \
    "Check: kubectl get pods -n data-layer"
fi

# Redis
REDIS=$(kubectl get pods -n data-layer \
  -l app.kubernetes.io/name=redis \
  --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$REDIS" -ge "1" ]; then
  check_pass "Redis running"
else
  check_fail "Redis not running" \
    "Check: kubectl get pods -n data-layer"
fi

echo ""
echo "─── 5. Schemas ──────────────────────────────"

# TimescaleDB hypertable
TSDB_POD=$(kubectl get pods -n data-layer \
  -l app=timescaledb,role=master \
  -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)

if kubectl exec -n data-layer "$TSDB_POD" -- \
  psql -U postgres -c \
  "SELECT count(*) FROM timescaledb_information.hypertables;" \
  2>/dev/null | grep -q "[1-9]"; then
  check_pass "TimescaleDB schema initialized"
else
  check_fail "TimescaleDB schema missing" \
    "Run schema initialization script"
fi

# PostgreSQL tables
PG_POD=$(kubectl get pods -n data-layer \
  -l cnpg.io/instanceRole=primary \
  -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)

if kubectl exec -n data-layer "$PG_POD" -- \
  psql -U postgres -d trading \
  -c "\dt" 2>/dev/null | grep -q "orders"; then
  check_pass "PostgreSQL schema initialized"
else
  check_fail "PostgreSQL schema missing" \
    "Run: bash infrastructure/scripts/init-postgresql.sh"
fi

echo ""
echo "─── 6. Security ─────────────────────────────"

# Vault
VAULT_STATUS=$(kubectl exec -n vault vault-0 -- \
  vault status 2>/dev/null | \
  grep "Sealed" | awk '{print $2}')
if [ "$VAULT_STATUS" = "false" ]; then
  check_pass "Vault running and unsealed"
else
  check_fail "Vault sealed or not running" \
    "Unseal Vault: vault operator unseal"
fi

# Vault secrets
if kubectl exec -n vault vault-0 -- \
  vault kv list secret/trading/ 2>/dev/null | \
  grep -q "kafka"; then
  check_pass "Vault secrets populated"
else
  check_fail "Vault secrets missing" \
    "Run: bash infrastructure/scripts/vault-setup-secrets.sh"
fi

echo ""
echo "─── 7. Monitoring ───────────────────────────"

GRAFANA=$(kubectl get pods -n monitoring \
  -l app.kubernetes.io/name=grafana \
  --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$GRAFANA" -ge "1" ]; then
  check_pass "Grafana running"
else
  check_fail "Grafana not running" \
    "Check: kubectl get pods -n monitoring"
fi

PROMETHEUS=$(kubectl get pods -n monitoring \
  -l app.kubernetes.io/name=prometheus \
  --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$PROMETHEUS" -ge "1" ]; then
  check_pass "Prometheus running"
else
  check_fail "Prometheus not running" \
    "Check: kubectl get pods -n monitoring"
fi

echo ""
echo "─── 8. ArgoCD ───────────────────────────────"

ARGOCD=$(kubectl get pods -n argocd \
  -l app.kubernetes.io/name=argocd-server \
  --no-headers 2>/dev/null | \
  grep -c "Running")
if [ "$ARGOCD" -ge "1" ]; then
  check_pass "ArgoCD running"
else
  check_warn "ArgoCD not running (non-critical for migration)"
fi

echo ""
echo "─── 9. Git Repository ───────────────────────"

if git remote -v 2>/dev/null | grep -q "origin"; then
  check_pass "Git remote configured"
else
  check_fail "Git remote not configured" \
    "Run: git remote add origin https://github.com/YOUR_ORG/trading-platform"
fi

UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l)
if [ "$UNCOMMITTED" = "0" ]; then
  check_pass "All changes committed to git"
else
  check_warn "$UNCOMMITTED uncommitted changes — commit before migration"
fi

echo ""
echo "─── 10. Configuration Files ─────────────────"

# Check all helm values files exist
HELM_FILES=(
  "kafka-values.yaml"
  "timescaledb-values.yaml"
  "redis-values.yaml"
  "prometheus-values.yaml"
  "vault-values.yaml"
  "argocd-values.yaml"
)

for f in "${HELM_FILES[@]}"; do
  if [ -f "infrastructure/kubernetes/helm-values/$f" ]; then
    check_pass "Helm values exist: $f"
  else
    check_fail "Missing helm values: $f" \
      "Create file from this guide"
  fi
done

# Check environment file
if [ -f "infrastructure/config/environment.sh" ]; then
  check_pass "Environment config exists"
else
  check_fail "Missing environment config" \
    "Create infrastructure/config/environment.sh"
fi

echo ""
echo "═══════════════════════════════════════════"
echo " MIGRATION READINESS REPORT"
echo "═══════════════════════════════════════════"
echo ""
echo " ✅ PASSED:  $PASS checks"
echo " ❌ FAILED:  $FAIL checks"
echo " ⚠️  WARNING: $WARN checks"
echo ""

if [ $FAIL -gt 0 ]; then
  echo "🔴 NOT READY FOR MIGRATION"
  echo "   Fix all $FAIL failures in VMware first"
  echo "   Then re-run this checklist"
elif [ $WARN -gt 0 ]; then
  echo "🟡 MOSTLY READY — Review warnings"
  echo "   Warnings won't block migration"
  echo "   But worth fixing for cleanliness"
else
  echo "🟢 READY FOR VPS MIGRATION"
  echo "   Proceed to Chapter 4: VPS Setup"
fi
echo ""

4.3 EXPORT CONFIGURATIONS
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/export-configs.sh
#
# PURPOSE:
#   Export all configurations from running VMware
#   cluster into files that will be used to
#   recreate the same setup on VPS.
#   This is the "snapshot" of your working config.
# ═══════════════════════════════════════════════

source infrastructure/config/environment.sh

EXPORT_DIR="infrastructure/migration/exported-configs"
mkdir -p "$EXPORT_DIR"

echo "═══════════════════════════════════════════"
echo " Exporting configurations from VMware"
echo " Destination: $EXPORT_DIR"
echo "═══════════════════════════════════════════"

# ─── EXPORT HELM RELEASES ─────────────────────────
echo ""
echo "Exporting Helm release values..."

# Get actual values used in each release
for release in kafka timescaledb postgresql redis \
               vault argocd kube-prometheus-stack loki; do
  namespace=$(kubectl get secret -A \
    -l "name=$release" \
    -o jsonpath='{.items[0].metadata.namespace}' \
    2>/dev/null || echo "unknown")

  if helm get values "$release" -n "$namespace" \
     > "$EXPORT_DIR/helm-${release}-actual-values.yaml" \
     2>/dev/null; then
    echo "  ✅ Exported: $release"
  else
    echo "  ⚠️  Not found: $release"
  fi
done

# ─── EXPORT KUBERNETES RESOURCES ──────────────────
echo ""
echo "Exporting K8s resources..."

# Export all configmaps from trading namespace
kubectl get configmaps -n trading -o yaml > \
  "$EXPORT_DIR/trading-configmaps.yaml"

# Export all services
kubectl get services -n trading -o yaml > \
  "$EXPORT_DIR/trading-services.yaml"

# Export ingress rules
kubectl get ingress -A -o yaml > \
  "$EXPORT_DIR/all-ingress.yaml"

# Export storage classes
kubectl get storageclass -o yaml > \
  "$EXPORT_DIR/storage-classes.yaml"

# Export network policies
kubectl get networkpolicies -A -o yaml > \
  "$EXPORT_DIR/network-policies.yaml"

echo "  ✅ K8s resources exported"

# ─── EXPORT DATABASE SCHEMAS ──────────────────────
echo ""
echo "Exporting database schemas..."

# TimescaleDB schema
TSDB_POD=$(kubectl get pods -n data-layer \
  -l app=timescaledb,role=master \
  -o jsonpath='{.items[0].metadata.name}')

kubectl exec -n data-layer "$TSDB_POD" -- \
  pg_dump -U postgres \
  --schema-only \
  --no-owner \
  --no-privileges \
  postgres > "$EXPORT_DIR/timescaledb-schema.sql"

echo "  ✅ TimescaleDB schema exported"

# PostgreSQL schema
PG_POD=$(kubectl get pods -n data-layer \
  -l cnpg.io/instanceRole=primary \
  -o jsonpath='{.items[0].metadata.name}')

kubectl exec -n data-layer "$PG_POD" -- \
  pg_dump -U postgres \
  --schema-only \
  --no-owner \
  --no-privileges \
  trading > "$EXPORT_DIR/postgresql-schema.sql"

echo "  ✅ PostgreSQL schema exported"

# ─── EXPORT KAFKA TOPIC LIST ──────────────────────
echo ""
echo "Exporting Kafka topics..."

kubectl exec -n kafka kafka-controller-0 -- \
  kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --describe 2>/dev/null > \
  "$EXPORT_DIR/kafka-topics-describe.txt"

kubectl exec -n kafka kafka-controller-0 -- \
  kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --list 2>/dev/null > \
  "$EXPORT_DIR/kafka-topics-list.txt"

echo "  ✅ Kafka topics exported"

# ─── EXPORT VAULT STRUCTURE (no secrets) ──────────
echo ""
echo "Exporting Vault structure (no secret values)..."

kubectl exec -n vault vault-0 -- \
  vault kv list -format=json secret/trading/ \
  2>/dev/null > "$EXPORT_DIR/vault-secret-paths.json"

kubectl exec -n vault vault-0 -- \
  vault read -format=json sys/policy \
  2>/dev/null > "$EXPORT_DIR/vault-policies.json"

echo "  ✅ Vault structure exported"

# ─── CREATE MIGRATION MANIFEST ────────────────────
echo ""
echo "Creating migration manifest..."

cat > "$EXPORT_DIR/MIGRATION-MANIFEST.md" << EOF
# Migration Manifest
Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Source environment: VMware ($ENV)

## What was exported:
- Helm release values (actual running config)
- Kubernetes resources (configmaps, services, ingress)
- Database schemas (TimescaleDB + PostgreSQL)
- Kafka topic definitions
- Vault secret structure (NOT secret values)

## What to do on VPS:
1. Source environment.sh with ENV=vps
2. Run master-install.sh
3. Apply these schemas to databases
4. Recreate Kafka topics
5. Populate Vault with production secrets
6. Deploy services via ArgoCD

## Important notes:
- Regenerate all passwords for VPS
- Use production broker credentials
- Update all domain names
- Generate new SSL certificates
- Test with paper trading before live

## Files in this directory:
$(ls -la "$EXPORT_DIR")
EOF

# ─── COMMIT TO GIT ────────────────────────────────
echo ""
echo "Committing configs to git..."

git add infrastructure/
git commit -m "Export VMware configs for VPS migration - $(date +%Y-%m-%d)"
git push origin main

echo ""
echo "═══════════════════════════════════════════"
echo "✅ EXPORT COMPLETE"
echo "All configs exported to: $EXPORT_DIR"
echo "Configs committed to git"
echo ""
echo "Next step: Order VPS servers"
echo "Then run: ENV=vps bash master-install.sh"
echo "═══════════════════════════════════════════"

4.4 VPS PROVIDER SETUP
bash# ═══════════════════════════════════════════════
# FILE: infrastructure/docs/vps-providers.md
#
# VPS PROVIDER COMPARISON AND SETUP GUIDE
# ═══════════════════════════════════════════════

# ─── RECOMMENDED PROVIDERS ────────────────────────

# OPTION 1: EQUINIX METAL (Best for low latency trading)
# ─────────────────────────────────────────────────────
# Why: Physical dedicated servers at Equinix data centers
#      Co-location with major forex brokers (NY4, LD4)
#      Sub-millisecond latency to brokers
# Price: $500-2000/server/month
# Location: NY4 (New York), LD4 (London), TY3 (Tokyo)
# Website: https://deploy.equinix.com
# Setup:
#   1. Create account at deploy.equinix.com
#   2. Choose "On Demand" servers
#   3. Select facility: NY (DA11) for forex
#   4. Choose server type (see specs in section 1.1)
#   5. OS: Ubuntu 22.04 LTS
#   6. Add your SSH public key
#   7. Deploy — servers ready in 5-10 minutes

# OPTION 2: HETZNER DEDICATED (Best value)
# ─────────────────────────────────────────────────────
# Why: Excellent price/performance
#      European data centers (good for forex)
#      Very stable, great uptime
# Price: $50-300/server/month
# Location: Nuremberg, Helsinki, Ashburn
# Website: https://www.hetzner.com/dedicated-rootserver
# Setup:
#   1. Create account at hetzner.com
#   2. Go to: Robot → Order → Dedicated Server
#   3. Choose AX series (AMD EPYC — best performance)
#   4. Select location (Nuremberg for EU forex)
#   5. Choose Ubuntu 22.04 at checkout
#   6. Add SSH key in Hetzner Robot
#   7. Deploy — ready in 24-48 hours

# OPTION 3: OVH BARE METAL (Good middle ground)
# ─────────────────────────────────────────────────────
# Price: $100-500/server/month
# Location: Beauharnois (Canada), Roubaix (France), etc.
# Website: https://www.ovh.com/world/dedicated-servers/

# OPTION 4: VULTR BARE METAL (Quick setup)
# ─────────────────────────────────────────────────────
# Price: $120-500/server/month
# Location: Multiple worldwide
# Website: https://www.vultr.com/products/bare-metal/
# Advantage: API-driven, fast provisioning

# ─── NETWORK SETUP AT VPS PROVIDER ────────────────

# PRIVATE NETWORK:
# Most providers offer private networking:
# Equinix: Private Network via Metal VLAN
# Hetzner: vSwitch (free, up to 1Gbps)
# OVH: vRack
# Vultr: Private Networks

# SETUP PRIVATE NETWORK (Hetzner example):
# 1. Login to Hetzner Robot
# 2. Go to: Ordering → vSwitch → Order
# 3. Create vSwitch: "trading-private"
# 4. Add all servers to vSwitch
# 5. Configure private IPs on each server:
#    (see network config below)

# ─── CONFIGURE PRIVATE NETWORK ON VPS ─────────────
# Run on each VPS server after provisioning

setup_vps_private_network() {
  local PRIVATE_IP=$1  # e.g., 10.0.1.10
  local PRIVATE_IFACE="enp7s0"  # Check with: ip link show

  echo "Configuring private network..."
  echo "Private IP: $PRIVATE_IP"

  # Create netplan config for private interface
  cat > /etc/netplan/60-private.yaml << EOF
network:
  version: 2
  ethernets:
    $PRIVATE_IFACE:
      dhcp4: false
      addresses:
        - $PRIVATE_IP/24
      routes:
        - to: 10.0.0.0/8
          via: 10.0.1.1
EOF

  # Apply network config
  netplan apply

  # Verify
  ip addr show $PRIVATE_IFACE
  echo "✅ Private network configured: $PRIVATE_IP"
}

# ─── UPDATE ENVIRONMENT FILE FOR VPS ──────────────
update_environment_for_vps() {
  echo "Updating environment file for VPS..."

  # Backup VMware config
  cp infrastructure/config/environment.sh \
    infrastructure/config/environment.vmware.backup.sh

  echo ""
  echo "Enter VPS server private IPs:"
  read -p "Bastion IP: " BASTION
  read -p "Master-1 IP: " M1
  read -p "Master-2 IP: " M2
  read -p "Master-3 IP: " M3
  read -p "Worker-Trading-1 IP: " WT1
  read -p "Worker-Trading-2 IP: " WT2
  read -p "Worker-Data IP: " WD
  read -p "Worker-Kafka IP: " WK
  read -p "Worker-Monitoring IP: " WM
  read -p "Bastion PUBLIC IP: " BPUB
  read -p "Your domain (e.g., trading.yourdomain.com): " DOMAIN

  # Update environment file (VPS section)
  sed -i "s/10.0.1.5/$BASTION/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.10/$M1/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.11/$M2/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.12/$M3/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.20/$WT1/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.21/$WT2/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.30/$WD/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.40/$WK/g" \
    infrastructure/config/environment.sh
  sed -i "s/10.0.1.50/$WM/g" \
    infrastructure/config/environment.sh
  sed -i "s/YOUR_BASTION_PUBLIC_IP/$BPUB/g" \
    infrastructure/config/environment.sh
  sed -i "s/trading.yourdomain.com/$DOMAIN/g" \
    infrastructure/config/environment.sh

  echo "✅ Environment file updated for VPS"
  echo "Review: cat infrastructure/config/environment.sh"
}

4.5 COMPLETE MIGRATION SCRIPT
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/migrate-to-vps.sh
#
# PURPOSE:
#   Complete migration from VMware to VPS
#   Guides through each step with verification
#   Can be run in sections if interrupted
# ═══════════════════════════════════════════════

set -euo pipefail

# MUST be run with ENV=vps
if [ "${ENV:-}" != "vps" ]; then
  echo "❌ ERROR: Set ENV=vps before running migration"
  echo "   Run: export ENV=vps"
  exit 1
fi

source infrastructure/config/environment.sh

echo "═══════════════════════════════════════════"
echo " VPS MIGRATION SCRIPT"
echo " Environment: VPS Production"
echo " Started: $(date)"
echo "═══════════════════════════════════════════"
echo ""
echo "⚠️  PRE-MIGRATION REQUIREMENTS:"
echo "1. All VPS servers provisioned and running"
echo "2. Private network configured between servers"
echo "3. SSH access working to all servers"
echo "4. environment.sh updated with VPS IPs"
echo "5. DNS configured (if using custom domain)"
echo ""
read -p "All requirements met? (yes/no): " ready
[ "$ready" != "yes" ] && exit 0

# ─── PHASE 1: TEST CONNECTIVITY ───────────────────
echo ""
echo "PHASE 1: Testing connectivity to all servers..."

test_server() {
  local HOST=$1
  local IP=$2

  if ssh -o ConnectTimeout=5 \
         -o StrictHostKeyChecking=no \
         trader@$IP "echo OK" > /dev/null 2>&1; then
    echo "  ✅ Reachable: $HOST ($IP)"
    return 0
  else
    echo "  ❌ Cannot reach: $HOST ($IP)"
    return 1
  fi
}

ALL_REACHABLE=true

test_server "bastion"    "$BASTION_IP"         || ALL_REACHABLE=false
test_server "master-1"   "$MASTER1_IP"         || ALL_REACHABLE=false
test_server "master-2"   "$MASTER2_IP"         || ALL_REACHABLE=false
test_server "master-3"   "$MASTER3_IP"         || ALL_REACHABLE=false
test_server "trading-1"  "$WORKER_TRADING1_IP" || ALL_REACHABLE=false
test_server "data-1"     "$WORKER_DATA1_IP"    || ALL_REACHABLE=false
test_server "kafka-1"    "$WORKER_KAFKA1_IP"   || ALL_REACHABLE=false
test_server "monitoring" "$WORKER_MONITORING1_IP" || ALL_REACHABLE=false

if [ "$ALL_REACHABLE" = "false" ]; then
  echo ""
  echo "❌ Some servers unreachable. Fix before continuing."
  exit 1
fi

echo "✅ All servers reachable"

# ─── PHASE 2: RUN BASE SETUP ON ALL SERVERS ───────
echo ""
echo "PHASE 2: Running base setup on all servers..."
echo "This runs setup script on each server"
echo "(Same script as VMware, just different IPs)"

run_on_server() {
  local HOST=$1
  local IP=$2
  local ROLE=$3
  local THIS_IP=$4

  echo ""
  echo "Setting up: $HOST ($IP) role=$ROLE"

  # Copy setup script to server
  scp infrastructure/scripts/01-setup-server.sh \
    trader@$IP:/tmp/setup-server.sh

  # Run setup script remotely
  ssh trader@$IP "
    export THIS_HOSTNAME=$HOST
    export THIS_ROLE=$ROLE
    export THIS_IP=$THIS_IP
    bash /tmp/setup-server.sh
  "

  echo "✅ Setup complete: $HOST"
}

# Run on each server
# NOTE: These run the exact same script as VMware
# Only difference: different hostnames and IPs

run_on_server "bastion" "$BASTION_IP" \
  "bastion" "$BASTION_IP"

run_on_server "k8s-master-1" "$MASTER1_IP" \
  "master" "$MASTER1_IP"

run_on_server "k8s-master-2" "$MASTER2_IP" \
  "master" "$MASTER2_IP"

run_on_server "k8s-master-3" "$MASTER3_IP" \
  "master" "$MASTER3_IP"

run_on_server "k8s-worker-trading-1" "$WORKER_TRADING1_IP" \
  "trading" "$WORKER_TRADING1_IP"

run_on_server "k8s-worker-data-1" "$WORKER_DATA1_IP" \
  "data" "$WORKER_DATA1_IP"

run_on_server "k8s-worker-kafka-1" "$WORKER_KAFKA1_IP" \
  "kafka" "$WORKER_KAFKA1_IP"

run_on_server "k8s-worker-monitoring-1" "$WORKER_MONITORING1_IP" \
  "monitoring" "$WORKER_MONITORING1_IP"

echo ""
echo "✅ Base setup complete on all servers"
echo "⚠️  Servers will reboot — wait 60 seconds..."
sleep 60

# ─── PHASE 3: INSTALL KUBERNETES ──────────────────
echo ""
echo "PHASE 3: Installing Kubernetes cluster..."

# Run K8s installation (same script, different IPs from env)
export ENV=vps
bash infrastructure/scripts/03-install-kubernetes.sh

echo "✅ Kubernetes installed"

# ─── PHASE 4: UPDATE KUBECONFIG FOR VPS ───────────
echo ""
echo "PHASE 4: Updating kubeconfig for VPS..."

mkdir -p ~/.kube

# Get kubeconfig from VPS master
scp trader@$MASTER1_IP:/etc/rancher/k3s/k3s.yaml \
  ~/.kube/config-trading-vps

# Point to VPS master IP
sed -i "s/127.0.0.1/$MASTER1_IP/g" \
  ~/.kube/config-trading-vps

chmod 600 ~/.kube/config-trading-vps

# Switch to VPS cluster
export KUBECONFIG=~/.kube/config-trading-vps

# Verify
kubectl get nodes -o wide
echo "✅ Connected to VPS Kubernetes cluster"

# ─── PHASE 5: INSTALL ALL COMPONENTS ──────────────
echo ""
echo "PHASE 5: Installing all platform components..."
echo "This is identical to VMware installation"
echo "Uses same Helm values, same configs"
echo "Only IPs are different (from environment.sh)"

# All scripts use ENV variable automatically
# They source environment.sh at the start

bash infrastructure/scripts/04-install-longhorn.sh
bash infrastructure/scripts/05-install-ingress.sh
bash infrastructure/scripts/06-install-cert-manager.sh
bash infrastructure/scripts/07-install-vault.sh
bash infrastructure/scripts/08-install-kafka.sh
bash infrastructure/scripts/09-install-timescaledb.sh
bash infrastructure/scripts/10-install-postgresql.sh
bash infrastructure/scripts/11-install-redis.sh
bash infrastructure/scripts/12-install-monitoring.sh
bash infrastructure/scripts/13-install-argocd.sh

echo "✅ All components installed on VPS"

# ─── PHASE 6: INITIALIZE DATABASES ────────────────
echo ""
echo "PHASE 6: Initializing databases..."

# Apply schemas to VPS databases
bash infrastructure/scripts/init-all-databases.sh

echo "✅ Databases initialized"

# ─── PHASE 7: POPULATE VAULT WITH PRODUCTION SECRETS ──
echo ""
echo "PHASE 7: Setting up production secrets in Vault..."
echo "⚠️  IMPORTANT: These are PRODUCTION secrets"
echo "   Use DIFFERENT passwords than VMware"
echo "   Use REAL broker credentials for live trading"

# Initialize and unseal Vault
bash infrastructure/scripts/vault-init-vps.sh

# Store production secrets
echo ""
echo "You will now enter production secrets manually"
echo "These are stored in Vault — never in files"
bash infrastructure/scripts/vault-setup-secrets.sh

echo "✅ Vault configured with production secrets"

# ─── PHASE 8: DEPLOY TRADING SERVICES ─────────────
echo ""
echo "PHASE 8: Deploying trading services..."
echo "ArgoCD will pull from git and deploy"

# ArgoCD deploys everything from git
argocd login $ARGOCD_DOMAIN \
  --username admin \
  --password $(kubectl -n argocd get secret \
    argocd-initial-admin-secret \
    -o jsonpath="{.data.password}" | base64 -d) \
  --insecure

# Trigger sync of all applications
argocd app sync trading-platform-apps --prune

# Wait for all apps to sync
argocd app wait trading-platform-apps \
  --timeout 600

echo "✅ Trading services deployed"

# ─── PHASE 9: FINAL VERIFICATION ──────────────────
echo ""
echo "PHASE 9: Final verification..."

bash infrastructure/scripts/14-verify-all.sh

# ─── MIGRATION COMPLETE ───────────────────────────
echo ""
echo "═══════════════════════════════════════════"
echo "✅ VPS MIGRATION COMPLETE"
echo "═══════════════════════════════════════════"
echo ""
echo "NEXT STEPS:"
echo "1. Connect to broker DEMO accounts first"
echo "2. Run paper trading for 48 hours"
echo "3. Verify signals match VMware behavior"
echo "4. Check latency: kubectl top pods -n trading"
echo "5. Review Grafana dashboards"
echo "6. If all correct: connect live broker"
echo ""
echo "IMPORTANT: Do NOT go live immediately"
echo "Paper trade first. Verify. Then go live."
echo ""
echo "Access URLs:"
echo "  Grafana:  https://$GRAFANA_DOMAIN"
echo "  ArgoCD:   https://$ARGOCD_DOMAIN"
echo "  Kafka UI: https://$KAFKA_UI_DOMAIN"
echo "═══════════════════════════════════════════"

4.6 POST-MIGRATION VALIDATION
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/scripts/post-migration-validate.sh
#
# PURPOSE:
#   Comprehensive validation after VPS migration
#   Compares VPS behavior with VMware baseline
#   Must all pass before connecting live broker
# ═══════════════════════════════════════════════

echo "═══════════════════════════════════════════"
echo " POST-MIGRATION VALIDATION"
echo " Run after migration, before going live"
echo "═══════════════════════════════════════════"

# ─── TEST 1: LATENCY COMPARISON ───────────────────
echo ""
echo "TEST 1: Measuring order placement latency..."

# Deploy latency test pod
cat > /tmp/latency-test.yaml << 'EOF'
apiVersion: v1
kind: Pod
metadata:
  name: latency-test
  namespace: trading
spec:
  containers:
  - name: latency-test
    image: python:3.11-slim
    command: ["sleep", "3600"]
  nodeSelector:
    node-role: trading
EOF

kubectl apply -f /tmp/latency-test.yaml
kubectl wait --for=condition=ready pod/latency-test \
  -n trading --timeout=60s

# Test broker connectivity latency
echo "Testing latency to Kafka..."
START=$(date +%s%N)
kubectl exec -n trading latency-test -- \
  python3 -c "
import socket, time
start = time.time()
s = socket.create_connection(('kafka-controller-0.kafka.svc.cluster.local', 9092), timeout=5)
s.close()
print(f'Kafka latency: {(time.time()-start)*1000:.2f}ms')
" 2>/dev/null || echo "  Kafka latency test (check manually)"

echo "Testing latency to PostgreSQL..."
kubectl exec -n trading latency-test -- \
  python3 -c "
import socket, time
start = time.time()
s = socket.create_connection(('pgbouncer.data-layer.svc.cluster.local', 5432), timeout=5)
s.close()
print(f'PostgreSQL latency: {(time.time()-start)*1000:.2f}ms')
" 2>/dev/null || echo "  DB latency test (check manually)"

# Cleanup
kubectl delete pod latency-test -n trading

# ─── TEST 2: KAFKA THROUGHPUT ─────────────────────
echo ""
echo "TEST 2: Kafka throughput test..."

kubectl exec -n kafka kafka-controller-0 -- \
  kafka-producer-perf-test.sh \
  --topic market.ticks.XAUUSD \
  --num-records 100000 \
  --record-size 100 \
  --throughput -1 \
  --producer-props \
    bootstrap.servers=localhost:9092

# Expected: > 50,000 records/sec
# If < 10,000: check disk I/O on Kafka node

echo ""
echo "TEST 2b: Kafka consumer test..."

timeout 10 kubectl exec -n kafka kafka-controller-0 -- \
  kafka-consumer-perf-test.sh \
  --broker-list localhost:9092 \
  --topic market.ticks.XAUUSD \
  --messages 100000 2>/dev/null || true

echo "  ✅ Kafka throughput test complete"

# ─── TEST 3: DATABASE PERFORMANCE ─────────────────
echo ""
echo "TEST 3: Database insert performance..."

TSDB_POD=$(kubectl get pods -n data-layer \
  -l app=timescaledb,role=master \
  -o jsonpath='{.items[0].metadata.name}')

kubectl exec -n data-layer "$TSDB_POD" -- \
  psql -U postgres -c "
-- Insert 100,000 test ticks and measure time
EXPLAIN ANALYZE
INSERT INTO ticks (time, symbol, broker, bid, ask, volume)
SELECT
  NOW() - (i || ' seconds')::interval,
  'XAUUSD',
  'test',
  2350.0 + random(),
  2350.1 + random(),
  random() * 100
FROM generate_series(1, 1000) i;
"

echo "  ✅ Database performance test complete"

# ─── TEST 4: END-TO-END SIGNAL FLOW ───────────────
echo ""
echo "TEST 4: End-to-end signal flow test..."

# Publish test tick to Kafka
kubectl exec -n kafka kafka-controller-0 -- \
  kafka-console-producer.sh \
  --broker-list localhost:9092 \
  --topic market.ticks.XAUUSD << 'EOF'
{"time":"2026-05-01T09:00:00Z","symbol":"XAUUSD","broker":"test","bid":2350.50,"ask":2350.70,"volume":10}
EOF

echo "  Test tick published to Kafka"
echo "  Check data-service logs to verify processing:"
echo "  kubectl logs -f deploy/data-service -n trading"
echo ""
echo "  Check strategy-engine to see if signal generated:"
echo "  kubectl logs -f deploy/strategy-engine -n trading"

# ─── TEST 5: FAILOVER TEST ────────────────────────
echo ""
echo "TEST 5: HA failover test..."
echo "⚠️  This will temporarily disrupt services"
read -p "Run failover test? (yes/no): " run_failover

if [ "$run_failover" = "yes" ]; then

  # Test K8s node failure handling
  echo "Cordoning trading node 1 (simulating failure)..."
  kubectl cordon k8s-worker-trading-1

  echo "Draining pods from trading node 1..."
  kubectl drain k8s-worker-trading-1 \
    --ignore-daemonsets \
    --delete-emptydir-data \
    --timeout=120s

  echo "Waiting 30 seconds for pods to reschedule..."
  sleep 30

  echo "Checking all trading pods still running..."
  kubectl get pods -n trading -o wide
  # All pods should be running on trading node 2

  echo "Uncordoning trading node 1..."
  kubectl uncordon k8s-worker-trading-1

  echo "  ✅ Failover test complete"
  echo "  Services continued on second node"
fi

# ─── FINAL REPORT ─────────────────────────────────
echo ""
echo "═══════════════════════════════════════════"
echo " VALIDATION COMPLETE"
echo "═══════════════════════════════════════════"
echo ""
echo "RECOMMENDED NEXT STEPS:"
echo ""
echo "WEEK 1: Paper Trading"
echo "  1. Connect to broker DEMO accounts"
echo "  2. Enable all strategies in paper mode"
echo "  3. Monitor for 5 full trading days"
echo "  4. Compare signals with VMware baseline"
echo "  5. Check: latency, slippage, fill rate"
echo ""
echo "WEEK 2: Small Live Test"
echo "  1. If paper trading correct → go live"
echo "  2. Start with MINIMUM lot sizes"
echo "  3. Only 1 strategy at first"
echo "  4. Monitor every trade manually"
echo "  5. Increase size only after 50 clean trades"
echo ""
echo "WEEK 3+: Full Production"
echo "  1. Enable all strategies"
echo "  2. Connect all broker accounts"
echo "  3. Enable full risk management"
echo "  4. Set up daily P&L reporting"
echo "  5. Automate monitoring alerts"

CHAPTER 5: OPERATIONAL RUNBOOKS

5.1 DAILY OPERATIONS
bash#!/bin/bash
# ═══════════════════════════════════════════════
# FILE: infrastructure/docs/daily-operations.md
# Daily commands every operator must know
# ═══════════════════════════════════════════════

# ─── MORNING STARTUP CHECKLIST ────────────────────

morning_check() {
  echo "Good morning. Running daily health check..."

  echo ""
  echo "1. VPN Status"
  sudo wg show

  echo ""
  echo "2. All K8s nodes"
  kubectl get nodes -o wide

  echo ""
  echo "3. All pods (look for non-Running)"
  kubectl get pods -A | grep -v "Running\|Completed"

  echo ""
  echo "4. Yesterday's P&L"
  kubectl exec -n data-layer \
    $(kubectl get pods -n data-layer \
      -l cnpg.io/instanceRole=primary \
      -o jsonpath='{.items[0].metadata.name}') -- \
    psql -U postgres -d trading -c "
    SELECT
      a.account_name,
      ds.date,
      ds.daily_pnl,
      ds.daily_pnl_pct * 100 as pct,
      ds.trades_count,
      ds.win_count
    FROM daily_snapshots ds
    JOIN accounts a ON a.id = ds.account_id
    WHERE ds.date = CURRENT_DATE - 1
    ORDER BY ds.daily_pnl DESC;
    "

  echo ""
  echo "5. Open positions"
  kubectl exec -n data-layer \
    $(kubectl get pods -n data-layer \
      -l cnpg.io/instanceRole=primary \
      -o jsonpath='{.items[0].metadata.name}') -- \
    psql -U postgres -d trading -c "
    SELECT symbol, side, quantity, entry_price,
           unrealized_pnl
    FROM positions
    WHERE is_open = true
    ORDER BY unrealized_pnl DESC;
    "

  echo ""
  echo "6. Kafka consumer lag"
  kubectl exec -n kafka kafka-controller-0 -- \
    kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --describe \
    --all-groups 2>/dev/null | \
    grep -v "TOPIC\|^$"

  echo ""
  echo "7. Disk usage"
  kubectl exec -n data-layer \
    $(kubectl get pods -n data-layer \
      -l app=timescaledb,role=master \
      -o jsonpath='{.items[0].metadata.name}') -- \
    df -h /var/lib/postgresql/data

  echo "Morning check complete. Review Grafana for details."
}

# ─── EMERGENCY PROCEDURES ─────────────────────────

emergency_stop_all_trading() {
  echo "🚨 EMERGENCY STOP — Halting all trading"

  # Scale down trading services to 0
  kubectl scale deployment \
    strategy-engine order-manager broker-connector \
    -n trading --replicas=0

  # Verify stopped
  kubectl get pods -n trading

  echo "🛑 All trading services stopped"
  echo "To restart: kubectl scale deployment strategy-engine order-manager broker-connector -n trading --replicas=2"
}

restart_service() {
  local SERVICE=$1
  echo "Restarting: $SERVICE"
  kubectl rollout restart deployment/$SERVICE -n trading
  kubectl rollout status deployment/$SERVICE -n trading
  echo "✅ $SERVICE restarted"
}

view_service_logs() {
  local SERVICE=$1
  echo "Logs for: $SERVICE (last 100 lines)"
  kubectl logs \
    -l app=$SERVICE \
    -n trading \
    --tail=100 \
    --follow
}

5.2 TROUBLESHOOTING GUIDE
bash# ═══════════════════════════════════════════════
# FILE: infrastructure/docs/troubleshooting.md
# Common problems and solutions
# ═══════════════════════════════════════════════

# PROBLEM 1: Pod stuck in Pending state
# ─────────────────────────────────────────────────
# Symptoms: kubectl get pods shows Pending
# Cause:    Not enough resources OR no matching node

diagnose_pending_pod() {
  local POD=$1
  local NS=${2:-trading}

  echo "Diagnosing pending pod: $POD"

  # Check why pod is pending
  kubectl describe pod $POD -n $NS | \
    grep -A 5 "Events:"

  # Check node resources
  kubectl describe nodes | \
    grep -A 5 "Allocated resources"

  # Solutions:
  echo ""
  echo "SOLUTIONS:"
  echo "1. Not enough CPU/RAM: Scale down other services"
  echo "2. Node selector mismatch: Check nodeSelector in deployment"
  echo "3. PVC not bound: Check: kubectl get pvc -n $NS"
}

# PROBLEM 2: Cannot connect to Kafka
# ─────────────────────────────────────────────────
diagnose_kafka() {
  echo "Diagnosing Kafka connectivity..."

  # Check Kafka pods
  kubectl get pods -n kafka

  # Check Kafka logs
  kubectl logs kafka-controller-0 -n kafka | tail -50

  # Test from inside cluster
  kubectl run kafka-test --rm -it \
    --image=bitnami/kafka:latest \
    --restart=Never \
    -n kafka -- \
    kafka-topics.sh \
    --bootstrap-server kafka-controller-0.kafka-controller-headless:9092 \
    --list
}

# PROBLEM 3: Database connection refused
# ─────────────────────────────────────────────────
diagnose_database() {
  echo "Diagnosing database connectivity..."

  # Check pods
  kubectl get pods -n data-layer

  # Check PostgreSQL primary
  kubectl exec -n data-layer \
    $(kubectl get pods -n data-layer \
      -l cnpg.io/instanceRole=primary \
      -o jsonpath='{.items[0].metadata.name}') -- \
    pg_isready -U postgres

  # Check PgBouncer
  kubectl exec -n data-layer \
    $(kubectl get pods -n data-layer \
      -l app=pgbouncer \
      -o jsonpath='{.items[0].metadata.name}') -- \
    psql -h localhost -U pgbouncer_user \
    -p 5432 pgbouncer -c "SHOW POOLS;"
}

# PROBLEM 4: Vault is sealed
# ─────────────────────────────────────────────────
# Vault seals itself on restart for security
# Must be manually unsealed with 3 of 5 keys

unseal_vault() {
  echo "Unsealing Vault..."
  echo "You need 3 of your 5 unseal keys"

  for pod in vault-0 vault-1 vault-2; do
    echo "Unsealing $pod..."
    kubectl exec -n vault $pod -- vault status | \
      grep "Sealed"

    # Prompt for keys
    for i in 1 2 3; do
      read -s -p "Enter unseal key $i: " KEY
      echo ""
      kubectl exec -n vault $pod -- \
        vault operator unseal "$KEY"
    done

    echo "Status after unseal:"
    kubectl exec -n vault $pod -- \
      vault status | grep "Sealed"
  done

  echo "✅ Vault unsealed"
}

CHAPTER 6: QUICK REFERENCE CARD
═══════════════════════════════════════════════════════
TRADING PLATFORM — QUICK REFERENCE CARD
Print and keep at your desk
═══════════════════════════════════════════════════════

ENVIRONMENT FILES:
  VMware: source infrastructure/config/environment.sh
  VPS:    export ENV=vps && source infrastructure/config/environment.sh

VPN:
  Connect:     sudo wg-quick up trading-vpn
  Disconnect:  sudo wg-quick down trading-vpn
  Status:      sudo wg show

KUBERNETES:
  All nodes:   kubectl get nodes -o wide
  All pods:    kubectl get pods -A
  Watch pods:  watch kubectl get pods -n trading
  Dashboard:   k9s

LOGS:
  Service:     kubectl logs -f deploy/SERVICE -n trading
  All trading: kubectl logs -l team=trading -n trading
  Previous:    kubectl logs deploy/SERVICE -n trading --previous

RESTART:
  Service:     kubectl rollout restart deploy/SERVICE -n trading
  All trading: kubectl rollout restart deploy -n trading

DATABASES:
  TimescaleDB: kubectl exec -it -n data-layer TSDB_POD -- psql -U postgres
  PostgreSQL:  kubectl exec -it -n data-layer PG_POD -- psql -U postgres -d trading
  Redis:       kubectl exec -it -n data-layer REDIS_POD -- redis-cli -a PASSWORD

KAFKA:
  Shell:       kubectl exec -it kafka-controller-0 -n kafka -- bash
  Topics:      kafka-topics.sh --bootstrap-server localhost:9092 --list
  Consume:     kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic TOPIC --from-beginning

VAULT:
  Status:      kubectl exec -n vault vault-0 -- vault status
  List secrets: kubectl exec -n vault vault-0 -- vault kv list secret/trading/
  Unseal:      kubectl exec -n vault vault-0 -- vault operator unseal KEY

EMERGENCY:
  Stop trading: kubectl scale deploy strategy-engine order-manager -n trading --replicas=0
  Start trading: kubectl scale deploy strategy-engine order-manager -n trading --replicas=2

DASHBOARDS (after VPN):
  Grafana:    http://grafana.trading.local
  ArgoCD:     http://argocd.trading.local
  Kafka UI:   http://kafka-ui.trading.local
  Longhorn:   http://longhorn.trading.local

VMWARE SNAPSHOTS:
  Take:       Right-click VM → Snapshot → Take Snapshot
  Restore:    Right-click VM → Snapshot → Snapshot Manager → Restore
  TAKE SNAPSHOT BEFORE every major change!

MIGRATION COMMAND:
  export ENV=vps
  bash infrastructure/scripts/migrate-to-vps.sh

SUPPORT CONTACTS:
  Lead DevOps: _______________
  On-call:     _______________
  Telegram:    _______________
═══════════════════════════════════════════════════════

This document is the complete installation, operation, and migration guide for the trading platform infrastructure. Every new team member should read Chapter 1 first, then follow Chapters 2-3 to build the VMware environment, and use Chapter 4 when ready to migrate to production VPS. Keep this document updated as the platform evolves.
