/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-008
 * File       : dock-runtime.ts
 * Purpose    : Dock Runtime
 * =============================================================================
 */

export interface DockRuntime {

    readonly initialized: boolean;

}

export const DefaultDockRuntime: DockRuntime = {

    initialized: false

};
