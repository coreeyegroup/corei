/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 04
 *
 * File        : application-composition.ts
 * Purpose     : Application Composition
 * =============================================================================
 */

import type {
    ApplicationRegion
} from "./application-region";

import type {
    ApplicationComponentBinding
} from "./application-component-binding";

export interface ApplicationComposition {

    readonly regions:
        readonly ApplicationRegion[];

    readonly componentBindings:
        readonly ApplicationComponentBinding[];

}
