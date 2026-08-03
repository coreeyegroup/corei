/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-003
 * File       : bootstrap-context.ts
 * Purpose    : Bootstrap Composition Context
 * =============================================================================
 */

export interface BootstrapContext {

    readonly initialized: boolean;

}

export const DefaultBootstrapContext: BootstrapContext = {

    initialized: false

};
