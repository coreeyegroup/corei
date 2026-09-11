/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-06
 *
 * FILE
 * dock-layout.ts
 * ============================================================================
 */

export interface DockLayout {

    leftWidth: number;

    rightWidth: number;

    bottomHeight: number;

}

export const DEFAULT_DOCK_LAYOUT: DockLayout = {

    leftWidth: 220,

    rightWidth: 220,

    bottomHeight: 220

};
