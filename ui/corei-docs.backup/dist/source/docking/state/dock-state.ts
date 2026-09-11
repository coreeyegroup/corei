/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-008
 * File       : dock-state.ts
 * Purpose    : Dock Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    DockModel

} from "../models/dock";

interface DockState {

    readonly docks: readonly DockModel[];

    register(

        dock: DockModel

    ): void;

}

export const useDockState = create<DockState>()(

    (set) => ({

        docks: [],

        register(

            dock

        ) {

            set(

                (state) => ({

                    docks: [

                        ...state.docks,

                        dock

                    ]

                })

            );

        }

    })

);
