#!/usr/bin/env python3

import json
from pathlib import Path

ORDER_FILE = Path(
    "governance/core_platform/platform-service-order.json"
)


def main():

    with open(ORDER_FILE, "r") as f:
        payload = json.load(f)

    for index, service in enumerate(
        payload["deployment_order"],
        start=1
    ):

        print(f"{index:02d} -> {service}")


if __name__ == "__main__":
    main()
