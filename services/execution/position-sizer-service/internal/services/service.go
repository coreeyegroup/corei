package services

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/position-sizer-service/internal/kafka"
    "corei/services/execution/position-sizer-service/internal/models"
    "corei/services/execution/position-sizer-service/internal/validation"
)

func ProcessPolicyDecision(
    ctx context.Context,
    decision models.PolicyDecision,
) error {

    if err := validation.ValidatePolicyDecision(
        decision,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("policy approval validation failed")

        return err
    }

    sizedIntent := CalculatePositionSize(decision)

    log.Info().
        Str("execution_intent_id", decision.ExecutionIntentID).
        Int64("approved_quantity", sizedIntent.ApprovedQuantity).
        Msg("position sizing completed")

    if err := kafka.PublishSizedIntent(
        ctx,
        sizedIntent,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("sized intent publish failed")

        return err
    }

    return nil
}
