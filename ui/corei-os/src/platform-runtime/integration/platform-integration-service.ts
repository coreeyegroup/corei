/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 07
 *
 * File        : platform-integration-service.ts
 * Purpose     : Platform Integration Service
 * =============================================================================
 */

import type {
    PlatformIntegration
} from "./platform-integration";

export interface PlatformIntegrationService {

    integrate(
        integration: PlatformIntegration
    ): Promise<void>;

}
