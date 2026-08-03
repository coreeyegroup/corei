/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 07
 *
 * File        : domain-integration.ts
 * Purpose     : Domain Integration
 * =============================================================================
 */

import type {
    DomainProviderIntegration
} from "./domain-provider-integration";

import type {
    DomainCapabilityIntegration
} from "./domain-capability-integration";

import type {
    DomainServiceIntegration
} from "./domain-service-integration";

import type {
    DomainModuleIntegration
} from "./domain-module-integration";

import type {
    DomainEngineIntegration
} from "./domain-engine-integration";

export interface DomainIntegration {

    readonly provider:
        DomainProviderIntegration;

    readonly capability:
        DomainCapabilityIntegration;

    readonly service:
        DomainServiceIntegration;

    readonly module:
        DomainModuleIntegration;

    readonly engine:
        DomainEngineIntegration;

}
