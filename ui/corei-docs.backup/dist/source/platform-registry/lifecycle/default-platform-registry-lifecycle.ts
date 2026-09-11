/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 02
 *
 * File        : default-platform-registry-lifecycle.ts
 * Purpose     : Default Platform Registry Lifecycle
 * =============================================================================
 */

import {
    PlatformRegistryLifecycleStatus
} from "./platform-registry-lifecycle-status";

import type {
    PlatformRegistryLifecycle
} from "./platform-registry-lifecycle";

export const DefaultPlatformRegistryLifecycle:
PlatformRegistryLifecycle = {

    status:
        PlatformRegistryLifecycleStatus.CREATED

};
