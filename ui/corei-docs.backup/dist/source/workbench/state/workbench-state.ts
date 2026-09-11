/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-11
 *
 * FILE
 * workbench-state.ts
 *
 * PURPOSE
 * Central Workbench State
 * ============================================================================
 */

import { create } from "zustand";

export type ActivityType =
    | "trading"
    | "infrastructure"
    | "research"
    | "risk"
    | "ai";

export interface WorkbenchState {

    activity: ActivityType;

    workspace: string;

    sidebarVisible: boolean;

    rightVisible: boolean;

    bottomVisible: boolean;

    setActivity(activity: ActivityType): void;

    setWorkspace(workspace: string): void;

    toggleSidebar(): void;

    toggleRight(): void;

    toggleBottom(): void;

}

export const useWorkbenchState = create<WorkbenchState>((set) => ({

    activity: "trading",

    workspace: "trading",

    sidebarVisible: true,

    rightVisible: true,

    bottomVisible: true,

    setActivity: (activity) =>
        set({ activity }),

    setWorkspace: (workspace) =>
        set({ workspace }),

    toggleSidebar: () =>
        set((state) => ({
            sidebarVisible: !state.sidebarVisible
        })),

    toggleRight: () =>
        set((state) => ({
            rightVisible: !state.rightVisible
        })),

    toggleBottom: () =>
        set((state) => ({
            bottomVisible: !state.bottomVisible
        }))

}));
