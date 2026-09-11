/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-05
 *
 * FILE
 * panel-focus-state.ts
 * ============================================================================
 */

import { create } from "zustand";

export interface PanelFocusState {

    focusedPanel: string | null;

    setFocusedPanel(

        id: string | null

    ): void;

}

export const usePanelFocusState =

create<PanelFocusState>((set) => ({

    focusedPanel: null,

    setFocusedPanel: (

        focusedPanel

    ) =>

        set({

            focusedPanel

        })

}));
