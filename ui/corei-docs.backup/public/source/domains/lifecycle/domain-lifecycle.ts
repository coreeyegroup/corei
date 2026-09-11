/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 02
 *
 * File        : domain-lifecycle.ts
 * Purpose     : Domain Lifecycle
 * =============================================================================
 */

import type {
    DomainLifecycleStage
} from "./domain-lifecycle-stage";

export interface DomainLifecycle {

    readonly stage:
        DomainLifecycleStage;

}
