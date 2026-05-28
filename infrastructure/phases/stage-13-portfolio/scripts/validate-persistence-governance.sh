#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Validating portfolio persistence governance..."

MIGRATIONS=(
  "001_positions.sql"
  "002_portfolio_snapshots.sql"
  "003_pnl_ledger.sql"
  "004_capital_allocations.sql"
  "005_reconciliation_log.sql"
)

for migration in "${MIGRATIONS[@]}"; do
  if [[ ! -f "infrastructure/persistence/portfolio/postgresql/migrations/$migration" ]]; then
    echo "[FAIL] Missing migration: $migration"
    exit 1
  fi

  echo "[PASS] Migration exists: $migration"
done

echo "[Stage-13] Portfolio persistence governance validation PASSED"

exit 0
