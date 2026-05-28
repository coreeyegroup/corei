import os
import sys

REPO_ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../.."
    )
)

sys.path.insert(0, REPO_ROOT)

from datetime import datetime, timezone

from core_platform.services.ttl_validator import (
    signal_is_stale
)

fresh_event = datetime.now(
    timezone.utc
).isoformat()

expired_event = "2020-01-01T00:00:00+00:00"

print("FRESH EVENT:")
print(
    signal_is_stale(
        fresh_event
    )
)

print("")

print("EXPIRED EVENT:")
print(
    signal_is_stale(
        expired_event
    )
)
