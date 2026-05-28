package kafka

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/account-routing-service/internal/models"
)

func PublishPerAccountIntent(
    ctx context.Context,
    intent models.PerAccountIntent,
) error {

    log.Info().
        Str("per_account_intent_id", intent.PerAccountIntentID).
        Str("account_id", intent.AccountID).
        Msg("per_account_intent published")

    return nil
}
