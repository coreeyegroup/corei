#!/usr/bin/env bash

set -euo pipefail

python3 --version

python3 - <<'EOF'
import pandas
import numpy
import pytz

print("PYTHON_RUNTIME_OK")
EOF
