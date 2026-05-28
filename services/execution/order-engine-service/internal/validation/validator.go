package validation

import (
    "errors"

    "corei/services/execution/order-engine-service/internal/models"
)

func ValidateSizedIntent(
    intent models.SizedExecutionIntent,
) error {

    if intent.SizedIntentID == "" {
        return errors.New("missing sized_intent_id")
    }

    if intent.ApprovedQuantity <= 0 {
        return errors.New("invalid approved quantity")
    }

    return nil
}
