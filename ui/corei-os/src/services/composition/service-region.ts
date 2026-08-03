/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 04
 *
 * File        : service-region.ts
 * Purpose     : Service Region
 * =============================================================================
 */

import type { ServiceArea } from "./service-area";

export interface ServiceRegion {

    readonly id: string;

    readonly area: ServiceArea;

    readonly name: string;

}
