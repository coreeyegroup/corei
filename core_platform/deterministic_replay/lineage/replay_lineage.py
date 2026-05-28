#!/usr/bin/env python3

import hashlib
import json


class ReplayLineage:

    def replay_hash(
        self,
        state: dict
    ):

        encoded = json.dumps(
            state,
            sort_keys=True
        )

        return hashlib.sha256(
            encoded.encode()
        ).hexdigest()


if __name__ == "__main__":

    lineage = ReplayLineage()

    print(
        lineage.replay_hash({
            "replay": "state"
        })
    )
