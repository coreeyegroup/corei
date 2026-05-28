#!/usr/bin/env python3

from pathlib import Path
import re
import sys

VERSION_FILE = Path("VERSION")

SEMVER_PATTERN = r"^\d+\.\d+\.\d+$"


def main():

    version = VERSION_FILE.read_text().strip()

    if not re.match(SEMVER_PATTERN, version):

        print(f"Invalid version: {version}")

        sys.exit(1)

    print(f"Valid version: {version}")


if __name__ == "__main__":
    main()
