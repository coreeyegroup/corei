package kafka

import (
    "context"

    "github.com/rs/zerolog/log"
)

func ConsumeTradeIntents(
    ctx context.Context,
) {

    log.Info().
        Msg("trade_intent consumer initialized")

    <-ctx.Done()

    log.Info().
        Msg("trade_intent consumer shutdown")
}
