#!/bin/bash

echo "[Stage-14A] Institutional Runtime Inventory"

echo ""
echo "=== PHASE LIFECYCLE ==="

find infrastructure/phases/stage-14a-operational-reconciliation \
-maxdepth 2 -type f | sort

echo ""
echo "=== EVENT TOPOLOGY ==="

find runtime/stage-14/events \
-maxdepth 2 -type d | sort

echo ""
echo "=== RUNTIME LOGS ==="

find runtime/stage-14/logs \
-type f | sort

echo ""
echo "=== GOVERNANCE DOCUMENTS ==="

find docs/governance \
-type f | grep "trading-" | sort
