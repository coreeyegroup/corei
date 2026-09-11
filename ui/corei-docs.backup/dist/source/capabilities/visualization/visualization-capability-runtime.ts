/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 07
 *
 * File        : visualization-capability-runtime.ts
 * Purpose     : Visualization Capability Runtime
 * =============================================================================
 */

export interface VisualizationCapabilityRuntime {

    readonly initialized: boolean;

}

export const DefaultVisualizationCapabilityRuntime:
VisualizationCapabilityRuntime = {

    initialized: false

};
