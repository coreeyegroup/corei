/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 08
 *
 * File        : platform-bootstrap-pipeline.ts
 * Purpose     : Platform Bootstrap Pipeline
 * =============================================================================
 */

import type {
    PlatformBootstrapPipelineContext
} from "./platform-bootstrap-pipeline-context";

export interface PlatformBootstrapPipeline {

    execute(
        context: PlatformBootstrapPipelineContext
    ): Promise<void>;

}
