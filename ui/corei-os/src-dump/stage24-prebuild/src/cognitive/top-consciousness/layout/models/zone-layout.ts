/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Zone Layout Model
 * ============================================================================
 */

import type { WidgetLayoutModel } from "./widget-layout";

export interface ZoneLayoutModel {

    readonly id: string;

    readonly order: number;

    readonly width: number;

    readonly start: number;

    readonly end: number;

    readonly widgets: readonly WidgetLayoutModel[];

}
