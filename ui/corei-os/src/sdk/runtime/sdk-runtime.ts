/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : sdk-runtime.ts
 * Purpose    : SDK Runtime
 * =============================================================================
 */

export interface SDKRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultSDKRuntime: SDKRuntime = {

    initialized: false,

    loaded: false

};
