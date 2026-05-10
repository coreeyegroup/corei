$ErrorActionPreference = "Stop"

Write-Host "==========================================="
Write-Host "Stage 0A Windows prerequisite validation"
Write-Host "==========================================="

$systemInfo = systeminfo

if ($systemInfo -match "Virtualization Enabled In Firmware: Yes") {
    Write-Host "PASS -> Virtualization enabled"
} else {
    Write-Host "FAIL -> Enable virtualization in BIOS"
    exit 1
}

$ramGB = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB)

if ($ramGB -ge 12) {
    Write-Host "PASS -> RAM >= 12GB"
} else {
    Write-Host "FAIL -> Minimum RAM 12GB required"
    exit 1
}

$diskFree = [math]::Round((Get-PSDrive D).Free / 1GB)

if ($diskFree -ge 100) {
    Write-Host "PASS -> Disk >= 100GB free"
} else {
    Write-Host "FAIL -> Minimum 100GB free required"
    exit 1
}

$vmwarePath = "C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmware.exe"

if (Test-Path $vmwarePath) {
    Write-Host "PASS -> VMware installed"
} else {
    Write-Host "FAIL -> VMware Workstation missing"
    exit 1
}

if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Git installed"
} else {
    Write-Host "FAIL -> Git missing"
    exit 1
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Python installed"
} else {
    Write-Host "FAIL -> Python missing"
    exit 1
}

Write-Host "==========================================="
Write-Host "Stage 0A prerequisite validation complete"
Write-Host "==========================================="
