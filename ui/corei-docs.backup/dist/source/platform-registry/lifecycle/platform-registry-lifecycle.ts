/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 02
 *
 * File        : platform-registry-lifecycle.ts
 * Purpose     : Platform Registry Lifecycle
 * =============================================================================
 */

import type {
    PlatformRegistryLifecycleStatus
} from "./platform-registry-lifecycle-status";

export interface PlatformRegistryLifecycle {

    readonly status:
        PlatformRegistryLifecycleStatus;

}
