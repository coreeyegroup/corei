/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 08
 *
 * File        : productivity-capability-runtime.ts
 * Purpose     : Productivity Capability Runtime
 * =============================================================================
 */

export interface ProductivityCapabilityRuntime {

    readonly initialized: boolean;

}

export const DefaultProductivityCapabilityRuntime:
ProductivityCapabilityRuntime = {

    initialized: false

};
