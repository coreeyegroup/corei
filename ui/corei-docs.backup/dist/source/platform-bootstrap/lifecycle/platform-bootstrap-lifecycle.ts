/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 02
 *
 * File        : platform-bootstrap-lifecycle.ts
 * Purpose     : Platform Bootstrap Lifecycle
 * =============================================================================
 */

import type {
    PlatformBootstrapLifecycleStatus
} from "./platform-bootstrap-lifecycle-status";

export interface PlatformBootstrapLifecycle {

    readonly status:
        PlatformBootstrapLifecycleStatus;

}
