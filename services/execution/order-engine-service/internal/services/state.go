package services

const (
    StateNew              = "NEW"
    StateValidated        = "VALIDATED"
    StateSubmitted        = "SUBMITTED"
    StateAcknowledged     = "ACKNOWLEDGED"
    StatePartiallyFilled  = "PARTIALLY_FILLED"
    StateFilled           = "FILLED"
    StateCancelled        = "CANCELLED"
    StateExpired          = "EXPIRED"
    StateRejected         = "REJECTED"
)

func ValidTransition(
    current string,
    next string,
) bool {

    transitions := map[string][]string{
        StateNew: {
            StateValidated,
            StateRejected,
        },
        StateValidated: {
            StateSubmitted,
            StateRejected,
        },
        StateSubmitted: {
            StateAcknowledged,
            StateRejected,
        },
        StateAcknowledged: {
            StatePartiallyFilled,
            StateFilled,
            StateCancelled,
        },
        StatePartiallyFilled: {
            StateFilled,
            StateCancelled,
        },
    }

    allowed, exists := transitions[current]

    if !exists {
        return false
    }

    for _, candidate := range allowed {
        if candidate == next {
            return true
        }
    }

    return false
}
