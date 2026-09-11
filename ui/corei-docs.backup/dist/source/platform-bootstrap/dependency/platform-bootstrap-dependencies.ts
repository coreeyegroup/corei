/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 05
 *
 * File        : platform-bootstrap-dependencies.ts
 * Purpose     : Platform Bootstrap Dependencies
 * =============================================================================
 */

import type {
    PlatformBootstrapDependency
} from "./platform-bootstrap-dependency";

export interface PlatformBootstrapDependencies {

    readonly dependencies:
        readonly PlatformBootstrapDependency[];

}
