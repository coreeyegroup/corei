/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 08
 *
 * File        : default-platform-registry-pipeline.ts
 * Purpose     : Default Platform Registry Pipeline
 * =============================================================================
 */

import type {
    PlatformRegistryPipelineContext
} from "./platform-registry-pipeline-context";

import type {
    PlatformRegistryPipeline
} from "./platform-registry-pipeline";

export class DefaultPlatformRegistryPipeline
implements PlatformRegistryPipeline {

    async execute(
        _context: PlatformRegistryPipelineContext
    ): Promise<void> {

        return;

    }

}
