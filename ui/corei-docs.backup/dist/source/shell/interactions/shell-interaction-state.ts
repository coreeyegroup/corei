/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-interaction-state.ts
 *
 * PURPOSE:
 * Shell-owned interaction state.
 *
 * IMPORTANT:
 * This state is intentionally separate from Shell lifecycle state.
 *
 ******************************************************************************/

import { create } from "zustand";

import type {
    ShellRegionPosition
} from "../contracts/shell-region-contract";

export interface ShellInteractionState {

    readonly focusedRegion:
        ShellRegionPosition | null;

    readonly lastCommand:
        string | null;

    focusRegion(
        region: ShellRegionPosition
    ): void;

    recordCommand(
        commandId: string
    ): void;

    clearFocus(): void;

}

export const useShellInteractionState =
    create<ShellInteractionState>()(

        (set) => ({

            focusedRegion: null,

            lastCommand: null,

            focusRegion(
                focusedRegion
            ) {

                set({
                    focusedRegion
                });

            },

            recordCommand(
                lastCommand
            ) {

                set({
                    lastCommand
                });

            },

            clearFocus() {

                set({
                    focusedRegion: null
                });

            }

        })

    );
