/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 02
 *
 * File        : default-platform-bootstrap-lifecycle.ts
 * Purpose     : Default Platform Bootstrap Lifecycle
 * =============================================================================
 */

import {
    PlatformBootstrapLifecycleStatus
} from "./platform-bootstrap-lifecycle-status";

import type {
    PlatformBootstrapLifecycle
} from "./platform-bootstrap-lifecycle";

export const DefaultPlatformBootstrapLifecycle:
PlatformBootstrapLifecycle = {

    status: PlatformBootstrapLifecycleStatus.CREATED

};
