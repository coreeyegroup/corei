# CORE SYSTEM — NETWORK RECOVERY RUNBOOK

## PURPOSE

Recovery procedure for:
- DHCP drift
- routing failure
- node connectivity loss
- static IP recovery

---

# SECTION 01 — VALIDATION

## STEP-01 — VERIFY IP

COMMAND:

    hostname -I
    ip addr

---

## STEP-02 — VERIFY ROUTING

COMMAND:

    ip route

---

## STEP-03 — VERIFY DNS

COMMAND:

    cat /etc/resolv.conf

---

# SECTION 02 — NETPLAN

## STEP-04 — VERIFY CONFIG

COMMAND:

    ls /etc/netplan
    cat /etc/netplan/50-cloud-init.yaml

---

## STEP-05 — SAFE TEST

COMMAND:

    sudo netplan try

---

## STEP-06 — APPLY

COMMAND:

    sudo netplan apply

---

# SECTION 03 — KUBELET

## STEP-07 — VERIFY NODE-IP OVERRIDE

COMMAND:

    cat /etc/systemd/system/kubelet.service.d/20-node-ip.conf

---

## STEP-08 — RESTART SERVICES

COMMAND:

    sudo systemctl restart containerd
    sudo systemctl restart kubelet

---

# SUCCESS CRITERIA

- static IP stable
- kubelet healthy
- API reachable
