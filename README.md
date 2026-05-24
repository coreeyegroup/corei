# CORE PLATFORM GITOPS REPOSITORY

Institutional GitOps deployment governance repository for the CORE trading platform infrastructure.

## PURPOSE

This repository is the authoritative deployment state source for:

- Kubernetes infrastructure
- platform services
- observability stack
- storage systems
- CI/CD systems
- application deployment orchestration

## GOVERNANCE MODEL

All platform deployments follow:

Git Commit
→ CI Validation
→ Harbor Artifact Push
→ GitOps Manifest Update
→ ArgoCD Reconciliation
→ Kubernetes Deployment

## OPERATIONAL RULES

- No direct kubectl apply in normal operations
- No runtime drift allowed
- Git is authoritative
- ArgoCD performs reconciliation
- Rollbacks occur through Git revert workflows

## ENVIRONMENTS

- dev
- staging
- production

## DEPLOYMENT MODEL

App-of-Apps institutional GitOps architecture.

## RECOVERY

Disaster recovery assets located under:

operations/
scripts/recovery/
