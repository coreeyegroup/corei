#!/usr/bin/env python3

class CircuitBreaker:

    def __init__(self):

        self.state = "closed"

    def open(self):

        self.state = "open"

    def close(self):

        self.state = "closed"


if __name__ == "__main__":

    breaker = CircuitBreaker()

    breaker.open()

    print(breaker.state)
