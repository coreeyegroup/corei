/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Widget Runtime
 * ============================================================================
 */

export type WidgetRuntimeStatus =
    | "normal"
    | "success"
    | "warning"
    | "critical";

export interface WidgetRuntime {

    readonly widgetId: string;

    readonly value: string;

    readonly subtitle?: string;

    readonly badge?: string;

    readonly status: WidgetRuntimeStatus;

    readonly visible: boolean;

    readonly lastUpdated: Date;

}
