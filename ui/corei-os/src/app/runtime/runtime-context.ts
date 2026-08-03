/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-004
 * File       : runtime-context.ts
 * Purpose    : Runtime Composition Context
 * =============================================================================
 */

export interface RuntimeCompositionContext {

    readonly initialized: boolean;

}

export const DefaultRuntimeCompositionContext: RuntimeCompositionContext = {

    initialized: false

};
