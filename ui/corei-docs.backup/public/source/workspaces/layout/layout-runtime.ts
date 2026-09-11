/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 06
 *
 * File        : layout-runtime.ts
 * Purpose     : Layout Runtime
 * =============================================================================
 */

export interface LayoutRuntime {

    readonly initialized: boolean;

}

export const DefaultLayoutRuntime:
LayoutRuntime = {

    initialized: false

};
