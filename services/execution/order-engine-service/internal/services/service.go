package services

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/order-engine-service/internal/kafka"
    "corei/services/execution/order-engine-service/internal/models"
    "corei/services/execution/order-engine-service/internal/validation"
)

func ProcessSizedIntent(
    ctx context.Context,
    intent models.SizedExecutionIntent,
) error {

    if err := validation.ValidateSizedIntent(
        intent,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("sized intent validation failed")

        return err
    }

    order := BuildExecutionOrder(intent)

    log.Info().
        Str("execution_intent_id", intent.ExecutionIntentID).
        Str("execution_order_id", order.ExecutionOrderID).
        Msg("execution order constructed")

    if err := kafka.PublishExecutionOrder(
        ctx,
        order,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("execution order publish failed")

        return err
    }

    return nil
}
