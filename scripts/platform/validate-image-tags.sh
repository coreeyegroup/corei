#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "IMAGE TAG VALIDATION"
echo "====================================="

TMP_FILE=$(mktemp)

find \
kubernetes \
infrastructure/kubernetes \
-type f \
\( -name "*.yaml" -o -name "*.yml" \) \
-print0 2>/dev/null \
| xargs -0 grep -Hn "image:" 2>/dev/null \
| grep ":latest" \
> "${TMP_FILE}" || true

if [ -s "${TMP_FILE}" ]; then

    echo
    echo "[FAIL] Mutable deployment images discovered"
    echo

    cat "${TMP_FILE}"

    rm -f "${TMP_FILE}"

    exit 1

fi

rm -f "${TMP_FILE}"

echo
echo "[PASS] No mutable deployment images discovered"
