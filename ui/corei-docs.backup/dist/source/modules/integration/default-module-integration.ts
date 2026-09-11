/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 07
 *
 * File        : default-module-integration.ts
 * Purpose     : Default Module Integration
 * =============================================================================
 */

import type {
    ModuleIntegration
} from "./module-integration";

export const DefaultModuleIntegration:
ModuleIntegration = {

    provider: {

        providers: []

    },

    capability: {

        capabilities: []

    },

    service: {

        services: []

    }

};
