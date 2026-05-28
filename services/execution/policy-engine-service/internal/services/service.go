package services

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/policy-engine-service/internal/kafka"
    "corei/services/execution/policy-engine-service/internal/models"
    "corei/services/execution/policy-engine-service/internal/validation"
)

func ProcessRiskDecision(
    ctx context.Context,
    decision models.RiskDecision,
) error {

    if err := validation.ValidateRiskDecision(
        decision,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("risk approval validation failed")

        return err
    }

    policyDecision := EvaluatePolicy(decision)

    if !policyDecision.Approved {

        log.Warn().
            Str("execution_intent_id", decision.ExecutionIntentID).
            Str("reason", policyDecision.RejectionReason).
            Msg("policy rejection emitted")
    } else {

        log.Info().
            Str("execution_intent_id", decision.ExecutionIntentID).
            Msg("policy approval emitted")
    }

    if err := kafka.PublishPolicyDecision(
        ctx,
        policyDecision,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("policy decision publish failed")

        return err
    }

    return nil
}
