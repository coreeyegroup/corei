from core_platform.operations.validation.operations_validator import (
    OperationsValidator
)


def test_operations_validation():

    validator = OperationsValidator()

    assert validator.validate() is True
