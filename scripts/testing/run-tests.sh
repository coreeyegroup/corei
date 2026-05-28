#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

VENV_DIR="${ROOT_DIR}/runtime/python/testing/venv"

source "${VENV_DIR}/bin/activate"

SCOPE="${1:-}"

REPORT_DIR="${ROOT_DIR}/artifacts/testing/junit"

mkdir -p "${REPORT_DIR}"

case "${SCOPE}" in

    --scope=integration)
        pytest tests/integration \
            --junitxml="${REPORT_DIR}/integration.xml"
        ;;

    --scope=replay)
        pytest tests/replay \
            --junitxml="${REPORT_DIR}/replay.xml"
        ;;

    --scope=performance)
        python performance/engine/performance-engine.py

        pytest tests/performance \
            --junitxml="${REPORT_DIR}/performance.xml"
        ;;

    --scope=chaos)
        pytest tests/chaos \
            --junitxml="${REPORT_DIR}/chaos.xml"
        ;;

    --scope=contracts)
        pytest tests/contracts \
            --junitxml="${REPORT_DIR}/contracts.xml"
        ;;

    --scope=schemas)
        pytest tests/schemas \
            --junitxml="${REPORT_DIR}/schemas.xml"
        ;;

    --scope=simulation)
        pytest \
            tests/integration/test_mock_broker.py \
            tests/synthetic/test_synthetic_market_generation.py \
            --junitxml="${REPORT_DIR}/simulation.xml"
        ;;

    --scope=replay-validation)
        python replay/engine/replay-engine.py

        pytest \
            tests/replay \
            tests/determinism \
            --junitxml="${REPORT_DIR}/replay-validation.xml"
        ;;

    --scope=chaos-validation)
        python chaos/engine/chaos-engine.py

        pytest tests/chaos \
            --junitxml="${REPORT_DIR}/chaos-validation.xml"
        ;;

    --scope=load)
        python orchestration/engine/load-test-engine.py

        pytest tests/load \
            --junitxml="${REPORT_DIR}/load.xml"
        ;;

    *)
        echo "Invalid scope"
        exit 1
        ;;

esac
