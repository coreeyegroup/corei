/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 05
 *
 * File        : domain-dependency-manager.ts
 * Purpose     : Domain Dependency Manager
 * =============================================================================
 */

import {
    DomainDependencyRegistry,
    registerDomainDependency
} from "./domain-dependency-registry";

import type {
    DomainDependency
} from "./domain-dependency";

export class DomainDependencyManager {

    register(
        dependency: DomainDependency
    ): void {

        registerDomainDependency(
            dependency
        );

    }

    getAll():
    readonly DomainDependency[] {

        return DomainDependencyRegistry;

    }

}
