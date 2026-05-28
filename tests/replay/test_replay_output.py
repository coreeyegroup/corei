import json
from pathlib import Path


OUTPUT_FILE = Path(
    "tests/replay/output/replay-output.jsonl"
)


def test_replay_output_exists():

    assert OUTPUT_FILE.exists()


def test_replay_output_not_empty():

    with open(OUTPUT_FILE, "r") as f:
        lines = f.readlines()

    assert len(lines) > 0


def test_replay_output_structure():

    with open(OUTPUT_FILE, "r") as f:

        first = json.loads(f.readline())

    assert "event_id" in first
    assert "instrument" in first
