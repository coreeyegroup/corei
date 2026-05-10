# ============================================================
# STAGE 0A — INSTALL HOST TOOLS
# ============================================================

$ErrorActionPreference = "Stop"

winget install Git.Git -e --silent
winget install Python.Python.3.11 -e --silent
winget install Hashicorp.Terraform -e --silent

# ------------------------------------------------------------
# kubectl
# ------------------------------------------------------------

$kubectlDir = "D:\VMware\tools\kubectl"
New-Item -ItemType Directory -Force -Path $kubectlDir | Out-Null

Invoke-WebRequest `
  -Uri "https://dl.k8s.io/release/v1.29.4/bin/windows/amd64/kubectl.exe" `
  -OutFile "$kubectlDir\kubectl.exe"

# ------------------------------------------------------------
# helm
# ------------------------------------------------------------

$helmZip = "$env:TEMP\helm.zip"
$helmDir = "D:\VMware\tools\helm"

New-Item -ItemType Directory -Force -Path $helmDir | Out-Null

Invoke-WebRequest `
  -Uri "https://get.helm.sh/helm-v3.20.1-windows-amd64.zip" `
  -OutFile $helmZip

Expand-Archive $helmZip -DestinationPath "$env:TEMP\helm"

Copy-Item `
  "$env:TEMP\helm\windows-amd64\helm.exe" `
  "$helmDir\helm.exe" `
  -Force

Write-Host "==========================================="
Write-Host "Host tooling installation complete"
Write-Host "==========================================="
