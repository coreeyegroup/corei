#!/usr/bin/env python3

import hashlib


class LineageHasher:

    def hash(self, payload: str):

        return hashlib.sha256(
            payload.encode()
        ).hexdigest()


if __name__ == "__main__":

    hasher = LineageHasher()

    print(
        hasher.hash("abc")
    )
