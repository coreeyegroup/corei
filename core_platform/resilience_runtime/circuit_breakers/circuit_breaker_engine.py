#!/usr/bin/env python3

class CircuitBreaker:

    def __init__(
        self,
        threshold=3
    ):

        self.threshold = threshold
        self.failures = 0
        self.open = False

    def record_failure(self):

        self.failures += 1

        if self.failures >= self.threshold:
            self.open = True

        return self.status()

    def reset(self):

        self.failures = 0
        self.open = False

        return self.status()

    def status(self):

        return {
            "failures": self.failures,
            "open": self.open
        }


if __name__ == "__main__":

    breaker = CircuitBreaker()

    breaker.record_failure()
    breaker.record_failure()

    print(
        breaker.record_failure()
    )
