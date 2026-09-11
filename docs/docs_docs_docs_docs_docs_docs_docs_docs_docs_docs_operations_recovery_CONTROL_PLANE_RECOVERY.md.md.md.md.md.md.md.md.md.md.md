# CORE SYSTEM — CONTROL PLANE RECOVERY RUNBOOK

## PURPOSE

Deterministic recovery procedure for:
- kube-apiserver failure
- kubelet failure
- etcd bind failure
- static pod failure
- control-plane reboot failure
- API unreachability

---

# SECTION 01 — INITIAL TRIAGE

## STEP-01 — VERIFY NODE NETWORK

COMMAND:

    hostname -I
    ip addr

EXPECTED:
- correct static IP
- correct interface
- no DHCP drift

---

## STEP-02 — VERIFY KUBELET

COMMAND:

    sudo systemctl status kubelet
    sudo journalctl -u kubelet -n 200

---

## STEP-03 — VERIFY CONTAINERD

COMMAND:

    sudo systemctl status containerd
    sudo journalctl -u containerd -n 200

---

## STEP-04 — VERIFY LOCAL APISERVER

COMMAND:

    curl -k https://127.0.0.1:6443/version

EXPECTED:
- Kubernetes version JSON

---

# SECTION 02 — STATIC POD VALIDATION

## STEP-05 — VERIFY MANIFESTS

COMMAND:

    ls /etc/kubernetes/manifests

EXPECTED:
- etcd.yaml
- kube-apiserver.yaml
- kube-controller-manager.yaml
- kube-scheduler.yaml

---

## STEP-06 — VERIFY STATIC POD CONTAINERS

COMMAND:

    sudo crictl ps -a

---

## STEP-07 — INSPECT FAILED CONTAINERS

COMMAND:

    sudo crictl logs <container-id>

---

# SECTION 03 — NODE IDENTITY VALIDATION

## STEP-08 — VERIFY CLUSTER ENDPOINT

COMMAND:

    grep server ~/.kube/config
    sudo grep -R "192.168." /etc/kubernetes

EXPECTED:
- only current static IP

---

## STEP-09 — VERIFY CERTIFICATE SANs

COMMAND:

    openssl x509 -in /etc/kubernetes/pki/apiserver.crt \
    -text -noout | grep -A1 "Subject Alternative Name"

---

# SECTION 04 — RECOVERY

## STEP-10 — RESTART CONTAINERD

COMMAND:

    sudo systemctl restart containerd

---

## STEP-11 — RESTART KUBELET

COMMAND:

    sudo systemctl restart kubelet

---

## STEP-12 — VERIFY API

COMMAND:

    curl -k https://127.0.0.1:6443/version

---

## STEP-13 — VERIFY CLUSTER

COMMAND:

    kubectl get nodes
    kubectl get pods -A

---

# SECTION 05 — CERTIFICATE RECOVERY

## STEP-14 — BACKUP APISERVER CERTS

COMMAND:

    sudo mv /etc/kubernetes/pki/apiserver.crt \
    /etc/kubernetes/pki/apiserver.crt.bak

    sudo mv /etc/kubernetes/pki/apiserver.key \
    /etc/kubernetes/pki/apiserver.key.bak

---

## STEP-15 — REGENERATE CERTS

COMMAND:

    sudo kubeadm init phase certs apiserver \
    --apiserver-advertise-address <STATIC_IP>

---

## STEP-16 — RESTART KUBELET

COMMAND:

    sudo systemctl restart kubelet

---

# SUCCESS CRITERIA

- kube-apiserver reachable
- etcd healthy
- node Ready
- kube-system stable
