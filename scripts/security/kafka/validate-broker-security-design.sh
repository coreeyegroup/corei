#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "BROKER SECURITY DESIGN VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/broker-security-design/target-broker-runtime.properties

test -f infrastructure/phases/stage-21-production-hardening/broker-security-design/tls-runtime-mounts.md

test -f infrastructure/phases/stage-21-production-hardening/broker-security-design/jaas-design.conf

test -f infrastructure/phases/stage-21-production-hardening/broker-security-design/deployment-impact.md

echo
echo "[PASS] Broker security design validated"
