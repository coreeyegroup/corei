package services

import (
    "corei/services/execution/order-engine-service/internal/lineage"
)

func GenerateOrderHash(
    executionIntentID string,
    riskHash string,
    policyHash string,
) string {

    return lineage.GenerateHash(
        executionIntentID +
            riskHash +
            policyHash,
    )
}
