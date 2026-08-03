/**
 * ============================================================================
 * COREI Operating System
 * ----------------------------------------------------------------------------
 * Module      : Cognitive
 * Surface     : Top Consciousness
 * Component   : Widget Contract
 * ============================================================================
 */

export type WidgetVisibility =
    | "visible"
    | "hidden"
    | "collapsed";

export type WidgetPriority =
    | "critical"
    | "high"
    | "normal"
    | "low";

export type WidgetInteraction =
    | "none"
    | "click"
    | "menu"
    | "command";

export type WidgetStatus =
    | "normal"
    | "success"
    | "warning"
    | "critical";

export interface WidgetContract {

    readonly id: string;

    readonly name: string;

    readonly description: string;

    /**
     * Small identifier shown above the value.
     * Example:
     * ENV
     * ROLE
     * MODE
     */
    readonly label: string;

    /**
     * Primary runtime value.
     * Example:
     * Production
     * Administrator
     * Replay
     */
    readonly value: string;

    /**
     * Optional secondary information.
     */
    readonly subtitle?: string;

    /**
     * Runtime health.
     */
    readonly status: WidgetStatus;

    readonly priority: WidgetPriority;

    readonly visibility: WidgetVisibility;

    readonly interaction: WidgetInteraction;

    readonly enabled: boolean;

}
