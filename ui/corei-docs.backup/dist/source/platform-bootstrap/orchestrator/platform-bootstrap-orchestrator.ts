/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 09
 *
 * File        : platform-bootstrap-orchestrator.ts
 * Purpose     : Platform Bootstrap Orchestrator
 * =============================================================================
 */

import type {
    PlatformBootstrapStartupContext
} from "./platform-bootstrap-startup-context";

export interface PlatformBootstrapOrchestrator {

    orchestrate(
        context: PlatformBootstrapStartupContext
    ): Promise<void>;

}
