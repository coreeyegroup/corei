/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 05
 *
 * File        : platform-runtime-dependencies.ts
 * Purpose     : Platform Runtime Dependencies
 * =============================================================================
 */

import type {
    PlatformRuntimeDependency
} from "./platform-runtime-dependency";

export interface PlatformRuntimeDependencies {

    readonly dependencies:
        readonly PlatformRuntimeDependency[];

}
