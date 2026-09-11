/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 04
 *
 * File        : application-region.ts
 * Purpose     : Application Region
 * =============================================================================
 */

import type {
    ApplicationArea
} from "./application-area";

export interface ApplicationRegion {

    readonly id: string;

    readonly area: ApplicationArea;

}
