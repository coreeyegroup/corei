$ErrorActionPreference = "Stop"

Write-Host "==========================================="
Write-Host "Stage 0A validation"
Write-Host "==========================================="

if (Test-Path "C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmware.exe") {
    Write-Host "PASS -> VMware"
} else {
    Write-Host "FAIL -> VMware"
    exit 1
}

if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Git"
} else {
    Write-Host "FAIL -> Git"
    exit 1
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Python"
} else {
    Write-Host "FAIL -> Python"
    exit 1
}

if (Get-Command terraform -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> Terraform"
} else {
    Write-Host "FAIL -> Terraform"
    exit 1
}

if (Get-Command kubectl -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> kubectl"
} else {
    Write-Host "FAIL -> kubectl"
    exit 1
}

if (Get-Command helm -ErrorAction SilentlyContinue) {
    Write-Host "PASS -> helm"
} else {
    Write-Host "FAIL -> helm"
    exit 1
}

Write-Host "==========================================="
Write-Host "Stage 0A validation complete"
Write-Host "==========================================="
