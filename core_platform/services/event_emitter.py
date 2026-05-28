import json
import os
from datetime import datetime, timezone

from core_platform.services.float_auditor import (
    payload_contains_float
)

BASE_EVENT_PATH = "runtime/stage-14/events"

def emit_event(topic, payload):

    if payload_contains_float(payload):

        raise Exception(
            "FLOAT DETECTED IN PAYLOAD"
        )

    topic_path = os.path.join(
        BASE_EVENT_PATH,
        topic
    )

    os.makedirs(topic_path, exist_ok=True)

    event_time = datetime.now(
        timezone.utc
    ).strftime("%Y%m%dT%H%M%S%f")

    filename = f"{event_time}.json"

    filepath = os.path.join(
        topic_path,
        filename
    )

    with open(filepath, "w") as f:
        json.dump(payload, f, indent=2)

    print(
        f"[EVENT EMITTED] topic={topic} file={filename}"
    )

    return filepath
