import os
import sys

REPO_ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../.."
    )
)

sys.path.insert(0, REPO_ROOT)

from core_platform.services.float_auditor import (
    payload_contains_float
)

VALID_PAYLOAD = {
    "instrument_id": "BANKNIFTY",
    "strength_bps": 8200,
    "confidence_bps": 7600
}

INVALID_PAYLOAD = {
    "instrument_id": "BANKNIFTY",
    "strength_bps": 82.5
}

print("VALID PAYLOAD:")
print(
    payload_contains_float(
        VALID_PAYLOAD
    )
)

print("")

print("INVALID PAYLOAD:")
print(
    payload_contains_float(
        INVALID_PAYLOAD
    )
)
