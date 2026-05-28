#!/usr/bin/env python3

from core_platform.execution_gate.reconciliation.platform_reconciliation import (
    PlatformReconciliation
)


class ExecutionCertifier:

    def certify(self):

        reconciliation = PlatformReconciliation()

        result = reconciliation.validate()

        return all(
            result.values()
        )


if __name__ == "__main__":

    certifier = ExecutionCertifier()

    print(
        certifier.certify()
    )
