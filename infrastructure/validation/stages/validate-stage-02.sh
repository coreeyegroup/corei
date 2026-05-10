#!/bin/bash

set -e

ROOT="$HOME/corei"

echo ""
echo "=========================================="
echo "STAGE 02 VALIDATION"
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

validate "$ROOT/infrastructure/phases/stage-02-cluster-foundation"

validate "$ROOT/infrastructure/phases/stage-02-cluster-foundation/manifest.yaml"

validate "$ROOT/infrastructure/phases/stage-02-cluster-foundation/checkpoints"

validate "$ROOT/infrastructure/phases/stage-02-cluster-foundation/runtime"

validate "$ROOT/infrastructure/orchestrator"

validate "$ROOT/infrastructure/governance/install"

validate "$ROOT/infrastructure/recovery"

validate "$ROOT/infrastructure/state/install"

validate "$ROOT/infrastructure/phases/_shared"

validate "$ROOT/infrastructure/locks"

validate "$ROOT/infrastructure/components/_standards"

validate "$ROOT/docs/recovery"

echo ""
echo "=========================================="
echo "STATUS: PASS"
echo "=========================================="
