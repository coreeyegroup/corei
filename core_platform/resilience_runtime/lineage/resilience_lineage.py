#!/usr/bin/env python3

import hashlib
import json


class ResilienceLineage:

    def lineage_hash(
        self,
        event: dict
    ):

        encoded = json.dumps(
            event,
            sort_keys=True
        )

        return hashlib.sha256(
            encoded.encode()
        ).hexdigest()


if __name__ == "__main__":

    lineage = ResilienceLineage()

    print(
        lineage.lineage_hash({
            "recovery": "success"
        })
    )
