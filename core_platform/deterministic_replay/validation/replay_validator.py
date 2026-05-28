#!/usr/bin/env python3

from core_platform.deterministic_replay.consistency.state_consistency_validator import (
    StateConsistencyValidator
)


class ReplayValidator:

    def validate(self):

        validator = StateConsistencyValidator()

        result = validator.validate()

        return result["consistent"]


if __name__ == "__main__":

    validator = ReplayValidator()

    print(
        validator.validate()
    )
