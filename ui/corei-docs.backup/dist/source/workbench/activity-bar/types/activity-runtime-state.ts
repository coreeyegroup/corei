/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * activity-runtime-state.ts
 * ============================================================================
 */

import type { ActivityType } from "../../state/workbench-state";

export interface ActivityRuntimeState {

    active: ActivityType;

    hovered: ActivityType | null;

}
