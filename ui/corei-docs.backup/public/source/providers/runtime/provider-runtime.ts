/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 01
 *
 * File        : provider-runtime.ts
 * Purpose     : Provider Runtime
 * =============================================================================
 */

export interface ProviderRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultProviderRuntime: ProviderRuntime = {

    initialized: false,

    loaded: false

};
