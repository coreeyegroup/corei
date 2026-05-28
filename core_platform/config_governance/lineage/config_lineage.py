#!/usr/bin/env python3

import hashlib


class ConfigLineage:

    def lineage_hash(
        self,
        config_payload: str
    ):

        return hashlib.sha256(
            config_payload.encode()
        ).hexdigest()


if __name__ == "__main__":

    lineage = ConfigLineage()

    print(
        lineage.lineage_hash("config")
    )
