package kafka

import (
    "context"

    "github.com/rs/zerolog/log"
)

func ConsumePolicyApprovals(
    ctx context.Context,
) {

    log.Info().
        Msg("policy approval consumer initialized")

    <-ctx.Done()

    log.Info().
        Msg("policy approval consumer shutdown")
}
