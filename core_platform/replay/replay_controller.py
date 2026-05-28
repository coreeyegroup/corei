#!/usr/bin/env python3

class ReplayController:

    def replay(
        self,
        events: list
    ):

        return {
            "events_replayed": len(events)
        }


if __name__ == "__main__":

    controller = ReplayController()

    print(
        controller.replay([1, 2, 3])
    )
