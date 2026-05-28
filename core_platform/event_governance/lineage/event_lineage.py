#!/usr/bin/env python3

import hashlib
import json


class EventLineage:

    def lineage_hash(
        self,
        payload: dict
    ):

        encoded = json.dumps(
            payload,
            sort_keys=True
        )

        return hashlib.sha256(
            encoded.encode()
        ).hexdigest()


if __name__ == "__main__":

    lineage = EventLineage()

    print(
        lineage.lineage_hash({
            "event": "test"
        })
    )
