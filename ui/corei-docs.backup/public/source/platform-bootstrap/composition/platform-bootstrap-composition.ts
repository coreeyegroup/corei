/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 04
 *
 * File        : platform-bootstrap-composition.ts
 * Purpose     : Platform Bootstrap Composition
 * =============================================================================
 */

import type {
    PlatformBootstrapComponent
} from "./platform-bootstrap-component";

export interface PlatformBootstrapComposition {

    readonly components:
        readonly PlatformBootstrapComponent[];

}
