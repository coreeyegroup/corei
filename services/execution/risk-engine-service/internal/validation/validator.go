package validation

import (
    "errors"

    "corei/services/execution/risk-engine-service/internal/models"
)

func ValidatePerAccountIntent(
    intent models.PerAccountIntent,
) error {

    if intent.PerAccountIntentID == "" {
        return errors.New("missing per_account_intent_id")
    }

    if intent.AccountID == "" {
        return errors.New("missing account_id")
    }

    return nil
}
