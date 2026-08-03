/**
 * ============================================================================
 * COREI Operating System
 * ----------------------------------------------------------------------------
 * Module      : Cognitive
 * Surface     : Top Consciousness
 * Component   : Zone State
 * File         : zone-state.ts
 * ----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Maintains runtime state for every Ribbon Zone.
 *
 * ============================================================================
 */

import type { ZoneModel } from "../models";

export interface ZoneState {

    /**
     * Active runtime zones.
     */
    zones: ZoneModel[];

    /**
     * Active zone identifier.
     */
    activeZoneId: string | null;

}
