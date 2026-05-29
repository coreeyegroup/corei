#!/usr/bin/env bash

set -euo pipefail

FILE="state/security/kafka/final-manifest-review/kafka-statefulset-secured.yaml"

python3 <<'PY'
from pathlib import Path

p = Path("state/security/kafka/final-manifest-review/kafka-statefulset-secured.yaml")
text = p.read_text()

bad = """        - mountPath: /etc/kafka/tls
          name: kafka-runtime-tls
          readOnly: true
        - mountPath: /etc/kafka/security
          name: kafka-security-runtime
          readOnly: true"""

text = text.replace(bad, "", 1)

p.write_text(text)
PY

echo "[PASS] Init container mounts corrected"
