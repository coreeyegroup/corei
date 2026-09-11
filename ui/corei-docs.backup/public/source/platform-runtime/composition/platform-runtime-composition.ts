/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 04
 *
 * File        : platform-runtime-composition.ts
 * Purpose     : Platform Runtime Composition
 * =============================================================================
 */

import type {
    PlatformRuntimeComponent
} from "./platform-runtime-component";

export interface PlatformRuntimeComposition {

    readonly components:
        readonly PlatformRuntimeComponent[];

}
