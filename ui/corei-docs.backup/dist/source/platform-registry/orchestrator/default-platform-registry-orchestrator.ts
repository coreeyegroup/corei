/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 09
 *
 * File        : default-platform-registry-orchestrator.ts
 * Purpose     : Default Platform Registry Orchestrator
 * =============================================================================
 */

import type {
    PlatformRegistryStartupContext
} from "./platform-registry-startup-context";

import type {
    PlatformRegistryOrchestrator
} from "./platform-registry-orchestrator";

export class DefaultPlatformRegistryOrchestrator
implements PlatformRegistryOrchestrator {

    async orchestrate(
        _context: PlatformRegistryStartupContext
    ): Promise<void> {

        return;

    }

}
