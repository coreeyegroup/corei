#!/usr/bin/env bash
set -euo pipefail

OLD_ROOT="$HOME/corei"
NEW_ROOT="$HOME/corei"

OLD_ORG="corei"
NEW_ORG="corei"

echo "========== MIGRATION: corei → corei =========="

# -------------------------------
# 1. VALIDATION
# -------------------------------
if [ ! -d "$OLD_ROOT" ]; then
  echo "ERROR: $OLD_ROOT not found"
  exit 1
fi

echo "[1] Validation OK"

# -------------------------------
# 2. RENAME LOCAL ROOT
# -------------------------------
echo "[2] Renaming local directory"

mv "$OLD_ROOT" "$NEW_ROOT"

# -------------------------------
# 3. UPDATE SCRIPTS (PATH + ORG)
# -------------------------------
echo "[3] Updating scripts"

find "$NEW_ROOT" -type f -name "*.sh" -exec sed -i \
  -e "s|corei|corei|g" \
  -e "s|corei|corei|g" {} +

# -------------------------------
# 4. RENAME GITHUB REPOS
# -------------------------------
echo "[4] Renaming GitHub repositories"

repos=(
  corei-core
  corei-infrastructure
  corei-sdk
  corei-services
  corei-schemas
)

for repo in "${repos[@]}"; do
  NEW_REPO=$(echo "$repo" | sed 's/corei/corei/')
  
  echo "Renaming $repo → $NEW_REPO"
  
  gh repo rename "$NEW_REPO" \
    --repo "$OLD_ORG/$repo" \
    --yes
done

# -------------------------------
# 5. VERIFY NEW REPOS
# -------------------------------
echo "[5] Verifying repositories"

new_repos=(
  corei-core
  corei-infrastructure
  corei-sdk
  corei-services
  corei-schemas
)

for repo in "${new_repos[@]}"; do
  if gh repo view "$OLD_ORG/$repo" >/dev/null 2>&1; then
    echo "  OK → $repo"
  else
    echo "  FAILED → $repo"
  fi
done

# -------------------------------
# 6. FINAL OUTPUT
# -------------------------------
echo ""
echo "========== MIGRATION COMPLETE =========="
echo "New Root: $NEW_ROOT"
echo "New Org : $NEW_ORG"
