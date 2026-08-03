/**
 * ============================================================================
 * STAGE-25
 * STEP-03
 *
 * Workspace Composition Contract
 * ============================================================================
 */

import type {

    PanelLocation

} from "../../panels/metadata";

export interface WorkspacePanelComposition {

    panelId: string;

    location: PanelLocation;

}

export interface WorkspaceComposition {

    id: string;

    title: string;

    panels: WorkspacePanelComposition[];

}
