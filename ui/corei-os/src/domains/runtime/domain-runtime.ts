/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 06
 *
 * File        : domain-runtime.ts
 * Purpose     : Domain Runtime
 * =============================================================================
 */

import type {
    DomainRuntimeContext
} from "./domain-runtime-context";

export interface DomainRuntime {

    readonly context:
        DomainRuntimeContext;

}
