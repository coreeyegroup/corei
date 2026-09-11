/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 02
 *
 * File        : default-platform-configuration-lifecycle.ts
 * Purpose     : Default Platform Configuration Lifecycle
 * =============================================================================
 */

import {
    PlatformConfigurationLifecycleStatus
} from "./platform-configuration-lifecycle-status";

import type {
    PlatformConfigurationLifecycle
} from "./platform-configuration-lifecycle";

export const DefaultPlatformConfigurationLifecycle:
PlatformConfigurationLifecycle = {

    status:
        PlatformConfigurationLifecycleStatus.CREATED

};
