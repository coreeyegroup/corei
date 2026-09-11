# CORE SYSTEM — ETCD RECOVERY RUNBOOK

## PURPOSE

Recovery procedure for etcd failures.

---

# SECTION 01 — VALIDATION

## STEP-01 — VERIFY ETCD

COMMAND:

    sudo crictl ps -a | grep etcd

---

## STEP-02 — ETCD LOGS

COMMAND:

    sudo crictl logs <etcd-container-id>

---

## STEP-03 — HEALTH CHECK

COMMAND:

    sudo ETCDCTL_API=3 etcdctl \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    --endpoints=https://127.0.0.1:2379 \
    endpoint health

---

# SECTION 02 — SNAPSHOT

## STEP-04 — CREATE SNAPSHOT

COMMAND:

    sudo ETCDCTL_API=3 etcdctl \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    --endpoints=https://127.0.0.1:2379 \
    snapshot save /var/backups/etcd/etcd-snapshot.db

---

# SECTION 03 — RESTORE

## STEP-05 — STOP KUBELET

COMMAND:

    sudo systemctl stop kubelet

---

## STEP-06 — BACKUP OLD DATA

COMMAND:

    sudo mv /var/lib/etcd /var/lib/etcd.bak

---

## STEP-07 — RESTORE SNAPSHOT

COMMAND:

    sudo ETCDCTL_API=3 etcdctl snapshot restore \
    /var/backups/etcd/etcd-snapshot.db \
    --data-dir=/var/lib/etcd

---

## STEP-08 — START KUBELET

COMMAND:

    sudo systemctl start kubelet

---

# SUCCESS CRITERIA

- etcd healthy
- API healthy
- cluster restored
