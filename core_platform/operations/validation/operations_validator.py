#!/usr/bin/env python3

from core_platform.operations.alerts.alert_router import (
    AlertRouter
)


class OperationsValidator:

    def validate(self):

        router = AlertRouter()

        routes = router.route(
            "critical"
        )

        return "pagerduty" in routes


if __name__ == "__main__":

    validator = OperationsValidator()

    print(
        validator.validate()
    )
