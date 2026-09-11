/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 09
 *
 * File        : platform-bootstrap-startup-plan.ts
 * Purpose     : Platform Bootstrap Startup Plan
 * =============================================================================
 */

import type {
    PlatformBootstrapPipelineStage
} from "../pipeline";

export interface PlatformBootstrapStartupPlan {

    readonly stages:
        readonly PlatformBootstrapPipelineStage[];

}
