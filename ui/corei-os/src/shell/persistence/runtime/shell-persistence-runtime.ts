/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-22
 *
 * FILE:
 * shell-persistence-runtime.ts
 *
 * PURPOSE:
 * Coordinates persistence and restoration of stable Institutional
 * Shell presentation preferences.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 * AUTHORITY:
 * - Reads Workbench presentation state through Workbench State Manager.
 * - Restores Workbench presentation state through Workbench State Manager.
 * - Does not own or duplicate Workbench mutable runtime state.
 *
 ******************************************************************************/

import {
    workbenchStateManager
} from "../../../workbench/runtime/workbench-state-manager";

import {
    SHELL_PREFERENCE_SNAPSHOT_VERSION,
    type ShellPreferenceSnapshot
} from "../contracts";

import {
    clearShellPreferences,
    loadShellPreferences,
    saveShellPreferences
} from "../storage";

class ShellPersistenceRuntime {

    public restore(): void {

        const snapshot =
            loadShellPreferences();

        if (
            !snapshot
        ) {

            return;

        }

        workbenchStateManager
            .setSidebarVisible(
                snapshot.sidebarVisible
            );

        workbenchStateManager
            .setRightVisible(
                snapshot.rightVisible
            );

        workbenchStateManager
            .setBottomVisible(
                snapshot.bottomVisible
            );

    }

    public save(): void {

        const snapshot:
            ShellPreferenceSnapshot = {

                version:
                    SHELL_PREFERENCE_SNAPSHOT_VERSION,

                sidebarVisible:
                    workbenchStateManager
                        .isSidebarVisible(),

                rightVisible:
                    workbenchStateManager
                        .isRightVisible(),

                bottomVisible:
                    workbenchStateManager
                        .isBottomVisible()

            };

        saveShellPreferences(
            snapshot
        );

    }

    public reset(): void {

        clearShellPreferences();

    }

}

export const shellPersistenceRuntime =
    new ShellPersistenceRuntime();
