package kafka

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/policy-engine-service/internal/models"
)

func PublishPolicyDecision(
    ctx context.Context,
    decision models.PolicyDecision,
) error {

    log.Info().
        Str("policy_decision_id", decision.PolicyDecisionID).
        Bool("approved", decision.Approved).
        Msg("policy decision published")

    return nil
}
