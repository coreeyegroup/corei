package kafka

import (
    "context"

    "github.com/rs/zerolog/log"
)

func ConsumeSizedIntents(
    ctx context.Context,
) {

    log.Info().
        Msg("sized intent consumer initialized")

    <-ctx.Done()

    log.Info().
        Msg("sized intent consumer shutdown")
}
