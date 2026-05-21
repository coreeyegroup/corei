#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: GIT REPOSITORY GOVERNANCE"
echo "=================================================="

: "${GITOPS_REPOSITORY_URL:?GITOPS_REPOSITORY_URL not set}"

echo ""
echo "[STEP-1] Preparing SSH private key..."

SSH_PRIVATE_KEY=$(sed 's/^/    /' secrets/gitops/argocd-repo-key)

echo ""
echo "[STEP-2] Rendering repository secret..."

cat > /tmp/argocd-repository-secret.yaml <<EOF2
apiVersion: v1
kind: Secret
metadata:
  name: core-system-repository
  namespace: cicd
  labels:
    argocd.argoproj.io/secret-type: repository

type: Opaque

stringData:
  type: git
  url: ${GITOPS_REPOSITORY_URL}
  sshPrivateKey: |
${SSH_PRIVATE_KEY}
EOF2

echo ""
echo "[STEP-3] Applying repository governance..."

kubectl apply -f /tmp/argocd-repository-secret.yaml

echo ""
echo "[STEP-4] Removing temporary rendered secret..."

rm -f /tmp/argocd-repository-secret.yaml

echo ""
echo "[COMPLETE] Git repository governance configured successfully."
