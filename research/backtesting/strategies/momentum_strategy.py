class MomentumStrategy:

    def __init__(self):

        self.previous_price = None

    def on_tick(self, tick):

        current_price = float(
            tick["mid_price"]
        )

        signal = None

        if self.previous_price is not None:

            if current_price > self.previous_price:
                signal = "BUY"

            elif current_price < self.previous_price:
                signal = "SELL"

        self.previous_price = current_price

        return signal
