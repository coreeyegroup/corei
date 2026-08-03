/**
 * ============================================================================
 * COREI Operating System
 * ----------------------------------------------------------------------------
 * Module      : Cognitive
 * Surface     : Top Consciousness
 * Component   : Ribbon Contract
 * File         : ribbon-contract.ts
 * ----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Defines the public architectural contract for the Top Consciousness Ribbon.
 *
 * The Ribbon is the visual implementation of the Top Consciousness cognitive
 * surface. It provides global operational awareness and institutional context
 * to the operator.
 *
 * This file contains ONLY architectural contracts.
 * It must never contain rendering logic or business logic.
 *
 * Ownership
 * ---------
 * Repository : ui/corei-os
 * Layer      : Cognitive Framework
 *
 * Depends On
 * ----------
 * Zone Contract
 *
 * Used By
 * -------
 * Ribbon Provider
 * Ribbon State
 * Ribbon Components
 * Infrastructure Experience
 *
 * ============================================================================
 */

import type { ZoneContract } from "./zone-contract";

/**
 * Supported ribbon density modes.
 */
export type RibbonDensity =
    | "compact"
    | "comfortable"
    | "expanded";

/**
 * Supported ribbon layout modes.
 */
export type RibbonLayout =
    | "fixed"
    | "fluid";

/**
 * Ribbon runtime visibility.
 */
export type RibbonVisibility =
    | "visible"
    | "hidden"
    | "collapsed";

/**
 * Public contract for every Top Consciousness Ribbon implementation.
 */
export interface RibbonContract {

    /**
     * Unique ribbon identifier.
     */
    readonly id: string;

    /**
     * Display name.
     */
    readonly name: string;

    /**
     * Human readable description.
     */
    readonly description: string;

    /**
     * Ribbon layout strategy.
     */
    readonly layout: RibbonLayout;

    /**
     * Display density.
     */
    readonly density: RibbonDensity;

    /**
     * Runtime visibility.
     */
    readonly visibility: RibbonVisibility;

    /**
     * Ribbon zones.
     */
    readonly zones: readonly ZoneContract[];

}
