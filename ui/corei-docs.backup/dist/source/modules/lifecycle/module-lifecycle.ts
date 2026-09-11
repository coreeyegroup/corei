/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 02
 *
 * File        : module-lifecycle.ts
 * Purpose     : Module Lifecycle Contract
 * =============================================================================
 */

import type {
    ModuleLifecycleStage
} from "./module-lifecycle-stage";

export interface ModuleLifecycle {

    readonly stage: ModuleLifecycleStage;

}
