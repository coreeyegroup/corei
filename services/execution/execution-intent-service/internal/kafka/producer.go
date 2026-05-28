package kafka

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/execution-intent-service/internal/models"
)

func PublishExecutionIntent(
    ctx context.Context,
    intent models.ExecutionIntent,
) error {

    log.Info().
        Str("execution_intent_id", intent.ExecutionIntentID).
        Msg("execution_intent published")

    return nil
}
