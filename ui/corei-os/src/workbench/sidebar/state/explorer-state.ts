/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * explorer-state.ts
 *
 * PURPOSE
 * Explorer Runtime State
 * ============================================================================
 */

import { create } from "zustand";

export interface ExplorerState {

    selected: string | null;

    expanded: Set<string>;

    setSelected(

        id: string | null

    ): void;

    setExpanded(

        expanded: Set<string>

    ): void;

    isExpanded(

        id: string

    ): boolean;

}

export const useExplorerState =

create<ExplorerState>((set, get) => ({

    selected: null,

    expanded: new Set<string>(),

    setSelected: (

        selected

    ) =>

        set({

            selected

        }),

    setExpanded: (

        expanded

    ) =>

        set({

            expanded

        }),

    isExpanded: (

        id

    ) =>

        get().expanded.has(

            id

        )

}));

