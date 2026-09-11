/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-07
 *
 * FILE
 * dock-node.ts
 * ============================================================================
 */

export type DockDirection =

    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "tab";

export interface DockNode {

    id: string;

    panelId: string;

    direction: DockDirection;

    size: number;

    visible: boolean;

    parent?: string;

    group?: string;

}
