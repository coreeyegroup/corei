/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 08
 *
 * File        : platform-registry-pipeline-manager.ts
 * Purpose     : Platform Registry Pipeline Manager
 * =============================================================================
 */

import {

    PlatformRegistryPipelineRegistry,

    registerPlatformRegistryPipeline

} from "./platform-registry-pipeline-registry";

import type {

    PlatformRegistryPipeline

} from "./platform-registry-pipeline";

export class PlatformRegistryPipelineManager {

    register(
        pipeline: PlatformRegistryPipeline
    ): void {

        registerPlatformRegistryPipeline(
            pipeline
        );

    }

    getAll():
    readonly PlatformRegistryPipeline[] {

        return PlatformRegistryPipelineRegistry;

    }

}
