/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-005
 * File       : shell-state.ts
 * Purpose    : Shell Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import {

    DefaultShellRegions

} from "../layout/region-layout";

export interface ShellState {

    readonly initialized: boolean;

    initialize(): void;

}

export const useShellState = create<ShellState>(

    (set) => ({

        initialized: false,

        initialize() {

            void DefaultShellRegions;

            set({

                initialized: true

            });

        }

    })

);
