#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

HALT_DIR="${BASE}/runtime/kill-switch"

echo "======================================================"
echo "RUNTIME FLOW RESUMPTION"
echo "======================================================"

cat > "${HALT_DIR}/${SESSION_ID}.resume-event.json" <<INNER_EOF
{
  "action": "RESUME_ALL",
  "runtime_origin": "kill-switch-stream",
  "resume_time": "$(date --iso-8601=seconds)"
}
INNER_EOF

echo "[PASS] Runtime execution flow resumed"
