import json
from pathlib import Path


OUTPUT_FILE = Path(
    "tests/synthetic/output/generated-ticks.jsonl"
)


def test_synthetic_market_exists():

    assert OUTPUT_FILE.exists()


def test_synthetic_market_not_empty():

    with open(OUTPUT_FILE, "r") as f:
        lines = f.readlines()

    assert len(lines) > 0


def test_synthetic_market_structure():

    with open(OUTPUT_FILE, "r") as f:

        first = json.loads(f.readline())

    assert "event_id" in first
    assert "instrument" in first
    assert "bid_price" in first
    assert "ask_price" in first
