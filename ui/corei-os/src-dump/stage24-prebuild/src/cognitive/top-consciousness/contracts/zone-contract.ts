/**
 * ============================================================================
 * COREI Operating System
 * ----------------------------------------------------------------------------
 * Module      : Cognitive
 * Surface     : Top Consciousness
 * Component   : Zone Contract
 * File         : zone-contract.ts
 * ----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Defines the architectural contract for a Top Consciousness Ribbon Zone.
 *
 * A Zone is a logical area within the Ribbon responsible for presenting a
 * coherent group of operational information.
 *
 * The Zone owns widgets.
 *
 * It does NOT own rendering logic.
 *
 * ============================================================================
 */

import type { WidgetContract } from "./widget-contract";

/**
 * Horizontal alignment inside the ribbon.
 */
export type ZoneAlignment =
    | "left"
    | "center"
    | "right";

/**
 * Runtime visibility.
 */
export type ZoneVisibility =
    | "visible"
    | "hidden"
    | "collapsed";

/**
 * Importance ordering.
 */
export type ZonePriority =
    | "critical"
    | "high"
    | "normal"
    | "low";

/**
 * Public contract implemented by every Ribbon Zone.
 */
export interface ZoneContract {

    /**
     * Unique identifier.
     */
    readonly id: string;

    /**
     * Display name.
     */
    readonly name: string;

    /**
     * Description.
     */
    readonly description: string;

    /**
     * Position order inside the ribbon.
     */
    readonly order: number;

    /**
     * Horizontal alignment.
     */
    readonly alignment: ZoneAlignment;

    /**
     * Runtime priority.
     */
    readonly priority: ZonePriority;

    /**
     * Runtime visibility.
     */
    readonly visibility: ZoneVisibility;

    /**
     * Widgets owned by this zone.
     */
    readonly widgets: readonly WidgetContract[];

}
