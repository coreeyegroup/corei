# CORE SYSTEM — CERTIFICATE RECOVERY RUNBOOK

## PURPOSE

Recovery procedure for:
- SAN mismatch
- expired certificates
- kubeadm certificate drift
- API TLS failures

---

# SECTION 01 — VALIDATION

## STEP-01 — CHECK EXPIRATION

COMMAND:

    sudo kubeadm certs check-expiration

---

## STEP-02 — VERIFY SANs

COMMAND:

    openssl x509 -in /etc/kubernetes/pki/apiserver.crt \
    -text -noout | grep -A1 "Subject Alternative Name"

---

# SECTION 02 — RENEWAL

## STEP-03 — RENEW CERTIFICATES

COMMAND:

    sudo kubeadm certs renew all

---

## STEP-04 — RESTART KUBELET

COMMAND:

    sudo systemctl restart kubelet

---

# SECTION 03 — SAN REGENERATION

## STEP-05 — BACKUP CERTS

COMMAND:

    sudo mv /etc/kubernetes/pki/apiserver.crt \
    /etc/kubernetes/pki/apiserver.crt.bak

    sudo mv /etc/kubernetes/pki/apiserver.key \
    /etc/kubernetes/pki/apiserver.key.bak

---

## STEP-06 — REGENERATE APISERVER CERT

COMMAND:

    sudo kubeadm init phase certs apiserver \
    --apiserver-advertise-address <STATIC_IP>

---

## STEP-07 — RESTART KUBELET

COMMAND:

    sudo systemctl restart kubelet

---

# SUCCESS CRITERIA

- API reachable
- kubectl healthy
- SANs valid
