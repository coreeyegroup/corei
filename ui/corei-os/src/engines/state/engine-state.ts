/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 03
 *
 * File        : engine-state.ts
 * Purpose     : Engine State
 * =============================================================================
 */

import type {
    EngineOperationalStatus
} from "./engine-operational-status";

import type {
    EngineHealthStatus
} from "./engine-health-status";

export interface EngineState {

    readonly operationalStatus:
        EngineOperationalStatus;

    readonly healthStatus:
        EngineHealthStatus;

}
