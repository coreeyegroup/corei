package kafka

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/position-sizer-service/internal/models"
)

func PublishSizedIntent(
    ctx context.Context,
    intent models.SizedExecutionIntent,
) error {

    log.Info().
        Str("sized_intent_id", intent.SizedIntentID).
        Int64("approved_quantity", intent.ApprovedQuantity).
        Msg("sized execution intent published")

    return nil
}
