/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Ribbon Runtime
 * ============================================================================
 */

import type { ZoneRuntime } from "./zone-runtime";

export interface RibbonRuntime {

    readonly experience: string;

    readonly mode:
        | "booting"
        | "ready"
        | "maintenance"
        | "replay";

    readonly version: string;

    readonly health:
        | "healthy"
        | "warning"
        | "critical";

    readonly zones: readonly ZoneRuntime[];

    readonly lastUpdated: Date;

}