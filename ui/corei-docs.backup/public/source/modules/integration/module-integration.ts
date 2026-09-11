/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 07
 *
 * File        : module-integration.ts
 * Purpose     : Module Integration
 * =============================================================================
 */

import type {
    ModuleProviderIntegration
} from "./module-provider-integration";

import type {
    ModuleCapabilityIntegration
} from "./module-capability-integration";

import type {
    ModuleServiceIntegration
} from "./module-service-integration";

export interface ModuleIntegration {

    readonly provider:
        ModuleProviderIntegration;

    readonly capability:
        ModuleCapabilityIntegration;

    readonly service:
        ModuleServiceIntegration;

}
