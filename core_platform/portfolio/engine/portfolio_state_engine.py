#!/usr/bin/env python3

from decimal import Decimal


class PortfolioStateEngine:

    def __init__(self):

        self.positions = {}

    def apply_fill(
        self,
        symbol: str,
        quantity: str,
        price: str
    ):

        quantity = Decimal(quantity)
        price = Decimal(price)

        if symbol not in self.positions:

            self.positions[symbol] = {
                "quantity": Decimal("0"),
                "notional": Decimal("0")
            }

        self.positions[symbol]["quantity"] += quantity

        self.positions[symbol]["notional"] += (
            quantity * price
        )

        return self.positions

    def snapshot(self):

        output = {}

        for symbol, state in self.positions.items():

            output[symbol] = {
                "quantity": str(state["quantity"]),
                "notional": str(state["notional"])
            }

        return output


if __name__ == "__main__":

    engine = PortfolioStateEngine()

    engine.apply_fill(
        "EURUSD",
        "100000",
        "1.0845"
    )

    print(engine.snapshot())
