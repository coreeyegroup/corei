/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-010
 * File       : navigation-runtime.ts
 * Purpose    : Navigation Runtime
 * =============================================================================
 */

export interface NavigationRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultNavigationRuntime: NavigationRuntime = {

    initialized: false,

    loaded: false

};
