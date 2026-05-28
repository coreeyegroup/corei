#!/usr/bin/env bash

echo "===== STAGE-10A STATE ====="

echo ""
echo "Testing directories:"
find tests -maxdepth 2 -type d | sort

echo ""
echo "Testing scripts:"
find scripts/testing -type f | sort
