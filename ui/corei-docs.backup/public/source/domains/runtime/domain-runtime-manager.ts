/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 06
 *
 * File        : domain-runtime-manager.ts
 * Purpose     : Domain Runtime Manager
 * =============================================================================
 */

import {
    DomainRuntimeRegistry,
    registerDomainRuntime
} from "./domain-runtime-registry";

import type {
    DomainRuntime
} from "./domain-runtime";

export class DomainRuntimeManager {

    register(
        runtime: DomainRuntime
    ): void {

        registerDomainRuntime(
            runtime
        );

    }

    getAll():
    readonly DomainRuntime[] {

        return DomainRuntimeRegistry;

    }

}
