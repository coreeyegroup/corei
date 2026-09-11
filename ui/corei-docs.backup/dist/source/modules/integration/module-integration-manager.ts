/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 07
 *
 * File        : module-integration-manager.ts
 * Purpose     : Module Integration Manager
 * =============================================================================
 */

import {
    ModuleIntegrationRegistry
} from "./module-integration-registry";

import type {
    ModuleIntegration
} from "./module-integration";

export class ModuleIntegrationManager {

    register(
        integration: ModuleIntegration
    ): void {

        (ModuleIntegrationRegistry as ModuleIntegration[])
            .push(integration);

    }

    getAll():
    readonly ModuleIntegration[] {

        return ModuleIntegrationRegistry;

    }

}
