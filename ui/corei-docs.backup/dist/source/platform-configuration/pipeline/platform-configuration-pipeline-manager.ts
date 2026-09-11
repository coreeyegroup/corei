/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 08
 *
 * File        : platform-configuration-pipeline-manager.ts
 * Purpose     : Platform Configuration Pipeline Manager
 * =============================================================================
 */

import {
    PlatformConfigurationPipelineRegistry,
    registerPlatformConfigurationPipeline
} from "./platform-configuration-pipeline-registry";

import type {
    PlatformConfigurationPipeline
} from "./platform-configuration-pipeline";

export class PlatformConfigurationPipelineManager {

    register(
        pipeline: PlatformConfigurationPipeline
    ): void {

        registerPlatformConfigurationPipeline(
            pipeline
        );

    }

    getAll():
    readonly PlatformConfigurationPipeline[] {

        return PlatformConfigurationPipelineRegistry;

    }

}
