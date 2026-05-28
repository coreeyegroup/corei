#!/usr/bin/env python3

class RateLimiter:

    def allow(
        self,
        requests: int,
        limit: int
    ):

        return requests <= limit


if __name__ == "__main__":

    limiter = RateLimiter()

    print(
        limiter.allow(5, 10)
    )
