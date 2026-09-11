/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 03
 *
 * File        : default-engine-state.ts
 * Purpose     : Default Engine State
 * =============================================================================
 */

import type {
    EngineState
} from "./engine-state";

export const DefaultEngineState:
EngineState = {

    operationalStatus: "OFFLINE",

    healthStatus: "UNKNOWN"

};
