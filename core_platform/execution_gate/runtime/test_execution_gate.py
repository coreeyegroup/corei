from core_platform.execution_gate.validation.governance_validator import (
    GovernanceValidator
)


def test_execution_gate():

    validator = GovernanceValidator()

    assert validator.validate() is True
