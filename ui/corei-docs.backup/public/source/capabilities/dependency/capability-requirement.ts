/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 04
 *
 * File        : capability-requirement.ts
 * Purpose     : Capability Runtime Requirement
 * =============================================================================
 */

export interface CapabilityRequirement {

    readonly providerIds: readonly string[];

    readonly optionalProviderIds: readonly string[];

}
