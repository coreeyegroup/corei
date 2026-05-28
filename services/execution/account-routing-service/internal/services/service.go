package services

import (
    "context"

    "github.com/rs/zerolog/log"

    "corei/services/execution/account-routing-service/internal/kafka"
    "corei/services/execution/account-routing-service/internal/models"
    "corei/services/execution/account-routing-service/internal/state"
    "corei/services/execution/account-routing-service/internal/validation"
)

func ProcessExecutionIntent(
    ctx context.Context,
    executionIntent models.ExecutionIntent,
) error {

    if err := validation.ValidateExecutionIntent(
        executionIntent,
    ); err != nil {

        log.Error().
            Err(err).
            Msg("execution intent validation failed")

        return err
    }

    accounts := state.LoadAccounts()

    eligibleAccounts := EligibleAccounts(accounts)

    log.Info().
        Int("eligible_accounts", len(eligibleAccounts)).
        Msg("eligible account set resolved")

    for _, account := range eligibleAccounts {

        perAccountIntent := BuildPerAccountIntent(
            executionIntent,
            account,
        )

        routingKey := BuildRoutingKey(
            executionIntent,
            account,
        )

        log.Info().
            Str("execution_intent_id", executionIntent.ExecutionIntentID).
            Str("per_account_intent_id", perAccountIntent.PerAccountIntentID).
            Str("routing_key", routingKey).
            Msg("per-account routing completed")

        if err := kafka.PublishPerAccountIntent(
            ctx,
            perAccountIntent,
        ); err != nil {

            log.Error().
                Err(err).
                Msg("per-account publish failed")

            return err
        }
    }

    return nil
}
