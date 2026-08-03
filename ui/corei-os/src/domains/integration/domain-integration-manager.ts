/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 07
 *
 * File        : domain-integration-manager.ts
 * Purpose     : Domain Integration Manager
 * =============================================================================
 */

import {
    DomainIntegrationRegistry,
    registerDomainIntegration
} from "./domain-integration-registry";

import type {
    DomainIntegration
} from "./domain-integration";

export class DomainIntegrationManager {

    register(
        integration: DomainIntegration
    ): void {

        registerDomainIntegration(
            integration
        );

    }

    getAll():
    readonly DomainIntegration[] {

        return DomainIntegrationRegistry;

    }

}
