#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Freeze certification initialized"

bash infrastructure/phases/stage-13-portfolio/validate.sh

bash infrastructure/phases/stage-13-portfolio/scripts/certify-replay.sh

echo "[Stage-13] Freeze certification PASSED"

exit 0
