#!/usr/bin/env python3

class SnapshotConsistencyGuard:

    def validate(
        self,
        replay_hash: str,
        snapshot_hash: str
    ):

        return replay_hash == snapshot_hash


if __name__ == "__main__":

    guard = SnapshotConsistencyGuard()

    print(
        guard.validate("abc", "abc")
    )
