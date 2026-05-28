package state

import (
    "corei/services/execution/account-routing-service/internal/models"
)

func LoadAccounts() []models.Account {

    return []models.Account{
        {
            AccountID: "paper-alpha",
            AccountGroup: "paper",
            OperationMode: "PAPER",
            Enabled: true,
        },
        {
            AccountID: "paper-beta",
            AccountGroup: "paper",
            OperationMode: "PAPER",
            Enabled: true,
        },
        {
            AccountID: "disabled-test",
            AccountGroup: "disabled",
            OperationMode: "DISABLED",
            Enabled: false,
        },
    }
}
