/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 *
 * File        : capability-provider-runtime-result.ts
 * Purpose     : Capability Provider Runtime Integration Result
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the explicit outcome of integrating an already evaluated
 * capability-provider lifecycle result with the existing Provider Platform
 * runtime contract.
 *
 * These statuses are integration outcomes.
 *
 * They do not replace:
 *
 * - capability-provider resolution status,
 * - provider lifecycle state,
 * - provider runtime state.
 *
 * =============================================================================
 */

import type {

    ProviderRuntime

} from "../../providers";

import type {

    CapabilityProviderLifecycleIneligible,
    CapabilityProviderLifecycleUnresolved,
    CapabilityProviderNotFound

} from "./capability-provider-lifecycle-result";

export type CapabilityProviderRuntimeUpstreamResult =

    | CapabilityProviderLifecycleUnresolved
    | CapabilityProviderNotFound
    | CapabilityProviderLifecycleIneligible;

export interface CapabilityProviderRuntimeIneligible {

    readonly status:
        "runtime_ineligible";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly runtime: ProviderRuntime;

}

export interface CapabilityProviderRuntimeEligible {

    readonly status:
        "runtime_eligible";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly runtime: ProviderRuntime;

}

export type CapabilityProviderRuntimeResult =

    | CapabilityProviderRuntimeUpstreamResult
    | CapabilityProviderRuntimeIneligible
    | CapabilityProviderRuntimeEligible;
