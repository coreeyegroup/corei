/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-04
 *
 * FILE
 * tab-state.ts
 * ============================================================================
 */

import { create } from "zustand";

import type {

    WorkbenchTab

} from "../contracts/tab-contract";

interface TabState {

    tabs: WorkbenchTab[];

    activeTab: string | null;

}

export const useTabState =

create<TabState>(() => ({

    tabs: [],

    activeTab: null

}));
