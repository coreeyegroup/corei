# ============================================================
# STAGE 0A — WINDOWS HOST VALIDATION
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host "==========================================="
Write-Host "Stage 0A Windows prerequisite validation"
Write-Host "==========================================="

# ------------------------------------------------------------
# CPU Virtualization
# ------------------------------------------------------------

$systemInfo = systeminfo

if ($systemInfo -match "Virtualization Enabled In Firmware: Yes") {
    Write-Host "PASS -> Virtualization enabled"
} else {
    Write-Host "FAIL -> Enable virtualization in BIOS"
    exit 1
}

# ------------------------------------------------------------
# RAM Check
# ------------------------------------------------------------

$ramGB = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB)

if ($ramGB -ge 12) {
    Write-Host "PASS -> RAM >= 12GB"
} else {
    Write-Host "FAIL -> Minimum RAM 12GB required"
    exit 1
}

# ------------------------------------------------------------
# Disk Check
# ------------------------------------------------------------

$diskFree = [math]::Round((Get-PSDrive C).Free / 1GB)

if ($diskFree -ge 100) {
    Write-Host "PASS -> Disk >= 100GB free"
} else {
    Write-Host "FAIL -> Minimum 100GB free required"
    exit 1
}

# ------------------------------------------------------------
# VMware Check
# ------------------------------------------------------------

$vmwarePath = "C:\Program Files (x86)\VMware\VMware Workstation\vmware.exe"

if (Test-Path $vmwarePath) {
    Write-Host "PASS -> VMware installed"
} else {
    Write-Host "FAIL -> VMware Workstation missing"
    exit 1
}

# ------------------------------------------------------------
# Git Check
# ------------------------------------------------------------

if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Git installed"
} else {
    Write-Host "FAIL -> Git missing"
    exit 1
}

# ------------------------------------------------------------
# Python Check
# ------------------------------------------------------------

if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Python installed"
} else {
    Write-Host "FAIL -> Python missing"
Write-Host "==========================================="
