/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 *
 * File        : capability-provider-bindings.ts
 * Purpose     : Capability ↔ Provider Binding Collection
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the immutable collection type used to represent capability-to-provider
 * relationships across the Capability Provider Integration boundary.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderBinding

} from "./capability-provider-binding";

export type CapabilityProviderBindings =
    readonly CapabilityProviderBinding[];
