#!/usr/bin/env python3

from core_platform.resilience_runtime.circuit_breakers.circuit_breaker_engine import (
    CircuitBreaker
)


class ResilienceValidator:

    def validate(self):

        breaker = CircuitBreaker()

        breaker.record_failure()
        breaker.record_failure()

        result = breaker.record_failure()

        return result["open"] is True


if __name__ == "__main__":

    validator = ResilienceValidator()

    print(
        validator.validate()
    )
