/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness - Widget View Contract
 * ============================================================================
 *
 * Pure presentation contract (NOT data, NOT layout).
 */

export interface WidgetViewModel {

    identity: string;      // ENV, ROLE, CLUSTER

    label: string;         // Environment

    value: string;         // Production

    status: string;        // Healthy

    priority: "low" | "normal" | "high" | "critical";

    tooltip?: string;

    visible: boolean;

    enabled: boolean;

    lastUpdated?: string;
}
