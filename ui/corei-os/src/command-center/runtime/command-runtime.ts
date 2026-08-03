/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command-runtime.ts
 * Purpose    : Command Runtime
 * =============================================================================
 */

export interface CommandRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultCommandRuntime: CommandRuntime = {

    initialized: false,

    loaded: false

};
