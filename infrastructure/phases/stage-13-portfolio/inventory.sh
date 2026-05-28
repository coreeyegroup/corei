#!/usr/bin/env bash
set -euo pipefail

OUTPUT="infrastructure/freeze/stage-13/inventory/stage13-inventory.txt"

mkdir -p infrastructure/freeze/stage-13/inventory

{
  echo "STAGE-13 AUTHORITATIVE INVENTORY"
  echo "================================"
  echo

  echo "=== PHASE LIFECYCLE ==="
  find infrastructure/phases/stage-13-portfolio -type f | sort

  echo
  echo "=== REPLAY GOVERNANCE ==="
  find infrastructure/replay/portfolio -type f | sort

  echo
  echo "=== AUDIT GOVERNANCE ==="
  find infrastructure/audit/portfolio -type f | sort

  echo
  echo "=== PORTFOLIO PERSISTENCE ==="
  find infrastructure/persistence/portfolio -type f | sort

  echo
  echo "=== SERVICES ==="
  find services -maxdepth 1 -type d | sort

  echo
  echo "=== PORTFOLIO KUBERNETES TOPOLOGY ==="
  find kubernetes/portfolio | sort

} > "$OUTPUT"

echo "[Stage-13] Inventory certification generated"
echo "$OUTPUT"
