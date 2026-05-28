#!/usr/bin/env python3

from core_platform.deterministic_replay.engine.replay_engine import (
    ReplayEngine
)


EXPECTED_STATE = {
    "EURUSD": {
        "quantity": "150",
        "notional": "200.0"
    }
}


class StateConsistencyValidator:

    def validate(self):

        replay = ReplayEngine()

        state = replay.replay()

        normalized = {
            symbol: {
                "quantity": value["quantity"],
                "notional": str(
                    round(float(value["notional"]), 1)
                )
            }
            for symbol, value in state.items()
        }

        return {
            "consistent": normalized == EXPECTED_STATE,
            "state": normalized
        }


if __name__ == "__main__":

    validator = StateConsistencyValidator()

    print(
        validator.validate()
    )
