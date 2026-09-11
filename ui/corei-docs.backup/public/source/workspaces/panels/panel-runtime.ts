/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 *
 * Step        : 05
 *
 * File        : panel-runtime.ts
 * Purpose     : Panel Runtime
 * =============================================================================
 */

export interface PanelRuntime {

    readonly initialized: boolean;

}

export const DefaultPanelRuntime:
PanelRuntime = {

    initialized: false

};
