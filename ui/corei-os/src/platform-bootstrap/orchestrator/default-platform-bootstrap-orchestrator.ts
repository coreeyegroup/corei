/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 09
 *
 * File        : default-platform-bootstrap-orchestrator.ts
 * Purpose     : Default Platform Bootstrap Orchestrator
 * =============================================================================
 */

import type {
    PlatformBootstrapStartupContext
} from "./platform-bootstrap-startup-context";

import type {
    PlatformBootstrapOrchestrator
} from "./platform-bootstrap-orchestrator";

export class DefaultPlatformBootstrapOrchestrator
implements PlatformBootstrapOrchestrator {

    async orchestrate(
        _context: PlatformBootstrapStartupContext
    ): Promise<void> {

        return;

    }

}
