/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 03
 *
 * File        : ui-provider-lifecycle.ts
 * Purpose     : UI Provider Lifecycle
 * =============================================================================
 */

export type UIProviderState =
    | "REGISTERED"
    | "INITIALIZED"
    | "ACTIVE"
    | "INACTIVE";

export interface UIProviderLifecycle {

    readonly state: UIProviderState;

    readonly initialized: boolean;

    readonly activated: boolean;

}

export const DefaultUIProviderLifecycle: UIProviderLifecycle = {

    state: "REGISTERED",

    initialized: false,

    activated: false

};
