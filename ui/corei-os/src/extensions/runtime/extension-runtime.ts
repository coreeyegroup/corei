/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-014
 * File       : extension-runtime.ts
 * Purpose    : Extension Runtime
 * =============================================================================
 */

export interface ExtensionRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultExtensionRuntime: ExtensionRuntime = {

    initialized: false,

    loaded: false

};
