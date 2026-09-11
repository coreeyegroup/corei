/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 04.01
 *
 * File        : capability-provider.ts
 * Purpose     : Base contract implemented by all capability providers.
 * =============================================================================
 */

export interface CapabilityProvider {

    readonly id: string;

    initialize(): void;

    dispose(): void;

}
