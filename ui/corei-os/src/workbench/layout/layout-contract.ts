/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-18
 *
 * FILE
 * layout-contract.ts
 *
 * PURPOSE
 * Layout Definition Contract
 * ============================================================================
 */

export type SplitDirection =

    | "right"

    | "below";

export interface LayoutNode {

    panel: string;

    reference?: string;

    direction?: SplitDirection;

}

export interface LayoutDefinition {

    id: string;

    title: string;

    workspace: string;

    nodes: LayoutNode[];

}
