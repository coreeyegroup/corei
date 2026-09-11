/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 04
 *
 * File        : workspace-composition.ts
 * Purpose     : Workspace Composition
 * =============================================================================
 */

import type {
    WorkspaceRegion
} from "./workspace-region";

import type {
    WorkspaceCapabilityBinding
} from "./workspace-capability-binding";

export interface WorkspaceComposition {

    readonly id: string;

    readonly regions: readonly WorkspaceRegion[];

    readonly capabilities:
    readonly WorkspaceCapabilityBinding[];

}
