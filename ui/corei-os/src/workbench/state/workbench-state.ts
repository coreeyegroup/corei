/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25 / PHASE-17
 *
 * FILE:
 * workbench-state.ts
 *
 * PURPOSE:
 * Central Workbench State
 *
 * ACTIVITY MODEL:
 * Operator-priority institutional navigation.
 *
 * Existing state ownership is preserved.
 * Activity selection remains owned by Workbench State.
 * ============================================================================
 */

import { create } from "zustand";


/* ==========================================================================
 * ACTIVITY TYPE
 * ========================================================================== */

export type ActivityType =
    | "trading"
    | "infrastructure"
    | "risk"
    | "market"
    | "research"
    | "portfolio"
    | "corei-os"
    | "executive"
    | "compliance"
    | "ai";


/* ==========================================================================
 * WORKBENCH STATE
 * ========================================================================== */

export interface WorkbenchState {

    activity: ActivityType;

    workspace: string;

    sidebarVisible: boolean;

    rightVisible: boolean;

    bottomVisible: boolean;

    setActivity(
        activity: ActivityType
    ): void;

    setWorkspace(
        workspace: string
    ): void;

    toggleSidebar(): void;

    toggleRight(): void;

    toggleBottom(): void;

}


/* ==========================================================================
 * DEFAULT STATE
 * ========================================================================== */

export const useWorkbenchState =
    create<WorkbenchState>((set) => ({

        /*
         * Trading remains the primary operator entry point.
         */
        activity: "trading",

        workspace: "trading",

        sidebarVisible: true,

        rightVisible: true,

        bottomVisible: true,


        setActivity: (
            activity
        ) =>
            set({
                activity
            }),


        setWorkspace: (
            workspace
        ) =>
            set({
                workspace
            }),


        toggleSidebar: () =>
            set((state) => ({
                sidebarVisible:
                    !state.sidebarVisible
            })),


        toggleRight: () =>
            set((state) => ({
                rightVisible:
                    !state.rightVisible
            })),


        toggleBottom: () =>
            set((state) => ({
                bottomVisible:
                    !state.bottomVisible
            }))

    }));
