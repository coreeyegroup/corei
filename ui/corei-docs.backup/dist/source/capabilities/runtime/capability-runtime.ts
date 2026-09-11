/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 01
 * =============================================================================
 */

export interface CapabilityRuntime {

    readonly initialized: boolean;

}

export const DefaultCapabilityRuntime: CapabilityRuntime = {

    initialized: false

};
