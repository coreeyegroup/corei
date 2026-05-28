#!/usr/bin/env python3

class LagMonitor:

    def lag_status(
        self,
        lag: int
    ):

        if lag > 1000:
            return "critical"

        if lag > 100:
            return "warning"

        return "healthy"


if __name__ == "__main__":

    monitor = LagMonitor()

    print(
        monitor.lag_status(50)
    )
