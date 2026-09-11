/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 *
 * File        : capability-provider-resolution.ts
 * Purpose     : Capability Provider Resolution Result Model
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the explicit outcome of deterministic capability-to-provider
 * resolution.
 *
 * Resolution returns provider identity and binding metadata only.
 *
 * It does not:
 *
 * - instantiate a provider,
 * - initialize a provider,
 * - activate a provider,
 * - dispose a provider,
 * - execute a technology adapter,
 * - evaluate provider health,
 * - perform runtime failover.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderBinding

} from "./capability-provider-binding";

/**
 * Successful deterministic provider resolution.
 */
export interface ResolvedCapabilityProvider {

    readonly status: "resolved";

    readonly capabilityId: string;

    readonly providerId: string;

    readonly binding: CapabilityProviderBinding;

}

/**
 * Explicit absence of an eligible provider binding.
 */
export interface UnresolvedCapabilityProvider {

    readonly status: "unresolved";

    readonly capabilityId: string;

}

/**
 * Complete provider-resolution result.
 */
export type CapabilityProviderResolution =

    | ResolvedCapabilityProvider
    | UnresolvedCapabilityProvider;
