/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 * Build Unit  : 08.04
 *
 * Module      : workspace-adapter
 * Layer       : Adapter
 *
 * Responsibility:
 * Converts workspace state transitions into system events
 *
 * Architecture Role:
 * Workspace → Event Stream
 *
 * Dependencies:
 * - Integration Engine
 *
 * State Model:
 * Event-driven | deterministic | immutable propagation
 * =============================================================================
 */

import { IntegrationEngine } from "../engine/integration-engine";

export class WorkspaceAdapter {

    static onSwitch(workspaceId: string) {

        return IntegrationEngine.dispatch(
            "WORKSPACE_SWITCH",
            "WORKSPACE",
            { workspaceId }
        );

    }

}
