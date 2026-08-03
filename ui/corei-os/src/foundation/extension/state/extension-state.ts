/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.01
 *
 * File        : extension-state.ts
 * Purpose     : Platform Extension lifecycle.
 * =============================================================================
 */

export enum ExtensionState {

    REGISTERED = "REGISTERED",

    LOADED = "LOADED",

    INITIALIZED = "INITIALIZED",

    ACTIVE = "ACTIVE",

    INACTIVE = "INACTIVE",

    UNLOADED = "UNLOADED"

}
