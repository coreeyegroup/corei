#!/usr/bin/env python3

import json
import statistics
import time
from pathlib import Path

ARTIFACT_DIR = Path("performance/artifacts")

ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

ITERATIONS = 100

LATENCIES = []


def benchmark_pipeline():

    start = time.perf_counter()

    payload = {
        "instrument": "EURUSD",
        "bid_price": "1.08450",
        "ask_price": "1.08453"
    }

    serialized = json.dumps(payload, sort_keys=True)

    _ = json.loads(serialized)

    end = time.perf_counter()

    latency_ms = (end - start) * 1000

    return latency_ms


def main():

    for _ in range(ITERATIONS):

        latency = benchmark_pipeline()

        LATENCIES.append(latency)

    report = {
        "iterations": ITERATIONS,
        "avg_latency_ms": round(
            statistics.mean(LATENCIES), 6
        ),
        "max_latency_ms": round(
            max(LATENCIES), 6
        ),
        "min_latency_ms": round(
            min(LATENCIES), 6
        ),
        "throughput_ops_per_sec": round(
            ITERATIONS / sum(LATENCIES) * 1000,
            2
        )
    }

    report_file = ARTIFACT_DIR / "performance-report.json"

    with open(report_file, "w") as f:
        json.dump(report, f, indent=2)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
