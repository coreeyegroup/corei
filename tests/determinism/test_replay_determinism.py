import hashlib
from pathlib import Path
import subprocess


HASH_FILE = Path("replay/hashes/replay.sha256")


def file_hash(path):

    sha = hashlib.sha256()

    with open(path, "rb") as f:
        sha.update(f.read())

    return sha.hexdigest()


def test_replay_determinism():

    subprocess.run(
        ["python", "replay/engine/replay-engine.py"],
        check=True
    )

    first_hash = HASH_FILE.read_text().strip()

    output_hash_1 = file_hash(
        "tests/replay/output/replay-output.jsonl"
    )

    subprocess.run(
        ["python", "replay/engine/replay-engine.py"],
        check=True
    )

    second_hash = HASH_FILE.read_text().strip()

    output_hash_2 = file_hash(
        "tests/replay/output/replay-output.jsonl"
    )

    assert first_hash == second_hash

    assert output_hash_1 == output_hash_2
