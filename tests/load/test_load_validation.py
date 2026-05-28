import json
from pathlib import Path

REPORT = Path(
    "artifacts/testing/load/load-test-report.json"
)


def test_load_report_exists():

    assert REPORT.exists()


def test_throughput_positive():

    with open(REPORT, "r") as f:
        payload = json.load(f)

    assert payload["throughput_ops_per_sec"] > 0


def test_iterations_completed():

    with open(REPORT, "r") as f:
        payload = json.load(f)

    assert payload["iterations"] == 1000
