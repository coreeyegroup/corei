/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 *
 * File        : capability-provider-lifecycle-result.ts
 * Purpose     : Capability Provider Lifecycle Integration Result
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the explicit outcome of integrating a capability-provider resolution
 * with the existing Provider Platform lifecycle contract.
 *
 * These statuses are integration outcomes.
 *
 * They do not replace, duplicate, or extend UIProviderState.
 *
 * =============================================================================
 */

import type {

    UIProviderLifecycle,
    UIProviderModel

} from "../../providers";

export interface CapabilityProviderLifecycleUnresolved {

    readonly status:
        "capability_unresolved";

    readonly capabilityId: string;

}

export interface CapabilityProviderNotFound {

    readonly status:
        "provider_not_found";

    readonly capabilityId: string;

    readonly providerId: string;

}

export interface CapabilityProviderLifecycleIneligible {

    readonly status:
        "lifecycle_ineligible";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly provider: UIProviderModel;

    readonly lifecycle: UIProviderLifecycle;

}

export interface CapabilityProviderLifecycleEligible {

    readonly status:
        "lifecycle_eligible";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly provider: UIProviderModel;

    readonly lifecycle: UIProviderLifecycle;

}

export type CapabilityProviderLifecycleResult =

    | CapabilityProviderLifecycleUnresolved
    | CapabilityProviderNotFound
    | CapabilityProviderLifecycleIneligible
    | CapabilityProviderLifecycleEligible;
