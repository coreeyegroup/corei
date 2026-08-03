from datetime import datetime


def generate_business_clock_state(
    workflow_id: str,
    utc_timestamp: str
):

    dt = datetime.fromisoformat(
        utc_timestamp.replace("Z", "+00:00")
    )

    weekday = dt.weekday()

    day_names = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY"
    ]

    day_of_week = day_names[weekday]

    weekend = weekday >= 5

    business_day = not weekend

    business_status = (
        "OPEN"
        if business_day
        else "CLOSED"
    )

    return {
        "workflow_id": workflow_id,
        "workflow_name": "BUSINESS_CLOCK",
        "workflow_version": "1.0",
        "component_type": "OPERATIONS",

        "business_date": dt.date().isoformat(),

        "day_of_week": day_of_week,

        "weekend": weekend,

        "business_day": business_day,

        "business_status": business_status
    }
