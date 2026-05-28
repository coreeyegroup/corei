#!/bin/bash

set -e

sha256sum infrastructure/replay/stage-14/datasets/trading-lineage.json \
> infrastructure/replay/stage-14/datasets/trading-lineage.sha256

echo "[Stage-14] Replay dataset hash generated"
