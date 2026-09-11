/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 04
 *
 * File        : service-composition.ts
 * Purpose     : Service Composition
 * =============================================================================
 */

import type { ServiceRegion } from "./service-region";
import type { ServiceComponentBinding } from "./service-component-binding";

export interface ServiceComposition {

    readonly regions: readonly ServiceRegion[];

    readonly componentBindings:
        readonly ServiceComponentBinding[];

}
