#!/usr/bin/env bash

set -euo pipefail

docker build \
-t core-python-execution-service:1.0 \
platform/services/python-execution-service
