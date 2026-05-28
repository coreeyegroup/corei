#!/usr/bin/env python3

PLATFORM_SERVICES = [
    "config-service",
    "config-snapshot-service",
    "identity-service",
    "audit-service",
    "event-ingestion-service",
    "event-validation-service",
    "event-ordering-service",
    "orchestration-service",
    "portfolio-service",
    "snapshot-service",
    "replay-engine-service",
    "failure-handling-service",
    "alert-service"
]


def aggregate():

    return {
        service: "pending"
        for service in PLATFORM_SERVICES
    }


if __name__ == "__main__":

    print(aggregate())
