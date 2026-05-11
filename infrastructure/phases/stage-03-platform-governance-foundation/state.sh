#!/usr/bin/env bash

echo "========================================="
echo "Stage 03 Governance State"
echo "========================================="

echo
echo "Governance Validators:"
echo

find ~/corei/scripts/governance \
-maxdepth 1 \
-type f | sort

echo
echo "Governance Documentation:"
echo

find ~/corei/docs/stage-03 \
-type f | sort

echo
echo "Governance Runtime Inventory:"
echo

find ~/corei/infrastructure/state/stage-03 \
-type f | sort
