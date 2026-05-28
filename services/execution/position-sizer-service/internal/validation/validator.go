package validation

import (
    "errors"

    "corei/services/execution/position-sizer-service/internal/models"
)

func ValidatePolicyDecision(
    decision models.PolicyDecision,
) error {

    if decision.PolicyDecisionID == "" {
        return errors.New("missing policy_decision_id")
    }

    if !decision.Approved {
        return errors.New("policy decision not approved")
    }

    return nil
}
