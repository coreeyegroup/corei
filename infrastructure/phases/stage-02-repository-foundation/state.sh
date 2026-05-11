#!/usr/bin/env bash

echo "========================================="
echo "Stage 02 State"
echo "========================================="

echo "VERSION:"
cat "$HOME/corei/VERSION"

echo

echo "Git status:"
git -C "$HOME/corei" status --short
