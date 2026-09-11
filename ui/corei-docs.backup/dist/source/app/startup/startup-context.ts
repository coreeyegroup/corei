/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-007
 * File       : startup-context.ts
 * Purpose    : Application Startup Context
 * =============================================================================
 */

export interface StartupContext {

    readonly initialized: boolean;

}

export const DefaultStartupContext: StartupContext = {

    initialized: false

};
