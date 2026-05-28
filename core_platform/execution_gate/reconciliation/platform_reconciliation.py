#!/usr/bin/env python3

from pathlib import Path


REQUIRED_COMPONENTS = [
    "core_platform/sdk",
    "core_platform/event_governance",
    "core_platform/config_governance",
    "core_platform/deterministic_replay",
    "core_platform/resilience_runtime",
    "core_platform/operations",
    "core_platform/portfolio",
    "core_platform/runtime_governance",
    "core_platform/system_registry"
]


class PlatformReconciliation:

    def validate(self):

        results = {}

        for component in REQUIRED_COMPONENTS:

            results[component] = Path(
                component
            ).exists()

        return results


if __name__ == "__main__":

    reconciliation = PlatformReconciliation()

    print(
        reconciliation.validate()
    )
