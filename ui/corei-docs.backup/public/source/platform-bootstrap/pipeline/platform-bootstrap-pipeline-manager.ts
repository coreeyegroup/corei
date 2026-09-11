/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 08
 *
 * File        : platform-bootstrap-pipeline-manager.ts
 * Purpose     : Platform Bootstrap Pipeline Manager
 * =============================================================================
 */

import {
    PlatformBootstrapPipelineRegistry,
    registerPlatformBootstrapPipeline
} from "./platform-bootstrap-pipeline-registry";

import type {
    PlatformBootstrapPipeline
} from "./platform-bootstrap-pipeline";

export class PlatformBootstrapPipelineManager {

    register(
        pipeline: PlatformBootstrapPipeline
    ): void {

        registerPlatformBootstrapPipeline(
            pipeline
        );

    }

    getAll():
    readonly PlatformBootstrapPipeline[] {

        return PlatformBootstrapPipelineRegistry;

    }

}
