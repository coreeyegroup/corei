/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 *
 * File        : capability-provider-integration-result.ts
 * Purpose     : Final Capability Provider Integration Composition Result
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the complete result surface exposed by the Phase-18 composed
 * capability-provider integration boundary.
 *
 * The contract preserves all certified Step-03 through Step-07 outcomes and
 * adds explicit composition outcomes when authoritative runtime or operational
 * observations are unavailable.
 *
 * -----------------------------------------------------------------------------
 * OWNERSHIP
 * -----------------------------------------------------------------------------
 *
 * provider_runtime_unobserved and provider_operational_unobserved are
 * Phase-18 composition outcomes.
 *
 * They are not Provider Platform lifecycle, runtime, health, or availability
 * states.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderOperationalResult

} from "./capability-provider-operational-result";

export interface CapabilityProviderRuntimeUnobserved {

    readonly status:
        "provider_runtime_unobserved";

    readonly capabilityId: string;

    readonly providerId: string;

}

export interface CapabilityProviderOperationalUnobserved {

    readonly status:
        "provider_operational_unobserved";

    readonly capabilityId: string;

    readonly providerId: string;

}

export type CapabilityProviderIntegrationResult =

    | CapabilityProviderOperationalResult
    | CapabilityProviderRuntimeUnobserved
    | CapabilityProviderOperationalUnobserved;
