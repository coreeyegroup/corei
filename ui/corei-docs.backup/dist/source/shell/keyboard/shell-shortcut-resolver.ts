/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-shortcut-resolver.ts
 *
 * PURPOSE:
 * Deterministic Shell-local keyboard shortcut resolution.
 *
 ******************************************************************************/

import {

    SHELL_COMMANDS,

    type ShellCommandId

} from "../commands/shell-command";

export interface ShellShortcutInput {

    readonly code: string;

    readonly ctrlKey: boolean;

    readonly altKey: boolean;

    readonly shiftKey: boolean;

    readonly metaKey: boolean;

}

interface ShellShortcutDefinition
    extends ShellShortcutInput {

    readonly command:
        ShellCommandId;

}

const SHELL_SHORTCUTS:
    readonly ShellShortcutDefinition[] = [

        {
            code: "KeyB",
            ctrlKey: true,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .TOGGLE_LEFT_REGION
        },

        {
            code: "KeyB",
            ctrlKey: true,
            altKey: false,
            shiftKey: true,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .TOGGLE_RIGHT_REGION
        },

        {
            code: "KeyJ",
            ctrlKey: true,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .TOGGLE_BOTTOM_REGION
        },

        {
            code: "Digit1",
            ctrlKey: false,
            altKey: true,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .FOCUS_TOP_REGION
        },

        {
            code: "Digit2",
            ctrlKey: false,
            altKey: true,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .FOCUS_LEFT_REGION
        },

        {
            code: "Digit3",
            ctrlKey: false,
            altKey: true,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .FOCUS_CENTER_REGION
        },

        {
            code: "Digit4",
            ctrlKey: false,
            altKey: true,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .FOCUS_RIGHT_REGION
        },

        {
            code: "Digit5",
            ctrlKey: false,
            altKey: true,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .FOCUS_BOTTOM_REGION
        },

        {
            code: "Digit6",
            ctrlKey: false,
            altKey: true,
            shiftKey: false,
            metaKey: false,
            command:
                SHELL_COMMANDS
                    .FOCUS_STATUS_REGION
        }

    ];

export function resolveShellShortcut(

    input: ShellShortcutInput

): ShellCommandId | null {

    const shortcut =
        SHELL_SHORTCUTS.find(
            (candidate) =>

                candidate.code ===
                    input.code &&

                candidate.ctrlKey ===
                    input.ctrlKey &&

                candidate.altKey ===
                    input.altKey &&

                candidate.shiftKey ===
                    input.shiftKey &&

                candidate.metaKey ===
                    input.metaKey
        );

    return shortcut?.command ?? null;

}
