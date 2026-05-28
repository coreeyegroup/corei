#!/usr/bin/env python3

import json
from pathlib import Path


SCHEMA_PATH = (
    "core_platform/event_governance/schemas/"
    "platform-event-schema.json"
)


class EventValidator:

    def validate(self):

        schema = json.loads(
            Path(SCHEMA_PATH).read_text()
        )

        return {
            "schema_loaded": True,
            "required_fields": schema["required"]
        }


if __name__ == "__main__":

    validator = EventValidator()

    print(
        validator.validate()
    )
