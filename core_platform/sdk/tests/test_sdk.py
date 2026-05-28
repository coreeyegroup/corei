from sdk.event.interceptor import (
    EventGovernanceInterceptor
)

from sdk.lineage.client import (
    LineageClient
)

from sdk.bootstrap.validator import (
    BootstrapValidator
)


def test_event_interceptor():

    interceptor = EventGovernanceInterceptor()

    assert interceptor.validate({
        "event_id": "evt-001"
    })


def test_lineage_hashing():

    client = LineageClient()

    result = client.hash_entity("abc")

    assert len(result) == 64


def test_bootstrap_validator():

    validator = BootstrapValidator()

    assert validator.validate({
        "ENVIRONMENT": "dev",
        "SERVICE_NAME": "test-service"
    })
