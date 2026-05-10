#!/usr/bin/env bash

set -euo pipefail

PASS=true

check_file() {

  local file="$1"

  if [ -f "$file" ]; then
    echo "PASS -> $file"
  else
    echo "FAIL -> $file"
    PASS=false
  fi
}

# =========================================================
# ADRS
# =========================================================

check_file ~/corei/docs/adr/ADR-001-kafka-source-of-truth.md
check_file ~/corei/docs/adr/ADR-002-sha256-lineage.md
check_file ~/corei/docs/adr/ADR-003-fixed-point-int64.md
check_file ~/corei/docs/adr/ADR-004-event-time-governance.md
check_file ~/corei/docs/adr/ADR-005-paper-first-activation.md

# =========================================================
# GOVERNANCE DOCS
# =========================================================

check_file ~/corei/docs/governance/repository-strategy.md
check_file ~/corei/docs/governance/branching-strategy.md
check_file ~/corei/docs/governance/versioning-policy.md
check_file ~/corei/docs/governance/environment-naming.md
check_file ~/corei/docs/governance/schema-versioning.md
check_file ~/corei/docs/governance/definition-of-done.md
check_file ~/corei/docs/governance/pr-review-policy.md

# =========================================================
# STANDARDS
# =========================================================

check_file ~/corei/docs/standards/coding-standards.md
check_file ~/corei/docs/standards/commit-standards.md
check_file ~/corei/docs/standards/naming-standards.md

# =========================================================
# MASTER STANDARDS INDEX
# =========================================================

check_file ~/corei/docs/architecture/standards.md

# =========================================================
# FINAL RESULT
# =========================================================

if [ "$PASS" = true ]; then

  echo "======================================="
  echo "STAGE 0 VALIDATION: PASS"
  echo "======================================="

  exit 0

else

  echo "======================================="
  echo "STAGE 0 VALIDATION: FAIL"
  echo "======================================="

  exit 1

fi
