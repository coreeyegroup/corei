/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * File        : capability-provider-operational-integration.ts
 * Purpose     : Provider Failure, Health & Availability Integration
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Integrates an existing capability-provider runtime result with read-only
 * provider failure, Foundation health, and availability observations.
 *
 * The integration:
 *
 * 1. preserves every upstream non-runtime-eligible outcome,
 * 2. accepts only runtime-eligible providers for operational evaluation,
 * 3. evaluates explicit provider failure,
 * 4. evaluates authoritative Foundation health,
 * 5. evaluates current provider availability,
 * 6. classifies final operational eligibility.
 *
 * -----------------------------------------------------------------------------
 * DETERMINISTIC PRECEDENCE
 * -----------------------------------------------------------------------------
 *
 * The evaluation order is fixed:
 *
 * 1. preserve upstream result,
 * 2. explicit failure,
 * 3. UNKNOWN health,
 * 4. UNHEALTHY health,
 * 5. unavailable,
 * 6. operationally eligible.
 *
 * A DEGRADED provider remains operationally eligible when it has not failed
 * and remains available.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * This integration does not:
 *
 * - mutate provider state,
 * - mutate health state,
 * - create health telemetry,
 * - initialize providers,
 * - load providers,
 * - activate providers,
 * - deactivate providers,
 * - dispose providers,
 * - retry provider operations,
 * - recover providers,
 * - perform provider failover,
 * - select an alternate provider,
 * - instantiate provider technologies,
 * - execute capability behavior.
 *
 * =============================================================================
 */

import {

    HealthStatus

} from "../../foundation";

import type {

    CapabilityProviderRuntimeResult

} from "./capability-provider-runtime-result";

import type {

    CapabilityProviderOperationalObservation

} from "./capability-provider-operational-observation";

import type {

    CapabilityProviderOperationalResult

} from "./capability-provider-operational-result";

/**
 * =============================================================================
 * CAPABILITY PROVIDER OPERATIONAL INTEGRATION
 * =============================================================================
 *
 * Performs deterministic, read-only operational eligibility evaluation for an
 * already runtime-evaluated capability-provider relationship.
 *
 * =============================================================================
 */
export class CapabilityProviderOperationalIntegration {

    /**
     * Integrates runtime eligibility with failure, health, and availability
     * observations.
     */
    public evaluate(

        runtimeResult:
            CapabilityProviderRuntimeResult,

        observation:
            CapabilityProviderOperationalObservation

    ): CapabilityProviderOperationalResult {

        /**
         * ---------------------------------------------------------------------
         * 01 — PRESERVE UPSTREAM OUTCOMES
         * ---------------------------------------------------------------------
         *
         * Failure, health, and availability evaluation is only valid after the
         * provider has reached runtime eligibility.
         *
         * All earlier outcomes pass through unchanged.
         * ---------------------------------------------------------------------
         */
        if (
            runtimeResult.status !==
            "runtime_eligible"
        ) {

            return runtimeResult;

        }

        /**
         * ---------------------------------------------------------------------
         * 02 — EXPLICIT FAILURE
         * ---------------------------------------------------------------------
         *
         * Explicit failure has the highest operational precedence.
         * ---------------------------------------------------------------------
         */
        if (
            observation.failed
        ) {

            return {

                status:
                    "provider_failed",

                capabilityId:
                    runtimeResult.capabilityId,

                providerId:
                    runtimeResult.providerId,

                observation

            };

        }

        /**
         * ---------------------------------------------------------------------
         * 03 — UNKNOWN HEALTH
         * ---------------------------------------------------------------------
         *
         * Unknown operational health is not interpreted as healthy.
         * ---------------------------------------------------------------------
         */
        if (
            observation.health ===
            HealthStatus.UNKNOWN
        ) {

            return {

                status:
                    "provider_health_unknown",

                capabilityId:
                    runtimeResult.capabilityId,

                providerId:
                    runtimeResult.providerId,

                observation

            };

        }

        /**
         * ---------------------------------------------------------------------
         * 04 — UNHEALTHY
         * ---------------------------------------------------------------------
         *
         * An explicitly unhealthy provider is not operationally eligible.
         * ---------------------------------------------------------------------
         */
        if (
            observation.health ===
            HealthStatus.UNHEALTHY
        ) {

            return {

                status:
                    "provider_unhealthy",

                capabilityId:
                    runtimeResult.capabilityId,

                providerId:
                    runtimeResult.providerId,

                observation

            };

        }

        /**
         * ---------------------------------------------------------------------
         * 05 — AVAILABILITY
         * ---------------------------------------------------------------------
         *
         * HEALTHY or DEGRADED providers must still be available to participate.
         * ---------------------------------------------------------------------
         */
        if (
            !observation.available
        ) {

            return {

                status:
                    "provider_unavailable",

                capabilityId:
                    runtimeResult.capabilityId,

                providerId:
                    runtimeResult.providerId,

                observation

            };

        }

        /**
         * ---------------------------------------------------------------------
         * 06 — OPERATIONAL ELIGIBILITY
         * ---------------------------------------------------------------------
         *
         * HEALTHY and DEGRADED providers are operationally eligible when no
         * explicit failure exists and availability remains true.
         *
         * The original health observation is preserved.
         * ---------------------------------------------------------------------
         */
        return {

            status:
                "operational_eligible",

            capabilityId:
                runtimeResult.capabilityId,

            providerId:
                runtimeResult.providerId,

            observation

        };

    }

}
