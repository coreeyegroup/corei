/**
 * ============================================================================
 * Workspace Layout
 * ============================================================================
 */

import type {

    WorkspacePanel

} from "../contracts/workspace-panel";

export interface WorkspaceLayout {

    id: string;

    name: string;

    panels: WorkspacePanel[];

}
