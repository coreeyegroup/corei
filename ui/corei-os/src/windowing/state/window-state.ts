/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-004
 * File       : window-state.ts
 * Purpose    : Institutional Window Runtime State
 * =============================================================================
 */

import {

    create

} from "zustand";

import type {

    WindowModel

} from "../models/window";

import {

    windowLifecycle

} from "../lifecycle/window-lifecycle";

interface WindowState {

    readonly windows: readonly WindowModel[];

    readonly activeWindow?: WindowModel;

    synchronize(): void;

}

export const useWindowState =

    create<WindowState>()(

        (set) => ({

            windows: [],

            activeWindow: undefined,

            synchronize() {

                set({

                    windows:

                        windowLifecycle.getWindows(),

                    activeWindow:

                        windowLifecycle.getActiveWindow()

                });

            }

        })

    );