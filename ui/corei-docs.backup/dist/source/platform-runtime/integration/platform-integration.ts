/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 07
 *
 * File        : platform-integration.ts
 * Purpose     : Platform Integration
 * =============================================================================
 */

import type {
    PlatformIntegrationEndpoint
} from "./platform-integration-endpoint";

export interface PlatformIntegration {

    readonly endpoints:
        readonly PlatformIntegrationEndpoint[];

}
