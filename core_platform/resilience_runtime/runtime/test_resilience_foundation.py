from core_platform.resilience_runtime.validation.resilience_validator import (
    ResilienceValidator
)


def test_resilience_validation():

    validator = ResilienceValidator()

    assert validator.validate() is True
