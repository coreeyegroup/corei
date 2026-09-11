/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-08
 *
 * FILE
 * workbench-service.ts
 *
 * PURPOSE
 * Central Workbench Service
 * ============================================================================
 */

import {

    panelRegistry,

    commandRegistry,

    activityRegistry,

    layoutRegistry

} from "../registries";

export const workbenchService = {

    panels: panelRegistry,

    commands: commandRegistry,

    activities: activityRegistry,

    layouts: layoutRegistry

};
