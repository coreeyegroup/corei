#!/usr/bin/env bash

retry() {
  local retries=$1
  shift

  local count=0

  until "$@"; do
    exit_code=$?
    count=$((count + 1))

    if [ $count -ge $retries ]; then
      echo "Command failed after $retries attempts"
      return $exit_code
    fi

    sleep 2
  done
}
