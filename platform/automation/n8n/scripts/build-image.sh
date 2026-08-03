#!/usr/bin/env bash

set -euo pipefail

docker build \
-t core-n8n-python:2.22.4 \
platform/automation/n8n/docker
