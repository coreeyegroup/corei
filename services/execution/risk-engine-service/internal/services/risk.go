package services

import (
    "fmt"

    "corei/services/execution/risk-engine-service/internal/config"
    "corei/services/execution/risk-engine-service/internal/lineage"
    "corei/services/execution/risk-engine-service/internal/models"
)

func EvaluateRisk(
    intent models.PerAccountIntent,
) models.RiskDecision {

    limits := config.LoadRiskLimits(intent.OriginType)

    approved := true
    rejectionReason := ""

    simulatedDailyLoss := int64(50)
    simulatedDrawdown := int64(100)
    simulatedMargin := int64(200)
    simulatedOpenPositions := int64(1)

    if simulatedDailyLoss > limits.MaxDailyLossPct {
        approved = false
        rejectionReason = "daily loss threshold breached"
    }

    if simulatedDrawdown > limits.MaxDrawdownPct {
        approved = false
        rejectionReason = "drawdown threshold breached"
    }

    if simulatedMargin > limits.MaxMarginUtilizationPct {
        approved = false
        rejectionReason = "margin threshold breached"
    }

    if simulatedOpenPositions > limits.MaxOpenPositions {
        approved = false
        rejectionReason = "max open positions breached"
    }

    killSwitch := KillSwitchTriggered(
        simulatedDailyLoss,
        limits.MaxDailyLossPct,
    )

    riskHash := lineage.GenerateHash(
        fmt.Sprintf(
            "%s:%t:%s",
            intent.PerAccountIntentID,
            approved,
            rejectionReason,
        ),
    )

    lineageHash := lineage.GenerateHash(
        riskHash +
            intent.LineageHash,
    )

    return models.RiskDecision{
        RiskDecisionID: lineage.GenerateHash(
            intent.PerAccountIntentID +
                riskHash,
        ),
        ExecutionIntentID: intent.ExecutionIntentID,
        RiskHash: riskHash,
        Approved: approved,
        RejectionReason: rejectionReason,
        KillSwitchActive: killSwitch,
        LineageHash: lineageHash,
        TraceID: intent.TraceID,
    }
}
