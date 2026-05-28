package services

import (
    "fmt"

    "corei/services/execution/policy-engine-service/internal/lineage"
    "corei/services/execution/policy-engine-service/internal/models"
)

func EvaluatePolicy(
    decision models.RiskDecision,
) models.PolicyDecision {

    approved := true
    rejectionReason := ""

    sessionAllowed := SessionAllowed()

    if !sessionAllowed {
        approved = false
        rejectionReason = "session closed"
    }

    rateAllowed := RateLimitAllowed(
        2,
        10,
    )

    if !rateAllowed {
        approved = false
        rejectionReason = "rate limit exceeded"
    }

    washTrade := WashTradeDetected(
        2,
        2,
    )

    if washTrade {
        approved = false
        rejectionReason = "wash trade detected"
    }

    policyHash := lineage.GenerateHash(
        fmt.Sprintf(
            "%s:%t:%s",
            decision.ExecutionIntentID,
            approved,
            rejectionReason,
        ),
    )

    lineageHash := lineage.GenerateHash(
        policyHash +
            decision.LineageHash,
    )

    return models.PolicyDecision{
        PolicyDecisionID: lineage.GenerateHash(
            decision.ExecutionIntentID +
                policyHash,
        ),
        ExecutionIntentID: decision.ExecutionIntentID,
        PolicyHash: policyHash,
        Approved: approved,
        RejectionReason: rejectionReason,
        LineageHash: lineageHash,
        TraceID: decision.TraceID,
    }
}
