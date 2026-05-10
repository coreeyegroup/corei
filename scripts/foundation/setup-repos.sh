#!/usr/bin/env bash

set -euo pipefail

ORG="corei-org"
ROOT="$HOME/corei"
REPO_ROOT="$ROOT/repos"

echo "========== STAGE 2: REPOSITORY FOUNDATION =========="

# ===============================
# ENSURE GH → GIT AUTH
# ===============================
echo "[AUTH] Configuring GitHub CLI for git"
gh auth setup-git >/dev/null 2>&1 || true

# ===============================
# INIT
# ===============================
mkdir -p "$REPO_ROOT"
cd "$REPO_ROOT"

CLONE_STATUS="OK"
PUSH_STATUS="OK"
UPSTREAM_STATUS="OK"

repos=(
  corei-core
  corei-infrastructure
  corei-sdk
  corei-services
  corei-schemas
)

# ===============================
# CLONE REPOS
# ===============================
for repo in "${repos[@]}"; do
  if [ -d "$repo" ]; then
    echo "INFO: Already cloned → $repo"
  else
    echo "Cloning → $repo"
    if ! gh repo clone "$ORG/$repo"; then
      echo "ERROR: Clone failed → $repo"
      CLONE_STATUS="FAILED"
    fi
  fi
done

# ===============================
# FUNCTION: INIT + PUSH
# ===============================
init_repo() {
  local path="$1"
  local msg="$2"

  cd "$path"

  git add .

  if git diff --cached --quiet; then
    echo "INFO: No changes → $path"
  else
    git commit -m "$msg" || true
  fi

  if ! git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
    echo "INFO: Setting upstream → $path"
    if ! git branch --set-upstream-to=origin/main main 2>/dev/null; then
      UPSTREAM_STATUS="FAILED"
    fi
  fi

  if ! git push -u origin main; then
    echo "ERROR: Push failed → $path"
    PUSH_STATUS="FAILED"
  fi
}

# ===============================
# INFRASTRUCTURE
# ===============================
cd "$REPO_ROOT/corei-infrastructure"

mkdir -p terraform kubernetes scripts stages state logs configs modules \
         database frontend docs tests

# ===============================
# CORE PLATFORM
# ===============================
cd "$REPO_ROOT/corei-core"

mkdir -p event-bus workflow-engine replay-engine system config runtime tests \
         docs scripts governance

# ===============================
# SDK
# ===============================
cd "$REPO_ROOT/corei-sdk"

mkdir -p event workflow config lineage flow_control resilience context bootstrap tests \
         docs governance

# ===============================
# SERVICES
# ===============================
cd "$REPO_ROOT/corei-services"

mkdir -p _template/{contracts,config,bootstrap,tests}
mkdir -p orchestration-service state-update-service audit-service market-data-service order-service risk-service
mkdir -p docs tests scripts

# ===============================
# SCHEMAS
# ===============================
cd "$REPO_ROOT/corei-schemas"

mkdir -p events database contracts versions \
         governance docs tests

# ===============================
# ENFORCE DIRECTORY TRACKING
# ===============================
touch_if_missing() {
  for dir in "$@"; do
    [ -d "$dir" ] && touch "$dir/.keep"
  done
}

# infrastructure
touch_if_missing \
  "$REPO_ROOT/corei-infrastructure/database" \
  "$REPO_ROOT/corei-infrastructure/frontend" \
  "$REPO_ROOT/corei-infrastructure/docs" \
  "$REPO_ROOT/corei-infrastructure/tests"

# core
touch_if_missing \
  "$REPO_ROOT/corei-core/docs" \
  "$REPO_ROOT/corei-core/scripts" \
  "$REPO_ROOT/corei-core/governance"

# sdk
touch_if_missing \
  "$REPO_ROOT/corei-sdk/docs" \
  "$REPO_ROOT/corei-sdk/governance"

# services
touch_if_missing \
  "$REPO_ROOT/corei-services/docs" \
  "$REPO_ROOT/corei-services/tests" \
  "$REPO_ROOT/corei-services/scripts"

# schemas
touch_if_missing \
  "$REPO_ROOT/corei-schemas/governance" \
  "$REPO_ROOT/corei-schemas/docs" \
  "$REPO_ROOT/corei-schemas/tests"

# ===============================
# COMMIT ALL (UNCHANGED LOGIC)
# ===============================
for repo in "${repos[@]}"; do
  init_repo "$REPO_ROOT/$repo" "stage2: repository structure alignment"
done

# ===============================
# FINAL REPORT
# ===============================
echo ""
echo "========== STAGE 2 REPORT =========="

echo ""
echo "Auth:"
GH_USER=$(gh api user -q .login 2>/dev/null || echo "FAILED")
echo "  GitHub: $GH_USER"

echo ""
echo "Clone Status   : $CLONE_STATUS"
echo "Push Status    : $PUSH_STATUS"
echo "Upstream Status: $UPSTREAM_STATUS"

echo ""
echo "Repo Verification:"
REPO_VERIFY="OK"
for repo in "${repos[@]}"; do
  if ! gh repo view "$ORG/$repo" >/dev/null 2>&1; then
    echo "  MISSING → $repo"
    REPO_VERIFY="FAILED"
  else
    echo "  OK → $repo"
  fi
done

echo ""
echo "Final Status:"

FINAL_STATUS="READY"

if [ "$CLONE_STATUS" != "OK" ] || \
   [ "$PUSH_STATUS" != "OK" ] || \
   [ "$UPSTREAM_STATUS" != "OK" ] || \
   [ "$REPO_VERIFY" != "OK" ]; then
  FINAL_STATUS="PARTIAL"
fi

echo "  $FINAL_STATUS"
echo "===================================="
