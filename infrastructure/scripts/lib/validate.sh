#!/usr/bin/env bash

validation_pass() {
  echo "  PASS → $1"
}

validation_fail() {
  echo "  FAIL → $1"
}

require_command() {
  if command -v "$1" >/dev/null 2>&1; then
    validation_pass "$1 installed"
  else
    validation_fail "$1 missing"
  fi
}
