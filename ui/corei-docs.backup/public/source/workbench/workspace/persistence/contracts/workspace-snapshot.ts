/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-19.01
 *
 * FILE
 * workspace-snapshot.ts
 *
 * PURPOSE
 * Authoritative Workspace Snapshot Contract
 * ============================================================================
 */

import type {

    DockLayout

} from "../../../docking/contracts/dock-layout";

export interface WorkspaceSnapshot {

    /**
     * Workspace identifier.
     */
    workspaceId: string;

    /**
     * Layout dimensions.
     */
    layout: DockLayout;

    /**
     * Open panel identifiers.
     */
    openPanels: string[];

    /**
     * Active panel identifier.
     */
    activePanel?: string;

    /**
     * Schema version.
     */
    version: number;

    /**
     * Last updated timestamp.
     */
    updatedAt: number;

}
