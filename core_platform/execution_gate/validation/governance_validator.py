#!/usr/bin/env python3

from core_platform.execution_gate.certification.execution_certifier import (
    ExecutionCertifier
)


class GovernanceValidator:

    def validate(self):

        certifier = ExecutionCertifier()

        return certifier.certify()


if __name__ == "__main__":

    validator = GovernanceValidator()

    print(
        validator.validate()
    )
