# ============================================================
# ============================================================

$ErrorActionPreference = "Stop"

$VmwareRoot = "D:\VMware"
$VmRoot = "D:\VMs"
$VmName = "core-node"

$Root = "$HOME\corei-infrastructure"

$IsoDir = "$VmwareRoot\iso"
$VmDir = "$VmRoot\$VmName"
$CloudInitDir = "$Root\host\cloud-init"

New-Item -ItemType Directory -Force -Path $IsoDir | Out-Null
New-Item -ItemType Directory -Force -Path $VmDir | Out-Null

# ------------------------------------------------------------
# Ubuntu ISO
# ------------------------------------------------------------

$UbuntuIso = "$IsoDir\ubuntu-22.04-live-server-amd64.iso"

if (!(Test-Path $UbuntuIso)) {

    Invoke-WebRequest `
      -Uri "https://releases.ubuntu.com/22.04/ubuntu-22.04-live-server-amd64.iso" `
      -OutFile $UbuntuIso
}

# ------------------------------------------------------------
# VMX Creation
# ------------------------------------------------------------

$VmxFile = "$VmDir\core-node.vmx"

@"
.encoding = "UTF-8"
config.version = "8"
virtualHW.version = "20"
displayName = "core-node"
guestOS = "ubuntu-64"
memsize = "8192"
numvcpus = "4"
ethernet0.present = "TRUE"
ethernet0.connectionType = "bridged"
"@ | Set-Content $VmxFile

# ------------------------------------------------------------
# VM Disk Creation
# ------------------------------------------------------------

$DiskPath = "$VmDir\core-node.vmdk"

& "C:\Program Files (x86)\VMware\VMware Workstation\vmware-vdiskmanager.exe" `
  -c `
  -s 80GB `
  -a lsilogic `
  -t 0 `
  $DiskPath

# ------------------------------------------------------------
# VM Start
# ------------------------------------------------------------

& "C:\Program Files (x86)\VMware\VMware Workstation\vmrun.exe" `
  start `
  $VmxFile

Write-Host "==========================================="
Write-Host "VM creation complete"
Write-Host "==========================================="
