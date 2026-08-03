/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-005
 * File       : platform-context.ts
 * Purpose    : Platform Composition Context
 * =============================================================================
 */

export interface PlatformCompositionContext {

    readonly initialized: boolean;

}

export const DefaultPlatformCompositionContext: PlatformCompositionContext = {

    initialized: false

};
