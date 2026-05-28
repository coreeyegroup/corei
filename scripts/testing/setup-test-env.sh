#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/infrastructure/phases/stage-10a-testing-foundation/runtime/toolchain-versions.env"

LOG_FILE="${ROOT_DIR}/state/stage-10a/logs/testing-runtime-install.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

VENV_DIR="${ROOT_DIR}/runtime/python/testing/venv"

echo "=================================================="
echo "STAGE-10A TESTING RUNTIME INSTALLATION"
echo "=================================================="

echo "[1/10] Installing system dependencies..."

sudo apt-get update

sudo apt-get install -y \
    python3-venv \
    python3-pip \
    jq \
    unzip \
    curl \
    wget \
    gnupg \
    ca-certificates

echo "[2/10] Creating governed Python venv..."

python3 -m venv "${VENV_DIR}"

echo "[3/10] Activating venv..."

source "${VENV_DIR}/bin/activate"

echo "[4/10] Upgrading pip..."

pip install --upgrade pip setuptools wheel

echo "[5/10] Installing Python testing stack..."

pip install \
    pytest=="${PYTEST_VERSION}" \
    pytest-asyncio=="${PYTEST_ASYNCIO_VERSION}" \
    pact-python=="${PACT_PYTHON_VERSION}" \
    httpx=="${HTTPX_VERSION}" \
    aiokafka=="${AIOKAFKA_VERSION}" \
    confluent-kafka=="${CONFLUENT_KAFKA_VERSION}" \
    fastavro=="${FASTAVRO_VERSION}" \
    faker=="${FAKER_VERSION}"

echo "[6/10] Installing yq..."

sudo wget -qO /usr/local/bin/yq \
https://github.com/mikefarah/yq/releases/download/${YQ_VERSION}/yq_linux_amd64

sudo chmod +x /usr/local/bin/yq

echo "[7/10] Installing k6..."

if [ ! -f /usr/share/keyrings/k6-archive-keyring.gpg ]; then
    curl -fsSL https://dl.k6.io/key.gpg | \
    sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg
fi

if [ ! -f /etc/apt/sources.list.d/k6.list ]; then
    echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | \
    sudo tee /etc/apt/sources.list.d/k6.list
fi

sudo apt-get update

sudo apt-get install -y k6

echo "[8/10] Creating pytest configuration..."

cat > "${ROOT_DIR}/tests/config/pytest.ini" <<PYTEST
[pytest]
asyncio_mode = auto
testpaths = tests
python_files = test_*.py
addopts = -ra -q
PYTEST

echo "[9/10] Creating runtime configuration..."

cat > "${ROOT_DIR}/tests/config/test-runtime.yaml" <<RUNTIME
testing:
  deterministic_seed: 42
  replay_safe: true
  async_mode: enabled
  artifact_path: artifacts/testing
RUNTIME

echo "[10/10] Runtime installation completed"

echo ""
echo "STAGE-10A TESTING TOOLCHAIN INSTALLED"
