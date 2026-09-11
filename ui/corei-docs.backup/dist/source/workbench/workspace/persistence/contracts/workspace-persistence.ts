/**
 * ============================================================================
 * Workspace Persistence Contract
 * ============================================================================
 */

import type {

    DockLayout

} from "../../../docking/contracts/dock-layout";

export interface WorkspacePersistence {

    workspace: string;

    layout: DockLayout;

    timestamp: number;

}
