#!/usr/bin/env python3

import requests
import sys


def validate(url: str):

    response = requests.get(
        f"{url}/health/ready",
        timeout=5
    )

    if response.status_code != 200:
        sys.exit(1)

    print("READY")


if __name__ == "__main__":

    validate("http://localhost:8080")
