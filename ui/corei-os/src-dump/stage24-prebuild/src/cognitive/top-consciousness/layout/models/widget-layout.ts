/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Widget Layout Model
 * ============================================================================
 *
 * Computed layout description for a single widget.
 * This model is renderer-independent.
 * ============================================================================
 */

export interface WidgetLayoutModel {

    readonly id: string;

    readonly order: number;

    readonly visible: boolean;

    readonly width: number;

    readonly minWidth: number;

    readonly maxWidth: number;

    readonly x: number;

}
