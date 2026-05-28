package kafka

import (
    "context"

    "github.com/rs/zerolog/log"
)

func ConsumeExecutionIntents(
    ctx context.Context,
) {

    log.Info().
        Msg("execution_intent consumer initialized")

    <-ctx.Done()

    log.Info().
        Msg("execution_intent consumer shutdown")
}
