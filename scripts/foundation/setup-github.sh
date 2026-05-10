#!/usr/bin/env bash

set -euo pipefail

ORG="corei"

REPOS=(
  corei-core
  corei-infrastructure
  corei-sdk
  corei-schemas
  corei-services
)

check_dependencies() {
  command -v gh >/dev/null 2>&1 || {
    echo "ERROR: GitHub CLI missing"
    exit 1
  }
}

validate_auth() {
  gh auth status >/dev/null 2>&1 || {
    echo "ERROR: GitHub authentication required"
    exit 1
  }
}

create_repository() {

  local repo="$1"

  if gh repo view "${ORG}/${repo}" >/dev/null 2>&1; then
    echo "INFO: Repo exists -> ${repo}"
  else
    echo "INFO: Creating repo -> ${repo}"

    gh repo create "${ORG}/${repo}" \
      --private \
      --confirm
  fi
}

main() {

  check_dependencies

  validate_auth

  for repo in "${REPOS[@]}"; do
    create_repository "${repo}"
  done

  echo "========================================="
  echo "Stage 0 GitHub setup complete"
  echo "========================================="
}

main "$@"
