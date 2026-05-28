#!/usr/bin/env python3

import json
import time
from pathlib import Path

SCENARIO_FILE = Path(
    "tests/load/scenarios/load-test-scenario.json"
)

ARTIFACT_DIR = Path(
    "artifacts/testing/load"
)

ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)


def main():

    with open(SCENARIO_FILE, "r") as f:
        scenario = json.load(f)

    iterations = scenario["iterations"]

    start = time.perf_counter()

    for _ in range(iterations):

        payload = json.dumps(
            scenario["payload"],
            sort_keys=True
        )

        _ = json.loads(payload)

    end = time.perf_counter()

    duration = end - start

    throughput = iterations / duration

    report = {
        "scenario": scenario["scenario"],
        "iterations": iterations,
        "duration_seconds": round(duration, 6),
        "throughput_ops_per_sec": round(
            throughput,
            2
        )
    }

    report_file = ARTIFACT_DIR / "load-test-report.json"

    with open(report_file, "w") as f:
        json.dump(report, f, indent=2)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
