#!/usr/bin/env python3

class OrderingCoordinator:

    def sequence(
        self,
        events: list
    ):

        return sorted(
            events,
            key=lambda x: x["sequence"]
        )


if __name__ == "__main__":

    coordinator = OrderingCoordinator()

    print(
        coordinator.sequence([
            {"sequence": 2},
            {"sequence": 1}
        ])
    )
