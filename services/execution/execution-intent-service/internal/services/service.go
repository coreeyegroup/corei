package services

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/execution-intent-service/internal/kafka"
    "corei/services/execution/execution-intent-service/internal/models"
    "corei/services/execution/execution-intent-service/internal/validation"
)

func ProcessTradeIntent(
    ctx context.Context,
    tradeIntent models.TradeIntent,
) error {

    if err := validation.ValidateTradeIntent(tradeIntent); err != nil {

        log.Error().
            Err(err).
            Msg("trade intent validation failed")

        return err
    }

    executionIntent := NormalizeTradeIntent(tradeIntent)

    log.Info().
        Str("trade_intent_id", tradeIntent.TradeIntentID).
        Str("execution_intent_id", executionIntent.ExecutionIntentID).
        Msg("execution intent normalized")

    if err := kafka.PublishExecutionIntent(
        ctx,
        executionIntent,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("execution intent publish failed")

        return err
    }

    return nil
}
