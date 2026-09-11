/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 05
 *
 * File        : platform-configuration-dependencies.ts
 * Purpose     : Platform Configuration Dependencies
 * =============================================================================
 */

import type {
    PlatformConfigurationDependency
} from "./platform-configuration-dependency";

export interface PlatformConfigurationDependencies {

    readonly dependencies:
        readonly PlatformConfigurationDependency[];

}
