/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-command.ts
 *
 * PURPOSE:
 * Institutional Shell Command Contract
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

export const SHELL_COMMANDS = {

    TOGGLE_LEFT_REGION:
        "shell.toggle-left-region",

    TOGGLE_RIGHT_REGION:
        "shell.toggle-right-region",

    TOGGLE_BOTTOM_REGION:
        "shell.toggle-bottom-region",

    FOCUS_TOP_REGION:
        "shell.focus-top-region",

    FOCUS_LEFT_REGION:
        "shell.focus-left-region",

    FOCUS_CENTER_REGION:
        "shell.focus-center-region",

    FOCUS_RIGHT_REGION:
        "shell.focus-right-region",

    FOCUS_BOTTOM_REGION:
        "shell.focus-bottom-region",

    FOCUS_STATUS_REGION:
        "shell.focus-status-region"

} as const;

export type ShellCommandId =
    typeof SHELL_COMMANDS[
        keyof typeof SHELL_COMMANDS
    ];
