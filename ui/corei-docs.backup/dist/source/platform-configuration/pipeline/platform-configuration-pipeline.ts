/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 08
 *
 * File        : platform-configuration-pipeline.ts
 * Purpose     : Platform Configuration Pipeline
 * =============================================================================
 */

import type {
    PlatformConfigurationPipelineContext
} from "./platform-configuration-pipeline-context";

export interface PlatformConfigurationPipeline {

    execute(
        context: PlatformConfigurationPipelineContext
    ): Promise<void>;

}
