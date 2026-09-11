/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 01
 *
 * File        : domain-manager.ts
 * Purpose     : Domain Manager
 * =============================================================================
 */

import {
    DomainRegistry,
    registerDomain
} from "../registry/domain-registry";

import type {
    Domain
} from "../contracts/domain";

export class DomainManager {

    register(
        domain: Domain
    ): void {

        registerDomain(
            domain
        );

    }

    getAll():
    readonly Domain[] {

        return DomainRegistry;

    }

}
