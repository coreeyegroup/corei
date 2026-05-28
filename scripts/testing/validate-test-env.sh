#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

VENV_DIR="${ROOT_DIR}/runtime/python/testing/venv"

source "${VENV_DIR}/bin/activate"

FAIL=0

validate_command() {
    if command -v "$1" >/dev/null 2>&1; then
        echo "[PASS] $1 installed"
    else
        echo "[FAIL] $1 missing"
        FAIL=1
    fi
}

echo "=================================================="
echo "STAGE-10A TESTING RUNTIME VALIDATION"
echo "=================================================="

validate_command pytest
validate_command k6
validate_command jq
validate_command yq

echo ""
echo "[Python Package Validation]"

python -c "import pytest" && echo "[PASS] pytest"
python -c "import pytest_asyncio" && echo "[PASS] pytest-asyncio"
python -c "import pact" && echo "[PASS] pact-python"
python -c "import httpx" && echo "[PASS] httpx"
python -c "import aiokafka" && echo "[PASS] aiokafka"
python -c "import confluent_kafka" && echo "[PASS] confluent-kafka"
python -c "import fastavro" && echo "[PASS] fastavro"
python -c "from faker import Faker" && echo "[PASS] faker"

if [ "$FAIL" -eq 0 ]; then
    echo ""
    echo "TESTING RUNTIME VALIDATION PASSED"
    exit 0
else
    echo ""
    echo "TESTING RUNTIME VALIDATION FAILED"
    exit 1
fi
