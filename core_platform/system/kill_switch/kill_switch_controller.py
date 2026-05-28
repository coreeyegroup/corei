#!/usr/bin/env python3

class KillSwitchController:

    def activate(self):

        return {
            "kill_switch": "activated"
        }


if __name__ == "__main__":

    controller = KillSwitchController()

    print(
        controller.activate()
    )
