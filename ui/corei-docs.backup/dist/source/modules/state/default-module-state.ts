/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 03
 *
 * File        : default-module-state.ts
 * Purpose     : Default Module State
 * =============================================================================
 */

import type {
    ModuleState
} from "./module-state";

export const DefaultModuleState:
ModuleState = {

    operationalStatus: "UNKNOWN",

    healthStatus: "UNKNOWN",

    available: false,

    synchronized: false

};
