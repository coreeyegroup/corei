/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 09
 *
 * File        : platform-configuration-orchestrator.ts
 * Purpose     : Platform Configuration Orchestrator
 * =============================================================================
 */

import type {
    PlatformConfigurationStartupContext
} from "./platform-configuration-startup-context";

export interface PlatformConfigurationOrchestrator {

    start(
        context: PlatformConfigurationStartupContext
    ): Promise<void>;

}
