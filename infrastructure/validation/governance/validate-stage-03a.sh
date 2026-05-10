#!/bin/bash

set -e

ROOT="$HOME/corei"

echo ""
echo "=========================================="
echo "STAGE 3A VALIDATION"
echo "=========================================="
echo ""

validate() {

  if [ -e "$1" ]; then
    echo "PASS → $1"
  else
    echo "FAIL → $1"
    exit 1
  fi
}

validate "$ROOT/platform/policy-runtime"
validate "$ROOT/platform/system-state"
validate "$ROOT/platform/mode-governance"
validate "$ROOT/platform/config-control"
validate "$ROOT/platform/determinism"
validate "$ROOT/platform/security"

validate "$ROOT/infrastructure/components/vault"
validate "$ROOT/infrastructure/components/keycloak"
validate "$ROOT/infrastructure/components/istio"

validate "$ROOT/services/platform/config-service"
validate "$ROOT/services/platform/config-snapshot-service"
validate "$ROOT/services/platform/audit-service"

validate "$ROOT/platform-manifest.yaml"

validate "$ROOT/environments/development"
validate "$ROOT/environments/staging"
validate "$ROOT/environments/production"
validate "$ROOT/environments/disaster-recovery"

validate "$ROOT/docs/governance/policy-governance.md"
validate "$ROOT/docs/governance/mode-governance.md"
validate "$ROOT/docs/governance/runtime-authority.md"
validate "$ROOT/docs/governance/security-authority.md"
validate "$ROOT/docs/governance/config-governance.md"
validate "$ROOT/docs/governance/system-state-governance.md"

validate "$ROOT/docs/governance/platform-manifest-governance.md"
validate "$ROOT/docs/governance/environment-runtime-governance.md"

echo ""
echo "=========================================="
echo "STATUS: PASS"
