/**
 * ============================================================================
 * COREI Operating System
 * ----------------------------------------------------------------------------
 * Module      : Cognitive
 * Surface     : Top Consciousness
 * Component   : Ribbon Model
 * File         : ribbon.ts
 * ----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Defines the runtime model used by the Top Consciousness Ribbon.
 *
 * Contracts define architecture.
 *
 * Models define runtime objects.
 *
 * ============================================================================
 */

import type {
    RibbonContract,
    RibbonDensity,
    RibbonLayout,
    RibbonVisibility
} from "../contracts";

import type { ZoneModel } from "./zone";

/**
 * Runtime Ribbon model.
 */
export interface RibbonModel extends RibbonContract {

    /**
     * Current layout.
     */
    layout: RibbonLayout;

    /**
     * Current density.
     */
    density: RibbonDensity;

    /**
     * Current visibility.
     */
    visibility: RibbonVisibility;

    /**
     * Runtime zones.
     */
    zones: ZoneModel[];

}
