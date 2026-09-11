/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 07
 *
 * File        : engine-integration.ts
 * Purpose     : Engine Integration
 * =============================================================================
 */

import type {
    EngineProviderIntegration
} from "./engine-provider-integration";

import type {
    EngineCapabilityIntegration
} from "./engine-capability-integration";

import type {
    EngineServiceIntegration
} from "./engine-service-integration";

import type {
    EngineModuleIntegration
} from "./engine-module-integration";

export interface EngineIntegration {

    readonly provider:
        EngineProviderIntegration;

    readonly capability:
        EngineCapabilityIntegration;

    readonly service:
        EngineServiceIntegration;

    readonly module:
        EngineModuleIntegration;

}
