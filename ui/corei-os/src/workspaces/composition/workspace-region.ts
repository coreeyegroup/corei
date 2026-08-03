/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 04
 *
 * File        : workspace-region.ts
 * Purpose     : Workspace Region
 * =============================================================================
 */

import type { WorkspaceArea } from "./workspace-area";

export interface WorkspaceRegion {

    readonly id: string;

    readonly area: WorkspaceArea;

}
