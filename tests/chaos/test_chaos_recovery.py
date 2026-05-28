import json
from pathlib import Path


ARTIFACT_DIR = Path("chaos/artifacts")


def test_chaos_summary_exists():

    summary = ARTIFACT_DIR / "chaos-summary.json"

    assert summary.exists()


def test_chaos_summary_not_empty():

    summary = ARTIFACT_DIR / "chaos-summary.json"

    with open(summary, "r") as f:
        payload = json.load(f)

    assert len(payload) > 0


def test_all_scenarios_recovered():

    summary = ARTIFACT_DIR / "chaos-summary.json"

    with open(summary, "r") as f:
        payload = json.load(f)

    for scenario in payload:
        assert scenario["status"] == "recovered"
