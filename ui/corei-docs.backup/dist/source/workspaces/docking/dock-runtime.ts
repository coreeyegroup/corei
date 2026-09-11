/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 07
 *
 * File        : dock-runtime.ts
 * Purpose     : Dock Runtime
 * =============================================================================
 */

export interface DockRuntime {

    readonly initialized: boolean;

}

export const DefaultDockRuntime:
DockRuntime = {

    initialized: false

};
