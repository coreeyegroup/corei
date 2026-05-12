#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage-06 Contamination Validation"
echo "========================================="

echo
echo "Checking Git working tree..."

git status

echo
echo "Checking for tracked Vault artifacts..."

git ls-files | grep 'vault-init.*\.json$' && {

echo
echo "ERROR: Vault init artifact tracked in Git."
exit 1

} || true

echo
echo "Checking for tracked backup directories..."

git ls-files | grep '^corei-backups/' && {

echo
echo "ERROR: Backup artifacts tracked in Git."
exit 1

} || true

echo
echo "Checking for tracked compressed archives..."

git ls-files | grep '\.tar\.gz$' && {

echo
echo "ERROR: Compressed archives tracked in Git."
exit 1

} || true

echo
echo "Checking Git synchronization..."

git status | grep "up to date with 'origin/main'" >/dev/null

echo
echo "Stage-06 contamination validation passed."
