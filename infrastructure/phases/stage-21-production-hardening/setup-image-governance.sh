#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21C IMAGE GOVERNANCE"
echo "====================================="

bash scripts/platform/inventory-images.sh

if ! bash scripts/platform/validate-image-tags.sh; then

    echo
    echo "[INFO] Mutable images detected."
    echo "[INFO] Applying normalization."

    bash scripts/platform/normalize-image-tags.sh

    echo
    echo "[INFO] Re-validating."

    bash scripts/platform/validate-image-tags.sh

fi

bash scripts/platform/enforce-image-tags.sh

echo
echo "[PASS] Stage-21C completed."
