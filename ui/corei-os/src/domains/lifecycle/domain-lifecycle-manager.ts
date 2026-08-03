/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 02
 *
 * File        : domain-lifecycle-manager.ts
 * Purpose     : Domain Lifecycle Manager
 * =============================================================================
 */

import {
    DomainLifecycleRegistry,
    registerDomainLifecycle
} from "./domain-lifecycle-registry";

import type {
    DomainLifecycle
} from "./domain-lifecycle";

export class DomainLifecycleManager {

    register(
        lifecycle: DomainLifecycle
    ): void {

        registerDomainLifecycle(
            lifecycle
        );

    }

    getAll():
    readonly DomainLifecycle[] {

        return DomainLifecycleRegistry;

    }

}
