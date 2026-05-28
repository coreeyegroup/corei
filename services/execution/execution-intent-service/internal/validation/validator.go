package validation

import (
    "errors"

    "corei/services/execution/execution-intent-service/internal/models"
)

func ValidateTradeIntent(intent models.TradeIntent) error {

    if intent.TradeIntentID == "" {
        return errors.New("missing trade_intent_id")
    }

    if intent.InstrumentID == "" {
        return errors.New("missing instrument_id")
    }

    if intent.Side != "BUY" && intent.Side != "SELL" {
        return errors.New("invalid side")
    }

    return nil
}
