/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-03
 *
 * Sidebar Runtime State
 * ============================================================================
 */

import { create } from "zustand";

export interface SidebarState {

    visible: boolean;

    width: number;

    setVisible(

        visible: boolean

    ): void;

    setWidth(

        width: number

    ): void;

}

export const useSidebarState =

create<SidebarState>((set) => ({

    visible: true,

    width: 220,

    setVisible: (

        visible

    ) =>

        set({

            visible

        }),

    setWidth: (

        width

    ) =>

        set({

            width

        })

}));
