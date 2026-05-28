#!/usr/bin/env python3

class AlertRouter:

    def route(
        self,
        severity: str
    ):

        routing = {
            "critical": [
                "pagerduty",
                "telegram",
                "email"
            ],
            "high": [
                "telegram",
                "email"
            ],
            "medium": [
                "email"
            ]
        }

        return routing.get(
            severity,
            []
        )


if __name__ == "__main__":

    router = AlertRouter()

    print(
        router.route("critical")
    )
