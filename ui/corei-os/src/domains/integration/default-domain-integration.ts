/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 07
 *
 * File        : default-domain-integration.ts
 * Purpose     : Default Domain Integration
 * =============================================================================
 */

import type {
    DomainIntegration
} from "./domain-integration";

export const DefaultDomainIntegration:
DomainIntegration = {

    provider: {
        providers: []
    },

    capability: {
        capabilities: []
    },

    service: {
        services: []
    },

    module: {
        modules: []
    },

    engine: {
        engines: []
    }

};
