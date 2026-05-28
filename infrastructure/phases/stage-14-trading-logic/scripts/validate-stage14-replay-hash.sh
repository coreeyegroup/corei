#!/bin/bash

set -e

sha256sum -c \
infrastructure/replay/stage-14/datasets/trading-lineage.sha256

echo "[Stage-14] Replay hash validation PASSED"
