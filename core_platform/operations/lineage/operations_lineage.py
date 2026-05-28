#!/usr/bin/env python3

import hashlib
import json


class OperationsLineage:

    def lineage_hash(
        self,
        incident: dict
    ):

        encoded = json.dumps(
            incident,
            sort_keys=True
        )

        return hashlib.sha256(
            encoded.encode()
        ).hexdigest()


if __name__ == "__main__":

    lineage = OperationsLineage()

    print(
        lineage.lineage_hash({
            "incident": "critical"
        })
    )
