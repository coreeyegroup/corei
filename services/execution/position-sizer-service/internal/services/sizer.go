package services

import (
    "fmt"

    "corei/services/execution/position-sizer-service/internal/lineage"
    "corei/services/execution/position-sizer-service/internal/models"
)

func CalculatePositionSize(
    decision models.PolicyDecision,
) models.SizedExecutionIntent {

    equity := int64(100000)
    riskPct := int64(100)
    stopPips := int64(50)
    pipValue := int64(10)

    numerator := SafeMultiply(
        equity,
        riskPct,
    )

    denominator := stopPips * pipValue

    quantity := numerator / denominator

    quantity = ApplyBrokerConstraints(quantity)

    atr := ATRValue()

    accountScale := int64(1)

    sizeHash := lineage.GenerateHash(
        fmt.Sprintf(
            "%s:%d",
            decision.ExecutionIntentID,
            quantity,
        ),
    )

    lineageHash := lineage.GenerateHash(
        sizeHash +
            decision.LineageHash,
    )

    return models.SizedExecutionIntent{
        SizedIntentID: lineage.GenerateHash(
            decision.ExecutionIntentID +
                sizeHash,
        ),
        ExecutionIntentID: decision.ExecutionIntentID,
        ApprovedQuantity: quantity,
        RiskPercentage: riskPct,
        ATRValue: atr,
        AccountScale: accountScale,
        SizeHash: sizeHash,
        LineageHash: lineageHash,
        TraceID: decision.TraceID,
    }
}
