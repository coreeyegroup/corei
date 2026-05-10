#!/usr/bin/env bash

PASS=true

check() {
    local name="$1"
    local command="$2"

    if eval "$command" >/dev/null 2>&1; then
        echo "PASS -> $name"
    else
        echo "FAIL -> $name"
        PASS=false
    fi
}

echo "========================================="
echo "Stage 01 Validation"
echo "========================================="

check "hostname=core-node" "[ \"$(hostname)\" = \"core-node\" ]"

check "swap disabled" "[ -z \"$(swapon --show)\" ]"

check "ip_forward=1" "sysctl net.ipv4.ip_forward | grep '= 1'"

check "vm.swappiness=0" "sysctl vm.swappiness | grep '= 0'"

check "chrony active" "systemctl is-active chrony"

check "overlay module" "lsmod | grep overlay"

check "br_netfilter module" "lsmod | grep br_netfilter"

check "docker installed" "docker --version"

check "containerd installed" "containerd --version"

check "python3.11 installed" "python3.11 --version"

check "ufw active" "sudo ufw status | grep 'Status: active'"

echo "========================================="

if [ "$PASS" = true ]; then
    echo "STAGE 01 VALIDATION: PASS"
    exit 0
else
    echo "STAGE 01 VALIDATION: FAIL"
    exit 1
fi
