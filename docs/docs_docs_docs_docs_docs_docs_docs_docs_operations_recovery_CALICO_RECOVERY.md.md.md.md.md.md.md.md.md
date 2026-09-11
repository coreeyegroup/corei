# CORE SYSTEM — CALICO RECOVERY RUNBOOK

## PURPOSE

Recovery procedure for:
- Calico failure
- CNI deadlock
- ClusterInformation timeout
- pod sandbox failure
- networking collapse

---

# SECTION 01 — VALIDATION

## STEP-01 — VERIFY CONTROL PLANE

COMMAND:

    curl -k https://127.0.0.1:6443/version
    kubectl get nodes

---

## STEP-02 — VERIFY CALICO RESOURCES

COMMAND:

    kubectl get daemonset -n kube-system
    kubectl get deployment -n kube-system

---

## STEP-03 — VERIFY CALICO PODS

COMMAND:

    kubectl get pods -n kube-system -o wide

---

# SECTION 02 — LOG INSPECTION

## STEP-04 — CALICO LOGS

COMMAND:

    kubectl logs -n kube-system \
    -l k8s-app=calico-node --tail=100

---

## STEP-05 — EVENTS

COMMAND:

    kubectl get events -A --sort-by=.lastTimestamp

---

# SECTION 03 — RECOVERY

## STEP-06 — RESTART CONTAINERD

COMMAND:

    sudo systemctl restart containerd

---

## STEP-07 — RESTART KUBELET

COMMAND:

    sudo systemctl restart kubelet

---

## STEP-08 — VERIFY RECOVERY

COMMAND:

    watch kubectl get pods -n kube-system

EXPECTED:
- calico-node Running
- coredns Running
- kube-proxy Running

---

# SECTION 04 — EMERGENCY CLEANUP

## STEP-09 — LIST SANDBOXES

COMMAND:

    sudo crictl pods

---

## STEP-10 — STOP SANDBOXES

COMMAND:

    sudo crictl stopp $(sudo crictl pods -q)

---

## STEP-11 — REMOVE SANDBOXES

COMMAND:

    sudo crictl rmp $(sudo crictl pods -q)

---

## STEP-12 — RESTART SERVICES

COMMAND:

    sudo systemctl restart containerd
    sudo systemctl restart kubelet

---

# SUCCESS CRITERIA

- Calico healthy
- CoreDNS healthy
- networking restored
