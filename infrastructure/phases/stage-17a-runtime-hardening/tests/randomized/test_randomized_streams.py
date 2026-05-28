#!/usr/bin/env python3

import json
import sys
from pathlib import Path

BASE = Path("infrastructure/phases/stage-17a-runtime-hardening")

session_id = (
    BASE / "runtime/state/active-runtime-session.id"
).read_text().strip()

sample_dir = (
    BASE
    / "runtime"
    / "randomized-samples"
)

report_file = (
    BASE
    / "reports"
    / "randomized-stream-validation.txt"
)

events_file = (
    sample_dir
    / f"{session_id}.randomized-events.json"
)

fills_file = (
    sample_dir
    / f"{session_id}.randomized-fills.json"
)

print("======================================================")
print("RANDOMIZED STREAM VALIDATION")
print("======================================================")

with open(events_file) as f:
    events = json.load(f)

with open(fills_file) as f:
    fills = json.load(f)

event_failures = 0
fill_failures = 0

for event in events:

    if not event["serialization_valid"]:
        event_failures += 1

    if not event["schema_valid"]:
        event_failures += 1

for fill in fills:

    if not fill["lineage_valid"]:
        fill_failures += 1

validated_events = len(events)
validated_fills = len(fills)

with open(report_file, "w") as report:

    report.write(
        f"VALIDATED_EVENTS={validated_events}\n"
    )

    report.write(
        f"VALIDATED_FILLS={validated_fills}\n"
    )

    report.write(
        f"EVENT_FAILURES={event_failures}\n"
    )

    report.write(
        f"FILL_FAILURES={fill_failures}\n"
    )

    if event_failures == 0 and fill_failures == 0:

        report.write("RESULT=PASS\n")

    else:

        report.write("RESULT=FAIL\n")

if event_failures == 0 and fill_failures == 0:

    print("[PASS] Randomized runtime validation passed")
    sys.exit(0)

else:

    print("[FAIL] Randomized runtime validation failed")
    sys.exit(1)
