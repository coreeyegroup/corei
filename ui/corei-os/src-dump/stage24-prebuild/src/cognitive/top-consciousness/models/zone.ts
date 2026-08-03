/**
 * ============================================================================
 * COREI Operating System
 * Module      : Top Consciousness
 * Component   : Zone Model
 * File         : zone.ts
 * ============================================================================
 *
 * Runtime model for a Ribbon Zone.
 */

import type {
    ZoneAlignment,
    ZoneContract,
    ZonePriority,
    ZoneVisibility
} from "../contracts";

import type { WidgetModel } from "./widget";

export interface ZoneModel extends ZoneContract {

    alignment: ZoneAlignment;

    priority: ZonePriority;

    visibility: ZoneVisibility;

    widgets: WidgetModel[];

}
