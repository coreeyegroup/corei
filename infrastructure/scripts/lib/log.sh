#!/usr/bin/env bash

log_info() {
  echo "[INFO] $1"
}

log_warn() {
  echo "[WARN] $1"
}

log_error() {
  echo "[ERROR] $1"
}

log_stage() {
  echo ""
  echo "========== $1 =========="
}
