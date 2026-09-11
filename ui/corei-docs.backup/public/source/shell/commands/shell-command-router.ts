/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-command-router.ts
 *
 * PURPOSE:
 * Deterministic Shell command routing.
 *
 ******************************************************************************/

import {

    SHELL_COMMANDS,

    type ShellCommandId

} from "./shell-command";

import {
    shellInteractionRuntime
} from "../interactions/shell-interaction-runtime";

import {
    shellInstrumentationRuntime
} from "../instrumentation";

export class ShellCommandRouter {

    public route(
        commandId: ShellCommandId
    ): void {

        const commandIdentity =
            String(
                commandId
            );

        shellInstrumentationRuntime.debug(
            `Shell command received: ${commandIdentity}`
        );

        try {



        shellInteractionRuntime
            .recordCommand(
                commandId
            );

        switch (
            commandId
        ) {

            case SHELL_COMMANDS.TOGGLE_LEFT_REGION:

                shellInteractionRuntime
                    .toggleLeftRegion();

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.TOGGLE_RIGHT_REGION:

                shellInteractionRuntime
                    .toggleRightRegion();

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.TOGGLE_BOTTOM_REGION:

                shellInteractionRuntime
                    .toggleBottomRegion();

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.FOCUS_TOP_REGION:

                shellInteractionRuntime
                    .focusRegion("top");

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.FOCUS_LEFT_REGION:

                shellInteractionRuntime
                    .focusRegion("left");

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.FOCUS_CENTER_REGION:

                shellInteractionRuntime
                    .focusRegion("center");

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.FOCUS_RIGHT_REGION:

                shellInteractionRuntime
                    .focusRegion("right");

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.FOCUS_BOTTOM_REGION:

                shellInteractionRuntime
                    .focusRegion("bottom");

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            case SHELL_COMMANDS.FOCUS_STATUS_REGION:

                shellInteractionRuntime
                    .focusRegion("status");

                shellInstrumentationRuntime.info(
                    `Shell command completed: ${commandIdentity}`
                );

                return;

            default: {

                const exhaustive:
                    never = commandId;

                throw new Error(
                    `Unsupported Shell command: ${String(exhaustive)}`
                );

            }

        }

        } catch (
            error
        ) {

            shellInstrumentationRuntime.error(
                `Shell command failed: ${commandIdentity}`
            );

            throw error;

        }

}

}

export const shellCommandRouter =
    new ShellCommandRouter();
