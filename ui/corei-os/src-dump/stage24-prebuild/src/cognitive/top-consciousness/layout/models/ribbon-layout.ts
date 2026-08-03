/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Ribbon Layout Model
 * ============================================================================
 */

import type { ZoneLayoutModel } from "./zone-layout";

export interface RibbonLayoutModel {

    readonly width: number;

    readonly height: number;

    readonly zones: readonly ZoneLayoutModel[];

}
