/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-22
 *
 * FILE:
 * shell-preference-snapshot.ts
 *
 * PURPOSE:
 * Versioned persistence contract for stable Institutional Shell
 * presentation preferences.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 * IMPORTANT:
 * This contract does not own Workbench runtime state.
 * It captures only restorable Shell presentation preferences.
 *
 ******************************************************************************/

export const SHELL_PREFERENCE_SNAPSHOT_VERSION = 1;

export interface ShellPreferenceSnapshot {

    readonly version:
        typeof SHELL_PREFERENCE_SNAPSHOT_VERSION;

    readonly sidebarVisible:
        boolean;

    readonly rightVisible:
        boolean;

    readonly bottomVisible:
        boolean;

}

export const DEFAULT_SHELL_PREFERENCE_SNAPSHOT:
    ShellPreferenceSnapshot = {

        version:
            SHELL_PREFERENCE_SNAPSHOT_VERSION,

        sidebarVisible:
            true,

        rightVisible:
            true,

        bottomVisible:
            true

    };

export function isShellPreferenceSnapshot(
    value: unknown
): value is ShellPreferenceSnapshot {

    if (
        typeof value !== "object" ||
        value === null
    ) {

        return false;

    }

    const candidate =
        value as Partial<ShellPreferenceSnapshot>;

    return (
        candidate.version ===
            SHELL_PREFERENCE_SNAPSHOT_VERSION &&
        typeof candidate.sidebarVisible ===
            "boolean" &&
        typeof candidate.rightVisible ===
            "boolean" &&
        typeof candidate.bottomVisible ===
            "boolean"
    );

}
