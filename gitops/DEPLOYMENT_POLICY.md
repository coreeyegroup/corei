# INSTITUTIONAL DEPLOYMENT POLICY

## AUTHORITATIVE RULES

1. Git is authoritative.
2. Kubernetes runtime state must match Git state.
3. ArgoCD performs reconciliation.
4. Harbor is authoritative artifact registry.
5. No direct kubectl apply during standard operations.
6. Rollbacks occur through Git revert.
7. Environments are isolated.
8. All deployments must be reproducible.

## DEPLOYMENT FLOW

Git Commit
→ CI Pipeline
→ Image Build
→ Harbor Push
→ GitOps Update
→ ArgoCD Sync
→ Kubernetes Reconciliation

## OPERATIONAL GOVERNANCE

- deterministic deployment only
- no manual drift
- no mutable infrastructure
- full rollback capability mandatory
