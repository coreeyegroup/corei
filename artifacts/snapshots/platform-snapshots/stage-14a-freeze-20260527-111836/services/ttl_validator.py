from datetime import datetime, timezone

DEFAULT_SIGNAL_TTL_SECONDS = 300

def parse_event_time(event_time):

    return datetime.fromisoformat(
        event_time.replace("Z", "+00:00")
    )

def signal_is_stale(
    event_time,
    ttl_seconds=DEFAULT_SIGNAL_TTL_SECONDS
):

    current_time = datetime.now(
        timezone.utc
    )

    event_timestamp = parse_event_time(
        event_time
    )

    age_seconds = int(
        (
            current_time -
            event_timestamp
        ).total_seconds()
    )

    if age_seconds > ttl_seconds:
        return True

    return False
