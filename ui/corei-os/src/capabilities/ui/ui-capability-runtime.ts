/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 05
 *
 * File        : ui-capability-runtime.ts
 * Purpose     : UI Capability Runtime
 * =============================================================================
 */

export interface UICapabilityRuntime {

    readonly initialized: boolean;

}

export const DefaultUICapabilityRuntime: UICapabilityRuntime = {

    initialized: false

};
