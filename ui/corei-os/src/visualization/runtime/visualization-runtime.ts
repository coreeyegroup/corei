/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-013
 * File       : visualization-runtime.ts
 * Purpose    : Visualization Runtime
 * =============================================================================
 */

export interface VisualizationRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultVisualizationRuntime: VisualizationRuntime = {

    initialized: false,

    loaded: false

};
