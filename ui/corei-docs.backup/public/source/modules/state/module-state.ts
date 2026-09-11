/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 03
 *
 * File        : module-state.ts
 * Purpose     : Module State
 * =============================================================================
 */

import type {
    ModuleOperationalStatus
} from "./module-operational-status";

import type {
    ModuleHealthStatus
} from "./module-health-status";

export interface ModuleState {

    readonly operationalStatus:
        ModuleOperationalStatus;

    readonly healthStatus:
        ModuleHealthStatus;

    readonly available: boolean;

    readonly synchronized: boolean;

}
