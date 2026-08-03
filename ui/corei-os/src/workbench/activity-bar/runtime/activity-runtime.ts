/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * activity-runtime.ts
 *
 * PURPOSE
 * Institutional Activity Runtime
 *
 * RESPONSIBILITIES
 * - Own Activity interaction
 * - Publish Activity Events
 * - Delegate state mutation
 * - Never modify React Components
 * - Never own Zustand state
 * ============================================================================
 */

import { eventBus } from "../../events";
import { workbenchStateManager } from "../../runtime/workbench-state-manager";
import type { ActivityType } from "../../state/workbench-state";
import { ActivityEvents } from "../events/activity-events";

class ActivityRuntime {

    private hovered: ActivityType | null = null;

    initialize(): void {

        //
        // Reserved
        //

    }

    dispose(): void {

        //
        // Reserved
        //

    }

    activate(

        activity: ActivityType

    ): void {

        const current =

            workbenchStateManager.getActivity();

        if (

            current === activity

        ) {

            return;

        }

        workbenchStateManager.setActivity(

            activity

        );

        eventBus.publish({

            type: ActivityEvents.SELECTED,

            payload: {

                activity

            }

        });

        eventBus.publish({

            type: ActivityEvents.CHANGED,

            payload: {

                activity

            }

        });

    }

    hover(

        activity: ActivityType | null

    ): void {

        this.hovered = activity;

        eventBus.publish({

            type:

                activity === null

                    ? ActivityEvents.LEFT

                    : ActivityEvents.HOVERED,

            payload: {

                activity

            }

        });

    }

    getActive(): ActivityType {

        return workbenchStateManager.getActivity();

    }

    getHovered(): ActivityType | null {

        return this.hovered;

    }

}

export const activityRuntime =

    new ActivityRuntime();
