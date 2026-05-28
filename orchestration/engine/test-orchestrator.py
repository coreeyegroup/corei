#!/usr/bin/env python3

import json
import subprocess
from pathlib import Path

GRAPH_FILE = Path(
    "orchestration/graphs/test-execution-graph.json"
)

ARTIFACT_DIR = Path(
    "artifacts/testing/orchestration"
)

ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)


def main():

    with open(GRAPH_FILE, "r") as f:
        graph = json.load(f)

    execution_results = []

    for scope in graph["execution_order"]:

        print(f"Executing scope: {scope}")

        result = subprocess.run(
            [
                "bash",
                "scripts/testing/run-tests.sh",
                f"--scope={scope}"
            ],
            capture_output=True,
            text=True
        )

        execution_results.append({
            "scope": scope,
            "returncode": result.returncode
        })

        if result.returncode != 0:

            print(result.stdout)
            print(result.stderr)

            raise SystemExit(
                f"Execution failed for scope: {scope}"
            )

    report_file = (
        ARTIFACT_DIR /
        "orchestration-summary.json"
    )

    with open(report_file, "w") as f:
        json.dump(execution_results, f, indent=2)

    print("Orchestrated execution completed")


if __name__ == "__main__":
    main()
