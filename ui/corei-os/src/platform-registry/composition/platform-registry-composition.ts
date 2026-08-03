/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 04
 *
 * File        : platform-registry-composition.ts
 * Purpose     : Platform Registry Composition
 * =============================================================================
 */

import type {
    PlatformRegistryComponent
} from "./platform-registry-component";

export interface PlatformRegistryComposition {

    readonly components:
        readonly PlatformRegistryComponent[];

}
