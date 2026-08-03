/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * activity-state.ts
 *
 * PURPOSE
 * Activity Runtime State
 * ============================================================================
 */

import { create } from "zustand";

import type {

    ActivityType

} from "../../state/workbench-state";

export interface ActivityRuntimeState {

    hovered: ActivityType | null;

    setHovered(

        activity: ActivityType | null

    ): void;

}

export const useActivityRuntimeState =

create<ActivityRuntimeState>((set) => ({

    hovered: null,

    setHovered: (

        hovered

    ) =>

        set({

            hovered

        })

}));
