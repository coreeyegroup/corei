/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 05
 *
 * File        : platform-registry-dependencies.ts
 * Purpose     : Platform Registry Dependencies
 * =============================================================================
 */

import type {
    PlatformRegistryDependency
} from "./platform-registry-dependency";

export interface PlatformRegistryDependencies {

    readonly dependencies:
        readonly PlatformRegistryDependency[];

}
