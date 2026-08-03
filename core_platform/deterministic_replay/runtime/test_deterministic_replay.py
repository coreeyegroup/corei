from core_platform.deterministic_replay.validation.replay_validator import (
    ReplayValidator
)


def test_replay_consistency():

    validator = ReplayValidator()

    assert validator.validate() is True
