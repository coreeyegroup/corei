/**
 * =============================================================================
 * COREI
 * Institutional Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 01
 * Build Unit  : 01.13
 *
 * File        : platform-foundation-context.ts
 * Purpose     : Generic Platform Foundation Context
 * =============================================================================
 */

import type { RegistryManager } from "../registry";
import type { StateManager } from "../state";
import type { EventManager } from "../event";
import type { ExtensionManager } from "../extension";
import type { LoggingManager } from "../logging";
import type { DiagnosticsManager } from "../diagnostics";
import type { HealthManager } from "../health";

export interface PlatformFoundationContext<
    TRegistry,
    TState,
    TEvent
> {

    readonly registry: RegistryManager<TRegistry>;

    readonly state: StateManager<TState>;

    readonly event: EventManager<TEvent>;

    readonly extension: ExtensionManager;

    readonly logging: LoggingManager;

    readonly diagnostics: DiagnosticsManager;

    readonly health: HealthManager;

}
