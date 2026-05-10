#!/usr/bin/env bash

STATE_FILE="$HOME/corei/.install.state"

mark_done() {
  echo "$1=done" >> "$STATE_FILE"
}

is_done() {
  grep -q "^$1=done$" "$STATE_FILE" 2>/dev/null
}
