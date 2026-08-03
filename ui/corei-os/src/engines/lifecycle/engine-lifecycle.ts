/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 02
 *
 * File        : engine-lifecycle.ts
 * Purpose     : Engine Lifecycle
 * =============================================================================
 */

import type {
    EngineLifecycleStage
} from "./engine-lifecycle-stage";

export interface EngineLifecycle {

    readonly stage:
        EngineLifecycleStage;

}
