def payload_contains_float(payload):

    if isinstance(payload, float):
        return True

    if isinstance(payload, dict):

        for value in payload.values():

            if payload_contains_float(value):
                return True

    if isinstance(payload, list):

        for item in payload:

            if payload_contains_float(item):
                return True

    return False
