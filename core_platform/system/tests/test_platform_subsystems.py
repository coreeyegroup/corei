from core_platform.event_bus.gateway import EventBusGateway
from core_platform.flow_control.rate_limiter import RateLimiter
from core_platform.lineage.hasher import LineageHasher
from core_platform.replay.snapshot_consistency_guard import (
    SnapshotConsistencyGuard
)


def test_event_gateway():

    gateway = EventBusGateway()

    result = gateway.publish(
        "test",
        {"event_id": "evt-001"}
    )

    assert result["status"] == "accepted"


def test_rate_limiter():

    limiter = RateLimiter()

    assert limiter.allow(5, 10)


def test_lineage_hashing():

    hasher = LineageHasher()

    result = hasher.hash("abc")

    assert len(result) == 64


def test_snapshot_consistency():

    guard = SnapshotConsistencyGuard()

    assert guard.validate(
        "abc",
        "abc"
    )
