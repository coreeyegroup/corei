#!/usr/bin/env bash

set -euo pipefail

docker tag \
core-n8n-python:2.22.4 \
localhost:5000/core-n8n-python:2.22.4

docker push \
localhost:5000/core-n8n-python:2.22.4
