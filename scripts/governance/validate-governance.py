#!/usr/bin/env python3

from pathlib import Path
import sys

ROOT = Path.home() / "corei"

PASS = True

REQUIRED_EVENT_FIELDS = {
    "event_id",
    "event_time",
    "trace_id",
    "execution_id",
    "schema_version",
}

FORBIDDEN_TYPES = {
    '"float"',
    '"double"',
}

print("=========================================")
print("Governance Validation")
print("=========================================")

# =========================================
# Validate Avro schemas
# =========================================

schema_dir = ROOT / "schemas"

schema_files = list(schema_dir.rglob("*.avsc"))

if not schema_files:
    print("FAIL -> no Avro schemas found")
    PASS = False

for schema in schema_files:
    content = schema.read_text()

    for forbidden in FORBIDDEN_TYPES:
        if forbidden in content:
            print(f"FAIL -> forbidden type {forbidden} in {schema}")
            PASS = False

    for field in REQUIRED_EVENT_FIELDS:
        if field not in content:
            print(f"FAIL -> missing field {field} in {schema}")
            PASS = False

# =========================================
# Dockerfile governance
# =========================================

dockerfiles = list(ROOT.rglob("Dockerfile"))

for dockerfile in dockerfiles:
    content = dockerfile.read_text()

    if "USER " not in content:
        print(f"FAIL -> Dockerfile missing non-root USER: {dockerfile}")
        PASS = False

# =========================================
# Helm governance
# =========================================

helm_values = list(ROOT.rglob("values.yaml"))

for values in helm_values:
    content = values.read_text()

    if "resources:" not in content:
        print(f"FAIL -> missing resources block: {values}")
        PASS = False

print("=========================================")

if PASS:
    print("GOVERNANCE VALIDATION: PASS")
    sys.exit(0)
else:
    print("GOVERNANCE VALIDATION: FAIL")
    sys.exit(1)
