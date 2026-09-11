$ErrorActionPreference = "Stop"

Write-Host "==========================================="
Write-Host "Stage 0A validation"
Write-Host "==========================================="

# ------------------------------------------------------------
# VMWARE VALIDATION
# ------------------------------------------------------------

$vmwareCandidates = @(
    "D:\\VMware",
    "C:\\Program Files\\VMware",
    "C:\\Program Files (x86)\\VMware"
)

$vmwareFound = $false

foreach ($candidate in $vmwareCandidates) {

    if (Test-Path $candidate) {

        $vmwareExe = Get-ChildItem `
            -Path $candidate `
            -Filter "vmware.exe" `
            -Recurse `
            -ErrorAction SilentlyContinue `
            | Select-Object -First 1

        $vmrunExe = Get-ChildItem `
            -Path $candidate `
            -Filter "vmrun.exe" `
            -Recurse `
            -ErrorAction SilentlyContinue `
            | Select-Object -First 1

        if ($vmwareExe -or $vmrunExe) {

            $vmwareFound = $true

            Write-Host "PASS -> VMware installed"

            if ($vmwareExe) {

                Write-Host "INFO -> vmware.exe found:"
                Write-Host $vmwareExe.FullName
            }

            if ($vmrunExe) {

                Write-Host "INFO -> vmrun.exe found:"
                Write-Host $vmrunExe.FullName
            }

            break
        }
    }
}

if (-not $vmwareFound) {

    Write-Host "FAIL -> VMware"

    exit 1
}

# ------------------------------------------------------------
# GIT VALIDATION
# ------------------------------------------------------------

if (Get-Command git -ErrorAction SilentlyContinue) {

    Write-Host "PASS -> Git"

} else {

    Write-Host "FAIL -> Git"

    exit 1
}

# ------------------------------------------------------------
# PYTHON VALIDATION
# ------------------------------------------------------------

if (Get-Command python -ErrorAction SilentlyContinue) {

    Write-Host "PASS -> Python"

} else {

    Write-Host "FAIL -> Python"

    exit 1
}

# ------------------------------------------------------------
# TERRAFORM VALIDATION
# ------------------------------------------------------------

if (Get-Command terraform -ErrorAction SilentlyContinue) {

    Write-Host "PASS -> Terraform"

} else {

    Write-Host "FAIL -> Terraform"

    exit 1
}

# ------------------------------------------------------------
# kubectl VALIDATION
# ------------------------------------------------------------

$kubectlPath = "D:\\VMware\\tools\\kubectl\\kubectl.exe"

if (Test-Path $kubectlPath) {

    Write-Host "PASS -> kubectl"

} else {

    Write-Host "FAIL -> kubectl"

    exit 1
}

# ------------------------------------------------------------
# HELM VALIDATION
# ------------------------------------------------------------

$helmPath = "D:\\VMware\\tools\\helm\\helm.exe"

if (Test-Path $helmPath) {

    Write-Host "PASS -> helm"

} else {

    Write-Host "FAIL -> helm"

    exit 1
}

# ------------------------------------------------------------
# FINAL OUTPUT
# ------------------------------------------------------------

Write-Host "==========================================="
Write-Host "Stage 0A validation complete"
Write-Host "==========================================="
