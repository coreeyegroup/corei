/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 07
 *
 * File        : platform-integration-manager.ts
 * Purpose     : Platform Integration Manager
 * =============================================================================
 */

import {
    PlatformIntegrationRegistry,
    registerPlatformIntegration
} from "./platform-integration-registry";

import type {
    PlatformIntegration
} from "./platform-integration";

export class PlatformIntegrationManager {

    register(
        integration: PlatformIntegration
    ): void {

        registerPlatformIntegration(
            integration
        );

    }

    getAll():
    readonly PlatformIntegration[] {

        return PlatformIntegrationRegistry;

    }

}
