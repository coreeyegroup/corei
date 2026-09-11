/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-22
 *
 * FILE:
 * shell-preference-storage.ts
 *
 * PURPOSE:
 * Browser storage adapter for versioned Institutional Shell
 * presentation preferences.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import {
    isShellPreferenceSnapshot,
    type ShellPreferenceSnapshot
} from "../contracts";

const SHELL_PREFERENCE_STORAGE_KEY =
    "corei.shell.preferences";

function hasBrowserStorage(): boolean {

    return (
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
    );

}

export function loadShellPreferences():
    ShellPreferenceSnapshot | null {

    if (
        !hasBrowserStorage()
    ) {

        return null;

    }

    try {

        const raw =
            window.localStorage.getItem(
                SHELL_PREFERENCE_STORAGE_KEY
            );

        if (
            !raw
        ) {

            return null;

        }

        const value:
            unknown =
                JSON.parse(
                    raw
                );

        if (
            !isShellPreferenceSnapshot(
                value
            )
        ) {

            return null;

        }

        return value;

    }
    catch {

        return null;

    }

}

export function saveShellPreferences(
    snapshot: ShellPreferenceSnapshot
): void {

    if (
        !hasBrowserStorage()
    ) {

        return;

    }

    try {

        window.localStorage.setItem(
            SHELL_PREFERENCE_STORAGE_KEY,
            JSON.stringify(
                snapshot
            )
        );

    }
    catch {

        // Persistence failure must not destabilize Shell runtime.

    }

}

export function clearShellPreferences(): void {

    if (
        !hasBrowserStorage()
    ) {

        return;

    }

    try {

        window.localStorage.removeItem(
            SHELL_PREFERENCE_STORAGE_KEY
        );

    }
    catch {

        // Persistence failure must not destabilize Shell runtime.

    }

}
