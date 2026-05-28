package services

import (
    "fmt"

    "corei/services/execution/execution-intent-service/internal/lineage"
    "corei/services/execution/execution-intent-service/internal/models"
)

func NormalizeTradeIntent(
    intent models.TradeIntent,
) models.ExecutionIntent {

    executionID := lineage.GenerateHash(
        intent.TradeIntentID +
            intent.StrategyID +
            intent.InstrumentID,
    )

    lineageHash := lineage.GenerateHash(
        executionID +
            intent.TraceID,
    )

    return models.ExecutionIntent{
        ExecutionIntentID: executionID,
        TradeIntentID: intent.TradeIntentID,
        StrategyID: intent.StrategyID,
        InstrumentID: intent.InstrumentID,
        Side: intent.Side,
        RequestedPrice: intent.RequestedPrice,
        StopPrice: intent.StopPrice,
        TargetPrice: intent.TargetPrice,
        SignalStrength: intent.SignalStrength,
        RiskPercentage: intent.RiskPercentage,
        ExecutionType: determineExecutionType(intent),
        AccountRoutingKey: buildRoutingKey(intent),
        OriginType: classifyOrigin(intent),
        LineageHash: lineageHash,
        TraceID: intent.TraceID,
    }
}

func determineExecutionType(
    intent models.TradeIntent,
) string {

    if intent.RequestedPrice == 0 {
        return "MARKET"
    }

    return "LIMIT"
}

func buildRoutingKey(
    intent models.TradeIntent,
) string {

    return fmt.Sprintf(
        "%s:%s",
        intent.StrategyID,
        intent.InstrumentID,
    )
}

func classifyOrigin(
    intent models.TradeIntent,
) string {

    if intent.OriginType == "EXTERNAL" {
        return "EXTERNAL"
    }

    return "CORE"
}
