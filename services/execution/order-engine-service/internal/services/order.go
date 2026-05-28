package services

import (
    "corei/services/execution/order-engine-service/internal/lineage"
    "corei/services/execution/order-engine-service/internal/models"
)

func BuildExecutionOrder(
    intent models.SizedExecutionIntent,
) models.ExecutionOrder {

    orderHash := GenerateOrderHash(
        intent.ExecutionIntentID,
        intent.RiskHash,
        intent.PolicyHash,
    )

    lineageHash := lineage.GenerateHash(
        orderHash +
            intent.LineageHash,
    )

    orderID := lineage.GenerateHash(
        intent.ExecutionIntentID +
            orderHash,
    )

    return models.ExecutionOrder{
        ExecutionOrderID: orderID,
        ExecutionIntentID: intent.ExecutionIntentID,
        RequestedQuantity: intent.ApprovedQuantity,
        ApprovedQuantity: intent.ApprovedQuantity,
        OrderState: StateNew,
        BrokerRoute: ResolveBrokerRoute(),
        OrderHash: orderHash,
        LineageHash: lineageHash,
        TraceID: intent.TraceID,
    }
}
