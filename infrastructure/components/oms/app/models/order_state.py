from enum import Enum

class OrderState(str, Enum):

    NEW = "NEW"

    ACCEPTED = "ACCEPTED"

    DISPATCHED = "DISPATCHED"

    PARTIAL_FILL = "PARTIAL_FILL"

    FILLED = "FILLED"

    CANCELLED = "CANCELLED"

    REJECTED = "REJECTED"
