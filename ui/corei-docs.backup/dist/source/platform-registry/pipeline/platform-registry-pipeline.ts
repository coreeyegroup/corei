/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 08
 *
 * File        : platform-registry-pipeline.ts
 * Purpose     : Platform Registry Pipeline
 * =============================================================================
 */

import type {
    PlatformRegistryPipelineContext
} from "./platform-registry-pipeline-context";

export interface PlatformRegistryPipeline {

    execute(
        context: PlatformRegistryPipelineContext
    ): Promise<void>;

}
