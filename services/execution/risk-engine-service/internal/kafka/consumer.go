package kafka

import (
    "context"

    "github.com/rs/zerolog/log"
)

func ConsumePerAccountIntents(
    ctx context.Context,
) {

    log.Info().
        Msg("per_account_intent consumer initialized")

    <-ctx.Done()

    log.Info().
        Msg("per_account_intent consumer shutdown")
}
