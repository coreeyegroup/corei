#!/usr/bin/env bash

set -e

REPO_NAME="corei"
GITHUB_OWNER="coreeyegroup"

cd ~/corei

# --------------------------------------------------
# INIT GIT
# --------------------------------------------------

if [ ! -d ".git" ]; then
    git init
fi

git checkout -B main

# --------------------------------------------------
# GITIGNORE
# --------------------------------------------------

cat > .gitignore <<'EOF'
.logs/
.snapshots/
*.iso
*.vmdk
*.log
EOF

# --------------------------------------------------
# COMMIT
# --------------------------------------------------

git add .

git commit -m "initial platform bootstrap" || true

# --------------------------------------------------
# CREATE REPO
# --------------------------------------------------

if ! gh repo view "${GITHUB_OWNER}/${REPO_NAME}" >/dev/null 2>&1; then

    gh repo create "${GITHUB_OWNER}/${REPO_NAME}" \
        --private \
        --source=. \
        --remote=origin \
        --push
fi

# --------------------------------------------------
# PUSH
# --------------------------------------------------

git push -u origin main

echo
echo "===================================="
echo "Repository Ready"
echo "===================================="

echo "https://github.com/${GITHUB_OWNER}/${REPO_NAME}"
