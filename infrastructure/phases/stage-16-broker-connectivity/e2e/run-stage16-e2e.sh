#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — END-TO-END EXECUTION VALIDATION"
echo "=================================================="

bash infrastructure/phases/stage-16-broker-connectivity/e2e/validate-services.sh

bash infrastructure/phases/stage-16-broker-connectivity/e2e/validate-lineage.sh

bash infrastructure/phases/stage-16-broker-connectivity/e2e/validate-reconciliation-flow.sh

bash infrastructure/phases/stage-16-broker-connectivity/e2e/validate-copy-trade-flow.sh

bash infrastructure/phases/stage-16-broker-connectivity/e2e/validate-execution-flow.sh

echo
echo "=================================================="
echo "STAGE-16 END-TO-END VALIDATION PASSED"
echo "=================================================="
