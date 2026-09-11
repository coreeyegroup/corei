/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 09
 *
 * File        : platform-registry-orchestrator.ts
 * Purpose     : Platform Registry Orchestrator
 * =============================================================================
 */

import type {
    PlatformRegistryStartupContext
} from "./platform-registry-startup-context";

export interface PlatformRegistryOrchestrator {

    orchestrate(
        context: PlatformRegistryStartupContext
    ): Promise<void>;

}
