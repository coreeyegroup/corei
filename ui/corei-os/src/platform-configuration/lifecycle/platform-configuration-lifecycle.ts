/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 02
 *
 * File        : platform-configuration-lifecycle.ts
 * Purpose     : Platform Configuration Lifecycle
 * =============================================================================
 */

import type {
    PlatformConfigurationLifecycleStatus
} from "./platform-configuration-lifecycle-status";

export interface PlatformConfigurationLifecycle {

    readonly status:
        PlatformConfigurationLifecycleStatus;

}
