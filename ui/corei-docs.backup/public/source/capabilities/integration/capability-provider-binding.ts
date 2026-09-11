/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 *
 * File        : capability-provider-binding.ts
 * Purpose     : Capability ↔ Provider Binding Contract
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the deterministic relationship between an existing COREI capability
 * identity and an existing COREI provider identity.
 *
 * This contract represents integration metadata only.
 *
 * It does not:
 *
 * - own capability definitions,
 * - own provider definitions,
 * - resolve providers,
 * - initialize providers,
 * - dispose providers,
 * - load technology implementations,
 * - execute capability runtime behavior.
 *
 * =============================================================================
 */

export interface CapabilityProviderBinding {

    /**
     * Existing capability identity.
     */
    readonly capabilityId: string;

    /**
     * Existing provider identity.
     */
    readonly providerId: string;

    /**
     * Deterministic provider preference.
     *
     * Lower numeric values represent higher preference.
     */
    readonly priority: number;

    /**
     * Controls whether the binding participates in future
     * validation and resolution.
     */
    readonly enabled: boolean;

}
