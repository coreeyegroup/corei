/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 07
 *
 * File        : engine-integration-manager.ts
 * Purpose     : Engine Integration Manager
 * =============================================================================
 */

import {
    EngineIntegrationRegistry,
    registerEngineIntegration
} from "./engine-integration-registry";

import type {
    EngineIntegration
} from "./engine-integration";

export class EngineIntegrationManager {

    register(
        integration: EngineIntegration
    ): void {

        registerEngineIntegration(
            integration
        );

    }

    getAll():
    readonly EngineIntegration[] {

        return EngineIntegrationRegistry;

    }

}
