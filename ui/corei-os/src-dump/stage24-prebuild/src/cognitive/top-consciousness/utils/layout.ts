/**
 * ============================================================================
 * COREI Operating System
 * Ribbon Layout Utilities
 * ============================================================================
 */

import type { ZoneModel } from "../models";

export function sortRibbonZones(
    zones: ZoneModel[]
): ZoneModel[] {

    return [...zones].sort(
        (a, b) => a.order - b.order
    );

}
