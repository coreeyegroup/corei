/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-07
 *
 * FILE
 * dock-tree-state.ts
 * ============================================================================
 */

import { create } from "zustand";

import type {

    DockTree

} from "../models/dock-tree";

import {

    dockingEngine

} from "../engine/docking-engine";

export interface DockTreeState {

    tree: DockTree;

    setTree(

        tree: DockTree

    ): void;

}

export const useDockTreeState =

create<DockTreeState>((set)=>({

    tree:

        dockingEngine.create(),

    setTree:(tree)=>

        set({

            tree

        })

}));

