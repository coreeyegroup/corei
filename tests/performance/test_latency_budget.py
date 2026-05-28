import json
from pathlib import Path


REPORT = Path(
    "performance/artifacts/performance-report.json"
)

MAX_ALLOWED_LATENCY_MS = 100


def test_performance_report_exists():

    assert REPORT.exists()


def test_latency_budget():

    with open(REPORT, "r") as f:
        payload = json.load(f)

    assert (
        payload["max_latency_ms"]
        < MAX_ALLOWED_LATENCY_MS
    )


def test_throughput_positive():

    with open(REPORT, "r") as f:
        payload = json.load(f)

    assert payload["throughput_ops_per_sec"] > 0
