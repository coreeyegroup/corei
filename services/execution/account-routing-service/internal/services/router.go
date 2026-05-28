package services

import (
    "fmt"

    "corei/services/execution/account-routing-service/internal/lineage"
    "corei/services/execution/account-routing-service/internal/models"
)

func BuildPerAccountIntent(
    intent models.ExecutionIntent,
    account models.Account,
) models.PerAccountIntent {

    perAccountID := lineage.GenerateHash(
        intent.ExecutionIntentID +
            account.AccountID,
    )

    lineageHash := lineage.GenerateHash(
        perAccountID +
            intent.LineageHash,
    )

    return models.PerAccountIntent{
        PerAccountIntentID: perAccountID,
        ExecutionIntentID: intent.ExecutionIntentID,
        AccountID: account.AccountID,
        AccountGroup: account.AccountGroup,
        OperationMode: account.OperationMode,
        InstrumentID: intent.InstrumentID,
        Side: intent.Side,
        RequestedPrice: intent.RequestedPrice,
        StopPrice: intent.StopPrice,
        TargetPrice: intent.TargetPrice,
        LineageHash: lineageHash,
        TraceID: intent.TraceID,
    }
}

func EligibleAccounts(
    accounts []models.Account,
) []models.Account {

    eligible := []models.Account{}

    for _, account := range accounts {

        if !account.Enabled {
            continue
        }

        if account.OperationMode == "DISABLED" {
            continue
        }

        eligible = append(eligible, account)
    }

    return eligible
}

func BuildRoutingKey(
    intent models.ExecutionIntent,
    account models.Account,
) string {

    return fmt.Sprintf(
        "%s:%s:%s",
        account.AccountGroup,
        account.OperationMode,
        intent.InstrumentID,
    )
}
