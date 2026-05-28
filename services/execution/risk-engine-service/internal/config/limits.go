package config

import (
    "corei/services/execution/risk-engine-service/internal/models"
)

func LoadRiskLimits(
    originType string,
) models.RiskLimits {

    if originType == "EXTERNAL" {

        return models.RiskLimits{
            MaxRiskPerTradePct:      50,
            MaxDailyLossPct:         100,
            MaxDrawdownPct:          150,
            MaxOpenPositions:        2,
            MaxMarginUtilizationPct: 250,
        }
    }

    return models.RiskLimits{
        MaxRiskPerTradePct:      100,
        MaxDailyLossPct:         300,
        MaxDrawdownPct:          500,
        MaxOpenPositions:        5,
        MaxMarginUtilizationPct: 500,
    }
}
