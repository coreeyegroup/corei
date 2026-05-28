#!/usr/bin/env python3

import json
import time
from pathlib import Path

ARTIFACT_DIR = Path("chaos/artifacts")

ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

SCENARIOS = [
    {
        "name": "mock-kafka-broker-failure",
        "type": "kafka_failure",
        "duration_seconds": 2
    },
    {
        "name": "mock-network-partition",
        "type": "network_partition",
        "duration_seconds": 1
    },
    {
        "name": "mock-database-interruption",
        "type": "database_failure",
        "duration_seconds": 1
    }
]


def execute_scenario(scenario):

    print(f"Executing chaos scenario: {scenario['name']}")

    time.sleep(scenario["duration_seconds"])

    result = {
        "scenario": scenario["name"],
        "type": scenario["type"],
        "status": "recovered",
        "duration_seconds": scenario["duration_seconds"]
    }

    artifact_file = ARTIFACT_DIR / f"{scenario['name']}.json"

    with open(artifact_file, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Recovered from scenario: {scenario['name']}")

    return result


def main():

    results = []

    for scenario in SCENARIOS:
        result = execute_scenario(scenario)
        results.append(result)

    summary_file = ARTIFACT_DIR / "chaos-summary.json"

    with open(summary_file, "w") as f:
        json.dump(results, f, indent=2)

    print("Chaos execution completed")


if __name__ == "__main__":
    main()
