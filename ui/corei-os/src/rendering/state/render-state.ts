/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render-state.ts
 * Purpose    : Rendering Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    RenderModel

} from "../models/render";

import {

    RenderRegistry

} from "../registry/render-registry";

interface RenderState {

    readonly renderers: readonly RenderModel[];

    readonly activeRenderer: string;

    activate(

        rendererId: string

    ): void;

}

export const useRenderState = create<RenderState>()(

    (set) => ({

        renderers: RenderRegistry,

        activeRenderer: "core-shell",

        activate(

            rendererId

        ) {

            set({

                activeRenderer: rendererId

            });

        }

    })

);
