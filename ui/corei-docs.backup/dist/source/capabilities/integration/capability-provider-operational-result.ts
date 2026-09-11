/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * File        : capability-provider-operational-result.ts
 * Purpose     : Capability Provider Operational Integration Result
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the explicit result of evaluating failure, health, and availability
 * for an already runtime-eligible capability-provider relationship.
 *
 * The result preserves every non-runtime-eligible upstream outcome unchanged.
 *
 * -----------------------------------------------------------------------------
 * STATUS OWNERSHIP
 * -----------------------------------------------------------------------------
 *
 * The statuses defined here are Phase-18 integration outcomes.
 *
 * They do not replace, duplicate, or extend:
 *
 * - capability-provider resolution status,
 * - provider lifecycle state,
 * - provider runtime state,
 * - Foundation health status,
 * - Service Platform availability,
 * - Platform Runtime health,
 * - Shell operational presentation status.
 *
 * -----------------------------------------------------------------------------
 * DETERMINISTIC PRECEDENCE
 * -----------------------------------------------------------------------------
 *
 * Operational evaluation follows this fixed order:
 *
 * 1. explicit failure,
 * 2. unknown health,
 * 3. unhealthy health,
 * 4. unavailability,
 * 5. operational eligibility.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderLifecycleIneligible,
    CapabilityProviderLifecycleUnresolved,
    CapabilityProviderNotFound

} from "./capability-provider-lifecycle-result";

import type {

    CapabilityProviderRuntimeIneligible

} from "./capability-provider-runtime-result";

import type {

    CapabilityProviderOperationalObservation

} from "./capability-provider-operational-observation";

/**
 * =============================================================================
 * UPSTREAM RESULT
 * =============================================================================
 *
 * Every result that has not reached runtime eligibility is preserved without
 * reinterpretation.
 *
 * =============================================================================
 */
export type CapabilityProviderOperationalUpstreamResult =

    | CapabilityProviderLifecycleUnresolved
    | CapabilityProviderNotFound
    | CapabilityProviderLifecycleIneligible
    | CapabilityProviderRuntimeIneligible;

/**
 * =============================================================================
 * PROVIDER FAILED
 * =============================================================================
 */
export interface CapabilityProviderFailed {

    readonly status:
        "provider_failed";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly observation:
        CapabilityProviderOperationalObservation;

}

/**
 * =============================================================================
 * PROVIDER HEALTH UNKNOWN
 * =============================================================================
 */
export interface CapabilityProviderHealthUnknown {

    readonly status:
        "provider_health_unknown";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly observation:
        CapabilityProviderOperationalObservation;

}

/**
 * =============================================================================
 * PROVIDER UNHEALTHY
 * =============================================================================
 */
export interface CapabilityProviderUnhealthy {

    readonly status:
        "provider_unhealthy";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly observation:
        CapabilityProviderOperationalObservation;

}

/**
 * =============================================================================
 * PROVIDER UNAVAILABLE
 * =============================================================================
 */
export interface CapabilityProviderUnavailable {

    readonly status:
        "provider_unavailable";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly observation:
        CapabilityProviderOperationalObservation;

}

/**
 * =============================================================================
 * OPERATIONALLY ELIGIBLE
 * =============================================================================
 *
 * HEALTHY and DEGRADED providers may reach this result when:
 *
 * - no explicit failure is present,
 * - the provider is available.
 *
 * DEGRADED health is preserved in the observation and is not silently promoted
 * to HEALTHY.
 *
 * =============================================================================
 */
export interface CapabilityProviderOperationalEligible {

    readonly status:
        "operational_eligible";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly observation:
        CapabilityProviderOperationalObservation;

}

/**
 * =============================================================================
 * COMPLETE OPERATIONAL INTEGRATION RESULT
 * =============================================================================
 */
export type CapabilityProviderOperationalResult =

    | CapabilityProviderOperationalUpstreamResult
    | CapabilityProviderFailed
    | CapabilityProviderHealthUnknown
    | CapabilityProviderUnhealthy
    | CapabilityProviderUnavailable
    | CapabilityProviderOperationalEligible;
