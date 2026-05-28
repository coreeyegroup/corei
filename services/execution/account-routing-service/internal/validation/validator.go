package validation

import (
    "errors"

    "corei/services/execution/account-routing-service/internal/models"
)

func ValidateExecutionIntent(
    intent models.ExecutionIntent,
) error {

    if intent.ExecutionIntentID == "" {
        return errors.New("missing execution_intent_id")
    }

    if intent.InstrumentID == "" {
        return errors.New("missing instrument_id")
    }

    return nil
}
