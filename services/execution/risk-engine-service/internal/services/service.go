package services

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/risk-engine-service/internal/kafka"
    "corei/services/execution/risk-engine-service/internal/models"
    "corei/services/execution/risk-engine-service/internal/validation"
)

func ProcessPerAccountIntent(
    ctx context.Context,
    intent models.PerAccountIntent,
) error {

    if err := validation.ValidatePerAccountIntent(intent); err != nil {

        log.Error().
            Err(err).
            Msg("per-account validation failed")

        return err
    }

    decision := EvaluateRisk(intent)

    if !decision.Approved {

        log.Warn().
            Str("execution_intent_id", intent.ExecutionIntentID).
            Str("reason", decision.RejectionReason).
            Msg("risk rejection emitted")
    } else {

        log.Info().
            Str("execution_intent_id", intent.ExecutionIntentID).
            Msg("risk approval emitted")
    }

    if err := kafka.PublishRiskDecision(
        ctx,
        decision,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("risk decision publish failed")

        return err
    }

    return nil
}
