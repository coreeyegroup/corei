/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 09
 *
 * File        : default-platform-configuration-orchestrator.ts
 * Purpose     : Default Platform Configuration Orchestrator
 * =============================================================================
 */

import type {
    PlatformConfigurationStartupContext
} from "./platform-configuration-startup-context";

import type {
    PlatformConfigurationOrchestrator
} from "./platform-configuration-orchestrator";

export class DefaultPlatformConfigurationOrchestrator
implements PlatformConfigurationOrchestrator {

    async start(
        _context: PlatformConfigurationStartupContext
    ): Promise<void> {

        return;

    }

}
