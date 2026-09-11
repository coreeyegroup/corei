/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 08
 *
 * File        : default-platform-configuration-pipeline.ts
 * Purpose     : Default Platform Configuration Pipeline
 * =============================================================================
 */

import type {
    PlatformConfigurationPipelineContext
} from "./platform-configuration-pipeline-context";

import type {
    PlatformConfigurationPipeline
} from "./platform-configuration-pipeline";

export class DefaultPlatformConfigurationPipeline
implements PlatformConfigurationPipeline {

    async execute(
        _context: PlatformConfigurationPipelineContext
    ): Promise<void> {

        return;

    }

}
