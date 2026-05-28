#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Replay certification lifecycle initialized"

bash infrastructure/phases/stage-13-portfolio/scripts/validate-replay-hash.sh

echo "[Stage-13] Replay certification PASSED"

exit 0
