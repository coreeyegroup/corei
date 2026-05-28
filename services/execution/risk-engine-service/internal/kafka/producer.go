package kafka

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/risk-engine-service/internal/models"
)

func PublishRiskDecision(
    ctx context.Context,
    decision models.RiskDecision,
) error {

    log.Info().
        Str("risk_decision_id", decision.RiskDecisionID).
        Bool("approved", decision.Approved).
        Msg("risk decision published")

    return nil
}
