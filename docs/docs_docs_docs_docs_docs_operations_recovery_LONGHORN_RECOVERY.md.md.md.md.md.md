# CORE SYSTEM — LONGHORN RECOVERY RUNBOOK

## PURPOSE

Recovery procedure for:
- PVC failures
- detached volumes
- faulted volumes
- CSI deadlock

---

# SECTION 01 — VALIDATION

## STEP-01 — VERIFY LONGHORN PODS

COMMAND:

    kubectl get pods -n longhorn-system

---

## STEP-02 — VERIFY VOLUMES

COMMAND:

    kubectl get volumes.longhorn.io -n longhorn-system

---

# SECTION 02 — RECOVERY

## STEP-03 — RESTART LONGHORN

COMMAND:

    kubectl rollout restart deployment \
    -n longhorn-system longhorn-driver-deployer

---

## STEP-04 — RESTART KUBELET

COMMAND:

    sudo systemctl restart kubelet

---

## STEP-05 — VERIFY CSI

COMMAND:

    kubectl get pods -n longhorn-system

EXPECTED:
- longhorn-manager healthy
- csi healthy
- instance-manager healthy

---

# SECTION 03 — SINGLE NODE REPLICA POLICY

## STEP-06 — REDUCE REPLICAS

COMMAND:

    kubectl patch volume.longhorn.io \
    -n longhorn-system <volume-name> \
    --type merge \
    -p '{"spec":{"numberOfReplicas":1}}'

---

# SUCCESS CRITERIA

- volumes attached
- PVC healthy
- StatefulSets healthy
