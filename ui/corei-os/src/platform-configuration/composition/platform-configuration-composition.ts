/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 04
 *
 * File        : platform-configuration-composition.ts
 * Purpose     : Platform Configuration Composition
 * =============================================================================
 */

import type {
    PlatformConfigurationComponent
} from "./platform-configuration-component";

export interface PlatformConfigurationComposition {

    readonly components:
        readonly PlatformConfigurationComponent[];

}
