/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 *
 * File        : capability-provider-operational-observation-resolver.ts
 * Purpose     : Provider Operational Observation Resolver Contract
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the composition boundary used to obtain authoritative failure,
 * health, and availability observations for a resolved provider.
 *
 * Phase-18 does not own live provider telemetry and therefore must not
 * fabricate operational observations.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * Returning undefined means that no authoritative operational observation is
 * currently available for the requested provider.
 *
 * This contract does not:
 *
 * - poll provider health,
 * - create telemetry,
 * - mutate provider state,
 * - retry provider operations,
 * - recover providers,
 * - perform failover,
 * - execute provider technologies.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderOperationalObservation

} from "./capability-provider-operational-observation";

export interface CapabilityProviderOperationalObservationResolver {

    resolve(
        providerId: string
    ): CapabilityProviderOperationalObservation | undefined;

}
