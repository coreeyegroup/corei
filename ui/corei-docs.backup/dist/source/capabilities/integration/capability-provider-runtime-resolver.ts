/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 *
 * File        : capability-provider-runtime-resolver.ts
 * Purpose     : Provider Runtime Observation Resolver Contract
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the composition boundary used to obtain an authoritative runtime
 * observation for a resolved provider.
 *
 * The resolver is intentionally abstract.
 *
 * Phase-18 does not own provider runtime storage and therefore must not invent
 * or synthesize provider runtime truth.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * Returning undefined means that no authoritative runtime observation is
 * currently available for the requested provider.
 *
 * This contract does not:
 *
 * - initialize providers,
 * - load providers,
 * - mutate runtime state,
 * - create runtime storage,
 * - perform network operations,
 * - execute provider technologies.
 *
 * =============================================================================
 */

import type {

    ProviderRuntime

} from "../../providers";

export interface CapabilityProviderRuntimeResolver {

    resolve(
        providerId: string
    ): ProviderRuntime | undefined;

}
