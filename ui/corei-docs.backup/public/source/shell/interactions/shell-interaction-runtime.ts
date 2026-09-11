/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-interaction-runtime.ts
 *
 * PURPOSE:
 * Institutional Shell interaction execution runtime.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ShellRegionPosition
} from "../contracts/shell-region-contract";

import {
    useShellInteractionState
} from "./shell-interaction-state";

import {
    workbenchStateManager
} from "../../workbench/runtime/workbench-state-manager";

import {
    shellPersistenceRuntime
} from "../persistence/runtime";

import {
    shellInstrumentationRuntime
} from "../instrumentation";

class ShellInteractionRuntime {

    public toggleLeftRegion(): void {

        const interactionIdentity =
            "toggle-left-region";

        shellInstrumentationRuntime.debug(
            `Shell interaction received: ${interactionIdentity}`
        );

        try {

            workbenchStateManager.toggleSidebar();

            shellPersistenceRuntime.save();

            shellInstrumentationRuntime.info(
                `Shell interaction completed: ${interactionIdentity}`
            );

        } catch (
            error
        ) {

            shellInstrumentationRuntime.error(
                `Shell interaction failed: ${interactionIdentity}`
            );

            throw error;

        }

    }

    public toggleRightRegion(): void {

        const interactionIdentity =
            "toggle-right-region";

        shellInstrumentationRuntime.debug(
            `Shell interaction received: ${interactionIdentity}`
        );

        try {

            workbenchStateManager.toggleRight();

            shellPersistenceRuntime.save();

            shellInstrumentationRuntime.info(
                `Shell interaction completed: ${interactionIdentity}`
            );

        } catch (
            error
        ) {

            shellInstrumentationRuntime.error(
                `Shell interaction failed: ${interactionIdentity}`
            );

            throw error;

        }

    }

    public toggleBottomRegion(): void {

        const interactionIdentity =
            "toggle-bottom-region";

        shellInstrumentationRuntime.debug(
            `Shell interaction received: ${interactionIdentity}`
        );

        try {

            workbenchStateManager.toggleBottom();

            shellPersistenceRuntime.save();

            shellInstrumentationRuntime.info(
                `Shell interaction completed: ${interactionIdentity}`
            );

        } catch (
            error
        ) {

            shellInstrumentationRuntime.error(
                `Shell interaction failed: ${interactionIdentity}`
            );

            throw error;

        }

    }

    public focusRegion(
        region: ShellRegionPosition
    ): void {

        const interactionIdentity =
            `focus-region:${region}`;

        shellInstrumentationRuntime.debug(
            `Shell interaction received: ${interactionIdentity}`
        );

        try {

            useShellInteractionState
                .getState()
                .focusRegion(
                    region
                );

            shellInstrumentationRuntime.info(
                `Shell interaction completed: ${interactionIdentity}`
            );

        } catch (
            error
        ) {

            shellInstrumentationRuntime.error(
                `Shell interaction failed: ${interactionIdentity}`
            );

            throw error;

        }

    }

    public recordCommand(
        commandId: string
    ): void {

        useShellInteractionState
            .getState()
            .recordCommand(
                commandId
            );

    }

}

export const shellInteractionRuntime =
    new ShellInteractionRuntime();
