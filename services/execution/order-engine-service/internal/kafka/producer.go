package kafka

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/order-engine-service/internal/models"
)

func PublishExecutionOrder(
    ctx context.Context,
    order models.ExecutionOrder,
) error {

    log.Info().
        Str("execution_order_id", order.ExecutionOrderID).
        Str("order_state", order.OrderState).
        Msg("execution order published")

    return nil
}
