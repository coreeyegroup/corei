/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * activity-service.ts
 *
 * PURPOSE
 * Activity Runtime Service
 * ============================================================================
 */

import type { ActivityType } from "../../state/workbench-state";

import {

    activityRuntime

} from "../runtime/activity-runtime";

class ActivityService {

    activate(

        activity: ActivityType

    ): void {

        activityRuntime.activate(

            activity

        );

    }

    hover(

        activity: ActivityType | null

    ): void {

        activityRuntime.hover(

            activity

        );

    }

    active(): ActivityType {

        return activityRuntime.getActive();

    }

    hovered(): ActivityType | null {

        return activityRuntime.getHovered();

    }

}

export const activityService =

    new ActivityService();
