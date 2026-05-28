#!/usr/bin/env python3

import hashlib
import json
from pathlib import Path

INPUT_FILE = Path(
    "tests/replay/fixtures/replay-session.jsonl"
)

OUTPUT_FILE = Path(
    "tests/replay/output/replay-output.jsonl"
)

HASH_FILE = Path(
    "replay/hashes/replay.sha256"
)


def canonicalize(payload):
    return json.dumps(
        payload,
        sort_keys=True,
        separators=(",", ":")
    )


def compute_hash(lines):

    sha = hashlib.sha256()

    for line in lines:
        sha.update(line.encode())

    return sha.hexdigest()


def main():

    replay_lines = []

    with open(INPUT_FILE, "r") as infile, \
         open(OUTPUT_FILE, "w") as outfile:

        for raw in infile:

            payload = json.loads(raw)

            canonical = canonicalize(payload)

            replay_lines.append(canonical)

            outfile.write(canonical + "\n")

    digest = compute_hash(replay_lines)

    with open(HASH_FILE, "w") as f:
        f.write(digest)

    print(f"Replay hash: {digest}")


if __name__ == "__main__":
    main()
