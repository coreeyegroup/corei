/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : runtime-engine.ts
 * Purpose    : Institutional Runtime Engine
 * =============================================================================
 */

export interface RuntimeEngine {

    readonly initialized: boolean;

    readonly running: boolean;

}

export const DefaultRuntimeEngine: RuntimeEngine = {

    initialized: false,

    running: false

};
