/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-006
 * File       : sdk-context.ts
 * Purpose    : SDK Composition Context
 * =============================================================================
 */

export interface SDKCompositionContext {

    readonly initialized: boolean;

}

export const DefaultSDKCompositionContext: SDKCompositionContext = {

    initialized: false

};
