/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 08
 *
 * File        : default-platform-bootstrap-pipeline.ts
 * Purpose     : Default Platform Bootstrap Pipeline
 * =============================================================================
 */

import type {
    PlatformBootstrapPipeline
} from "./platform-bootstrap-pipeline";

import type {
    PlatformBootstrapPipelineContext
} from "./platform-bootstrap-pipeline-context";

export class DefaultPlatformBootstrapPipeline
implements PlatformBootstrapPipeline {

    async execute(
        _context: PlatformBootstrapPipelineContext
    ): Promise<void> {

        return;

    }

}
