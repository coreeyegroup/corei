package kafka

import (
    "context"

    "github.com/rs/zerolog/log"
)

func ConsumeRiskApprovals(
    ctx context.Context,
) {

    log.Info().
        Msg("risk approval consumer initialized")

    <-ctx.Done()

    log.Info().
        Msg("risk approval consumer shutdown")
}
