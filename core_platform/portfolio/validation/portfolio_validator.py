#!/usr/bin/env python3


class PortfolioValidator:

    def validate_position(
        self,
        position: dict
    ):

        required = [
            "quantity",
            "notional"
        ]

        return all(
            key in position
            for key in required
        )


if __name__ == "__main__":

    validator = PortfolioValidator()

    print(
        validator.validate_position({
            "quantity": "100",
            "notional": "108.45"
        })
    )
