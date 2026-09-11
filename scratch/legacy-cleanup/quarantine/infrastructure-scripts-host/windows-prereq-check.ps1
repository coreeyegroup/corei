$ErrorActionPreference = "Stop"

Write-Host "==========================================="
Write-Host "Stage 0A Windows prerequisite validation"
Write-Host "==========================================="

# ------------------------------------------------------------
# SYSTEM INFO
# ------------------------------------------------------------

$systemInfo = systeminfo

# ------------------------------------------------------------
# VIRTUALIZATION VALIDATION
# ------------------------------------------------------------

if (
    $systemInfo -match "Virtualization Enabled In Firmware: Yes" `
    -or `
    $systemInfo -match "A hypervisor has been detected"
) {

    Write-Host "PASS -> Virtualization enabled"

} else {

    Write-Host "FAIL -> Enable virtualization in BIOS"

    exit 1
}

# ------------------------------------------------------------
# RAM VALIDATION
# ------------------------------------------------------------

$ramGB = [math]::Round(
    (Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB
)

if ($ramGB -ge 12) {

    Write-Host "PASS -> RAM >= 12GB"

} else {

    Write-Host "FAIL -> Minimum RAM 12GB required"

    exit 1
}

# ------------------------------------------------------------
# DISK VALIDATION
# ------------------------------------------------------------

$diskFree = [math]::Round((Get-PSDrive D).Free / 1GB)

if ($diskFree -ge 100) {

    Write-Host "PASS -> Disk >= 100GB free"

} else {

    Write-Host "FAIL -> Minimum 100GB free required"

    exit 1
}

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

    Write-Host "FAIL -> VMware Workstation missing"

    exit 1
}

# ------------------------------------------------------------
# GIT VALIDATION
# ------------------------------------------------------------

if (Get-Command git -ErrorAction SilentlyContinue) {

    Write-Host "PASS -> Git installed"

} else {

    Write-Host "FAIL -> Git missing"

    exit 1
}

# ------------------------------------------------------------
# PYTHON VALIDATION
# ------------------------------------------------------------

if (Get-Command python -ErrorAction SilentlyContinue) {

    Write-Host "PASS -> Python installed"

} else {

    Write-Host "FAIL -> Python missing"

    exit 1
}

# ------------------------------------------------------------
# FINAL OUTPUT
# ------------------------------------------------------------

Write-Host "==========================================="
Write-Host "Stage 0A prerequisite validation complete"
Write-Host "==========================================="
