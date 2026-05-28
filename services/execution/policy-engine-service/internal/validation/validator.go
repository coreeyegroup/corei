package validation

import (
    "errors"

    "corei/services/execution/policy-engine-service/internal/models"
)

func ValidateRiskDecision(
    decision models.RiskDecision,
) error {

    if decision.RiskDecisionID == "" {
        return errors.New("missing risk_decision_id")
    }

    if !decision.Approved {
        return errors.New("risk decision not approved")
    }

    return nil
}
