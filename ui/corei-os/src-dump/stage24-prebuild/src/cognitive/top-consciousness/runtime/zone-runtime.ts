/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Zone Runtime
 * ============================================================================
 */

import type { WidgetRuntime } from "./widget-runtime";

export interface ZoneRuntime {

    readonly zoneId: string;

    readonly widgets: readonly WidgetRuntime[];

    readonly health:
        | "healthy"
        | "warning"
        | "critical";

    readonly lastUpdated: Date;

}
