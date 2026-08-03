/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 * Build Unit  : 08.07
 *
 * Module      : system-runtime
 * Layer       : Runtime
 *
 * Responsibility:
 * Central system orchestration entry interface
 *
 * Architecture Role:
 * External → Integration Engine
 *
 * Dependencies:
 * - All subsystem adapters
 *
 * State Model:
 * Event-driven | deterministic | immutable propagation
 * =============================================================================
 */

import { NavigationAdapter } from "../adapters/navigation-adapter";
import { WorkspaceAdapter } from "../adapters/workspace-adapter";
import { RibbonAdapter } from "../adapters/ribbon-adapter";

export class SystemRuntime {

    static navigationChange(id: string) {
        return NavigationAdapter.onChange(id);
    }

    static workspaceSwitch(id: string) {
        return WorkspaceAdapter.onSwitch(id);
    }

    static ribbonUpdate(ctx: any) {
        return RibbonAdapter.onUpdate(ctx);
    }

}
